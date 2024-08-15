import React, { useState, useContext } from 'react'; //3
import Navbar from '../../components/Navbar/Navbar';
import './Home.css';
import Header from '../../components/Header/Header';
import { assets } from '../../assets/assets'; 
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; //3
import { useQuery, gql } from '@apollo/client'; //4

// Here I added the query to get the product from the database
const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      category
      image
      price
    }
  }
`;

// Array of sub sandwiches with details like id, name, category, image, and price
const subs = [
  // 1. Classic subs
  {
    id: 1,
    name: 'VEGGIE AND CHEESE',
    category: 'classic',
    image: assets.veggie, // Reference: https://storage.googleapis.com/ueat-assets/d40e1e54-91b5-4b6b-866a-3d27a54246e4.jpg
    price: 5.99,
  },
  {
    id: 2,
    name: 'ASSORTED SUB',
    category: 'classic',
    image: assets.AssortedSub, // Reference: https://storage.googleapis.com/ueat-assets/91c7dc24-5156-4b1b-b330-18f1fd890818.jpg
    price: 7.99,
  },
  {
    id: 3,
    name: 'HAM SUB',
    category: 'classic',
    image: assets.Ham, // Reference: https://storage.googleapis.com/ueat-assets/d40e1e54-91b5-4b6b-866a-3d27a54246e4.jpg
    price: 4.99,
  },
  // 2. Premium subs
  {
    id: 4,
    name: 'LOUISIANA PEPPER CHICKEN*',
    category: 'premium',
    image: assets.lousina, // Reference: https://storage.googleapis.com/ueat-assets/cb39ad7b-dd58-4adc-a6f4-4068ca788668.jpg
    price: 5.45,
  },
  {
    id: 5,
    name: 'STEAK & CHEESE',
    category: 'premium',
    image: assets.steak, // Reference: https://storage.googleapis.com/ueat-assets/52d248d9-e6ab-4d80-b83b-4ce4ce019c69.jpg
    price: 6.99,
  },
  {
    id: 6,
    name: 'ULTIMATE CLUB',
    category: 'premium',
    image: assets.UltimateClub, // Reference: https://www.google.com/imgres?q=ultimate%20clubmr%20sub&imgurl=https%3A%2F%2Fb2038387.smushcdn.com%2F2038387%2Fwp-content%2Fuploads%2F2019%2F01%2FUltimateClub12inchSub-300x200-1.jpg%3Flossy%3D1%26strip%3D1%26webp%3D1&imgrefurl=https%3A%2F%2Fmrsub.ca%2Fsub_categories%2Fultimateclub%2F&docid=KTSCqxBF5Qpf0M&tbnid=5v5e9OkGQ2ATbM&vet=12ahUKEwiup6Kn48WGAxXBHNAFHdmkJV4QM3oECBcQAA..i&w=300&h=200&hcb=2&ved=2ahUKEwiup6Kn48WGAxXBHNAFHdmkJV4QM3oECBcQAA
    price: 6.79,
  },
  // 3. Signature subs
  {
    id: 7,
    name: 'BUFFALO CHICKEN*',
    category: 'signature',
    image: assets.BuffaloChicken, // Reference: https://storage.googleapis.com/ueat-assets/a0152cac-771a-4096-b726-7844117f4a0e.jpg
    price: 7.89,
  },
  {
    id: 8,
    name: 'CHICKEN PARM*',
    category: 'signature',
    image: assets.ChickenParm, // Reference: https://storage.googleapis.com/ueat-assets/ff2aeb4b-58e2-4bff-9e6b-3644217b666f.jpg
    price: 9.99,
  },
  {
    id: 9,
    name: 'CANADIAN CLUB',
    category: 'signature',
    image: assets.CanadianClub, // Reference: https://storage.googleapis.com/ueat-assets/066b6070-b8fb-492e-b000-87f493611237.jpg
    price: 10.99,
  },
  // 4. Mighty meatless subs
  {
    id: 10,
    name: 'TEX-MEX BLACK BEAN',
    category: 'mighty',
    image: assets.texmex, // Reference: https://www.google.com/url?sa=i&url=https%3A%2F%2Fmrsub.ca%2Fsub_categories%2Ftexmexblackbean%2F&psig=AOvVaw0GpzRo7ik8hVXWCzcrK3Ou&ust=1717721952071000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPDttpvjxYYDFQAAAAAdAAAAABAE
    price: 9.99,
  },
  {
    id: 11,
    name: 'gardein™ Meatless Meatballs',
    category: 'mighty',
    image: assets.garden, // Reference: https://www.google.com/imgres?q=gardein%E2%84%A2%20Meatless%20Meatballs%20mr%20sub&imgurl=https%3A%2F%2Fb2038387.smushcdn.com%2F2038387%2Fwp-content%2Fuploads%2F2019%2F09%2Ftexmex.jpg%3Flossy%3D1%26strip%3D1%26webp%3D1&imgrefurl=https%3A%2F%2Fmrsub.ca%2Fmeatless%2F&docid=tsbSiC8Kt3L9NM&tbnid=Gy26Pf2NNxZqiM&vet=12ahUKEwjT-qSH4sWGAxXsv4kEHXO0CBIQM3oECEkQAA..i&w=300&h=200&hcb=2&ved=2ahUKEwjT-qSH4sWGAxXsv4kEHXO0CBIQM3oECEkQAA
    price: 5.99,
  },
  // 5. Sides
  {
    id: 12,
    name: 'Choclate Cookie',
    category: 'sides',
    image: assets.ChoclateCookie, // Reference: https://storage.googleapis.com/ueat-assets/c55051b3-802e-47f2-837a-1d544ba15c0f.jpg
    price: 6.99,
  },
  {
    id: 13,
    name: 'Chips',
    category: 'sides',
    image: assets.Chips, // Reference: https://storage.googleapis.com/ueat-assets/1b388aad-1e1d-40f8-8a2a-8689aad9aec2.jpg
    price: 4.99,
  },
  // 6. Protein packed subs
  {
    id: 14,
    name: 'SEAFOOD SUB*',
    category: 'protein',
    image: assets.Seafood, // Reference: https://storage.googleapis.com/ueat-assets/a44ec591-550a-4b2c-850b-f705ffdae82d.jpg
    price: 8.99,
  },
  {
    id: 15,
    name: 'ROAST BEEF & CHEDDAR SUB',
    category: 'protein',
    image: assets.R, // Reference: https://www.google.com/imgres?q=ROAST%20BEEF%20%26%20CHEDDAR%20SUB%20mr%20sub&imgurl=https%3A%2F%2Fmrsub.ca%2Fwp-content%2Fuploads%2F2019%2F02%2FRoastBeefSub-300x200.jpg&imgrefurl=https%3A%2F%2Fmrsub.ca%2Fsub_categories%2Froast-beef-sub%2F&docid=NLWLfDtxoZ0kJM&tbnid=Z3YBB-smZjXqYM&vet=12ahUKEwio0eLJ4sWGAxW_lIkEHSC9ErAQM3oECBYQAA..i&w=300&h=200&hcb=2&ved=2ahUKEwio0eLJ4sWGAxW_lIkEHSC9ErAQM3oECBYQAA
    price: 7.99,
  },
  {
    id: 16,
    name: 'ALBACORE TUNA',
    category: 'protein',
    image: assets.AlbacoreTuna, // Reference: https://storage.googleapis.com/ueat-assets/279efd79-3bf2-4065-bc2b-7c8bcf91b55e.jpg
    price: 9.99,
  },
];

const Home = () => {
  const [cart, setCart] = useState([]); // State variable to manage the items in the cart
  const [selectedCategory, setSelectedCategory] = useState('all'); // State variable to manage the selected category

  // Here I import the useQuery hook from Apollo Client to fetch data
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  // Function to add an item to the cart
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); //3

  const addToCart = (sub) => {
    setCart([...cart, sub]);
    // Here I pass the date through the state to details page
    navigate('/details', { state: { sub } }); //3
  };

  // Function to handle the category button click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const products = data.products; //4
  
  return (
    <div>
      <Navbar />
      <Header />
    <div className="menu">
    <h2 className="menu-heading">Explore Our Menu</h2>
    {/* 3 */}
    <h3>Welcome, {user?.username}!</h3>
      {/* Category buttons */}
      <div className="categories">
        <button className={selectedCategory === 'all' ? 'active' : ''} onClick={() => handleCategoryClick('all')}>
          All
        </button>
        <button className={selectedCategory === 'classic' ? 'active' : ''} onClick={() => handleCategoryClick('classic')}>
          Classic
        </button>
        <button className={selectedCategory === 'premium' ? 'active' : ''} onClick={() => handleCategoryClick('premium')}>
          Premium
        </button>
        <button className={selectedCategory === 'signature' ? 'active' : ''} onClick={() => handleCategoryClick('signature')}>
          Signature
        </button>
        <button className={selectedCategory === 'mighty' ? 'active' : ''} onClick={() => handleCategoryClick('mighty')}>
          Mighty Meatless
        </button>
        <button className={selectedCategory === 'sides' ? 'active' : ''} onClick={() => handleCategoryClick('sides')}>
          Sides
        </button>
        <button className={selectedCategory === 'protein' ? 'active' : ''} onClick={() => handleCategoryClick('protein')}>
          Protein Packed
        </button>
      </div>

      {/* Display the subs based on the selected category */}
      <div className="subs">
        {subs
          .filter((sub) => selectedCategory === 'all' || sub.category === selectedCategory)
          .map((sub) => (
            <div className="menu-item" key={sub.id}>
              <img src={sub.image} alt={sub.name} />
              <h3>{sub.name}</h3>
              <p>Price: ${sub.price.toFixed(2)}</p>
              <div className="quantity">
                <button
                  onClick={() => {
                    setCart((prevCart) => {
                      const existingItemIndex = prevCart.findIndex((item) => item.id === sub.id);
                      if (existingItemIndex !== -1 && prevCart[existingItemIndex].quantity > 1) {
                        const updatedCart = [...prevCart];
                        updatedCart[existingItemIndex].quantity -= 1;
                        return updatedCart;
                      }
                      return prevCart;
                    });
                  }}
                >
                  -
                </button>
                <span>Quantity: {cart.find((item) => item.id === sub.id)?.quantity || 0}</span>
                <button
                  onClick={() => {
                    setCart((prevCart) => {
                      const existingItemIndex = prevCart.findIndex((item) => item.id === sub.id);
                      if (existingItemIndex !== -1) {
                        const updatedCart = [...prevCart];
                        updatedCart[existingItemIndex].quantity += 1;
                        return updatedCart;
                      }
                      return [...prevCart, { ...sub, quantity: 1 }];
                    });
                  }}
                >
                  +
                </button>
              </div>
              <button className="button" onClick={() => addToCart(sub)}>Add to Cart</button>
            </div>
          ))}
          {products
            .filter((product) => selectedCategory === 'all' || product.category === selectedCategory)
            .map((product) => (
              <div className="menu-item" key={product.id}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>Price: ${product.price.toFixed(2)}</p>
                <div className="quantity">
                  <button
                    onClick={() => {
                      setCart((prevCart) => {
                        const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);
                        if (existingItemIndex !== -1 && prevCart[existingItemIndex].quantity > 1) {
                          const updatedCart = [...prevCart];
                          updatedCart[existingItemIndex].quantity -= 1;
                          return updatedCart;
                        }
                        return prevCart;
                      });
                    }}
                  >
                    -
                  </button>
                  <span>Quantity: {cart.find((item) => item.id === product.id)?.quantity || 0}</span>
                  <button
                    onClick={() => {
                      setCart((prevCart) => {
                        const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);
                        if (existingItemIndex !== -1) {
                          const updatedCart = [...prevCart];
                          updatedCart[existingItemIndex].quantity += 1;
                          return updatedCart;
                        }
                        return [...prevCart, { ...product, quantity: 1 }];
                      });
                    }}
                  >
                    +
                  </button>
                </div>
                <button className="button" onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            ))}
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default Home;
