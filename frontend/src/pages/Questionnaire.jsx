import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, ArrowRight, Sparkles, Wand2 } from 'lucide-react';

function Questionnaire() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  // Form states
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [kingdom, setKingdom] = useState('');
  const [education, setEducation] = useState('');
  const [favElement, setFavElement] = useState('');
  const [strength, setStrength] = useState('');
  const [favSubject, setFavSubject] = useState('');
  const [companion, setCompanion] = useState('');
  const [weapon, setWeapon] = useState('');
  const [aura, setAura] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Options
  const educationOptions = ['Engineering', 'MCA', 'BCA', 'Degree', 'Diploma', 'Other'];
  const elementOptions = ['Fire', 'Water', 'Nature', 'Lightning', 'Moon', 'Ice'];
  const strengthOptions = ['Leader', 'Creative', 'Curious', 'Patient', 'Fast Learner', 'Problem Solver'];
  const subjectOptions = ['Potion Making', 'Ancient Runes', 'Flying', 'Spell Crafting', 'Defense', 'Beast Care'];
  const companionOptions = ['Dragon', 'Owl', 'Fox', 'Wolf', 'Black Cat', 'Unicorn'];
  const weaponOptions = ['Magic Wand', 'Crystal Staff', 'Spell Book', 'Magic Orb', 'Rune Sword'];
  const auraOptions = [
    { name: 'Purple', color: 'bg-purple-600 shadow-purple-500/50' },
    { name: 'Blue', color: 'bg-blue-600 shadow-blue-500/50' },
    { name: 'Green', color: 'bg-emerald-600 shadow-emerald-500/50' },
    { name: 'Red', color: 'bg-red-600 shadow-red-500/50' },
    { name: 'Gold', color: 'bg-yellow-500 shadow-yellow-400/50' }
  ];

  // Pre-fill Name from authenticated user profile if stored in localStorage
  useEffect(() => {
    const cachedUser = localStorage.getItem('user');
    if (cachedUser) {
      try {
        const u = JSON.parse(cachedUser);
        if (u.name) setName(u.name);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleNext = () => {
    setErrorMsg('');
    // Validation per step
    if (step === 1) {
      if (!name.trim()) return setErrorMsg('Please enter your Wizard Name.');
      if (!age || isNaN(age) || age <= 0) return setErrorMsg('Please enter a valid age.');
    } else if (step === 2) {
      if (!kingdom.trim()) return setErrorMsg('Please reveal your home Kingdom.');
      if (!education) return setErrorMsg('Please select your academic study background.');
    } else if (step === 3) {
      if (!favElement) return setErrorMsg('Please choose your aligned magical element.');
      if (!strength) return setErrorMsg('Please identify your greatest wizarding strength.');
    } else if (step === 4) {
      if (!favSubject) return setErrorMsg('Please choose your favourite subject.');
      if (!companion) return setErrorMsg('Please choose your destined magical companion.');
    }

    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handlePrevious = () => {
    setErrorMsg('');
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!weapon) return setErrorMsg('Please select your chosen magical weapon.');
    if (!aura) return setErrorMsg('Please select your spiritual aura color.');

    setIsSubmitting(true);

    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMsg('Session expired. Please log in again.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/user/questionnaire',
        {
          name: name.trim(),
          age: parseInt(age, 10),
          kingdom: kingdom.trim(),
          education,
          favElement,
          strength,
          favSubject,
          companion,
          weapon,
          aura
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Save updated user data including destiny results
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/result');
    } catch (err) {
      console.error('Submit questionnaire error:', err);
      setErrorMsg(err.response?.data?.message || 'Failed to submit responses to the sorting crystal.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate Progress Percentage
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen w-full bg-[#050409] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-purple-900/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-900/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-xl">
        
        {/* Header & Progress */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-yellow-200 to-purple-300 tracking-wide mb-3">
            Destiny Sorting Ceremony
          </h2>
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-purple-400 mb-2 font-medium">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progressPercentage)}% Revealed</span>
          </div>
          <div className="w-full h-1.5 bg-purple-950/60 border border-purple-500/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 via-yellow-500 to-blue-500 transition-all duration-300 shadow-[0_0_8px_rgba(212,175,55,0.4)]"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Multi-step form glass card */}
        <div className="glass-panel p-8 border border-purple-500/20 shadow-2xl relative min-h-[420px] flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
            
            {/* Error Message */}
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-950/40 border border-red-500/30 text-red-300 text-xs rounded-lg flex items-center gap-2">
                <span>⚡</span>
                <p className="font-semibold">{errorMsg}</p>
              </div>
            )}

            {/* Step 1: Identity */}
            {step === 1 && (
              <div className="space-y-6 animate-slide-up">
                <h3 className="text-lg font-cinzel text-yellow-400 border-b border-purple-500/10 pb-2 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <span>I. Personal Identity</span>
                </h3>
                
                <div>
                  <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">
                    Wizard Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your wizard name..."
                    className="magic-input w-full px-4 py-3 text-sm placeholder-slate-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">
                    Wizard Age (Years)
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g., 20"
                    className="magic-input w-full px-4 py-3 text-sm placeholder-slate-500"
                    min="1"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2: Origin & Education */}
            {step === 2 && (
              <div className="space-y-6 animate-slide-up">
                <h3 className="text-lg font-cinzel text-yellow-400 border-b border-purple-500/10 pb-2 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <span>II. Realms & Academia</span>
                </h3>

                <div>
                  <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">
                    Home Kingdom
                  </label>
                  <input
                    type="text"
                    value={kingdom}
                    onChange={(e) => setKingdom(e.target.value)}
                    placeholder="e.g., Aethelgard, Shadowfen..."
                    className="magic-input w-full px-4 py-3 text-sm placeholder-slate-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider mb-3">
                    Academic Background (Study Path)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {educationOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setEducation(opt)}
                        className={`py-3 px-4 text-xs font-semibold rounded-lg border transition-all duration-200 ${
                          education === opt
                            ? 'bg-yellow-500/10 border-yellow-500 text-yellow-400 shadow-[0_0_10px_rgba(212,175,55,0.15)]'
                            : 'bg-[#120d24]/60 border-purple-500/10 text-purple-300 hover:border-purple-400/40'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Affinities */}
            {step === 3 && (
              <div className="space-y-5 animate-slide-up">
                <h3 className="text-lg font-cinzel text-yellow-400 border-b border-purple-500/10 pb-2 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <span>III. Elements & Strengths</span>
                </h3>

                <div>
                  <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">
                    Favourite Magical Element
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {elementOptions.map((elem) => (
                      <button
                        type="button"
                        key={elem}
                        onClick={() => setFavElement(elem)}
                        className={`py-2.5 px-2 text-xs font-semibold rounded-lg border transition-all duration-200 ${
                          favElement === elem
                            ? 'bg-yellow-500/10 border-yellow-500 text-yellow-400 shadow-[0_0_10px_rgba(212,175,55,0.15)]'
                            : 'bg-[#120d24]/60 border-purple-500/10 text-purple-300 hover:border-purple-400/40'
                        }`}
                      >
                        {elem}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">
                    Greatest Magical Strength
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {strengthOptions.map((str) => (
                      <button
                        type="button"
                        key={str}
                        onClick={() => setStrength(str)}
                        className={`py-2.5 px-3 text-xs font-semibold rounded-lg border transition-all duration-200 ${
                          strength === str
                            ? 'bg-yellow-500/10 border-yellow-500 text-yellow-400 shadow-[0_0_10px_rgba(212,175,55,0.15)]'
                            : 'bg-[#120d24]/60 border-purple-500/10 text-purple-300 hover:border-purple-400/40'
                        }`}
                      >
                        {str}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Talents */}
            {step === 4 && (
              <div className="space-y-5 animate-slide-up">
                <h3 className="text-lg font-cinzel text-yellow-400 border-b border-purple-500/10 pb-2 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <span>IV. Studies & Companions</span>
                </h3>

                <div>
                  <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">
                    Favourite Subject
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {subjectOptions.map((sub) => (
                      <button
                        type="button"
                        key={sub}
                        onClick={() => setFavSubject(sub)}
                        className={`py-2.5 px-3 text-xs font-semibold rounded-lg border transition-all duration-200 ${
                          favSubject === sub
                            ? 'bg-yellow-500/10 border-yellow-500 text-yellow-400 shadow-[0_0_10px_rgba(212,175,55,0.15)]'
                            : 'bg-[#120d24]/60 border-purple-500/10 text-purple-300 hover:border-purple-400/40'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">
                    Chosen Magical Companion
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {companionOptions.map((comp) => (
                      <button
                        type="button"
                        key={comp}
                        onClick={() => setCompanion(comp)}
                        className={`py-2.5 px-1.5 text-xs font-semibold rounded-lg border transition-all duration-200 ${
                          companion === comp
                            ? 'bg-yellow-500/10 border-yellow-500 text-yellow-400 shadow-[0_0_10px_rgba(212,175,55,0.15)]'
                            : 'bg-[#120d24]/60 border-purple-500/10 text-purple-300 hover:border-purple-400/40'
                        }`}
                      >
                        {comp}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Weapons & Essence */}
            {step === 5 && (
              <div className="space-y-5 animate-slide-up">
                <h3 className="text-lg font-cinzel text-yellow-400 border-b border-purple-500/10 pb-2 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <span>V. Weapons & Aura</span>
                </h3>

                <div>
                  <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">
                    Selected Magical Weapon
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {weaponOptions.map((wpn) => (
                      <button
                        type="button"
                        key={wpn}
                        onClick={() => setWeapon(wpn)}
                        className={`py-2.5 px-3 text-xs font-semibold rounded-lg border transition-all duration-200 ${
                          weapon === wpn
                            ? 'bg-yellow-500/10 border-yellow-500 text-yellow-400 shadow-[0_0_10px_rgba(212,175,55,0.15)]'
                            : 'bg-[#120d24]/60 border-purple-500/10 text-purple-300 hover:border-purple-400/40'
                        }`}
                      >
                        {wpn}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">
                    Select Your Spiritual Aura Color
                  </label>
                  <div className="flex justify-around items-center py-2 bg-[#120d24]/40 border border-purple-500/10 rounded-lg">
                    {auraOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt.name}
                        onClick={() => setAura(opt.name)}
                        className={`group relative flex flex-col items-center focus:outline-none`}
                      >
                        <div 
                          className={`w-7 h-7 rounded-full transition-all duration-300 ${opt.color} ${
                            aura === opt.name 
                              ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-[#050409] shadow-lg' 
                              : 'hover:scale-110 opacity-75'
                          }`}
                        />
                        <span className="text-[10px] mt-1 text-slate-400 font-semibold group-hover:text-slate-200">
                          {opt.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons footer */}
            <div className="flex items-center justify-between border-t border-purple-500/10 pt-6 mt-8 gap-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="btn-purple-outline flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              {step < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-gold flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-xs"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4 text-purple-950" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-xs shadow-[0_0_15px_rgba(212,175,55,0.4)] animate-pulse"
                >
                  <Wand2 className="w-4 h-4 text-purple-950" />
                  <span>{isSubmitting ? 'REVEALING DESTINY...' : 'Reveal My Destiny'}</span>
                </button>
              )}
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}

export default Questionnaire;
