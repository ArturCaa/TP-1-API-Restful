# TP-1-API-Restful
TP 1 : Développement d'une API RESTful pour la gestion d'inventaire

## Description du projet
Ce projet consiste à développer une API RESTful qui permet de gérer un inventaire de produits. L'API permet aux utilisateurs de créer, lire, mettre à jour et supprimer des produits, ainsi que de gérer les utilisateurs et les rôles d'accès.

## Configuration
Les configurations sensibles, y compris les clés API, les secrets JWT et le port d'écoute, sont stockées dans le fichier `config.ts`. Il est important de modifier ce fichier pour y entrer toutes les informations sensibles nécessaires au bon fonctionnement de l'application.

### Exemple de configuration dans `config.ts`
```typescript
port: process.env.PORT || 3000,
sessionSecret: process.env.SESSION_SECRET || 'secret_par_defaut_pour_les_sessions',
jwtSecret: process.env.JWT_SECRET || 'secret_par_defaut_pour_le_jwt',
databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/defaultdb',
nodeEnv: process.env.NODE_ENV || 'development',
isProduction: process.env.NODE_ENV === 'production'
```

## Clé secrète JWT
La clé secrète JWT utilisée pour l'authentification se trouve dans le fichier `jwt.util.ts`, situé dans le dossier `utils`, /src/utils/jwt.util.ts.

### Exemple de configuration dans jwt.util.ts
export const JWT_SECRET = 'votre_cle';

## Lancer l'application

Pour lancer l'application, suivez ces étapes :

1. Accédez au dossier du projet.
2. Ouvrez votre terminal.
3. Installer npm_modules avec la commande :
   ```bash
   npm install
   ```
4. Pour lancer exécutez la commande suivante :
   ```bash
   npm start
   ```
## Tests automatisés

Les tests automatisés sont situés dans le dossier tests_collections, contenant les collections Postman.

Étapes pour exécuter les tests :
Démarrer le projet : Assurez-vous que le projet est en cours d'exécution en utilisant la commande :

```bash
npm start
```
### Configurer l'Authorization dans Postman :

Ouvrez la collection dans Postman.
Allez dans l'onglet Authorization de la collection.
Sélectionnez OAuth 2.0 comme type d'autorisation.
Dans le champ Token, insérez le token d'authentification.
Enlever Bearer dans Header Prefix.
Sauvegarder les changements.

### Obtenir le Token :

Pour obtenir un token, exécutez la requête POST Test User Login (manager) ou POST Test User Login (employee) dans Postman.

### Tester chaque requête manuellement :

Pour tester manuellement une requête, allez dans l'onglet Headers.
Ajoutez une clé Authorization et mettez comme value : <votre_token_reçu>

### Exécuter tous les tests :

Cliquez sur les trois points (...) à côté de la collection dans Postman.
Sélectionnez Run Collection.

Cliquez sur Run all requests pour exécuter tous les tests de la collection.
Si tout est correctement configuré, les tests devraient s'exécuter sans problème.


