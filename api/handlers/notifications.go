package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"pulse-metrics-api/store"
)

// GetNotifications handles GET /api/notifications
func GetNotifications(c *gin.Context) {
	c.JSON(http.StatusOK, store.Global.GetNotifications())
}

// MarkNotificationRead handles PUT /api/notifications/:id/read
func MarkNotificationRead(c *gin.Context) {
	if !store.Global.MarkNotificationRead(c.Param("id")) {
		c.JSON(http.StatusNotFound, gin.H{"error": "notificação não encontrada"})
		return
	}
	c.Status(http.StatusNoContent)
}

// MarkAllNotificationsRead handles PUT /api/notifications/read-all
func MarkAllNotificationsRead(c *gin.Context) {
	store.Global.MarkAllNotificationsRead()
	c.Status(http.StatusNoContent)
}
