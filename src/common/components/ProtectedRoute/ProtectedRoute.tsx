import React from 'react';
import { Navigate } from 'react-router';
import { user } from 'src/common/store';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!user.value) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
