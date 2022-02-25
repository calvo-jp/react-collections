import { useEffect, useState } from 'react';

const App = () => {
  const [weather, setWeather] = useState<Record<string, any> | null>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    getWeather()
      .then(setWeather)
      .finally(() => setPending(false));

    return () => {
      setWeather(null);
      setPending(true);
    };
  }, []);

  if (pending) return <div>Loading...</div>;
  if (!weather) return <div>Something went wrong.</div>;

  return (
    <div>
      <main>
        <section>
          <img src={weather.current.condition.icon} alt="" />

          <div>{weather.current.condition.text}</div>
          <div>{weather.current.feelslike_c}</div>
        </section>
        <section>
          <div>{weather.location.name}</div>
          <div>{weather.location.country}</div>
        </section>
      </main>

      <footer>
        <div>
          {'Powered by '}

          <a href="https://www.weatherapi.com/" title="Free Weather API">
            WeatherAPI.com
          </a>
        </div>
      </footer>
    </div>
  );
};

const getWeather = async () => {
  const response = await fetch(
    'http://api.weatherapi.com/v1/current.json?key=61c0cad003b84cecad191330222402&q=auto:ip'
  );

  return await response.json();
};

export default App;
