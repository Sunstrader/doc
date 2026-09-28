// Adaptation douce de « The Eleventh Hour » (2010) pour 3-4 ans.
// Une fissure dans le mur, un prisonnier gentil, et Amy qui attend.
// Inventaire hybride.
(() => {
  const book = {
    id: "book-04",
    title: "La Fissure dans le Mur",
    subtitle: "À Leadworth, Amy et le Docteur découvrent une petite fissure qui parle. Quelqu’un est coincé de l’autre côté.",
    start: "garden_crack",
    heroes: {
      amy: { name: "Amy Pond", short: "Amy", icon: "❤️", trait: "Elle attend depuis longtemps et n’a pas peur." },
      doctor: { name: "Le Docteur", short: "Docteur", icon: "✦", trait: "Il répare les choses cassées et pose des questions." }
    },
    items: {
      apple: { name: "Pomme croquante", icon: "🍎" },
      yarn: { name: "Fil de laine", icon: "🧶" },
      keyCard: { name: "Carte bleue", icon: "💳" },
      softVoice: { name: "Voix douce", icon: "🗣️" },
      starDust: { name: "Poussière d’étoile", icon: "✨" }
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

  S.garden_crack = decision("Leadworth · 1996", "Le jardin d’Amy",
    s => `${book.heroes[s.hero].short} regarde le vieux mur. Une petite fissure brille. Une voix très douce sort : « Au secours… ». Que fais-tu ?`,
    "park", [
      choice("🗣️", "Répondre à la voix", "talk_crack", "Elle a l’air gentille."),
      choice("🍎", "Offrir une pomme du jardin", "offer_apple", "Pour montrer qu’on est amis."),
      choice("🔍", "Regarder de plus près la fissure", "look_crack", "Le Docteur aime les mystères.")
    ]);

  S.talk_crack = { chapter: "Le jardin", title: "La voix répond", art: "park", text: "La voix dit merci. Es-tu Amy ?", heroCheck: { hero: "amy", yes: "talk_amy", no: "talk_doctor" } };
  S.talk_amy = page("Le jardin", "Amy comprend", "Amy parle doucement. La voix lui confie une poussière d’étoile. « Pour réparer », murmure-t-elle.", "park", "common_yard", "starDust", { trust: 1 });
  S.talk_doctor = page("Le jardin", "Le Docteur écoute", "Le Docteur pose des questions. Il trouve un fil de laine coincé dans la fissure.", "park", "common_yard", "yarn", { clue: 1 });

  S.offer_apple = { chapter: "Le jardin", title: "Une pomme pour l’ami", art: "park", text: "Tu tendes une pomme. Es-tu le Docteur ?", heroCheck: { hero: "doctor", yes: "apple_doctor", no: "apple_amy" } };
  S.apple_doctor = page("Le jardin", "Le Docteur partage", "Le Docteur donne la pomme. La voix est contente. Une carte bleue apparaît.", "park", "common_yard", "keyCard", { clue: 1 });
  S.apple_amy = page("Le jardin", "Amy partage", "Amy donne la pomme. La voix rit (un petit rire). Amy garde une pomme pour plus tard.", "park", "common_yard", "apple", { trust: 1 });

  S.look_crack = { chapter: "Le jardin", title: "La fissure brille", art: "park", text: "Tu regardes de très près. Es-tu Amy ?", heroCheck: { hero: "amy", yes: "look_amy", no: "look_doctor" } };
  S.look_amy = page("Le jardin", "Amy voit le chemin", "Amy voit un petit chemin de lumière. Elle trouve un fil de laine.", "park", "common_yard", "yarn", { clue: 1 });
  S.look_doctor = page("Le jardin", "Le Docteur mesure", "Le Docteur comprend que la fissure mène ailleurs. Il trouve une poussière d’étoile.", "park", "common_yard", "starDust", { clue: 1 });

  S.common_yard = decision("Le jardin", "Quelqu’un attend",
    "La fissure est un peu plus grande. La voix dit : « J’ai faim et j’ai peur. Aidez-moi à rentrer chez moi. »",
    "park", [
      choice("🍎", "Donner une pomme", "give_apple", "Pour calmer la faim."),
      choice("🧶", "Utiliser le fil de laine", "use_yarn", "Pour mesurer le chemin."),
      choice("✨", "Utiliser la poussière d’étoile", "use_dust", "Pour réparer un peu.")
    ]);
  S.common_yard.common = true;

  S.give_apple = { chapter: "Le jardin", title: "La pomme", art: "park", text: "Tu cherches une pomme. L’as-tu ?", itemCheck: { item: "apple", yes: "apple_yes", no: "apple_no" } };
  S.apple_yes = page("Le jardin", "Merci !", "Tu donnes la pomme. La voix est heureuse. Elle te donne une carte bleue.", "park", "attic_door", "keyCard", { trust: 1 }, "apple");
  S.apple_no = page("Le jardin", "Des miettes", "Tu n’as pas la pomme. Tu donnes des miettes de gâteau. La voix dit merci quand même.", "park", "attic_door", null, { trust: 1 });

  S.use_yarn = { chapter: "Le jardin", title: "Le fil", art: "park", text: "Tu cherches le fil. L’as-tu ?", itemCheck: { item: "yarn", yes: "yarn_yes", no: "yarn_no" } };
  S.yarn_yes = page("Le jardin", "Le chemin se dessine", "Tu tends le fil. La fissure montre un chemin clair. Une voix douce apparaît.", "park", "attic_door", "softVoice", { clue: 1 }, "yarn");
  S.yarn_no = page("Le jardin", "Avec les doigts", "Tu n’as pas le fil. Tu traces le chemin avec ton doigt. Ça marche aussi.", "park", "attic_door", null, { clue: 1 });

  S.use_dust = { chapter: "Le jardin", title: "La poussière", art: "park", text: "Tu cherches la poussière d’étoile. L’as-tu ?", itemCheck: { item: "starDust", yes: "dust_yes", no: "dust_no" } };
  S.dust_yes = page("Le jardin", "Un peu de réparation", "Tu souffles la poussière. La fissure devient plus douce. Une carte bleue brille.", "park", "attic_door", "keyCard", { clue: 1 }, "starDust");
  S.dust_no = page("Le jardin", "Des mots doux", "Tu n’as pas la poussière. Tu dis des mots gentils. La fissure se calme.", "park", "attic_door", null, { trust: 1 });

  S.attic_door = decision("Le grenier", "La porte bleue",
    "Dans le grenier d’Amy, une petite porte bleue apparaît. La voix est juste derrière. Comment l’ouvrir ?",
    "library", [
      choice("💳", "Utiliser la carte bleue", "use_card", "Elle a l’air de coller."),
      choice("🗣️", "Parler avec la voix douce", "use_voice", "Pour rassurer."),
      choice("❤️", "Attendre ensemble", "wait_together", "Amy sait attendre.")
    ]);
  S.attic_door.common = true;

  S.use_card = { chapter: "Le grenier", title: "La carte", art: "library", text: "Tu cherches la carte. L’as-tu ?", itemCheck: { item: "keyCard", yes: "card_yes", no: "card_no" } };
  S.card_yes = page("Le grenier", "La porte s’ouvre", "Tu glisses la carte. La porte s’ouvre en silence. Le prisonnier sourit.", "library", "final_free", null, { clue: 1 }, "keyCard");
  S.card_no = page("Le grenier", "Une autre idée", "Tu n’as pas la carte. Amy pousse doucement. La porte bouge un peu.", "library", "final_free", null, { trust: 1 });

  S.use_voice = { chapter: "Le grenier", title: "La voix", art: "library", text: "Tu cherches la voix douce. L’as-tu ?", itemCheck: { item: "softVoice", yes: "voice_yes", no: "voice_no" } };
  S.voice_yes = page("Le grenier", "Les mots justes", "Tu parles avec la voix douce. Le prisonnier se calme. La porte s’ouvre.", "library", "final_free", null, { trust: 1 }, "softVoice");
  S.voice_no = page("Le grenier", "Des mots d’Amy", "Tu n’as pas la voix spéciale. Amy parle. Ça marche aussi.", "library", "final_free", null, { trust: 1 });

  S.wait_together = page("Le grenier", "On attend", "Tu restes près de la porte avec Amy et le Docteur. Le temps passe. Puis la porte s’ouvre toute seule.", "library", "final_free", null, { trust: 1 });

  S.final_free = decision("De l’autre côté", "Liberté",
    "Le prisonnier sort. C’est un être de lumière tout doux. Il remercie. Comment veux-tu lui dire au revoir ?",
    "heart", [
      choice("👋", "Un grand signe", "end_wave", "Tout le monde ensemble."),
      choice("✨", "Un peu de poussière d’étoile", "end_dust", "Pour le voyage."),
      choice("❤️", "Un câlin d’Amy", "end_hug", "Le plus important.")
    ]);
  S.final_free.common = true;

  S.end_wave = ending("Au revoir l’ami", "Amy, le Docteur et toi faites de grands signes. L’être de lumière disparaît en souriant. La fissure se referme. Leadworth est calme.", "Tout est réparé", "heart");
  S.end_dust = { chapter: "La fin", title: "Un cadeau", art: "heart", text: "Tu cherches la poussière. L’as-tu ?", itemCheck: { item: "starDust", yes: "ending_star", no: "ending_simple" } };
  S.end_hug = ending("Le câlin d’Amy", "Amy serre l’être de lumière. Il rit. Puis il part. Amy sourit : « Il reviendra peut-être. »", "Une amitié nouvelle", "heart");

  S.ending_star = ending("Les étoiles le guident", "Tu donnes la poussière. L’être brille et part vers les étoiles. La fissure disparaît pour de bon.", "Le chemin des étoiles", "heart");
  S.ending_simple = ending("Juste un au revoir", "Tu n’as plus la poussière. Tu fais un grand signe. Ça suffit. Tout le monde est content.", "L’essentiel", "heart");

  window.BOOK_04 = book;
})();
