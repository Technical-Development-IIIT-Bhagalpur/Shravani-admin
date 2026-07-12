import React, { useState } from 'react';
import './styles/colors.css'; 

import { useAuth } from "react-oidc-context";

// import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

function App() {

  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "302su3arakl53nn11io213pmi1";
    const logoutUri = "https://::/";
    const cognitoDomain = "https://::/>";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }
  return (
    <div className="App">
      {auth.isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : 
        // auth.signinRedirect()
        ( <Dashboard/>)
    // <div >
    //   <button onClick={() => auth.signinRedirect()}>Sign in</button>
    //   <button onClick={() => signOutRedirect()}>Sign out</button>
    // </div>
      }
    </div>
  );
}

export default App;