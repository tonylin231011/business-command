
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const path=require('path');
const memory={};
const app={innerHTML:'',scrollIntoView(){}};
const document={
 getElementById(id){return id==='app'?app:{textContent:'',innerHTML:'',scrollIntoView(){}}},
 createElement(){return {click(){},remove(){}}},body:{appendChild(){}}
};
const context={document,window:{addEventListener(){}},localStorage:{getItem:k=>memory[k]||null,setItem:(k,v)=>memory[k]=v},console,confirm:()=>true,alert(){},prompt(){},navigator:{},URL:{createObjectURL:()=>'blob:test',revokeObjectURL(){}},Blob,setTimeout(){}};
vm.createContext(context);
const src=fs.readFileSync(path.join(__dirname,'game.js'),'utf8');
vm.runInContext(src,context,{filename:'v2/game.js'});
const run=statement=>vm.runInContext(statement,context);
assert(app.innerHTML.includes('接受任命'));
run('begin()');
assert.equal(run('state.phase'),'desk');
for(let i=0;i<4;i++){
 assert.equal(run('state.step'),i);
 run('ask(0,0);ask(1,1)');
 run("setField('reason','我需要比较市场留存与现金成本，再决定进入哪个城市。')");
 run("setField('stop','如果连续两周服务下降就暂停追加投资。')");
 run('choose(0)');
 assert.equal(run('commit()'),true);
 assert.equal(run('state.phase'),'reveal');
 assert.equal(run('state.records.length'),i+1);
 assert.equal(run('state.records[i].allocation.reduce((a,b)=>a+b,0)'),100);
 assert(app.innerHTML.includes('历史'));
 run('advance()');
}
assert.equal(run('state.phase'),'report');
assert(app.innerHTML.includes('四次拍板'));
assert.equal(run('valid(JSON.parse(localStorage.getItem(KEY)))'),true);
run('reset()');
run('begin()');
run('ask(0,0);ask(1,0)');
run("setField('reason','<img src=x onerror=alert(1)>这是测试依据。')");
run("setField('stop','若出现负面趋势就暂停')");
run('choose(2)');
assert(!app.innerHTML.includes('<img src=x onerror=alert(1)>'));
assert.equal(run('commit()'),true);
assert(app.innerHTML.includes('&lt;img'));
assert(!app.innerHTML.includes('<img src=x onerror=alert(1)>'));
console.log('PASS four scenes, carry-over state, save, report, basic escaping');
