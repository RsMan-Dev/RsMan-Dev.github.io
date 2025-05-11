import { useLocation, useNavigate } from "@solidjs/router";
import { createMemo, createSignal, For, onCleanup, ParentProps } from "solid-js";

import "./docs.css";
import Button from "~/components/Button";

const filePathes = Object.keys(import.meta.glob("./docs/**/*"))
  .filter(path => {
    return path.startsWith("./docs/repo") &&
    !path.endsWith("index.tsx") && 
    !path.endsWith("[...404].tsx") && 
    !path.endsWith("repo.tsx")
  })
  .map(path => path.replace("./docs/repo", "").replace(/\.\w+$/, "").split("/").slice(1))
  .sort((a, b) => a.length - b.length);

interface FileGroup {
  [key: string]: FileGroup | undefined;
}

const fileGroups = filePathes.reduce((acc, path) => {
  let cAcc = acc, last = path[path.length - 1];
  for(const p of path){
    if(!cAcc[p]){
      cAcc[p] = p === last ? undefined : {};
    }
    cAcc = cAcc[p] as FileGroup;
  }
  return acc;
}, {} as FileGroup);

"".search

export default function Docs( props: ParentProps) {
  return <div id="docs" class="flex h-full">
    <nav class="shadow-background shadow-xl bg-background p-4 flex flex-col gap-1 overflow-y-auto">
      <h2 class="!text-2xl font-bold !mb-4">Project Docs</h2>
      <Button onClick={"/home"}>Back to portfolio</Button>
      <div class="h-2"/>
      <NavGroup groups={fileGroups} parentPath="/docs/repo" nonExpandable/>
    </nav>
    <main ref={e => {
      function applyInnerHTML(node: HTMLElement){
        if(node.hasAttribute("innerhtml")) node.innerHTML = node.getAttribute("innerhtml")!;
        node.querySelectorAll("[innerhtml]").forEach(node => {
          node.innerHTML = node.getAttribute("innerhtml")!;
        });
      }

      const observer = new MutationObserver(mutations => {
        for (const mutation of mutations)
          for (const node of mutation.addedNodes)
            if (node instanceof HTMLElement) applyInnerHTML(node);
      });
      observer.observe(e, { childList: true, subtree: true, attributes: true, attributeFilter: ["innerhtml"] });
      onCleanup(() => observer.disconnect());
      applyInnerHTML(e);
    }} class="flex-1 p-4 pb-24 overflow-y-auto">
      {props.children}
      {/* instant innerHTML */}
      <script>{`
        document.querySelectorAll("[innerhtml]").forEach(node => node.innerHTML = node.getAttribute("innerhtml"));
        document.currentScript?.remove();
      `}</script>
    </main>
  </div>
}

function NavGroup(props: {groups: FileGroup | undefined, parentPath: string, nonExpandable?: boolean }) {
  const name = createMemo(() => props.parentPath.split("/").at(-1)?.replace(/^[0-9]+-/, "")),
        history = useLocation(),
        [expanded, setExpanded] = createSignal(history.pathname.startsWith(props.parentPath));

  const childs = () => <For each={Object.keys(props.groups!)}>{k => 
    <NavGroup groups={props.groups![k]} parentPath={`${props.parentPath}/${k}`} />
  }</For>

  return <>
    { typeof props.groups === "undefined" 
      ? <Button 
          class={`!flex !justify-between !text-start w-full !py-1 !outline-none !normal-case ${decodeURIComponent(history.pathname).startsWith(props.parentPath) ? "" : "outline !px-0"} box-border`}
          onClick={props.parentPath}
        >{name()}</Button>
      : props.nonExpandable
        ? childs() 
        : <>
          <Button 
            class="!flex !justify-between !text-start !px-0 w-full !p-1 outline !outline-none gap-2"
            onClick={() => setExpanded(!expanded())}
          >
            {name()}
            <span>{expanded() ? "▼" : "►"}</span>
          </Button>
          <div class={`collapsible${expanded() ? " open" : ""}`}>
            <div class={`border-0 border-l border-primary border-solid pl-2`}>
              {childs()}
            </div>
          </div>
        </>
    }
  </>
}
