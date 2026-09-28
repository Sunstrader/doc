// Adaptation douce de « Partners in Crime » (2008) pour 3-4 ans.
// Les Adipose = petits bébés tout mous qui cherchent une maman douce.
(() => {
  const book = {
    id: "book-02",
    title: "Les Petits Bébé-Nuages",
    subtitle: "À Londres, Donna et le Docteur découvrent de tout petits bébés tout mous qui flottent. Ils ont besoin d’une maman douce.",
    start: "street_adipose",
    heroes: {
      donna: { name: "Donna Noble", short: "Donna", icon: "🧡", trait: "Elle parle fort et protège les petits." },
      doctor: { name: "Le Docteur", short: "Docteur", icon: "✦", trait: "Il comprend les machines et trouve les solutions." }
    },
    items: {
      softBlanket: { name: "Couverture douce", icon: "🛏️" },
      milkBottle: { name: "Biberon magique", icon: "🍼" },
      starLullaby: { name: "Berceuse des étoiles", icon: "🎵" },
      warmHug: { name: "Gros câlin", icon: "🤗" },
      blueRibbon: { name: "Ruban bleu", icon: "🎀" }
    },
    scenes: {}
  };
  const S = book.scenes;
  const choice = (icon, label, next, hint) => ({ icon, label, next, hint });
  const page = (chapter, title, text, art, next, giveItem, flags) => ({
    chapter, title, text, art, next,
    ...(giveItem ? { giveItem } : {}),
    ...(flags ? { flags } : {})
  });
  const decision = (chapter, title, text, art, choices) => ({ chapter, title, text, art, choices });
  const ending = (title, text, endLabel, art) => ({
    chapter: "La fin", title, text, end: true, endLabel, art
  });

  S.street_adipose = decision(
    "Londres · 2008",
    "Les petits nuages qui flottent",
    s => `${book.heroes[s.hero].short} regarde le ciel. De tout petits bébés tout mous flottent doucement. Ils ont l’air un peu perdus. Que fais-tu ?`,
    "london",
    [
      choice("🤗", "Attraper un bébé-nuage tout doucement", "catch_baby", "Il a besoin d’un câlin."),
      choice("🔍", "Regarder d’où ils viennent", "look_source", "Une lumière brille en haut d’un immeuble."),
      choice("🗣️", "Parler aux bébés-nuages", "talk_babies", "Ils font des petits bruits mignons.")
    ]
  );

  S.catch_baby = {
    chapter: "Dans la rue",
    title: "Un bébé tout mou",
    art: "london",
    text: "Le bébé-nuage est tout doux. Es-tu Donna ?",
    heroCheck: { hero: "donna", yes: "catch_donna", no: "catch_doctor" }
  };
  S.catch_donna = page("Dans la rue", "Le câlin de Donna", "Donna serre le bébé-nuage contre elle. Il ronronne. Elle trouve une couverture toute douce pour le garder au chaud.", "london", "common_square", "softBlanket", { trust: 1 });
  S.catch_doctor = page("Dans la rue", "Le Docteur observe", "Le Docteur regarde le bébé-nuage avec curiosité. Il découvre un petit ruban bleu accroché à son dos.", "london", "common_square", "blueRibbon", { clue: 1 });

  S.look_source = {
    chapter: "Dans la rue",
    title: "La lumière en haut",
    art: "london",
    text: "Une fenêtre brille au dernier étage. Es-tu le Docteur ?",
    heroCheck: { hero: "doctor", yes: "source_doctor", no: "source_donna" }
  };
  S.source_doctor = page("Dans la rue", "Le signal du Docteur", "Le Docteur comprend : c’est un appel. Il récupère une berceuse des étoiles qui sort d’une radio.", "london", "common_square", "starLullaby", { clue: 1 });
  S.source_donna = page("Dans la rue", "Donna monte", "Donna décide d’aller voir. Elle trouve un biberon magique posé sur un banc.", "london", "common_square", "milkBottle", { trust: 1 });

  S.talk_babies = {
    chapter: "Dans la rue",
    title: "Les petits bruits",
    art: "london",
    text: "Les bébés-nuages font « glooo ». Es-tu Donna ?",
    heroCheck: { hero: "donna", yes: "talk_donna", no: "talk_doctor" }
  };
  S.talk_donna = page("Dans la rue", "Donna comprend", "Donna parle fort et doucement en même temps. Les bébés-nuages se calment. Un gros câlin apparaît.", "london", "common_square", "warmHug", { trust: 1 });
  S.talk_doctor = page("Dans la rue", "Le Docteur traduit", "Le Docteur écoute. Les bébés cherchent une maman douce. Il trouve un ruban bleu.", "london", "common_square", "blueRibbon", { clue: 1 });

  S.common_square = decision(
    "La place",
    "Tous les bébés-nuages",
    "Des dizaines de petits bébés-nuages flottent maintenant autour de vous. Ils ont l’air d’attendre quelque chose de doux.",
    "park",
    [
      choice("🛏️", "Leur donner une couverture", "give_blanket", "Pour qu’ils aient chaud."),
      choice("🍼", "Leur proposer un biberon", "give_bottle", "Ils ont peut-être faim."),
      choice("🎵", "Chanter une berceuse", "sing_lullaby", "Pour les endormir un peu.")
    ]
  );
  S.common_square.common = true;

  S.give_blanket = {
    chapter: "La place",
    title: "La couverture douce",
    art: "park",
    text: "Tu cherches une couverture. L’as-tu ?",
    itemCheck: { item: "softBlanket", yes: "blanket_yes", no: "blanket_no" }
  };
  S.blanket_yes = page("La place", "Tout le monde au chaud", "Tu poses la couverture. Les bébés-nuages s’y blottissent. Ils te donnent un gros câlin en remerciement.", "park", "roof_garden", "warmHug", { trust: 1 });
  S.blanket_no = page("La place", "Des vestes partagées", "Tu n’as pas la couverture. Donna et le Docteur prêtent leurs vestes. Les bébés sont quand même contents.", "park", "roof_garden", null, { trust: 1 });

  S.give_bottle = {
    chapter: "La place",
    title: "Le biberon magique",
    art: "park",
    text: "Tu cherches un biberon. L’as-tu ?",
    itemCheck: { item: "milkBottle", yes: "bottle_yes", no: "bottle_no" }
  };
  S.bottle_yes = page("La place", "Les petits estomacs rassasiés", "Les bébés-nuages boivent. Ils deviennent un peu plus grands et sourient. Une berceuse apparaît.", "park", "roof_garden", "starLullaby", { trust: 1 });
  S.bottle_no = page("La place", "De l’eau claire", "Tu n’as pas le biberon. Tu leur donnes de l’eau dans des coquilles. Ils sont contents quand même.", "park", "roof_garden", null, { trust: 1 });

  S.sing_lullaby = {
    chapter: "La place",
    title: "La berceuse",
    art: "park",
    text: "Tu veux chanter. As-tu la berceuse des étoiles ?",
    itemCheck: { item: "starLullaby", yes: "lullaby_yes", no: "lullaby_no" }
  };
  S.lullaby_yes = page("La place", "Les yeux se ferment", "Tu chantes. Les bébés-nuages s’endorment presque. Un gros câlin flotte vers toi.", "park", "roof_garden", "warmHug", { trust: 1 });
  S.lullaby_no = page("La place", "Une chanson inventée", "Tu inventes une chanson. Donna chante fort. Les bébés rient (un rire tout mou).", "park", "roof_garden", null, { trust: 1 });

  S.roof_garden = decision(
    "Le toit",
    "Le jardin sur le toit",
    "Sur le toit d’un immeuble, une grande lumière douce attend. Les bébés-nuages flottent vers elle. C’est peut-être leur maman-vaisseau.",
    "station",
    [
      choice("🤗", "Les accompagner avec un câlin", "accompany_hug", "Pour qu’ils ne soient pas seuls."),
      choice("🎀", "Attacher un ruban pour les reconnaître", "tie_ribbon", "Comme ça on les retrouvera."),
      choice("✦", "Demander au Docteur d’ouvrir le chemin", "doctor_path", "Il sait ouvrir les portes.")
    ]
  );
  S.roof_garden.common = true;

  S.accompany_hug = {
    chapter: "Le toit",
    title: "Main dans la main (presque)",
    art: "station",
    text: "Tu cherches un gros câlin. L’as-tu ?",
    itemCheck: { item: "warmHug", yes: "hug_yes", no: "hug_no" }
  };
  S.hug_yes = page("Le toit", "Ensemble jusqu’à la lumière", "Avec le gros câlin, les bébés-nuages se sentent en sécurité. Ils entrent dans la lumière en riant.", "station", "final_choice", null, { trust: 1 });
  S.hug_no = page("Le toit", "Des mains tendues", "Tu n’as pas le câlin spécial. Tu tends quand même les bras. Les bébés viennent.", "station", "final_choice", null, { trust: 1 });

  S.tie_ribbon = {
    chapter: "Le toit",
    title: "Le ruban bleu",
    art: "station",
    text: "Tu cherches un ruban. L’as-tu ?",
    itemCheck: { item: "blueRibbon", yes: "ribbon_yes", no: "ribbon_no" }
  };
  S.ribbon_yes = page("Le toit", "Tout le monde marqué", "Tu attaches le ruban. Les bébés-nuages sont fiers. Ils savent qu’on les aime.", "station", "final_choice", null, { clue: 1 });
  S.ribbon_no = page("Le toit", "Des dessins dans le ciel", "Tu n’as pas le ruban. Tu dessines des cœurs dans l’air. Les bébés adorent.", "station", "final_choice", null, { trust: 1 });

  S.doctor_path = page("Le toit", "Le chemin du Docteur", "Le Docteur tourne un bouton invisible. La lumière s’ouvre comme une porte. Les bébés-nuages peuvent passer.", "station", "final_choice", null, { clue: 1 });

  S.final_choice = decision(
    "La grande lumière",
    "Au revoir les petits",
    "La lumière est prête. Les bébés-nuages vont retrouver leur vraie maman-vaisseau. Comment veux-tu leur dire au revoir ?",
    "heart",
    [
      choice("🤗", "Un dernier gros câlin", "end_hug", "Le plus important."),
      choice("🎵", "Une dernière berceuse", "end_song", "Pour le voyage."),
      choice("👋", "Un grand au revoir tous ensemble", "end_wave", "Donna et le Docteur aussi.")
    ]
  );
  S.final_choice.common = true;

  S.end_hug = {
    chapter: "La fin",
    title: "Le dernier câlin",
    art: "heart",
    text: "Tu cherches le gros câlin. L’as-tu ?",
    itemCheck: { item: "warmHug", yes: "ending_warm", no: "ending_simple" }
  };
  S.end_song = {
    chapter: "La fin",
    title: "La dernière chanson",
    art: "heart",
    text: "Tu cherches la berceuse. L’as-tu ?",
    itemCheck: { item: "starLullaby", yes: "ending_music", no: "ending_hum" }
  };
  S.end_wave = ending("Au revoir les amis", "Donna et le Docteur font de grands signes. Les bébés-nuages flottent dans la lumière en disant « glooo-bye ». Londres redevient calme et douce.", "Tous ensemble", "heart");

  S.ending_warm = ending("Le câlin qui reste", "Tu donnes le gros câlin. Les bébés-nuages le gardent pour toujours. Ils partent heureux. Donna a les yeux un peu brillants.", "Le plus beau cadeau", "heart");
  S.ending_simple = ending("Des bras ouverts", "Tu n’as plus le câlin spécial, mais tu ouvres grand les bras. Les bébés comprennent. Ils partent en souriant.", "L’amour suffit", "heart");
  S.ending_music = ending("La berceuse du voyage", "Tu chantes la berceuse des étoiles. Les bébés-nuages s’endorment un peu en flottant. Le voyage sera doux.", "Bonne nuit les petits", "heart");
  S.ending_hum = ending("Un air inventé", "Tu inventes un air. Donna chante fort. Les bébés-nuages aiment. Ils partent en dansant un peu.", "Une chanson pour la route", "heart");

  window.BOOK_02 = book;
})();
