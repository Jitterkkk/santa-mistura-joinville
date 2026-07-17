import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Precisa rodar antes de qualquer tween ser criado — se ficasse num useEffect
// de um componente pai (ex.: SmoothScrollProvider), componentes filhos como o
// Hero já teriam criado suas timelines antes desse efeito disparar (React
// dispara efeitos de filho pra pai), deixando os primeiros ticks com o lag
// smoothing padrão do GSAP ainda ligado — o que pode fazer uma timeline
// reportar progress()=1 sem nunca ter renderizado o frame final no DOM.
gsap.ticker.lagSmoothing(0);

export { gsap, ScrollTrigger, SplitText };
