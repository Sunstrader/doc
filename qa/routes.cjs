const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const window = {};
const context = vm.createContext({window});
for (let n = 1; n <= 6; n++) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, `../books/book-0${n}.js`), 'utf8'), context);
}
vm.runInContext(fs.readFileSync(path.join(__dirname, '../books/alternatives.js'), 'utf8'), context);
const books = Array.from({length: 6}, (_, i) => window[`BOOK_0${i + 1}`]);
let sceneCount = 0;
for (const book of books) {
  assert.equal(Object.keys(book.heroes).length, 2, `${book.id} doit proposer exactement deux personnages`);
  assert(Object.values(book.heroes).every(hero => !hero.item), `${book.id} donne un objet au personnage avant le récit`);
  for (const [id, scene] of Object.entries(book.scenes)) {
    sceneCount++;
    if (scene.end) continue;
    if (scene.heroCheck || scene.itemCheck) {
      const {hero,item,anyItems,yes,no}=scene.heroCheck||scene.itemCheck;
      if(hero)assert(book.heroes[hero], `${book.id}/${id}: héros du renvoi absent`);
      if(item)assert(book.items[item], `${book.id}/${id}: objet du renvoi absent`);
      if(anyItems)for(const object of anyItems)assert(book.items[object], `${book.id}/${id}: objet du renvoi absent`);
      const yesTargets=typeof yes==='function'?[...Object.keys(book.items)].map(object=>yes({inventory:[object]})):[yes];
      for(const target of [...yesTargets,no])assert(book.scenes[target],`${book.id}/${id}: page 1/2 ${target} absente`);
      assert(yesTargets.every(target=>target!==no), `${book.id}/${id}: la page sautée doit différer`);
      assert(!scene.choices && scene.next===undefined, `${book.id}/${id}: un renvoi ne comporte que les deux pages conditionnelles`);
      continue;
    }
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
      if(choice.requiresAnyItem){
        assert(choice.requiresAnyItem.every(item=>book.items[item]),`${book.id}/${id} teste un objet inconnu`);
        assert(choice.otherwise,`${book.id}/${id} manque la page sans objet`);
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
  for (const id of ['intro','girl_meeting', 'watch_shop', 'clock_tower', 'museum_arrival', 'dalek_approach', 'final_console']) {
    for (const choice of first.scenes[id].choices) {
      assert(!choice.requiresItem && !choice.requiresHero, `${hero}: ${id} ne doit pas montrer de volet inaccessible`);
      assert(first.scenes[typeof choice.next === 'function' ? choice.next(scene) : choice.next]);
    }
  }
  assert.deepEqual(Array.from(routes('intro',scene)),['girl_meeting','clock_tower','watch_shop'],`${hero}: trois parcours de départ`);
  for (const resultId of routes('girl_meeting',scene).slice(1)) assert.equal(first.scenes[resultId].next,'tardis_between');
  assert.equal(first.scenes.tardis_between.next,'museum_arrival');
}
assert.equal(routes('girl_meeting', state('rose'))[0], 'girl_check');
assert.equal(routes('girl_meeting', state('clara'))[1], 'girl_feather');
assert.equal(routes('girl_meeting', state('clara'))[2], 'girl_pattern');
assert.equal(routes('clock_tower', state('rose'))[0], 'tower_stairs');
assert.equal(routes('watch_shop', state('clara'))[1], 'shop_check');
for (const [id,chosen] of [['girl_check','rose'],['tower_check','clara'],['shop_check','clara']]) {
  const check=first.scenes[id].heroCheck;
  assert.equal(check.hero,chosen);
  assert.equal(first.scenes[check.yes].next,'tardis_between');
  assert.equal(first.scenes[check.no].next,'tardis_between');
  for (const hero of Object.keys(first.heroes)) {
    const pageCount=hero===check.hero?1:2;
    const target=pageCount===1?check.yes:check.no;
    assert(first.scenes[target],`${hero}/${id}: renvoi ${pageCount} page(s)`);
  }
}
assert.equal(routes('museum_arrival', state('rose'))[2], 'museum_guard');
assert.deepEqual(Array.from(routes('final_console',state('rose'))),['gear_check','map_check','light_check']);
const itemPage=(id,inventory)=>{
  const gate=first.scenes[id].itemCheck,items=inventory.filter(Boolean);
  const yes=gate.item?items.includes(gate.item):gate.anyItems.some(x=>items.includes(x));
  return {pages:yes?1:2,target:yes?(typeof gate.yes==='function'?gate.yes(state('rose',inventory)):gate.yes):gate.no};
};
assert.deepEqual(itemPage('gear_check',['clockGear']),{pages:1,target:'ending_clock'});
assert.deepEqual(itemPage('gear_check',[]),{pages:2,target:'ending_improvise'});
assert.deepEqual(itemPage('map_check',[null,'starMap']),{pages:1,target:'ending_map'});
assert.deepEqual(itemPage('map_check',[]),{pages:2,target:'ending_signal'});
assert.deepEqual(itemPage('light_check',[null,null,'blueCrystal']),{pages:1,target:'ending_energy'});
assert.deepEqual(itemPage('light_check',[null,null,'dalekCell']),{pages:1,target:'ending_cell'});
assert.deepEqual(itemPage('light_check',[]),{pages:2,target:'ending_kind'});
// Aucun choix ne doit ramener à un lieu déjà résolu. Toutes les routes terminent.
const firstReachable=new Set();
for (const hero of Object.keys(first.heroes)) {
  function walk(id, visited, inventory) {
    assert(!visited.has(id), `${hero}: boucle depuis ${id}`);
    firstReachable.add(id);
    const scene=first.scenes[id];
    if(scene.end)return;
    const items=inventory.slice();
    if(scene.giveItem){const slot={clockGear:0,feather:1,starMap:1,dalekCell:2,blueCrystal:2}[scene.giveItem];items[slot]=scene.giveItem}
    const check=scene.heroCheck||scene.itemCheck;
    const eligible=check&&(check.hero?hero===check.hero:check.item?items.includes(check.item):check.anyItems.some(x=>items.includes(x)));
    const nextSet=check?[eligible?(typeof check.yes==='function'?check.yes(state(hero,items)):check.yes):check.no]:scene.next!==undefined?[scene.next]:scene.choices.map(c=>typeof c.next==='function'?c.next(state(hero,items)):c.next);
    for(const next of nextSet)walk(next,new Set([...visited,id]),items);
  }
  walk(first.start,new Set(),[]);
  const openings=Array.from(routes('intro',state(hero)));
  for(const opening of openings){
    const reachable=new Set();
    function fromOpening(id){
      if(reachable.has(id))return;
      reachable.add(id);
      const scene=first.scenes[id];
      if(scene.end)return;
      const check=scene.heroCheck||scene.itemCheck;
      const next=check?[check.hero&&hero===check.hero?check.yes:check.no]:scene.next!==undefined?[scene.next]:scene.choices.map(c=>typeof c.next==='function'?c.next(state(hero)):c.next);
      next.forEach(fromOpening);
    }
    fromOpening(opening);
    for(const other of openings.filter(id=>id!==opening))assert(!reachable.has(other),`${hero}: ${opening} retourne vers la piste écartée ${other}`);
    assert(reachable.has('tardis_between'),`${hero}: ${opening} ne rejoint pas la suite commune`);
  }
}
assert.deepEqual(Object.keys(first.scenes).filter(id=>!firstReachable.has(id)),[],"Scènes inaccessibles dans le premier livre");
assert.equal(books[1].scenes.room17_door.choices[0].otherwise.next, 'angel_clock');
assert.equal(books[2].scenes.meet_dino.choices[0].otherwise.next, 'blue_glow');
assert.equal(books[3].scenes.zero_door.choices[0].otherwise.next, 'zero_knock');
assert.equal(books[4].scenes.dalek_final_role.choices[0].otherwise.next, 'shield_final');
const royal=books[5];
for(const hero of Object.keys(royal.heroes)){
  function royalWalk(id,visited,inventory,flags){
    assert(!visited.has(id),`${hero}: retour dans ${id}`);
    const scene=royal.scenes[id];
    if(scene.end){assert(/Torchwood/.test(scene.text),`${id} oublie la création de Torchwood`);return;}
    const held=inventory.slice(),nextFlags={...flags,...scene.flags};
    if(scene.giveItem){const slot={key:0,ribbon:0,drawing:1,note:1,lantern:2,prism:2}[scene.giveItem];held[slot]=scene.giveItem;}
    const current=state(hero,held,nextFlags);
    const next=scene.next!==undefined?[scene.next]:scene.choices.map(c=>{
      const missing=c.requiresItem&&!held.includes(c.requiresItem)||c.requiresAnyItem&&!c.requiresAnyItem.some(item=>held.includes(item));
      return missing?c.otherwise.next:typeof c.next==='function'?c.next(current):c.next;
    });
    for(const id2 of next)royalWalk(id2,new Set([...visited,id]),held,nextFlags);
  }
  royalWalk(royal.start,new Set(),[],{});
}
assert.equal(royal.scenes.light_choice.choices[0].otherwise.next, 'empty_prism');
assert.equal(royal.scenes.light_choice.choices[0].next, 'prism_beam');
assert.equal(royal.scenes.light_choice.choices[1].otherwise.next, 'ask_albert');
console.log(`${sceneCount} scènes vérifiées, livre 1 et aventure de Victoria sans retours ni impasses.`);
