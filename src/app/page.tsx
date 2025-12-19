import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import ServicesGrid from "@/components/landing/services";
import Process from "@/components/landing/process";
import Projects from "@/components/landing/projects";
import Contact from "@/components/landing/contact";

function Landing() {
  return (
    <div>
      <Hero />
      <ServicesGrid />
      <Process />
      <Projects />
      <Contact />
    </div>
  )
}

export default Landing;