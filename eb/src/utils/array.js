function indexOf(objArray, predicate) {
  let idx = -1;
  for (let i = 0; i < objArray.length; i++) {
    const obj = objArray[i];
    if (predicate(obj)) {
      idx = i;
      break;
    }
  }

  return idx;
}

export default indexOf;
