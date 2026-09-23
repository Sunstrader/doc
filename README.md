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
- lorsqu'un objet manque, le même volet raconte une autre issue et continue l'histoire ; les talents des héros ouvrent des passages différents ;
- les fins utilisent aussi l'état final des roues.

## Collection

1. Le Docteur a disparu !
2. Les Anges du Musée
3. Le Dinosaure de Londres
4. Panique dans le TARDIS
5. Le Dernier Dalek

## Interface

Le premier livre dispose d'illustrations originales du TARDIS, de Londres, du musée, du Dalek et des trois héroïnes. Les autres livres utilisent des décors SVG. Aucun visuel des livres de référence n'est intégré.

Sur ordinateur/tablette : double page ouverte avec reliure centrale et quatre roues aux coins.

Sur mobile : les deux pages restent dans le même livre vertical, avec les roues à ses quatre coins.

Dans le livre 1, un volet ouvre une page de résultat puis avance vers le prochain chapitre : aucun retour artificiel à la petite fille, à la tour ou à la boutique. Les pages de décision ont trois volets ; les pages de résultat proposent simplement de tourner la page.

## Fichiers principaux

- `index.html`
- `app.js` : moteur
- `art.js` : illustrations vectorielles originales
- `styles.css`
- `physical.css` : mise en page livre physique
- `books/book-01.js` à `book-05.js`

Projet fan-made non officiel. Doctor Who et les éléments associés appartiennent à leurs ayants droit.
