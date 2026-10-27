import React from 'react';
import styled from 'styled-components';
import { SparklineChart } from '../Chart/SparklineChart';
import { formatNumber } from '../../utils/numberUtils';

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

interface MetricsCardProps {
  title: string;
  value: number | string;
  change?: number;
  trend?: number[];
  prefix?: string;
  suffix?: string;
  color?: string;
  dataTestId?: string;
}

export function MetricsCard({ title, value, change = 0, trend = [], prefix = '', suffix = '', color = '#2563eb', dataTestId }: MetricsCardProps) {
  const isPositive = change >= 0;
  const formattedValue = typeof value === 'number' ? formatNumber(value) : value;

  return (
    <Card data-testid={dataTestId}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 4 }}>{title}</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: '#111827' }}>{prefix}{formattedValue}{suffix}</p>
          {change !== 0 && (
            <p style={{ fontSize: 13, color: isPositive ? '#10b981' : '#ef4444', marginTop: 4 }}>
              {isPositive ? '↑' : '↓'} {Math.abs(change).toFixed(1)}% vs mês anterior
            </p>
          )}
        </div>
        {trend.length > 0 && (
          <SparklineChart data={trend} color={color} width={80} height={40} />
        )}
      </div>
    </Card>
  );
}
