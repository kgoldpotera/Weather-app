<script>
  import SearchBar from '$lib/SearchBar.svelte';
  import WeatherDisplay from '$lib/WeatherDisplay.svelte';
  import db, { fetchWeatherData } from '$lib/db.js';

  let weatherData = null; // Holds the weather data

  // Function triggered by the SearchBar component
  async function handleSearch(city) {
    try {
      // Use a geocoding API to convert city name to latitude and longitude
      const geocodeResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1`
      );

      if (!geocodeResponse.ok) {
        throw new Error('Failed to fetch geolocation data');
      }

      const geocodeData = await geocodeResponse.json();

      if (geocodeData.length === 0) {
        throw new Error('City not found');
      }

      const { lat, lon } = geocodeData[0]; // Extract latitude and longitude

      // Fetch weather data using latitude and longitude
      const weather = await fetchWeatherData(lat, lon);
      weatherData = { city, ...weather }; // Update weather data with city name

      // Save weather data to Dexie Cloud
      await db.weatherData.put({
        id: city,
        city,
        temperature: weather.temperature,
        condition: weather.condition,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Failed to fetch weather data. Please try again.');
    }
  }
</script>

<div class="p-4">
  <h1 class="text-2xl font-bold mb-4">Weather App</h1>
  <SearchBar onSearch={handleSearch} />
  <div class="mt-4">
    <WeatherDisplay {weatherData} />
  </div>
</div>
