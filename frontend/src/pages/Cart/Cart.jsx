import React, { useState, useEffect } from 'react'; //3
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';

const Cart = () => {
  
  // Here I added the promocode and discount 
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const offers = [
    { promoCode: 'BOGO', discount: 50, isPublished: true },
    { promoCode: 'PREM20', discount: 20, isPublished: true },
    { promoCode: 'FREECHIPS', discount: 5, isPublished: true },
    { promoCode: 'ORDER10', discount: 10, isPublished: true }
  ];

  // Reference: https://www.w3schools.com/react/react_useeffect.asp
  useEffect(() => {
    // This is to retrieve the cart items from localStorage, if available, when the component mounts
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    // Here I set the retrieved cart items to the state
    setCartItems(savedCartItems);
  }, []);

  // Here I added the function to handle the quantity change for a cart item
  const handleQuantityChange = (id, quantity) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: quantity < 1 ? 1 : quantity }; // Here I ensure that the quantity is not less than 1
      }
      return item;
    });
    setCartItems(updatedCartItems);
    // This below line is to save the updated cart items to localStorage for persistence
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  // Here I added the function for removing the item from the cart
  const handleRemoveItem = (id) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
    // This below line is to save the updated cart items to localStorage for persistence
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  // Here I added the function to count the total amount of items in the cart
  const calculateTotal = () => {
    const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return total - (total * discount / 100);
  };

  // Here I added the function to handle the promocode
  const handleApplyPromoCode = () => {
    const offer = offers.find(offer => offer.promoCode === promoCode && offer.isPublished); //4
    if (offer) {
      setDiscount(offer.discount);
    } else {
      alert('Invalid promo code');
      setDiscount(0);
    }
  };

  // Here I use navigate hook to navigate to the checkout page
  const navigate = useNavigate();
  const handleCheckout = () => {
    // Here I pass the data through the state to checkout page
    navigate('/Checkout', { state: { cartItems } });
  };

  return (
  <>
  <Navbar />
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      <table className="cart-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Size</th>
              <th>Bread</th>
              <th>Cheese</th>
              <th>Toppings</th>
              <th>Grilled</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.subSize}</td>
                <td>{item.breadChoice}</td>
                <td>{item.cheeseChoice}</td>
                <td>{item.toppings.join(', ')}</td>
                <td>{item.grilled}</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  />
                </td>
                <td>
                  <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      <div className="promo-code">
          <input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <button onClick={handleApplyPromoCode}>Apply</button>
        </div>
      <div className="cart-total">
        <h3>Total: ${calculateTotal()}</h3>
        <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
      <Footer />
    </div>
    </>
  );
};

export default Cart;