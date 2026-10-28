import React from "react";
import { useNavigate } from "react-router-dom";

interface BreadCrumbProps {
  items: Array<{ label: string; path?: string }>;
}

export function BreadCrumb({ items }: BreadCrumbProps) {
  const navigate = useNavigate();
  return (
    <nav
      style={{
        display: "flex",
        gap: 4,
        alignItems: "center",
        fontSize: 13,
        color: "#6b7280",
      }}
    >
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span>/</span>}
          {item.path ? (
            <button
              onClick={() => navigate(item.path!)}
              style={{
                background: "none",
                border: "none",
                color: "#2563eb",
                cursor: "pointer",
                fontSize: 13,
                padding: 0,
              }}
            >
              {item.label}
            </button>
          ) : (
            <span
              style={{
                color: i === items.length - 1 ? "#374151" : "#6b7280",
                fontWeight: i === items.length - 1 ? 600 : 400,
              }}
            >
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
