import { ParentProps } from "solid-js";
import { Dynamic } from "solid-js/web";

export default function Button(props: ParentProps<{
  onClick?: (() => void) | string;
  class?: string;
}>) {
  return <sticky-el>
    <Dynamic 
      component={typeof props.onClick === "string" ? "a" : "button"}
      class={(typeof props.onClick === "string" ? "btn " : "") + (props.class ?? "")}
      onClick={typeof props.onClick === "string" ? undefined : props.onClick}
      href={typeof props.onClick === "string" ? props.onClick : undefined}
    >
      {props.children}
    </Dynamic>
  </sticky-el>;
}
