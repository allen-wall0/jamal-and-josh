/* MGS1-style codec screen with portraits, typewriter text and dialogue options */
import{drawPortrait}from'./faces.js';
const CSS=`
#codecx{position:fixed;inset:0;z-index:24;background:#020d07;color:#8dffb4;font-family:'Courier New',monospace;display:grid;grid-template-rows:auto 1fr auto;padding:3vh 4vw;gap:2vh;opacity:0;transition:opacity .45s}
#codecx.on{opacity:1}
#codecx:after{content:"";position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(0,0,0,.22) 0 2px,transparent 2px 4px);mix-blend-mode:multiply}
#codecx .cx-top{display:flex;justify-content:space-between;letter-spacing:.3em;font-size:clamp(.7rem,1.6vw,1rem);opacity:.85;border-bottom:2px solid #3fbf72;padding-bottom:.6vh}
#codecx .cx-main{display:grid;grid-template-columns:1fr minmax(8rem,16vw) 1fr;gap:2vw;align-items:stretch;min-height:0}
#codecx .cx-p{position:relative;border:3px solid #6cff9a;background:#061a10;clip-path:polygon(0 0,calc(100% - 22px) 0,100% 22px,100% 100%,22px 100%,0 calc(100% - 22px));box-shadow:0 0 22px rgba(108,255,154,.3);display:flex;flex-direction:column;min-height:0;transition:filter .25s,transform .35s cubic-bezier(.2,.9,.2,1)}
#codecx .cx-p canvas{width:100%;flex:1;min-height:0;object-fit:contain;display:block;filter:sepia(1) hue-rotate(75deg) saturate(2.4) brightness(.95);image-rendering:auto}
#codecx .cx-p.dim{filter:brightness(.5)}
#codecx .cx-p.act{transform:scale(1.015)}
#codecx .cx-name{min-height:5.4em;padding:.5vh 1vw;background:#0a2a18;border-top:2px solid #3fbf72;font-size:clamp(.8rem,1.8vw,1.15rem);letter-spacing:.3em;text-transform:uppercase}
#codecx .cx-name small{display:block;letter-spacing:.04em;text-transform:none;font-size:clamp(.5rem,.95vw,.68rem);opacity:.75;line-height:1.25;max-height:5em;overflow:hidden;margin-top:.3vh}
#codecx .cx-mid{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2vh;text-align:center}
#codecx .cx-call{font-size:clamp(1rem,2.2vw,1.6rem);letter-spacing:.4em;animation:cxbl 1s steps(2) infinite}
#codecx .cx-dig{font-size:clamp(1.3rem,3.6vw,2.6rem);letter-spacing:.12em;text-shadow:0 0 14px #6cff9a;border:2px solid #6cff9a;padding:.3em .5em}
#codecx .cx-bars{display:flex;gap:4px;align-items:flex-end;height:3.4rem}
#codecx .cx-bars i{display:block;width:8px;background:#6cff9a;animation:cxbar .6s ease-in-out infinite alternate}
@keyframes cxbl{50%{opacity:.2}}@keyframes cxbar{from{height:12%}to{height:100%}}
#codecx .cx-box{position:relative;border:3px solid #6cff9a;background:rgba(6,26,16,.92);padding:1.6vh 2vw 2vh;min-height:21vh;clip-path:polygon(24px 0,100% 0,100% calc(100% - 24px),calc(100% - 24px) 100%,0 100%,0 24px);box-shadow:0 0 22px rgba(108,255,154,.25)}
#codecx .cx-who{letter-spacing:.3em;font-size:clamp(.7rem,1.4vw,.95rem);color:#bfffd5;margin-bottom:.8vh}
#codecx .cx-txt{font-size:clamp(1rem,2.2vw,1.55rem);line-height:1.4;min-height:3em}
#codecx .cx-next{position:absolute;right:2vw;bottom:1.2vh;animation:cxbl .8s steps(2) infinite;opacity:0}
#codecx .cx-ch{display:grid;gap:.8vh;margin-top:1vh}
#codecx .cx-ch button{all:unset;cursor:pointer;display:block;padding:.7vh 1.4vw;border:2px solid #3fbf72;background:#082015;color:#8dffb4;font:inherit;font-size:clamp(.9rem,1.9vw,1.3rem);clip-path:polygon(12px 0,100% 0,calc(100% - 12px) 100%,0 100%);transition:background .2s,color .2s,transform .25s cubic-bezier(.2,.9,.2,1)}
#codecx .cx-ch button:hover,#codecx .cx-ch button:focus-visible{background:#6cff9a;color:#021a0c;transform:translateX(10px)}
#codecx .cx-skip{position:absolute;right:4vw;top:.8vh;font-size:.7rem;opacity:.6;letter-spacing:.1em}
`;
let cssIn=false;
export function runCodec({script,speak,title,freq,onSkip,onRing,onPick}){
 if(!cssIn){const s=document.createElement('style');s.textContent=CSS;document.head.appendChild(s);cssIn=true}
 return new Promise(async done=>{
  const el=document.createElement('div');el.id='codecx';
  el.innerHTML='<div class="cx-top"><span>CODEC</span><span class="cx-fq"></span><span>MEMORY</span></div><div class="cx-main"><div class="cx-p" data-w="josh"><canvas width="220" height="260"></canvas><div class="cx-name">Josh<small></small></div></div><div class="cx-mid"><div class="cx-call">CALL</div><div class="cx-dig"></div><div class="cx-bars">'+'<i></i>'.repeat(7)+'</div></div><div class="cx-p" data-w="doug"><canvas width="220" height="260"></canvas><div class="cx-name">Doug<small>Pilot. Helicopter (parked).</small></div></div></div><div class="cx-box"><div class="cx-who"></div><div class="cx-txt"></div><div class="cx-ch"></div><div class="cx-next">▼</div></div><div class="cx-skip">HOLD SPACE TO SKIP</div>';
  document.body.appendChild(el);
  const q=s=>el.querySelector(s),pj=q('[data-w=josh]'),pd=q('[data-w=doug]'),cj=pj.querySelector('canvas'),cd=pd.querySelector('canvas');
  q('.cx-fq').textContent='FREQ '+(freq||'140.85');q('.cx-dig').textContent=freq||'140.85';pj.querySelector('small').textContent=title||'';
  q('.cx-bars').querySelectorAll('i').forEach((b,i)=>b.style.animationDelay=(i*.09)+'s');
  let act='',mouth=0,blink=false,skipAll=false,hold=0,hd=false,advance=null,fast=false,speaking=false;
  const draw=()=>{drawPortrait(cj,'josh',act==='josh'?mouth:0,blink);drawPortrait(cd,'doug',act==='doug'?mouth:0,blink);pj.classList.toggle('dim',act!=='josh');pd.classList.toggle('dim',act!=='doug');pj.classList.toggle('act',act==='josh');pd.classList.toggle('act',act==='doug')};
  draw();requestAnimationFrame(()=>el.classList.add('on'));
  const cut=()=>{if(speaking&&!fast){fast=true;try{onSkip&&onSkip(true)}catch(e){}}};
  const kd=e=>{if(e.code==='Space'){hd=true;e.preventDefault()}if(e.code==='Enter'){if(advance)advance();else cut()}const n=+e.key;if(n>=1&&n<=3){const b=el.querySelectorAll('.cx-ch button')[n-1];if(b)b.click()}},ku=e=>{if(e.code==='Space')hd=false},cl=()=>{if(advance)advance();else cut()};
  addEventListener('keydown',kd);addEventListener('keyup',ku);el.addEventListener('click',cl);
  const iv=setInterval(()=>{if(hd&&!skipAll){hold+=.1;if(hold>=1.5){skipAll=true;try{onSkip&&onSkip()}catch(e){}if(advance)advance()}}else if(!hd)hold=0},100);
  let bt=0;const mv=setInterval(()=>{if(speaking)mouth=Math.random()<.7?.25+Math.random()*.75:0;else mouth=0;bt++;blink=(bt%28===0);draw()},110);
  const sleep=ms=>new Promise(r=>setTimeout(r,skipAll?1:ms));
  try{onRing&&onRing()}catch(e){}
  await sleep(900);
  async function line(who,text){if(skipAll)return;act=who;q('.cx-who').textContent=who==='josh'?'JOSH':'DOUG';const tx=q('.cx-txt');tx.textContent='';q('.cx-next').style.opacity=0;speaking=true;fast=false;
   const typ=(async()=>{for(let i=1;i<=text.length;i++){if(skipAll||fast){tx.textContent=text;break}tx.textContent=text.slice(0,i);await new Promise(r=>setTimeout(r,26))}tx.textContent=text})();
   await Promise.all([typ,Promise.resolve(speak(who,text)).catch(()=>{})]);speaking=false;mouth=0;draw();q('.cx-next').style.opacity=1;
   if(!skipAll)await new Promise(r=>{advance=()=>{advance=null;r()};setTimeout(()=>{if(advance){advance=null;r()}},1500)});q('.cx-next').style.opacity=0}
  const results=[];
  for(const beat of script.beats){if(Array.isArray(beat)){await line(beat[0],beat[1]);continue}
   act='josh';draw();q('.cx-who').textContent='JOSH';q('.cx-txt').textContent=beat.ask||'How do you respond?';
   const ch=q('.cx-ch');ch.innerHTML='';
   const idx=await new Promise(res=>{beat.opts.forEach((o,i)=>{const b=document.createElement('button');b.textContent=(i+1)+'. '+o.t;b.onclick=e=>{e.stopPropagation();res(i)};ch.appendChild(b)});advance=()=>{if(skipAll){advance=null;res(0)}};const w=setInterval(()=>{if(skipAll){clearInterval(w);res(0)}},120)});
   advance=null;ch.innerHTML='';const o=beat.opts[idx];results.push({idx,fx:o.fx||null,m:o.m||0});try{onPick&&onPick(o,idx)}catch(e){}
   await line('josh',o.say||o.t);for(const[w,t]of(o.r||[]))await line(w,t)}
  q('.cx-txt').textContent='';q('.cx-who').textContent='';q('.cx-call').textContent='CODEC END';await sleep(700);
  el.classList.remove('on');await new Promise(r=>setTimeout(r,skipAll?10:450));
  clearInterval(iv);clearInterval(mv);removeEventListener('keydown',kd);removeEventListener('keyup',ku);el.remove();done({choices:results,skipped:skipAll})})}
export const CODEC_SCRIPTS=[
{freq:'140.85',beats:[['doug','Josh, codec check. Can you hear me?'],['josh','Doug, you are standing right behind me.'],['doug','Codec feels more official. Anyway. That was a lot of zombies.'],{ask:'How do you respond?',opts:[{t:'Stay close. I will protect you.',fx:'tough',m:1,r:[['doug','You mean that? Josh... thank you.'],['josh','Do not cry. Reload.']]},{t:'Stop hiding behind crates.',m:-1,r:[['doug','The crates are my friends!'],['josh','Your friends are going to need a new crate.']]},{t:'Eat something. You sound hungry.',fx:'ammo',m:0,r:[['doug','I found a snack in my vest. Josh, you understand me.'],['josh','Share the ammo, not the snack. Wait. Reverse that.']]}]}]},
{freq:'141.12',beats:[['doug','Josh, be honest. When we find Jill, who stands closer to her?'],['josh','That is a very specific thing to ask in a warehouse.'],{ask:'Pick your answer.',opts:[{t:'I do. I am the Captain.',fx:'focus',m:-1,r:[['doug','Rank is not closeness, Josh!'],['josh','It is a little bit closeness.']]},{t:'You can stand closer. I will stand taller.',m:1,r:[['doug','That is... actually generous.'],['josh','Posture is my love language.']]},{t:'Neither of us. Objection.',fx:'ammo',m:0,r:[['doug','Sustained! No wait. Overruled. I am confused.'],['josh','Good. Stay confused. Go reload.']]}]}]},
{freq:'140.96',beats:[['doug','Josh, I just remembered. My helicopter is parked somewhere. I think.'],['josh','You think?'],['doug','It is a big field. They all look the same.'],{ask:'What now?',opts:[{t:'Forget the helicopter. Focus.',fx:'focus',m:0,r:[['doug','But she is my baby, Josh.'],['josh','She is parked, Doug. She is fine.']]},{t:'We find it after Jill.',fx:'tough',m:1,r:[['doug','You really are the best Captain.'],['josh','I know. Write that down.']]},{t:'How do you lose a helicopter?',m:-1,r:[['doug','You just walk away from it. Very casually.'],['josh','That is the least comforting sentence ever said.']]}]}]},
{freq:'142.07',beats:[['doug','Josh. The Control Facility is next. The big one is in there.'],['josh','The Warhead Titan.'],['doug','If I do not make it... tell Jill I was brave.'],{ask:'Your reply?',opts:[{t:'You will make it. Stay behind me.',fx:'tough',m:1,r:[['doug','Always behind you, Oga Captain. Always.'],['josh','Good. Because I am not carrying you.']]},{t:'I will tell her you hid.',m:-1,r:[['doug','That is not brave! That is rude!'],['josh','It is both. It is a combo.']]},{t:'Tell her yourself. After this.',fx:'ammo',m:1,r:[['doug','Then I have to survive. Fine. Fine!'],['josh','That is the spirit. Take extra ammo.']]}]}]}];
