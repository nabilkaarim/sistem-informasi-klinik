package models

import "gorm.io/gorm"

type Doctor struct {
	gorm.Model
	Name      string `json:"name"`
	Specialty string `json:"specialty"`
	Shift     string `json:"shift"`
	Phone     string `json:"phone"`
}
