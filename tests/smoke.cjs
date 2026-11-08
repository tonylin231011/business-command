const vm=require('vm'),fs=require('fs'),assert=require('assert');
const elements={};const element=id=>elements[id]||(elements[id]={innerHTML:'',textContent:'',value:'',setAttribute(){},focus(){},showModal(){},close(){},scrollIntoView(){},after(node){this.afterNode=node},classList:{toggle(){}},querySelector(){return{remove(){}}}});
const memory={};const document={getElementById:element,querySelector:element,querySelectorAll:s=>s==='.npc'?[element('person0'),element('person1'),element('person2')]:[],createElement:()=>({click(){},className:'',innerHTML:''})};
const context={document,window:{scrollTo(){},top:{}},localStorage:{getItem:k=>memory[k]||null,setItem:(k,v)=>memory[k]=v},setTimeout:()=>0,Blob,URL,Date,console,confirm:()=>true};vm.createContext(context);let src=fs.readFileSync(__dirname+'/../index.html','utf8').match(/<script>([\s\S]*)<\/script>/)[1];vm.runInContext(src,context);let run=s=>vm.runInContext(s,context);
assert(element('app').innerHTML.includes('接受任命'));run('begin()');assert(!element('app').innerHTML.includes('历史揭封'));run('openCommand()');assert(!run('draft().orderOpen'));
for(let i=0;i<3;i++){
 for(let n=0;n<3;n++){run(`selectNPC(${n});askNPC(0);askNPC(1);pinClue(${n}*3+1)`)}
 assert.equal(run('draft().read.length'),3);assert.equal(run('draft().pins.length'),3);run('openCommand()');assert(element('app').innerHTML.includes('command-panel'));
 run(`choose(${i});writeDraft('reason','【测试】投入这个方向，并承担机会成本。');writeDraft('stop','【测试】若单位贡献持续恶化，就停止追加。');commit()`);
 assert.equal(run('db.active.phase'),'reveal');assert(element('.seal').afterNode.innerHTML.includes('你签批时带进来的证据'));assert.equal(run('db.active.decisions[db.active.index].pins.length'),3);
 run("reflect('【测试】我的假设需要继续验证。');advance()");
 if(i<2){assert(run('db.active.intermission'));assert(element('app').innerHTML.includes('幕间来信'));assert(run('validDB(db)'));run('enterNextScene()');}
}
assert.equal(run('db.active.phase'),'report');assert(element('app').innerHTML.includes('3 / 3'));assert(run('validDB(db)'));run('downloadReport();archive();showRecords()');assert.equal(run('db.runs.length'),1);
// Old V3 records have no NPC fields. They must remain usable.
run("db.active={id:'legacy',version:3,phase:'desk',index:0,drafts:{0:{option:null,reason:'',stop:'',confidence:60,read:[0],tab:0}},decisions:[]};render()");assert(run('validDB(db)'));assert.equal(run('draft().npc'),0);
run("writeDraft('reason','<img src=x onerror=alert(1)>');openCommand()");assert(!element('app').innerHTML.includes('<img src=x onerror=alert(1)>'));
console.log('PASS: NPC branches, notes, briefing gate, 3 decisions/reveals, intermissions, persistent schema, report export, V3 compatibility, escaping.');
