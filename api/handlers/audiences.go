package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"pulse-metrics-api/models"
	"pulse-metrics-api/store"
)

// GetAudiences handles GET /api/audiences
func GetAudiences(c *gin.Context) {
	c.JSON(http.StatusOK, store.Global.GetAudiences())
}

// GetAudience handles GET /api/audiences/:id
func GetAudience(c *gin.Context) {
	audience, ok := store.Global.GetAudienceByID(c.Param("id"))
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": "audiência não encontrada"})
		return
	}
	c.JSON(http.StatusOK, audience)
}

// CreateAudience handles POST /api/audiences
func CreateAudience(c *gin.Context) {
	var body models.Audience
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	created := store.Global.CreateAudience(body)
	c.JSON(http.StatusCreated, created)
}
