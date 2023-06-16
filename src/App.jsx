import { createSignal } from 'solid-js';

function App() {
  const [cityName, setCityName] = createSignal('');
  const [dateActuelle, setDateActuelle] = createSignal('');
  const [tempActuelle, setTempActuelle] = createSignal('');
  const [heureLever, setHeureLever] = createSignal('');
  const [heureCoucher, setHeureCoucher] = createSignal('');

  function fetchMeteo() {
    const city = cityName();
    fetch(`https://www.prevision-meteo.ch/services/json/${city}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        setCityName(jsonData.city_info.name);
        setDateActuelle(jsonData.current_condition.date);
        setTempActuelle(jsonData.current_condition.tmp);
        setHeureLever(jsonData.city_info.sunrise);
        setHeureCoucher(jsonData.city_info.sunset);
      });
  }

  return (
    <div class="weather-app">
      <h1>Météo</h1>
      <div class="input-container">
        <label for="cityName">Ville:</label>
        <input type="text" id="cityName" value={cityName()} onInput={e => setCityName(e.target.value)} />
        <button onClick={fetchMeteo}>Chercher</button>
      </div>
      {cityName() && (
        <div class="weather-info">
          <h2>{cityName()}</h2>
          <p>Bonjour, nous sommes le {dateActuelle()} et la température actuelle est de <span class="temperature">{tempActuelle()}°C</span>.</p>
          <p>Le soleil se lèvera à {heureLever()} et se couchera à {heureCoucher()}.</p>
        </div>
      )}
    </div>
  );
}

export default App;
