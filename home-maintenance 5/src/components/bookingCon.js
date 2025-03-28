import React from 'react';
import Confetti from 'react-confetti';
import { CheckCircle } from 'lucide-react';

const BookingSuccessPopup = ({ isOpen, onClose, email }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50 absolute" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: "20px"
      }}
    >
      <Confetti 
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={500}
      />
     <div className="bg-white text-center max-w-md w-full relative "
     style={{padding: "20px", borderRadius:"50px"}}>
            <CheckCircle 
                size={80} 
                className="mx-auto mb-4 text-green-500"
            />

            <h2 className="text-3xl font-bold text-green-600 mb-4">
                Booking Confirmed! 🎉
            </h2>

            <p className="text-gray-700 mb-6">
                Your booking has been successfully submitted. A confirmation email has been sent to {email}.
            </p>

            <div className="flex justify-center space-x-2 items-center">
                <span style={{fontSize: '40px'}}>👏</span>
                <span style={{fontSize: '40px'}}>🎊</span>
                <span style={{fontSize: '40px'}}>🌟</span>
            </div>

            <button 
                onClick={onClose}
                className="absolute hover:text-gray-800"
                style={{background: "#fff"}}
            >
                ✖
            </button>
            </div>
    </div>
  );
};

export default BookingSuccessPopup;