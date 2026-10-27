import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// TODO: usar lazy loading — por enquanto imports diretos causam bundle grande
import DashboardPage from './pages/DashboardPage';
import CampaignsListPage from './pages/campaigns/CampaignsListPage';
import CampaignDetailPage from './pages/campaigns/CampaignDetailPage';
import CampaignCreatePage from './pages/campaigns/CampaignCreatePage';
import CampaignEditPage from './pages/campaigns/CampaignEditPage';
import CampaignAnalyticsPage from './pages/campaigns/CampaignAnalyticsPage';
import CampaignAudiencePage from './pages/campaigns/CampaignAudiencePage';
import CampaignCreativesPage from './pages/campaigns/CampaignCreativesPage';
import CampaignOptimizationPage from './pages/campaigns/CampaignOptimizationPage';
import MetricsOverviewPage from './pages/metrics/MetricsOverviewPage';
import MetricsEngagementPage from './pages/metrics/MetricsEngagementPage';
import MetricsConversionPage from './pages/metrics/MetricsConversionPage';
import MetricsFunnelPage from './pages/metrics/MetricsFunnelPage';
import MetricsComparisonPage from './pages/metrics/MetricsComparisonPage';
import MetricsGoalsPage from './pages/metrics/MetricsGoalsPage';
import MetricsTrendsPage from './pages/metrics/MetricsTrendsPage';
import LoginPage from './pages/auth/LoginPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';

// FIXME: PrivateRoute não implementada — qualquer um acessa tudo
// TODO: implementar guard de autenticação adequado

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Carregando...</div>}>
              <Switch>
                {/* Auth */}
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/forgot-password" component={ForgotPasswordPage} />
                <Route exact path="/reset-password/:token" component={ResetPasswordPage} />

                {/* Dashboard */}
                <Route exact path="/" component={DashboardPage} />
                <Route exact path="/dashboard" component={DashboardPage} />

                {/* Campaigns */}
                <Route exact path="/campaigns" component={CampaignsListPage} />
                <Route exact path="/campaigns/new" component={CampaignCreatePage} />
                <Route exact path="/campaigns/:id" component={CampaignDetailPage} />
                <Route exact path="/campaigns/:id/edit" component={CampaignEditPage} />
                <Route exact path="/campaigns/:id/analytics" component={CampaignAnalyticsPage} />
                <Route exact path="/campaigns/:id/audience" component={CampaignAudiencePage} />
                <Route exact path="/campaigns/:id/creatives" component={CampaignCreativesPage} />
                <Route exact path="/campaigns/:id/optimization" component={CampaignOptimizationPage} />

                {/* Metrics */}
                <Route exact path="/metrics" component={MetricsOverviewPage} />
                <Route exact path="/metrics/engagement" component={MetricsEngagementPage} />
                <Route exact path="/metrics/conversion" component={MetricsConversionPage} />
                <Route exact path="/metrics/funnel" component={MetricsFunnelPage} />
                <Route exact path="/metrics/comparison" component={MetricsComparisonPage} />
                <Route exact path="/metrics/goals" component={MetricsGoalsPage} />
                <Route exact path="/metrics/trends" component={MetricsTrendsPage} />

                {/* 404 — redireciona para dashboard */}
                <Redirect to="/" />
              </Switch>
            </Suspense>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
