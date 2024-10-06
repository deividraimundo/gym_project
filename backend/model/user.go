package model

type User struct {
	ID       int64  `json:"id" db:"id"`
	Name     string `json:"name" db:"name"`
	LastName string `json:"lastName" db:"last_name"`
	Email    string `json:"email" db:"email"`
}
