import API_KEY from '../assets/api-key';

export const getWeatherData = async ({ lat, lon }) => {
  const current = await getCurrentData(lat, lon);
  const forecast = await getForecastData(lat, lon);
  const historical = await getPastData(lat, lon);

  return { current, historical, forecast };
};

const getCurrentData = async (lat, lon) => {
  const response = await callService(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`
  );

  const current = {
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
    sunrise: new Date(response.sys.sunrise),
    sunset: new Date(response.sys.sunset),
    dt: response.dt,
  };

  return current;
};

const getForecastData = async (lat, lon) => {
  const response = await callService(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts`
  );

  const forecast = response.daily
    .map((data) => {
      return {
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        temperature: data.temp.day,
        minTemperature: data.temp.day,
        maxTemperature: data.temp.day,
      };
    })
    .slice(-7); // If we got 8 elements instead of 7, remove the first one (which is a forecast for today)

  return forecast;
};

const getPastData = async (dt, lat, lon) => {
  const timestampNow = new Date.getTime() / 1000;
  const oldTimestamps = [];
  for (let i = 0; i < 5; i++) {
    const pastDate = new Date(timestampNow.getTime());
    pastDate.setDate(timestampNow.getDate() - (i + 1));

    oldTimestamps.push(pastDate.getTime() / 1000);
  }

  const response = await Promise.all(
    oldTimestamps.map((timestamp) =>
      callService(
        `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${timestamp}`
      )
    )
  );

  const historical = response.map((data) => ({
    description: data.current.weather[0].description,
    icon: data.current.weather[0].icon,
    temperature: data.current.temp,
  }));

  return historical;
};

const callService = async (url) => {
  const response = await fetch(`${url}&units=metric&appid=${API_KEY}`);

  if (!response.ok) {
    console.log('error');
  }

  const data = response.json();

  return data;
};
