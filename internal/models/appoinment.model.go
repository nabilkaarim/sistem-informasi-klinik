package models

import "gorm.io/gorm"

type Appointment struct {
	gorm.Model
	PatientName string `json:"patient_name"`
	DoctorName  string `json:"doctor_name"`
	Date        string `json:"date"`
	Time        string `json:"time"`
	Status      string `json:"status"`
}