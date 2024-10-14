import { Request, Response } from 'express';
import { Product } from '../models/product.model';
import fs from 'fs'
import logger from '../utils/logger';


const productNameRegex = /^[A-Za-z\s]{3,50}$/;
const positiveNumberRegex = /^\d+(\.\d+)?$/; 
const positiveIntegerRegex = /^\d+$/; 

export class ProductController {
    static getProducts(req: Request, res: Response) {
        try{
            const {minPrice, maxPrice, minQuantity, maxQuantity} = req.query

            const data = fs.readFileSync('./databases/products.json', 'utf8')
            let products = JSON.parse(data)

            let filteredProducts = products;

            if (minPrice || maxPrice) {
                filteredProducts = filteredProducts.filter((product: { price: any; }) => {
                    const price = product.price;
                    return(!minPrice || price >= Number(minPrice)) && (!maxPrice || price <= Number(maxPrice))
                });

            }

            if (minQuantity || maxQuantity){
                filteredProducts = filteredProducts.filter((product: { quantity: any; }) => {
                    const quantity = product.quantity;
                    return(!minQuantity || quantity >= Number(minQuantity)) && (!maxQuantity || quantity <= Number(maxQuantity))
                })
            }

            logger.info('Liste des produits récupérée avec succès');
            fs.writeFileSync('./databases/products.json', JSON.stringify(products, null, 2));
            res.status(200).json(filteredProducts);

        }
        catch(error : any){
            logger.error(`Erreur dans getProducts: ${error.message}`);
            res.status(400).json({error: "Une erreur est survenue"})
        }    
        
    }

    static addProduct(req: Request, res: Response){
        try{
            const {name, price, description, quantity, category} = req.body

            if (!productNameRegex.test(name)) {
                logger.warn(`Validation échouée: Le nom du produit '${name}' n'est pas valide.`);
                return res.status(400).json({ message: 'Le nom du produit doit contenir entre 3 et 50 caractères.' });
            }

            if (!positiveNumberRegex.test(price)) {
                logger.warn(`Validation échouée: Le prix '${price}' n'est pas valide.`);
                return res.status(400).json({ message: 'Le prix doit être un nombre positif.' });
            }

            if (!positiveIntegerRegex.test(quantity)) {
                logger.warn(`Validation échouée: La quantité '${quantity}' n'est pas valide.`);
                return res.status(400).json({ message: 'La quantité doit être un entier positif.' });
            }

            if(!name || !price || !description || !quantity ){
                logger.warn('Validation échouée: Il manque des champs à remplir.');
                return res.status(400).json({message: "Tout les champs sont requis"})
            }

            const data = fs.readFileSync('./databases/products.json', 'utf8')
            let products = JSON.parse(data)

            const newProduct: Product ={
                id: products.length + 1,
                name,
                description,
                price,
                quantity,
                category: category || "default"
            };

            products.push(newProduct);
            fs.writeFileSync('./databases/products.json', JSON.stringify(products, null, 2));
            logger.info(`Produit ajouté: ${newProduct.name}`);
            res.status(201).json(newProduct)
        }
        catch (error : any){ 
            logger.error(`Erreur dans addProduct: ${error.message}`);
            res.status(500).json({ message: "Une erreur est survenue" });

        }
        
    }

    static modifyProduct(req:Request, res:Response){
        try{
            const {id} = req.params
            const {name, description, price, quantity, category} = req.body

            if (!productNameRegex.test(name)) {
                logger.warn(`Validation échouée: Le nom du produit '${name}' n'est pas valide.`);
                return res.status(400).json({ message: 'Le nom du produit doit contenir entre 3 et 50 caractères.' });
            }

            if (!positiveNumberRegex.test(price)) {
                logger.warn(`Validation échouée: Le prix '${price}' n'est pas valide.`);
                return res.status(400).json({ message: 'Le prix doit être un nombre positif.' });
            }

            if (!positiveIntegerRegex.test(quantity)) {
                logger.warn(`Validation échouée: La quantité '${quantity}' n'est pas valide.`);
                return res.status(400).json({ message: 'La quantité doit être un entier positif.' });
            }

            if (!name || !description || !price || !quantity){
                logger.warn('Validation échouée: Il manque des champs à remplir.');
                res.status(400).json({message : "Il manque des champs à remplir."})
            }
            const data = fs.readFileSync('./databases/products.json', 'utf8')
            let products = JSON.parse(data)

            const productIndex = products.findIndex((product: { id: number; }) => product.id == Number(id))

            if (productIndex == -1) {
                logger.warn(`Produit avec l'ID ${id} non trouvé, lors de limite.`);
                return res.status(400).json({message : "Erreur hors limite"})
            }

            products[productIndex] = {id : Number(id), name, description, price, quantity, category: category || "default"}
            fs.writeFileSync('./databases/products.json', JSON.stringify(products, null, 2));
            logger.info(`Produit avec l'ID ${id} mis à jour avec succès.`);
            res.status(200).json(products[productIndex])

        }
        catch (error : any){
            logger.error(`Erreur lors de la mise a jour du produit avec l'ID ${req.params.id}: ${error.message}`);
            res.status(500).json({ message: "Une erreur est survenue" });
        }
    }

    static deleteProduct (req:Request, res:Response){
        try{
            const {id} = req.params

            const data = fs.readFileSync('./databases/products.json', 'utf8')
            let products = JSON.parse(data)

            const productIndex = products.findIndex((product: { id: number; }) => product.id == Number(id))

            if (productIndex == -1) {
                logger.warn(`Produit avec l'ID ${id} non trouvé pour suppression`);     
                return res.status(404).json({message : "Erreur hors limite"})
            }
            products.splice(productIndex, 1)
            fs.writeFileSync('./databases/products.json', JSON.stringify(products, null, 2));
            logger.info(`Produit avec l'ID ${id} supprimé avec succes.`);
            res.status(204).send();
        }
        catch(error : any){
            logger.error(`Erreur lors de la suppression du produit avec l'ID ${req.params.id}: ${error.message}`);
            res.status(500).json({message: "Une erreur est survenu lors de la supression"})
        }
    }


}
