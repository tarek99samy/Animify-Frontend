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

export const getUserToken = () => {
  return isLoggedIn() ? getGlobalState().token : '';
};

export const getUserSource = () => {
  return isLoggedIn() ? getGlobalState().preferred_source : 0;
};

export const getUserList = () => {
  return isLoggedIn() ? getGlobalState().preferred_list : 0;
};

export const logout = () => {
  localStorage.removeItem('userState');
};
