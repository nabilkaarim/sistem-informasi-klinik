package main

import (
	"log"

	"sistem_informasi_klinik/internal/config"
	"sistem_informasi_klinik/internal/helpers"
	"sistem_informasi_klinik/internal/models"
	"sistem_informasi_klinik/internal/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	config.ConnectDB()

	seedDefaultUsers()
	seedSampleClinicData()

	r := gin.Default()
	r.Use(cors.Default())
	routes.SetupRoutes(r)
	r.Run(":8080")
}

func seedDefaultUsers() {
	defaults := []models.User{
		{Name: "Admin Klinik", Email: "admin@example.com", Password: "password123", Role: "admin"},
		{Name: "Petugas Klinik", Email: "petugas@example.com", Password: "password123", Role: "petugas"},
		{Name: "Dokter Klinik", Email: "dokter@example.com", Password: "password123", Role: "dokter"},
	}

	for _, user := range defaults {
		var existing models.User
		if err := config.DB.Where("email = ?", user.Email).First(&existing).Error; err == nil {
			continue
		}

		hashedPassword, err := helpers.HashPassword(user.Password)
		if err != nil {
			log.Printf("failed to hash password for %s: %v", user.Email, err)
			continue
		}

		user.Password = string(hashedPassword)
		if err := config.DB.Create(&user).Error; err != nil {
			log.Printf("failed to seed user %s: %v", user.Email, err)
		}
	}
}

func seedSampleClinicData() {
	var count int64
	config.DB.Model(&models.Patient{}).Count(&count)
	if count > 0 {
		return
	}

	patients := []models.Patient{
		{Name: "Ayu Lestari", Phone: "0812-1111-2222", Complaint: "Demam", Status: "Terdaftar"},
		{Name: "Joko Pratama", Phone: "0812-3333-4444", Complaint: "Batuk", Status: "Terdaftar"},
	}
	config.DB.Create(&patients)

	doctors := []models.Doctor{{Name: "dr. Rina", Specialty: "Umum", Shift: "Pagi"}, {Name: "dr. Budi", Specialty: "Gigi", Shift: "Sore"}}
	config.DB.Create(&doctors)

	staffs := []models.Staff{{Name: "Sari", Role: "Petugas Pendaftaran", Phone: "0812-5555-6666"}, {Name: "Dinda", Role: "Kasir", Phone: "0812-7777-8888"}}
	config.DB.Create(&staffs)

	appointments := []models.Appointment{{PatientName: "Ayu Lestari", DoctorName: "dr. Rina", Date: "2026-06-26", Time: "08:00", Status: "Menunggu"}, {PatientName: "Joko Pratama", DoctorName: "dr. Budi", Date: "2026-06-26", Time: "10:30", Status: "Selesai"}}
	config.DB.Create(&appointments)

	transactions := []models.Transaction{{PatientName: "Ayu Lestari", Detail: "Konsultasi", Amount: 75000}, {PatientName: "Joko Pratama", Detail: "Obat", Amount: 120000}}
	config.DB.Create(&transactions)

	records := []models.MedicalRecord{{PatientName: "Ayu Lestari", Diagnosis: "Infeksi ringan", Note: "Istirahat dan minum obat"}, {PatientName: "Joko Pratama", Diagnosis: "Batuk flu", Note: "Konsumsi vitamin"}}
	config.DB.Create(&records)
}
