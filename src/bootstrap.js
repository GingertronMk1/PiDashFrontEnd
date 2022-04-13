window.axios = require("axios");

window.axios.defaults.baseURL = "http://192.168.86.177:5000";

window.bytesToMegabytes = function (bytes) {
  return (Number.parseInt(bytes) / 1024 / 1024).toFixed(2);
};

window.bytesToGigabytes = function (bytes) {
  return (Number.parseFloat(bytesToMegabytes(bytes)) / 1024).toFixed(2);
};
