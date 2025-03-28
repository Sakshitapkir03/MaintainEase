import React from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchDashboardStats = async () => {
  const response = await axios.get('http://localhost:5001/api/dashboard-stats');
  return response.data;
};

const DataCards = () => {
  const { data, isLoading, error } = useQuery('dashboardStats', fetchDashboardStats);

  if (isLoading) return (
    <div className="text-center my-4">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

  if (error) return <div className="alert alert-danger">Error fetching stats</div>;

  return (
    <Row className="g-3 mb-4" style={{flexDirection:"row"}}>
      <Col xs={12} sm={6} md={3}>
        <Card>
          <Card.Body className="text-center">
            <Card.Title>Total Customers</Card.Title>
            <h3 className="text-primary">{data.totalCustomers}</h3>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} sm={6} md={3}>
        <Card>
          <Card.Body className="text-center">
            <Card.Title>Total Earnings</Card.Title>
            <h3 className="text-success">${data.totalEarnings.toFixed(2)}</h3>
          </Card.Body>
        </Card>
      </Col>
      {/* <Col xs={12} sm={6} md={3}>
        <Card>
          <Card.Body className="text-center">
            <Card.Title>Services Completed</Card.Title>
            <h3 className="text-info">{data.completedServices}</h3>
          </Card.Body>
        </Card>
      </Col> */}
      <Col xs={12} sm={6} md={3}>
        <Card>
          <Card.Body className="text-center">
            <Card.Title>Estimated Profit</Card.Title>
            <h3 className="text-warning">${data.estimatedProfit.toFixed(2)}</h3>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default DataCards;
