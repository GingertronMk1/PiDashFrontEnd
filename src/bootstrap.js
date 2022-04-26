window.axios = require("axios");

window.axios.defaults.baseURL = process.env.VUE_APP_PI_URL ?? "";
window.axios.defaults.paramsSerializer = (params) => {
  return Object.entries(params)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((v) => `${key}=${v}`).join("&");
      }
      return `${key}=${value}`;
    })
    .join("&");
};

window.bytesToOther = function (bytes) {
  let amount = Number.parseInt(bytes);
  if (amount === 0) return "0B";
  prefixIndex = 0;
  const prefixes = ["", "K", "M", "G", "T", "P"];
  const base = 1024;
  const log = Math.log(amount) / Math.log(base);
  const logFloored = Math.floor(log);

  return (amount / base ** logFloored).toFixed(2) + prefixes[logFloored] + "B";
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
