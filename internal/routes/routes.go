package routes

import (
	"sistem_informasi_klinik/internal/controllers"
	"sistem_informasi_klinik/internal/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {

	api := r.Group("/api")
	{
		api.POST("/login", controllers.Login)

		api.GET("/users/:id", controllers.GetUser)

		api.POST("/users", controllers.CreateUser)

		protected := api.Group("/")
		protected.Use(middleware.AuthMiddleware())
		{
			protected.POST("/appointments", controllers.CreateAppointment)
			protected.GET("/appointments", controllers.GetAppointments)
			protected.GET("/appointments/:id", controllers.GetAppointment)
			protected.PUT("/appointments/:id", controllers.UpdateAppointment)
			protected.DELETE(
				"/appointments/:id",
				middleware.RoleMiddleware("admin"),
				controllers.DeleteAppointment,
			)

			protected.GET("/users", controllers.GetUsers)

			protected.PUT("/users/:id", controllers.UpdateUser)

			protected.DELETE(
				"/users/:id",
				middleware.RoleMiddleware("admin"),
				controllers.DeleteUser,
			)
		}
	}
}
