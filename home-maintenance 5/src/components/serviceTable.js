import React, { useState } from 'react';
import { Table, Button, Pagination, Spinner } from 'react-bootstrap';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const fetchServiceBookings = async () => {
  const response = await axios.get('http://localhost:5001/api/service-bookings');
  return response.data;
};

const deleteServiceBooking = async (id) => {
  await axios.delete(`http://localhost:5001/api/service-bookings/${id}`);
};

const ServiceTable = ({ onMoreDetails }) => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, isLoading, error } = useQuery('serviceBookings', fetchServiceBookings);

  const deleteMutation = useMutation(deleteServiceBooking, {
    onSuccess: () => {
      queryClient.invalidateQueries('serviceBookings');
    }
  });

  if (isLoading) return (
    <div className="text-center my-4">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

  if (error) return <div className="alert alert-danger">Error fetching bookings</div>;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Service Type</th>
              <th>Cost</th>
              <th>State</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((booking) => (
              <tr key={booking.id}>
                <td>{`${booking.first_name} ${booking.last_name}`}</td>
                <td>{booking.service_type}</td>
                <td>${booking.total_cost}</td>
                <td>{booking.state}</td>
                <td>
                  <span className={`badge ${booking.completion_date > new Date() ? 'bg-warning' : 'bg-success'}`}>
                    {booking.completion_date > new Date() ? 'Pending' : 'Completed'}
                  </span>
                </td>
                <td>
                  <Button 
                    variant="info" 
                    size="sm" 
                    className="me-2" 
                    onClick={() => onMoreDetails(booking)}
                  >
                    Details
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => handleDelete(booking.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center">
        <Pagination>
          {pageNumbers.map(number => (
            <Pagination.Item 
              key={number} 
              active={number === currentPage}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </>
  );
};

export default ServiceTable;
