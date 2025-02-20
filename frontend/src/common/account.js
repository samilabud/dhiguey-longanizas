export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("googleUser");
  return user ? JSON.parse(user) : null;
};

export const saveUserToLocalStorage = (user) => {
  localStorage.setItem("googleUser", JSON.stringify(user));
};
