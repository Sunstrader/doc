# Livre physique : règles observées et limites de l'adaptation

Référence : photos 6254.jpg à 6289.jpg de « La Bibliothèque Infinie », reçues le 25 septembre 2026. Leur ordre de présentation était **bas, milieu, haut** pour expliquer les trois rangées. Ce n'est pas le sens de lecture imposé dans le livre. Le personnage et les objets visibles n'avaient pas été sélectionnés pour cette démonstration.

## Ce que montrent les photos

- Une double page reliée au centre, avec trois feuilles horizontales pouvant former des combinaisons différentes à gauche et à droite.
- Trois choix sur les rangées et quatre roues aux coins : une pour le personnage, trois pour les objets ou les états du parcours.
- Les trois choix initiaux (photo 6257) indiquent chacun de tourner **une page** dans la rangée choisie. Après le choix du bas, la photo 6258 montre « Es-tu Lilon l'elfe des airs ? » : **oui → une page ; non → deux pages**. La photo 6285 montre le même mécanisme dans la rangée du haut : « Es-tu Lucien le pyromancien ? » : oui → une page ; non → deux pages. La photo 6264 montre une autre condition, sur le recours à la magie, avec les mêmes renvois 1/2.
- Le chiffre est le nombre de pages à tourner **à l'endroit du renvoi** : la photo 6258 conserve les deux autres rangées en place pendant que la rangée du bas est manipulée (6259–6260). De même, 6262–6264 parcourent la rangée du milieu. Les roues suivent le parcours ; la photo 6259 demande d'ajouter la clé sur la roue verte.
- Les photos 6259–6266 montrent des expériences et récompenses différentes selon la rangée et le personnage ; la photo 6267 montre la nouvelle mission commune et trois nouveaux choix. La jonction conserve les objets et rencontres du chemin choisi : elle ne rouvre pas les autres pistes initiales.

## Adaptation numérique décidée pour Sunstrader/doc

- Au renvoi conditionnel, afficher les deux emplacements « 1 page » et « 2 pages » ; seule la page correspondant au héros sélectionné est active. L'autre est grisée, indique quel héros y aurait accès et ne révèle ni son illustration ni son texte.
- Trois pistes initiales distinctes peuvent rejoindre une même scène commune après leurs conséquences. Ne pas renvoyer le joueur vers le premier carrefour pour essayer une piste écartée ; rejouer depuis le début reste possible.
- Le premier livre applique cette structure à Londres : petite fille, horloge ou boutique ; résultats et objets distincts, puis retour commun dans le TARDIS avant le musée.

## Écart du jeu actuel

`app.js` présente une grande illustration unique à gauche et trois bandes de choix à droite. Les renvois « 1 ou 2 pages » du premier livre masquent maintenant l'autre page et vérifient le héros. Le clic sur un volet remplace encore toute la double page : les deux autres bandes ne restent pas physiquement en place. Le bouton « Tourner la page » des résultats est une navigation simplifiée. Les roues d'inventaire démarrent vides, et chaque livre propose deux personnages sans objet de départ.

## Règles encore à vérifier pour une adaptation entièrement fidèle

1. Le comportement précis des roues lorsqu'un objet est perdu ou remplacé et les éventuelles règles de retour en arrière.
2. La configuration complète du livre après une vraie sélection de personnage et la règle des fins.

Le renvoi conditionnel 1/2, la jonction après trois chemins différents et l'indépendance des rangées sont **établis** ; ne plus demander de photos pour ces points. Il reste à rendre les trois rangées persistantes au retournement dans l'interface. Ne pas inventer un ordre bas → milieu → haut ni publier le moteur actuel comme reproduction fidèle des volets.
