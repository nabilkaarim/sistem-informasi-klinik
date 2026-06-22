package main

import (
	"github.com/gin-gonic/gin"
	"sistem_informasi_klinik/internal/routes"
	"sistem_informasi_klinik/internal/config"
	"github.com/gin-contrib/cors"
)

func main() {
	config.ConnectDB()
	r := gin.Default()

	r.Use(cors.Default())

	routes.SetupRoutes(r)

	r.Run(":8080")


}
