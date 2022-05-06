import { InjectionKey } from "vue";
import { AxiosInstance } from "axios";

export const InitialiseWidgetKey: InjectionKey<
  (callback: Function, interval?: number, stopOnLostFocus?: boolean) => void
> = Symbol("InitialiseWidgetKey");

export const AxiosKey: InjectionKey<AxiosInstance> = Symbol("AxiosKey");

export const BytesToOtherKey: InjectionKey<(bytes: number) => string> =
  Symbol("BytesToOtherKey");
