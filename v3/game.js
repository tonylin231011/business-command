
'use strict';
/*
 * 外卖大战·雨夜决断
 * 独立电影化序章，所有NPC与演出为虚构，历史要点另列来源。
 * 无依赖，无API调用。本地进度仅存于当前浏览器。
 */
const STORE='business-command-cinematic-v3';
const EVIDENCE=[
 {id:'competition',number:'001',title:'对手不是从校外来',subtitle:'2013 · 竞争态势',intro:'美团外卖同样进入高校市场。你的先发五年，并不是学生用户的永久独占权。',detail:'这是本案的关键史实边界：美团外卖于2013年11月上线，早期由高校起步。2015年拓展白领市场。不能把对手描述为“绕开高校包抄”。',type:'可核实的历史背景',source:'S1'},
 {id:'seasonality',number:'002',title:'看起来坚固的根据地',subtitle:'2013 · 校园经营',intro:'校园可以累积商户关系与用户习惯，但学期、毕业和消费场景都可能限制增长。',detail:'校园订单的季节性与毕业迁移是值得检验的经营机制；本场没有得到饿了么当时学校级原始 cohort 数据，不把影响幅度写成确定事实。',type:'教学分析：缺少原始报表',source:null},
 {id:'logistics',number:'003',title:'一张外卖单的最后500米',subtitle:'2013 · 履约风险',intro:'从餐馆到宿舍的一次迟到，最终由谁承担？增长如果跑在服务能力之前，投诉会被放大。',detail:'商户自送、平台组织和混合模式的成本差异，需要真实密度、路程和时效数据才能计算。本情报是基于商业机制设计的调查线索，不是已审计的公司数据。',type:'教学情景：机制推演',source:null}
];
const NPCS=[
 {id:'lin',name:'林悦',role:'市场负责人',initial:'林',stance:'“校园不是天然护城河。再慢一步，连起跑线都要被人画掉。”',
 intro:'市场负责人把一张竞品覆盖图摊在桌上。红笔圈住的，都是你熟悉的高校。',
 options:[
  {q:'你到底在害怕什么？',a:'“不是怕美团多做几所大学。我怕的是，我们把过去五年的熟悉感，当作未来五年的进入壁垒。假如对手复制了地推速度，我们的护城河在哪里？”',clue:'先发时间不等于结构性壁垒。'},
  {q:'你要我把钱押在哪里？',a:'“先稳住最密集的学校，同时试一个白领商圈。但我要的是试验授权，不是一张从上海一直铺到全国的空白支票。”',clue:'校外市场需要小规模验证。'}
 ]},
 {id:'chen',name:'陈默',role:'财务负责人',initial:'陈',stance:'“所有人都在谈机会，只有现金账户不会被激情说服。”',
 intro:'陈默没有打开演示文稿。他递来一张纸，上面只有三个字：现金流。',
 options:[
  {q:'我们还有多少弹药？',a:'“公开报道有融资金额，但没有完整可支配现金、商户结算和运营开支明细。谁现在拿出一张精确的‘还能烧几个月’表，谁就是在编数字。”',clue:'融资规模不能代替现金安全判断。'},
  {q:'你的否决条件是什么？',a:'“不否决进攻。我只要求所有扩张方案都带着单位经济模型、观察窗口和止损条件。没有这三样，扩张就是许愿。”',clue:'先写出可验证的止损条件。'}
 ]},
 {id:'zhou',name:'周骁',role:'履约负责人',initial:'周',stance:'“你们抢来的每一张订单，最后都要有人送到。”',
 intro:'他刚从街上回来，雨水从夹克袖口滴到会议桌。没有人注意，直到他抬起头。',
 options:[
  {q:'现在最大的危险是什么？',a:'“市场同事看到的是新用户，我看到的是午高峰几十张同时进来的单子。每多开一座城，调度、商家交接和客服都必须跟上。”',clue:'扩张速度与履约能力存在约束。'},
  {q:'你希望先做什么？',a:'“先拿一小块高密度区域做样板，算清准时率、配送距离和人工成本。这些数没跑出来前，我不会向你保证全国都能复制。”',clue:'配送密度应先通过试点验证。'}
 ]}
];
const OPTIONS=[
 {id:'hold',letter:'A',name:'守住根据地',tag:'稳住校园 · 提升留存',
 desc:'把注意力放在最强的校园网络、商户关系和服务体验。接受更慢的校外增长。',
 gains:['校园服务深度','短期现金弹性'],loss:'白领窗口可能由别人定义',afterTitle:'你的城墙更坚固了。',afterSub:'但城墙之外，城市正在换一种速度生长。',aftermath:'你命令城市团队把精力放回校园：联系商户、排查履约、稳住学生复购。一周后，上海大学城的日常协同更顺畅了。\n与此同时，一份新的写字楼商户名单躺在会议桌上。你的团队还没决定是否去见他们。',advice:'你保住了组织节奏，却承担了增量市场的机会成本。下一幕要验证的不是“校园好不好”，而是“校外需求何时值得投入”。',stats:{cash:9,market:-6,delivery:9,control:3},mood:'ending-a'},
 {id:'bridge',letter:'B',name:'双线试探',tag:'守住高校 · 测试白领',
 desc:'校园继续经营，只授权一个城区进入白领市场；在结果可验证前不大面积开城。',
 gains:['新市场学习','组织能力沉淀'],loss:'进攻速度可能慢于对手',afterTitle:'一扇新门开了。',afterSub:'它不保证胜利，却让你看见从未测量过的生意。',aftermath:'你批准一个城区、一个明确周期的白领市场试验。市场负责人拿走授权，履约负责人坚持带着成本测算一起去。\n财务负责人在最后一页写下：如果用户留存没有改善，不追加资金。\n雨夜结束了，办公室的灯还亮着。',advice:'你买到了一次学习机会，也放弃了短期最大速度。下一幕需要检验试点结果能否外推，而不只是为自己的克制鼓掌。',stats:{cash:-7,market:10,delivery:5,control:2},mood:'ending-b'},
 {id:'rush',letter:'C',name:'全面出击',tag:'快速扩城 · 正面竞争',
 desc:'优先争取速度和规模。多城同时开战，以市场网络效应作为战略赌注。',
 gains:['短期覆盖速度','市场声量'],loss:'现金消耗和交付压力迅速抬升',afterTitle:'整座城市都听见了你的命令。',afterSub:'可订单不会因为勇气，就自己准时抵达。',aftermath:'新的开城表从打印机里一张张吐出来。市场部很兴奋。第一批合作商户开始进群。\n三天后，履约负责人给你发来一条消息：“第一场雨还没到，调度已经开始报警了。”\n你并不知道这是不是失败的先兆，但代价已经开始发生。',advice:'你押注网络效应和时间窗口，换来速度，也增加了执行风险。现在要检验每座城的单位经营与交付，而不是只统计城市总数。',stats:{cash:-19,market:17,delivery:-12,control:-4},mood:'ending-c'}
];
const SOURCES=[
 {id:'S1',title:'人民网：王慧文谈美团外卖高校起步与白领市场扩张',url:'https://it.people.com.cn/n/2015/1125/c1009-27852941.html',note:'用于校正2013年高校竞争格局；访问仍需独立核验报道上下文。'},
 {id:'S2',title:'阿里巴巴集团：2018年收购饿了么公告',url:'https://www.alibabagroup.com/en-US/document-1491593349923078144',note:'用于2018年交易背景；95亿美元为隐含企业价值，不能当成张旭豪个人所得。'}
];
const initial=()=>({v:3,phase:'cold',scene:0,line:0,speaker:0,selectedNpc:0,interview:{},read:[],option:null,reply:null,stats:{cash:65,market:55,delivery:51,control:84},started:Date.now()});
function restore(){try{const data=JSON.parse(localStorage.getItem(STORE));return valid(data)?data:initial()}catch(e){return initial()}}
function valid(s){return s&&s.v===3&&['cold','prologue','meeting','investigate','decision','ending'].includes(s.phase)&&Array.isArray(s.read)&&s.read.every(x=>EVIDENCE.some(e=>e.id===x))&&s.interview&&typeof s.interview==='object'&&s.stats&&Number.isFinite(s.stats.cash)}
let S=restore(),typingTimer=null,typed=false,audio=null,soundOn=false;
const $=id=>document.getElementById(id);
const esc=x=>String(x==null?'':x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function save(){try{localStorage.setItem(STORE,JSON.stringify(S))}catch(e){}}
function setPhase(p){clearTyping();S.phase=p;save();render();window.scrollTo?.(0,0)}
function clearTyping(){if(typingTimer)clearInterval(typingTimer);typingTimer=null;typed=false}
function playTone(kind='tap'){if(!soundOn)return;try{audio=audio||new(window.AudioContext||window.webkitAudioContext)();const osc=audio.createOscillator(),gain=audio.createGain();osc.connect(gain);gain.connect(audio.destination);let now=audio.currentTime;osc.type=kind==='impact'?'sine':'triangle';osc.frequency.setValueAtTime(kind==='impact'?116:350,now);osc.frequency.exponentialRampToValueAtTime(kind==='impact'?55:260,now+.17);gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(kind==='impact'?.07:.018,now+.02);gain.gain.exponentialRampToValueAtTime(.0001,now+.27);osc.start();osc.stop(now+.28)}catch(e){}}
function toggleSound(){soundOn=!soundOn;$('soundText').textContent=soundOn?'声音开启':'声音关闭';$('soundBtn').setAttribute('aria-pressed',String(soundOn));$('soundIcon').textContent=soundOn?'♫':'♪';if(soundOn)playTone()}
const PROLOGUE=[
 {speaker:'2018年 · 上海',role:'旁白',text:'一份收购协议，摆在会议桌的正中央。',tone:'slow'},
 {speaker:'董事会秘书',role:'虚构演出',text:'“交易的隐含企业价值，约九十五亿美元。”\n“如果今天签字，这家公司将不再由创始团队独立控制。”',tone:'slow'},
 {speaker:'你',role:'创始人 · 玩家',text:'十年前，几辆电瓶车从大学校园出发。\n十年后，你有机会把公司交给一个巨大的商业帝国。\n可真正的答案，或许写在五年前的第一道命令里。',tone:'slow'},
 {speaker:'旁白',role:'时间倒流',text:'让我们回到2013年11月。\n那一年，你以为自己最熟悉的市场，突然出现了新的对手。',tone:'slow'}
];
const MEETING=[
 {speaker:'雨声',role:'2013年11月 · 夜',text:'窗外，上海落着雨。\n会议室里的白板写着两个名字：饿了么。美团外卖。',tone:'slow'},
 {speaker:'林悦',role:'市场负责人 · 虚构人物',text:'“你们看过美团新进校园的打法了吗？”\n“他们不是绕开我们。人家和我们抢的是同一批大学生，同一批商户。”',tone:'normal'},
 {speaker:'陈默',role:'财务负责人 · 虚构人物',text:'“那你准备怎么打？每个人都要钱，市场、地推、系统、配送……谁给我一个能算清楚的方案？”',tone:'normal'},
 {speaker:'周骁',role:'履约负责人 · 虚构人物',text:'“再开十座城？可以。”\n“但请先告诉我：如果今晚十点全校一起下单，谁去送？”',tone:'normal'},
 {speaker:'你',role:'创始人 · 玩家',text:'桌上有三份方案，三个人都等着你表态。\n你可以现在拍板。但你还没有问完所有的问题。',tone:'normal'}
];
function frameScene(kind){
 const isPro=kind==='prologue',list=isPro?PROLOGUE:MEETING,i=S.line,entry=list[i]||list[list.length-1];
 const hasNext=i<list.length-1;
 return '<section class="scene fade-in"><div class="scene-bg '+(isPro?'pressure':i>=3?'focus':'')+'"></div><div class="scene-content"><div class="scene-top"><div class="timeline"><span class="'+(isPro?'on':'')+'">2018 / 收购协议</span><span class="'+(!isPro?'on':'')+'">2013 / 校园战争</span></div><span class="kicker">'+(isPro?'COLD OPEN / 终局倒叙':'ACT I / 上海雨夜')+'</span></div><div class="scene-head reveal-in"><div class="chapter-no">'+(isPro?'序章 · 终局前夜':'第一幕 · 校园保卫战')+'</div><h1>'+(isPro?'九十五亿美元的<em>背后</em>':'你的根据地，<em>有人来抢</em>')+'</h1><p class="lede">'+(isPro?'这不是一个关于出售公司的故事。至少，现在还不是。':'五年领先，一夜之间不再安全。三份相互矛盾的经营方案摆在你面前。')+'</p></div><div class="scene-flex"></div><div class="scene-bottom"><div class="dialogue-panel"><div class="speaker-row"><span class="speaker-name">'+esc(entry.speaker)+'<small>'+esc(entry.role)+'</small></span><span class="micro">'+(i+1)+' / '+list.length+'　▸ DIALOGUE</span></div><div class="dialogue-text" id="lineText" aria-label="'+esc(entry.text)+'"></div><div class="scene-buttons"><button class="button gold" id="nextLine">'+(hasNext?'继续对话　→':isPro?'回到2013年　↶':'进入调查　→')+'</button><button class="button subtle small" id="skipScene">'+(isPro?'跳过序章':'直接调查')+'</button></div></div><aside class="scene-meta"><div class="info-title">SCENE FILE / 档案</div><div class="info-line"><span>地点</span><b>上海 · 会议室</b></div><div class="info-line"><span>时间</span><b>'+(isPro?'2018年4月':'2013年11月')+'</b></div><div class="info-line"><span>性质</span><b class="warn">虚构会议演出</b></div></aside></div></div></section>';
}
function cold(){return '<section class="cold fade-in"><div class="cold-bg"></div><div class="cold-wash"></div><div class="letterbox"></div><div class="letterbox bottom"></div><div class="cold-inner reveal-in"><p class="date">SHANGHAI　/　2018.04.02</p><div class="kicker">个人商学院 × 商业纪实互动剧</div><h1>外卖<em>大战</em></h1><p class="tagline">雨夜决断 · 第一幕</p><p class="teaser">你提前五年进入战场。<br>但先发优势能守住吗？<br>这次，你要为一家公司的未来签下自己的名字。</p><button class="button gold" id="startFilm">走进那间会议室 <span>→</span></button><div class="ribbon"><span><b>2018</b> · 终局开场</span><span><b>2013</b> · 回到起点</span><span><b>YOUR CALL</b> · 亲自决断</span></div></div><span class="cold-foot">沉浸体验约 8–12 分钟 · 开启声音可听轻量环境提示音</span></section>'}
function investigation(){
 const npc=NPCS[S.selectedNpc],readCount=S.read.length,spokenCount=Object.keys(S.interview).length;
 return '<section class="interactive fade-in"><div class="interactive-inner"><div class="invest-head"><div><div class="section-tag">ACT 01　/　2013.11　/　INVESTIGATION</div><h1>所有人都在等你的决定。</h1><p class="lead">在你开口之前，先让他们把话说完。今天没有全知视角，只有不完整的情报与相互矛盾的判断。</p></div><div class="invest-meta"><div>已询问　<b>'+spokenCount+' / 6</b> 条</div><div>已打开　<b>'+readCount+' / 3</b> 份档案</div><div>签批要求　<b>至少2条对话＋2份档案</b></div></div></div><div class="invest-layout"><div class="invest-main"><h2 class="subheading"><small>01 / INTERROGATE</small>询问会议桌上的人</h2><div class="npc-stage">'+NPCS.map((p,i)=>'<button class="npc-card '+(S.selectedNpc===i?'selected':'')+'" data-npc="'+i+'" aria-pressed="'+(S.selectedNpc===i)+'"><span class="npc-initial">'+p.initial+'</span><h3>'+p.name+'</h3><span class="role">'+p.role+'</span><div class="stance">'+p.stance+'</div></button>').join('')+'</div><div class="dialogue-invest"><div class="kicker">INTERVIEW / '+npc.role+'</div><h3>'+npc.name+'的证词</h3><p>'+npc.intro+'</p><div class="interrogate-options">'+npc.options.map((o,j)=>'<button data-question="'+j+'">'+(S.interview[S.selectedNpc+':'+j]?'✓ ':'')+o.q+'</button>').join('')+'</div>'+(S.interview[S.selectedNpc+':0']||S.interview[S.selectedNpc+':1']?'<div class="divider"></div><p>'+esc(S.interview[S.selectedNpc+':1']?npc.options[1].a:npc.options[0].a)+'</p>':'')+'</div><h2 class="subheading"><small>02 / EVIDENCE</small>调查档案 · 不确定性也是信息</h2><div class="evidence-grid">'+EVIDENCE.map(e=>'<button class="evidence-file '+(S.read.includes(e.id)?'read':'')+'" data-file="'+e.id+'"><span class="file-id">DOSSIER / '+e.number+'</span><h4>'+e.title+'</h4><p>'+e.intro+'</p><span class="status">'+(S.read.includes(e.id)?'✓ 已阅读':'点开原始档案 ↗')+'</span></button>').join('')+'</div></div><aside class="invest-sidebar"><div class="intel"><div class="kicker">PRIVATE NOTEBOOK</div><h3 class="title">你的调查记录</h3><div class="meter">'+Array.from({length:5},(_,i)=>'<span class="'+(i<Math.min(5,spokenCount+readCount)?'on':'')+'"></span>').join('')+'</div><p>请留意：证词表达的是顾问立场，不是已经证实的历史事实。</p><ul>'+(spokenCount||readCount?Object.keys(S.interview).map(k=>'<li class="good">'+NPCS[Number(k.split(':')[0])].options[Number(k.split(':')[1])].clue+'</li>').join('')+S.read.map(id=>'<li>已调阅：《'+EVIDENCE.find(e=>e.id===id).title+'》</li>').join(''):'<li>还没有足够信息。你可以先问市场负责人，也可以直接打开档案。</li>')+'</ul><button id="toDecision" class="button gold next" '+(spokenCount>=2&&readCount>=2?'':'disabled')+'>进入签批会议　→</button><p class="micro" style="margin-top:12px">至少询问两条问题，并阅读两份档案。不要求把所有线索找齐。</p></div></aside></div></div></section>';
}
function decision(){
 const selected=OPTIONS.find(o=>o.id===S.option);
 return '<section class="decision fade-in"><div class="decision-inner"><div class="section-tag">ACT 01 / COMMAND ROOM · 2013年11月</div><h1>三条路。没有一条免费。</h1><p class="intro">你知道美团也从高校发起进攻，但你仍不知道投入产出和未来融资窗口。现在是决断时刻：你要用有限的现金、组织能力和先发时间做什么？</p><div class="decision-options">'+OPTIONS.map(o=>'<button class="decision-option '+(S.option===o.id?'chosen':'')+'" data-option="'+o.id+'" aria-pressed="'+(S.option===o.id)+'"><span class="alphabet">'+o.letter+'</span><h2>'+o.name+'</h2><p>'+o.desc+'</p><div class="tradeoff"><span>＋ '+o.gains.join(' / ')+'</span><br><span class="danger">− '+o.loss+'</span></div>'+(S.option===o.id?'<span class="sel-mark">✓ YOUR ORDER</span>':'')+'</button>').join('')+'</div><div class="decision-bottom"><p>'+(selected?'你的命令将进入模拟时间线。下一幕会呈现与所选战略相符的不同后果，而不是声称真的改写了历史。':'还没选定路线。请记住：没有哪个选项因为不同于历史人物，就自动判定为错误。')+'</p><button class="button red" id="commitBtn" '+(selected?'':'disabled')+'>盖章，下达命令　→</button></div><p class="decision-warning">说明：本幕为虚构董事会情景；战略选项和后果不代表2013年实际存在的正式公司议案。</p></div></section>';
}
function ending(){
 const o=OPTIONS.find(o=>o.id===S.option)||OPTIONS[0],vals=Object.entries(o.stats),diff=vals.map(([k,v])=>v);
 return '<section class="ending fade-in"><div class="ending-bg '+o.mood+'"></div><div class="ending-inner"><div class="section-tag">ACT 01 / AFTERMATH · 模拟时间线</div><h1>'+o.afterTitle+'</h1><p class="epilogue">'+o.afterSub+'</p><p class="afterword">'+esc(o.aftermath).replace(/\n/g,'<br>')+'</p><div class="ending-grid"><div class="ending-card fiction"><span class="section-tag">01 / 你的世界 · 教学推演</span><h3>'+o.name+'</h3><p>'+o.advice+'</p><div class="divider"></div><p>模拟资源变化：'+vals.map(([k,v])=>({cash:'现金安全',market:'市场地位',delivery:'履约能力',control:'战略自主权'})[k]+' '+(v>=0?'+':'')+v).join('　/　')+'</p><p class="micro">模拟资源无量纲，只用于叙事状态反馈；不是公司真实经营数字或预测。</p></div><div class="ending-card real"><span class="section-tag">02 / 真实历史 · 独立对照</span><h3>历史不会替你做判断</h3><p>美团外卖2013年11月上线，早期同样以高校为入口；后来继续拓展白领市场。饿了么也持续在校园外扩张、构建配送能力，并最终于2018年进入阿里体系。</p><p>你与历史路线一致或不同，都不能单凭这一点判断决策优劣。关键是：当时有哪些信息？如果做错，什么信号会让你及时调整？</p><p><a href="'+SOURCES[0].url+'" target="_blank" rel="noopener noreferrer">校正高校竞争格局的公开报道 ↗</a></p></div></div><div class="ending-actions"><button class="button gold" id="exportBtn">保存我的战报 ↧</button><button class="button" id="againBtn">重新做这道选择 ↶</button><button class="button subtle" id="sourcesBtn">查看史料与创作说明</button><a class="button subtle" href="../">返回原版</a></div><p class="micro" style="margin-top:20px">第一幕完。本版是一章有完整起承转合的纵向样片，并未声称四幕完整版已完成。</p></div></section>';
}
function render(){
 clearTyping();
 const app=$('app');
 if(S.phase==='cold')app.innerHTML=cold();
 else if(S.phase==='prologue'||S.phase==='meeting')app.innerHTML=frameScene(S.phase);
 else if(S.phase==='investigate')app.innerHTML=investigation();
 else if(S.phase==='decision')app.innerHTML=decision();
 else if(S.phase==='ending')app.innerHTML=ending();
 bindControls();
}
function animateLine(){
 const list=S.phase==='prologue'?PROLOGUE:MEETING,entry=list[S.line],line=$('lineText');
 if(!line)return;
 const content=Array.from(entry.text);
 const speed=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:entry.tone==='slow'?43:29;
 if(!speed){line.textContent=entry.text;typed=true;return}
 let n=0;line.innerHTML='<span class="cursor"></span>';typed=false;
 typingTimer=setInterval(()=>{
  if(!line.isConnected){clearTyping();return}
  n+=1;line.textContent=content.slice(0,n).join('');
  if(n>=content.length){clearInterval(typingTimer);typingTimer=null;typed=true;}
 },speed)
}
function nextLine(){
 const list=S.phase==='prologue'?PROLOGUE:MEETING;
 if(!typed&&typingTimer){clearInterval(typingTimer);typingTimer=null;$('lineText').textContent=list[S.line].text;typed=true;return}
 playTone();
 if(S.line<list.length-1){S.line++;save();render();}
 else{S.line=0;setPhase(S.phase==='prologue'?'meeting':'investigate');}
}
function showModal(html){
 const root=$('modal-root');
 root.innerHTML='<div class="modal-backdrop" id="overlay"><div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modalTitle"><div class="modal-top"><span class="section-tag">BUSINESS COMMAND / DOSSIER</span><button id="closeModal" class="closer" aria-label="关闭档案">✕</button></div>'+html+'</div></div>';
 $('closeModal').addEventListener('click',closeModal);
 $('overlay').addEventListener('click',e=>{if(e.target.id==='overlay')closeModal()});
 $('closeModal').focus();
}
function closeModal(){const root=$('modal-root');root.innerHTML=''}
function showEvidence(id){
 const item=EVIDENCE.find(x=>x.id===id);
 if(!item)return;
 if(!S.read.includes(id))S.read.push(id);
 save();
 showModal('<div class="eyebrow">档案 '+item.number+' / '+item.subtitle+'</div><h2 id="modalTitle">'+item.title+'</h2><p>'+item.detail+'</p><div class="notice">标注：'+item.type+'。史料与推演不得混淆。</div><button class="button gold small" id="returnToInvest">返回会议室</button>');
 $('returnToInvest').addEventListener('click',()=>{closeModal();render()});
}
function showSources(){
 showModal('<div class="eyebrow">SOURCE FILE / 制作与事实边界</div><h2 id="modalTitle">我们知道什么？又不知道什么？</h2><p>本作品中的市场负责人、财务负责人、履约负责人及其对话，均为虚构教学角色。会议室、雨夜、方案、即时后果及各项模拟指标，不代表真实发生的公司内部事件。</p>'+SOURCES.map(s=>'<div class="source"><a target="_blank" rel="noopener noreferrer" href="'+s.url+'">'+s.title+' ↗</a><small>资料用于背景事实。观点与历史判断仍须独立核对。</small></div>').join('')+'<p class="notice">2018年交易的95亿美元是公告所称隐含企业价值，并非创始人个人收益；本作品有意不把无法核验的现金跑道、利润率或市场份额编造成事实。</p>');
}
function bindControls(){
 const start=$('startFilm');if(start)start.addEventListener('click',()=>{playTone('impact');S.line=0;setPhase('prologue')});
 const next=$('nextLine');if(next){next.addEventListener('click',nextLine);animateLine()}
 const skip=$('skipScene');if(skip)skip.addEventListener('click',()=>{S.line=0;setPhase(S.phase==='prologue'?'meeting':'investigate')});
 document.querySelectorAll('[data-npc]').forEach(el=>el.addEventListener('click',()=>{S.selectedNpc=Number(el.dataset.npc);save();playTone();render()}));
 document.querySelectorAll('[data-question]').forEach(el=>el.addEventListener('click',()=>{const i=Number(el.dataset.question),key=S.selectedNpc+':'+i;S.interview[key]=true;save();playTone();render()}));
 document.querySelectorAll('[data-file]').forEach(el=>el.addEventListener('click',()=>{playTone();showEvidence(el.dataset.file)}));
 const toDecision=$('toDecision');if(toDecision)toDecision.addEventListener('click',()=>setPhase('decision'));
 document.querySelectorAll('[data-option]').forEach(el=>el.addEventListener('click',()=>{S.option=el.dataset.option;save();playTone();render()}));
 const commit=$('commitBtn');if(commit)commit.addEventListener('click',()=>{if(!OPTIONS.some(o=>o.id===S.option))return;const o=OPTIONS.find(o=>o.id===S.option);Object.entries(o.stats).forEach(([k,v])=>S.stats[k]=Math.min(100,Math.max(0,S.stats[k]+v)));save();playTone('impact');setPhase('ending')});
 const again=$('againBtn');if(again)again.addEventListener('click',()=>{S=initial();save();render()});
 const exp=$('exportBtn');if(exp)exp.addEventListener('click',exportRecord);
 const sources=$('sourcesBtn');if(sources)sources.addEventListener('click',showSources);
}
function exportRecord(){
 const data={title:'经营者·外卖大战·雨夜决断',type:'cinematic vertical slice',exported:new Date().toISOString(),record:{selectedStrategy:S.option,evidence:S.read,questions:Object.keys(S.interview),simulationStats:S.stats},disclaimer:'Simulation only; no company real financial data'};
 const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='foodwar-rainnight-record.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1200);
}
window.addEventListener('keydown',e=>{
 if(e.key==='Escape'&&$('overlay'))closeModal();
 if(e.key==='Enter'&&($('lineText'))&&document.activeElement?.tagName!=='BUTTON')nextLine();
});
window.addEventListener('storage',()=>{S=restore();render()});
$('soundBtn').addEventListener('click',toggleSound);
$('archiveBtn').addEventListener('click',showSources);
$('soundBtn').setAttribute('aria-pressed','false');
render();
