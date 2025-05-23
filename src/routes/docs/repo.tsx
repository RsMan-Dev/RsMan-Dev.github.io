import { useLocation } from "@solidjs/router";
import { createMemo, ParentProps } from "solid-js";

export default function(props: ParentProps) {
  const navigate = useLocation();
  const loc = createMemo(() => {
    let base = navigate.pathname.replace("/docs/repo/", "").split("/")[0]
    if(base.startsWith("rbxts-")) base = base.replace("rbxts-", "@rbxts/")
    return base;
  });
  return <>
    <h1 class="!text-4xl font-bold">{loc()}</h1>
    <hr/>
    <br/>
    {props.children}
  </>
}

