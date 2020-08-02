/* Creditos Igor de Souza por esse modulo */

import { Request, Response } from "express";

import { XssThreat, SqlThreat } from "@app/utils/exceptions";
import { isXSS, isNoSQLInjection, isSQLInjection } from "@app/utils/security";

import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class Heimdall implements NestMiddleware {
  async use(req: Request, _: Response, next: () => void) {
    this.throwIfHasThreat(req);
    next();
  }

  throwIfHasThreat = (req: Request) => {
    if (this.hasXSS(req)) throw new XssThreat();
    if (this.hasSQLInjection(req)) throw new SqlThreat();
    if (this.hasNoSQLInjection(req)) throw new SqlThreat();
  };

  hasXSS = (req: Request) => {
    const body = isXSS(JSON.stringify(req.body));
    const params = isXSS(JSON.stringify(req.params));
    return body || params || false;
  };

  hasNoSQLInjection = (req: Request) => {
    const body = isNoSQLInjection(JSON.stringify(req.body));
    const params = isNoSQLInjection(JSON.stringify(req.params));
    return body || params || false;
  };

  hasSQLInjection = (req: Request) => {
    const body = isSQLInjection(JSON.stringify(req.body));
    const params = isSQLInjection(JSON.stringify(req.params));
    return body || params || false;
  };
}
