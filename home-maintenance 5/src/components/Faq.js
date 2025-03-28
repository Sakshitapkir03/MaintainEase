import React, { useState } from 'react';
import '../index.css';

const FAQ = () => {
  // State to track which FAQ is expanded
  const [expanded, setExpanded] = useState(null);

  // Toggle FAQ answer visibility
  const toggleFAQ = (index) => {
    if (expanded === index) {
      setExpanded(null); // Collapse if the same FAQ is clicked
    } else {
      setExpanded(index); // Expand the clicked FAQ
    }
  };

  const faqData = [
    {
      question: "What services do you provide?",
      answer: "We provide a wide range of home maintenance services, including plumbing, electrical repairs, painting, HVAC, appliance repair, and general handyman services."
    },
    {
      question: "How can I book a service?",
      answer: "You can book a service directly through our website, or by calling our customer support team. Simply select the type of service you need and choose a convenient time."
    },
    {
      question: "Do you offer emergency services?",
      answer: "Yes, we offer 24/7 emergency services for urgent home maintenance issues like plumbing leaks, electrical faults, or appliance breakdowns."
    },
    {
      question: "What are your payment options?",
      answer: "We accept a variety of payment methods, including credit/debit cards, PayPal, and cash upon service completion."
    },
    {
      question: "Are your technicians certified?",
      answer: "Yes, all our technicians are certified professionals with experience in their respective fields, ensuring the highest quality of service."
    },
  ];

  return (
    <div className="faq-container" style={{ maxWidth: '900px', margin: '0 auto', padding: '30px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#2C3E50', fontFamily: "'Poppins', sans-serif" }}>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqData.map((faq, index) => (
          <div key={index} className="faq-item" style={{ marginBottom: '25px' }}>
            <div
              className="faq-question"
              onClick={() => toggleFAQ(index)}
              style={{
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '18px',
                margin: '15px 0',
                padding: '20px',
                background: '#ecf0f1',
                borderRadius: '8px',
                color: '#2980b9',
                transition: 'background-color 0.3s ease, color 0.3s ease',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#bdc3c7'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#ecf0f1'}
            >
              {faq.question}
            </div>
            {expanded === index && (
              <div className="faq-answer" style={{ marginLeft: '30px', fontSize: '16px', color: '#34495e', lineHeight: '1.7' }}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;