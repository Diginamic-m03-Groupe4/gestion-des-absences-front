# Gestion des absences : Front end

Projet de GOERTZ Juliette, WILK Arnold, CICCOLI Abel

Application permettant aux utilisateurs d'une entreprise de gérer leurs absences

Pour cela, il faut lancer l'application back-end en local. Veuillez vérifier le README.md du back pour connaitre la démarche à suivre

## Lancer le serveur

* Lancez npm i pour installer les dépendances sur projet
* Lancez ng build ou ng serve 
* Une fois le build finis, allez dans dist/ et lancez un serveur node

## Naviguer dans le site

Il y a plusieurs utilisateurs différents avec plusieurs status avec lesquels on peut s'authentifier (si l'on utilise les données fournies dans le back)

 * vincent1@vincent.vincent est un administrateur

 * vincent4@vincent.vincent est un manager

 * vincent5@vincent.vincent est un utilisateur normal

Après s'être authentifié, en fonction de son status on peut:

 * consulter ses absences sur cette route: "/absences"

 * consulter le tableau des absences des employés de son département pour les manager sur cette route : "/absences-manager"

 * consulter les rtts employeurs et jours fériés, et les modifier si on est amdin sur cette route : "/rtt-jf"

