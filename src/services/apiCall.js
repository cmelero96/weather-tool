import API_KEY from '../assets/api-key';

const callService = async (url) => {
  const response = await fetch(`${url}&units=metric&appid=${API_KEY}`);

  if (!response.ok) {
    console.log('error');
  }

  const data = response.json();

  return data;
};

export const getWeatherData = async (query) => {
  const currentResponse = await callService(
    `https://api.openweathermap.org/data/2.5/weather?q=${query}`
  );

  const { lat, lon } = currentResponse.coord;
  const dt = currentResponse.dt;

  console.log({ lat, lon, dt });

  const forecastResponse = await callService(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts`
  );

  const dateNow = new Date(dt * 1000);
  const oldTimestamps = [];
  for (let i = 0; i < 5; i++) {
    const pastDate = new Date(dateNow.getTime());
    pastDate.setDate(dateNow.getDate() - (i + 1));

    oldTimestamps.push(pastDate.getTime() / 1000);
  }

  const historicalResponse = await Promise.all(
    oldTimestamps.map((timestamp) =>
      callService(
        `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${dt}`
      )
    )
  );

  const current = {
    location: currentResponse.name,
    description: currentResponse.weather[0].description,
    icon: currentResponse.weather[0].icon,
    temperature: currentResponse.main.temp,
    minTemperature: currentResponse.main.temp_min,
    maxTemperature: currentResponse.main.temp_max,
    pressure: currentResponse.main.pressure,
    humidity: currentResponse.main.humidity,
    windSpeed: currentResponse.wind.speed,
    sunrise: new Date(currentResponse.sys.sunrise),
    sunset: new Date(currentResponse.sys.sunset),
  };

  const forecast = forecastResponse.daily
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

  const historical = historicalResponse.map((data) => {
    return {
      description: data.current.weather[0].description,
      icon: data.current.weather[0].icon,
      temperature: data.current.temp,
    };
  });

  const res = { current, historical, forecast };

  return res;
};
