import React, { useState, useEffect } from 'react';
import './AdminHome.css';
import { assets } from '../../assets/assets'; 
import Footer from '../../components/Footer/Footer';
import NavbarAdmin from '../../components/NavbarAdmin/NavbarAdmin';
import { useMutation, gql } from '@apollo/client'; //4

// Below I added the mutation for adding the new product
const ADD_PRODUCT = gql`
  mutation AddProduct($input: ProductInput!) {
    createProduct(input: $input) {
      id
      name
      category
      image
      price
    }
  }
`;


// Array of products with details like id, name, category, image, and price this is same as user home page
// And for reference I already mentioned in Home.jsx file
const initialProducts = [
  {
    id: 1,
    name: 'VEGGIE AND CHEESE',
    category: 'classic',
    image: assets.veggie,
    price: 5.99,
  },
  {
    id: 2,
    name: 'ASSORTED SUB',
    category: 'classic',
    image: assets.AssortedSub,
    price: 7.99,
  },
  {
    id: 3,
    name: 'HAM SUB',
    category: 'classic',
    image: assets.Ham,
    price: 4.99,
  },
  {
    id: 4,
    name: 'LOUISIANA PEPPER CHICKEN',
    category: 'premium',
    image: assets.lousina,
    price: 5.45,
  },
  {
    id: 5,
    name: 'STEAK & CHEESE',
    category: 'premium',
    image: assets.steak,
    price: 6.99,
  },
  {
    id: 6,
    name: 'ULTIMATE CLUB',
    category: 'premium',
    image: assets.UltimateClub,
    price: 6.79,
  },
  {
    id: 7,
    name: 'BUFFALO CHICKEN',
    category: 'signature',
    image: assets.BuffaloChicken,
    price: 7.89,
  },
  {
    id: 8,
    name: 'CHICKEN PARM',
    category: 'signature',
    image: assets.ChickenParm,
    price: 9.99,
  },
  {
    id: 9,
    name: 'CANADIAN CLUB',
    category: 'signature',
    image: assets.CanadianClub,
    price: 10.99,
  },
  {
    id: 10,
    name: 'TEX-MEX BLACK BEAN',
    category: 'mighty',
    image: assets.texmex,
    price: 9.99,
  },
  {
    id: 11,
    name: 'gardein™ Meatless Meatballs',
    category: 'mighty',
    image: assets.garden,
    price: 5.99,
  },
  {
    id: 12,
    name: 'Choclate Cookie',
    category: 'sides',
    image: assets.ChoclateCookie,
    price: 6.99,
  },
  {
    id: 13,
    name: 'Chips',
    category: 'sides',
    image: assets.Chips,
    price: 4.99,
  },
  {
    id: 14,
    name: 'SEAFOOD SUB',
    category: 'protein',
    image: assets.Seafood,
    price: 8.99,
  },
  {
    id: 15,
    name: 'ROAST BEEF & CHEDDAR SUB',
    category: 'protein',
    image: assets.R,
    price: 7.99,
  },
  {
    id: 16,
    name: 'ALBACORE TUNA',
    category: 'protein',
    image: assets.AlbacoreTuna,
    price: 9.99,
  },
];


const AdminHome = () => {
  // Here I state hooks for managing products and form input fields
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [addProduct] = useMutation(ADD_PRODUCT); //4

  // Below code is the useEffect to set initialProducts as the initial state for products
  useEffect(() => {
    setProducts(initialProducts);
  }, []);

  // Below function is to handle the new product
  const handleAddProduct = async () => {
    const newProduct = {
      name: productName,
      category: productCategory,
      image: productImage,
      price: parseFloat(productPrice),
    };
  
    try {
      // Here I call the addProduct function, passing the newProduct object as input
      const { data } = await addProduct({ variables: { input: newProduct } });
      setProducts([...products, data.createProduct]); // This line is for adding new product to products array
      // Below code is to reset input fields after adding product 
      setProductName('');
      setProductCategory('');
      setProductPrice('');
      setProductImage('');
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  

  return (
    <>
      <NavbarAdmin />
      <div className="admin-home-container">
        <div className="intro-section">
          <h1>Welcome to the Admin Dashboard</h1>
          <p>Manage your menu items from here.</p>
          <img src={assets.adminhome} alt="Admin Banner" className="admin-banner-image" />
        </div>

        <section className="add-product-section">
          <h2>Add a New Product</h2>
          {/* 4 */}
          <form className="product-form" onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }}> 
            <label>
              Product Name:
              <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
            </label>
            <label>
              Category:
              <input type="text" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} required />
            </label>
            <label>
              Price:
              <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} required />
            </label>
            <label>
              Image URL:
              <input type="text" value={productImage} onChange={(e) => setProductImage(e.target.value)} required />
            </label>
            <button type="submit" onClick={handleAddProduct}>Add Product</button>
          </form>
        </section>

        <section className="product-list-section">
          <h2>Current Menu Items</h2>
          <div className="product-list">
            {products.map((product) => (
              <div className="product-item" key={product.id}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>Category: {product.category}</p>
                <p>Price: ${product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AdminHome;
