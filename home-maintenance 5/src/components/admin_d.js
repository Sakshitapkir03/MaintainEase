import React from 'react';
import { Container } from 'react-bootstrap';
import Dashboard from './dashboard';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'bootstrap/dist/css/bootstrap.min.css';

const queryClient = new QueryClient();

function AdminDashboard() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container fluid className="p-0">
        <Dashboard />
      </Container>
    </QueryClientProvider>
  );
}

export default AdminDashboard;