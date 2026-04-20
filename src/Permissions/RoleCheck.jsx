import React from 'react';
import { ROLE_RANKS } from './PermissonsConst';

const RoleCheck = ({ children, minRole }) => {
  const userRole = localStorage.getItem('user_role') || 'GUEST';
  
  if (ROLE_RANKS[userRole] >= ROLE_RANKS[minRole]) {
    return <>{children}</>;
  }

  return <div className="forbidden">Access Denied: Requires {minRole}</div>;
};

export default RoleCheck;