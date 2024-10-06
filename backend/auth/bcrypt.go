package auth

import (
	"golang.org/x/crypto/bcrypt"
)

func GeneratePassword(password string) ([]byte, error) {
	bytePass := []byte(password)
	return bcrypt.GenerateFromPassword(bytePass, bcrypt.DefaultCost)
}

func CheckPassword(hashedPassword, password string) bool {
	byteHash := []byte(hashedPassword)
	bytePass := []byte(password)
	err := bcrypt.CompareHashAndPassword(byteHash, bytePass)
	return err == nil
}
