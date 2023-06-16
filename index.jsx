import { createSignal, onCleanup } from 'solid-js';

function WeatherApp() {
  const [weatherData, setWeatherData] = createSignal(null);

  // Récupérer les données météo depuis l'API
  async function fetchWeatherData() {
    try {
      const response = await fetch('https://www.prevision-meteo.ch/services/json/angers');
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  }

  // Appel fetchWeatherData une fois au chargement initial du composant
  onCleanup(fetchWeatherData);

  return (
    <div>
      <h1>Weather App</h1>
      {weatherData() ? (
        <div>
          <h2>{weatherData().city_info.name}</h2>
          <p>{weatherData().current_condition.tmp}°C</p>
          <p>{weatherData().current_condition.condition}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default WeatherApp;
