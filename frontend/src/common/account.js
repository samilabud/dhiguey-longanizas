export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("googleUser");
  return user ? JSON.parse(user) : null;
};
