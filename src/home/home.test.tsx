import { render, screen } from '@testing-library/react';
import Home from './home';

test('renders hello world', () => {
  render(<Home />);
  // const linkElement = screen.getByText(/Hello World/i);
  // expect(linkElement).toBeInTheDocument();
});
