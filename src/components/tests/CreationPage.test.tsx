import { render, screen } from '@testing-library/react';
import CreationPage from '../CreationPage';
import { PlacesContext } from '../PlacesContext';
import '@testing-library/jest-dom';


const mockContext = {
  places: [],
  setPlaces: vi.fn(),
};

test('renders CreationPage form fields', () => {
  render(
    <PlacesContext.Provider value={mockContext}>
      <CreationPage />
    </PlacesContext.Provider>
  );

  expect(screen.getByLabelText(/Place Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Place Type/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Place Address/i)).toBeInTheDocument();
  expect(screen.getByText(/Submit/i)).toBeInTheDocument();
});
