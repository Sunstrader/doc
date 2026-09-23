(() => {
  "use strict";
  const books=[window.BOOK_02,window.BOOK_03,window.BOOK_04,window.BOOK_05];
  function alt(number,scene,index,label,next,flags){
    const book=books[number-2];
    book.scenes[scene].choices[index].otherwise={label,next,...(flags?{flags}:{})};
  }

  // A missing item changes what the chosen flap discovers. Every destination is
  // an authored page; it never awards an item the character does not possess.
  alt(2,"angel_plaque",0,"Chercher une trace derrière le portrait","portrait_back",{clues:1});
  alt(2,"security_door",0,"Appeler par l'interphone","intercom");
  alt(2,"security_door",1,"Suivre les échos derrière la vitre","echo_hall");
  alt(2,"angel_clock",0,"Repérer une autre entrée par l'horloge","clock_portal");
  alt(2,"angel_clock",1,"Aller surveiller l'Ange sur les caméras","security_room");
  alt(2,"clock_portal",1,"Comparer les dates sans les marquer","date_pattern",{clues:1});
  alt(2,"room17_door",0,"Observer la carte dans la main de l'Ange","angel_clock");
  alt(2,"room17_door",1,"Suivre le câble jusqu'à l'alimentation","battery_cabinet");
  alt(2,"room17_open",0,"Chercher l'ordre des portes flottantes","door_order",{clues:1});
  alt(2,"mirror_solution",2,"Avancer sans déclencher de flash","museum_escape");
  alt(2,"today_door",2,"Fermer les portes pour protéger la sortie","close_doors");
  alt(2,"close_doors",0,"Traverser avant que les Anges bougent","museum_escape");
  alt(2,"museum_escape",1,"Passer par l'ancienne porte temporelle","ending_past");

  const dino=window.BOOK_03;
  dino.scenes.hand_drawn_symbol={
    chapter:"Mystère",title:"Une spirale vue de près",glyph:"🌀",
    text:"Sans appareil photo, tu t'accroupis près de Milo et suis la gravure du doigt. La petite spirale ressemble au plan d'un ancien laboratoire. Tu la dessines de mémoire avant qu'il ne reparte.",
    flags:{sawSymbol:true,clues:1},
    choices:[
      {icon:"🏛️",label:"Chercher ce symbole dans les archives",next:"museum_archive"},
      {icon:"🌳",label:"Suivre Milo dans le parc",next:"park_route"},
      {icon:"📡",label:"Observer encore la balise",next:"remove_tracker"}
    ]
  };
  dino.scenes.portal_handmade={
    chapter:"ChronoZoo",title:"Un portail à l'oreille",glyph:"🌀",
    text:"Sans balise, le Docteur règle la machine sur le cri de Milo. Une jungle apparaît : ce n'est pas une coordonnée exacte, mais Milo reconnaît l'odeur de chez lui. Il faudra le laisser choisir le bon passage.",
    flags:{improvisedPortal:true,clues:1},
    choices:[
      {icon:"🦕",label:"Laisser Milo choisir son instant",next:"dino_choice"},
      {icon:"🌿",label:"Comparer avec une feuille de la serre",next:"strange_leaf"},
      {icon:"⚡",label:"Vérifier la stabilité de la machine",next:"portal_unstable"}
    ]
  };
  dino.scenes.manual_door={
    chapter:"Sous Londres",title:"Le code frappé à la main",glyph:"🚪",
    text:"Sans photo à montrer au scanner, tu remarques une spirale gravée à hauteur de Milo et la redessines sur la poussière du lecteur. Milo pousse un petit cri ; le Docteur reproduit son rythme en tapant sur la porte. Le verrou reconnaît enfin la séquence.",
    flags:{manualEntry:true,clues:1},
    choices:[
      {icon:"🧪",label:"Entrer dans le laboratoire",next:"underground_lab"},
      {icon:"🦕",label:"Faire venir Milo doucement",next:"lab_with_dino"},
      {icon:"🔧",label:"Explorer le tunnel latéral",next:"maintenance_tunnel"}
    ]
  };
  alt(3,"meet_dino",0,"Observer la lumière sur son collier","blue_glow",{clues:1});
  alt(3,"meet_dino",1,"Demander aux policiers de garder leurs distances","police_arrive");
  alt(3,"blue_glow",0,"Dessiner la spirale de mémoire","hand_drawn_symbol",{clues:1});
  alt(3,"park_route",1,"Traverser la haie derrière Milo","leaf_path");
  alt(3,"dino_memory",1,"Suivre Milo à pied","park_route",{kind:1});
  alt(3,"underground_entrance",0,"Chercher le code dans les archives","museum_archive");
  alt(3,"underground_entrance",1,"Reproduire le symbole à la main","manual_door");
  alt(3,"lab_log",0,"Régler la machine sans balise","portal_handmade");
  alt(3,"power_room",0,"Lire le journal de réglage","lab_log");
  alt(3,"power_room",1,"Chercher une plante de l'époque de Milo","strange_leaf");
  alt(3,"leaf_calibration",1,"Laisser Milo reconnaître la jungle","dino_choice");
  alt(3,"leaf_calibration",2,"Tester la machine avec un seul repère","portal_unstable");
  alt(3,"portal_machine",0,"Régler le portail au cri de Milo","portal_handmade");
  alt(3,"portal_machine",1,"Suivre une piste végétale","strange_leaf");
  alt(3,"tracker_calibration",1,"Demander à Milo de choisir le passage","dino_choice");
  alt(3,"tracker_calibration",2,"Tester le portail sans deuxième repère","portal_unstable");
  alt(3,"perfect_calibration",2,"Décrire ce moment au Docteur","ending_return");
  alt(3,"dino_choice",1,"Ouvrir le TARDIS comme abri pour Milo","ending_tardis");
  alt(3,"dino_choice",2,"Appeler doucement Milo par son nom","farewell",{kind:1});

  // Les talents du carnet, de la clé et du sac gardent leurs chemins propres.
  // Le cœur du TARDIS accepte des essais sans les trois objets correspondants.
  alt(4,"thread_walk",2,"Suivre l'aiguille dessinée sur le sol","need_anchor");
  const tardis=window.BOOK_04;
  tardis.scenes.library_margin={
    chapter:"Bibliothèque",title:"Les livres suivent un rythme",glyph:"📚",
    text:"Sans carnet, tu observes les livres qui glissent sur les rayons. Un volume bleu revient toujours à la même place juste avant que la porte change de destination. Tu retiens son rythme.",
    flags:{clues:1},
    choices:[
      {icon:"🚪",label:"Suivre la porte au bon moment",next:"moving_door"},
      {icon:"🧭",label:"Chercher un meilleur repère",next:"compass_room"},
      {icon:"📖",label:"Ouvrir le livre bleu",next:"tardis_manual"}
    ]
  };
  tardis.scenes.sea_shell={
    chapter:"Plage impossible",title:"Un coquillage derrière le mur",glyph:"🐚",
    text:"Sans sac où chercher, tu approches l'oreille du mur. On y entend la mer, puis trois coups du TARDIS. Tu réponds de la même façon ; une porte apparaît dans le sable.",
    flags:{clues:1},
    choices:[
      {icon:"🚪",label:"Traverser la nouvelle porte",next:"moving_door"},
      {icon:"🧵",label:"Suivre le fil bleu dans le sable",next:"blue_thread_room"},
      {icon:"🏖️",label:"Explorer la cabine de plage",next:"beach_hut"}
    ]
  };
  tardis.scenes.door_without_notes={
    chapter:"Zone perdue",title:"Une porte sur quatre",glyph:"🚪",
    text:"Sans carnet, tu comptes à voix haute : bibliothèque, cuisine, couloir… La quatrième porte montre une pièce bleue pendant une seconde. Tu te lances avant qu'elle disparaisse.",
    flags:{sawBlueRoom:true,clues:1},
    choices:[
      {icon:"🧵",label:"Attraper le fil bleu",next:"blue_thread_room"},
      {icon:"0️⃣",label:"Chercher la chambre zéro",next:"zero_door"},
      {icon:"🧭",label:"Suivre le bruit de la boussole",next:"compass_room"}
    ]
  };
  tardis.scenes.compass_ear={
    chapter:"Salle de navigation",title:"Un cœur qui fait tic tac",glyph:"🧭",
    text:"Sans carnet pour tracer la forme, tu fermes les yeux. L'aiguille fait deux petits clics puis un grand : exactement comme un cœur. Elle pointe vers un mur sans poignée.",
    flags:{clues:1},
    choices:[
      {icon:"🧱",label:"Toucher le mur",next:"blue_thread_room"},
      {icon:"🧭",label:"Emporter la boussole",next:"take_compass"},
      {icon:"0️⃣",label:"Suivre le battement jusqu'à la chambre zéro",next:"zero_door"}
    ]
  };
  tardis.scenes.zero_knock={
    chapter:"Chambre Zéro",title:"Une porte qui écoute",glyph:"0️⃣",
    text:"Sans la bonne clé, tu frappes trois fois. La porte répond par un seul coup, et le Docteur comprend : elle attend qu'on se souvienne d'elle. Le verrou se desserre, lentement.",
    flags:{clues:1},
    choices:[
      {icon:"🚪",label:"Entrer avec précaution",next:"zero_room"},
      {icon:"🧵",label:"Suivre le fil avant d'entrer",next:"blue_thread_room"},
      {icon:"🧭",label:"Chercher un repère",next:"compass_room"}
    ]
  };
  tardis.scenes.zero_riddle={
    chapter:"Chambre Zéro",title:"La phrase au-dessus de la porte",glyph:"✨",
    text:"La clé du TARDIS manque. Tu relis la phrase à haute voix : pour se souvenir d'où l'on va, il faut se souvenir d'où l'on vient. Tu nommes la salle de contrôle. Une poignée de lumière se forme.",
    flags:{clues:1},
    choices:[
      {icon:"🚪",label:"Ouvrir la porte de lumière",next:"zero_room"},
      {icon:"📚",label:"Chercher d'abord un plan",next:"library"},
      {icon:"🧵",label:"Suivre le fil bleu",next:"blue_thread_room"}
    ]
  };
  tardis.scenes.anchor_voice={
    chapter:"Réparation",title:"Le TARDIS montre le chemin",glyph:"🧭",
    text:"Sans boussole ni clé, tu poses la main sur le mur. Le TARDIS donne trois petits coups : toc, toc, toc. Tu les suis jusqu'au centre de la salle de contrôle. Ce repère suffit pour commencer, même s'il bouge encore un peu.",
    flags:{anchor:true,roughAnchor:true},
    choices:[
      {icon:"🎛️",label:"Rejoindre la console",next:"final_console"},
      {icon:"🧵",label:"Chercher un souvenir stable",next:"need_memory"},
      {icon:"💎",label:"Chercher de l'énergie",next:"need_energy"}
    ]
  };
  tardis.scenes.hand_energy={
    chapter:"Réparation",title:"Une étincelle de confiance",glyph:"✨",
    text:"Tu poses les mains sur le capteur. Le Docteur compte jusqu'à trois, et le TARDIS emprunte juste assez de chaleur pour réveiller son cœur. L'énergie reste fragile, mais les pièces cessent de glisser.",
    flags:{energy:true,roughEnergy:true},
    choices:[
      {icon:"🎛️",label:"Rejoindre la console",next:"final_console"},
      {icon:"🧭",label:"Vérifier le repère",next:"need_anchor"},
      {icon:"🧵",label:"Vérifier les souvenirs",next:"need_memory"}
    ]
  };
  alt(4,"library",0,"Observer le rythme des livres sans carnet","library_margin");
  alt(4,"sea_edge",0,"Écouter le mur comme un coquillage","sea_shell");
  alt(4,"moving_door",0,"Compter les destinations à voix haute","door_without_notes");
  alt(4,"moving_door",1,"Attendre la prochaine porte bleue","library_margin");
  alt(4,"compass_room",1,"Écouter le mouvement de l'aiguille","compass_ear");
  alt(4,"zero_door",0,"Frapper à la porte sans clé","zero_knock");
  alt(4,"zero_door",1,"Résoudre la phrase au-dessus de la porte","zero_riddle");
  alt(4,"need_anchor",1,"Écouter le TARDIS pour trouver le centre","anchor_voice");
  alt(4,"need_memory",1,"Suivre un souvenir flottant jusqu'à la chambre zéro","zero_room");
  alt(4,"need_energy",1,"Réveiller le cœur avec la chaleur des mains","hand_energy");
  alt(4,"emergency_exit",2,"Écouter le TARDIS avant de fermer la porte","anchor_voice");

  alt(5,"first_contact",1,"Écouter la réponse du système sans s'identifier","why_not_attack",{clues:1});
  alt(5,"solar_lab",0,"Couper le collecteur à la main","lab_power_cut",{brave:1});
  alt(5,"solar_lab",1,"Protéger la station avec les boucliers","shields_up");
  alt(5,"team_plan",0,"Faire tenir le circuit par le Dalek","dalek_final_role",{kind:1});
  alt(5,"team_plan",1,"Dévier la chaleur vers les boucliers","shield_final");
  alt(5,"collector_final",0,"Répartir l'énergie dans les boucliers","shield_final");
  alt(5,"shield_final",2,"Quitter la station avec les souvenirs racontés","ending_station");
  alt(5,"dalek_final_role",0,"Lui demander de réduire la charge","shield_final");
  alt(5,"dalek_final_role",1,"Faire passer la chaleur par les boucliers","shield_final");
  window.BOOK_05.scenes.robot_repair={
    chapter:"Final",title:"Une petite réparation",glyph:"🤖",
    text:"Sans tournevis sonique, tu appelles les robots de la station. Ils ne peuvent pas réparer toute l'armure, mais ils gardent la puce mémoire alimentée. Le Dalek peut encore entendre le Docteur lui promettre de revenir.",
    flags:{memorySaved:true},
    choices:[
      {icon:"💾",label:"Emporter une copie de sa mémoire",next:"ending_memory"},
      {icon:"🚪",label:"Partir chercher des secours",next:"ending_station"},
      {icon:"🤖",label:"Confier la puce aux robots",next:"ending_memory"}
    ]
  };
  alt(5,"dalek_sacrifice",1,"Appeler les robots pour garder sa mémoire","robot_repair");
})();
