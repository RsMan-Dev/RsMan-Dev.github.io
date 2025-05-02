import {Component} from "solid-js";
import Land from "~/components/Land";
import NpmProject from "~/components/NpmProject";

const Home: Component = (_) => {
  return <>
    <Land/>

    <section id="about" class="py-24 -mt-24 flex flex-col gap-12">
      <h2 class="fade-in-left">About me</h2>
      <p class="fade-in-left">
        I'm a professional web and mobile developer dedicated to creating elegant, functional digital solutions. <br/>
        From a young age, I've been passionate about programming, which led me to pursue this career path. <br/>
        I continuously seek opportunities to learn and build innovative technologies, resulting in a diverse
        portfolio spanning websites, Roblox minigames, and specialized software projects.
      </p>
    </section>

    <section id="projects" class="py-24 -mt-24 flex flex-col gap-12">
      <h2 class="fade-in-left">Projects</h2>

      <NpmProject name="@rbxts/jsnatives" />
      <NpmProject name="@rbxts/bridge" />
      <NpmProject name="@rbxts/signals" />
      <NpmProject name="@rbxts/solid" />
    </section>

    {/* <div class="h-100vh"></div>
    <div class="h-100vh"></div> */}
  </>
}

export default Home 