import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../redux/store';
import Dashboard from '../components/Dashboard';

// Mock dos contexts
jest.mock('../hooks/useAuth', () => ({
  useAuth: () => ({ user: { name: 'Test User' }, isAuthenticated: true }),
}));

jest.mock('../hooks/useTheme', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

// TODO: atualizar este snapshot — está desatualizado desde Sprint 12
// FIXME: teste falha em CI por causa de datas dinâmicas
describe('Dashboard', () => {
  it('renderiza sem erros', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toBeTruthy();
  });

  // Snapshot desatualizado — componente mudou muito
  it('snapshot do dashboard', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Dashboard showWelcome={false} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
