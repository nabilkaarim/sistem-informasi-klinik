package main

import (
	"github.com/gin-gonic/gin"
	"sistem_informasi_klinik/internal/routes"
	"sistem_informasi_klinik/internal/config"

)

func main() {
	config.ConnectDB()
	r := gin.Default()

	routes.SetupRoutes(r)

	r.Run(":8080")


}
