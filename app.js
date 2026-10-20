const $=s=>document.querySelector(s),RM=matchMedia('(prefers-reduced-motion:reduce)').matches,wait=ms=>new Promise(r=>setTimeout(r,ms));
const R=['I','II','III','IV','V','VI','VII'];
const C=[
['The Transcendence','Time does not pass me. Time passes through me.','Jamal Ismail, The Eternal Paradox','smear'],
['The Cosmic Hierarchy','You ask who created the universe. I ask who gave the universe permission to exist.','Jamal Ismail, First Principle','pull'],
['The Chadimus Connection','They call me Jamal. They call him Chadimus. The enlightened know these are merely two pronunciations of the same cosmic frequency.','The Unified Entity Hypothesis','glitch'],
['The Final Boss','I did not enter the timeline. The timeline unlocked me.','Jamal Ismail, Chronological Singularity','unlock'],
['The Absolute State','Before I was, nothing was. After I am, nothing needs to be.','Fragment Ω','white'],
['The Casual Omnipotence','Bro, I was there before the Big Bang. The invitation was late.','Allegedly overheard in the Seventh Dimension','fade'],
['The Ultimate Wisdom','You cannot defeat a being who has already experienced your victory.','The Paradox of Jamal','zoom']];
let P=[{n:'Home',t:'fade',h:`<section class="pg"><img class="portrait" id="pt" src="jamal.webp" alt="Jamal Ismail"><h1>Jamal Ismail</h1><p class="sub">The Transcendent One</p><p class="stamp">Community lore classification. Not verified biography.</p><dl><dt>Species</dt><dd>Jamalian. Unknown transcendent entity.</dd><dt>Known alias</dt><dd>The Man Beyond Space and Time</dd><dt>Cosmic status</dt><dd>Beyond conventional dimensions, according to the legend</dd></dl><p class="tag">Everything else is moving.</p><button class="exp">Enter the Jamal experience</button></section>`},
...C.map((c,i)=>({n:c[0],t:c[3],h:`<section class="pg"><div class="num">${R[i]}</div><h2>${c[0]}</h2><blockquote class="q">“${c[1]}”</blockquote><p class="by">${c[2]}</p></section>`})),
{n:'The Three Sacred Titles',t:'fade',h:`<section class="pg"><h2>The three sacred titles</h2><ul class="tl"><li>The Man Who Transcended Space and Time</li><li>The Eternal Constant</li><li>The One Before the Beginning</li></ul><p class="q small">Reality is a suggestion. Jamal Ismail is the final answer.</p></section>`}];
const JP=P,LONG='Captain Josh Stone, Decorated Member of the Bioterrorism Security Assessment Alliance, West Africa Branch, Sub-Division of the Branch of the Branch, Commander of Several People Who Asked Not to Be Commanded, Handler of Helicopters Piloted by Doug, Survivor of Kijuju, Witness to Many Majini, Second-Most-Present Man in Every Jill Valentine Encounter, Holder of One (1) Radio, and the Guy Who Was Also There';
const JQ=[['First Contact','Captain Josh Stone. BSAA. West Africa branch. Please hold. I am about to say the rest.','First words to Jill Valentine, still in progress','smear'],
['Field Report','The Majini are everywhere. I know this because I have been staring directly at them for eleven minutes.','Radio log, Kijuju','glitch'],
['Personal Log','Her name is Jill Valentine. I wrote it on my hand so I wouldn’t forget it. I have not forgotten it. It is still on my hand.','Journal, page 1 of 400','zoom']];
const JS=[{n:'Josh Stone',t:'glitch',h:`<section class="pg"><img class="portrait" id="jt" src="josh.webp" alt="Josh Stone"><h1>Josh Stone</h1><p class="long">${LONG}</p><p class="stamp">BSAA personnel file. Unverified. Probably.</p><p class="by">Click the portrait to return to the living.</p><button class="jbtn" id="jg">Begin the mission</button></section>`},
...JQ.map((c,i)=>({n:c[0],t:c[3],h:`<section class="pg"><div class="num">${R[i]}</div><h2>${c[0]}</h2><blockquote class="q">“${c[1]}”</blockquote><p class="by">${c[2]}</p></section>`})),
{n:'In Memoriam',t:'fade',h:`<section class="pg"><div class="num">In memoriam</div><h1 class="doug">Doug</h1><p class="sub">Helicopter pilot. Believer in Jill Valentine.</p><p class="memo">Doug was, to put it respectfully, extremely horny for Jill Valentine. So was Josh. Neither of them got her. Doug decided to fix this by looking as cool as possible in front of her. He did not look cool for long. Cause of death: a Doug-seeking missile.</p><p class="q small">He could have just flown away. He did not. Rest in pieces.</p></section>`}];
new Image().src='josh.webp';
const K=(a,b)=>[a,b],T={
smear:K([{filter:'blur(0)',transform:'scaleX(1)',opacity:1},{filter:'blur(28px)',transform:'scaleX(1.7)',opacity:0}],[{filter:'blur(28px)',transform:'scaleX(.55)',opacity:0},{filter:'blur(0)',transform:'scaleX(1)',opacity:1}]),
pull:K([{transform:'scale(1)',opacity:1},{transform:'scale(.35)',opacity:0}],[{transform:'scale(2.4)',opacity:0},{transform:'scale(1)',opacity:1}]),
glitch:K([{clipPath:'inset(0)',opacity:1},{clipPath:'inset(48% 0 48% 0)',opacity:0}],[{clipPath:'inset(48% 0 48% 0)',opacity:0},{clipPath:'inset(0)',opacity:1}]),
zoom:K([{transform:'scale(1)',opacity:1},{transform:'scale(1.8)',opacity:0}],[{transform:'scale(.7)',opacity:0},{transform:'scale(1)',opacity:1}]),
fade:K([{opacity:1},{opacity:0}],[{opacity:0},{opacity:1}])};
let cur=-1,busy=false;const st=$('#stage'),v=$('#veil');
const A=(el,k,ms)=>RM?Promise.resolve():el.animate(k,{duration:ms,fill:'forwards',easing:'cubic-bezier(.6,0,.2,1)'}).finished;
function swap(i){cur=i;st.innerHTML=P[i].h;st.scrollTop=0;history.replaceState(null,'',(P===JS?'#/j':'#/')+i);document.title=(i?P[i].n+' | ':'')+(P===JS?'Josh Stone':'Jamal Ismail');
 document.querySelectorAll('#dots button').forEach((b,j)=>b.classList.toggle('on',j===i));
 const pt=$('#pt'),ex=$('.exp');let n=0;
 const h1=st.querySelector('h1'),jt=$('#jt');if(pt)pt.onclick=()=>flip(true);if(h1&&pt)h1.onclick=()=>{if(++n===7){n=0;$('#cat').hidden=false}};if(jt)jt.onclick=()=>flip(false);const jg=$('#jg');if(jg)jg.onclick=startJosh;
 if(ex)ex.onclick=()=>{$('#warn').hidden=false}}
async function go(i){if(busy||i<0||i>=P.length||i===cur)return;busy=true;const t=P[i].t;
 if(t==='white'){v.style.background='#fff';await A(v,[{opacity:0},{opacity:1}],900);swap(i);await A(v,[{opacity:1},{opacity:0}],1600)}
 else if(t==='unlock'){v.style.background='#000';v.style.color='#c9a24b';v.textContent='NEW TIMELINE UNLOCKED';await A(v,[{opacity:0},{opacity:1}],180);await wait(RM?0:800);swap(i);await A(v,[{opacity:1},{opacity:0}],500);v.textContent=''}
 else{const[o,n]=T[t];if(cur>=0)await A(st,o,t==='fade'?350:650);swap(i);await A(st,n,t==='fade'?450:900)}
 v.getAnimations().concat(st.getAnimations()).forEach(a=>a.cancel());busy=false}
const buildDots=()=>{$('#dots').innerHTML=P.map((p,i)=>`<button data-i="${i}" aria-label="${p.n}"></button>`).join('')};buildDots();
$('#dots').onclick=e=>{const b=e.target.closest('button');b&&go(+b.dataset.i)};
$('#prev').onclick=()=>go(cur-1);$('#next').onclick=()=>go(cur+1);
addEventListener('keydown',e=>{if(window.JI&&JI.on)return;if(e.key==='ArrowRight')go(cur+1);if(e.key==='ArrowLeft')go(cur-1);if(e.key==='Escape')$('#cat').hidden=true});
$('#cat').onclick=()=>$('#cat').hidden=true;
/* sky */
const cv=$('#sky'),x=cv.getContext('2d');let BG='#07080d',FG='#ebe6da',SPD=1,W,H,S=[],mx=0,my=0,sp=RM?0:1,tsp=sp;
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight;S=Array.from({length:Math.min(260,W*H/6000|0)},()=>({x:Math.random()*W,y:Math.random()*H,z:Math.random()*.9+.1}))}
function draw(){sp+=(tsp-sp)*.03;x.globalAlpha=1;x.fillStyle=BG;x.fillRect(0,0,W,H);x.fillStyle=FG;
 for(const s of S){s.y+=s.z*.3*sp*SPD;s.x+=s.z*.1*sp;if(s.y>H)s.y=0;if(s.x>W)s.x=0;x.globalAlpha=.25+s.z*.75;x.fillRect(s.x+mx*s.z*30,s.y+my*s.z*30,s.z*2,s.z*2)}requestAnimationFrame(draw)}
addEventListener('resize',rs);addEventListener('mousemove',e=>{mx=e.clientX/W-.5;my=e.clientY/H-.5});rs();draw();
/* sound + stillness */
const a=$('#bgm');let muted=false,vol=0,tv=.6,tm;
setInterval(()=>{vol+=(tv-vol)*.08;a.volume=muted?0:Math.max(0,Math.min(1,vol*(window.JI&&JI.mv!=null?JI.mv:1)))},50);
$('#mute').onclick=()=>{muted=!muted;$('#mute').style.opacity=muted?.4:1;$('#mute').setAttribute('aria-label',muted?'Unmute music':'Mute music')};
function act(){document.body.classList.remove('still');tsp=RM?0:1;tv=window.JI&&JI.on?.1:.6;clearTimeout(tm);if(!(window.JI&&JI.on))tm=setTimeout(()=>{document.body.classList.add('still');tsp=0;tv=0},10000)}
$('#enter').onclick=()=>{a.play().catch(()=>{});$('#gate').style.opacity=0;setTimeout(()=>$('#gate').remove(),1200);$('#nav').hidden=false;
 ['mousemove','keydown','pointerdown','touchstart','wheel'].forEach(e=>addEventListener(e,act,{passive:true}));act();
 const h=parseInt(location.hash.slice(2));go(h>=0&&h<P.length?h:0)};

window.JI={on:false,a,set:v=>{tv=v}};
$('#no3').onclick=()=>$('#warn').hidden=true;
$('#go3').onclick=async()=>{$('#warn').hidden=true;if(hasSave()){const c=await menuChoice();if(c==='new')resetSave();if(c==='back')return}JI.on=true;document.body.classList.remove('still');clearTimeout(tm);JI.set(.1);a.playbackRate=.85;
 const back=()=>{JI.mv=1;JI.on=false;a.playbackRate=1;JI.set(.6);act()};
 try{const m=await import('./world.js');m.start({comfort:$('#cm').checked,fx:$('#fx').value,scares:$('#sc').checked,subs:$('#sb').checked,diff:$('#df').value,onExit:back})}catch(e){back();console.error(e);alert('The world could not start.\n\nReason: '+(e&&e.message||e)+'\n\nIf this mentions a module, fetch or import, the page is probably opened as a file (double-click) or three.module.min.js / world.js is missing from the repo. If it mentions WebGL, turn on hardware acceleration in your browser.')}};

function setMode(j){P=j?JS:JP;document.body.classList.toggle('josh',j);BG=j?'#0a0d08':'#07080d';FG=j?'#9fb28a':'#ebe6da';SPD=j?3:1;$('#back').hidden=!j;cur=-1;buildDots();go(0)}
async function flip(to){const im=$('#pt')||$('#jt');if(!im||busy)return;busy=true;const a=(r)=>im.animate([{transform:'perspective(600px) rotateY('+r[0]+'deg)'},{transform:'perspective(600px) rotateY('+r[1]+'deg)'}],{duration:450,fill:'forwards',easing:'ease-in-out'}).finished;
 if(!RM)await a([0,90]);im.src=to?'josh.webp':'jamal.webp';if(!RM)await a([-90,0]);busy=false;setMode(to)}
$('#back').onclick=()=>setMode(false);

function hasSave(){try{return(+localStorage.getItem('ji_cycle')||1)>1||(+localStorage.getItem('ji_frags')||0)>0}catch(e){return false}}
function resetSave(){try{['ji_cycle','ji_frags','ji_sched'].forEach(k=>localStorage.removeItem(k))}catch(e){}}
function menuChoice(){return new Promise(res=>{const m=document.createElement('div');m.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.95);display:grid;place-content:center;justify-items:center;gap:.8rem;z-index:10;text-align:center;padding:24px';let c=1,f=0;try{c=+localStorage.getItem('ji_cycle')||1;f=+localStorage.getItem('ji_frags')||0}catch(e){}
m.innerHTML='<h2 style="margin:0;color:var(--bone)">Saved game found</h2><p style="color:var(--dim);margin:0 0 1rem">Cycle '+c+' of 7 · '+f+' artifacts</p>';
[['Continue','cont'],['New game','new'],['Back','back']].forEach(([t,v])=>{const b=document.createElement('button');b.className='exp';b.textContent=t;b.onclick=()=>{m.remove();res(v)};m.appendChild(b)});document.body.appendChild(m)})}

async function startJosh(){JI.on=true;document.body.classList.remove('still');clearTimeout(tm);JI.set(0);const back=()=>{JI.mv=1;JI.on=false;JI.set(.6);act()};
 try{const m=await import('./josh.js');m.start({onExit:back})}catch(e){back();alert('The mission could not start: '+(e&&e.message||e))}}
