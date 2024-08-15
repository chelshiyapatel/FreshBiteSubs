import React, { useState, useContext }  from 'react'; //4
import './LoginPage.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { AuthContext } from '../../context/AuthContext'; //4

// Below is the GraphQL mutation to login a user
// Refernce: https://graphql.org/learn/queries/
const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      username
      email
      role
    }
  }
`;

const LoginPage = () => {

  // This is the state hooks for managing email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  // Below finction is to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const role = document.getElementById('role').value; // Get the role value
      const { data } = await loginUser({
        variables: {
          email,
          password,
          role,
        },
      });

      setUser(data.login); //4
  
      // Handle redirection based on role
      if (data.login.role === 'user') {
        navigate('/user-home');
      } else if (data.login.role === 'admin') {
        navigate('/admin-home');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError('Login failed. Please check your credentials.'); //4
    }
  };
  

  return (
    // Here I craeted the login page with simple form 
    // Ref: https://www.google.com/url?sa=i&url=https%3A%2F%2Fin.pinterest.com%2Fpin%2Fhot-dogs--633952085042219368%2F&psig=AOvVaw1fMJfPrN5ggET9LDk2BQUx&ust=1716947443537000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLjqkP6dr4YDFQAAAAAdAAAAABAE
    <div className="login-page" style={{ backgroundImage: `url(${assets.login})` }}>   
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="role">Role</label>
            <select id="role" name="role">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
          {/* 4 */}
          {loginError && <p className="login-error">{loginError}</p>}
        </form>
        <p className="signup-link">Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
