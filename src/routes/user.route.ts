import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { roleMiddleware } from '../middlewares/roles.middleware';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();
const userController = new UserController();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer la liste de tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de l'utilisateur
 *                   name:
 *                     type: string
 *                     description: Nom de l'utilisateur
 *                   email:
 *                     type: string
 *                     description: Adresse email de l'utilisateur
 *                   username:
 *                     type: string
 *                     description: Nom d'utilisateur
 *                   role:
 *                     type: string
 *                     description: Rôle de l'utilisateur
 *       500:
 *         description: Erreur du serveur.
 */

router.get('/users', userController.getAllUsers);


export default router;