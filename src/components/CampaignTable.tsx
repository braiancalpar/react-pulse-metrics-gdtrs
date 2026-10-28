import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TableWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="overflow-x-auto rounded-lg bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)]">{children}</div>
);

const Table: React.FC<React.PropsWithChildren> = ({ children }) => (
  <table className="w-full border-collapse">{children}</table>
);

type ThProps = React.ThHTMLAttributes<HTMLTableCellElement> & {
  sortable?: boolean;
};

const Th: React.FC<ThProps> = ({
  sortable = false,
  className = "",
  ...props
}) => (
  <th
    {...props}
    className={`whitespace-nowrap border-b border-gray-200 bg-gray-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 ${
      sortable ? "cursor-pointer select-none hover:bg-gray-100" : ""
    } ${className}`}
  />
);

const Td: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({
  className = "",
  ...props
}) => (
  <td
    {...props}
    className={`border-b border-gray-200 px-4 py-3 align-middle text-sm text-gray-800 ${className}`}
  />
);

type TrProps = React.HTMLAttributes<HTMLTableRowElement> & {
  selected?: boolean;
};

const Tr: React.FC<TrProps> = ({ selected = false, className = "", ...props }) => (
  <tr
    {...props}
    className={`transition-colors ${
      selected
        ? "bg-[#f0eeff] hover:bg-[#e6e0ff]"
        : "hover:bg-gray-50"
    } [&:last-child>td]:border-b-0 ${className}`}
  />
);

const statusBadgeClasses: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  paused: "bg-orange-100 text-orange-800",
  ended: "bg-gray-200 text-gray-700",
  draft: "bg-blue-100 text-blue-800",
};

const StatusBadge: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLSpanElement>> & {
    status: string;
  }
> = ({ status, className = "", ...props }) => (
  <span
    {...props}
    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
      statusBadgeClasses[status] ?? "bg-gray-200 text-gray-700"
    } ${className}`}
  />
);

// PROP DRILLING: 12+ props individualmente (deveriam ser agrupadas ou usar context)
interface CampaignTableProps {
  campaigns: any[]; // qualquer tipo porque TypeScript decorativo
  loading: boolean;
  sortField: string;
  sortOrder: "asc" | "desc";
  selectedRows: string[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  filters: any; // outro any
  onSort: (field: string) => void;
  onSelectRow: (id: string) => void;
  onSelectAll: () => void;
  onPageChange: (page: number) => void;
  onCampaignClick: (campaign: any) => void;
  onStatusChange: (id: string, status: string) => void;
  // Mais props adicionadas sem pensar
  showActions?: boolean;
  compactMode?: boolean;
  highlightBudgetExceeded?: boolean;
}

// TODO: Dividir em CampaignTableHeader, CampaignTableRow, CampaignTablePagination
const CampaignTable: React.FC<CampaignTableProps> = ({
  campaigns,
  loading,
  sortField,
  sortOrder,
  selectedRows,
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  filters,
  onSort,
  onSelectRow,
  onSelectAll,
  onPageChange,
  onCampaignClick,
  onStatusChange,
  showActions = true,
  compactMode = false,
  highlightBudgetExceeded = true,
}) => {
  const navigate = useNavigate();

  // Estado local que deveria estar no componente pai
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [showStatusDropdown, setShowStatusDropdown] = useState<string | null>(
    null,
  );

  const getSortIndicator = (field: string) => {
    if (sortField !== field) return " ↕";
    return sortOrder === "asc" ? " ↑" : " ↓";
  };

  // Formatação inline (deveria usar utils/formatCurrency)
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value || 0);
  };

  // Formatação inline (deveria usar utils/formatDate)
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Percentual inline (deveria usar utils/formatPercentage)
  const formatPercent = (value: number) => {
    return `${(value || 0).toFixed(2)}%`;
  };

  const getStatusLabel = (status: string) => {
    const labels: any = {
      active: "Ativo",
      paused: "Pausado",
      ended: "Encerrado",
      draft: "Rascunho",
    };
    return labels[status] || status;
  };

  const getChannelIcon = (channel: string) => {
    const icons: any = {
      google: "search",
      facebook: "thumb_up",
      instagram: "photo_camera",
      linkedin: "work",
      twitter: "alternate_email",
      email: "email",
    };
    return icons[channel] || "campaign";
  };

  const pageCount = Math.max(totalPages, 1);
  const currentPageNumber = Math.min(Math.max(currentPage, 1), pageCount);
  const pageStart = (currentPageNumber - 1) * pageSize;
  const pageCampaigns = campaigns.slice(pageStart, pageStart + pageSize);

  if (loading) {
    return (
      <TableWrapper>
        <div className="p-12 text-center text-gray-500">
          <div className="mx-auto mb-3 size-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#6c63ff]" />
          <p>Carregando campanhas...</p>
        </div>
      </TableWrapper>
    );
  }

  if (campaigns.length === 0) {
    return (
      <TableWrapper>
        <div className="p-12 text-center text-gray-500">
          <div className="mb-3">
            <span className="material-icons text-5xl text-gray-300">
              inbox
            </span>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-700">
            Nenhuma campanha encontrada
          </h3>
          <p className="mb-4">
            {filters.search || filters.status !== "all"
              ? "Tente remover os filtros aplicados"
              : "Crie sua primeira campanha para começar"}
          </p>
          <button
            onClick={() => navigate("/campaigns/new")}
            className="rounded-md bg-[#6c63ff] px-5 py-2 text-white hover:bg-[#5952e8]"
          >
            Nova Campanha
          </button>
        </div>
      </TableWrapper>
    );
  }

  return (
    <div>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              {/* Checkbox select all */}
              <Th className="w-10">
                <input
                  type="checkbox"
                  checked={
                    selectedRows.length === campaigns.length &&
                    campaigns.length > 0
                  }
                  onChange={onSelectAll}
                  className="cursor-pointer"
                />
              </Th>
              <Th sortable onClick={() => onSort("name")}>
                Campanha{getSortIndicator("name")}
              </Th>
              <Th sortable onClick={() => onSort("status")}>
                Status{getSortIndicator("status")}
              </Th>
              <Th sortable onClick={() => onSort("channel")}>
                Canal{getSortIndicator("channel")}
              </Th>
              <Th sortable onClick={() => onSort("budget")}>
                Budget{getSortIndicator("budget")}
              </Th>
              <Th sortable onClick={() => onSort("spend")}>
                Gasto{getSortIndicator("spend")}
              </Th>
              <Th sortable onClick={() => onSort("impressions")}>
                Impressões{getSortIndicator("impressions")}
              </Th>
              <Th sortable onClick={() => onSort("clicks")}>
                Cliques{getSortIndicator("clicks")}
              </Th>
              <Th>CTR</Th>
              <Th sortable onClick={() => onSort("conversions")}>
                Conversões{getSortIndicator("conversions")}
              </Th>
              {!compactMode && (
                <>
                  <Th>CVR</Th>
                  <Th sortable onClick={() => onSort("startDate")}>
                    Início{getSortIndicator("startDate")}
                  </Th>
                  <Th sortable onClick={() => onSort("endDate")}>
                    Fim{getSortIndicator("endDate")}
                  </Th>
                </>
              )}
              {showActions && <Th className="w-20">Ações</Th>}
            </tr>
          </thead>
          <tbody>
            {pageCampaigns.map((campaign: any) => {
              const isSelected = selectedRows.includes(campaign.id);
              const impressions =
                campaign.metrics?.impressions ?? campaign.impressions ?? 0;
              const clicks = campaign.metrics?.clicks ?? campaign.clicks ?? 0;
              const conversions =
                campaign.metrics?.conversions ?? campaign.conversions ?? 0;
              const spent = campaign.spent ?? campaign.spend ?? 0;
              const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
              const cvr = clicks > 0 ? (conversions / clicks) * 100 : 0;
              const budgetUsed =
                campaign.budget > 0 ? (spent / campaign.budget) * 100 : 0;
              const isBudgetExceeded = budgetUsed > 100;
              const isBudgetNearLimit = budgetUsed > 80 && budgetUsed <= 100;

              return (
                <React.Fragment key={campaign.id}>
                  <Tr selected={isSelected}>
                    <Td>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectRow(campaign.id)}
                        className="cursor-pointer"
                      />
                    </Td>
                    <Td>
                      <div
                        className="cursor-pointer"
                        onClick={() => onCampaignClick(campaign)}
                      >
                        <div className="mb-0.5 font-semibold text-[#6c63ff]">
                          {campaign.name}
                        </div>
                        {!compactMode && (
                          <div className="text-xs text-gray-500">
                            ID: {campaign.id}
                          </div>
                        )}
                      </div>
                    </Td>
                    <Td>
                      <div className="relative">
                        <StatusBadge
                          status={campaign.status}
                          className="cursor-pointer"
                          onClick={() =>
                            setShowStatusDropdown(
                              showStatusDropdown === campaign.id
                                ? null
                                : campaign.id,
                            )
                          }
                        >
                          {getStatusLabel(campaign.status)}{" "}
                          <span
                            className="material-icons align-middle text-xs"
                          >
                            expand_more
                          </span>
                        </StatusBadge>
                        {/* Dropdown de status inline - deveria ser componente */}
                        {showStatusDropdown === campaign.id && (
                          <div
                            className="absolute left-0 top-full z-[100] mt-1 min-w-[130px] rounded-md border border-gray-200 bg-white shadow-lg"
                          >
                            {["active", "paused", "ended", "draft"]
                              .filter((s) => s !== campaign.status)
                              .map((status) => (
                                <button
                                  key={status}
                                  onClick={() => {
                                    onStatusChange(campaign.id, status);
                                    setShowStatusDropdown(null);
                                  }}
                                  className="block w-full px-3 py-2 text-left text-[13px] text-gray-800 hover:bg-gray-50"
                                >
                                  {getStatusLabel(status)}
                                </button>
                              ))}
                          </div>
                        )}
                      </div>
                    </Td>
                    <Td>
                      <span
                        className="material-icons mr-1.5 align-middle text-base text-gray-500"
                      >
                        {getChannelIcon(campaign.channel)}
                      </span>
                      {campaign.channel
                        ? campaign.channel.charAt(0).toUpperCase() +
                          campaign.channel.slice(1)
                        : "-"}
                    </Td>
                    <Td>
                      <div>{formatCurrency(campaign.budget)}</div>
                      {!compactMode && (
                        <div className="mt-0.5 text-[11px]">
                          {/* Barra de progresso inline */}
                          <div
                            className="mb-0.5 h-1 w-20 overflow-hidden rounded-full bg-gray-200"
                          >
                            <div
                              className={`h-full rounded-full transition-[width] duration-300 ${
                                isBudgetExceeded
                                  ? "bg-red-600"
                                  : isBudgetNearLimit
                                    ? "bg-orange-500"
                                    : "bg-green-500"
                              }`}
                              style={{ width: `${Math.min(budgetUsed, 100)}%` }}
                            />
                          </div>
                          <span
                            className={
                              isBudgetExceeded ? "text-red-600" : "text-gray-500"
                            }
                          >
                            {budgetUsed.toFixed(0)}% utilizado
                          </span>
                        </div>
                      )}
                    </Td>
                    <Td
                      className={
                        isBudgetExceeded
                          ? `font-semibold ${highlightBudgetExceeded ? "text-red-600" : ""}`
                          : ""
                      }
                    >
                      {formatCurrency(spent)}
                    </Td>
                    <Td>
                      {impressions >= 1000000
                        ? `${(impressions / 1000000).toFixed(1)}M`
                        : impressions >= 1000
                          ? `${(impressions / 1000).toFixed(0)}K`
                          : impressions.toLocaleString("pt-BR")}
                    </Td>
                    <Td>{clicks.toLocaleString("pt-BR")}</Td>
                    <Td>
                      <span
                        className={
                          ctr >= 3
                            ? "text-green-600"
                            : ctr >= 1
                              ? "text-orange-500"
                              : "text-red-600"
                        }
                      >
                        {formatPercent(ctr)}
                      </span>
                    </Td>
                    <Td>{conversions.toLocaleString("pt-BR")}</Td>
                    {!compactMode && (
                      <>
                        <Td>
                          <span
                            className={
                              cvr >= 5
                                ? "text-green-600"
                                : cvr >= 2
                                  ? "text-orange-500"
                                  : "text-red-600"
                            }
                          >
                            {formatPercent(cvr)}
                          </span>
                        </Td>
                        <Td className="text-[13px]">
                          {formatDate(campaign.startDate)}
                        </Td>
                        <Td className="text-[13px]">
                          {campaign.endDate ? (
                            <span
                              className={
                                new Date(campaign.endDate) < new Date()
                                  ? "text-red-600"
                                  : ""
                              }
                            >
                              {formatDate(campaign.endDate)}
                            </span>
                          ) : (
                            <span className="text-gray-500">Sem data</span>
                          )}
                        </Td>
                      </>
                    )}
                    {showActions && (
                      <Td>
                        <div className="flex gap-1">
                          <button
                            onClick={() =>
                              navigate(`/campaigns/${campaign.id}`)
                            }
                            title="Ver detalhes"
                            className="rounded border border-gray-200 px-2 py-1 text-[13px] hover:bg-gray-50"
                          >
                            <span
                              className="material-icons text-base"
                            >
                              visibility
                            </span>
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/campaigns/${campaign.id}/edit`)
                            }
                            title="Editar"
                            className="rounded border border-gray-200 px-2 py-1 text-[13px] hover:bg-gray-50"
                          >
                            <span
                              className="material-icons text-base"
                            >
                              edit
                            </span>
                          </button>
                          <button
                            onClick={() =>
                              setExpandedRow(
                                expandedRow === campaign.id
                                  ? null
                                  : campaign.id,
                              )
                            }
                            title="Mais ações"
                            className="rounded border border-gray-200 px-2 py-1 text-[13px] hover:bg-gray-50"
                          >
                            <span
                              className="material-icons text-base"
                            >
                              more_vert
                            </span>
                          </button>
                        </div>
                      </Td>
                    )}
                  </Tr>

                  {/* Linha expandida inline - deveria ser componente */}
                  {expandedRow === campaign.id && (
                    <tr>
                      <Td
                        colSpan={
                          showActions
                            ? compactMode
                              ? 11
                              : 14
                            : compactMode
                              ? 10
                              : 13
                        }
                      >
                        <div
                          className="grid grid-cols-2 gap-3 rounded-md bg-gray-50 p-4 sm:grid-cols-4"
                        >
                          <div>
                            <p className="mb-0.5 text-[11px] uppercase text-gray-500">
                              Objetivo
                            </p>
                            <p className="text-sm font-semibold">
                              {campaign.objective || "Conversões"}
                            </p>
                          </div>
                          <div>
                            <p className="mb-0.5 text-[11px] uppercase text-gray-500">
                              Audiência
                            </p>
                            <p className="text-sm font-semibold">
                              {campaign.audience || "Geral"}
                            </p>
                          </div>
                          <div>
                            <p className="mb-0.5 text-[11px] uppercase text-gray-500">
                              CPA
                            </p>
                            <p className="text-sm font-semibold">
                              {conversions > 0 && spent > 0
                                ? formatCurrency(spent / conversions)
                                : "-"}
                            </p>
                          </div>
                          <div>
                            <p className="mb-0.5 text-[11px] uppercase text-gray-500">
                              ROAS
                            </p>
                            <p className="text-sm font-semibold">
                              {spent > 0
                                ? `${((conversions * 150) / spent).toFixed(2)}x`
                                : "-"}
                            </p>
                          </div>
                        </div>
                      </Td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </Table>
      </TableWrapper>

      {/* Paginação inline (deveria ser componente Pagination) */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Mostrando {pageStart + 1}–
            {Math.min(currentPageNumber * pageSize, totalItems)} de {totalItems}{" "}
            campanhas
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(1)}
              disabled={currentPageNumber === 1}
              className={`rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-[13px] ${
                currentPageNumber === 1
                  ? "cursor-not-allowed text-gray-300"
                  : "text-gray-800 hover:bg-gray-50"
              }`}
            >
              «
            </button>
            <button
              onClick={() => onPageChange(currentPageNumber - 1)}
              disabled={currentPageNumber === 1}
              className={`rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-[13px] ${
                currentPageNumber === 1
                  ? "cursor-not-allowed text-gray-300"
                  : "text-gray-800 hover:bg-gray-50"
              }`}
            >
              ‹ Anterior
            </button>

            {/* Números de página */}
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let page: number;
              if (totalPages <= 5) {
                page = i + 1;
              } else if (currentPageNumber <= 3) {
                page = i + 1;
              } else if (currentPageNumber >= totalPages - 2) {
                page = totalPages - 4 + i;
              } else {
                page = currentPageNumber - 2 + i;
              }
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`min-w-8 rounded-md border px-2.5 py-1.5 text-[13px] ${
                    currentPageNumber === page
                      ? "border-[#6c63ff] bg-[#6c63ff] text-white"
                      : "border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => onPageChange(currentPageNumber + 1)}
              disabled={currentPageNumber === totalPages}
              className={`rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-[13px] ${
                currentPageNumber === totalPages
                  ? "cursor-not-allowed text-gray-300"
                  : "text-gray-800 hover:bg-gray-50"
              }`}
            >
              Próxima ›
            </button>
            <button
              onClick={() => onPageChange(totalPages)}
              disabled={currentPageNumber === totalPages}
              className={`rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-[13px] ${
                currentPageNumber === totalPages
                  ? "cursor-not-allowed text-gray-300"
                  : "text-gray-800 hover:bg-gray-50"
              }`}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignTable;
