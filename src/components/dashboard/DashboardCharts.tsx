import React from "react";
import { LineChart } from "../Chart/LineChart";
import { PieChart } from "../Chart/PieChart";

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
  <div className="mb-6 grid grid-cols-[2fr_1fr] gap-4">
    <section className="rounded-lg bg-white p-5 shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-text-primary">
          Performance ao Longo do Tempo
        </h3>
        <div className="flex flex-wrap gap-2">
          {["impressoes", "cliques", "conversoes"].map((metric) => (
            <button
              key={metric}
              className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-500 hover:bg-gray-50"
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
        tailwind
      />
    </section>

    <section className="rounded-lg bg-white p-5 shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
      <h3 className="mb-4 text-base font-semibold text-text-primary">
        Distribuição por Canal
      </h3>
      <PieChart
        labels={byChannelData.map((c) => c.channel)}
        data={byChannelData.map((c) => c.clicks)}
        colors={CHANNEL_COLORS}
        height={200}
        tailwind
      />
    </section>
  </div>
);

export default DashboardCharts;
