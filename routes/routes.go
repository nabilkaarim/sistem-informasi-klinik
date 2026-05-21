package routes

import (
	"sistem_informasi_klinik/controllers"
	"github.com/gin-gonic/gin"
)

func SetupRoutes (r *gin.Engine) {
	r.POST("/login", controllers.Login)
}