"use client";

import { useRef, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { cn } from "@/lib/cn";

const RAW_WORDS = [
  { text: "COMEÇAR", color: "text-entrada" },
  { text: "BRINDAR", color: "text-drink" },
  { text: "SENTIR-SE BEM", color: "text-principal" },
  { text: "SER FELIZ", color: "text-doce" },
  { text: "VOLTAR SEMPRE", color: "text-ink" },
] as const;

const SHORTEST_LEN = Math.min(...RAW_WORDS.map((w) => w.text.length));
const WORDS = RAW_WORDS.map((w) => ({ ...w, scale: SHORTEST_LEN / w.text.length }));

const WRAP_CLASS =
  "inline-block font-display uppercase leading-none text-[length:calc(clamp(2.75rem,11vw,7.5rem)*var(--word-scale))]";

const CHANGE_INTERVAL = 2800;

export function RotatingWord() {
  const spanRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = spanRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      const word = WORDS[0];
      el.className = cn(WRAP_CLASS, word.color);
      el.style.setProperty("--word-scale", String(word.scale));
      el.textContent = word.text;
      return;
    }

    let split: SplitText | null = null;
    let index = 0;
    let timeoutId: number;

    function renderWord(i: number) {
      if (!el) return;
      const word = WORDS[i];
      // revert() PRECISA vir antes de trocar o texto: ele restaura o
      // snapshot original capturado pelo SplitText anterior, então
      // chamá-lo depois de já ter setado o texto novo desfazia a troca
      // (o texto voltava pra palavra antiga, só a cor ficava certa).
      split?.revert();
      el.className = cn(WRAP_CLASS, word.color);
      el.style.setProperty("--word-scale", String(word.scale));
      el.textContent = word.text;
      split = new SplitText(el, { type: "chars" });
      gsap.fromTo(
        split.chars,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.6, ease: "power4.out", stagger: 0.02 }
      );
    }

    function loop() {
      timeoutId = window.setTimeout(() => {
        const next = (index + 1) % WORDS.length;
        if (split) {
          gsap.to(split.chars, {
            yPercent: -110,
            opacity: 0,
            duration: 0.4,
            ease: "power3.in",
            stagger: 0.015,
            onComplete: () => {
              index = next;
              renderWord(next);
              loop();
            },
          });
        }
      }, CHANGE_INTERVAL);
    }

    renderWord(0);
    loop();

    return () => {
      window.clearTimeout(timeoutId);
      split?.revert();
    };
  }, []);

  return (
    <span
      ref={spanRef}
      className={cn(WRAP_CLASS, "text-entrada")}
      style={{ "--word-scale": 1 } as CSSProperties}
    />
  );
}
