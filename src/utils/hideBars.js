function hideBars(currentPath) {
  const hidePaths = ['/login', '/signup', '/reset-password'];
  for (let i = 0; i < hidePaths.length; i += 1) {
    if (hidePaths[i] === currentPath) {
      return 'hide';
    }
  }
  return '';
}

export default hideBars;
