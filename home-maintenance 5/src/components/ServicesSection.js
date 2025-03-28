import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import '../index.css';

function ServicesSection() {
  const services = [
    {
      title: 'Plumbing',
      image: `${process.env.PUBLIC_URL}/1.jpg`,
      features: [
        { name: 'Changing Pipeline', link: '/services/plumbing/changing-pipeline' },
        { name: 'Dripping Water', link: '/services/plumbing/dripping-water' },
        { name: 'Fixing Leaks', link: '/services/plumbing/fixing-leaks' },
      ],
      description: 'Our plumbing services cover all your needs, from fixing leaks to installing new pipelines.',
    },
    {
      title: 'Electric',
      image: `${process.env.PUBLIC_URL}/2.jpg`,
      features: [
        { name: 'Circuit Breaker Services', link: '/services/electric/circuit-breaker' },
        { name: 'Generator Services', link: '/services/electric/generator' },
        { name: 'Smoke Detector Installation', link: '/services/electric/smoke-detector' },
      ],
      description: 'We provide expert electrical repairs and installations for your home or office.',
    },
    {
      title: 'HVAC',
      image: `${process.env.PUBLIC_URL}/3.png`,
      features: [
        { name: 'Air Conditioning Repair', link: '/services/hvac/air-conditioning-repair' },
        { name: 'Furnace Installation', link: '/services/hvac/furnace-installation' },
        { name: 'Ventilation Maintenance', link: '/services/hvac/ventilation-maintenance' },
      ],
      description: 'Ensure your home stays comfortable with our professional HVAC services.',
    },
    {
      title: 'Painting',
      image: `${process.env.PUBLIC_URL}/4.jpg`,
      features: [
        { name: 'Interior Painting', link: '/services/painting/interior' },
        { name: 'Exterior Painting', link: '/services/painting/exterior' },
        { name: 'Wallpaper Installation', link: '/services/painting/wallpaper-installation' },
      ],
      description: 'Transform your space with our high-quality painting and decorating services.',
    },
    {
      title: 'Cleaning',
      image: `${process.env.PUBLIC_URL}/5.jpg`,
      features: [
        { name: 'Deep Cleaning', link: '/services/cleaning/deep-cleaning' },
        { name: 'Window Cleaning', link: '/services/cleaning/window-cleaning' },
        { name: 'Carpet Cleaning', link: '/services/cleaning/carpet-cleaning' },
      ],
      description: 'Our cleaning services ensure your home sparkles from top to bottom.',
    },
    {
      title: 'Roofing',
      image: `${process.env.PUBLIC_URL}/6.png`,
      features: [
        { name: 'Roof Repairs', link: '/services/roofing/roof-repairs' },
        { name: 'Gutter Cleaning', link: '/services/roofing/gutter-cleaning' },
        { name: 'Roof Inspections', link: '/services/roofing/roof-inspections' },
      ],
      description: 'Protect your home with our reliable roofing and gutter maintenance services.',
    },
    {
      title: 'Landscaping',
      image: `${process.env.PUBLIC_URL}/7.jpg`,
      features: [
        { name: 'Lawn Maintenance', link: '/services/landscaping/lawn-maintenance' },
        { name: 'Garden Design', link: '/services/landscaping/garden-design' },
        { name: 'Tree Trimming', link: '/services/landscaping/tree-trimming' },
      ],
      description: 'Create and maintain a beautiful outdoor space with our professional landscaping services.',
    },
    {
      title: 'Appliance Repair',
      image: `${process.env.PUBLIC_URL}/8.jpg`,
      features: [
        { name: 'Refrigerator Repair', link: '/services/appliance-repair/refrigerator' },
        { name: 'Washing Machine Fixes', link: '/services/appliance-repair/washing-machine' },
        { name: 'Oven Maintenance', link: '/services/appliance-repair/oven-maintenance' },
      ],
      description: 'We offer quick and reliable repairs for all your household appliances.',
    },
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Our Services</h2>
      <div className="service-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card-grid">
            <div className="service-title">{service.title}</div>
            <img src={service.image} alt={service.title} className="img-fluid" />
            <p className="mt-2">{service.description}</p>
            <ul>
              {service.features.map((feature, idx) => (
                <li key={idx}>
                  <Link to={feature.link}>{feature.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesSection;
