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

  const clockShop = () => `
    <rect width="1000" height="650" fill="#3e5766"/>
    <path d="M0 0H1000V455H0Z" fill="#4f6670"/>
    <path d="M0 455H1000V650H0Z" fill="#8b6751"/>
    <path d="M0 516H1000M0 580H1000" stroke="#a9805b" stroke-width="6"/>
    <rect x="45" y="65" width="270" height="372" rx="12" fill="#2e3948" stroke="#eac989" stroke-width="18"/>
    <rect x="683" y="65" width="270" height="372" rx="12" fill="#2e3948" stroke="#eac989" stroke-width="18"/>
    ${[110,222,335].map(y=>`<path d="M55 ${y}H305M693 ${y}H943" stroke="#bb9471" stroke-width="12"/>`).join("")}
    ${Array.from({length:12},(_,i)=>{let x=i<6?102+(i%2)*130:740+(i%2)*130,y=125+Math.floor((i%6)/2)*111;return `<circle cx="${x}" cy="${y}" r="32" fill="#ead5aa" stroke="#af8a5b" stroke-width="6"/><path d="M${x} ${y}v-21m0 21 17 10" stroke="#52616a" stroke-width="5" stroke-linecap="round"/>`}).join("")}
    <path d="M335 480H670L640 350H365Z" fill="#4c3440" stroke="#d2aa75" stroke-width="14"/>
    <path d="M383 351H620L593 276H406Z" fill="#745465" stroke="#e5c68b" stroke-width="12"/>
    <circle cx="500" cy="368" r="34" fill="#acdfea" stroke="#e6d89d" stroke-width="10"/>
    <path d="M459 365H541M500 324V406" stroke="#fff3d1" stroke-width="5"/>
    <path d="M0 0H1000V650H0Z" fill="#112838" opacity=".09"/>
  `;

  const clockTower = () => `
    <rect width="1000" height="650" fill="#8cc5ca"/>
    <path d="M0 460Q170 400 330 455T660 435T1000 460V650H0Z" fill="#547c7a"/>
    <rect x="278" y="80" width="445" height="560" fill="#b78d6d" stroke="#665464" stroke-width="18"/>
    <path d="M239 110 500 15 759 110Z" fill="#5c637b"/>
    <circle cx="500" cy="277" r="174" fill="#eadbb6" stroke="#595c68" stroke-width="22"/>
    <circle cx="500" cy="277" r="146" fill="none" stroke="#bdac83" stroke-width="5"/>
    ${Array.from({length:12},(_,i)=>{let a=i*Math.PI/6,x=500+128*Math.sin(a),y=277-128*Math.cos(a);return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="#4d5962"/>`}).join("")}
    <path d="M500 277V175M500 277l99 42" stroke="#495660" stroke-width="18" stroke-linecap="round"/>
    <circle cx="500" cy="277" r="19" fill="#d6b96e"/>
    <path d="M355 491H645" stroke="#745b53" stroke-width="22"/>
    <circle cx="500" cy="522" r="52" fill="#d2a75e" stroke="#67535a" stroke-width="12"/>
    <circle cx="500" cy="522" r="17" fill="#789ead"/>
    <path d="M95 490q35-90 70 0m640 0q35-90 70 0" fill="none" stroke="#daf5f6" stroke-width="8" opacity=".65"/>
  `;

  const clockGirl = () => `
    <rect width="1000" height="650" fill="#a0cacf"/>
    <path d="M0 414Q180 385 350 415T700 401T1000 410V650H0Z" fill="#657d77"/>
    <path d="M95 395V80H265V400M710 400V115H940V401" fill="#b6a08a" stroke="#617074" stroke-width="12"/>
    <circle cx="175" cy="155" r="44" fill="#e9d8b3" stroke="#566068" stroke-width="10"/>
    <path d="M0 515Q250 464 500 510T1000 497V650H0Z" fill="#8d8f76"/>
    <path d="M452 330Q505 262 555 330L589 500H420Z" fill="#d38663" stroke="#795d64" stroke-width="12"/>
    <circle cx="503" cy="292" r="49" fill="#e6b891"/>
    <path d="M455 286Q450 228 509 237Q558 238 553 295L537 268Q493 246 455 286Z" fill="#423d45"/>
    <path d="M453 365 389 440M554 365l61 57M456 490l-27 110M552 490l29 110" stroke="#4c4955" stroke-width="22" stroke-linecap="round"/>
    ${Array.from({length:17},(_,i)=>`<circle cx="${(i*167+45)%960}" cy="${(i*91+40)%410}" r="${3+i%3}" fill="#f5f5de" opacity=".7"/>`).join("")}
    <circle cx="675" cy="210" r="25" fill="#ecdbb0" opacity=".75"/>
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

  // Décors dessinés pour l'aventure de Victoria : chaque lieu garde ses repères.
  const victorian = (place) => {
    const moon=`<circle cx="813" cy="125" r="71" fill="#fff1c4"/><circle cx="813" cy="125" r="112" fill="#fff2cf" opacity=".12"/>`;
    const firs=Array.from({length:12},(_,i)=>{const x=i*96-30,h=130+(i*71)%155;return `<path d="M${x} 485l42 -${h} 42 ${h}Z" fill="${i%2?'#123445':'#0c2738'}"/><rect x="${x+37}" y="480" width="10" height="150" fill="#123445"/>`}).join("");
    const manor=`<path d="M140 505V282H300V205H720V282H875V505Z" fill="#344056" stroke="#a99175" stroke-width="9"/><path d="M130 286l97 -104 94 104M280 207l215 -122 260 122M715 286l75 -104 94 104" fill="#503d4b" stroke="#a99175" stroke-width="9"/><rect x="459" y="350" width="99" height="155" rx="44" fill="#1a2636" stroke="#c7a977" stroke-width="9"/>${[202,315,665,788].map(x=>`<path d="M${x} 313v84h51v-84z" fill="#e3ba77" stroke="#182a3a" stroke-width="7"/><path d="M${x+25} 313v84" stroke="#182a3a" stroke-width="5"/>`).join("")}`;
    const sky=`<path d="M0 0H1000V650H0Z" fill="#14283b"/><path d="M0 490Q270 406 500 475T1000 442V650H0Z" fill="#31495a"/>${stars()}${moon}`;
    const interior=(base,wall)=>`<rect width="1000" height="650" fill="${base}"/><path d="M0 495L500 388 1000 495V650H0Z" fill="#745544"/><path d="M0 70H1000M0 470H1000" stroke="#b89470" stroke-width="21"/><rect x="88" y="92" width="204" height="326" fill="${wall}" stroke="#b89470" stroke-width="18"/><path d="M190 91v326" stroke="#b89470" stroke-width="11"/><rect x="700" y="92" width="204" height="326" fill="${wall}" stroke="#b89470" stroke-width="18"/><path d="M800 91v326" stroke="#b89470" stroke-width="11"/>`;
    const telescope=`<path d="M540 298l240 -74 29 80 -240 69Z" fill="#b78956" stroke="#e3cf9b" stroke-width="12"/><circle cx="795" cy="262" r="60" fill="#748ba2" stroke="#e8cf94" stroke-width="16"/><path d="M615 348l-75 222m75 -222 122 222" stroke="#bd916a" stroke-width="21"/><circle cx="813" cy="124" r="45" fill="#fff6cf"/>`;
    const wolf=`<path d="M190 465q95 -194 282 -90l92 -37 81 -90 12 91 85 -47 -35 130 54 134H235Z" fill="#253447" stroke="#94a9b2" stroke-width="9"/><path d="M372 386l38 -38 31 40M575 360l35 -26 30 30" fill="#32455a"/><circle cx="612" cy="392" r="9" fill="#bce9ed"/><path d="M662 423q-42 28 -80 9" fill="none" stroke="#9faeb7" stroke-width="8"/>`;
    if(place==="moor")return `${sky}${firs}<path d="M0 565Q460 487 1000 560V650H0Z" fill="#536268"/>${tardis(91,345,.5)}<path d="M425 500h305l-38 67H472Z" fill="#654b43" stroke="#b39267" stroke-width="10"/><circle cx="490" cy="565" r="30" fill="#282b31"/><circle cx="675" cy="565" r="30" fill="#282b31"/>`;
    if(place==="manor")return `${sky}${firs}${manor}<path d="M0 540Q500 470 1000 545V650H0Z" fill="#31465a"/>`;
    if(place==="hall")return `${interior('#55495c','#9c7080')}<path d="M345 470V160q155 -169 310 0v310Z" fill="#263448" stroke="#d0ae76" stroke-width="18"/><path d="M500 86v382" stroke="#d0ae76" stroke-width="8"/><circle cx="500" cy="124" r="28" fill="#e6c67d"/><circle cx="500" cy="124" r="10" fill="#fff2c0"/>`;
    if(place==="library")return `${interior('#413e55','#6e6070')}${[365,475,585].map(x=>`<rect x="${x}" y="145" width="47" height="284" fill="#be866d" stroke="#e4b881" stroke-width="7"/>`).join("")}<path d="M350 430H650L680 545H320Z" fill="#997255"/><path d="M415 440q85 -56 170 0l-18 38q-68 -29 -135 0z" fill="#ead2a0"/>`;
    if(place==="queen")return `${interior('#74526a','#955770')}<path d="M355 410V166q145 -150 290 0v244Z" fill="#24394b" stroke="#d4b077" stroke-width="22"/><path d="M465 535q0 -155 57 -171 60 13 60 171Z" fill="#644675"/><circle cx="523" cy="327" r="39" fill="#e7bd9a"/><path d="M473 292q46 -72 99 0" fill="#292e40"/><path d="M482 280l40 -44 42 44" fill="none" stroke="#edc85d" stroke-width="10"/>`;
    if(place==="corridor")return `${interior('#3d4354','#46516a')}<path d="M377 492V135h228v357Z" fill="#233344" stroke="#c0a179" stroke-width="20"/><circle cx="560" cy="340" r="12" fill="#f9d888"/><path d="M0 510L490 409 1000 510" fill="none" stroke="#9d8067" stroke-width="10"/>`;
    if(place==="observatory"||place==="moonlight")return `<rect width="1000" height="650" fill="#273a54"/>${stars()}<path d="M0 390Q500 -170 1000 390" fill="none" stroke="#b8a386" stroke-width="35"/><path d="M120 490V180m760 0v310" stroke="#b8a386" stroke-width="21"/><path d="M0 510H1000V650H0Z" fill="#6a584f"/>${telescope}<ellipse cx="485" cy="540" rx="98" ry="24" fill="#f9eab7" opacity=".45"/>${place==="moonlight"?'<path d="M813 125 495 525 325 535 813 125Z" fill="#fff6ca" opacity=".3"/>':''}`;
    if(place==="roof")return `${sky}<path d="M0 530l570 -215 430 215v120H0Z" fill="#57434f" stroke="#b49b83" stroke-width="16"/>${manor}`;
    if(place==="wolf")return `${interior('#38445a','#46566b')}${wolf}<path d="M0 540H1000V650H0Z" fill="#554b56" opacity=".7"/>`;
    return `<rect width="1000" height="650" fill="#f2c994"/><circle cx="785" cy="172" r="106" fill="#fff4c5"/><path d="M0 426Q410 347 1000 440V650H0Z" fill="#89a899"/>${manor}<path d="M0 555Q500 520 1000 555V650H0Z" fill="#7b9f89"/>`;
  };

  function keyFor(bookId, scene={}) {
    if(bookId==="book-06") return scene.art||"manor";
    if(bookId==="book-01" && scene.art) return scene.art;
    const s=((scene.chapter||"")+" "+(scene.title||"")).toLowerCase();
    if(bookId==="book-01"){
      if(/boutique|coffre|vitrine|gardien|aiguilles|montres|porte de service/.test(s)) return "clockShop";
      if(/fille|petit cadeau|plume|compte/.test(s)) return "clockGirl";
      if(/tour|cadran|mécanisme|grande horloge|roue d'horloge/.test(s)) return "clockTower";
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
    if(bookId==="book-06")return wrap("#14283b",victorian(k));
    const illustrated={
      tardis:"book-01-tardis-v2.webp",london:"book-01-london-v2.webp",
      girl:"book-01-london-v2.webp",tower:"book-01-london-v2.webp",
      shop:"book-01-shop-v2.webp",museum:"book-01-museum-v2.webp",
      dalek:"book-01-dalek-v2.webp"
    };
    if(bookId==="book-01" && illustrated[k]) return `<img class="scene-svg" src="assets/${illustrated[k]}" alt="" loading="eager">`;
    const bodies={clock,clockShop,clockTower,clockGirl,museum,park,greenhouse,lab,library,beach,heart,station,dalek,solar};
    const body=bodies[k] ? bodies[k]() : station();
    const bg={clock:"#86cce0",clockShop:"#3e5766",clockTower:"#8cc5ca",clockGirl:"#a0cacf",museum:"#6fa3ba",park:"#8fd0df",greenhouse:"#87caaa",lab:"#263d4b",library:"#352c4d",beach:"#80d5eb",heart:"#07182f",station:"#07182f",dalek:"#15152b",solar:"#10182c"}[k];
    return wrap(bg,body);
  }

  function cover(bookId) {
    const fake={chapter:"",art:bookId==="book-01"?"tardis":undefined,title:{
      "book-01":"Londres horloge","book-02":"musée ange","book-03":"Hyde Park dinosaure",
      "book-04":"bibliothèque TARDIS","book-05":"station étoile","book-06":"manoir Torchwood"
    }[bookId]||""};
    if(bookId==="book-06")fake.art="manor";
    return scene(bookId,fake);
  }

  function avatar(key, label="") {
    if(["rose","amy","clara"].includes(key)) return `<img class="avatar-svg" src="assets/hero-${key}-v2.webp" alt="" loading="eager">`;
    const palette={
      rose:["#d7a37e","#d7b47a","#6f3c2f","#244e78"],
      amy:["#e2a47d","#d2956c","#9b4a2d","#9c3d57"],
      clara:["#d9a27e","#dfac83","#543a30","#3d6b75"],
      donna:["#e1a47d","#e1a47d","#b45b38","#3b6c75"],
      bill:["#8b5e45","#8b5e45","#28211f","#6b4c8b"],
      doctor:["#d9a881","#d9a881","#4a3229","#574667"],
      martha:["#9c6c50","#9c6c50","#261e25","#457383"],
      yaz:["#bc886a","#bc886a","#24292c","#586b90"]
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
