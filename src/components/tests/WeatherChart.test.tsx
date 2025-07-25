// src/components/__tests__/WeatherChart.test.tsx
import { render, screen } from '@testing-library/react';
import WeatherChart from '../WeatherChart';
import { type Place } from '../PlacesContext';

const dummyPlace: Place = {
  name: 'Test Place',
  address: 'Tel Aviv, Israel',
  type: 'Test',
};

test('renders chart heading', () => {
  render(<WeatherChart place={dummyPlace} />);
  expect(screen.getByText(/Weather Forecast for Test Place/i)).toBeInTheDocument();
});
