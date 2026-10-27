package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"pulse-metrics-api/store"
)

// GetAnalyticsDashboard handles GET /api/analytics/dashboard
func GetAnalyticsDashboard(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"metrics":   store.Global.GetOverview(),
		"funnel":    store.Global.GetFunnel(),
		"byChannel": store.Global.GetByChannel(),
	})
}

// GetAnalyticsEngagement handles GET /api/analytics/engagement
func GetAnalyticsEngagement(c *gin.Context) {
	c.JSON(http.StatusOK, store.Global.GetEngagement())
}

// GetAnalyticsConversions handles GET /api/analytics/conversions
func GetAnalyticsConversions(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"funnel":     store.Global.GetFunnel(),
		"timeSeries": store.Global.GetTimeSeries("conversions"),
	})
}
