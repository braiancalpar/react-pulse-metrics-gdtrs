package main

import (
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"pulse-metrics-api/handlers"
	"pulse-metrics-api/middleware"
	"pulse-metrics-api/store"
)

func main() {
	store.Init()

	r := gin.Default()

	// CORS — allow the Vite dev server origins
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:3001", "http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	api := r.Group("/api")

	// Auth — public (no Bearer required)
	api.POST("/auth/login", handlers.Login)

	// All routes below require a valid Bearer token
	secured := api.Group("/")
	secured.Use(middleware.Auth())

	// Campaigns
	secured.GET("/campaigns", handlers.GetCampaigns)
	secured.GET("/campaigns/:id", handlers.GetCampaign)
	secured.POST("/campaigns", handlers.CreateCampaign)
	secured.PUT("/campaigns/:id", handlers.UpdateCampaign)
	secured.DELETE("/campaigns/:id", handlers.DeleteCampaign)
	secured.GET("/campaigns/:id/metrics", handlers.GetCampaignMetrics)

	// Metrics
	secured.GET("/metrics/overview", handlers.GetMetricsOverview)
	secured.GET("/metrics/timeseries", handlers.GetMetricsTimeSeries)
	secured.GET("/metrics/by-channel", handlers.GetMetricsByChannel)
	secured.GET("/metrics/funnel", handlers.GetMetricsFunnel)
	secured.GET("/metrics/engagement", handlers.GetMetricsEngagement)

	// Analytics
	secured.GET("/analytics/dashboard", handlers.GetAnalyticsDashboard)
	secured.GET("/analytics/engagement", handlers.GetAnalyticsEngagement)
	secured.GET("/analytics/conversions", handlers.GetAnalyticsConversions)

	// Users
	secured.GET("/users/team", handlers.GetTeam)
	secured.GET("/users/:id", handlers.GetUser)
	secured.PUT("/users/:id", handlers.UpdateUser)
	secured.POST("/users/invite", handlers.InviteUser)

	// Audiences
	secured.GET("/audiences", handlers.GetAudiences)
	secured.GET("/audiences/:id", handlers.GetAudience)
	secured.POST("/audiences", handlers.CreateAudience)

	// Reports
	secured.GET("/reports", handlers.GetReports)
	secured.GET("/reports/:id", handlers.GetReport)
	secured.POST("/reports", handlers.CreateReport)
	secured.DELETE("/reports/:id", handlers.DeleteReport)
	secured.POST("/reports/:id/generate", handlers.GenerateReport)

	// Integrations
	secured.GET("/integrations", handlers.GetIntegrations)
	secured.GET("/integrations/:id", handlers.GetIntegration)
	secured.POST("/integrations/:id/connect", handlers.ConnectIntegration)
	secured.POST("/integrations/:id/disconnect", handlers.DisconnectIntegration)
	secured.POST("/integrations/:id/sync", handlers.SyncIntegration)

	// Notifications
	secured.GET("/notifications", handlers.GetNotifications)
	secured.PUT("/notifications/read-all", handlers.MarkAllNotificationsRead)
	secured.PUT("/notifications/:id/read", handlers.MarkNotificationRead)

	log.Println("PulseMetrics API listening on :8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("failed to start server: %v", err)
	}
}
