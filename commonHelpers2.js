import"./assets/modulepreload-polyfill-ec808ebb.js";import{i}from"./assets/vendor-651d7991.js";const m=document.querySelector(".form");function n(t,e){const r={delay:t,radioChecked:e};return new Promise((o,s)=>{setTimeout(()=>{e==="fulfilled"?o(r):s(r)},t)})}m.addEventListener("submit",l);function l(t){t.preventDefault();const e=t.target,r=Number(e.elements.delay.value),o=e.elements.state.value;n(r,o).then(({delay:s})=>{i.success({title:"OK",message:`✅ Fulfilled promise in ${s} ms`})}).catch(({delay:s})=>{i.error({title:"Error",message:`❌ Rejected promise in ${s} ms`})}),e.reset()}
//# sourceMappingURL=commonHelpers2.js.map
