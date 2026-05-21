package controllers

import "github.com/gin-gonic/gin"

type LoginInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func Login(c *gin.Context) {
	var input LoginInput

	c.BindJSON(&input)

	if input.Email == "" || input.Password == "" {
		c.JSON(400, gin.H{
			"message": "email dan password wajib diisi",
		})
		return
	}

	c.JSON(200, gin.H {
		"message": "login success",
		"email": input.Email,
	})

	
}