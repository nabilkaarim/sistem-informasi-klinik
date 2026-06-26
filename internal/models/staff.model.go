package models

import "gorm.io/gorm"

type Staff struct {
	gorm.Model
	Name  string `json:"name"`
	Role  string `json:"role"`
	Phone string `json:"phone"`
}
