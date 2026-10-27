import React from "react";
import styled from "styled-components";
import { Campaign } from "../../types/api";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Content = styled.div`
  background: white;
  border-radius: 8px;
  padding: 32px;
  width: 600px;
  max-height: 80vh;
  overflow-y: auto;
`;

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
    <Overlay onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 20, color: "#2d3748" }}>
            {campaign.name}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: 20,
              cursor: "pointer",
              color: "#718096",
            }}
          >
            ×
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 20,
          }}
        >
          {details.map((item) => (
            <div
              key={item.label}
              style={{ padding: 12, background: "#f7fafc", borderRadius: 6 }}
            >
              <p style={{ color: "#718096", fontSize: 12, margin: "0 0 2px" }}>
                {item.label}
              </p>
              <p style={{ fontWeight: 600, margin: 0, color: "#2d3748" }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button
            onClick={onViewDetails}
            style={{
              padding: "8px 16px",
              background: "#6c63ff",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Ver Detalhes Completos
          </button>
          <button
            onClick={onClose}
            style={{
              padding: "8px 16px",
              background: "white",
              color: "#718096",
              border: "1px solid #e2e8f0",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Fechar
          </button>
        </div>
      </Content>
    </Overlay>
  );
};

export default CampaignDetailModal;
