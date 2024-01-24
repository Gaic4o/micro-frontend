import './style.css'
import { setupCounter } from './counter.ts'
import {loadFragment} from "./fragment";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="main">교무실</div>
  <div
    id="class-one-manager"
    data-fragment="http://localhost:3002/classOne/fragments/manager"
  ></div>
`;

loadFragment(
    document.querySelector<HTMLDivElement>("#class-one-manager")!
);

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
