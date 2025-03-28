import React, { useState } from 'react';
import emailjs from 'emailjs-com'; // Importing the emailjs-com library

function ContactForm() {
  // State to store form values
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    zipcode: '',
    message: '',
  });

  // State to store form validation errors
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Validate form fields
  const validateForm = () => {
    let formErrors = {};
    if (!formData.name.trim()) formErrors.name = 'Name is required';
    if (!formData.phone.trim()) formErrors.phone = 'Phone is required';
    if (!formData.email.trim()) formErrors.email = 'Email is required';
    if (!formData.message.trim()) formErrors.message = 'Message is required';

    setErrors(formErrors);

    // Return true if no errors
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission and send email via EmailJS
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form before submitting
    if (validateForm()) {
      // Send email using EmailJS (Outlook service)
      emailjs.sendForm('service_aj13c7x', 'template_nwk8mvs', e.target, 'FFgjratqxl-hoCXfM') // Use your Public Key (User ID)
        .then((result) => {
          console.log('Message sent successfully:', result.text);
          alert('Message sent successfully!');
          
          // Clear form after submission
          setFormData({
            name: '',
            phone: '',
            email: '',
            zipcode: '',
            message: '',
          });
        }, (error) => {
          console.error('Error sending message:', error.text);
          alert('Error sending message!');
        });
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: '800px', margin: '0 auto', padding: '30px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 className="text-center" style={{ fontFamily: 'Poppins, sans-serif', color: '#2C3E50', fontSize: '28px' }}>
        <i className="bi bi-telephone" style={{ fontSize: '24px' }}></i> Contact Us 24/7
      </h2>
      <div className="row">
        <div className="col-md-8">
          <h3 style={{ fontFamily: 'Poppins, sans-serif', color: '#2980b9', fontSize: '24px' }}>
            <i className="bi bi-envelope-fill" style={{ fontSize: '20px' }}></i> Send us a Message
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3" style={{ marginBottom: '20px' }}>
              <label htmlFor="name" className="form-label" style={{ fontWeight: 'bold', fontSize: '18px' }}>Name (required)</label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                id="name"
                value={formData.name}
                onChange={handleChange}
                style={{ padding: '12px', borderRadius: '8px', fontSize: '16px', border: '1px solid #ccc' }}
              />
              {errors.name && <div className="invalid-feedback" style={{ fontSize: '14px', color: 'red' }}>{errors.name}</div>}
            </div>

            <div className="mb-3" style={{ marginBottom: '20px' }}>
              <label htmlFor="phone" className="form-label" style={{ fontWeight: 'bold', fontSize: '18px' }}>Phone (required)</label>
              <input
                type="tel"
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{ padding: '12px', borderRadius: '8px', fontSize: '16px', border: '1px solid #ccc' }}
              />
              {errors.phone && <div className="invalid-feedback" style={{ fontSize: '14px', color: 'red' }}>{errors.phone}</div>}
            </div>

            <div className="mb-3" style={{ marginBottom: '20px' }}>
              <label htmlFor="email" className="form-label" style={{ fontWeight: 'bold', fontSize: '18px' }}>Email Address (required)</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                value={formData.email}
                onChange={handleChange}
                style={{ padding: '12px', borderRadius: '8px', fontSize: '16px', border: '1px solid #ccc' }}
              />
              {errors.email && <div className="invalid-feedback" style={{ fontSize: '14px', color: 'red' }}>{errors.email}</div>}
            </div>

            <div className="mb-3" style={{ marginBottom: '20px' }}>
              <label htmlFor="zipcode" className="form-label" style={{ fontWeight: 'bold', fontSize: '18px' }}>Service Zip Code (optional)</label>
              <input
                type="text"
                className="form-control"
                id="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                style={{ padding: '12px', borderRadius: '8px', fontSize: '16px', border: '1px solid #ccc' }}
              />
            </div>

            <div className="mb-3" style={{ marginBottom: '20px' }}>
              <label htmlFor="message" className="form-label" style={{ fontWeight: 'bold', fontSize: '18px' }}>Your Message (required)</label>
              <textarea
                className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                id="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                style={{ padding: '12px', borderRadius: '8px', fontSize: '16px', border: '1px solid #ccc' }}
              ></textarea>
              {errors.message && <div className="invalid-feedback" style={{ fontSize: '14px', color: 'red' }}>{errors.message}</div>}
            </div>

            <button type="submit" className="btn btn-danger" style={{ fontSize: '16px', padding: '12px 25px', borderRadius: '8px' }}>
              Send Message
            </button>
          </form>
        </div>

        <ContactInfo />
      </div>
    </div>
  );
}

function ContactInfo() {
  return (
    <div className="col-md-4" style={{ padding: '30px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h3 style={{ fontFamily: 'Poppins, sans-serif', color: '#2980b9' }}>By Phone</h3>
      <p style={{ fontSize: '16px' }}>
        Call <a href="tel:617-716-8182" className="text-danger" style={{ fontSize: '18px' }}>617-716-8182</a> to speak with a team member.
      </p>
      <h3 style={{ fontFamily: 'Poppins, sans-serif', color: '#2980b9' }}>By Email</h3>
      <p style={{ fontSize: '16px' }}>
        Messages sent using the form will go directly to our email, which we check regularly.
      </p>
    </div>
  );
}

export default ContactForm;