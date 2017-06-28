# FilmOO

Application d'évaluation de films.

## Description

## Recherche de films
L'utilisateur peut rechercher des films en fonction : 
    * de leur titre
    * de leurs acteurs

Depuis la liste de résultats, il est possible d'évaluer les films. Ces derniers sont automatiquement ajouter dans le profil de l'utilisateur.

## Le profil utilisateur
Il est possible de visionner divers informations.

### Graphique des notes de l'utilisateur courant
Il s'agit d'un graphique en forme de camembert qui permet de voir la proportion de chaque note que l'utilisateur a données.

### Graphique des acteurs 
Il s'agit d'un graphique qui affiche les acteurs figurant dans + d'un film parmi les films de la collection de l'utilisateur.

### Liste des films
Tous les films qui ont été évalués par l'utilisateur connecté figurent dans cette liste. Pour chaque film on peut voir :
    * Moyenne de la note donnée par tous les utilisateurs
    * Graphique des notes données par les utilisateurs
    * Tableau des notes données par tous les utilisateurs
    * Liste des acteurs du film


## Technologies

Frontend: Angular 4
Backend:  Node.js / Express.js. 
Framework de test: Mocha / Chai 
Base de données: MongoDB


## Structure de la base

Les données sont stockées en deux collections : 
    * Movie
    * User

### Movie
Contient les informations du film à savoir, le titre et la date de parution, ainsi que la liste des acteurs.

La banque de données des films est issue de l'interface IMDb: http://www.imdb.com/interfaces

### User 
Contient les informations de l'utilisateur. Nom d'utilisateur, mot de passe, nom et prénom. Il contient également une liste d'ID de films qui pointe sur la collection de l'utilisateur.







