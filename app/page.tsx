import type { Metadata } from "next";
import LoadingScreen from "@/components/layout/LoadingScreen";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Timeline from "@/components/sections/Timeline";
import Certificates from "@/components/sections/Certificates";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Davin Yoga Ardiyansyah — Information Systems Student & Developer",
};

export default function HomePage() {
  return (
    <>
      <LoadingScreen />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Timeline />
      <Certificates />
      <Contact />
    </>
  );
}
