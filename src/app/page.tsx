import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import Whatsapplink from '@/components/landing/whatsapplink';
import ServicesGrid from "@/components/landing/services";
import Process from "@/components/landing/process";
import Footer from "@/components/landing/footer";
import Projects from "@/components/landing/projects";
import ServicesGrid2 from "@/components/landing/servicesGrid";
import ContactImage from "@/components/landing/contactImage";

function Landing() {
  return (
    <div>
      <Navbar />
      <Hero />
      <ServicesGrid />
      <Process />
      <Whatsapplink />
      <Projects />
      <ContactImage />
      <Footer />
    </div>
  )
}

export default Landing;