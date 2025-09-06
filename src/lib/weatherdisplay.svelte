<script>
  export let weatherData; // Accept the weather data as a prop
</script>

{#if weatherData}
  <div class="p-4 border rounded shadow">
    <h2 class="text-xl font-bold">{weatherData.city}</h2>
    <p>Temperature: {weatherData.temperature}°C</p>
    <p>Condition: {weatherData.condition}</p>
  </div>
{:else}
  <p>No weather data available. Please search for a city.</p>
{/if}
