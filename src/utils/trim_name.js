function trimName(arr, charNum = 20) {
  const newArr = [];
  for (let i = 0; i < arr.length; i += 1) {
    let newName = arr[i].name;
    if (arr[i].name.length > charNum) {
      newName = arr[i].name.slice(0, charNum);
      newName += '..';
    }
    newArr.push({
      ...arr[i],
      name: newName
    });
  }
  return newArr;
}

export default trimName;
