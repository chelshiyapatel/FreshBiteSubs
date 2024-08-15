import React, { useState, useEffect, useContext } from 'react'; //4
import './Checkout.css';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import { useLocation } from 'react-router-dom'; //3z
import { useMutation, useQuery, gql } from '@apollo/client'; //3
import { useNavigate } from 'react-router-dom';//3
import { AuthContext } from '../../context/AuthContext'; //4

// Here I define the mutation
const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($input: OrderInput!) {
    createOrder(input: $input) {
      id
      message
    }
  }
`;

// Here I define the mutation for getting the user by email
const GET_USER_QUERY = gql`
  query GetUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      username
    }
  }
`;

const Checkout = ({ cartItems }) => {
  const { user } = useContext(AuthContext);
  // Here I get the current location object from React Router
  const location = useLocation();

  // This extract cart items from the location state, or default to an empty array if not available
  const locationCartItems = location.state?.cartItems || [];

  // This initialize state to hold cart items
  const [items, setItems] = useState(locationCartItems);

  useEffect(() => {
    console.log("Location Cart Items:", locationCartItems);
    // Here I update the local state with the cart items from the location state
    setItems(locationCartItems);
  }, [locationCartItems]);

  // Here I create the state to manage form data
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    cardholderName: '',
    cvv: '',
    expiryDate: ''
  });

  // Here I retrive the email address
  const userEmail = user?.email;

  const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USER_QUERY, {
    variables: { email: userEmail }, // here i pass the user's email as a variable to query
  });


  // Here I'm using that mutation to create the order
  const [createOrder] = useMutation(CREATE_ORDER_MUTATION);
  const navigate = useNavigate();

  useEffect(() => {
    // Here I check if user is available 
    if (userData) {
      // Below code is to if userData exists, update the form data state
      setFormData(prevState => ({
        ...prevState,
        // here I update the fullname field with username from userdata
        fullName: userData.getUserByEmail.username
      }));
    }
  }, [userData]);

  // Here I created the function to handle the changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Below code is to update form data based on the input name and value
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Here I created the function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Below code is to create the order input object with necessary details
    const orderInput = {
      customerName: formData.fullName,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      items: items.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        toppings: item.toppings.join(', ')
      }))
    };

    try {
      // Here I send the order details to the createOrder mutation
      const { data } = await createOrder({ variables: { input: orderInput } });
      alert(data.createOrder.message); // This shows success message
      localStorage.removeItem('cartItems'); 
      navigate('/user-home'); 
    } catch (error) {
      console.error("Error creating order:", error.message);
    }
  };

  // Here I created the function to handle the total
  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div>
      <Navbar />
      <div className="checkout-page">
        <h2>Checkout</h2>
        <div className="order-summary">
          <h3>Order Summary</h3>
          <ul>
          {items.length ? (
              items.map(item => (
                <li key={item.id}>
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                  <span>Quantity: {item.quantity}</span>
                </li>
              ))
            ) : (
              <p>No items in cart</p>
            )}
          </ul>
          <div className="total">
            <span>Total:</span>
            {/* 3 */}
            <span>${calculateTotal()}</span> 
          </div>
        </div>
        <div className="shipping-form">
          <h3>Shipping Information</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              required
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              required
            />
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Postal Code"
              required
            />
            <h3>Payment Information</h3>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="Card Number"
              required
            />
            <input
              type="text"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={handleChange}
              placeholder="Cardholder Name"
              required
            />
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="CVV"
              required
            />
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="Expiry Date (MM/YYYY)"
              required
            />
            <button type="submit">Proceed to Payment</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;