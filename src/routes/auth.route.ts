import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../interfaces/user.interface';
import { UserController } from '../controllers/user.controller';

const router = Router();

const users: User[] = []; 

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authentifier un utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nom d'utilisateur ou email de l'utilisateur
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Connexion réussie, retourne un token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT pour l'authentification.
 *       401:
 *         description: Échec de l'authentification, nom d'utilisateur ou mot de passe incorrect.
 *       500:
 *         description: Erreur du serveur.
 */

router.post('/login', UserController.login);

export default router;