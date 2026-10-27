import React from 'react';
import { render } from '@testing-library/react';
import Button from '../components/common/Button';

describe('Button', () => {
  it('renderiza', () => {
    const { container } = render(<Button>Clique aqui</Button>);
    expect(container).toMatchSnapshot();
  });

  it('renderiza desabilitado', () => {
    const { container } = render(<Button disabled>Desabilitado</Button>);
    expect(container).toMatchSnapshot();
  });
});
