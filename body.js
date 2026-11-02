/* detailed procedural character bodies: lofted limbs, hands with fingers, boots, gear, hair, helmets */
import*as THREE from'./three.module.min.js';
import{mergeGeometries}from'./jsm/utils/BufferGeometryUtils.js';
import{RoundedBoxGeometry}from'./jsm/geometries/RoundedBoxGeometry.js';
export function loft(secs,seg=22,top=true,bot=true){const pos=[],uv=[],idx=[],n=secs.length;
 for(let i=0;i<n;i++){const[y,rx,rz,ox=0,oz=0]=secs[i];for(let j=0;j<=seg;j++){const a=j/seg*6.28318;pos.push(ox+Math.sin(a)*rx,y,oz+Math.cos(a)*rz);uv.push(j/seg,i/(n-1))}}
 for(let i=0;i<n-1;i++)for(let j=0;j<seg;j++){const a=i*(seg+1)+j,a1=a+1,b=a+seg+1,b1=b+1;idx.push(a,a1,b,a1,b1,b)}
 const cap=(i,flip)=>{const[y,rx,rz,ox=0,oz=0]=secs[i],c=pos.length/3;pos.push(ox,y,oz);uv.push(.5,flip?0:1);for(let j=0;j<seg;j++){const p=i*(seg+1)+j;flip?idx.push(c,p+1,p):idx.push(c,p,p+1)}};
 if(top)cap(n-1,false);if(bot)cap(0,true);
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();
 const nn=g.attributes.normal;for(let i=0;i<n;i++){const a=i*(seg+1),b=a+seg;const x=nn.getX(a)+nn.getX(b),y=nn.getY(a)+nn.getY(b),z=nn.getZ(a)+nn.getZ(b),l=Math.hypot(x,y,z)||1;nn.setXYZ(a,x/l,y/l,z/l);nn.setXYZ(b,x/l,y/l,z/l)}return g}
const ell=(rx,ry,rz,x,y,z,seg=14)=>{const g=new THREE.SphereGeometry(1,seg,Math.max(8,seg>>1));g.scale(rx,ry,rz);g.translate(x,y,z);return g};
const rbox=(w,h,d,r,x,y,z,ax=0,ay=0,az=0)=>{const g=new RoundedBoxGeometry(w,h,d,2,Math.min(r,w/2.2,h/2.2,d/2.2));if(ax)g.rotateX(ax);if(ay)g.rotateY(ay);if(az)g.rotateZ(az);g.translate(x,y,z);return g};
const cyl=(r0,r1,h,x,y,z,ax=0,az=0,seg=12)=>{const g=new THREE.CylinderGeometry(r0,r1,h,seg);if(ax)g.rotateX(ax);if(az)g.rotateZ(az);g.translate(x,y,z);return g};
class Acc{constructor(par){this.par=par;this.m=new Map()}add(g,mat){let a=this.m.get(mat);if(!a)this.m.set(mat,a=[]);a.push(g.index?g.toNonIndexed():g)}
 flush(){for(const[mat,a]of this.m){const g=a.length>1?mergeGeometries(a,false):a[0];const me=new THREE.Mesh(g,mat);this.par.add(me)}this.m.clear()}}
const G=(par,x,y,z)=>{const g=new THREE.Group();g.position.set(x||0,y||0,z||0);par&&par.add(g);return g};
export function makeRig(ctx,o){const{scene,retro,faceMap}=ctx;
 const cache=new Map(),M=(c,r=.8,m=0)=>{const k=c+'|'+r+'|'+m;let x=cache.get(k);if(!x){x=retro?new THREE.MeshLambertMaterial({color:c}):new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m});cache.set(k,x)}return x};
 const k=o.kind||'',bulk=({chris:1.1,jill:.88,josh:1.04,doug:1,wesker:1.02,zombie:.96}[k]||1),shw=({jill:.9,chris:1.08}[k]||1),hip=({jill:1.1,chris:1.02}[k]||1);
 const skin=M(o.skin,.55),shirt=M(o.shirt,.9),pants=M(o.pants,.88),boots=M(o.boots||0x1a1612,.6),leather=M(o.belt||0x2a2218,.55),vestM=o.vest?M(o.vest,.85):null,vest2=o.vest?M(o.vest2||o.vest,.8):null,sleeve=M(o.sleeve||o.shirt,.9),fore=M(o.forearm||o.skin,o.forearm?.9:.55),glove=M(o.glove||o.skin,o.glove?.6:.55),dark=M(0x141414,.5,.3),metal=M(0x55585c,.35,.8);
 const root=new THREE.Group(),J={},V={};
 const pel=G(root,0,1.02,0);J.pel=pel;V.pel=G(pel);const ch=G(pel,0,.16,0);J.chest=ch;V.chest=G(ch,0,.16,0);
 /* pelvis */
 {const a=new Acc(V.pel);a.add(loft([[-.15,.14*hip,.09],[-.09,.172*hip,.105],[0,.168*hip,.103],[.08,.152,.094],[.15,.145,.09]],24),pants);
  for(const s of[-1,1])a.add(ell(.072,.082,.066,s*.075*hip,-.07,-.074),pants);
  a.add(loft([[.085,.18*hip,.11],[.12,.18*hip,.11]],26,false,false),leather);a.add(rbox(.05,.042,.022,.006,0,.1,.112*1.0),metal);
  if(k==='josh'||k==='doug'||k==='chris'){for(const s of[-1,1])a.add(rbox(.066,.085,.05,.01,s*.145,.035,.055),M(0x2c2a24,.85));a.add(rbox(.04,.15,.07,.01,.19*hip,-.07,.0),leather)}
  if(k==='wesker'){for(const s of[-1,1])a.add(loft([[-.58,.07,.02,s*.07,-.1],[-.3,.1,.028,s*.075,-.1],[-.05,.11,.04,s*.07,-.09],[.1,.1,.05,s*.06,-.08]],14),shirt)}
  a.flush()}
 /* torso */
 {const a=new Acc(V.chest),S=r=>r*bulk;
  if(k==='jill'){a.add(loft([[-.18,S(.15),.092],[-.08,S(.168),.1],[.02,S(.188),.112],[.1,S(.2),.118]],24,true,false),shirt);a.add(loft([[.09,S(.196),.112],[.15,S(.226)*shw,.112],[.19,.165,.095],[.225,.085,.075]],24),skin)}
  else a.add(loft([[-.18,S(.15),.092],[-.08,S(.168),.1],[.02,S(.19),.114],[.1,S(.212),.122],[.15,S(.234)*shw,.116],[.19,.17,.097],[.225,.085,.075]],26),shirt);
  for(const s of[-1,1]){a.add(ell(.078*bulk,.065,.05,s*.085,.075,.1),k==='jill'?shirt:shirt);a.add(ell(.06,.1,.045,s*.14*bulk,.02,-.085),shirt)}
  a.add(loft([[.17,.062,.058],[.25,.05,.047],[.33,.046,.045]],14),skin);
  if(vestM){a.add(loft([[-.1,.18,.11],[.02,.202,.124],[.1,.224,.132],[.16,.238*shw,.124],[.2,.15,.1]],26,false,false),vestM);a.add(rbox(.27,.25,.04,.014,0,.06,.138),vest2);a.add(rbox(.27,.25,.04,.014,0,.06,-.118),vest2);for(const s of[-1,1])a.add(rbox(.07,.05,.22,.01,s*.14,.19,0),vestM);for(let i=-1;i<=1;i++)a.add(rbox(.06,.075,.04,.01,i*.1,-.06,.14),vest2);
   if(k==='josh'){a.add(rbox(.06,.11,.05,.008,-.125,.1,.13),dark);a.add(cyl(.005,.005,.2,-.125,.26,.13));a.add(rbox(.03,.02,.02,.004,-.125,.16,.14),M(0xd03020,.4))}
   if(k==='doug'){a.add(rbox(.05,.08,.04,.008,.12,.12,.135),M(0x2f3a2a,.8))}}
  if(k==='chris'){for(const s of[-1,1])a.add(rbox(.025,.3,.012,.004,s*.07,.09,.13,0,0,s*.35),leather)}
  if(k==='wesker'){a.add(loft([[.2,.14,.115],[.27,.105,.095]],20,false,false),shirt)}
  if(k==='zombie'){for(let i=0;i<7;i++)a.add(rbox(.032,.09+Math.random()*.08,.006,.002,-.15+i*.05,-.2,.095+(i%2)*.01,.15,0,(Math.random()-.5)*.3),shirt);for(let i=0;i<3;i++)a.add(ell(.05+Math.random()*.03,.05,.01,(Math.random()-.5)*.2,Math.random()*.15,.118),M(0x4a0a0a,.5))}
  a.flush()}
 /* head */
 const nk=G(ch,0,.38,0);J.neck=nk;const hd=G(nk,0,.12,0);J.head=hd;V.head=G(hd,0,.07,0);
 {const a=new Acc(V.head);a.add(loft([[-.128,.028,.04,0,.052],[-.105,.058,.07,0,.04],[-.065,.09,.092,0,.018],[-.01,.108,.108,0,.004],[.04,.114,.114,0,-.002],[.09,.108,.11,0,-.008],[.125,.082,.088,0,-.012],[.14,.03,.04,0,-.012]],26),skin);
  for(const s of[-1,1])a.add(ell(.02,.034,.022,s*.114,-.004,-.012),skin);
  a.add(ell(.016,.032,.026,0,-.012,.118),skin);a.add(rbox(.17,.016,.03,.006,0,.046,.108),skin);
  if(o.hair){const hm=M(o.hair,.5);
   if(k==='jill'){a.add(loft([[-.1,.13,.12,0,-.034],[-.02,.138,.13,0,-.034],[.06,.134,.128,0,-.03],[.12,.1,.1,0,-.02],[.15,.04,.045,0,-.012]],26),hm);a.add(rbox(.2,.05,.06,.02,0,.1,.092),hm)}
   else if(k==='wesker'){a.add(loft([[.06,.116,.118,0,-.004],[.11,.108,.108,0,-.01],[.145,.06,.07,0,-.01],[.155,.0,.0,0,-.01]],26,true,false),hm);a.add(rbox(.2,.03,.06,.01,0,.085,.09),hm)}
   else{a.add(loft([[.05,.116,.118,0,-.002],[.1,.11,.112,0,-.008],[.135,.075,.082,0,-.01],[.15,.02,.03,0,-.012]],26,true,false),hm)}}
  if(o.helmet){const hm=M(o.helmet,.55,.2);a.add(loft([[-.03,.132,.142,0,-.006],[.04,.138,.148,0,-.006],[.1,.122,.132,0,-.008],[.15,.07,.08,0,-.01],[.172,.0,.0,0,-.01]],28,true,false),hm);a.add(rbox(.27,.022,.1,.01,0,.0,.108),hm);a.add(rbox(.06,.05,.04,.01,0,.105,.14),dark);for(const s of[-1,1]){a.add(rbox(.012,.15,.012,.004,s*.1,-.08,.045),leather)}a.add(rbox(.2,.04,.016,.006,0,.048,.15),M(0x30343a,.4,.5))}
  if(k==='josh'){a.add(cyl(.004,.004,.1,.12,-.05,.02,0,.5));a.add(rbox(.032,.07,.05,.01,.122,-.005,-.004),dark);a.add(cyl(.004,.004,.1,.1,-.08,.055,1.2,0));a.add(ell(.012,.012,.012,.07,-.1,.1),dark)}
  a.flush()}
 if(o.face){const fm0=new THREE.MeshStandardMaterial({map:o.face,transparent:true,alphaTest:.08,roughness:.7}),fp=new THREE.Mesh(new THREE.CylinderGeometry(.119,.119,.24,32,1,true,-.96,1.92),fm0);fp.position.set(0,-.005,0);V.head.add(fp);ctx.setFace&&ctx.setFace(fm0)}
 if(o.shades){const bk=new THREE.MeshBasicMaterial({color:0x000000}),fr=new THREE.MeshBasicMaterial({color:0x0a0a0a}),gl=new THREE.MeshBasicMaterial({color:0xcfe0ff,transparent:true,opacity:.95});for(const sx of[-1,1]){const ln=new THREE.Mesh(new THREE.BoxGeometry(.105,.062,.03),bk);ln.position.set(sx*.057,.014,.128);V.head.add(ln);const gx=new THREE.Mesh(new THREE.PlaneGeometry(.014,.05),gl);gx.position.set(sx*.057-.02,.018,.1445);gx.rotation.z=.55;V.head.add(gx);const gy=new THREE.Mesh(new THREE.PlaneGeometry(.006,.03),gl);gy.position.set(sx*.057-.006,.012,.1445);gy.rotation.z=.55;V.head.add(gy);const tp=new THREE.Mesh(new THREE.BoxGeometry(.012,.014,.2),fr);tp.position.set(sx*.118,.026,.02);V.head.add(tp)}const br=new THREE.Mesh(new THREE.BoxGeometry(.03,.014,.03),fr);br.position.set(0,.026,.13);V.head.add(br);const tb=new THREE.Mesh(new THREE.BoxGeometry(.235,.016,.034),fr);tb.position.set(0,.049,.127);V.head.add(tb)}
 /* limbs */
 for(const s of[-1,1]){const kk=s<0?'l':'r',sh=G(ch,s*.23*shw,.3,0);J[kk+'Sh']=sh;
  const ua=G(sh,0,-.14,0);{const a=new Acc(ua);a.add(loft([[.17,.052*bulk,.05],[.13,.068*bulk,.064],[.07,.062*bulk,.062],[-.02,.055*bulk,.056],[-.1,.047,.046],[-.15,.043,.043]],20),sleeve);a.add(ell(.07*bulk,.08,.066*bulk,0,.12,0),sleeve);a.add(ell(.05*bulk,.09,.048*bulk,0,.0,.012),sleeve);if(vestM&&k==='josh')a.add(rbox(.04,.07,.07,.01,s*.045,.1,0),vest2);a.flush()}V[kk+'Ua']=ua;
  const el=G(sh,0,-.28,0);J[kk+'El']=el;const fa=G(el,0,-.13,0);
  {const a=new Acc(fa);a.add(ell(.044,.044,.044,0,.14,0),sleeve);a.add(loft([[.15,.043,.043],[.1,.047,.048],[.03,.041,.041],[-.06,.034,.035],[-.125,.027,.031]],18),fore);
   if(k==='chris'||k==='josh')a.add(rbox(.06,.025,.06,.008,0,-.1,0),M(0x1a1a1a,.4,.4));
   const fy=-.165;a.add(rbox(.07,.07,.03,.012,0,fy,0),glove);const fz=[.0,.0,.0,.0];
   for(let i=0;i<4;i++){const x=-.0265+i*.0177,L=[.032,.03,.024][0];a.add(cyl(.0085,.0085,.032,x,fy-.06,.014,.45),glove);a.add(cyl(.0078,.0078,.028,x,fy-.088,.036,.95),glove);a.add(cyl(.007,.007,.022,x,fy-.098,.056,1.4),glove)}
   a.add(cyl(.0095,.0095,.036,s*-.045,fy-.012,.018,.35,s*.7),glove);a.add(cyl(.0088,.0088,.03,s*-.058,fy-.03,.034,.9,s*.9),glove);
   a.flush()}V[kk+'Fa']=fa;const hand=G(el,0,-.27,0);J[kk+'Hand']=hand;
  const hp=G(pel,s*.1*hip,-.06,0);J[kk+'Hip']=hp;const th=G(hp,0,-.22,0);
  {const a=new Acc(th);a.add(loft([[.235,.092,.098],[.15,.098,.106,0,.004],[.04,.088,.092],[-.08,.074,.078],[-.17,.062,.066],[-.235,.056,.058]],22),pants);a.add(ell(.058,.058,.062,0,-.235,.004),pants);if(k==='josh'||k==='doug'){a.add(rbox(.1,.07,.04,.014,0,-.2,.07),M(0x24241e,.8))}a.flush()}V[kk+'Th']=th;
  const kn=G(hp,0,-.45,0);J[kk+'Kn']=kn;const sn=G(kn,0,-.22,0);
  {const a=new Acc(sn);a.add(loft([[.23,.056,.058],[.17,.06,.064],[.08,.062,.058,0,-.012],[-.02,.052,.05],[-.14,.04,.04],[-.24,.034,.036]],20),pants);
   a.add(loft([[-.07,.05,.052],[-.17,.046,.05],[-.25,.044,.05]],18),boots);
   a.add(rbox(.092,.068,.17,.022,0,-.265,.035),boots);a.add(ell(.048,.034,.06,0,-.272,.108),boots);a.add(rbox(.1,.02,.27,.008,0,-.298,.04),M(0x0e0c0a,.9));a.add(rbox(.086,.03,.07,.01,0,-.286,-.06),M(0x0e0c0a,.9));
   for(let i=0;i<3;i++)a.add(rbox(.06,.008,.012,.003,0,-.2+i*.03,.05),M(0xd8d0c0,.9));
   if(k==='josh'||k==='chris'||k==='doug')a.add(ell(.058,.06,.05,0,.2,.045),M(0x24241e,.8));a.flush()}V[kk+'Sn']=sn;const an=G(kn,0,-.46,0);J[kk+'An']=an}
 scene.add(root);return{root,J,V,ph:0}}
/* ---- detailed weapons ---- */
export function makeGuns(retro){const cache=new Map(),M=(c,r=.7,m=0)=>{const k=c+'|'+r+'|'+m;let x=cache.get(k);if(!x){x=retro?new THREE.MeshLambertMaterial({color:c}):new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m});cache.set(k,x)}return x};
 const steel=M(0x1c1d20,.38,.85),poly=M(0x25252a,.7),wood=M(0x5a3f28,.65),acc=M(0x8a8a90,.35,.9);const out=[];
 const mk=fn=>{const g=new THREE.Group(),a=new Acc(g);fn(a);a.flush();out.push(g)};
 mk(a=>{a.add(rbox(.034,.04,.2,.008,0,.012,.06),steel);a.add(cyl(.009,.009,.03,0,.012,.165,Math.PI/2),steel);a.add(rbox(.03,.025,.16,.006,0,-.012,.04),poly);a.add(rbox(.032,.105,.045,.008,0,-.07,-.01,-.22),poly);a.add(rbox(.012,.03,.05,.003,0,-.04,.05),poly);a.add(rbox(.006,.012,.01,.002,0,.036,.14),steel);a.add(rbox(.014,.012,.01,.002,0,.036,-.03),steel);a.add(rbox(.03,.012,.04,.004,0,-.12,-.02,-.22),acc)});
 mk(a=>{a.add(cyl(.014,.014,.62,0,.012,.3,Math.PI/2),steel);a.add(cyl(.012,.012,.5,0,-.022,.26,Math.PI/2),steel);a.add(rbox(.05,.05,.2,.012,0,-.022,.26),wood);a.add(rbox(.045,.075,.22,.01,0,0,-.02),steel);a.add(rbox(.05,.09,.26,.014,0,-.03,-.27,.12),wood);a.add(rbox(.052,.1,.02,.006,0,-.04,-.4,.12),M(0x151515,.9));a.add(rbox(.035,.1,.05,.008,0,-.07,-.12,-.3),wood);a.add(rbox(.012,.03,.06,.003,0,-.045,.02),steel);a.add(rbox(.008,.012,.01,.002,0,.03,.6),acc);for(let i=0;i<4;i++)a.add(rbox(.04,.006,.012,.002,0,.034,.12+i*.03),steel)});
 mk(a=>{a.add(rbox(.045,.075,.3,.01,0,0,.05),steel);a.add(rbox(.05,.055,.22,.012,0,-.005,.3),poly);for(let i=0;i<5;i++)a.add(rbox(.054,.012,.02,.002,0,.012,.22+i*.04),steel);a.add(cyl(.011,.011,.26,0,.0,.5,Math.PI/2),steel);a.add(cyl(.016,.016,.05,0,0,.64,Math.PI/2),steel);a.add(cyl(.01,.01,.25,0,.045,.35,Math.PI/2),steel);a.add(rbox(.032,.14,.06,.008,0,-.1,.08,.25),poly);a.add(rbox(.035,.1,.05,.008,0,-.07,-.07,-.3),poly);a.add(rbox(.04,.08,.24,.012,0,-.015,-.26),poly);a.add(rbox(.02,.01,.3,.003,0,.045,.1),acc);a.add(cyl(.022,.022,.12,0,.068,.12,Math.PI/2),M(0x0e0e10,.4,.4));a.add(rbox(.024,.03,.02,.004,0,.052,.09),acc);a.add(rbox(.024,.03,.02,.004,0,.052,.16),acc)});
 return out}
/* ---- detailed cover props ---- */
const hashN=(x,z)=>Math.abs(Math.sin(x*12.9898+z*78.233)*43758.5453)%1;
export function detailProp(retro,me,t,d){const[w,h,dp]=d,cache=new Map(),M=(c,r=.8,m=0)=>{const k=c+'|'+r+'|'+m;let x=cache.get(k);if(!x){x=retro?new THREE.MeshLambertMaterial({color:c}):new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m});cache.set(k,x)}return x};
 const a=new Acc(me),hide=()=>{me.material.colorWrite=false;me.material.depthWrite=false;me.userData.nosh=1;me.castShadow=false},hs=hashN(me.position.x,me.position.z);
 if(t===0||t===6){const s=w,e=.07*s/1.3,bm=M(0x3e2a18,.85),br=M(0x707070,.4,.8);
  for(const sx of[-1,1])for(const sz of[-1,1])a.add(rbox(e,s,e,.01,sx*(s/2),0,sz*(s/2)),bm);
  for(const y of[-1,1])for(const sz of[-1,1]){a.add(rbox(s,e,e,.01,0,y*(s/2),sz*(s/2)),bm);a.add(rbox(e,e,s,.01,sz*(s/2),y*(s/2),0),bm)}
  for(const sz of[-1,1]){a.add(rbox(s*1.15,e*.8,.02,.004,0,0,sz*(s/2+.008),0,0,.78),bm);a.add(rbox(.02,e*.8,s*1.15,.004,sz*(s/2+.008),0,0,.78),bm)}
  for(const sx of[-1,1])for(const sy of[-1,1])a.add(rbox(.1*s/1.3,.1*s/1.3,.1*s/1.3,.012,sx*(s/2),sy*(s/2),s/2),br)}
 else if(t===1){hide();const col=[0x7a2a22,0x2a4a6a,0x7a6a22,0x4a3a2c][Math.floor(hs*4)],pm=M(col,.45,.7),rim=M(0x3a3a3a,.4,.8);
  a.add(loft([[-.6,.4,.4],[-.5,.43,.43],[0,.45,.45],[.5,.43,.43],[.6,.4,.4]],28),pm);for(const y of[-.32,0,.32])a.add(loft([[y-.02,.462,.462],[y+.02,.462,.462]],28,false,false),rim);a.add(cyl(.3,.3,.03,0,.61,0),rim);a.add(rbox(.1,.14,.012,.004,0,.1,.452),M(0xe8c020,.7))}
 else if(t===2){hide();const sh=new THREE.Shape();sh.moveTo(-.35,0);sh.lineTo(.35,0);sh.lineTo(.35,.18);sh.lineTo(.17,.55);sh.lineTo(.12,.9);sh.lineTo(-.12,.9);sh.lineTo(-.17,.55);sh.lineTo(-.35,.18);sh.closePath();const g=new THREE.ExtrudeGeometry(sh,{depth:w,bevelEnabled:true,bevelSize:.012,bevelThickness:.012,bevelSegments:1});g.rotateY(Math.PI/2);g.translate(-w/2,-h/2,0);g.deleteAttribute('uv');a.add(g.toNonIndexed().index?g:(()=>{const x=g;return x})(),M(0x8c8a84,.9))}
 else{const long=w>=dp?'x':'z',L=Math.max(w,dp),T=Math.min(w,dp),tints=[0x2a4a6a,0x7a2a22,0x2a5a3a,0x8a5a20,0x4a4a52],tint=tints[Math.floor(hs*tints.length)];me.material.color.set(tint);const rib=M(tint,.55,.5);
  const n=Math.floor(L/.14);for(let i=0;i<n;i++){const p=-L/2+.1+i*(L-.2)/(n-1);for(const s of[-1,1]){if(long==='x')a.add(rbox(.05,h-.12,.03,.004,p,0,s*(T/2+.012)),rib);else a.add(rbox(.03,h-.12,.05,.004,s*(T/2+.012),0,p),rib)}}
  const door=M(0x3a3a3e,.4,.7),e2=L/2+.012;for(const s of[-1,1]){const lx=long==='x'?s*e2:0,lz=long==='x'?0:s*e2;for(const o of[-.12,.12]){a.add(cyl(.015,.015,h-.2,lx+(long==='x'?0:o*1),0,lz+(long==='x'?o:0),0,0,8),door)}a.add(rbox(long==='x'?.03:.3,.16,long==='x'?.3:.03,.008,lx,0,lz),door)}
  for(const s of[-1,1])for(const u of[-1,1])for(const v of[-1,1])a.add(rbox(.12,.12,.12,.01,long==='x'?u*L/2:v*T/2,s*h/2,long==='x'?v*T/2:u*L/2),door)}
 a.flush()}
