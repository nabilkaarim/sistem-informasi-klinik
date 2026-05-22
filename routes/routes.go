package routes

import (
	"sistem_informasi_klinik/controllers"
	"sistem_informasi_klinik/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {

	api := r.Group("/api")
	{
		api.POST("/login", controllers.Login)

		protected := api.Group("/")
		protected.Use(middleware.AuthMiddleware())
		{
			protected.GET("/users", controllers.GetUsers)

			protected.GET("/users/:id", controllers.GetUser)

			protected.POST("/users", controllers.CreateUser)

			protected.PUT("/users/:id", controllers.UpdateUser)

			protected.DELETE(
				"/users/:id",
				middleware.RoleMiddleware("admin"),
				controllers.DeleteUser,
			)
		}
	}
}