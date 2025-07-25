import { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { type Place } from './PlacesContext';

type Props = {
  place: Place;
};

function WeatherChart({ place }: Props) {
    const [weatherData, setWeatherData] = useState([]);
    const openWeatherKey = import.meta.env.openWeatherKey;
    const googleMapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    useEffect(() => {
        const fetchWeatherData = async () => {
        try {
            // Step 1: Geocode address to lat/lon
            const geoRes = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json`,
            {
                params: {
                address: place.address,
                key: googleMapsKey,
                },
            }
            );

            const location = geoRes.data.results[0]?.geometry?.location;
            if (!location) throw new Error('Could not geocode address');

            const { lat, lng } = location;

            // Step 2: Get weather forecast
            const weatherRes = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast`,
            {
                params: {
                lat,
                lon: lng,
                units: 'metric',
                appid: openWeatherKey,
                },
            }
            );

            const chartData = weatherRes.data.list.map((item: any) => ({
            time: item.dt_txt.split(' ')[1].slice(0, 5), // e.g., "12:00"
            temperature: item.main.temp,
            }));

            console.log('Weather chart data:', chartData);
            setWeatherData(chartData);

        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
        };

        fetchWeatherData();
    }, [place]);

    return (
        <div style={{ marginTop: '1rem' }}>
        <h2>Weather Forecast for {place.name}</h2>
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weatherData}>
            <XAxis dataKey="time" />
            <YAxis unit="°C" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
        </div>
    );
    }

export default WeatherChart;
