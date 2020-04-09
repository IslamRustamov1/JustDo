import { FormGroup, ValidationErrors } from "@angular/forms";

export function validatePwds(group: FormGroup): ValidationErrors {
  const password = group.get("password");
  const confPassword = group.get("confPassword");

  if (!/^(.){8,}$/.test(password.value)) {
    return { invalidLength: true };
  }

  if (/(\s)/.test(password.value)) {
    return { spaceOrNewLine: true };
  }

  if (!/.*[A-Z].*[A-Z].*/.test(password.value)) {
    return { fewCapitals: true };
  }

  if (!/[0-9]+/.test(password.value)) {
    return { fewDigits: true };
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password.value)) {
    return { fewSpecialChars: true };
  }

  if (password.value !== confPassword.value) {
    return { invalidPwds: true };
  }

  return null;
}
