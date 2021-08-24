import { render, screen } from '@testing-library/react';
import Home from './home';

test('renders hello world', () => {
  render(<Home />);
  const linkElement = screen.getByText(/Gym Periodization/i);
  expect(linkElement).toBeInTheDocument();
});
