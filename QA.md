# QA — Doctor Who, Petites Aventures

## Parcours

`npm test` vérifie les liens, les trois volets de chaque page de décision et les pages de résultat du livre 1.

| Livre | Scènes | Liens absents |
|---|---:|---:|
| Le Docteur a disparu ! | 48 | 0 |
| Les Anges du Musée | 39 | 0 |
| Le Dinosaure de Londres | 48 | 0 |
| Panique dans le TARDIS | 61 | 0 |
| Le Dernier Dalek | 50 | 0 |
| **Total** | **246** | **0** |

Le premier livre a été réécrit pour éviter le retour artificiel au lieu choisi précédemment. À Londres, petite fille, tour et boutique donnent des résultats propres. Les pages de résultat avancent ensuite l'histoire avec un bouton « Tourner la page », sans imposer trois faux choix. Les parcours Rose, Amy et Clara ont des résultats distincts. La vérification parcourt toutes les branches du livre 1 pour chaque héroïne : aucune boucle ni impasse. La roue d'horloge, la carte, la pile et le cristal changent la fin et sont retirés après utilisation.

Dans les livres 2 à 5, les pages qui exigent un objet proposent une issue écrite même sans cet objet. Elles n'ont pas encore reçu la même réécriture éditoriale du cheminement que le premier livre.

## Dessins et présentation

Le livre 1 utilise huit illustrations nouvelles : TARDIS, Londres, boutique, musée, Dalek et portraits de Rose, Amy et Clara. Les autres livres conservent leurs décors SVG. Le livre relié contient quatre roues à ses coins ; sur mobile les deux pages restent dans un même cadre vertical.

La validation par capture d'écran du site local reste à faire : le navigateur de contrôle bloque le serveur local (`ERR_BLOCKED_BY_CLIENT`). Les contrôles ici portent sur la syntaxe, les destinations et la structure des ressources.
