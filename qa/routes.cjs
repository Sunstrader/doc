const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const window = {};
const context = vm.createContext({window});
for (let n = 1; n <= 5; n++) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, `../books/book-0${n}.js`), 'utf8'), context);
}
vm.runInContext(fs.readFileSync(path.join(__dirname, '../books/alternatives.js'), 'utf8'), context);
const books = Array.from({length: 5}, (_, i) => window[`BOOK_0${i + 1}`]);
let sceneCount = 0;
for (const book of books) {
  for (const [id, scene] of Object.entries(book.scenes)) {
    sceneCount++;
    if (scene.end) continue;
    if (scene.next !== undefined) {
      assert(book.scenes[scene.next], `${book.id}/${id} mène vers ${scene.next}`);
      assert(!scene.choices, `${book.id}/${id} est une page de résultat, pas un choix`);
      continue;
    }
    assert.equal(scene.choices.length, 3, `${book.id}/${id} doit avoir trois volets`);
    assert(scene.choices.some(choice => !choice.requiresHero && !choice.requiresItem && !choice.requiresFlag), `${book.id}/${id} peut bloquer le joueur`);
    for (const choice of scene.choices) {
      const targets = typeof choice.next === 'function'
        ? Object.keys(book.heroes).flatMap(hero => [null, ...Object.keys(book.items)].map(item => choice.next({hero, inventory: [item, null, null], flags: {}, item})))
        : [choice.next];
      for (const target of targets) assert(book.scenes[target], `${book.id}/${id} mène vers ${target}`);
      if(choice.otherwise){
        assert(choice.otherwise.label, `${book.id}/${id} manque un texte alternatif`);
        assert(book.scenes[choice.otherwise.next], `${book.id}/${id} mène vers ${choice.otherwise.next} sans l'objet`);
      }
      if(book.id !== 'book-01' && choice.requiresItem){
        assert(choice.otherwise, `${book.id}/${id} bloque un volet sans autre résultat`);
      }
    }
  }
}

const first = books[0];
const state = (hero, inventory = [], flags = {}) => ({hero, inventory: [inventory[0] || null, inventory[1] || null, inventory[2] || null], flags});
const routes = (id, value) => first.scenes[id].choices.map(choice => typeof choice.next === 'function' ? choice.next(value) : choice.next);
for (const hero of Object.keys(first.heroes)) {
  const scene = state(hero);
  for (const id of ['girl_meeting', 'watch_shop', 'clock_tower', 'museum_arrival', 'dalek_approach']) {
    assert.equal(new Set(routes(id,scene)).size, 3, `${hero}/${id}: les trois volets doivent avoir trois résultats`);
  }
  for (const id of ['london_arrival','girl_meeting', 'watch_shop', 'clock_tower', 'museum_arrival', 'dalek_approach', 'final_console']) {
    for (const choice of first.scenes[id].choices) {
      assert(!choice.requiresItem && !choice.requiresHero, `${hero}: ${id} ne doit pas montrer de volet inaccessible`);
      assert(first.scenes[typeof choice.next === 'function' ? choice.next(scene) : choice.next]);
    }
  }
  for (const resultId of routes('girl_meeting',scene)) {
    assert.equal(first.scenes[resultId].next,'tardis_between',`${hero}: la petite fille doit faire avancer le récit`);
  }
  assert.equal(first.scenes.tardis_between.next,'museum_arrival');
}
assert.equal(routes('girl_meeting', state('rose'))[0], 'girl_gear');
assert.equal(routes('girl_meeting', state('amy'))[1], 'girl_balloon');
assert.equal(routes('girl_meeting', state('clara'))[2], 'girl_pattern');
assert.equal(routes('clock_tower', state('amy'))[0], 'tower_roof');
assert.equal(routes('watch_shop', state('clara'))[1], 'shop_sonic');
assert.equal(routes('museum_arrival', state('rose'))[2], 'museum_guard');
assert.equal(routes('final_console', state('amy', ['clockGear']))[0], 'ending_clock');
assert.equal(routes('final_console', state('amy'))[0], 'ending_improvise');
assert.equal(routes('final_console', state('amy', [null, 'starMap']))[1], 'ending_map');
assert.equal(routes('final_console', state('amy', [null, null, 'dalekCell']))[2], 'ending_cell');
assert.equal(routes('final_console', state('amy'))[2], 'ending_kind');
// Aucun choix ne doit ramener à un lieu déjà résolu. Toutes les routes terminent.
for (const hero of Object.keys(first.heroes)) {
  function walk(id, visited, inventory) {
    assert(!visited.has(id), `${hero}: boucle depuis ${id}`);
    const scene=first.scenes[id];
    if(scene.end)return;
    const items=inventory.slice();
    if(scene.giveItem){const slot={clockGear:0,feather:1,starMap:1,dalekCell:2,blueCrystal:2}[scene.giveItem];items[slot]=scene.giveItem}
    const nextSet=scene.next!==undefined?[scene.next]:scene.choices.map(c=>typeof c.next==='function'?c.next(state(hero,items)):c.next);
    for(const next of nextSet)walk(next,new Set([...visited,id]),items);
  }
  walk(first.start,new Set(),[]);
}
assert.equal(books[1].scenes.room17_door.choices[0].otherwise.next, 'angel_clock');
assert.equal(books[2].scenes.meet_dino.choices[0].otherwise.next, 'blue_glow');
assert.equal(books[3].scenes.zero_door.choices[0].otherwise.next, 'zero_knock');
assert.equal(books[4].scenes.dalek_final_role.choices[0].otherwise.next, 'shield_final');
console.log(`${sceneCount} scènes vérifiées, livre 1 sans retours ni impasses.`);
