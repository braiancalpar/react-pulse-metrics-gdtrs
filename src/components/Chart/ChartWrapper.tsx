import React, { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

// Wrapper manual do Chart.js sem react-chartjs-2 - dívida técnica
// Causa: integração direta com o DOM, sem ciclo de vida do React
Chart.register(...registerables);

interface ChartWrapperProps {
  config: ChartConfiguration;
  height?: number;
  width?: number;
  tailwind?: boolean;
}

export function ChartWrapper({
  config,
  height = 300,
  tailwind = false,
}: ChartWrapperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    // Destrói chart anterior (sem isso, o Chart.js reclamava)
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    chartRef.current = new Chart(canvasRef.current, config);

    return () => {
      chartRef.current?.destroy();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(config)]);

  return (
    <div
      className={tailwind ? "relative" : undefined}
      style={tailwind ? { height } : { position: "relative", height }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
