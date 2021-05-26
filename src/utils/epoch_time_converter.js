function epochTimeConverter(epoch) {
  let x = epoch *1000;
  let dateObject = new Date(x);
  const readableDate = dateObject.toLocaleString("en-US", {timeZoneName: "short"}) 
  return readableDate;
}

export default epochTimeConverter;
