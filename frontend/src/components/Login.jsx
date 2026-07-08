/* eslint-disable react-hooks/purity */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Wand2, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Young wizard, you must provide your magical credentials!');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: email.trim(),
        password: password.trim()
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.hasCompletedQuestionnaire) {
        navigate('/dashboard');
      } else {
        navigate('/story');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg(err.response?.data?.message || 'The magic gate remains shut. Verify your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen w-full bg-[#050409] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/35 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-slow ${Math.random() * 4 + 4}s linear infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Cosmic background glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-900/20 rounded-full filter blur-3xl opacity-50 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-900/15 rounded-full filter blur-3xl opacity-50 animate-pulse-slow" style={{ animationDelay: '3s' }} />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="glass-panel-purple p-6 sm:p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Wand2 className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-400 animate-float" />
              <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-yellow-200 to-purple-300 tracking-wider font-cinzel">
                Bodha Wizard Academy
              </h1>
            </div>
            <p className="text-purple-300 text-xs sm:text-sm font-cinzel font-medium tracking-widest uppercase">
              Enter The Academy
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-300 text-sm rounded-lg flex items-center gap-2">
                <span>⚡</span>
                <p className="font-medium">{errorMsg}</p>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-xs font-bold text-purple-300 uppercase tracking-widest mb-2">
                🔮 Wizard ID (Email)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="wizard@bodha.edu"
                className="magic-input px-4 py-3 text-sm placeholder-slate-500"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-purple-300 uppercase tracking-widest mb-2">
                ✨ Secret Spell (Password)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your secret spell"
                  className="magic-input px-4 py-3 text-sm placeholder-slate-500 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold w-full py-3 rounded-lg flex items-center justify-center gap-2 group relative overflow-hidden mt-2 text-sm"
            >
              <LogIn className="w-5 h-5 text-purple-950 group-hover:scale-110 transition-transform" />
              <span>{isSubmitting ? 'VERIFYING CREDENTIALS...' : 'ENTER ACADEMY'}</span>
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500/0 to-purple-500/20" />
            <span className="text-purple-400 text-xs font-bold font-cinzel">OR</span>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500/20 to-purple-500/0" />
          </div>

          {/* Create Account Button */}
          <button
            onClick={handleSignup}
            type="button"
            className="btn-purple-outline w-full py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-semibold"
          >
            <UserPlus className="w-5 h-5" />
            <span>CREATE NEW WIZARD</span>
          </button>
        </div>

        {/* Gold Glow Line */}
        <div className="mt-6 h-px bg-gradient-to-r from-transparent via-[#ffd700]/30 to-transparent" />
      </div>
    </div>
  );
}

export default Login;