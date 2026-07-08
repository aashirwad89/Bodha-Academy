/* eslint-disable react-hooks/purity */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Wand2, UserPlus, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import API_BASE_URL from '../config';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = 'Wizard name is required';
    } else if (name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please provide a valid email';
    }

    if (!password) {
      errors.password = 'Secret spell password is required';
    } else if (password.length < 6) {
      errors.password = 'Spell password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Secret spells do not match';
    }

    return errors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        name: name.trim(),
        email: email.trim(),
        password,
        confirmPassword
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Successfully registered and authenticated, navigate to Story Page
      navigate('/story');
    } catch (err) {
      console.error('Registration error:', err);
      setErrorMsg(err.response?.data?.message || 'Failed to complete registration incantation. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full bg-[#050409] flex items-start sm:items-center justify-center p-4 py-8 relative overflow-hidden">
      {/* Floating dust particles */}
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
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-blue-900/15 rounded-full filter blur-3xl opacity-50 animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-900/20 rounded-full filter blur-3xl opacity-50 animate-pulse-slow" style={{ animationDelay: '3s' }} />

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="glass-panel-gold p-5 sm:p-8 border border-yellow-500/25 hover:border-yellow-400/40 transition-all duration-300">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Wand2 className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-400 animate-float" />
              <h1 className="text-xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-purple-300 to-yellow-200 tracking-wider font-cinzel">
                Create Wizard
              </h1>
            </div>
            <p className="text-yellow-400 text-xs font-cinzel font-medium tracking-widest uppercase">
              Join the Magic Academy
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-300 text-sm rounded-lg flex items-center gap-2">
                <span>⚡</span>
                <p className="font-medium">{errorMsg}</p>
              </div>
            )}

            {/* Name Input */}
            <div>
              <label className="block text-xs font-bold text-purple-300 uppercase tracking-widest mb-1.5">
                🪄 Wizard Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                }}
                placeholder="e.g., Merlin Vance"
                className={`magic-input w-full px-4 py-2.5 text-sm placeholder-slate-500 ${
                  formErrors.name ? 'border-red-500/40 focus:border-red-400 focus:ring-red-400/20' : ''
                }`}
                required
              />
              {formErrors.name && (
                <p className="text-red-400 text-xs mt-1 font-semibold">⚠ {formErrors.name}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-xs font-bold text-purple-300 uppercase tracking-widest mb-1.5">
                🔮 Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                }}
                placeholder="wizard@domain.com"
                className={`magic-input w-full px-4 py-2.5 text-sm placeholder-slate-500 ${
                  formErrors.email ? 'border-red-500/40 focus:border-red-400 focus:ring-red-400/20' : ''
                }`}
                required
              />
              {formErrors.email && (
                <p className="text-red-400 text-xs mt-1 font-semibold">⚠ {formErrors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-purple-300 uppercase tracking-widest mb-1.5">
                🔐 Secret Spell (Password)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (formErrors.password) setFormErrors({ ...formErrors, password: '' });
                  }}
                  placeholder="At least 6 characters"
                  className={`magic-input w-full px-4 py-2.5 text-sm placeholder-slate-500 pr-10 ${
                    formErrors.password ? 'border-red-500/40 focus:border-red-400 focus:ring-red-400/20' : ''
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formErrors.password && (
                <p className="text-red-400 text-xs mt-1 font-semibold">⚠ {formErrors.password}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-xs font-bold text-purple-300 uppercase tracking-widest mb-1.5">
                🔐 Confirm Secret Spell
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (formErrors.confirmPassword) setFormErrors({ ...formErrors, confirmPassword: '' });
                  }}
                  placeholder="Repeat secret spell"
                  className={`magic-input w-full px-4 py-2.5 text-sm placeholder-slate-500 pr-10 ${
                    formErrors.confirmPassword ? 'border-red-500/40 focus:border-red-400 focus:ring-red-400/20' : ''
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-2.5 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formErrors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1 font-semibold">⚠ {formErrors.confirmPassword}</p>
              )}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold w-full py-3 rounded-lg flex items-center justify-center gap-2 group relative overflow-hidden mt-6 text-sm"
            >
              <UserPlus className="w-5 h-5 text-purple-950 group-hover:scale-110 transition-transform" />
              <span>{isSubmitting ? 'CASTING REGISTRATION...' : 'REGISTER WIZARD'}</span>
            </button>
          </form>

          {/* Back to Login */}
          <button
            onClick={handleGoBack}
            type="button"
            className="w-full mt-4 text-purple-300 hover:text-purple-100 text-xs font-semibold flex items-center justify-center gap-2 py-2 rounded-lg transition-colors hover:bg-purple-950/30"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Login</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;