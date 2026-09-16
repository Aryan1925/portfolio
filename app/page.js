import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Resume from "@/components/Resume";
import Footer from "@/components/Footer";
import Contacts from "@/components/Contacts";
import { siteConfig, buildProfilePageJsonLd } from "@/lib/site";

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="bg-white text-black dark:bg-black dark:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildProfilePageJsonLd()).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Resume />
      <Contacts/>
      <Footer />
    </main>
  );
}