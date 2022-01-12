import API_KEY from '../assets/api-key';

const DAYS_IN_HISTORY = 5;
const DAYS_IN_FORECAST = 7;

export const getCurrentWeather = async ({ lat, lon }) => {
  const response = await callService(`weather?lat=${lat}&lon=${lon}`)
    .then((data) => data)
    .catch((e) => console.log(e));

  if (!response) return;

  return {
    location: response.name,
    lat: response.coord.lat,
    lon: response.coord.lon,
    description: response.weather[0].description,
    icon: response.weather[0].icon,
    temperature: response.main.temp,
    minTemperature: response.main.temp_min,
    maxTemperature: response.main.temp_max,
    pressure: response.main.pressure,
    humidity: response.main.humidity,
    windSpeed: response.wind.speed,
    sunrise: new Date(response.sys.sunrise * 1000),
    sunset: new Date(response.sys.sunset * 1000),
  };
};

export const getForecast = async ({ lat, lon }) => {
  const response = await callService(`onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts`)
    .then((data) => data)
    .catch((e) => console.log(e));

  if (!response) return Array(DAYS_IN_FORECAST).fill();

  return response.daily
    .map((data) => ({
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      temperature: data.temp.day,
      minTemperature: data.temp.day,
      maxTemperature: data.temp.day,
    }))
    .slice(-DAYS_IN_FORECAST); // An extra element may be present; that means position 0 is forecast for today
};

export const getWeatherHistory = async ({ lat, lon }) => {
  const now = new Date();
  const oldTimestamps = [];
  for (let i = 0; i < DAYS_IN_HISTORY; i++) {
    const pastDate = new Date(now.getTime());
    pastDate.setDate(now.getDate() - (i + 1));

    oldTimestamps.push(Math.round(pastDate.getTime() / 1000));
  }

  const response = await Promise.allSettled(
    oldTimestamps.map((timestamp) =>
      callService(`onecall/timemachine?lat=${lat}&lon=${lon}&dt=${timestamp}`)
    )
  );

  return response.map((data) => {
    if (!data.value) return;

    return {
      description: data.value.current.weather[0].description,
      icon: data.value.current.weather[0].icon,
      temperature: data.value.current.temp,
    };
  });
};

const callService = async (url) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/${url}&units=metric&appid=${API_KEY}`
  );

  if (!response.ok) return Promise.reject('Error fetching data from the API');

  return await response.json();
};
