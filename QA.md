# QA — Collection Doctor Who

Contrôle effectué sur la collection complète.

## Résultat

| Fichier | Scènes | Syntaxe | Scènes sans 3 choix | Liens manquants |
|---|---:|---|---:|---:|
| Livre 1 — Le Docteur a disparu ! | 61 | OK | 0 | 0 |
| Livre 2 — Les Anges du Musée | 39 | OK | 0 | 0 |
| Livre 3 — Le Dinosaure de Londres | 45 | OK | 0 | 0 |
| Livre 4 — Panique dans le TARDIS | 53 | OK | 0 | 0 |
| Livre 5 — Le Dernier Dalek | 49 | OK | 0 | 0 |
| **Total** | **247** | **OK** | **0** | **0** |

Le moteur `app.js` passe également la vérification de syntaxe.

## Contrôles effectués

- Parse JavaScript de chaque fichier.
- Vérification que chaque scène non finale possède exactement trois choix.
- Vérification de toutes les destinations statiques.
- Test de plusieurs états pour les destinations calculées par fonction.
- Vérification que les destinations obtenues existent dans le livre concerné.

## Version

Première collection complète : 5 aventures jouables, moteur commun, interface responsive, roues personnage et objet.


## Passe interface « livre physique » — 2026-09-23

Éléments récupérés du prototype IA Studio initial, sans reprendre son ancien scénario :
- trois choix transformés en **volets Haut / Milieu / Bas** ;
- roues personnage / objet rendues plus mécaniques avec repère et crans ;
- sons synthétiques locaux via Web Audio (aucun fichier externe) ;
- retour haptique via vibration mobile / AndroidBridge si disponible ;
- bouton son global avec préférence persistante dans localStorage ;
- aucune dépendance Gemini/API nécessaire pour ces fonctions.

Le scénario et les embranchements des cinq livres restent ceux de la collection complète.


## Refonte album physique — 2026-09-23

Référence mécanique vérifiée à partir des exemples fournis et de descriptions publiques de la gamme :
- pleine page de situation ;
- trois résolutions/volets ;
- roue personnage rouge ;
- trois roues verte/bleue/jaune vides au départ ;
- objets/états visibles en permanence sur ces roues ;
- verdict final dépendant des états conservés.

### Changements
- remplacement de l'interface web classique par une double page ;
- trois vrais volets visuels sur la page droite ;
- animation de retournement du volet choisi ;
- roues intégrées aux quatre coins ;
- attribution stable des objets à une couleur de roue par livre ;
- bibliothèque présentée comme une étagère de couvertures ;
- écran d'ouverture du livre ;
- page personnage inspirée d'un album jeunesse mais avec DA originale ;
- illustrations SVG Doctor Who originales dans `art.js` ;
- responsive mobile sans masquer le texte.

Les photos de livres fournies servent uniquement de référence de mécanique et de composition ; aucune image de référence n'est incluse dans le dépôt.

## Reprise des embranchements du livre 1 — 2026-09-23

- Les trois volets de la boutique, de la tour, de la carte et de l'approche du vaisseau ont des issues adaptées à Rose, Amy et Clara. Aucun de ces volets n'exige un héros absent.
- La roue d'horloge ouvre la réparation ; la plume modifie le parcours au musée ; le cristal et la cellule donnent des résolutions différentes à la console.
- Sans roue, la tour propose une réparation provisoire qui avance le récit. Sans cristal ni cellule, la console donne d'autres conclusions : l'absence d'objet modifie l'issue sans bloquer la lecture.
- Les objets utilisés à la console quittent leur roue après le choix.
- Trois illustrations originales de la boutique, de la tour et de la petite fille distinguent ces scènes ; les volets ont des emblèmes propres à leur action.
- `npm test` vérifie les liens des 247 scènes et les embranchements conditionnels essentiels du livre 1.

Le rendu dans un navigateur sur PC et mobile reste à examiner visuellement ; les contrôles ci-dessus portent sur les données, la syntaxe et les dessins SVG valides.
