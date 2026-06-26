package controllers

import (
	"net/http"

	"sistem_informasi_klinik/internal/config"
	"sistem_informasi_klinik/internal/models"

	"github.com/gin-gonic/gin"
)

func CreatePatient(c *gin.Context) {
	var input models.Patient
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if input.Status == "" {
		input.Status = "Terdaftar"
	}
	if err := config.DB.Create(&input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create patient"})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": input})
}

func GetPatients(c *gin.Context) {
	var patients []models.Patient
	if err := config.DB.Order("created_at desc").Find(&patients).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to retrieve patients"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": patients})
}

func GetPatient(c *gin.Context) {
	id := c.Param("id")
	var patient models.Patient
	if err := config.DB.First(&patient, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "patient not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": patient})
}

func UpdatePatient(c *gin.Context) {
	id := c.Param("id")
	var patient models.Patient
	if err := config.DB.First(&patient, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "patient not found"})
		return
	}
	var input models.Patient
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := config.DB.Model(&patient).Updates(input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update patient"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": patient})
}

func DeletePatient(c *gin.Context) {
	id := c.Param("id")
	var patient models.Patient
	if err := config.DB.First(&patient, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "patient not found"})
		return
	}
	if err := config.DB.Delete(&patient).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete patient"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": true})
}
