import React from "react";
import styled from "styled-components";
import { LineChart } from "../Chart/LineChart";
import { PieChart } from "../Chart/PieChart";

const ChartsRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
`;

const ChartContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

interface ChannelData {
  channel: string;
  clicks: number;
}

interface Props {
  timeSeriesData: number[];
  byChannelData: ChannelData[];
}

const CHANNEL_COLORS = [
  "#6c63ff",
  "#10b981",
  "#f59e0b",
  "#3b82f6",
  "#ef4444",
  "#0891b2",
];

const DashboardCharts: React.FC<Props> = ({
  timeSeriesData,
  byChannelData,
}) => (
  <ChartsRow>
    <ChartContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h3
          style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "#2d3748" }}
        >
          Performance ao Longo do Tempo
        </h3>
        <div style={{ display: "flex", gap: 8 }}>
          {["impressoes", "cliques", "conversoes"].map((metric) => (
            <button
              key={metric}
              style={{
                padding: "4px 12px",
                border: "1px solid #e2e8f0",
                borderRadius: 20,
                background: "white",
                cursor: "pointer",
                fontSize: 12,
                color: "#718096",
              }}
            >
              {metric.charAt(0).toUpperCase() + metric.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <LineChart
        data={timeSeriesData.map((value, index) => ({
          date: new Date(index).toISOString(),
          value,
        }))}
        label="Cliques"
        color="#6c63ff"
        height={200}
      />
    </ChartContainer>

    <ChartContainer>
      <h3
        style={{
          margin: "0 0 16px",
          fontSize: 16,
          fontWeight: 600,
          color: "#2d3748",
        }}
      >
        Distribuição por Canal
      </h3>
      <PieChart
        labels={byChannelData.map((c) => c.channel)}
        data={byChannelData.map((c) => c.clicks)}
        colors={CHANNEL_COLORS}
        height={200}
      />
    </ChartContainer>
  </ChartsRow>
);

export default DashboardCharts;
