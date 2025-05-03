// PrivateRoute.jsx
import React from 'react'
import { useAuthContext } from './src/context/AuthContext'
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-blue-500">Loading...</div>
      </div>
    );
  }

  return user ? children : <Navigate to="/" />;
}
