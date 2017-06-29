# FilmOO

Application d'évaluation de films.

## Description et utilisation

### Compte utilisateur
Afin de pouvoir accéder à __FilmOO__, il est nécessaire de créer un compte. L'utilisateur doit fournir les informations suivantes : 
* Nom d'utilisateur
* Mot de passe
* Prénom
* Nom 

### Recherche de films
L'utilisateur peut rechercher des films en fonction : 
* de leur titre
* de leurs acteurs

Depuis la liste de résultats, il est possible d'évaluer les films. Ces derniers sont automatiquement ajoutés dans le profil de l'utilisateur.

### Le profil utilisateur
Il est possible de visionner divers informations.

#### Graphique des notes de l'utilisateur courant
Il s'agit d'un graphique en forme de camembert qui permet de voir la proportion de chaque note que l'utilisateur a donnée.

#### Graphique des acteurs 
Il s'agit d'un graphique qui affiche les acteurs figurant dans plus d'un film parmi ceux de la collection de l'utilisateur.

#### Liste des films
Tous les films qui ont été évalués par l'utilisateur connecté figurent dans cette liste. Pour chaque film on peut voir :
* Moyenne de la note donnée par tous les utilisateurs
* Graphique des notes données par les utilisateurs
* Tableau des notes données par tous les utilisateurs
* Liste des acteurs du film

## Technologies

- [x] __Frontend :__ Angular 4
- [x] __Backend :__  Node.js / Express.js. 
- [x] __Framework de test :__  Mocha / Chai 
- [x] __Base de données :__  MongoDB / Mongoose
- [x] __Divers :__ Gulp.js 


## Structure des données

Les données sont stockées en deux collections : 
* Movie
* User

### Movie
Contient les informations du film à savoir, le titre et la date de parution, ainsi que la liste des acteurs. Chaque film contient la liste des ratings des différents  utilisateurs ainsi que leurs informations personnelles. 

La banque de données des films est issue de l'interface IMDb: http://www.imdb.com/interfaces

### User 
Contient les informations de l'utilisateur. Nom d'utilisateur, mot de passe, nom et prénom. Il contient également une liste d'ID de films qui pointe sur la collection de l'utilisateur.

Un lien a été créé entre l'ID d'un film dans la collection d'utilisateur. De cette manière, lorsque l'on obtient un utilisateur, il est très simple d'aller récupérer les données des films (fait automatiquement par le framework Mongoose).


## Installation et démarrage

Un script d'automatisation de tâche Gulp.js permet d'effectuer divers tâches. Il convient d'effectuer les opérations suivantes pour démarrer le système : 

###Etape préliminaire

1. Installer Node.js et Npm
2. Prendre les sources depuis GitHub
3. Exécuter la commande **npm install** dans les 3 dossiers suivants :   
	|.  
	|--client  
	|--server  


### Production
1. Démarrer un serveur de MongoDB
2. Exécuter la tâche Gulp.js : __Build-Client-PROD__
3. Exécuter la tâche Gulp.js : __Build-Server-PROD__
4. Lancer le système : __Start-Server-PROD__
5. Ouvrir l'URL : http://localhost:3000/

/!\ Le serveur doit s'exécuter sur le __localhost:3000__ /!\

### Dev
1. Démarrer un serveur de MongoDB
2. Exécuter la tâche Gulp.js : __Client-DEBUG__
3. Exécuter la tâche Gulp.js : __Build-and-Start-Server__
4. Ouvrir l'URL : http://localhost:4200/

/!\ Le serveur doit s'exécuter sur le __localhost:3000__ /!\


## Test unitaire

Tout l'API REST a été développé en TDD. Il est donc possible de lancer les tests unitaires depuis un IDE. Il est nécessaire de préciser la variable d'environnement **Test** afin que le système se connecte à la bonne base de données (à savoir FilmOO). Nous recommandons d'utiliser __WebStorm__ pour lancer les tests.






