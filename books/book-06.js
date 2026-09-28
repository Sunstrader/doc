// Adaptation douce de « Tooth and Claw » (2006) pour 3-4 ans.
// Style Ma Première Aventure : « tu », actions concrètes, conséquences immédiates.
// Inventaire hybride.
(() => {
  const book = {
    id: "book-06",
    title: "La Nuit de Torchwood",
    subtitle: "Une nuit de lune à Torchwood. Un grand chien doux est perdu dans la maison. Tu peux l’aider.",
    start: "moon_arrival",
    heroes: {
      rose: { name: "Rose Tyler", short: "Rose", icon: "🌹", trait: "Elle parle doucement aux êtres perdus." },
      doctor: { name: "Le Docteur", short: "Docteur", icon: "✦", trait: "Il comprend les secrets de la maison." }
    },
    items: {
      key: { name: "Clé de cuivre", icon: "🔑" },
      ribbon: { name: "Ruban rouge", icon: "🎀" },
      drawing: { name: "Dessin de lune", icon: "🌕" },
      note: { name: "Petit mot", icon: "📝" },
      lantern: { name: "Lanterne douce", icon: "🏮" },
      bone: { name: "Os en bois", icon: "🦴" }
    },
    scenes: {}
  };
  const S = book.scenes;
  const choice = (icon, label, next, hint) => ({ icon, label, next, hint });
  const page = (chapter, title, text, art, next, giveItem, flags, removeItem) => ({
    chapter, title, text, art, next,
    ...(giveItem ? { giveItem } : {}),
    ...(flags ? { flags } : {}),
    ...(removeItem ? { removeItem } : {})
  });
  const decision = (chapter, title, text, art, choices) => ({ chapter, title, text, art, choices });
  const ending = (title, text, endLabel, art) => ({
    chapter: "La fin", title, text, end: true, endLabel, art
  });

  S.moon_arrival = decision(
    "Torchwood · 1879",
    "La grande maison",
    s => `Tu arrives à Torchwood sous la pleine lune. La porte est grande ouverte. À l’intérieur, tu entends un petit bruit. Quelqu’un (ou quelque chose) est perdu. Que veux-tu faire ?`,
    "manor",
    [
      choice("🚪", "Entrer par la grande porte", "enter_hall", "La lumière brille."),
      choice("🪟", "Regarder par la fenêtre", "look_window", "Tu vois une ombre douce."),
      choice("🌳", "Chercher dans le jardin", "garden_path", "Des traces mènent dehors.")
    ]
  );

  S.enter_hall = {
    chapter: "Le hall",
    title: "Des pas dans le noir",
    art: "manor",
    text: "Tu entres. Le sol craque. Une lumière bouge. Es-tu Rose ?",
    heroCheck: { hero: "rose", yes: "hall_rose", no: "hall_doctor" }
  };
  S.hall_rose = page(
    "Le hall",
    "Rose parle doucement",
    "Tu chuchotes : « Qui est là ? ». Une petite lanterne s’allume toute seule. Tu la prends.",
    "manor",
    "common_stairs",
    "lantern",
    { trust: 1 }
  );
  S.hall_doctor = page(
    "Le hall",
    "Le Docteur écoute",
    "Tu poses ta main sur le mur. Tu sens une clé de cuivre cachée. Tu la glisses dans ta poche.",
    "manor",
    "common_stairs",
    "key",
    { clue: 1 }
  );

  S.look_window = {
    chapter: "La fenêtre",
    title: "Une ombre douce",
    art: "moon",
    text: "Tu colles ton nez à la vitre. Une grande ombre se couche. Es-tu le Docteur ?",
    heroCheck: { hero: "doctor", yes: "window_doctor", no: "window_rose" }
  };
  S.window_doctor = page(
    "La fenêtre",
    "Le Docteur comprend",
    "Tu reconnais la forme. C’est un grand chien doux. Tu trouves un ruban rouge accroché au rebord.",
    "moon",
    "common_stairs",
    "ribbon",
    { clue: 1 }
  );
  S.window_rose = page(
    "La fenêtre",
    "Rose fait un signe",
    "Tu fais un grand signe. L’ombre bouge. Un petit mot glisse sous la porte : « Aide-moi ».",
    "moon",
    "common_stairs",
    "note",
    { trust: 1 }
  );

  S.garden_path = {
    chapter: "Le jardin",
    title: "Des traces dans l’herbe",
    art: "park",
    text: "Tu suis des grandes pattes dans l’herbe mouillée. Es-tu Rose ?",
    heroCheck: { hero: "rose", yes: "garden_rose", no: "garden_doctor" }
  };
  S.garden_rose = page(
    "Le jardin",
    "Rose trouve un os",
    "Tu ramasses un os en bois. Il est lisse. Quelqu’un l’a laissé pour jouer.",
    "park",
    "common_stairs",
    "bone",
    { trust: 1 }
  );
  S.garden_doctor = page(
    "Le jardin",
    "Le Docteur regarde la lune",
    "Tu lèves les yeux. La lune est ronde. Tu dessines sa forme sur un papier. Tu le gardes.",
    "park",
    "common_stairs",
    "drawing",
    { clue: 1 }
  );

  S.common_stairs = decision(
    "L’escalier",
    "Le bruit monte",
    "Tu es dans le grand escalier. Le bruit vient d’en haut. Un grand chien doux est perdu. Que veux-tu faire ?",
    "stairs",
    [
      choice("🏮", "Allumer la lanterne", "use_lantern", "Pour voir dans le noir."),
      choice("🔑", "Ouvrir une porte avec la clé", "use_key", "Une porte grince."),
      choice("🦴", "Appeler avec l’os en bois", "use_bone", "Pour le rassurer.")
    ]
  );
  S.common_stairs.common = true;

  S.use_lantern = {
    chapter: "L’escalier",
    title: "La lanterne",
    art: "stairs",
    text: "Tu cherches la lanterne. L’as-tu ?",
    itemCheck: { item: "lantern", yes: "lantern_yes", no: "lantern_no" }
  };
  S.lantern_yes = page(
    "L’escalier",
    "La lumière danse",
    "Tu allumes la lanterne. Le couloir s’éclaire. Tu vois un ruban rouge au sol. Tu le prends.",
    "stairs",
    "common_room",
    "ribbon",
    { clue: 1 },
    "lantern"
  );
  S.lantern_no = page(
    "L’escalier",
    "Dans le noir",
    "Tu n’as pas la lanterne. Tu avances à tâtons. Tu touches un petit mot collé au mur.",
    "stairs",
    "common_room",
    "note",
    { trust: 1 }
  );

  S.use_key = {
    chapter: "L’escalier",
    title: "La clé",
    art: "stairs",
    text: "Tu cherches la clé. L’as-tu ?",
    itemCheck: { item: "key", yes: "key_yes", no: "key_no" }
  };
  S.key_yes = page(
    "L’escalier",
    "La porte s’ouvre",
    "Tu tournes la clé. Une petite porte s’ouvre. Derrière, un dessin de lune est posé. Tu le prends.",
    "stairs",
    "common_room",
    "drawing",
    { clue: 1 },
    "key"
  );
  S.key_no = page(
    "L’escalier",
    "La porte reste fermée",
    "Tu n’as pas la clé. Tu pousses doucement. Elle bouge un peu. Un os en bois roule à tes pieds.",
    "stairs",
    "common_room",
    "bone",
    { trust: 1 }
  );

  S.use_bone = {
    chapter: "L’escalier",
    title: "L’os en bois",
    art: "stairs",
    text: "Tu cherches l’os. L’as-tu ?",
    itemCheck: { item: "bone", yes: "bone_yes", no: "bone_no" }
  };
  S.bone_yes = page(
    "L’escalier",
    "Un petit bruit joyeux",
    "Tu secoues l’os. Un grand chien doux aboie tout bas. Il te fait confiance. Tu trouves un ruban.",
    "stairs",
    "common_room",
    "ribbon",
    { trust: 1 },
    "bone"
  );
  S.bone_no = page(
    "L’escalier",
    "Tu appelles quand même",
    "Tu n’as pas l’os. Tu dis : « Viens, mon ami ». Une lanterne s’allume au bout du couloir.",
    "stairs",
    "common_room",
    "lantern",
    { trust: 1 }
  );

  S.common_room = decision(
    "La grande chambre",
    "Le chien est là",
    "Tu entres dans la grande chambre. Un grand chien aux yeux doux te regarde. Il a un peu peur. Que veux-tu faire ?",
    "bedroom",
    [
      choice("🎀", "Lui donner le ruban rouge", "give_ribbon", "Pour qu’il se sente beau."),
      choice("📝", "Lire le petit mot", "read_note", "Il y a un message."),
      choice("🌕", "Montrer le dessin de lune", "show_drawing", "Pour le calmer.")
    ]
  );
  S.common_room.common = true;

  S.give_ribbon = {
    chapter: "La chambre",
    title: "Le ruban",
    art: "bedroom",
    text: "Tu cherches le ruban. L’as-tu ?",
    itemCheck: { item: "ribbon", yes: "ribbon_yes", no: "ribbon_no" }
  };
  S.ribbon_yes = page(
    "La chambre",
    "Le chien est content",
    "Tu noues le ruban autour de son cou. Il remue la queue. Il te donne un petit mot en remerciement.",
    "bedroom",
    "final_moon",
    "note",
    { trust: 1 },
    "ribbon"
  );
  S.ribbon_no = page(
    "La chambre",
    "Un câlin à la place",
    "Tu n’as pas le ruban. Tu le caressés. Il pose sa grosse tête sur toi. C’est doux.",
    "bedroom",
    "final_moon",
    null,
    { trust: 1 }
  );

  S.read_note = {
    chapter: "La chambre",
    title: "Le petit mot",
    art: "bedroom",
    text: "Tu cherches le petit mot. L’as-tu ?",
    itemCheck: { item: "note", yes: "note_yes", no: "note_no" }
  };
  S.note_yes = page(
    "La chambre",
    "Le message",
    "Tu lis : « Je veux juste rentrer chez moi ». Le chien comprend. Tu trouves une clé de cuivre.",
    "bedroom",
    "final_moon",
    "key",
    { clue: 1 },
    "note"
  );
  S.note_no = page(
    "La chambre",
    "Des mots inventés",
    "Tu n’as pas le mot. Tu inventes une histoire douce. Le chien écoute. Il se calme.",
    "bedroom",
    "final_moon",
    null,
    { trust: 1 }
  );

  S.show_drawing = {
    chapter: "La chambre",
    title: "Le dessin de lune",
    art: "bedroom",
    text: "Tu cherches le dessin. L’as-tu ?",
    itemCheck: { item: "drawing", yes: "drawing_yes", no: "drawing_no" }
  };
  S.drawing_yes = page(
    "La chambre",
    "La lune le guide",
    "Tu montres le dessin. Le chien regarde la vraie lune par la fenêtre. Il sait où aller. Tu gardes le dessin.",
    "bedroom",
    "final_moon",
    null,
    { clue: 1 }
  );
  S.drawing_no = page(
    "La chambre",
    "Tu dessines avec le doigt",
    "Tu n’as pas le dessin. Tu traces une lune dans l’air. Le chien suit ton doigt. Il comprend.",
    "bedroom",
    "final_moon",
    null,
    { trust: 1 }
  );

  S.final_moon = decision(
    "Sous la lune",
    "Le chemin du retour",
    "Le grand chien te regarde. Il est prêt à rentrer chez lui. Comment veux-tu l’aider pour la dernière fois ?",
    "moon",
    [
      choice("🔑", "Ouvrir la porte du jardin avec la clé", "end_key", "Pour qu’il sorte."),
      choice("🏮", "L’accompagner avec la lanterne", "end_lantern", "Jusqu’au bout du chemin."),
      choice("❤️", "Lui faire un grand câlin", "end_hug", "Le plus important.")
    ]
  );
  S.final_moon.common = true;

  S.end_key = {
    chapter: "La fin",
    title: "La clé",
    art: "moon",
    text: "Tu cherches la clé. L’as-tu ?",
    itemCheck: { item: "key", yes: "ending_door", no: "ending_push" }
  };
  S.end_lantern = {
    chapter: "La fin",
    title: "La lanterne",
    art: "moon",
    text: "Tu cherches la lanterne. L’as-tu ?",
    itemCheck: { item: "lantern", yes: "ending_light", no: "ending_dark" }
  };
  S.end_hug = ending(
    "Le grand câlin",
    "Tu serres le grand chien tout fort. Il te lèche le nez. Puis il part en trottinant sous la lune. Tu restes un moment à regarder. Torchwood est calme.",
    "Une nuit douce",
    "moon"
  );

  S.ending_door = ending(
    "La porte s’ouvre",
    "Tu ouvres la porte du jardin. Le grand chien sort. Il se retourne une dernière fois. Puis il disparaît dans l’herbe sous la lune. Tu souris.",
    "Le chemin est libre",
    "moon"
  );
  S.ending_push = ending(
    "Tu pousses ensemble",
    "Tu n’as plus la clé. Toi et le chien poussez la porte ensemble. Elle s’ouvre. Il part libre. Tu restes content.",
    "Ensemble c’est mieux",
    "moon"
  );
  S.ending_light = ending(
    "Le chemin éclairé",
    "Tu marches avec la lanterne. Le grand chien te suit. Au bout du jardin, il te fait un dernier signe de queue. Puis il rentre chez lui.",
    "Jusqu’au bout",
    "moon"
  );
  S.ending_dark = ending(
    "Dans le clair de lune",
    "Tu n’as plus la lanterne. La lune éclaire assez. Le grand chien part. Tu le regardes s’éloigner. Tout va bien.",
    "La lune suffit",
    "moon"
  );

  window.BOOK_06 = book;
})();
