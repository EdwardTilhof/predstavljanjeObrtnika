export const ROLES = {
  GUEST: 'GUEST',
  USER: 'USER',
  PAID_USER: 'PAID_USER',
  MODERATOR: 'MODERATOR',
  ADMIN: 'ADMIN'
};

export const ROLE_PERMISSIONS = {
  [ROLES.GUEST]: ['view_landing'],
  [ROLES.USER]: ['view_landing', 'post_comment'],
  [ROLES.PAID_USER]: ['view_landing', 'post_comment', 'access_premium'],
  [ROLES.MODERATOR]: ['view_landing', 'post_comment', 'delete_comment'],
  [ROLES.ADMIN]: ['view_landing', 'post_comment', 'access_premium', 'delete_comment', 'edit_settings']
};

export const ROLE_RANKS = {
  GUEST: 1,
  USER: 2,
  PAID_USER: 3,
  MODERATOR: 4,
  ADMIN: 5
};