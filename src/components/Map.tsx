import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { type Place } from './PlacesContext';

const containerStyle = {
  width:  '500px',
  height: '500px',
};

const defaultCenter = {
  lat: 32.0853,
  lng: 34.7818, // Tel Aviv as fallback
};

type Props = {
  places: Place[];
  selectedPlace: Place | null;
  onMarkerClick: (place: Place) => void;
};

function Map({ places, selectedPlace, onMarkerClick }: Props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [coordinates, setCoordinates] = useState<Record<string, google.maps.LatLngLiteral>>({});

  const geocodePlace = async (place: Place): Promise<google.maps.LatLngLiteral | null> => {
    const geocoder = new window.google.maps.Geocoder();
    return new Promise((resolve) => {
      geocoder.geocode({ address: place.address }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          resolve({ lat: lat(), lng: lng() });
        } else {
          resolve(null);
        }
      });
    });
  };

  useEffect(() => {
    const fetchCoordinates = async () => {
      const coords: Record<string, google.maps.LatLngLiteral> = {};
      for (const place of places) {
        if (!coordinates[place.address]) {
          const location = await geocodePlace(place);
          if (location) coords[place.address] = location;
        }
      }
      setCoordinates((prev) => ({ ...prev, ...coords }));
    };
    if (isLoaded) fetchCoordinates();
  }, [places, isLoaded]);

  useEffect(() => {
    if (selectedPlace && map && coordinates[selectedPlace.address]) {
      map.panTo(coordinates[selectedPlace.address]);
    }
  }, [selectedPlace, map, coordinates]);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={10}
      onLoad={onLoad}
    >
      {places.map((place) => {
        const coord = coordinates[place.address];
        return coord ? (
          <Marker
            key={place.address}
            position={coord}
            onClick={() => onMarkerClick(place)}
          />
        ) : null;
      })}
    </GoogleMap>
  ) : (
    <p>Loading map...</p>
  );
}

export default React.memo(Map);
