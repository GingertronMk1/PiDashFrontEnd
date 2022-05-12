import { InjectionKey } from "vue";
import { AxiosInstance } from "axios";

export const AxiosKey: InjectionKey<AxiosInstance> = Symbol("AxiosKey");

export const axios = require("axios");
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

export const BytesToOtherKey: InjectionKey<(bytes: number) => string> =
  Symbol("BytesToOtherKey");

export function bytesToOther(bytes: number): string {
  if (bytes === 0) return "0B";
  const prefixes = ["", "K", "M", "G", "T", "P"];
  const base = 1024;
  const log = Math.log(bytes) / Math.log(base);
  const logFloored = Math.floor(log);

  return (bytes / base ** logFloored).toFixed(2) + prefixes[logFloored] + "B";
}

export const InitialiseWidgetKey: InjectionKey<
  (
    callback: () => Promise<any>,
    interval?: number,
    stopOnLostFocus?: boolean
  ) => void
> = Symbol("InitialiseWidgetKey");

export function initialiseWidget(
  callback: () => Promise<any>,
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
