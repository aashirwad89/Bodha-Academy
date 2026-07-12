/* eslint-disable react-hooks/purity */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

function Splash() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Increment progress bar smoothly
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 80);

    // Redirect after 2.5 seconds
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen w-full bg-[#050409] flex flex-col justify-between items-center py-16 px-4 relative overflow-hidden">
      {/* Floating dust particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-purple-400/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 4 + 2}s`
            }}
          />
        ))}
      </div>

      {/* Cosmic glow circles */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-900/25 rounded-full filter blur-3xl opacity-60 animate-pulse-slow z-0" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-900/20 rounded-full filter blur-3xl opacity-60 animate-pulse-slow z-0" style={{ animationDelay: '2s' }} />

      {/* Top space filler */}
      <div className="h-4"></div>

      {/* Center Logo & Greeting */}
      <div className="flex flex-col items-center text-center z-10 max-w-lg mt-8">
        {/* Glowing Academy Logo Crest SVG */}
        <div className="relative mb-8 group animate-float">
          <div className="absolute inset-0 rounded-full bg-purple-500/25 blur-xl group-hover:bg-purple-500/45 transition duration-500"></div>
          <svg className="w-28 h-28 relative z-10 text-yellow-400 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="#d4af37" strokeWidth="2.5" strokeDasharray="4 2" />
            <circle cx="50" cy="50" r="40" stroke="#d4af37" strokeWidth="1" />
            {/* Shield */}
            <path d="M50 22 C62 22 68 28 68 45 C68 62 50 78 50 78 C50 78 32 62 32 45 C32 28 38 22 50 22 Z" fill="rgba(88, 28, 135, 0.4)" stroke="#d4af37" strokeWidth="2" />
            {/* Wand cross */}
            <path d="M38 62 L62 38" stroke="#ffd700" strokeWidth="2.5" strokeLinecap="round" />
            {/* Spell orb */}
            <circle cx="50" cy="50" r="10" fill="#ffd700" className="animate-pulse" style={{ animationDuration: '1.5s' }} />
            {/* Stars */}
            <path d="M50 28 L51 31 L54 31 L52 33 L53 36 L50 34 L47 36 L48 33 L46 31 L49 31 Z" fill="#ffd700" />
            <path d="M38 42 L39 44 L41 44 L39 45 L40 47 L38 46 L36 47 L37 45 L35 44 L37 44 Z" fill="#93c5fd" />
            <path d="M62 42 L63 44 L65 44 L63 45 L64 47 L62 46 L60 47 L61 45 L59 44 L61 44 Z" fill="#93c5fd" />
          </svg>
          <div className="absolute -bottom-2 -right-2 bg-purple-900 border border-yellow-500/50 p-1.5 rounded-full shadow-lg">
            <Sparkles className="w-5 h-5 text-yellow-400 animate-spin-slow" />
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-wider bg-gradient-to-r from-purple-200 via-yellow-200 to-purple-200 bg-clip-text text-transparent drop-shadow-md mb-3 font-cinzel px-2 text-center">
          BODHA WIZARD ACADEMY
        </h1>
        <p className="text-purple-300 text-base sm:text-lg font-cinzel font-medium tracking-widest mb-6">
          "Your magical journey begins..."
        </p>

        {/* Loading progress bar */}
        <div className="w-64 h-1.5 bg-purple-950/60 rounded-full border border-purple-500/10 overflow-hidden relative backdrop-blur-md">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 via-yellow-500 to-blue-500 rounded-full transition-all duration-75 shadow-[0_0_8px_rgba(212,175,55,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Castle Silhouette Footer SVG */}
      <div className="w-full max-w-4xl opacity-30 mt-6 z-10 pointer-events-none select-none relative">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050409] via-transparent to-transparent z-10" />
        <svg className="w-full h-44 text-[#1a113d]" viewBox="0 0 1000 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Mountains & Hills in background */}
          <path d="M0 190 Q120 120 280 180 T600 160 T1000 190 L1000 200 L0 200 Z" fill="#0d0922" />
          {/* Main Castle Structure */}
          <path d="
            M 420 190 L 420 120 L 435 120 L 435 190
            M 435 180 L 435 110 L 450 110 L 450 180
            M 450 180 L 550 180 L 550 190
            M 550 190 L 550 120 L 565 120 L 565 190
            M 565 180 L 565 110 L 580 110 L 580 180
            M 470 180 L 470 90 L 485 90 L 485 180
            M 515 180 L 515 90 L 530 90 L 530 180
            M 480 180 L 480 70 L 520 70 L 520 180
          " fill="#130d2f" stroke="#251a56" strokeWidth="1" />
          
          {/* Spires & Cones */}
          <path d="
            M 475 70 L 500 10 L 525 70 Z
            M 415 120 L 427 80 L 440 120 Z
            M 430 110 L 442 70 L 455 110 Z
            M 545 120 L 557 80 L 570 120 Z
            M 560 110 L 572 70 L 585 110 Z
            M 465 90 L 477 55 L 490 90 Z
            M 510 90 L 522 55 L 535 90 Z
          " fill="#100b29" stroke="#2a1f63" strokeWidth="1" />

          {/* Spires stars / flags */}
          <path d="M500 10 L500 2 M500 2 L505 5 L500 8" stroke="#d4af37" strokeWidth="1.5" />
          <path d="M427 80 L427 75" stroke="#d4af37" strokeWidth="1" />
          <path d="M572 70 L572 65" stroke="#d4af37" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}

export default Splash;
