package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"pulse-metrics-api/models"
	"pulse-metrics-api/store"
)

// GetCampaigns handles GET /api/campaigns
// Supports query params: status, search, channel
func GetCampaigns(c *gin.Context) {
	status := c.Query("status")
	search := c.Query("search")
	channel := c.Query("channel")
	campaigns := store.Global.GetCampaigns(status, search, channel)
	c.JSON(http.StatusOK, campaigns)
}

// GetCampaign handles GET /api/campaigns/:id
func GetCampaign(c *gin.Context) {
	campaign, ok := store.Global.GetCampaignByID(c.Param("id"))
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": "campanha não encontrada"})
		return
	}
	c.JSON(http.StatusOK, campaign)
}

// CreateCampaign handles POST /api/campaigns
func CreateCampaign(c *gin.Context) {
	var body models.Campaign
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	created := store.Global.CreateCampaign(body)
	c.JSON(http.StatusCreated, created)
}

// UpdateCampaign handles PUT /api/campaigns/:id
func UpdateCampaign(c *gin.Context) {
	var body models.Campaign
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	updated, ok := store.Global.UpdateCampaign(c.Param("id"), body)
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": "campanha não encontrada"})
		return
	}
	c.JSON(http.StatusOK, updated)
}

// DeleteCampaign handles DELETE /api/campaigns/:id
func DeleteCampaign(c *gin.Context) {
	if !store.Global.DeleteCampaign(c.Param("id")) {
		c.JSON(http.StatusNotFound, gin.H{"error": "campanha não encontrada"})
		return
	}
	c.Status(http.StatusNoContent)
}

// GetCampaignMetrics handles GET /api/campaigns/:id/metrics
func GetCampaignMetrics(c *gin.Context) {
	campaign, ok := store.Global.GetCampaignByID(c.Param("id"))
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": "campanha não encontrada"})
		return
	}
	c.JSON(http.StatusOK, campaign.Metrics)
}
