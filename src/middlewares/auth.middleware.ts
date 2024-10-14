import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/jwt.util';
import logger from '../utils/logger';


export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    if (!token) {
      logger.warn('Accès refusé. Aucun token fourni.');
      return res.status(403).json({ message: 'Accès refusé. Aucun token fourni.' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err){
        logger.warn('Token invalide');
        res.status(401).json({ message: 'Token invalide.' }); 
        return;
      }

      logger.info(`Token valide`);
      req.body = { ...req.body, user: decoded}
      next();
    });

};



