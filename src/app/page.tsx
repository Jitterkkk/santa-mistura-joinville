import { Nav } from "@/components/layout/Nav";
import { Hero } from "@/components/home/Hero";
import { Sobre } from "@/components/home/Sobre";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Sobre />
      </main>
    </>
  );
}
