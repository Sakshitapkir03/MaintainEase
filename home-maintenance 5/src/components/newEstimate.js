import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import BookingSuccessPopup from './bookingCon';

const serviceBaseCosts = {
    'changing-pipeline': 100,
    'dripping-water': 50,
    'fixing-leaks': 75,
    'circuit-breaker-services': 120,
    'generator': 150,
    'smoke-detector-installation': 90,
    'air-conditioning-repair': 200,
    'furnace-installation': 300,
    'ventilation-maintenance': 180,
    'interior-painting': 400,
    'exterior-painting': 500,
    'wallpaper-installation': 250,
    'deep-cleaning': 150,
    'window-cleaning': 80,
    'carpet-cleaning': 100,
    'roof-repairs': 350,
    'gutter-cleaning': 120,
    'roof-inspections': 200,
    'lawn-maintenance': 100,
    'garden-design': 400,
    'tree-trimming': 150,
    'refrigerator-repair': 200,
    'washing-machine-fixes': 180,
    'oven-maintenance': 150,
  };
  
  const serviceQuestions = {
    plumbing: {
      'dripping-water': [
        { question: 'Will parts need to be specially ordered for the repair?', cost: 20 },
        { question: 'Is there a need for additional waterproofing or sealing work?', cost: 20 },
        { question: 'Does the job require more than one plumber to complete?', cost: 30 },
        { question: 'Is there a possibility of encountering asbestos or lead pipes?', cost: 15 },
      ],
      'changing-pipeline': [
        { question: 'Does it require excavation work?', cost: 50 },
        { question: 'Are new materials required for replacement?', cost: 30 },
      ],
      'fixing-leaks': [
        { question: 'Is there significant water damage that needs repair?', cost: 40 },
        { question: 'Will parts need replacement?', cost: 25 },
      ],
    },
    electric: {
      'circuit-breaker': [
        { question: 'Are old breakers being replaced?', cost: 30 },
        { question: 'Do you require additional circuits installed?', cost: 40 },
      ],
      'generator': [
        { question: 'Does the generator need a new fuel line?', cost: 35 },
        { question: 'Do you need a backup power solution installed?', cost: 50 },
      ],
      'smoke-detector': [
        { question: 'Is the installation part of a full home system?', cost: 40 },
        { question: 'Do old detectors need removal?', cost: 20 },
      ],
    },
    hvac: {
      'air-conditioning-repair': [
        { question: 'Does the unit require refrigerant refill?', cost: 40 },
        { question: 'Are new parts required for repair?', cost: 30 },
        { question: 'Is duct cleaning or repair necessary?', cost: 25 },
      ],
      'furnace-installation': [
        { question: 'Does installation include removing the old furnace?', cost: 50 },
        { question: 'Are additional vent installations required?', cost: 40 },
      ],
      'ventilation-maintenance': [
        { question: 'Is there significant dust buildup?', cost: 20 },
        { question: 'Do vents need to be replaced?', cost: 30 },
      ],
    },
    painting: {
      'interior': [
        { question: 'Are additional coats of paint required?', cost: 25 },
        { question: 'Do the walls need patching before painting?', cost: 20 },
      ],
      'exterior': [
        { question: 'Does the building need power washing before painting?', cost: 30 },
        { question: 'Are weatherproof paints required?', cost: 40 },
      ],
      'wallpaper-installation': [
        { question: 'Does old wallpaper need removal?', cost: 20 },
        { question: 'Do the walls need pre-treatment?', cost: 15 },
      ],
    },
    cleaning: {
      'deep-cleaning': [
        { question: 'Does the cleaning include furniture upholstery?', cost: 25 },
        { question: 'Are hard-to-reach areas involved?', cost: 15 },
      ],
      'window-cleaning': [
        { question: 'Do windows have tough stains or residue?', cost: 20 },
        { question: 'Is ladder access required for higher floors?', cost: 30 },
      ],
      'carpet-cleaning': [
        { question: 'Do carpets have deep stains or odors?', cost: 25 },
        { question: 'Do you need quick-dry services?', cost: 15 },
      ],
    },
    roofing: {
      'roof-repairs': [
        { question: 'Are there structural damages that need fixing?', cost: 50 },
        { question: 'Do new shingles or tiles need installation?', cost: 40 },
      ],
      'gutter-cleaning': [
        { question: 'Are gutters heavily clogged with debris?', cost: 20 },
        { question: 'Do downspouts need to be unclogged?', cost: 15 },
      ],
      'roof-inspections': [
        { question: 'Are there signs of roof leaks or water damage?', cost: 25 },
        { question: 'Is a drone inspection required for hard-to-reach areas?', cost: 50 },
      ],
    },
    landscaping: {
      'garden-design': [
        { question: 'Would you like on-site consultations during the implementation phase?', cost: 20 },
        { question: 'Are you interested in seasonal planting plans for year-round interest?', cost: 45 },
        { question: 'Do you require help with plant sourcing and procurement?', cost: 15 },
        { question: 'Is irrigation system design required?', cost: 50 },
      ],
      'lawn-maintenance': [
        { question: 'Do you require pest control for the lawn?', cost: 30 },
        { question: 'Would you like seasonal fertilization?', cost: 20 },
      ],
      'tree-trimming': [
        { question: 'Are there trees close to power lines?', cost: 50 },
        { question: 'Do you require debris removal after trimming?', cost: 15 },
      ],
    },
    'appliance-repair': {
      'refrigerator': [
        { question: 'Is the refrigerator leaking water?', cost: 25 },
        { question: 'Does the compressor need repair?', cost: 50 },
      ],
      'washing-machine': [
        { question: 'Is the drum out of balance?', cost: 30 },
        { question: 'Does the machine need a new motor?', cost: 50 },
      ],
      'oven-maintenance': [
        { question: 'Is the heating element malfunctioning?', cost: 40 },
        { question: 'Do door seals need replacement?', cost: 20 },
      ],
    },
  };

const RequestNewEstimate = () => {
  const navigate = useNavigate();
  const { category, feature } = useParams();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    buildingType: '',
    serviceType: '',
    paymentMethod: '',
    completionDate: new Date(),
    referralSource: [],
    otherReferral: "",
    totalCost: serviceBaseCosts[feature] || 0,
    problemDescription: '',
    selectedQuestions: [],
  });

  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    if (feature) {
      const serviceCategory = category ? serviceQuestions[category] : {};
      const serviceQuestionsForFeature = serviceCategory[feature] || [];
      setQuestions(serviceQuestionsForFeature);
    }
  }, [category, feature]);
  
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!phoneRegex.test(formData.phoneNumber.replace(/[^\d]/g, ''))) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "Zip code is required";
    } else if (!zipRegex.test(formData.zipCode)) {
      newErrors.zipCode = "Invalid zip code format";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      const errorMessages = Object.values(newErrors).join("\n");
      window.alert(`Oops you missed :\n\n${errorMessages}`);
      return false;
    }

    return true;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.buildingType) newErrors.buildingType = "Building type is required";
    if (!formData.parkingType) newErrors.parkingType = "Parking type is required";
    if (formData.referralSource.length === 0) newErrors.referralSource = "Please select at least one referral source";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      const errorMessages = Object.values(newErrors).join("\n");
      window.alert(`Oops you missed :\n\n${errorMessages}`);
      return false;
  }

    return true;
  };

  const validateStep4 = () => {
    const newErrors = {};
    
    // Validate problem description
    if (!formData.problemDescription.trim()) {
      newErrors.problemDescription = "Problem description is required";
    }

    // Validate additional questions
    const missingQuestions = questions.filter(q => 
      formData.selectedQuestions[q.question] !== "yes" && 
      formData.selectedQuestions[q.question] !== "no"
    );

    if (missingQuestions.length > 0) {
      newErrors.additionalQuestions = "Please answer all additional questions";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      const errorMessages = Object.values(newErrors).join("\n");
      window.alert(`Oops you missed :\n\n${errorMessages}`);
      return false;
    }

    return true;
  };

  const validateStep5 = () => {
    const newErrors = {};
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Payment method is required";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      const errorMessages = Object.values(newErrors).join("\n");
      window.alert(`Oops you missed :\n\n${errorMessages}`);
      return false;
    }
    return true;
  };

  const nextStep = () => {
    let isValid = false;
    switch(step) {
      case 1: 
        isValid = validateStep1(); 
        break;
      case 2: 
        isValid = validateStep2(); 
        break;
      case 3: 
        isValid = validateStep3(); 
        break;
      case 4: 
        isValid = validateStep4(); 
        break;
      case 5: 
        isValid = validateStep5(); 
        break;
      default: 
        isValid = true;
    }
    
    if (isValid) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleDescriptionChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      problemDescription: e.target.value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear specific error when field is modified
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };


  const handleQuestionChange = (question, cost) => (e) => {
    const { value } = e.target;
    let newTotalCost = formData.totalCost;

    if (value === "yes") {
      newTotalCost += cost;
    } else {
      newTotalCost -= cost;
    }

    setFormData((prev) => ({
      ...prev,
      selectedQuestions: {
        ...prev.selectedQuestions,
        [question]: value,
      },
      totalCost: newTotalCost,
    }));

    if (errors.additionalQuestions) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.additionalQuestions;
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      referralSource: checked
        ? [...formData.referralSource, name]
        : formData.referralSource.filter((item) => item !== name),
    });
  // Handle change in problem description
   
  if (errors.referralSource) {
    setErrors(prev => {
      const newErrors = {...prev};
      delete newErrors.referralSource;
      return newErrors;
    });
  }
};


  const handleDateChange = (date) => {
    setFormData({ ...formData, completionDate: date });
  };

  

  

  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [bookingEmail, setBookingEmail] = useState('');

const handleSubmit = async () => {
  const { referralSource, otherReferral, selectedQuestions, ...dataToSend } = formData;
  const referralSourceText = formData.referralSource.join(", ");
  try {
    const response = await axios.post('http://localhost:5001/api/book-service', {
      ...dataToSend,
      referralSource: referralSourceText,
    });

    if (response.data.success) {
      setBookingEmail(dataToSend.email); // Assuming email is in dataToSend
      setIsSuccessPopupOpen(true);
    }
  } catch (error) {
    console.error('Booking failed:', error);
    alert('Booking failed. Please try again.');
  }
};


const renderErrorMessage = (field) => {
  return errors[field] ? (
    <p style={{ 
      color: 'red', 
      fontSize: '14px', 
      marginTop: '5px', 
      marginBottom: '10px' 
    }}>
      {errors[field]}
    </p>
  ) : null;
};

return (
  <div className="container mt-5">
    {/* Step 1: Personal Information */}
    {step === 1 && (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <div style={{ 
          width: "100%", 
          maxWidth: "800px", 
          padding: "20px", 
          backgroundColor: "#fff", 
          borderRadius: "8px", 
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" 
        }}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Personal Information</h2>
          
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <div style={{ flex: 1 }}>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              {renderErrorMessage('firstName')}
            </div>
            <div style={{ flex: 1 }}>
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              {renderErrorMessage('lastName')}
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <div style={{ flex: 1 }}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              {renderErrorMessage('email')}
            </div>
            <div style={{ flex: 1 }}>
              <input
                type="tel"
                placeholder="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              {renderErrorMessage('phoneNumber')}
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              onClick={nextStep}
              style={{
                padding: "10px 20px",
                fontSize: "18px",
                width: "80%",
                maxWidth: "400px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    )}

      {step === 2 && (
        <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "800px",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Address Details</h2>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              placeholder="Street Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "10px",
              }}
            />
            <input
              type="text"
              placeholder="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "10px",
              }}
            />
            <input
              type="text"
              placeholder="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "10px",
              }}
            />
            <input
              type="text"
              placeholder="Zip Code"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "20px",
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              className="btn btn-secondary"
              onClick={prevStep}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#6c757d",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                width: "100px"
              }}
            >
              Back
            </button>
            <button
              className="btn btn-primary"
              onClick={nextStep}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                 width: "100px"
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      
      )}

{step === 3 && (

<div
style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",
}}
>
<div
  style={{
    width: "100%",
    maxWidth: "800px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  }}
>
  <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Additional Information</h2>

  {/* Type of Building */}
  <fieldset style={{ marginBottom: "20px" }}>
    <legend style={{ fontSize: "18px", marginBottom: "10px" }}>Type of Building *</legend>
    <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
      {["Residential", "Commercial", "Condo/Multi-family"].map((type) => (
        <label key={type} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <input
            type="radio"
            name="buildingType"
            value={type}
            checked={formData.buildingType === type}
            onChange={handleChange}
            style={{ width: "20px", height: "20px" }}
          />
          {type}
        </label>
      ))}
    </div>
  </fieldset>

  {/* Type of Parking */}
  <fieldset style={{ marginBottom: "20px" }}>
    <legend style={{ fontSize: "18px", marginBottom: "10px" }}>Type of Parking *</legend>
    <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
      {["Off Street Parking", "Garage Parking", "Driveway Parking", "None"].map((type) => (
        <label key={type} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <input
            type="radio"
            name="parkingType"
            value={type}
            checked={formData.parkingType === type}
            onChange={handleChange}
            style={{ width: "20px", height: "20px" }}
          />
          {type}
        </label>
      ))}
    </div>
  </fieldset>

  {/* Completion Date */}
  <div style={{ marginBottom: "20px" }}>
    <label style={{ fontSize: "16px", marginBottom: "10px", display: "block" }}>
      When would you like to have the project completed? *
    </label>
    <DatePicker
      selected={formData.completionDate}
      onChange={handleDateChange}
      required
      style={{
        width: "100%",
        padding: "10px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
    />
  </div>

  {/* Referral Source */}
  <fieldset style={{ marginBottom: "20px" }}>
    <legend style={{ fontSize: "18px", marginBottom: "10px" }}>How did you hear about us? *</legend>
    <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
      {[
        "Google",
        "Instagram",
        "Magazine",
        "RJT Website",
        "Other",
        "Friend/Relative",
        "Existing Client",
      ].map((option) => (
        <label key={option} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            type="checkbox"
            name={option}
            onChange={handleCheckboxChange}
            checked={formData.referralSource.includes(option)}
            style={{ width: "20px", height: "20px" }}
          />
          {option}
        </label>
      ))}
    </div>
  </fieldset>

  {/* Buttons */}
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <button
      onClick={prevStep}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#6c757d",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        width:"100px"
      }}
    >
      Back
    </button>
    <button
      onClick={nextStep}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        width:"100px"
      }}
    >
      Next
    </button>
  </div>
</div>
</div>

      )}

{step === 4 && (
   <div
   style={{
     display: "flex",
     justifyContent: "center",
     alignItems: "center",
     height: "70vh",
   }}
 >
   <div
     style={{
       width: "100%",
       maxWidth: "700px",
       padding: "20px",
       backgroundColor: "#fff",
       borderRadius: "8px",
       boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
     }}
   >
     <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Problem Description</h2>
 
     {/* Problem Description Textarea */}
     <textarea
       placeholder="Describe your problem in detail..."
       value={formData.problemDescription}
       onChange={handleDescriptionChange}
       style={{
         width: "100%",
         height: "120px",
         padding: "10px",
         fontSize: "16px",
         border: "1px solid #ccc",
         borderRadius: "4px",
         marginBottom: "20px",
         resize: "none",
       }}
     />
 
     {/* Additional Questions */}
     {questions.length > 0 && (
       <div style={{ marginBottom: "20px" }}>
         <h3 style={{ marginBottom: "15px" }}>Additional Questions</h3>
         <ul style={{ padding: "0", listStyleType: "none" }}>
           {questions.map((q, idx) => (
             <li
               key={idx}
               style={{
                 marginBottom: "15px",
                 padding: "15px",
                 border: "1px solid #ccc",
                 borderRadius: "4px",
                 backgroundColor: "#f9f9f9",
               }}
             >
               <p style={{ marginBottom: "10px", fontSize: "16px" }}>{q.question}</p>
               <div style={{ display: "flex", gap: "15px" }}>
                 <label
                   style={{
                     display: "flex",
                     alignItems: "center",
                     gap: "5px",
                   }}
                 >
                   <input
                     type="radio"
                     name={q.question}
                     value="yes"
                     onChange={handleQuestionChange(q.question, q.cost)}
                     style={{ width: "20px", height: "20px" }}
                   />
                   Yes
                 </label>
                 <label
                   style={{
                     display: "flex",
                     alignItems: "center",
                     gap: "5px",
                   }}
                 >
                   <input
                     type="radio"
                     name={q.question}
                     value="no"
                     onChange={handleQuestionChange(q.question, 0)}
                     style={{ width: "20px", height: "20px" }}
                   />
                   No
                 </label>
               </div>
             </li>
           ))}
         </ul>
       </div>
     )}
 
     {/* Navigation Buttons */}
     <div style={{ display: "flex", justifyContent: "space-between" }}>
       <button
         className="btn btn-secondary"
         onClick={prevStep}
         style={{
           padding: "10px 20px",
           fontSize: "16px",
           backgroundColor: "#6c757d",
           color: "#fff",
           border: "none",
           borderRadius: "4px",
           cursor: "pointer",
           width: "100px"
         }}
       >
         Back
       </button>
       <button
         className="btn btn-primary"
         onClick={nextStep}
         style={{
           padding: "10px 20px",
           fontSize: "16px",
           backgroundColor: "#007bff",
           color: "#fff",
           border: "none",
           borderRadius: "4px",
           cursor: "pointer",
           width:"100px"
         }}
       >
         Next
       </button>
     </div>
   </div>
 </div>
 
  )}

  {step === 5 && (
    
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "60vh",
    }}
  >
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: "20px",
        width: "100%",
        maxWidth: "800px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "20px",
      }}
    >
      {/* Left Column: Payment Options */}
      <div
        style={{
          flex: "1",
          minWidth: "100px",
          borderRight: "1px solid #ccc",
          paddingRight: "10px",
        }}
      >
        <h4 style={{ marginBottom: "10px" }}>Select Payment Method</h4>
        {["Credit Card", "Debit Card", "PayPal"].map((method) => (
          <div
            key={method}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method}
              checked={formData.paymentMethod === method}
              onChange={handleChange}
              style={{
                width: "20px",
                height: "20px",
                marginRight: "10px",
              }}
            />
            <label style={{ fontSize: "16px" }}>{method}</label>
          </div>
        ))}
      </div>
  
      {/* Right Column: Cost Breakdown */}
      <div style={{ flex: "1", minWidth: "70%", paddingLeft: "20px" }}>
  <h4 style={{ marginBottom: "15px" }}>Cost Breakdown</h4>
  
  {/* Base Cost */}
  <p
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px",
    }}
  >
    <span>Base Cost:</span>
    <strong>${serviceBaseCosts[feature]}</strong>
  </p>

  {/* Additional Costs */}
  {Object.entries(formData.selectedQuestions).map(([question, value]) => {
    const questionData = questions.find((q) => q.question === question);
    if (!questionData) return null;
    const addedCost = questionData.cost;

    if (value === "yes") {
      return (
        <p
          key={question}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <span>{question}:</span>
          <strong>+${addedCost}</strong>
        </p>
      );
    }
    return null;
  })}

  {/* Total Payable */}
  <p
    style={{
      display: "flex",
      justifyContent: "space-between",
      fontSize: "18px",
      fontWeight: "bold",
      borderTop: "1px solid #ccc",
      paddingTop: "10px",
      marginTop: "10px",
    }}
  >
    <span>Total Payable:</span>
    <strong>${formData.totalCost}</strong>
  </p>
</div>

    </div>
  
    {/* Buttons */}
    <div
      style={{
        marginTop: "20px",
        width: "100%",
        minWidth:"100px",
        display: "flex",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <button
        onClick={prevStep}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          minWidth:"100px",
          maxWidth: "500px",
          backgroundColor: "#6c757d",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Back
      </button>
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Confirm & Pay
      </button>
    </div>
  </div>
  
  )}

    <BookingSuccessPopup 
      isOpen={isSuccessPopupOpen} 
      onClose={() => setIsSuccessPopupOpen(false)}
      email={bookingEmail}
    />
    </div>
  );
};

export default RequestNewEstimate;