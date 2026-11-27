'use client';

import { useEffect, useMemo, useState } from 'react';

type Answers = {
  food: number; conversation: number; vibes: number; overall: number;
  humour: number; dressing: number; behaviour: number; aaryan: number;
  nextDate: string; mcdOrder: string; note: string;
};
const initial: Answers = { food: 8, conversation: 8, vibes: 8, overall: 8, humour: 8, dressing: 8, behaviour: 8, aaryan: 8, nextDate: '', mcdOrder: '', note: '' };
const STORE_KEY = 'guruji-date-review-v1';

function Rating({ label, value, onChange, hint }: { label: string; value: number; onChange: (v: number) => void; hint?: string }) {
  return <div className="rating"><div className="rating-head"><span>{label}</span><strong>{value}/10</strong></div><input aria-label={label} type="range" min="1" max="10" value={value} onChange={e => onChange(Number(e.target.value))}/>{hint && <small>{hint}</small>}</div>;
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>(initial);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noEscapes, setNoEscapes] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [saved, setSaved] = useState(false);
  const [skinAnswer, setSkinAnswer] = useState('');
  const [showSkin, setShowSkin] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  useEffect(() => {
    try {
      const previous = localStorage.getItem(STORE_KEY);
      setHasPrevious(Boolean(previous));
    } catch { /* local storage may be unavailable */ }
  }, []);

  const update = <K extends keyof Answers,>(key: K, value: Answers[K]) => setA(old => ({ ...old, [key]: value }));
  const average = useMemo(() => Math.round((a.overall + a.aaryan + a.vibes + a.conversation) / 4 * 10) / 10, [a]);

  const finish = () => {
    const payload = { ...a, submittedAt: new Date().toISOString(), skinAnswer, noEscapes };
    try { localStorage.setItem(STORE_KEY, JSON.stringify(payload)); setSaved(true); setStep(4); }
    catch { setSaved(false); setStep(4); }
  };
  const reset = () => { setA(initial); setStep(0); setSaved(false); setSkinAnswer(''); setNoEscapes(0); };
  const moveNo = () => {
    setNoEscapes(n => n + 1);
    setNoPos({ x: Math.round((Math.random() - .5) * 180), y: Math.round((Math.random() - .5) * 90) });
  };

  return <main className="page-shell">
    <nav className="topbar"><span className="brand-mark">✳</span><span>THE DATE REVIEW</span><span className="top-right">NOT THAT DEEP <i>●</i></span></nav>
    <div className="progress-wrap"><div className="progress-track"><div className="progress-fill" style={{ width: `${step === 0 ? 0 : step === 4 ? 100 : step * 25}%` }}/></div><span>{step === 0 ? 'A QUICK THING' : step === 4 ? 'FILED' : `PAGE 0${step} / 04`}</span></div>

    {step === 0 && <section className="hero panel fade-in">
      <div className="hero-copy"><p className="eyebrow">A VERY IMPORTANT, VERY UNOFFICIAL FORM</p><h1>Hey,<br/><em>Guruji.</em></h1><p className="lede">So... how was the date?</p><p className="muted">A tiny review of the food, the vibes, and the person you had to tolerate for a few hours.</p>
        <button className="primary" onClick={() => setStep(1)}>Let's get into it <span>↗</span></button>
        <p className="micro">Takes about 90 seconds. No pressure.</p>
      </div>
      <div className="hero-art" aria-label="Illustration of a burger, fries and drink"><div className="sunburst"/><div className="spark spark-one">✳</div><div className="spark spark-two">✦</div><div className="burger"><div className="bun-top"><i/><i/><i/></div><div className="lettuce"/><div className="cheese"/><div className="patty"/><div className="bun-bottom"/></div><div className="fries"><i/><i/><i/><i/><b/></div><div className="drink"><div className="straw"/><div className="drink-lid"/><div className="drink-cup">M</div></div><div className="art-caption">McD & miscellaneous opinions</div></div>
      <div className="hero-footer"><span>MADE BY AARYAN</span><span>★ &nbsp; CONFIDENTIAL-ISH</span></div>
    </section>}

    {step === 2 && <section className="panel form-panel fade-in"><div className="section-kicker">02 / THE COMPANY</div><h2>Now, the main character.</h2><p className="muted">A completely unbiased assessment of Aaryan. Obviously.</p>
      <div className="ratings-grid"><Rating label="Humour (debatable)" value={a.humour} onChange={v => update('humour', v)}/><Rating label="Looks (Cute/Hot¿)" value={a.dressing} onChange={v => update('dressing', v)}/><Rating label="General behaviour" value={a.behaviour} onChange={v => update('behaviour', v)}/><Rating label="Overall Aaryan rating" value={a.aaryan} onChange={v => update('aaryan', v)} hint="Please don't let this go to his head."/></div>
      <div className="note-card"><span className="note-icon">✎</span><div><strong>General Secretary's final authority</strong><p>All ratings are subject to approval by Guruji. Appeals will not be entertained.</p></div></div>
      <div className="actions"><button className="text-button" onClick={() => setStep(1)}>← Back</button><button className="primary" onClick={() => setStep(3)}>Continue <span>↗</span></button></div>
    </section>}

    {step === 3 && <section className="panel form-panel fade-in"><div className="section-kicker">03 / IMPORTANT BUSINESS</div><h2>One last thing.</h2><p className="muted">A couple of highly scientific questions. Please cooperate.</p>
      <div className="question-card"><div className="q-label">THE FUTURE, MAYBE</div><h3>Would you be up for doing this again?</h3><div className="yes-no"><button className="yes-button" onClick={() => update('nextDate', 'Yes')}>Yes, why not :)</button><button className="no-button" style={{ transform: `translate(${noPos.x}px, ${noPos.y}px)` }} onMouseEnter={moveNo} onTouchStart={moveNo} onClick={() => update('nextDate', 'Maybe not')}>No</button></div><small className="tiny">{noEscapes > 0 ? 'The NO button is having a little trouble.' : 'Choose wisely. The button may have opinions.'}</small></div>
      <div className="question-card skin-card"><div className="q-label">A QUICK KNOWLEDGE CHECK</div><h3>How many layers of skin does a human have?</h3><div className="skin-options">{['2','3','7','I refuse to be tested'].map(v => <button key={v} className={skinAnswer === v ? 'choice selected' : 'choice'} onClick={() => setSkinAnswer(v)}>{v}</button>)}</div><button className="secret-link" onClick={() => setShowSkin(v => !v)}>{showSkin ? 'Hide examiner notes' : 'Why is this even here?'} ↗</button>{showSkin && <p className="secret-note">Because someone once got asked this and Aaryan has refused to let it go. This question has no bearing on your performance. Probably.</p>}</div>
      <div className="field-block"><label htmlFor="note">Anything else? (optional)</label><textarea id="note" rows={3} value={a.note} onChange={e => update('note', e.target.value)} placeholder="Complaints, compliments, McD recommendations..."/></div>
      <div className="actions"><button className="text-button" onClick={() => setStep(2)}>← Back</button><button className="primary" onClick={finish}>Submit review <span>↗</span></button></div>
    </section>}

    {step === 4 && <section className="panel result-panel fade-in"><div className="result-stamp">REVIEW RECEIVED ✳</div><p className="eyebrow">CASE CLOSED (FOR NOW)</p><h2>Thanks, <em>Guruji.</em></h2><p className="muted">Your review has been filed in the highly advanced local records department.</p><div className="score-card"><span>UNOFFICIAL VIBE INDEX</span><strong>{average}<small>/10</small></strong><p>{average >= 8 ? 'Okay, Aaryan might be a little pleased.' : average >= 5 ? 'Room for improvement. He will take notes.' : 'A performance review has been scheduled.'}</p></div><div className="result-lines"><div><span>Next date?</span><strong>{a.nextDate || 'Left the management guessing'}</strong></div><div><span>Skin-layer answer</span><strong>{skinAnswer || 'Classified information'}</strong></div><div><span>Preferred McD order</span><strong>{a.mcdOrder || 'Dealer’s choice'}</strong></div></div><p className="closing-line">Anyway. This was fun. See you around, Mrinal. :)</p><div className="actions"><button className="text-button" onClick={reset}>Start over</button><button className="primary" onClick={() => { try { const data = localStorage.getItem(STORE_KEY); if (data) { const blob = new Blob([data], {type:'application/json'}); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = 'guruji-date-review.json'; link.click(); URL.revokeObjectURL(url); } } catch {} }}>Save my review ↓</button></div><p className="micro">{saved ? 'Saved on this device.' : 'Your browser may not have allowed local saving.'} {hasPrevious ? 'A previous review was found on this device.' : ''}</p></section>}

    <footer className="site-footer"><span>NO BIG DEAL.</span><button onClick={() => setShowSecret(v => !v)}>✳</button><span>JUST A DATE REVIEW.</span></footer>
    {showSecret && <div className="toast" role="status">P.S. The General Secretary is always right. (Except when Aaryan is teasing.)</div>}
  </main>;
}
