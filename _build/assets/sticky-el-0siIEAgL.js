function m(r){const t="touches"in r?r.touches[0]:r;return[t?.clientX??-100,t?.clientY??-100]}function f(r,t,e,o=!1){const s=r.getBoundingClientRect(),i=window.getComputedStyle(r),n=new WebKitCSSMatrix(i.transform);return t=t-s.left+n.m41-(o?s.width:0)/2,e=e-s.top+n.m42-(o?s.height:0)/2,[t,e]}function u(r,t,...e){let o,s,i,n,d;if(e.length==1){const v=r.getBoundingClientRect(),c=e[0].getBoundingClientRect();o=c.left+c.width/2-v.left,s=c.top+c.height/2-v.top,i=c.width,n=c.height,d=getComputedStyle(e[0]).borderRadius}else o=e[0],s=e[1];o?t.style.setProperty("--c-x",`${o}px`):t.style.removeProperty("--c-x"),s?t.style.setProperty("--c-y",`${s}px`):t.style.removeProperty("--c-y"),i?t.style.setProperty("--c-w",typeof i=="number"?`${i}px`:i):t.style.removeProperty("--c-w"),n?t.style.setProperty("--c-h",typeof n=="number"?`${n}px`:n):t.style.removeProperty("--c-h"),d?t.style.setProperty("--c-r",typeof d=="number"?`${d}px`:d):t.style.removeProperty("--c-r")}class h extends HTMLElement{constructor(){super();const t=({currentTarget:s})=>{s instanceof HTMLElement&&(s.style.transition="transform 0.1s",setTimeout(()=>s.style.transition="",100),this.hasAttribute("factor")&&s.style.setProperty("--factor",this.getAttribute("factor")??"0.5"))},e=s=>u(this,this,...f(this,...m(s),!0)),o=s=>setTimeout(()=>u(this,this,0,0));this.addEventListener("mouseenter",t,{passive:!0}),this.addEventListener("touchstart",t,{passive:!0}),this.addEventListener("mousemove",e,{passive:!0}),this.addEventListener("touchmove",e,{passive:!0}),this.addEventListener("mouseleave",o,{passive:!0}),this.addEventListener("touchend",o,{passive:!0})}}customElements.get("sticky-el")||customElements.define("sticky-el",h);let a,l;const g=r=>{if(!(r.target instanceof HTMLElement)||!(r.currentTarget instanceof HTMLElement))return;const t=r.currentTarget.querySelector("sticky-cursor"),e=r.target.closest("sticky-el");t&&(l&&l!==e&&(a=clearInterval(a)),t.style.setProperty("--c-opacity","1"),e instanceof h?(u(document.body,t,e),l=e,a||(t.style.setProperty("--move-transition","0.1s"),setTimeout(()=>t.style.setProperty("--move-transition",""),100),a=setInterval(()=>u(document.body,t,e),10))):(l=void 0,a=clearInterval(a)??void 0,u(document.body,t,...f(document.body,...m(r)))))};let p=0;window.addEventListener("scroll",r=>{const t=document.body.querySelector("sticky-cursor");if(!t)return console.log("no target");const e=t.style.getPropertyValue("--c-y"),o=window.scrollY-p;p=window.scrollY,e&&t.style.setProperty("--c-y",`${parseInt(e)+o}px`)},{passive:!0});document.body.addEventListener("mousemove",g,{passive:!0});document.body.addEventListener("touchmove",g,{passive:!0});const y=r=>{!l&&r.currentTarget instanceof HTMLElement&&r.currentTarget.style.removeProperty("--c-opacity")};document.body.addEventListener("mouseleave",y,{passive:!0});document.body.addEventListener("touchend",y,{passive:!0});document.body.addEventListener("click",y,{passive:!0});const E=`
html, body{height: 100%;}

body sticky-cursor{
  --c-x: 0px;
  --c-y: 0px;
  --c-xd: 0px;
  --c-yd: 0px;
  --c-r: 1.5rem;
  --c-w: 2rem;
  --c-h: 2rem;
  --transition: 0.15s;
  --move-transition: 0s;
  --c-delta: 0.5rem;
  --c-opacity: 0;

  pointer-events: none;
  border: 1px solid var(--primary-color);
  position: absolute;
  overflow: clip;
  left: var(--c-x);
  top: var(--c-y);
  border-radius: var(--c-r);
  width: calc(var(--c-w) + var(--c-delta) * 2);
  height: calc(var(--c-h) + var(--c-delta) * 2);
  transform: translate(-50%, -50%);
  transition: width var(--transition), height var(--transition), border-radius var(--transition), opacity var(--transition), left var(--move-transition), top var(--move-transition);
  z-index: 2147483647;
  opacity: var(--c-opacity);
}

body:active sticky-cursor{
  --c-delta: 0.25rem;
}


sticky-el{
  display: block;
  --c-x: 0px;
  --c-y: 0px;
  --factor: 0.25;
  transform: translate(calc(var(--factor) * var(--c-x)), calc(var(--factor) * var(--c-y)));
}

sticky-el:not(:hover){
  transition: transform 0.3s;
}
`,b=document.createElement("style");b.innerHTML=E;document.head.insertAdjacentElement("beforeend",b);export{h as default};
