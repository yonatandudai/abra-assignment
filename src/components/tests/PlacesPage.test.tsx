import { render, screen } from '@testing-library/react';
import PlacesPage from '../PlacesPage';
import { PlacesContext } from '../PlacesContext';
import { MemoryRouter } from 'react-router-dom';


const mockContext = {
  places: [
    {
      name: 'Azrieli Mall',
      type: 'Shopping',
      address: 'Tel Aviv, Israel',
    },
  ],
  setPlaces: vi.fn(),
};

test('renders PlacesPage and filters', () => {
  render(
    <PlacesContext.Provider value={mockContext}>
      <MemoryRouter>
        <PlacesPage />
      </MemoryRouter>
    </PlacesContext.Provider>
  );

  expect(screen.getByText(/Filter by Type/i)).toBeInTheDocument();
  expect(screen.getByText(/Azrieli Mall/i)).toBeInTheDocument();
});
