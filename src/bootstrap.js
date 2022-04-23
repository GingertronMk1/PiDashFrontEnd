window.axios = require("axios");

window.axios.defaults.baseURL = process.env.VUE_APP_PI_URL ?? "";
window.axios.defaults.paramsSerializer = (params) => {
  console.table(params);
  return Object.entries(params)
    .map(([key, value]) => `${key}=${JSON.stringify(value)}`)
    .join("&");
};

function getBaseLog(base, value) {
  return Math.log(value) / Math.log(base);
}

window.bytesToOther = function (bytes) {
  let amount = Number.parseInt(bytes);
  if (amount === 0) return "0B";
  prefixIndex = 0;
  const prefixes = ["", "K", "M", "G", "T", "P"];
  const base = 1024;
  const log = getBaseLog(base, amount);
  const logFloored = Math.floor(log);

  return `${(amount / base ** logFloored).toFixed(2)}${prefixes[logFloored]}B`;
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
