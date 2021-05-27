export const setGlobalState = (state) => {
  localStorage.setItem('userState', JSON.stringify(state));
};

export const getGlobalState = () => {
  return JSON.parse(localStorage.getItem('userState'));
};

export const isLoggedIn = () => {
  if (getGlobalState() != null) return true;
  return false;
};

export const logout = () => {
  localStorage.removeItem('userState');
};
