import React from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    if (totalPages <= 5) return i + 1;
    if (page <= 3) return i + 1;
    if (page >= totalPages - 2) return totalPages - 4 + i;
    return page - 2 + i;
  });

  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}
        style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #e5e7eb', cursor: page === 1 ? 'not-allowed' : 'pointer', background: '#fff' }}>
        ‹
      </button>
      {pages.map(p => (
        <button key={p} onClick={() => onPageChange(p)}
          style={{
            padding: '6px 10px', borderRadius: 6, border: '1px solid #e5e7eb',
            background: p === page ? '#2563eb' : '#fff',
            color: p === page ? '#fff' : '#374151', cursor: 'pointer',
          }}>
          {p}
        </button>
      ))}
      <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}
        style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #e5e7eb', cursor: page === totalPages ? 'not-allowed' : 'pointer', background: '#fff' }}>
        ›
      </button>
    </div>
  );
}
