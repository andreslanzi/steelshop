import React, { useState, useEffect } from 'react';
import {
  // googleLogout,
  useGoogleLogin
} from '@react-oauth/google';
import axios from 'axios';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

const GoogleLogin = () => {
  const [user, setUser] = useState<any>(undefined);
  const [profile, setProfile] = useState<any>([]);

  const navigate = useNavigate();
  const signIn = useSignIn();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  console.log({ user }, { profile });

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          setProfile(res.data);
          signIn({
            token: user.access_token,
            expiresIn: 3600,
            tokenType: 'Bearer',
            authState: {
              email: res.data.email,
              role: 'shopper',
              username: res.data.name
            }
          });
          console.log('signed in');
          navigate('/');
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div>
      <button onClick={() => login()}>
        Sign in with Google <i className="fab fa-google ml-2" />{' '}
      </button>
    </div>
  );
};
export default GoogleLogin;
