/* eslint-disable react-hooks/purity */
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

function Story() {
  const navigate = useNavigate();

  const handleBegin = () => {
    navigate('/questionnaire');
  };

  return (
    <div className="min-h-screen w-full bg-[#050409] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-slow ${Math.random() * 5 + 4}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Glow shapes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-900/20 rounded-full filter blur-3xl opacity-60 animate-pulse-slow pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-900/15 rounded-full filter blur-3xl opacity-50 animate-pulse-slow pointer-events-none z-0" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 max-w-xl w-full text-center">
        {/* Animated Magic Sorting Crystal */}
        <div className="relative w-48 h-64 mx-auto mb-10 group">
          {/* Back glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-purple-500/20 blur-2xl group-hover:bg-purple-500/40 transition duration-700 animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-blue-500/15 blur-3xl group-hover:bg-blue-500/30 transition duration-700 animate-pulse" style={{ animationDelay: '1s' }} />

          {/* Glowing Crystal SVG */}
          <svg className="w-full h-full text-purple-400 animate-float drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#glow)">
              {/* Outer crystal facets */}
              <polygon points="50,10 32,45 50,60" fill="rgba(168, 85, 247, 0.25)" stroke="#a855f7" strokeWidth="1.5" />
              <polygon points="50,10 50,60 68,45" fill="rgba(192, 132, 252, 0.3)" stroke="#c084fc" strokeWidth="1.5" />
              <polygon points="32,45 20,60 50,60" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="1" />
              <polygon points="68,45 50,60 80,60" fill="rgba(59, 130, 246, 0.25)" stroke="#3b82f6" strokeWidth="1" />
              
              {/* Bottom facet reflections */}
              <polygon points="50,110 32,75 50,60" fill="rgba(147, 51, 234, 0.3)" stroke="#a855f7" strokeWidth="1.5" />
              <polygon points="50,110 50,60 68,75" fill="rgba(168, 85, 247, 0.35)" stroke="#c084fc" strokeWidth="1.5" />
              <polygon points="32,75 20,60 50,60" fill="rgba(37, 99, 235, 0.25)" stroke="#2563eb" strokeWidth="1" />
              <polygon points="68,75 50,60 80,60" fill="rgba(37, 99, 235, 0.3)" stroke="#2563eb" strokeWidth="1" />
            </g>
            
            {/* Sparkle details */}
            <circle cx="50" cy="60" r="2" fill="#ffd700" className="animate-ping" style={{ animationDuration: '3s' }} />
            <circle cx="36" cy="40" r="1.5" fill="#fff" />
            <circle cx="64" cy="80" r="1.5" fill="#fff" />
            
            {/* Filters */}
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
          </svg>
        </div>

        {/* Text Presentation */}
        <div className="glass-panel-purple p-8 border border-purple-500/20 mb-8 animate-slide-up">
          <div className="inline-flex items-center gap-1 bg-purple-950/60 border border-purple-500/30 px-3 py-1 rounded-full text-xs font-semibold text-purple-300 uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>The Magic Sorting Ceremony</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-yellow-100 to-purple-200 tracking-wide mb-6">
            The Magic Sorting Crystal Awaits...
          </h2>
          
          <p className="text-purple-200 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-2 font-light">
            Before entering the hallowed halls of Bodha Wizard Academy, your destiny must be charted.
          </p>
          <p className="text-yellow-200/90 text-sm sm:text-base font-cinzel tracking-wide">
            Answer a few questions to discover your magical destiny.
          </p>
        </div>

        {/* Button to questionnaire */}
        <button
          onClick={handleBegin}
          className="btn-gold px-8 py-3.5 rounded-lg flex items-center justify-center gap-3.5 mx-auto group text-sm sm:text-base uppercase tracking-widest font-black"
        >
          <span>Begin Journey</span>
          <ArrowRight className="w-5 h-5 text-purple-950 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}

export default Story;
