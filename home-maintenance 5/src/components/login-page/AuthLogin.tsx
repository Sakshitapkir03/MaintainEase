import { Toaster } from 'react-hot-toast';
import AuthForm from './components/AuthForm.tsx';
import './Login.css'
import React from 'react';

function Login() {
  return (
    <>
      <Toaster position="top-right" />
      <AuthForm />
    </>
  );
}

export default Login;