// Adaptation douce de « Dinosaurs on a Spaceship » (2012) pour 3-4 ans.
// Inventaire hybride : objets consommables disparaissent, souvenirs restent.
(() => {
  const book = {
    id: "book-03",
    title: "Le Dinosaure perdu",
    subtitle: "Sur un grand vaisseau dans l’espace, Amy et le Docteur rencontrent un dinosaure tout doux qui a perdu sa maison.",
    start: "ship_arrival",
    heroes: {
      amy: { name: "Amy Pond", short: "Amy", icon: "❤️", trait: "Elle est courageuse et aime les animaux." },
      doctor: { name: "Le Docteur", short: "Docteur", icon: "✦", trait: "Il comprend les machines et parle aux dinosaures." }
    },
    items: {
      whistle: { name: "Sifflet doux", icon: "🎶" },
      leaf: { name: "Feuille géante", icon: "🍃" },
      eggShell: { name: "Coquille d’œuf", icon: "🥚" },
      tracker: { name: "Traceur d’étoiles", icon: "📡" },
      rope: { name: "Corde douce", icon: "🪢" }
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

  S.ship_arrival = decision("Dans l’espace", "Le grand vaisseau",
    s => `${book.heroes[s.hero].short} sort du TARDIS. Un grand dinosaure vert et doux les regarde avec de grands yeux. Il a l’air perdu. Que fais-tu ?`,
    "station", [
      choice("👋", "Dire bonjour au dinosaure", "dino_hello", "Il a l’air gentil."),
      choice("🔍", "Regarder autour du vaisseau", "look_around", "Des plantes poussent partout."),
      choice("📡", "Chercher d’où vient le vaisseau", "find_origin", "Le Docteur aime les mystères.")
    ]);

  S.dino_hello = { chapter: "Le vaisseau", title: "Le dinosaure répond", art: "station", text: "Le dinosaure fait un petit bruit doux. Es-tu Amy ?", heroCheck: { hero: "amy", yes: "hello_amy", no: "hello_doctor" } };
  S.hello_amy = page("Le vaisseau", "Amy comprend", "Amy sourit. Le dinosaure lui donne une feuille géante pour se cacher. Il aime les câlins.", "station", "common_bridge", "leaf", { trust: 1 });
  S.hello_doctor = page("Le vaisseau", "Le Docteur écoute", "Le Docteur comprend le langage du dinosaure. Il trouve un sifflet doux qui calme les grands animaux.", "station", "common_bridge", "whistle", { clue: 1 });

  S.look_around = { chapter: "Le vaisseau", title: "Des plantes partout", art: "greenhouse", text: "Des arbres poussent dans le vaisseau. Es-tu le Docteur ?", heroCheck: { hero: "doctor", yes: "look_doctor", no: "look_amy" } };
  S.look_doctor = page("Le vaisseau", "Un nidal", "Le Docteur trouve une coquille d’œuf vide. Le dinosaure était un bébé ici.", "greenhouse", "common_bridge", "eggShell", { clue: 1 });
  S.look_amy = page("Le vaisseau", "Amy explore", "Amy suit des traces. Elle trouve une corde douce pour grimper.", "greenhouse", "common_bridge", "rope", { trust: 1 });

  S.find_origin = { chapter: "Le vaisseau", title: "D’où vient-il ?", art: "station", text: "Un écran clignote. Es-tu Amy ?", heroCheck: { hero: "amy", yes: "origin_amy", no: "origin_doctor" } };
  S.origin_amy = page("Le vaisseau", "La planète verte", "Amy voit une planète toute verte. Le dinosaure vient de là. Elle trouve un traceur d’étoiles.", "station", "common_bridge", "tracker", { clue: 1 });
  S.origin_doctor = page("Le vaisseau", "Le Docteur programme", "Le Docteur règle le vaisseau. Il trouve un sifflet pour appeler le dinosaure.", "station", "common_bridge", "whistle", { clue: 1 });

  S.common_bridge = decision("Le pont du vaisseau", "Le dinosaure a faim",
    "Le dinosaure regarde les plantes. Il a l’air d’avoir faim et un peu froid. Il faut l’aider.",
    "greenhouse", [
      choice("🍃", "Lui donner une feuille", "give_leaf", "Pour manger."),
      choice("🎶", "Utiliser le sifflet", "use_whistle", "Pour le calmer."),
      choice("🪢", "Faire un nid doux", "make_nest", "Pour qu’il se repose.")
    ]);
  S.common_bridge.common = true;

  S.give_leaf = { chapter: "Le pont", title: "La feuille géante", art: "greenhouse", text: "Tu cherches une feuille. L’as-tu ?", itemCheck: { item: "leaf", yes: "leaf_yes", no: "leaf_no" } };
  S.leaf_yes = page("Le pont", "Le dinosaure mange", "Le dinosaure croque la feuille avec joie. Il te donne une coquille d’œuf en remerciement.", "greenhouse", "engine_room", "eggShell", { trust: 1 }, "leaf");
  S.leaf_no = page("Le pont", "D’autres plantes", "Tu n’as pas la feuille. Tu en cueilles une nouvelle. Le dinosaure est content quand même.", "greenhouse", "engine_room", null, { trust: 1 });

  S.use_whistle = { chapter: "Le pont", title: "Le sifflet doux", art: "greenhouse", text: "Tu cherches le sifflet. L’as-tu ?", itemCheck: { item: "whistle", yes: "whistle_yes", no: "whistle_no" } };
  S.whistle_yes = page("Le pont", "Une mélodie calme", "Tu souffles doucement. Le dinosaure se couche et ferme les yeux. Un traceur apparaît.", "greenhouse", "engine_room", "tracker", { clue: 1 }, "whistle");
  S.whistle_no = page("Le pont", "Une chanson d’Amy", "Tu n’as pas le sifflet. Amy chante. Le dinosaure aime.", "greenhouse", "engine_room", null, { trust: 1 });

  S.make_nest = { chapter: "Le pont", title: "Un nid confortable", art: "greenhouse", text: "Tu cherches une corde. L’as-tu ?", itemCheck: { item: "rope", yes: "nest_yes", no: "nest_no" } };
  S.nest_yes = page("Le pont", "Le nid est prêt", "Tu tisses un nid. Le dinosaure s’y blottit. Il te fait confiance.", "greenhouse", "engine_room", null, { trust: 1 }, "rope");
  S.nest_no = page("Le pont", "Des feuilles par terre", "Tu n’as pas la corde. Tu fais un tas de feuilles. C’est doux aussi.", "greenhouse", "engine_room", null, { trust: 1 });

  S.engine_room = decision("La salle des machines", "Le chemin du retour",
    "Le vaisseau peut ramener le dinosaure chez lui. Il faut choisir comment le guider.",
    "lab", [
      choice("📡", "Utiliser le traceur d’étoiles", "use_tracker", "Pour trouver la planète."),
      choice("🥚", "Montrer la coquille d’œuf", "show_egg", "Pour se souvenir de chez lui."),
      choice("❤️", "Rester près de lui jusqu’à l’arrivée", "stay_close", "Pour qu’il n’ait pas peur.")
    ]);
  S.engine_room.common = true;

  S.use_tracker = { chapter: "Les machines", title: "Le traceur", art: "lab", text: "Tu cherches le traceur. L’as-tu ?", itemCheck: { item: "tracker", yes: "tracker_yes", no: "tracker_no" } };
  S.tracker_yes = page("Les machines", "La planète apparaît", "Le traceur montre la planète verte. Le vaisseau part tout seul. Le dinosaure est content.", "lab", "final_dino", null, { clue: 1 }, "tracker");
  S.tracker_no = page("Les machines", "Le Docteur se souvient", "Tu n’as pas le traceur. Le Docteur se souvient des étoiles. Le vaisseau part quand même.", "lab", "final_dino", null, { clue: 1 });

  S.show_egg = { chapter: "Les machines", title: "La coquille", art: "lab", text: "Tu cherches la coquille. L’as-tu ?", itemCheck: { item: "eggShell", yes: "egg_yes", no: "egg_no" } };
  S.egg_yes = page("Les machines", "Le souvenir", "Le dinosaure renifle la coquille. Il se souvient de sa maman. Le vaisseau accélère.", "lab", "final_dino", null, { trust: 1 }, "eggShell");
  S.egg_no = page("Les machines", "Un dessin", "Tu n’as pas la coquille. Amy dessine un œuf. Le dinosaure comprend.", "lab", "final_dino", null, { trust: 1 });

  S.stay_close = page("Les machines", "Ensemble", "Tu restes près du dinosaure. Il pose sa grande tête sur toi. Le voyage sera doux.", "lab", "final_dino", null, { trust: 1 });

  S.final_dino = decision("La planète verte", "Enfin à la maison",
    "Le vaisseau atterrit. Une grande famille de dinosaures attend. Comment veux-tu dire au revoir ?",
    "park", [
      choice("👋", "Faire un grand signe", "end_wave", "Tout le monde ensemble."),
      choice("🎶", "Un dernier sifflet", "end_whistle", "Pour le souvenir."),
      choice("❤️", "Un dernier câlin", "end_hug", "Le plus important.")
    ]);
  S.final_dino.common = true;

  S.end_wave = ending("Au revoir mon ami", "Amy et le Docteur font de grands signes. Le dinosaure agite sa queue. Sa famille l’entoure. Tout le monde est heureux.", "Retour à la maison", "park");
  S.end_whistle = { chapter: "La fin", title: "Le dernier sifflet", art: "park", text: "Tu cherches le sifflet. L’as-tu ?", itemCheck: { item: "whistle", yes: "ending_song", no: "ending_hum" } };
  S.end_hug = ending("Le câlin géant", "Tu serres le dinosaure (aussi fort que tu peux). Il te fait un bisou tout mou. Puis il rejoint sa famille.", "Le plus beau bisou", "park");

  S.ending_song = ending("La mélodie du départ", "Tu souffles dans le sifflet. Le dinosaure répond. C’est leur chanson. Le TARDIS repart en musique.", "Une chanson pour toujours", "park");
  S.ending_hum = ending("Un air inventé", "Tu n’as plus le sifflet. Tu inventes un air. Le dinosaure aime. Il part en dansant un peu.", "La musique du cœur", "park");

  window.BOOK_03 = book;
})();
