/** Bounded iteration limit for process steps (NASA Power of 10). */
export const MAX_PROCESS_STEPS = 4;

/** Delay (ms) before scrolling after route navigation. */
export const SCROLL_DELAY_MS = 50;

/** Calendly embed colors – dark theme to match site */
const CALENDLY_BG = "0B0D10"; /* ink – match site background */
const CALENDLY_TEXT = "F2F4F7";
const CALENDLY_PRIMARY = "3A78FF"; /* darker than 4A88FF, still lighter than electric */

export const CALENDLY_URL =
  `https://calendly.com/stanleylabs/30min?embed_type=Inline&hide_gdpr_banner=1&background_color=${CALENDLY_BG}&text_color=${CALENDLY_TEXT}&primary_color=${CALENDLY_PRIMARY}`;

/** Shared easing for hover/transition animations. */
export const HOVER_EASE = [0.22, 1, 0.36, 1] as const;

export const heroVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: HOVER_EASE } }),
};

export const processSteps = [
  { number: "01", title: "Discover", description: "Goals, audience, content, constraints.", accentColor: "#2D6BFF", gradient: "linear-gradient(135deg, rgba(45,107,255,0.12) 0%, transparent 60%)", shadow: "rgba(45,107,255,0.1)" },
  { number: "02", title: "Design", description: "Wireframes → UI with a crisp system.", accentColor: "#FF3B3B", gradient: "linear-gradient(135deg, rgba(255,59,59,0.12) 0%, transparent 60%)", shadow: "rgba(255,59,59,0.1)" },
  { number: "03", title: "Build", description: "Fast, responsive, accessible implementation.", accentColor: "#4ADE80", gradient: "linear-gradient(135deg, rgba(74,222,128,0.12) 0%, transparent 60%)", shadow: "rgba(74,222,128,0.1)" },
  { number: "04", title: "Launch", description: "Ship, measure, iterate.", accentColor: "#A855F7", gradient: "linear-gradient(135deg, rgba(168,85,247,0.12) 0%, transparent 60%)", shadow: "rgba(168,85,247,0.1)" },
] as const;

export const services = [
  {
    title: "Landing Pages",
    price: "$1,000–$3,000+",
    desc: "Launch fast. Look premium. Optimize for conversion.",
    accentColor: "#2D6BFF",
    accentShadow: "rgba(45,107,255,0.06)",
    icon: "01",
  },
  {
    title: "Websites",
    price: "$2,500–$10,000+",
    desc: "Multi-page sites with clean UX, SEO basics, and great performance.",
    accentColor: "#FF3B3B",
    accentShadow: "rgba(255,59,59,0.06)",
    icon: "02",
  },
  {
    title: "Web Apps",
    price: "$5,000–$25,000+",
    desc: "Dashboards, portals, prototypes → production builds.",
    accentColor: "#4ADE80",
    accentShadow: "rgba(74,222,128,0.06)",
    icon: "03",
  },
] as const;

export const xrServices = [
  {
    title: "WebGL / 3D Interactive Hero",
    price: "Starting at $1,500",
    desc: "Cinematic 3D hero (Three.js/Babylon.js). Progressive enhancement + perf budget.",
    accentColor: "#22D3EE",
    accentShadow: "rgba(34,211,238,0.08)",
    icon: "XR01",
  },
  {
    title: "3D Product + Scroll Storytelling",
    price: "Starting at $3,500",
    desc: "Spin/zoom product view + scroll-driven story beats, callouts, and fallbacks.",
    accentColor: "#A855F7",
    accentShadow: "rgba(168,85,247,0.08)",
    icon: "XR02",
  },
  {
    title: "3D Configurator",
    price: "$5,000–$15,000+",
    desc: "Options, materials, and states with a clean UI and optimized asset pipeline.",
    accentColor: "#FB7185",
    accentShadow: "rgba(251,113,133,0.08)",
    icon: "XR03",
  },
  {
    title: "WebXR AR Preview (Phone/Tabletop)",
    price: "$3,000–$9,000+",
    desc: "AR preview for supported devices (quick-look style), tuned for stability + delight.",
    accentColor: "#60A5FA",
    accentShadow: "rgba(96,165,250,0.08)",
    icon: "XR04",
  },
  {
    title: "WebXR VR Showroom / Walkthrough",
    price: "$8,000–$25,000+",
    desc: "Immersive VR space for product/showcase flows with comfort-first motion.",
    accentColor: "#34D399",
    accentShadow: "rgba(52,211,153,0.08)",
    icon: "XR05",
  },
  {
    title: "WebXR Game",
    price: "$10,000–$40,000+",
    desc: "Browser-based XR game with real-time interaction, physics, and cross-device play.",
    accentColor: "#FBBF24",
    accentShadow: "rgba(251,191,36,0.08)",
    icon: "XR06",
  },
] as const;

export const workItems = [
  {
    title: "Drummaverse",
    desc: "Interactive 3D drum experience in the browser. Play and explore in an immersive musical environment built with Babylon.js.",
    tags: "React • TypeScript • Babylon.js",
    href: "https://drummaverse.nexmos.io",
    gradient: "linear-gradient(135deg, rgba(45,107,255,0.12) 0%, transparent 60%)",
    shadow: "rgba(45,107,255,0.1)",
    accentColor: "#2D6BFF",
  },
  {
    title: "Group Video Chat",
    desc: "Real-time video conferencing with WebRTC. Join rooms, share video and audio, built for low-latency collaboration.",
    tags: "WebRTC • Socket.io • Node",
    href: "https://video-chat.up.railway.app/",
    gradient: "linear-gradient(135deg, rgba(255,59,59,0.06) 0%, transparent 60%)",
    shadow: "rgba(255,59,59,0.1)",
    accentColor: "#FF3B3B",
  },
] as const;
