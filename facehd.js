/* smooth, shaded, hand-drawn character faces for next-gen mode (3 mouth frames for lip-sync) */
const PAL={
 josh:{skin:'#7a5238',hi:'#94694a',lo:'#4a2f20',hair:'#0b0907',iris:'#2a1a10',lip:'#4a2a22',beard:.55,brow:.1,lash:0},
 doug:{skin:'#5f402c',hi:'#775238',lo:'#3a2518',hair:'#1a120c',iris:'#1a0e08',lip:'#3a1c18',beard:.15,brow:-.05,lash:0,mus:1},
 chris:{skin:'#d2a884',hi:'#e2bf9c',lo:'#a8805e',hair:'#3a2a1c',iris:'#2c5a8a',lip:'#a05a50',beard:.28,brow:.14,lash:0},
 jill:{skin:'#e6c4a4',hi:'#f2d8bc',lo:'#c49c7c',hair:'#5a3820',iris:'#3a7a4a',lip:'#b03a44',beard:0,brow:-.02,lash:1}};
let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};
export function drawFaceHD(x,S,who,mouth,blink){const p=PAL[who],s=S;seed=who.length*131+7;
 let g=x.createRadialGradient(s*.5,s*.44,s*.04,s*.5,s*.5,s*.62);g.addColorStop(0,p.hi);g.addColorStop(.65,p.skin);g.addColorStop(1,p.lo);x.fillStyle=g;x.fillRect(0,0,s,s);
 g=x.createLinearGradient(0,s*.55,0,s);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.22)');x.fillStyle=g;x.fillRect(0,s*.55,s,s*.45);
 /* hair + hairline */
 const hr=(a)=>{x.fillStyle=p.hair;x.beginPath();x.moveTo(0,0);x.lineTo(s,0);x.lineTo(s,s*.3);x.quadraticCurveTo(s*.86,s*.2,s*.72,s*.16);x.quadraticCurveTo(s*.5,s*.1,s*.28,s*.16);x.quadraticCurveTo(s*.14,s*.2,0,s*.3);x.closePath();x.fill()};
 if(who==='jill'){x.fillStyle=p.hair;x.fillRect(0,0,s*.2,s);x.fillRect(s*.8,0,s*.2,s);hr();x.beginPath();x.moveTo(s*.2,s*.14);x.quadraticCurveTo(s*.6,s*.3,s*.2,s*.34);x.fill()}
 else{hr();if(who==='josh'||who==='chris'){x.fillStyle=p.hair;x.fillRect(0,s*.2,s*.08,s*.22);x.fillRect(s*.92,s*.2,s*.08,s*.22)}}
 if(who==='doug'){x.fillStyle='#2a3322';x.fillRect(0,0,s,s*.12)}
 g=x.createLinearGradient(s*.3,0,s*.7,s*.14);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.5,'rgba(255,255,255,.14)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(s*.2,s*.02,s*.6,s*.1);
 /* brows */
 x.strokeStyle=p.hair;x.lineCap='round';x.lineWidth=s*(who==='jill'?.022:.04);
 for(const sx of[-1,1]){const cx=s*(.5+sx*.2),y0=s*.32;x.beginPath();x.moveTo(cx-sx*s*.11,y0+s*p.brow*(-sx*0+.3));x.quadraticCurveTo(cx,y0-s*.035-s*p.brow*.3,cx+sx*s*.11,y0+s*(p.brow*.4));x.stroke()}
 /* eyes */
 const ey=s*.42,ew=s*.17,eh=blink?s*.012:s*(who==='chris'?.052:.07);
 for(const sx of[-1,1]){const ex=s*(.5+sx*.2);x.save();x.beginPath();x.moveTo(ex-ew/2,ey);x.quadraticCurveTo(ex,ey-eh*1.5,ex+ew/2,ey);x.quadraticCurveTo(ex,ey+eh,ex-ew/2,ey);x.closePath();x.clip();
  x.fillStyle='#f1ede4';x.fillRect(ex-ew,ey-eh*2,ew*2,eh*4);
  if(!blink){let ig=x.createRadialGradient(ex,ey,eh*.1,ex,ey,eh*1.2);ig.addColorStop(0,'#000');ig.addColorStop(.35,p.iris);ig.addColorStop(1,'#000');x.fillStyle=ig;x.beginPath();x.arc(ex,ey,eh*1.15,0,6.283);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(ex-eh*.35,ey-eh*.4,eh*.28,0,6.283);x.fill()}
  g=x.createLinearGradient(0,ey-eh*1.4,0,ey);g.addColorStop(0,'rgba(0,0,0,.45)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(ex-ew,ey-eh*1.5,ew*2,eh*1.5);x.restore();
  x.strokeStyle=p.lash?'#1a0e08':'rgba(10,6,4,.8)';x.lineWidth=s*(p.lash?.013:.009);x.beginPath();x.moveTo(ex-ew/2,ey);x.quadraticCurveTo(ex,ey-eh*1.5,ex+ew/2,ey);x.stroke()}
 /* nose */
 x.strokeStyle='rgba(0,0,0,.16)';x.lineWidth=s*.018;for(const sx of[-1,1]){x.beginPath();x.moveTo(s*(.5+sx*.04),s*.44);x.quadraticCurveTo(s*(.5+sx*.07),s*.56,s*(.5+sx*.075),s*.62);x.stroke()}
 x.fillStyle='rgba(20,8,4,.5)';for(const sx of[-1,1]){x.beginPath();x.ellipse(s*(.5+sx*.045),s*.635,s*.022,s*.012,sx*.3,0,6.283);x.fill()}
 g=x.createLinearGradient(s*.48,0,s*.52,0);x.strokeStyle='rgba(255,255,255,.1)';x.lineWidth=s*.02;x.beginPath();x.moveTo(s*.5,s*.42);x.lineTo(s*.5,s*.58);x.stroke();
 /* beard / stubble */
 if(p.beard>0){x.fillStyle='rgba(10,6,4,.35)';const n=Math.floor(2600*p.beard);for(let i=0;i<n;i++){const px=rnd()*s,py=s*(.62+rnd()*.38);if(Math.abs(px-s*.5)<s*.1&&py<s*.76)continue;if(Math.hypot((px-s*.5)/(s*.5),(py-s*.7)/(s*.38))>1.05)continue;x.fillRect(px,py,s*.006,s*.006)}}
 /* mouth */
 const my=s*.76,mw=s*(who==='doug'?.3:.2),mo=mouth*s*.08+(who==='doug'?s*.03:0);
 if(p.mus){x.fillStyle='#120d09';x.beginPath();x.moveTo(s*.5-mw*.7,my-s*.015);x.quadraticCurveTo(s*.5,my-s*.075,s*.5+mw*.7,my-s*.015);x.quadraticCurveTo(s*.5,my-s*.03,s*.5-mw*.7,my-s*.015);x.fill()}
 if(mo>s*.012){x.fillStyle='#2a0c0a';x.beginPath();x.moveTo(s*.5-mw/2,my);x.quadraticCurveTo(s*.5,my-s*.02,s*.5+mw/2,my);x.quadraticCurveTo(s*.5,my+mo*1.6,s*.5-mw/2,my);x.fill();x.save();x.clip();x.fillStyle='#f2ede0';x.fillRect(s*.5-mw/2,my-s*.01,mw,s*.03);x.fillStyle='#7a2a2a';x.fillRect(s*.5-mw/3,my+mo*.8,mw*.66,mo*.5);x.restore()}
 x.strokeStyle=p.lip;x.lineWidth=s*(who==='jill'?.03:.018);x.beginPath();x.moveTo(s*.5-mw/2,my);x.quadraticCurveTo(s*.5,my-s*.018,s*.5+mw/2,my);x.stroke();
 if(who==='jill'){x.beginPath();x.moveTo(s*.5-mw/2,my);x.quadraticCurveTo(s*.5,my+s*.045+mo*.2,s*.5+mw/2,my);x.strokeStyle=p.lip;x.lineWidth=s*.026;x.stroke()}
 /* headset (josh) */
 if(who==='josh'){x.fillStyle='#101010';x.fillRect(s*.9,s*.34,s*.08,s*.16);x.strokeStyle='#101010';x.lineWidth=s*.022;x.beginPath();x.moveTo(s*.94,s*.5);x.quadraticCurveTo(s*.9,s*.76,s*.64,s*.8);x.stroke();x.fillStyle='#222';x.beginPath();x.arc(s*.62,s*.8,s*.025,0,6.283);x.fill()}
 /* feathered edge so the head's skin shows through */
 x.globalCompositeOperation='destination-in';g=x.createRadialGradient(s*.5,s*.5,s*.3,s*.5,s*.5,s*.5);g.addColorStop(0,'rgba(0,0,0,1)');g.addColorStop(.8,'rgba(0,0,0,1)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,s,s);x.globalCompositeOperation='source-over'}
