import API_KEY from '../assets/api-key';

const DAYS_IN_HISTORY = 5;
const DAYS_IN_FORECAST = 7;

/**
 * Gets current weather info for the given coordinates
 * @param {lat} latitude
 * @param {lon} longitude
 * @returns a formatted object with all important data
 */
export const getCurrentWeather = async ({ lat, lon }) => {
  const response = await callService(`weather?lat=${lat}&lon=${lon}`);

  if (!response) return;

  return {
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

/**
 * Gets a daily forecast for the given coordinates
 * @param {lat} latitude
 * @param {lon} longitude
 * @returns an array with an object with weather info for each day, or an array
 * filled with undefined values if the data were unavailable
 */
export const getForecast = async ({ lat, lon }) => {
  const response = await callService(
    `onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts`
  );

  // The data for all the days comes from the same API call, so if it fails we get no data
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

/**
 * Gets weather data for past days for the given coordinates
 * @param {lat} latitude
 * @param {lon} longitude
 * @returns an array whose contents are the results obtained for each past day,
 * or if a specific day couldn't be obtained, an undefined value for that day
 */
export const getWeatherHistory = async ({ lat, lon }) => {
  // Get the timestamp value for each of the past days
  const now = new Date();
  const oldTimestamps = [];
  for (let i = 0; i < DAYS_IN_HISTORY; i++) {
    const pastDate = new Date(now.getTime());
    pastDate.setDate(now.getDate() - (i + 1));

    oldTimestamps.push(Math.round(pastDate.getTime() / 1000));
  }

  // Call the API once for each day and wait for all calls to resolve/reject
  const response = await Promise.allSettled(
    oldTimestamps.map((timestamp) =>
      callService(`onecall/timemachine?lat=${lat}&lon=${lon}&dt=${timestamp}`)
    )
  );

  // If the call for a certain day failed, return undefined for that day, but not for the rest
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

  if (!response.ok) {
    console.log('Error fetching data from the API');
    return;
  }

  return await response.json();
};
