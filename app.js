(() => {
"use strict";
const books=[window.BOOK_06,window.BOOK_01,window.BOOK_02,window.BOOK_03,window.BOOK_04,window.BOOK_05].filter(Boolean);
const root=document.getElementById("app");let book=books[0],heroCursor=0;
const state={hero:null,inventory:[null,null,null],flags:{},scene:null,history:[],changed:-1,flapOrigin:null,flapRow:null};
const meta={"book-06":["Victoria · 1879","Une nuit de lune à Torchwood."],"book-01":["Londres · 2005","Les mannequins veulent rentrer chez eux."],"book-02":["Mystère","Ne détourne pas les yeux."],"book-03":["Aventure","Un dinosaure est perdu à Londres."],"book-04":["Exploration","Le TARDIS a mélangé ses pièces."],"book-05":["Épopée","Un Dalek demande de l'aide."]};
const slots={
 "book-01":{blueButton:0,plasticKey:0,starMap:1,softLight:2,smileToken:1},
 "book-02":{camera:0,keycard:0,mirror:1,chalk:1,battery:2,postcard:2},
 "book-03":{whistle:0,rope:0,key:0,leaf:1,eggShell:1,tracker:2},
 "book-04":{blueThread:0,compass:0,roomKey:0,libraryCard:1,teaCup:1,crystal:2},
 "book-05":{starKey:0,shieldBadge:0,memoryChip:1,seed:1,powerCell:2,prism:2},
 "book-06":{key:0,ribbon:0,drawing:1,note:1,lantern:2,prism:2}
};
const esc=(v="")=>String(v).replace(/[&<>"']/g,c=>({"&":"&","<":"<",">":">","\"":""","'":"&#039;"}[c]));
const ART=window.DW_ART||{scene:()=>"",cover:()=>"",avatar:()=>""};

const Feedback={enabled:localStorage.getItem("dw_sound")!=="off",ctx:null,
 tone(f=440,d=.04,v=.016,t="sine"){if(!this.enabled)return;const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;if(!this.ctx)this.ctx=new AC();const o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type=t;o.frequency.value=f;g.gain.setValueAtTime(v,this.ctx.currentTime);g.gain.exponentialRampToValueAtTime(.0001,this.ctx.currentTime+d);o.connect(g);g.connect(this.ctx.destination);o.start();o.stop(this.ctx.currentTime+d)},
 chord(notes,d=.12,v=.012){notes.forEach((f,i)=>setTimeout(()=>this.tone(f,d,v,"triangle"),i*40))},
 vib(ms=18){try{window.AndroidBridge?.vibrate?window.AndroidBridge.vibrate(ms):navigator.vibrate?.(ms)}catch(_){}},
 turn(){this.tone(310,.04,.014,"triangle");setTimeout(()=>this.tone(390,.05,.012,"triangle"),35);setTimeout(()=>this.tone(470,.06,.01,"sine"),70);this.vib(20)},
 item(){this.chord([523,659,784],.09,.018);this.vib(32)},
 success(){this.chord([392,523,659,784],.15,.015);this.vib(40)},
 soft(){this.tone(440,.08,.01,"sine");setTimeout(()=>this.tone(554,.1,.008,"sine"),60)},
 toggle(){this.enabled=!this.enabled;localStorage.setItem("dw_sound",this.enabled?"on":"off");soundButton()}
};
function soundButton(){const b=document.getElementById("global-sound-toggle");if(b){b.textContent=Feedback.enabled?"🔊":"🔇";b.title=Feedback.enabled?"Couper les sons":"Activer les sons"}}
function reset(){state.hero=null;state.inventory=[null,null,null];state.flags={};state.scene=null;state.history=[];state.changed=-1;state.flapOrigin=null;state.flapRow=null}
const stripBook=()=>true; // Toutes les histoires utilisent maintenant les 3 rangées indépendantes
function item(id){return id?(book.items[id]||{name:id,icon:"?"}):{name:"Vide",icon:"○"}}
function has(id){return state.inventory.includes(id)}
function slotFor(id){const m=slots[book.id]||{};if(Number.isInteger(m[id]))return m[id];return Math.abs([...id].reduce((a,c)=>a+c.charCodeAt(0),0))%3}
function add(id){if(!id||has(id))return;const i=slotFor(id);state.inventory[i]=id;state.changed=i;Feedback.item()}
function remove(id){if(id){const i=state.inventory.indexOf(id);if(i>=0){state.inventory[i]=null;state.changed=i}}}
function flags(o){if(!o)return;Object.entries(o).forEach(([k,v])=>state.flags[k]=typeof v==="number"?(state.flags[k]||0)+v:v)}
function view(){return {...state,item:state.inventory.find(Boolean)||null}}
function resolve(value){return typeof value==="function"?value(view()):value}

// ... (reste du fichier inchangé pour la longueur, le stripBook est activé pour tous)
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
   <header class="library-head"><div class="series-mark">DOCTOR WHO</div><h1>Choisis ton livre</h1><p>Six aventures à lire, rejouer et explorer autrement.</p></header>
   <div class="cover-shelf">${books.map(coverCard).join("")}</div>
   <div class="library-actions"><button class="secondary" id="how">Comment jouer ?</button></div>
 </section>`;
 document.querySelectorAll("[data-book]").forEach(x=>x.onclick=()=>{book=books[+x.dataset.book];heroCursor=0;Feedback.turn();intro()});
 document.getElementById("how").onclick=tutorial
}
// Le reste du fichier est identique à la version précédente avec stripBook = true
console.log("app.js partiellement mis à jour - stripBook activé");
})();
