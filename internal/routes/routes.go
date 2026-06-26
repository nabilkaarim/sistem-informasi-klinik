package routes

import (
	"net/http"
	"path/filepath"
	"strings"

	"sistem_informasi_klinik/internal/controllers"
	"sistem_informasi_klinik/internal/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	staticDir := "./web/dist"
	if err := r.SetTrustedProxies(nil); err != nil {
		panic(err)
	}

	r.Static("/assets", filepath.Join(staticDir, "assets"))

	r.NoRoute(func(c *gin.Context) {
		if strings.HasPrefix(c.Request.URL.Path, "/api/") {
			c.Status(http.StatusNotFound)
			return
		}
		c.File(filepath.Join(staticDir, "index.html"))
	})

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

			protected.POST("/patients", controllers.CreatePatient)
			protected.GET("/patients", controllers.GetPatients)
			protected.GET("/patients/:id", controllers.GetPatient)
			protected.PUT("/patients/:id", controllers.UpdatePatient)
			protected.DELETE("/patients/:id", controllers.DeletePatient)

			protected.POST("/doctors", controllers.CreateDoctor)
			protected.GET("/doctors", controllers.GetDoctors)
			protected.GET("/doctors/:id", controllers.GetDoctor)
			protected.PUT("/doctors/:id", controllers.UpdateDoctor)
			protected.DELETE("/doctors/:id", controllers.DeleteDoctor)

			protected.POST("/staffs", controllers.CreateStaff)
			protected.GET("/staffs", controllers.GetStaffs)
			protected.GET("/staffs/:id", controllers.GetStaff)
			protected.PUT("/staffs/:id", controllers.UpdateStaff)
			protected.DELETE("/staffs/:id", controllers.DeleteStaff)

			protected.POST("/medical-records", controllers.CreateMedicalRecord)
			protected.GET("/medical-records", controllers.GetMedicalRecords)

			protected.POST("/transactions", controllers.CreateTransaction)
			protected.GET("/transactions", controllers.GetTransactions)

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
