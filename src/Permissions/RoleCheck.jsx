import React from 'react';
import { ROLE_RANKS } from './PermissonsConst';
import { Alert } from 'react-bootstrap';

const RoleCheck = ({ children, minRole }) => {
  const userRole = localStorage.getItem('user_role') || 'GUEST';
  
  const userRank = ROLE_RANKS[userRole] || 0;
  const requiredRank = ROLE_RANKS[minRole] || 0;

  if (userRank >= requiredRank) {
    return <>{children}</>;
  }

  return (
    <Alert 
      variant="warning" 
      className="m-4"
      role="alert"
      aria-live="assertive"
    >
      <Alert.Heading>Access Denied</Alert.Heading>
      <p>
        You do not have permission to access this page. 
        This page requires at least <strong>{minRole}</strong> role.
        {userRole === 'GUEST' && (
          <> Please <a href="/login">log in</a> to continue.</>
        )}
      </p>
    </Alert>
  );
};

export default RoleCheck;