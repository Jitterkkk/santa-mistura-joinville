import { Nav } from "@/components/layout/Nav";
import { Hero } from "@/components/home/Hero";
import { Sobre } from "@/components/home/Sobre";
import { Destaques } from "@/components/home/Destaques";
import { Drinks } from "@/components/home/Drinks";
import { Galeria } from "@/components/home/Galeria";

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
      </main>
    </>
  );
}
