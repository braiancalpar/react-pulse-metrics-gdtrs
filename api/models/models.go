package models

// CampaignMetrics holds performance KPIs for a campaign.
type CampaignMetrics struct {
	Impressions int     `json:"impressions"`
	Clicks      int     `json:"clicks"`
	Conversions int     `json:"conversions"`
	CTR         float64 `json:"ctr"`
	CPC         float64 `json:"cpc"`
	ROAS        float64 `json:"roas"`
}

// Campaign represents a marketing campaign.
type Campaign struct {
	ID        string          `json:"id"`
	Name      string          `json:"name"`
	Status    string          `json:"status"`
	Budget    float64         `json:"budget"`
	Spent     float64         `json:"spent"`
	StartDate string          `json:"startDate"`
	EndDate   string          `json:"endDate"`
	Channel   string          `json:"channel"`
	Objective string          `json:"objective"`
	Metrics   CampaignMetrics `json:"metrics"`
	Audience  string          `json:"audience"`
	CreatedBy string          `json:"createdBy"`
}

// TimePoint is a single data point in a time series.
type TimePoint struct {
	Date  string  `json:"date"`
	Value float64 `json:"value"`
}

// MetricsOverview holds high-level aggregate metrics.
type MetricsOverview struct {
	TotalImpressions int     `json:"totalImpressions"`
	TotalClicks      int     `json:"totalClicks"`
	TotalConversions int     `json:"totalConversions"`
	TotalSpent       float64 `json:"totalSpent"`
	AverageCTR       float64 `json:"averageCTR"`
	AverageROAS      float64 `json:"averageROAS"`
	TotalRevenue     float64 `json:"totalRevenue"`
}

// ChannelMetrics holds aggregated metrics per channel.
type ChannelMetrics struct {
	Channel     string  `json:"channel"`
	Impressions int     `json:"impressions"`
	Clicks      int     `json:"clicks"`
	Conversions int     `json:"conversions"`
	Spent       float64 `json:"spent"`
}

// FunnelMetrics represents the conversion funnel.
type FunnelMetrics struct {
	Impressions    int `json:"impressions"`
	Clicks         int `json:"clicks"`
	LandingPageViews int `json:"landingPageViews"`
	AddToCart      int `json:"addToCart"`
	Checkout       int `json:"checkout"`
	Conversions    int `json:"conversions"`
}

// EngagementMetrics holds user engagement KPIs.
type EngagementMetrics struct {
	SessionDuration float64 `json:"sessionDuration"`
	BounceRate      float64 `json:"bounceRate"`
	PagesPerSession float64 `json:"pagesPerSession"`
	ReturnVisitors  float64 `json:"returnVisitors"`
}

// Demographics holds demographic data for an audience segment.
type Demographics struct {
	AgeRange  string         `json:"ageRange"`
	Gender    map[string]int `json:"gender"`
	TopCities []string       `json:"topCities"`
}

// Audience represents a marketing audience segment.
type Audience struct {
	ID              string       `json:"id"`
	Name            string       `json:"name"`
	Size            int          `json:"size"`
	Type            string       `json:"type"`
	Description     string       `json:"description"`
	Demographics    Demographics `json:"demographics"`
	AvgOrderValue   float64      `json:"avgOrderValue"`
	LifetimeValue   float64      `json:"lifetimeValue"`
	CreatedAt       string       `json:"createdAt"`
}

// ReportDateRange represents the date range for a report.
type ReportDateRange struct {
	StartDate string `json:"startDate"`
	EndDate   string `json:"endDate"`
}

// ReportSchedule represents a recurring report schedule.
type ReportSchedule struct {
	Frequency  string `json:"frequency"`
	DayOfWeek  *int   `json:"dayOfWeek,omitempty"`
	DayOfMonth *int   `json:"dayOfMonth,omitempty"`
	Hour       *int   `json:"hour,omitempty"`
}

// Report represents a generated analytics report.
type Report struct {
	ID        string           `json:"id"`
	Name      string           `json:"name"`
	Type      string           `json:"type"`
	Status    string           `json:"status"`
	CreatedBy string           `json:"createdBy"`
	CreatedAt string           `json:"createdAt"`
	LastRun   *string          `json:"lastRun"`
	Schedule  *ReportSchedule  `json:"schedule"`
	Metrics   []string         `json:"metrics"`
	DateRange ReportDateRange  `json:"dateRange"`
}

// User represents a team member.
type User struct {
	ID          string   `json:"id"`
	Name        string   `json:"name"`
	Email       string   `json:"email"`
	Role        string   `json:"role"`
	Avatar      *string  `json:"avatar"`
	Department  string   `json:"department"`
	JoinedAt    string   `json:"joinedAt"`
	LastActive  string   `json:"lastActive"`
	Permissions []string `json:"permissions"`
}

// Integration represents a third-party integration.
type Integration struct {
	ID       string  `json:"id"`
	Name     string  `json:"name"`
	Status   string  `json:"status"`
	LastSync *string `json:"lastSync"`
}

// Notification represents a system notification.
type Notification struct {
	ID        string `json:"id"`
	Type      string `json:"type"`
	Message   string `json:"message"`
	Read      bool   `json:"read"`
	CreatedAt string `json:"createdAt"`
}
