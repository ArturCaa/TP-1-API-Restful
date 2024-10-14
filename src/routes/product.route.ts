import { Router, Request, Response } from 'express';
import { ProductController } from '../controllers/product.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/roles.middleware';

const router = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Récupérer la liste des produits
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: minPrice
 *         required: false
 *         schema:
 *           type: number
 *         description: Prix minimum des produits à récupérer.
 *       - in: query
 *         name: maxPrice
 *         required: false
 *         schema:
 *           type: number
 *         description: Prix maximum des produits à récupérer.
 *       - in: query
 *         name: minQuantity
 *         required: false
 *         schema:
 *           type: integer
 *         description: Quantité minimum des produits à récupérer.
 *       - in: query
 *         name: maxQuantity
 *         required: false
 *         schema:
 *           type: integer
 *         description: Quantité maximum des produits à récupérer.
 *     responses:
 *       200:
 *         description: Liste des produits récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                   quantity:
 *                     type: integer
 *                   category:
 *                     type: string
 *       500:
 *         description: Erreur du serveur.
 */

router.get('/products', verifyToken, async (req: Request, res: Response) => {
    try{
        return ProductController.getProducts(req,res);
    } 
    catch (error){
        console.error("Erreur, les produits ne sont pas trouvés", error)
        res.status(500).json({message: "Erreur du serveur"});
    }
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Ajouter un nouveau produit
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom du produit (3-50 caractères, lettres et espaces uniquement).
 *               description:
 *                 type: string
 *                 description: Description du produit.
 *               price:
 *                 type: number
 *                 description: Prix du produit (doit être un nombre positif).
 *               quantity:
 *                 type: integer
 *                 description: Quantité du produit (doit être un entier positif).
 *               category:
 *                 type: string
 *                 description: Catégorie du produit (optionnelle).
 *             required:
 *               - name
 *               - price
 *               - description
 *               - quantity
 *     responses:
 *       201:
 *         description: Produit ajouté avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 quantity:
 *                   type: integer
 *                 category:
 *                   type: string
 *       400:
 *         description: Erreur de validation (champs manquants ou invalides).
 *       403:
 *         description: Accès refusé (l'utilisateur n'est pas un gestionnaire).
 *       500:
 *         description: Erreur du serveur.
 */

router.post('/products', verifyToken, roleMiddleware(['manager']), ProductController.addProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Modifier un produit existant
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du produit à modifier
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom du produit (3-50 caractères, lettres et espaces uniquement).
 *               description:
 *                 type: string
 *                 description: Description du produit.
 *               price:
 *                 type: number
 *                 description: Prix du produit (doit être un nombre positif).
 *               quantity:
 *                 type: integer
 *                 description: Quantité du produit (doit être un entier positif).
 *               category:
 *                 type: string
 *                 description: Catégorie du produit (optionnelle).
 *             required:
 *               - name
 *               - price
 *               - description
 *               - quantity
 *     responses:
 *       200:
 *         description: Produit mis à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 quantity:
 *                   type: integer
 *                 category:
 *                   type: string
 *       400:
 *         description: Erreur de validation (champs manquants ou invalides).
 *       403:
 *         description: Accès refusé (l'utilisateur n'est pas un gestionnaire).
 *       404:
 *         description: Produit non trouvé (l'ID spécifié n'existe pas).
 *       500:
 *         description: Erreur du serveur.
 */

router.put('/products/:id',verifyToken, roleMiddleware(['manager']), async (req: Request, res: Response) => {
    try{
        return ProductController.modifyProduct(req,res);
    }
    catch(error){
        console.error("Erreur de mise à jour", error);
        res.status(400).json({message : "Erreur lors de la mise à jour du produit"})
    }
})

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Supprimer un produit existant
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du produit à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Produit supprimé avec succès.
 *       403:
 *         description: Accès refusé (l'utilisateur n'est pas un gestionnaire).
 *       404:
 *         description: Produit non trouvé (l'ID spécifié n'existe pas).
 *       500:
 *         description: Erreur du serveur.
 */

router.delete('/products/:id', verifyToken, roleMiddleware(['manager']), ProductController.deleteProduct);


export default router;
