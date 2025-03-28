import { FcGoogle } from 'react-icons/fc';
import { auth } from '../lib/firebase.ts';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function GoogleButton() {

  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Signed in with Google successfully!');
      navigate('/services');
    } catch (error) {
      toast.error('Failed to sign in with Google');
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="div14"
    >
      <FcGoogle className="div15" />
      <span className="div16">Google</span>
    </button>
  );
}
