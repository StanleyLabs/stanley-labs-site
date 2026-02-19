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
  { number: "01", title: "Discover", description: "Goals, audience, content, constraints." },
  { number: "02", title: "Design", description: "Wireframes → UI with a crisp system." },
  { number: "03", title: "Build", description: "Fast, responsive, accessible implementation." },
  { number: "04", title: "Launch", description: "Ship, measure, iterate." },
] as const;

export const services = [
  { title: "Landing Pages", desc: "Launch fast. Look premium. Optimize for conversion.", accentColor: "#2D6BFF", accentShadow: "rgba(45,107,255,0.06)", icon: "01" },
  { title: "Websites", desc: "Multi-page sites with clean UX, SEO basics, and great performance.", accentColor: "#FF3B3B", accentShadow: "rgba(255,59,59,0.06)", icon: "02" },
  { title: "Web Apps", desc: "Dashboards, portals, prototypes → production builds.", accentColor: "#4ADE80", accentShadow: "rgba(74,222,128,0.06)", icon: "03" },
] as const;

export const workItems = [
  { title: "Drummaverse", tags: "React • TypeScript • Babylon.js", href: "https://drummaverse.nexmos.io", gradient: "linear-gradient(135deg, rgba(45,107,255,0.12) 0%, transparent 60%)", shadow: "rgba(45,107,255,0.1)" },
  { title: "Group Video Chat", tags: "WebRTC • Socket.io • Node", href: "https://video-chat.up.railway.app/", gradient: "linear-gradient(135deg, rgba(255,59,59,0.06) 0%, transparent 60%)", shadow: "rgba(255,59,59,0.1)" },
] as const;
