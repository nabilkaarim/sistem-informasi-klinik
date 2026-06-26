package models

import "gorm.io/gorm"

type Transaction struct {
	gorm.Model
	PatientID   uint   `json:"patient_id"`
	PatientName string `json:"patient_name"`
	Detail      string `json:"detail"`
	Amount      int    `json:"amount"`
}
