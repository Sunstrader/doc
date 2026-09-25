# QA — Doctor Who, Petites Aventures

## Parcours

`npm test` vérifie les liens, les trois volets, les deux personnages sans objet attribué et les parcours de la première aventure et de celle de Victoria.

| Livre | Scènes | Liens absents |
|---|---:|---:|
| Le Docteur a disparu ! | 58 | 0 |
| Les Anges du Musée | 39 | 0 |
| Le Dinosaure de Londres | 48 | 0 |
| Panique dans le TARDIS | 61 | 0 |
| Le Dernier Dalek | 50 | 0 |
| La Nuit de Torchwood | 38 | 0 |
| **Total** | **294** | **0** |

Le Docteur a disparu ! évite le retour artificiel au lieu choisi précédemment. À Londres, petite fille, tour et boutique commencent chacun par un renvoi personnage 1/2 avec deux pages réellement distinctes. Les pages de résultat avancent ensuite l'histoire sans imposer trois faux choix. La roue d'horloge gagnée sur certaines routes débloque la carte du musée ; son absence mène à une autre page. Les parcours Rose et Clara ont des résultats distincts. La vérification parcourt leurs branches : aucune boucle, impasse ou scène inaccessible. Clara n'emploie plus un tournevis qu'elle n'a pas trouvé ; les anciennes scènes exclusivement liées à Amy ont été retirées.

La Nuit de Torchwood propose deux personnages jouables, Rose et le dixième Docteur. Les routes du manoir, les solutions avec ou sans objet, et les quatre fins où Victoria crée Torchwood sont parcourues pour chacun d'eux : aucune boucle ni impasse. Les roues d'inventaire sont vides au départ.

Dans les livres 2 à 5, les pages qui exigent un objet proposent une issue écrite même sans cet objet. Elles n'ont pas encore reçu la même réécriture éditoriale du cheminement que le premier livre.

## Dessins et présentation

L'aventure de Victoria a ses propres décors SVG ; Le Docteur a disparu ! conserve ses illustrations du TARDIS, de Londres, de la boutique, du musée et du Dalek. Le livre relié contient quatre roues à ses coins ; sur mobile les deux pages restent dans un même cadre vertical.

Une revue éditoriale complète des quatre anciennes histoires 2 à 5 reste à mener : elles disposent d'issues pour objets absents, mais conservent des retours de lieux issus de leur première version.

Le premier livre conserve les deux rangées non choisies pendant qu'une feuille avance ; les autres livres n'ont pas encore ce rendu. Les règles incertaines des roues et du retournement sont précisées dans `docs/mecanique-a-confirmer.md`. Vérification visuelle PC/mobile encore à faire dans un navigateur disponible.
