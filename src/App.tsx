import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { X, Send, ChevronRight, MousePointer2 } from 'lucide-react';
import logo from './assets/logo.png';

// Import images correctly for Vite
const thumbnailFiles = [
  '7 Days Surviving ver2.jpg',
  'Hunting Monkeys ver2 fix.jpg',
  'Oud Toekomst 03.jpg',
  'photo_2025-05-27_21-49-20.jpg',
  'photo_2025-10-04_16-00-08.jpg',
  'photo_2026-01-20_13-08-26 (2).jpg',
  'photo_2026-01-20_13-08-26 (3).jpg',
  'photo_2026-01-20_13-08-26 (4).jpg',
  'photo_2026-01-20_13-08-26 (5).jpg',
  'photo_2026-01-20_13-08-26.jpg',
];

// Helper to get image path
const getImgPath = (name: string) => new URL(`./assets/thumbnails/${name}`, import.meta.url).href;

const BeforeAfterSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(position, 0), 100));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-ew-resize border border-white/10"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      <img 
        src={getImgPath(thumbnailFiles[0])} 
        alt="After" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div 
        className="absolute inset-0 w-full h-full grayscale brightness-50"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img 
          src={getImgPath(thumbnailFiles[0])} 
          alt="Before" 
          className="w-full h-full object-cover"
        />
      </div>
      <div 
        className="absolute inset-y-0 w-0.5 bg-white z-10"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-black">
          <MousePointer2 size={16} />
        </div>
      </div>
    </div>
  );
};

const MarqueeRow = ({ reverse = false }: { reverse?: boolean }) => (
  <div className="flex overflow-hidden select-none gap-6 py-3">
    <motion.div 
      initial={{ x: reverse ? "-100%" : "0%" }}
      animate={{ x: reverse ? "0%" : "-100%" }}
      transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
      className="flex flex-none gap-6 min-w-full"
    >
      {[...thumbnailFiles, ...thumbnailFiles].map((name, i) => (
        <div key={i} className="w-80 h-44 rounded-xl overflow-hidden flex-none grayscale opacity-10">
          <img src={getImgPath(name)} className="w-full h-full object-cover" alt="" />
        </div>
      ))}
    </motion.div>
  </div>
);

function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="bg-[#050505] min-h-screen text-white overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="mt-20">
          <MarqueeRow />
          <MarqueeRow reverse />
          <MarqueeRow />
        </div>
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center bg-black/50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <span className="font-bold text-xl tracking-tighter">DEZZZY</span>
        </div>
        <a href="https://forms.gle/wt6W6S7f8u63cThw9" target="_blank" className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm">ORDER NOW</a>
      </nav>

      {/* Hero */}
      <motion.section style={{ opacity }} className="relative h-screen flex flex-col items-center justify-center text-center z-10 px-4">
        <img src={logo} alt="Dezzzy" className="w-32 h-32 mb-8 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]" />
        <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter mb-4">DEZZZY</h1>
        <p className="text-white/50 text-lg max-w-xl mb-10">HIGH-CONVERSION YOUTUBE THUMBNAILS</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://forms.gle/wt6W6S7f8u63cThw9" target="_blank" className="bg-white text-black px-10 py-4 rounded-xl font-black text-xl flex items-center gap-2">
            ORDER NOW <ChevronRight />
          </a>
          <div className="flex gap-2">
            <a href="https://x.com/DezzzyDesign" target="_blank" className="p-4 border border-white/10 rounded-xl hover:bg-white/5"><X /></a>
            <a href="https://t.me/dezzzydesign" target="_blank" className="p-4 border border-white/10 rounded-xl hover:bg-white/5"><Send /></a>
          </div>
        </div>
      </motion.section>

      {/* Portfolio */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-black italic mb-12 uppercase">Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {thumbnailFiles.slice(0, 6).map((name, i) => (
            <div key={i} className="group relative aspect-video rounded-2xl overflow-hidden border border-white/10">
              <img src={getImgPath(name)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
            </div>
          ))}
        </div>
      </section>

      {/* Before After */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-black italic mb-8 text-center uppercase">Before / After</h2>
        <BeforeAfterSlider />
      </section>

      {/* About */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-black italic mb-6 uppercase">Ruslan, 19</h2>
            <p className="text-xl text-white/60 leading-relaxed">
              Based in Germany. 5 years of experience in visual design.
              I create thumbnails that drive clicks and grow channels.
            </p>
          </div>
          <div className="bg-white/5 p-12 rounded-3xl border border-white/10 flex justify-center">
            <img src={logo} className="w-48 h-48 opacity-50" alt="" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 p-12 border-t border-white/5 text-center text-white/30 text-sm">
        <p>© 2026 DEZZZY. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}

export default App;
