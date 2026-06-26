package controllers

import (
	"net/http"

	"sistem_informasi_klinik/internal/config"
	"sistem_informasi_klinik/internal/models"

	"github.com/gin-gonic/gin"
)

func CreateStaff(c *gin.Context) {
	var input models.Staff
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := config.DB.Create(&input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create staff"})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": input})
}

func GetStaffs(c *gin.Context) {
	var staffs []models.Staff
	if err := config.DB.Order("created_at desc").Find(&staffs).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to retrieve staffs"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": staffs})
}

func GetStaff(c *gin.Context) {
	id := c.Param("id")
	var staff models.Staff
	if err := config.DB.First(&staff, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "staff not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": staff})
}

func UpdateStaff(c *gin.Context) {
	id := c.Param("id")
	var staff models.Staff
	if err := config.DB.First(&staff, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "staff not found"})
		return
	}
	var input models.Staff
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := config.DB.Model(&staff).Updates(input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update staff"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": staff})
}

func DeleteStaff(c *gin.Context) {
	id := c.Param("id")
	var staff models.Staff
	if err := config.DB.First(&staff, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "staff not found"})
		return
	}
	if err := config.DB.Delete(&staff).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete staff"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": true})
}
