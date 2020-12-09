export function isEmpty(value) {
  if (value === '' || value === undefined || value === null) {
    return true;
  }
  return false;
}

export function isNotEmpty(value) {
  if (value !== '' && value !== undefined && value !== null) {
    return true;
  }
  return false;
}

export function replaceAt(value, index, replacement) {
  return (
    value.substr(0, index) +
    replacement +
    value.substr(index + replacement.length)
  );
}
