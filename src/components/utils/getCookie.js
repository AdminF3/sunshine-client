export default function getCookie() {
  const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)_session\s*=\s*([^;]*).*$)|^.*$/, '$1');

  return Boolean(cookieValue);
}
