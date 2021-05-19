const VALIDATION_STATUS = {
  0: 'INVALID',
  1: 'REGISTERED',
  2: 'VALID',
  3: 'DECLINED',
  4: 'PENDING',
};

export function validationStatus(e) {
  const s = e?.valid || 0;
  return VALIDATION_STATUS[parseInt(s, 10) || 0] || VALIDATION_STATUS[0];
}

export function isValid(e) {
  return validationStatus(e) === VALIDATION_STATUS[2];
}
