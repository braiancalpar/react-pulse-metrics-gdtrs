package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"pulse-metrics-api/store"
)

// GetIntegrations handles GET /api/integrations
func GetIntegrations(c *gin.Context) {
	c.JSON(http.StatusOK, store.Global.GetIntegrations())
}

// GetIntegration handles GET /api/integrations/:id
func GetIntegration(c *gin.Context) {
	integration, ok := store.Global.GetIntegrationByID(c.Param("id"))
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": "integração não encontrada"})
		return
	}
	c.JSON(http.StatusOK, integration)
}

// ConnectIntegration handles POST /api/integrations/:id/connect
func ConnectIntegration(c *gin.Context) {
	id := c.Param("id")
	integration, ok := store.Global.GetIntegrationByID(id)
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": "integração não encontrada"})
		return
	}
	now := time.Now().UTC().Format(time.RFC3339)
	integration.Status = "connected"
	integration.LastSync = &now
	updated, _ := store.Global.UpdateIntegration(id, integration)
	c.JSON(http.StatusOK, updated)
}

// DisconnectIntegration handles POST /api/integrations/:id/disconnect
func DisconnectIntegration(c *gin.Context) {
	id := c.Param("id")
	integration, ok := store.Global.GetIntegrationByID(id)
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": "integração não encontrada"})
		return
	}
	integration.Status = "disconnected"
	integration.LastSync = nil
	updated, _ := store.Global.UpdateIntegration(id, integration)
	c.JSON(http.StatusOK, updated)
}

// SyncIntegration handles POST /api/integrations/:id/sync
func SyncIntegration(c *gin.Context) {
	id := c.Param("id")
	integration, ok := store.Global.GetIntegrationByID(id)
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": "integração não encontrada"})
		return
	}
	now := time.Now().UTC().Format(time.RFC3339)
	integration.LastSync = &now
	updated, _ := store.Global.UpdateIntegration(id, integration)
	c.JSON(http.StatusOK, updated)
}
