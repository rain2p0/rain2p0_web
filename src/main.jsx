import React, { useEffect, useState } from 'react';
import ComicReader from './ComicReader';
import { createRoot } from 'react-dom/client';
import './styles.css';

// Add verified profile URLs here when available. Unconfigured profiles are
// visibly unavailable rather than linking to unrelated accounts.
const socials = [
  { name: 'Instagram', url: 'https://www.instagram.com/rain2.0music/', icon: 'instagram' },
  { name: 'Facebook', url: 'https://www.facebook.com/RAIN2P0MUSIC/', icon: 'facebook' },
  { name: 'YouTube', url: 'https://www.youtube.com/@RAIN2.0-music', icon: 'youtube' },
];

function Icon({ name }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    {name === 'instagram' && <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></>}
    {name === 'facebook' && <path d="M14 21v-8h3l.5-4H14V7c0-1 .4-2 2-2h2V2h-3c-3 0-5 2-5 5v2H7v4h3v8"/>}
    {name === 'youtube' && <><rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none"/></>}
  </svg>;
}

function Socials() {
  return <ul className="socials" aria-label="Social media">{socials.map(({ name, url, icon }) => <li key={name}>
    {url ? <a href={url} aria-label={name} target="_blank" rel="noopener noreferrer"><Icon name={icon}/></a>
      : <span className="social-pending" role="img" aria-label={`${name} — link coming soon`} title={`${name} — link coming soon`}><Icon name={icon}/></span>}
  </li>)}</ul>;
}

function App() {
  return <>
    <a className="skip-link" href="#videos">Skip to content</a>
    <main>
      <section className="hero" id="top" aria-label="Welcome to RAIN2.0">
        <div className="hero-image" />
        <header className="masthead"><a href="#top" aria-label="RAIN2.0 home">R<span className="mint">/</span>2.0</a><span>THE OFFICIAL WEBSITE</span></header>
        <div className="hero-center">
          <h1 className="wordmark"><img src={`${import.meta.env.BASE_URL}rain-logo-beveled.png`} alt="RAIN2.0" width="1445" height="1088"/></h1>
          <nav className="primary-nav" aria-label="Main navigation"><a href="#about">ABOUT</a><span aria-hidden="true">|</span><a href="#/comics">COMICS</a></nav>
          <Socials/>
        </div>
        <a className="scroll-cue" href="#videos"><span>SCROLL TO EXPLORE</span><span className="scroll-line" aria-hidden="true"/></a>
        <span className="hero-side" aria-hidden="true">SOUND. VISION. STORY.</span>
      </section>
      <section className="videos content-section" id="videos" aria-labelledby="videos-title">
        <div className="section-marker"><span>01 / WATCH</span><span className="small-rule"/></div>
        <div className="video-heading"><div><p className="eyebrow mint">FROM THE RAIN2.0 CHANNEL</p><h2 id="videos-title">Turn it up.</h2></div><a className="text-link" href="https://www.youtube.com/@RAIN2.0-music" target="_blank" rel="noopener noreferrer">MORE ON YOUTUBE <span aria-hidden="true">↗</span></a></div>
        <div className="video-player">
          <iframe
            src="https://www.youtube-nocookie.com/embed/Qk6x-F5gClA?rel=0&playsinline=1"
            title="RAIN2.0 EPK"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="video-caption"><p>RAIN2.0 EPK</p><a href="https://www.youtube.com/watch?v=Qk6x-F5gClA" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></div>
        <div className="shorts-section" aria-labelledby="shorts-title">
          <div className="shorts-copy"><p className="eyebrow mint">MORE FROM RAIN2.0</p><h3 id="shorts-title">Shorts.</h3><p>A little more from our world.</p><a className="text-link" href="https://www.youtube.com/@RAIN2.0-music/shorts" target="_blank" rel="noopener noreferrer">ALL SHORTS <span aria-hidden="true">↗</span></a></div>
          <div className="shorts-player"><iframe
            src="https://www.youtube-nocookie.com/embed/videoseries?list=UUSHG9iwkrpZYULZf-RUTT7-TQ&rel=0&playsinline=1"
            title="RAIN2.0 Shorts"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          /></div>
        </div>
      </section>
      <section className="about content-section" id="about" aria-labelledby="about-title">
        <div className="section-marker"><span>02 / ABOUT</span><span className="small-rule"/></div>
        <div className="section-body"><p className="eyebrow mint">WELCOME TO RAIN2.0</p><h2 id="about-title">Beyond<br/>the sound.</h2><div className="about-copy"><p>The music. The band. The stories.</p><p>This is the home of RAIN2.0 — bringing our songs, our world, and our ongoing comic together.</p><a className="text-link" href="#/comics">EXPLORE THE COMICS <span aria-hidden="true">↗</span></a></div></div>
      </section>
      <section className="comics content-section" id="comics" aria-labelledby="comics-title">
        <div className="section-marker"><span>03 / COMICS</span><span className="small-rule"/></div>
        <div className="comic-feature"><a className="comic-art official-cover" href="#/comics"><img src={`${import.meta.env.BASE_URL}comics/chapter-1/cover.webp`} alt="Chapter 1: Another Night" loading="lazy" width="1200" height="1200"/></a><div className="comic-copy"><p className="eyebrow mint">THE RAIN2.0 WEB COMIC</p><h2 id="comics-title">Another way<br/>into our world.</h2><p>Chapter 1 — Another Night.<br/>Enter the world of RAIN2.0.</p><a className="text-link" href="#/comics">READ CHAPTER 1 <span aria-hidden="true">↗</span></a></div></div>
      </section>
    </main>
    <footer><a className="footer-brand" href="#top">RAIN<span>2.0</span></a><p>© {new Date().getFullYear()} RAIN2.0</p><Socials/><a className="back-top" href="#top">BACK TO TOP ↑</a></footer>
  </>;
}

function Router() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const update = () => setHash(window.location.hash);
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  useEffect(() => {
    if (hash !== '#/comics') requestAnimationFrame(() => document.getElementById(hash.slice(1) || 'top')?.scrollIntoView());
  }, [hash]);
  return hash === '#/comics' ? <ComicReader/> : <App/>;
}
createRoot(document.getElementById('root')).render(<Router/>);
