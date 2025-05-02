import { defineConfig } from "@solidjs/start/config";
/* @ts-ignore */
import pkg from "@vinxi/plugin-mdx";
import UnoCSS from "unocss/postcss";
import { presetWind3 } from "unocss";

import rehypeRaw from "rehype-raw";
import rehypeExpressiveCode from "rehype-expressive-code";
import { nodeTypes } from "@mdx-js/mdx";


const { default: mdx } = pkg;
export default defineConfig({
  extensions: ["mdx", "md"],
  vite: {
    plugins: [
      mdx.withImports({})({
        jsx: true,
        jsxImportSource: "solid-js",
        providerImportSource: "solid-mdx",
        rehypePlugins: [
          [rehypeRaw, { passThrough: nodeTypes }],
          [rehypeExpressiveCode, { 
            themes: ["min-light", "min-light"],
            tabWidth: 2,
            frames: false,
          }],
        ],
      }),
      {
        name: "rehype-expressive-code-fix",
        enforce: "post",
        transform(code, id) {
          if(code.includes("testtttttttttttt.tsx")) {
            console.log(code);
          }
          return code.replace(/dangerouslysetinnerhtml\"\s*,\s*(_\$escape\()?\{\s*__html:\s*((?:[^\{]*(?:\{.*\}))+[^\}]*)\}/g, "innerHtml\", $1$2");
        }
      }
    ],
    css: {
      postcss: {
        plugins: [
          UnoCSS({
            configOrPath: {
              presets: [
                presetWind3({
                })
              ],
              outputToCssLayers: true,
              content: {
                filesystem: [
                  './src/**/*.(tsx|mdx|md)',
                ]
              },
              theme: {
                colors: {
                  primary: {
                    DEFAULT: "#6e55df",
                    light: "#c5bfe3"
                  },
                  secondary: {
                    DEFAULT: "#e68546",
                    light: "#edceba",
                  },
                  background: {
                    DEFAULT: "#F5F4F1",
                  },
                }
              }
            },
          })
        ],
      },
    },
  },
  ssr: true,
  server: {
    baseURL: process.env.BASE_PATH,
    preset: "static",
    prerender: {
      routes: ["/home", "/docs"],
    }
  }
});
