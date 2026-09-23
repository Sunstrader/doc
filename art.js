(() => {
  "use strict";

  const C = {
    ink:"#10243a", paper:"#f8efd5", paper2:"#efe0b7", blue:"#4bb6df",
    tardis:"#155b94", dark:"#07182f", cyan:"#83dcf3", gold:"#f5c95c",
    green:"#6cc58b", leaf:"#2e7b59", purple:"#69579b", red:"#c85757",
    orange:"#db8a43", grey:"#9bb0bc"
  };

  const wrap = (bg, body) => `
    <svg class="scene-svg" viewBox="0 0 1000 650" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <rect width="1000" height="650" fill="${bg}"/>
      ${body}
    </svg>`;

  const stars = () => Array.from({length:28},(_,i)=>{
    const x=(i*173)%980+10, y=(i*97)%480+10, r=(i%3)+1;
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity=".75"/>`;
  }).join("");

  const tardis = (x=690,y=250,s=1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <rect x="0" y="18" width="150" height="255" rx="4" fill="${C.tardis}"/>
      <rect x="-10" y="0" width="170" height="28" rx="3" fill="#0e4574"/>
      <rect x="22" y="52" width="46" height="45" fill="#d8eef8" stroke="#082b4c" stroke-width="6"/>
      <rect x="82" y="52" width="46" height="45" fill="#d8eef8" stroke="#082b4c" stroke-width="6"/>
      <rect x="18" y="115" width="54" height="132" fill="#184c78" stroke="#0a3559" stroke-width="5"/>
      <rect x="78" y="115" width="54" height="132" fill="#184c78" stroke="#0a3559" stroke-width="5"/>
      <rect x="53" y="-12" width="45" height="16" rx="8" fill="#e8f7ff"/>
      <rect x="-18" y="270" width="186" height="14" fill="#0d3b64"/>
    </g>`;

  const clock = () => `
    <rect y="470" width="1000" height="180" fill="#5b7860"/>
    <rect x="100" y="180" width="190" height="330" fill="#b98959"/>
    <polygon points="80,180 310,180 195,55" fill="#744a37"/>
    <circle cx="195" cy="250" r="66" fill="#f5e7be" stroke="#573b2e" stroke-width="12"/>
    <line x1="195" y1="250" x2="195" y2="205" stroke="#573b2e" stroke-width="11"/>
    <line x1="195" y1="250" x2="238" y2="250" stroke="#573b2e" stroke-width="11"/>
    <path d="M0 470 C170 410 300 520 470 460 S820 430 1000 490 V650 H0Z" fill="#305f52"/>
    ${tardis(700,300,.72)}
  `;

  const museum = () => `
    <rect y="455" width="1000" height="195" fill="#324559"/>
    <path d="M80 450 V180 Q500 20 920 180 V450Z" fill="#d7d0bd"/>
    <path d="M130 430 V220 Q500 90 870 220 V430Z" fill="#203c55"/>
    <g fill="#f2e7ca">
      <rect x="150" y="220" width="55" height="230"/><rect x="300" y="180" width="55" height="270"/>
      <rect x="645" y="180" width="55" height="270"/><rect x="795" y="220" width="55" height="230"/>
    </g>
    <circle cx="500" cy="260" r="85" fill="#8fc7d7" opacity=".6"/>
    <path d="M475 420 L520 305 L565 420Z" fill="#b8b8b8"/>
    <circle cx="520" cy="282" r="30" fill="#c8c8c8"/>
    <path d="M490 330 Q520 360 550 330" fill="none" stroke="#8a8a8a" stroke-width="8"/>
  `;

  const park = () => `
    <rect y="390" width="1000" height="260" fill="#6ab36e"/>
    <circle cx="90" cy="120" r="170" fill="#39775a"/><circle cx="880" cy="120" r="180" fill="#39775a"/>
    <rect x="70" y="230" width="38" height="250" fill="#71492e"/><rect x="850" y="235" width="42" height="245" fill="#71492e"/>
    <path d="M395 475 Q500 250 610 375 Q665 445 620 515 L570 520 Q590 455 545 420 Q500 390 470 455 L445 525Z" fill="#7aa66b"/>
    <circle cx="620" cy="365" r="52" fill="#7aa66b"/>
    <circle cx="638" cy="350" r="6" fill="#10243a"/>
    <path d="M410 478 L365 560 M448 500 L425 575 M560 500 L545 575" stroke="#5c8055" stroke-width="25" stroke-linecap="round"/>
    <path d="M590 350 Q690 270 765 295" stroke="#7aa66b" stroke-width="36" fill="none" stroke-linecap="round"/>
    ${tardis(125,330,.42)}
  `;

  const greenhouse = () => `
    <rect y="420" width="1000" height="230" fill="#437851"/>
    <path d="M110 430 Q500 40 890 430Z" fill="#b6e6d3" opacity=".45" stroke="#d7fff0" stroke-width="10"/>
    <path d="M500 100 V430 M305 165 V430 M695 165 V430" stroke="#6fa89a" stroke-width="7"/>
    <g fill="#2f8058"><ellipse cx="230" cy="420" rx="110" ry="38"/><ellipse cx="760" cy="430" rx="140" ry="45"/><ellipse cx="510" cy="455" rx="160" ry="52"/></g>
    <g fill="#70a75f"><ellipse cx="235" cy="340" rx="32" ry="105" transform="rotate(-35 235 340)"/><ellipse cx="755" cy="345" rx="32" ry="110" transform="rotate(35 755 345)"/></g>
  `;

  const lab = () => `
    <rect y="430" width="1000" height="220" fill="#223746"/>
    <rect x="80" y="110" width="840" height="390" rx="30" fill="#405c67"/>
    <circle cx="500" cy="310" r="145" fill="#142a3b" stroke="#70d6e7" stroke-width="18"/>
    <circle cx="500" cy="310" r="100" fill="#58a56c"/>
    <path d="M420 390 Q500 190 590 390" fill="#315b42"/>
    <rect x="130" y="170" width="160" height="95" rx="12" fill="#122638"/><rect x="710" y="170" width="160" height="95" rx="12" fill="#122638"/>
    <circle cx="205" cy="218" r="18" fill="#f5c95c"/><circle cx="785" cy="218" r="18" fill="#ef6a6a"/>
  `;

  const library = () => `
    <rect width="1000" height="650" fill="#352c4d"/>
    <g fill="#604d75"><rect x="40" y="75" width="250" height="500"/><rect x="710" y="75" width="250" height="500"/></g>
    <g fill="#d7aa5b">${Array.from({length:18},(_,i)=>`<rect x="${65+(i%3)*65}" y="${105+Math.floor(i/3)*75}" width="40" height="58"/>`).join("")}${Array.from({length:18},(_,i)=>`<rect x="${735+(i%3)*65}" y="${105+Math.floor(i/3)*75}" width="40" height="58"/>`).join("")}</g>
    <path d="M310 575 Q500 350 690 575Z" fill="#14263e"/>
    ${tardis(430,290,.55)}
  `;

  const beach = () => `
    <rect width="1000" height="360" fill="#80d5eb"/><circle cx="780" cy="95" r="52" fill="#f6d76f"/>
    <path d="M0 330 C220 280 390 420 600 350 S830 280 1000 340 V490 H0Z" fill="#3a9dcc"/>
    <path d="M0 470 C260 400 500 530 1000 435 V650 H0Z" fill="#e3c47c"/>
    <rect x="690" y="300" width="150" height="180" fill="#e86c5a"/><polygon points="670,300 860,300 765,225" fill="#fff0d0"/>
  `;

  const heart = () => `
    <rect width="1000" height="650" fill="#07182f"/>${stars()}
    <circle cx="500" cy="320" r="160" fill="#1b5c91" opacity=".25"/>
    <circle cx="500" cy="320" r="115" fill="#4fbfe3" opacity=".3"/>
    <polygon points="500,165 560,280 515,500 430,350" fill="#89ecff" stroke="#d6fbff" stroke-width="9"/>
    <circle cx="500" cy="320" r="205" fill="none" stroke="#efc75e" stroke-width="8" stroke-dasharray="22 20"/>
    <circle cx="500" cy="320" r="245" fill="none" stroke="#7ab4f3" stroke-width="6" stroke-dasharray="12 26"/>
  `;

  const station = () => `
    <rect width="1000" height="650" fill="#07182f"/>${stars()}
    <circle cx="835" cy="130" r="92" fill="#e45442"/><circle cx="805" cy="105" r="52" fill="#f6a15a" opacity=".7"/>
    <g transform="translate(160 220)">
      <rect x="0" y="80" width="640" height="160" rx="75" fill="#d6e0e5"/>
      <rect x="170" y="25" width="300" height="260" rx="40" fill="#a8beca"/>
      <rect x="225" y="75" width="190" height="110" rx="14" fill="#27475b"/>
      <rect x="-80" y="122" width="160" height="75" rx="35" fill="#7798a8"/><rect x="560" y="122" width="160" height="75" rx="35" fill="#7798a8"/>
      <circle cx="320" cy="130" r="24" fill="#78dce8"/>
    </g>
  `;

  const dalek = () => `
    <rect width="1000" height="650" fill="#15152b"/>${stars()}
    <rect y="500" width="1000" height="150" fill="#272743"/>
    <g transform="translate(390 120)">
      <ellipse cx="115" cy="80" rx="90" ry="70" fill="#8e7b5d"/><rect x="45" y="120" width="140" height="75" rx="22" fill="#9a8767"/>
      <path d="M58 190 L172 190 L220 400 L10 400Z" fill="#8a7759"/>
      <g fill="#d4b86e">${Array.from({length:12},(_,i)=>`<circle cx="${45+(i%3)*70}" cy="${235+Math.floor(i/3)*48}" r="17"/>`).join("")}</g>
      <rect x="185" y="145" width="160" height="12" rx="6" fill="#b8d7e5"/><circle cx="355" cy="151" r="18" fill="#85e6ff"/>
      <rect x="-105" y="160" width="155" height="13" rx="6" fill="#b8d7e5"/><circle cx="-118" cy="166" r="18" fill="#b8d7e5"/>
      <rect x="40" y="400" width="150" height="38" rx="18" fill="#554a3a"/>
    </g>
  `;

  const solar = () => `
    <rect width="1000" height="650" fill="#10182c"/>${stars()}
    <circle cx="500" cy="245" r="135" fill="#f3ae45"/><circle cx="500" cy="245" r="185" fill="none" stroke="#f3ae45" stroke-width="20" opacity=".18"/>
    <path d="M150 620 L360 365 L430 530 L570 530 L640 365 L850 620Z" fill="#536678"/>
    <ellipse cx="500" cy="520" rx="210" ry="62" fill="#263b50"/>
    <circle cx="500" cy="520" r="76" fill="#7ed5e4" opacity=".65"/>
  `;

  function keyFor(bookId, scene={}) {
    const s=((scene.chapter||"")+" "+(scene.title||"")).toLowerCase();
    if(bookId==="book-01"){
      if(/londres|horloge|montre/.test(s)) return "clock";
      if(/musée|4002|galerie 7/.test(s)) return "museum";
      if(/dalek|nébuleuse|cœur temporel/.test(s)) return "dalek";
      return "clock";
    }
    if(bookId==="book-02"){
      if(/horloge|1963|1987/.test(s)) return "clock";
      if(/salle 17|ange|confin/.test(s)) return "museum";
      return "museum";
    }
    if(bookId==="book-03"){
      if(/serre|fougère|nid/.test(s)) return "greenhouse";
      if(/chrono|laboratoire|sous londres|portail/.test(s)) return "lab";
      return "park";
    }
    if(bookId==="book-04"){
      if(/plage|mer|cabine/.test(s)) return "beach";
      if(/biblioth/.test(s)) return "library";
      if(/cœur|réparation|cristal/.test(s)) return "heart";
      return "library";
    }
    if(bookId==="book-05"){
      if(/dalek|confinement|mémoire/.test(s)) return "dalek";
      if(/étoile|solaire|collecteur/.test(s)) return "solar";
      return "station";
    }
    return "station";
  }

  function scene(bookId, scene) {
    const k=keyFor(bookId,scene);
    const bodies={clock,museum,park,greenhouse,lab,library,beach,heart,station,dalek,solar};
    const body=bodies[k] ? bodies[k]() : station();
    const bg={clock:"#86cce0",museum:"#6fa3ba",park:"#8fd0df",greenhouse:"#87caaa",lab:"#263d4b",library:"#352c4d",beach:"#80d5eb",heart:"#07182f",station:"#07182f",dalek:"#15152b",solar:"#10182c"}[k];
    return wrap(bg,body);
  }

  function cover(bookId) {
    const fake={chapter:"",title:{
      "book-01":"Londres horloge","book-02":"musée ange","book-03":"Hyde Park dinosaure",
      "book-04":"bibliothèque TARDIS","book-05":"station étoile"
    }[bookId]||""};
    return scene(bookId,fake);
  }

  function avatar(key, label="") {
    const palette={
      rose:["#d7a37e","#d7b47a","#6f3c2f","#244e78"],
      amy:["#e2a47d","#d2956c","#9b4a2d","#9c3d57"],
      clara:["#d9a27e","#dfac83","#543a30","#3d6b75"],
      donna:["#e1a47d","#e1a47d","#b45b38","#3b6c75"],
      bill:["#8b5e45","#8b5e45","#28211f","#6b4c8b"]
    };
    const p=palette[key]||["#d4a27f","#d4a27f","#4a342d","#4f7080"];
    return `<svg class="avatar-svg" viewBox="0 0 180 210" aria-hidden="true">
      <circle cx="90" cy="72" r="52" fill="${p[0]}"/>
      <path d="M38 75 Q35 15 90 18 Q148 12 144 80 Q130 45 92 44 Q58 45 38 75Z" fill="${p[2]}"/>
      <circle cx="70" cy="72" r="5" fill="#17212b"/><circle cx="110" cy="72" r="5" fill="#17212b"/>
      <path d="M73 98 Q90 110 108 98" fill="none" stroke="#7f4e42" stroke-width="4" stroke-linecap="round"/>
      <path d="M35 205 Q42 130 90 125 Q140 132 148 205Z" fill="${p[3]}"/>
      <circle cx="90" cy="150" r="9" fill="#f0c858"/>
    </svg>`;
  }

  window.DW_ART={scene,cover,avatar};
})();