/* Ace Attorney style courtroom: testimonies, Press, Present evidence, Objection */
import{drawPortrait}from'./faces.js';
const CSS=`
#court{position:fixed;inset:0;z-index:26;display:grid;grid-template-rows:auto 1fr auto;padding:2.5vh 3vw;gap:1.5vh;background:radial-gradient(ellipse at 50% 20%,#4a3220 0,#24160e 55%,#0e0806 100%);color:#fff;font-family:'Barlow','Helvetica Neue',Arial,sans-serif;opacity:0;transition:opacity .4s}
#court.on{opacity:1}
#court:before{content:"";position:absolute;left:0;right:0;bottom:22vh;height:20vh;background:linear-gradient(#5a3a22,#2a1a10);border-top:6px solid #8a6a40;opacity:.8}
#court .ct-top{display:flex;justify-content:space-between;align-items:center;position:relative;z-index:1}
#court .ct-hearts{font-size:1.5rem;letter-spacing:.2em;color:#ff5a6a;text-shadow:0 0 8px #000}
#court .ct-case{font:italic 700 1.2rem 'Barlow Condensed','Arial Narrow',sans-serif;letter-spacing:.18em;text-transform:uppercase;text-shadow:2px 2px 0 var(--gold,#b3262a)}
#court .ct-rec{all:unset;cursor:pointer;padding:.4em 1.2em;background:#f2efe6;color:#000;font:italic 700 .95rem 'Barlow Condensed','Arial Narrow',sans-serif;letter-spacing:.14em;clip-path:polygon(8% 0,100% 0,92% 100%,0 100%)}
#court .ct-stage{position:relative;z-index:1;display:flex;justify-content:center;align-items:flex-end;min-height:0}
#court .ct-stage canvas{height:100%;max-height:50vh;width:auto;filter:drop-shadow(0 0 20px rgba(0,0,0,.7));animation:ctbob 2.2s ease-in-out infinite}
@keyframes ctbob{50%{transform:translateY(-4px)}}
#court .ct-box{position:relative;z-index:1;background:rgba(6,6,10,.94);border:3px solid #e8e0c8;padding:2vh 2vw 2.4vh;min-height:21vh;clip-path:polygon(20px 0,100% 0,100% calc(100% - 20px),calc(100% - 20px) 100%,0 100%,0 20px)}
#court .ct-name{position:absolute;left:22px;top:-1.6rem;background:#2a5ac8;color:#fff;padding:.15em 1.1em;font:italic 700 1.1rem 'Barlow Condensed','Arial Narrow',sans-serif;letter-spacing:.14em;text-transform:uppercase;clip-path:polygon(8% 0,100% 0,92% 100%,0 100%)}
#court .ct-txt{font-size:clamp(1.05rem,2.1vw,1.5rem);line-height:1.45;min-height:3.2em;margin-top:.5rem}
#court .ct-txt.stmt{color:#7affc0}
#court .ct-btns{display:flex;gap:.7rem;flex-wrap:wrap;margin-top:.8rem}
#court .ct-btns button{all:unset;cursor:pointer;padding:.45em 1.6em;background:#f2efe6;color:#000;font:italic 700 1rem 'Barlow Condensed','Arial Narrow',sans-serif;letter-spacing:.14em;text-transform:uppercase;clip-path:polygon(8% 0,100% 0,92% 100%,0 100%);transition:transform .2s,background .2s}
#court .ct-btns button:hover{transform:translateX(6px);background:var(--gold,#b3262a);color:#fff}
#court .ct-next{position:absolute;right:2vw;bottom:1vh;animation:ctbl .8s steps(2) infinite}@keyframes ctbl{50%{opacity:.1}}
#ctrec{position:fixed;inset:0;z-index:27;background:rgba(0,0,0,.88);display:none;padding:6vh 6vw;overflow:auto;font-family:'Barlow',Arial,sans-serif;color:#fff}
#ctrec h2{margin:0 0 1rem;font:italic 700 2rem 'Barlow Condensed','Arial Narrow',sans-serif;letter-spacing:.1em;text-transform:uppercase;text-shadow:3px 3px 0 var(--gold,#b3262a)}
#ctrec .ev{display:inline-block;vertical-align:top;width:min(18rem,44%);margin:.4rem;padding:1rem;background:#15151c;border-left:6px solid #e8e0c8;cursor:pointer;transition:transform .2s,background .2s}
#ctrec .ev:hover{transform:translateX(6px);background:#22222c}#ctrec .ev b{display:block;font:italic 700 1.2rem 'Barlow Condensed','Arial Narrow',sans-serif;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.3rem}
#ctrec .cl{all:unset;cursor:pointer;margin-top:1rem;display:block;padding:.4em 1.4em;background:#f2efe6;color:#000;font:italic 700 1rem 'Barlow Condensed','Arial Narrow',sans-serif;letter-spacing:.14em;width:max-content}
`;
let cssIn=false;
const EV=[{id:'radio',n:'Radio Case',d:'Dented. The antenna is missing. It belongs to Captain Josh Stone, who loves it.'},{id:'flight',n:'Flight Log',d:'Doug\u2019s helicopter was parked all night. Pilot asleep in the cockpit. Loud snoring recorded at midnight.'},{id:'weather',n:'Weather Report',d:'Midnight: heavy overcast. No moon. Visibility: zero. Wind: dramatic.'},{id:'glasses',n:'Sunglasses',d:'Black sunglasses engraved with the letters A. W. Found on the floor beside the empty shelf.'},{id:'receipt',n:'Snack Receipt',d:'Doug bought 14 snacks at 11:58 pm. Across town. Unrelated, but very Doug.'},{id:'ticket',n:'Parking Ticket',d:'A helicopter was parked in front of a hydrant. Doug says it was a very small hydrant.'}];
const CASE={title:'The People vs. Doug',intro:[['judge','Court is now in session for the trial of Doug, pilot, accused of stealing a Radio Case.'],['wesker','The prosecution will prove that Doug took the case. He is a dreamer. Dreamers steal.'],['josh','Your Honor, the defense is Captain Josh Stone, Decorated Member of the BSAA, West Africa Branch, and Doug\u2019s only friend.'],['doug','Josh, I did not take the radio. I only sat on it. That is different.'],['judge','The first witness may take the stand.']],
 wit:[
 {who:'chris',intro:[['chris','Chris Redfield. BSAA. I punch things.']],stmts:[
  {t:'At midnight I was patrolling near the helicopter.',press:[['chris','Patrolling is cardio. I do it twice a day.']]},
  {t:'I saw Doug standing at the shelf, holding the Radio Case.',press:[['chris','I saw it with my eyes. They are very good eyes.']]},
  {t:'The moon was bright, so I saw him perfectly clearly.',press:[['josh','Bright moon, you say?'],['chris','Very bright. Almost a spotlight.']],contra:{ev:'weather',lines:[['josh','OBJECTION!'],['josh','The weather report says midnight was overcast. No moon, zero visibility.'],['chris','Maybe it was a very bright cloud?'],['judge','Witness, clouds do not glow.'],['chris','My eyes glow. Anyway.']]}},
  {t:'I am absolutely certain it was Doug.',press:[['chris','I am certain. Mostly certain. Eighty percent.']]}],
  after:[['chris','Fine. I saw a figure. Possibly Doug. Possibly a tall bush.'],['judge','The next witness, please.']]},
 {who:'jill',intro:[['jill','Jill Valentine. I would like this over quickly.']],stmts:[
  {t:'I was asleep in my tent all evening.',press:[['jill','I sleep deeply. Doug shouted my name earlier, though.']]},
  {t:'Around midnight I heard Doug running past, laughing.',press:[['jill','It was loud. Like a goat with a trumpet.']],contra:{ev:'flight',lines:[['josh','HOLD IT!'],['josh','Doug\u2019s flight log shows he was asleep in the cockpit, snoring, all night.'],['jill','...He does snore. It sounds like laughing.'],['doug','I am a very expressive sleeper.']]}},
  {t:'Then I heard the whole shelf collapse.',press:[['jill','A crash, then a very dramatic gasp.']]},
  {t:'That is everything I know.',press:[['jill','That is everything. I want to go back to sleep.']]}],
  after:[['jill','So the runner was not Doug. Someone else made that noise.'],['judge','Order! The court calls the prosecutor himself to the stand.']]},
 {who:'wesker',intro:[['wesker','Albert Wesker. Prosecutor. Villain. Occasionally both.']],stmts:[
  {t:'I was in my office all night. Alone. In the dark.',press:[['wesker','I like the dark. It matches my sunglasses.']]},
  {t:'I never go near the Radio Case shelf. I have no interest in radios.',press:[['wesker','Radios are for lesser men. I own a very large silence.']],contra:{ev:'glasses',lines:[['josh','TAKE THAT!'],['josh','These sunglasses, engraved A. W., were found beside the empty shelf!'],['wesker','Impossible! I never take them off!'],['judge','And yet there they are.'],['wesker','I removed them for one second! ONE SECOND!']]}},
  {t:'My sunglasses never leave my face.',press:[['wesker','Never. Not even in the shower.']]}],
  after:[['wesker','Fine! I took the Radio Case! I wanted to sing the Resident Evil theme on it! I was lonely!'],['judge','The defendant, Doug, is found NOT GUILTY. Court adjourned.'],['doug','I am free! Can I have my helicopter back?'],['josh','It was parked, Doug.']]}]};
export function runCourt(o){if(!cssIn){const s=document.createElement('style');s.textContent=CSS;document.head.appendChild(s);cssIn=true}
 return new Promise(async done=>{const el=document.createElement('div');el.id='court';el.innerHTML='<div class="ct-top"><span class="ct-hearts"></span><span class="ct-case"></span><button class="ct-rec">Court Record</button></div><div class="ct-stage"><canvas width="260" height="300"></canvas></div><div class="ct-box"><div class="ct-name"></div><div class="ct-txt"></div><div class="ct-btns"></div><div class="ct-next">▼</div></div>';document.body.appendChild(el);
 const rec=document.createElement('div');rec.id='ctrec';document.body.appendChild(rec);
 const q=s=>el.querySelector(s),cv=q('canvas'),tx=q('.ct-txt'),nm=q('.ct-name'),bt=q('.ct-btns'),nx=q('.ct-next'),hr=q('.ct-hearts');q('.ct-case').textContent=CASE.title;requestAnimationFrame(()=>el.classList.add('on'));
 let hp=5,spk='judge',mouth=0,talking=false,blink=false,tk=0,adv=null,dead=false;const NAMES={judge:'Judge',wesker:'Prosecutor Wesker',josh:'Captain Josh Stone',doug:'Doug (defendant)',chris:'Chris Redfield',jill:'Jill Valentine'};
 const hearts=()=>{hr.textContent='\u2665'.repeat(Math.max(0,hp))+'\u2661'.repeat(Math.max(0,5-hp))};hearts();
 const draw=()=>drawPortrait(cv,spk,talking?mouth:0,blink,'clear');draw();const iv=setInterval(()=>{tk++;blink=tk%26===0;mouth=talking?(Math.random()<.7?.3+Math.random()*.7:0):0;draw()},120);
 const finish=r=>{clearInterval(iv);el.remove();rec.remove();removeEventListener('keydown',kd);done(r)};
 const kd=e=>{if((e.code==='Space'||e.code==='Enter')&&adv){e.preventDefault();adv()}};addEventListener('keydown',kd);el.addEventListener('click',e=>{if(adv&&!e.target.closest('button'))adv()});
 const wait=ms=>new Promise(r=>setTimeout(r,ms));
 async function say(who,text,stmt){spk=who;nm.textContent=NAMES[who]||who;nm.style.background=who==='wesker'?'#8a1a1a':who==='judge'?'#5a4a20':who==='josh'?'#2a5ac8':'#2a6a4a';tx.className='ct-txt'+(stmt?' stmt':'');tx.textContent='';nx.style.opacity=0;talking=true;
  let fast=false;const typ=(async()=>{for(let i=1;i<=text.length;i++){if(fast){tx.textContent=text;break}tx.textContent=text.slice(0,i);if(i%2===0&&o.tone)o.tone(who==='judge'?260:who==='wesker'?200:420,0,.02);await wait(24)}tx.textContent=text})();const quick=()=>{fast=true};
  const sp=Promise.race([Promise.resolve(o.speak?o.speak(who,text):0).catch(()=>{}),wait(text.length*95+1800)]);adv=quick;await Promise.all([typ,sp]);talking=false;adv=null;
  if(!stmt){nx.style.opacity=1;await new Promise(r=>{adv=()=>{adv=null;r()};setTimeout(()=>{if(adv){adv=null;r()}},2600)});nx.style.opacity=0}}
 async function lines(arr){for(const[w,t]of arr){if(t==='OBJECTION!'||t==='HOLD IT!'||t==='TAKE THAT!'){o.shout&&o.shout(t);await wait(900);continue}await say(w,t)}}
 const showRec=pick=>new Promise(res=>{rec.innerHTML='<h2>Court Record</h2>'+EV.map(e=>'<div class="ev" data-id="'+e.id+'"><b>'+e.n+'</b>'+e.d+'</div>').join('')+'<button class="cl">'+(pick?'Cancel':'Close')+'</button>';rec.style.display='block';rec.querySelectorAll('.ev').forEach(d=>d.onclick=()=>{if(pick){rec.style.display='none';res(d.dataset.id)}});rec.querySelector('.cl').onclick=()=>{rec.style.display='none';res(null)}});
 q('.ct-rec').onclick=e=>{e.stopPropagation();showRec(false)};
 const btnWait=labels=>new Promise(res=>{bt.innerHTML='';labels.forEach(([k,t])=>{const b=document.createElement('button');b.textContent=t;b.onclick=e=>{e.stopPropagation();bt.innerHTML='';res(k)};bt.appendChild(b)})});
 await lines(CASE.intro);
 for(const w of CASE.wit){await lines(w.intro);let i=0,solved=false;
  while(!solved){const s=w.stmts[i];await say(w.who,s.t,true);const act=await btnWait([['prev','◀ Prev'],['press','Press'],['present','Present'],['next','Next ▶']]);
   if(act==='next')i=(i+1)%w.stmts.length;else if(act==='prev')i=(i+w.stmts.length-1)%w.stmts.length;
   else if(act==='press'){o.shout&&o.shout('HOLD IT!');await wait(900);await lines(s.press||[['josh','Please elaborate.']])}
   else if(act==='present'){const ev=await showRec(true);if(!ev)continue;if(s.contra&&ev===s.contra.ev){await lines(s.contra.lines);solved=true}else{o.shout&&o.shout('HOLD ON!');await wait(700);hp--;hearts();await say('judge','Mr. Stone, that does not contradict the testimony. My patience is limited.');if(hp<=0){dead=true;break}}}}
  if(dead)break;await lines(w.after)}
 if(dead){await say('judge','The court has lost patience. The defendant is found GUILTY. Doug is being sentenced to one Wednesday.');finish('lose');return}
 finish('win')})}
