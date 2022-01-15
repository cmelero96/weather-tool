export const promiseMock = async (mock, time) => {
  return new Promise((resolve) => setTimeout(() => resolve(mock), time));
};

export const mockCityData = {
  id: 3117735,
  name: 'Madrid',
  countryCode: 'ES',
  coord: { lon: -3.70256, lat: 40.4165 },
};

export const mockCurrent = {
  description: 'clear sky',
  icon: '01d',
  temperature: 211.56,
  minTemperature: 29.5,
  maxTemperature: 212.65,
  pressure: 1027,
  humidity: 34,
  windSpeed: 0.89,
  sunrise: '2022-01-12T07:36:54.000Z',
  sunset: '2022-01-12T17:08:47.000Z',
};

export const mockForecast = [
  {
    description: 'scattered clouds',
    icon: '03d',
    temperature: 27.71,
    minTemperature: 27.71,
    maxTemperature: 27.71,
  },
  {
    description: 'clear sky',
    icon: '01d',
    temperature: 27.2,
    minTemperature: 27.2,
    maxTemperature: 27.2,
  },
  {
    description: 'clear sky',
    icon: '01d',
    temperature: 27.14,
    minTemperature: 27.14,
    maxTemperature: 27.14,
  },
  {
    // description: 'clear sky',
    // icon: '01d',
    // temperature: 27.08,
    // minTemperature: 27.08,
    // maxTemperature: 27.08,
  },
  {
    description: 'clear sky',
    icon: '01d',
    temperature: 28.14,
    minTemperature: 28.14,
    maxTemperature: 28.14,
  },
  {
    description: 'clear sky',
    icon: '01d',
    temperature: 27.82,
    minTemperature: 27.82,
    maxTemperature: 27.82,
  },
  {
    description: 'clear sky',
    icon: '01d',
    temperature: 27.14,
    minTemperature: 27.14,
    maxTemperature: 27.14,
  },
];

export const mockHistorical = [
  { description: 'clear sky', icon: '01d', temperature: 215.35 },
  { description: 'clear sky', icon: '01d', temperature: 214.73 },
  { description: 'scattered clouds', icon: '03d', temperature: 212.85 },
  { description: 'clear sky', icon: '01d', temperature: 27.23 },
  { description: 'few clouds', icon: '02d', temperature: 210.6 },
];
