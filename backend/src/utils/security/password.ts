import { InvalidPassword } from '@app/utils/exceptions';

// const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

export function throwIfIsInvalidPassword(password: string) {
  if (password.length < 8) throw new InvalidPassword();
  // if (!password.match(passwordRegex)) throw new InvalidPassword();
}
