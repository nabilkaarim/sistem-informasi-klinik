package models

import "gorm.io/gorm"

type Patient struct {
	gorm.Model
	Name      string `json:"name"`
	Phone     string `json:"phone"`
	Complaint string `json:"complaint"`
	Status    string `json:"status"`
}
