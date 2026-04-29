"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ─── Gold particle background ─────────────────────────── */
function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.4 + 0.1,
        opacity: Math.random() * 0.6 + 0.2,
      });
    }

    let animId: number;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`;
        ctx.fill();
        p.y -= p.speed;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
      });
      animId = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
      style={{ opacity: 0.5 }}
    />
  );
}

/* ─── Animated gold line divider ────────────────────────── */
function GoldDivider() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="my-8 mx-auto"
      style={{
        height: "1px",
        width: "60%",
        background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
        transformOrigin: "center",
      }}
    />
  );
}

/* ─── Hero Section ──────────────────────────────────────── */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      {/* Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/ferrari.jpg')" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.9) 100%)" }} />
      </motion.div>

      <GoldParticles />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 px-6 max-w-5xl mx-auto">
        {/* La Milagrosa logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 flex justify-center"
        >
          <img src="/la_milagrosa_burger.png" alt="La Milagrosa Burger House" className="h-16 object-contain" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-xs uppercase mb-4"
          style={{ color: "#D4AF37", fontFamily: "'Cormorant Garamond', serif" }}
        >
          Exclusividad · Pasión · Estilo
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-black uppercase"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3.5rem, 10vw, 8rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            background: "linear-gradient(135deg, #f5e17a 0%, #D4AF37 40%, #8B6914 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          CARROS
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="my-4"
          style={{ height: "1px", background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="text-3xl font-light tracking-widest mb-2"
          style={{ color: "#D4AF37", fontFamily: "'Cormorant Garamond', serif" }}
        >
          &amp;
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-black uppercase"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 7vw, 5.5rem)",
            lineHeight: 1,
            letterSpacing: "0.05em",
            color: "#fff",
          }}
        >
          HAMBURGUESAS
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => document.getElementById("event-info")?.scrollIntoView({ behavior: "smooth" })}
            className="px-10 py-4 font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #D4AF37, #8B6914)",
              color: "#000",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.9rem",
              letterSpacing: "0.2em",
              border: "none",
            }}
          >
            Ver Evento
          </button>
          <a
            href="https://maps.app.goo.gl/xwCjAcoDeKaqJn6t9"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105"
            style={{
              border: "1px solid #D4AF37",
              color: "#D4AF37",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.9rem",
              letterSpacing: "0.2em",
              background: "transparent",
            }}
          >
            Ver Ubicación
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-px h-12" style={{ background: "linear-gradient(180deg, #D4AF37, transparent)" }} />
      </motion.div>
    </section>
  );
}

/* ─── Event Info ─────────────────────────────────────────── */
function EventInfo() {
  return (
    <section id="event-info" className="bg-black text-white py-24 relative overflow-hidden">
      {/* subtle gold bg glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase mb-4"
          style={{ color: "#D4AF37", fontFamily: "'Cormorant Garamond', serif" }}
        >
          El Evento
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-12"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            background: "linear-gradient(135deg, #f5e17a, #D4AF37)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Detalles
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: "📍", label: "Lugar", value: "La Milagrosa Burger House", sub: "Pereira" },
            { icon: "🗓", label: "Fecha", value: "Sábado 14 de Junio", sub: "2025" },
            { icon: "🚗", label: "Actividades", value: "Autos · Hamburguesas", sub: "Cultura & Estilo" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="p-8 relative"
              style={{ border: "1px solid rgba(212,175,55,0.25)", background: "rgba(212,175,55,0.03)" }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#D4AF37" }}>{item.label}</p>
              <p className="text-xl font-semibold text-white mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{item.value}</p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{item.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Invitation Section ─────────────────────────────────── */
function Invitation() {
  return (
    <section className="bg-black text-white py-24 relative">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="p-12 relative"
          style={{ border: "1px solid rgba(212,175,55,0.4)" }}
        >
          {/* corner accents */}
          {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-4 h-4`} style={{ borderColor: "#D4AF37", borderStyle: "solid", borderWidth: i < 2 ? "2px 0 0 2px" : "0 2px 2px 0" }} />
          ))}

          <p className="text-xs uppercase tracking-widest mb-8" style={{ color: "#D4AF37", letterSpacing: "0.4em" }}>
            Te Invitamos a Disfrutar
          </p>

          <p className="text-lg leading-relaxed text-gray-300 mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem" }}>
            Tu pasión por los{" "}
            <span style={{ color: "#D4AF37", fontWeight: 700 }}>AUTOS</span>{" "}
            y el apoyo a la{" "}
            <span style={{ color: "#D4AF37", fontWeight: 700 }}>CULTURA</span>{" "}
            de nuestra ciudad son una inspiración para todos.
          </p>

          <GoldDivider />

          <p className="text-lg leading-relaxed text-gray-300 mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem" }}>
            Nos vemos en{" "}
            <span style={{ color: "#D4AF37", fontWeight: 700 }}>LA MILAGROSA</span>{" "}
            para compartir una noche increíble llena de{" "}
            <span style={{ color: "#D4AF37", fontWeight: 700 }}>MOTORES</span>{" "}
            y las mejores{" "}
            <span style={{ color: "#D4AF37", fontWeight: 700 }}>HAMBURGUESAS</span>.
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-2xl font-bold uppercase tracking-widest"
            style={{ color: "#D4AF37", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.3em" }}
          >
            ¡Te Esperamos!
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Organizers ─────────────────────────────────────────── */
function Organizers() {
  const organizers = [
    { name: "EJE Racing Motors", img: "/eje_racing.png", href: "#" },
    { name: "Motor Sports", img: "/motor_sports.png", href: "#" },
    { name: "Alejo Spotter Pereira", img: "/alejo_spotter.png", href: "#" },
    { name: "Exotic Cars Pereira", img: "/exotic_cars.png", href: "#" },
  ];
  const sponsors = [
    { name: "ossaXstreet", img: "/ossaxstreet.png", href: "#" },
    { name: "Starblack", img: "/starblack.png", href: "#" },
    { name: "Eje Bikers Motocicletas", img: "/ejebikers.png", href: "#" },
    { name: "KC", img: "/kc_logo.png", href: "#" },
  ];

  return (
    <section className="bg-black text-white py-24">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-widest mb-4"
          style={{ color: "#D4AF37", letterSpacing: "0.5em" }}
        >
          Organizadores
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-16"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            background: "linear-gradient(135deg, #f5e17a, #D4AF37)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Con el apoyo de
        </motion.h2>

        <div className="flex flex-wrap justify-center items-center gap-10 mb-16">
          {organizers.map((org, i) => (
            <motion.a
              key={i}
              href={org.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.1, filter: "brightness(1.3)" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-3"
            >
              <img
                src={org.img}
                alt={org.name}
                className="h-20 object-contain"
                style={{ filter: "brightness(0.9) sepia(0.3) saturate(1.5)" }}
              />
              <span className="text-xs tracking-widest" style={{ color: "rgba(212,175,55,0.6)", letterSpacing: "0.2em" }}>
                {org.name}
              </span>
            </motion.a>
          ))}
        </div>

        <GoldDivider />

        <p className="text-xs uppercase tracking-widest mb-10 mt-10" style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.4em" }}>
          Patrocinadores
        </p>

        <div className="flex flex-wrap justify-center items-center gap-10">
          {sponsors.map((sp, i) => (
            <motion.a
              key={i}
              href={sp.href}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.1, filter: "brightness(1.4)" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={sp.img}
                alt={sp.name}
                className="h-14 object-contain"
                style={{ filter: "brightness(0.8) sepia(0.2) saturate(1.3)" }}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ────────────────────────────────────────────────── */
function CTA() {
  return (
    <section className="relative py-32 text-white text-center overflow-hidden" style={{ background: "#0a0a0a" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black mb-6 uppercase"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            background: "linear-gradient(135deg, #f5e17a 0%, #D4AF37 50%, #8B6914 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.02em",
          }}
        >
          ¡No te lo pierdas!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-gray-400 mb-10 text-lg"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Vive una noche de motores, exclusividad y estilo
        </motion.p>

        <motion.a
          href="https://maps.app.goo.gl/xwCjAcoDeKaqJn6t9"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block px-12 py-5 font-bold uppercase tracking-widest"
          style={{
            background: "linear-gradient(135deg, #D4AF37, #8B6914)",
            color: "#000",
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: "0.25em",
            fontSize: "0.9rem",
          }}
        >
          Ver Ubicación
        </motion.a>

        <div className="mt-16" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", letterSpacing: "0.3em" }}>
          <p>📍 LA MILAGROSA BURGER HOUSE · PEREIRA</p>
        </div>
      </div>
    </section>
  );
}

/* ─── Root Page ──────────────────────────────────────────── */
export default function CarrosPage() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap"
        rel="stylesheet"
      />
      <main style={{ background: "#000" }}>
        <Hero />
        <EventInfo />
        <Invitation />
        <Organizers />
        <CTA />
      </main>
    </>
  );
}
