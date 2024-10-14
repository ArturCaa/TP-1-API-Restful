import express, { Request, Response } from 'express';
import { config } from './config/config';
import productRoutes from './routes/product.route';
import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.route';
import fs from 'fs'
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const app = express();

const port = config.port

app.use(express.json());

app.use('/v1', productRoutes)
app.use('/v1', userRoutes);

app.use('/v1/users', authRoutes);

const swaggerOptions = {
  swaggerDefinition: {
      openapi: '3.0.0',
      info: {
          title: 'API de Gestion de Produits',
          version: '1.0.0',
          description: 'API pour gérer les produits dans le catalogue',
      },
      servers: [
          {
              url: 'http://localhost:3000/v1',
          },
      ],
  },
  apis: ['./src/routes/*.ts'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=> {fs.writeFile ("./databases/products.json", JSON.stringify(json, null,2), function(err) {
              if (err) throw err;
              console.log('complete');
              }
          )})


app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});
