window.axios = require("axios");

console.table(process.env);

window.axios.defaults.baseURL = [
  "http://",
  process.env.VUE_APP_PI_URL ?? "0.0.0.0",
  ":5000",
].join("");

window.bytesToMegabytes = function (bytes) {
  return (Number.parseInt(bytes) / 1024 / 1024).toFixed(2);
};

window.bytesToGigabytes = function (bytes) {
  return (Number.parseFloat(bytesToMegabytes(bytes)) / 1024).toFixed(2);
};
