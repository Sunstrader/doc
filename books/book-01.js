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
      clockGear:{name:"Roue d'horloge",icon:"⚙️"},
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
  // Chaque volet initial ouvre son renvoi 1/2, une conséquence propre,
  // puis la jonction commune. On ne retourne pas explorer un autre volet.
  S.girl_entry={chapter:"Londres · la petite fille",title:"Une rencontre sous la pluie",art:"girl",text:"La petite fille serre un dessin contre elle. Elle a vu tomber une petite roue de l'horloge. Es-tu Rose ?",heroCheck:{hero:"rose",yes:"girl_rose_page",no:"girl_clara_page"}};
  S.girl_rose_page=result("Londres","La roue offerte","Rose écoute la petite fille. Ensemble, elles remettent une roue dans l'horloge. La pluie recommence à tomber ! La petite fille lui confie la roue de rechange.","girl","tardis_between","clockGear",{piece1:true,kind:true});
  S.girl_clara_page=result("Londres","Le dessin mouillé","Clara remarque sur le dessin une aiguille à l'envers. La petite fille la guide jusqu'au cadran ; elles la redressent ensemble. Tic, tac ! Le temps repart.","girl","tardis_between",null,{piece1:true,clues:1});
  S.tower_entry={chapter:"Londres · la tour",title:"La grande horloge",art:"tower",text:"Les aiguilles se sont arrêtées. Trois marques brillent près du cadran. Es-tu Clara ?",heroCheck:{hero:"clara",yes:"tower_clara_page",no:"tower_rose_page"}};
  S.tower_clara_page=result("Londres","Trois marques","Clara repère la roue coincée entre les trois marques. Le gardien l'aide à libérer le mécanisme. Ding ! Il lui confie une roue de rechange.","tower","tardis_between","clockGear",{piece1:true,clues:1});
  S.tower_rose_page=result("Londres","Un gardien rassuré","Rose demande au gardien de montrer l'escalier de l'horloge. Ensemble, ils redressent doucement l'aiguille bloquée. Ding ! Le temps repart.","tower","tardis_between",null,{piece1:true,kind:true});
  S.shop_entry={chapter:"Londres · la boutique",title:"Les montres endormies",art:"shop",text:"Toutes les montres de la boutique sont arrêtées. L'horloger cherche comment aider la grande horloge. Es-tu Rose ?",heroCheck:{hero:"rose",yes:"shop_rose_page",no:"shop_clara_page"}};
  S.shop_rose_page=result("Londres","L'horloger sourit","Rose écoute l'horloger. Il trouve une roue pour réparer la grande horloge et lui offre celle de rechange. Dans la rue, les gouttes de pluie se remettent à tomber.","shop","tardis_between","clockGear",{piece1:true,kind:true});
  S.shop_clara_page=result("Londres","La vitrine bleue","Clara voit dans le reflet de la vitrine la position des aiguilles. Elle la montre à l'horloger, qui règle la grande horloge. La rue bouge de nouveau !","shop","tardis_between",null,{piece1:true,clues:1});
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
