# OpenClassrooms_Projet_7

Ceci est le front-end et le back-end du projet 7 du parcours Web Développeur

# Groupomania #

Le projet consiste à construire un réseau social interne pour les employés de Groupomania.
Le but de cet outil est de faciliter les interactions entre collègues afin d'améliorer l'ambience et d'augmenter la productivité.

## Back-end ##

Le back-end fonctionne avec le technologies Node.js, Express.js et MongoDB comme base de données.

### Back-end Prérequis ###

Vous aurez besoin d'installer Node et `npm`.

### Back-end Installation ###

-Dans le treminal de votre IDE, cloner ce repo.
-Positionnez vous dans le dossier /backend via le terminal.
-Démarrer `npm install`. 
-Dans le dossier /back-end, créer un fichier .env et enregitrer ces informations :

`
MONGO_DB_URL=mongodb+srv://groupomania:Cw6I2OOrGzUsI2MA@cluster0.bk1mwy1.mongodb.net/groupomania?retryWrites=true&w=majority

JWT_SECRET=RANDOM_TOKEN_SECRET
`

-Vous pouvez démarrer votre server avec la commande `node server` dans votre terminal. 
-Le server trounera par défaut sur `localhost` sur le prot par défaut `3000`. 
-Si le port `3000` est déjà pris pour faire touner une autre application, cela vous sera indiqué dans la console du terminal quand le server demmarera et affichera `Listening on port 3001`.


## Front-end ##

Ce projet a été créé avec [Angular CLI] version 14.1.3.

### Installation ###

-Dans le dossier /frontend démarrez `npm install`

-Démarrez `ng serve` pour avoir accès au serveur de développement. Accedez à `http://localhost:4200/` dans votre navigateur.  L'application va se recharger automatiquement si vous modifiez un fichier.

### Droits Admin ###

Pour acceder au droits administrateur, le responsable devra se connecter avecla compte admin:

email: groupomania@admin.fr
password: adminGroupomania123

### Besoin d'aide ###

Pour plus d'information sur Angular CLI, utilisez `ng help` ou rendez-vous sur la page [Angular CLI Overview and Command Reference](https://angular.io/cli).
