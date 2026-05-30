export const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return false;
};

export const isAdmin = () => {
  const user = isAuthenticated();
  return user && user.role === 'admin';
};

export const isArtisan = () => {
  const user = isAuthenticated();
  return user && user.role === 'artisan';
};
