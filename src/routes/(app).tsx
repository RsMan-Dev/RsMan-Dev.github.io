import {ParentComponent} from "solid-js";
import Button from "~/components/Button";

const AppLayout: ParentComponent = (props) => {
  return <>
    <nav>
      <Button onClick="/home#about" class="outline">About me</Button>
      <Button onClick="/home#projects" class="outline">My Projects</Button>
      <Button onClick="/docs" class="outline">Project Docs</Button>
    </nav>
    {props.children}
  </>
}

export default AppLayout