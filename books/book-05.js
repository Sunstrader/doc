// Adaptation douce de « Dalek » (2005) pour 3-4 ans.
// Un Dalek seul et fatigué qui a besoin d’amis, pas de guerre.
// Inventaire hybride.
(() => {
  const book = {
    id: "book-05",
    title: "Le Dalek solitaire",
    subtitle: "Dans un musée secret, Rose et le Docteur trouvent un Dalek tout seul. Il n’est plus méchant. Il a juste besoin d’aide.",
    start: "museum_vault",
    heroes: {
      rose: { name: "Rose Tyler", short: "Rose", icon: "🌹", trait: "Elle parle aux êtres seuls et leur donne de la chaleur." },
      doctor: { name: "Le Docteur", short: "Docteur", icon: "✦", trait: "Il se souvient des Daleks et sait quand faire confiance." }
    },
    items: {
      powerCell: { name: "Pile douce", icon: "🔋" },
      photo: { name: "Photo d’amis", icon: "📷" },
      softCloth: { name: "Chiffon doux", icon: "🧼" },
      songNote: { name: "Note de musique", icon: "🎵" },
      friendshipToken: { name: "Jeton d’amitié", icon: "🤝" }
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
  const ending = (title, text, endLabel, art) => ({ chapter: "La fin", title, text, end: true, endLabel, art });

  S.museum_vault = decision("Le musée secret", "La cage de verre",
    s => `${book.heroes[s.hero].short} entre dans une grande salle. Un Dalek est derrière une vitre. Il dit tout bas : « Seul… ». Que fais-tu ?`,
    "museum", [
      choice("🗣️", "Lui parler doucement", "talk_dalek", "Il a l’air triste."),
      choice("🔍", "Regarder les boutons de la cage", "look_buttons", "Peut-être qu’on peut l’ouvrir."),
      choice("📷", "Montrer une photo d’amis", "show_photo", "Pour qu’il se sente moins seul.")
    ]);

  S.talk_dalek = { chapter: "La cage", title: "Le Dalek répond", art: "dalek", text: "Le Dalek dit « Rose… ». Es-tu Rose ?", heroCheck: { hero: "rose", yes: "talk_rose", no: "talk_doctor" } };
  S.talk_rose = page("La cage", "Rose comprend", "Rose parle. Le Dalek se calme. Il lui donne un jeton d’amitié.", "dalek", "common_hall", "friendshipToken", { trust: 1 });
  S.talk_doctor = page("La cage", "Le Docteur se souvient", "Le Docteur parle bas. Le Dalek reconnaît sa voix. Il trouve une pile douce.", "dalek", "common_hall", "powerCell", { clue: 1 });

  S.look_buttons = { chapter: "La cage", title: "Les boutons", art: "museum", text: "Des boutons clignotent. Es-tu le Docteur ?", heroCheck: { hero: "doctor", yes: "buttons_doctor", no: "buttons_rose" } };
  S.buttons_doctor = page("La cage", "Le Docteur ouvre", "Le Docteur trouve le bon bouton. Une note de musique sort.", "museum", "common_hall", "songNote", { clue: 1 });
  S.buttons_rose = page("La cage", "Rose essaie", "Rose appuie doucement. Un chiffon doux tombe.", "museum", "common_hall", "softCloth", { trust: 1 });

  S.show_photo = { chapter: "La cage", title: "La photo", art: "museum", text: "Tu montres une photo. Es-tu Rose ?", heroCheck: { hero: "rose", yes: "photo_rose", no: "photo_doctor" } };
  S.photo_rose = page("La cage", "Rose partage", "Rose montre des amis. Le Dalek regarde longtemps. Il te donne une photo en retour.", "museum", "common_hall", "photo", { trust: 1 });
  S.photo_doctor = page("La cage", "Le Docteur explique", "Le Docteur montre. Le Dalek comprend. Une pile douce apparaît.", "museum", "common_hall", "powerCell", { clue: 1 });

  S.common_hall = decision("La salle", "Le Dalek a besoin d’aide",
    "Le Dalek dit : « Ma lumière est faible. J’ai froid. J’ai peur. » Il faut l’aider.",
    "museum", [
      choice("🔋", "Lui donner une pile douce", "give_cell", "Pour rallumer sa lumière."),
      choice("🧼", "Le nettoyer avec le chiffon", "use_cloth", "Pour qu’il se sente mieux."),
      choice("🎵", "Chanter une note", "use_song", "Pour le calmer.")
    ]);
  S.common_hall.common = true;

  S.give_cell = { chapter: "La salle", title: "La pile", art: "dalek", text: "Tu cherches la pile. L’as-tu ?", itemCheck: { item: "powerCell", yes: "cell_yes", no: "cell_no" } };
  S.cell_yes = page("La salle", "La lumière revient", "Tu places la pile. Le Dalek s’allume doucement. Il te donne un jeton d’amitié.", "dalek", "open_cage", "friendshipToken", { trust: 1 }, "powerCell");
  S.cell_no = page("La salle", "Un peu d’énergie", "Tu n’as pas la pile. Le Docteur partage un peu de son énergie. Le Dalek clignote.", "dalek", "open_cage", null, { trust: 1 });

  S.use_cloth = { chapter: "La salle", title: "Le chiffon", art: "dalek", text: "Tu cherches le chiffon. L’as-tu ?", itemCheck: { item: "softCloth", yes: "cloth_yes", no: "cloth_no" } };
  S.cloth_yes = page("La salle", "Tout propre", "Tu essuies le Dalek. Il brille. Une note de musique apparaît.", "dalek", "open_cage", "songNote", { trust: 1 }, "softCloth");
  S.cloth_no = page("La salle", "Avec la main", "Tu n’as pas le chiffon. Tu poses ta main. Le Dalek est content.", "dalek", "open_cage", null, { trust: 1 });

  S.use_song = { chapter: "La salle", title: "La note", art: "dalek", text: "Tu cherches la note. L’as-tu ?", itemCheck: { item: "songNote", yes: "song_yes", no: "song_no" } };
  S.song_yes = page("La salle", "Une mélodie", "Tu chantes. Le Dalek se balance un peu. Un jeton d’amitié apparaît.", "dalek", "open_cage", "friendshipToken", { trust: 1 }, "songNote");
  S.song_no = page("La salle", "Un air inventé", "Tu inventes un air. Rose chante aussi. Le Dalek aime.", "dalek", "open_cage", null, { trust: 1 });

  S.open_cage = decision("La cage", "Ouvrir ou rester ?",
    "Le Dalek est plus calme. La cage peut s’ouvrir. Que veux-tu faire ?",
    "museum", [
      choice("🤝", "Utiliser le jeton d’amitié", "use_token", "Pour ouvrir en douceur."),
      choice("📷", "Montrer la photo", "use_photo", "Pour qu’il se souvienne des amis."),
      choice("🌹", "Rester près de lui", "stay_close", "Rose sait être présente.")
    ]);
  S.open_cage.common = true;

  S.use_token = { chapter: "La cage", title: "Le jeton", art: "dalek", text: "Tu cherches le jeton. L’as-tu ?", itemCheck: { item: "friendshipToken", yes: "token_yes", no: "token_no" } };
  S.token_yes = page("La cage", "La porte s’ouvre", "Tu poses le jeton. La cage s’ouvre. Le Dalek sort tout doucement.", "dalek", "final_choice", null, { trust: 1 }, "friendshipToken");
  S.token_no = page("La cage", "Ensemble", "Tu n’as pas le jeton. Rose et le Docteur ouvrent ensemble. Le Dalek sort.", "dalek", "final_choice", null, { trust: 1 });

  S.use_photo = { chapter: "La cage", title: "La photo", art: "dalek", text: "Tu cherches la photo. L’as-tu ?", itemCheck: { item: "photo", yes: "photo_yes", no: "photo_no" } };
  S.photo_yes = page("La cage", "Les amis", "Tu montres la photo. Le Dalek se souvient. La cage s’ouvre.", "dalek", "final_choice", null, { trust: 1 }, "photo");
  S.photo_no = page("La cage", "Des mots", "Tu n’as pas la photo. Tu parles d’amis. Le Dalek comprend.", "dalek", "final_choice", null, { trust: 1 });

  S.stay_close = page("La cage", "On reste", "Tu restes près du Dalek. Il n’a plus peur. La cage s’ouvre toute seule.", "dalek", "final_choice", null, { trust: 1 });

  S.final_choice = decision("Dehors", "Le Dalek libre",
    "Le Dalek regarde le ciel pour la première fois. Il n’est plus seul. Comment veux-tu lui dire au revoir ?",
    "heart", [
      choice("🤝", "Un dernier jeton d’amitié", "end_token", "Pour le chemin."),
      choice("🎵", "Une dernière chanson", "end_song", "Pour le voyage."),
      choice("👋", "Un grand au revoir", "end_wave", "Tous ensemble.")
    ]);
  S.final_choice.common = true;

  S.end_token = { chapter: "La fin", title: "Le jeton", art: "heart", text: "Tu cherches le jeton. L’as-tu ?", itemCheck: { item: "friendshipToken", yes: "ending_friend", no: "ending_simple" } };
  S.end_song = { chapter: "La fin", title: "La chanson", art: "heart", text: "Tu cherches la note. L’as-tu ?", itemCheck: { item: "songNote", yes: "ending_music", no: "ending_hum" } };
  S.end_wave = ending("Au revoir mon ami", "Rose et le Docteur font de grands signes. Le Dalek part vers les étoiles en disant « Merci ». Le musée redevient silencieux.", "Un ami libre", "heart");

  S.ending_friend = ending("L’amitié reste", "Tu donnes le jeton. Le Dalek le garde. Il part heureux. Rose a les yeux brillants.", "Plus jamais seul", "heart");
  S.ending_simple = ending("Juste un signe", "Tu n’as plus le jeton. Tu fais un grand signe. Le Dalek comprend. Il part en paix.", "L’essentiel", "heart");
  S.ending_music = ending("La mélodie du départ", "Tu chantes. Le Dalek fredonne. Il part en musique.", "Une chanson pour toujours", "heart");
  S.ending_hum = ending("Un air inventé", "Tu inventes un air. Rose chante. Le Dalek aime. Il part en dansant un peu.", "La musique du cœur", "heart");

  window.BOOK_05 = book;
})();
