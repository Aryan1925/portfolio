import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Resume from "@/components/Resume";
import Footer from "@/components/Footer";
import Contacts from "@/components/Contacts";
import { buildProfilePageJsonLd } from "@/lib/site";

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