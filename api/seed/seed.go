package seed

import (
	"math"
	"math/rand"
	"time"

	"pulse-metrics-api/models"
)

func ptr[T any](v T) *T { return &v }

// GenerateTimeSeries creates a slice of TimePoints for the given number of days.
func GenerateTimeSeries(days int, baseValue, variance float64) []models.TimePoint {
	r := rand.New(rand.NewSource(42)) // fixed seed for reproducibility
	now := time.Now()
	points := make([]models.TimePoint, days+1)
	for i := days; i >= 0; i-- {
		d := now.AddDate(0, 0, -i)
		v := baseValue + (r.Float64()-0.5)*variance
		if v < 0 {
			v = 0
		}
		points[days-i] = models.TimePoint{
			Date:  d.Format("2006-01-02"),
			Value: math.Round(v),
		}
	}
	return points
}

// Campaigns returns the seed campaign list (mirrors src/mocks/campaigns.ts).
func Campaigns() []models.Campaign {
	return []models.Campaign{
		{ID: "1", Name: "Campanha Black Friday 2023", Status: "ended", Budget: 50000, Spent: 48750, StartDate: "2023-11-20", EndDate: "2023-11-30", Channel: "google", Objective: "conversao", Metrics: models.CampaignMetrics{Impressions: 1250000, Clicks: 37500, Conversions: 1875, CTR: 3.0, CPC: 1.30, ROAS: 3.8}, Audience: "segment-1", CreatedBy: "user-1"},
		{ID: "2", Name: "Awareness Q1 2024", Status: "active", Budget: 30000, Spent: 12400, StartDate: "2024-01-15", EndDate: "2024-03-31", Channel: "meta", Objective: "awareness", Metrics: models.CampaignMetrics{Impressions: 890000, Clicks: 17800, Conversions: 534, CTR: 2.0, CPC: 0.70, ROAS: 1.2}, Audience: "segment-2", CreatedBy: "user-2"},
		{ID: "3", Name: "Retargeting Carrinho Abandonado", Status: "active", Budget: 15000, Spent: 8200, StartDate: "2024-02-01", EndDate: "2024-04-30", Channel: "google", Objective: "conversao", Metrics: models.CampaignMetrics{Impressions: 245000, Clicks: 12250, Conversions: 980, CTR: 5.0, CPC: 0.84, ROAS: 5.1}, Audience: "segment-3", CreatedBy: "user-1"},
		{ID: "4", Name: "Lançamento Produto X", Status: "paused", Budget: 25000, Spent: 9800, StartDate: "2024-01-10", EndDate: "2024-02-28", Channel: "meta", Objective: "conversao", Metrics: models.CampaignMetrics{Impressions: 420000, Clicks: 8400, Conversions: 252, CTR: 2.0, CPC: 1.17, ROAS: 2.3}, Audience: "segment-1", CreatedBy: "user-3"},
		{ID: "5", Name: "Email Marketing Reativação", Status: "active", Budget: 5000, Spent: 2100, StartDate: "2024-02-15", EndDate: "2024-05-15", Channel: "email", Objective: "retencao", Metrics: models.CampaignMetrics{Impressions: 85000, Clicks: 6800, Conversions: 340, CTR: 8.0, CPC: 0.31, ROAS: 4.2}, Audience: "segment-4", CreatedBy: "user-2"},
		{ID: "6", Name: "SEO Conteúdo Blog", Status: "active", Budget: 8000, Spent: 3200, StartDate: "2024-01-01", EndDate: "2024-12-31", Channel: "organico", Objective: "awareness", Metrics: models.CampaignMetrics{Impressions: 320000, Clicks: 16000, Conversions: 480, CTR: 5.0, CPC: 0.20, ROAS: 2.8}, Audience: "segment-5", CreatedBy: "user-1"},
		{ID: "7", Name: "Video Ads YouTube", Status: "paused", Budget: 20000, Spent: 15600, StartDate: "2023-12-01", EndDate: "2024-01-31", Channel: "youtube", Objective: "awareness", Metrics: models.CampaignMetrics{Impressions: 2100000, Clicks: 21000, Conversions: 630, CTR: 1.0, CPC: 0.74, ROAS: 1.8}, Audience: "segment-2", CreatedBy: "user-3"},
		{ID: "8", Name: "Promoção Dia das Mães", Status: "draft", Budget: 35000, Spent: 0, StartDate: "2024-05-01", EndDate: "2024-05-12", Channel: "meta", Objective: "conversao", Metrics: models.CampaignMetrics{}, Audience: "segment-1", CreatedBy: "user-1"},
		{ID: "9", Name: "Afiliados Programa Parceiros", Status: "active", Budget: 12000, Spent: 6800, StartDate: "2024-01-15", EndDate: "2024-06-30", Channel: "afiliados", Objective: "conversao", Metrics: models.CampaignMetrics{Impressions: 560000, Clicks: 22400, Conversions: 1120, CTR: 4.0, CPC: 0.30, ROAS: 6.2}, Audience: "segment-3", CreatedBy: "user-2"},
		{ID: "10", Name: "Push Notification App", Status: "active", Budget: 3000, Spent: 1200, StartDate: "2024-02-20", EndDate: "2024-04-20", Channel: "push", Objective: "engajamento", Metrics: models.CampaignMetrics{Impressions: 95000, Clicks: 9500, Conversions: 285, CTR: 10.0, CPC: 0.13, ROAS: 3.5}, Audience: "segment-4", CreatedBy: "user-1"},
		{ID: "11", Name: "Google Shopping Linha Premium", Status: "active", Budget: 40000, Spent: 28500, StartDate: "2024-01-20", EndDate: "2024-06-30", Channel: "google", Objective: "conversao", Metrics: models.CampaignMetrics{Impressions: 980000, Clicks: 29400, Conversions: 2352, CTR: 3.0, CPC: 0.97, ROAS: 4.7}, Audience: "segment-5", CreatedBy: "user-3"},
		{ID: "12", Name: "Influencer Marketing Micro", Status: "ended", Budget: 18000, Spent: 17800, StartDate: "2023-11-01", EndDate: "2023-12-31", Channel: "influencer", Objective: "awareness", Metrics: models.CampaignMetrics{Impressions: 1450000, Clicks: 29000, Conversions: 870, CTR: 2.0, CPC: 0.61, ROAS: 2.1}, Audience: "segment-2", CreatedBy: "user-2"},
		{ID: "13", Name: "Webinar Lead Generation", Status: "ended", Budget: 6000, Spent: 5800, StartDate: "2023-10-15", EndDate: "2023-11-15", Channel: "email", Objective: "leads", Metrics: models.CampaignMetrics{Impressions: 45000, Clicks: 6750, Conversions: 675, CTR: 15.0, CPC: 0.44, ROAS: 3.2}, Audience: "segment-1", CreatedBy: "user-1"},
		{ID: "14", Name: "Display Remarketing", Status: "active", Budget: 10000, Spent: 4200, StartDate: "2024-02-10", EndDate: "2024-05-10", Channel: "google", Objective: "retencao", Metrics: models.CampaignMetrics{Impressions: 1800000, Clicks: 18000, Conversions: 720, CTR: 1.0, CPC: 0.23, ROAS: 3.0}, Audience: "segment-3", CreatedBy: "user-3"},
		{ID: "15", Name: "TikTok Ads Gen Z", Status: "active", Budget: 22000, Spent: 9500, StartDate: "2024-02-01", EndDate: "2024-04-30", Channel: "tiktok", Objective: "awareness", Metrics: models.CampaignMetrics{Impressions: 3200000, Clicks: 48000, Conversions: 960, CTR: 1.5, CPC: 0.20, ROAS: 1.5}, Audience: "segment-2", CreatedBy: "user-2"},
		{ID: "16", Name: "Cashback Fidelidade Q1", Status: "paused", Budget: 16000, Spent: 7200, StartDate: "2024-01-05", EndDate: "2024-03-31", Channel: "crm", Objective: "retencao", Metrics: models.CampaignMetrics{Impressions: 68000, Clicks: 8160, Conversions: 816, CTR: 12.0, CPC: 0.44, ROAS: 4.8}, Audience: "segment-4", CreatedBy: "user-1"},
		{ID: "17", Name: "LinkedIn B2B Enterprise", Status: "active", Budget: 28000, Spent: 11200, StartDate: "2024-02-01", EndDate: "2024-07-31", Channel: "linkedin", Objective: "leads", Metrics: models.CampaignMetrics{Impressions: 185000, Clicks: 3700, Conversions: 185, CTR: 2.0, CPC: 3.03, ROAS: 2.8}, Audience: "segment-5", CreatedBy: "user-3"},
		{ID: "18", Name: "Natal 2023 Mega Oferta", Status: "ended", Budget: 75000, Spent: 74200, StartDate: "2023-12-01", EndDate: "2023-12-26", Channel: "meta", Objective: "conversao", Metrics: models.CampaignMetrics{Impressions: 4500000, Clicks: 112500, Conversions: 9000, CTR: 2.5, CPC: 0.66, ROAS: 5.2}, Audience: "segment-1", CreatedBy: "user-1"},
		{ID: "19", Name: "Prospecting Cold Traffic", Status: "active", Budget: 18000, Spent: 7800, StartDate: "2024-02-15", EndDate: "2024-05-15", Channel: "meta", Objective: "awareness", Metrics: models.CampaignMetrics{Impressions: 1100000, Clicks: 22000, Conversions: 440, CTR: 2.0, CPC: 0.35, ROAS: 1.6}, Audience: "segment-2", CreatedBy: "user-2"},
		{ID: "20", Name: "Upsell Clientes Ativos", Status: "active", Budget: 9000, Spent: 3600, StartDate: "2024-02-20", EndDate: "2024-04-20", Channel: "email", Objective: "upsell", Metrics: models.CampaignMetrics{Impressions: 32000, Clicks: 5120, Conversions: 512, CTR: 16.0, CPC: 0.35, ROAS: 7.2}, Audience: "segment-3", CreatedBy: "user-1"},
	}
}

// Audiences returns the seed audience list (mirrors src/mocks/audiences.ts).
func Audiences() []models.Audience {
	return []models.Audience{
		{
			ID: "segment-1", Name: "Compradores Recorrentes", Size: 125000, Type: "crm",
			Description:   "Clientes que compraram mais de 2x nos últimos 6 meses",
			Demographics:  models.Demographics{AgeRange: "25-45", Gender: map[string]int{"female": 58, "male": 42}, TopCities: []string{"São Paulo", "Rio de Janeiro", "Curitiba"}},
			AvgOrderValue: 289, LifetimeValue: 1840, CreatedAt: "2023-06-15",
		},
		{
			ID: "segment-2", Name: "Lookalike Compradores", Size: 890000, Type: "lookalike",
			Description:   "Audiência similar aos compradores recorrentes",
			Demographics:  models.Demographics{AgeRange: "22-50", Gender: map[string]int{"female": 54, "male": 46}, TopCities: []string{"São Paulo", "Belo Horizonte", "Porto Alegre"}},
			AvgOrderValue: 180, LifetimeValue: 540, CreatedAt: "2023-08-20",
		},
		{
			ID: "segment-3", Name: "Carrinho Abandonado 30d", Size: 45000, Type: "behavioral",
			Description:   "Usuários que adicionaram ao carrinho mas não compraram nos últimos 30 dias",
			Demographics:  models.Demographics{AgeRange: "20-40", Gender: map[string]int{"female": 61, "male": 39}, TopCities: []string{"São Paulo", "Rio de Janeiro", "Brasília"}},
			AvgOrderValue: 0, LifetimeValue: 0, CreatedAt: "2024-01-05",
		},
		{
			ID: "segment-4", Name: "Clientes Inativos 90d", Size: 68000, Type: "crm",
			Description:   "Clientes que não compram há mais de 90 dias",
			Demographics:  models.Demographics{AgeRange: "28-55", Gender: map[string]int{"female": 49, "male": 51}, TopCities: []string{"São Paulo", "Salvador", "Fortaleza"}},
			AvgOrderValue: 210, LifetimeValue: 950, CreatedAt: "2023-09-10",
		},
		{
			ID: "segment-5", Name: "Alto Valor Potencial", Size: 32000, Type: "predictive",
			Description:   "Usuários com alta probabilidade de conversão de alto valor",
			Demographics:  models.Demographics{AgeRange: "30-50", Gender: map[string]int{"female": 45, "male": 55}, TopCities: []string{"São Paulo", "Curitiba", "Porto Alegre"}},
			AvgOrderValue: 520, LifetimeValue: 3200, CreatedAt: "2023-12-01",
		},
	}
}

// Reports returns the seed report list (mirrors src/mocks/reports.ts).
func Reports() []models.Report {
	dow1 := 1
	dom10 := 10
	h8 := 8
	lastRun1 := "2024-02-01"
	lastRun2 := "2024-01-05"
	lastRun3 := "2024-02-19"
	lastRun5 := "2024-02-10"
	lastRun6 := "2024-02-15"
	lastRun7 := "2024-02-21"
	lastRun8 := "2024-02-18"
	return []models.Report{
		{ID: "report-1", Name: "Performance Mensal - Janeiro 2024", Type: "performance", Status: "ready", CreatedBy: "user-1", CreatedAt: "2024-02-01", LastRun: &lastRun1, Schedule: nil, Metrics: []string{"impressions", "clicks", "conversions", "roas"}, DateRange: models.ReportDateRange{StartDate: "2024-01-01", EndDate: "2024-01-31"}},
		{ID: "report-2", Name: "Relatório Executivo Q4 2023", Type: "executive", Status: "ready", CreatedBy: "user-1", CreatedAt: "2024-01-05", LastRun: &lastRun2, Schedule: nil, Metrics: []string{"revenue", "roas", "cac", "ltv"}, DateRange: models.ReportDateRange{StartDate: "2023-10-01", EndDate: "2023-12-31"}},
		{ID: "report-3", Name: "Análise por Canal Semanal", Type: "channel", Status: "ready", CreatedBy: "user-2", CreatedAt: "2024-01-15", LastRun: &lastRun3, Schedule: &models.ReportSchedule{Frequency: "weekly", DayOfWeek: &dow1}, Metrics: []string{"impressions", "clicks", "ctr", "cpc"}, DateRange: models.ReportDateRange{StartDate: "2024-02-12", EndDate: "2024-02-18"}},
		{ID: "report-4", Name: "Funil de Conversão", Type: "funnel", Status: "generating", CreatedBy: "user-2", CreatedAt: "2024-02-20", LastRun: nil, Schedule: nil, Metrics: []string{"sessions", "addToCart", "checkout", "conversions"}, DateRange: models.ReportDateRange{StartDate: "2024-02-01", EndDate: "2024-02-20"}},
		{ID: "report-5", Name: "Audiência e Segmentação", Type: "audience", Status: "ready", CreatedBy: "user-3", CreatedAt: "2024-01-20", LastRun: &lastRun5, Schedule: &models.ReportSchedule{Frequency: "monthly", DayOfMonth: &dom10}, Metrics: []string{"reach", "frequency", "engagement"}, DateRange: models.ReportDateRange{StartDate: "2024-01-01", EndDate: "2024-01-31"}},
		{ID: "report-6", Name: "Comparativo YoY", Type: "comparison", Status: "ready", CreatedBy: "user-1", CreatedAt: "2024-02-15", LastRun: &lastRun6, Schedule: nil, Metrics: []string{"revenue", "conversions", "roas", "spend"}, DateRange: models.ReportDateRange{StartDate: "2024-01-01", EndDate: "2024-02-15"}},
		{ID: "report-7", Name: "Dashboard Diário Automático", Type: "daily", Status: "ready", CreatedBy: "user-1", CreatedAt: "2023-08-01", LastRun: &lastRun7, Schedule: &models.ReportSchedule{Frequency: "daily", Hour: &h8}, Metrics: []string{"impressions", "clicks", "conversions", "spend"}, DateRange: models.ReportDateRange{StartDate: "2024-02-20", EndDate: "2024-02-20"}},
		{ID: "report-8", Name: "ROI por Campanha", Type: "roi", Status: "error", CreatedBy: "user-3", CreatedAt: "2024-02-18", LastRun: &lastRun8, Schedule: nil, Metrics: []string{"spend", "revenue", "roi", "roas"}, DateRange: models.ReportDateRange{StartDate: "2024-01-01", EndDate: "2024-02-18"}},
	}
}

// Users returns the seed user list (mirrors src/mocks/users.ts).
func Users() []models.User {
	return []models.User{
		{ID: "user-1", Name: "Ana Lima", Email: "ana.lima@pulsecompany.com", Role: "admin", Avatar: nil, Department: "Marketing", JoinedAt: "2021-03-15", LastActive: "2024-02-21", Permissions: []string{"read", "write", "delete", "admin"}},
		{ID: "user-2", Name: "Carlos Mendes", Email: "carlos.mendes@pulsecompany.com", Role: "editor", Avatar: nil, Department: "Growth", JoinedAt: "2022-07-20", LastActive: "2024-02-20", Permissions: []string{"read", "write"}},
		{ID: "user-3", Name: "Fernanda Costa", Email: "fernanda.costa@pulsecompany.com", Role: "viewer", Avatar: nil, Department: "Produto", JoinedAt: "2023-01-10", LastActive: "2024-02-19", Permissions: []string{"read"}},
	}
}

// Integrations returns the seed integration list.
func Integrations() []models.Integration {
	ls1 := "2024-02-21T08:00:00Z"
	ls2 := "2024-02-21T07:30:00Z"
	ls3 := "2024-02-21T08:00:00Z"
	ls5 := "2024-02-20T12:00:00Z"
	return []models.Integration{
		{ID: "google-ads", Name: "Google Ads", Status: "connected", LastSync: &ls1},
		{ID: "meta-ads", Name: "Meta Ads", Status: "connected", LastSync: &ls2},
		{ID: "google-analytics", Name: "Google Analytics 4", Status: "connected", LastSync: &ls3},
		{ID: "mailchimp", Name: "Mailchimp", Status: "disconnected", LastSync: nil},
		{ID: "hubspot", Name: "HubSpot", Status: "error", LastSync: &ls5},
	}
}

// Notifications returns the seed notification list.
func Notifications() []models.Notification {
	return []models.Notification{
		{ID: "1", Type: "warning", Message: "Campanha \"Lançamento Produto X\" com budget 80% consumido", Read: false, CreatedAt: "2024-02-21T09:00:00Z"},
		{ID: "2", Type: "info", Message: "Relatório semanal por canal disponível", Read: false, CreatedAt: "2024-02-21T08:00:00Z"},
		{ID: "3", Type: "success", Message: "Integração Google Ads sincronizada com sucesso", Read: true, CreatedAt: "2024-02-21T07:30:00Z"},
		{ID: "4", Type: "error", Message: "Falha na sincronização HubSpot - verificar credenciais", Read: false, CreatedAt: "2024-02-20T15:00:00Z"},
	}
}
