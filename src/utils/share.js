export function encodeSession(markdown) {
  // btoa requires latin1; encodeURIComponent + escape handles full unicode safely
  return btoa(unescape(encodeURIComponent(markdown)));
}

export function decodeSession(encoded) {
  try {
    return decodeURIComponent(escape(atob(encoded)));
  } catch {
    return '';
  }
}
