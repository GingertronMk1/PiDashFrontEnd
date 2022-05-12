import { createApp } from "vue";
import App from "./App.vue";
import Symbols from "./symbols";
import "./assets/style.css";

createApp(App)
  .provide(Symbols.InitialiseWidgetKey, Symbols.initialiseWidget)
  .provide(Symbols.BytesToOtherKey, Symbols.bytesToOther)
  .provide(Symbols.AxiosKey, Symbols.axios)
  .mount("#app");
