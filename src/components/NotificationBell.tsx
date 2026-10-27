import React, { useState } from "react";
import { notificationService } from "../services/notificationService";

export function NotificationBell() {
  const [count] = useState(3); // hardcoded - outro problema técnico
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 20,
          position: "relative",
          color: "#9ca3af",
        }}
      >
        <span
          className="material-icons"
          style={{ fontSize: 22, verticalAlign: "middle" }}
        >
          notifications
        </span>
        {count > 0 && (
          <span
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              width: 16,
              height: 16,
              background: "#ef4444",
              color: "#fff",
              borderRadius: "50%",
              fontSize: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
            }}
          >
            {count}
          </span>
        )}
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "100%",
            marginTop: 8,
            width: 320,
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            zIndex: 100,
          }}
        >
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid #e5e7eb",
              fontWeight: 700,
            }}
          >
            Notificações
          </div>
          <div style={{ padding: 8, maxHeight: 300, overflowY: "auto" }}>
            <div
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                background: "#fef9c3",
                marginBottom: 4,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600 }}>
                <span
                  className="material-icons"
                  style={{
                    fontSize: 14,
                    verticalAlign: "middle",
                    marginRight: 4,
                    color: "#d97706",
                  }}
                >
                  warning
                </span>
                Budget 80% consumido
              </div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>
                Campanha &quot;Lançamento Produto X&quot;
              </div>
            </div>
            <div
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                background: "#eff6ff",
                marginBottom: 4,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600 }}>
                <span
                  className="material-icons"
                  style={{
                    fontSize: 14,
                    verticalAlign: "middle",
                    marginRight: 4,
                    color: "#3b82f6",
                  }}
                >
                  info
                </span>
                Relatório disponível
              </div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>
                Análise semanal por canal
              </div>
            </div>
            <div
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                background: "#fee2e2",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600 }}>
                <span
                  className="material-icons"
                  style={{
                    fontSize: 14,
                    verticalAlign: "middle",
                    marginRight: 4,
                    color: "#ef4444",
                  }}
                >
                  error
                </span>
                Falha na sincronização
              </div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>
                HubSpot - verificar credenciais
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
