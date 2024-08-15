import React, { useState, useContext }  from 'react'; //3
import './SignUp.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { AuthContext } from '../../context/AuthContext'; //3

// Below is the GraphQL mutation to signup a user
// Reference: https://graphql.org/learn/queries/
const SIGNUP_USER = gql` 
  mutation Signup($username: String!, $email: String!, $password: String!, $role: String!) {
    signup(username: $username, email: $email, password: $password, role: $role) {
      id
      username
      email
      role
    }
  }
`;

const SignupPage = () => {

  // This is the state hooks for managing form input fields and mutation status
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [signupUser, { loading, error }] = useMutation(SIGNUP_USER);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext); // 3
  const [signupError, setSignupError] = useState(null); //4

  // Below is the function to handle the form submission
  const handleSignup = async (e) => {
    e.preventDefault(); // This is for preventing the form submission
    try {
      // Below code is to execute the sighup user mutation with from data
      const { data } = await signupUser({
        variables: {
          username, 
          email,
          password,
          role,
        },
      });

      // Below code is for redirecting the page
      if (data.signup.role === 'user' || data.signup.role === 'admin') {
        setUser(data.signup);
        navigate('/');
      }
    } catch (error) {
      setSignupError('An account already exists with this email.'); //4
    }
  };

  return (
    // Here I craeted the signup page with simple form 
    // Ref: https://www.google.com/url?sa=i&url=https%3A%2F%2Fin.pinterest.com%2Fpin%2Fhot-dogs--633952085042219368%2F&psig=AOvVaw1fMJfPrN5ggET9LDk2BQUx&ust=1716947443537000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLjqkP6dr4YDFQAAAAAdAAAAABAE
    <div className="signup-page" style={{ backgroundImage: `url(${assets.login})` }}>   
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required value={username}
              onChange={(e) => setUsername(e.target.value)} />
          </div>
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
            <select id="role" name="role" value={role}
              onChange={(e) => setRole(e.target.value)} >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</button>
          {/* 4 */}
          {signupError && <p className="signup-error">{signupError}</p>}
        </form>
        <p className="login-link">Already have an account? <Link to="/">Login</Link></p>
      </div>
    </div>
  );
};

export default SignupPage;
