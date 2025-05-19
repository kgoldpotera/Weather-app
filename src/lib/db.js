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

export default db;
