import type { Metadata } from "next";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Includes from "@/components/Includes";
import Intro from "@/components/Intro";
import LiveExample from "@/components/LiveExample";
import Process from "@/components/Process";
import Stage from "@/components/Stage";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** Página única de ejemplos: todo ocurre con el scroll, en este orden. */
export default function Home() {
  return (
    <>
      <main id="contenido">
        <Hero />
        <Intro />
        <Stage />
        <Process />
        <Includes />
        <LiveExample />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
