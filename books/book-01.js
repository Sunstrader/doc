// Adaptation douce de « Rose » (2005) pour enfants de 3-4 ans.
// Les Autons deviennent des mannequins curieux qui veulent rentrer chez eux.
(() => {
  const book = {
    id: "book-01",
    title: "Les Mannequins de Londres",
    subtitle: "À Londres, Rose et le Docteur découvrent des mannequins qui bougent tout seuls. Ils ont besoin d’aide pour rentrer à la maison.",
    start: "shop_street",
    heroes: {
      rose: { name: "Rose Tyler", short: "Rose", icon: "🌹", trait: "Elle écoute et rassure les gens (et les mannequins)." },
      doctor: { name: "Le Docteur", short: "Docteur", icon: "✦", trait: "Il comprend les machines et pose les bonnes questions." }
    },
    items: {
      blueButton: { name: "Bouton bleu", icon: "🔵" },
      plasticKey: { name: "Clé en plastique", icon: "🔑" },
      starMap: { name: "Carte des étoiles", icon: "🗺️" },
      softLight: { name: "Petite lumière", icon: "💡" },
      smileToken: { name: "Sourire partagé", icon: "😊" }
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

  S.shop_street = decision(
    "Londres · 2005",
    "Le grand magasin",
    s => `${book.heroes[s.hero].short} regarde la vitrine. Les mannequins bougent un tout petit peu. Un enfant les montre du doigt. Que fais-tu ?`,
    "shop",
    [
      choice("👋", "Dire bonjour aux mannequins", "mannequin_hello", "Ils semblent un peu perdus."),
      choice("🔍", "Regarder de plus près la vitrine", "window_look", "Quelque chose brille derrière le verre."),
      choice("🛒", "Entrer dans le magasin", "shop_enter", "Le Docteur aime bien les grands magasins.")
    ]
  );

  S.mannequin_hello = {
    chapter: "Devant la vitrine",
    title: "Les mannequins bougent",
    art: "shop",
    text: "Un mannequin lève doucement la main. Es-tu Rose ?",
    heroCheck: { hero: "rose", yes: "hello_rose", no: "hello_doctor" }
  };
  S.hello_rose = page("Devant la vitrine", "Un sourire de plastique", "Rose sourit au mannequin. Il sourit en retour (un peu raide). Il lui donne un petit bouton bleu qui brille. « Merci d’être gentille », dit-il d’une voix douce.", "shop", "common_hall", "blueButton", { trust: 1 });
  S.hello_doctor = page("Devant la vitrine", "Questions du Docteur", "Le Docteur demande : « D’où venez-vous ? » Le mannequin montre le ciel. Il glisse une petite clé en plastique dans la main du Docteur.", "shop", "common_hall", "plasticKey", { clue: 1 });

  S.window_look = {
    chapter: "Devant la vitrine",
    title: "Quelque chose brille",
    art: "shop",
    text: "Derrière le verre, une lumière douce pulse. Es-tu le Docteur ?",
    heroCheck: { hero: "doctor", yes: "window_doctor", no: "window_rose" }
  };
  S.window_doctor = page("Devant la vitrine", "La lumière secrète", "Le Docteur comprend : c’est un signal. Il récupère une petite lumière douce qui peut guider les mannequins.", "shop", "common_hall", "softLight", { clue: 1 });
  S.window_rose = page("Devant la vitrine", "Rose voit le chemin", "Rose remarque que la lumière forme une flèche vers le magasin. Elle suit le signal avec confiance.", "shop", "common_hall", null, { clue: 1 });

  S.shop_enter = {
    chapter: "Devant la vitrine",
    title: "Les portes s’ouvrent",
    art: "shop",
    text: "Les portes automatiques s’ouvrent toutes seules. Es-tu Rose ?",
    heroCheck: { hero: "rose", yes: "enter_rose", no: "enter_doctor" }
  };
  S.enter_rose = page("Dans le magasin", "Un accueil chaleureux", "Rose entre et un mannequin lui fait signe. Il lui confie une carte des étoiles en plastique souple. « Pour retrouver la maison », murmure-t-il.", "shop", "common_hall", "starMap", { trust: 1 });
  S.enter_doctor = page("Dans le magasin", "Le Docteur observe", "Le Docteur regarde les étiquettes. Tout vient d’une planète de plastique lointaine. Il trouve un bouton de secours.", "shop", "common_hall", "blueButton", { clue: 1 });

  S.common_hall = decision(
    "Le grand magasin",
    "Le hall des mannequins",
    "Tous les mannequins se sont arrêtés. Ils regardent Rose et le Docteur. Un grand mannequin s’avance doucement. Il a l’air un peu perdu.",
    "hall",
    [
      choice("💬", "Parler au grand mannequin", "leader_talk", "Il semble être le chef."),
      choice("🗺️", "Montrer la carte des étoiles", "map_show", "Peut-être qu’ils cherchent leur chemin."),
      choice("💡", "Allumer la petite lumière", "light_help", "Une lumière douce peut les rassurer.")
    ]
  );
  S.common_hall.common = true;

  S.leader_talk = page("Le hall", "Le chef des mannequins", "Le grand mannequin explique d’une voix douce : « Nous voulons rentrer chez nous. Notre planète de plastique nous appelle. » Il te fait confiance.", "hall", "upper_floor", null, { trust: 1 });
  S.map_show = {
    chapter: "Le hall",
    title: "La carte des étoiles",
    art: "hall",
    text: "Tu sors la carte. As-tu la carte des étoiles ?",
    itemCheck: { item: "starMap", yes: "map_yes", no: "map_no" }
  };
  S.map_yes = page("Le hall", "Le chemin apparaît", "La carte s’illumine. Les mannequins reconnaissent leur constellation. Ils te donnent un sourire partagé en remerciement.", "hall", "upper_floor", "smileToken", { clue: 1 });
  S.map_no = page("Le hall", "Une autre idée", "Tu n’as pas la carte. Le Docteur dessine les étoiles avec son doigt dans l’air. Les mannequins comprennent quand même.", "hall", "upper_floor", null, { clue: 1 });
  S.light_help = {
    chapter: "Le hall",
    title: "Une lumière douce",
    art: "hall",
    text: "Tu cherches une lumière. As-tu la petite lumière ?",
    itemCheck: { item: "softLight", yes: "light_yes", no: "light_no" }
  };
  S.light_yes = page("Le hall", "Tout devient calme", "La petite lumière brille. Les mannequins se détendent. Ils te remercient avec un bouton bleu supplémentaire.", "hall", "upper_floor", "blueButton", { trust: 1 });
  S.light_no = page("Le hall", "La lumière du magasin", "Tu n’as pas la petite lumière. Tu allumes simplement les néons du plafond. C’est assez pour rassurer tout le monde.", "hall", "upper_floor", null, { trust: 1 });

  S.upper_floor = decision(
    "L’étage du magasin",
    "La salle des miroirs",
    "À l’étage, de grands miroirs montrent les mannequins sous tous les angles. Un portail de lumière scintille au fond de la pièce.",
    "library",
    [
      choice("🪞", "Regarder dans le grand miroir", "mirror_look", "On y voit peut-être la planète."),
      choice("🔑", "Utiliser une clé ou un bouton", "key_use", "Quelque chose doit ouvrir le portail."),
      choice("🤝", "Tenir la main d’un mannequin", "hand_hold", "Ensemble, c’est plus facile.")
    ]
  );
  S.upper_floor.common = true;

  S.mirror_look = page("La salle des miroirs", "La planète de plastique", "Dans le miroir, tu vois une planète toute ronde et brillante. Les mannequins sourient. Ils savent maintenant où aller.", "library", "portal_ready", null, { clue: 1 });
  S.key_use = {
    chapter: "La salle des miroirs",
    title: "Ouvrir le portail",
    art: "library",
    text: "Tu cherches une clé ou un bouton. As-tu la clé en plastique ou le bouton bleu ?",
    itemCheck: { anyItems: ["plasticKey", "blueButton"], yes: "key_yes", no: "key_no" }
  };
  S.key_yes = page("La salle des miroirs", "Le portail s’ouvre", "Tu places la clé (ou le bouton). Le portail de lumière s’ouvre en douceur. Une belle musique se fait entendre.", "library", "portal_ready", null, { clue: 1 });
  S.key_no = page("La salle des miroirs", "Une autre façon", "Tu n’as ni clé ni bouton. Rose et le Docteur demandent aux mannequins de chanter ensemble. Le portail s’ouvre quand même !", "library", "portal_ready", null, { trust: 1 });
  S.hand_hold = page("La salle des miroirs", "Main dans la main", "Tu prends la main d’un mannequin. Il te serre doucement. Ensemble vous avancez vers le portail. Un sourire partagé apparaît.", "library", "portal_ready", "smileToken", { trust: 1 });

  S.portal_ready = decision(
    "Le portail de lumière",
    "L’heure de rentrer",
    "Le portail est ouvert. Les mannequins sont prêts. Ils te regardent avec gratitude. Comment veux-tu les aider à partir ?",
    "heart",
    [
      choice("🗺️", "Leur montrer le chemin des étoiles", "end_map", "Avec la carte ou le souvenir des étoiles."),
      choice("😊", "Leur offrir un dernier sourire", "end_smile", "La gentillesse est le plus beau cadeau."),
      choice("✦", "Dire au revoir avec le Docteur et Rose", "end_together", "Tout le monde ensemble.")
    ]
  );
  S.portal_ready.common = true;

  S.end_map = {
    chapter: "Le portail",
    title: "Le chemin des étoiles",
    art: "heart",
    text: "Tu regardes tes roues. As-tu la carte des étoiles ?",
    itemCheck: { item: "starMap", yes: "ending_stars", no: "ending_memory" }
  };
  S.end_smile = {
    chapter: "Le portail",
    title: "Un dernier sourire",
    art: "heart",
    text: "Tu cherches un sourire partagé. L’as-tu ?",
    itemCheck: { item: "smileToken", yes: "ending_kind", no: "ending_wave" }
  };
  S.end_together = {
    chapter: "La fin",
    title: "Au revoir, amis de plastique",
    text: "Rose et le Docteur font un grand signe de la main. Les mannequins traversent le portail en riant (un rire un peu plastique). Le magasin redevient calme.",
    art: "heart",
    end: true,
    endLabel: "Tous ensemble"
  };

  S.ending_stars = ending("Le chemin retrouvé", "Tu montres la carte. Les mannequins reconnaissent leur maison. Ils passent le portail en disant « Merci ! ». Rose et le Docteur se regardent en souriant. Une belle aventure.", "Les étoiles les guident", "heart");
  S.ending_memory = ending("Le souvenir suffit", "Tu n’as plus la carte, mais tu te souviens des étoiles. Tu les dessines dans l’air. Les mannequins comprennent et passent le portail. « À bientôt ! »", "La mémoire des étoiles", "heart");
  S.ending_kind = ending("Le plus beau cadeau", "Tu offres le sourire partagé. Les mannequins le gardent précieusement. Ils rentrent chez eux le cœur (en plastique) léger. Rose et le Docteur sont fiers.", "La gentillesse gagne", "heart");
  S.ending_wave = ending("Un grand au revoir", "Tu n’as pas le sourire spécial, mais tu fais un grand signe de la main. Les mannequins répondent. Ils traversent le portail heureux. Le magasin redevient silencieux et doux.", "Au revoir, amis", "heart");

  window.BOOK_01 = book;
})();
