// create a valid ID for usage in the DOM
export function stringToId(string) {
  return string && string.toString().replace(/^[^a-z]+|[^\w:.-]+/gi, '');
}

// Generates a random string (e.g. for generating random password)
export function getRandomString(bytes) {
  const randomValues = new Uint8Array(bytes);
  window.crypto.getRandomValues(randomValues);
  return Array.from(randomValues).map(intToHex).join('');
}

function intToHex(nr) {
  return nr.toString(16).padStart(2, '0');
}
