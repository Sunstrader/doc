(() => {
"use strict";
const books=[window.BOOK_01,window.BOOK_02,window.BOOK_03,window.BOOK_04,window.BOOK_05].filter(Boolean);
const root=document.getElementById("app"); let book=books[0], heroCursor=0;
const state={hero:null,inventory:[null,null,null],flags:{},scene:null,history:[],changed:-1};
const meta={"book-01":["🕰️","Boucle temporelle"],"book-02":["👼","Mystère"],"book-03":["🦕","Aventure"],"book-04":["🚪","Exploration"],"book-05":["👁️","Épopée"]};
const esc=(v="")=>String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]));

const Feedback={
 enabled:localStorage.getItem("dw_sound")!=="off",ctx:null,
 tone(f=440,d=.05,v=.02,t="sine"){if(!this.enabled)return;const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;if(!this.ctx)this.ctx=new AC();const o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type=t;o.frequency.value=f;g.gain.setValueAtTime(v,this.ctx.currentTime);g.gain.exponentialRampToValueAtTime(.0001,this.ctx.currentTime+d);o.connect(g);g.connect(this.ctx.destination);o.start();o.stop(this.ctx.currentTime+d)},
 vib(ms=20){try{if(window.AndroidBridge?.vibrate)window.AndroidBridge.vibrate(ms);else navigator.vibrate?.(ms)}catch(_){}},
 page(){this.tone(330,.04,.014,"triangle");setTimeout(()=>this.tone(430,.05,.012,"triangle"),35);this.vib(20)},
 item(){this.tone(650,.05,.02);setTimeout(()=>this.tone(850,.08,.018),45);this.vib(28)},
 toggle(){this.enabled=!this.enabled;localStorage.setItem("dw_sound",this.enabled?"on":"off");soundButton()}
};
function soundButton(){const b=document.getElementById("global-sound-toggle");if(b){b.textContent=Feedback.enabled?"🔊":"🔇";b.title=Feedback.enabled?"Couper les sons":"Activer les sons"}}

function reset(){state.hero=null;state.inventory=[null,null,null];state.flags={};state.scene=null;state.history=[];state.changed=-1}
function item(id){return id?(book.items[id]||{name:id,icon:"?"}):{name:"Vide",icon:"○"}}
function sig(){return state.hero?book.heroes[state.hero].item.id:null}
function has(id){return state.inventory.includes(id)||sig()===id}
function add(id){
 if(!id||state.inventory.includes(id)||sig()===id)return;
 let i=state.inventory.findIndex(x=>!x);if(i<0)i=0;
 state.inventory[i]=id;state.changed=i;Feedback.item()
}
function remove(id){let i=id?state.inventory.indexOf(id):state.inventory.findIndex(Boolean);if(i>=0){state.inventory[i]=null;state.changed=i}}
function flags(o){if(!o)return;Object.entries(o).forEach(([k,v])=>state.flags[k]=typeof v==="number"?(state.flags[k]||0)+v:v)}
function viewState(){return {...state,item:state.inventory.find(Boolean)||null}}

function home(){
 reset();
 root.innerHTML=`<section class="home card collection-home"><div class="kicker">Doctor Who · Ma Première Aventure</div><h1 class="logo">Choisis ton aventure</h1><p class="subtitle">Une roue personnage, trois roues d'inventaire et trois volets à tourner.</p><div class="books-grid">${books.map((b,i)=>{const m=meta[b.id]||["✦","Aventure"];return `<button class="book-card" data-book="${i}"><span class="book-number">Livre ${i+1}</span><span class="book-cover-icon">${m[0]}</span><strong>${esc(b.title)}</strong><small>${m[1]} · ${Object.keys(b.scenes).length} scènes</small></button>`}).join("")}</div><p class="legal-note">Projet fan-made non officiel.</p></section>`;
 document.querySelectorAll("[data-book]").forEach(x=>x.onclick=()=>{book=books[+x.dataset.book];heroCursor=0;intro()})
}
function intro(){
 reset();const i=books.indexOf(book),m=meta[book.id]||["✦","Aventure"];
 root.innerHTML=`<section class="home card"><div class="book-badge">Livre ${i+1} sur ${books.length} · ${m[1]}</div><div class="book-cover-big">${m[0]}</div><h1 class="logo">${esc(book.title)}</h1><p class="subtitle">${esc(book.subtitle)}</p><button class="primary" id="start">Choisir mon personnage</button><button class="secondary" id="back">← Bibliothèque</button></section>`;
 document.getElementById("start").onclick=heroWheel;document.getElementById("back").onclick=home
}
function heroWheel(){
 const entries=Object.entries(book.heroes),[id,h]=entries[heroCursor];
 root.innerHTML=`<section class="hero-wheel-screen card"><div class="kicker">${esc(book.title)}</div><h1>Tourne la roue et choisis ton personnage</h1><p class="hero-wheel-help">Les trois roues d'objet sont <strong>vides au départ</strong>.</p><div class="hero-picker"><button class="wheel-arrow" id="prev">‹</button><button class="hero-big-wheel" id="pick"><span class="wheel-pointer"></span><span class="hero-wheel-icon">${h.icon}</span><span class="hero-wheel-name">${esc(h.name)}</span></button><button class="wheel-arrow" id="next">›</button></div><div class="hero-detail"><strong>${esc(h.trait)}</strong><small>Atout du personnage : ${h.item.icon} ${esc(h.item.name)}</small></div><div class="empty-wheels-preview"><span>🟢 ○ vide</span><span>🔵 ○ vide</span><span>🟡 ○ vide</span></div><button class="primary" id="choose">Je choisis ${esc(h.name)}</button><button class="secondary" id="back">← Retour</button></section>`;
 const rot=d=>{heroCursor=(heroCursor+d+entries.length)%entries.length;heroWheel()};
 document.getElementById("prev").onclick=()=>rot(-1);document.getElementById("next").onclick=()=>rot(1);document.getElementById("pick").onclick=()=>start(id);document.getElementById("choose").onclick=()=>start(id);document.getElementById("back").onclick=intro
}
function start(id){reset();state.hero=id;state.flags={courage:0,brave:0,clues:0,mercy:0,kind:0,careful:0};state.scene=book.start;Feedback.page();scene()}

function allowed(c){if(c.requiresItem&&!has(c.requiresItem))return false;if(c.requiresHero&&state.hero!==c.requiresHero)return false;if(c.requiresFlag&&!state.flags[c.requiresFlag])return false;return true}
function lock(c){
 if(c.requiresItem&&!has(c.requiresItem)){const owner=Object.values(book.heroes).find(h=>h.item.id===c.requiresItem);return owner?`Atout de ${owner.name}`:`Il faut : ${item(c.requiresItem).name}`}
 if(c.requiresHero&&state.hero!==c.requiresHero)return"Réservé à un autre personnage";
 if(c.requiresFlag&&!state.flags[c.requiresFlag])return"Il manque un indice";return""
}
function apply(s){state.changed=-1;if(s.giveItem)add(s.giveItem);if(s.removeItem)remove(typeof s.removeItem==="string"?s.removeItem:null);flags(s.flags)}
function go(c){if(!allowed(c))return;Feedback.page();if(c.setItem!==undefined)add(c.setItem);flags(c.flags);state.history.push(state.scene);state.scene=typeof c.next==="function"?c.next(viewState()):c.next;scene()}

function invWheel(i,pos){const it=item(state.inventory[i]),cols=["green","blue","yellow"];return `<aside class="corner-wheel wheel-${cols[i]} ${pos} ${state.changed===i?"changed":""}"><div class="mini-wheel"><span class="mini-pointer"></span><span class="mini-icon">${it.icon}</span><span class="mini-label">${esc(it.name)}</span></div></aside>`}
function heroCorner(){const h=book.heroes[state.hero];return `<aside class="corner-wheel hero-corner bottom-right"><div class="mini-wheel hero-mini-wheel"><span class="mini-pointer"></span><span class="mini-icon">${h.icon}</span><span class="mini-label">${esc(h.short)}</span></div></aside>`}
function frame(inner){return `<section class="physical-book">${invWheel(0,"top-left")}${invWheel(1,"top-right")}${invWheel(2,"bottom-left")}${heroCorner()}${inner}</section>`}

function scene(){
 const s=book.scenes[state.scene];if(!s){root.innerHTML='<section class="home card"><h1>Scène introuvable</h1></section>';return}
 apply(s);if(s.end)return ending(s);
 const txt=typeof s.text==="function"?s.text(viewState()):s.text;
 const ev=s.event?`<div class="event">${esc(s.event)}</div>`:"";
 const choices=s.choices.map((c,i)=>{const ok=allowed(c),names=["Volet du haut","Volet du milieu","Volet du bas"],cls=["flap-top","flap-mid","flap-bot"];return `<button class="choice book-flap ${cls[i]} ${ok?"":"locked"}" data-choice="${i}" ${ok?"":"disabled"}><span class="flap-tab">${names[i]}</span><span class="flap-main"><span class="ci">${c.icon||["🔷","🟨","🔺"][i]}</span><span>${esc(c.label)}</span></span><small>${esc(ok?(c.hint||""):lock(c))}</small></button>`}).join("");
 root.innerHTML=frame(`<article class="story card book-page"><div class="scene-art" data-tone="${s.tone||"blue"}"><span class="art-glyph">${s.glyph||"✦"}</span><div><div class="chapter">${esc(s.chapter||"Aventure")}</div><h2>${esc(s.title)}</h2></div></div><div class="story-body"><p class="story-text">${esc(txt)}</p>${ev}<div class="choices flaps">${choices}</div><div class="footer-actions"><button class="secondary" id="restart">↻ Recommencer</button><button class="secondary" id="home">⌂ Bibliothèque</button></div></div></article>`);
 document.querySelectorAll("[data-choice]").forEach(x=>x.onclick=()=>go(s.choices[+x.dataset.choice]));document.getElementById("restart").onclick=heroWheel;document.getElementById("home").onclick=home
}
function ending(s){
 const txt=typeof s.text==="function"?s.text(viewState()):s.text,its=state.inventory.filter(Boolean).map(x=>item(x).name);
 root.innerHTML=frame(`<article class="story card book-page end-card"><div class="scene-art" data-tone="${s.tone||"success"}"><span class="art-glyph">${s.glyph||"✨"}</span><div><div class="end-rank">${esc(s.endLabel||"Fin")}</div><h2>${esc(s.title)}</h2></div></div><div class="story-body"><p class="story-text">${esc(txt)}</p><div class="event">Inventaire final : <strong>${its.length?esc(its.join(" · ")):"aucun objet"}</strong>.</div><div class="end-actions"><button class="primary" id="again">Rejouer avec la roue personnage</button><button class="secondary" id="other">Un autre livre</button></div></div></article>`);
 document.getElementById("again").onclick=heroWheel;document.getElementById("other").onclick=home
}
const sound=document.getElementById("global-sound-toggle");if(sound){sound.onclick=()=>Feedback.toggle();soundButton()}
home();
})();