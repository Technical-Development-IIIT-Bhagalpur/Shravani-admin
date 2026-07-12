// import React, { useState } from 'react';

// const LoginPage = ({ onLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (email && password) {
//       onLogin(); // Simulates standard login validation
//     } else {
//       alert('Please fill out all fields.');
//     }
//   };

//   const containerStyle = {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     minHeight: '100vh',
//     backgroundColor: 'var(--color-background)',
//     padding: '20px',
//   };

//   const cardStyle = {
//     backgroundColor: 'var(--color-surface)',
//     border: '1px solid var(--color-border)',
//     borderRadius: '16px',
//     padding: '40px',
//     width: '100%',
//     maxWidth: '420px',
//     boxShadow: '0 8px 24px rgba(27, 38, 59, 0.05)',
//     textAlign: 'center',
//   };

//   const titleStyle = {
//     fontSize: '24px',
//     fontWeight: 'bold',
//     color: 'var(--color-primary-text)',
//     marginBottom: '8px',
//   };

//   const subtitleStyle = {
//     fontSize: '14px',
//     color: 'var(--color-secondary-text)',
//     marginBottom: '32px',
//   };

//   const inputGroupStyle = {
//     textAlign: 'left',
//     marginBottom: '20px',
//   };

//   const labelStyle = {
//     display: 'block',
//     fontSize: '14px',
//     fontWeight: '600',
//     color: 'var(--color-primary-text)',
//     marginBottom: '8px',
//   };

//   const inputStyle = {
//     width: '100%',
//     padding: '12px 16px',
//     borderRadius: '8px',
//     border: '1px solid var(--color-border)',
//     backgroundColor: 'var(--color-white)',
//     color: 'var(--color-primary-text)',
//     fontSize: '15px',
//     outline: 'none',
//   };

//   const buttonStyle = {
//     width: '100%',
//     padding: '14px',
//     backgroundColor: 'var(--color-primary)',
//     color: 'var(--color-white)',
//     border: 'none',
//     borderRadius: '8px',
//     fontSize: '16px',
//     fontWeight: 'bold',
//     cursor: 'pointer',
//     marginTop: '10px',
//     transition: 'opacity 0.2s',
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={cardStyle}>
//         <div style={{ fontSize: '40px', marginBottom: '12px' }}>📦</div>
//         <h2 style={titleStyle}>Welcome Back</h2>
//         <p style={subtitleStyle}>Sign in to manage your workspace dashboard</p>

//         <form onSubmit={handleSubmit}>
//           <div style={inputGroupStyle}>
//             <label style={labelStyle}>Email Address</label>
//             <input
//               type="email"
//               placeholder="name@example.com"
//               style={inputStyle}
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div style={inputGroupStyle}>
//             <label style={labelStyle}>Password</label>
//             <input
//               type="password"
//               placeholder="••••••••"
//               style={inputStyle}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <button type="submit" style={buttonStyle}>
//             Sign In
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;