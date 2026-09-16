import { siteConfig } from "@/lib/site";

export default function manifest() {
  return {
    name: siteConfig.title,
    short_name: siteConfig.nameShort,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}