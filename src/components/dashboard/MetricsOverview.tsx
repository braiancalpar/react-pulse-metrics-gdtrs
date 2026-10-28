import React from "react";

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
  const cards = [
    {
      label: "Impressões Totais",
      value: formatNumber(totalImpressions),
      icon: "visibility",
      iconBackground: "bg-[#f0eeff]",
      borderColor: "#6c63ff",
      trend: "↑ 12.5% vs período anterior",
      trendColor: "text-[#38a169]",
    },
    {
      label: "Total de Cliques",
      value: totalClicks.toLocaleString("pt-BR"),
      icon: "ads_click",
      iconBackground: "bg-[#f0fff4]",
      borderColor: "#48bb78",
      trend: "↑ 8.3% vs período anterior",
      trendColor: "text-[#38a169]",
    },
    {
      label: "Conversões",
      value: totalConversions.toLocaleString("pt-BR"),
      icon: "track_changes",
      iconBackground: "bg-[#fffaf0]",
      borderColor: "#ed8936",
      trend: "↓ 2.1% vs período anterior",
      trendColor: "text-[#e53e3e]",
    },
    {
      label: "Gasto Total",
      value: formatCurrency(totalSpend),
      icon: "payments",
      iconBackground: "bg-[#fff5f5]",
      borderColor: "#e53e3e",
      trend: `ROI: ${
        totalSpend > 0
          ? (((totalConversions * 150 - totalSpend) / totalSpend) * 100).toFixed(
              1,
            )
          : "0"
      }%`,
      trendColor: "text-[#38a169]",
    },
  ];
  const kpis = [
    { label: "CTR Médio", value: `${avgCTR.toFixed(2)}%` },
    { label: "Taxa de Conversão", value: `${avgCVR.toFixed(2)}%` },
    { label: "Campanhas Ativas", value: `${activeCampaignsCount}` },
    {
      label: "CPC Médio",
      value: cpc > 0 ? formatCurrency(cpc) : "R$ 0,00",
    },
  ];

  return (
    <>
      <div className="mb-6 grid grid-cols-1 gap-4 min-[769px]:grid-cols-2 min-[1201px]:grid-cols-4">
        {cards.map((card) => (
          <section
            key={card.label}
            className="rounded-lg border-l-4 bg-white p-5 shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
            style={{ borderLeftColor: card.borderColor }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="mb-2 text-[13px] text-gray-500">{card.label}</p>
                <h2 className="text-[28px] font-bold text-gray-800">
                  {card.value}
                </h2>
              </div>
              <div
                className={`rounded-lg p-2.5 ${card.iconBackground}`}
                aria-hidden="true"
              >
                <span className="material-icons text-[22px]">{card.icon}</span>
              </div>
            </div>
            <p className={`mt-2 text-[13px] ${card.trendColor}`}>
              {card.trend}
            </p>
          </section>
        ))}
      </div>

      <div className="mb-6 flex gap-4">
        {kpis.map((kpi) => (
          <section
            key={kpi.label}
            className="flex-1 rounded-lg bg-white p-4 text-center shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
          >
            <p className="mb-1 text-[13px] text-gray-500">{kpi.label}</p>
            <h3 className="text-[22px] font-bold text-gray-800">
              {kpi.value}
            </h3>
          </section>
        ))}
      </div>
    </>
  );
};

export default MetricsOverview;
