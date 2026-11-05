import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { approaches, experience, filters, filterProjects, projects } from './data.js';
import './styles.css';
import './interactive.css';

const Arrow = ({ children = '↗' }) => <span aria-hidden="true">{children}</span>;
const resumeUrl = window.__CJ_RESUME_URL__ || './resume.html';
const Brand = () => <a className="brand" href="#top" aria-label="CJ Trahey home">cj<span className="brand-dot">.</span><span className="brand-name">TRAHEY</span></a>;
const Label = ({ number, children, end }) => <div className="section-label"><span>{number} / {children}</span>{end || <span className="small-cross" aria-hidden="true">+</span>}</div>;

function usePageMotion() {
  const [activeSection, setActiveSection] = useState('top');
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); reveal.unobserve(entry.target); } }), { threshold: .08 });
    if (!reduced) { document.documentElement.classList.add('motion-ready'); document.querySelectorAll('.reveal').forEach(el => reveal.observe(el)); }
    const nav = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); }), { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
    document.querySelectorAll('main section[id]').forEach(el => nav.observe(el));
    let frame;
    const onScroll = () => { if(frame) return; frame = requestAnimationFrame(() => { const length = document.documentElement.scrollHeight - window.innerHeight; document.documentElement.style.setProperty('--reading-progress', `${length > 0 ? window.scrollY / length * 100 : 0}%`); frame = null; }); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => { reveal.disconnect(); nav.disconnect(); cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); document.documentElement.classList.remove('motion-ready'); };
  }, []);
  return activeSection;
}

function Header({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');
  useEffect(() => { document.documentElement.dataset.theme = theme; try { localStorage.setItem('cj-theme', theme); } catch {} }, [theme]);
  const nav = [['about', 'About'], ['experience', 'Experience'], ['projects', 'Projects']];
  return <header className="header-shell"><div className="reading-progress" aria-hidden="true" /><div className="site-header wrap"><Brand /><nav id="main-nav" className={menuOpen ? 'is-open' : ''} aria-label="Main navigation">{nav.map(([id, title]) => <a key={id} className={activeSection === id ? 'active' : ''} href={`#${id}`} onClick={() => setMenuOpen(false)} aria-current={activeSection === id ? 'location' : undefined}>{title}</a>)}<a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk <Arrow /></a></nav><div className="header-controls"><button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>{theme === 'dark' ? '☀' : '◐'}</button><button className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close' : 'Menu'} <Arrow>{menuOpen ? '−' : '+'}</Arrow></button></div></div></header>;
}

function ApproachExplorer() {
  const [mode, setMode] = useState('Support');
  const [step, setStep] = useState(0);
  const approach = approaches[mode];
  return <div className="approach-explorer"><div className="art-top"><span>HOW I APPROACH THE WORK</span><span className="live-dot">EXPLORE</span></div><div className="mode-switch" role="group" aria-label="Explore my approach">{Object.keys(approaches).map(item => <button key={item} aria-pressed={mode === item} onClick={() => { setMode(item); setStep(0); }}>{item}<Arrow>{mode === item ? '↗' : '·'}</Arrow></button>)}</div><div className={`approach-graphic graphic-${mode.toLowerCase()}`} aria-hidden="true"><div className="graphic-grid" /><div className="graphic-orbit orbit-a" /><div className="graphic-orbit orbit-b" /><div className="graphic-core" key={mode}>{approach.icon}</div><span className="graphic-coordinate coordinate-one">HUMAN / TECHNOLOGY</span><span className="graphic-coordinate coordinate-two">0{step + 1} — 03</span></div><p className="approach-label">{approach.label}</p><div className="approach-steps" role="group" aria-label={`${mode} steps`}>{approach.steps.map((item, i) => <button key={item.title} aria-pressed={step === i} onClick={() => setStep(i)}><span>0{i + 1}</span>{item.title}<i aria-hidden="true" /></button>)}</div><p className="approach-detail" key={`${mode}-${step}`} aria-live="polite">{approach.steps[step].detail}</p><div className="art-caption"><span>SUPPORT × CURIOSITY</span><span>CLICK A STEP TO EXPLORE ↗</span></div></div>;
}

function Hero() { return <section className="hero wrap" id="top" aria-labelledby="hero-title"><div className="hero-copy"><p className="eyebrow"><span className="status-dot" /> CJ TRAHEY · COLUMBUS, OHIO</p><h1 id="hero-title">People first.<br />Technology<br /><span className="blue serif">forward.</span></h1><p className="hero-description">Technical support professional.<br />Computer science student. Always curious.</p><p className="hero-intro">I help people get technology working—and keep learning how to build what comes next.</p><div className="hero-actions"><a className="button" href="#experience">Explore my experience <Arrow>↓</Arrow></a><a className="text-link" href={resumeUrl} target="_blank" rel="noopener">View résumé <Arrow /></a></div></div><ApproachExplorer /><div className="hero-foot"><span>TECHNICAL SUPPORT & COMPUTER SCIENCE</span><a href="#about">A little more about me <Arrow>↓</Arrow></a></div></section>; }

function About() { return <section className="about section wrap reveal" id="about" aria-labelledby="about-title"><Label number="01">ABOUT</Label><div className="about-main"><h2 id="about-title">A practical mindset.<br /><span className="serif">A curious streak.</span></h2><div className="about-text"><p>I’m Christopher-John Trahey—CJ for short. I work in enterprise technical support and study Computer & Information Science at Columbus State.</p><p>My experience spans remote service desk work and hands-on support across college campuses. I enjoy working through the details, explaining the next step clearly, and helping people get back to what they need to do.</p><p>Alongside that work, I’m building on my background in interactive media and web development. It’s another way to explore the same question: how can technology be more useful to the person using it?</p></div></div><div className="focus-strip"><span className="focus-caption">WHAT I BRING</span><span>Thoughtful troubleshooting</span><span>Clear communication</span><span>A habit of learning</span></div></section>; }

function Experience() {
  const [selected, setSelected] = useState(0);
  const job = experience[selected];
  const changeTab = (event, i) => { let next; if(event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (i + 1) % experience.length; if(event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (i - 1 + experience.length) % experience.length; if(event.key === 'Home') next = 0; if(event.key === 'End') next = experience.length - 1; if(next !== undefined) { event.preventDefault(); setSelected(next); document.getElementById(`job-tab-${next}`).focus(); } };
  return <section className="experience section wrap reveal" id="experience" aria-labelledby="experience-title"><Label number="02">EXPERIENCE</Label><div className="section-heading"><h2 id="experience-title">Experience that<br /><span className="serif">starts with people.</span></h2><p>Supporting the technology.<br />Understanding the person behind it.</p></div><div className="experience-explorer"><div className="job-tabs" role="tablist" aria-label="Work experience" aria-orientation="vertical">{experience.map((item, i) => <button id={`job-tab-${i}`} role="tab" aria-selected={selected === i} aria-controls={`job-panel-${i}`} tabIndex={selected === i ? 0 : -1} key={item.id} onClick={() => setSelected(i)} onKeyDown={event => changeTab(event, i)}><span className="tab-index">0{i + 1}</span><span><span className="tab-company">{item.company}</span><span className="tab-date">{item.date}</span></span><Arrow /></button>)}</div><article className="job-panel" id={`job-panel-${selected}`} role="tabpanel" aria-labelledby={`job-tab-${selected}`} tabIndex={0} key={job.id}><div className="panel-heading"><span className={selected === 0 ? 'current-label' : 'eyebrow'}>{job.label}</span><span>{job.context}</span></div><p className="organization">{job.company}</p><h3>{job.role}</h3><p className="panel-intro">{job.intro}</p><ul>{job.responsibilities.map(item => <li key={item}>{item}</li>)}</ul><div className="tags">{job.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article></div></section>;
}

function Skills() { return <section className="skills-band" aria-labelledby="skills-title"><div className="wrap skills-inner reveal"><div><p className="eyebrow">THE EVERYDAY TOOLKIT</p><h2 id="skills-title">Good support is<br /><span className="serif">more than technical.</span></h2></div><div className="skill-list">{['Technical troubleshooting', 'Service desk operations', 'Account & access support', 'Customer communication', 'Technical documentation', 'Problem-solving & adaptability'].map(skill => <span key={skill}>{skill}</span>)}</div></div></section>; }

function ProjectArtwork({ project }) { return <div className={`project-visual ${project.visual}-visual`} aria-hidden="true"><span className="visual-caption">{project.caption}</span>{project.visual === 'dex' ? <div className="dex-symbol"><span /></div> : project.visual === 'glass' ? <div className="glass-symbol"><span>G</span></div> : <><div className="map-grid" /><svg className="map-route" viewBox="0 0 360 220"><path d="M45 165H115V105H220V55H310" /><circle cx="45" cy="165" r="8" /><circle cx="310" cy="55" r="8" /></svg></>}<div className="visual-bottom"><span>{project.category.toUpperCase()}</span><span>0{projects.indexOf(project) + 1}</span></div></div>; }

function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!project) return;
    const dialog = ref.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; dialog.showModal();
    return () => { document.body.style.overflow = previousOverflow; if (dialog.open) dialog.close(); };
  }, [project]);
  return <dialog className="project-dialog" ref={ref} onClose={onClose} onClick={event => { if(event.target === ref.current) { const box = ref.current.getBoundingClientRect(); if(event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) onClose(); } }} aria-labelledby="project-dialog-title">{project && <><button className="dialog-close" onClick={onClose} aria-label="Close project details">Close <Arrow>×</Arrow></button><ProjectArtwork project={project} /><div className="dialog-body"><p className="project-kind">{project.kind}</p><h2 id="project-dialog-title">{project.title}</h2><p className="dialog-credit">{project.contribution}</p><p className="dialog-overview">{project.overview}</p><div className="case-note"><span>THE APPROACH</span><p>{project.approach}</p></div><div className="case-note"><span>THE IDEA BEHIND IT</span><p>{project.takeaway}</p></div><div className="tags">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div><a className="button dialog-source" href={project.source} target="_blank" rel="noopener noreferrer">Explore the source <Arrow /></a></div></>}</dialog>;
}

function Projects() {
  const [category, setCategory] = useState('All projects');
  const [project, setProject] = useState(null);
  const visible = filterProjects(category);
  return <section className="projects section wrap reveal" id="projects" aria-labelledby="projects-title"><Label number="03" end={<a href="https://github.com/cjtrahey" target="_blank" rel="noopener noreferrer">GitHub <Arrow /></a>}>SELECTED PROJECTS</Label><div className="section-heading"><h2 id="projects-title">Curiosity,<br /><span className="serif">put into practice.</span></h2><p>Selected work from my web development journey.<br />A foundation I’m continuing to build on.</p></div><div className="project-toolbar"><div className="project-filters" role="group" aria-label="Filter projects">{filters.map(filter => <button aria-pressed={category === filter} key={filter} onClick={() => setCategory(filter)}>{filter}{category === filter && <span aria-hidden="true">↗</span>}</button>)}</div><span className="project-count" role="status">{visible.length} {visible.length === 1 ? 'project' : 'projects'}</span></div><div className="project-grid">{visible.map(item => <article className="project-card" key={item.id}><button className="artwork-button" onClick={() => setProject(item)} aria-label={`Explore ${item.title}`}><ProjectArtwork project={item} /><span className="project-hover" aria-hidden="true">Explore project ↗</span></button><div className="project-body"><p className="project-kind">{item.kind}</p><h3><button onClick={() => setProject(item)}>{item.title} <Arrow /></button></h3><p>{item.short}</p><div className="project-meta"><span>{item.technologies.join(' · ')}</span><a href={item.source} target="_blank" rel="noopener noreferrer" aria-label={`View ${item.title} source on GitHub`}>Source <Arrow /></a></div><button className="project-details-button" onClick={() => setProject(item)}>Behind the project <Arrow>+</Arrow></button></div></article>)}</div><ProjectDialog project={project} onClose={() => setProject(null)} /></section>;
}

function Education() { return <section className="education section wrap reveal" id="education" aria-labelledby="education-title"><Label number="04">EDUCATION</Label><div className="education-layout"><h2 id="education-title">Always a<br /><span className="serif">work in progress.</span></h2><div className="education-list"><article><div><p className="education-date">2026 — PRESENT <span className="blue">· IN PROGRESS</span></p><h3>Columbus State Community College</h3><p>Associate of Science<br />Computer & Information Science</p></div><span className="education-location">Columbus, OH</span></article><article><div><p className="education-date">2023 — 2025</p><h3>Edison State Community College</h3><p>Associate of Business<br />Interactive Media</p></div><span className="education-location">Piqua, OH</span></article></div></div></section>; }

function Contact() {
  const [copyState, setCopyState] = useState('idle');
  const timer = useRef();
  const emailRef = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = async () => { clearTimeout(timer.current); try { if (!navigator.clipboard?.writeText) throw Error('unavailable'); await navigator.clipboard.writeText('cj@cjtrahey.com'); setCopyState('copied'); } catch { const range = document.createRange(); range.selectNodeContents(emailRef.current); const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range); setCopyState('selected'); } timer.current = setTimeout(() => setCopyState('idle'), 3500); };
  return <section className="contact" id="contact" aria-labelledby="contact-title"><div className="wrap reveal"><div className="contact-top"><p className="eyebrow">05 / WHAT’S NEXT</p><span>COLUMBUS, OHIO · REMOTE EXPERIENCE</span></div><h2 id="contact-title">Let’s start<br /><span className="serif">a conversation.</span><span className="contact-arrow" aria-hidden="true">↗</span></h2><div className="contact-bottom"><p>Have a role, a project, or a question in mind?<br />I’d be glad to hear from you.</p><a className="email-link" href="mailto:cj@cjtrahey.com"><span ref={emailRef}>cj@cjtrahey.com</span> <Arrow /></a><button className="copy-email" onClick={copy}>{copyState === 'copied' ? 'Copied!' : copyState === 'selected' ? 'Email selected' : 'Copy email'}</button><span className="sr-only" role="status">{copyState === 'copied' ? 'Email address copied to clipboard.' : copyState === 'selected' ? 'Email selected. Copy it using your keyboard or use the email link.' : ''}</span></div></div></section>;
}

function App() { const activeSection = usePageMotion(); return <><a className="skip-link" href="#main">Skip to content</a><Header activeSection={activeSection} /><main id="main"><Hero /><About /><Experience /><Skills /><Projects /><Education /><Contact /></main><footer className="wrap footer"><Brand /><p>Always learning. Always moving forward.</p><div><a href={resumeUrl} target="_blank" rel="noopener">Résumé ↗</a><a href="https://github.com/cjtrahey" target="_blank" rel="noopener noreferrer">GitHub ↗</a><span>© {new Date().getFullYear()} CJ Trahey</span></div></footer></>; }

createRoot(document.getElementById('root')).render(<App />);
