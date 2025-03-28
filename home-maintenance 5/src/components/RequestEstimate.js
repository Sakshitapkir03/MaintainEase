import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "../index.css";

const serviceBaseCosts = {
  'Changing Pipeline': 100,
  'Dripping Water': 50,
  'Fixing Leaks': 75,
  'Circuit Breaker Services': 120,
  'Generator Services': 150,
  'Smoke Detector Installation': 90,
  'Air Conditioning Repair': 200,
  'Furnace Installation': 300,
  'Ventilation Maintenance': 180,
  'Interior Painting': 400,
  'Exterior Painting': 500,
  'Wallpaper Installation': 250,
  'Deep Cleaning': 150,
  'Window Cleaning': 80,
  'Carpet Cleaning': 100,
  'Roof Repairs': 350,
  'Gutter Cleaning': 120,
  'Roof Inspections': 200,
  'Lawn Maintenance': 100,
  'Garden Design': 400,
  'Tree Trimming': 150,
  'Refrigerator Repair': 200,
  'Washing Machine Fixes': 180,
  'Oven Maintenance': 150,
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

const RequestEstimate = () => {
  const navigate = useNavigate();
  const { category, feature } = useParams();
  const questions = serviceQuestions[category]?.[feature] || [];

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    buildingType: "",
    parkingType: "",
    completionDate: new Date(),
    referralSource: [],
    otherReferral: "",
  });

  const [problemDescription, setProblemDescription] = useState("");
  const [additionalCosts, setAdditionalCosts] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      referralSource: checked
        ? [...formData.referralSource, name]
        : formData.referralSource.filter((item) => item !== name),
    });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, completionDate: date });
  };

  const handleQuestionChange = (question, cost) => (e) => {
    setAdditionalCosts({
      ...additionalCosts,
      [question]: e.target.value === "yes" ? cost : 0,
    });
  };

  const calculateCost = () => {
    return Object.values(additionalCosts).reduce((acc, cost) => acc + cost, 0);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = () => {
    const totalCost = calculateCost();
    const finalDescription = problemDescription || "No description provided";
    navigate("/request-estimate-summary", { state: { totalCost, finalDescription } });
  };

  const StepOne = () => (
    <div>
      <h2>Let’s Get Started!</h2>
      <p>(Estimates within 24 hours)</p>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
      />
      <div className="button-container">
        <button onClick={() => navigate(-1)}>Back</button>
        <button onClick={nextStep}>Next</button>
      </div>
    </div>
  );

  const StepTwo = () => (
    <div>
      <h2>Address Information</h2>
      <input
        type="text"
        name="address"
        placeholder="Street Address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="zipCode"
        placeholder="Zip Code"
        value={formData.zipCode}
        onChange={handleChange}
        required
      />
      <div className="button-container">
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep}>Next</button>
      </div>
    </div>
  );

  const StepThree = () => (
    <div>
      <h2>Additional Information</h2>
      <fieldset>
        <legend>Type of Building *</legend>
        <div className="radio-group">
          {["Residential", "Commercial", "Condo/Multi-family"].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="buildingType"
                value={type}
                checked={formData.buildingType === type}
                onChange={handleChange}
              />
              {type}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>Type of Parking *</legend>
        <div className="radio-group">
          {["Off Street Parking", "Garage Parking", "Driveway Parking", "None"].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="parkingType"
                value={type}
                checked={formData.parkingType === type}
                onChange={handleChange}
              />
              {type}
            </label>
          ))}
        </div>
      </fieldset>

      <label>
        When would you like to have the project completed? *
        <DatePicker selected={formData.completionDate} onChange={handleDateChange} required />
      </label>

      <fieldset>
        <legend>How did you hear about us? *</legend>
        <div className="checkbox-group">
          {["Google", "Instagram", "Magazine", "RJT Website", "Other", "Friend/Relative", "Existing Client"].map(
            (option) => (
              <label key={option}>
                <input
                  type="checkbox"
                  name={option}
                  onChange={handleCheckboxChange}
                  checked={formData.referralSource.includes(option)}
                />
                {option}
              </label>
            )
          )}
        </div>
      </fieldset>
      <div className="button-container">
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep}>Next</button>
      </div>
    </div>
  );

  const StepFour = () => (
    <div>
      <h2>Problem Description</h2>
      <textarea
        className="form-control mb-4"
        placeholder="Describe your problem in detail..."
        value={problemDescription}
        onChange={(e) => setProblemDescription(e.target.value)}
      />
      {questions.length > 0 && (
        <div>
          <h3>Additional Questions</h3>
          <ul>
            {questions.map((q, idx) => (
              <li key={idx}>
                <p>{q.question}</p>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name={q.question}
                      value="yes"
                      onChange={handleQuestionChange(q.question, q.cost)}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={q.question}
                      value="no"
                      onChange={handleQuestionChange(q.question, 0)}
                    />
                    No
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="button-container">
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep}>Next</button>
      </div>
    </div>
  );

  const StepFive = () => {
    const baseCost = serviceBaseCosts[feature] || 0;
    const additionalCost = calculateCost();
    const totalCost = baseCost + additionalCost;

    const handlePayment = () => {
      alert(`Payment successful! Total: $${totalCost}`);
    };

    return (
      <div>
        <h2>Payment</h2>
        <p><strong>Base Cost:</strong> ${baseCost}</p>
        <p><strong>Additional Costs:</strong> ${additionalCost}</p>
        <p><strong>Total Cost:</strong> ${totalCost}</p>
        <div className="radio-group">
          {["Credit Card", "Debit Card", "PayPal"].map((method) => (
            <label key={method}>
              <input type="radio" name="paymentMethod" value={method} />
              {method}
            </label>
          ))}
        </div>
        <div className="button-container">
          <button onClick={prevStep}>Back</button>
          <button onClick={handlePayment}>Submit & Pay</button>
        </div>
      </div>
    );
  };

  return (
    <div className="request-estimate">
      {step === 1 && <StepOne />}
      {step === 2 && <StepTwo />}
      {step === 3 && <StepThree />}
      {step === 4 && <StepFour />}
      {step === 5 && <StepFive />}
    </div>
  );
};

export default RequestEstimate;


