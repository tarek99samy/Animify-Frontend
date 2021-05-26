function epochTimeConverter(epoch) {
  const x = epoch * 1000;
  const dateObject = new Date(x);
  const readableDate = dateObject.toLocaleString('en-US', { timeZoneName: 'short' });
  return readableDate;
}

export default epochTimeConverter;
