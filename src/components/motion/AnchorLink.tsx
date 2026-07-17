"use client";

import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { useLenis } from "./SmoothScrollProvider";

const NAV_OFFSET = -96;

type AnchorLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href" | "onClick"> & {
  href: `#${string}`;
  onNavigate?: () => void;
};

export function AnchorLink({ href, onNavigate, ...rest }: AnchorLinkProps) {
  const lenisRef = useLenis();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const id = href.slice(1);
    const el = document.getElementById(id);
    const lenis = lenisRef?.current;
    if (el && lenis) {
      event.preventDefault();
      lenis.scrollTo(el, { offset: NAV_OFFSET });
    }
    onNavigate?.();
  }

  return <a href={href} onClick={handleClick} {...rest} />;
}
