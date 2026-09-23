(() => {
"use strict";
const books=[window.BOOK_01,window.BOOK_02,window.BOOK_03,window.BOOK_04,window.BOOK_05].filter(Boolean);
const root=document.getElementById("app");let book=books[0],heroCursor=0;
const state={hero:null,inventory:[null,null,null],flags:{},scene:null,history:[],changed:-1};
const meta={"book-01":["Boucle temporelle","Le temps s'est cassé."],"book-02":["Mystère","Ne détourne pas les yeux."],"book-03":["Aventure","Un dinosaure est perdu à Londres."],"book-04":["Exploration","Le TARDIS a mélangé ses pièces."],"book-05":["Épopée","Un Dalek demande de l'aide."]};
const slots={
 "book-01":{clockGear:0,feather:1,starMap:1,dalekCell:2,blueCrystal:2},
 "book-02":{camera:0,keycard:0,mirror:1,chalk:1,battery:2,postcard:2},
 "book-03":{whistle:0,rope:0,key:0,leaf:1,eggShell:1,tracker:2},
 "book-04":{blueThread:0,compass:0,roomKey:0,libraryCard:1,teaCup:1,crystal:2},
 "book-05":{starKey:0,shieldBadge:0,memoryChip:1,seed:1,powerCell:2,prism:2}
};
const esc=(v="")=>String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]));
const ART=window.DW_ART||{scene:()=>"",cover:()=>"",avatar:()=>""};

const Feedback={enabled:localStorage.getItem("dw_sound")!=="off",ctx:null,
 tone(f=440,d=.04,v=.016,t="sine"){if(!this.enabled)return;const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;if(!this.ctx)this.ctx=new AC();const o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type=t;o.frequency.value=f;g.gain.setValueAtTime(v,this.ctx.currentTime);g.gain.exponentialRampToValueAtTime(.0001,this.ctx.currentTime+d);o.connect(g);g.connect(this.ctx.destination);o.start();o.stop(this.ctx.currentTime+d)},
 vib(ms=18){try{window.AndroidBridge?.vibrate?window.AndroidBridge.vibrate(ms):navigator.vibrate?.(ms)}catch(_){}},
 turn(){this.tone(310,.035,.012,"triangle");setTimeout(()=>this.tone(390,.04,.01,"triangle"),30);this.vib(18)},
 item(){this.tone(620,.045,.018);setTimeout(()=>this.tone(820,.07,.016),45);this.vib(28)},
 toggle(){this.enabled=!this.enabled;localStorage.setItem("dw_sound",this.enabled?"on":"off");soundButton()}
};
function soundButton(){const b=document.getElementById("global-sound-toggle");if(b){b.textContent=Feedback.enabled?"🔊":"🔇";b.title=Feedback.enabled?"Couper les sons":"Activer les sons"}}
function reset(){state.hero=null;state.inventory=[null,null,null];state.flags={};state.scene=null;state.history=[];state.changed=-1}
function item(id){return id?(book.items[id]||{name:id,icon:"?"}):{name:"Vide",icon:"○"}}
function sig(){return state.hero?book.heroes[state.hero].item.id:null}
function has(id){return state.inventory.includes(id)||sig()===id}
function slotFor(id){const m=slots[book.id]||{};if(Number.isInteger(m[id]))return m[id];return Math.abs([...id].reduce((a,c)=>a+c.charCodeAt(0),0))%3}
function add(id){if(!id||has(id))return;const i=slotFor(id);state.inventory[i]=id;state.changed=i;Feedback.item()}
function remove(id){if(id){const i=state.inventory.indexOf(id);if(i>=0){state.inventory[i]=null;state.changed=i}}}
function flags(o){if(!o)return;Object.entries(o).forEach(([k,v])=>state.flags[k]=typeof v==="number"?(state.flags[k]||0)+v:v)}
function view(){return {...state,item:state.inventory.find(Boolean)||null}}
function resolve(value){return typeof value==="function"?value(view()):value}

function coverCard(b,i){
 const m=meta[b.id]||["Aventure",""];
 return `<button class="book-cover" data-book="${i}">
   <div class="cover-art">${ART.cover(b.id)}</div>
   <div class="cover-brand">DOCTOR WHO · PETITES AVENTURES</div>
   <div class="cover-title">${esc(b.title)}</div>
   <div class="cover-tag">${esc(m[0])}</div>
 </button>`
}
function home(){
 reset();
 root.innerHTML=`<section class="library-screen">
   <header class="library-head"><div class="series-mark">DOCTOR WHO</div><h1>Choisis ton livre</h1><p>Cinq aventures à lire, rejouer et explorer autrement.</p></header>
   <div class="cover-shelf">${books.map(coverCard).join("")}</div>
   <div class="library-actions"><button class="secondary" id="how">Comment jouer ?</button></div>
 </section>`;
 document.querySelectorAll("[data-book]").forEach(x=>x.onclick=()=>{book=books[+x.dataset.book];heroCursor=0;Feedback.turn();intro()});
 document.getElementById("how").onclick=tutorial
}
function tutorial(){
 root.innerHTML=`<section class="tutorial card">
   <div class="kicker">Comment jouer</div><h1>Un livre, quatre roues, trois volets</h1>
   <div class="tutorial-grid">
     <article><b class="tutorial-num">1</b><h2>Choisis ton héros</h2><p>Tourne la roue rouge. Le personnage choisi peut changer certaines rencontres.</p></article>
     <article><b class="tutorial-num">2</b><h2>Commence les mains vides</h2><p>Les roues verte, bleue et jaune sont vides. Elles se remplissent avec des objets, indices ou états.</p></article>
     <article><b class="tutorial-num">3</b><h2>Choisis un volet</h2><p>À chaque grande scène, choisis une seule des trois bandes de la page de droite et tourne-la.</p></article>
     <article><b class="tutorial-num">4</b><h2>Regarde tes roues</h2><p>Un personnage ou un objet peut ouvrir une solution différente. La fin dépend aussi de ce que tu as gardé.</p></article>
   </div><button class="primary" id="ok">J'ai compris</button>
 </section>`;
 document.getElementById("ok").onclick=home
}
function intro(){
 reset();const m=meta[book.id]||["Aventure",""];
 root.innerHTML=`<section class="cover-open card">
   <div class="cover-open-art">${ART.cover(book.id)}</div>
   <div class="cover-open-copy"><div class="cover-brand">DOCTOR WHO · PETITES AVENTURES</div><h1>${esc(book.title)}</h1><p>${esc(book.subtitle)}</p><div class="cover-tag">${esc(m[0])}</div>
   <button class="primary" id="start">Ouvrir le livre</button><button class="secondary" id="back">← Bibliothèque</button></div>
 </section>`;
 document.getElementById("start").onclick=heroPage;document.getElementById("back").onclick=home
}
function heroPage(){
 const entries=Object.entries(book.heroes),[id,h]=entries[heroCursor];
 root.innerHTML=`<section class="book-frame setup-frame">
   <div class="spiral"></div>
   <div class="setup-left page-paper"><div class="setup-art">${ART.cover(book.id)}</div><div class="story-ribbon"><strong>Qui veux-tu être pour cette aventure ?</strong><span>Chaque héros a un talent différent.</span></div></div>
   <div class="setup-right page-paper">
     <div class="hero-options">${entries.map(([k,x],i)=>`<button class="hero-option ${i===heroCursor?"selected":""}" data-hero-index="${i}">${ART.avatar(k,x.name)}<strong>${esc(x.name)}</strong><small>${esc(x.trait)}</small></button>`).join("")}</div>
     <div class="setup-note">Choisis bien : ton personnage peut changer la suite de l'histoire.</div>
   </div>
   ${wheelMarkup(0,"top-left",true)}${wheelMarkup(1,"top-right",true)}${wheelMarkup(2,"bottom-left",true)}
   <button class="hero-wheel-select bottom-right" id="confirm">${ART.avatar(id,h.name)}<span>${esc(h.short)}</span><small>${h.item.icon} talent</small></button>
 </section>`;
 document.querySelectorAll("[data-hero-index]").forEach(x=>x.onclick=()=>{heroCursor=+x.dataset.heroIndex;Feedback.turn();heroPage()});
 document.getElementById("confirm").onclick=()=>start(id)
}
function start(id){reset();state.hero=id;state.flags={courage:0,brave:0,clues:0,mercy:0,kind:0,careful:0};state.scene=book.start;Feedback.turn();renderScene()}
function allowed(c){if(c.requiresItem&&!has(c.requiresItem))return false;if(c.requiresHero&&state.hero!==c.requiresHero)return false;if(c.requiresFlag&&!state.flags[c.requiresFlag])return false;return true}
function choiceFor(c){return !allowed(c)&&c.otherwise?{icon:c.icon,...c.otherwise}:c}
function lock(c){
 if(c.requiresItem&&!has(c.requiresItem)){const owner=Object.values(book.heroes).find(h=>h.item.id===c.requiresItem);return owner?`Talent de ${owner.name}`:`Il faut ${item(c.requiresItem).name}`}
 if(c.requiresHero&&state.hero!==c.requiresHero)return"Un autre héros ferait autrement";
 if(c.requiresFlag&&!state.flags[c.requiresFlag])return"Il te manque un indice";return""
}
function apply(s){state.changed=-1;if(s.giveItem)add(s.giveItem);if(typeof s.removeItem==="string")remove(s.removeItem);flags(s.flags)}
function turnChoice(c,btn){
 if(!allowed(c)){btn.classList.add("nope");setTimeout(()=>btn.classList.remove("nope"),300);return}
 if(root.dataset.turning)return;
 root.dataset.turning="yes";
 btn.classList.add("turning");Feedback.turn();
 setTimeout(()=>{if(c.setItem!==undefined)add(c.setItem);flags(c.flags);const next=resolve(c.next);if(c.removeItem)remove(c.removeItem);state.history.push(state.scene);state.scene=next;delete root.dataset.turning;renderScene()},330)
}
function wheelMarkup(i,pos,forceEmpty=false){
 const id=forceEmpty?null:state.inventory[i],it=item(id),color=["green","blue","yellow"][i];
 return `<aside class="book-wheel wheel-${color} ${pos} ${state.changed===i?"changed":""}"><div class="wheel-face"><span class="wheel-notch"></span><span class="wheel-icon">${it.icon}</span><span class="wheel-name">${esc(it.name)}</span></div></aside>`
}
function heroWheel(){
 const h=book.heroes[state.hero];
 return `<aside class="book-wheel wheel-red bottom-right"><div class="wheel-face hero-face">${ART.avatar(state.hero,h.name)}<span class="wheel-name">${esc(h.short)}</span></div></aside>`
}
function renderScene(){
 const s=book.scenes[state.scene];if(!s){root.innerHTML='<section class="tutorial card"><h1>Scène introuvable</h1><button class="primary" id="home">Retour</button></section>';document.getElementById("home").onclick=home;return}
 apply(s);if(s.end)return ending(s);
 const txt=resolve(s.text);
 root.innerHTML=`<section class="book-frame adventure-frame">
   <div class="spiral"></div>
   <article class="scene-page page-paper">
     <div class="scene-picture">${ART.scene(book.id,s)}<div class="chapter-chip">${esc(s.chapter||"Aventure")}</div></div>
     <div class="narrative-box"><h2>${esc(s.title)}</h2><p>${esc(txt)}</p>${s.event?`<div class="event-line">${esc(s.event)}</div>`:""}${s.guide?`<div class="page-guide">${esc(resolve(s.guide))}</div>`:""}<strong>Que veux-tu faire ?</strong></div>
   </article>
   <aside class="choice-page page-paper" aria-label="Les trois volets de l'histoire">
     ${s.choices.map((c,i)=>choiceFlap(c,i,s)).join("")}
   </aside>
   ${wheelMarkup(0,"top-left")}${wheelMarkup(1,"top-right")}${wheelMarkup(2,"bottom-left")}${heroWheel()}
   <button class="book-menu" id="menu" aria-label="Menu">☰</button>
 </section>`;
 document.querySelectorAll("[data-choice]").forEach(x=>x.onclick=()=>turnChoice(choiceFor(s.choices[+x.dataset.choice]),x));
 document.getElementById("menu").onclick=menu
}
function choiceFlap(c,i,s){
 c=choiceFor(c);
 const ok=allowed(c),labels=["Haut","Milieu","Bas"],label=resolve(c.label),hint=resolve(c.hint);
 return `<button class="page-flap flap-${i+1} ${ok?"":"locked"}" data-choice="${i}" aria-label="Volet ${labels[i]} : ${esc(label)}">
   <div class="flap-art">${ART.scene(book.id,s)}<span class="flap-emblem" aria-hidden="true">${esc(c.icon||"✦")}</span></div>
   <div class="flap-copy"><span class="flap-number">${labels[i]}</span><strong>${esc(label)}</strong><small>${esc(ok?(hint||"Tourne ce volet"):lock(c))}</small></div>
   <span class="page-turn-icon">↗</span>
 </button>`
}
function menu(){
 root.innerHTML+=`<div class="menu-overlay" id="overlay"><div class="menu-card"><h2>${esc(book.title)}</h2><button class="primary" id="resume">Continuer</button><button class="secondary" id="restart">Recommencer le livre</button><button class="secondary" id="library">Bibliothèque</button></div></div>`;
 document.getElementById("resume").onclick=()=>document.getElementById("overlay").remove();
 document.getElementById("restart").onclick=heroPage;document.getElementById("library").onclick=home
}
function ending(s){
 const txt=typeof s.text==="function"?s.text(view()):s.text,its=state.inventory.filter(Boolean).map(x=>item(x));
 root.innerHTML=`<section class="book-frame adventure-frame ending-frame"><div class="spiral"></div>
   <article class="scene-page page-paper"><div class="scene-picture">${ART.scene(book.id,s)}</div><div class="narrative-box"><div class="end-rank">${esc(s.endLabel||"Fin")}</div><h2>${esc(s.title)}</h2><p>${esc(txt)}</p></div></article>
   <aside class="choice-page page-paper ending-page"><h2>Ton aventure</h2><div class="ending-inventory">${[0,1,2].map(i=>{const it=item(state.inventory[i]);return `<div class="ending-token wheel-${["green","blue","yellow"][i]}"><span>${it.icon}</span><strong>${esc(it.name)}</strong></div>`}).join("")}</div><button class="primary" id="again">Rejouer</button><button class="secondary" id="other">Un autre livre</button></aside>
   ${wheelMarkup(0,"top-left")}${wheelMarkup(1,"top-right")}${wheelMarkup(2,"bottom-left")}${heroWheel()}
 </section>`;
 document.getElementById("again").onclick=heroPage;document.getElementById("other").onclick=home
}
document.getElementById("global-sound-toggle")?.addEventListener("click",()=>Feedback.toggle());soundButton();home();
})();
