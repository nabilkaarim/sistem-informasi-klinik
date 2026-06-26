package models

import "gorm.io/gorm"

type MedicalRecord struct {
	gorm.Model
	PatientID   uint   `json:"patient_id"`
	PatientName string `json:"patient_name"`
	Diagnosis   string `json:"diagnosis"`
	Note        string `json:"note"`
}
