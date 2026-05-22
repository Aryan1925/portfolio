import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Resume from "@/components/Resume";
import Footer from "@/components/Footer";
import Contacts from "@/components/Contacts";

export default function Home() {
  return (
    <main className="bg-white text-black dark:bg-black dark:text-white">
      
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