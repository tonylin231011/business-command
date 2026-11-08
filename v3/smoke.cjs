const fs=require('fs'),vm=require('vm'),assert=require('assert');
const inner={};
function el(id){if(!inner[id])inner[id]={innerHTML:'',textContent:'',value:'',isConnected:true,focus(){},addEventListener(){},setAttribute(){},scrollIntoView(){}};return inner[id]}
const db={};
const context={
 window:{addEventListener(){},scrollTo(){},matchMedia:()=>({matches:true})},
 document:{getElementById:el,querySelectorAll:()=>[],createElement:()=>({click(){},remove(){}}),body:{appendChild(){}},activeElement:null},
 localStorage:{getItem:k=>db[k]||null,setItem:(k,v)=>db[k]=v},
 navigator:{},
 console,Date,JSON,Array,Object,Number,Math,String,Blob,
 URL:{createObjectURL:()=>'/mock',revokeObjectURL(){}},
 setTimeout:()=>0,setInterval:()=>1,clearInterval(){},clearTimeout(){},
};
vm.createContext(context);
vm.runInContext(fs.readFileSync(__dirname+'/game.js','utf8'),context);
const run=s=>vm.runInContext(s,context);
assert(el('app').innerHTML.includes('外卖'));
run("setPhase('prologue')");
for(let i=0;i<4;i++){run('typed=true');run('nextLine()')}
assert.equal(run('S.phase'),'meeting');
for(let i=0;i<5;i++){run('typed=true');run('nextLine()')}
assert.equal(run('S.phase'),'investigate');
run("S.interview['0:0']=true;S.interview['1:1']=true;S.read=['competition','logistics'];save();render()");
assert(el('app').innerHTML.includes('进入签批会议'));
run("setPhase('decision')");
run("S.option='bridge';save();render()");
assert(el('app').innerHTML.includes('盖章，下达命令'));
run("Object.entries(OPTIONS.find(x=>x.id===S.option).stats).forEach(([k,v])=>S.stats[k]+=v);setPhase('ending')");
assert(el('app').innerHTML.includes('一扇新门开了'));
assert.equal(run('S.stats.market'),65);
assert(run('valid(restore())'));
for(const id of ['hold','bridge','rush']){run("S.option='"+id+"';render()");assert(el('app').innerHTML.includes(OPTIONS_SNIPPET(id)));}
function OPTIONS_SNIPPET(id){return id==='hold'?'你的城墙更坚固了':id==='bridge'?'一扇新门开了':'整座城市都听见了你的命令';}
run("S=initial();save();render()");
assert.equal(run('S.phase'),'cold');
console.log('PASS: cold open, screenplay, investigation, decision, three distinct endings, restore, reset');
