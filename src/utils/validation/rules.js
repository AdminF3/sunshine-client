export function nonEmpty(v) {
  return Boolean(v);
}

const validDomainRegEx = /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;
export function validDomain(v) {
  return validDomainRegEx.test(v);
}
const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/; // eslint-disable-line max-len
export function validEmail(v) {
  return emailRegEx.test(v);
}
