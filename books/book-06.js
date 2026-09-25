// Une adaptation douce de « Tooth and Claw » : Ecosse, 1879.
(() => {
  const book = {
    id:"book-06", title:"La Nuit de Torchwood",
    subtitle:"En Écosse, Rose et le Docteur rencontrent la reine Victoria. Dans un grand manoir, une ombre de loup suit la lune…",
    start:"arrival",
    heroes:{
      rose:{name:"Rose Tyler",short:"Rose",icon:"🌹",trait:"Elle écoute les autres et sait les rassurer."},
      doctor:{name:"Le Docteur",short:"Docteur",icon:"✦",trait:"Il comprend les étranges machines et pose mille questions."}
    },
    items:{
      ribbon:{name:"Ruban bleu",icon:"🎀"},
      lantern:{name:"Petite lanterne",icon:"🏮"},
      drawing:{name:"Dessin du miroir",icon:"🪞"},
      key:{name:"Clé de cuivre",icon:"🗝️"},
      prism:{name:"Prisme de verre",icon:"🔷"},
      note:{name:"Note d'Albert",icon:"✉️"}
    }, scenes:{}
  };
  const S=book.scenes;
  const choice=(icon,label,next,hint)=>({icon,label,next,hint});
  const decision=(chapter,title,text,art,choices)=>({chapter,title,text,art,choices});
  const page=(chapter,title,text,art,next,giveItem,flags)=>({chapter,title,text,art,next,...(giveItem?{giveItem}:{}),...(flags?{flags}:{})});
  const ending=(title,text,endLabel,art)=>({chapter:"Une nouvelle histoire commence",title,text,end:true,endLabel,art});

  S.arrival=decision("Écosse · 1879","La voiture de la reine",s=>`${book.heroes[s.hero].short} sort du TARDIS avec ${s.hero==="rose"?"le Docteur":"Rose"}. Sur la route, une voiture s'arrête : la reine Victoria se rend au manoir de Torchwood. La nuit tombe et un drôle de hurlement vient des collines.`,"moor",[
    choice("👑","Saluer la reine","queen_greeting","Elle aime les paroles franches."),
    choice("👣","Observer les traces dans la boue","tracks","Elles mènent vers le manoir."),
    choice("🏮","Aider à éclairer le chemin","road_lantern","La nuit arrive vite.")
  ]);
  S.queen_greeting=page("Sur la route","Une promesse à Victoria","Rose et le Docteur se présentent. Victoria leur demande de rester près de sa voiture. « Ce soir, personne ne marche seul. »","queen","manor_gate",null,{trust:1});
  S.tracks=page("Sur la route","Des pas et des pattes","Près d'une roue, deux sortes de traces se croisent. Le Docteur dessine leur forme dans la terre. Elles vont toutes vers Torchwood.","moor","manor_gate",null,{clue:1});
  S.road_lantern=page("Sur la route","Une lumière pour tous","Tu tiens une petite lanterne pendant que la voiture traverse le brouillard. Victoria te remercie. Plus loin, une grande maison apparaît.","moor","manor_gate","lantern",{trust:1});

  S.manor_gate=decision("Torchwood","La maison aux grandes fenêtres","Le manoir semble calme. Mais les domestiques parlent tout bas, et une fenêtre s'ouvre puis se referme à l'étage. Où vas-tu en premier ?","manor",[
    choice("👩","Écouter les domestiques","servants","Ils connaissent les secrets de la maison."),
    choice("📚","Entrer dans la bibliothèque","library_arrival","Un vieux livre est resté ouvert."),
    choice("🪟","Regarder la fenêtre du haut","window_trace","Quelqu'un attendait la lune.")
  ]);
  S.servants=page("Torchwood","Un secret murmuré","Les domestiques racontent qu'un invité est enfermé dans une pièce. Il a peur de la pleine lune, pas des gens. Tu promets de l'aider.","hall","hall_choice",null,{guest:1});
  S.library_arrival=page("Torchwood","Le livre d'Albert","Dans la bibliothèque, un dessin montre un grand télescope et un miroir sous le toit. Le prince Albert avait préparé quelque chose ici.","library","hall_choice",null,{clue:1});
  S.window_trace=page("Torchwood","Une ombre derrière la vitre","Une silhouette passe devant la fenêtre, puis disparaît. Tu remarques un couloir qui mène à l'étage et une petite porte de service.","manor","hall_choice",null,{clue:1});

  S.hall_choice=decision("Dans le manoir","La lune se lève","Victoria entre dans le grand hall. Un grondement résonne au-dessus d'elle. Rose et le Docteur veulent la mettre en sécurité, mais ils ignorent encore ce qui se cache là-haut.","hall",[
    choice("👑","Rester près de Victoria","queen_room","La reine veut comprendre."),
    choice("🚪","Chercher l'invité effrayé","guest_room","Il pourrait raconter ce qu'il a vu."),
    choice("🔭","Monter voir le télescope","observatory_first","Le dessin du livre mène au toit.")
  ]);
  S.queen_room=decision("Près de Victoria","La salle des portraits","Victoria garde son calme. Trois portraits montrent le prince Albert devant un miroir rond. Un petit coffre est posé sous la fenêtre.","queen",[
    choice("💬","Demander ce qu'Albert étudiait",s=>s.hero==="rose"?"rose_listens":"doctor_questions","Rose sait écouter ; le Docteur sait questionner."),
    choice("🎨","Dessiner la forme du miroir","mirror_drawing","Le dessin pourra servir plus tard."),
    choice("🗝️","Regarder sous le coffre","copper_key","Une clé brille par terre.")
  ]);
  S.rose_listens=page("Salle des portraits","Victoria se confie","Rose écoute Victoria parler d'Albert. Il espérait qu'un jour son télescope aiderait les gens. Victoria lui confie une petite note.","queen","moon_howl","note",{trust:1,clue:1});
  S.doctor_questions=page("Salle des portraits","La question du Docteur","« Pourquoi un miroir aussi grand ? » demande le Docteur. Victoria se souvient : Albert voulait guider la lumière de la lune jusque dans la salle du haut.","queen","moon_howl",null,{clue:1});
  S.mirror_drawing=page("Salle des portraits","Un cercle sur le papier","Tu dessines le miroir et une flèche vers le toit. Même dans le noir, tu sauras où diriger la lumière.","library","moon_howl","drawing",{clue:1});
  S.copper_key=page("Salle des portraits","La clé oubliée","Une petite clé de cuivre était cachée sous le coffre. Elle ouvre la porte de service qui monte à l'observatoire.","queen","moon_howl","key",{clue:1});

  S.guest_room=decision("Le couloir","Une voix derrière la porte","Derrière la porte, un jeune invité demande de l'aide. Il n'a pas choisi de devenir un loup. Il voudrait seulement que la nuit se termine sans blesser personne.","corridor",[
    choice("🤝","Lui promettre de l'aider","guest_promise","Une parole gentille l'apaise."),
    choice("👂","Écouter ce qui se passe au-dessus","wolf_sound","Le toit grince sous des pas."),
    choice("🎀","Attacher un ruban à la porte","ribbon_mark","On pourra retrouver la pièce.")
  ]);
  S.guest_promise=page("Le couloir","Une promesse douce","L'invité respire plus calmement. Il explique que les moines l'ont amené ici et que la lumière spéciale d'Albert pourrait l'aider.","corridor","moon_howl",null,{guest:1,trust:1});
  S.wolf_sound=page("Le couloir","Sur les tuiles","En écoutant, tu comprends que le loup cherche le télescope. Tu préviens Rose, le Docteur et Victoria avant qu'il n'arrive.","roof","moon_howl",null,{clue:1});
  S.ribbon_mark=page("Le couloir","Un fil pour retrouver la route","Le ruban bleu reste noué à la poignée. Tu pourras revenir aider l'invité si le couloir devient sombre.","corridor","moon_howl","ribbon",{guest:1});

  S.observatory_first=decision("Sous le toit","La machine d'Albert","Au sommet du manoir, un télescope pointe vers la pleine lune. Un miroir dort dans son support. L'escalier grince : quelqu'un approche.","observatory",[
    choice("🪞","Lire les notes d'Albert","albert_note","Ses instructions sont près du miroir."),
    choice("🔷","Chercher la pièce de verre","glass_prism","Le télescope a une place vide."),
    choice("🚪","Fermer doucement la porte","safe_door","Cela donnera du temps à Victoria.")
  ]);
  S.albert_note=page("Sous le toit","L'idée d'Albert","Un dessin explique comment faire passer un rayon de lune dans le prisme. Ce rayon peut apaiser la créature et protéger Victoria.","observatory","moon_howl","note",{clue:1});
  S.glass_prism=page("Sous le toit","Une pièce cachée","Sous un drap, tu trouves le prisme de verre. Ses faces font danser de petites lunes sur le mur.","observatory","moon_howl","prism",{clue:1});
  S.safe_door=page("Sous le toit","Une minute de plus","Tu fermes la porte sans bruit. En bas, la reine a le temps de se mettre à l'abri. Une lumière filtre encore sous le battant.","observatory","moon_howl",null,{trust:1});

  S.moon_howl=decision("La pleine lune","Le loup dans le hall","Le jeune invité est devenu un grand loup aux yeux brillants. Il grogne, mais recule quand tu parles doucement. Victoria monte à l'abri. Il faut préparer la machine d'Albert avant que les moines la dérèglent.","wolf",[
    choice("🤝","Guider le loup sans le brusquer",s=>s.hero==="rose"?"rose_wolf":"doctor_wolf","Rose l'apaise ; le Docteur comprend son mouvement."),
    choice("🔭","Aller régler le télescope","telescope_ready","La lune brille juste au-dessus du toit."),
    choice("👑","Aider Victoria à monter","queen_safe","La reine pourra voir la machine fonctionner.")
  ]);
  S.rose_wolf=page("La pleine lune","La voix de Rose","Rose parle au jeune invité comme à un ami. Le loup s'arrête devant l'escalier, assez longtemps pour qu'ils passent sans courir.","wolf","light_choice",null,{guest:1,trust:1});
  S.doctor_wolf=page("La pleine lune","L'idée du Docteur","Le Docteur comprend que le loup suit les reflets sur le mur. Il l'attire vers l'observatoire avec une petite tache de lumière.","wolf","light_choice",null,{clue:1});
  S.telescope_ready=page("Sous le toit","Le cercle de lune","Le télescope pivote lentement. Un rond blanc apparaît sur le plafond. Il manque encore un réglage pour que la lumière touche le miroir.","observatory","light_choice",null,{clue:1});
  S.queen_safe=page("Sous le toit","Victoria tient bon","La reine te suit sur l'escalier. Elle reconnaît aussitôt l'installation d'Albert et t'indique le miroir à déplacer.","queen","light_choice",null,{trust:1});

  S.light_choice=decision("L'observatoire","Une lumière à guider","Le loup arrive sur le seuil. La lune éclaire le télescope. Il suffit d'une bonne idée pour guider son rayon vers le miroir et aider le jeune invité.","observatory",[
    {...choice("🔷","Placer le prisme, si tu l'as","prism_beam","Vérifie ta roue jaune."),requiresItem:"prism",otherwise:{label:"Utiliser le miroir sans prisme",next:"empty_prism"}},
    {...choice("🪞","Suivre le dessin, si tu l'as","mirror_beam","Vérifie ta roue bleue."),requiresAnyItem:["drawing","note"],otherwise:{label:"Demander à Victoria ce qu'Albert disait",next:"ask_albert"}},
    choice("🤝","Demander à tous de tenir le miroir","shared_beam","Plusieurs mains peuvent le guider ensemble.")
  ]);
  S.prism_beam=page("La lumière","Les petites lunes dansent","Tu places le prisme dans le télescope. Ses reflets se rejoignent sur le grand miroir. Le loup s'immobilise dans une douce clarté.","moonlight","after_light",null,{guest:1,clue:1});
  S.empty_prism=page("La lumière","Un reflet sur le mur","Le prisme manque. Tu tournes le miroir vers une fenêtre : un fin rayon de lune suffit à montrer la direction.","moonlight","after_light",null,{clue:1});
  S.mirror_beam=page("La lumière","Le dessin avait raison","Avec ton dessin ou la note d'Albert, tu règles le miroir. Une grande lune argentée éclaire la pièce sans effrayer le loup.","moonlight","after_light",null,{clue:1});
  S.ask_albert=page("La lumière","Victoria se souvient","Tu n'as pas le dessin. Victoria se souvient d'un jeu qu'Albert lui montrait : orienter un miroir jusqu'à voir la lune au plafond.","moonlight","after_light",null,{trust:1});
  S.shared_beam=page("La lumière","Chacun tient un coin","Rose, le Docteur, Victoria et toi poussez doucement le support du miroir. Le rayon touche le centre de la pièce. Ensemble, vous y arrivez.","moonlight","after_light",null,{trust:1,guest:1});

  S.after_light=decision("L'aube","Le loup redevient un garçon","La lumière d'Albert apaise le loup. Le jeune invité retrouve sa forme humaine. Les moines s'enfuient dans les collines. Victoria regarde le ciel qui pâlit : elle veut que les choses étranges de cette nuit soient étudiées.","dawn",[
    choice("👑","Raconter à Victoria comment vous l'avez aidé",s=>s.flags.guest?"ending_kind":"ending_queen","La reine écoute ton histoire."),
    choice("✉️","Lui montrer la note ou les indices",s=>s.inventory.includes("note")||s.flags.clue?"ending_archive":"ending_queen","Ses souvenirs formeront de nouvelles archives."),
    choice("🌅","Accompagner le garçon dehors","ending_guest","Il a besoin d'un nouveau départ.")
  ]);
  S.ending_kind=ending("Une maison pour protéger","Victoria promet que le garçon ne sera plus seul. Elle fonde Torchwood pour comprendre l'inconnu et protéger son peuple. Puis elle dit au Docteur et à Rose qu'ils doivent repartir. Le TARDIS les attend.","La promesse tenue","dawn");
  S.ending_queen=ending("La décision de Victoria","Victoria remercie ses invités, mais elle se méfie de ce qu'elle ne comprend pas. Elle fonde Torchwood pour enquêter sur les mystères venus d'ailleurs. Rose et le Docteur repartent dans le TARDIS au petit matin.","La naissance de Torchwood","dawn");
  S.ending_archive=ending("Les dessins de Torchwood","La reine conserve le dessin et les notes d'Albert. Ils deviennent les premières archives de Torchwood, fondé pour étudier les dangers inconnus. Victoria prend congé de Rose et du Docteur ; le TARDIS s'éloigne.","Les premières archives","dawn");
  S.ending_guest=ending("Un matin paisible","Le garçon regarde le soleil sans avoir peur. Victoria promet de protéger les gens et de comprendre ce qui est arrivé : elle appelle son nouvel institut Torchwood. Rose et le Docteur repartent dans leur boîte bleue.","Un nouveau départ","dawn");
  window.BOOK_06=book;
})();
