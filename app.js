(() => {
  "use strict";

  const books = [
    window.BOOK_01,
    window.BOOK_02,
    window.BOOK_03,
    window.BOOK_04,
    window.BOOK_05
  ].filter(Boolean);

  const app = document.getElementById("app");
  let book = books[0];

  const state = {
    hero: null,
    item: null,
    flags: {},
    scene: null,
    history: [],
    lastItem: null
  };

  const coverMeta = {
    "book-01": {icon:"🕰️", label:"Boucle temporelle"},
    "book-02": {icon:"👼", label:"Mystère"},
    "book-03": {icon:"🦕", label:"Aventure"},
    "book-04": {icon:"🚪", label:"Exploration"},
    "book-05": {icon:"👁️", label:"Épopée"}
  };

  const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"
  })[c]);

  const Feedback = {
    enabled: localStorage.getItem("dw_sound") !== "off",
    ctx: null,
    ensure() {
      if (!this.enabled) return null;
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      if (!this.ctx) this.ctx = new AC();
      if (this.ctx.state === "suspended") this.ctx.resume().catch(() => {});
      return this.ctx;
    },
    tone(freq = 440, duration = 0.045, volume = 0.025, type = "sine") {
      const ctx = this.ensure();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    },
    vibrate(ms = 20) {
      try {
        if (window.AndroidBridge && typeof window.AndroidBridge.vibrate === "function") {
          window.AndroidBridge.vibrate(ms);
        } else if (navigator.vibrate) {
          navigator.vibrate(ms);
        }
      } catch (_) {}
    },
    click() {
      this.tone(520, 0.035, 0.018, "square");
      this.vibrate(15);
    },
    page() {
      this.tone(320, 0.04, 0.014, "triangle");
      setTimeout(() => this.tone(410, 0.05, 0.012, "triangle"), 35);
      this.vibrate(22);
    },
    item() {
      this.tone(620, 0.05, 0.02, "sine");
      setTimeout(() => this.tone(820, 0.08, 0.018, "sine"), 45);
      this.vibrate(28);
    },
    toggle() {
      this.enabled = !this.enabled;
      localStorage.setItem("dw_sound", this.enabled ? "on" : "off");
      updateSoundButton();
      if (this.enabled) this.click();
    }
  };

  function updateSoundButton() {
    const btn = document.getElementById("global-sound-toggle");
    if (!btn) return;
    btn.textContent = Feedback.enabled ? "🔊" : "🔇";
    btn.setAttribute("aria-label", Feedback.enabled ? "Couper les sons" : "Activer les sons");
    btn.title = Feedback.enabled ? "Couper les sons" : "Activer les sons";
  }


  function resetState() {
    state.hero = null;
    state.item = null;
    state.flags = {};
    state.scene = null;
    state.history = [];
    state.lastItem = null;
  }

  function renderHome() {
    resetState();
    app.innerHTML = `
      <section class="home card collection-home">
        <div class="kicker">Doctor Who · Ma Première Aventure</div>
        <h1 class="logo">Choisis ton aventure</h1>
        <p class="subtitle">Cinq histoires courtes, trois personnages par livre, des objets à trouver et plusieurs chemins jusqu'à la fin.</p>
        <div class="books-grid">
          ${books.map((b,i) => {
            const m = coverMeta[b.id] || {icon:"✦",label:"Aventure"};
            return `
              <button class="book-card" data-book="${i}">
                <span class="book-number">Livre ${i+1}</span>
                <span class="book-cover-icon">${m.icon}</span>
                <strong>${escapeHtml(b.title)}</strong>
                <small>${escapeHtml(m.label)} · ${Object.keys(b.scenes).length} scènes</small>
              </button>`;
          }).join("")}
        </div>
        <p class="legal-note">Projet fan-made non officiel.</p>
      </section>`;

    document.querySelectorAll("[data-book]").forEach(btn => {
      btn.onclick = () => {
        book = books[Number(btn.dataset.book)];
        renderBookIntro();
      };
    });
  }

  function renderBookIntro() {
    resetState();
    const index = books.indexOf(book);
    const m = coverMeta[book.id] || {icon:"✦",label:"Aventure"};
    app.innerHTML = `
      <section class="home card">
        <div class="book-badge">Livre ${index+1} sur ${books.length} · ${escapeHtml(m.label)}</div>
        <div class="book-cover-big" aria-hidden="true">${m.icon}</div>
        <h1 class="logo">${escapeHtml(book.title)}</h1>
        <p class="subtitle">${escapeHtml(book.subtitle)}</p>
        <button class="primary" id="start">Commencer</button>
        <button class="secondary" id="back-library">← Bibliothèque</button>
      </section>`;
    document.getElementById("start").onclick = renderHeroSelect;
    document.getElementById("back-library").onclick = renderHome;
  }

  function renderHeroSelect() {
    app.innerHTML = `
      <section class="select-screen card">
        <div class="kicker">${escapeHtml(book.title)}</div>
        <h1>Choisis ton personnage</h1>
        <p class="subtitle" style="margin-left:0">Chaque personnage commence avec un objet différent. Certains chemins deviennent plus faciles selon ton choix.</p>
        <div class="select-grid">
          ${Object.entries(book.heroes).map(([id,h]) => `
            <button class="hero-select" data-hero="${id}">
              <div class="hero-avatar">${h.icon}</div>
              <h3>${escapeHtml(h.name)}</h3>
              <p>${escapeHtml(h.trait)}</p>
              <p><strong>${h.item.icon} ${escapeHtml(h.item.name)}</strong></p>
            </button>`).join("")}
        </div>
        <div class="footer-actions">
          <button class="secondary" id="book-back">← Présentation</button>
          <button class="secondary" id="home">⌂ Bibliothèque</button>
        </div>
      </section>`;
    document.querySelectorAll("[data-hero]").forEach(btn => {
      btn.onclick = () => startWithHero(btn.dataset.hero);
    });
    document.getElementById("book-back").onclick = renderBookIntro;
    document.getElementById("home").onclick = renderHome;
  }

  function startWithHero(id) {
    const hero = book.heroes[id];
    state.hero = id;
    state.item = hero.item.id;
    state.lastItem = null;
    state.flags = { courage:0, brave:0, clues:0, mercy:0, kind:0, careful:0 };
    state.scene = book.start;
    state.history = [];
    Feedback.page();
    renderScene();
  }

  function getItem(id) {
    if (!id) return {name:"Rien",icon:"○"};
    return book.items[id] || {name:id,icon:"?"};
  }

  function wheel(kind) {
    const hero = book.heroes[state.hero];
    const isHero = kind === "hero";
    const item = getItem(state.item);
    return `
      <aside class="wheel-wrap ${isHero ? "left":"right"}">
        <div class="wheel-label">${isHero ? "Personnage":"Objet"}</div>
        <div class="wheel ${!isHero && state.lastItem !== state.item ? "changed":""}">
          <div class="wheel-core">
            <span><span class="wheel-icon">${isHero ? hero.icon:item.icon}</span>${escapeHtml(isHero ? hero.short:item.name)}</span>
          </div>
        </div>
      </aside>`;
  }

  function applyFlags(flags) {
    if (!flags) return;
    Object.entries(flags).forEach(([k,v]) => {
      state.flags[k] = typeof v === "number" ? (state.flags[k] || 0) + v : v;
    });
  }

  function applyEffects(scene) {
    state.lastItem = state.item;
    if (scene.giveItem) state.item = scene.giveItem;
    if (scene.removeItem) state.item = null;
    if (state.lastItem !== state.item) Feedback.item();
    applyFlags(scene.flags);
  }

  function choiceAllowed(choice) {
    if (choice.requiresItem && state.item !== choice.requiresItem) return false;
    if (choice.requiresHero && state.hero !== choice.requiresHero) return false;
    if (choice.requiresFlag && !state.flags[choice.requiresFlag]) return false;
    return true;
  }

  function go(choice) {
    if (!choiceAllowed(choice)) return;
    Feedback.page();
    if (choice.setItem !== undefined) {
      state.lastItem = state.item;
      state.item = choice.setItem;
    }
    applyFlags(choice.flags);
    if (choice.setItem !== undefined) Feedback.item();
    state.history.push(state.scene);
    state.scene = typeof choice.next === "function" ? choice.next(state) : choice.next;
    renderScene();
  }

  function renderScene() {
    const scene = book.scenes[state.scene];
    if (!scene) {
      app.innerHTML = '<section class="home card"><h1>Scène introuvable</h1><button class="primary" id="home">Bibliothèque</button></section>';
      document.getElementById("home").onclick = renderHome;
      return;
    }

    applyEffects(scene);
    if (scene.end) return renderEnd(scene);

    const eventText = scene.event ? `<div class="event">${escapeHtml(scene.event)}</div>` : "";
    app.innerHTML = `
      <section class="game">
        ${wheel("hero")}
        <article class="story card">
          <div class="scene-art" data-tone="${scene.tone || "blue"}">
            <span class="art-glyph" aria-hidden="true">${scene.glyph || "✦"}</span>
            <div>
              <div class="chapter">${escapeHtml(scene.chapter || "Aventure")}</div>
              <h2>${escapeHtml(scene.title)}</h2>
            </div>
          </div>
          <div class="story-body">
            <p class="story-text">${escapeHtml(typeof scene.text === "function" ? scene.text(state) : scene.text)}</p>
            ${eventText}
            <div class="choices flaps" aria-label="Choisis un volet">
              ${scene.choices.map((c,i) => {
                const ok = choiceAllowed(c);
                const lockReason =
                  c.requiresItem && !ok ? `Il faut : ${getItem(c.requiresItem).name}` :
                  c.requiresHero && !ok ? "Choix réservé à un autre personnage" :
                  c.requiresFlag && !ok ? "Il manque un indice" : "";
                const flapName = ["Volet du haut","Volet du milieu","Volet du bas"][i] || "Volet";
                const flapClass = ["flap-top","flap-mid","flap-bot"][i] || "";
                return `<button class="choice book-flap ${flapClass} ${ok ? "":"locked"}" data-choice="${i}" ${ok ? "":"disabled"}>
                  <span class="flap-tab">${flapName}</span>
                  <span class="flap-main"><span class="ci">${c.icon || ["🔷","🟨","🔺"][i] || "➜"}</span><span>${escapeHtml(c.label)}</span></span>
                  <small>${escapeHtml(ok ? (c.hint || "") : lockReason)}</small>
                </button>`;
              }).join("")}
            </div>
            <div class="footer-actions">
              <button class="secondary" id="restart">↻ Recommencer ce livre</button>
              <button class="secondary" id="home">⌂ Bibliothèque</button>
            </div>
          </div>
        </article>
        ${wheel("item")}
      </section>`;

    document.querySelectorAll("[data-choice]").forEach(btn => {
      btn.onclick = () => go(scene.choices[Number(btn.dataset.choice)]);
    });
    document.getElementById("restart").onclick = renderHeroSelect;
    document.getElementById("home").onclick = renderHome;
  }

  function renderEnd(scene) {
    const hero = book.heroes[state.hero];
    app.innerHTML = `
      <section class="game">
        ${wheel("hero")}
        <article class="story card end-card">
          <div class="scene-art" data-tone="${scene.tone || "success"}">
            <span class="art-glyph" aria-hidden="true">${scene.glyph || "✨"}</span>
            <div>
              <div class="end-rank">${escapeHtml(scene.endLabel || "Fin")}</div>
              <h2>${escapeHtml(scene.title)}</h2>
            </div>
          </div>
          <div class="story-body">
            <p class="story-text">${escapeHtml(typeof scene.text === "function" ? scene.text(state) : scene.text)}</p>
            <div class="event">Aventure terminée avec <strong>${escapeHtml(hero.name)}</strong> et <strong>${escapeHtml(getItem(state.item).name)}</strong>.</div>
            <div class="end-actions">
              <button class="primary" id="again">Rejouer avec un autre personnage</button>
              <button class="secondary" id="other-book">Choisir un autre livre</button>
            </div>
          </div>
        </article>
        ${wheel("item")}
      </section>`;
    document.getElementById("again").onclick = renderHeroSelect;
    document.getElementById("other-book").onclick = renderHome;
  }

  const soundBtn = document.getElementById("global-sound-toggle");
  if (soundBtn) {
    soundBtn.addEventListener("click", () => Feedback.toggle());
    updateSoundButton();
  }

  renderHome();
})();