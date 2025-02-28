export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("googleUser");
  return user ? JSON.parse(user) : null;
};

export const saveUserToLocalStorage = (user) => {
  localStorage.setItem("googleUser", JSON.stringify(user));
};

// Determine the class for active and pending states
export const getNavLinkClass = ({ isActive: active, isPending: pending }) => {
  if (pending) return `pending-link`;
  if (active) return `primary-link`;
  return `inactive-link`;
};
