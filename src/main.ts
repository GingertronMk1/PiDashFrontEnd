import { createApp } from "vue";
import App from "./App.vue";
import { InitialiseWidgetKey, AxiosKey, BytesToOtherKey } from "./symbols";
import "./assets/style.css";

const axios = require("axios");
axios.defaults.baseURL = process.env.VUE_APP_PI_URL ?? "";
axios.defaults.paramsSerializer = (params: object) => {
  return Object.entries(params)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((v) => `${key}=${v}`).join("&");
      }
      return `${key}=${value}`;
    })
    .join("&");
};

function bytesToOther(bytes: number): string {
  if (bytes === 0) return "0B";
  const prefixes = ["", "K", "M", "G", "T", "P"];
  const base = 1024;
  const log = Math.log(bytes) / Math.log(base);
  const logFloored = Math.floor(log);

  return (bytes / base ** logFloored).toFixed(2) + prefixes[logFloored] + "B";
}

function initialiseWidget(
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
}

createApp(App)
  .provide(InitialiseWidgetKey, initialiseWidget)
  .provide(BytesToOtherKey, bytesToOther)
  .provide(AxiosKey, axios)
  .mount("#app");
