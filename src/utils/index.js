export const iconGetters = {
  getSrc: (icon) => `https://openweathermap.org/img/wn/${icon}.png`,
  getSrcSet: (icon) =>
    `https://openweathermap.org/img/wn/${icon}.png,
     https://openweathermap.org/img/wn/${icon}@2x.png,
     https://openweathermap.org/img/wn/${icon}@4x.png`,
};

export const createButton = (title, tooltip, onClick) => {
  const button = document.createElement('button');
  button.title = tooltip;
  const innerText = document.createElement('div');
  innerText.innerHTML = title;
  button.appendChild(innerText);

  button.addEventListener('click', onClick);

  return button;
};
