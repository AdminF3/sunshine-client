import * as validationFunctions from './rules';

export function validate(value, validations = []) {
  const errors = [];
  for (const i in validations) {
    const validation = validations[i];
    const rule = typeof validation === 'string' ? validation : validation.rule;
    if (!(rule in validationFunctions)) {
      throw new Error(`unknown rule ${rule}`);
    }
    if (!validationFunctions[rule](value)) {
      errors.push(validation.errorMessage);
    }
  }

  return { valid: errors.length === 0, errors };
}

export function validateFields(fields, validations) {
  const result = { valid: true, errors: [] };

  for (const field in fields) {
    const value = fields[field];
    const rules = validations[field] || [];
    const res = validate(value, rules);
    if (!res.valid) {
      result.valid = false;
      result.errors = [...result.errors, ...res.errors];
    }
  }

  return result;
}
