import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './OrderTracking.css';
import { AuthContext } from '../../context/AuthContext';

// here i define the graphql query to get orders by customers name
const GET_ORDERS_BY_USER = gql`
  query GetOrdersByUser($customerName: String!) {
    getOrdersByUser(customerName: $customerName) {
      id
      customerName
      address
      city
      postalCode
      items {
        name
        price
        quantity
      }
      status
    }
  }
`;

const OrderTracking = () => {
  const { user } = useContext(AuthContext); // Here I get current user from context

  // Here I get the customer name
  const customerName = user?.username; 
  console.log('Customer Name:', customerName);

  // Here I fetch the order usign the graphql schema
  const { loading, error, data } = useQuery(GET_ORDERS_BY_USER, {
    variables: { customerName },
    skip: !customerName, // This skips query if user data is not available
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Navbar />
      <div className="order-tracking-container">
        <h2>Order Tracking</h2>
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Items</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.getOrdersByUser.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>
                  {order.items.map((item, index) => (
                    <div key={index}>
                      {item.name} x {item.quantity}
                    </div>
                  ))}
                </td>
                <td>
                  {order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                </td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default OrderTracking;
