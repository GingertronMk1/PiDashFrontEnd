(window as any).axios = require("axios");

(window as any).axios.defaults.baseURL = process.env.VUE_APP_PI_URL ?? "";
(window as any).axios.defaults.paramsSerializer = (params: object) => {
  return Object.entries(params)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((v) => `${key}=${v}`).join("&");
      }
      return `${key}=${value}`;
    })
    .join("&");
};

(window as any).bytesToOther = function (bytes: number) {
  if (bytes === 0) return "0B";
  const prefixes = ["", "K", "M", "G", "T", "P"];
  const base = 1024;
  const log = Math.log(bytes) / Math.log(base);
  const logFloored = Math.floor(log);

  return (bytes / base ** logFloored).toFixed(2) + prefixes[logFloored] + "B";
};

(window as any).initialiseWidget = function (
  callback: Function,
  interval: number = 1000,
  stopOnLostFocus: boolean = true
) {
  callback();
  setInterval(() => {
    if (document.hasFocus() || !stopOnLostFocus) {
      callback();
    }
  }, interval);
};
