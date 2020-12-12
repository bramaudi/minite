import * as React from "../../web_modules/preact.js";
import {useState} from "../../web_modules/preact/hooks.js";
function Counter() {
  const [count, setCount] = useState(0);
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("h1", null, "Counter"), /* @__PURE__ */ h("p", null, "Count: ", count));
}
export default Counter;
