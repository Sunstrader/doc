// Une courte aventure à embranchements réels. Chaque découverte avance l'histoire.
(() => {
  const book = {
    id:"book-01",
    title:"Le Docteur a disparu !",
    subtitle:"Le TARDIS t'emmène à travers le temps. Qui aidera le Docteur à retrouver son chemin ?",
    start:"intro",
    heroes:{
      rose:{name:"Rose Tyler",short:"Rose",icon:"🌹",trait:"Rose sait écouter et gagner la confiance des autres."},
      clara:{name:"Clara Oswald",short:"Clara",icon:"🍃",trait:"Clara remarque les petits détails et comprend les machines."}
    },
    items:{
      clockGear:{name:"Roue d'horloge",icon:"⚙️"},feather:{name:"Plume argentée",icon:"🪶"},
      starMap:{name:"Carte des étoiles",icon:"🗺️"},dalekCell:{name:"Pile bleue",icon:"🔋"},
      blueCrystal:{name:"Cristal bleu",icon:"💎"}
    },
    scenes:{}
  };
  const S=book.scenes;
  const choice=(icon,label,next,hint)=>({icon,label,next,hint});
  const result=(chapter,title,text,art,next,giveItem,flags,removeItem)=>({
    chapter,title,text,art,next,...(giveItem?{giveItem}:{}),...(flags?{flags}:{}),
    ...(removeItem?{removeItem}:{})
  });
  const end=(title,text,label,art,removeItem)=>({
    chapter:"La fin",title,text,end:true,endLabel:label,art,...(removeItem?{removeItem}:{})
  });
  S.intro={
    chapter:"Le début",title:"La minute immobile",art:"london",
    text:s=>`${book.heroes[s.hero].short} sort du TARDIS à Londres. La pluie reste immobile et le Docteur a disparu ! Une petite fille attend, l'horloge est arrêtée et une boutique est ouverte. Où vas-tu ?`,
    choices:[
      choice("👧","Parler à la petite fille","girl_entry","Elle a vu quelque chose tomber de l'horloge."),
      choice("🕰️","Aller à la grande horloge","tower_entry","Les aiguilles sont coincées."),
      choice("⌚","Entrer dans la boutique","shop_entry","Un horloger cherche une pièce.")
    ]
  };
  // Une seule rangée avance : chacun des trois choix initiaux ouvre aussitôt
  // un renvoi 1/2. Les deux pages mènent ensuite à la même rencontre locale.
  S.girl_entry={chapter:"Londres · la petite fille",title:"Une rencontre sous la pluie",art:"girl",text:"La petite fille serre un dessin contre elle. Elle hésite à raconter ce qu'elle a vu. Es-tu Rose ?",heroCheck:{hero:"rose",yes:"girl_rose_page",no:"girl_clara_page"}};
  S.girl_rose_page=result("Londres","Une voix rassurante","Rose s'accroupit et demande doucement : « Tu as vu le Docteur ? » La petite fille lui montre son dessin.","girl","girl_meeting");
  S.girl_clara_page=result("Londres","Le dessin mouillé","Clara remarque une aiguille dessinée à l'envers. La petite fille la laisse regarder de plus près.","girl","girl_meeting");
  S.tower_entry={chapter:"Londres · la tour",title:"La grande horloge",art:"tower",text:"Les aiguilles se sont arrêtées et une petite roue brille derrière le cadran. Es-tu Clara ?",heroCheck:{hero:"clara",yes:"tower_clara_page",no:"tower_rose_page"}};
  S.tower_clara_page=result("Londres","Trois marques","Clara aperçoit trois marques presque cachées près des aiguilles. Elle appelle le gardien pour entrer.","tower","clock_tower");
  S.tower_rose_page=result("Londres","Un gardien inquiet","Rose demande au gardien ce qui est arrivé à l'horloge. Il lui ouvre la porte pour qu'ils cherchent ensemble.","tower","clock_tower");
  S.shop_entry={chapter:"Londres · la boutique",title:"Les montres endormies",art:"shop",text:"Dans la boutique, les montres ne bougent plus. L'horloger attend de l'aide. Es-tu Rose ?",heroCheck:{hero:"rose",yes:"shop_rose_page",no:"shop_clara_page"}};
  S.shop_rose_page=result("Londres","Bonjour, monsieur l'horloger","Rose écoute l'horloger. Il lui montre ses outils et lui propose de chercher avec lui.","shop","watch_shop");
  S.shop_clara_page=result("Londres","La petite vis","Clara aperçoit une vis brillante au bord de la vitrine. L'horloger la laisse inspecter les montres.","shop","watch_shop");
  // Chaque chemin d'ouverture se résout puis rejoint tardis_between ; aucune
  // option ne ramène au carrefour du début pour visiter les voies écartées.
  S.girl_meeting={
    chapter:"Londres · la petite fille",title:"Un secret dans sa poche",art:"girl",
    text:"« Le Docteur m'a dit que chaque seconde compte », chuchote la petite fille. Elle a vu quelque chose tomber de l'horloge.",
    choices:[
      choice("🤝","Écouter son secret","girl_check","Rose sait mettre les gens en confiance."),
      choice("🎈","Attraper le ballon perché","girl_feather","Une longue branche peut aider."),
      choice("🔍","Regarder son dessin",s=>s.hero==="clara"?"girl_pattern":"girl_drawing",s=>s.hero==="clara"?"Clara voit les détails cachés.":"Le dessin peut montrer un indice.")
    ]
  };
  S.girl_check={chapter:"Londres",title:"Le secret de la petite fille",art:"girl",text:"Elle garde une petite roue dans sa poche. Es-tu Rose Tyler ?",heroCheck:{hero:"rose",yes:"girl_gear",no:"girl_hint"}};
  S.girl_gear=result("Londres","Une roue dans la poche","Rose écoute la petite fille. Elle lui confie une petite roue dorée. Ensemble, elles la remettent dans l'horloge : tic, tac ! La pluie recommence à tomber.","girl","tardis_between","clockGear",{piece1:true,kind:true});
  S.girl_hint=result("Londres","Le rythme retrouvé","La petite fille fredonne « tic, tac ». En suivant son rythme, tu aides l'horloger à relancer la pendule. Le temps repart, même sans emporter de roue.","girl","tardis_between",null,{piece1:true,kind:true});
  S.girl_feather=result("Londres","Le cadeau du ballon","Tu fais descendre le ballon avec une longue branche. La petite fille te donne la plume argentée attachée à sa ficelle, puis montre à l'horloger comment réparer la pendule.","girl","tardis_between","feather",{piece1:true,kind:true});
  S.girl_pattern=result("Londres","Le dessin de Clara","Clara voit que les aiguilles dessinées forment une flèche. La petite fille lui montre où pousser la roue de l'horloge. La pendule repart ! Tu gardes la roue de rechange.","girl","tardis_between","clockGear",{piece1:true,clues:1});
  S.girl_drawing=result("Londres","Un indice dessiné","Sur le dessin, la petite fille a entouré l'aiguille bloquée. Tu la remets doucement en place avec elle. Le temps repart, et tu te souviens de ce signe.","girl","tardis_between",null,{piece1:true,clues:1});
  S.clock_tower={
    chapter:"Londres · la tour",title:"Tout en haut de l'horloge",art:"tower",
    text:"Tu arrives devant la grande horloge. Une petite roue brille derrière le cadran. Comment atteindre le mécanisme ?",
    choices:[
      choice("🧗","Grimper jusqu'au cadran","tower_stairs","Le gardien connaît un escalier secret."),
      choice("🔍","Observer les petites aiguilles","tower_check","Clara remarque un détail."),
      choice("💬","Demander de l'aide au gardien",s=>s.hero==="rose"?"tower_friend":"tower_hand",s=>s.hero==="rose"?"Rose sait trouver les bons mots.":"Le gardien peut t'aider à tenir l'aiguille.")
    ]
  };
  S.tower_check={chapter:"Londres",title:"Les marques de l'horloge",art:"tower",text:"Trois petites marques brillent près des aiguilles. Es-tu Clara Oswald ?",heroCheck:{hero:"clara",yes:"tower_pattern",no:"tower_ticks"}};
  S.tower_stairs=result("Londres","L'escalier du gardien","Le mur est trop haut. Un gardien t'ouvre un escalier secret. Ensemble, vous redressez une aiguille et l'horloge repart.","tower","tardis_between",null,{piece1:true,kind:true});
  S.tower_pattern=result("Londres","Les trois petits traits","Clara repère trois marques sur le cadran. Elle montre au gardien où appuyer. Ensemble, ils libèrent la roue coincée. L'horloge sonne ; le gardien lui confie la roue de rechange.","tower","tardis_between","clockGear",{piece1:true,clues:1});
  S.tower_ticks=result("Londres","Tic... tac !","Les aiguilles avancent dans le mauvais ordre. Tu comptes doucement avec le gardien : une, deux, trois ! Elles reprennent leur place.","tower","tardis_between",null,{piece1:true,clues:1});
  S.tower_friend=result("Londres","Un nouvel ami","Rose demande au gardien ce qui manque. Il lui donne sa roue de secours. Ensemble, ils réparent le cadran et Londres se remet à bouger.","tower","tardis_between","clockGear",{piece1:true,kind:true});
  S.tower_hand=result("Londres","Une aiguille à pousser","Le gardien t'aide à tenir la grande aiguille. Tu la pousses tout doucement. Ding ! Le temps repart ; il te remercie.","tower","tardis_between",null,{piece1:true,kind:true});
  S.watch_shop={
    chapter:"Londres · la boutique",title:"Les montres endormies",art:"shop",
    text:"Dans la boutique, toutes les montres sont arrêtées. Une roue brille sous verre. L'horloger te regarde avec espoir.",
    choices:[
      choice("💬","Parler à l'horloger",s=>s.hero==="rose"?"shop_friend":"shop_clue",s=>s.hero==="rose"?"Rose sait rassurer les gens.":"Il pourra te montrer la bonne montre."),
      choice("🔍","Observer la vitrine bleue","shop_check","Clara remarque son petit mécanisme."),
      choice("🧗","Atteindre la plus haute étagère","shop_floor","Un tiroir se trouve juste en bas.")
    ]
  };
  S.shop_check={chapter:"Londres",title:"La vitrine de l'horloger",art:"shop",text:"La vitrine a une petite vis et un reflet étrange. Es-tu Clara Oswald ?",heroCheck:{hero:"clara",yes:"shop_sonic",no:"shop_window"}};
  S.shop_friend=result("Londres","Le cadeau de l'horloger","Rose écoute l'horloger. Soulagé, il lui confie la roue sous verre. Il la place lui-même dans la grande horloge. Tic, tac !","shop","tardis_between","clockGear",{piece1:true,kind:true});
  S.shop_clue=result("Londres","La bonne montre","L'horloger montre la montre qui marche encore. Grâce à elle, vous réglez ensemble la grande horloge. La rue reprend vie.","shop","tardis_between",null,{piece1:true,clues:1});
  S.shop_sonic=result("Londres","Le mécanisme caché","Clara remarque une petite vis sous la vitrine. L'horloger lui prête un outil pour l'ouvrir. Il prend une roue pour réparer l'horloge et lui confie celle de rechange.","shop","tardis_between","clockGear",{piece1:true,clues:1});
  S.shop_window=result("Londres","Le reflet dans la vitre","La vitrine ne s'ouvre pas. Mais dans son reflet, tu vois la bonne position des aiguilles. L'horloger les remet en place ; le temps repart.","shop","tardis_between",null,{piece1:true,clues:1});
  S.shop_floor=result("Londres","Le tiroir d'en bas","Tu ne peux pas atteindre l'étagère. En bas, un tiroir contient une vieille plume. Elle chatouille le nez de l'horloger, qui rit et répare enfin l'horloge.","shop","tardis_between","feather",{piece1:true,kind:true});
  S.tardis_between=result("Le TARDIS","Une nouvelle lumière","Londres bouge de nouveau ! Dans le TARDIS, un point lumineux montre maintenant le musée des étoiles. Le Docteur est peut-être là-bas.","tardis","museum_arrival");
  S.tardis_between.common=true;
  S.museum_arrival={
    chapter:"Le musée · futur",title:"La carte qui bouge",art:"museum",
    text:"Dans le futur, un musée flotte parmi les étoiles. Une carte lumineuse tourne, un petit robot cherche sa pile et une gardienne surveille les vitrines.",
    choices:[
      choice("🗺️","Étudier la carte des étoiles","museum_gear_check","La petite roue trouvée à Londres pourrait faire tourner la carte."),
      choice("🤖","Aider le petit robot",s=>s.hero==="clara"?"museum_robot":"museum_robot_help",s=>s.hero==="clara"?"Clara voit où se trouve sa pile.":"La gardienne peut le soulever."),
      choice("👩","Parler à la gardienne",s=>s.hero==="rose"?"museum_guard":"museum_ticket",s=>s.hero==="rose"?"Rose sait la rassurer.":"Elle connaît peut-être le chemin.")
    ]
  };
  S.museum_gear_check={chapter:"Le musée",title:"La carte lumineuse",art:"museum",text:"La carte ne bouge plus. Regarde la roue verte : as-tu trouvé une roue d'horloge à Londres ?",itemCheck:{item:"clockGear",yes:"museum_map",no:"museum_lines"}};
  S.museum_map=result("Le musée","La carte se réveille","Tu places ta petite roue dans la carte. Elle tourne et montre où le Docteur attend ! La gardienne te donne une copie pour le retrouver.","museum","tardis_to_dalek","starMap",{piece2:true,clues:1});
  S.museum_lines=result("Le musée","Une étoile à suivre","Tu n'as pas la petite roue. La gardienne fait tourner la carte pour toi. Tu suis une étoile bleue du regard et gardes sa direction en mémoire.","museum","tardis_to_dalek",null,{piece2:true,clues:1});
  S.museum_robot=result("Le musée","Merci, Clara !","Clara repère le compartiment ouvert du petit robot. Elle y replace sa pile. Ravi, il lui offre une pile de secours et indique où se trouve le Docteur.","museum","tardis_to_dalek","dalekCell",{piece2:true,kind:true});
  S.museum_robot_help=result("Le musée","Le robot réparé","Tu appelles la gardienne. Elle soulève le robot pour que tu puisses le réparer. Il clignote joyeusement et indique le bon chemin.","museum","tardis_to_dalek",null,{piece2:true,kind:true});
  S.museum_guard=result("Le musée","La confiance de la gardienne","Rose explique qu'elle cherche un ami. La gardienne lui confie une copie de la carte des étoiles et lui montre le chemin.","museum","tardis_to_dalek","starMap",{piece2:true,kind:true});
  S.museum_ticket=result("Le musée","Un billet étoilé","La gardienne ne peut pas donner la carte. Elle te montre pourtant une étoile dessinée sur un billet. Ce dessin suffit à guider le TARDIS.","museum","tardis_to_dalek",null,{piece2:true,clues:1});
  S.tardis_to_dalek=result("Le TARDIS","Presque arrivés","Le TARDIS suit la piste trouvée au musée. Une petite voix de métal appelle à l'aide. Le Docteur est tout près !","tardis","dalek_approach");
  S.tardis_to_dalek.common=true;
  S.dalek_approach={
    chapter:"Tout près du Docteur",title:"Le Dalek et la bulle de temps",art:"dalek",
    text:"Le Docteur attend dans une bulle brillante. Un Dalek garde la machine, mais sa lumière bleue clignote : lui aussi a besoin d'aide. Que fais-tu ?",
    choices:[
      choice("💬","Demander au Dalek ce qui ne va pas",s=>s.hero==="rose"?"dalek_listens":"dalek_echo",s=>s.hero==="rose"?"Rose trouve des mots gentils.":"Sa réponse pourrait aider."),
      choice("🧗","Monter à la passerelle","dalek_ground","Un bouton se trouve près du sol."),
      choice("🔍","Regarder les fils bleus",s=>s.hero==="clara"?"dalek_console":"dalek_button",s=>s.hero==="clara"?"Clara repère le fil débranché.":"Le Dalek te montrera la bonne lumière.")
    ]
  };
  S.dalek_listens=result("La bulle","Le Dalek écoute Rose","Rose écoute le Dalek : sa pile est vide. Elle l'aide à rallumer sa lumière. Pour la remercier, il lui donne un cristal bleu qui ouvre la bulle.","dalek","final_console","blueCrystal",{piece3:true,kind:true});
  S.dalek_echo=result("La bulle","Une voix derrière le métal","Tu entends la voix du Docteur dans la bulle : « Regarde les trois lumières ! » Le Dalek s'écarte pour te laisser essayer.","dalek","final_console",null,{piece3:true,clues:1});
  S.dalek_ground=result("La bulle","Un bouton près du sol","La passerelle est trop haute. Tout près de tes pieds, tu vois un bouton bleu. Tu appuies : la bulle devient plus légère.","dalek","final_console",null,{piece3:true,clues:1});
  S.dalek_console=result("La bulle","Clara et les fils bleus","Clara trouve le fil débranché. Le Dalek éteint la machine un instant et elle remet le fil en place. La machine ronronne ; un cristal bleu se détache pour l'aider.","dalek","final_console","blueCrystal",{piece3:true,clues:1});
  S.dalek_button=result("La bulle","La bonne lumière","Tu ne sais pas quel fil toucher. Le Dalek montre une petite lumière bleue. Tu la suis jusqu'au bouton qui desserre la bulle.","dalek","final_console",null,{piece3:true,kind:true});
  S.final_console={
    chapter:"La dernière page",title:"Ouvrir la bulle",art:"dalek",
    text:"Le Docteur te sourit derrière la bulle de temps. Devant toi, trois dessins : une roue, une carte et une lumière. Choisis comment l'aider.",
    choices:[
      choice("⚙️","Regarder le dessin de la roue","gear_check","As-tu une roue d'horloge ?"),
      choice("🗺️","Regarder le dessin des étoiles","map_check","As-tu une carte des étoiles ?"),
      choice("💎","Regarder la lumière bleue","light_check","As-tu un objet pour l'allumer ?")
    ]
  };
  S.final_console.common=true;
  S.gear_check={chapter:"La dernière page",title:"La roue de l'horloge",art:"dalek",text:"Regarde ta roue verte. As-tu la roue d'horloge ?",itemCheck:{item:"clockGear",yes:"ending_clock",no:"ending_improvise"}};
  S.map_check={chapter:"La dernière page",title:"La carte des étoiles",art:"dalek",text:"Regarde ta roue bleue. As-tu la carte des étoiles ?",itemCheck:{item:"starMap",yes:"ending_map",no:"ending_signal"}};
  S.light_check={chapter:"La dernière page",title:"La lumière bleue",art:"dalek",text:"Regarde ta roue jaune. As-tu le cristal bleu ou la pile bleue ?",itemCheck:{anyItems:["blueCrystal","dalekCell"],yes:s=>s.inventory.includes("blueCrystal")?"ending_energy":"ending_cell",no:"ending_kind"}};
  S.ending_clock=end("Le grand tic-tac","Tu places la roue dans la machine. Tic, tac ! La bulle s'ouvre. « Tu as retrouvé le temps ! », dit le Docteur. Le Dalek fait clignoter sa lampe de joie.","Le temps retrouvé","dalek","clockGear");
  S.ending_improvise=end("Une idée à deux","Tu n'as pas la roue. Tu comptes « un, deux, trois » avec le Docteur et le Dalek. Au troisième tic, ils ouvrent la bulle ensemble !","Une fin à inventer ensemble","dalek");
  S.ending_map=end("Le chemin des étoiles","Tu poses la carte sur la machine. Les étoiles dessinent une porte et le Docteur en sort. « Bien joué, exploratrice ! »","Le chemin retrouvé","dalek","starMap");
  S.ending_signal=end("Une étoile dans la tête","Tu n'as pas la carte, mais tu te souviens d'une étoile bleue. Tu la montres au Dalek. Il règle la machine et libère le Docteur.","Une belle mémoire","dalek");
  S.ending_energy=end("La petite lumière bleue","Le cristal s'allume dans ta main. Sa lumière ouvre la bulle et le Docteur te rejoint. « Le TARDIS nous attend ! »","La lumière retrouvée","dalek","blueCrystal");
  S.ending_cell=end("La pile du petit robot","Tu branches la pile offerte par le robot. La bulle s'éteint doucement et le Docteur sort. Il promet de remercier ton nouvel ami.","Une aide précieuse","dalek","dalekCell");
  S.ending_kind=end("Tous ensemble","Tu n'as ni pile ni cristal. Tu demandes de l'aide au Dalek. Il éclaire la bulle pendant que le Docteur la pousse. Pop ! Vous êtes réunis.","La force de l'entraide","dalek");
  window.BOOK_01=book;
})();
