package config

import (
	"log"

	"sistem_informasi_klinik/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {

	dsn := "host=localhost user=postgres password=walrus008 dbname=klinik port=5432 sslmode=disable"

	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Database connection failed")
	}

	DB = database

	DB.AutoMigrate(&models.User{})

	log.Println("Database Connected")
}