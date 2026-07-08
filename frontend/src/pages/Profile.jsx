import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Save, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import API_BASE_URL from '../config';

function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Field states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [kingdom, setKingdom] = useState('');
  const [house, setHouse] = useState('');
  const [favElement, setFavElement] = useState('');

  const [message, setMessage] = useState({ text: '', type: '' });

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

        const wizard = response.data;
        setName(wizard.name);
        setEmail(wizard.email);
        setKingdom(wizard.kingdom || '');
        setHouse(wizard.house || 'N/A');
        setFavElement(wizard.favElement || 'N/A');
      } catch (err) {
        console.error('Error fetching profile:', err);
        setMessage({ text: 'Failed to summon your profile scroll.', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setMessage({ text: 'Wizard Name cannot be empty.', type: 'error' });
      return;
    }
    if (!kingdom.trim()) {
      setMessage({ text: 'Kingdom origin cannot be empty.', type: 'error' });
      return;
    }

    setIsSaving(true);
    setMessage({ text: '', type: '' });

    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        'http://localhost:5000/api/user/profile',
        { name: name.trim(), kingdom: kingdom.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.setItem('user', JSON.stringify(response.data.user));
      setMessage({ text: 'Profile updated in the Academy archives successfully!', type: 'success' });
    } catch (err) {
      console.error('Update profile error:', err);
      setMessage({ text: err.response?.data?.message || 'Failed to update credentials.', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page-wrapper items-center justify-center flex">
        <div className="text-center">
          <User className="w-12 h-12 text-yellow-400 animate-float mx-auto mb-4" />
          <p className="text-purple-300 animate-pulse text-sm tracking-widest font-cinzel">Reading scroll archives...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      {/* Background gradients */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-purple-900/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-900/10 rounded-full filter blur-3xl pointer-events-none" />

      {/* Navigation with hamburger */}
      <Navbar activePage="profile" />

      {/* Profile Form Content */}
      <main className="relative z-10 flex-1 w-full flex items-start justify-center">
        <div className="w-full max-w-xl px-4 py-8 sm:py-12">
          <div className="glass-panel p-6 sm:p-8 border border-purple-500/15 shadow-2xl animate-slide-up">

            {/* Header */}
            <div className="flex items-center gap-3 border-b border-purple-500/10 pb-4 mb-6">
              <div className="w-10 h-10 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-center justify-center text-yellow-400 animate-float flex-shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold font-cinzel text-slate-100 tracking-wide">
                  Wizard Records Scroll
                </h2>
                <p className="text-purple-300 text-xs font-light">
                  Update name and kingdom. Credentials and houses are locked.
                </p>
              </div>
            </div>

            {/* Feedback Message */}
            {message.text && (
              <div className={`p-3 border rounded-lg text-xs font-semibold mb-5 flex items-center gap-2 ${
                message.type === 'success'
                  ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                  : 'bg-red-950/40 border-red-500/30 text-red-300'
              }`}>
                <span>⚡</span>
                <p>{message.text}</p>
              </div>
            )}

            {/* Edit Form */}
            <form onSubmit={handleSave} className="space-y-4">

              {/* Readonly Email */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Wizard ID / Email (Locked)
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-4 py-2.5 bg-slate-950/50 border border-purple-500/10 rounded-lg text-slate-400 cursor-not-allowed text-sm"
                />
              </div>

              {/* Readonly House */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Academy House (Locked)
                </label>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-950/50 border border-purple-500/10 rounded-lg text-slate-400 text-sm">
                  <Shield className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span className="font-cinzel tracking-wider uppercase font-semibold">{house}</span>
                </div>
              </div>

              {/* Readonly Element */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Element Affinity (Locked)
                </label>
                <input
                  type="text"
                  value={favElement}
                  disabled
                  className="w-full px-4 py-2.5 bg-slate-950/50 border border-purple-500/10 rounded-lg text-slate-400 cursor-not-allowed text-sm font-cinzel"
                />
              </div>

              {/* Editable Name */}
              <div>
                <label className="block text-[10px] font-bold text-yellow-400 uppercase tracking-widest mb-1.5">
                  Wizard Name (Editable)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Wizard name"
                  className="magic-input px-4 py-2.5 text-sm"
                  required
                />
              </div>

              {/* Editable Kingdom */}
              <div>
                <label className="block text-[10px] font-bold text-yellow-400 uppercase tracking-widest mb-1.5">
                  Kingdom of Origin (Editable)
                </label>
                <input
                  type="text"
                  value={kingdom}
                  onChange={(e) => setKingdom(e.target.value)}
                  placeholder="e.g., Aethelgard"
                  className="magic-input px-4 py-2.5 text-sm"
                  required
                />
              </div>

              {/* Save Button */}
              <button
                type="submit"
                disabled={isSaving}
                className="btn-gold w-full py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider mt-6"
              >
                <Save className="w-4 h-4 text-purple-950" />
                <span>{isSaving ? 'UPDATING ARCHIVES...' : 'Save Changes'}</span>
              </button>

            </form>
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

export default Profile;
