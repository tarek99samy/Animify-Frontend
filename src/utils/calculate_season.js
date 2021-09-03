function calculateSeason() {
  const month = new Date().getMonth();
  return Math.floor((month + 3) / 3) - 1;
}

export default calculateSeason;
