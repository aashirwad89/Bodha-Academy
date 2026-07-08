import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Wand2, Shield, Sparkles, BookOpen } from 'lucide-react';
import Navbar from '../components/Navbar';
import API_BASE_URL from '../config';

function Dashboard() {
  const navigate = useNavigate();
  const [wizard, setWizard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setWizard(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      } catch (err) {
        console.error('Error fetching wizard details:', err);
        setErrorMsg('Failed to summon your profile scroll. Try logging in again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="page-wrapper items-center justify-center flex">
        <div className="text-center">
          <Wand2 className="w-12 h-12 text-yellow-400 animate-float mx-auto mb-4" />
          <p className="text-purple-300 animate-pulse text-sm tracking-widest font-cinzel">Summoning wizard dashboard...</p>
        </div>
      </div>
    );
  }

  if (errorMsg || !wizard) {
    return (
      <div className="page-wrapper items-center justify-center flex p-4">
        <div className="glass-panel p-6 border border-red-500/20 max-w-sm w-full text-center">
          <p className="text-red-300 mb-4">{errorMsg || 'Could not fetch profile details.'}</p>
          <button onClick={handleLogout} className="btn-gold px-4 py-2 rounded-lg text-xs">
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  // House specifics
  const houseColors = {
    Aetherion: 'text-purple-400 border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)] bg-purple-900/10',
    Ignisaur: 'text-red-400 border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.15)] bg-red-900/10',
    Terraflora: 'text-emerald-400 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)] bg-emerald-900/10',
    Celestia: 'text-blue-400 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)] bg-blue-900/10'
  };

  const currentHouseClass = houseColors[wizard.house] || houseColors.Aetherion;

  return (
    <div className="page-wrapper">
      {/* Background gradients */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-purple-900/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-900/10 rounded-full filter blur-3xl pointer-events-none" />

      {/* Navigation */}
      <Navbar activePage="dashboard" />

      {/* Main Content */}
      <main className="relative z-10 flex-1 w-full">
        <div className="page-content">

          {/* Welcome Section */}
          <div className="glass-panel p-5 sm:p-8 border border-purple-500/15 mb-6 animate-slide-up flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500/10 rounded-full flex items-center justify-center border border-yellow-500/30 text-yellow-400 animate-pulse flex-shrink-0">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-wide mb-1 font-cinzel">
                  Welcome, {wizard.name}!
                </h2>
                <p className="text-purple-300 text-xs sm:text-sm font-light">
                  Your credentials are secure, and your spellbooks are synchronized.
                </p>
              </div>
            </div>

            <div className={`px-3 py-1.5 sm:px-4 sm:py-2 border rounded-full text-xs font-semibold uppercase tracking-widest flex items-center gap-2 flex-shrink-0 ${currentHouseClass}`}>
              <Shield className="w-4 h-4" />
              <span>House {wizard.house || 'Sorting...'}</span>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

            {/* Card 1: House Affiliation */}
            <div className="glass-panel p-5 sm:p-6 border border-purple-500/15 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 border-b border-purple-500/10 pb-3 mb-4">
                  <span className="text-xl">🏰</span>
                  <h3 className="text-xs sm:text-sm font-cinzel text-yellow-400 tracking-wider font-semibold uppercase">
                    House Affiliation
                  </h3>
                </div>
                <div className="text-center py-3">
                  <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Assigned Guild</p>
                  <p className="text-2xl sm:text-3xl font-black font-cinzel text-slate-100 uppercase tracking-widest">{wizard.house}</p>
                  <p className="text-slate-400 text-xs italic mt-2 px-2">
                    {wizard.house === 'Ignisaur' && 'Home of brave and passionate leaders.'}
                    {wizard.house === 'Aetherion' && 'Sanctum of curious scholars and spell masters.'}
                    {wizard.house === 'Terraflora' && 'Covenant of patient guardians and herbal practitioners.'}
                    {wizard.house === 'Celestia' && 'Guild of creative builders and artifact keepers.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Wizard Attributes */}
            <div className="glass-panel p-5 sm:p-6 border border-purple-500/15 flex flex-col justify-between md:col-span-2">
              <div>
                <div className="flex items-center gap-2 border-b border-purple-500/10 pb-3 mb-4">
                  <span className="text-xl">✨</span>
                  <h3 className="text-xs sm:text-sm font-cinzel text-yellow-400 tracking-wider font-semibold uppercase">
                    Wizarding Profile Scroll
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
                  <div className="bg-[#120d24]/50 border border-purple-500/10 rounded-lg p-3 text-center">
                    <span className="text-xl block mb-1">🔮</span>
                    <p className="text-[9px] sm:text-[10px] text-purple-400 font-bold uppercase">Element</p>
                    <p className="text-xs sm:text-sm font-cinzel font-semibold text-slate-200 mt-0.5 break-words">{wizard.favElement}</p>
                  </div>

                  <div className="bg-[#120d24]/50 border border-purple-500/10 rounded-lg p-3 text-center">
                    <span className="text-xl block mb-1">🐾</span>
                    <p className="text-[9px] sm:text-[10px] text-purple-400 font-bold uppercase">Companion</p>
                    <p className="text-xs sm:text-sm font-cinzel font-semibold text-slate-200 mt-0.5 break-words">{wizard.companion}</p>
                  </div>

                  <div className="bg-[#120d24]/50 border border-purple-500/10 rounded-lg p-3 text-center">
                    <span className="text-xl block mb-1">⚔</span>
                    <p className="text-[9px] sm:text-[10px] text-purple-400 font-bold uppercase">Weapon</p>
                    <p className="text-xs sm:text-sm font-cinzel font-semibold text-slate-200 mt-0.5 break-words">{wizard.weapon}</p>
                  </div>

                  <div className="bg-[#120d24]/50 border border-purple-500/10 rounded-lg p-3 text-center">
                    <span className="text-xl block mb-1">🛡</span>
                    <p className="text-[9px] sm:text-[10px] text-purple-400 font-bold uppercase">Kingdom</p>
                    <p className="text-xs sm:text-sm font-cinzel font-semibold text-slate-200 mt-0.5 break-words">{wizard.kingdom || 'N/A'}</p>
                  </div>
                </div>

                {/* Magic Power Bar */}
                <div className="mt-5 border-t border-purple-500/10 pt-4">
                  <div className="flex justify-between text-xs text-purple-300 font-semibold mb-2">
                    <span>OVERALL MAGIC POWER LEVEL</span>
                    <span className="text-yellow-400 font-bold">{wizard.magicPower}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-purple-500/10">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 via-yellow-500 to-blue-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                      style={{ width: `${wizard.magicPower}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Academy Notices */}
          <div className="glass-panel p-5 sm:p-6 border border-purple-500/15">
            <h3 className="text-xs sm:text-sm font-cinzel text-yellow-400 tracking-wider font-semibold uppercase mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Academy Notices</span>
            </h3>
            <div className="space-y-3 text-sm text-slate-300 font-light">
              <p className="border-b border-purple-500/5 pb-2">
                📜 <strong>Spellcrafting Seminars:</strong> Meet in the high towers tomorrow. Have your <span className="text-yellow-400 font-semibold">{wizard.weapon}</span> prepared.
              </p>
              <p className="border-b border-purple-500/5 pb-2">
                🧪 <strong>Herbology and Potions:</strong> Master wizards from the Kingdom of <span className="text-purple-300 font-semibold">{wizard.kingdom || 'your homeland'}</span> will demonstrate dragon saliva infusions.
              </p>
              <p className="text-slate-400 text-xs">
                Keep check of your student schedule. Your companion <span className="text-yellow-400/80 font-semibold">{wizard.companion}</span> must remain in the sanctuary quarters during library study.
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="page-footer">
        © 2026 Bodha Wizard Academy of Magic and Tech Sciences. All rights reserved.
      </footer>
    </div>
  );
}

export default Dashboard;
