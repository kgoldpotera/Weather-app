<script>
    import SearchBar from '$lib/SearchBar.svelte';
    import WeatherDisplay from '$lib/WeatherDisplay.svelte';
    import db from '$lib/db.js';
  
    let weatherData = null; // Holds the weather data
  
    // Function to fetch weather data using OpenWeatherMap API
    async function fetchWeather(city) {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=YOUR_API_KEY`
      );
      const data = await response.json();
      return data;
    }
  
    // Function triggered by the SearchBar component
    async function handleSearch(city) {
      const data = await fetchWeather(city);
      weatherData = data;
  
      // Save weather data to Dexie Cloud
      await db.weatherData.put({
        id: city,
        city,
        temperature: data.main.temp,
        condition: data.weather[0].description,
      });
    }
  </script>
  
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Weather App</h1>
    <SearchBar onSearch={handleSearch} />
    <div class="mt-4">
      <WeatherDisplay {weatherData} />
    </div>
  </div>
  