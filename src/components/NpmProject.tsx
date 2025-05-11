import { isHydrated } from "@solid-primitives/lifecycle";
import { createEffect, createMemo, createResource, Resource, ResourceSource, Setter, Show, Suspense } from "solid-js";
import rbxtsLogo from "../../assets/images/rbxts_logo.png"
import Button from "./Button";

function repoUrlFromName(name: string) {
  return `https://github.com/RsMan-Dev/${name.replace("@", "").replace("/", "-")}`
}

function repoNameFromUrl<T extends string | undefined>(url: T): T {
  if(!url) return url
  return url.replace(/^(?:git\+)?https?:\/\/github\.com\/([^/]+)\/([^.]+)(?:\.git)?$/, "$1/$2") as T
}

async function resourceCacheSession<T>(canFetch: boolean, type: "npm" | "repo", name: string, or: () => Promise<T>) {
  if (!canFetch) return undefined
  const cache = sessionStorage.getItem(`${type}-${name}`)
  if (cache) return JSON.parse(cache) as T
  const res = await or()
  sessionStorage.setItem(`${type}-${name}`, JSON.stringify(res))
  return res
}

type NpmProject = { name: string, version: string, description: string, keywords: string[], repository: { type: string, url: string } }
type Repo = { name: string, description: string, owner?: { login: string, avatar_url: string }, organization?: { login: string, avatar_url: string } }

function avatarUri(repo?: Repo) {
  if(!repo) return undefined
  if(repo.organization?.avatar_url) return repo.organization.avatar_url
  switch(true){
    case repo.name.startsWith("rbxts-"):
      return rbxtsLogo
  }
}

export default function NpmProject(props: {
  name: string;
}) {
  const [data] = createResource(
    () => isHydrated(),
    async (can: boolean) => {
      if(!can) return undefined
      const npm = await resourceCacheSession<NpmProject>(
        can,
        "npm",
        props.name,
        async () => await fetch(`https://registry.npmjs.org/${props.name}`).then(res => res.json())
      )
      const gitLink = npm?.repository?.url ?? repoUrlFromName(props.name)
      const repo = await resourceCacheSession<Repo>(
        can && !!gitLink,
        "repo",
        repoNameFromUrl(gitLink),
        async () => await fetch(`https://api.github.com/repos/${repoNameFromUrl(gitLink)}`).then(res => res.json())
      )
      return {
        npm,
        repo,
        gitLink,
        avatar: avatarUri(repo)
      }
    }
  );

  return <SuspenseShow when={data.state == "ready"} fallback={
    <Template shimmer avatar={undefined} name={props.name} description={""} />
  }>
    <Template
      avatar={data()?.avatar} 
      name={props.name} 
      description={data()?.repo?.description}
      npmUrl={`https://npmjs.com/package/${props.name}`}
      repoUrl={data()?.gitLink}
      docsUrl={`/docs/repo/${repoNameFromUrl(data()?.gitLink)?.split("/")[1]}`}
      keywords={data()?.npm?.keywords}
      repoName={repoNameFromUrl(data()?.gitLink)}
    />
  </SuspenseShow>;
}

function SuspenseShow(props: {
  when: boolean;
  fallback: any;
  children: any;
}) {
  return <Suspense fallback={props.fallback}>
    <Show when={props.when} fallback={props.fallback}>
      {props.children}
    </Show>
  </Suspense>
}


function Template(props: {
  shimmer?: boolean;
  avatar?: string;
  name?: string;
  description?: string;
  npmUrl?: string;
  repoUrl?: string;
  docsUrl?: string;
  keywords?: string[];
  repoName?: string;
}) {
  return <div class="flex gap-8 fade-in-bottom">
    <Show when={props.avatar} fallback={
      <Show when={props.shimmer}>
        <div class="w-24 aspect-1 rounded-lg shimmer"></div>
      </Show>
    }>  
      <img src={props.avatar} alt={props.name} class="w-24 aspect-1 rounded-lg self-center" loading="lazy" />
    </Show>
    <div class="flex flex-col justify-center items-start gap-3 flex-1">
      <div class={`text-lg font-bold flex gap-2 items-center leading-none`}>
        <span class={`${props.shimmer ? "shimmer" : ""}`}>
          {props.shimmer ? "Loading Title..." : props.name}
        </span>
        <Show when={!props.shimmer} fallback={
          Array.from({ length: 3 }).map(() => <div class="h-4.5 aspect-4 !rounded-md translate-y-px shimmer"></div>)
        }>
          <img src={`https://img.shields.io/npm/v/${props.name}.svg`} alt={`${props.name} version`} class="h-4.5 translate-y-px" loading="lazy" />
          <img src={`https://img.shields.io/npm/dt/${props.name}.svg`} alt={`${props.name} downloads`} class="h-4.5 translate-y-px" loading="lazy" />
          <img src={`https://img.shields.io/github/license/${props.repoName}.svg`} alt={`${props.name} license`} class="h-4.5 translate-y-px" loading="lazy" />
        </Show>
      </div>
      <Show when={props.keywords}>
        <small class="flex gap-2 -mt-2 inline-block">
          {props.keywords!.map(keyword => <span class="font-light text-gray-500">{keyword}</span>)}
        </small>
      </Show>
      <div class={`text-sm text-gray-900 ${props.shimmer ? "shimmer" : ""}`}>
        {
          props.shimmer 
            ? "Loading Description... Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." 
            : props.description
        }
      </div>
    </div>
    <div class="flex justify-center items-center gap-2">
      <Button onClick={props.npmUrl} class={`btn outline${props.shimmer ? " shimmer" : ""}`}>
        {props.shimmer ? "Loading..." : "Npm"}
      </Button>
      <Button onClick={props.repoUrl} class={`btn outline${props.shimmer ? " shimmer" : ""}`}>
        {props.shimmer ? "Loading..." : "Git"}
      </Button>
      <Button onClick={props.docsUrl} class={`btn${props.shimmer ? " shimmer" : ""}`}>
        {props.shimmer ? "Loading..." : "Docs"}
      </Button>
    </div>
  </div>
}
