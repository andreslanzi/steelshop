import React, { useState } from 'react';
import { UserToCreate } from '../../types/User';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [error, setError] = useState('');
  const [userToAdd, setuserToAdd] = useState<UserToCreate>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'shopper'
  });
  const navigate = useNavigate();

  const handleAddUser = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5005/api/new_user', userToAdd);
      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      if (error && error instanceof AxiosError) {
        setError(error.response?.data.message);
      } else if (error && error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="max-w-[50%] fixed top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4">
      <div className="flex flex-col ">
        <h1 className="text-center font-bold text-xl mb-4">Register</h1>
        <div className="w-full mb-4 flex flex-inline justify-end align-center items-center">
          <label className="mr-4">Email</label>
          <input
            className="rounded px-2 py-2 bg-gray-800"
            onChange={(e) => setuserToAdd({ ...userToAdd, email: e.target.value })}
            type="text"
          />
        </div>
        <div className="w-full mb-4 flex flex-inline justify-end align-center items-center">
          <label className="mr-4">Password</label>
          <input
            className="rounded px-2 py-2 bg-gray-800"
            onChange={(e) => setuserToAdd({ ...userToAdd, password: e.target.value })}
            type="password"
          />
        </div>
        <div className="w-full mb-4 flex flex-inline justify-end align-center items-center">
          <label className="mr-4">First Name</label>
          <input
            className="rounded px-2 py-2 bg-gray-800"
            onChange={(e) => setuserToAdd({ ...userToAdd, firstName: e.target.value })}
            type="text"
          />
        </div>
        <div className="w-full flex flex-inline justify-end align-center items-center mb-8">
          <label className="mr-4">Last Name</label>
          <input
            className="rounded px-2 py-2 bg-gray-800"
            onChange={(e) => setuserToAdd({ ...userToAdd, lastName: e.target.value })}
            type="text"
          />
        </div>
        <div className="w-full flex flex-inline justify-end align-center items-center mb-8">
          <button
            className="px-2 py-2 bg-blue-900 w-[100%] rounded self-center hover:bg-blue-800"
            type="submit"
            onClick={(e) => handleAddUser(e)}>
            Add user
          </button>
        </div>
        <div className="h-[22px] mb-8 text-center">
          {error && <span className="mt-4 mb-8 text-red-600 font-light text-center">{error}</span>}
        </div>
      </div>
    </div>
  );
};

export default Register;
