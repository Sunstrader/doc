# Livre physique : règles observées et limites de l'adaptation

Référence : photos 6254.jpg à 6289.jpg de « La Bibliothèque Infinie », reçues le 25 septembre 2026. Leur ordre de présentation était **bas, milieu, haut** pour expliquer les trois rangées. Ce n'est pas le sens de lecture imposé dans le livre. Le personnage et les objets visibles n'avaient pas été sélectionnés pour cette démonstration.

## Ce que montrent les photos

- Une double page reliée au centre, avec trois feuilles horizontales pouvant former des combinaisons différentes à gauche et à droite.
- Trois choix sur les rangées et quatre roues aux coins : une pour le personnage, trois pour les objets ou les états du parcours.
- Les trois choix initiaux (photo 6257) indiquent chacun de tourner **une page** dans la rangée choisie. Après le choix du bas, la photo 6258 montre « Es-tu Lilon l'elfe des airs ? » : **oui → une page ; non → deux pages**. La photo 6285 montre le même mécanisme dans la rangée du haut : « Es-tu Lucien le pyromancien ? » : oui → une page ; non → deux pages. La photo 6264 montre une autre condition, sur le recours à la magie, avec les mêmes renvois 1/2.
- Le chiffre est le nombre de pages à tourner **à l'endroit du renvoi** : la photo 6258 conserve les deux autres rangées en place pendant que la rangée du bas est manipulée (6259–6260). La rangée du milieu avance en 6261–6263 ; le test sur la magie en 6264 appartient à la rangée du **haut**. Les roues suivent le parcours ; la photo 6259 demande d'ajouter la clé sur la roue verte.
- Les photos 6259–6266 montrent des expériences et récompenses différentes selon la rangée et le personnage ; la photo 6267 montre la nouvelle mission commune et trois nouveaux choix. La jonction conserve les objets et rencontres du chemin choisi : elle ne rouvre pas les autres pistes initiales.
- Partie test reconstituée : Lilon → gardien → oui, 1 page → clé Tourne-Monde (6257–6259) → maison commune (6267) → grille inondée → non, Camille absente, 2 pages → plastron miroir (6268–6271) → intérieur de la maison (6278). Plus tard, dans la bibliothèque, la clé Tourne-Monde déclenche le retournement du livre pour lire la suite (6288–6289). Les photos ne permettent pas de terminer cette partie. Le parcours démontre qu'un objet acquis sur une rangée initiale peut être utile après plusieurs jonctions.

## Adaptation numérique décidée pour Sunstrader/doc

- Au renvoi conditionnel sur un héros **ou un objet**, afficher les deux emplacements « 1 page » et « 2 pages » ; seule la page correspondant au personnage ou à l'inventaire est active. L'autre est grisée, indique sa condition d'accès et ne révèle ni son illustration ni son texte.
- Trois pistes initiales distinctes peuvent rejoindre une même scène commune après leurs conséquences. Ne pas renvoyer le joueur vers le premier carrefour pour essayer une piste écartée ; rejouer depuis le début reste possible.
- Le premier livre applique cette structure à Londres : petite fille, horloge ou boutique ; immédiatement après chaque volet initial, un renvoi sur le personnage montre la page 1 ou 2. Chacune des deux pages raconte une conséquence différente et mène directement à la scène commune du TARDIS, sans sous-quête supplémentaire dans la piste choisie. La roue d'horloge trouvée sur certaines pistes peut réveiller la carte au musée, avec une autre issue si elle manque.

## Écart du jeu actuel

Dans le premier livre, `app.js` dispose trois paires de bandes à gauche et à droite. Après un choix, seul le contenu de la paire active est remplacé ; les deux autres paires restent dans le DOM et conservent leur position. Les renvois sur héros et objets proposent une page 1 ou 2 ; la page inaccessible est grisée sans contenu révélé. Quand les branches se rejoignent, une nouvelle double page commune réinitialise les trois pistes. Les roues d'inventaire démarrent vides et chaque livre propose deux personnages sans objet de départ. Le premier livre apparaît en tête de bibliothèque. Les autres livres utilisent encore l'ancien affichage des trois volets, mais les choix qui exigent un objet avec issue alternative montrent un renvoi 1/2. Les animations ne simulent pas encore l'épaisseur des feuilles physiques.

## Règles encore à vérifier pour une adaptation entièrement fidèle

1. Le comportement précis des roues lorsqu'un objet est perdu ou remplacé et les éventuelles règles de retour en arrière.
2. La configuration complète du livre après une vraie sélection de personnage et la règle des fins.

Le renvoi conditionnel 1/2, la jonction après trois chemins différents et l'indépendance des rangées sont **établis** ; ne plus demander de photos pour ces points. Dans le premier livre, les deux rangées non choisies restent affichées et inchangées pendant les conséquences du choix. Ne pas inventer un ordre bas → milieu → haut ; ne pas étendre cette mécanique aux autres livres sans adapter et vérifier leurs parcours.
