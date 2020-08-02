/* eslint-disable no-useless-escape */
const NOSQL_PATTERNS = {
  DOLLAR_SIGN_QUOTES_COLON: new RegExp(/(\[\$\w{1,}\])|("\$\w{1,}"\:)/gm),
};
const XSS_PATTERNS = {
  SIMPLE_JAVASCRIPT_HTML: new RegExp(
    /(\b)(on\S+)(\s*)=|javascript|(<\s*)(\/*)script/gi,
  ),
  ENCODED_JAVASCRIPT_HTML: new RegExp(
    /((\\%3C)|<)((\\%69)|i|(\\%49))((\\%6D)|m|(\\%4D))((\\%67)|g|(\\%47))[^\n]+((\\%3E)|>)/gi,
  ),
  ANY_HTML_TAG: new RegExp(/((\%3C)|<)[^\n]+((\%3E)|>)/),
  ANY_STRING_LIKE_TAG: new RegExp(
    /((\%3C)|<)((\%2F)|\/)*[a-z0-9\%]+((\%3E)|>)/,
  ),
};
const SQL_PATTERNS = {
  SIMPLE_INJECTION: new RegExp(
    /\sBENCHMARK\(|BENCHMARK\(|SELECT\s|\sSELECT|\sSLEEP(\d{0,9})|SLEEP(\d{0,9})\s|\sWAITFOR|WAITFOR\s|\sDELAY|DELAY\s|CHR\(([^)]+)\)|\sCOUNT|COUNT\s|\sFROM|FROM\s|\sALTER|ALTER\s|\sCREATE|CREATE\s|\sDELETE|DELETE\s|\sDROP|DROP\s|\sMERGE|MERGE\s|\sUPDATE|UPDATE\s|\sAND|AND\s|\sCASE|CASE\s|EXEC(UTE){0,1}|ORDER( +BY)|UNION( +ALL){0,1}|INSERT( +INTO){0,1}/gm,
  ),
};

const locatePattern = (string, pattern, upper) => {
  if (upper)
    return Object.keys(pattern).some(regex =>
      String(string)
        .toUpperCase()
        .match(pattern[regex]),
    );

  return Object.keys(pattern).some(regex =>
    String(string)
      .toLowerCase()
      .match(pattern[regex]),
  );
};

export function isXSS(string) {
  return locatePattern(string, XSS_PATTERNS, false);
}

export function isNoSQLInjection(string) {
  return locatePattern(string, NOSQL_PATTERNS, false);
}

export function isSQLInjection(string) {
  return locatePattern(string, SQL_PATTERNS, true);
}
