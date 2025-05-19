<script>
    export let onSearch; // Accept the "onSearch" function as a prop
    let city = '';       // Bind this variable to the input field
  </script>
  
  <div>
    <input
      type="text"
      bind:value={city}
      placeholder="Enter city"
      class="p-2 border rounded"
    />
    <button
      on:click={() => onSearch(city)} // Trigger "onSearch" when the button is clicked
      class="ml-2 p-2 bg-blue-500 text-white rounded"
    >
      Search
    </button>
  </div>
  