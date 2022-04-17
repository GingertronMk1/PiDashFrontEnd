window.axios = require("axios");

window.axios.defaults.baseURL = `${process.env.VUE_APP_PI_URL ?? ""}/dash-api`;

window.axios.defaults.port = "5000";

window.bytesToMegabytes = function (bytes) {
  return (Number.parseInt(bytes) / 1024 / 1024).toFixed(2);
};

window.bytesToGigabytes = function (bytes) {
  return (Number.parseFloat(bytesToMegabytes(bytes)) / 1024).toFixed(2);
};

window.initialiseWidget = function (callback, interval = 1000) {
  callback();
  setInterval(callback, interval);
};
