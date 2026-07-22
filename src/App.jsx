import React, { useEffect } from 'react';
import './styles/colors.css'; 
import { useAuth, hasAuthParams } from "react-oidc-context";
import Dashboard from './pages/Dashboard';

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "302su3arakl53nn11io213pmi1";
    const logoutUri = window.location.origin;
    const cognitoDomain = "https://ap-south-14zhg66amh.auth.ap-south-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  useEffect(() => {
    if (
      !hasAuthParams() &&
      !auth.isAuthenticated &&
      !auth.isLoading &&
      !auth.error
    ) {
      auth.signinRedirect();
    }
  }, [auth]);

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <Dashboard onLogout={signOutRedirect}/>
      </div>
    );
  }

  return <div>Redirecting to sign in...</div>;
}

export default App;