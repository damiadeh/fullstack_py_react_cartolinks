import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalState } from '../context/GlobalContext';
import { useGlobalDispatch } from '../context/GlobalContext';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const {isAuthenticated, isLoading} = useGlobalState();
    const dispatch = useGlobalDispatch();
    const navigate = useNavigate();
  
    const handleLogin = async (e: any) => {
        e.preventDefault();
        console.log(email, password);
        dispatch({ type: 'TOGGLE_ISLOADING' });
        setError(null);
        // should have api or http service that makes all http calls and act as an interceptor and pass callbacks
        try {
            const response = await fetch('//localhost:5000/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({ email, password }),
            });
      
            if (response.ok) {
              // Successful login
              let res = await response.json()
              console.log('Login successful');
              
              dispatch({ type: 'LOGIN' });
            } else {
              // Handle login failure
              dispatch({ type: 'TOGGLE_ISLOADING' });
              console.error('Login failed', response);
            }
          } catch (error) {
            dispatch({ type: 'TOGGLE_ISLOADING' });
            alert("An error occured")
            console.error('Error during login:', error);
          }
    };
  
    return (
        <LoginPageContainer>
        <LoginBox>
          <h2>Login</h2>
          <LoginForm>
            <InputLabel>Email:</InputLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <InputLabel>Password:</InputLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            {error && <LoginError>{error}</LoginError>}
            <LoginButton onClick={handleLogin}>Login</LoginButton>
          </LoginForm>
        </LoginBox>
      </LoginPageContainer>
  
    );
};
const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const LoginBox = styled.div`
  background-color: #ffffff;
  padding: 20px;
  min-width: 400px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const LoginError = styled.p`
  color: red;
  font-size: 14px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  align-self: flex-start;
  color: #495057;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ced4da; 
  border-radius: 5px;
  font-size: 16px;
`;

// We could have a reusable button in our component folder
const LoginButton = styled.button`
  background-color: #007bff; 
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top:20px;

  &:hover {
    background-color: #0056b3; 
  }
`;
export default LoginPage;