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

export function validaEmail(value) {
  if (value !== '') {
    const user = value.substring(0, value.indexOf('@'));
    const dominio = value.substring(value.indexOf('@') + 1, value.length);

    if (
      user.length >= 1 &&
      dominio.length >= 3 &&
      user.search('@') === -1 &&
      dominio.search('@') === -1 &&
      user.search(' ') === -1 &&
      dominio.search(' ') === -1 &&
      dominio.search('.') !== -1 &&
      dominio.indexOf('.') >= 1 &&
      dominio.lastIndexOf('.') < dominio.length - 1
    ) {
      return true;
    }

    return false;
  }

  return true;
}
