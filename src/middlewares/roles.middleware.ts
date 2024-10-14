import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export function roleMiddleware(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.body.user?.role;
    if (!roles.includes(userRole)) {
      logger.warn(`Accès interdit pour le rôle : ${userRole}`);
      return res.status(403).json({ message: 'Accès interdit.' });
    }
    logger.info(`Accès autorisé pour le rôle : ${userRole}`);
    next();
  };
}