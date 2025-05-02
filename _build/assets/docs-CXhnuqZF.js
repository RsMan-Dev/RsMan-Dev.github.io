import{i as b,v as x,l as d,b as i,t as p,a as O,e as _,m as c,z as P,A as k,F as S}from"./web-BqXwO0ET.js";import{B as m}from"./Button-D1-gfHjJ.js";import{u as w}from"./routing-Ap8HEzwW.js";var A=p(`<div id=docs class="flex h-full"><nav class="shadow-background shadow-xl bg-background p-4 flex flex-col gap-1"><h2 class="!text-2xl font-bold !mb-4">Project Docs</h2><!$><!/><!$><!/></nav><main class="flex-1 p-4 pb-24 overflow-y-auto"><script>
        (() => {
          const e = document.querySelector("#docs main");
          const observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
              for (const node of mutation.addedNodes) {
                if (node instanceof HTMLElement) {
                  if(node.hasAttribute("innerhtml")) node.innerHTML = node.getAttribute("innerhtml");
                  node.querySelectorAll("[innerhtml]").forEach(node => {
                    node.innerHTML = node.getAttribute("innerhtml");
                  });
                }
              }
              for (const node of mutation.removedNodes) {
                if (node instanceof HTMLElement &amp;&amp; node.hasAttribute("innerhtml")) {
                  node.removeAttribute("innerhtml");
                }
              }
            }
          });
          observer.observe(e, { childList: true, subtree: true, attributes: true, attributeFilter: ["innerhtml"] });
          e.querySelectorAll("[innerhtml]").forEach(node => {
            node.innerHTML = node.getAttribute("innerhtml");
          });
        })()
      <\/script><!$><!/>`),E=p("<span>"),C=p('<div><div class="border-0 border-l border-primary border-solid pl-2">');const M=Object.keys({"./docs/index.tsx":0,"./docs/repo.tsx":0,"./docs/repo/index.tsx":0,"./docs/repo/rbxts-bridge/0-Introduction.mdx":0,"./docs/repo/rbxts-bridge/[...404].tsx":0,"./docs/repo/rbxts-bridge/fn.mdx":0,"./docs/repo/rbxts-jsnatives/0-Introduction.mdx":0,"./docs/repo/rbxts-jsnatives/JSON/parse.mdx":0,"./docs/repo/rbxts-jsnatives/JSON/stringify.mdx":0,"./docs/repo/rbxts-jsnatives/Object/0-is.mdx":0,"./docs/repo/rbxts-jsnatives/Object/1-toString.mdx":0,"./docs/repo/rbxts-jsnatives/Object/assign.mdx":0,"./docs/repo/rbxts-jsnatives/Object/create.mdx":0,"./docs/repo/rbxts-jsnatives/Object/dup.mdx":0,"./docs/repo/rbxts-jsnatives/Object/entries.mdx":0,"./docs/repo/rbxts-jsnatives/Object/equals.mdx":0,"./docs/repo/rbxts-jsnatives/Object/fromEntries.mdx":0,"./docs/repo/rbxts-jsnatives/Object/hasOwn.mdx":0,"./docs/repo/rbxts-jsnatives/Object/isArray.mdx":0,"./docs/repo/rbxts-jsnatives/Object/isCallable.mdx":0,"./docs/repo/rbxts-jsnatives/Object/isEmpty.mdx":0,"./docs/repo/rbxts-jsnatives/Object/keys.mdx":0,"./docs/repo/rbxts-jsnatives/Object/values.mdx":0,"./docs/repo/rbxts-jsnatives/Proxy/0-introduction.mdx":0,"./docs/repo/rbxts-jsnatives/Proxy/hook - apply.mdx":0,"./docs/repo/rbxts-jsnatives/Proxy/hook - get.mdx":0,"./docs/repo/rbxts-jsnatives/Proxy/hook - iter.mdx":0,"./docs/repo/rbxts-jsnatives/Proxy/hook - len.mdx":0,"./docs/repo/rbxts-jsnatives/Proxy/hook - ownKeys.mdx":0,"./docs/repo/rbxts-jsnatives/Proxy/hook - set.mdx":0,"./docs/repo/rbxts-jsnatives/Timers/setInterval.mdx":0,"./docs/repo/rbxts-jsnatives/Timers/setTimeout.mdx":0,"./docs/repo/rbxts-jsnatives/[...404].tsx":0}).filter(e=>e.startsWith("./docs/repo")&&!e.endsWith("index.tsx")&&!e.endsWith("[...404].tsx")&&!e.endsWith("repo.tsx")).map(e=>e.replace("./docs/repo","").replace(/\.\w+$/,"").split("/").slice(1)).sort((e,s)=>e.length-s.length),N=M.reduce((e,s)=>{let t=e,n=s[s.length-1];for(const o of s)t[o]||(t[o]=o===n?void 0:{}),t=t[o];return e},{});function H(e){return(()=>{var s=b(A),t=s.firstChild,n=t.firstChild,o=n.nextSibling,[a,r]=x(o.nextSibling),l=a.nextSibling,[f,v]=x(l.nextSibling),u=t.nextSibling,j=u.firstChild,g=j.nextSibling,[$,y]=x(g.nextSibling);return d(t,i(m,{class:"mb-4",onClick:"/home",children:"Back to portfolio"}),a,r),d(t,i(h,{groups:N,parentPath:"/docs/repo",nonExpandable:!0}),f,v),d(u,()=>e.children,$,y),s})()}function h(e){const s=O(()=>e.parentPath.split("/").at(-1)?.replace(/^[0-9]+-/,"")),t=w(),[n,o]=_(t.pathname.startsWith(e.parentPath)),a=()=>i(S,{get each(){return Object.keys(e.groups)},children:r=>i(h,{get groups(){return e.groups[r]},get parentPath(){return`${e.parentPath}/${r}`}})});return c(()=>c(()=>typeof e.groups>"u")()?i(m,{get class(){return`!flex !justify-between !text-start w-full !py-1 !outline-none !normal-case ${t.pathname.startsWith(e.parentPath)?"":"outline !px-0"} box-border`},get onClick(){return e.parentPath},get children(){return s()}}):c(()=>!!e.nonExpandable)()?a():[i(m,{class:"!flex !justify-between !text-start !px-0 w-full !p-1 outline !outline-none gap-2",onClick:()=>o(!n()),get children(){return[c(()=>s()),(()=>{var r=b(E);return d(r,()=>n()?"▼":"►"),r})()]}}),(()=>{var r=b(C),l=r.firstChild;return d(l,a),P(()=>k(r,`collapsible${n()?" open":""}`)),r})()])}export{H as default};
