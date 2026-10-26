import React, { useEffect, useState } from 'react';
import panels from './comics.json';

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export default function ComicReader() {
  const [index, setIndex] = useState(0);
  const [reading, setReading] = useState(false);
  const panel = panels[index];
  useEffect(() => {
    document.title = 'Chapter 1: Another Night — RAIN2.0 Comics';
    window.scrollTo(0, 0);
    return () => { document.title = 'RAIN2.0 — Official Website'; };
  }, []);
  useEffect(() => {
    const onKey = (event) => {
      if (!window.matchMedia('(min-width: 900px)').matches || /INPUT|SELECT|TEXTAREA/.test(event.target.tagName)) return;
      if (event.key === 'ArrowRight') { event.preventDefault(); setIndex(i => Math.min(panels.length - 1, i + 1)); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); setIndex(i => Math.max(0, i - 1)); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [reading]);
  function startReading() {
    setReading(true);
    requestAnimationFrame(() => document.getElementById('chapter-reader')?.scrollIntoView({ behavior: 'instant' }));
  }
  return <div className="comics-page">
    <header className="reader-header"><a href="#top" className="reader-brand">RAIN<span>2.0</span></a><span>THE COMICS</span><a href="#top">← BACK TO HOME</a></header>
    <main>
      <section className="chapter-intro">
        <img className="chapter-cover" src={asset('comics/chapter-1/cover.webp')} alt="Chapter 1: Another Night — RAIN2.0 above a neon-lit city" width="1200" height="1200"/>
        <div className="chapter-description"><p className="eyebrow mint">RAIN2.0 / COMICS</p><label className="chapter-select">CHAPTER<select aria-label="Choose chapter" defaultValue="1"><option value="1">01 — Another Night</option></select></label><h1>Another<br/><em>Night.</em></h1><p>Chapter 1</p><p className="chapter-count">{panels.length} panels · One continuous story</p><button className="read-button" onClick={startReading}>READ CHAPTER 1 <span aria-hidden="true">↗</span></button></div>
      </section>
      <section id="chapter-reader" className={`chapter-reader ${reading ? 'is-reading' : ''}`} aria-label="Chapter 1 reader">
        <div className="reader-toolbar"><div><span className="eyebrow mint">CHAPTER 01</span><strong>Another Night</strong></div><label className="desktop-reader">PANEL <select aria-label="Choose panel" value={index} onChange={e => setIndex(Number(e.target.value))}>{panels.map((_, i) => <option key={i} value={i}>{String(i+1).padStart(2,'0')} / {panels.length}</option>)}</select></label><a href="#/comics" onClick={e => { e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); }}>↑ CHAPTER COVER</a></div>
        <div className="desktop-reader panel-stage">
          <button className="panel-arrow" disabled={index===0} onClick={()=>setIndex(i=>i-1)} aria-label="Previous panel">←</button>
          <figure><a href={asset(panel.src)} target="_blank" rel="noopener noreferrer" title="Open panel at full size"><img src={asset(panel.src)} alt={`Chapter 1, panel ${index+1}`} width={panel.width} height={panel.height}/></a><figcaption aria-live="polite">{String(index+1).padStart(2,'0')} <span>/ {panels.length} — {index===panels.length-1 ? 'End of Chapter 1' : 'Another Night'}</span></figcaption></figure>
          <button className="panel-arrow" disabled={index===panels.length-1} onClick={()=>setIndex(i=>i+1)} aria-label="Next panel">→</button>
        </div>
        <p className="desktop-reader reader-hint">Use ← → to turn the panels · Click the artwork to view full size</p>
        <div className="mobile-reader">{panels.map((item,i)=><figure key={item.src}><a href={asset(item.src)} target="_blank" rel="noopener noreferrer" aria-label={`Open panel ${i+1} at full size`}><img src={asset(item.src)} alt={`Chapter 1, panel ${i+1}`} width={item.width} height={item.height} loading={i<2?'eager':'lazy'} decoding="async"/></a></figure>)}<div className="chapter-end"><p className="eyebrow mint">END OF CHAPTER 1</p><h2>To be continued.</h2><a className="text-link" href="#top">BACK TO RAIN2.0 ↗</a></div></div>
      </section>
    </main>
  </div>;
}

