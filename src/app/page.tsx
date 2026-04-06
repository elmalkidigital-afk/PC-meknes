"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const ScrollVideoSection = dynamic(
  () => import("./components/ScrollVideoSection"),
  { ssr: false }
);
const CardScanner = dynamic(
  () => import("./components/CardScanner"),
  { ssr: false }
);
const ConfettiOnMount = dynamic(
  () => import("./components/Confetti").then((m) => m.default),
  { ssr: false }
);

/* ─── Data ─────────────────────────────────────────────────── */

const NAV_LINKS = [
  { href: "#hero", label: "Accueil" },
  { href: "#services-pc", label: "Services PC" },
  { href: "#services-mobile", label: "Mobile" },
  { href: "#pourquoi", label: "Pourquoi Moi" },
  { href: "#tarifs", label: "Tarifs" },
  { href: "#parcours", label: "Parcours" },
  { href: "#telepresence", label: "Télé-assistance" },
  { href: "#blog", label: "Blog" },
];

const SERVICES_PC = [
  {
    icon: "fa-temperature-high",
    title: "Pâte Thermique CPU/GPU",
    desc: "Changement de pâte thermique pour résoudre les problèmes de surchauffe, bruit ventilateur et performances réduites.",
    features: [
      "Nettoyage complet du système",
      "Pâte thermique haute qualité",
      "Test de température après",
    ],
  },
  {
    icon: "fa-screwdriver-wrench",
    title: "Montage PC Complet",
    desc: "Assemblage sur mesure de votre PC bureautique ou gaming avec installation Windows, Linux ou macOS.",
    features: [
      "Conseil composants adaptés",
      "Montage soigné câble management",
      "Installation OS + pilotes",
    ],
  },
  {
    icon: "fa-bug",
    title: "Diagnostic Pannes",
    desc: "Résolution des écrans noirs, écrans bleus (BSOD), lenteurs, plantages et redémarrages intempestifs.",
    features: [
      "Diagnostic gratuit complet",
      "Identification cause exacte",
      "Devis transparent",
    ],
  },
  {
    icon: "fa-rocket",
    title: "Upgrade & Optimisation",
    desc: "Boostez votre PC avec des upgrades SSD, RAM et optimisation système pour gaming ou bureautique.",
    features: ["Upgrade RAM & SSD", "Optimisation Windows", "Configuration gaming"],
  },
  {
    icon: "fa-shield-virus",
    title: "Virus & Sécurité",
    desc: "Suppression de virus, malwares, adwares et installation d'antivirus. Récupération de données.",
    features: ["Nettoyage virus complet", "Protection antivirus", "Sauvegarde données"],
  },
  {
    icon: "fa-handshake",
    title: "Conseil & Accompagnement",
    desc: "Conseils personnalisés pour l'achat, l'upgrade et la configuration de votre matériel informatique.",
    features: [
      "Conseils achat et upgrade",
      "Configuration Gaming / Bureautique / Familial",
      "Assistance technique et formation",
    ],
    wide: true,
  },
];

const SERVICES_MOBILE = [
  {
    icon: "fa-battery-full",
    title: "Remplacement Batterie",
    desc: "Changement de batterie pour smartphones toutes marques.",
  },
  {
    icon: "fa-mobile-screen",
    title: "Remplacement Écran",
    desc: "Réparation écran cassé ou tactile défaillant.",
  },
  {
    icon: "fa-rotate-right",
    title: "Reset & Réinitialisation",
    desc: "Restauration d'usine, suppression sécurisée des données.",
  },
  {
    icon: "fa-unlock",
    title: "Déblocage Software",
    desc: "Déblocage compte Google (FRP), codes PIN oubliés.",
  },
  {
    icon: "fa-gauge-high",
    title: "Optimisation & Nettoyage",
    desc: "Accélération système, suppression bloatwares, optimisation batterie.",
  },
  {
    icon: "fa-download",
    title: "Flash & Mise à jour",
    desc: "Installation firmware officiel, mise à jour système, flash ROM.",
  },
];

const ADVANTAGES = [
  {
    icon: "fa-shield-check",
    title: "Fiabilité",
    desc: "Diagnostic précis et solutions durables. Chaque intervention est faite avec soin et rigueur.",
  },
  {
    icon: "fa-bolt",
    title: "Rapidité",
    desc: "Intervention rapide selon l'urgence. Prise de rendez-vous le jour même, réparation sous 24h.",
  },
  {
    icon: "fa-eye",
    title: "Transparence",
    desc: "Devis clair avant toute intervention. Pas de surprise, vous validez avant que je commence.",
  },
  {
    icon: "fa-location-dot",
    title: "Proximité",
    desc: "Basé à Meknès, Bassatine. Interventions à domicile possibles dans toute la ville.",
  },
  {
    icon: "fa-hand-holding-heart",
    title: "Diagnostic Gratuit",
    desc: "Diagnostic complet offert. Vous ne payez que si vous acceptez la réparation.",
  },
  {
    icon: "fa-id-card",
    title: "Auto-Entrepreneur",
    desc: "Professionnel inscrit. Facture légale et service de confiance garanti.",
  },
];

const EXTRAS = [
  { icon: "fa-hard-drive", label: "Upgrade SSD / RAM", price: "à partir de 80 DH (+ pièce)" },
  { icon: "fa-rotate-right", label: "Installation Windows", price: "à partir de 100 DH" },
  { icon: "fa-unlock", label: "Déblocage FRP Mobile", price: "à partir de 50 DH" },
  { icon: "fa-download", label: "Flash Firmware Mobile", price: "à partir de 50 DH" },
  { icon: "fa-shield-virus", label: "Nettoyage Virus Complet", price: "à partir de 80 DH" },
  { icon: "fa-house-signal", label: "Intervention à domicile", price: "+50 DH (Meknès)" },
];

const BLOG_ARTICLES = [
  {
    img: "https://images.unsplash.com/photo-1768633647910-7e6fb53e5b0f?auto=format&fit=crop&q=80&w=800",
    alt: "Techniciens réparation PC Meknès",
    date: "15 Mars 2026",
    title: "Pourquoi confier la réparation de votre ordinateur à PC MEKNES ?",
    desc: "Découvrez pourquoi PC MEKNES est la référence locale pour la réparation PC. Diagnostic gratuit, intervention rapide et pièces de haute qualité garanties au cœur de Meknès.",
    href: "/blog/pourquoi-pc-meknes",
  },
  {
    img: "https://images.unsplash.com/photo-1756801370266-f589801cedc3?auto=format&fit=crop&q=80&w=800",
    alt: "Nettoyage et Pâte Thermique PC Meknès",
    date: "10 Mars 2026",
    title: "Changement pâte thermique et nettoyage PC par PC MEKNES",
    desc: "Votre PC surchauffe et fait du bruit ? Votre expert PC MEKNES vous explique l'importance d'un bon nettoyage interne et du changement régulier de la pâte thermique.",
    href: "/blog/pate-thermique-nettoyage",
  },
  {
    img: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=800",
    alt: "Montage PC Gamer Meknès",
    date: "5 Mars 2026",
    title: "Montage PC Sur-Mesure et Upgrade avec PC MEKNES",
    desc: "Besoin d'un PC Gaming performant ou d'une machine bureautique fluide ? PC MEKNES assemble votre ordinateur avec des composants choisis en fonction de votre budget.",
    href: "/blog/montage-pc-sur-mesure",
  },
];

const LOGO_URL = "/logo.webp";
const WA_URL =
  "https://wa.me/212699245542?text=Bonjour%2C%20je%20souhaite%20un%20diagnostic%20gratuit%20pour%20mon%20appareil.";

/* ─── Main Page ─────────────────────────────────────────────── */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [confettiReady, setConfettiReady] = useState(false);
  const [confettiFired, setConfettiFired] = useState(false);

  const handleScrollComplete = useCallback(() => {
    if (!confettiFired) {
      setConfettiReady(true);
      setConfettiFired(true);
    }
  }, [confettiFired]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="text-slate-900 bg-white overflow-x-hidden">
      {/* ── Navbar ─────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2">
            <Image
              src={LOGO_URL}
              alt="PC-MEKNES Logo"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <span
              className={`font-bold text-lg transition-colors ${
                scrolled ? "text-blue-900" : "text-white"
              }`}
            >
              PC-<span className="text-blue-400">MEKNES</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    scrolled
                      ? "text-slate-600 hover:text-blue-700 hover:bg-blue-50"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm"
            >
              <i className="fas fa-calendar-check text-xs" /> Prendre RDV
            </a>
            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              className={`lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg transition-colors ${
                scrolled ? "hover:bg-slate-100" : "hover:bg-white/10"
              }`}
            >
              <span
                className={`block w-5 h-0.5 transition-all ${
                  scrolled ? "bg-slate-700" : "bg-white"
                } ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 transition-all ${
                  scrolled ? "bg-slate-700" : "bg-white"
                } ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 transition-all ${
                  scrolled ? "bg-slate-700" : "bg-white"
                } ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl">
            <ul className="px-4 py-3 space-y-1">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="block mt-2 text-center bg-blue-700 hover:bg-blue-800 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-colors"
                >
                  Prendre RDV
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 overflow-hidden"
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Glow blobs */}
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20" />
        <div className="absolute -bottom-20 left-1/4 w-72 h-72 bg-cyan-500 rounded-full blur-3xl opacity-15" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-32 grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Content */}
          <div className="text-white">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm px-4 py-1.5 rounded-full mb-6">
              <i className="fas fa-shield-halved text-cyan-400" />
              Auto-Entrepreneur Inscrit
            </span>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Réparation PC &amp; Mobile
              <br />à{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">
                Meknès
              </span>
            </h1>

            <p className="text-blue-100 text-lg leading-relaxed mb-10 max-w-lg">
              Diagnostic gratuit. Intervention rapide à domicile ou en atelier.
              <br />
              Votre expert informatique de confiance.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-white text-blue-900 font-semibold px-7 py-3.5 rounded-full hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <i className="fas fa-calendar-check" />
                Prendre RDV
              </a>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-7 py-3.5 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <i className="fab fa-whatsapp text-lg" />
                WhatsApp
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { num: "5+", label: "ans d'expérience en France" },
                { num: "50+", label: "PC réparés en France" },
                { num: "100%", label: "Diagnostic gratuit" },
              ].map((s) => (
                <div key={s.label} className="border-l-2 border-cyan-400 pl-4">
                  <div className="text-2xl font-bold text-white">{s.num}</div>
                  <div className="text-blue-200 text-xs leading-tight mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero splash image */}
          <div className="hidden lg:block relative">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              <Image
                src="/laptop-ouvert.webp"
                alt="PC portable ouvert - réparation informatique Meknès"
                fill
                sizes="(max-width: 1024px) 0vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent" />
              {/* Floating device badges */}
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-2 gap-2">
                {[
                  { icon: "fa-laptop", label: "PC Portable" },
                  { icon: "fa-desktop", label: "PC Bureau" },
                  { icon: "fa-mobile-screen", label: "Smartphone" },
                  { icon: "fa-gamepad", label: "PC Gaming" },
                ].map((d) => (
                  <div
                    key={d.label}
                    className="bg-black/50 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 flex items-center gap-2"
                  >
                    <i className={`fas ${d.icon} text-cyan-400 text-sm`} />
                    <span className="text-white text-xs font-medium">{d.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <i className="fas fa-check-circle text-green-600" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">Diagnostic Gratuit</div>
                <div className="text-slate-400 text-xs">Sans engagement</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="w-full h-16 sm:h-20"
            style={{ fill: "white" }}
          >
            <path d="M0,40 C360,80 720,0 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* ── Scroll Video Animation ─────────────────────────── */}
      <ScrollVideoSection onComplete={handleScrollComplete} />

      {/* ── Card Scanner 3D ────────────────────────────────── */}
      <CardScanner />

      {/* ── Confetti (fires once when scroll animation ends) ─ */}
      {confettiReady && (
        <ConfettiOnMount delay={100} />
      )}

      {/* ── Services PC ────────────────────────────────────── */}
      <section id="services-pc" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            tag="Mes Expertises"
            icon="fa-wrench"
            title="Services PC & Laptop"
            highlight="PC & Laptop"
            desc="Solutions complètes pour tous vos problèmes informatiques, du diagnostic à la réparation."
          />
          <div className="grid grid-cols-2 gap-3 mt-12 mb-2">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900">
              <Image src="/laptop-ouvert.webp" alt="Réparation laptop gaming Meknès" fill sizes="50vw" className="object-contain" />
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900">
              <Image src="/pc-gamer-evga.jpg" alt="PC gamer assemblage Meknès" fill sizes="50vw" className="object-cover" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {SERVICES_PC.map((s, i) => (
              <div
                key={i}
                className={`bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                  s.wide ? "sm:col-span-2 lg:col-span-3" : ""
                }`}
              >
                <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  <i className={`fas ${s.icon} text-blue-700`} />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  {s.desc}
                </p>
                <ul className="space-y-1.5">
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-slate-600"
                    >
                      <i className="fas fa-check text-blue-500 text-xs" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Mobile ────────────────────────────────── */}
      <section id="services-mobile" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            tag="Mobile"
            icon="fa-mobile-screen"
            title="Services Téléphone"
            highlight="Téléphone"
            desc="Réparation hardware et software pour smartphones et tablettes."
          />
          <div className="mt-16 max-w-4xl mx-auto space-y-4">
            <div className="grid grid-cols-2 gap-3 mb-2">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100">
                <Image src="/batterie-mobile.webp" alt="Remplacement batterie smartphone Meknès" fill sizes="50vw" className="object-contain" />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100">
                <Image src="/ecran-mobile.webp" alt="Réparation écran smartphone Meknès" fill sizes="50vw" className="object-contain" />
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <i className="fas fa-microchip text-blue-700" />
                </div>
                <div>
                  <h3 className="font-bold text-xl">Réparation Mobile</h3>
                  <p className="text-slate-500 text-sm mt-0.5">
                    Interventions hardware et software pour vos smartphones et tablettes :
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {SERVICES_MOBILE.map((m) => (
                  <div key={m.title} className="flex gap-4 p-4 bg-slate-50 rounded-2xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                      <i className={`fas ${m.icon} text-blue-700 text-sm`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-900">
                        {m.title}
                      </h4>
                      <p className="text-slate-500 text-xs mt-0.5">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Télé-assistance ────────────────────────────────── */}
      <section id="telepresence" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            tag="Télé-assistance"
            icon="fa-desktop"
            title="Prise en main à distance"
            highlight="à distance"
            desc="Je vous accompagne pour démarrer l'intervention sur votre PC ou serveur et résoudre vos problèmes techniques dans les plus brefs délais."
          />

          <div className="mt-16 grid lg:grid-cols-2 gap-12 items-start">
            {/* Guarantees */}
            <div className="space-y-4">
              {/* Preview image */}
              <div className="relative h-48 rounded-2xl overflow-hidden mb-2">
                <Image
                  src="https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?auto=format&fit=crop&q=80&w=1200"
                  alt="Bureau avec laptop et moniteur - télé-assistance PC Meknès"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center gap-1.5 bg-green-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    <i className="fas fa-shield-check text-xs" /> Connexion chiffrée SSL
                  </span>
                </div>
              </div>
              {[
                {
                  icon: "fa-lock",
                  color: "bg-blue-700 shadow-blue-200",
                  title: "Connexion chiffrée & sécurisée",
                  desc: "Toutes les données échangées entre votre ordinateur et le mien sont chiffrées de bout en bout. La connexion est protégée par un identifiant et un mot de passe à usage unique.",
                },
                {
                  icon: "fa-hand-pointer",
                  color: "bg-emerald-600 shadow-emerald-100",
                  title: "Vous gardez le contrôle total",
                  desc: "Vous seul décidez de partager votre écran. Personne ne peut activer le logiciel à votre place — vous initiez et autorisez chaque session.",
                },
                {
                  icon: "fa-circle-xmark",
                  color: "bg-violet-600 shadow-violet-100",
                  title: "Fin de session en un clic",
                  desc: "Une fois l'intervention terminée, il vous suffit d'un simple clic pour mettre fin à la prise en main à distance. Aucune connexion résiduelle, aucun accès persistant.",
                },
                {
                  icon: "fa-shield-halved",
                  color: "bg-amber-500 shadow-amber-100",
                  title: "Aucune installation permanente",
                  desc: "Le logiciel de télé-assistance est utilisé ponctuellement, le temps de l'intervention. Votre vie privée et vos données restent protégées.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-5 bg-slate-50 rounded-2xl p-5 hover:shadow-md transition-shadow"
                >
                  <div
                    className={`w-12 h-12 ${item.color} text-white rounded-xl flex items-center justify-center shrink-0 shadow-md`}
                  >
                    <i className={`fas ${item.icon} text-lg`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* How it works */}
            <div className="bg-gradient-to-br from-blue-950 to-blue-900 rounded-3xl p-8 text-white">
              <h3 className="font-bold text-xl mb-8 flex items-center gap-2">
                <i className="fas fa-list-ol text-cyan-400" />
                Comment ça marche ?
              </h3>
              <ol className="space-y-6">
                {[
                  {
                    n: "01",
                    title: "Contactez-moi",
                    desc: "Par WhatsApp ou formulaire, décrivez votre problème. Je fixe un créneau d'intervention.",
                  },
                  {
                    n: "02",
                    title: "Téléchargez le logiciel",
                    desc: "Je vous envoie un lien pour télécharger l'outil de télé-assistance (AnyDesk ou TeamViewer). Aucune installation permanente.",
                  },
                  {
                    n: "03",
                    title: "Partagez votre ID & mot de passe",
                    desc: "Un identifiant et un mot de passe à usage unique s'affichent. Communiquez-les moi — la session commence.",
                  },
                  {
                    n: "04",
                    title: "Intervention & résolution",
                    desc: "Je résous le problème directement sur votre machine pendant que vous observez en temps réel.",
                  },
                  {
                    n: "05",
                    title: "Fin de session",
                    desc: "Un clic suffit pour couper la connexion. Votre PC est rendu, aucun accès ne persiste.",
                  },
                ].map((step) => (
                  <li key={step.n} className="flex gap-4">
                    <span className="text-2xl font-bold text-cyan-400/40 leading-none w-10 shrink-0">
                      {step.n}
                    </span>
                    <div>
                      <h4 className="font-semibold text-white mb-0.5">
                        {step.title}
                      </h4>
                      <p className="text-blue-200 text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold py-3.5 rounded-xl transition-colors"
              >
                <i className="fab fa-whatsapp text-lg" />
                Démarrer une session
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pourquoi Nous ──────────────────────────────────── */}
      <section id="pourquoi" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            tag="Mes Engagements"
            icon="fa-star"
            title="Pourquoi PC-MEKNES ?"
            highlight="PC-MEKNES"
            desc="Des avantages concrets qui font la différence pour vous."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {ADVANTAGES.map((a) => (
              <div
                key={a.title}
                className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-700 text-white rounded-xl flex items-center justify-center mb-4 shadow-md shadow-blue-200">
                  <i className={`fas ${a.icon}`} />
                </div>
                <h3 className="font-bold text-lg mb-2">{a.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tarifs ─────────────────────────────────────────── */}
      <section
        id="tarifs"
        className="py-24 bg-gradient-to-br from-blue-950 to-blue-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            tag="Mes Tarifs"
            icon="fa-tags"
            title="Prix Transparents"
            highlight="Transparents"
            desc="Des tarifs clairs et compétitifs. Diagnostic toujours gratuit, vous ne payez que la réparation."
            dark
          />

          <div className="grid lg:grid-cols-3 gap-6 mt-16 items-center">
            {/* Diagnostic */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-white">
              <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <i className="fas fa-stethoscope" />
              </div>
              <h3 className="font-bold text-xl mb-2">Diagnostic</h3>
              <div className="text-4xl font-bold text-cyan-400 my-6">
                GRATUIT
              </div>
              <ul className="space-y-2 mb-8">
                {[
                  "Diagnostic complet PC/Mobile",
                  "Identification du problème",
                  "Devis détaillé offert",
                  "Conseil personnalisé",
                  "Sans engagement",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-blue-100"
                  >
                    <i className="fas fa-check text-cyan-400 text-xs" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="block text-center border border-white/30 hover:bg-white/10 text-white py-3 rounded-xl font-semibold transition-colors"
              >
                Demander un diagnostic
              </a>
            </div>

            {/* Maintenance — featured */}
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl lg:scale-105">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                Le + demandé
              </span>
              <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <i className="fas fa-temperature-high text-blue-700" />
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-2">
                Maintenance PC
              </h3>
              <div className="my-6">
                <span className="text-xs text-slate-400">à partir de</span>
                <div className="text-4xl font-bold text-blue-700">
                  100 <span className="text-lg font-medium text-slate-400">DH</span>
                </div>
              </div>
              <ul className="space-y-2 mb-8">
                {[
                  "Nettoyage interne complet",
                  "Changement pâte thermique",
                  "Optimisation Windows",
                  "Suppression virus/malwares",
                  "Installation pilotes",
                  "Test performance après",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-slate-600"
                  >
                    <i className="fas fa-check text-blue-500 text-xs" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="block text-center bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition-colors"
              >
                Prendre RDV
              </a>
            </div>

            {/* Montage PC */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-white">
              <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <i className="fas fa-screwdriver-wrench" />
              </div>
              <h3 className="font-bold text-xl mb-2">Montage PC</h3>
              <div className="my-6">
                <span className="text-xs text-blue-300">à partir de</span>
                <div className="text-4xl font-bold text-cyan-400">
                  200 <span className="text-lg font-medium text-blue-200">DH</span>
                </div>
              </div>
              <ul className="space-y-2 mb-8">
                {[
                  "Assemblage complet",
                  "Câble management soigné",
                  "Installation Windows/Linux",
                  "Pilotes + logiciels essentiels",
                  "Test stabilité 24h",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-blue-100"
                  >
                    <i className="fas fa-check text-cyan-400 text-xs" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="block text-center border border-white/30 hover:bg-white/10 text-white py-3 rounded-xl font-semibold transition-colors"
              >
                Demander un devis
              </a>
            </div>
          </div>

          {/* Extras */}
          <div className="mt-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
            <h3 className="font-bold text-white text-lg flex items-center gap-2 mb-6">
              <i className="fas fa-list-check text-cyan-400" />
              Autres interventions
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {EXTRAS.map((e) => (
                <div
                  key={e.label}
                  className="flex items-center justify-between gap-3 bg-white/10 rounded-xl px-4 py-3"
                >
                  <span className="flex items-center gap-2 text-sm text-blue-100">
                    <i className={`fas ${e.icon} text-cyan-400 w-4`} />
                    {e.label}
                  </span>
                  <span className="text-xs text-white font-medium whitespace-nowrap">
                    {e.price}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-blue-200 text-xs flex items-center gap-2">
              <i className="fas fa-circle-info text-cyan-400" />
              Les prix sont indicatifs et peuvent varier selon la complexité.
              Devis gratuit et sans engagement avant toute intervention.
            </p>
          </div>
        </div>
      </section>

      {/* ── Parcours ───────────────────────────────────────── */}
      <section id="parcours" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            tag="Mon Parcours"
            icon="fa-graduation-cap"
            title="5 ans en France, maintenant à Meknès"
            highlight="maintenant à Meknès"
            desc="Une expertise technique forgée en France, maintenant à votre service à Meknès."
          />
          <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* Image */}
            <div className="relative">
              <div className="relative h-80 rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/ventirad2.jpg"
                  alt="Réparation PC Meknès - changement pâte thermique"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 to-transparent" />
              </div>
              {/* Badge overlay */}
              <div className="absolute -bottom-4 -right-4 bg-blue-700 text-white rounded-2xl p-4 shadow-lg shadow-blue-300/30">
                <div className="text-2xl font-bold">5+</div>
                <div className="text-blue-200 text-xs leading-tight">ans d&apos;expérience<br/>en France</div>
              </div>
            </div>

            {/* Cards */}
            <div className="space-y-5">
            {[
              {
                icon: "fa-plane-arrival",
                title: "5 Ans d'Expérience en France",
                desc: "J'ai exercé pendant 5 ans en tant que technicien informatique en France avant de m'installer à Meknès.",
              },
              {
                icon: "fa-shop",
                title: "Installation à Meknès – Bassatine",
                desc: "Installé à Bassatine, j'interviens chez les particuliers et professionnels de Meknès. Tarifs locaux, travail sérieux.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-5 bg-slate-50 rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-blue-700 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-md shadow-blue-200">
                  <i className={`fas ${item.icon} text-xl`} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Blog ───────────────────────────────────────────── */}
      <section id="blog" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            tag="Blog & Actualités"
            icon="fa-newspaper"
            title="Actualités PC MEKNES"
            highlight="PC MEKNES"
            desc="Conseils, astuces et actualités sur la réparation informatique avec PC MEKNES."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {BLOG_ARTICLES.map((a) => (
              <article
                key={a.title}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={a.img}
                    alt={a.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs text-slate-400 flex items-center gap-1.5 mb-3">
                    <i className="far fa-calendar-alt" />
                    {a.date}
                  </span>
                  <h3 className="font-bold text-slate-900 leading-snug mb-3">
                    {a.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">
                    {a.desc}
                  </p>
                  <a
                    href={a.href}
                    className="inline-flex items-center gap-2 text-blue-700 font-semibold text-sm hover:gap-3 transition-all"
                  >
                    Lire la suite{" "}
                    <i className="fas fa-arrow-right text-xs" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────── */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            tag="Contact"
            icon="fa-envelope"
            title="Contactez PC-MEKNES"
            highlight="PC-MEKNES"
            desc="Diagnostic gratuit ! Décrivez votre problème et je vous rappelle."
          />
          <div className="mt-16 grid lg:grid-cols-2 gap-12">
            <ContactForm />

            <div className="space-y-5">
              <div className="bg-slate-50 rounded-2xl p-6">
                <h3 className="font-bold text-lg flex items-center gap-2 mb-5">
                  <i className="fas fa-headset text-blue-700" />
                  Informations
                </h3>
                {[
                  {
                    icon: "fa-user-tie",
                    label: "Abderrahman Elmalki",
                    sub: "Technicien informatique",
                  },
                  {
                    icon: "fa-location-dot",
                    label: "Adresse",
                    sub: "Zone C, Bloc F, Bassatine\nMeknès, Maroc",
                  },
                  {
                    icon: "fa-phone",
                    label: "Téléphone",
                    sub: "+212 699 245 542",
                    href: "tel:+212699245542",
                  },
                  {
                    icon: "fa-clock",
                    label: "Horaires",
                    sub: "Lun – Sam : 9h00 – 20h00\nDim : Sur RDV",
                  },
                ].map((info) => (
                  <div key={info.label} className="flex gap-3 mb-4">
                    <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                      <i className={`fas ${info.icon} text-blue-700 text-sm`} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-slate-900">
                        {info.label}
                      </div>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-slate-500 text-sm hover:text-blue-700 transition-colors"
                        >
                          {info.sub}
                        </a>
                      ) : (
                        <div className="text-slate-500 text-sm whitespace-pre-line">
                          {info.sub}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-2xl transition-colors shadow-lg shadow-green-100"
              >
                <i className="fab fa-whatsapp text-xl" />
                Contacter via WhatsApp
              </a>

              <div className="rounded-2xl overflow-hidden h-52 border border-slate-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13228.27!2d-5.54!3d33.88!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda044bda5e0c3c5%3A0x0!2sBassatine%2C%20Mekn%C3%A8s!5e0!3m2!1sfr!2sma!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Localisation PC-MEKNES Bassatine Meknès"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <a href="#hero" className="flex items-center gap-2 mb-4">
                <Image
                  src={LOGO_URL}
                  alt="PC-MEKNES"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <span className="font-bold text-lg">
                  PC-<span className="text-blue-400">MEKNES</span>
                </span>
              </a>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Votre expert en réparation PC et mobile à Meknès. Diagnostic
                gratuit, prix abordables et service garanti.
              </p>
              <div className="flex gap-2">
                {[
                  { icon: "fa-whatsapp", href: WA_URL, fab: true },
                  { icon: "fa-facebook-f", href: "#", fab: true },
                  { icon: "fa-instagram", href: "#", fab: true },
                ].map((s) => (
                  <a
                    key={s.icon}
                    href={s.href}
                    target={s.href !== "#" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-slate-800 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <i className={`${s.fab ? "fab" : "fas"} ${s.icon} text-sm`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Services PC */}
            <div>
              <h4 className="font-semibold text-xs uppercase tracking-widest text-slate-400 mb-4">
                Services PC
              </h4>
              <ul className="space-y-2">
                {[
                  "Pâte thermique",
                  "Montage PC",
                  "Diagnostic pannes",
                  "Upgrade & Optimisation",
                ].map((l) => (
                  <li key={l}>
                    <a
                      href="#services-pc"
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Mobile */}
            <div>
              <h4 className="font-semibold text-xs uppercase tracking-widest text-slate-400 mb-4">
                Services Mobile
              </h4>
              <ul className="space-y-2">
                {[
                  "Reset & Réinitialisation",
                  "Déblocage",
                  "Optimisation",
                  "Flash firmware",
                ].map((l) => (
                  <li key={l}>
                    <a
                      href="#services-mobile"
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info */}
            <div>
              <h4 className="font-semibold text-xs uppercase tracking-widest text-slate-400 mb-4">
                Informations
              </h4>
              <ul className="space-y-2">
                {[
                  { label: "Contact", href: "#contact" },
                  { label: "Blog & Actualités", href: "#blog" },
                  { label: "Mes engagements", href: "#pourquoi" },
                  { label: "Mon parcours", href: "#parcours" },
                ].map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-6 text-center text-slate-500 text-xs">
            &copy; 2025 PC-MEKNES – Abderrahman Elmalki. Inscrit au Registre
            National des Auto-Entrepreneurs : 003405900000095. Tous droits
            réservés.
          </div>
        </div>
      </footer>

      {/* ── WhatsApp float ─────────────────────────────────── */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter via WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-xl shadow-green-300/40 flex items-center justify-center text-2xl hover:scale-110 transition-all"
      >
        <i className="fab fa-whatsapp" />
      </a>
    </div>
  );
}

/* ─── Section Header ─────────────────────────────────────────── */

function SectionHeader({
  tag,
  icon,
  title,
  highlight,
  desc,
  dark = false,
}: {
  tag: string;
  icon: string;
  title: string;
  highlight: string;
  desc: string;
  dark?: boolean;
}) {
  const parts = title.split(highlight);
  return (
    <div className="text-center">
      <span
        className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-1.5 rounded-full mb-4 ${
          dark ? "bg-white/15 text-cyan-300" : "bg-blue-50 text-blue-700"
        }`}
      >
        <i className={`fas ${icon} text-xs`} />
        {tag}
      </span>
      <h2
        className={`text-4xl font-bold mb-4 ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {parts[0]}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
          {highlight}
        </span>
        {parts[1]}
      </h2>
      <p
        className={`max-w-xl mx-auto leading-relaxed ${
          dark ? "text-blue-200" : "text-slate-500"
        }`}
      >
        {desc}
      </p>
    </div>
  );
}

/* ─── Contact Form ───────────────────────────────────────────── */

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    device: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Bonjour, je m'appelle ${form.name}.\nAppareil : ${form.device}.\nProblème : ${form.message}.\nTél : ${form.phone}${form.email ? `\nEmail : ${form.email}` : ""}`
    );
    window.open(`https://wa.me/212699245542?text=${text}`, "_blank");
    setSubmitted(true);
  };

  const inputCls =
    "w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white placeholder:text-slate-400";

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-slate-50 rounded-2xl p-12 text-center min-h-64">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <i className="fas fa-check-circle text-green-600 text-2xl" />
        </div>
        <h3 className="font-bold text-xl mb-2">Message envoyé !</h3>
        <p className="text-slate-500 text-sm">
          Merci pour votre demande. Je vous contacterai dans les plus brefs
          délais.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-blue-700 text-sm font-medium hover:underline"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            <i className="fas fa-user mr-1.5 text-blue-500" />
            Nom complet
          </label>
          <input
            type="text"
            required
            placeholder="Votre nom"
            value={form.name}
            onChange={set("name")}
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            <i className="fas fa-phone mr-1.5 text-blue-500" />
            Téléphone
          </label>
          <input
            type="tel"
            required
            placeholder="06XX XX XX XX"
            value={form.phone}
            onChange={set("phone")}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          <i className="fas fa-envelope mr-1.5 text-blue-500" />
          Email{" "}
          <span className="text-slate-400 font-normal">(optionnel)</span>
        </label>
        <input
          type="email"
          placeholder="votre@email.com"
          value={form.email}
          onChange={set("email")}
          className={inputCls}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          <i className="fas fa-laptop mr-1.5 text-blue-500" />
          Type d&apos;appareil
        </label>
        <select
          required
          value={form.device}
          onChange={set("device")}
          className={inputCls}
        >
          <option value="" disabled>
            Choisir…
          </option>
          <option>PC Portable</option>
          <option>PC Bureau</option>
          <option>Smartphone</option>
          <option>Tablette</option>
          <option>Autre</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          <i className="fas fa-message mr-1.5 text-blue-500" />
          Décrivez votre problème
        </label>
        <textarea
          required
          rows={4}
          placeholder="Ex: Mon PC surchauffe et s'éteint tout seul…"
          value={form.message}
          onChange={set("message")}
          className={`${inputCls} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-200"
      >
        <i className="fas fa-paper-plane" />
        Envoyer la demande
      </button>
    </form>
  );
}
