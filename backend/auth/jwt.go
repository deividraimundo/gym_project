package auth

import (
	"errors"
	"fmt"
	"gym_project/model"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

const keyJwt = "Z3ltX3Byb2plY3QK"

const (
	idKey       = "id"
	nameKey     = "name"
	lastNameKey = "lastName"
	emailKey    = "email"
)

func CreateToken(user *model.User) (string, error) {
	claims := jwt.MapClaims{
		idKey:       user.ID,
		nameKey:     user.Name,
		lastNameKey: user.LastName,
		emailKey:    user.Email,
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	str, err := token.SignedString([]byte(keyJwt))
	if err != nil {
		return "", fmt.Errorf("erro criando token: %w", err)
	}

	return str, nil
}

// SetToken grava no response o cookie com o token fornecido
func SetToken(w http.ResponseWriter, token string) {
	expiration := time.Now().Add(365 * 24 * time.Hour)
	cookie := http.Cookie{Name: AuthCookieKey, Value: token, Expires: expiration, HttpOnly: true, Path: "/"}
	http.SetCookie(w, &cookie)
}

// ClearAuthToken grava no response um cookie vencido, para remove-lo do browser
func ClearAuthToken(w http.ResponseWriter) {
	expiration := time.Now().Add(-1 * 24 * time.Hour)
	cookie := http.Cookie{Name: AuthCookieKey, Value: "", Expires: expiration, HttpOnly: true, Path: "/"}
	http.SetCookie(w, &cookie)
}

// validateToken valida o token e retorna o usuario
func validateToken(t string) (*model.User, error) {
	if t == "" {
		return nil, errors.New("token não informado")
	}

	token, _ := jwt.Parse(t, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("there was an error")
		}
		return []byte(keyJwt), nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		var user = &model.User{
			ID:       int64(claims[idKey].(float64)),
			Name:     claims[nameKey].(string),
			LastName: claims[lastNameKey].(string),
			Email:    claims[emailKey].(string),
		}
		return user, nil
	}

	return nil, errors.New("token inválido")
}
