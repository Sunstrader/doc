# Doctor Who — Petites Aventures

Collection fan-made de six livres-jeux interactifs pour enfants de 3 à 4 ans, pensée comme un **album physique transposé au navigateur**.

## Principe

- une **roue rouge** pour choisir le personnage ;
- trois roues **verte, bleue et jaune** qui commencent vides ;
- les objets, indices et certains états remplacent le contenu de ces roues au fil du récit ;
- chaque grande scène est présentée comme un **livre ouvert** ;
- la page gauche contient l'illustration et le texte court ;
- la page droite est découpée en **trois volets** : un seul est choisi et tourné ;
- exactement **deux personnages jouables par histoire** ; le choix d'un personnage n'attribue aucun objet ;
- certains résultats dépendent du personnage, des objets trouvés pendant l'aventure ou des événements précédents ;
- lorsqu'un objet manque, le même volet raconte une autre issue et continue l'histoire ; les talents des héros ouvrent des passages différents ;
- les fins utilisent aussi l'état final des roues.

## Collection

1. **La Nuit de Torchwood** — Rose Tyler / le dixième Docteur ; reine Victoria, Écosse, 1879 ; loup-garou et fondation de Torchwood. Priorité de la collection.
2. Le Docteur a disparu ! — Rose / Clara.
3. Les Anges du Musée — Donna / Clara.
4. Le Dinosaure de Londres — Amy / Bill.
5. Panique dans le TARDIS — Amy / Donna.
6. Le Dernier Dalek — Martha / Yasmin.

## Interface

La Nuit de Torchwood dispose de décors SVG propres à ses lieux (lande, manoir, bibliothèque, chambre de Victoria, observatoire et aube). L'aventure du Docteur disparu dispose d'illustrations originales du TARDIS, de Londres, du musée et du Dalek. Les autres livres utilisent des décors SVG. Aucun visuel du livre de référence n'est intégré.

Sur ordinateur/tablette : double page ouverte avec reliure centrale et quatre roues aux coins.

Sur mobile : les deux pages restent dans le même livre vertical, avec les roues à ses quatre coins.

Dans Le Docteur a disparu !, chacun des trois premiers volets ouvre immédiatement un renvoi « personnage : page 1 ou 2 ». Seule la rangée choisie avance ; les deux autres restent en place. Les chemins rejoignent ensuite une scène commune. Une roue d'horloge obtenue à Londres peut réveiller la carte du musée ; sans elle, la gardienne propose une autre issue. La Nuit de Torchwood conserve son affichage de trois volets, avec une autre conséquence écrite si un objet manque.

L'histoire de Victoria suit les repères de *Tooth and Claw* : le dixième Docteur et Rose, la reine Victoria, un loup-garou, les recherches d'Albert et la création de Torchwood. La menace est racontée avec douceur pour les petits. Les autres compagnons de la série depuis 2005 pourront être répartis dans de futurs livres, toujours deux par histoire.

## Fichiers principaux

- `index.html`
- `app.js` : moteur
- `art.js` : illustrations vectorielles originales
- `styles.css`
- `physical.css` : mise en page livre physique
- `books/book-01.js` à `book-06.js`

Projet fan-made non officiel. Doctor Who et les éléments associés appartiennent à leurs ayants droit.
