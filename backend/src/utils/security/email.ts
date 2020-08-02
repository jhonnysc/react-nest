/* eslint-disable no-control-regex */
/* eslint-disable no-useless-escape */
import { InvalidEmails } from '@app/common/constants';
import { ForbiddenEmail } from '@app/utils/exceptions';

const validEmailRegex = new RegExp(
  /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm,
);

export function throwIfIsInvalidEmail(email: string) {
  const isTmpMail = InvalidEmails.includes(email.split('@')[1]);
  if (isTmpMail) throw new ForbiddenEmail();

  const isValidEmailSyntax = email.match(validEmailRegex);
  if (!isValidEmailSyntax) throw new ForbiddenEmail();
}
