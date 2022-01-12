function debouncer(fn, delay) {
  var timeoutID = null;
  return function () {
    clearTimeout(timeoutID);
    var args = arguments;
    var that = this;
    timeoutID = setTimeout(function () {
      fn.apply(that, args);
    }, delay);
  };
}

module.exports = function debounce(el, binding) {
  if (binding.value !== binding.oldValue) {
    el.oninput = debouncer(function () {
      el.dispatchEvent(new Event('change'));
    }, parseInt(binding.value) || 500);
  }
};
