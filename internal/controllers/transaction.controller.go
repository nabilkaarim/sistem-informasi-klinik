package controllers

import (
	"net/http"

	"sistem_informasi_klinik/internal/config"
	"sistem_informasi_klinik/internal/models"

	"github.com/gin-gonic/gin"
)

func CreateTransaction(c *gin.Context) {
	var input models.Transaction
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := config.DB.Create(&input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create transaction"})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": input})
}

func GetTransactions(c *gin.Context) {
	var transactions []models.Transaction
	if err := config.DB.Order("created_at desc").Find(&transactions).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to retrieve transactions"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": transactions})
}
