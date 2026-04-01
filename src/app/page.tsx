"use client";

import Image from "next/image";
import React from "react";
import {
  Phone,
  MapPin,
  MessageCircle,
  Menu,
  X,
  ChevronRight,
  Instagram,
  Facebook,
  Download,
  ArrowUpRight,
  Shield,
  Hammer,
  Tent,
  DoorClosed,
  Maximize2,
  ZoomIn,
} from "lucide-react";
import { SwingIcon, WhatsAppIcon } from "@/components/Icons";
import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { products, contactInfo, services, navLinks } from "@/lib/data";

const ALL_CATEGORY = "બધા";
const categories = [
  ALL_CATEGORY,
  ...Array.from(new Set(products.map((p) => p.category))),
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<string>(ALL_CATEGORY);
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(
    null,
  );
  const [particles, setParticles] = useState<any[]>([]);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  const filteredProducts = products.filter(
    (p) => selectedCategory === ALL_CATEGORY || p.category === selectedCategory,
  );

  useEffect(() => {
    setParticles(
      [...Array(6)].map(() => ({
        width: 200 + Math.random() * 300,
        height: 200 + Math.random() * 300,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animateX: [
          Math.random() * 100,
          Math.random() * 500,
          Math.random() * 100,
        ],
        animateY: [
          Math.random() * 100,
          Math.random() * 800,
          Math.random() * 100,
        ],
        duration: 20 + Math.random() * 10,
      })),
    );
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsApp = (productName?: string) => {
    const baseUrl = `https://wa.me/91${contactInfo.whatsapp}`;
    const message = productName
      ? `નમસ્તે ગુરુકૃપા ફેબ્રિકેશન, મને આ પ્રોડક્ટમાં રસ છે: *${productName}*. આની કિંમત કેટલી છે?`
      : `નમસ્તે ગુરુકૃપા ફેબ્રિકેશન, મારે ફેબ્રિકેશન કામ માટે પૂછપરછ કરવી છે.`;
    window.open(`${baseUrl}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="bg-[#FAF9F6] text-slate-900 font-sans transition-colors duration-500">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#C5A059]/10 blur-3xl"
            animate={{
              x: particle.animateX,
              y: particle.animateY,
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: particle.width,
              height: particle.height,
              left: particle.left,
              top: particle.top,
            }}
          />
        ))}
      </div>

      {/* Modern Navbar */}
      <nav
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
          scrolled
            ? "py-4 bg-white/80 backdrop-blur-md shadow-lg border-b border-slate-200/50"
            : "py-8 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <Image
              src="/asset/Logo.png"
              alt="ગુરુકૃપા લોગો"
              width={220}
              height={70}
              className="h-12 lg:h-16 w-auto object-contain drop-shadow-md"
            />
          </motion.div>

          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link, idx) => (
              <motion.a
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                href={link.href}
                className="text-sm font-bold uppercase tracking-[0.2em] text-slate-700 hover:text-[#C5A059] transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#C5A059] transition-all group-hover:w-full" />
              </motion.a>
            ))}

            <div className="flex items-center gap-4 pl-8 border-l border-slate-300/50">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px -10px rgba(37,211,102,0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleWhatsApp()}
                className="bg-[#25D366] text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center gap-3 transition-all"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  stroke="currentColor"
                  strokeWidth="0"
                  fill="currentColor"
                  className="fill-white"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.938 3.659 1.432 5.63 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                વોટ્સએપ
              </motion.button>
            </div>
          </div>

          <button
            className="lg:hidden p-3 text-slate-900 bg-slate-100 rounded-2xl"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-white flex flex-col overflow-hidden"
          >
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="relative z-10 p-8 flex flex-col h-full">
              <div className="flex justify-between items-center mb-16">
                <Image
                  src="/asset/Logo.png"
                  alt="ગુરુકૃપા લોગો"
                  width={150}
                  height={50}
                  className="h-10 w-auto object-contain"
                />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-4 bg-slate-100 text-slate-900 rounded-2xl hover:bg-slate-200 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.1 }}
                    href={link.href}
                    className="block text-4xl font-gujarati font-bold text-slate-900 hover:text-[#C5A059] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto space-y-6">
                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-4">
                    Contact Details
                  </p>
                  <p className="text-slate-900 font-bold text-lg mb-1">
                    {contactInfo.phone}
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {contactInfo.address}
                  </p>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleWhatsApp()}
                  className="w-full py-6 bg-[#25D366] text-white rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 shadow-xl shadow-[#25D366]/20"
                >
                  <WhatsAppIcon size={28} className="fill-white" />
                  વોટ્સએપ
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* High-End Hero Section */}
      <section className="relative min-h-[95vh] lg:min-h-screen flex items-center pt-24 lg:pt-32 pb-12 overflow-hidden">
        {/* Premium Background Enhancement - Visible but Subtle */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/asset/jula/jula1.png"
            alt="Metal Fabrication Background"
            fill
            className="object-cover opacity-20 grayscale brightness-110"
            priority
          />
          {/* Metal Texture Overlay Effect */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-10" />
          {/* Subtle Gradient Overlays for Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/40" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          <motion.div style={{ opacity, scale }} className="order-1 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              <div className="font-gujarati font-bold text-slate-900 mb-8 lg:mb-12">
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-6xl md:text-7xl lg:text-[7rem] leading-[1.3] mb-6 lg:mb-12 drop-shadow-sm"
                >
                  ગુરુકૃપા
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-5xl lg:text-[4.2rem] leading-[1.3] text-[#C5A059]"
                >
                  ફેબ્રિકેશન & ઝુલા
                </motion.div>
              </div>
              <p className="text-xl md:text-2xl font-medium text-slate-700 mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-gujarati">
                આકર્ષક ડિઝાઈનર ઝુલા અને મજબૂત ફેબ્રિકેશન કામ માટે ભરોસાપાત્ર
                નામ. અમે બનાવીએ છીએ સુંદરતા, સુરક્ષા અને અતૂટ મજબૂતીનો અદભૂત
                સમન્વય.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#gallery"
                  className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold bg-slate-900 text-white rounded-2xl shadow-2xl transition-all font-gujarati"
                >
                  ડિઝાઇન જુઓ <ChevronRight className="ml-2" size={24} />
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleWhatsApp()}
                  className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold border-4 border-slate-900 rounded-2xl transition-all font-gujarati"
                >
                  સંપર્ક કરો
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative order-2 lg:order-2"
          >
            {/* Glow effect */}
            <div className="absolute -inset-10 bg-[#C5A059]/30 rounded-[3.5rem] blur-[100px] animate-pulse pointer-events-none" />

            <div className="relative aspect-[4/3] lg:aspect-[4/5] bg-slate-200 rounded-[3rem] lg:rounded-[4rem] overflow-hidden border-[8px] lg:border-[12px] border-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] group mb-8 lg:mb-0">
              <Image
                src="/asset/Jula-1.png"
                alt="High Contrast Premium Jhula"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000 contrast-125 brightness-110 saturate-110"
                priority
              />
              {/* Subtle highlight gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80 hidden lg:block" />
              <div className="absolute bottom-6 left-6 right-6 p-6 lg:p-8 backdrop-blur-2xl bg-white/10 rounded-[2.5rem] border border-white/20 hidden lg:block">
                <span className="text-[#C5A059] font-black uppercase tracking-[0.3em] text-[10px] lg:text-[12px] block mb-2">
                  Premium Selection
                </span>
                <p className="text-white text-2xl lg:text-4xl font-bold font-gujarati leading-tight">
                  લક્ઝરી ડિઝાઈનર ઝુલા
                </p>
              </div>
            </div>

            {/* Description below image for Mobile */}
            <div className="lg:hidden text-center mt-6">
              <span className="text-[#C5A059] font-black uppercase tracking-[0.3em] text-[10px] block mb-2">
                Premium Selection
              </span>
              <p className="text-slate-900 text-2xl font-bold font-gujarati leading-tight">
                લક્ઝરી ડિઝાઈનર ઝુલા
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modern Services Grid */}
      <section id="services" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
              <span className="text-[#C5A059] font-black uppercase tracking-[0.4em] text-sm block mb-6">
                Our Services
              </span>
              <h2 className="text-5xl lg:text-7xl font-gujarati font-bold">
                અમારી ખાસ સેવાઓ
              </h2>
            </div>
            <p className="text-xl text-slate-500 max-w-sm font-medium">
              અમે શ્રેષ્ઠ ગુણવત્તા અને આધુનિક ડિઝાઇનમાં વિશ્વાસ રાખીએ છીએ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group p-8 lg:p-12 rounded-[2.5rem] lg:rounded-[3.5rem] bg-white border border-transparent hover:border-[#C5A059]/20 transition-all duration-500 shadow-xl hover:shadow-[#C5A059]/5"
              >
                <div className="mb-6 lg:mb-10 group-hover:scale-110 transition-transform duration-500 origin-left inline-block">
                  {/* Clone the icon to apply responsive sizing */}
                  {typeof service.icon !== "string" && (
                    <div className="w-12 h-12 lg:w-16 lg:h-16">
                      {React.cloneElement(service.icon as React.ReactElement, {
                        size: "100%",
                        strokeWidth: 1.5,
                      })}
                    </div>
                  )}
                  {typeof service.icon === "string" && (
                    <span className="text-5xl lg:text-6xl">{service.icon}</span>
                  )}
                </div>
                <h3 className="text-2xl lg:text-3xl font-gujarati font-bold mb-3 lg:mb-4 group-hover:text-[#C5A059] transition-colors">
                  {service.title}
                </h3>
                <p className="text-base lg:text-lg text-slate-500 font-medium">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section id="gallery" className="py-32 bg-slate-100/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-24">
            <span className="text-[#C5A059] font-black uppercase tracking-[0.4em] text-sm block mb-6">
              Our Masterpieces
            </span>
            <h2 className="text-4xl lg:text-6xl font-gujarati font-bold mb-12">
              ડિઝાઇન ગેલેરી
            </h2>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-8 py-3 rounded-2xl font-bold transition-all ${
                    selectedCategory === category
                      ? "bg-[#C5A059] text-white shadow-lg"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-[#C5A059]/30"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative group cursor-pointer"
                onClick={() => setActiveLightboxImage(product.image)}
              >
                <div className="relative aspect-square rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />

                  {/* Minimal Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-8 left-8 right-8">
                      <span className="text-[#C5A059] text-[10px] font-black uppercase tracking-[0.2em] mb-2 block">
                        {product.category}
                      </span>
                      <h3 className="text-white text-xl lg:text-2xl font-gujarati font-bold leading-tight">
                        {product.name}
                      </h3>
                      <div className="mt-4 flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest">
                        <Maximize2 size={14} />
                        મોટો ફોટો જુઓ
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-[4rem] p-12 lg:p-24 text-white overflow-hidden relative shadow-[0_50px_100px_-20px_rgba(15,23,42,0.5)]"
          >
            <div className="absolute top-0 right-0 w-[50%] h-full bg-[#C5A059]/10 skew-x-12 translate-x-1/3" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h2 className="text-3xl lg:text-5xl font-gujarati font-bold mb-10 text-center lg:text-left leading-[1.4]">
                  આજે જ <br />
                  <span className="text-[#C5A059] inline-block mt-2">
                    સંપર્ક કરો
                  </span>
                </h2>
                <div className="space-y-8 lg:space-y-12">
                  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-8 group text-center lg:text-left">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/10 rounded-xl lg:rounded-2xl flex items-center justify-center shrink-0 border border-white/20 group-hover:bg-[#C5A059] transition-colors duration-500">
                      <Phone size={24} className="lg:size-8" />
                    </div>
                    <div>
                      <p className="text-white/50 text-[10px] font-black uppercase tracking-widest mb-1">
                        Call us
                      </p>
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="text-2xl lg:text-2xl font-black hover:text-[#C5A059] transition-colors"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-8 group text-center lg:text-left">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/10 rounded-xl lg:rounded-2xl flex items-center justify-center shrink-0 border border-white/20 group-hover:bg-[#C5A059] transition-colors duration-500">
                      <MapPin size={20} className="lg:size-7 text-white" />
                    </div>
                    <div>
                      <p className="text-white/50 text-[10px] font-black uppercase tracking-widest mb-1">
                        Location
                      </p>
                      <p className="text-lg lg:text-xl font-black leading-relaxed">
                        {contactInfo.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 lg:p-16 rounded-[2.5rem] lg:rounded-[3.5rem] shadow-2xl text-slate-900">
                <h3 className="text-2xl lg:text-3xl font-gujarati font-bold mb-8 lg:mb-12 uppercase text-center lg:text-left">
                  પ્રોપરાઈટર
                </h3>
                <div className="space-y-4 lg:space-y-6">
                  {contactInfo.owners.map((owner, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 10 }}
                      className="p-4 lg:p-6 bg-slate-50 rounded-xl lg:rounded-2xl font-bold text-base lg:text-lg flex items-center justify-between group border border-transparent hover:border-[#C5A059]/20 transition-all"
                    >
                      {owner}
                      <ChevronRight
                        size={20}
                        className="text-[#C5A059] opacity-0 group-hover:opacity-100 transition-all hidden lg:block"
                      />
                    </motion.div>
                  ))}
                </div>
                <motion.a
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 30px -10px rgba(197,160,89,0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  href="/asset/Card.jpg"
                  download="Gurukrupa-Fabrication-Card.jpg"
                  className="w-full mt-6 py-4 bg-slate-50 text-slate-900 rounded-2xl lg:rounded-2xl font-bold text-base lg:text-lg flex items-center justify-center gap-3 border border-slate-200 transition-all hover:border-[#C5A059]/30"
                >
                  <Download size={20} className="text-[#C5A059]" />
                  વિઝિટિંગ કાર્ડ ડાઉનલોડ કરો
                </motion.a>
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 30px -10px rgba(37,211,102,0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleWhatsApp()}
                  className="w-full mt-8 lg:mt-12 py-5 lg:py-6 bg-[#25D366] text-white rounded-2xl lg:rounded-[2rem] font-black text-lg lg:text-xl flex items-center justify-center gap-4 shadow-2xl transition-all"
                >
                  <WhatsAppIcon size={24} className="fill-white" />
                  વોટ્સએપ
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-12 text-slate-400">
          <span className="text-4xl font-gujarati font-bold text-slate-900">
            ગુરુ<span className="text-[#C5A059]">કૃપા</span>
          </span>
          <div className="flex gap-12 font-bold uppercase tracking-widest text-xs">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#C5A059] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="/asset/Card.jpg"
              download="Gurukrupa-Fabrication-Card.jpg"
              className="hover:text-[#C5A059] transition-colors hidden md:block"
            >
              Download Card
            </a>
          </div>
        </div>

        {/* Detailed Services Description */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-16 text-center">
          <p className="text-slate-500 font-gujarati font-medium text-lg lg:text-xl leading-relaxed max-w-4xl mx-auto">
            દરેક પ્રકારનું ફેબ્રિકેશન કામ, ગ્રીલ, દાદર, દરવાજા, રેલીંગ, ફાઈબર
            સીટ ડોમ, આકર્ષક ડિઝાઈનર ઝુલા, રોલિંગ શટર નવું બનાવનાર તથા રીપેરીંગ
            કરનાર.
            <br className="hidden md:block" />
            <span className="text-[#C5A059] font-bold mt-2 inline-block">
              દરેક પ્રકારનું લોખંડનું કામ મજૂરીથી કરી આપીશું.
            </span>
          </p>
        </div>

        <div className="text-center mt-12 text-xs font-black text-slate-300 uppercase tracking-[0.5em]">
          © {new Date().getFullYear()} GURUKRUPA FABRICATION • BHAVNAGAR
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.button
        whileHover={{
          scale: 1.1,
          boxShadow: "0 20px 40px -10px rgba(37,211,102,0.5)",
        }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleWhatsApp()}
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-2xl flex items-center justify-center shadow-2xl z-[100] overflow-hidden transition-all"
      >
        <WhatsAppIcon size={32} className="fill-white" />
        <span className="absolute inset-0 bg-white/20 animate-ping opacity-20" />
      </motion.button>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center p-4 lg:p-12"
            onClick={() => setActiveLightboxImage(null)}
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-8 right-8 text-white/50 hover:text-white z-50 p-4"
              onClick={() => setActiveLightboxImage(null)}
            >
              <X size={40} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full h-full flex flex-col items-center justify-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full max-w-4xl aspect-square lg:aspect-[4/3] rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10 shrink-0">
                <Image
                  src={activeLightboxImage}
                  alt="Full view"
                  fill
                  className="object-contain lg:object-cover"
                  priority
                />
              </div>

              {/* Inquiry Overlay below image in Lightbox */}
              <div className="w-full max-w-4xl p-6 lg:p-10 bg-white/10 backdrop-blur-2xl rounded-[2rem] lg:rounded-[3rem] border border-white/20">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <p className="text-[#C5A059] text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                      ગુરુકૃપા ફેબ્રિકેશન
                    </p>
                    <h4 className="text-white text-xl lg:text-3xl font-gujarati font-bold">
                      આ પ્રોડક્ટ વિશે પૂછપરછ કરો
                    </h4>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleWhatsApp("Gallery Image")}
                    className="bg-[#25D366] text-white px-8 lg:px-10 py-4 lg:py-5 rounded-2xl font-black text-base lg:text-lg flex items-center gap-4 shadow-2xl w-full md:w-auto justify-center"
                  >
                    <WhatsAppIcon size={28} className="fill-white" />
                    વોટ્સએપ મેસેજ
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
