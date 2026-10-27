package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"pulse-metrics-api/store"
)

// GetMetricsOverview handles GET /api/metrics/overview
func GetMetricsOverview(c *gin.Context) {
	c.JSON(http.StatusOK, store.Global.GetOverview())
}

// GetMetricsTimeSeries handles GET /api/metrics/timeseries
// Supports query param: metric (impressions|clicks|conversions|revenue|ctr)
func GetMetricsTimeSeries(c *gin.Context) {
	metric := c.DefaultQuery("metric", "impressions")
	series := store.Global.GetTimeSeries(metric)
	if series == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "metric not found"})
		return
	}
	c.JSON(http.StatusOK, series)
}

// GetMetricsByChannel handles GET /api/metrics/by-channel
func GetMetricsByChannel(c *gin.Context) {
	c.JSON(http.StatusOK, store.Global.GetByChannel())
}

// GetMetricsFunnel handles GET /api/metrics/funnel
func GetMetricsFunnel(c *gin.Context) {
	c.JSON(http.StatusOK, store.Global.GetFunnel())
}

// GetMetricsEngagement handles GET /api/metrics/engagement
func GetMetricsEngagement(c *gin.Context) {
	c.JSON(http.StatusOK, store.Global.GetEngagement())
}
