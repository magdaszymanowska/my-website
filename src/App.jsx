import { useState, useEffect, useRef } from 'react'
import DarkVeil from './components/DarkVeil'
import RotatingText from './components/RotatingText'
import Plasma from './components/Plasma'
import MatrixRain from './components/MatrixRain'
import MatrixVeil from './components/MatrixVeil';
import ConstellationBackground from './components/ConstellationBackground';

function App() {
  const isMobile = window.innerWidth < 768
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="antialiased" style={{ backgroundColor: '#0a0a0a', color: '#e5e5e5' }}>

      
      {/*<div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <DarkVeil hueShift={0} noiseIntensity={0} scanlineIntensity={0} speed={1.0} scanlineFrequency={3.2} warpAmount={2.1} />
      </div>*/}

      {/*<div style={{ position: 'fixed', inset: 0, zIndex: 0, width: '100%', height: '100%' }}>
          <Plasma
            color="#321593"
            speed={1}
            direction="forward"
            scale={1}
            opacity={1}
            mouseInteractive={false}
          />
      </div>*/}

      
            <ConstellationBackground
            count={window.innerWidth < 768 ? 40 : 80}
            connectionDistance={150}
            nodeColor="rgba(136, 196, 255, 1)"
            lineColor="rgba(136, 196, 255, 0.15)"
            mouseRadius={100}
            glow={true}
          />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* NAVIGATION */}
        <nav style={{
          background: 'rgba(10,10,10,0.4)', backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)',
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50
        }}>
          <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="#" style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.05em', textDecoration: 'none' }}></a>

            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8">
              {['#|Home', '#projects|Projects', '#contact|Contact'].map(item => {
                const [href, label] = item.split('|')
                return (
                  <a key={label} href={href} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = 'white'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}>
                    {label}
                  </a>
                )
              })}
            </div>

            <div className="hidden md:flex items-center gap-5">
              {[['fas fa-envelope', 'mailto:madzialunia@gmail.com'], ['fab fa-github', 'https://github.com/magdaszymanowska'], ['fab fa-linkedin', 'https://www.linkedin.com/in/magdalena-szymanowska-90748a222/']].map(([icon, href]) => (
                <a key={icon} href={href} target={href.startsWith('http') ? '_blank' : undefined}
                  style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'white'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>
                  <i className={icon}></i>
                </a>
              ))}
            </div>

            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '0.25rem' }}>
              <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`} style={{ fontSize: '1.25rem' }}></i>
            </button>
          </div>

          {menuOpen && (
            <div style={{ background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem 1.5rem 2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {['#|Home', '#projects|Projects', '#contact|Contact'].map(item => {
                  const [href, label] = item.split('|')
                  return <a key={label} href={href} onClick={() => setMenuOpen(false)} style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', fontWeight: 500, textDecoration: 'none' }}>{label}</a>
                })}
                <div style={{ display: 'flex', gap: '1.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <a href="mailto:madzialunia@gmail.com" style={{ color: 'rgba(255,255,255,0.5)' }}><i className="fas fa-envelope" style={{ fontSize: '1.25rem' }}></i></a>
                  <a href="https://github.com/magdaszymanowska" style={{ color: 'rgba(255,255,255,0.5)' }}><i className="fab fa-github" style={{ fontSize: '1.25rem' }}></i></a>
                  <a href="https://www.linkedin.com/in/magdalena-szymanowska-90748a222/" style={{ color: 'rgba(255,255,255,0.5)' }}><i className="fab fa-linkedin" style={{ fontSize: '1.25rem' }}></i></a>
                </div>
              </div>
            </div>
          )}
        </nav>

{/* HERO — replace your existing hero section with this */}
<section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '6rem 1.5rem 4rem' }}>

{/*
   Matrix rain 
  <MatrixRain opacity={0.07} />
*/}

  {/* Dark radial overlay */}
  <div aria-hidden style={{
    position: 'absolute', inset: 0, pointerEvents: 'none',
    background: 'radial-gradient(ellipse 90% 80% at 50% 50%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.25) 100%)',
  }} />

  {/* Bottom fade */}
  <div aria-hidden style={{
    position: 'absolute', bottom: 0, left: 0, right: 0, height: '220px', pointerEvents: 'none',
    background: 'linear-gradient(to bottom, transparent, #0a0a0a)',
  }} />

  {/* Main content */}
    <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '52rem', margin: '0 auto', marginTop: isMobile ? '-9rem' : '0' }}>
    {/* Name */}
    <h1 style={{ margin: '0 0 1.5rem', fontSize: 'clamp(3.5rem, 10vw, 7rem)', fontWeight: 600, lineHeight: 1, letterSpacing: '-0.04em', color: 'white' }}>
      Hi, I'm Magda.
    </h1>

    {/* Thin divider */}
    <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.15)', marginBottom: '1.5rem' }} />

    {/* "I build [rotating] AI" — one line, glow on rotating word */}
    <div style={{
      display: 'flex', alignItems: 'baseline', justifyContent: 'center',
      flexWrap: 'wrap', gap: '0 0.35em',
      marginBottom: '2.25rem',
      fontSize: 'clamp(1.4rem, 3.5vw, 2.25rem)',
      fontWeight: 600, color: 'rgba(255,255,255,0.85)', lineHeight: 1.3,
    }}>
      <span>I build</span>

      {/* Glow wrapper */}
      <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'baseline' }}>
        {/* Blurry glow behind the word */}
        <span aria-hidden style={{
          position: 'absolute',
          inset: '-4px -8px',
          background: 'rgba(255,255,255,0.08)',
          filter: 'blur(12px)',
          borderRadius: '8px',
          pointerEvents: 'none',
        }} />
        <RotatingText
          texts={['Efficient', 'Responsible', 'Reliable', 'Safe', 'Ethical']}
          mainClassName="overflow-visible"
          splitLevelClassName="overflow-hidden pb-1"
          staggerFrom="last"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-120%' }}
          staggerDuration={0.03}
          transition={{ type: 'spring', damping: 28, stiffness: 380 }}
          rotationInterval={2000}
          style={{
            color: 'white',
            fontWeight: 700,
            fontSize: 'clamp(1.4rem, 3.5vw, 2.25rem)',
            display: 'inline-flex',
            alignItems: 'baseline',
            background: 'none',
            border: 'none',
            padding: '0 2px',
            position: 'relative',
            zIndex: 1,
          }}
        />
      </span>

      <span>AI.</span>
    </div>

    {/* Description */}
    <p style={{
      margin: '0 0 2rem',
      fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
      fontWeight: 400,
      color: 'rgba(255,255,255,0.35)',
      lineHeight: 1.8,
      maxWidth: '28rem',
      letterSpacing: '0.01em',
    }}>
      Custom automation and AI workflows that save hours, without giving up control.
    </p>

    {/* Thin divider */}
    <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '2rem' }} />

    {/* CTAs */}
    <div style={{ display: 'flex', gap: '0.9rem', justifyContent: 'center', flexWrap: 'wrap' }}>
      <a href="#contact" style={{
        background: 'white', color: 'black',
        padding: '0.85rem 2rem', borderRadius: '0.5rem',
        fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none',
        transition: 'transform 0.15s, opacity 0.15s',
      }}
        onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)' }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}>
        Work with me
      </a>
      <a href="#projects" style={{
        border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.65)',
        padding: '0.85rem 2rem', borderRadius: '0.5rem',
        fontWeight: 500, fontSize: '0.875rem', textDecoration: 'none',
        transition: 'border-color 0.15s, transform 0.15s, color 0.15s',
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'translateY(-2px)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.transform = 'translateY(0)' }}>
        View projects
      </a>
    </div>

  </div>



</section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-24" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
          <div className="max-w-screen-xl mx-auto px-6">
            <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', display: 'block', textAlign: 'center', marginBottom: '1rem' }}>
              Portfolio
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: 'white', textAlign: 'center', marginBottom: '3.5rem' }}>
              Selected Works
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { title: 'Local Semantic Search', sub: 'Private Image Search', desc: 'Finds any photo instantly just by describing it. Runs 100% locally to ensure your personal memories stay private.', tags: ['Python', 'Flask', 'PyTorch'] },
                { title: 'Custom GPTs Hub', sub: 'Personal AI Manager', desc: 'Creates specialized chatbots tailored to your specific needs. Cuts costs by letting you bring your own keys and data.', tags: ['OpenAI', 'React', 'Flask'] },
                { title: 'Smart Schedule Optimizer', sub: 'Workforce Automation', desc: 'Reduces scheduling time from 3h to 3 seconds. Generates personalized schedules that adapt to employee preferences automatically.', tags: ['Django', 'Python', 'JavaScript'] },
              ].map(project => (
                <div key={project.title} style={{
                  border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)',
                  borderRadius: '0.75rem', padding: '1.75rem', transition: 'border-color 0.2s, background 0.2s'
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                >
                  <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginBottom: '0.5rem', fontWeight: 500 }}>{project.sub}</p>
                  <h3 style={{ fontWeight: 600, fontSize: '1.1rem', color: 'white', marginBottom: '0.75rem' }}>{project.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{project.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem' }}>
                    {project.tags.map(tag => (
                      <span key={tag} style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)', borderRadius: '9999px', padding: '0.2rem 0.65rem', fontSize: '0.75rem', fontWeight: 500 }}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOCUS — commented out for later
        <section id="focus"> ... </section>
        */}

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: '32rem', margin: '0 auto', padding: '0 1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>Let's Connect</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: 'white', marginBottom: '1.5rem' }}>Ready to collaborate?</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.35)' }}>
                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <i className="far fa-clock" style={{ color: 'rgba(255,255,255,0.6)' }}></i>
                  Usually respond within <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>24 hours</span>
                </p>
                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <i className="fas fa-bolt" style={{ color: 'rgba(255,255,255,0.6)' }}></i>
                  Open to <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>freelance & partnerships</span>
                </p>
              </div>
            </div>

            <form action="https://formsubmit.co/madzialunia@gmail.com" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="hidden" name="_captcha" value="false" />
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.4rem' }}>Name</label>
                  <input type="text" name="name" required placeholder="Your name" style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '0.375rem', color: 'white', fontSize: '0.875rem', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.4rem' }}>Email</label>
                  <input type="email" name="email" required placeholder="your@email.com" style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '0.375rem', color: 'white', fontSize: '0.875rem', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.4rem' }}>Message</label>
                <textarea name="message" required placeholder="Tell me about your idea..." style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '0.375rem', color: 'white', minHeight: '130px', fontSize: '0.875rem', resize: 'vertical', boxSizing: 'border-box' }} />
              </div>
              <button type="submit" style={{ backgroundColor: 'white', color: 'black', width: '100%', padding: '0.8rem', borderRadius: '0.375rem', fontWeight: 600, fontSize: '0.875rem', border: 'none', cursor: 'pointer', transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                Send Message
              </button>
            </form>

            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <a href="mailto:madzialunia@gmail.com" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}>
                or email me directly
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ padding: '2rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()} Magda. All rights reserved.
          </p>
        </footer>

      </div>
    </div>
  )
}

export default App