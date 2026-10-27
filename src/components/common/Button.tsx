import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  [key: string]: any;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.15s ease;
  cursor: pointer;
  border: none;

  ${({ size }) => size === 'sm' && css`padding: 6px 12px; font-size: 12px;`}
  ${({ size }) => (!size || size === 'md') && css`padding: 8px 16px; font-size: 14px;`}
  ${({ size }) => size === 'lg' && css`padding: 12px 24px; font-size: 16px;`}

  ${({ fullWidth }) => fullWidth && css`width: 100%;`}

  ${({ variant }) => (!variant || variant === 'primary') && css`
    background: #2563eb;
    color: white;
    &:hover:not(:disabled) { background: #1d4ed8; }
  `}
  ${({ variant }) => variant === 'secondary' && css`
    background: #f3f4f6;
    color: #374151;
    border: 1px solid #e5e7eb;
    &:hover:not(:disabled) { background: #e5e7eb; }
  `}
  ${({ variant }) => variant === 'danger' && css`
    background: #ef4444;
    color: white;
    &:hover:not(:disabled) { background: #dc2626; }
  `}
  ${({ variant }) => variant === 'ghost' && css`
    background: transparent;
    color: #2563eb;
    &:hover:not(:disabled) { background: #eff6ff; }
  `}

  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

export function Button({ loading, children, ...props }: ButtonProps) {
  return (
    <StyledButton {...props} disabled={props.disabled || loading}>
      {loading && <span className="material-icons" style={{ fontSize: 14, marginRight: 4, animation: 'spin 1s linear infinite' }}>refresh</span>}
      {children}
    </StyledButton>
  );
}

export default Button;
