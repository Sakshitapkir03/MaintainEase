import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';

const ServiceDetailModal = ({ booking, onClose }) => {
  return (
    <Modal show={true} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Booking Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <p><strong>Name:</strong> {`${booking.first_name} ${booking.last_name}`}</p>
            <p><strong>Email:</strong> {booking.email}</p>
            <p><strong>Phone:</strong> {booking.phone_number}</p>
          </Col>
          <Col md={6}>
            <p><strong>Address:</strong> {`${booking.address}, ${booking.city}, ${booking.state} ${booking.zip_code}`}</p>
            <p><strong>Service Type:</strong> {booking.service_type}</p>
            <p><strong>Building Type:</strong> {booking.building_type}</p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={6}>
            <p><strong>Total Cost:</strong> ${booking.total_cost}</p>
            <p><strong>Booking Date:</strong> {new Date(booking.booking_date).toLocaleString()}</p>
          </Col>
          <Col md={6}>
            <p><strong>Payment Method:</strong> {booking.payment_method}</p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <p><strong>Problem Description:</strong></p>
            <p>{booking.problem_description}</p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ServiceDetailModal;