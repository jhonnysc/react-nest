const APPLICATION_ERRORS = {
  FORBIDDEN: {
    message: "FORBIDDEN",
    code: 1000,
  },
  XSS_THREAT: {
    code: 1001,
    message: "XSS_THREAT",
  },
  INJECTION_THREAT: {
    code: 1002,
    message: "INJECTION_THREAT",
  },
  WEAK_PASSWORD: {
    code: 1003,
    message: "PASSWORD_IS_TOO_WEAK",
  },
  FORBBIDEN_EMAIL: {
    code: 1004,
    message: "FORBIDDEN_EMAIL",
  },
  UNAUTHORIZED: {
    code: 1005,
    message: "UNAUTHORIZED",
  },
  INTERNAL_SERVER_ERROR: {
    code: 1006,
    message: "INTERNAL_SERVER_ERROR",
  },
  BAD_REQUEST: (message: string | string[]) => {
    return { code: 1008, message };
  },
};

const USER_ERRORS = {
  EMAIL_ALREADY_IN_USE: {
    message: "EMAIL_ALREADY_IN_USE",
    code: 2000,
  },
  FORBIDDEN_EMAIL: {
    message: "FORBIDDEN_EMAIL",
    code: 2001,
  },
  INVALID_DOCUMENT: {
    message: "INVALID_DOCUMENT",
    code: 2003,
  },
  INVALID_PASSWORD: {
    message: "INVALID_PASSWORD",
    code: 2004,
  },
  INVALID_CREDENTIALS: {
    message: "INVALID_CREDENTIALS",
    code: 2005,
  },
  USER_NOT_FOUND: {
    message: "USER_NOT_FOUND",
    code: 2006,
  },
};

const ErrorsMapper = {
  APPLICATION_ERRORS,
  USER_ERRORS,
};

export default ErrorsMapper;
