import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const SpinnerEl = styled.div<{ size?: number }>`
  width: ${({ size }) => size || 24}px;
  height: ${({ size }) => size || 24}px;
  border: 2px solid #e5e7eb;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;

export function Spinner({ size }: { size?: number }) {
  return <SpinnerEl size={size} />;
}

export default Spinner;
