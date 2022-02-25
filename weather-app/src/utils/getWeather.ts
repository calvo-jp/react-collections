const getWeather = async () => {
  const response = await fetch(
    "http://api.weatherapi.com/v1/current.json?key=61c0cad003b84cecad191330222402&q=auto:ip"
  );

  return await response.json();
};

export default getWeather;
