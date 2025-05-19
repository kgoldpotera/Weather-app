import Dexie from 'dexie';
import { DexieCloud } from 'dexie-cloud-addon';

// Initialize Dexie with the database name
const db = new Dexie('WeatherApp', { addons: [DexieCloud] });

// Define the database schema
db.version(1).stores({
  weatherData: '@id, city, temperature, condition', // '@id' = auto-generated global ID
});

// Configure Dexie Cloud with your database URL
db.cloud.configure({
  databaseUrl: 'https://zd7y35vlz.dexie.cloud', // Replace with your actual Dexie Cloud URL
  requireAuth: true, // Optional: require authentication
});

// Function to fetch weather data from Pirate Weather API
export async function fetchWeatherData(lat, lon) {
  const apiKey = import.meta.env.VITE_PIRATE_WEATHER_API_KEY; // Use API key from environment variable
  const url = `https://api.pirateweather.net/forecast/${apiKey}/${lat},${lon}?units=si`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      temperature: data.currently.temperature,
      condition: data.currently.summary,
      hourly: data.hourly.data, // Optional: Hourly forecast
      daily: data.daily.data,   // Optional: Daily forecast
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error; // Re-throw error for handling in the UI
  }
}

export default db;
