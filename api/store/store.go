package store

import (
	"fmt"
	"strings"
	"sync"
	"time"

	"pulse-metrics-api/models"
	"pulse-metrics-api/seed"
)

// Store is the in-memory data store protected by a RWMutex.
type Store struct {
	mu            sync.RWMutex
	campaigns     []models.Campaign
	audiences     []models.Audience
	reports       []models.Report
	users         []models.User
	integrations  []models.Integration
	notifications []models.Notification
	timeSeries    map[string][]models.TimePoint
	overview      models.MetricsOverview
	byChannel     []models.ChannelMetrics
	funnel        models.FunnelMetrics
	engagement    models.EngagementMetrics
}

var Global = &Store{}

// Init seeds the store with initial data.
func Init() {
	Global.campaigns = seed.Campaigns()
	Global.audiences = seed.Audiences()
	Global.reports = seed.Reports()
	Global.users = seed.Users()
	Global.integrations = seed.Integrations()
	Global.notifications = seed.Notifications()

	Global.timeSeries = map[string][]models.TimePoint{
		"impressions": seed.GenerateTimeSeries(90, 200000, 80000),
		"clicks":      seed.GenerateTimeSeries(90, 5000, 2000),
		"conversions": seed.GenerateTimeSeries(90, 250, 100),
		"revenue":     seed.GenerateTimeSeries(90, 12000, 5000),
		"ctr":         seed.GenerateTimeSeries(90, 2.5, 1.0),
	}

	Global.overview = models.MetricsOverview{
		TotalImpressions: 18750000,
		TotalClicks:      451250,
		TotalConversions: 22050,
		TotalSpent:       271100,
		AverageCTR:       2.41,
		AverageROAS:      3.6,
		TotalRevenue:     975960,
	}

	Global.byChannel = []models.ChannelMetrics{
		{Channel: "Google", Impressions: 7200000, Clicks: 180000, Conversions: 9000, Spent: 105000},
		{Channel: "Meta", Impressions: 6500000, Clicks: 156000, Conversions: 7800, Spent: 89000},
		{Channel: "Email", Impressions: 262000, Clicks: 27000, Conversions: 1700, Spent: 8100},
		{Channel: "Orgânico", Impressions: 320000, Clicks: 16000, Conversions: 480, Spent: 3200},
		{Channel: "YouTube", Impressions: 2100000, Clicks: 21000, Conversions: 630, Spent: 15600},
		{Channel: "TikTok", Impressions: 3200000, Clicks: 48000, Conversions: 960, Spent: 9500},
		{Channel: "LinkedIn", Impressions: 185000, Clicks: 3700, Conversions: 185, Spent: 11200},
		{Channel: "Outros", Impressions: 650000, Clicks: 16250, Conversions: 813, Spent: 29500},
	}

	Global.funnel = models.FunnelMetrics{
		Impressions:      18750000,
		Clicks:           451250,
		LandingPageViews: 360000,
		AddToCart:        108000,
		Checkout:         54000,
		Conversions:      22050,
	}

	Global.engagement = models.EngagementMetrics{
		SessionDuration: 248,
		BounceRate:      42.3,
		PagesPerSession: 3.8,
		ReturnVisitors:  38.5,
	}
}

// ── Campaigns ──────────────────────────────────────────────────────────────

func (s *Store) GetCampaigns(status, search, channel string) []models.Campaign {
	s.mu.RLock()
	defer s.mu.RUnlock()
	result := make([]models.Campaign, 0, len(s.campaigns))
	for _, c := range s.campaigns {
		if status != "" && status != "all" && c.Status != status {
			continue
		}
		if search != "" && !strings.Contains(strings.ToLower(c.Name), strings.ToLower(search)) {
			continue
		}
		if channel != "" && channel != "all" && c.Channel != channel {
			continue
		}
		result = append(result, c)
	}
	return result
}

func (s *Store) GetCampaignByID(id string) (models.Campaign, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	for _, c := range s.campaigns {
		if c.ID == id {
			return c, true
		}
	}
	return models.Campaign{}, false
}

func (s *Store) CreateCampaign(c models.Campaign) models.Campaign {
	c.ID = fmt.Sprintf("%d", time.Now().UnixMilli())
	s.mu.Lock()
	s.campaigns = append(s.campaigns, c)
	s.mu.Unlock()
	return c
}

func (s *Store) UpdateCampaign(id string, updated models.Campaign) (models.Campaign, bool) {
	s.mu.Lock()
	defer s.mu.Unlock()
	for i, c := range s.campaigns {
		if c.ID == id {
			updated.ID = id
			s.campaigns[i] = updated
			return updated, true
		}
	}
	return models.Campaign{}, false
}

func (s *Store) DeleteCampaign(id string) bool {
	s.mu.Lock()
	defer s.mu.Unlock()
	for i, c := range s.campaigns {
		if c.ID == id {
			s.campaigns = append(s.campaigns[:i], s.campaigns[i+1:]...)
			return true
		}
	}
	return false
}

// ── Metrics ────────────────────────────────────────────────────────────────

func (s *Store) GetOverview() models.MetricsOverview {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return s.overview
}

func (s *Store) GetTimeSeries(metric string) []models.TimePoint {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return s.timeSeries[metric]
}

func (s *Store) GetByChannel() []models.ChannelMetrics {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return s.byChannel
}

func (s *Store) GetFunnel() models.FunnelMetrics {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return s.funnel
}

func (s *Store) GetEngagement() models.EngagementMetrics {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return s.engagement
}

// ── Audiences ──────────────────────────────────────────────────────────────

func (s *Store) GetAudiences() []models.Audience {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return append([]models.Audience{}, s.audiences...)
}

func (s *Store) GetAudienceByID(id string) (models.Audience, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	for _, a := range s.audiences {
		if a.ID == id {
			return a, true
		}
	}
	return models.Audience{}, false
}

func (s *Store) CreateAudience(a models.Audience) models.Audience {
	a.ID = fmt.Sprintf("segment-%d", time.Now().UnixMilli())
	s.mu.Lock()
	s.audiences = append(s.audiences, a)
	s.mu.Unlock()
	return a
}

// ── Reports ────────────────────────────────────────────────────────────────

func (s *Store) GetReports() []models.Report {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return append([]models.Report{}, s.reports...)
}

func (s *Store) GetReportByID(id string) (models.Report, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	for _, r := range s.reports {
		if r.ID == id {
			return r, true
		}
	}
	return models.Report{}, false
}

func (s *Store) CreateReport(r models.Report) models.Report {
	r.ID = fmt.Sprintf("report-%d", time.Now().UnixMilli())
	r.Status = "generating"
	now := time.Now().Format("2006-01-02")
	r.CreatedAt = now
	s.mu.Lock()
	s.reports = append(s.reports, r)
	s.mu.Unlock()
	return r
}

func (s *Store) DeleteReport(id string) bool {
	s.mu.Lock()
	defer s.mu.Unlock()
	for i, r := range s.reports {
		if r.ID == id {
			s.reports = append(s.reports[:i], s.reports[i+1:]...)
			return true
		}
	}
	return false
}

func (s *Store) GenerateReport(id string) (models.Report, bool) {
	s.mu.Lock()
	defer s.mu.Unlock()
	for i, r := range s.reports {
		if r.ID == id {
			s.reports[i].Status = "ready"
			now := time.Now().Format("2006-01-02")
			s.reports[i].LastRun = &now
			return s.reports[i], true
		}
	}
	return models.Report{}, false
}

// ── Users ──────────────────────────────────────────────────────────────────

func (s *Store) GetUsers() []models.User {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return append([]models.User{}, s.users...)
}

func (s *Store) GetUserByID(id string) (models.User, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	for _, u := range s.users {
		if u.ID == id {
			return u, true
		}
	}
	return models.User{}, false
}

func (s *Store) GetUserByEmail(email string) (models.User, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	for _, u := range s.users {
		if strings.EqualFold(u.Email, email) {
			return u, true
		}
	}
	return models.User{}, false
}

func (s *Store) UpdateUser(id string, updated models.User) (models.User, bool) {
	s.mu.Lock()
	defer s.mu.Unlock()
	for i, u := range s.users {
		if u.ID == id {
			updated.ID = id
			s.users[i] = updated
			return updated, true
		}
	}
	return models.User{}, false
}

// ── Integrations ───────────────────────────────────────────────────────────

func (s *Store) GetIntegrations() []models.Integration {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return append([]models.Integration{}, s.integrations...)
}

func (s *Store) GetIntegrationByID(id string) (models.Integration, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	for _, ig := range s.integrations {
		if ig.ID == id {
			return ig, true
		}
	}
	return models.Integration{}, false
}

func (s *Store) UpdateIntegration(id string, updated models.Integration) (models.Integration, bool) {
	s.mu.Lock()
	defer s.mu.Unlock()
	for i, ig := range s.integrations {
		if ig.ID == id {
			updated.ID = id
			s.integrations[i] = updated
			return updated, true
		}
	}
	return models.Integration{}, false
}

// ── Notifications ──────────────────────────────────────────────────────────

func (s *Store) GetNotifications() []models.Notification {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return append([]models.Notification{}, s.notifications...)
}

func (s *Store) MarkNotificationRead(id string) bool {
	s.mu.Lock()
	defer s.mu.Unlock()
	for i, n := range s.notifications {
		if n.ID == id {
			s.notifications[i].Read = true
			return true
		}
	}
	return false
}

func (s *Store) MarkAllNotificationsRead() {
	s.mu.Lock()
	defer s.mu.Unlock()
	for i := range s.notifications {
		s.notifications[i].Read = true
	}
}
