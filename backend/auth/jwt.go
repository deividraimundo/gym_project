package auth

import (
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
	token := jwt.NewWithClaims(jwt.SigningMethodRS512, claims)
	str, err := token.SignedString(keyJwt)
	if err != nil {
		return "", err
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
