/* hand-drawn character faces and codec portraits (no photos) */
export const SK={josh:'#7a5238',doug:'#5f402c',chris:'#d2a884',jill:'#e6c4a4'};
export function drawFace(x,who,S,mouth,fill,blink){const u=S/64,R=(a,b,c,d,col)=>{x.fillStyle=col;x.fillRect(a*u,b*u,c*u,d*u)},P=(pts,col)=>{x.fillStyle=col;x.beginPath();pts.forEach(([a,b],i)=>i?x.lineTo(a*u,b*u):x.moveTo(a*u,b*u));x.closePath();x.fill()},m=mouth||0;
if(fill)R(0,0,64,64,SK[who]);
R(0,40,64,24,'rgba(0,0,0,.07)');
const eyes=(y,w,h,iris,lid)=>{if(blink){R(13,y+h-1,w+1,2,lid);R(37,y+h-1,w+1,2,lid);return}R(13,y,w,h,'#f4f0e6');R(37,y,w,h,'#f4f0e6');R(13+w/2-2,y,5,h,iris);R(37+w/2-2,y,5,h,iris);R(13+w/2-1,y+1,2,2,'#fff');R(37+w/2-1,y+1,2,2,'#fff');R(13,y-1,w,1.5,'rgba(0,0,0,.35)');R(37,y-1,w,1.5,'rgba(0,0,0,.35)')};
const nose=col=>{R(30,30,4,10,col);R(26,40,4,2,'rgba(0,0,0,.45)');R(34,40,4,2,'rgba(0,0,0,.45)');R(27,38,10,2,col)};
if(who==='josh'){R(0,0,64,13,'#0b0907');R(0,0,6,24,'#0b0907');R(58,0,6,24,'#0b0907');R(8,12,48,2,'#161008');
 P([[11,21],[27,19],[27,23],[11,24]],'#0b0907');P([[53,21],[37,19],[37,23],[53,24]],'#0b0907');
 eyes(25,14,6,'#25160d','#5a3a26');nose('rgba(60,36,22,.55)');
 R(6,42,52,22,'rgba(8,5,3,.5)');R(18,43,28,5,'rgba(8,5,3,.35)');
 R(22,48,20,2,'#3a201a');if(m>0){R(24,48,16,2+m*7,'#1a0a08');R(26,48,12,Math.min(2,m*3),'#ece6da')}
 R(56,24,6,12,'#111');R(57,26,3,4,'#3a3a3a');x.strokeStyle='#111';x.lineWidth=1.6*u;x.beginPath();x.moveTo(58*u,36*u);x.quadraticCurveTo(56*u,50*u,42*u,53*u);x.stroke();R(40,52,4,3,'#222')}
else if(who==='doug'){R(0,0,64,8,'#2a3322');R(0,0,5,22,'#1a120c');R(59,0,5,22,'#1a120c');
 R(12,16,17,3,'#120d09');R(35,16,17,3,'#120d09');eyes(23,15,8,'#1a0e08','#3e281a');R(12,34,15,3,'rgba(255,255,255,.07)');R(37,34,15,3,'rgba(255,255,255,.07)');nose('rgba(36,22,14,.55)');
 R(17,40,30,5,'#120d09');R(18,45,28,1,'rgba(0,0,0,.5)');
 const oh=3+m*7;R(18,47,28,oh+4,'#2a0f0c');R(19,47,26,3,'#f2ede0');R(19,47+oh+1,26,2,'#f2ede0');for(let i=0;i<5;i++)R(19+i*5.4,47,.6,oh+4,'rgba(0,0,0,.35)');
 R(26,56,12,6,'#120d09')}
else if(who==='chris'){R(0,0,64,12,'#3a2a1c');R(0,0,6,20,'#3a2a1c');R(58,0,6,20,'#3a2a1c');R(10,11,44,2,'#2a1e14');
 P([[10,21],[28,22],[28,26],[10,24]],'#2a1c12');P([[54,21],[36,22],[36,26],[54,24]],'#2a1c12');
 eyes(27,14,4,'#2c4a6a','#9a7658');nose('rgba(120,80,56,.45)');
 R(6,44,52,20,'rgba(60,44,30,.3)');R(24,49,16,2,'#8a4a40');if(m>0){R(25,49,14,2+m*6,'#2a100c');R(27,49,10,2,'#f0ebde')}R(44,35,10,1,'#b07a62');R(14,60,36,4,'rgba(0,0,0,.12)')}
else{R(0,0,64,14,'#5a3820');R(0,0,11,52,'#5a3820');R(53,0,11,52,'#5a3820');R(11,12,42,3,'#4a2c18');P([[11,13],[34,22],[11,24]],'#5a3820');
 R(14,21,14,2,'#4a2c18');R(36,21,14,2,'#4a2c18');eyes(26,13,6,'#3a6a4a','#c9a384');R(13,25,13,1.2,'#1a0e08');R(37,25,13,1.2,'#1a0e08');nose('rgba(150,100,76,.4)');
 R(23,47,18,3,'#b03a44');R(25,50,14,2,'#9a2a36');if(m>0){R(25,49,14,1+m*6,'#4a0f14');R(27,49,10,1.5,'#f5efe6')}R(12,36,8,4,'rgba(220,120,110,.25)');R(44,36,8,4,'rgba(220,120,110,.25)')}}
const CL={josh:'#55613f',doug:'#4f5a3f',chris:'#2f4a2a',jill:'#2b4f78'};
export function drawPortrait(c,who,mouth,blink,theme){const x=c.getContext('2d');if(!x)return;const W=c.width,H=c.height,cx=W/2,cy=H*.44,rx=W*.28,ry=H*.29;x.clearRect(0,0,W,H);
if(theme!=='clear'){const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#10301f');g.addColorStop(1,'#061610');x.fillStyle=g;x.fillRect(0,0,W,H);
x.fillStyle='rgba(120,255,170,.06)';for(let i=0;i<W;i+=22)x.fillRect(i,0,1,H)}
if(who==='jill'){x.fillStyle='#5a3820';x.beginPath();x.ellipse(cx,cy+8,rx+16,ry+18,0,0,6.283);x.fill();x.fillRect(cx-rx-16,cy,2*(rx+16),H*.2)}
x.fillStyle=CL[who];x.beginPath();x.moveTo(0,H);x.lineTo(0,H-H*.22);x.quadraticCurveTo(W*.1,H-H*.36,W*.3,H-H*.38);x.lineTo(W*.7,H-H*.38);x.quadraticCurveTo(W*.9,H-H*.36,W,H-H*.22);x.lineTo(W,H);x.fill();
if(who==='josh'||who==='doug'){x.fillStyle=who==='josh'?'#6b6048':'#3f4a2f';x.fillRect(W*.14,H-H*.3,W*.14,H*.3);x.fillRect(W*.72,H-H*.3,W*.14,H*.3)}
if(who==='jill'){x.fillStyle=SK.jill;x.beginPath();x.ellipse(cx,H-H*.36,W*.19,H*.07,0,0,6.283);x.fill()}
x.fillStyle=SK[who];x.fillRect(cx-W*.1,cy+ry*.7,W*.2,H*.2);x.fillStyle='rgba(0,0,0,.18)';x.fillRect(cx-W*.1,cy+ry*.7,W*.2,H*.05);
x.fillStyle=SK[who];x.beginPath();x.ellipse(cx-rx,cy+6,W*.04,H*.06,0,0,6.283);x.ellipse(cx+rx,cy+6,W*.04,H*.06,0,0,6.283);x.fill();
x.save();x.beginPath();x.ellipse(cx,cy,rx,ry,0,0,6.283);x.clip();x.fillStyle=SK[who];x.fillRect(cx-rx,cy-ry,2*rx,2*ry);
const hc={josh:'#0b0907',doug:'#2a3322',chris:'#3a2a1c',jill:'#5a3820'}[who];x.fillStyle=hc;x.fillRect(cx-rx,cy-ry,2*rx,ry*.42);
const S=2*rx;x.save();x.translate(cx-rx,cy-ry*.74);x.scale(1,1);drawFace(x,who,S,mouth,false,blink);x.restore();x.restore();
x.strokeStyle='rgba(0,0,0,.35)';x.lineWidth=2;x.beginPath();x.ellipse(cx,cy,rx,ry,0,0,6.283);x.stroke();
if(who==='doug'){x.fillStyle='#4a5a40';x.beginPath();x.ellipse(cx,cy-ry*.28,rx*1.08,ry*.78,0,Math.PI,0);x.fill();x.fillStyle='#3a4630';x.fillRect(cx-rx*1.08,cy-ry*.3,rx*2.16,ry*.1);x.fillStyle='#8a8a7a';x.fillRect(cx-6,cy-ry*.9,12,ry*.34)}
if(who==='josh'){x.strokeStyle='#111';x.lineWidth=5;x.beginPath();x.arc(cx,cy-ry*.1,rx*1.06,Math.PI*1.05,Math.PI*1.95);x.stroke();x.fillStyle='#111';x.fillRect(cx+rx-6,cy-6,13,26)}
if(theme!=='clear'){x.fillStyle='rgba(0,0,0,.18)';for(let y=0;y<H;y+=3)x.fillRect(0,y,W,1)}}
