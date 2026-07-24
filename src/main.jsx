import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_4zHg66aMh",
  client_id: "302su3arakl53nn11io213pmi1",
  redirect_uri: "https://shravaniadmin.netlify.app",
  response_type: "code",
  scope: "phone openid email",

  onSigninCallback: () => {
    window.history.replaceState(
      {},
      document.title,
      window.location.pathname
    );
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
)