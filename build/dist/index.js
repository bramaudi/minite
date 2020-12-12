import {h} from "../web_modules/preact.js";
import Router from "./router.js";
const routes = [
  {
    path: "/counter",
    component: () => import("./views/counter.js")
  },
  {
    path: "",
    component: () => /* @__PURE__ */ h("h1", null, "Home")
  }
];
new Router(routes);
