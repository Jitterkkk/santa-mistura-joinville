import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Sobre } from "@/components/home/Sobre";
import { Destaques } from "@/components/home/Destaques";
import { Drinks } from "@/components/home/Drinks";
import { Galeria } from "@/components/home/Galeria";
import { Reserva } from "@/components/home/Reserva";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Sobre />
        <Destaques />
        <Drinks />
        <Galeria />
        <Reserva />
      </main>
      <Footer />
    </>
  );
}
