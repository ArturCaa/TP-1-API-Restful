import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
import { JWT_SECRET } from '../utils/jwt.util';
import logger  from '../utils/logger';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class UserController {
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try{
      const users = await UserService.getAllUsers();
      logger.info('Récupération de tous les utilisateurs réussie.');
      res.json(users);
    }
    catch (error : any) {
      logger.error(`Erreur lors de la récupération des utilisateurs: ${error.message}`);
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs.' });
    }
  }
  

  public static async login(req: Request, res: Response): Promise<void> {
    const {username, password} = req.body

    if (!emailRegex.test(username)) {
      logger.warn(`Validation échouée: Format d'email invalide pour '${username}'.`);
      res.status(400).json({ message: "Format de email invalide." });
  }

    const user = await UserService.findByUsername(username);
    if(!user){
      logger.warn(`Authentification échouée: email '${username}' non trouvé.`);
      res.status(401).json({ message: 'Authentification échouée, le nom ou le mot de passe est invalide' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      logger.warn(`Authentification échouée: mot de passe invalide pour l'utilisateur '${username}'.`);
      res.status(401).json({ message: 'Authentification échouée, le nom ou le mot de passe est invalide' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET as string, { expiresIn: '1h' });
    logger.info(`Authentification réussie:'${username}'.`);
    res.status(200).json({ token });

  }

}