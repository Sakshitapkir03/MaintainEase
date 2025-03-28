import { MdEmail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import EmailForm from './EmailForm.tsx';
import GoogleButton from './GoogleButton.tsx';
import React from 'react';


export default function AuthForm() {

  const navigate = useNavigate();

  const HandleSingnUp = async () => {
    navigate('/signup');
  }
  
  return (
    <div className="Ldiv1">
      <div className="div2">
        <div className="div3">
          <h2 className="div4">Sign in to your account</h2>
        </div>

        <EmailForm />

        <div className="div5">
          <div className="div6">
            <div className="div7">
              <div className="div8"></div>
            </div>
            <div className="div9">
              <span className="div10">Or continue with</span>
            </div>
          </div>

          <div className="google-button">
            <GoogleButton />
          </div>
          <div className='email'>
            <button className='eb' onClick={HandleSingnUp}>
            <MdEmail className="div15" />
            <span className="div16">Google</span>
            </button>
          </div>
        </div>

        <div className="div11">
          <div className="div12">
            <a href="/forgot-password" className="div13">
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}