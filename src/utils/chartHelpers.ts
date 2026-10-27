export function generateChartColors(count: number): string[] {
  const baseColors = [
    '#2563eb', '#7c3aed', '#db2777', '#dc2626',
    '#d97706', '#65a30d', '#0891b2', '#7c3aed',
  ];
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(baseColors[i % baseColors.length]);
  }
  return colors;
}

export function timeSeriesLabels(data: any[]): string[] {
  return data.map(d => d.date);
}

export function timeSeriesValues(data: any[]): number[] {
  return data.map(d => d.value);
}
