// Multiplatform Case Study — content slides
// Used by React Summit Talk.html. Reuses styles from deck.css.
// 1280 × 720 slide canvas.

// Event breadcrumb — picked in the deck toolbar ("Event"). Empty → none.
// `date` is display text; `on` is the talk day (ISO) used to pick the default.
const VENUES = {
  'react-summit-2026': { name: 'React Summit', date: 'Jun 2026', on: '2026-06-11' },
  'reactcon-berlin-2026': { name: 'reactCon · next.app devcon', date: '8 Oct 2026', on: '2026-10-08' },
  'reactjsday-2026': { name: 'reactjsday', date: '19 Nov 2026', on: '2026-11-19' },
  'react-day-berlin-2026': { name: 'React Day Berlin', date: 'Dec 2026', on: '2026-12-04' },
};
// Today's local date as YYYY-MM-DD, so the event day itself still counts as upcoming.
function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
// Earliest venue on today or later; '' if all are past.
function nextVenueId() {
  const today = todayISO();
  const upcoming = Object.entries(VENUES)
    .filter(([, v]) => v.on >= today)
    .sort(([, a], [, b]) => a.on.localeCompare(b.on));
  return upcoming.length ? upcoming[0][0] : '';
}
const venueStore = {
  id: '',
  subs: new Set(),
  set(id) { this.id = VENUES[id] ? id : ''; this.subs.forEach(fn => fn(this.id)); },
};
function venueLabel(id) {
  const v = VENUES[id];
  return v ? `${v.name} · ${v.date}` : '';
}
function useVenueLabel() {
  const [id, setId] = React.useState(venueStore.id);
  React.useEffect(() => { venueStore.subs.add(setId); return () => venueStore.subs.delete(setId); }, []);
  return venueLabel(id);
}
function VenueBrand({ prefix = '' }) {
  const label = useVenueLabel();
  return label ? <span style={{color: 'var(--z-text-secondary)'}}>{prefix}{label}</span> : null;
}

// Reusable footer
function Footer({ beat, beatNum }) {
  return (
    <div className="deck-footer">
      <div className="crumb">
        <span className="pageno">— / 20</span>
        <span style={{margin: '0 12px', opacity: 0.4}}>·</span>
        <span>{beat}</span>
      </div>
      <div className="brand"><VenueBrand /></div>
    </div>
  );
}

// ─── Chapter divider — reusable opener slide before each chapter ──────
// Number + title. Visually distinct, intentionally sparse.
function ChapterDivider({ num, title, label, footerName }) {
  return (
    <div className="slide chapter-slide" data-screen-label={label}>
      <style>{`
        .chapter-slide { position: relative; overflow: hidden; }
        .chapter-slide .chapter-pad {
          padding: 0 80px;
          height: 100%; box-sizing: border-box;
          display: flex; flex-direction: column;
          justify-content: center;
          padding-bottom: 70px; /* clear footer */
        }
        .chapter-slide .chapter-rule {
          height: 3px; width: 96px;
          background: var(--z-accent-primary);
          margin-bottom: 32px;
        }
        .chapter-slide .chapter-line {
          display: flex;
          align-items: baseline;
          gap: 36px;
          text-wrap: pretty;
        }
        .chapter-slide .chapter-num {
          font: 900 320px/0.85 Compasse, sans-serif;
          letter-spacing: -0.05em;
          color: var(--z-accent-primary);
          font-variant-numeric: tabular-nums;
          flex-shrink: 0;
        }
        .chapter-slide .chapter-title {
          font: 700 88px/0.95 Compasse, sans-serif;
          color: var(--z-text-primary);
          letter-spacing: -0.025em;
          margin: 0;
        }
        .chapter-slide .chapter-eyebrow {
          font: 800 14px/1 Compasse, sans-serif;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--z-text-secondary);
          margin-bottom: 20px;
        }
      `}</style>
      <div className="chapter-pad">
        <div className="chapter-eyebrow">Chapter</div>
        <div className="chapter-rule"></div>
        <div className="chapter-line">
          <span className="chapter-num">{String(num).padStart(2, '0')}</span>
          <h1 className="chapter-title">{title}</h1>
        </div>
      </div>
      <Footer beat={`Chapter ${String(num).padStart(2, '0')}${footerName ? ' · ' + footerName : ''}`} />
    </div>
  );
}

function Chapter01_Zattoo() {
  return <ChapterDivider num={1} title={<>Who is Zattoo?</>} label="01. Who is Zattoo" footerName="Who is Zattoo?" />;
}

function Chapter02_Challenge() {
  return <ChapterDivider num={2} title={<>The Challenge.</>} label="02. The Challenge" footerName="The Challenge" />;
}

function Chapter03_Failed() {
  return <ChapterDivider num={3} title={<>Early failed attempts.</>} label="03. Early failed attempts" footerName="Early failed attempts" />;
}

function Chapter04_Catalyst() {
  return <ChapterDivider num={4} title={<>The Catalyst.</>} label="04. The Catalyst" footerName="The Catalyst" />;
}

function Chapter05_Starting() {
  return <ChapterDivider num={5} title={<>Starting before you're ready.</>} label="05. Starting before you’re ready" footerName="Starting before you're ready" />;
}

function Chapter06_GreenLight() {
  return <ChapterDivider num={6} title={<>Green light.</>} label="06. Green light" footerName="Green light" />;
}

function Chapter07_Migration() {
  return <ChapterDivider num={7} title={<>Migration in Practice.</>} label="07. Migration in Practice" footerName="Migration in Practice" />;
}

function Chapter08_Learned() {
  return <ChapterDivider num={8} title={<>What we learned.</>} label="08. What we learned" footerName="What we learned" />;
}

function Chapter09_WhereNow() {
  return <ChapterDivider num={9} title={<>Where we are now.</>} label="09. Where we are now" footerName="Where we are now" />;
}

// ─── S19b · Vega first boot — memory slide ─────────────────────────
function S19b_VegaFirstBoot() {
  return (
    <div className="slide vega-memo-slide" data-screen-label="07. Vega first boot">
      <style>{`
        .vega-memo-slide {
          position: relative;
          overflow: hidden;
        }
        .vega-memo-slide .vega-memo-bg {
          position: absolute;
          inset: 0;
          background-image: url('assets/poc/vega-first-boot.jpg');
          background-size: cover;
          background-position: center;
          filter: brightness(0.55) saturate(0.85);
        }
        .vega-memo-slide .vega-memo-bg::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.68) 38%, rgba(13,13,13,0.20) 62%, rgba(13,13,13,0.12) 100%);
        }
        .vega-memo-slide .vega-memo-pad {
          position: relative;
          z-index: 1;
          padding: 80px 80px 90px;
          height: 100%; box-sizing: border-box;
          display: flex; flex-direction: column;
          justify-content: center;
          max-width: 720px;
        }
        .vega-memo-slide .vega-stamp {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 6px 12px;
          background: rgba(217,119,87,0.16);
          border: 1px solid rgba(217,119,87,0.45);
          color: var(--z-accent-primary);
          border-radius: 999px;
          font: 800 11px/1 Compasse, sans-serif;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          align-self: flex-start;
          margin-bottom: 22px;
        }
        .vega-memo-slide .vega-stamp::before {
          content: '';
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--z-accent-primary);
          box-shadow: 0 0 0 4px rgba(217,119,87,0.20);
        }
        .vega-memo-slide .vega-title {
          font: 700 56px/1.02 Compasse, sans-serif;
          color: var(--z-text-primary);
          letter-spacing: -0.025em;
          margin: 0;
          text-wrap: pretty;
        }
        .vega-memo-slide .vega-title em {
          font-style: italic;
          color: var(--z-accent-primary);
        }
        .vega-memo-slide .vega-body {
          font: 400 19px/1.45 Compasse, sans-serif;
          color: rgba(255,255,255,0.82);
          margin-top: 22px;
          max-width: 580px;
          text-wrap: pretty;
        }
        .vega-memo-slide .vega-body strong {
          color: var(--z-text-primary);
          font-weight: 700;
        }
        .vega-memo-slide .vega-meta {
          margin-top: 28px;
          display: flex; gap: 28px;
          font: 800 11px/1.2 Compasse, sans-serif;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
        }
        .vega-memo-slide .vega-meta strong {
          color: var(--z-text-primary);
          display: block;
          font-size: 22px;
          letter-spacing: -0.01em;
          text-transform: none;
          margin-top: 4px;
        }
      `}</style>
      <div className="vega-memo-bg"></div>
      <div className="vega-memo-pad">
        <span className="vega-stamp">Memo · From the keyboard</span>
        <h2 className="vega-title">
          <em>Vega.</em> First&nbsp;boot,<br/>on our&nbsp;own&nbsp;code.
        </h2>
        <p className="vega-body">
          The same login screen we shipped to Web and Android&nbsp;TV — now rendering on the <strong>Vega&nbsp;dev kit</strong>. Two days and nights fighting the Metro resolver to pipe it in: Vega's SDK, <span className="t-mono">node_modules</span> topology, and Kepler SDK resolution all diverge from our defaults.
        </p>
        <div className="vega-meta">
          <div>
            Where
            <strong>Berlin office</strong>
          </div>
          <div>
            When
            <strong>2024</strong>
          </div>
          <div>
            Cost
            <strong>2 engineers, 2 days, 2 nights</strong>
          </div>
        </div>
      </div>
      <Footer beat="Chapter 07 · Migration in Practice · Tech" beatNum={7} />
    </div>
  );
}

// ─── S22b · Universal test framework ───────────────────────────────
function S22b_TestSuite() {
  const Triangle = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14a2 2 0 0 0 1.7 3h16a2 2 0 0 0 1.7-3z"/>
      <path d="M12 9v4"/><path d="M12 17h.01"/>
    </svg>
  );
  const Box = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <path d="m3.3 7 8.7 5 8.7-5"/>
      <path d="M12 22V12"/>
    </svg>
  );
  const Check = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <path d="m9 11 3 3L22 4"/>
    </svg>
  );
  const Target = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      <path d="M12 2v6M22 12h-6"/>
    </svg>
  );

  const Globe = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>
    </svg>
  );
  const Code = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>
    </svg>
  );
  const People = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.2"/>
      <path d="M3 19c.6-3.4 3-5 6-5s5.4 1.6 6 5"/>
      <path d="M14 17c.5-1.8 2-3 4-3 1.6 0 3 .9 3.5 3"/>
    </svg>
  );
  const Gear = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.36.86 1.18 1.4 2 1.4H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  );
  const Puzzle = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19.4 13a2 2 0 0 1 0 4 2 2 0 0 1-1.4-.6c-.4-.4-1-.4-1.4 0V19a2 2 0 0 1-2 2h-2v-2c0-.6-.4-1-1-1s-1 .4-1 1v2H8a2 2 0 0 1-2-2v-2c0-.6-.4-1-1-1H3a2 2 0 0 1 0-4h2c.6 0 1-.4 1-1V8a2 2 0 0 1 2-2h2.6c.4 0 .6-.4.6-.8a2 2 0 0 1 4 0c0 .4.2.8.6.8H19a2 2 0 0 1 2 2v2.6c0 .4-.4.6-.8.6"/>
    </svg>
  );

  const Bracket = ({ idx, color, icon, title, items }) => (
    <div className="tests-col">
      <div className="tests-col-head" style={{color}}>
        <span className="tests-col-icon" style={{color}}>{icon}</span>
        <span>{title}</span>
      </div>
      <div className="tests-col-items">
        {items.map((it, i) => (
          <div key={i} className="tests-item" style={{borderColor: color + '4D'}}>
            <span className="tests-item-icon" style={{color, borderColor: color + '4D'}}>{it.icon}</span>
            <span className="tests-item-text">{it.text}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="slide tests-slide" data-screen-label="07. One test suite">
      <style>{`
        .tests-slide .tests-title {
          font: 700 36px/1.05 Compasse, sans-serif;
          color: var(--z-text-primary);
          letter-spacing: -0.015em;
          margin: 0;
        }
        .tests-slide .tests-grid {
          margin-top: 36px;
          display: grid;
          grid-template-columns: 1fr 1.18fr 1fr;
          gap: 18px;
        }
        .tests-slide .tests-col {
          display: flex; flex-direction: column;
          gap: 12px;
        }
        .tests-slide .tests-col-head {
          display: flex; align-items: center;
          gap: 10px;
          font: 800 17px/1 Compasse, sans-serif;
          letter-spacing: -0.005em;
          padding-bottom: 8px;
        }
        .tests-slide .tests-col-icon {
          display: inline-flex; align-items: center; justify-content: center;
          width: 28px; height: 28px;
        }
        .tests-slide .tests-col-items {
          display: flex; flex-direction: column;
          gap: 10px;
        }
        .tests-slide .tests-item {
          display: grid; grid-template-columns: 36px 1fr;
          gap: 12px; align-items: center;
          padding: 12px 14px;
          border-radius: 6px;
          border: 1px solid;
          background: transparent;
        }
        .tests-slide .tests-item-icon {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1px solid;
          display: inline-flex; align-items: center; justify-content: center;
        }
        .tests-slide .tests-item-text {
          font: 600 14px/1.3 Compasse, sans-serif;
          color: var(--z-text-primary);
          text-wrap: pretty;
        }

        /* Middle column — diagram */
        .tests-slide .tests-diagram {
          display: flex; flex-direction: column;
          align-items: stretch;
          gap: 8px;
        }
        .tests-slide .diag-pill {
          background: var(--z-surface-card);
          border: 1px solid rgba(0,184,212,0.30);
          border-radius: 999px;
          padding: 10px 18px;
          align-self: center;
          font: 600 13px/1 Compasse, sans-serif;
          color: var(--z-text-primary);
          display: inline-flex; align-items: center; gap: 8px;
        }
        .tests-slide .diag-pill code {
          font: 700 12px/1 'JetBrains Mono', monospace;
          color: var(--z-accent-teal);
        }
        .tests-slide .diag-arrow {
          align-self: center;
          color: var(--z-accent-teal);
          opacity: 0.6;
          font-size: 14px;
          margin: -2px 0;
        }
        .tests-slide .diag-core {
          background: rgba(0,184,212,0.10);
          border: 1.5px solid rgba(0,184,212,0.45);
          border-radius: 8px;
          padding: 14px 18px;
          align-self: center;
          font: 700 16px/1.2 Compasse, sans-serif;
          color: var(--z-accent-teal);
          text-align: center;
        }
        .tests-slide .diag-plats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 6px;
          margin-top: 4px;
        }
        .tests-slide .diag-plat {
          padding: 10px 6px;
          border: 1px solid rgba(0,184,212,0.30);
          border-radius: 6px;
          text-align: center;
          font: 700 12px/1.2 Compasse, sans-serif;
          color: var(--z-text-primary);
        }
        .tests-slide .diag-plat .runtime {
          display: block;
          margin-top: 4px;
          font: 500 11px/1 'JetBrains Mono', monospace;
          color: var(--z-accent-teal);
        }
        .tests-slide .diag-shared {
          margin-top: 6px;
          padding: 10px 14px;
          border: 1px dashed rgba(0,184,212,0.40);
          border-radius: 6px;
          text-align: center;
          font: 600 12px/1 Compasse, sans-serif;
          color: var(--z-text-secondary);
        }

        /* Bottom callout */
        .tests-slide .tests-callout {
          margin-top: 24px;
          padding: 14px 18px;
          background: rgba(68,147,248,0.10);
          border: 1px solid rgba(68,147,248,0.30);
          border-radius: 4px;
          display: flex; align-items: center; gap: 16px;
        }
        .tests-slide .tests-callout-icon {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 2px solid #4493F8;
          color: #4493F8;
          display: inline-flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .tests-slide .tests-callout-text {
          font: 700 17px/1.35 Compasse, sans-serif;
          color: var(--z-text-primary);
        }
      `}</style>
      <div className="pad" style={{paddingTop: 56, paddingBottom: 160}}>
        <h2 className="tests-title">One test suite, <em style={{color: 'var(--z-accent-teal)', fontStyle: 'italic'}}>every platform</em>.</h2>

        <div className="tests-grid">
          {/* The problem */}
          <Bracket
            color="var(--z-accent-red)"
            icon={<Triangle />}
            title="The problem"
            items={[
              { icon: <Globe />, text: 'No single framework worked across all platforms' },
              { icon: <Code />, text: 'Existing Playwright tests were already valuable' },
              { icon: <People />, text: 'We wanted one authoring style, not four separate suites' },
            ]}
          />

          {/* Middle diagram */}
          <div className="tests-col">
            <div className="tests-col-head" style={{color: 'var(--z-accent-teal)'}}>
              <span className="tests-col-icon" style={{color: 'var(--z-accent-teal)'}}><Box /></span>
              <span>Universal System Test Framework</span>
            </div>
            <div className="tests-diagram">
              <div className="diag-pill"><code>{'</>'}</code> Playwright-style tests</div>
              <div className="diag-arrow">▼</div>
              <div className="diag-core">Universal System<br/>Test Framework</div>
              <div className="diag-arrow">▼</div>
              <div className="diag-plats">
                <div className="diag-plat">Web<span className="runtime">WebDriver</span></div>
                <div className="diag-plat">Android TV<span className="runtime">Appium</span></div>
                <div className="diag-plat">Apple TV<span className="runtime">Appium</span></div>
                <div className="diag-plat">Vega<span className="runtime">Appium</span></div>
              </div>
              <div className="diag-shared">Shared fixtures &amp; helpers</div>
            </div>
          </div>

          {/* Why it matters */}
          <Bracket
            color="var(--z-accent-green)"
            icon={<Check />}
            title="Why it matters"
            items={[
              { icon: <People />, text: 'Tests stay shared across platforms' },
              { icon: <Gear />, text: 'Platform specifics live in helpers' },
              { icon: <Puzzle />, text: 'New platforms extend helpers, not tests' },
            ]}
          />
        </div>

        <div className="tests-callout">
          <span className="tests-callout-icon"><Target /></span>
          <div className="tests-callout-text">
            Write the test once. Route execution per platform. Keep differences inside helpers.
          </div>
        </div>
      </div>
      <Footer beat="Chapter 07 · Migration in Practice · Tech" beatNum={7} />
    </div>
  );
}
function S03_Everywhere() {
  return (
    <div className="slide" data-screen-label="01. The Product">
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1.35fr', height: '100%', gap: 0}}>
        <div style={{padding: '120px 64px 80px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <div style={{width: 56, height: 3, background: 'var(--z-accent-primary)', marginBottom: 28}}></div>
          <h1 style={{font: '700 64px/1.05 Compasse, sans-serif', color: 'var(--z-text-primary)', margin: 0, letterSpacing: '-0.02em'}}>
            The Product<span style={{color: 'var(--z-accent-primary)'}}>.</span>
          </h1>
          <p style={{font: '400 22px/1.45 Compasse, sans-serif', color: 'var(--z-text-secondary)', marginTop: 32, maxWidth: 420}}>
            Zattoo is a streaming company, and we make streaming easy, on whatever device or technology you bring.
          </p>
        </div>
        <div style={{position: 'relative', overflow: 'hidden', background: '#0d0d0d'}}>
          <img
            src={"assets/product-hero-cropped.jpg"}
            alt="The Zattoo product across TV, tablet, phone, laptop, and speaker"
            style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center'}}
          />
        </div>
      </div>
      <Footer beat="Chapter 01 · Who is Zattoo?" beatNum={2} />
    </div>
  );
}

// ─── S04 · Moments — meeting people where they live ────────────────
// 2×2 grid of approved illustrations. Click-to-build: each next click
// reveals the next moment, then advances to slide 05.
function S04_Moments() {
  const moments = [
    {
      img: 'assets/experience/bigscreen.jpg',
      tag: 'Big-screen TV',
      title: '',
      body: <>Family gathered on Christmas&nbsp;Eve, watching their favourite <em>X-mas movie</em>.</>,
    },
    {
      img: 'assets/experience/mobile.jpg',
      tag: 'Phone',
      title: 'On the go.',
      body: <>Cheering your team&rsquo;s match you can&rsquo;t&nbsp;miss, in your hand.</>,
    },
    {
      img: 'assets/experience/automotive.jpg',
      tag: 'In-car displays',
      title: 'On a long road trip.',
      body: <>Making time pass watching your favourite&nbsp;shows.</>,
    },
    {
      img: 'assets/experience/fridge.jpg',
      tag: 'Fridge screen',
      title: 'Sipping morning coffee.',
      body: <>And watching the latest&nbsp;news.</>,
    },
  ];
  return (
    <div className="slide moments-slide" data-screen-label="01. Product Moments" data-build-max="4">
      <style>{`
        .moments-slide {
          position: relative;
          overflow: hidden;
        }
        .moments-slide .moments-pad {
          padding: 56px 64px 56px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          height: 100%;
          box-sizing: border-box;
          align-items: stretch;
        }
        .moments-slide .moments-text {
          display: flex; flex-direction: column;
          justify-content: center;
          max-width: 460px;
          padding-bottom: 60px; /* clear footer */
        }
        .moments-slide .moments-headline {
          font: 700 44px/1.05 Compasse, sans-serif;
          color: var(--z-text-primary);
          margin: 12px 0 0; letter-spacing: -0.015em;
          text-wrap: pretty;
        }
        .moments-slide .moments-headline em {
          font-style: italic; color: var(--z-accent-primary);
        }
        .moments-slide .moments-counter {
          margin-top: 28px;
          font: 800 13px/1.4 Compasse, sans-serif;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.18);
          display: flex; flex-direction: column; gap: 10px;
        }
        .moments-slide .moments-counter .label {
          transition: color 320ms ease, transform 320ms cubic-bezier(.2,.8,.2,1);
        }
        .moments-slide[data-step="1"] .label:nth-child(-n+1),
        .moments-slide[data-step="2"] .label:nth-child(-n+2),
        .moments-slide[data-step="3"] .label:nth-child(-n+3),
        .moments-slide[data-step="4"] .label:nth-child(-n+4) {
          color: rgba(255,255,255,0.45);
        }
        .moments-slide[data-step="1"] .label:nth-child(1),
        .moments-slide[data-step="2"] .label:nth-child(2),
        .moments-slide[data-step="3"] .label:nth-child(3),
        .moments-slide[data-step="4"] .label:nth-child(4) {
          color: var(--z-accent-primary);
        }

        /* Photo stack: cards absolutely positioned in the right column,
           overlapping like a pile on a table. Each new card lands on top
           with a slight rotation; previous cards remain visible behind. */
        .moments-slide .moments-stage {
          position: relative;
          padding-bottom: 60px; /* clear footer */
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .moments-slide .stack {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          max-height: 560px;
          perspective: 1400px;
        }
        .moments-slide .photo {
          position: absolute;
          inset: 0;
          background: #f6f4ef;
          padding: 14px 14px 72px;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.04) inset,
            0 18px 40px rgba(0,0,0,0.55),
            0 6px 14px rgba(0,0,0,0.45);
          box-sizing: border-box;
          transform-origin: 50% 50%;
          opacity: 0;
          transform: translate(var(--rest-x, 0px), -120%) rotate(var(--rest-rot, 0deg)) scale(0.96);
          transition:
            opacity 520ms cubic-bezier(.2,.8,.2,1),
            transform 720ms cubic-bezier(.2,.85,.25,1.02);
          will-change: opacity, transform;
        }
        .moments-slide .photo[data-idx="1"] { --rest-x: -64px; --rest-y: -10px; --rest-rot: -7deg; }
        .moments-slide .photo[data-idx="2"] { --rest-x:  56px; --rest-y:  -2px; --rest-rot:  5deg; }
        .moments-slide .photo[data-idx="3"] { --rest-x: -40px; --rest-y:  14px; --rest-rot: -3deg; }
        .moments-slide .photo[data-idx="4"] { --rest-x:  24px; --rest-y:   8px; --rest-rot:  4deg; }

        /* Reveal: when a photo's idx <= current step, fall into place. */
        .moments-slide[data-step="1"] .photo[data-idx="1"],
        .moments-slide[data-step="2"] .photo[data-idx="1"],
        .moments-slide[data-step="2"] .photo[data-idx="2"],
        .moments-slide[data-step="3"] .photo[data-idx="1"],
        .moments-slide[data-step="3"] .photo[data-idx="2"],
        .moments-slide[data-step="3"] .photo[data-idx="3"],
        .moments-slide[data-step="4"] .photo {
          opacity: 1;
          transform: translate(var(--rest-x), var(--rest-y)) rotate(var(--rest-rot)) scale(1);
        }

        /* Z-stacking: most recent on top. */
        .moments-slide .photo[data-idx="1"] { z-index: 1; }
        .moments-slide .photo[data-idx="2"] { z-index: 2; }
        .moments-slide .photo[data-idx="3"] { z-index: 3; }
        .moments-slide .photo[data-idx="4"] { z-index: 4; }

        .moments-slide .photo-img {
          position: relative;
          width: 100%; height: 100%;
          overflow: hidden;
          background: #0d0d0d;
        }
        .moments-slide .photo-img img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          display: block;
        }
        .moments-slide .photo-caption {
          position: absolute;
          left: 18px; right: 18px; bottom: 0;
          height: 72px; /* matches photo bottom padding */
          display: flex; align-items: center; justify-content: center;
          font: 400 italic 17px/1.25 Compasse, sans-serif;
          color: #29261b;
          letter-spacing: -0.005em;
          text-align: center;
          text-wrap: pretty;
        }
      `}</style>
      <div className="moments-pad">
        <div className="moments-text">
          <div className="eyebrow accent">In practice</div>
          <h2 className="moments-headline">
            Meeting people in the <em>moments they live</em>
          </h2>
          <div className="moments-counter">
            <span className="label">Bigscreen</span>
            <span className="label">Mobile</span>
            <span className="label">Automotive</span>
            <span className="label">Anywhere</span>
          </div>
        </div>
        <div className="moments-stage">
          <div className="stack">
            {moments.map((m, i) => (
              <div key={i} className="photo" data-idx={i + 1}>
                <div className="photo-img">
                  <img src={m.img} alt={m.tag} />
                </div>
                <div className="photo-caption">
                  <span>{m.title} {m.body}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer beat="Chapter 01 · Who is Zattoo?" beatNum={2} />
    </div>
  );
}

// ─── S05 · Niche — Mobile vs Bigscreen ───────────────────────────
// Two graphical "piles" — a sparse mobile cluster vs a dense
// bigscreen cluster — communicating Zattoo's 4th-platform niche by
// visual mass. Each device illustrated to look brand-distinct;
// devices are absolutely positioned with slight rotation and clear
// space between bounding boxes (no overlap) for a casual feel.
function S05_Niche() {
  // ─── Mobile devices (brand-flavoured) ──────────────────────────
  const IPhone = ({ w = 64, h = 122 }) => (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <rect x="2" y="2" width={w - 4} height={h - 4} rx="11" fill="none" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="6" y="14" width={w - 12} height={h - 22} rx="3" fill="currentColor" opacity="0.08"/>
      <rect x={w / 2 - 11} y="9" width="22" height="5" rx="2.5" fill="currentColor"/>
      <rect x={w / 2 - 12} y={h - 7} width="24" height="1.8" rx="0.9" fill="currentColor" opacity="0.55"/>
    </svg>
  );
  const SamsungPhone = ({ w = 62, h = 124 }) => (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <rect x="2" y="2" width={w - 4} height={h - 4} rx="6" fill="none" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="5" y="9" width={w - 10} height={h - 18} rx="2.5" fill="currentColor" opacity="0.08"/>
      <circle cx={w / 2} cy="13" r="2.2" fill="currentColor"/>
      <rect x={w / 2 - 8} y={h - 7} width="16" height="1.6" rx="0.8" fill="currentColor" opacity="0.45"/>
    </svg>
  );
  const IPad = ({ w = 94, h = 124 }) => (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <rect x="2" y="2" width={w - 4} height={h - 4} rx="7" fill="none" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="7" y="11" width={w - 14} height={h - 22} rx="2.5" fill="currentColor" opacity="0.08"/>
      <circle cx={w / 2} cy="7" r="1.4" fill="currentColor"/>
      <rect x={w / 2 - 14} y={h - 6} width="28" height="1.8" rx="0.9" fill="currentColor" opacity="0.55"/>
    </svg>
  );
  const GalaxyTab = ({ w = 96, h = 126 }) => (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <rect x="2" y="2" width={w - 4} height={h - 4} rx="4" fill="none" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="6" y="10" width={w - 12} height={h - 20} rx="2" fill="currentColor" opacity="0.08"/>
      <circle cx={w / 2} cy="6.5" r="1.3" fill="currentColor"/>
      <line x1={w - 3.5} y1={h * 0.32} x2={w - 3.5} y2={h * 0.58} stroke="currentColor" strokeWidth="1.5" opacity="0.55"/>
    </svg>
  );

  // ─── Bigscreen: TVs with vendor-specific stands ────────────────
  // `stand`: 'pedestal' (Samsung blade) | 'legs' (LG splayed) |
  //         'feet' (Hisense two-foot) | 'centerStem' (Panasonic) |
  //         'none' (wall-mounted, e.g. Android TV)
  const TV = ({ w, h, stand = 'pedestal' }) => {
    const screenH = stand === 'none' ? h - 2 : h - 22;
    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <rect x="2" y="2" width={w - 4} height={screenH} rx="5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="6" y="6" width={w - 12} height={screenH - 8} rx="2" fill="currentColor" opacity="0.07"/>
        {stand === 'pedestal' && (
          <g>
            <line x1={w / 2} y1={screenH + 2} x2={w / 2} y2={h - 6} stroke="currentColor" strokeWidth="1.6"/>
            <rect x={w / 2 - 30} y={h - 6} width="60" height="2" rx="1" fill="currentColor"/>
          </g>
        )}
        {stand === 'legs' && (
          <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none">
            <line x1={w / 2 - 24} y1={screenH + 2} x2={w / 2 - 38} y2={h - 4}/>
            <line x1={w / 2 + 24} y1={screenH + 2} x2={w / 2 + 38} y2={h - 4}/>
            <line x1={w / 2 - 44} y1={h - 4} x2={w / 2 - 28} y2={h - 4}/>
            <line x1={w / 2 + 28} y1={h - 4} x2={w / 2 + 44} y2={h - 4}/>
          </g>
        )}
        {stand === 'feet' && (
          <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
            <path d={`M${w / 2 - 40} ${screenH + 2} L${w / 2 - 26} ${screenH + 2} L${w / 2 - 28} ${h - 4} L${w / 2 - 42} ${h - 4} Z`}/>
            <path d={`M${w / 2 + 26} ${screenH + 2} L${w / 2 + 40} ${screenH + 2} L${w / 2 + 42} ${h - 4} L${w / 2 + 28} ${h - 4} Z`}/>
          </g>
        )}
        {stand === 'centerStem' && (
          <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
            <rect x={w / 2 - 5} y={screenH + 2} width="10" height={h - screenH - 8}/>
            <path d={`M${w / 2 - 24} ${h - 4} Q${w / 2} ${h - 9} ${w / 2 + 24} ${h - 4}`} strokeLinecap="round"/>
          </g>
        )}
      </svg>
    );
  };

  // ─── Set-top boxes (three vendor-style variants) ───────────────
  // Variant A — Operator STB (info panel + dual LEDs)
  const OperatorSTB = ({ w = 134, h = 48 }) => (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <rect x="2" y="4" width={w - 4} height={h - 10} rx="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="2" y={h - 6} width={w - 4} height="2" fill="currentColor" opacity="0.18"/>
      <circle cx={w - 12} cy={h / 2 - 1} r="1.5" fill="currentColor"/>
      <circle cx={w - 20} cy={h / 2 - 1} r="1.5" fill="currentColor" opacity="0.45"/>
      <rect x="10" y={h / 2 - 5} width="52" height="8" rx="1" fill="currentColor" opacity="0.10"/>
    </svg>
  );
  // Variant B — Cable STB (front LCD channel display)
  const CableSTB = ({ w = 124, h = 48 }) => (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <rect x="2" y="4" width={w - 4} height={h - 10} rx="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="2" y={h - 6} width={w - 4} height="2" fill="currentColor" opacity="0.18"/>
      <rect x="12" y={h / 2 - 10} width="44" height="20" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
      <rect x="18" y={h / 2 - 5} width="6" height="10" rx="0.6" fill="currentColor" opacity="0.55"/>
      <rect x="27" y={h / 2 - 5} width="6" height="10" rx="0.6" fill="currentColor" opacity="0.55"/>
      <rect x="36" y={h / 2 - 5} width="6" height="10" rx="0.6" fill="currentColor" opacity="0.55"/>
      <rect x="45" y={h / 2 - 5} width="6" height="10" rx="0.6" fill="currentColor" opacity="0.25"/>
      <circle cx={w - 14} cy={h / 2 - 4} r="1.4" fill="currentColor"/>
      <circle cx={w - 14} cy={h / 2 + 4} r="1.4" fill="currentColor" opacity="0.45"/>
    </svg>
  );
  // Variant C — IPTV Box (top vent slots, minimal front)
  const IPTVBox = ({ w = 108, h = 42 }) => (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <rect x="2" y="6" width={w - 4} height={h - 12} rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="18" y1="4" x2="40" y2="4" stroke="currentColor" strokeWidth="1.4" opacity="0.55"/>
      <line x1="46" y1="4" x2="68" y2="4" stroke="currentColor" strokeWidth="1.4" opacity="0.55"/>
      <line x1="74" y1="4" x2="96" y2="4" stroke="currentColor" strokeWidth="1.4" opacity="0.55"/>
      <rect x="10" y={h / 2 - 3} width="18" height="6" rx="1" fill="currentColor" opacity="0.10"/>
      <circle cx={w - 12} cy={h / 2} r="1.4" fill="currentColor"/>
    </svg>
  );

  // ─── Streaming pucks, sticks, dongles ──────────────────────────
  const Puck = ({ w = 98, h = 36 }) => (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <rect x="2" y="3" width={w - 4} height={h - 6} rx="4" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx={w - 11} cy={h / 2} r="1.4" fill="currentColor"/>
    </svg>
  );
  const Stick = ({ w = 124, h = 30 }) => (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <rect x="2" y={h / 2 - 6} width={w - 28} height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <rect x={w - 26} y={h / 2 - 4} width="12" height="8" fill="currentColor" opacity="0.5"/>
      <circle cx="12" cy={h / 2} r="1.3" fill="currentColor"/>
    </svg>
  );
  const Dongle = ({ w = 112, h = 24 }) => (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <rect x="18" y="3" width={w - 36} height="18" rx="9" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <rect x={w - 16} y="6" width="12" height="12" fill="currentColor" opacity="0.5"/>
      <circle cx="30" cy={h / 2} r="1.4" fill="currentColor" opacity="0.5"/>
    </svg>
  );

  // ─── Web / browser frame ───────────────────────────────────────
  const Browser = ({ w = 144, h = 98 }) => (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <rect x="2" y="2" width={w - 4} height={h - 4} rx="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="2" y1="22" x2={w - 2} y2="22" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="1.8" fill="currentColor"/>
      <circle cx="22" cy="12" r="1.8" fill="currentColor" opacity="0.5"/>
      <circle cx="32" cy="12" r="1.8" fill="currentColor" opacity="0.3"/>
      <rect x="52" y="7" width="80" height="10" rx="1" fill="currentColor" opacity="0.06"/>
      <rect x="12" y="32" width="48" height="5" rx="1" fill="currentColor" opacity="0.16"/>
      <rect x="12" y="46" width={w - 24} height="3" rx="1" fill="currentColor" opacity="0.10"/>
      <rect x="12" y="54" width={w - 46} height="3" rx="1" fill="currentColor" opacity="0.10"/>
      <rect x="12" y="62" width={w - 64} height="3" rx="1" fill="currentColor" opacity="0.10"/>
      <rect x="12" y="76" width="36" height="14" rx="2" fill="currentColor" opacity="0.10"/>
    </svg>
  );

  // ─── Consoles (Xbox + PlayStation) ─────────────────────────────
  const Xbox = ({ w = 58, h = 88 }) => (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <rect x="2" y="2" width={w - 4} height={h - 4} rx="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx={w / 2} cy="14" r="9" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.7"/>
      <circle cx={w / 2} cy="14" r="4.5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      <circle cx={w / 2} cy="14" r="1.2" fill="currentColor"/>
      <line x1="4" y1="74" x2={w - 4} y2="74" stroke="currentColor" strokeWidth="0.8" opacity="0.30"/>
      <circle cx="12" cy="81" r="1.2" fill="currentColor" opacity="0.55"/>
      <rect x={w - 20} y="79" width="12" height="3" rx="0.5" fill="currentColor" opacity="0.30"/>
    </svg>
  );
  const PlayStation = ({ w = 60, h = 92 }) => (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <rect x="2" y="2" width={w - 4} height={h - 4} rx="6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="14" y1="10" x2="14" y2={h - 10} stroke="currentColor" strokeWidth="1.2" opacity="0.45"/>
      <line x1={w - 14} y1="10" x2={w - 14} y2={h - 10} stroke="currentColor" strokeWidth="1.2" opacity="0.45"/>
      <rect x={w / 2 - 2} y={h / 2 - 8} width="4" height="16" rx="1" fill="currentColor" opacity="0.55"/>
      <circle cx="11" cy={h - 12} r="1.1" fill="currentColor" opacity="0.55"/>
    </svg>
  );

  // ─── Curated absolute positions (no overlap) ───────────────────
  // Left zone area ~290×360. Right zone area ~820×400.
  const left = [
    { name: 'iPhone',         x:  10, y:  20, r: -4, z: 1, el: <IPhone w={62} h={120} /> },
    { name: 'Samsung',        x:  88, y:  14, r:  5, z: 1, el: <SamsungPhone w={60} h={122} /> },
    { name: 'iPad',           x:  10, y: 215, r: -3, z: 1, el: <IPad w={92} h={122} /> },
    { name: 'Galaxy\u00a0Tab',     x: 124, y: 222, r:  4, z: 1, el: <GalaxyTab w={96} h={124} /> },
  ];
  const right = [
    // Back row — five TVs with vendor-specific stands
    { name: 'Samsung\u00a0\u00b7\u00a0Tizen',   x:   8, y:   4, r: -1, z: 1, el: <TV w={184} h={130} stand="pedestal" /> },
    { name: 'LG\u00a0\u00b7\u00a0webOS',        x: 216, y:  22, r:  2, z: 1, el: <TV w={148} h={108} stand="legs" /> },
    { name: 'Vidaa\u00a0\u00b7\u00a0Hisense',   x: 388, y:  10, r: -2, z: 1, el: <TV w={130} h={94}  stand="feet" /> },
    { name: 'Panasonic',                x: 542, y:  22, r:  3, z: 1, el: <TV w={112} h={84}  stand="centerStem" /> },
    // Wall-mounted (no stand)
    { name: 'Android\u00a0TV',          x: 680, y:  16, r: -2, z: 1, el: <TV w={120} h={68}  stand="none" /> },
    // Mid row — web + three STB variants
    { name: 'Web\u00a0\u00b7\u00a0Browser',     x:   8, y: 170, r:  2, z: 2, el: <Browser w={144} h={98} /> },
    { name: 'Operator\u00a0STB',        x: 172, y: 208, r: -3, z: 2, el: <OperatorSTB w={134} h={48} /> },
    { name: 'Cable\u00a0STB',           x: 322, y: 214, r:  2, z: 2, el: <CableSTB w={124} h={48} /> },
    { name: 'IPTV\u00a0Box',            x: 462, y: 218, r: -2, z: 2, el: <IPTVBox w={108} h={42} /> },
    // Right column — consoles stacked below Android TV
    { name: 'Xbox',                 x: 678, y: 124, r: -3, z: 2, el: <Xbox w={58} h={88} /> },
    { name: 'PlayStation',          x: 748, y: 120, r:  4, z: 2, el: <PlayStation w={58} h={92} /> },
    // Front row — small streaming devices
    { name: 'Apple\u00a0TV',            x:  40, y: 320, r: -4, z: 3, el: <Puck w={98} h={36} /> },
    { name: 'Fire\u00a0TV',             x: 196, y: 326, r: -3, z: 3, el: <Stick w={124} h={30} /> },
    { name: 'Chromecast',           x: 372, y: 332, r:  3, z: 3, el: <Dongle w={112} h={24} /> },
  ];

  const Pile = ({ items }) => (
    <div className="niche-pile">
      {items.map((d, i) => (
        <div
          className="niche-item"
          key={i}
          style={{
            left: d.x, top: d.y,
            transform: d.r ? `rotate(${d.r}deg)` : undefined,
            zIndex: d.z,
          }}
        >
          {d.el}
          <div className="niche-item-name">{d.name}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="slide niche-slide" data-screen-label="02. Niche expertise">
      <style>{`
        .niche-slide .niche-pad {
          padding: 48px 60px 90px;
          height: 100%; box-sizing: border-box;
          display: flex; flex-direction: column;
        }
        .niche-slide .niche-head { max-width: 1080px; }
        .niche-slide .niche-headline {
          font: 800 40px/1.06 Compasse, sans-serif;
          color: var(--z-text-primary);
          letter-spacing: -0.015em;
          margin: 12px 0 0;
          text-wrap: pretty;
        }
        .niche-slide .niche-headline em {
          color: var(--z-accent-primary);
          font-style: italic;
        }
        .niche-slide .niche-zones {
          margin-top: 24px;
          flex: 1;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto minmax(0, 2.85fr);
          gap: 28px;
          align-items: stretch;
          min-height: 0;
        }
        .niche-slide .niche-zone {
          display: flex; flex-direction: column;
          min-width: 0; min-height: 0;
        }
        .niche-slide .niche-zone-label {
          font: 800 10.5px/1 Compasse, sans-serif;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--z-text-secondary);
          margin-bottom: 8px;
        }
        .niche-slide .niche-zone.is-ours .niche-zone-label {
          color: var(--z-accent-primary);
        }
        .niche-slide .niche-divider {
          width: 1px;
          align-self: stretch;
          background: linear-gradient(to bottom,
            transparent 0%,
            rgba(255,255,255,0.12) 20%,
            rgba(255,255,255,0.22) 50%,
            rgba(255,255,255,0.12) 80%,
            transparent 100%);
        }
        .niche-slide .niche-pile {
          position: relative;
          flex: 1;
          min-height: 0;
          color: var(--z-text-primary);
        }
        .niche-slide .niche-item {
          position: absolute;
          display: flex; flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .niche-slide .niche-item svg { display: block; }
        .niche-slide .niche-item-name {
          font: 700 8.5px/1 Compasse, sans-serif;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--z-text-secondary);
          white-space: nowrap;
        }
      `}</style>
      <div className="niche-pad">
        <div className="niche-head">
          <div className="eyebrow accent">Niche expertise</div>
          <h2 className="niche-headline">
            We ship to every screen that can stream media.<br/>
            <em>Most of our viewing lives in the living&nbsp;room.</em>
          </h2>
        </div>
        <div className="niche-zones">
          <div className="niche-zone">
            <div className="niche-zone-label">Mobile</div>
            <Pile items={left} />
          </div>
          <div className="niche-divider" aria-hidden="true" />
          <div className="niche-zone is-ours">
            <div className="niche-zone-label">Bigscreen</div>
            <Pile items={right} />
          </div>
        </div>
      </div>
      <Footer beat="Chapter 02 · The Challenge" beatNum={3} />
    </div>
  );
}
// ─── S06 · The matrix ────────────────────────────────────────────────
function S06_Matrix() {
  return (
    <div className="slide matrix-slide" data-screen-label="02. The matrix" data-build-max="5">
      <style>{`
        .matrix-slide .matrix-build {
          opacity: 0;
          transform: translateY(8px);
          transition:
            opacity 520ms cubic-bezier(.2,.8,.2,1),
            transform 520ms cubic-bezier(.2,.8,.2,1);
          will-change: opacity, transform;
        }
        .matrix-slide[data-step="1"] [data-build="1"],
        .matrix-slide[data-step="2"] [data-build="1"],
        .matrix-slide[data-step="2"] [data-build="2"],
        .matrix-slide[data-step="3"] [data-build="1"],
        .matrix-slide[data-step="3"] [data-build="2"],
        .matrix-slide[data-step="3"] [data-build="3"],
        .matrix-slide[data-step="4"] [data-build="1"],
        .matrix-slide[data-step="4"] [data-build="2"],
        .matrix-slide[data-step="4"] [data-build="3"],
        .matrix-slide[data-step="4"] [data-build="4"],
        .matrix-slide[data-step="5"] [data-build] {
          opacity: 1;
          transform: translateY(0);
        }
        .matrix-slide .psyduck {
          position: absolute;
          top: 56px; right: 56px;
          width: 220px; height: 220px;
          image-rendering: pixelated;
          z-index: 2;
          pointer-events: none;
        }
      `}</style>
      <img className="psyduck matrix-build" data-build="5" src="assets/psyduck.gif" alt="" />
      <div className="pad">
        <div className="two-col-head">
          <div>
            <div className="eyebrow accent">Complexity</div>
            <h2 className="h-headline" style={{marginTop: 16}}>
              <span style={{whiteSpace: 'nowrap'}}>Three platforms, multiplied</span><br/>
              <em className="matrix-build" data-build="4" style={{whiteSpace: 'nowrap', display: 'inline-block'}}>into hundreds of apps to ship.</em>
            </h2>
          </div>
          <p className="deck-text" style={{paddingBottom: 8}}></p>
        </div>
        <div className="matrix" style={{marginTop: 8}}>
          <div className="matrix-build" data-build="1">
            <div className="col-head">Platforms · 3</div>
            <div className="chip hi">Apple</div>
            <div className="chip hi">Android</div>
            <div className="chip hi">Web</div>
          </div>
          <div className="matrix-x matrix-build" data-build="2" aria-hidden="true">×</div>
          <div className="matrix-build" data-build="2">
            <div className="col-head">Clients · multiple</div>
            <div className="chip">tvOS, iOS</div>
            <div className="chip">Android TV, Android Mobile, FireOS TV, STB, Tablets</div>
            <div className="chip">Chrome, Safari, Firefox, webOS, Tizen, VIDAA, Panasonic…</div>
          </div>
          <div className="matrix-x matrix-build" data-build="3" aria-hidden="true">×</div>
          <div className="matrix-build" data-build="3">
            <div className="col-head">Tenants · dozens</div>
            <div className="chip">Zattoo</div>
            <div className="chip">1&amp;1</div>
            <div className="chip">Waoo</div>
            <div className="chip">Salt</div>
            <div className="chip">+ many more (white-label)</div>
          </div>
        </div>
      </div>
      <Footer beat="Chapter 02 · The Challenge" beatNum={3} />
    </div>
  );
}

// ─── S08 · Pull quote: multiplied not extended ──────────────────────
function S08_Quote() {
  return (
    <div className="slide" data-screen-label="02. Multiplied, not extended">
      <div className="pull-pad">
        <h2 className="pull-quote">
          Every new platform <em>multiplied</em> our effort<br/>
          instead of <em>extending</em> it.
        </h2>
      </div>
      <Footer beat="Chapter 02 · The Challenge" beatNum={3} />
    </div>
  );
}

// ─── S09 · Platform-centric: high duplication ────────────────────────
function S09_Duplication() {
  const PlatformIcon = ({ kind }) => {
    const common = { width: 28, height: 28, fill: 'currentColor', style: { display: 'block' } };
    switch (kind) {
      case 'apple':
        return (
          <svg {...common} viewBox="0 0 24 24"><path d="M17.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.8-3.6.8-.7 0-1.9-.8-3.1-.8-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.5.8 1.1 1.8 2.4 3 2.4 1.2 0 1.6-.8 3.1-.8 1.5 0 1.8.8 3.1.8 1.3 0 2.1-1.1 2.9-2.3.6-.8 1-1.7 1.3-2.7-1.4-.5-2.6-1.9-2.6-4zM15.1 5.5c.6-.7 1.1-1.7 1-2.8-1 0-2.1.6-2.8 1.4-.6.7-1.2 1.7-1 2.7 1.1.1 2.2-.6 2.8-1.3z"/></svg>
        );
      case 'android':
        return (
          <svg {...common} viewBox="0 0 24 24"><path d="M6.5 9.5c-.6 0-1.1.5-1.1 1.1V16c0 .6.5 1.1 1.1 1.1.6 0 1.1-.5 1.1-1.1v-5.4c0-.6-.5-1.1-1.1-1.1zm11 0c-.6 0-1.1.5-1.1 1.1V16c0 .6.5 1.1 1.1 1.1.6 0 1.1-.5 1.1-1.1v-5.4c0-.6-.5-1.1-1.1-1.1zM8.3 18.5c0 .7.5 1.2 1.2 1.2h.8v2.2c0 .6.5 1.1 1.1 1.1.6 0 1.1-.5 1.1-1.1v-2.2h1.3v2.2c0 .6.5 1.1 1.1 1.1.6 0 1.1-.5 1.1-1.1v-2.2h.8c.7 0 1.2-.5 1.2-1.2V9.6H8.3v8.9zM15.5 5.5l1-1.6c.1-.1 0-.3-.1-.4-.1-.1-.3 0-.4.1l-1 1.7c-.8-.3-1.7-.5-2.7-.5s-1.9.2-2.7.5l-1-1.7c-.1-.1-.3-.2-.4-.1-.1.1-.2.3-.1.4l1 1.6c-1.8.9-3 2.6-3 4.6h12.3c0-2-1.2-3.7-2.9-4.6zM10.2 7.6c-.3 0-.6-.3-.6-.6 0-.3.3-.6.6-.6.3 0 .6.3.6.6 0 .3-.3.6-.6.6zm3.6 0c-.3 0-.6-.3-.6-.6 0-.3.3-.6.6-.6.3 0 .6.3.6.6 0 .3-.3.6-.6.6z"/></svg>
        );
      case 'web':
        return (
          <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18M5 7h14M5 17h14"/></svg>
        );
      case 'tv':
        return (
          <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2.5" y="4" width="19" height="13" rx="1.5"/><path d="M8 21h8M12 17v4"/></svg>
        );
      case 'firetv':
        return (
          <div style={{
            width: 28, height: 28,
            borderRadius: '50%',
            border: '1.5px dashed var(--z-accent-primary)',
            color: 'var(--z-accent-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            font: '900 18px/1 Compasse, sans-serif',
          }}>?</div>
        );
      default: return null;
    }
  };

  const rows = ['Existing app', 'App Logic', 'Tests', 'Own tech', 'Own team'];
  const fireRows = ['New app', 'To build', 'To build', 'Own tech', 'To define'];
  const platforms = [
    { kind: 'apple', name: 'Apple' },
    { kind: 'android', name: 'Android' },
    { kind: 'web', name: 'Web' },
    { kind: 'tv', name: 'Smart TV' },
  ];

  // Chip color per row (matches reference: existing=green, logic/tests=red, tech/team=blue)
  const rowColors = [
    { bg: 'rgba(46,160,67,0.18)', text: '#7ee08a', dot: '#3fb950' },        // Existing app
    { bg: 'rgba(248,81,73,0.16)', text: '#ff8d85', dot: null },             // App Logic
    { bg: 'rgba(248,81,73,0.16)', text: '#ff8d85', dot: null },             // Tests
    { bg: 'rgba(88,166,255,0.18)', text: '#9ec5ff', dot: null },            // Own tech
    { bg: 'rgba(88,166,255,0.18)', text: '#9ec5ff', dot: null },            // Own team
  ];
  const fireRowColors = [
    { bg: 'rgba(217,119,87,0.20)', text: '#ffb58a', dot: 'var(--z-accent-primary)' }, // New app (orange)
    { bg: 'transparent', border: '1px dashed rgba(217,119,87,0.55)', text: 'rgba(217,119,87,0.92)' },
    { bg: 'transparent', border: '1px dashed rgba(217,119,87,0.55)', text: 'rgba(217,119,87,0.92)' },
    { bg: 'rgba(88,166,255,0.18)', text: '#9ec5ff' },
    { bg: 'rgba(88,166,255,0.18)', text: '#9ec5ff' },
  ];

  const Chip = ({ label, color, icon }) => (
    <div style={{
      height: 34,
      padding: '0 12px',
      background: color.bg,
      border: color.border || 'none',
      color: color.text,
      borderRadius: 4,
      font: '600 13px/1 Compasse, sans-serif',
      letterSpacing: '-0.005em',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    }}>
      {icon}
      <span>{label}</span>
    </div>
  );

  const Check = ({ color }) => (
    <span style={{
      width: 14, height: 14, borderRadius: 14,
      background: color, display: 'inline-flex',
      alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#0d0d0d" strokeWidth="2.5"><path d="M2 6.5l2.5 2.5L10 3.5"/></svg>
    </span>
  );
  const Plus = ({ color }) => (
    <span style={{
      width: 14, height: 14, borderRadius: 14,
      border: `1.5px solid ${color}`, display: 'inline-flex',
      alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke={color} strokeWidth="2"><path d="M6 2v8M2 6h8"/></svg>
    </span>
  );

  return (
    <div className="slide" data-screen-label="02. Platform-centric duplication">
      <div className="pad" style={{paddingTop: 40, paddingBottom: 70}}>
        <div>
          <div className="eyebrow accent" style={{marginBottom: 12}}>Organisation</div>
          <h2 style={{font: '700 42px/1.05 Compasse, sans-serif', color: 'var(--z-text-primary)', margin: 0, letterSpacing: '-0.015em'}}>
            Platform-centric development: <em style={{color: 'var(--z-accent-red)', fontStyle: 'italic'}}>high duplication.</em>
          </h2>
          <p style={{font: '400 18px/1.4 Compasse, sans-serif', color: 'var(--z-text-secondary)', marginTop: 10, marginBottom: 0}}>
            Each platform has its own app logic, tests, technology, and team.
          </p>
        </div>

        <div style={{
          marginTop: 24,
          display: 'grid',
          gridTemplateColumns: '1fr 240px',
          gap: 24,
          alignItems: 'start',
        }}>
          <div>
            {/* Bracket headers */}
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr) 28px 1fr', gap: 12, marginBottom: 6}}>
              <div style={{gridColumn: '1 / span 4', textAlign: 'center', font: '700 12px/1 Compasse, sans-serif', color: 'var(--z-accent-green, #3fb950)', letterSpacing: '0.04em', borderTop: '1.5px solid #3fb950', paddingTop: 6, marginTop: 8, position: 'relative'}}>
                <span style={{background: 'var(--z-surface-base)', padding: '0 10px', position: 'absolute', top: -7, left: '50%', transform: 'translateX(-50%)'}}>Existing apps</span>
                <span style={{visibility: 'hidden'}}>Existing apps</span>
              </div>
              <div></div>
              <div style={{textAlign: 'center', font: '700 12px/1 Compasse, sans-serif', color: 'var(--z-accent-primary)', letterSpacing: '0.04em', borderTop: '1.5px dashed var(--z-accent-primary)', paddingTop: 6, marginTop: 8, position: 'relative'}}>
                <span style={{background: 'var(--z-surface-base)', padding: '0 10px', position: 'absolute', top: -7, left: '50%', transform: 'translateX(-50%)'}}>New app to build</span>
                <span style={{visibility: 'hidden'}}>New app to build</span>
              </div>
            </div>

            {/* Platform columns */}
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr) 28px 1fr', gap: 12, alignItems: 'start'}}>
              {platforms.map((p, idx) => (
                <div key={p.kind} style={{display: 'flex', flexDirection: 'column', gap: 8, color: 'var(--z-text-primary)'}}>
                  <div style={{height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <PlatformIcon kind={p.kind} />
                  </div>
                  {rows.map((r, i) => (
                    <Chip key={i} label={r} color={rowColors[i]} icon={i === 0 ? <Check color={rowColors[0].dot} /> : null} />
                  ))}
                  <div style={{textAlign: 'center', font: '600 13px/1 Compasse, sans-serif', color: 'var(--z-text-secondary)', marginTop: 4}}>{p.name}</div>
                </div>
              ))}
              <div></div>
              {/* Fire TV column */}
              <div style={{display: 'flex', flexDirection: 'column', gap: 8, color: 'var(--z-text-primary)'}}>
                <div style={{height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <PlatformIcon kind="firetv" />
                </div>
                {fireRows.map((r, i) => (
                  <Chip key={i} label={r} color={fireRowColors[i]} icon={i === 0 ? <Plus color={fireRowColors[0].dot} /> : null} />
                ))}
                <div style={{textAlign: 'center', font: '600 13px/1 Compasse, sans-serif', color: 'var(--z-text-secondary)', marginTop: 4}}>New Platform</div>
              </div>
            </div>

            <div style={{marginTop: 14, font: '500 italic 14px/1.35 Compasse, sans-serif', color: 'var(--z-accent-primary)', textAlign: 'center'}}>
              A new platform adds another separate implementation, technology stack, and team ownership.
            </div>
          </div>

          {/* Impact panel */}
          <div style={{
            background: 'var(--z-surface-card)',
            borderRadius: 4,
            padding: '18px 18px 16px',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{font: '800 12px/1 Compasse, sans-serif', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--z-accent-primary)', marginBottom: 14}}>
              Impact
            </div>
            <ul style={{margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10}}>
              {[
                'Repeated implementation',
                'Slower delivery',
                'Higher maintenance cost',
                'New platform means more duplicated work',
                'Coordination overhead',
              ].map((t, i) => (
                <li key={i} style={{font: '400 13px/1.35 Compasse, sans-serif', color: 'var(--z-text-primary)', display: 'flex', gap: 10, alignItems: 'flex-start'}}>
                  <span style={{width: 4, height: 4, borderRadius: 4, background: 'var(--z-accent-primary)', flexShrink: 0, marginTop: 6}}></span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom callout */}
        <div style={{
          position: 'absolute',
          left: 56, right: 56,
          bottom: 100,
          padding: '14px 18px',
          background: 'rgba(248,81,73,0.10)',
          border: '1px solid rgba(248,81,73,0.25)',
          borderRadius: 4,
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <span style={{
            width: 36, height: 36, borderRadius: 36,
            background: 'var(--z-accent-red)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round">
              <path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/><path d="M3 18l9 5 9-5"/>
            </svg>
          </span>
          <div style={{font: '600 16px/1.35 Compasse, sans-serif', color: 'var(--z-text-primary)'}}>
            <strong>15 people in a planning meeting</strong> just to align one feature. That was the cost of different <em style={{fontStyle: 'italic'}}>"companies"</em> trying to ship one product.
          </div>
        </div>
      </div>
      <Footer beat="Chapter 02 · The Challenge · Product & Technology" beatNum={4} />
    </div>
  );
}

// ─── S10b · PWA 2019-2020 ────────────────────────────────────────────
function S10_PWA() {
  const Rocket = () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  );
  const Monitor = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{display: 'block'}}>
      <rect x="2" y="2" width="9" height="9" rx="0.5"/>
      <rect x="13" y="2" width="9" height="9" rx="0.5"/>
      <rect x="2" y="13" width="9" height="9" rx="0.5"/>
      <rect x="13" y="13" width="9" height="9" rx="0.5"/>
    </svg>
  );
  const Phone = () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" style={{display: 'block'}}>
      <path d="M6.5 9.5c-.6 0-1.1.5-1.1 1.1V16c0 .6.5 1.1 1.1 1.1.6 0 1.1-.5 1.1-1.1v-5.4c0-.6-.5-1.1-1.1-1.1zm11 0c-.6 0-1.1.5-1.1 1.1V16c0 .6.5 1.1 1.1 1.1.6 0 1.1-.5 1.1-1.1v-5.4c0-.6-.5-1.1-1.1-1.1zM8.3 18.5c0 .7.5 1.2 1.2 1.2h.8v2.2c0 .6.5 1.1 1.1 1.1.6 0 1.1-.5 1.1-1.1v-2.2h1.3v2.2c0 .6.5 1.1 1.1 1.1.6 0 1.1-.5 1.1-1.1v-2.2h.8c.7 0 1.2-.5 1.2-1.2V9.6H8.3v8.9zM15.5 5.5l1-1.6c.1-.1 0-.3-.1-.4-.1-.1-.3 0-.4.1l-1 1.7c-.8-.3-1.7-.5-2.7-.5s-1.9.2-2.7.5l-1-1.7c-.1-.1-.3-.2-.4-.1-.1.1-.2.3-.1.4l1 1.6c-1.8.9-3 2.6-3 4.6h12.3c0-2-1.2-3.7-2.9-4.6zM10.2 7.6c-.3 0-.6-.3-.6-.6 0-.3.3-.6.6-.6.3 0 .6.3.6.6 0 .3-.3.6-.6.6zm3.6 0c-.3 0-.6-.3-.6-.6 0-.3.3-.6.6-.6.3 0 .6.3.6.6 0 .3-.3.6-.6.6z"/>
    </svg>
  );
  const Tv = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="6" width="19" height="12" rx="1.5"/>
      <path d="M8 21h8"/>
    </svg>
  );
  const People = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.2"/>
      <path d="M3 19c.6-3.4 3-5 6-5s5.4 1.6 6 5"/>
      <path d="M14 17c.5-1.8 2-3 4-3 1.6 0 3 .9 3.5 3"/>
    </svg>
  );

  const cards = [
    {
      kind: 'teal',
      color: 'var(--z-accent-teal)',
      bg: 'rgba(0,184,212,0.05)',
      border: 'rgba(0,184,212,0.25)',
      icon: <Rocket />,
      title: 'Why it looked promising',
      bullets: [
        <>In 2019–2020, PWAs felt like the next big step for the web and beyond.</>,
        <>Google pushed new capabilities: service workers, background sync, and manifest-based app installs.</>,
        <>We adopted modern Web technology and pushed PWA wherever it made sense.</>,
      ],
    },
    {
      kind: 'green',
      color: 'var(--z-accent-green)',
      bg: 'rgba(63,185,80,0.05)',
      border: 'rgba(63,185,80,0.25)',
      icon: <Monitor />,
      title: 'Win · Windows',
      bullets: [
        <>Replaced the legacy C# Microsoft Store app with a pure web / PWA build.</>,
        <>Small, clean, easier to maintain</>,
        <>Still live today</>,
      ],
    },
    {
      kind: 'red',
      color: 'var(--z-accent-red)',
      bg: 'rgba(248,81,73,0.05)',
      border: 'rgba(248,81,73,0.25)',
      icon: <Phone />,
      title: 'Failure · Android mobile',
      bullets: [
        <>Close to feature parity — but two blockers remained</>,
        <><strong>DRM:</strong> browsers on Android couldn't deliver the protection level needed for premium HD content</>,
        <><strong>Performance:</strong> not native-grade — stutter, memory, old/low-end devices</>,
        <><strong>Casting:</strong> Cast protocol worked in Chrome, but Samsung phones used Samsung browser</>,
      ],
    },
    {
      kind: 'red',
      color: 'var(--z-accent-red)',
      bg: 'rgba(248,81,73,0.05)',
      border: 'rgba(248,81,73,0.25)',
      icon: <Tv />,
      title: 'Second run · big screen via WebView',
      bullets: [
        <>Tried again on the big screen by wrapping Web TV in a WebView</>,
        <>Same issues returned: performance, animations, DRM, memory overhead</>,
        <>Premium content still couldn't match native expectations</>,
      ],
    },
  ];

  return (
    <div className="slide pwa-slide" data-screen-label="03. PWA 2019–2020">
      <style>{`
        .pwa-slide .pwa-title {
          font: 700 36px/1.05 Compasse, sans-serif;
          color: var(--z-text-primary);
          letter-spacing: -0.015em;
          margin: 8px 0 0;
        }
        .pwa-slide .pwa-sub {
          font: 400 17px/1.4 Compasse, sans-serif;
          color: var(--z-text-secondary);
          margin: 8px 0 0;
          max-width: 1050px;
        }
        .pwa-slide .pwa-grid {
          margin-top: 22px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 14px;
        }
        .pwa-slide .pwa-card {
          border-radius: 0;
          padding: 0;
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 14px;
          align-items: start;
        }
        .pwa-slide .pwa-card-icon {
          width: 48px; height: 48px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center; justify-content: center;
        }
        .pwa-slide .pwa-card-head {
          font: 800 18px/1 Compasse, sans-serif;
          letter-spacing: 0.01em;
          padding-bottom: 8px;
          border-bottom: 1.5px solid currentColor;
          margin-bottom: 10px;
        }
        .pwa-slide .pwa-card ul {
          margin: 0; padding: 0; list-style: none;
          display: flex; flex-direction: column; gap: 8px;
        }
        .pwa-slide .pwa-card li {
          font: 400 16px/1.4 Compasse, sans-serif;
          color: var(--z-text-primary);
          display: flex; gap: 10px; align-items: flex-start;
          text-wrap: pretty;
        }
        .pwa-slide .pwa-card li::before {
          content: '';
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--z-text-secondary);
          flex-shrink: 0;
          margin-top: 8px;
        }
        .pwa-slide .pwa-card strong {
          color: var(--z-text-primary);
          font-weight: 700;
        }

        .pwa-slide .pwa-callout {
          position: absolute;
          left: 56px; right: 56px;
          bottom: 100px;
          padding: 14px 18px;
          background: rgba(0,184,212,0.10);
          border: 1px solid rgba(0,184,212,0.30);
          border-radius: 4px;
          display: flex; align-items: center; gap: 16px;
        }
        .pwa-slide .pwa-callout-icon {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 2px solid var(--z-accent-teal);
          display: inline-flex;
          align-items: center; justify-content: center;
          flex-shrink: 0;
          color: var(--z-accent-teal);
        }
        .pwa-slide .pwa-callout-text {
          font: 600 16px/1.35 Compasse, sans-serif;
          color: var(--z-text-primary);
        }
        .pwa-slide .pwa-callout-text em {
          font-style: italic;
          color: var(--z-accent-teal);
        }
      `}</style>
      <div className="pad" style={{paddingTop: 32, paddingBottom: 90}}>
        <div>
          <div className="eyebrow accent">Failed attempts</div>
          <h2 className="pwa-title">PWA 2019–2020<span style={{color: 'var(--z-text-secondary)'}}>.</span></h2>
          <p className="pwa-sub">
            PWA looked like the future of cross-platform delivery, but it worked well <em style={{fontStyle: 'italic'}}>only in selected cases</em>.
          </p>
        </div>

        <div className="pwa-grid">
          {cards.map((c, i) => (
            <div key={i} className="pwa-card" style={{color: c.color}}>
              <div className="pwa-card-icon" style={{background: c.bg, color: c.color, border: `1px solid ${c.border}`}}>
                {c.icon}
              </div>
              <div>
                <div className="pwa-card-head" style={{color: c.color}}>
                  {c.title}
                </div>
                <ul>
                  {c.bullets.map((b, bi) => <li key={bi} style={{color: 'var(--z-text-primary)'}}>{b}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer beat="Chapter 03 · Early failed attempts" beatNum={4} />
    </div>
  );
}

// ─── S11 · Cross-platform candidates ────────────────────────────────
function S11_Candidates() {
  const KotlinLogo = () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" style={{display: 'block'}}>
      <path d="M24 24H0V0h24L12 12 24 24z"/>
    </svg>
  );
  const FlutterLogo = () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" style={{display: 'block'}}>
      <path d="M14.314 0L2.3 12 6 15.7 21.684 0.013h-7.37zM14.3 11.7L7 19l7.3 5H21.7l-7.3-5 7.3-7.3h-7.4z"/>
    </svg>
  );
  const ReactLogo = () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2"/>
      <ellipse cx="12" cy="12" rx="10" ry="4"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>
    </svg>
  );

  const candidates = [
    {
      logo: <KotlinLogo />,
      name: 'Kotlin Multiplatform',
      meta: 'Beta until Nov 2023',
      kind: 'red',
      color: 'var(--z-accent-red)',
      bg: 'rgba(248,81,73,0.05)',
      border: 'rgba(248,81,73,0.25)',
      bullets: [
        <><strong>Apple TV:</strong> community / experimental support</>,
        <>Conversion cost too high for our React-heavy team</>,
      ],
      verdict: 'Not ready for the full TV matrix',
    },
    {
      logo: <FlutterLogo />,
      name: 'Flutter',
      meta: '2021 – 2022',
      kind: 'red',
      color: 'var(--z-accent-red)',
      bg: 'rgba(248,81,73,0.05)',
      border: 'rgba(248,81,73,0.25)',
      bullets: [
        <><strong>No official tvOS</strong> support, still none today</>,
        <>Android TV via workarounds, nothing clean</>,
      ],
      verdict: 'Apple TV only via custom community engine',
    },
    {
      logo: <ReactLogo />,
      name: <><span style={{fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85em'}}>react-native-tvos</span></>,
      meta: 'Community fork · since ~2018',
      kind: 'amber',
      color: '#E8A82A',
      bg: 'rgba(232,168,42,0.06)',
      border: 'rgba(232,168,42,0.28)',
      bullets: [
        <>Apple TV was <strong>removed from RN core</strong></>,
        <>Maintained by the community, not Facebook/Meta</>,
      ],
      verdict: 'Not production-credible across our full TV matrix',
    },
  ];

  return (
    <div className="slide candidates-slide" data-screen-label="03. Cross-platform candidates">
      <style>{`
        .candidates-slide .cand-title {
          font: 700 36px/1.05 Compasse, sans-serif;
          color: var(--z-text-primary);
          letter-spacing: -0.015em;
          margin: 8px 0 0;
        }
        .candidates-slide .cand-lede {
          font: 400 17px/1.4 Compasse, sans-serif;
          color: var(--z-text-secondary);
          margin: 8px 0 0;
          max-width: 1050px;
        }
        .candidates-slide .cand-sub {
          font: 400 italic 22px/1.35 Compasse, sans-serif;
          color: var(--z-accent-red);
          margin: 10px 0 0;
        }
        .candidates-slide .cand-grid {
          margin-top: 28px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .candidates-slide .cand-card {
          border-radius: 6px;
          padding: 20px 22px;
          display: flex; flex-direction: column;
          gap: 10px;
        }
        .candidates-slide .cand-card-header {
          display: flex; align-items: center;
          gap: 14px;
        }
        .candidates-slide .cand-icon {
          width: 48px; height: 48px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .candidates-slide .cand-name {
          font: 800 18px/1.1 Compasse, sans-serif;
          letter-spacing: -0.005em;
        }
        .candidates-slide .cand-meta {
          font: 700 11px/1 Compasse, sans-serif;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--z-text-secondary);
          margin-top: 4px;
        }
        .candidates-slide .cand-divider {
          height: 1.5px;
          background: currentColor;
          opacity: 0.45;
        }
        .candidates-slide .cand-card ul {
          margin: 0; padding: 0; list-style: none;
          display: flex; flex-direction: column; gap: 8px;
        }
        .candidates-slide .cand-card li {
          font: 400 14px/1.4 Compasse, sans-serif;
          color: var(--z-text-primary);
          display: flex; gap: 8px; align-items: flex-start;
          text-wrap: pretty;
        }
        .candidates-slide .cand-card li::before {
          content: '';
          display: inline-block;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--z-text-secondary);
          flex-shrink: 0;
          margin-top: 7px;
        }
        .candidates-slide .cand-card strong {
          color: var(--z-text-primary);
          font-weight: 700;
        }
        .candidates-slide .cand-verdict {
          margin-top: auto;
          padding-top: 14px;
          font: 600 italic 14px/1.35 Compasse, sans-serif;
        }
      `}</style>
      <div className="pad" style={{paddingTop: 32, paddingBottom: 90}}>
        <div>
          <div className="eyebrow accent">Failed attempts</div>
          <h2 className="cand-title">Cross-platform candidates <span style={{color: 'var(--z-text-secondary)'}}>2021 – 2022</span>.</h2>
          <p className="cand-lede">About a year or two after the PWA rollout, we started looking closely at cross-platform frameworks.</p>
        </div>

        <div className="cand-grid">
          {candidates.map((c, i) => (
            <div key={i} className="cand-card" style={{background: c.bg, border: `1px solid ${c.border}`, color: c.color}}>
              <div className="cand-card-header">
                <div className="cand-icon" style={{background: c.bg, color: c.color, border: `1px solid ${c.border}`}}>
                  {c.logo}
                </div>
                <div>
                  <div className="cand-name" style={{color: c.color}}>{c.name}</div>
                  <div className="cand-meta">{c.meta}</div>
                </div>
              </div>
              <div className="cand-divider"></div>
              <ul>
                {c.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
              </ul>
              <div className="cand-verdict" style={{color: c.color}}>
                {c.verdict}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer beat="Chapter 03 · Early failed attempts" beatNum={4} />
    </div>
  );
}
// ─── S13 · The invitation ────────────────────────────────────────────
function S13_NDA() {
  return (
    <div className="slide invitation-slide" data-screen-label="04. The invitation" data-build-max="2">
      <style>{`
        .invitation-slide .invite-title {
          display: inline-flex;
          align-items: center;
          gap: 32px;
          flex-wrap: wrap;
          font: 800 80px/1 Compasse, sans-serif;
          color: var(--z-text-primary);
          letter-spacing: -0.02em;
          margin: 0 0 40px;
        }
        .invitation-slide .invite-title em {
          color: var(--z-accent-primary);
          font-style: italic;
        }
        .invitation-slide .invite-amz {
          height: 1.05em;
          display: inline-block;
          /* Image is wordmark + smile arrow stacked; shift down so
             the "amazon" wordmark baseline sits on the text baseline
             and the arrow extends below. */
          transform: translateY(32%);
          filter: brightness(0) invert(1);
        }
      `}</style>
      <div className="pad center">
        <div className="eyebrow accent" style={{marginBottom: 24}}>Late 2022 · Berlin</div>
        <h2 className="invite-title">
          <span>An <em>invitation</em> from</span>
          <img className="invite-amz" src="assets/amazon-logo.png" alt="Amazon" />
        </h2>
        <p className="deck-text" style={{maxWidth: 600, fontSize: 24}}>
          Amazon shared their vision for a new operating system powering the next generation of Fire TV devices.
        </p>
        <div className="cat-tiles" style={{marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16}}>
          <style>{`
            .invitation-slide .cat-tile {
              position: relative;
              overflow: hidden;
              background: var(--z-surface-card);
              border-radius: 4px;
              padding: 24px;
              opacity: 0;
              transform: translateY(10px);
              transition:
                opacity 480ms cubic-bezier(.2,.8,.2,1),
                transform 560ms cubic-bezier(.2,.85,.2,1.02);
              will-change: opacity, transform;
            }
            .invitation-slide[data-step="1"] .cat-tile:nth-of-type(-n+1),
            .invitation-slide[data-step="2"] .cat-tile {
              opacity: 1;
              transform: translateY(0);
            }
            .invitation-slide .cat-tile .cat-art {
              position: absolute;
              top: -14px;
              right: -14px;
              width: 110px;
              height: 110px;
              opacity: 0.32;
              pointer-events: none;
            }
            .invitation-slide .cat-tile .cat-art svg { width: 100%; height: 100%; display: block; }
            .invitation-slide .cat-tile--image {
              display: flex; flex-direction: column;
              align-items: flex-start;
              gap: 8px;
            }
            .invitation-slide .cat-tile--image .cat-photo {
              width: 88px; height: 88px;
              object-fit: contain;
              margin-top: auto;
              align-self: flex-end;
            }
            .invitation-slide .cat-tile .label-tag {
              color: var(--z-accent-primary);
              position: relative;
              z-index: 1;
            }
            .invitation-slide .cat-tile .cat-body {
              margin-top: 12px;
              font-weight: 800;
              font-size: 22px;
              color: var(--z-text-primary);
              line-height: 1.15;
              position: relative;
              z-index: 1;
              text-wrap: pretty;
            }
          `}</style>

          <div className="cat-tile cat-tile--image">
            <div className="label-tag">The new platform</div>
            <div className="cat-body">Vega on Linux & C++ native layer</div>
            <img className="cat-photo" src="assets/tux.png" alt="Tux, Linux mascot" />
          </div>

          <div className="cat-tile cat-tile--image">
            <div className="label-tag">The framework</div>
            <div className="cat-body">React Native is primary UI framework, bundled into the OS</div>
            <svg className="cat-photo" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" style={{color: 'var(--z-accent-teal)'}}>
              <circle cx="32" cy="32" r="3.5" fill="currentColor" stroke="none"/>
              <ellipse cx="32" cy="32" rx="22" ry="9"/>
              <ellipse cx="32" cy="32" rx="22" ry="9" transform="rotate(60 32 32)"/>
              <ellipse cx="32" cy="32" rx="22" ry="9" transform="rotate(120 32 32)"/>
            </svg>
          </div>
        </div>
      </div>
      <Footer beat="Chapter 04 · The Catalyst" beatNum={5} />
    </div>
  );
}

// ─── S15 · React Native SWOT ─────────────────────────────────────────
function S15_SWOT() {
  const ShieldIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
  const LinkIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  );
  const BulbIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2.2 1.5-3.5a6 6 0 0 0-12 0c0 1.3.5 2.5 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/>
      <path d="M9 18h6"/>
      <path d="M10 22h4"/>
    </svg>
  );
  const AlertIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14a2 2 0 0 0 1.7 3h16a2 2 0 0 0 1.7-3z"/>
      <path d="M12 9v4"/><path d="M12 17h.01"/>
    </svg>
  );

  const quadrants = [
    {
      title: 'Strengths',
      color: 'var(--z-accent-green)',
      tint: 'rgba(63,185,80,0.05)',
      tintIcon: 'rgba(63,185,80,0.14)',
      border: 'rgba(63,185,80,0.30)',
      icon: <ShieldIcon />,
      items: [
        'Strong cross-platform web ecosystem',
        'Senior engineers with strategic mindset',
        'Deep React expertise transferable to React Native',
        'Existing scalable web architecture gave us a head start',
      ],
    },
    {
      title: 'Weaknesses',
      color: 'var(--z-accent-primary)',
      tint: 'rgba(217,119,87,0.05)',
      tintIcon: 'rgba(217,119,87,0.14)',
      border: 'rgba(217,119,87,0.30)',
      icon: <LinkIcon />,
      items: [
        'React Native was new to the team',
        'Vega required dedicated budget and squad capacity',
        'Existing roadmap was already full',
      ],
    },
    {
      title: 'Opportunities',
      color: 'var(--z-accent-blue, #4493F8)',
      tint: 'rgba(68,147,248,0.05)',
      tintIcon: 'rgba(68,147,248,0.14)',
      border: 'rgba(68,147,248,0.30)',
      icon: <BulbIcon />,
      items: [
        'True cross-platform unification',
        'One codebase for Android TV, Apple TV, and beyond',
        'Lower delivery cost than platform-specific silos',
        'Clear path toward an end-to-end ownership model',
      ],
    },
    {
      title: 'Threats',
      color: 'var(--z-accent-red)',
      tint: 'rgba(248,81,73,0.05)',
      tintIcon: 'rgba(248,81,73,0.14)',
      border: 'rgba(248,81,73,0.30)',
      icon: <AlertIcon />,
      items: [
        'Vega was still immature and timeline was uncertain',
        'Performance risk could undermine adoption',
        'Missing Fire TV would threaten the business, especially in Germany',
        'Users and tenants expected support for Amazon\u2019s ecosystem',
      ],
    },
  ];

  return (
    <div className="slide swot-slide" data-screen-label="04. React Native SWOT">
      <style>{`
        .swot-slide .swot-title {
          font: 700 36px/1.05 Compasse, sans-serif;
          color: var(--z-text-primary);
          letter-spacing: -0.015em;
          margin: 8px 0 0;
        }
        .swot-slide .swot-sub {
          font: 400 17px/1.4 Compasse, sans-serif;
          color: var(--z-text-secondary);
          margin: 8px 0 0;
        }
        .swot-slide .swot-grid {
          margin-top: 22px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 14px;
        }
        .swot-slide .swot-card {
          border-radius: 0;
          padding: 0;
          display: grid;
          grid-template-columns: 52px 1fr;
          gap: 16px;
          align-items: start;
        }
        .swot-slide .swot-icon {
          width: 52px; height: 52px;
          border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .swot-slide .swot-card-head {
          font: 800 22px/1 Compasse, sans-serif;
          letter-spacing: -0.005em;
          padding-bottom: 10px;
          border-bottom: 1.5px solid currentColor;
          margin-bottom: 14px;
        }
        .swot-slide .swot-card ul {
          margin: 0; padding: 0; list-style: none;
          display: flex; flex-direction: column; gap: 10px;
        }
        .swot-slide .swot-card li {
          font: 400 17px/1.4 Compasse, sans-serif;
          color: var(--z-text-primary);
          display: flex; gap: 12px; align-items: flex-start;
          text-wrap: pretty;
        }
        .swot-slide .swot-card li::before {
          content: '';
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: currentColor;
          flex-shrink: 0;
          margin-top: 9px;
        }
        .swot-slide .swot-callout {
          position: absolute;
          left: 56px; right: 56px;
          bottom: 86px;
          padding: 14px 18px;
          background: rgba(68,147,248,0.08);
          border: 1px solid rgba(68,147,248,0.30);
          border-radius: 4px;
          display: flex; align-items: center; gap: 16px;
        }
        .swot-slide .swot-callout-icon {
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 2px solid #4493F8;
          color: #4493F8;
          display: inline-flex;
          align-items: center; justify-content: center;
          font: 900 18px/1 Compasse, sans-serif;
          flex-shrink: 0;
        }
        .swot-slide .swot-callout-text {
          font: 600 16px/1.35 Compasse, sans-serif;
          color: var(--z-text-primary);
        }
      `}</style>
      <div className="pad" style={{paddingTop: 32, paddingBottom: 90}}>
        <div>
          <div className="eyebrow accent">Aftermath</div>
          <h2 className="swot-title">React Native: <em style={{color: 'var(--z-accent-primary)', fontStyle: 'italic'}}>SWOT</em>.</h2>
          <p className="swot-sub">Honest reflection on strength, weakness, opportunities and threats.</p>
        </div>

        <div className="swot-grid">
          {quadrants.map((q, i) => (
            <div key={i} className="swot-card" style={{color: q.color}}>
              <div className="swot-icon" style={{background: q.tintIcon, color: q.color, border: `1px solid ${q.border}`}}>
                {q.icon}
              </div>
              <div>
                <div className="swot-card-head" style={{color: q.color}}>{q.title}</div>
                <ul>
                  {q.items.map((t, ti) => <li key={ti} style={{color: q.color}}><span style={{color: 'var(--z-text-primary)'}}>{t}</span></li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer beat="Chapter 04 · The Catalyst" beatNum={5} />
    </div>
  );
}

// ─── S14 · Why this was our catalyst ────────────────────────────────
function S14_WhyMatters() {
  return (
    <div className="slide" data-screen-label="04. For Amazon / for us">
      <div className="pad">
        <div className="two-col-head">
          <div>
            <div className="eyebrow accent">Partnership</div>
            <h2 className="h-headline" style={{marginTop: 16}}>
              Some saw a chance to build <em>for</em> Amazon.<br/>
              We saw a chance to build <em>with</em> them.
            </h2>
          </div>
          <p className="deck-text" style={{paddingBottom: 8}}>
            The partnership gave us a platform we could grow into. The technology underneath was exactly what we needed — across Apple, Android, and Web too.
          </p>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 16}}>
          <div className="card card-elevated" style={{padding: 28}}>
            <div className="card-num">For Amazon</div>
            <div className="card-title">We earned the invitation.</div>
            <p className="body-text">Engaged early adopters, giving real feedback as Amazon built the operating system. Active community members on the React-Native-for-TV side. And a known product already in the Fire&nbsp;TV app portfolio.</p>
          </div>
          <div className="card card-elevated" style={{padding: 28}}>
            <div className="card-num">For us</div>
            <div className="card-title">Vega became the starting point for multiplatform.</div>
            <p className="body-text">Fire TV is the biggest chunk of our German viewers. The same foundation we&rsquo;d build for Vega could carry across our whole stack.</p>
          </div>
        </div>
      </div>
      <Footer beat="Chapter 04 · The Catalyst" beatNum={5} />
    </div>
  );
}

// ─── S23c · One codebase pull quote (bridge to Ch.03) ─────────────
function S23c_OneCodebase() {
  return (
    <div className="slide" data-screen-label="02. One team, one codebase">
      <div className="pull-pad">
        <div className="eyebrow accent">Connecting the dots</div>
        <h2 className="pull-quote" style={{fontSize: 60}}>
          One team is only one team<br/>
          when it ships <em>one codebase.</em>
        </h2>
        <p style={{font: '400 italic 22px/1.4 Compasse, sans-serif', color: 'var(--z-text-secondary)', marginTop: 24, maxWidth: 900}}>
          Otherwise it's just engineers sitting in the same channel, still shipping <strong style={{color: 'var(--z-text-primary)', fontStyle: 'italic'}}>three different apps</strong>.
        </p>
      </div>
      <Footer beat="Chapter 02 · The Challenge · Technology & Org" beatNum={8} />
    </div>
  );
}

// ─── S16 · Strategic Importance pull quote ──────────────────────────
function S16_StrategicImportance() {
  return (
    <div className="slide" data-screen-label="04. Strategic importance">
      <div className="pull-pad">
        <div className="eyebrow accent">The squeeze</div>
        <h2 className="pull-quote" style={{fontSize: 56}}>
          Strategic importance was clear,<br/>
          but the <em>roadmap was full</em>,<br/>
          and engineering capacity was <em>already allocated.</em>
        </h2>
      </div>
      <Footer beat="Chapter 04 · The Catalyst" beatNum={5} />
    </div>
  );
}

// ─── S17 · One engineer, two sprints ────────────────────────────────
function S17_PoC() {
  return (
    <div className="slide" data-screen-label="05. One engineer, two sprints">
      <div className="pad">
        <div>
          <div className="eyebrow accent">February 2023</div>
          <h2 className="h-headline" style={{marginTop: 24, fontSize: 44, whiteSpace: 'nowrap'}}>
            <em>One engineer.</em> Two sprints. Our existing codebase.
          </h2>
          <p style={{font: '400 italic 22px/1.4 Compasse, sans-serif', color: 'var(--z-text-secondary)', marginTop: 24, maxWidth: 900}}>
            We proceeded with the suggestion — narrow on purpose. Time-boxed so it wouldn&rsquo;t compete with ongoing work.
          </p>
        </div>
        <ol className="numbers" style={{marginTop: 48, gridTemplateColumns: 'repeat(3, 1fr)', display: 'grid', gap: 24}}>
          <li>
            <div>
              <div className="ntitle">One engineer</div>
              <p className="ntext">Someone who had never written a line of React Native. If they could get there, the rest of the team could too.</p>
            </div>
          </li>
          <li>
            <div>
              <div className="ntitle">A couple of sprints</div>
              <p className="ntext">Time-boxed so it wouldn&rsquo;t compete with ongoing work or commit headcount.</p>
            </div>
          </li>
          <li>
            <div>
              <div className="ntitle">Existing codebase</div>
              <p className="ntext">Not a fresh project. Could our existing investment carry into this new world?</p>
            </div>
          </li>
        </ol>
        <div style={{marginTop: 48, padding: 24, background: 'var(--z-surface-elevated)', borderRadius: 4}}>
          <div className="label-tag" style={{color: 'var(--z-accent-primary)'}}>The slice</div>
          <div style={{marginTop: 12, fontWeight: 800, fontSize: 20, color: 'var(--z-text-primary)', lineHeight: 1.3}}>
            Login, navigation, playback. Targeting Android TV, tvOS, and Web — built by someone learning React Native as they went.
          </div>
        </div>
      </div>
      <Footer beat="Chapter 05 · Starting before you're ready" beatNum={6} />
    </div>
  );
}

// ─── S17b · PoC visual proof ─────────────────────────────────────────
function S17b_PoCScreens() {
  const TrafficLights = () => (
    <div style={{display: 'flex', gap: 6, alignItems: 'center'}}>
      <span style={{width: 10, height: 10, borderRadius: 10, background: '#FF5F57'}}></span>
      <span style={{width: 10, height: 10, borderRadius: 10, background: '#FEBC2E'}}></span>
      <span style={{width: 10, height: 10, borderRadius: 10, background: '#28C840'}}></span>
    </div>
  );

  const screens = [
    {
      label: 'Authentication',
      caption: 'Can log you in as a Zattoo user.',
      img: 'assets/poc/auth.png',
      url: 'utv.app/login',
    },
    {
      label: 'Stream',
      caption: 'Can play Live TV, Replay, and VOD.',
      img: 'assets/poc/stream.png',
      url: 'utv.app/watch/cid/123',
    },
  ];

  return (
    <div className="slide poc-screens-slide" data-screen-label="05. PoC visual proof">
      <style>{`
        .poc-screens-slide .poc-title {
          font: 700 36px/1.05 Compasse, sans-serif;
          color: var(--z-text-primary);
          letter-spacing: -0.015em;
          margin: 24px 0 0;
        }
        .poc-screens-slide .poc-sub {
          font: 400 17px/1.4 Compasse, sans-serif;
          color: var(--z-text-secondary);
          margin: 24px 0 0;
          max-width: 1100px;
        }
        .poc-screens-slide .poc-grid {
          margin-top: 48px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 26px;
        }
        .poc-screens-slide .poc-card {
          display: flex; flex-direction: column;
          gap: 10px;
        }
        .poc-screens-slide .poc-label {
          font: 800 12px/1 Compasse, sans-serif;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--z-accent-primary);
        }
        .poc-screens-slide .poc-cap {
          font: 600 17px/1.3 Compasse, sans-serif;
          color: var(--z-text-primary);
          margin-top: -2px;
        }
        .poc-screens-slide .poc-window {
          background: #0a0a0a;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.10);
          padding: 8px;
          box-shadow: 0 18px 40px rgba(0,0,0,0.55), 0 4px 14px rgba(0,0,0,0.45);
          margin-top: 6px;
        }
        .poc-screens-slide .poc-screen {
          aspect-ratio: 16 / 9;
          width: 100%;
          background: #0d0d0d;
          display: block;
          border-radius: 4px;
          overflow: hidden;
        }
        .poc-screens-slide .poc-screen img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          display: block;
        }
      `}</style>
      <div className="pad" style={{paddingTop: 32, paddingBottom: 90}}>
        <div>
          <div className="eyebrow accent">PoC · Two sprints · One engineer</div>
          <h2 className="poc-title">It actually <em style={{color: 'var(--z-accent-primary)', fontStyle: 'italic'}}>worked</em>.</h2>
          <p className="poc-sub">A small slice of the stream app — built in two sprints, running on Web and Android TV.</p>
        </div>

        <div className="poc-grid">
          {screens.map((s, i) => (
            <div key={i} className="poc-card">
              <div className="poc-label">{s.label}</div>
              <div className="poc-cap">{s.caption}</div>
              <div className="poc-window">
                <div className="poc-screen">
                  <img src={s.img} alt={s.label} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer beat="Chapter 05 · Starting before you're ready" beatNum={6} />
    </div>
  );
}

// ─── S18 · The signal ────────────────────────────────────────────────
function S18_Signal() {
  return (
    <div className="slide" data-screen-label="05. The signal">
      <div className="pull-pad">
        <div className="eyebrow accent">Starting before ready · The real signal</div>
        <h2 className="pull-quote" style={{fontSize: 60}}>
          Not just that we could build on RN.<br/>
          That we could build on RN <em>starting from where we already were.</em>
        </h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 24}}>
          <div className="card" style={{padding: 24}}>
            <div className="label-tag" style={{color: 'var(--z-accent-teal)'}}>✓ Carried over</div>
            <div style={{marginTop: 8, color: 'var(--z-text-primary)', fontWeight: 700, fontSize: 16, lineHeight: 1.4}}>API, session state, core business logic — the platform-agnostic layers</div>
          </div>
          <div className="card" style={{padding: 24}}>
            <div className="label-tag" style={{color: 'var(--z-accent-teal)'}}>✓ Carried over</div>
            <div style={{marginTop: 8, color: 'var(--z-text-primary)', fontWeight: 700, fontSize: 16, lineHeight: 1.4}}>Web was easy. Android TV was quite easy.</div>
          </div>
          <div className="card" style={{padding: 24}}>
            <div className="label-tag" style={{color: 'var(--z-accent-red)'}}>— Stayed behind</div>
            <div style={{marginTop: 8, color: 'var(--z-text-primary)', fontWeight: 700, fontSize: 16, lineHeight: 1.4}}>Things tied to the web runtime — exactly as expected</div>
          </div>
        </div>
      </div>
      <Footer beat="Chapter 05 · Starting before you're ready" beatNum={6} />
    </div>
  );
}

// ─── S18b · Resource Intensive Frontend pull quote ──────────────────
function S18b_RIF() {
  return (
    <div className="slide" data-screen-label="06. Resource Intensive Frontend">
      <div className="pull-pad">
        <div className="eyebrow accent">April 2023</div>
        <h2 className="pull-quote" style={{fontSize: 60}}>
          The new CTO called the front-end stack<br/>
          <em>"Resource Intensive Frontend."</em>
        </h2>
        <p className="pull-attr" style={{marginTop: 32}}>The prototype turned into a CTO-level answer — UTV launched for real.</p>
      </div>
      <Footer beat="Chapter 06 · Green light" beatNum={6} />
    </div>
  );
}

// ─── S20 · Monorepo ──────────────────────────────────────────────────
function S20_Monorepo() {
  return (
    <div className="slide" data-screen-label="07. Monorepo structure">
      <div className="pad">
        <div className="two-col-head">
          <div>
            <div className="eyebrow accent">Migration · Technology · Monorepo</div>
            <h2 className="h-headline" style={{marginTop: 16}}>
              UTV started as <em>just another project.</em>
            </h2>
          </div>
          <p className="deck-text" style={{paddingBottom: 8}}>
            Existing apps stayed live and shipping the whole time. UTV piped into the same shared <span className="t-mono t-accent">lib/</span> rather than growing its own copy.
          </p>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 8}}>
          <div className="codeblock">
{`monorepo/
├── lib/             `}<span className="c-comment">{`shared config & business logic`}</span>{`
└── projects/
    ├── app/         `}<span className="c-comment">{`existing web app`}</span>{`
    ├── tv-app/      `}<span className="c-comment">{`existing TV app`}</span>{`
    ├── ...
    └── `}<span className="c-accent">{`utv/`}</span>{`         `}<span className="c-comment">{`new universal project`}</span>{`
                       `}<span className="c-comment">{`same lib/, no fork`}</span>
          </div>
          <div className="col" style={{justifyContent: 'space-between'}}>
            <div className="card card-elevated" style={{padding: 24}}>
              <div className="card-num">Principle</div>
              <div className="card-title" style={{fontSize: 22}}>Pipe in. Don&rsquo;t fork.</div>
              <p className="body-text">Nothing already running had to change for UTV to begin. Migrations don&rsquo;t have to mean reset.</p>
            </div>
            <div className="card card-elevated" style={{padding: 24}}>
              <div className="card-num">What it bought us</div>
              <ul className="bullets" style={{marginTop: 16}}>
                <li>Existing projects kept shipping</li>
                <li>Shared lib stayed shared</li>
                <li>UTV could grow without freezing the org</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer beat="Chapter 07 · Migration in Practice · Tech" beatNum={7} />
    </div>
  );
}

// ─── S21 · Build-time overrides ──────────────────────────────────────
function S21_Overrides() {
  return (
    <div className="slide" data-screen-label="07. Build-time overrides">
      <div className="pad">
        <div className="two-col-head">
          <div>
            <div className="eyebrow accent">Migration · The spine of the project</div>
            <h2 className="h-headline" style={{marginTop: 16}}>
              <em>Build-time</em> overrides — not runtime branches.
            </h2>
          </div>
          <p className="deck-text" style={{paddingBottom: 8}}>
            When something must differ per platform, the difference lives in a sibling file. The resolver picks the right one at bundle time.
          </p>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 8}}>
          <div className="codeblock">
{`ui/input-field/
├── `}<span className="c-key">index.jsx</span>{`          `}<span className="c-comment">default</span>{`
├── `}<span className="c-key">index.android.jsx</span>{`  `}<span className="c-comment">bundled on Android</span>{`
├── `}<span className="c-key">index.apple.jsx</span>{`    `}<span className="c-comment">bundled on Apple</span>{`
└── `}<span className="c-accent">index.vega.jsx</span>{`     `}<span className="c-comment">bundled on Vega</span>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
            <div className="card card-elevated" style={{padding: 24}}>
              <div className="card-num">Resolution priority</div>
              <ol className="numbers" style={{marginTop: 12, gap: 12}}>
                <li><div><div className="ntitle" style={{fontSize: 16}}>Platform-specific</div></div></li>
                <li><div><div className="ntitle" style={{fontSize: 16}}>.native (any non-web)</div></div></li>
                <li><div><div className="ntitle" style={{fontSize: 16}}>Universal .js</div></div></li>
              </ol>
            </div>
            <div className="card card-orange" style={{padding: 20}}>
              <div className="label-tag">In practice</div>
              <div style={{marginTop: 8, fontWeight: 800, fontSize: 18, lineHeight: 1.3}}>
                The wrong platform&rsquo;s code isn&rsquo;t just dead — it&rsquo;s never loaded.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer beat="Chapter 07 · Migration in Practice · Tech" beatNum={7} />
    </div>
  );
}

// ─── S22 · Native escape hatches ────────────────────────────────────
function S22_Native() {
  return (
    <div className="slide" data-screen-label="07. Native escape hatches">
      <div className="pad">
        <div className="two-col-head">
          <div>
            <div className="eyebrow accent">Migration · Native layer</div>
            <h2 className="h-headline" style={{marginTop: 16}}>
              Escape hatches, <em>kept small.</em>
            </h2>
          </div>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 24, marginTop: 8}}>
          <div className="codeblock" style={{fontSize: 13}}>
{`projects/utv/
├── `}<span className="c-key">android/</span>{`                  `}<span className="c-comment">Android TV / Fire TV</span>{`
│   ├── cast-connect/
│   ├── sso/
│   └── amazon-iap/
├── `}<span className="c-key">apple/</span>{`                    `}<span className="c-comment">tvOS</span>{`
│   ├── Source/               `}<span className="c-comment">TurboModules</span>{`
│   └── TopShelfExtension/    `}<span className="c-comment">tvOS Top Shelf</span>{`
├── `}<span className="c-accent">vega/</span>{`                     `}<span className="c-comment">Vega</span>{`
│   ├── metro.config.js       `}<span className="c-comment">custom Metro</span>{`
│   └── node_modules/         `}<span className="c-comment">isolated Amazon SDK</span>{`
└── `}<span className="c-key">web/</span>{`                      `}<span className="c-comment">Web</span>{`
    └── webpack.config.js`}
          </div>
          <div className="col" style={{gap: 16}}>
            <div className="card card-elevated" style={{padding: 24}}>
              <div className="card-num">The bridge</div>
              <p className="body-text" style={{fontSize: 16}}>A focused set of modules — different on each platform — bridging the <strong>universal JS layer</strong> to platform-specific capabilities.</p>
            </div>
            <div className="card card-elevated" style={{padding: 24}}>
              <div className="card-num">Outcome</div>
              <p className="body-text" style={{fontSize: 16}}>The entire <strong>Vega-specific surface lives in roughly one file</strong> — playback, wrapping Amazon&rsquo;s video APIs. Everything else is shared.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer beat="Chapter 07 · Migration in Practice · Tech" beatNum={7} />
    </div>
  );
}

// ─── S23d · Product look on migration ──────────────────────────────
function S23d_ProductLook() {
  const Target = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.5"/><circle cx="12" cy="12" r="2"/>
      <path d="M18 6l3-3M21 3h-3v3"/>
    </svg>
  );
  const Shield = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
  const Sparkles = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3l1.5 4.5L15 9l-4.5 1.5L9 15l-1.5-4.5L3 9l4.5-1.5z"/>
      <path d="M18 14l.8 2.4L21 17l-2.2.6L18 20l-.6-2.4L15 17l2.4-.6z"/>
    </svg>
  );
  const Devices = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="13" height="9" rx="1.2"/>
      <path d="M5 17h7"/>
      <rect x="15.5" y="9" width="5.5" height="11" rx="1"/>
    </svg>
  );
  const Chart = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18"/>
      <path d="M7 17l4-5 3 3 5-7"/>
      <path d="M14 8h3v3"/>
    </svg>
  );

  const tiles = [
    {
      color: 'var(--z-accent-green)',
      tint: 'rgba(63,185,80,0.05)',
      border: 'rgba(63,185,80,0.35)',
      icon: <Target />,
      title: 'Strategic product decision',
      body: 'We chose to keep the user experience consistent so the migration stayed a technical change, not a product reset.',
    },
    {
      color: 'var(--z-accent-primary)',
      tint: 'rgba(217,119,87,0.05)',
      border: 'rgba(217,119,87,0.35)',
      icon: <Shield />,
      title: 'Why we resisted redesign',
      body: 'Separating migration from redesign kept success measurable, fit our resource limits, and reduced delivery risk.',
    },
    {
      color: 'var(--z-accent-teal)',
      tint: 'rgba(0,184,212,0.05)',
      border: 'rgba(0,184,212,0.35)',
      icon: <Sparkles />,
      title: 'Consistency with smart iterations',
      body: 'We kept the experience familiar while making small, targeted improvements where users already had clear pain points.',
    },
    {
      color: 'var(--z-accent-blue, #4493F8)',
      tint: 'rgba(68,147,248,0.05)',
      border: 'rgba(68,147,248,0.35)',
      icon: <Devices />,
      title: 'Feature parity and platform scope',
      body: 'From day one, the new foundation had to match legacy features and scale across our full web and native platform landscape.',
    },
  ];

  return (
    <div className="slide product-look-slide" data-screen-label="07. Product look on migration">
      <style>{`
        .product-look-slide .pl-title {
          font: 700 42px/1.05 Compasse, sans-serif;
          color: var(--z-text-primary);
          letter-spacing: -0.015em;
          margin: 0;
        }
        .product-look-slide .pl-sub {
          font: 400 21px/1.45 Compasse, sans-serif;
          color: var(--z-text-secondary);
          margin: 20px 0 0;
          max-width: 1100px;
        }
        .product-look-slide .pl-grid {
          margin-top: 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
        }
        .product-look-slide .pl-card {
          border-radius: 8px;
          padding: 22px 26px;
          display: grid;
          grid-template-columns: 72px 1fr;
          gap: 22px;
          align-items: start;
        }
        .product-look-slide .pl-icon {
          width: 72px; height: 72px;
          border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
        }
        .product-look-slide .pl-card-head {
          font: 800 22px/1.1 Compasse, sans-serif;
          letter-spacing: -0.005em;
          padding-bottom: 10px;
          border-bottom: 1.5px solid currentColor;
          margin-bottom: 14px;
        }
        .product-look-slide .pl-card-body {
          font: 400 17px/1.45 Compasse, sans-serif;
          color: var(--z-text-primary);
          text-wrap: pretty;
        }

        .product-look-slide .pl-callout {
          position: absolute;
          left: 56px; right: 56px;
          bottom: 100px;
          padding: 16px 22px;
          border-radius: 8px;
          border: 1.5px solid var(--z-accent-blue, #4493F8);
          background: rgba(68,147,248,0.05);
          display: grid;
          grid-template-columns: 64px 1fr;
          gap: 18px;
          align-items: center;
        }
        .product-look-slide .pl-callout-icon {
          width: 64px; height: 64px;
          border-radius: 50%;
          border: 1.5px solid var(--z-accent-blue, #4493F8);
          color: var(--z-accent-blue, #4493F8);
          display: inline-flex; align-items: center; justify-content: center;
        }
        .product-look-slide .pl-callout-text {
          font: 700 17px/1.35 Compasse, sans-serif;
          color: var(--z-text-primary);
        }
      `}</style>
      <div className="pad" style={{paddingTop: 56, paddingBottom: 90}}>
        <h2 className="pl-title"><em style={{color: 'var(--z-accent-primary)', fontStyle: 'italic'}}>Product look</em> on migration.</h2>
        <p className="pl-sub">We deliberately separated technical migration from product redesign: keep the Zattoo experience familiar, improve where it mattered, and preserve existing features.</p>

        <div className="pl-grid">
          {tiles.map((t, i) => (
            <div key={i} className="pl-card" style={{border: `1.5px solid ${t.border}`, background: t.tint}}>
              <div className="pl-icon" style={{border: `1.5px solid ${t.border}`, color: t.color}}>
                {t.icon}
              </div>
              <div>
                <div className="pl-card-head" style={{color: t.color}}>{t.title}</div>
                <div className="pl-card-body">{t.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer beat="Chapter 07 · Migration in Practice · Product" beatNum={7} />
    </div>
  );
}

// Shared TT color tokens
const TT_COLORS = {
  stream: '#F5C046',
  enabling: '#9B6BF2',
  complicated: '#E84A6B',
  platform: '#66D6CB',
};

// Small legend chip used by both team-setup slides.
function TTLegend() {
  const items = [
    {color: TT_COLORS.stream, label: 'Stream-aligned'},
    {color: TT_COLORS.enabling, label: 'Enabling'},
    {color: TT_COLORS.complicated, label: 'Complicated subsystem'},
    {color: TT_COLORS.platform, label: 'Platform'},
  ];
  return (
    <div style={{display: 'grid', gridTemplateColumns: 'auto auto', gap: '8px 24px', alignItems: 'center'}}>
      {items.map((it, i) => (
        <div key={i} style={{display: 'flex', alignItems: 'center', gap: 8, font: '500 12px/1.2 Compasse, sans-serif', color: 'var(--z-text-secondary)'}}>
          <span style={{
            display: 'inline-block',
            width: 24, height: 14,
            background: it.color,
            borderRadius: 0,
          }}></span>
          <span style={{whiteSpace: 'nowrap', color: 'var(--z-text-primary)'}}>{it.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── S23i3 · Two teams + enabling (interim split) ─────────────────
function S23i3_TwoTeams() {
  const dims = [
    {label: 'Platform', color: 'rgba(232,74,107,0.10)'},
    {label: 'Features', color: 'rgba(245,192,70,0.10)'},
    {label: 'Video', color: 'rgba(232,74,107,0.10)'},
    {label: 'Technology', color: 'rgba(102,214,203,0.10)'},
  ];

  const teams = [
    {name: 'Nova', color: TT_COLORS.stream, sub: 'Cross-functional'},
    {name: 'Luna', color: TT_COLORS.stream, sub: 'Cross-functional'},
  ];

  return (
    <div className="slide two-teams-slide" data-screen-label="07. Two teams · 2024">
      <style>{`
        .two-teams-slide .tt2-title {
          font: 700 42px/1.05 Compasse, sans-serif;
          color: var(--z-text-primary);
          letter-spacing: -0.015em;
          margin: 12px 0 0;
        }
        .two-teams-slide .tt2-sub {
          font: 400 17px/1.4 Compasse, sans-serif;
          color: var(--z-text-secondary);
          margin: 14px 0 0;
          max-width: 800px;
          text-wrap: pretty;
        }
        .two-teams-slide .tt2-head {
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 24px;
        }
        .two-teams-slide .tt2-stage {
          margin-top: 32px;
          display: grid;
          grid-template-columns: 240px 1fr 1fr 130px;
          gap: 14px;
          align-items: stretch;
        }
        .two-teams-slide .tt2-dims {
          display: flex; flex-direction: column;
          gap: 10px;
        }
        .two-teams-slide .tt2-dim {
          height: 78px;
          padding: 0 24px;
          display: flex; align-items: center;
          font: 700 18px/1.2 Compasse, sans-serif;
          color: var(--z-text-primary);
        }
        .two-teams-slide .tt2-block {
          color: #1a1a1a;
          padding: 24px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
          gap: 14px;
        }
        .two-teams-slide .tt2-block-title {
          font: 900 56px/1.05 Compasse, sans-serif;
          letter-spacing: -0.02em;
        }
        .two-teams-slide .tt2-block-sub {
          font: 700 14px/1 Compasse, sans-serif;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(26,26,26,0.7);
        }
        .two-teams-slide .tt2-enabling {
          background: ${TT_COLORS.enabling};
          color: #1a1a1a;
          padding: 14px 10px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 8px;
          text-align: center;
        }
        .two-teams-slide .tt2-enabling-title {
          font: 800 16px/1.2 Compasse, sans-serif;
          color: #1a1a1a;
          letter-spacing: -0.005em;
        }
        .two-teams-slide .tt2-enabling-sub {
          font: 600 11px/1 Compasse, sans-serif;
          color: rgba(26,26,26,0.7);
        }
      `}</style>
      <div className="pad" style={{paddingTop: 36, paddingBottom: 90}}>
        <div className="tt2-head">
          <div>
            <div className="eyebrow accent">2024</div>
            <h2 className="tt2-title" style={{marginTop: 12}}>Mitosis.</h2>
            <p className="tt2-sub">UTV split into two stream-aligned squads, Nova and Luna, supported by a Principal Engineers enabling team.</p>
          </div>
          <TTLegend />
        </div>

        <div className="tt2-stage">
          <div className="tt2-dims">
            {dims.map((d, i) => <div key={i} className="tt2-dim" style={{background: d.color}}>{d.label}</div>)}
          </div>
          {teams.map((t, i) => (
            <div key={i} className="tt2-block" style={{background: t.color}}>
              <div className="tt2-block-title">{t.name}</div>
              <div className="tt2-block-sub">{t.sub}</div>
            </div>
          ))}
          <div className="tt2-enabling">
            <div className="tt2-enabling-title">Principal<br/>engineers</div>
            <div className="tt2-enabling-sub">Enabling team</div>
          </div>
        </div>
      </div>
      <Footer beat="Chapter 07 · Migration in Practice · Org" beatNum={7} />
    </div>
  );
}

// ─── S23i2 · One UTV team (2024 origin) ───────────────────────────
function S23i2_OneTeam() {
  const dims = [
    {label: 'Platform', color: 'rgba(232,74,107,0.10)'},
    {label: 'Features', color: 'rgba(245,192,70,0.10)'},
    {label: 'Video', color: 'rgba(232,74,107,0.10)'},
    {label: 'Technology', color: 'rgba(102,214,203,0.10)'},
  ];

  return (
    <div className="slide one-team-slide" data-screen-label="07. One UTV team · 2023">
      <style>{`
        .one-team-slide .ot-title {
          font: 700 42px/1.05 Compasse, sans-serif;
          color: var(--z-text-primary);
          letter-spacing: -0.015em;
          margin: 12px 0 0;
        }
        .one-team-slide .ot-sub {
          font: 400 17px/1.4 Compasse, sans-serif;
          color: var(--z-text-secondary);
          margin: 14px 0 0;
          max-width: 800px;
          text-wrap: pretty;
        }
        .one-team-slide .ot-head {
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 24px;
        }
        .one-team-slide .ot-stage {
          margin-top: 32px;
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 14px;
          align-items: stretch;
        }
        .one-team-slide .ot-dims {
          display: flex; flex-direction: column;
          gap: 10px;
        }
        .one-team-slide .ot-dim {
          height: 78px;
          padding: 0 24px;
          display: flex; align-items: center;
          font: 700 18px/1.2 Compasse, sans-serif;
          color: var(--z-text-primary);
        }
        .one-team-slide .ot-block {
          background: ${TT_COLORS.enabling};
          color: #1a1a1a;
          padding: 24px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
          gap: 14px;
        }
        .one-team-slide .ot-block-title {
          font: 900 56px/1.05 Compasse, sans-serif;
          letter-spacing: -0.02em;
        }
        .one-team-slide .ot-block-sub {
          font: 700 14px/1 Compasse, sans-serif;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(26,26,26,0.7);
        }
      `}</style>
      <div className="pad" style={{paddingTop: 36, paddingBottom: 90}}>
        <div className="ot-head">
          <div>
            <div className="eyebrow accent">2023</div>
            <h2 className="ot-title" style={{marginTop: 12}}>Humble Start.</h2>
            <p className="ot-sub">One team handled platform, feature, video, and technology together — no specialisation yet.</p>
          </div>
          <TTLegend />
        </div>

        <div className="ot-stage">
          <div className="ot-dims">
            {dims.map((d, i) => <div key={i} className="ot-dim" style={{background: d.color}}>{d.label}</div>)}
          </div>
          <div className="ot-block">
            <div className="ot-block-title">UTV Team</div>
            <div className="ot-block-sub">Cross-functional team</div>
          </div>
        </div>
      </div>
      <Footer beat="Chapter 07 · Migration in Practice · Org" beatNum={7} />
    </div>
  );
}

// ─── S23j · Team topologies in practice (interim) ─────────────────
function S23j_TopologyInterim() {
  const People3 = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.2"/>
      <path d="M3 19c.6-3.4 3-5 6-5s5.4 1.6 6 5"/>
      <path d="M14 17c.5-1.8 2-3 4-3 1.6 0 3 .9 3.5 3"/>
    </svg>
  );

  // 4 horizontal rows
  const rows = [
    {
      tint: 'rgba(232,74,107,0.08)',
      shapes: [
        {kind: 'diamond', color: TT_COLORS.complicated, label: 'Device integration', sub: 'Complicated subsystem'},
      ],
      tag: 'Platform',
    },
    {
      tint: 'rgba(245,192,70,0.08)',
      shapes: [
        {kind: 'pill', color: TT_COLORS.stream, label: 'Luna', sub: 'Stream-aligned team'},
        {kind: 'pill', color: TT_COLORS.stream, label: 'Nova', sub: 'Stream-aligned team'},
      ],
      tag: 'Features',
    },
    {
      tint: 'rgba(232,74,107,0.08)',
      shapes: [
        {kind: 'diamond', color: TT_COLORS.complicated, label: 'Playback', sub: 'Complicated subsystem'},
      ],
      tag: 'Video',
    },
    {
      tint: 'rgba(102,214,203,0.08)',
      shapes: [
        {kind: 'rect', color: TT_COLORS.platform, label: 'Tooling and infrastructure', sub: 'Platform team'},
      ],
      tag: 'Technology',
    },
  ];

  return (
    <div className="slide tt-int-slide" data-screen-label="07. Topology in practice · 2024–25">
      <style>{`
        .tt-int-slide .tti-title {
          font: 700 42px/1.05 Compasse, sans-serif;
          color: var(--z-text-primary);
          letter-spacing: -0.015em;
          margin: 0;
        }
        .tt-int-slide .tti-sub {
          font: 400 17px/1.4 Compasse, sans-serif;
          color: var(--z-text-secondary);
          margin: 24px 0 0;
          max-width: 800px;
          text-wrap: pretty;
        }
        .tt-int-slide .tti-head {
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 24px;
        }
        .tt-int-slide .tti-stage {
          margin-top: 32px;
          position: relative;
          display: grid;
          grid-template-columns: 1fr 130px;
          gap: 14px;
          align-items: stretch;
        }
        .tt-int-slide .tti-rows {
          grid-column: 1;
          display: flex; flex-direction: column;
          gap: 10px;
        }
        .tt-int-slide .tti-row {
          position: relative;
          height: 78px;
          padding: 10px 24px;
          border-radius: 8px;
          display: grid;
          grid-template-columns: 200px 1fr;
          align-items: center;
          gap: 28px;
        }
        .tt-int-slide .tti-row-label {
          font: 700 16px/1.2 Compasse, sans-serif;
          color: var(--z-text-primary);
        }
        .tt-int-slide .tti-row-shapes {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 28px;
        }
        .tt-int-slide .tti-shape {
          display: inline-flex; flex-direction: column;
          align-items: center;
          gap: 6px;
          font: 700 18px/1.05 Compasse, sans-serif;
        }
        .tt-int-slide .tti-pill {
          padding: 10px 28px;
          border-radius: 0;
          background: var(--tt-shape-color);
          color: #1a1a1a;
          font-weight: 800;
          font-size: 18px;
        }
        .tt-int-slide .tti-diamond {
          padding: 10px 28px;
          border-radius: 0;
          background: var(--tt-shape-color);
          color: #1a1a1a;
          font-weight: 800;
          font-size: 16px;
          text-align: center;
        }
        .tt-int-slide .tti-rect {
          padding: 10px 28px;
          border-radius: 0;
          background: var(--tt-shape-color);
          color: #1a1a1a;
          font-weight: 800;
          font-size: 16px;
          text-align: center;
        }
        .tt-int-slide .tti-sub-shape {
          font: 600 11px/1 Compasse, sans-serif;
          letter-spacing: 0.02em;
          color: var(--tt-shape-color);
          opacity: 0.9;
        }
        .tt-int-slide .tti-enabling {
          grid-column: 2;
          background: ${TT_COLORS.enabling};
          border-radius: 0;
          margin: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 10px;
          padding: 14px 10px;
          text-align: center;
        }
        .tt-int-slide .tti-enabling-title {
          font: 800 16px/1.2 Compasse, sans-serif;
          color: #1a1a1a;
          letter-spacing: -0.005em;
        }
        .tt-int-slide .tti-enabling-sub {
          font: 600 11px/1.2 Compasse, sans-serif;
          color: rgba(26,26,26,0.7);
        }
        .tt-int-slide .tti-functional {
          margin-top: 2px;
          padding-top: 10px;
          border-top: 1px solid rgba(26,26,26,0.2);
          font: 500 11px/1.2 Compasse, sans-serif;
          color: rgba(26,26,26,0.75);
        }
        .tt-int-slide .tti-dims {
          grid-column: 1;
          grid-row: 1;
          display: flex; flex-direction: column;
          gap: 10px;
          padding-right: 20px;
        }
        .tt-int-slide .tti-dim {
          height: 86px;
          display: flex; align-items: center;
          font: 700 16px/1.2 Compasse, sans-serif;
          color: var(--z-text-primary);
        }
        .tt-int-slide .tti-callout {
          margin-top: 12px;
          padding: 10px 18px;
          border-radius: 8px;
          border: 1.5px solid var(--z-accent-blue, #4493F8);
          background: rgba(68,147,248,0.05);
          display: grid;
          grid-template-columns: 40px 1fr;
          gap: 14px;
          align-items: center;
        }
        .tt-int-slide .tti-callout-icon {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 1.5px solid var(--z-accent-blue, #4493F8);
          color: var(--z-accent-blue, #4493F8);
          display: inline-flex; align-items: center; justify-content: center;
        }
        .tt-int-slide .tti-callout-text {
          font: 500 12px/1.4 Compasse, sans-serif;
          color: var(--z-text-primary);
          text-wrap: pretty;
        }
      `}</style>
      <div className="pad" style={{paddingTop: 36, paddingBottom: 90}}>
        <div className="tti-head">
          <div>
            <div className="eyebrow accent">2025</div>
            <h2 className="tti-title" style={{marginTop: 12}}>Scale &amp; Learn.</h2>
            <p className="tti-sub" style={{margin: '14px 0 0'}}>Balance device complexity, feature parity, functional excellence, and scalability.</p>
          </div>
          <TTLegend />
        </div>

        <div className="tti-stage">
          <div className="tti-rows">
            {rows.map((r, i) => (
              <div key={i} className="tti-row" style={{background: r.tint}}>
                <div className="tti-row-label">{r.tag}</div>
                <div className="tti-row-shapes">
                  {r.shapes.map((s, si) => (
                    <div key={si} className="tti-shape" style={{'--tt-shape-color': s.color}}>
                      {s.kind === 'pill' && <span className="tti-pill">{s.label}</span>}
                      {s.kind === 'diamond' && <span className="tti-diamond">{s.label}</span>}
                      {s.kind === 'rect' && <span className="tti-rect">{s.label}</span>}
                      <span className="tti-sub-shape">{s.sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="tti-enabling">
            <div className="tti-enabling-title">Principal<br/>engineers</div>
            <div className="tti-enabling-sub">Enabling team</div>
          </div>
        </div>
      </div>
      <Footer beat="Chapter 07 · Migration in Practice · Org" beatNum={7} />
    </div>
  );
}

// ─── S23k · Vertical E2E ownership (current setup) ─────────────────
function S23k_TopologyE2E() {
  const streams = [
    {label: 'Content', team: 'Find & Discovery', items: ['Search', 'Start Page', 'Recordings', 'Program Details Page', 'Guide']},
    {label: 'Commercial', team: 'User & Commercial', items: ['Sign Up Flow', 'In App Messages', 'Login Flow', 'Shop', 'Account Management']},
    {label: 'Video', team: 'Play & Watch', items: ['Parental Control', 'Subtitles', 'Channels List', 'OSD', 'Video Ads']},
  ];

  const chapters = ['Android Chapter', 'Apple Chapter', 'Vega Chapter', 'Web Chapter'];
  const platform = ['Appstore management & automations', 'Platform-specific optimizations', 'Device & OS support lifecycle', 'Platform health monitoring', 'Platform-specific E2E test infrastructure', 'Platform releases'];
  const frontend = ['Configuration infrastructure', 'CI/CD software and hardware', 'Test infrastructure', 'App architecture', 'Release tooling'];

  return (
    <div className="slide tt-e2e-slide" data-screen-label="07. Vertical E2E ownership · 2026">
      <style>{`
        .tt-e2e-slide .tte-title {
          font: 700 32px/1.05 Compasse, sans-serif;
          color: var(--z-text-primary);
          letter-spacing: -0.015em;
          margin: 8px 0 0;
        }
        .tt-e2e-slide .tte-sub {
          font: 400 14px/1.4 Compasse, sans-serif;
          color: var(--z-text-secondary);
          margin: 10px 0 0;
          max-width: 800px;
        }
        .tt-e2e-slide .tte-head {
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 24px;
        }
        .tt-e2e-slide .tte-stage {
          margin-top: 22px;
          display: grid;
          grid-template-columns: 1fr 130px;
          gap: 12px;
        }
        .tt-e2e-slide .tte-main {
          display: flex; flex-direction: column;
          gap: 10px;
        }

        /* Stream columns */
        .tt-e2e-slide .tte-cols {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .tt-e2e-slide .tte-col {
          border-radius: 8px;
          background: rgba(245,192,70,0.08);
          padding: 10px 12px 12px;
          text-align: center;
        }
        .tt-e2e-slide .tte-col-title {
          font: 800 13px/1 Compasse, sans-serif;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--z-text-secondary);
          margin-bottom: 8px;
        }
        .tt-e2e-slide .tte-col-pills {
          display: flex; flex-wrap: wrap;
          justify-content: center;
          gap: 5px;
          margin-top: 12px;
        }
        .tt-e2e-slide .tte-pill {
          display: inline-block;
          padding: 4px 12px;
          border: 1.5px solid ${TT_COLORS.stream};
          border-radius: 0;
          font: 600 12px/1.2 Compasse, sans-serif;
          color: var(--z-text-primary);
        }

        /* Team chip — colored filled pill that shows the team name */
        .tt-e2e-slide .tte-team {
          display: inline-flex; flex-direction: column;
          align-items: center;
          gap: 2px;
        }
        .tt-e2e-slide .tte-team-shape {
          padding: 5px 14px;
          border-radius: 0;
          background: var(--tt-team-color);
          color: #1a1a1a;
          font: 800 12px/1.2 Compasse, sans-serif;
          letter-spacing: -0.005em;
        }
        .tt-e2e-slide .tte-team-shape.rect {
          border-radius: 0;
        }
        .tt-e2e-slide .tte-team-sub {
          font: 600 9px/1 Compasse, sans-serif;
          letter-spacing: 0.04em;
          color: var(--tt-team-color);
          opacity: 0.95;
        }

        /* Bands */
        .tt-e2e-slide .tte-band {
          padding: 10px 14px;
          border-radius: 8px;
        }
        .tt-e2e-slide .tte-band.complicated {
          background: rgba(232,74,107,0.08);
        }
        .tt-e2e-slide .tte-band.frontend {
          background: rgba(102,214,203,0.08);
        }
        .tt-e2e-slide .tte-band-title {
          font: 800 14px/1 Compasse, sans-serif;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-align: center;
          color: var(--z-text-secondary);
          margin-bottom: 10px;
        }
        .tt-e2e-slide .tte-band-teams {
          display: flex; flex-wrap: wrap;
          justify-content: center;
          gap: 10px 14px;
          margin-bottom: 10px;
        }
        .tt-e2e-slide .tte-band-pills {
          display: flex; flex-wrap: wrap;
          justify-content: center;
          gap: 6px;
        }
        .tt-e2e-slide .tte-band-pill {
          padding: 4px 12px;
          border-radius: 0;
          font: 600 12px/1.2 Compasse, sans-serif;
          color: var(--z-text-primary);
        }
        .tt-e2e-slide .tte-band.complicated .tte-band-pill {
          border: 1.5px solid ${TT_COLORS.complicated};
        }
        .tt-e2e-slide .tte-band.frontend .tte-band-pill {
          border: 1.5px solid ${TT_COLORS.platform};
        }

        /* Right column — Enabling */
        .tt-e2e-slide .tte-enabling {
          background: ${TT_COLORS.enabling};
          border-radius: 0;
          padding: 14px 10px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 8px;
          text-align: center;
        }
        .tt-e2e-slide .tte-enabling-title {
          font: 800 16px/1.2 Compasse, sans-serif;
          color: #1a1a1a;
          letter-spacing: -0.005em;
        }
        .tt-e2e-slide .tte-enabling-sub {
          font: 600 11px/1 Compasse, sans-serif;
          color: rgba(26,26,26,0.7);
        }
      `}</style>
      <div className="pad" style={{paddingTop: 24, paddingBottom: 84}}>
        <div className="tte-head">
          <div>
            <div className="eyebrow accent">2026</div>
            <h2 className="tte-title">As of today.</h2>
            <p className="tte-sub">Clear ownership and interfaces lead to operational efficiency.</p>
          </div>
          <TTLegend />
        </div>

        <div className="tte-stage">
          <div className="tte-main">
            <div className="tte-cols">
              {streams.map((s, i) => (
                <div key={i} className="tte-col">
                  <div className="tte-col-title">{s.label}</div>
                  <div className="tte-team" style={{'--tt-team-color': TT_COLORS.stream}}>
                    <span className="tte-team-shape">{s.team}</span>
                    <span className="tte-team-sub">Stream-aligned</span>
                  </div>
                  <div className="tte-col-pills">
                    {s.items.map((it, ii) => (
                      <span key={ii} className="tte-pill">{it}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="tte-band complicated">
              <div className="tte-band-title">Platform</div>
              <div className="tte-band-teams">
                {chapters.map((c, i) => (
                  <div key={i} className="tte-team" style={{'--tt-team-color': TT_COLORS.complicated}}>
                    <span className="tte-team-shape rect">{c}</span>
                    <span className="tte-team-sub">Complicated subsystem</span>
                  </div>
                ))}
              </div>
              <div className="tte-band-pills">
                {platform.map((p, i) => <span key={i} className="tte-band-pill">{p}</span>)}
              </div>
            </div>

            <div className="tte-band frontend">
              <div className="tte-band-title">Technology</div>
              <div className="tte-band-teams">
                <div className="tte-team" style={{'--tt-team-color': TT_COLORS.platform}}>
                  <span className="tte-team-shape rect">Frontend Technology Chapter</span>
                  <span className="tte-team-sub">Platform team</span>
                </div>
              </div>
              <div className="tte-band-pills">
                {frontend.map((p, i) => <span key={i} className="tte-band-pill">{p}</span>)}
              </div>
            </div>
          </div>

          <div className="tte-enabling">
            <div className="tte-enabling-title">Principal<br/>Engineers<br/>Team</div>
            <div className="tte-enabling-sub">Enabling team</div>
          </div>
        </div>
      </div>
      <Footer beat="Chapter 07 · Migration in Practice · Org" beatNum={7} />
    </div>
  );
}

// ─── S23i · The journey ────────────────────────────────────────────
function S23i_Journey() {
  const StarPeople = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.5l1.1 2.4 2.6.3-1.95 1.85.55 2.6L12 9.5l-2.3 1.15.55-2.6L8.3 6.2l2.6-.3z"/>
      <circle cx="12" cy="15" r="2.2"/>
      <path d="M6.5 21c.5-2 2.5-3.5 5.5-3.5s5 1.5 5.5 3.5"/>
    </svg>
  );
  const People = () => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="2.2"/>
      <circle cx="15" cy="8" r="2.2"/>
      <circle cx="12" cy="6" r="2.2"/>
      <path d="M4 18c1-3 3.5-4 8-4s7 1 8 4"/>
    </svg>
  );
  const Book = () => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="2.6"/>
      <path d="M3 18l9-5 9 5"/>
      <path d="M3 14v6h18v-6"/>
      <path d="M7 16v4M17 16v4"/>
    </svg>
  );
  const ChartUp = () => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="14" r="1.5"/>
      <circle cx="12" cy="14" r="1.5"/>
      <circle cx="18" cy="14" r="1.5"/>
      <path d="M3 20h18"/>
      <path d="M6 13V9M12 13V6M18 13V4l3 2"/>
    </svg>
  );
  const Org = () => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="3" width="6" height="5" rx="0.6"/>
      <rect x="3" y="15" width="6" height="5" rx="0.6"/>
      <rect x="9" y="15" width="6" height="5" rx="0.6"/>
      <rect x="15" y="15" width="6" height="5" rx="0.6"/>
      <path d="M12 8v3M6 11h12M6 11v4M12 11v4M18 11v4"/>
    </svg>
  );

  const stages = [
    {
      color: 'rgba(217, 119, 87, 0.40)',
      icon: <People />,
      date: 'July 2023',
      title: 'The foundation team',
      body: 'We started with one dedicated team of React.js engineers and quickly realized we also needed native expertise, so we used a replacement budget to hire our first React Native expert.',
    },
    {
      color: 'rgba(217, 119, 87, 0.65)',
      icon: <Book />,
      date: 'October 2023',
      title: 'First external expertise',
      body: 'Our first external React Native engineer joined, validated the approach, and helped move the work beyond proof of concept into real feature delivery.',
    },
    {
      color: 'rgba(217, 119, 87, 0.85)',
      icon: <ChartUp />,
      date: 'Early 2024',
      title: 'Scaling the transformation',
      body: 'We expanded the team to 8–9 engineers, added a TV-focused mentorship program, split the work into Luna and Nova, created native bridge support, and added a team for tooling and shared infrastructure.',
    },
    {
      color: 'var(--z-accent-primary)',
      icon: <Org />,
      date: '2025',
      title: 'Stream-aligned organisation',
      body: 'We formed several stream-aligned teams, supported by several complicated subsystem teams and a platform team, creating a delivery model that could scale across products and devices.',
    },
  ];

  return (
    <div className="slide journey-slide" data-screen-label="07. The journey">
      <style>{`
        .journey-slide .jr-title {
          font: 700 42px/1.05 Compasse, sans-serif;
          color: var(--z-text-primary);
          letter-spacing: -0.015em;
          margin: 0;
        }
        .journey-slide .jr-sub {
          font: 400 19px/1.4 Compasse, sans-serif;
          color: var(--z-text-secondary);
          margin: 14px 0 0;
          max-width: 1080px;
          text-wrap: pretty;
        }
        .journey-slide .jr-rail {
          position: relative;
          margin-top: 40px;
          padding-top: 28px;
        }
        /* Horizontal connecting line */
        .journey-slide .jr-rail::before {
          content: '';
          position: absolute;
          top: 12px;
          left: 0;
          right: 0;
          height: 3px;
          background: rgba(255,255,255,0.30);
          border-radius: 1.5px;
        }
        .journey-slide .jr-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
        }
        .journey-slide .jr-card {
          position: relative;
          padding: 0;
          text-align: left;
        }
        .journey-slide .jr-dot {
          position: absolute;
          top: -23.5px;
          left: 0;
          width: 18px; height: 18px;
          border-radius: 50%;
          background: currentColor;
          box-shadow: 0 0 0 4px var(--z-surface-base);
        }
        .journey-slide .jr-date {
          font: 700 16px/1 Compasse, sans-serif;
          letter-spacing: 0.02em;
          margin-bottom: 14px;
          padding-bottom: 14px;
          border-bottom: 1px solid currentColor;
        }
        .journey-slide .jr-card-title {
          font: 800 22px/1.2 Compasse, sans-serif;
          letter-spacing: -0.01em;
          margin-bottom: 14px;
          text-wrap: pretty;
        }
        .journey-slide .jr-card-body {
          font: 400 15px/1.5 Compasse, sans-serif;
          color: var(--z-text-primary);
          text-wrap: pretty;
        }

        .journey-slide .jr-callout {
          margin-top: 18px;
          padding: 14px 22px;
          border-radius: 8px;
          border: 1.5px solid var(--z-accent-blue, #4493F8);
          background: rgba(68,147,248,0.05);
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: 18px;
          align-items: center;
        }
        .journey-slide .jr-callout-icon {
          width: 56px; height: 56px;
          border-radius: 50%;
          border: 1.5px solid var(--z-accent-blue, #4493F8);
          color: var(--z-accent-blue, #4493F8);
          display: inline-flex; align-items: center; justify-content: center;
        }
        .journey-slide .jr-callout-text {
          font: 700 16px/1.4 Compasse, sans-serif;
          color: var(--z-text-primary);
          text-wrap: pretty;
        }
      `}</style>
      <div className="pad" style={{paddingTop: 44, paddingBottom: 90}}>
        <div className="eyebrow accent">2023 → 2025</div>
        <h2 className="jr-title" style={{marginTop: 16}}>The journey.</h2>
        <p className="jr-sub">The organisation evolved step by step: start small, add expertise, scale with mentorship and platform support, then align teams to product domains.</p>

        <div className="jr-rail">
          <div className="jr-grid">
            {stages.map((s, i) => (
              <div
                key={i}
                className="jr-card"
                style={{color: s.color}}
              >
                <span className="jr-dot"></span>
                <div className="jr-date">{s.date}</div>
                <div className="jr-card-title">{s.title}</div>
                <div className="jr-card-body">{s.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer beat="Chapter 07 · Migration in Practice · Org" beatNum={7} />
    </div>
  );
}

// ─── S23h · Team Topologies ────────────────────────────────────────
function S23h_TeamTopologies() {
  const People = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.2"/>
      <path d="M3 19c.6-3.4 3-5 6-5s5.4 1.6 6 5"/>
      <path d="M14 17c.5-1.8 2-3 4-3 1.6 0 3 .9 3.5 3"/>
    </svg>
  );

  // Mini book-cover recreation — colored overlapping shapes.
  const BookCover = () => (
    <div className="tt-book">
      <div className="tt-book-bg"></div>
      <div className="tt-book-title">
        <div className="tt-book-title-row tt-orange">TEAM</div>
        <div className="tt-book-title-row tt-green">TOPOLOGIES</div>
      </div>
      <div className="tt-book-circles">
        <div className="tt-circ tt-circ-red"></div>
        <div className="tt-circ tt-circ-purple">
          <div className="tt-circ-text">Organizing<br/>business and<br/>technology<br/>teams for<br/>fast flow</div>
        </div>
        <div className="tt-book-forward">Foreword by<br/><strong>RUTH<br/>MALAN</strong></div>
      </div>
      <div className="tt-book-authors">
        MATTHEW SKELTON<br/>
        <span style={{fontStyle: 'italic', fontWeight: 600}}>and</span> MANUEL PAIS
      </div>
    </div>
  );

  return (
    <div className="slide tt-slide" data-screen-label="07. Team Topologies">
      <style>{`
        .tt-slide .tt-title {
          font: 700 42px/1.05 Compasse, sans-serif;
          color: var(--z-text-primary);
          letter-spacing: -0.015em;
          margin: 0;
        }
        .tt-slide .tt-sub {
          font: 400 19px/1.4 Compasse, sans-serif;
          color: var(--z-text-secondary);
          margin: 14px 0 0;
          max-width: 1100px;
        }
        .tt-slide .tt-stage {
          margin-top: 24px;
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 22px;
          align-items: stretch;
        }
        .tt-slide .tt-right {
          display: grid; grid-template-rows: 1fr 1fr;
          gap: 14px;
        }
        .tt-slide .tt-panel {
          border: 1px solid rgba(155,107,242,0.45);
          border-radius: 10px;
          padding: 14px 18px;
          background: rgba(155,107,242,0.05);
        }
        .tt-slide .tt-panel.b { border-color: rgba(68,147,248,0.45); background: rgba(68,147,248,0.05); }
        .tt-slide .tt-panel-head {
          font: 800 16px/1 Compasse, sans-serif;
          color: var(--z-text-primary);
          letter-spacing: -0.005em;
          margin-bottom: 10px;
        }
        .tt-slide .tt-topo-row {
          display: grid;
          grid-template-columns: 60px 1fr;
          gap: 14px;
          align-items: center;
          padding: 6px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          font: 500 14px/1.3 Compasse, sans-serif;
          color: var(--z-text-primary);
        }
        .tt-slide .tt-topo-row:last-child { border-bottom: none; }
        .tt-slide .tt-glyph {
          display: inline-flex; align-items: center; justify-content: center;
          width: 50px; height: 14px;
        }
        .tt-slide .tt-glyph.stream {
          width: 50px; height: 8px; border-radius: 4px;
          background: #F5C046;
        }
        .tt-slide .tt-glyph.enabling {
          width: 14px; height: 24px; border-radius: 8px;
          background: #9B6BF2;
        }
        .tt-slide .tt-glyph.complicated {
          width: 22px; height: 18px; border-radius: 4px;
          background: #E84A6B;
        }
        .tt-slide .tt-glyph.platform {
          width: 40px; height: 16px; border-radius: 4px;
          background: #66D6CB;
        }

        /* Interaction diagram */
        .tt-slide .tt-flow {
          position: relative;
          padding: 10px 6px;
          display: flex; flex-direction: column;
          gap: 6px;
        }
        .tt-slide .tt-flow-header {
          display: flex; align-items: center;
          justify-content: center;
          gap: 8px;
          font: 600 italic 12px/1 Compasse, sans-serif;
          color: var(--z-text-secondary);
          margin-bottom: 4px;
        }
        .tt-slide .tt-stream {
          position: relative;
          height: 8px;
          background: #F5C046;
          border-radius: 4px;
          margin: 4px 0;
        }
        .tt-slide .tt-platform {
          height: 16px;
          background: #66D6CB;
          border-radius: 4px;
          margin-top: 6px;
        }
        .tt-slide .tt-grid-rows {
          position: relative;
          display: grid;
          grid-template-columns: 110px 1fr 150px;
          gap: 12px;
          align-items: center;
          padding-left: 14px;
        }
        .tt-slide .tt-grid-rows .col-mid {
          position: relative;
          padding: 12px 0;
        }
        .tt-slide .tt-mode-label {
          font: 600 12px/1.2 Compasse, sans-serif;
          color: var(--z-text-secondary);
          text-align: right;
          padding-right: 4px;
        }
        .tt-slide .tt-mode-label.right { text-align: left; padding-left: 4px; }
        .tt-slide .tt-mode-box {
          position: absolute;
          border: 1.5px dashed;
          border-radius: 6px;
          pointer-events: none;
        }

        /* Bottom callout */
        .tt-slide .tt-callout {
          margin-top: 14px;
          padding: 14px 22px;
          border-radius: 8px;
          border: 1.5px solid var(--z-accent-blue, #4493F8);
          background: rgba(68,147,248,0.05);
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: 16px;
          align-items: center;
        }
        .tt-slide .tt-callout-icon {
          width: 56px; height: 56px;
          border-radius: 50%;
          border: 1.5px solid var(--z-accent-blue, #4493F8);
          color: var(--z-accent-blue, #4493F8);
          display: inline-flex; align-items: center; justify-content: center;
        }
        .tt-slide .tt-callout-text {
          font: 500 15px/1.4 Compasse, sans-serif;
          color: var(--z-text-primary);
          text-wrap: pretty;
        }

        /* Book cover */
        .tt-slide .tt-book {
          position: relative;
          aspect-ratio: 3 / 4.4;
          border-radius: 8px;
          overflow: hidden;
          background: #f0f3f7;
          color: #111;
          font-family: 'Compasse', sans-serif;
          padding: 14px;
          box-shadow: 0 14px 30px rgba(0,0,0,0.35), 0 4px 10px rgba(0,0,0,0.25);
        }
        .tt-slide .tt-book-bg {
          position: absolute; inset: 0;
          background-image:
            radial-gradient(circle at 10% 30%, #d8dbe0 6px, transparent 7px),
            radial-gradient(circle at 80% 50%, #d8dbe0 6px, transparent 7px),
            radial-gradient(circle at 30% 80%, #d8dbe0 6px, transparent 7px);
        }
        .tt-slide .tt-book-title {
          position: relative;
          margin-bottom: 14px;
        }
        .tt-slide .tt-book-title-row {
          font-weight: 900;
          letter-spacing: -0.01em;
          padding: 6px 10px;
          color: #111;
          display: inline-block;
        }
        .tt-slide .tt-orange {
          background: #F5A03A;
          font-size: 22px;
          margin-bottom: 4px;
        }
        .tt-slide .tt-green {
          background: #8FB935;
          font-size: 18px;
          padding-right: 18px;
        }
        .tt-slide .tt-book-circles {
          position: relative;
          margin: 12px 0;
          height: 110px;
          display: flex;
          align-items: center;
        }
        .tt-slide .tt-circ {
          position: absolute;
          border-radius: 50%;
        }
        .tt-slide .tt-circ-red {
          width: 78px; height: 78px;
          background: #E84A6B;
          left: 4px; top: 14px;
        }
        .tt-slide .tt-circ-purple {
          width: 90px; height: 90px;
          background: #9B6BF2;
          left: 40px; top: 6px;
          display: flex; align-items: center; justify-content: center;
        }
        .tt-slide .tt-circ-text {
          font: 700 8px/1.15 Compasse, sans-serif;
          letter-spacing: 0.04em;
          color: #fff;
          text-align: center;
          text-transform: uppercase;
        }
        .tt-slide .tt-book-forward {
          position: absolute;
          right: 4px; top: 36px;
          width: 60px; height: 56px;
          background: #4FA29E;
          color: #fff;
          font: 700 7px/1.2 Compasse, sans-serif;
          padding: 8px 6px;
          text-align: center;
          letter-spacing: 0.02em;
        }
        .tt-slide .tt-book-forward strong {
          display: block;
          margin-top: 2px;
          font-size: 11px;
          letter-spacing: 0.06em;
        }
        .tt-slide .tt-book-authors {
          position: relative;
          background: #F5A03A;
          color: #111;
          padding: 8px 10px;
          font: 800 11px/1.3 Compasse, sans-serif;
          letter-spacing: 0.02em;
          margin-top: auto;
        }
      `}</style>
      <div className="pad" style={{paddingTop: 44, paddingBottom: 90}}>
        <h2 className="tt-title">Team Topologies.</h2>
        <p className="tt-sub">Team Topologies offers a strategic framework for modern organisational design, helping software teams improve flow, clarity, and delivery.</p>

        <div style={{
          marginTop: 24,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 32,
          paddingLeft: 24,
          borderLeft: '3px solid rgba(255,255,255,0.25)',
        }}>
          <div style={{
            background: '#fff',
            padding: 14,
            borderRadius: 6,
            boxShadow: '0 12px 30px rgba(0,0,0,0.45), 0 4px 10px rgba(0,0,0,0.3)',
            display: 'inline-block',
          }}>
            <img
              src="assets/slides/team-topologies.jpg"
              alt="Team Topologies — book cover, 4 fundamental topologies, 3 core interaction modes"
              style={{maxHeight: 340, maxWidth: '100%', display: 'block', objectFit: 'contain'}}
            />
          </div>
          <div style={{
            font: '500 italic 13px/1.4 Compasse, sans-serif',
            color: 'var(--z-text-secondary)',
            paddingTop: 6,
            maxWidth: 220,
          }}>
            <span style={{display: 'block', fontWeight: 800, fontStyle: 'normal', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--z-text-primary)', fontSize: 10, marginBottom: 8}}>
              Source
            </span>
            <span>
              Skelton, M. &amp; Pais, M., <em>Team Topologies — Organizing Business and Technology Teams for Fast Flow</em>, IT Revolution Press, 2019.
            </span>
          </div>
        </div>
      </div>
      <Footer beat="Chapter 07 · Migration in Practice · Org" beatNum={7} />
    </div>
  );
}

// ─── S23g · Transforming the organisation ──────────────────────────
function S23g_TransformingOrg() {
  const People = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* Profile head with a lightbulb/idea inside — "philosopher" */}
      <path d="M16 21h-5c-1.5 0-2.7-1.2-2.7-2.7v-1.4c0-.7-.3-1.4-.9-1.9C5.8 14 5 12.2 5 10.4 5 6.3 8.4 3 12.5 3c3.6 0 6.6 2.6 7.3 6 .3 1.5-.1 3-1 4.2-.7.9-1.6 1.4-1.6 2.6V18c0 1.7-.7 3-2 3h-.2"/>
      <path d="M11.5 7.5c-1.4.4-2.5 1.7-2.5 3.2"/>
      <path d="M12 13.5v3.5"/>
      <path d="M10.5 18.5h3"/>
    </svg>
  );
  const Question = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h12a2 2 0 0 1 2 2v14a1 1 0 0 1-1.6.8L13 17H7a2 2 0 0 1-2-2V4z"/>
      <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.7"/>
      <path d="M12 15.5h.01"/>
    </svg>
  );
  const Cap = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10 12 5 2 10l10 5 10-5z"/>
      <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>
    </svg>
  );
  const Layers = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7l9-4 9 4-9 4-9-4z"/>
      <path d="M3 11l9 4 9-4"/>
      <path d="M3 15l9 4 9-4"/>
    </svg>
  );
  const Group = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="2.6"/>
      <path d="M9 5l-.8-.8M15 5l.8-.8M11 1.4h2"/>
      <path d="M5 21c.5-3.4 3-5 7-5s6.5 1.6 7 5"/>
    </svg>
  );

  const tiles = [
    {
      color: 'var(--z-accent-green)',
      tint: 'rgba(63,185,80,0.05)',
      border: 'rgba(63,185,80,0.35)',
      icon: <People />,
      title: 'Transformation philosophy',
      body: 'We gradually moved engineers from platform-specific teams into a shared cross-platform setup, preserving existing talent while changing how the organisation worked.',
    },
    {
      color: 'var(--z-accent-primary)',
      tint: 'rgba(217,119,87,0.05)',
      border: 'rgba(217,119,87,0.35)',
      icon: <Question />,
      title: 'Skills challenge',
      body: 'We started with strong React.js and native expertise, but no React Native experience, and many native engineers were skeptical that cross-platform could be worth their career investment.',
    },
    {
      color: 'var(--z-accent-teal)',
      tint: 'rgba(0,184,212,0.05)',
      border: 'rgba(0,184,212,0.35)',
      icon: <Cap />,
      title: 'How we addressed it',
      body: 'We invested in React Native learning subscriptions for all frontend engineers, so people could start building skills early even before they joined the migration effort.',
    },
    {
      color: 'var(--z-accent-blue, #4493F8)',
      tint: 'rgba(68,147,248,0.05)',
      border: 'rgba(68,147,248,0.35)',
      icon: <Layers />,
      title: 'Dual maintenance challenge',
      body: 'While building the new apps, we still had to maintain the live Swift, Kotlin, and JavaScript products, forcing the organisation to operate in two parallel worlds at once.',
    },
  ];

  return (
    <div className="slide org-trans-slide" data-screen-label="07. Transforming the org">
      <style>{`
        .org-trans-slide .ot-title {
          font: 700 42px/1.05 Compasse, sans-serif;
          color: var(--z-text-primary);
          letter-spacing: -0.015em;
          margin: 0;
        }
        .org-trans-slide .ot-sub {
          font: 400 19px/1.4 Compasse, sans-serif;
          color: var(--z-text-secondary);
          margin: 14px 0 0;
          max-width: 1100px;
          text-wrap: pretty;
        }
        .org-trans-slide .ot-grid {
          margin-top: 28px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .org-trans-slide .ot-card {
          border-radius: 8px;
          padding: 18px 22px;
          display: grid;
          grid-template-columns: 64px 1fr;
          gap: 20px;
          align-items: start;
        }
        .org-trans-slide .ot-icon {
          width: 64px; height: 64px;
          border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
        }
        .org-trans-slide .ot-card-head {
          font: 800 19px/1 Compasse, sans-serif;
          letter-spacing: -0.005em;
          padding-bottom: 8px;
          border-bottom: 1.5px solid currentColor;
          margin-bottom: 10px;
        }
        .org-trans-slide .ot-card-body {
          font: 400 14px/1.45 Compasse, sans-serif;
          color: var(--z-text-primary);
          text-wrap: pretty;
        }
        .org-trans-slide .ot-callout {
          margin-top: 14px;
          padding: 14px 22px;
          border-radius: 8px;
          border: 1.5px solid var(--z-accent-blue, #4493F8);
          background: rgba(68,147,248,0.05);
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: 18px;
          align-items: center;
        }
        .org-trans-slide .ot-callout-icon {
          width: 56px; height: 56px;
          border-radius: 50%;
          border: 1.5px solid var(--z-accent-blue, #4493F8);
          color: var(--z-accent-blue, #4493F8);
          display: inline-flex; align-items: center; justify-content: center;
        }
        .org-trans-slide .ot-callout-text {
          font: 700 16px/1.4 Compasse, sans-serif;
          color: var(--z-text-primary);
          text-wrap: pretty;
        }
      `}</style>
      <div className="pad" style={{paddingTop: 44, paddingBottom: 90}}>
        <h2 className="ot-title">Transforming the organisation.</h2>
        <p className="ot-sub">We chose to transform our org and operating model building UTV while still supporting the native apps.</p>

        <div className="ot-grid">
          {tiles.map((t, i) => (
            <div key={i} className="ot-card" style={{border: `1.5px solid ${t.border}`, background: t.tint}}>
              <div className="ot-icon" style={{border: `1.5px solid ${t.border}`, color: t.color}}>
                {t.icon}
              </div>
              <div>
                <div className="ot-card-head" style={{color: t.color}}>{t.title}</div>
                <div className="ot-card-body">{t.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="ot-callout">
          <div className="ot-callout-icon"><Group /></div>
          <div className="ot-callout-text">
            The migration was not only a technology shift, it was an organisational transformation: keep the people, grow the skills, and carry both worlds until the new one was ready.
          </div>
        </div>
      </div>
      <Footer beat="Chapter 07 · Migration in Practice · Org" beatNum={7} />
    </div>
  );
}

// ─── S23f · Improvements we couldn't resist ────────────────────────
function S23f_SmartIteration() {
  const TvFrame = ({ src, alt }) => (
    <div style={{
      background: '#0a0a0a',
      border: '1px solid rgba(255,255,255,0.10)',
      borderRadius: 10,
      padding: 6,
      boxShadow: '0 18px 40px rgba(0,0,0,0.55), 0 4px 14px rgba(0,0,0,0.45)',
      position: 'relative',
    }}>
      <div style={{aspectRatio: '16 / 9', width: '100%', borderRadius: 4, overflow: 'hidden', background: '#000'}}>
        <img src={src} alt={alt} style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
      </div>
    </div>
  );

  return (
    <div className="slide smart-iter-slide" data-screen-label="07. Smart iteration · QR-code login">
      <style>{`
        .smart-iter-slide .si-title {
          font: 700 42px/1.05 Compasse, sans-serif;
          color: var(--z-text-primary);
          letter-spacing: -0.015em;
          margin: 0;
        }
        .smart-iter-slide .si-sub {
          font: 400 19px/1.45 Compasse, sans-serif;
          color: var(--z-text-secondary);
          margin: 18px 0 0;
          max-width: 1080px;
          text-wrap: pretty;
        }
        .smart-iter-slide .si-stage {
          margin-top: 36px;
          display: grid;
          grid-template-columns: 1fr 60px 1fr;
          gap: 24px;
          align-items: center;
        }
        .smart-iter-slide .si-label {
          font: 800 11px/1 Compasse, sans-serif;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--z-text-secondary);
          margin-bottom: 12px;
        }
        .smart-iter-slide .si-cap {
          font: 600 16px/1.35 Compasse, sans-serif;
          color: var(--z-text-primary);
          margin-top: 16px;
          text-wrap: pretty;
        }
        .smart-iter-slide .si-cap em {
          font-style: italic;
          color: var(--z-accent-primary);
        }
        .smart-iter-slide .si-arrow {
          align-self: center;
          color: var(--z-accent-primary);
          font: 900 56px/1 Compasse, sans-serif;
          text-align: center;
          margin-top: 16px;
        }
      `}</style>
      <div className="pad" style={{paddingTop: 48, paddingBottom: 90}}>
        <h2 className="si-title">
          Some improvements we <em style={{color: 'var(--z-accent-primary)', fontStyle: 'italic'}}>couldn't resist</em>.
        </h2>
        <p className="si-sub">
          Migration kept the UX familiar — but a few pain points were too painful to leave alone. Typing a password on a TV remote was one of them.
        </p>

        <div className="si-stage">
          <div>
            <TvFrame src="assets/poc/login-before.png" alt="Login screen with forgot password link" />
            <p className="si-cap">Typing on a TV remote was painful, so we hung an exit door on the screen.</p>
          </div>
          <div className="si-arrow">→</div>
          <div>
            <TvFrame src="assets/poc/login-qr.png" alt="QR code recovery screen" />
            <p className="si-cap">Scan the QR code, finish recovery on your phone. <em>Done in seconds.</em></p>
          </div>
        </div>
      </div>
      <Footer beat="Chapter 07 · Migration in Practice · Product" beatNum={7} />
    </div>
  );
}

// ─── S23e · Beta users feedback ────────────────────────────────────
function S23e_BetaFeedback() {
  // Mixed order — sentiments interleave through the bento.
  // size: 's' (1×), 'm' (1×2 tall), 'l' (2×) — drives bento spans.
  const quotes = [
    { kind: 'positive', size: 'l', text: 'The channels can be changed much more quickly and the overall speed has improved significantly.' },
    { kind: 'negative', size: 'm', text: 'The image quality is not consistently good despite high bandwidth.' },
    { kind: 'positive', size: 's', text: 'The guide is more beautifully designed.' },
    { kind: 'positive', size: 'm', text: 'The app starts faster and runs more stable. This was often a problem before, especially in the first minute.' },
    { kind: 'negative', size: 's', text: 'Favorites get the original number from all channels. That\u2019s really bad.' },
    { kind: 'neutral',  size: 's', text: 'I\u2019m not sure what has changed compared to the old app.' },
    { kind: 'positive', size: 's', text: 'It is more fluid than the old one!' },
    { kind: 'negative', size: 's', text: 'Program Guide no longer directly accessible with remote control.' },
    { kind: 'positive', size: 'l', text: 'The screen runs much smoother, the quality is very good, and it is great that there is a clock on board.' },
    { kind: 'neutral',  size: 's', text: 'Don\u2019t see much difference.' },
    { kind: 'positive', size: 's', text: 'Scrolling through the programs is much smoother.' },
    { kind: 'negative', size: 's', text: 'The UI for the program overview could be better.' },
    { kind: 'positive', size: 's', text: 'Television runs very stable, the app seems tidier.' },
    { kind: 'neutral',  size: 's', text: 'That not much has changed.' },
    { kind: 'positive', size: 'm', text: 'I have the impression that the beta version runs a bit more stable.' },
    { kind: 'negative', size: 's', text: 'Everything in the settings is in English, which is a negative.' },
    { kind: 'positive', size: 's', text: 'Works faster and provides a better picture.' },
    { kind: 'negative', size: 's', text: 'Picture quality of individual channels is worse.' },
    { kind: 'neutral',  size: 's', text: 'Not much better.' },
  ];

  const Pill = ({ color, bg, label }) => (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '6px 14px',
      borderRadius: 6,
      border: `1px solid ${color}`,
      background: bg,
      font: '700 13px/1 Compasse, sans-serif',
      color: 'var(--z-text-primary)',
    }}>
      {label}
    </span>
  );

  return (
    <div className="slide beta-feedback-slide" data-screen-label="07. Beta user feedback">
      <style>{`
        .beta-feedback-slide .bf-head {
          display: flex; align-items: flex-start;
          justify-content: space-between;
          gap: 24px;
        }
        .beta-feedback-slide .bf-title {
          font: 800 38px/1.05 Compasse, sans-serif;
          color: var(--z-text-primary);
          letter-spacing: -0.015em;
          margin: 0;
        }
        .beta-feedback-slide .bf-stat {
          font: 800 28px/1.15 Compasse, sans-serif;
          margin-top: 10px;
          letter-spacing: -0.005em;
        }
        .beta-feedback-slide .bf-sub {
          font: 400 14px/1.4 Compasse, sans-serif;
          color: var(--z-text-secondary);
          margin: 6px 0 0;
        }
        .beta-feedback-slide .bf-legend {
          display: flex; gap: 10px;
          flex-shrink: 0;
          padding-top: 4px;
        }

        /* Bento grid: 4 cols, auto rows with dense flow */
        .beta-feedback-slide .bf-bento {
          margin-top: 20px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 64px;
          grid-auto-flow: dense;
          gap: 10px;
        }
        .beta-feedback-slide .bf-tile {
          padding: 10px 14px;
          border-radius: 10px;
          border: 1.5px solid transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: var(--z-text-primary);
          text-wrap: pretty;
        }
        .beta-feedback-slide .bf-tile.s { grid-column: span 1; grid-row: span 1;
          font: 500 13px/1.3 Compasse, sans-serif; }
        .beta-feedback-slide .bf-tile.m { grid-column: span 1; grid-row: span 2;
          font: 500 15px/1.35 Compasse, sans-serif; }
        .beta-feedback-slide .bf-tile.l { grid-column: span 2; grid-row: span 1;
          font: 600 16px/1.3 Compasse, sans-serif; }

        .beta-feedback-slide .bf-tile.positive { border-color: rgba(63,185,80,0.42); background: rgba(63,185,80,0.06); }
        .beta-feedback-slide .bf-tile.neutral  { border-color: rgba(232,168,42,0.50); background: rgba(232,168,42,0.07); }
        .beta-feedback-slide .bf-tile.negative { border-color: rgba(248,81,73,0.42); background: rgba(248,81,73,0.06); }
      `}</style>
      <div className="pad" style={{paddingTop: 36, paddingBottom: 96}}>
        <div className="bf-head">
          <div>
            <h2 className="bf-title">Beta users share their experiences.</h2>
            <div className="bf-stat">
              <span style={{color: 'var(--z-accent-green)'}}>69.4% same or better</span>
              <span style={{color: 'var(--z-text-secondary)', fontWeight: 700, margin: '0 8px'}}>vs</span>
              <span style={{color: 'var(--z-accent-red)'}}>30.6% worse</span>
            </div>
            <p className="bf-sub">Representative beta feedback grouped into positive, neutral, and negative themes.</p>
          </div>
          <div className="bf-legend">
            <Pill color="var(--z-accent-green)" bg="rgba(63,185,80,0.05)" label="Positive" />
            <Pill color="#E8A82A" bg="rgba(232,168,42,0.06)" label="Neutral" />
            <Pill color="var(--z-accent-red)" bg="rgba(248,81,73,0.05)" label="Negative" />
          </div>
        </div>
        <div className="bf-bento">
          {quotes.map((q, i) => (
            <div key={i} className={`bf-tile ${q.kind} ${q.size}`}>{q.text}</div>
          ))}
        </div>
      </div>
      <Footer beat="Chapter 07 · Migration in Practice · Product" beatNum={7} />
    </div>
  );
}

// ─── S23 · Domain-organised codebase ────────────────────────────────
function S23_Domains() {
  return (
    <div className="slide" data-screen-label="07. Organised by domain">
      <div className="pad">
        <div>
          <div className="eyebrow accent">Migration · Architecture</div>
          <h2 className="h-headline" style={{marginTop: 24}}>
            Organised by <em>domain</em>, not by platform.
          </h2>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 48}}>
          <div className="codeblock">
{`src/
├── `}<span className="c-key">app/</span>{`          `}<span className="c-comment">store, nav, focus, i18n</span>{`
├── `}<span className="c-key">commercial/</span>{`   `}<span className="c-comment">auth, IAP, restrictions</span>{`
├── `}<span className="c-key">discovery/</span>{`    `}<span className="c-comment">EPG, VOD, search</span>{`
├── `}<span className="c-key">playback/</span>{`     `}<span className="c-comment">player, stream mgmt</span>{`
├── `}<span className="c-key">watch/</span>{`        `}<span className="c-comment">live, replay, OSD</span>{`
├── `}<span className="c-key">user/</span>{`         `}<span className="c-comment">settings, recordings</span>{`
└── `}<span className="c-key">ui/</span>{`           `}<span className="c-comment">shared components</span>
          </div>
          <div className="col" style={{justifyContent: 'space-between'}}>
            <div>
              <div className="label-tag" style={{color: 'var(--z-accent-primary)'}}>Same shape on</div>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12}}>
                {['Android', 'Apple', 'Vega', 'Web'].map(p => (
                  <span key={p} style={{padding: '8px 14px', background: 'var(--z-surface-elevated)', borderRadius: 4, fontSize: 14, fontWeight: 700, color: 'var(--z-text-primary)'}}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <div className="card card-orange" style={{padding: 24}}>
              <div className="label-tag">Conway&rsquo;s Law</div>
              <div style={{marginTop: 10, fontWeight: 700, fontSize: 18, lineHeight: 1.35, fontStyle: 'italic'}}>
                &ldquo;Any organisation that designs a system will produce a design whose structure is a copy of the organisation&rsquo;s communication structure.&rdquo;
              </div>
              <div style={{marginTop: 10, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.7)', fontWeight: 800}}>— Melvin E. Conway, 1968</div>
              <p className="body-text" style={{marginTop: 14, fontSize: 14}}>The code mirrors the org — so we organised the code by domain to let the org reshape around it.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer beat="Chapter 07 · Migration in Practice · Tech" beatNum={7} />
    </div>
  );
}

// ─── S23b · End-to-End Ownership ─────────────────────────────────────
function S23b_Ownership() {
  const Apple = ({size = 28}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{display: 'block'}}><path d="M17.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.8-3.6.8-.7 0-1.9-.8-3.1-.8-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.5.8 1.1 1.8 2.4 3 2.4 1.2 0 1.6-.8 3.1-.8 1.5 0 1.8.8 3.1.8 1.3 0 2.1-1.1 2.9-2.3.6-.8 1-1.7 1.3-2.7-1.4-.5-2.6-1.9-2.6-4zM15.1 5.5c.6-.7 1.1-1.7 1-2.8-1 0-2.1.6-2.8 1.4-.6.7-1.2 1.7-1 2.7 1.1.1 2.2-.6 2.8-1.3z"/></svg>
  );
  const Android = ({size = 28}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{display: 'block'}}><path d="M6.5 9.5c-.6 0-1.1.5-1.1 1.1V16c0 .6.5 1.1 1.1 1.1.6 0 1.1-.5 1.1-1.1v-5.4c0-.6-.5-1.1-1.1-1.1zm11 0c-.6 0-1.1.5-1.1 1.1V16c0 .6.5 1.1 1.1 1.1.6 0 1.1-.5 1.1-1.1v-5.4c0-.6-.5-1.1-1.1-1.1zM8.3 18.5c0 .7.5 1.2 1.2 1.2h.8v2.2c0 .6.5 1.1 1.1 1.1.6 0 1.1-.5 1.1-1.1v-2.2h1.3v2.2c0 .6.5 1.1 1.1 1.1.6 0 1.1-.5 1.1-1.1v-2.2h.8c.7 0 1.2-.5 1.2-1.2V9.6H8.3v8.9zM15.5 5.5l1-1.6c.1-.1 0-.3-.1-.4-.1-.1-.3 0-.4.1l-1 1.7c-.8-.3-1.7-.5-2.7-.5s-1.9.2-2.7.5l-1-1.7c-.1-.1-.3-.2-.4-.1-.1.1-.2.3-.1.4l1 1.6c-1.8.9-3 2.6-3 4.6h12.3c0-2-1.2-3.7-2.9-4.6zM10.2 7.6c-.3 0-.6-.3-.6-.6 0-.3.3-.6.6-.6.3 0 .6.3.6.6 0 .3-.3.6-.6.6zm3.6 0c-.3 0-.6-.3-.6-.6 0-.3.3-.6.6-.6.3 0 .6.3.6.6 0 .3-.3.6-.6.6z"/></svg>
  );
  const SmartTV = ({size = 28}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{display: 'block'}}><rect x="2.5" y="4" width="19" height="13" rx="1.5"/><path d="M8 21h8M12 17v4"/></svg>
  );
  const Web = ({size = 28}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{display: 'block'}}><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18M5 7h14M5 17h14"/></svg>
  );

  const platforms = [
    { name: 'Android', icon: <Android /> },
    { name: 'Apple', icon: <Apple /> },
    { name: 'Smart TV', icon: <SmartTV /> },
    { name: 'Web', icon: <Web /> },
  ];

  // Current: each row repeated across 4 platforms.
  const currentRows = [
    { q: 'Q1', label: 'VOD' },
    { q: 'Q2', label: 'Profiles' },
    { q: 'Q3', label: 'Favourites' },
  ];

  // Target: 3 columns owning a domain end-to-end. Each column has a
  // labelled feature on top, then a feature+New band, then a pure New.
  const targetCols = [
    { team: 'Content Experience', features: ['VOD', 'VOD', 'New'] },
    { team: 'Commercial Experience', features: ['Profiles', 'Profiles', 'New'] },
    { team: 'Watch Experience', features: ['Favourites', 'Favourites', 'New'] },
  ];

  const Cell = ({ children, plain }) => (
    <div className={`own-cell${plain ? ' is-plain' : ''}`}>
      {children}
    </div>
  );

  return (
    <div className="slide ownership-slide" data-screen-label="02. End-to-end ownership">
      <style>{`
        .ownership-slide .own-title {
          font: 700 36px/1.05 Compasse, sans-serif;
          color: var(--z-text-primary);
          letter-spacing: -0.015em;
          margin: 8px 0 0;
        }
        .ownership-slide .own-sub {
          font: 400 17px/1.4 Compasse, sans-serif;
          color: var(--z-text-secondary);
          margin: 8px 0 0;
          max-width: 1000px;
        }
        .ownership-slide .own-diagram {
          margin-top: 22px;
          display: grid;
          grid-template-columns: 1fr 56px 1fr;
          gap: 18px;
          align-items: start;
        }
        .ownership-slide .own-panel {
          display: flex; flex-direction: column;
          gap: 10px;
        }
        .ownership-slide .own-panel-header {
          text-align: center;
          font: 800 13px/1 Compasse, sans-serif;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }
        .ownership-slide .own-panel-header.red { color: var(--z-accent-red); }
        .ownership-slide .own-panel-header.green { color: var(--z-accent-green); }

        .ownership-slide .own-grid {
          display: grid;
          gap: 6px;
        }
        .ownership-slide .own-cell {
          height: 32px;
          background: var(--z-surface-elevated);
          border-radius: 4px;
          font: 600 13px/1 Compasse, sans-serif;
          color: var(--z-text-primary);
          display: flex; align-items: center; justify-content: center;
          letter-spacing: -0.005em;
        }
        .ownership-slide .own-cell.is-plain {
          background: transparent;
          color: var(--z-text-secondary);
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-size: 11px;
          justify-content: flex-start;
          padding-left: 4px;
        }

        /* Current grid: 1 q-col + 4 platform cols */
        .ownership-slide .own-current-grid {
          grid-template-columns: 28px repeat(4, 1fr);
        }

        .ownership-slide .own-platforms {
          margin-top: 10px;
          display: grid;
          grid-template-columns: 28px repeat(4, 1fr);
          gap: 6px;
          align-items: center;
        }
        .ownership-slide .own-platform-cell {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 4px;
          color: var(--z-text-secondary);
        }
        .ownership-slide .own-platform-cell .name {
          font: 600 11px/1 Compasse, sans-serif;
          color: var(--z-text-secondary);
        }

        /* Target grid: 3 cols */
        .ownership-slide .own-target-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        .ownership-slide .own-target-cell {
          position: relative;
          height: 32px;
          border-radius: 4px;
          background: var(--z-surface-elevated);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          font: 600 13px/1 Compasse, sans-serif;
          color: var(--z-text-primary);
        }
        .ownership-slide .own-target-cell.own-new-pure {
          background: var(--z-accent-teal);
          color: #fff;
          font-weight: 700;
        }
        .ownership-slide .own-target-cell .new-band {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 12px;
          background: var(--z-accent-teal);
          color: #fff;
          font: 800 8px/1 Compasse, sans-serif;
          letter-spacing: 0.14em;
          display: flex; align-items: center; justify-content: center;
        }
        .ownership-slide .own-target-cell.has-new {
          padding-bottom: 12px;
        }

        .ownership-slide .own-teams {
          margin-top: 10px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          text-align: center;
          font: 700 13px/1.2 Compasse, sans-serif;
          color: var(--z-text-secondary);
        }

        .ownership-slide .own-caption {
          margin-top: 14px;
          text-align: center;
          font: 500 italic 13px/1.35 Compasse, sans-serif;
        }
        .ownership-slide .own-caption.red { color: var(--z-accent-red); }
        .ownership-slide .own-caption.green { color: var(--z-accent-green); }
        .ownership-slide .own-subnote {
          margin-top: 4px;
          text-align: center;
          font: 400 12px/1.35 Compasse, sans-serif;
          color: var(--z-text-secondary);
        }

        .ownership-slide .own-arrow {
          align-self: center;
          color: var(--z-accent-primary);
          font-size: 36px;
          line-height: 1;
          padding-top: 90px;
          text-align: center;
        }

        .ownership-slide .own-callout {
          position: absolute;
          left: 56px; right: 56px;
          bottom: 100px;
          padding: 14px 18px;
          background: rgba(0,184,212,0.10);
          border: 1px solid rgba(0,184,212,0.30);
          border-radius: 4px;
          display: flex; align-items: center; gap: 16px;
        }
        .ownership-slide .own-callout-icon {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 2px solid var(--z-accent-teal);
          display: inline-flex;
          align-items: center; justify-content: center;
          flex-shrink: 0;
          color: var(--z-accent-teal);
        }
        .ownership-slide .own-callout-text {
          font: 600 16px/1.35 Compasse, sans-serif;
          color: var(--z-text-primary);
        }
        .ownership-slide .own-callout-text em {
          font-style: italic;
          color: var(--z-accent-teal);
        }
      `}</style>
      <div className="pad" style={{paddingTop: 40, paddingBottom: 200, display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box'}}>
        <div>
          <div className="eyebrow accent">Organisation</div>
          <h2 className="own-title">End-to-End <em style={{color: 'var(--z-accent-teal)', fontStyle: 'italic'}}>Ownership</em>.</h2>
          <p className="own-sub">Move from platform-based feature ownership to clear ownership in end-to-end teams.</p>
        </div>

        <div className="own-diagram" style={{margin: 'auto 0'}}>
          {/* Current model */}
          <div className="own-panel">
            <div className="own-panel-header red">Current model</div>
            <div className="own-grid own-current-grid">
              {currentRows.map((r) => (
                <React.Fragment key={r.q}>
                  <Cell plain>{r.q}</Cell>
                  {platforms.map((p, i) => (
                    <Cell key={i}>{r.label}</Cell>
                  ))}
                </React.Fragment>
              ))}
            </div>
            <div className="own-platforms">
              <div></div>
              {platforms.map((p) => (
                <div key={p.name} className="own-platform-cell">
                  {p.icon}
                  <div className="name">{p.name}</div>
                </div>
              ))}
            </div>
            <div className="own-caption red">Same features are owned separately by each platform team</div>
            <div className="own-subnote">Unclear ownership and higher cognitive load</div>
          </div>

          {/* Arrow */}
          <div className="own-arrow">→</div>

          {/* Target model */}
          <div className="own-panel">
            <div className="own-panel-header green">Target model</div>
            <div className="own-grid own-target-grid">
              {[0, 1, 2].map((row) => (
                targetCols.map((col, i) => {
                  const v = col.features[row];
                  if (v === 'New' && row === 2) {
                    return <div key={`${row}-${i}`} className="own-target-cell own-new-pure">New</div>;
                  }
                  return <div key={`${row}-${i}`} className="own-target-cell">{v}</div>;
                })
              ))}
            </div>
            <div className="own-teams">
              {targetCols.map((c) => (
                <div key={c.team}>
                  {c.team.split(' ').map((word, idx) => (
                    <React.Fragment key={idx}>
                      {word}{idx === 0 ? <br/> : null}{' '}
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
            <div className="own-caption green">Features are owned by end-to-end teams across all platforms</div>
            <div className="own-subnote">Clear ownership and lower cognitive load</div>
          </div>
        </div>

        {/* Bottom callout */}
        <div className="own-callout">
          <span className="own-callout-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.2"/>
              <path d="M3 19c.6-3.4 3-5 6-5s5.4 1.6 6 5"/>
              <path d="M14 17c.5-1.8 2-3 4-3 1.6 0 3 .9 3.5 3"/>
            </svg>
          </span>
          <div className="own-callout-text">
            <em>End-to-end teams own a feature domain across all platforms</em>, reducing duplication and making ownership clear.
          </div>
        </div>
      </div>
      <Footer beat="Chapter 02 · The Challenge · Org" beatNum={8} />
    </div>
  );
}

// ─── S24 · Vega and Web are closer than they look ───────────────────
function S24_VegaWeb() {
  return (
    <div className="slide" data-screen-label="08. Vega and Web are closer">
      <div className="pad center">
        <div className="eyebrow accent" style={{marginBottom: 24}}>Migration · An unexpected outcome</div>
        <h2 className="h-section" style={{fontSize: 76, maxWidth: 1100, marginBottom: 40}}>
          Vega and Web are <em>closer than they look.</em>
        </h2>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 16}}>
          <div className="card card-elevated" style={{padding: 28}}>
            <div className="card-num">Both render JS directly</div>
            <p className="body-text" style={{marginTop: 12}}>Vega via <strong>Hermes + Fabric</strong> onto a Linux/C++ surface. Web via <strong>react-native-web</strong> to the DOM. Neither passes through a native view system.</p>
          </div>
          <div className="card card-elevated" style={{padding: 28}}>
            <div className="card-num">The headache lives elsewhere</div>
            <p className="body-text" style={{marginTop: 12}}>On <strong>Android and Apple</strong>, where the native view bridges need more care. <em style={{color: 'var(--z-accent-primary)'}}>Abstract first, override only where you must</em> stops being a discipline and becomes the natural shape of the work.</p>
          </div>
        </div>
      </div>
      <Footer beat="Chapter 08 · What we learned" beatNum={7} />
    </div>
  );
}

// ─── S28 · The verdict (stats) ───────────────────────────────────────
function S28_Verdict() {
  const stats = [
    { num: '~1y', color: 'var(--z-accent-green)', label: 'in production with crash rates and performance comparable to native' },
    { num: '0', color: 'var(--z-accent-blue, #4493F8)', label: 'major incidents during rollout' },
    { num: '0', color: 'var(--z-accent-blue, #4493F8)', label: 'capabilities we couldn\u2019t deliver' },
    { num: '+25%', color: 'var(--z-accent-green)', label: 'delivered outcomes\nQ1 2026 vs. Q4 2025' },
  ];
  return (
    <div className="slide" data-screen-label="08. The verdict">
      <div className="pad">
        <div className="two-col-head">
          <div>
            <div className="eyebrow accent">What we learned · The verdict</div>
            <h2 className="h-headline" style={{marginTop: 16}}>
              The bet <em>paid off.</em>
            </h2>
          </div>
        </div>
        <div className="stat-grid" style={{marginTop: 32}}>
          {stats.map((s, i) => (
            <div key={i} className="stat" style={{borderTop: '1px solid var(--z-border-default)', paddingTop: 24}}>
              <div className="stat-num"><em style={s.color ? {color: s.color} : undefined}>{s.num}</em></div>
              <div className="stat-label" style={{whiteSpace: 'pre-line'}}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop: 32, padding: 28, background: 'var(--z-surface-elevated)', borderRadius: 4}}>
          <div className="label-tag" style={{color: 'var(--z-accent-primary)'}}>The surprise</div>
          <div style={{marginTop: 10, fontWeight: 800, fontSize: 24, color: 'var(--z-text-primary)', lineHeight: 1.2}}>
            Native surface ended up small enough that <em style={{color: 'var(--z-accent-primary)', fontStyle: 'italic'}}>a single engineer can keep all of it in their head.</em>
          </div>
        </div>
      </div>
      <Footer beat="Chapter 08 · What we learned · Product" beatNum={8} />
    </div>
  );
}

// ─── S29b · Product learnings ──────────────────────────────────────
function S29b_ProductLearnings() {
  const cols = [
    {
      color: 'var(--z-accent-green)',
      title: 'Customer signals',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.2"/>
          <path d="M3 19c.6-3.4 3-5 6-5s5.4 1.6 6 5"/>
          <path d="M14 17c.5-1.8 2-3 4-3 1.6 0 3 .9 3.5 3"/>
        </svg>
      ),
      items: [
        'Minor UX changes trigger major feedback',
        'Low-usage features still matter more than metrics suggested',
      ],
    },
    {
      color: TT_COLORS.enabling,
      title: 'Migration realities',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2.5" y="5" width="19" height="13" rx="1.5"/>
          <path d="M8 21h8M12 18v3"/>
        </svg>
      ),
      items: [
        'Android fragmentation was the hardest challenge',
        'No drop in usage during the transition period',
      ],
    },
    {
      color: 'var(--z-accent-blue, #4493F8)',
      title: 'Product outcome',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l9 5-9 5-9-5 9-5z"/>
          <path d="M3 13l9 5 9-5"/>
          <path d="M3 18l9 5 9-5"/>
        </svg>
      ),
      items: [
        'Innovation accelerated after migration',
        'Cross-platform consistency was achieved',
      ],
    },
  ];

  return (
    <div className="slide product-learnings-slide" data-screen-label="08. Product learnings">
      <style>{`
        .product-learnings-slide .pl2-title {
          font: 700 44px/1.05 Compasse, sans-serif;
          color: var(--z-text-primary);
          letter-spacing: -0.015em;
          margin: 12px 0 0;
        }
        .product-learnings-slide .pl2-sub {
          font: 400 20px/1.45 Compasse, sans-serif;
          color: var(--z-text-secondary);
          margin: 16px 0 0;
          max-width: 1100px;
          text-wrap: pretty;
        }
        .product-learnings-slide .pl2-grid {
          margin-top: 44px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 26px;
        }
        .product-learnings-slide .pl2-col {
          display: flex; flex-direction: column;
        }
        .product-learnings-slide .pl2-col-head {
          display: flex; align-items: center;
          gap: 14px;
          padding-bottom: 14px;
          margin-bottom: 20px;
          border-bottom: 1.5px solid currentColor;
        }
        .product-learnings-slide .pl2-col-icon {
          width: 48px; height: 48px;
          border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
        }
        .product-learnings-slide .pl2-col-title {
          font: 800 22px/1 Compasse, sans-serif;
          letter-spacing: -0.005em;
        }
        .product-learnings-slide .pl2-items {
          display: flex; flex-direction: column;
          gap: 16px;
        }
        .product-learnings-slide .pl2-item {
          display: grid;
          grid-template-columns: 14px 1fr;
          gap: 14px;
          align-items: flex-start;
          font: 400 18px/1.45 Compasse, sans-serif;
          color: var(--z-text-primary);
          text-wrap: pretty;
        }
        .product-learnings-slide .pl2-bullet {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: currentColor;
          margin-top: 8px;
        }
        .product-learnings-slide .pl2-callout {
          position: absolute;
          left: 56px; right: 56px;
          bottom: 92px;
          padding: 14px 22px;
          border-radius: 8px;
          border: 1.5px solid var(--z-accent-blue, #4493F8);
          background: rgba(68,147,248,0.05);
          display: grid;
          grid-template-columns: 40px 1fr;
          gap: 16px;
          align-items: center;
        }
        .product-learnings-slide .pl2-callout-icon {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 1.5px solid var(--z-accent-blue, #4493F8);
          color: var(--z-accent-blue, #4493F8);
          display: inline-flex; align-items: center; justify-content: center;
        }
        .product-learnings-slide .pl2-callout-text {
          font: 500 17px/1.45 Compasse, sans-serif;
          color: var(--z-text-primary);
        }
        .product-learnings-slide .pl2-callout-text strong {
          color: var(--z-text-primary);
          font-weight: 700;
        }
      `}</style>
      <div className="pad" style={{paddingTop: 30, paddingBottom: 80}}>
        <div className="eyebrow accent">Product</div>
        <h2 className="pl2-title">Product learnings.</h2>
        <p className="pl2-sub">The win is that we can now move faster.</p>

        <div className="pl2-grid">
          {cols.map((c, i) => (
            <div key={i} className="pl2-col" style={{color: c.color}}>
              <div className="pl2-col-head">
                <span className="pl2-col-icon" style={{color: c.color, background: 'transparent', border: `1.5px solid ${c.color}`}}>
                  {c.icon}
                </span>
                <span className="pl2-col-title">{c.title}</span>
              </div>
              <div className="pl2-items">
                {c.items.map((it, ii) => (
                  <div key={ii} className="pl2-item">
                    <span className="pl2-bullet"></span>
                    <span style={{color: 'var(--z-text-primary)'}}>{it}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pl2-callout">
          <span className="pl2-callout-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15 9 22 9 16.5 13.5 18.5 21 12 16.5 5.5 21 7.5 13.5 2 9 9 9"/>
            </svg>
          </span>
          <div className="pl2-callout-text">
            The product win was not dramatic change for customers — it was <strong>stability, consistency,</strong> and the ability to <strong>move faster</strong> afterward.
          </div>
        </div>
      </div>
      <Footer beat="Chapter 08 · What we learned · Product" beatNum={8} />
    </div>
  );
}

// ─── S29 · Three decisions ──────────────────────────────────────────
function S29_Decisions() {
  const worked = [
    {t: 'Build-time overrides over runtime branches', d: 'A few difficult resolver days created years of clarity. Platform differences stay in build-time resolution instead of spreading as runtime conditionals.'},
    {t: 'A domain-organised codebase', d: 'The codebase keeps the same shape across every target and is organised by what the product is, not what it runs on. That made stream-aligned ownership possible.'},
    {t: 'Pipe into existing infrastructure, don\u2019t fork', d: 'UTV began as another project under projects/, sharing the same lib/ as the apps it would eventually replace. Existing apps kept shipping throughout the migration.'},
  ];
  const harder = [
    {t: 'Invest in build infrastructure earlier', d: 'We treated the resolver like a one-off. In practice it became the spine of the project and should have been treated as foundation from day one.'},
    {t: 'Add native experience from the start', d: 'Web React engineers can learn React Native, but platform-specific concerns benefit from engineers with native experience and muscle memory from day one.'},
  ];

  const CheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
    </svg>
  );
  const TrendIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 17 6-6 4 4 8-8"/><path d="M14 7h7v7"/>
    </svg>
  );
  const BulbIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6"/><path d="M10 22h4"/>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2.2 1.5-3.5a6 6 0 0 0-12 0c0 1.3.5 2.5 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/>
    </svg>
  );

  const Item = ({n, t, d, color}) => (
    <div style={{display: 'grid', gridTemplateColumns: '44px 1fr', gap: 16, alignItems: 'start'}}>
      <span style={{
        width: 44, height: 44,
        borderRadius: '50%',
        border: `1.5px solid ${color}`,
        color,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        font: '800 17px/1 Compasse, sans-serif',
        flexShrink: 0,
      }}>{n}</span>
      <div>
        <div style={{font: '800 19px/1.2 Compasse, sans-serif', color: 'var(--z-text-primary)', marginBottom: 8}}>{t}</div>
        <div style={{font: '400 16px/1.5 Compasse, sans-serif', color: 'var(--z-text-secondary)', textWrap: 'pretty'}}>{d}</div>
      </div>
    </div>
  );

  return (
    <div className="slide decisions-slide" data-screen-label="08. Three decisions we’d defend">
      <style>{`
        .decisions-slide .dec-title {
          font: 700 44px/1.05 Compasse, sans-serif;
          color: var(--z-text-primary);
          letter-spacing: -0.015em;
          margin: 12px 0 0;
        }
        .decisions-slide .dec-grid {
          margin-top: 36px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .decisions-slide .dec-col-head {
          display: flex; align-items: center;
          gap: 14px;
          padding-bottom: 14px;
          margin-bottom: 18px;
        }
        .decisions-slide .dec-col-icon {
          width: 44px; height: 44px;
          border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
        }
        .decisions-slide .dec-col-title {
          font: 800 22px/1 Compasse, sans-serif;
          letter-spacing: -0.005em;
        }
        .decisions-slide .dec-items {
          display: flex; flex-direction: column;
          gap: 20px;
        }
        .decisions-slide .dec-callout {
          margin-top: 18px;
          padding: 14px 22px;
          border-radius: 8px;
          border: 1.5px solid var(--z-accent-blue, #4493F8);
          background: rgba(68,147,248,0.05);
          display: grid;
          grid-template-columns: 40px 1fr;
          gap: 16px;
          align-items: center;
        }
        .decisions-slide .dec-callout-icon {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 1.5px solid var(--z-accent-blue, #4493F8);
          color: var(--z-accent-blue, #4493F8);
          display: inline-flex; align-items: center; justify-content: center;
        }
        .decisions-slide .dec-callout-text {
          font: 600 15px/1.4 Compasse, sans-serif;
          color: var(--z-text-primary);
        }
      `}</style>
      <div className="pad" style={{paddingTop: 30, paddingBottom: 80}}>
        <div className="eyebrow accent">In hindsight</div>
        <h2 className="dec-title">Three decisions we&rsquo;d defend without hesitation.</h2>
        <p style={{font: '400 19px/1.45 Compasse, sans-serif', color: 'var(--z-text-secondary)', margin: '16px 0 0', maxWidth: 1100, textWrap: 'pretty'}}>
          The architecture decisions that reduced long-term complexity were worth it. Next time, we would strengthen the foundations earlier.
        </p>

        <div className="dec-grid">
          <div>
            <div className="dec-col-head" style={{borderBottom: `1.5px solid var(--z-accent-green)`}}>
              <span className="dec-col-icon" style={{color: 'var(--z-accent-green)', background: 'rgba(63,185,80,0.10)', border: '1.5px solid rgba(63,185,80,0.45)'}}>
                <CheckIcon />
              </span>
              <span className="dec-col-title" style={{color: 'var(--z-accent-green)'}}>What worked well</span>
            </div>
            <div className="dec-items">
              {worked.map((it, i) => <Item key={i} n={i + 1} t={it.t} d={it.d} color="var(--z-accent-green)" />)}
            </div>
          </div>

          <div>
            <div className="dec-col-head" style={{borderBottom: `1.5px solid var(--z-accent-primary)`}}>
              <span className="dec-col-icon" style={{color: 'var(--z-accent-primary)', background: 'rgba(217,119,87,0.10)', border: '1.5px solid rgba(217,119,87,0.45)'}}>
                <TrendIcon />
              </span>
              <span className="dec-col-title" style={{color: 'var(--z-accent-primary)'}}>What we&rsquo;d push harder next time</span>
            </div>
            <div className="dec-items">
              {harder.map((it, i) => <Item key={i} n={i + 1} t={it.t} d={it.d} color="var(--z-accent-primary)" />)}
            </div>
          </div>
        </div>
      </div>
      <Footer beat="Chapter 08 · What we learned · Technology" beatNum={8} />
    </div>
  );
}

// ─── S30 · Where the ecosystem still lags ───────────────────────────
function S30_EcosystemLags() {
  return (
    <div className="slide" data-screen-label="08. Where the ecosystem still lags">
      <div className="pad">
        <div className="two-col-head">
          <div>
            <div className="eyebrow accent">What we learned · A pattern</div>
            <h2 className="h-headline" style={{marginTop: 16}}>
              RN treats <em>"iOS"</em> and <em>"Android"</em> as the world. They aren&rsquo;t — <em>they&rsquo;re slices.</em>
            </h2>
          </div>
          <p className="deck-text" style={{paddingBottom: 8}}>
            Apple is iOS plus tvOS, watchOS, visionOS. Android is phones plus TV, automotive, Fire OS, Vega. Step off the mobile path and you&rsquo;re on your own.
          </p>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 16}}>
          <div className="card card-elevated" style={{padding: 24}}>
            <div className="card-num">Apple beyond iOS</div>
            <p className="body-text" style={{marginTop: 8}}>No first-class RN core support. tvOS lives in the community <span className="t-mono">react-native-tvos</span> fork.</p>
          </div>
          <div className="card card-elevated" style={{padding: 24}}>
            <div className="card-num">Android beyond mobile</div>
            <p className="body-text" style={{marginTop: 8}}>Ships, but TV-specific concerns — focus management, remote-control input, leanback — aren&rsquo;t owned by the framework.</p>
          </div>
          <div className="card card-elevated" style={{padding: 24}}>
            <div className="card-num">Beyond either</div>
            <p className="body-text" style={{marginTop: 8}}>Web via community <span className="t-mono">react-native-web</span>. Vega via Amazon&rsquo;s Kepler SDK. Neither sits in RN&rsquo;s mental model.</p>
          </div>
        </div>
        <div style={{marginTop: 14, padding: '12px 18px', background: 'var(--z-accent-primary)', borderRadius: 4, color: 'var(--z-text-inverse)', fontSize: 15, fontWeight: 800, lineHeight: 1.3}}>
          Room to widen the conversation from <em style={{fontStyle: 'italic'}}>"iOS and Android"</em> to <em style={{fontStyle: 'italic'}}>"Apple, Android, Web, Vega" — as platforms.</em>
        </div>
      </div>
      <Footer beat="Chapter 08 · What we learned" beatNum={8} />
    </div>
  );
}

// ─── S33 · Roadmap (where we are now) ───────────────────────────────
function S33_Roadmap() {
  return (
    <div className="slide" data-screen-label="09. Roadmap">
      <div className="pad">
        <div className="two-col-head">
          <div>
            <div className="eyebrow accent">Production reality</div>
            <h2 className="h-headline" style={{marginTop: 16}}>
              From vision to <em>operational reality.</em>
            </h2>
          </div>
          <p className="deck-text" style={{paddingBottom: 8}}>
            What began as Amazon&rsquo;s mysterious invitation has become Zattoo&rsquo;s operational reality.
          </p>
        </div>
        <div className="timeline" style={{['--cols']: 6, marginTop: 32}}>
          <div className="tnode live">
            <div className="tdate">Sep 2025 · Live</div>
            <div className="ttitle t-teal">Android TV</div>
            <div className="tnote">First RN production app.</div>
          </div>
          <div className="tnode live">
            <div className="tdate">Oct 2025 · Live</div>
            <div className="ttitle t-teal">Amazon Vega</div>
            <div className="tnote">Pilot-partner commitment fulfilled.</div>
          </div>
          <div className="tnode live">
            <div className="tdate">Apr 2026 · Live</div>
            <div className="ttitle t-teal">Amazon Fire OS</div>
            <div className="tnote">Existing Fire TV install base.</div>
          </div>
          <div className="tnode now beta">
            <div className="tdate">Jun 2026 · Beta</div>
            <div className="ttitle t-accent">Apple tvOS</div>
            <div className="tnote">Plus active dev: Samsung, LG, Panasonic, Vidaa.</div>
          </div>
          <div className="tnode now dev">
            <div className="tdate">Fall 2026 · In dev</div>
            <div className="ttitle t-accent">Web TV</div>
            <div className="tnote">webOS, Tizen, Vidaa.</div>
          </div>
          <div className="tnode">
            <div className="tdate">Next</div>
            <div className="ttitle">Web &amp; Mobile</div>
            <div className="tnote">Responsive strategy.</div>
          </div>
        </div>
        <div style={{marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
          <div className="card card-elevated" style={{padding: 24}}>
            <div className="card-num">The 80% rule</div>
            <p className="body-text" style={{marginTop: 8, fontSize: 16}}>Not aiming for 100% reuse between big screen and mobile. <strong>80% shared, 20% platform-specific where UX demands it.</strong> Pragmatic over pure.</p>
          </div>
          <div className="card card-elevated" style={{padding: 24}}>
            <div className="card-num">Continuous evolution</div>
            <p className="body-text" style={{marginTop: 8, fontSize: 16}}>The squad+chapter model evolves as our platform footprint grows. <strong>Annual review of org design.</strong></p>
          </div>
        </div>
      </div>
      <Footer beat="Chapter 09 · Where we are now" beatNum={9} />
    </div>
  );
}

// ─── S34 · Featured on Amazon's Vega Developer Portal ─────────────────
// TODO: add a QR code linking to the Amazon case-study article
//   (https://developer.amazon.com/apps-and-games/blogs/2026/03/how-vega-enabled-zattoo-streamline-tv-app-development)
function S34_AmazonFeature() {
  return (
    <div className="slide amazon-feature-slide" data-screen-label="09. Featured on Amazon Vega">
      <style>{`
        .amazon-feature-slide { position: relative; overflow: hidden; }

        /* Portal: positioned absolutely on the right, height-aligned with the title */
        .amazon-feature-slide .af-portal {
          position: absolute;
          top: 56px;
          right: 280px;
          bottom: 80px; /* leave room for footer */
          z-index: 0;
        }
        .amazon-feature-slide .af-portal img {
          display: block;
          height: 100%;
          width: auto;
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 6px;
          box-shadow:
            0 18px 40px rgba(0,0,0,0.55),
            0 6px 14px rgba(0,0,0,0.4);
          background: #1a3a5c;
        }
        .amazon-feature-slide .af-portal-highlight {
          position: absolute;
          left: -6px; right: -6px;
          top: 76.5%;
          height: 13.5%;
          border: 2px solid var(--z-accent-primary);
          border-radius: 4px;
          box-shadow:
            0 0 0 5px rgba(255,106,44,0.22),
            0 0 28px rgba(255,106,44,0.55);
          pointer-events: none;
          animation: afPulse 2.4s ease-in-out infinite;
        }
        @keyframes afPulse {
          0%, 100% { box-shadow: 0 0 0 5px rgba(255,106,44,0.18), 0 0 22px rgba(255,106,44,0.4); }
          50%      { box-shadow: 0 0 0 7px rgba(255,106,44,0.28), 0 0 36px rgba(255,106,44,0.7); }
        }

        .amazon-feature-slide .af-stage {
          position: relative;
          margin-top: 28px;
          height: 480px;
        }

        /* Magnifier (case-study card, framed) */
        .amazon-feature-slide .af-mag-wrap {
          position: absolute;
          left: 0;
          top: 40px;
          width: 700px;
          z-index: 2;
        }
        .amazon-feature-slide .af-mag-lens {
          position: relative;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.18);
          box-shadow:
            0 0 0 2px rgba(255,106,44,0.55),
            0 28px 64px rgba(0,0,0,0.6),
            0 8px 22px rgba(0,0,0,0.4);
          overflow: hidden;
          background: #1a3a5c;
        }
        .amazon-feature-slide .af-mag-lens img {
          display: block;
          width: 100%;
          height: auto;
        }
        .amazon-feature-slide .af-mag-url {
          position: absolute;
          top: 14px; left: 14px;
          padding: 6px 12px;
          background: rgba(13,13,13,0.86);
          backdrop-filter: blur(4px);
          border-radius: 999px;
          font: 800 11px/1 Compasse, sans-serif;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--z-accent-primary);
          z-index: 3;
        }
      `}</style>

      <div className="af-portal">
        <img src="assets/vega-developer-portal-2.jpg" alt="Amazon Vega Developer Portal — full page" />
        <div className="af-portal-highlight" aria-hidden="true"></div>
      </div>

      <div className="pad" style={{paddingTop: 50, paddingBottom: 80}}>
        <div className="eyebrow accent" style={{marginBottom: 14}}>Our story, told by Amazon</div>
        <h2 className="h-section" style={{fontSize: 64, lineHeight: 1.0, margin: 0}}>
          Success&nbsp;story<span style={{color: 'var(--z-accent-primary)'}}>.</span>
        </h2>
        <p style={{font: '400 22px/1.4 Compasse, sans-serif', color: 'var(--z-text-secondary)', marginTop: 14, maxWidth: 740}}>
          Featured as a case study on the <em style={{color: 'var(--z-accent-primary)', fontStyle: 'italic'}}>Vega Developer Portal.</em>
        </p>

        <div className="af-stage">
          <div className="af-mag-wrap" aria-label="Zoomed case study card">
            <div className="af-mag-lens">
              <img src="assets/vega-developer-portal-1.jpg" alt="How Vega enabled Zattoo to streamline TV app development — case study card" />
            </div>
          </div>
        </div>
      </div>
      <Footer beat="Chapter 09 · Where we are now" beatNum={9} />
    </div>
  );
}
Object.assign(window, {
  VENUES, nextVenueId, todayISO, venueStore, VenueBrand,
  Footer, ChapterDivider, Chapter01_Zattoo, Chapter02_Challenge, Chapter03_Failed, Chapter04_Catalyst, Chapter05_Starting, Chapter06_GreenLight, Chapter07_Migration, Chapter08_Learned, Chapter09_WhereNow, S19b_VegaFirstBoot, S22b_TestSuite,
  S03_Everywhere, S04_Moments, S05_Niche, S06_Matrix, S08_Quote, S09_Duplication, S10_PWA, S11_Candidates,
  S13_NDA, S14_WhyMatters, S15_SWOT, S16_StrategicImportance, S23c_OneCodebase, S17_PoC, S17b_PoCScreens, S18_Signal, S18b_RIF,
  S20_Monorepo, S21_Overrides, S22_Native, S23_Domains, S23b_Ownership, S23d_ProductLook, S23f_SmartIteration, S23e_BetaFeedback, S23g_TransformingOrg, S23h_TeamTopologies, S23i_Journey, S23i2_OneTeam, S23i3_TwoTeams, S23j_TopologyInterim, S23k_TopologyE2E, S24_VegaWeb,
  S28_Verdict, S29_Decisions, S29b_ProductLearnings, S30_EcosystemLags, S33_Roadmap, S34_AmazonFeature,
});
