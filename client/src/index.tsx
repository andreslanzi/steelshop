import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit';
import { GoogleOAuthProvider } from '@react-oauth/google';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <GoogleOAuthProvider clientId="261944577023-rv1k1edq83m31r6kej5ll88mnhumlcm5.apps.googleusercontent.com">
    <AuthProvider
      authType="cookie"
      authName="_auth"
      cookieDomain={window.location.hostname}
      cookieSecure={false}>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </GoogleOAuthProvider>
);
