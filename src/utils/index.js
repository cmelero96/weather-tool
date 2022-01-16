// Retrieve the weather icons from OpenWeatherMap page.
export const iconGetters = {
  getSrc: (icon, large) => `https://openweathermap.org/img/wn/${icon}${large ? '@2x' : ''}.png`,
  getSrcSet: (icon) =>
    `https://openweathermap.org/img/wn/${icon}.png,
     https://openweathermap.org/img/wn/${icon}@2x.png,
     https://openweathermap.org/img/wn/${icon}@4x.png`,
};

// Custom buttons for the Google Map need to be created with vanilla JS
export const createButton = (title, tooltip, onClick) => {
  const button = document.createElement('button');
  button.title = tooltip;
  const innerText = document.createElement('div');
  innerText.innerHTML = title;
  button.appendChild(innerText);

  button.addEventListener('click', onClick);

  return button;
};

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Returns the ordered amount of days starting from provided date, either
// towards the future (amountOfDays > 0) or from the past (< 0)
export const getWeekdays = (dateNow, amountOfDays) => {
  let dayNumber = dateNow.getDay();
  const weekdays = [];

  // Get sign of amountOfDays; default to +1 if amountOfDays = 0 for some reason
  const direction = Math.sign(amountOfDays) || 1;

  for (let count = 0; count < Math.abs(amountOfDays); count++) {
    if (dayNumber >= WEEKDAYS.length) dayNumber = 0; // Correct when increasing
    if (dayNumber < 0) dayNumber = WEEKDAYS.length - 1; // Correct when decreasing

    weekdays.push(WEEKDAYS[dayNumber]);
    dayNumber += 1 * direction; // Iterate forwards or backwards depending on sign
  }

  return weekdays;
};
