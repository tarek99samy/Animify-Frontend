function trimName(arr, charNum = 20, isSchedule = false, synopsisNum = 85) {
  const newArr = [];
  for (let i = 0; i < arr.length; i += 1) {
    let newName = arr[i].name;

    if (arr[i].name.length > charNum) {
      newName = arr[i].name.slice(0, charNum);
    }
    if (isSchedule && arr[i].synopsis != null &&arr[i].synopsis.length >synopsisNum) {
      let newSynopsis = arr[i].synopsis.slice(0,synopsisNum);
      newSynopsis +='..';
      newArr.push({
        ...arr[i],
        name: newName,
        synopsis: newSynopsis
      });
    } else {
      newArr.push({
        ...arr[i],
        name: newName
      });
    }
  }
  return newArr;
}

export default trimName;
