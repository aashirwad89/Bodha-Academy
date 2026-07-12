/* eslint-disable react-hooks/purity */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Shield, Compass, Activity } from 'lucide-react';

function Result() {
  const navigate = useNavigate();
  const [wizard, setWizard] = useState(null);

  useEffect(() => {
    const cachedUser = localStorage.getItem('user');
    if (cachedUser) {
      try {
        setWizard(JSON.parse(cachedUser));
      } catch (e) {
        console.error(e);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!wizard) {
    return (
      <div className="min-h-screen w-full bg-[#050409] flex items-center justify-center">
        <p className="text-purple-300 animate-pulse">Reading destiny scrolls...</p>
      </div>
    );
  }

  const { name, house, favElement, companion, weapon, magicPower, stats } = wizard;

  // House-specific styling systems
  const houseConfig = {
    Aetherion: {
      color: 'text-purple-400',
      border: 'border-purple-500/30 hover:border-purple-400/50',
      glow: 'shadow-[0_0_30px_rgba(168,85,247,0.25)]',
      bgGlow: 'bg-purple-900/10',
      desc: 'The house of celestial wisdom, cosmic exploration, and master spellcrafting.',
      iconColor: '#c084fc'
    },
    Ignisaur: {
      color: 'text-red-400',
      border: 'border-red-500/30 hover:border-red-400/50',
      glow: 'shadow-[0_0_30px_rgba(239,68,68,0.25)]',
      bgGlow: 'bg-red-900/10',
      desc: 'The house of blazing bravery, peerless leadership, and combat defense.',
      iconColor: '#f87171'
    },
    Terraflora: {
      color: 'text-emerald-400',
      border: 'border-emerald-500/30 hover:border-emerald-400/50',
      glow: 'shadow-[0_0_30px_rgba(16,185,129,0.25)]',
      bgGlow: 'bg-emerald-900/10',
      desc: 'The house of natural patience, herbal mastery, and beast relations.',
      iconColor: '#34d399'
    },
    Celestia: {
      color: 'text-blue-400',
      border: 'border-blue-500/30 hover:border-blue-400/50',
      glow: 'shadow-[0_0_30px_rgba(59,130,246,0.25)]',
      bgGlow: 'bg-blue-900/10',
      desc: 'The house of fluid creativity, ancient runes, and magical items curation.',
      iconColor: '#60a5fa'
    }
  };

  const currentHouse = houseConfig[house] || houseConfig.Aetherion;

  const handleEnterAcademy = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full bg-[#050409] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      
      {/* Background gradients */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full filter blur-3xl opacity-30 pointer-events-none z-0 ${currentHouse.bgGlow}`} />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 4 + 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-xl text-center">
        
        {/* Subtitle Label */}
        <div className="inline-flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-yellow-400 uppercase tracking-widest mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Destiny Revealed</span>
        </div>

        {/* Large Animated Glass Card */}
        <div className={`glass-panel p-8 text-left transition-all duration-500 ${currentHouse.border} ${currentHouse.glow} animate-float mb-8`}>
          
          {/* Card Title & House Crest */}
          <div className="flex flex-col items-center border-b border-purple-500/10 pb-6 mb-6 text-center">
            
            {/* Custom crest based on house */}
            <div className="relative mb-4">
              <div className="absolute inset-0 rounded-full bg-yellow-500/10 blur-md animate-ping" style={{ animationDuration: '4s' }} />
              <Shield className="w-16 h-16 text-yellow-400 drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
              <span className="absolute inset-0 flex items-center justify-center text-xl font-black text-yellow-400">
                {house[0]}
              </span>
            </div>

            <h3 className="text-sm font-cinzel text-slate-400 tracking-widest uppercase mb-1">
              Wizard {name} belongs to
            </h3>
            
            <h1 className={`text-4xl font-black tracking-wider uppercase bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent drop-shadow-md mb-2`}>
              HOUSE {house}
            </h1>
            
            <p className="text-slate-400 text-xs italic max-w-sm">
              "{currentHouse.desc}"
            </p>
          </div>

          {/* Wizard Attributes (Companion, Weapon, Magic Power, etc) */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            
            <div className="bg-[#120d24]/40 border border-purple-500/10 rounded-xl p-3 flex items-center gap-3">
              <div className="w-9 h-9 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-300">
                🔮
              </div>
              <div>
                <p className="text-[10px] text-purple-400 uppercase font-semibold">Element Affinity</p>
                <p className="text-sm font-cinzel font-bold text-slate-200">{favElement}</p>
              </div>
            </div>

            <div className="bg-[#120d24]/40 border border-purple-500/10 rounded-xl p-3 flex items-center gap-3">
              <div className="w-9 h-9 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-300">
                🐾
              </div>
              <div>
                <p className="text-[10px] text-purple-400 uppercase font-semibold">Magical Companion</p>
                <p className="text-sm font-cinzel font-bold text-slate-200">{companion}</p>
              </div>
            </div>

            <div className="bg-[#120d24]/40 border border-purple-500/10 rounded-xl p-3 flex items-center gap-3">
              <div className="w-9 h-9 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-300">
                ⚔
              </div>
              <div>
                <p className="text-[10px] text-purple-400 uppercase font-semibold">Magical Weapon</p>
                <p className="text-sm font-cinzel font-bold text-slate-200">{weapon}</p>
              </div>
            </div>

            <div className="bg-[#120d24]/40 border border-purple-500/10 rounded-xl p-3 flex items-center gap-3">
              <div className="w-9 h-9 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-300">
                ⚡
              </div>
              <div>
                <p className="text-[10px] text-purple-400 uppercase font-semibold">Magic Power</p>
                <p className="text-sm font-cinzel font-bold text-yellow-400 text-glow-gold">{magicPower}%</p>
              </div>
            </div>

          </div>

          {/* Stats Bar Layout */}
          <div className="space-y-4 border-t border-purple-500/10 pt-5">
            <h4 className="text-xs uppercase font-cinzel text-yellow-400 tracking-wider mb-2 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-yellow-400" />
              <span>Destiny Stats</span>
            </h4>
            
            {/* Leadership */}
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1 font-medium">
                <span>Leadership</span>
                <span className="text-yellow-400">{stats?.leadership || 50}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-yellow-500 rounded-full"
                  style={{ width: `${stats?.leadership || 50}%` }}
                />
              </div>
            </div>

            {/* Wisdom */}
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1 font-medium">
                <span>Wisdom</span>
                <span className="text-yellow-400">{stats?.wisdom || 50}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-yellow-500 rounded-full"
                  style={{ width: `${stats?.wisdom || 50}%` }}
                />
              </div>
            </div>

            {/* Creativity */}
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1 font-medium">
                <span>Creativity</span>
                <span className="text-yellow-400">{stats?.creativity || 50}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-yellow-500 rounded-full"
                  style={{ width: `${stats?.creativity || 50}%` }}
                />
              </div>
            </div>

            {/* Bravery */}
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1 font-medium">
                <span>Bravery</span>
                <span className="text-yellow-400">{stats?.bravery || 50}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-yellow-500 rounded-full"
                  style={{ width: `${stats?.bravery || 50}%` }}
                />
              </div>
            </div>

          </div>

        </div>

        {/* Enter Academy Button */}
        <button
          onClick={handleEnterAcademy}
          className="btn-gold px-8 py-3.5 rounded-lg flex items-center justify-center gap-3.5 mx-auto group text-sm uppercase tracking-widest font-black"
        >
          <span>Enter Academy</span>
          <Compass className="w-5 h-5 text-purple-950 group-hover:rotate-45 transition-transform" />
        </button>

      </div>
    </div>
  );
}

export default Result;
