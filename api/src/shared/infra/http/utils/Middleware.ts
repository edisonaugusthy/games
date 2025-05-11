import rateLimit from 'express-rate-limit';
import { isProduction } from '../../../../config';
import { Request, Response, NextFunction } from 'express';

export class Middleware {
  public static createRateLimit(mins: number, maxRequests: number) {
    return rateLimit({
      windowMs: mins * 60 * 1000,
      max: maxRequests,
    });
  }
  public static restrictedUrl(req: Request, res: Response, next: NextFunction) {
    if (!isProduction) {
      return next();
    }
    const approvedDomainList = ['*'];
    const domain = req.headers.origin;
    const isValidDomain = !!approvedDomainList.find((d) => d === domain);
    console.log(`Domain =${domain}, valid?=${isValidDomain}`);

    if (!isValidDomain) {
      return res.status(403).json({ message: 'Unauthorized' });
    } else {
      return next();
    }
  }
}
