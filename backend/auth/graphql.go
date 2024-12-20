package auth

import (
	"context"
	"fmt"
	"gym_project/model"
	"log"
	"net/http"
	"strings"

	gql "github.com/99designs/gqlgen/graphql"
)

const AuthCookieKey = "auth-cookie"

type contextKey struct{ name string }

var (
	userCtxKey = &contextKey{"user"}
	rwCtxKey   = &contextKey{"responseWriter"}
)

// WriterFromContext retorna o writer do contexto
func WriterFromContext(ctx context.Context) http.ResponseWriter {
	raw, _ := ctx.Value(rwCtxKey).(http.ResponseWriter)
	return raw
}

// GetUserFromCtx retorna o usuário logado
func GetUserFromCtx(ctx context.Context) *model.User {
	raw, _ := ctx.Value(userCtxKey).(*model.User)
	return raw
}

func ResolverMiddleware() func(context.Context, gql.Resolver) (interface{}, error) {
	return func(ctx context.Context, next gql.Resolver) (interface{}, error) {
		fCtx := gql.GetFieldContext(ctx)
		user := GetUserFromCtx(ctx)
		// permissão da query schema para o graphql
		if user == nil && !strings.HasPrefix(fCtx.Path().String(), "__schema") && !strings.HasPrefix(fCtx.Path().String(), "me") && !strings.HasPrefix(fCtx.Path().String(), "signIn") && !strings.HasPrefix(fCtx.Path().String(), "signUp") {
			return nil, fmt.Errorf("necessário estar autenticado")
		}
		return next(ctx)
	}
}

func Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// salva o responsewriter no context
		ctx := context.WithValue(r.Context(), rwCtxKey, w)
		r = r.WithContext(ctx)

		c, err := r.Cookie(AuthCookieKey)
		if err != nil || c == nil {
			next.ServeHTTP(w, r)
			return
		}

		user, err := validateToken(c.Value)
		if err != nil {
			log.Printf("usuário inválido token [%s], erro: [%v]", c.Value, err)
			ClearAuthToken(w)
			next.ServeHTTP(w, r)
			return
		}

		// put user in context
		ctx = context.WithValue(ctx, userCtxKey, user)

		// and call the next with our new context
		r = r.WithContext(ctx)
		next.ServeHTTP(w, r)
	})
}
