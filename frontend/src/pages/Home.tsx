
import { useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Sparkles, Wand2 } from 'lucide-react';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const { wizardId = 'Unknown', spellName = '' } = location.state || {};

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 relative overflow-hidden">
      {/* Animated star background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.6 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse" />

      {/* Header */}
      <nav className="relative z-10 border-b border-purple-500/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wand2 className="w-8 h-8 text-yellow-400 animate-spin-slow" />
            <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              WIZARD REALM
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 hover:border-red-400 text-red-300 hover:text-red-200 rounded-lg transition-all duration-300 font-semibold"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Welcome Card */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-purple-500/30 backdrop-blur-sm mb-8 animate-slide-up">
          <div className="flex items-start gap-4 mb-6">
            <Sparkles className="w-12 h-12 text-pink-400 flex-shrink-0 animate-spin-slow" />
            <div>
              <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-2">
                Welcome to the Magical Realm!
              </h2>
              <p className="text-purple-200 text-lg">
                Your magical credentials have been verified, {wizardId}.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-slate-700/30 rounded-lg p-4 border border-purple-400/20 hover:border-purple-400/50 transition-all duration-300">
              <p className="text-purple-300 text-sm font-semibold mb-1">🔮 Wizard ID</p>
              <p className="text-white font-mono text-lg">{wizardId}</p>
            </div>

            <div className="bg-slate-700/30 rounded-lg p-4 border border-purple-400/20 hover:border-purple-400/50 transition-all duration-300">
              <p className="text-purple-300 text-sm font-semibold mb-1">✨ Secret Spell</p>
              <p className="text-white font-mono text-lg">••••••••••</p>
            </div>

            <div className="bg-slate-700/30 rounded-lg p-4 border border-purple-400/20 hover:border-purple-400/50 transition-all duration-300">
              <p className="text-purple-300 text-sm font-semibold mb-1">🌟 Status</p>
              <p className="text-green-400 font-semibold text-lg">Authenticated</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Feature 1 */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                <Wand2 className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-purple-300">Spell Library</h3>
            </div>
            <p className="text-slate-300">
              Explore ancient magical spells and incantations. Master the art of magic with our comprehensive grimoire.
            </p>
            <button className="mt-4 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/50 text-purple-300 rounded-lg transition-all duration-300">
              Explore Spells
            </button>
          </div>

          {/* Feature 2 */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-pink-500/30 hover:border-pink-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10 group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center group-hover:bg-pink-500/30 transition-colors">
                <Sparkles className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-xl font-bold text-pink-300">Magical Artifacts</h3>
            </div>
            <p className="text-slate-300">
              Discover and collect powerful artifacts. Each item holds unique magical properties waiting to be unlocked.
            </p>
            <button className="mt-4 px-4 py-2 bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/50 text-pink-300 rounded-lg transition-all duration-300">
              View Artifacts
            </button>
          </div>

          {/* Feature 3 */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                <div className="w-6 h-6 text-blue-400">📚</div>
              </div>
              <h3 className="text-xl font-bold text-blue-300">Wizarding School</h3>
            </div>
            <p className="text-slate-300">
              Learn from master wizards. Take courses to improve your magical abilities and unlock new levels of power.
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/50 text-blue-300 rounded-lg transition-all duration-300">
              Enroll Now
            </button>
          </div>

          {/* Feature 4 */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                <div className="w-6 h-6 text-green-400">⚡</div>
              </div>
              <h3 className="text-xl font-bold text-green-300">Magical Duels</h3>
            </div>
            <p className="text-slate-300">
              Challenge other wizards to magical combat. Test your skills and climb the leaderboards of the magical realm.
            </p>
            <button className="mt-4 px-4 py-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/50 text-green-300 rounded-lg transition-all duration-300">
              Enter Arena
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-slate-400 font-serif tracking-wide">
          <p>✨ Welcome to the Wizard Realm ✨</p>
          <p className="text-sm mt-2">May your magic be strong and your spells be true</p>
        </div>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-twinkle {
          animation: twinkle 4s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Home;