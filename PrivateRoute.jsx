import React from 'react'
import { UseAuthContext } from './src/util/context/AuthContext'
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({children}) {
    const {currentUser} = UseAuthContext();
  return (
    currentUser ? children : <Navigate to="/" />
  );
}


