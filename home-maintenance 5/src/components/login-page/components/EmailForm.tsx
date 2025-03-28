import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { auth } from '../lib/firebase.ts';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmailForm() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Signed in successfully!');
      navigate('/services');
    } catch (error) {
      toast.error('Failed to sign in');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <form className="div17" onSubmit={handleEmailSignIn}>
      <div className="div18">
        <div>
          <label htmlFor="email" className="div19">Email address</label>
          <div className="div20">
            <div className="div21">
              <Mail className="div22" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="div23"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="div19">Password</label>
          <div className="div20">
            <div className="div24">
              <Lock className="div22" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="div25"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="div26"
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}