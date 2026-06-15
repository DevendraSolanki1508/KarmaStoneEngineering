import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react'
import { useRef, useState } from 'react'
import { ArrowDown, Mail, Phone, MapPin } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────
   SMOOTH SCROLL HELPER
───────────────────────────────────────────────────────────── */

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */

const competencies = [
  {
    id: 'cnc',
    symbol: '⬡',
    title: 'CNC Precision Milling',
    tag: '0.1 mm Tolerances',
    body: 'Full simultaneous milling delivers complex undercuts, sweeping curves, and parametric geometries with sub-millimetre repeatability across every unit — guaranteed.',
  },
  {
    id: 'parametric',
    symbol: '◈',
    title: 'Parametric & Fluted Acoustics',
    tag: '3D Surface Engineering',
    body: 'From algorithmically-defined fluted panels to bespoke acoustic forms — we mill directly from your Rhino or Grasshopper files with zero interpretation loss.',
  },
  {
    id: 'material',
    symbol: '◇',
    title: 'Indian Material Expertise',
    tag: 'Source-Direct Access',
    body: 'Absolute Black Granite, Indian Green Marble, Kota Blue, Rajasthan Makrana — quarry-connected for provenance and grade consistency on every project.',
  },
]

const processSteps = [
  {
    num: '01',
    title: 'CAD & Feasibility',
    body: 'Submit DWG/3DM files. Our engineers return a full DFM review and fixed-price quote within 48 hours.',
  },
  {
    num: '02',
    title: 'Prototyping & Milling',
    body: 'CNC milling commences on approved stone blocks. First-off prototypes verified before full-run production.',
  },
  {
    num: '03',
    title: 'Dry-Lay Verification',
    body: 'Every assembly is dry-laid on our factory floor, dimensionally checked against CAD, and captured in continuous 4K video for your remote sign-off.',
  },
  {
    num: '04',
    title: 'DDP Logistics',
    body: 'Delivered Duty Paid to your site — fully insured, crated, and labelled with piece-by-piece installation drawings. Zero import paperwork.',
  },
]

const faqCategories = [
  {
    category: 'Project Scope & Engineering',
    items: [
      {
        q: 'Do you provide shop drawings and ticketing, or just the fabrication?',
        a: 'We handle the complete engineering process. You provide the architectural plans, and our in-house engineering team converts them into highly detailed, piece-by-piece shop drawings and installation tickets. Nothing goes to the CNC machines until your team reviews and approves the exact specifications.',
      },
      {
        q: 'Is there a minimum project size or order quantity?',
        a: 'To maximize the cost-efficiency of ocean freight and our dedicated engineering resources, we specialize in full-scale commercial, hospitality, and luxury residential developments. Typically, this means a minimum of one full shipping container, though we review every project based on its complexity and scope.',
      },
      {
        q: 'Do you install the stone on-site?',
        a: 'We are an architectural fabrication and engineering partner, not an installation company. We engineer, mill, and map the stone, delivering it ready-to-install with precise ticketing so your local, trusted installation crews can execute the final build seamlessly and efficiently.',
      },
    ],
  },
  {
    category: 'Logistics & Protection',
    items: [
      {
        q: 'What happens if a piece of stone is damaged during international transit?',
        a: 'While rare — thanks to our custom, export-grade A-frame crating — we plan for every contingency. All shipments are fully insured. More importantly, we hold reserve material from your specific stone blocks at our facility until your project is installed. If a piece is damaged, we immediately mill a perfectly vein-matched replacement and expedite it to your site.',
      },
      {
        q: 'How does customs clearance and delivery work?',
        a: "You don't need to be a logistics expert. We manage the freight forwarding, customs documentation, and routing to your nearest port or directly to your job site. We provide clear tracking and coordinate with your receiving team throughout.",
      },
    ],
  },
  {
    category: 'Financials & Partnership',
    items: [
      {
        q: 'How are international payments and terms structured?',
        a: 'We operate using standard, secure international commercial terms. A typical structure involves an initial deposit to secure the premium stone blocks and commence the engineering phase. Subsequent milestone payments are tied to clear deliverables, with the final balance due only after you have signed off on the live dry-lay inspection — right before the shipment leaves our facility.',
      },
      {
        q: 'How quickly can you turn around an estimate from our CAD files?',
        a: 'Once we receive your architectural drawings and material specifications, our estimating team typically provides a comprehensive, transparent proposal within 3 to 5 business days, depending on the complexity and scale of the project.',
      },
    ],
  },
]

/* ─────────────────────────────────────────────────────────────
   BACKGROUND IMAGE — Ken Burns zoom + scroll parallax
───────────────────────────────────────────────────────────── */

function BackgroundImage() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <img
        src="/An_evening_view_of_a_202606151519.jpeg"
        alt=""
        aria-hidden="true"
        className="bg-zoom-img"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          willChange: 'transform',
        }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FAQ ACCORDION ITEM
───────────────────────────────────────────────────────────── */

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: 'easeOut' }}
      className={`faq-item rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
        open ? 'faq-item--open' : ''
      }`}
      onClick={() => setOpen(!open)}
    >
      {/* Question row */}
      <div className="flex items-center justify-between gap-4 px-6 py-5 md:px-7 md:py-6">
        <span
          className="text-base md:text-lg text-white font-semibold leading-snug"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {q}
        </span>
        {/* +/× toggle button */}
        <span
          className={`faq-toggle shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
            open ? 'bg-amber-400/15 border-amber-300/50' : 'bg-white/8 border-white/20'
          } border`}
          style={{ minWidth: 36 }}
        >
          <svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            className={`transition-transform duration-300 ${open ? 'rotate-45' : 'rotate-0'}`}
          >
            <path d="M7 1v12M1 7h12" stroke={open ? '#FCD34D' : 'rgba(255,255,255,0.75)'} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>
      </div>

      {/* Answer — animated height */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p
              className="px-6 pb-6 md:px-7 md:pb-8 text-base md:text-lg text-white/80 leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   MOTION VARIANTS
───────────────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: 'easeOut' },
  }),
}

/* ─────────────────────────────────────────────────────────────
   LOGO SVG
───────────────────────────────────────────────────────────── */

function LogoMark({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
      viewBox="0 0 256 256" fill="currentColor" className={className}>
      <path d="M 4.688 136 C 68.373 136 120 187.627 120 251.312 C 120 252.883 119.967 254.445 119.905 256 L 0 256 L 0 136.096 C 1.555 136.034 3.117 136 4.688 136 Z M 251.312 136 C 252.883 136 254.445 136.034 256 136.096 L 256 256 L 136.095 256 C 136.032 254.438 136.001 252.875 136 251.312 C 136 187.627 187.627 136 251.312 136 Z M 119.905 0 C 119.967 1.555 120 3.117 120 4.688 C 120 68.373 68.373 120 4.687 120 C 3.117 120 1.555 119.967 0 119.905 L 0 0 Z M 256 119.905 C 254.445 119.967 252.883 120 251.312 120 C 187.627 120 136 68.373 136 4.687 C 136 3.117 136.033 1.555 136.095 0 L 256 0 Z" />
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────
   SECTION LABEL
───────────────────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-[0.35em] text-white/55 mb-4">
      {children}
    </p>
  )
}

/* ─────────────────────────────────────────────────────────────
   APP
───────────────────────────────────────────────────────────── */

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const videoScale     = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const videoOpacity   = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.85])

  return (
    <main
      className="relative w-full min-h-screen overflow-x-hidden flex flex-col items-center font-sans selection:bg-white/20 selection:text-white"
      style={{ fontFamily: '"Helvetica Regular", Inter, sans-serif' }}
    >
      {/* ── Background Image ── */}
      <motion.div style={{ scale: videoScale, opacity: videoOpacity, position: 'fixed', inset: 0, zIndex: 0 }}>
        <BackgroundImage />
      </motion.div>

      {/* ── Dynamic overlay ── */}
      <motion.div style={{ opacity: overlayOpacity }} className="fixed inset-0 z-[1] bg-[#0F0F0F]" />

      {/* ── Content wrapper ── */}
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 md:px-10 flex flex-col">

        {/* ══ NAV ══ */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full flex items-center justify-between py-6 md:py-8"
        >
          <div className="flex items-center gap-2 text-white">
            <LogoMark size={18} />
            <span className="text-base md:text-lg font-medium tracking-[0.25em] uppercase">Karma</span>
          </div>
          <button
            onClick={() => scrollTo('contact')}
            id="nav-cta"
            className="cta-pill text-[10px] md:text-xs uppercase tracking-widest px-4 md:px-5 py-2 md:py-2.5 rounded-full font-medium"
          >
            Contact Engineering
          </button>
        </motion.nav>

        {/* ══ SECTION 1 — HERO ══ */}
        <section
          ref={heroRef}
          id="hero"
          className="w-full flex flex-col items-center text-center pt-10 pb-32 md:pb-48 min-h-[90vh] justify-center"
        >
          <motion.p
            custom={0.1} variants={fadeUp} initial="hidden" animate="visible"
            className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/80 mb-6 md:mb-8"
          >
            Precision Milling · India
          </motion.p>

          <motion.h1
            custom={0.25} variants={fadeUp} initial="hidden" animate="visible"
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-[1.04] max-w-5xl px-2"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
          >
            High-Tolerance
            <br />
            {/* "Architectural Stone" — boosted from white/40 → white/75 */}
            <span className="text-white/75">Architectural Stone</span>
            <br />
            Milling.
          </motion.h1>

          <motion.p
            custom={0.42} variants={fadeUp} initial="hidden" animate="visible"
            className="mt-6 md:mt-8 text-base md:text-lg lg:text-xl text-white/75 max-w-md md:max-w-xl leading-relaxed px-2"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
          >
            Complex 3D parametric and fluted assemblies.
            Precision CNC direct to your site —
            at a cost structure your budget hasn't seen before.
          </motion.p>

          {/* ── CTA GROUP ── */}
          <motion.div
            custom={0.58} variants={fadeUp} initial="hidden" animate="visible"
            className="mt-10 md:mt-14 flex flex-col sm:flex-row gap-4 items-center"
          >
            {/* Primary CTA — premium redesign */}
            <button
              onClick={() => scrollTo('contact')}
              id="hero-cta"
              className="group relative overflow-hidden rounded-full font-medium"
              style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {/* glow ring */}
              <span
                aria-hidden
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: '0 0 40px rgba(52,211,153,0.35)' }}
              />
              {/* main pill */}
              <span
                className="relative flex items-center gap-3 px-8 md:px-10 py-3.5 md:py-4 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #163325 0%, #1e4d36 50%, #2D6A4F 100%)',
                  border: '1px solid rgba(52,211,153,0.35)',
                  boxShadow: '0 0 0 1px rgba(52,211,153,0.1), 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
              >
                {/* pulsing live dot */}
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span
                  className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-white group-hover:text-emerald-100 transition-colors duration-300"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, letterSpacing: '0.18em' }}
                >
                  Contact Engineering
                </span>
                {/* arrow icon */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="text-emerald-400 group-hover:translate-x-0.5 transition-transform duration-300">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </button>

            {/* Secondary link */}
            <button
              onClick={() => scrollTo('process')}
              className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest text-white/50 hover:text-white/80 transition-colors duration-300"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              See Our Process <ArrowDown size={11} />
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-16 md:mt-24 flex flex-col items-center"
          >
            <div className="w-px h-10 md:h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse" />
          </motion.div>
        </section>

        {/* ══ SECTION 2 — CORE COMPETENCIES ══ */}
        <section id="competencies" className="w-full py-16 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="mb-10 md:mb-16 text-center"
          >
            <SectionLabel>Core Competencies</SectionLabel>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-white"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Engineered for Architects
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {competencies.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.12, ease: 'easeOut' }}
                className="glass-card-vivid rounded-2xl p-6 md:p-8 group"
              >
                <span className="text-3xl md:text-4xl text-white/20 block mb-5 md:mb-7 group-hover:text-white/35 transition-colors duration-500">
                  {c.symbol}
                </span>
                <h3 className="text-lg md:text-xl text-white font-semibold mb-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}>
                  {c.title}
                </h3>
                <p className="text-[10px] md:text-xs text-white/60 uppercase tracking-widest mb-4 md:mb-5">
                  {c.tag}
                </p>
                <p className="text-sm md:text-base text-white/85 leading-relaxed"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                  {c.body}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ SECTION 3 — 4K DRY-LAY GUARANTEE ══ */}
        <section id="guarantee" className="w-full py-10 md:py-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.9, ease: 'easeOut' }}
            className="liquid-glass rounded-3xl p-8 md:p-16 lg:p-20 text-center"
          >
            <SectionLabel>Risk Reversal</SectionLabel>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 md:mb-8 leading-[1.05]"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              The 4K Dry-Lay
              <br />
              <span className="text-white">Guarantee.</span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed mb-10 md:mb-12"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
              Eliminate overseas fabrication risk entirely. Every project is dry-laid
              and dimensionally verified via continuous 4K video on our factory floor
              before it ever reaches yours. Your sign-off. Your confidence. Our standard.
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/60">
                Live 4K verification on every project
              </span>
            </div>
          </motion.div>
        </section>

        {/* ══ SECTION 4 — PROCESS TIMELINE ══ */}
        <section id="process" className="w-full py-16 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="mb-10 md:mb-16 text-center"
          >
            <SectionLabel>From File to Floor</SectionLabel>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-white"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Our Process
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: 'easeOut' }}
                className="glass-card rounded-2xl p-6 md:p-7 relative group"
              >
                <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/40 block mb-5 md:mb-6">
                  Step {step.num}
                </span>
                <h3 className="text-white text-base md:text-lg font-semibold mb-2 md:mb-3"
                  style={{ fontFamily: 'Inter, sans-serif' }}>
                  {step.title}
                </h3>
                <p className="text-xs md:text-sm text-white/70 leading-relaxed"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ SECTION 5 — FAQ ══ */}
        <section id="faq" className="w-full py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12 md:mb-16 text-center"
          >
            <SectionLabel>Common Questions</SectionLabel>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl text-white"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
            >
              Frequently Asked
            </h2>
          </motion.div>

          <div className="flex flex-col gap-10 md:gap-14">
            {faqCategories.map((cat) => (
              <div key={cat.category}>
                {/* Category label */}
                <div className="flex items-center gap-3 mb-5 px-1">
                  <span className="h-px w-6 bg-white/30" />
                  <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-white font-semibold">
                    {cat.category}
                  </p>
                </div>
                {/* Accordion items */}
                <div className="flex flex-col gap-3">
                  {cat.items.map((item, i) => (
                    <FAQItem key={item.q} q={item.q} a={item.a} index={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ SECTION 6 — CONTACT ══ */}
        <section id="contact" className="w-full pt-10 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.75 }}
            className="glass-card-vivid rounded-2xl md:rounded-3xl p-8 md:p-16"
          >
            <div className="text-center mb-10 md:mb-14">
              <SectionLabel>Credibility & Contact</SectionLabel>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-white"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                Let's Talk Stone.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
              {/* Email */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-white/55">
                  <Mail size={15} />
                  <span className="text-xs uppercase tracking-widest">Email</span>
                </div>
                <a
                  href="mailto:abhay@karmastoneengineering.com"
                  id="contact-email"
                  className="text-white/85 text-sm md:text-base hover:text-white transition-colors duration-300 break-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  abhay@karmastoneengineering.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-white/55">
                  <Phone size={15} />
                  <span className="text-xs uppercase tracking-widest">Phone</span>
                </div>
                <a
                  href="tel:+917023812488"
                  id="contact-phone"
                  className="text-white/85 text-sm md:text-base hover:text-white transition-colors duration-300"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  +91 7023812488
                </a>
              </div>

              {/* Locations */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-white/55">
                  <MapPin size={15} />
                  <span className="text-xs uppercase tracking-widest">Locations</span>
                </div>
                <div className="text-white/85 text-sm md:text-base leading-relaxed"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                  Engineering & Sales: US-UK-UAE
                  <br />
                  Fabrication: India
                </div>
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </main>
  )
}
