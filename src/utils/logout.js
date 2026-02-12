export const handleLogout = () => {
  // Clear auth tokens
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  sessionStorage.removeItem('userRole');
  localStorage.removeItem('userName');
  sessionStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  sessionStorage.removeItem('userEmail');

  localStorage.removeItem('guestWishlist');

  // Reload page to reset all contexts
  window.location.href = '/';
};