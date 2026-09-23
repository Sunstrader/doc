const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const window = {};
const context = vm.createContext({window});
for (let n = 1; n <= 5; n++) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, `../books/book-0${n}.js`), 'utf8'), context);
}
const books = Array.from({length: 5}, (_, i) => window[`BOOK_0${i + 1}`]);
let sceneCount = 0;
for (const book of books) {
  for (const [id, scene] of Object.entries(book.scenes)) {
    sceneCount++;
    if (scene.end) continue;
    assert.equal(scene.choices.length, 3, `${book.id}/${id} doit avoir trois volets`);
    assert(scene.choices.some(choice => !choice.requiresHero && !choice.requiresItem && !choice.requiresFlag), `${book.id}/${id} peut bloquer le joueur`);
    for (const choice of scene.choices) {
      const targets = typeof choice.next === 'function'
        ? Object.keys(book.heroes).flatMap(hero => [null, ...Object.keys(book.items)].map(item => choice.next({hero, inventory: [item, null, null], flags: {}, item})))
        : [choice.next];
      for (const target of targets) assert(book.scenes[target], `${book.id}/${id} mène vers ${target}`);
    }
  }
}

const first = books[0];
const state = (hero, inventory = [], flags = {}) => ({hero, inventory: [inventory[0] || null, inventory[1] || null, inventory[2] || null], flags});
const routes = (id, value) => first.scenes[id].choices.map(choice => typeof choice.next === 'function' ? choice.next(value) : choice.next);
for (const hero of Object.keys(first.heroes)) {
  const scene = state(hero);
  assert.equal(new Set(routes('watch_shop', scene)).size, 3, `${hero}: les trois chemins de la boutique doivent diverger`);
  assert.equal(new Set(routes('star_map_room', scene)).size, 3, `${hero}: les trois chemins du musée doivent diverger`);
  assert.equal(new Set(routes('dalek_approach', scene)).size, 3, `${hero}: les trois chemins du vaisseau doivent diverger`);
  for (const id of ['watch_shop', 'clock_tower', 'star_map_room', 'dalek_approach', 'final_console']) {
    for (const choice of first.scenes[id].choices) {
      assert(!choice.requiresItem && !choice.requiresHero, `${hero}: ${id} ne doit pas montrer de volet inaccessible`);
      assert(first.scenes[typeof choice.next === 'function' ? choice.next(scene) : choice.next]);
    }
  }
}
assert.equal(routes('watch_shop', state('clara'))[0], 'shop_sonic');
assert.equal(routes('watch_shop', state('rose'))[1], 'shop_psychic');
assert.equal(routes('watch_shop', state('amy'))[2], 'shop_back_door');
assert.equal(routes('clock_tower', state('amy', ['clockGear']))[0], 'clock_fix');
assert.equal(routes('clock_tower', state('amy'))[0], 'clock_improvise');
assert.equal(routes('star_map_room', state('rose', [null, 'feather']))[1], 'map_feather');
assert.equal(routes('final_console', state('clara', [null, null, 'blueCrystal'], {piece1: true, piece2: true, piece3: true, clues: 5}))[0], 'ending_perfect');
assert.equal(routes('final_console', state('amy'))[0], 'ending_patchwork');
assert.equal(routes('final_console', state('amy'))[1], 'ending_signal');
console.log(`${sceneCount} scènes vérifiées, routes conditionnelles du livre 1 validées.`);
