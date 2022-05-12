import { createApp } from "vue";
import App from "./App.vue";
import * as Symbols from "./bootstrap";
import "./assets/style.css";

createApp(App)
  .provide(Symbols.InitialiseWidgetKey, Symbols.initialiseWidget)
  .provide(Symbols.BytesToOtherKey, Symbols.bytesToOther)
  .provide(Symbols.AxiosKey, Symbols.axios)
  .mount("#app");
