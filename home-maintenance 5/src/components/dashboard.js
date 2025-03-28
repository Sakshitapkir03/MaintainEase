import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DataCards from './dataCards';
import ServiceTable from './serviceTable';
import ServiceDetailModal from './serviceDetailModal';

const Dashboard = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleMoreDetails = (booking) => {
    setSelectedBooking(booking);
  };

  const closeModal = () => {
    setSelectedBooking(null);
  };

  return (
    <Container>
      <h1 className="my-4 text-center">Admin Dashboard</h1>
      
      <DataCards />
      
      <ServiceTable onMoreDetails={handleMoreDetails} />
      
      {selectedBooking && (
        <ServiceDetailModal 
          booking={selectedBooking} 
          onClose={closeModal} 
        />
      )}
    </Container>
  );
};

export default Dashboard;