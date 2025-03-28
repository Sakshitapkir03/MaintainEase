import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../index.css';

// Detailed data for all features
const serviceData = {
  plumbing: {
    'changing-pipeline': {
      title: 'Changing Pipeline',
      description: 'Our pipeline-changing services ensure efficient and reliable plumbing systems for your home.',
      image: `${process.env.PUBLIC_URL}/Servicez.jpeg`,
      whyChooseUs: [
        'Experienced and certified technicians.',
        'Use of high-quality materials for long-lasting results.',
        'Affordable and transparent pricing.',
      ],
      commonIssues: [
        'Old or corroded pipelines.',
        'Frequent water leaks.',
        'Inconsistent water pressure.',
      ],
    },
    'dripping-water': {
      title: 'Dripping Water',
      description: 'Stop wasting water and money by fixing dripping water issues quickly and efficiently.',
      image: `${process.env.PUBLIC_URL}/Servicez.jpeg`,
      whyChooseUs: [
        'Fast and reliable services.',
        'Thorough diagnostics to identify root causes.',
        'Use of advanced tools for quick fixes.',
      ],
      commonIssues: [
        'Leaking faucets.',
        'Worn-out washers.',
        'Faulty connections in plumbing systems.',
      ],
    },
    'fixing-leaks': {
      title: 'Fixing Leaks',
      description: 'We fix leaks in pipes and faucets to prevent water damage and save your home.',
      image: `${process.env.PUBLIC_URL}/Servicez.jpeg`,
      whyChooseUs: [
        'Quick and efficient repairs.',
        'Minimize water waste and damage.',
        'Guaranteed long-term solutions.',
      ],
      commonIssues: [
        'Leaky pipes or joints.',
        'Loose faucet connections.',
        'Cracks in pipelines.',
      ],
    },
  },
  electric: {
    'circuit-breaker': {
      title: 'Circuit Breaker Services',
      description: 'Ensure electrical safety with expert circuit breaker installation and maintenance services.',
      image: `${process.env.PUBLIC_URL}/Servicez.jpeg`,
      whyChooseUs: [
        'Certified electricians.',
        'Ensure home safety standards.',
        'Fast and efficient installation.',
      ],
      commonIssues: [
        'Frequent breaker trips.',
        'Old or faulty circuit breakers.',
        'Insufficient power supply.',
      ],
    },
    'generator': {
      title: 'Generator Services',
      description: 'Keep your home powered with reliable generator installation and repair.',
      image: `${process.env.PUBLIC_URL}/Servicez.jpeg`,
      whyChooseUs: [
        'Reliable and efficient solutions.',
        'Experts in generator technology.',
        'Guaranteed functionality during power outages.',
      ],
      commonIssues: [
        'Generator failure during outages.',
        'Issues with fuel or power connections.',
        'Faulty installations.',
      ],
    },
    'smoke-detector': {
      title: 'Smoke Detector Installation',
      description: 'Protect your family with smoke detector installation by certified technicians.',
      image: `${process.env.PUBLIC_URL}/Servicez.jpeg`,
      whyChooseUs: [
        'Ensure compliance with safety codes.',
        'Expert and precise installations.',
        'Minimize fire hazards effectively.',
      ],
      commonIssues: [
        'Non-functional detectors.',
        'Improper detector placement.',
        'Outdated smoke detection systems.',
      ],
    },
  },
  hvac: {
    'air-conditioning-repair': {
      title: 'Air Conditioning Repair',
      description: 'Stay cool with our efficient air conditioning repair services.',
      image: `${process.env.PUBLIC_URL}/Servicez.jpeg`,
      whyChooseUs: [
        'Expert technicians with years of experience.',
        'Affordable and quick repairs.',
        'Guaranteed performance improvement.',
      ],
      commonIssues: [
        'AC not cooling.',
        'Strange noises from the unit.',
        'Leaking refrigerant.',
      ],
    },
    'furnace-installation': {
      title: 'Furnace Installation',
      description: 'Get professional furnace installation to keep your home warm and comfortable.',
      image: `${process.env.PUBLIC_URL}/Servicez.jpeg`,
      whyChooseUs: [
        'Energy-efficient solutions.',
        'Professional installation services.',
        'Affordable pricing and financing options.',
      ],
      commonIssues: [
        'Inefficient heating systems.',
        'Frequent furnace breakdowns.',
        'Improperly sized furnaces.',
      ],
    },
    'ventilation-maintenance': {
      title: 'Ventilation Maintenance',
      description: 'Ensure proper airflow with our comprehensive ventilation maintenance services.',
      image: `${process.env.PUBLIC_URL}/Servicez.jpeg`,
      whyChooseUs: [
        'Thorough cleaning and maintenance.',
        'Improve indoor air quality.',
        'Affordable and reliable service.',
      ],
      commonIssues: [
        'Clogged ventilation ducts.',
        'Poor air circulation.',
        'Dust buildup in vents.',
      ],
    },
  },
  painting: {
    interior: {
      title: 'Interior Painting',
      description: 'Transform your living space with our professional interior painting services.',
      image: `${process.env.PUBLIC_URL}/Servicez.jpeg`,
      whyChooseUs: [
        'High-quality paints and finishes.',
        'Attention to detail for every room.',
        'Affordable and timely service.',
      ],
      commonIssues: [
        'Faded or outdated wall colors.',
        'Peeling paint.',
        'Damage to existing paintwork.',
      ],
    },
    exterior: {
      title: 'Exterior Painting',
      description: 'Enhance your home’s curb appeal with high-quality exterior painting.',
      image: `${process.env.PUBLIC_URL}/Servicez.jpeg`,
      whyChooseUs: [
        'Durable and weather-resistant paints.',
        'Expert application techniques.',
        'Affordable pricing for all exterior surfaces.',
      ],
      commonIssues: [
        'Peeling or chipping exterior paint.',
        'Outdated color schemes.',
        'Faded appearance due to weather.',
      ],
    },
    'wallpaper-installation': {
      title: 'Wallpaper Installation',
      description: 'Add style to your walls with expertly installed wallpaper.',
      image: `${process.env.PUBLIC_URL}/Servicez.jpeg`,
      whyChooseUs: [
        'Wide variety of wallpaper designs.',
        'Precision cutting and application.',
        'Affordable and clean installation.',
      ],
      commonIssues: [
        'Difficulty applying wallpaper evenly.',
        'Peeling edges.',
        'Outdated wallpaper patterns.',
      ],
    },
  },
  cleaning: {
    'deep-cleaning': {
      title: 'Deep Cleaning',
      description: 'Ensure every corner of your home sparkles with our deep cleaning services.',
      image: `${process.env.PUBLIC_URL}/Servicez.jpeg`,
      whyChooseUs: [
        'Eco-friendly cleaning products.',
        'Thorough and detailed cleaning.',
        'Affordable and timely services.',
      ],
      commonIssues: [
        'Dirt and grime buildup.',
        'Dust accumulation in hard-to-reach areas.',
        'Stained surfaces and upholstery.',
      ],
    },
    'window-cleaning': {
      title: 'Window Cleaning',
      description: 'Let in more light with streak-free, professional window cleaning.',
      image: `${process.env.PUBLIC_URL}/Servicez.jpeg`,
      whyChooseUs: [
        'Streak-free guarantee.',
        'Safe and effective cleaning methods.',
        'Affordable pricing.',
      ],
      commonIssues: [
        'Hard-to-remove stains.',
        'Dusty or streaked glass.',
        'Unclean window frames.',
      ],
    },
    'carpet-cleaning': {
      title: 'Carpet Cleaning',
      description: 'Keep your carpets fresh and clean with our expert cleaning services.',
      image: `${process.env.PUBLIC_URL}/Servicez.jpeg`,
      whyChooseUs: [
        'Powerful deep-cleaning solutions.',
        'Removal of tough stains and odors.',
        'Fast-drying technology.',
      ],
      commonIssues: [
        'Stains and spills.',
        'Dust and allergens.',
        'Worn-out carpet appearance.',
      ],
    },
  },
  roofing: {
    'roof-repairs': {
      title: 'Roof Repairs',
      description: 'Protect your home with prompt and reliable roof repair services.',
      image: `${process.env.PUBLIC_URL}/Servicez.jpeg`,
      whyChooseUs: [
        'Emergency repair services available.',
        'Expert assessment of damage.',
        'High-quality materials used.',
      ],
      commonIssues: [
        'Leaks and water damage.',
        'Cracked or missing shingles.',
        'Sagging or weakened roof structure.',
      ],
    },
    'gutter-cleaning': {
      title: 'Gutter Cleaning',
      description: 'Avoid water damage with regular gutter cleaning and maintenance.',
      image: `${process.env.PUBLIC_URL}/Servicez.jpeg`,
      whyChooseUs: [
        'Efficient and mess-free cleaning.',
        'Prevention of water-related damage.',
        'Affordable and timely service.',
      ],
      commonIssues: [
        'Clogged gutters.',
        'Overflowing water.',
        'Debris buildup.',
      ],
    },
    'roof-inspections': {
      title: 'Roof Inspections',
      description: 'Ensure the integrity of your roof with our professional inspection services.',
      image: `${process.env.PUBLIC_URL}/Servicez.jpeg`,
      whyChooseUs: [
        'Detailed assessments.',
        'Identification of potential issues.',
        'Affordable and reliable services.',
      ],
      commonIssues: [
        'Structural damage.',
        'Early signs of leaks.',
        'Roof aging and wear.',
        
      ],
    },
  },
  landscaping: {
    'lawn-maintenance': {
      title: 'Lawn Maintenance',
      description: 'Keep your lawn green and healthy with our expert maintenance services.',
      image: `${process.env.PUBLIC_URL}/Servicez.jpeg`,
      whyChooseUs: [
        'Scheduled lawn care services.',
        'Use of eco-friendly fertilizers.',
        'Experienced landscapers for precision maintenance.',
      ],
      commonIssues: [
        'Uneven grass growth.',
        'Weed infestations.',
        'Bald patches on lawns.',
      ],
    },
    'garden-design': {
      title: 'Garden Design',
      description: 'Create your dream garden with our custom garden design services.',
      image: `${process.env.PUBLIC_URL}/Servicez.jpeg`,
      whyChooseUs: [
        'Custom garden designs tailored to your needs.',
        'Use of high-quality plants and materials.',
        'Expert advice on maintenance and care.',
      ],
      commonIssues: [
        'Lack of cohesion in existing garden layout.',
        'Difficulty selecting suitable plants.',
        'Poor drainage or soil issues.',
      ],
    },
    'tree-trimming': {
      title: 'Tree Trimming',
      description: 'Maintain the health and beauty of your trees with professional trimming services.',
      image: `${process.env.PUBLIC_URL}/Servicez.jpeg`,
      whyChooseUs: [
        'Safe and efficient tree trimming.',
        'Experienced arborists for precise cuts.',
        'Boost tree health and appearance.',
      ],
      commonIssues: [
        'Overgrown branches.',
        'Dead or diseased limbs.',
        'Interference with power lines.',
      ],
    },
  },
  'appliance-repair': {
    refrigerator: {
      title: 'Refrigerator Repair',
      description: 'Keep your food fresh with quick and reliable refrigerator repair services.',
      image: `${process.env.PUBLIC_URL}/Servicez.jpeg`,
      whyChooseUs: [
        'Expert diagnosis and repairs.',
        'Service for all major refrigerator brands.',
        'Affordable and timely services.',
      ],
      commonIssues: [
        'Refrigerator not cooling.',
        'Excessive frost buildup.',
        'Unusual noises or leaks.',
      ],
    },
    'washing-machine': {
      title: 'Washing Machine Fixes',
      description: 'Get your laundry done without delays with our washing machine repair services.',
      image: `${process.env.PUBLIC_URL}/Servicez.jpeg`,
      whyChooseUs: [
        'Quick and reliable repairs.',
        'Service for top-load and front-load models.',
        'Use of genuine replacement parts.',
      ],
      commonIssues: [
        'Washing machine not draining.',
        'Unbalanced drum.',
        'Failure to start or complete cycles.',
      ],
    },
    'oven-maintenance': {
      title: 'Oven Maintenance',
      description: 'Ensure your oven works perfectly with our expert maintenance services.',
      image: `${process.env.PUBLIC_URL}/Servicez.jpeg`,
      whyChooseUs: [
        'Thorough cleaning and inspections.',
        'Efficient temperature calibration.',
        'Safe handling of electrical components.',
      ],
      commonIssues: [
        'Uneven cooking.',
        'Malfunctioning heating elements.',
        'Oven door not sealing properly.',
      ],
    },
  },
};

const ServiceDetails = () => {
  const { category, feature } = useParams();
  const navigate = useNavigate();
  const service = serviceData[category]?.[feature];

  if (!service) {
    return <h2 className="text-center my-5">Service Not Found</h2>;
  }

  return (
    <div className="service-details-container container my-5">
      <h2 className="text-center mb-4">{service.title}</h2>
      <img src={service.image} alt={service.title} className="img-fluid mb-4" />
      <p className="service-description">{service.description}</p>

      {/* Why Choose Us Section */}
      <div className="why-choose-us my-4">
        <h3>Why Choose Us?</h3>
        <ul>
          {service.whyChooseUs.map((reason, idx) => (
            <li key={idx}>{reason}</li>
          ))}
        </ul>
      </div>

      {/* Common Problems Solved */}
      <div className="common-issues my-4">
        <h3>Common Problems We Solve</h3>
        <ul>
          {service.commonIssues.map((issue, idx) => (
            <li key={idx}>{issue}</li>
          ))}
        </ul>
      </div>

      {/* Call-to-Action */}
      <div className="text-center mt-5">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate(`/request-estimate/${category}/${feature}`)}
        >
          Get Estimate
        </button>
      </div>
    </div>
  );
};

export default ServiceDetails;


