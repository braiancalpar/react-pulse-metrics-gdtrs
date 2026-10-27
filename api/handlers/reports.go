package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"pulse-metrics-api/models"
	"pulse-metrics-api/store"
)

// GetReports handles GET /api/reports
func GetReports(c *gin.Context) {
	c.JSON(http.StatusOK, store.Global.GetReports())
}

// GetReport handles GET /api/reports/:id
func GetReport(c *gin.Context) {
	report, ok := store.Global.GetReportByID(c.Param("id"))
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": "relatório não encontrado"})
		return
	}
	c.JSON(http.StatusOK, report)
}

// CreateReport handles POST /api/reports
func CreateReport(c *gin.Context) {
	var body models.Report
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	created := store.Global.CreateReport(body)
	c.JSON(http.StatusCreated, created)
}

// DeleteReport handles DELETE /api/reports/:id
func DeleteReport(c *gin.Context) {
	if !store.Global.DeleteReport(c.Param("id")) {
		c.JSON(http.StatusNotFound, gin.H{"error": "relatório não encontrado"})
		return
	}
	c.Status(http.StatusNoContent)
}

// GenerateReport handles POST /api/reports/:id/generate
func GenerateReport(c *gin.Context) {
	report, ok := store.Global.GenerateReport(c.Param("id"))
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": "relatório não encontrado"})
		return
	}
	c.JSON(http.StatusOK, report)
}
