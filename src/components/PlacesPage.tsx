import { useContext, useState, useMemo } from 'react';
import { PlacesContext, type Place } from './PlacesContext';
import Map from './Map';
import WeatherChart from './WeatherChart';

const PlacesPage = () => {
  const { places } = useContext(PlacesContext);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const filteredPlaces = useMemo(() => {
    return selectedType === 'all' ? places : places.filter(p => p.type === selectedType);
  }, [places, selectedType]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
        {/* Sidebar */}
        <div style={{ width: '30%', padding: '1rem', overflowY: 'auto' }}>
            <h2>Filter by Type</h2>
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="all">All</option>
            {[...new Set(places.map(p => p.type))].map(type => (
                <option key={type} value={type}>{type}</option>
            ))}
            </select>

            <h3>Places</h3>
            <ul>
            {filteredPlaces.map((place, idx) => (
                <li
                key={idx}
                style={{ cursor: 'pointer', marginBottom: '10px' }}
                onClick={() => setSelectedPlace(place)}
                >
                <strong>{place.name}</strong><br />
                {place.type}<br />
                {place.address}
                </li>
            ))}
            </ul>
            {selectedPlace && <WeatherChart place={selectedPlace} />}
        </div>

        <div style={{ flex: 1 }}>
            <Map
            places={filteredPlaces}
            selectedPlace={selectedPlace}
            onMarkerClick={setSelectedPlace}
            />
        </div>
    </div>
  );
};

export default PlacesPage;
