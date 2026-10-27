import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { useDashboardData } from "../hooks/useDashboardData";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import MetricsOverview from "./dashboard/MetricsOverview";
import { DashboardFilters } from "./dashboard/DashboardFilters";
import DashboardCharts from "./dashboard/DashboardCharts";
import CampaignDetailModal from "./dashboard/CampaignDetailModal";
import CampaignTable from "./CampaignTable";
import type { Campaign } from "../types/api";
import styled from "styled-components";

const DashboardWrapper = styled.div<{ theme: any }>`
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: ${(props) => (props.theme === "dark" ? "#1a1a2e" : "#f5f7fa")};
  min-height: 100vh;
`;

interface DashboardProps {
  initialTab?: string;
  showWelcome?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ showWelcome = true }) => {
  const history = useHistory();
  const { user } = useAuth();
  const { theme } = useTheme();
  const {
    loading,
    filters,
    filteredCampaigns,
    timeSeriesData,
    byChannelData,
    metrics,
    handleFilterChange,
  } = useDashboardData();

  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null,
  );
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const activeCampaignsCount = filteredCampaigns.filter(
    (c) => c.status === "active",
  ).length;
  const totalPages = Math.ceil(filteredCampaigns.length / pageSize);
  const title = showWelcome && user ? `Olá, ${user.name}` : "Dashboard";

  return (
    <DashboardWrapper theme={theme}>
      <DashboardHeader
        title={title}
        dateRange={filters.dateRange}
        onDateRangeChange={(v) => handleFilterChange("dateRange", v)}
      />

      <MetricsOverview
        metrics={metrics}
        activeCampaignsCount={activeCampaignsCount}
      />

      <DashboardCharts
        timeSeriesData={timeSeriesData}
        byChannelData={byChannelData}
      />

      <DashboardFilters
        statusFilter={filters.status}
        channelFilter={filters.channel}
        onStatusChange={(v) => handleFilterChange("status", v)}
        onChannelChange={(v) => handleFilterChange("channel", v)}
      />

      <CampaignTable
        campaigns={filteredCampaigns}
        loading={loading}
        sortField={sortField}
        sortOrder={sortOrder}
        selectedRows={selectedRows}
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={filteredCampaigns.length}
        theme={theme}
        filters={filters}
        onSort={(field) => {
          if (sortField === field)
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
          else {
            setSortField(field);
            setSortOrder("asc");
          }
        }}
        onSelectRow={(id) =>
          setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
          )
        }
        onSelectAll={() =>
          setSelectedRows((prev) =>
            prev.length === filteredCampaigns.length
              ? []
              : filteredCampaigns.map((c) => c.id),
          )
        }
        onPageChange={setCurrentPage}
        onCampaignClick={setSelectedCampaign}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onStatusChange={(_id, _status) => undefined}
      />

      {selectedCampaign && (
        <CampaignDetailModal
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
          onViewDetails={() =>
            history.push(`/campaigns/${selectedCampaign.id}`)
          }
        />
      )}
    </DashboardWrapper>
  );
};

export default Dashboard;
