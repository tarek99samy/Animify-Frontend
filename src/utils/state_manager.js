export const setGlobalState = (state) => {
  localStorage.setItem('userState', JSON.stringify(state));
};

export const getGlobalState = () => {
  return JSON.parse(localStorage.getItem('userState'));
};
