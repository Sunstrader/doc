# Doctor Who — Petites Aventures

Collection fan-made de cinq livres-jeux interactifs pour jeunes enfants, pensée comme un **album physique transposé au navigateur**.

## Principe

- une **roue rouge** pour choisir le personnage ;
- trois roues **verte, bleue et jaune** qui commencent vides ;
- les objets, indices et certains états remplacent le contenu de ces roues au fil du récit ;
- chaque grande scène est présentée comme un **livre ouvert** ;
- la page gauche contient l'illustration et le texte court ;
- la page droite est découpée en **trois volets** : un seul est choisi et tourné ;
- certains résultats dépendent du personnage, des objets conservés ou des événements précédents ;
- les fins utilisent aussi l'état final des roues.

## Collection

1. Le Docteur a disparu !
2. Les Anges du Musée
3. Le Dinosaure de Londres
4. Panique dans le TARDIS
5. Le Dernier Dalek

## Interface

Le projet contient maintenant une direction artistique originale Doctor Who : couvertures, personnages simplifiés et décors sont dessinés en SVG directement dans le projet. Aucun visuel des livres de référence n'est intégré.

Sur ordinateur/tablette : double page ouverte avec spirale centrale et quatre roues aux coins.

Sur mobile : lecture verticale et quatre roues compactes persistantes en bas de l'écran.

## Fichiers principaux

- `index.html`
- `app.js` : moteur
- `art.js` : illustrations vectorielles originales
- `styles.css`
- `physical.css` : mise en page livre physique
- `books/book-01.js` à `book-05.js`

Projet fan-made non officiel. Doctor Who et les éléments associés appartiennent à leurs ayants droit.
