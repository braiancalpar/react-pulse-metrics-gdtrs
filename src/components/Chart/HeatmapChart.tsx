import React from 'react';

// Heatmap simplificado - não usa Chart.js, feito na mão
interface HeatmapChartProps {
  data?: any;
  height?: number;
}

export function HeatmapChart({ data, height = 200 }: HeatmapChartProps) {
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const hours = Array.from({ length: 8 }, (_, i) => `${i * 3}h`);

  return (
    <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: 14 }}>
      <div>
        <div style={{ marginBottom: 8, fontWeight: 500 }}>Horários de maior engajamento</div>
        <div style={{ display: 'grid', gridTemplateColumns: `60px repeat(${hours.length}, 1fr)`, gap: 2 }}>
          <div />
          {hours.map(h => <div key={h} style={{ fontSize: 11, textAlign: 'center', color: '#9ca3af' }}>{h}</div>)}
          {days.map(day => (
            <React.Fragment key={day}>
              <div style={{ fontSize: 12, display: 'flex', alignItems: 'center' }}>{day}</div>
              {hours.map((h, hi) => {
                const intensity = Math.random();
                return (
                  <div key={hi} style={{
                    height: 20, borderRadius: 2,
                    background: `rgba(37, 99, 235, ${intensity.toFixed(2)})`,
                  }} />
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
