export const iconGetters = {
  getSrc: (icon) => `https://openweathermap.org/img/wn/${icon}.png`,
  getSrcSet: (icon) =>
    `https://openweathermap.org/img/wn/${icon}.png,
     https://openweathermap.org/img/wn/${icon}@2x.png,
     https://openweathermap.org/img/wn/${icon}@4x.png`,
};
