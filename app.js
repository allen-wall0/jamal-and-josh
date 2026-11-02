const $=s=>document.querySelector(s),LS={g:k=>{try{return localStorage.getItem(k)}catch(e){return null}},s:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}}};
const JI={on:false};window.JI=JI;
/* embers background */
(function(){const c=$('#mbg'),x=c.getContext('2d');let W,H;const P=[];function rs(){W=c.width=innerWidth;H=c.height=innerHeight}rs();addEventListener('resize',rs);for(let i=0;i<90;i++)P.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,v:20+Math.random()*50,r:1+Math.random()*2.2,a:Math.random()});let last=performance.now();
 function f(t){const dt=Math.min(.05,(t-last)/1000);last=t;if(!JI.on){x.fillStyle='#0a0a0c';x.fillRect(0,0,W,H);x.fillStyle='rgba(179,38,42,.12)';x.beginPath();x.moveTo(W*.46,0);x.lineTo(W*.54,0);x.lineTo(W*.26,H);x.lineTo(W*.18,H);x.fill();
  for(const p of P){p.y-=p.v*dt;p.x+=Math.sin(t/900+p.a*6)*8*dt;if(p.y<-5){p.y=H+5;p.x=Math.random()*W}x.fillStyle='rgba(255,'+(110+p.a*80|0)+',60,'+(.25+.4*p.a).toFixed(2)+')';x.beginPath();x.arc(p.x,p.y,p.r,0,6.283);x.fill()}}requestAnimationFrame(f)}requestAnimationFrame(f)})();
/* portraits */
import('./faces.js').then(m=>{const pj=$('#pj'),pd=$('#pd');let t=0,mouth=0,blink=false;const draw=()=>{m.drawPortrait(pj,'josh',0,blink,'clear');m.drawPortrait(pd,'doug',mouth,blink,'clear')};draw();setInterval(()=>{t++;blink=t%30===0;mouth=t%40<12?(t%2?.6:.2):0;if(!JI.on)draw()},120)}).catch(()=>{});
const aud=$('#menuaud');aud.volume=.35;
const menuMusic=on=>{try{on?aud.play().catch(()=>{}):aud.pause()}catch(e){}};
function build(){const L=$('#mlist');L.innerHTML='';const items=[];const lv=+LS.g('ji_josh_lv')||1;
 if(lv>1)items.push(['Continue (Level '+lv+')',()=>startJosh(lv)]);
 items.push(['New game',()=>startJosh(1)]);
 if(LS.g('ji_josh_l5')==='1')items.push(['Level select',()=>{window.JIX&&JIX.levelSelect(null,id=>startJosh(id))}]);
 items.push(['Endings',()=>{const e=$('#endtab');e&&e.click()}]);
 items.push(['Options',()=>{window.JIX&&JIX.options&&JIX.options()}]);
 items.forEach(([t,f],i)=>{const b=document.createElement('button');b.className='p5b';b.textContent=t;b.style.animationDelay=(.08*i+.15)+'s';b.onclick=f;L.appendChild(b)})}
$('#enter').onclick=()=>{$('#gate').style.display='none';$('#menu').hidden=false;build();menuMusic(true)};
async function startJosh(lv){JI.on=true;$('#menu').hidden=true;$('#mbg').style.display='none';menuMusic(false);
 const back=()=>{JI.on=false;$('#mbg').style.display='block';$('#menu').hidden=false;build();menuMusic(true)};
 try{const m=await import('./josh.js');m.start({onExit:back,startLevel:lv||1})}catch(e){back();alert('The mission could not start: '+(e&&e.message||e))}}
window.startJosh=startJosh;
