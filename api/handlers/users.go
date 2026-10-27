package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"pulse-metrics-api/models"
	"pulse-metrics-api/store"
)

// GetTeam handles GET /api/users/team
func GetTeam(c *gin.Context) {
	c.JSON(http.StatusOK, store.Global.GetUsers())
}

// GetUser handles GET /api/users/:id
func GetUser(c *gin.Context) {
	user, ok := store.Global.GetUserByID(c.Param("id"))
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": "usuário não encontrado"})
		return
	}
	c.JSON(http.StatusOK, user)
}

// UpdateUser handles PUT /api/users/:id
func UpdateUser(c *gin.Context) {
	var body models.User
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	updated, ok := store.Global.UpdateUser(c.Param("id"), body)
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": "usuário não encontrado"})
		return
	}
	c.JSON(http.StatusOK, updated)
}

// InviteUser handles POST /api/users/invite
func InviteUser(c *gin.Context) {
	var body struct {
		Email string `json:"email" binding:"required"`
		Role  string `json:"role" binding:"required"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"email":  body.Email,
		"role":   body.Role,
		"status": "invited",
	})
}
