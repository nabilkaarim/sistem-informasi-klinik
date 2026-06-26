package controllers

import (
	"net/http"

	"sistem_informasi_klinik/internal/config"
	"sistem_informasi_klinik/internal/models"

	"github.com/gin-gonic/gin"
)

func CreateDoctor(c *gin.Context) {
	var input models.Doctor
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := config.DB.Create(&input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create doctor"})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": input})
}

func GetDoctors(c *gin.Context) {
	var doctors []models.Doctor
	if err := config.DB.Order("created_at desc").Find(&doctors).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to retrieve doctors"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": doctors})
}

func GetDoctor(c *gin.Context) {
	id := c.Param("id")
	var doctor models.Doctor
	if err := config.DB.First(&doctor, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "doctor not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": doctor})
}

func UpdateDoctor(c *gin.Context) {
	id := c.Param("id")
	var doctor models.Doctor
	if err := config.DB.First(&doctor, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "doctor not found"})
		return
	}
	var input models.Doctor
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := config.DB.Model(&doctor).Updates(input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update doctor"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": doctor})
}

func DeleteDoctor(c *gin.Context) {
	id := c.Param("id")
	var doctor models.Doctor
	if err := config.DB.First(&doctor, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "doctor not found"})
		return
	}
	if err := config.DB.Delete(&doctor).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete doctor"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": true})
}
