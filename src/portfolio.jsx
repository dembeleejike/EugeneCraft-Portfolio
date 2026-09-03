import React, { useState, useEffect, useRef } from "react";
import {
  Menu, X, Mail, MessageCircle, ExternalLink, ArrowRight, ArrowLeft,
  Terminal, FileDown, MapPin, GitBranch, CheckCircle2, Clock, Archive, Code2, Copy, Check,
  Layers, Server, Database, Globe, Boxes, Sparkles, GraduationCap, Briefcase, Send, Quote,
  ChevronDown, ImageOff
} from "lucide-react";

import {
  PROFILE, HIGHLIGHTS, WHAT_I_DO, SKILLS, FEATURED_PROJECTS, OTHER_PROJECTS,
  JOURNEY, EDUCATION, LEARNING, SERVICES, TESTIMONIALS, LAST_UPDATED
} from "./data";

// lucide-react dropped brand/logo icons — these small inline SVGs replace
// GitHub and LinkedIn so the site never breaks on a lucide version bump.
function GithubIcon({ size = 18, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.81 1.19 1.83 1.19 3.09 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .31.21.67.8.56A10.51 10.51 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" />
    </svg>
  );
}
function LinkedinIcon({ size = 18, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

/* =================================================================
   TOKENS
================================================================== */
const C = {
  bg: "#0B0D0F",
  surface: "#14171A",
  surfaceHi: "#1B1F23",
  border: "#262B2F",
  text: "#E7E9EA",
  muted: "#8B9296",
  faint: "#5B6165",
  amber: "#F0B429",
  teal: "#5EEAD4",
  green: "#4ADE80",
};

const STATUS_MAP = {
  live: { label: "Live", color: C.green, icon: CheckCircle2 },
  development: { label: "In development", color: C.amber, icon: Clock },
  archived: { label: "Archived", color: C.faint, icon: Archive },
};

const FONTS = (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap');
    .ff-mono { font-family: 'JetBrains Mono', monospace; }
    .ff-body { font-family: 'Inter', sans-serif; }
    .reveal { opacity: 0; transform: translateY(14px); transition: opacity .6s ease, transform .6s ease; }
    .reveal.show { opacity: 1; transform: translateY(0); }
    .hover-card { transition: transform .2s ease, border-color .2s ease; }
    .hover-card:hover { transform: translateY(-3px); border-color: ${C.amber}66 !important; }
    .link-underline { position: relative; }
    .link-underline::after { content: ""; position: absolute; left: 0; bottom: -2px; width: 0; height: 1px; background: ${C.amber}; transition: width .2s ease; }
    .link-underline:hover::after { width: 100%; }
    ::selection { background: ${C.amber}; color: ${C.bg}; }
    input, textarea, select { outline: none; }
    input:focus, textarea:focus, select:focus { border-color: ${C.amber} !important; }
  `}</style>
);

/* =================================================================
   SCROLL REVEAL HOOK
================================================================== */
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShown(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ children, className = "" }) {
  const [ref, shown] = useReveal();
  return <div ref={ref} className={`reveal ${shown ? "show" : ""} ${className}`}>{children}</div>;
}

/* =================================================================
   PRIMITIVES
================================================================== */
function Eyebrow({ index, children }) {
  return (
    <div className="ff-mono text-xs flex items-center gap-2 mb-3" style={{ color: C.amber }}>
      <span style={{ color: C.faint }}>{index}</span> {children}
    </div>
  );
}

function Pill({ children }) {
  return (
    <span className="ff-mono text-[11px] px-2 py-1" style={{ background: C.surfaceHi, color: C.muted, border: `1px solid ${C.border}` }}>
      {children}
    </span>
  );
}

function StatusBadge({ status }) {
  const s = STATUS_MAP[status] || STATUS_MAP.development;
  const Icon = s.icon;
  return (
    <span className="ff-mono text-[11px] inline-flex items-center gap-1.5 px-2 py-1" style={{ border: `1px solid ${s.color}55`, color: s.color }}>
      <Icon size={11} /> {s.label}
    </span>
  );
}

function PrimaryBtn({ children, href, icon: Icon, onClick, ariaLabel }) {
  const Tag = href ? "a" : "button";
  return (
    <Tag href={href} target={href ? "_blank" : undefined} rel={href ? "noreferrer" : undefined} onClick={onClick}
      aria-label={ariaLabel} className="ff-mono text-xs uppercase tracking-wide inline-flex items-center gap-2 px-5 py-3 transition-opacity hover:opacity-85"
      style={{ background: C.amber, color: C.bg, fontWeight: 700 }}>
      {children} {Icon && <Icon size={14} />}
    </Tag>
  );
}

function GhostBtn({ children, href, icon: Icon, onClick, ariaLabel }) {
  const Tag = href ? "a" : "button";
  return (
    <Tag href={href} target={href ? "_blank" : undefined} rel={href ? "noreferrer" : undefined} onClick={onClick}
      aria-label={ariaLabel} className="ff-mono text-xs uppercase tracking-wide inline-flex items-center gap-2 px-5 py-3 transition-colors"
      style={{ border: `1px solid ${C.border}`, color: C.text }}>
      {children} {Icon && <Icon size={14} />}
    </Tag>
  );
}

function ImageSlot({ url, label, tall }) {
  if (url) {
    return <img src={url} alt={label} className={`w-full object-cover ${tall ? "h-72 md:h-96" : "h-44"}`} />;
  }
  return (
    <div className={`w-full flex flex-col items-center justify-center gap-2 ff-mono text-xs uppercase tracking-widest ${tall ? "h-72 md:h-96" : "h-44"}`}
      style={{ background: C.surfaceHi, color: C.faint, border: `1px dashed ${C.border}` }}>
      <ImageOff size={20} />
      {label}
    </div>
  );
}

/* =================================================================
   HEADER / FOOTER
================================================================== */
function Header({ active, setActive, menuOpen, setMenuOpen }) {
  const links = [["hero", "~/home"], ["about", "~/about"], ["skills", "~/skills"], ["projects", "~/projects"], ["services", "~/services"], ["experience", "~/experience"], ["contact", "~/contact"]];
  return (
    <header className="sticky top-0 z-40" style={{ background: `${C.bg}EE`, borderBottom: `1px solid ${C.border}`, backdropFilter: "blur(6px)" }}>
      <div className="max-w-5xl mx-auto px-5 md:px-8 h-14 flex items-center justify-between">
        <button onClick={() => setActive("hero")} className="ff-mono text-sm flex items-center gap-2" style={{ color: C.text }}>
          <Terminal size={16} style={{ color: C.amber }} /> {PROFILE.brand}
        </button>
        <nav className="hidden lg:flex items-center gap-5">
          {links.map(([id, label]) => (
            <button key={id} onClick={() => setActive(id)} className="ff-mono text-xs transition-colors" style={{ color: active === id ? C.amber : C.muted }}>
              {label}
            </button>
          ))}
        </nav>
        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: C.text }} aria-label="Toggle menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {menuOpen && (
        <div className="lg:hidden px-5 pb-4 flex flex-col gap-3" style={{ borderTop: `1px solid ${C.border}` }}>
          {links.map(([id, label]) => (
            <button key={id} onClick={() => { setActive(id); setMenuOpen(false); }} className="ff-mono text-xs text-left pt-3" style={{ color: active === id ? C.amber : C.muted }}>
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

function Footer({ setActive }) {
  const links = [["hero", "Home"], ["about", "About"], ["skills", "Skills"], ["projects", "Projects"], ["services", "Services"], ["contact", "Contact"]];
  return (
    <footer style={{ borderTop: `1px solid ${C.border}` }}>
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <p className="ff-mono text-lg font-bold mb-2" style={{ color: C.text }}>{PROFILE.brand}</p>
          <p className="ff-body text-sm italic" style={{ color: C.amber }}>"{PROFILE.motto}"</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 content-start">
          {links.map(([id, label]) => (
            <button key={id} onClick={() => setActive(id)} className="ff-mono text-xs link-underline" style={{ color: C.muted }}>{label}</button>
          ))}
        </div>
        <div className="flex gap-4 md:justify-end items-start">
          <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub" style={{ color: C.muted }}><GithubIcon size={18} /></a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" style={{ color: C.muted }}><LinkedinIcon size={18} /></a>
          <a href={`mailto:${PROFILE.email}`} aria-label="Email" style={{ color: C.muted }}><Mail size={18} /></a>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-5 flex flex-wrap items-center justify-between gap-3 ff-mono text-[11px]" style={{ borderTop: `1px solid ${C.border}`, color: C.faint }}>
        <span className="flex items-center gap-2">
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, display: "inline-block" }} /> all systems operational
        </span>
        <span>© {new Date().getFullYear()} {PROFILE.name} — build {LAST_UPDATED}</span>
      </div>
    </footer>
  );
}

/* =================================================================
   HERO
================================================================== */
function Hero({ setActive }) {
  const [copied, setCopied] = useState(false);
  const copyEmail = () => {
    navigator.clipboard?.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <section style={{ background: C.bg }}>
      <div className="max-w-5xl mx-auto px-5 md:px-8 pt-20 pb-16 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">
        <div>
          <p className="ff-mono text-xs mb-4" style={{ color: C.amber }}>{PROFILE.role}</p>
          <h1 className="ff-body font-extrabold leading-tight" style={{ color: C.text, fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
            {PROFILE.name}
          </h1>
          <p className="ff-mono text-lg mt-3" style={{ color: C.teal }}>"{PROFILE.motto}"</p>
          <p className="ff-body text-base md:text-lg mt-6 leading-relaxed max-w-xl" style={{ color: C.muted }}>
            {PROFILE.intro}
          </p>
          <p className="ff-mono text-xs mt-4 flex items-center gap-1.5" style={{ color: C.faint }}>
            <MapPin size={12} /> {PROFILE.location}
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <PrimaryBtn onClick={() => setActive("projects")} icon={ArrowRight}>View projects</PrimaryBtn>
            {PROFILE.resumeUrl ? (
              <GhostBtn href={PROFILE.resumeUrl} icon={FileDown}>Download CV</GhostBtn>
            ) : null}
            <GhostBtn onClick={() => setActive("contact")} icon={ArrowRight}>Contact me</GhostBtn>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub" style={{ color: C.muted }}><GithubIcon size={18} /></a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" style={{ color: C.muted }}><LinkedinIcon size={18} /></a>
            <button onClick={copyEmail} aria-label="Copy email" className="ff-mono text-xs inline-flex items-center gap-1.5" style={{ color: C.muted }}>
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied" : PROFILE.email}
            </button>
          </div>
        </div>
        <div className="justify-self-center">
          <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden flex items-center justify-center" style={{ border: `2px solid ${C.border}`, background: C.surfaceHi }}>
            {PROFILE.photoUrl ? (
              <img src={PROFILE.photoUrl} alt={PROFILE.name} className="w-full h-full object-cover" />
            ) : (
              <span className="ff-mono text-[10px] uppercase tracking-widest text-center px-4" style={{ color: C.faint }}>Your photo</span>
            )}
          </div>
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {HIGHLIGHTS.map(h => (
            <div key={h.l}>
              <p className="ff-mono text-2xl font-bold" style={{ color: C.amber }}>{h.n}</p>
              <p className="ff-mono text-[11px] uppercase tracking-wide mt-1" style={{ color: C.faint }}>{h.l}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-4 flex flex-wrap items-center justify-between gap-2 ff-mono text-[11px]" style={{ color: C.faint }}>
        <span className="flex items-center gap-2"><span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, display: "inline-block" }} /> available for {PROFILE.availableFor[0].toLowerCase()}</span>
        <span>last updated {LAST_UPDATED}</span>
      </div>
    </section>
  );
}

/* =================================================================
   ABOUT
================================================================== */
function About() {
  return (
    <section className="max-w-5xl mx-auto px-5 md:px-8 py-20" style={{ borderBottom: `1px solid ${C.border}` }}>
      <Reveal>
        <Eyebrow index="01">About</Eyebrow>
        <h2 className="ff-body text-2xl md:text-3xl font-bold mb-8" style={{ color: C.text }}>Who I am</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-4">
            <p className="ff-body text-sm leading-relaxed" style={{ color: C.muted }}>
              I'm a Computer Science student who likes building things people actually use — not tutorials, not toy apps. My approach is simple: find a real problem, build a working prototype, then use that to prove the idea before scaling it into something bigger.
            </p>
            <p className="ff-body text-sm leading-relaxed" style={{ color: C.muted }}>
              I learned by building — self-taught, project by project, moving from small frontend exercises into full-stack platforms with real authentication, databases and payment flows. I'm drawn to problems that involve turning a messy, manual process into something structured and digital.
            </p>
            <p className="ff-body text-sm leading-relaxed" style={{ color: C.muted }}>
              Right now I'm focused on shipping full-stack products — <strong style={{ color: C.text }}>StoryXverse</strong> and <strong style={{ color: C.text }}>CodeCraft</strong> — while staying open to freelance and business projects that need the same skill set.
            </p>
          </div>
          <div className="p-5" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
            <p className="ff-mono text-[11px] uppercase tracking-widest mb-3" style={{ color: C.faint }}>Available for</p>
            <ul className="ff-body text-sm space-y-2 mb-5" style={{ color: C.text }}>
              {PROFILE.availableFor.map(a => <li key={a}>→ {a}</li>)}
            </ul>
            <p className="ff-mono text-[11px] uppercase tracking-widest mb-3" style={{ color: C.faint }}>Philosophy</p>
            <p className="ff-mono text-sm" style={{ color: C.amber }}>"{PROFILE.motto}"</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* =================================================================
   WHAT I DO
================================================================== */
const ICON_MAP = { Layers, Globe, Server, Database, Briefcase, Sparkles };

function WhatIDo() {
  return (
    <section className="max-w-5xl mx-auto px-5 md:px-8 py-20" style={{ borderBottom: `1px solid ${C.border}` }}>
      <Reveal>
        <Eyebrow index="02">What I do</Eyebrow>
        <h2 className="ff-body text-2xl md:text-3xl font-bold mb-8" style={{ color: C.text }}>Where I can help</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {WHAT_I_DO.map(w => {
            const Icon = ICON_MAP[w.icon] || Sparkles;
            return (
            <div key={w.name} className="hover-card p-6" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
              <Icon size={20} style={{ color: C.amber }} className="mb-4" />
              <h3 className="ff-body font-semibold mb-2" style={{ color: C.text }}>{w.name}</h3>
              <p className="ff-body text-sm leading-relaxed" style={{ color: C.muted }}>{w.desc}</p>
            </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}

/* =================================================================
   SKILLS
================================================================== */
function Skills() {
  const entries = Object.entries(SKILLS);
  return (
    <section className="max-w-5xl mx-auto px-5 md:px-8 py-20" style={{ borderBottom: `1px solid ${C.border}` }}>
      <Reveal>
        <Eyebrow index="03">Tech stack</Eyebrow>
        <h2 className="ff-body text-2xl md:text-3xl font-bold mb-8" style={{ color: C.text }}>Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {entries.map(([group, items]) => (
            <div key={group} className="p-5" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
              <p className="ff-mono text-[11px] uppercase tracking-widest mb-3" style={{ color: C.teal }}>{group}</p>
              <div className="flex flex-wrap gap-2">
                {items.map(i => <Pill key={i}>{i}</Pill>)}
              </div>
            </div>
          ))}
        </div>
        <p className="ff-mono text-[11px] mt-5" style={{ color: C.faint }}>
          // reflects technologies actually used in shipped projects, not aspirational skills
        </p>
      </Reveal>
    </section>
  );
}

/* =================================================================
   FEATURED PROJECTS + CASE STUDY MODAL
================================================================== */
function CaseStudyModal({ project, onClose }) {
  if (!project) return null;
  const cs = project.caseStudy;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "#000000AA" }} onClick={onClose}>
      <div className="max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8" style={{ background: C.surface, border: `1px solid ${C.border}` }} onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="ff-mono text-xs" style={{ color: C.amber }}>CASE STUDY</p>
            <h2 className="ff-body text-2xl font-bold mt-1" style={{ color: C.text }}>{project.name}</h2>
          </div>
          <button onClick={onClose} aria-label="Close"><X size={20} color={C.text} /></button>
        </div>
        {[["Problem", cs.problem], ["Solution", cs.solution], ["Challenges", cs.challenges], ["What I learned", cs.learned], ["Result", cs.result]].map(([t, d]) => (
          <div key={t} className="mb-5">
            <p className="ff-mono text-[11px] uppercase tracking-widest mb-1.5" style={{ color: C.teal }}>{t}</p>
            <p className="ff-body text-sm leading-relaxed" style={{ color: C.muted }}>{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturedCard({ p, onCaseStudy }) {
  return (
    <div className="hover-card" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
      <ImageSlot url={p.imageUrl} label={`${p.name} screenshot`} tall />
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="ff-mono text-[11px] uppercase tracking-widest" style={{ color: C.amber }}>Featured project</span>
          <StatusBadge status={p.status} />
        </div>
        <h3 className="ff-body text-xl md:text-2xl font-bold mb-1" style={{ color: C.text }}>{p.name}</h3>
        <p className="ff-mono text-xs mb-4" style={{ color: C.teal }}>{p.tagline}</p>
        <p className="ff-body text-sm leading-relaxed mb-5" style={{ color: C.muted }}>{p.desc}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {p.features.map(f => <Pill key={f}>{f}</Pill>)}
        </div>
        <div className="flex flex-wrap gap-2 mb-6 ff-mono text-xs" style={{ color: C.faint }}>
          {p.tags.join(" · ")}
        </div>
        <div className="flex flex-wrap gap-3">
          {p.liveUrl && <PrimaryBtn href={p.liveUrl} icon={ExternalLink}>View live</PrimaryBtn>}
          {p.repoUrl && <GhostBtn href={p.repoUrl} icon={Code2}>GitHub</GhostBtn>}
          {p.caseStudy && <GhostBtn onClick={() => onCaseStudy(p)} icon={ArrowRight}>Case study</GhostBtn>}
        </div>
      </div>
    </div>
  );
}

function FeaturedProjects({ onCaseStudy }) {
  return (
    <section className="max-w-5xl mx-auto px-5 md:px-8 py-20" style={{ borderBottom: `1px solid ${C.border}` }}>
      <Reveal>
        <Eyebrow index="04">Flagship work</Eyebrow>
        <h2 className="ff-body text-2xl md:text-3xl font-bold mb-8" style={{ color: C.text }}>Featured projects</h2>
        <div className="space-y-8">
          {FEATURED_PROJECTS.map(p => <FeaturedCard key={p.name} p={p} onCaseStudy={onCaseStudy} />)}
        </div>
      </Reveal>
    </section>
  );
}

/* =================================================================
   OTHER PROJECTS (filterable)
================================================================== */
function OtherProjectCard({ p }) {
  return (
    <div className="hover-card p-5" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
      <h4 className="ff-body font-semibold mb-2" style={{ color: C.text }}>{p.name}</h4>
      <p className="ff-body text-sm leading-relaxed mb-4" style={{ color: C.muted }}>{p.desc}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {p.tags.map(t => <Pill key={t}>{t}</Pill>)}
      </div>
      <div className="flex flex-wrap gap-2">
        {p.liveUrl && <GhostBtn href={p.liveUrl} icon={ExternalLink}>Live</GhostBtn>}
        {p.repoUrl && <GhostBtn href={p.repoUrl} icon={Code2}>Source</GhostBtn>}
      </div>
    </div>
  );
}

function OtherProjects() {
  const filters = ["All", ...Array.from(new Set(OTHER_PROJECTS.map(p => p.filter)))];
  const [active, setActive] = useState("All");
  const list = active === "All" ? OTHER_PROJECTS : OTHER_PROJECTS.filter(p => p.filter === active);
  return (
    <div className="mt-14">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <h3 className="ff-body text-lg font-semibold" style={{ color: C.text }}>More projects</h3>
        <div className="flex flex-wrap gap-2">
          {filters.map(f => {
            const count = f === "All" ? OTHER_PROJECTS.length : OTHER_PROJECTS.filter(p => p.filter === f).length;
            return (
              <button key={f} onClick={() => setActive(f)} className="ff-mono text-[11px] uppercase px-3 py-1.5"
                style={{ border: `1px solid ${active === f ? C.amber : C.border}`, color: active === f ? C.amber : C.muted }}>
                {f} — {count}
              </button>
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {list.map(p => <OtherProjectCard key={p.name} p={p} />)}
      </div>
    </div>
  );
}

/* =================================================================
   JOURNEY / EDUCATION
================================================================== */
function Experience() {
  return (
    <section className="max-w-5xl mx-auto px-5 md:px-8 py-20" style={{ borderBottom: `1px solid ${C.border}` }}>
      <Reveal>
        <Eyebrow index="05">Experience</Eyebrow>
        <h2 className="ff-body text-2xl md:text-3xl font-bold mb-8" style={{ color: C.text }}>Development journey</h2>
        <div className="space-y-8 mb-14">
          {JOURNEY.map(j => (
            <div key={j.year} className="flex gap-6">
              <div className="ff-mono text-sm font-bold shrink-0 w-16" style={{ color: C.amber }}>{j.year}</div>
              <div className="flex-1 pb-2" style={{ borderLeft: `2px solid ${C.border}`, paddingLeft: 20 }}>
                {j.items.map(i => (
                  <p key={i} className="ff-body text-sm mb-2" style={{ color: C.muted }}>→ {i}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
            <GraduationCap size={20} style={{ color: C.amber }} className="mb-3" />
            <p className="ff-mono text-[11px] uppercase tracking-widest mb-2" style={{ color: C.faint }}>Education</p>
            <p className="ff-body font-semibold" style={{ color: C.text }}>{EDUCATION.school}</p>
            <p className="ff-body text-sm mt-1" style={{ color: C.muted }}>{EDUCATION.program} — {EDUCATION.status}</p>
          </div>
          <div className="p-6" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
            <Boxes size={20} style={{ color: C.amber }} className="mb-3" />
            <p className="ff-mono text-[11px] uppercase tracking-widest mb-2" style={{ color: C.faint }}>Learning & development</p>
            {LEARNING.map(l => <p key={l} className="ff-body text-sm mb-1" style={{ color: C.muted }}>→ {l}</p>)}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* =================================================================
   SERVICES
================================================================== */
function Services({ setActive }) {
  return (
    <section className="max-w-5xl mx-auto px-5 md:px-8 py-20" style={{ borderBottom: `1px solid ${C.border}` }}>
      <Reveal>
        <Eyebrow index="06">Services</Eyebrow>
        <h2 className="ff-body text-2xl md:text-3xl font-bold mb-8" style={{ color: C.text }}>What you can hire me for</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {SERVICES.map(s => (
            <div key={s.name} className="hover-card p-5 flex gap-4" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
              <CheckCircle2 size={18} style={{ color: C.green }} className="shrink-0 mt-1" />
              <div>
                <h4 className="ff-body font-semibold mb-1" style={{ color: C.text }}>{s.name}</h4>
                <p className="ff-body text-sm" style={{ color: C.muted }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <PrimaryBtn onClick={() => setActive("contact")} icon={ArrowRight}>Start a project</PrimaryBtn>
      </Reveal>
    </section>
  );
}

/* =================================================================
   TESTIMONIALS (hides itself when empty)
================================================================== */
function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;
  return (
    <section className="max-w-5xl mx-auto px-5 md:px-8 py-20" style={{ borderBottom: `1px solid ${C.border}` }}>
      <Reveal>
        <Eyebrow index="07">Social proof</Eyebrow>
        <h2 className="ff-body text-2xl md:text-3xl font-bold mb-8" style={{ color: C.text }}>What people say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="p-6" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
              <Quote size={18} style={{ color: C.amber }} className="mb-3" />
              <p className="ff-body text-sm italic mb-4" style={{ color: C.text }}>"{t.quote}"</p>
              <p className="ff-mono text-xs" style={{ color: C.faint }}>{t.name} — {t.role}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* =================================================================
   CONTACT (mailto-composed form — no backend required)
================================================================== */
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const send = () => {
    const subject = encodeURIComponent(`Project enquiry from ${form.name || "your website"}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nProject type: ${form.type}\n\n${form.message}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  };
  return (
    <div className="p-6 md:p-7" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="ff-mono text-[11px] uppercase tracking-wide block mb-2" style={{ color: C.faint }}>Name</label>
          <input value={form.name} onChange={e => update("name", e.target.value)} className="w-full" style={inputStyle} />
        </div>
        <div>
          <label className="ff-mono text-[11px] uppercase tracking-wide block mb-2" style={{ color: C.faint }}>Email</label>
          <input value={form.email} onChange={e => update("email", e.target.value)} className="w-full" style={inputStyle} />
        </div>
        <div className="md:col-span-2">
          <label className="ff-mono text-[11px] uppercase tracking-wide block mb-2" style={{ color: C.faint }}>Project type</label>
          <input value={form.type} onChange={e => update("type", e.target.value)} placeholder="Website, web app, business system..." className="w-full" style={inputStyle} />
        </div>
        <div className="md:col-span-2">
          <label className="ff-mono text-[11px] uppercase tracking-wide block mb-2" style={{ color: C.faint }}>Message</label>
          <textarea value={form.message} onChange={e => update("message", e.target.value)} rows={4} className="w-full" style={inputStyle} />
        </div>
      </div>
      <PrimaryBtn onClick={send} icon={Send}>Send message</PrimaryBtn>
      <p className="ff-mono text-[11px] mt-3" style={{ color: C.faint }}>// opens your email app with this pre-filled</p>
    </div>
  );
}

const inputStyle = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 14,
  padding: "10px 12px",
  border: "1px solid #262B2F",
  background: "#0B0D0F",
  color: "#E7E9EA",
};

function Contact() {
  return (
    <section className="max-w-5xl mx-auto px-5 md:px-8 py-20">
      <Reveal>
        <Eyebrow index="08">Contact</Eyebrow>
        <h2 className="ff-body text-2xl md:text-3xl font-bold mb-4" style={{ color: C.text }}>Let's build something</h2>
        <p className="ff-body text-sm leading-relaxed mb-10 max-w-xl" style={{ color: C.muted }}>
          Have an idea, a business problem, or an application you want built? Let's turn it into a working product.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2"><ContactForm /></div>
          <div className="space-y-4">
            <PrimaryBtn href={`mailto:${PROFILE.email}`} icon={Mail}>Email me</PrimaryBtn>
            {PROFILE.whatsapp && <GhostBtn href={`https://wa.me/${PROFILE.whatsapp}`} icon={MessageCircle}>WhatsApp</GhostBtn>}
            <GhostBtn href={PROFILE.github} icon={GithubIcon}>GitHub</GhostBtn>
            <GhostBtn href={PROFILE.linkedin} icon={LinkedinIcon}>LinkedIn</GhostBtn>
            {PROFILE.resumeUrl && <GhostBtn href={PROFILE.resumeUrl} icon={FileDown}>Download CV</GhostBtn>}
            <p className="ff-mono text-xs flex items-center gap-1.5 pt-2" style={{ color: C.faint }}><MapPin size={12} /> {PROFILE.location}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* =================================================================
   ROOT
================================================================== */
export default function App() {
  const [active, setActiveRaw] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [caseStudy, setCaseStudy] = useState(null);

  useEffect(() => {
    document.title = `${PROFILE.name} — ${PROFILE.brand}`;
  }, []);

  const setActive = (id) => {
    setActiveRaw(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="ff-body min-h-screen" style={{ background: C.bg }}>
      {FONTS}
      <Header active={active} setActive={setActive} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div id="hero"><Hero setActive={setActive} /></div>
      <div id="about"><About /></div>
      <WhatIDo />
      <div id="skills"><Skills /></div>
      <div id="projects">
        <FeaturedProjects onCaseStudy={setCaseStudy} />
        <div className="max-w-5xl mx-auto px-5 md:px-8"><OtherProjects /></div>
      </div>
      <div id="experience"><Experience /></div>
      <div id="services"><Services setActive={setActive} /></div>
      <Testimonials />
      <div id="contact"><Contact /></div>
      <Footer setActive={setActive} />
      <CaseStudyModal project={caseStudy} onClose={() => setCaseStudy(null)} />
    </div>
  );
}
