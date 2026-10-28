import React from "react";
import { Campaign } from "../../types/api";

interface Props {
  campaign: Campaign;
  onClose: () => void;
  onViewDetails: () => void;
}

const CampaignDetailModal: React.FC<Props> = ({
  campaign,
  onClose,
  onViewDetails,
}) => {
  const { metrics } = campaign;
  const ctr =
    metrics && metrics.impressions > 0
      ? ((metrics.clicks / metrics.impressions) * 100).toFixed(2)
      : "0.00";

  const details = [
    { label: "Status", value: campaign.status },
    { label: "Canal", value: campaign.channel },
    {
      label: "Budget",
      value: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(campaign.budget ?? 0),
    },
    {
      label: "Gasto",
      value: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(campaign.spent ?? 0),
    },
    {
      label: "Impressões",
      value: (metrics?.impressions ?? 0).toLocaleString("pt-BR"),
    },
    { label: "Cliques", value: (metrics?.clicks ?? 0).toLocaleString("pt-BR") },
    {
      label: "Conversões",
      value: (metrics?.conversions ?? 0).toLocaleString("pt-BR"),
    },
    { label: "CTR", value: `${ctr}%` },
  ];

  return (
    <div
      className="fixed inset-0 z-1000 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="h-auto max-h-[80vh] w-150 overflow-y-auto rounded-lg bg-white p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex justify-between">
          <h2 className="text-xl text-gray-800">{campaign.name}</h2>
          <button
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-gray-800"
            aria-label="Fechar detalhes da campanha"
          >
            ×
          </button>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-3">
          {details.map((item) => (
            <div key={item.label} className="rounded-md bg-gray-50 p-3">
              <p className="mb-0.5 text-xs text-gray-500">{item.label}</p>
              <p className="font-semibold text-gray-800">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          <button
            onClick={onViewDetails}
            className="rounded-md bg-primary px-4 py-2 text-white hover:bg-[#5952e8]"
          >
            Ver Detalhes Completos
          </button>
          <button
            onClick={onClose}
            className="rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-500 hover:bg-gray-50"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailModal;
