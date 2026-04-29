import React from 'react';
import { ROLE_RANKS } from './PermissonsConst';

const RoleCheck = ({ children, minRole }) => {
  const userRole = localStorage.getItem('user_role') || 'GUEST';
  
  const userRank = ROLE_RANKS[userRole] || 0;
  const requiredRank = ROLE_RANKS[minRole] || 0;

  if (userRank >= requiredRank) {
    return <>{children}</>;
  }

  return <div className="forbidden">Access Denied: Requires {minRole}</div>;
};

export default RoleCheck;