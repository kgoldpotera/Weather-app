<script>
    export let weatherData; // Accept the weather data as a prop
  </script>
  
  {#if weatherData}
    <div class="p-4 border rounded shadow">
      <h2 class="text-xl font-bold">{weatherData.name}</h2>
      <p>Temperature: {weatherData.main.temp}°C</p>
      <p>Condition: {weatherData.weather[0].description}</p>
    </div>
  {:else}
    <p>No weather data available. Please search for a city.</p>
  {/if}
  