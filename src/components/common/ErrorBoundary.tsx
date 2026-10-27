import React from 'react';

interface State { hasError: boolean; error: any; }

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, textAlign: 'center' }}>
          <h2 style={{ color: '#dc2626', marginBottom: 8 }}>Algo deu errado</h2>
          <p style={{ color: '#6b7280', fontSize: 14 }}>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}
            style={{ marginTop: 16, padding: '8px 16px', background: '#2563eb', color: '#fff', borderRadius: 6, border: 'none', cursor: 'pointer' }}>
            Tentar novamente
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
