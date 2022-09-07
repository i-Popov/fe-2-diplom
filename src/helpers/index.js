export const ucFL = (value) => {
  let letterUpper = '';
  const findIndexDash = value.indexOf('-');

  if (findIndexDash === -1) {
    letterUpper = value.split('').shift().toUpperCase().concat(value.slice(1, value.length));
  } else {
    const sliceFirstLettersOfDash = value.slice(findIndexDash + 1);
    letterUpper =
      value.split('').shift().toUpperCase().concat(value.slice(1, findIndexDash)) +
      '-' +
      sliceFirstLettersOfDash
        .split('')
        .shift()
        .toUpperCase()
        .concat(sliceFirstLettersOfDash.slice(1, sliceFirstLettersOfDash.length));
  }
  return letterUpper;
};

export const numSpc = (value) => {
  let toSpace;
  const strVal = value.toString();
  if (strVal.length > 3) {
    toSpace =
      strVal
        .split('')
        .slice(0, strVal.length - 3)
        .join('') +
      ' ' +
      strVal.split('').splice(-3, 3).join('');
  } else {
    toSpace = value;
  }
  return toSpace;
};
