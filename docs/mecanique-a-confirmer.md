# Livre physique : faits observés et questions à résoudre

Référence : photos 6254.jpg à 6289.jpg de « La Bibliothèque Infinie », reçues le 25 septembre 2026. Leur ordre de présentation était **bas, milieu, haut** pour expliquer les trois rangées. Ce n'est pas le sens de lecture imposé dans le livre. Le personnage et les objets visibles n'avaient pas été sélectionnés pour cette démonstration.

## Ce que montrent les photos

- Une double page reliée au centre, avec trois feuilles horizontales pouvant former des combinaisons différentes à gauche et à droite.
- Trois choix sur les rangées et quatre roues aux coins : une pour le personnage, trois pour les objets ou les états du parcours.
- Des consignes de tourner une ou deux pages et des choix dont la réponse dépend d'un personnage ou d'un objet.

## Écart du jeu actuel

`app.js` présente une grande illustration unique à gauche et trois bandes de choix à droite. Après un clic, il remplace tout le contenu de la double page ; il ne garde pas les deux autres bandes physiquement en place. Le bouton « Tourner la page » des résultats est une navigation simplifiée. Les roues d'inventaire démarrent vides, et chaque livre propose deux personnages sans objet de départ.

## Photos/règles nécessaires pour l'adaptation fidèle

1. La première double page **après sélection réelle du personnage**, avec les quatre roues visibles.
2. Deux vues avant/après où **un seul volet** est tourné selon sa consigne, les deux autres rangées restant lisibles et dans le même cadre.
3. Un exemple du petit symbole `1` et du symbole `2`, en montrant exactement quelles feuilles sont sautées et ce que deviennent les autres rangées.
4. Un changement de roue (objet trouvé, perdu ou remplacé), puis la page qui utilise cet état.
5. Le moment où l'on change de double page entière, puis une fin ou un retour en arrière si les règles le permettent.

Tant que ces points ne sont pas établis, ne pas inventer un ordre bas → milieu → haut ni publier le moteur comme une reproduction exacte des volets.
