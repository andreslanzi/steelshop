import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import useSignIn from 'react-auth-kit/dist/hooks/useSignIn';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from '../GoogleLogin';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleLogin = async (e: React.MouseEvent, email: string, password: string) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5005/login', { email, password });
      if (response.status === 200) {
        signIn({
          token: response.data.token,
          expiresIn: 3600,
          tokenType: 'Bearer',
          authState: {
            email,
            role: response.data.role,
            username: response.data.username
          }
        });
        navigate('/');
      }
    } catch (error) {
      if (error && error instanceof AxiosError) {
        setError(error.response?.data.message);
      } else if (error && error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const handleRegister = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/register');
  };

  return (
    <div className="max-w-[50%] fixed top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4">
      <form>
        <div className="flex flex-col h-[auto] justify-center items-center align-center px-8 py-8 rounded">
          <span className="text-center mb-2">EMAIL</span>
          <input
            name="user"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-primary focus:outline-none px-4 py-2 rounded"
          />
          <span className="text-center mt-4 mb-2">PASSWORD</span>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-primary focus:outline-none px-4 py-2 rounded mb-8"
          />
          <div className="flex flex-inline justify-between w-[100%]">
            <button
              type="submit"
              onClick={(e) => handleLogin(e, email, password)}
              className="bg-primary px-4 py-2 rounded mb-4 hover:bg-blue-700">
              Log In
            </button>
            <button
              type="submit"
              onClick={(e) => handleRegister(e)}
              className="bg-primary px-4 py-2 rounded mb-4 hover:bg-blue-700">
              Register
            </button>
          </div>
          <div className="h-[22px]">
            {error && (
              <span className="mt-4 mb-8 text-red-800 font-light text-center">{error}</span>
            )}
          </div>
        </div>
      </form>
      <div className="flex w-[75%] m-auto px-4 justify-center align-center items-center bg-primary hover:bg-blue-800 cursor-pointer py-2 rounded-xl text-center">
        <GoogleLogin />
      </div>
    </div>
  );
};

export default LogIn;
