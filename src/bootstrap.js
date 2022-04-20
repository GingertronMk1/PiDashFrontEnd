window.axios = require("axios");

window.axios.defaults.baseURL = `${process.env.VUE_APP_PI_URL ?? ""}/dash-api`;

window.axios.defaults.port = "5000";

window.bytesToOther = function (bytes, unit = "G") {
  let exponent = 0;
  switch (unit) {
    case "P":
      exponent++;
    case "T":
      exponent++;
    case "G":
      exponent++;
    case "M":
      exponent++;
    case "K":
      exponent++;
  }
  return (Number.parseInt(bytes) / Math.pow(1024, exponent)).toFixed(2);
};

window.bytesToMegabytes = function (bytes) {
  return bytesToOther(bytes, "M");
};

window.bytesToGigabytes = function (bytes) {
  return bytesToOther(bytes, "G");
};

window.initialiseWidget = function (
  callback,
  interval = 1000,
  stopOnLostFocus = true
) {
  callback();
  setInterval(() => {
    if (document.hasFocus() || !stopOnLostFocus) {
      callback();
    }
  }, interval);
};
