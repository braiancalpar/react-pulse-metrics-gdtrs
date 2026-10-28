import React from "react";
import styled from "styled-components";

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MetricCard = styled.div<{ color: string }>`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${(props) => props.color};
`;

const KPIRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;

const KPICard = styled.div`
  flex: 1;
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

interface Metrics {
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  totalSpend: number;
  avgCTR: number;
  avgCVR: number;
}

interface Props {
  metrics: Metrics;
  activeCampaignsCount: number;
}

function formatNumber(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString("pt-BR");
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(n);
}

const MetricsOverview: React.FC<Props> = ({
  metrics,
  activeCampaignsCount,
}) => {
  const {
    totalImpressions,
    totalClicks,
    totalConversions,
    totalSpend,
    avgCTR,
    avgCVR,
  } = metrics;
  const cpc = totalClicks > 0 ? totalSpend / totalClicks : 0;

  return (
    <>
      <MetricsGrid>
        <MetricCard color="#6c63ff">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <p style={{ color: "#718096", fontSize: 13, margin: "0 0 8px" }}>
                Impressões Totais
              </p>
              <h2
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  margin: 0,
                  color: "#2d3748",
                }}
              >
                {formatNumber(totalImpressions)}
              </h2>
            </div>
            <div
              style={{ background: "#f0eeff", borderRadius: 8, padding: 10 }}
            >
              <span className="material-icons" style={{ fontSize: 22 }}>
                visibility
              </span>
            </div>
          </div>
          <p style={{ margin: "8px 0 0", fontSize: 13, color: "#38a169" }}>
            ↑ 12.5% vs período anterior
          </p>
        </MetricCard>

        <MetricCard color="#48bb78">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <p style={{ color: "#718096", fontSize: 13, margin: "0 0 8px" }}>
                Total de Cliques
              </p>
              <h2
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  margin: 0,
                  color: "#2d3748",
                }}
              >
                {totalClicks.toLocaleString("pt-BR")}
              </h2>
            </div>
            <div
              style={{ background: "#f0fff4", borderRadius: 8, padding: 10 }}
            >
              <span className="material-icons" style={{ fontSize: 22 }}>
                ads_click
              </span>
            </div>
          </div>
          <p style={{ margin: "8px 0 0", fontSize: 13, color: "#38a169" }}>
            ↑ 8.3% vs período anterior
          </p>
        </MetricCard>

        <MetricCard color="#ed8936">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <p style={{ color: "#718096", fontSize: 13, margin: "0 0 8px" }}>
                Conversões
              </p>
              <h2
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  margin: 0,
                  color: "#2d3748",
                }}
              >
                {totalConversions.toLocaleString("pt-BR")}
              </h2>
            </div>
            <div
              style={{ background: "#fffaf0", borderRadius: 8, padding: 10 }}
            >
              <span className="material-icons" style={{ fontSize: 22 }}>
                track_changes
              </span>
            </div>
          </div>
          <p style={{ margin: "8px 0 0", fontSize: 13, color: "#e53e3e" }}>
            ↓ 2.1% vs período anterior
          </p>
        </MetricCard>

        <MetricCard color="#e53e3e">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <p style={{ color: "#718096", fontSize: 13, margin: "0 0 8px" }}>
                Gasto Total
              </p>
              <h2
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  margin: 0,
                  color: "#2d3748",
                }}
              >
                {formatCurrency(totalSpend)}
              </h2>
            </div>
            <div
              style={{ background: "#fff5f5", borderRadius: 8, padding: 10 }}
            >
              <span className="material-icons" style={{ fontSize: 22 }}>
                payments
              </span>
            </div>
          </div>
          <p style={{ margin: "8px 0 0", fontSize: 13, color: "#38a169" }}>
            ROI:{" "}
            {totalSpend > 0
              ? (
                  ((totalConversions * 150 - totalSpend) / totalSpend) *
                  100
                ).toFixed(1)
              : "0"}
            %
          </p>
        </MetricCard>
      </MetricsGrid>

      <KPIRow>
        <KPICard>
          <p style={{ color: "#718096", fontSize: 13, margin: "0 0 4px" }}>
            CTR Médio
          </p>
          <h3
            style={{
              fontSize: 22,
              fontWeight: 700,
              margin: 0,
              color: "#2d3748",
            }}
          >
            {avgCTR.toFixed(2)}%
          </h3>
        </KPICard>
        <KPICard>
          <p style={{ color: "#718096", fontSize: 13, margin: "0 0 4px" }}>
            Taxa de Conversão
          </p>
          <h3
            style={{
              fontSize: 22,
              fontWeight: 700,
              margin: 0,
              color: "#2d3748",
            }}
          >
            {avgCVR.toFixed(2)}%
          </h3>
        </KPICard>
        <KPICard>
          <p style={{ color: "#718096", fontSize: 13, margin: "0 0 4px" }}>
            Campanhas Ativas
          </p>
          <h3
            style={{
              fontSize: 22,
              fontWeight: 700,
              margin: 0,
              color: "#2d3748",
            }}
          >
            {activeCampaignsCount}
          </h3>
        </KPICard>
        <KPICard>
          <p style={{ color: "#718096", fontSize: 13, margin: "0 0 4px" }}>
            CPC Médio
          </p>
          <h3
            style={{
              fontSize: 22,
              fontWeight: 700,
              margin: 0,
              color: "#2d3748",
            }}
          >
            {cpc > 0 ? formatCurrency(cpc) : "R$ 0,00"}
          </h3>
        </KPICard>
      </KPIRow>
    </>
  );
};

export default MetricsOverview;
