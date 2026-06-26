package controllers

import (
	"net/http"

	"sistem_informasi_klinik/internal/config"
	"sistem_informasi_klinik/internal/models"

	"github.com/gin-gonic/gin"
)

func CreateMedicalRecord(c *gin.Context) {
	var input models.MedicalRecord
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := config.DB.Create(&input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create medical record"})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": input})
}

func GetMedicalRecords(c *gin.Context) {
	var records []models.MedicalRecord
	if err := config.DB.Order("created_at desc").Find(&records).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to retrieve medical records"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": records})
}
