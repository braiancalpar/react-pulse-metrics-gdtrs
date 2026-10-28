import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { store } from "./redux/store";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Provider } from "react-redux";

// TODO: usar lazy loading — por enquanto imports diretos causam bundle grande
import DashboardPage from "./pages/DashboardPage";
import CampaignsListPage from "./pages/campaigns/CampaignsListPage";
import CampaignDetailPage from "./pages/campaigns/CampaignDetailPage";
import CampaignCreatePage from "./pages/campaigns/CampaignCreatePage";
import CampaignEditPage from "./pages/campaigns/CampaignEditPage";
import CampaignAnalyticsPage from "./pages/campaigns/CampaignAnalyticsPage";
import CampaignAudiencePage from "./pages/campaigns/CampaignAudiencePage";
import CampaignCreativesPage from "./pages/campaigns/CampaignCreativesPage";
import CampaignOptimizationPage from "./pages/campaigns/CampaignOptimizationPage";
import MetricsOverviewPage from "./pages/metrics/MetricsOverviewPage";
import MetricsEngagementPage from "./pages/metrics/MetricsEngagementPage";
import MetricsConversionPage from "./pages/metrics/MetricsConversionPage";
import MetricsFunnelPage from "./pages/metrics/MetricsFunnelPage";
import MetricsComparisonPage from "./pages/metrics/MetricsComparisonPage";
import MetricsGoalsPage from "./pages/metrics/MetricsGoalsPage";
import MetricsTrendsPage from "./pages/metrics/MetricsTrendsPage";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";

// FIXME: PrivateRoute não implementada — qualquer um acessa tudo
// TODO: implementar guard de autenticação adequado

const App: React.FC = () => (
  <Provider store={store}>
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Suspense
            fallback={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                Carregando...
              </div>
            }
          >
            <Routes>
              {/* Auth */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPasswordPage />}
              />

              {/* Dashboard */}
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />

              {/* Campaigns */}
              <Route path="/campaigns" element={<CampaignsListPage />} />
              <Route path="/campaigns/new" element={<CampaignCreatePage />} />
              <Route path="/campaigns/:id" element={<CampaignDetailPage />} />
              <Route
                path="/campaigns/:id/edit"
                element={<CampaignEditPage />}
              />
              <Route
                path="/campaigns/:id/analytics"
                element={<CampaignAnalyticsPage />}
              />
              <Route
                path="/campaigns/:id/audience"
                element={<CampaignAudiencePage />}
              />
              <Route
                path="/campaigns/:id/creatives"
                element={<CampaignCreativesPage />}
              />
              <Route
                path="/campaigns/:id/optimization"
                element={<CampaignOptimizationPage />}
              />

              {/* Metrics */}
              <Route path="/metrics" element={<MetricsOverviewPage />} />
              <Route
                path="/metrics/engagement"
                element={<MetricsEngagementPage />}
              />
              <Route
                path="/metrics/conversion"
                element={<MetricsConversionPage />}
              />
              <Route path="/metrics/funnel" element={<MetricsFunnelPage />} />
              <Route
                path="/metrics/comparison"
                element={<MetricsComparisonPage />}
              />
              <Route path="/metrics/goals" element={<MetricsGoalsPage />} />
              <Route path="/metrics/trends" element={<MetricsTrendsPage />} />

              {/* 404 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  </Provider>
);

export default App;
