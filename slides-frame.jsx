// React Summit Talk — slides specific to the conference variant
// Reuses content slides from slides-1..4.jsx
// Defines SummitCover, SummitHook, SummitClosing
// Uses SummitFooter for tighter chrome (no pager, React Summit branding)

const SUMMIT_TOTAL = 20;

function SummitFooter({ beat }) {
  return (
    <div className="deck-footer">
      <div className="crumb">
        <span className="pageno">— / 20</span>
        <span style={{margin: '0 12px', opacity: 0.4}}>·</span>
        <span>{beat}</span>
      </div>
      <div className="brand"></div>
    </div>
  );
}

// 03 — Whoami: bento identity board
function SummitMe() {
  const tiles = [
    {
      img: 'assets/me/work-zattoo.jpg',
      label: '@ work',
      caption: 'Principal Engineer at Zattoo.',
      pos: '50% 30%',
    },
    {
      img: 'assets/me/react-berlin.jpg',
      label: '@ community',
      caption: 'Co-organising React Berlin Meetup.',
      pos: '55% 30%',
    },
    {
      img: 'assets/me/kids.jpg',
      label: '@ dad',
      caption: 'Daughter Iev, son Dan.',
      pos: '60% 35%',
    },
    {
      img: 'assets/me/wife-travel.jpg',
      label: '@ travel',
      caption: 'On the trail with my wife.',
      pos: '30% 40%',
    },
    {
      img: 'assets/me/dog-bjorn.jpg',
      label: '@ doggo',
      caption: 'His name is Björn.',
      pos: '70% 50%',
    },
  ];
  return (
    <div className="slide me-slide" data-screen-label="03 Whoami" data-build-max="5">
      <style>{`
        .me-slide { position: relative; overflow: hidden; }
        .me-slide .me-pad {
          padding: 48px 56px 48px;
          height: 100%; box-sizing: border-box;
          display: grid;
          grid-template-columns: 0.72fr 1fr;
          gap: 14px;
          padding-bottom: 84px; /* clear footer */
        }
        .me-slide .me-portrait {
          position: relative; overflow: hidden;
          background: #0d0d0d;
          border-radius: 4px;
        }
        .me-slide .me-portrait img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: 50% 22%;
        }
        .me-slide .me-portrait .portrait-shade {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0) 38%, rgba(0,0,0,0.78) 100%);
        }
        .me-slide .me-name {
          position: absolute;
          left: 22px; right: 22px; bottom: 22px;
          color: #fff;
        }
        .me-slide .me-eyebrow {
          font: 800 11px/1 Compasse, sans-serif;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: var(--z-accent-primary);
          margin-bottom: 10px;
        }
        .me-slide .me-hello {
          font: 700 72px/0.98 Compasse, sans-serif;
          letter-spacing: -0.02em;
          margin: 0;
        }
        .me-slide .me-role {
          font: 400 16px/1.35 Compasse, sans-serif;
          color: rgba(255,255,255,0.78);
          max-width: 320px;
        }

        /* Bento grid: 5 tiles, asymmetric layout. */
        .me-slide .me-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 14px;
          min-height: 0;
        }
        .me-slide .me-tile {
          position: relative; overflow: hidden;
          background: #0d0d0d;
          border-radius: 4px;
          opacity: 0;
          transform: translateY(10px);
          transition:
            opacity 480ms cubic-bezier(.2,.8,.2,1),
            transform 560ms cubic-bezier(.2,.85,.2,1.02);
          will-change: opacity, transform;
        }
        .me-slide[data-step="1"] .me-tile[data-idx="1"],
        .me-slide[data-step="2"] .me-tile[data-idx="1"],
        .me-slide[data-step="2"] .me-tile[data-idx="2"],
        .me-slide[data-step="3"] .me-tile[data-idx="1"],
        .me-slide[data-step="3"] .me-tile[data-idx="2"],
        .me-slide[data-step="3"] .me-tile[data-idx="3"],
        .me-slide[data-step="4"] .me-tile[data-idx="1"],
        .me-slide[data-step="4"] .me-tile[data-idx="2"],
        .me-slide[data-step="4"] .me-tile[data-idx="3"],
        .me-slide[data-step="4"] .me-tile[data-idx="4"],
        .me-slide[data-step="5"] .me-tile {
          opacity: 1;
          transform: translateY(0);
        }
        /* Bento spans: 3 tiles top row (zattoo, react, kids); bottom row
           split into two — wife (1fr) + björn (2fr wide). */
        .me-slide .me-tile[data-idx="4"] { grid-column: 1 / span 1; }
        .me-slide .me-tile[data-idx="5"] { grid-column: 2 / span 2; }

        .me-slide .me-tile img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
        }
        .me-slide .me-tile-shade {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.78) 100%);
        }
        .me-slide .me-tile-label {
          position: absolute; top: 12px; left: 14px;
          font: 800 9.5px/1 Compasse, sans-serif;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #fff;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          padding: 6px 9px;
          border-radius: 2px;
        }
        .me-slide .me-tile-caption {
          position: absolute;
          left: 16px; right: 16px; bottom: 12px;
          font: 600 14px/1.25 Compasse, sans-serif;
          color: #fff;
          letter-spacing: -0.005em;
          text-wrap: pretty;
        }
      `}</style>
      <div className="me-pad">
        <div className="me-portrait">
          <img src="assets/me/profile.jpg" alt="Portrait" />
          <div className="portrait-shade"></div>
          <div className="me-name">
            <h2 className="me-hello"><span style={{color: 'var(--z-accent-primary)'}}>Hi.</span><br/>I&rsquo;m Bo.</h2>
          </div>
        </div>
        <div className="me-grid">
          {tiles.map((t, i) => (
            <div key={i} className="me-tile" data-idx={i + 1}>
              <img src={t.img} alt={t.label} style={{objectPosition: t.pos}} />
              <div className="me-tile-shade"></div>
              <div className="me-tile-label">{t.label}</div>
              <div className="me-tile-caption">{t.caption}</div>
            </div>
          ))}
        </div>
      </div>
      <SummitFooter beat="Whoami" />
    </div>
  );
}

// 01 — Summit Cover
function SummitCover() {
  return (
    <div className="slide" data-screen-label="01 Cover">
      <div className="cover-pad">
        <div className="cover-top" style={{justifyContent: 'flex-end'}}>
          <div className="cover-brand" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: 1}}>
            <div>zattoo<span className="dot">.</span></div>
            <div style={{fontSize: 13, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--z-text-secondary)', marginTop: 6}}>Case study</div>
          </div>
        </div>
        <div>
          <h1 className="h-display">
            The Fourth<br/>
            <span className="t-magic" style={{textTransform: 'none'}}>Platform<span style={{color: 'var(--z-text-primary)'}}>.</span></span>
          </h1>
          <p className="cover-lede">
            How Vega got us surprisingly close to <em style={{color: 'var(--z-accent-primary)'}}>"write once, run everywhere."</em>
          </p>
        </div>
        <div className="cover-footer">
          <span>Native → React Native · 2022 → 2026</span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

// 02 — Hook: three cards with inline color highlights
function SummitHook() {
  const beats = [
    {
      pre: <>Three platforms for decades:<br/>Web. Android. Apple.<br/>Each with its </>,
      hi: <><span style={{color: 'var(--z-accent-red)', fontWeight: 700}}>own codebase</span><span style={{color: 'var(--z-text-secondary)', fontWeight: 400}}>. Its </span><span style={{color: 'var(--z-accent-red)', fontWeight: 700}}>own team</span><span style={{color: 'var(--z-text-secondary)', fontWeight: 400}}>. Its </span><span style={{color: 'var(--z-accent-red)', fontWeight: 700}}>own release schedule</span><span style={{color: 'var(--z-text-secondary)', fontWeight: 400}}>.</span></>,
      post: '',
      color: 'var(--z-accent-red)',
    },
    {
      pre: <>Then, a few years ago,<br/></>,
      hi: <>Amazon showed us <span style={{textTransform: 'none', fontWeight: 700}}>Vega</span>.</>,
      post: <><br/>A new operating system where React Native is the primary UI framework.</>,
      color: 'var(--z-accent-yellow)',
    },
    {
      pre: <><span style={{fontWeight: 700, color: 'var(--z-text-primary)'}}>The Fourth Platform</span> changed how we ship to the other three.<br/>Today: </>,
      hi: 'one codebase, on every screen, shipped every sprint.',
      post: '',
      color: 'var(--z-accent-green)',
    },
  ];
  return (
    <div className="slide hook-slide" data-screen-label="02 Overview" data-build-max="4">
      <style>{`
        .hook-slide .hook-block,
        .hook-slide .hook-footer-row > * {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 520ms cubic-bezier(.2,.8,.2,1), transform 520ms cubic-bezier(.2,.8,.2,1);
          will-change: opacity, transform;
        }
        .hook-slide[data-step="1"] .hook-block:nth-child(1),
        .hook-slide[data-step="2"] .hook-block:nth-child(-n+2),
        .hook-slide[data-step="3"] .hook-block:nth-child(-n+3),
        .hook-slide[data-step="4"] .hook-block,
        .hook-slide[data-step="4"] .hook-footer-row > * {
          opacity: 1;
          transform: translateY(0);
        }
        .hook-slide[data-step="4"] .hook-footer-row > :nth-child(2) {
          transition-delay: 160ms;
        }
      `}</style>
      <div className="pad">
        <div className="eyebrow accent" style={{marginBottom: 24}}>Overview</div>
        <h2 className="h-section" style={{fontSize: 56, maxWidth: 1100, marginBottom: 44, lineHeight: 1.05}}>
          <span className="t-magic" style={{color: 'var(--z-text-primary)', textTransform: 'none'}}>The Fourth Platform</span> reshaped<br/>how we ship to the other&nbsp;three.
        </h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48}}>
          {beats.map((b, i) => (
            <div key={i} className="hook-block" style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
              <p style={{font: '400 22px/1.45 Compasse, sans-serif', color: 'var(--z-text-secondary)', margin: 0}}>
                {b.pre}{b.hi !== '' && <strong style={{color: b.color, fontWeight: 700}}>{b.hi}</strong>}{b.post}
              </p>
            </div>
          ))}
        </div>
        <div className="hook-footer-row" style={{marginTop: 'auto', paddingTop: 24, display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap'}}>
          <span style={{fontWeight: 800, fontSize: 16, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--z-text-secondary)'}}>
            Three parts to this story
          </span>
          <span style={{fontWeight: 800, fontSize: 16, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--z-text-primary)'}}>
            Tech <span style={{color: 'var(--z-accent-primary)'}}>·</span> Product <span style={{color: 'var(--z-accent-primary)'}}>·</span> Org
          </span>
        </div>
      </div>
      <SummitFooter beat="Overview" />
    </div>
  );
}

// Closing for the summit
function SummitClosing() {
  return (
    <div className="slide" data-screen-label="20 Closing">
      <div className="cover-pad">
        <div className="cover-top">
          <div className="cover-brand">zattoo<span className="dot">.</span></div>
          <div className="cover-num">End</div>
        </div>
        <div>
          <div className="eyebrow accent" style={{marginBottom: 24}}>So — write once, run everywhere?</div>
          <h1 className="h-display" style={{fontSize: 132}}>
            <em>Surprisingly</em><br/>
            close.
          </h1>
          <p className="cover-lede" style={{maxWidth: 920}}>
            Apple. Android. Web. <em>Vega.</em> One codebase, four platforms, and a teams that can move across all of them.
          </p>
        </div>
        <div className="cover-footer">
          <span className="live-dot is-prod">In production</span>
          <span>Thank you · @zattoo</span>
        </div>
      </div>
    </div>
  );
}

// Helper: wrap any imported content slide to suppress its footer pager
// (We can't easily override the imported slide's hardcoded Footer n value,
// so we use CSS to hide pager + reset brand for the summit variant.)

Object.assign(window, {
  SUMMIT_TOTAL,
  SummitFooter, SummitCover, SummitHook, SummitMe, SummitClosing,
});
