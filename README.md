# FilmOO

Application d'évalutation de film.

## Description

L'utilisateur peut rechercher des films en fonction : 
    * de leur titre
    * ou de leurs acteurs

Depuis la liste de résultats, il est possible d'évaluer les films. Ces derniers sont automatiquement ajouter dans le profile de l'utilisateur.

## Le profil utilisateur
Il est possible de visionner divers informations.

### Graphique des notes données
Il s'agit d'un graphique en forme de camanbert qui permet de voir la proportion de chaque note données.

### Graphique des acteurs 
Il s'agit d'un graphique qui affiche les acteurs figurant dans le profil utilisateur ayant tourné plus d'un film.

### Liste des filmes
Tous les films qui ont été évalué par l'utilisateur connecté figurent dans cette liste. Pour chaque film on peut voir :
    * Moyenne de la note donnée par tous les utilisateurs
    * Graphique des notes données par les utilisateurs
    * Tableau des notes données par tous les utilisateurs
    * Liste des acteurs du films


## Technologies

L'application est développée en Angular 4, avec un backend en Node.js / Express.js. Les framework Mocha / Chai ont été utilisé pour réalisé les test du backend.

Les données sont stockée sur une base MongoDB.

## Structure de la base

Les données sont stockées en deux collections : 
    * Movie
    * User

### Movie
Contient les informations du film à savoir, le titre et la date de parution, ainsi que la liste des acteurs.

### User 
Contient les informations de l'utilisateur. Nom d'utilisateur, mot de passe, nom et prénom. Il contient également une liste d'ID de film qui point sur la collection movie.





