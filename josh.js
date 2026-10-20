import*as THREE from './three.module.min.js';
import*as CANNON from './cannon-es.js';
import{jgen}from './jlines.js';
import{initVoice,speak}from './voice.js';
const rn=(a,b)=>a+Math.random()*(b-a),cl=(v,a,b)=>Math.max(a,Math.min(b,v)),pk=a=>a[Math.random()*a.length|0],V3=(x,y,z)=>new THREE.Vector3(x,y,z);
export function start({onExit}){
if(matchMedia('(pointer:coarse)').matches){alert('The Josh and Doug mission needs a keyboard and mouse.');onExit&&onExit();return}
const wn=document.createElement('div');wn.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.96);display:grid;place-content:center;justify-items:center;gap:1rem;z-index:20;text-align:center;padding:24px;color:#d8e0cc;font-family:Palatino,Georgia,serif';
const bs='background:none;border:1px solid #d8e0cc;color:inherit;font:inherit;padding:.6em 1.4em;cursor:pointer';
wn.innerHTML='<h2 style="margin:0;color:#b3262a">Content warning</h2><p style="max-width:32rem;line-height:1.6">Graphic violence, blood, strong language, and disturbing content. Headphones recommended. Keyboard and mouse required.</p><label><input type="checkbox" id="gz" checked> Gore (blood and gibs)</label><label><input type="checkbox" id="sb2" checked> Subtitles</label><p><button id="jgo" style="'+bs+'">Start</button> <button id="jno" style="'+bs+'">Back</button></p>';
document.body.appendChild(wn);const q=s=>wn.querySelector(s);
q('#jno').onclick=()=>{wn.remove();onExit&&onExit()};
q('#jgo').onclick=()=>{const g=q('#gz').checked,s=q('#sb2').checked;wn.remove();run({gore:g,subs:s,onExit})}}
export const _run=run;
function run({gore,subs,onExit}){
const W=()=>innerWidth,H=()=>innerHeight;
const rd=new THREE.WebGLRenderer({antialias:false});rd.setSize(W(),H());rd.outputColorSpace=THREE.LinearSRGBColorSpace;
const cv=rd.domElement;cv.style.cssText='position:fixed;inset:0;z-index:7;image-rendering:pixelated;cursor:crosshair;width:100%;height:100%';document.body.appendChild(cv);document.body.classList.add('inworld');
const RH=270,mkRT=()=>new THREE.WebGLRenderTarget(Math.max(2,Math.round(RH*W()/H())),RH,{minFilter:THREE.NearestFilter,magFilter:THREE.NearestFilter});let RT=mkRT();
const pu={t:{value:RT.texture},r:{value:new THREE.Vector2(RT.width,RT.height)}};
const ps=new THREE.Scene(),pc=new THREE.OrthographicCamera(-1,1,1,-1,0,1);
ps.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),new THREE.ShaderMaterial({uniforms:pu,vertexShader:'varying vec2 u;void main(){u=uv;gl_Position=vec4(position.xy,0.,1.);}',fragmentShader:'uniform sampler2D t;uniform vec2 r;varying vec2 u;void main(){vec3 c=texture2D(t,u).rgb;vec2 p=floor(u*r);float d=mod(p.x+2.*p.y,4.)/4.-.375;c=pow(max(c,vec3(0.)),vec3(.4545));c=floor((c+d*.05)*28.+.5)/28.;gl_FragColor=vec4(c,1.);}'})));
const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(62,W()/H(),.1,120);
const FOG=0x20261f;sc.background=new THREE.Color(FOG);sc.fog=new THREE.Fog(FOG,6,52);
sc.add(new THREE.HemisphereLight(0x9aa890,0x201810,.9));const pl=new THREE.PointLight(0xffe2b0,16,24,1),fl=new THREE.PointLight(0xffaa44,0,18,1);sc.add(pl,fl);
/* audio */
const ac=new(window.AudioContext||window.webkitAudioContext)(),OUT=ac.createGain(),EB=ac.createGain(),VB=ac.createGain();EB.connect(OUT);VB.connect(OUT);OUT.connect(ac.destination);ac.resume();
const nbuf=ac.createBuffer(1,ac.sampleRate*2,ac.sampleRate),nd=nbuf.getChannelData(0);for(let i=0;i<nd.length;i++)nd[i]=Math.random()*2-1;
const ns=(fq,qq,g,dur,d)=>{const s=ac.createBufferSource();s.buffer=nbuf;const b=ac.createBiquadFilter();b.type='bandpass';b.frequency.value=fq;b.Q.value=qq;const gn=ac.createGain(),t=ac.currentTime+(d||0);gn.gain.setValueAtTime(g,t);gn.gain.exponentialRampToValueAtTime(.001,t+dur);s.connect(b);b.connect(gn);gn.connect(EB);s.start(t);s.stop(t+dur+.05)};
const tn=(f0,f1,g,dur,d)=>{const o=ac.createOscillator(),gn=ac.createGain(),t=ac.currentTime+(d||0);o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+dur);gn.gain.setValueAtTime(g,t);gn.gain.exponentialRampToValueAtTime(.001,t+dur);o.connect(gn);gn.connect(EB);o.start(t);o.stop(t+dur+.05)};
{const wi=ac.createBufferSource();wi.buffer=nbuf;wi.loop=true;const wf=ac.createBiquadFilter();wf.type='lowpass';wf.frequency.value=300;const wg=ac.createGain();wg.gain.value=.05;wi.connect(wf);wf.connect(wg);wg.connect(EB);wi.start();const o=ac.createOscillator(),og=ac.createGain();o.frequency.value=52;og.gain.value=.03;o.connect(og);og.connect(EB);o.start()}
const shotS=w=>{if(w===0){ns(1800,.6,.5,.12);tn(130,50,.4,.14)}else if(w===1){ns(900,.5,.8,.35);tn(90,35,.7,.3)}else{ns(2200,.7,.4,.09);tn(150,60,.3,.1)}},boomS=()=>{ns(300,.4,.9,1.2);tn(60,25,.9,1.2);ns(1200,.5,.5,.4)},reloadS=()=>{tn(900,500,.1,.05);tn(700,400,.1,.05,.55)},hitS=()=>ns(500,2,.25,.1),stepS=()=>ns(220,1,.05,.07),grS=()=>{tn(70,52,.12,.8);ns(300,3,.08,.8)};
let AU={m:1,v:1,e:1};try{Object.assign(AU,JSON.parse(localStorage.getItem('ji_audio2')||'{}'))}catch(e){}
const applyAU=()=>{OUT.gain.value=AU.m;VB.gain.value=AU.v;EB.gain.value=AU.e;try{localStorage.setItem('ji_audio2',JSON.stringify(AU))}catch(e){}};applyAU();
/* textures */
const hs=(x,y)=>{const s=Math.sin(x*12.9898+y*78.233)*43758.5453;return s-Math.floor(s)};
function tex(n,fn){const c=document.createElement('canvas');c.width=c.height=n;const x=c.getContext('2d'),d=x.createImageData(n,n);for(let j=0;j<n;j++)for(let i=0;i<n;i++){const k=(j*n+i)*4,v=fn(i,j);d.data[k]=v[0];d.data[k+1]=v[1];d.data[k+2]=v[2];d.data[k+3]=255}x.putImageData(d,0,0);const t=new THREE.CanvasTexture(c);t.magFilter=t.minFilter=THREE.NearestFilter;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.colorSpace=THREE.SRGBColorSpace;return t}
const TX={asp:tex(32,(i,j)=>{const n=hs(i,j)*30;return[52+n,52+n,56+n]}),brick:tex(32,(i,j)=>{const r=j>>3,bx=(i+(r&1)*8)&15,m=(j&7)<1||bx<1,n=hs(i,j)*34;return m?[38,34,32]:[118+n,60+n*.5,48+n*.4]}),conc:tex(32,(i,j)=>{const n=hs(i,j)*28;return[104+n,102+n,96+n]}),wood:tex(32,(i,j)=>{const n=hs(i,j)*26,e=(i&15)<1||(j&15)<1;return e?[60,40,22]:[140+n,98+n,54+n*.4]}),rust:tex(32,(i,j)=>{const n=hs(i,j)*40,b=(j&7)<1;return b?[60,30,20]:[120+n,66+n*.6,38]})};
const mt=(t,rx,ry)=>{const c=t.clone();c.needsUpdate=true;c.repeat.set(rx,ry);return new THREE.MeshLambertMaterial({map:c})},mm=c=>new THREE.MeshLambertMaterial({color:c});
/* level */
const solids=[],covers=[],pickups=[];
function bx(x,y,z,w,h,d,m,solid,cover){const me=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);me.position.set(x,y,z);sc.add(me);if(solid)solids.push({x0:x-w/2,x1:x+w/2,z0:z-d/2,z1:z+d/2,h:y+h/2});if(cover)covers.push({x,z,hw:w/2,hd:d/2});return me}
bx(0,-.25,-48,22,.5,114,mt(TX.asp,6,28),false);
for(let z=-98;z<=4;z+=12){for(const sx of[-1,1]){const hh=rn(7,13);bx(sx*9.5,hh/2,z,5,hh,12,mt(TX.brick,3,hh/4),true);if(Math.random()<.7)bx(sx*7.02,rn(2.5,5),z+rn(-4,4),.05,1.2,.9,new THREE.MeshBasicMaterial({color:0xcc9a40}),false)}}
bx(0,5,6,20,10,2,mt(TX.conc,4,2),true);bx(0,5,-103,20,10,2,mt(TX.conc,4,2),true);bx(-3,3,-99,1,6,1,mt(TX.conc,1,2),true);bx(3,3,-99,1,6,1,mt(TX.conc,1,2),true);bx(0,2.5,-100.5,5,5,.1,new THREE.MeshBasicMaterial({color:0x40ff70,transparent:true,opacity:.45}),false);
[[-3,-7,0],[4,-10,1],[0,-17,2],[-5,-21,0],[5,-27,3],[2,-32,1],[-4,-39,2],[3,-46,0],[-2,-53,3],[5,-59,2],[-5,-65,1],[1,-73,2],[4,-81,0],[-4,-87,3],[0,-93,2]].forEach(([x,z,t])=>{const d=[[1.3,1.3,1.3,TX.wood],[.9,1.2,.9,TX.rust],[3,.9,.7,TX.conc],[4,1.4,1.8,TX.rust]][t];bx(x,d[1]/2,z,d[0],d[1],d[2],mt(d[3],1,1),true,true)});
[-14,-40,-66,-92].forEach(z=>{bx(6.5,2.5,z,.2,5,.2,mt(TX.rust,1,2),false);bx(6.5,5.1,z,.5,.2,.5,new THREE.MeshBasicMaterial({color:0xffc060}),false);const l=new THREE.PointLight(0xffb060,9,20,1);l.position.set(6,4.8,z);sc.add(l)});
for(let i=0;i<40;i++)bx(rn(-6,6),.12,rn(-96,0),rn(.2,.6),.24,rn(.2,.6),mt(TX.conc,1,1),false);
[-18,-40,-62,-82].forEach(z=>{const m=bx(rn(-4,4),.3,z,.5,.5,.5,new THREE.MeshLambertMaterial({color:0x4f8f3f,emissive:0x1a3a10}),false);pickups.push({m,x:m.position.x,z})});
const world=new CANNON.World();world.gravity.set(0,-20,0);const gb=new CANNON.Body({mass:0,shape:new CANNON.Plane()});gb.quaternion.setFromEuler(-Math.PI/2,0,0);world.addBody(gb);
solids.forEach(s=>{world.addBody(new CANNON.Body({mass:0,shape:new CANNON.Box(new CANNON.Vec3((s.x1-s.x0)/2,s.h/2,(s.z1-s.z0)/2)),position:new CANNON.Vec3((s.x0+s.x1)/2,s.h/2,(s.z0+s.z1)/2)}))});
function slide(p,r){for(const s of solids){if(s.h<.2)continue;const cx=cl(p.x,s.x0,s.x1),cz=cl(p.z,s.z0,s.z1),dx=p.x-cx,dz=p.z-cz,d2=dx*dx+dz*dz;if(d2<r*r){if(d2>1e-6){const d=Math.sqrt(d2),k=(r-d)/d;p.x+=dx*k;p.z+=dz*k}else{const l=p.x-s.x0,rr=s.x1-p.x,t=p.z-s.z0,b=s.z1-p.z,m=Math.min(l,rr,t,b);if(m===l)p.x=s.x0-r;else if(m===rr)p.x=s.x1+r;else if(m===t)p.z=s.z0-r;else p.z=s.z1+r}}}}
const bound=p=>{p.x=cl(p.x,-6.7,6.7);p.z=cl(p.z,-101,3.5)};
/* characters */
const ld=new THREE.TextureLoader(),ft=u=>{const t=ld.load(u);t.magFilter=t.minFilter=THREE.NearestFilter;t.colorSpace=THREE.SRGBColorSpace;return t},FJ=ft('josh.webp'),FD=ft('doug.webp');
function limb(w,h,d,c,x,y){const p=new THREE.Group();p.position.set(x,y,0);const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mm(c));m.position.y=-h/2;p.add(m);return p}
function human(shirt,pants,skin,face){const g=new THREE.Group(),sk=mm(skin),fm=face?new THREE.MeshLambertMaterial({map:face}):sk;
const torso=new THREE.Mesh(new THREE.BoxGeometry(.5,.65,.28),mm(shirt));torso.position.y=1.05;const head=new THREE.Mesh(new THREE.BoxGeometry(.3,.32,.3),[sk,sk,sk,sk,fm,sk]);head.position.y=1.55;
const la=limb(.14,.6,.16,shirt,-.34,1.35),ra=limb(.14,.6,.16,shirt,.34,1.35),ll=limb(.18,.7,.2,pants,-.13,.7),rl=limb(.18,.7,.2,pants,.13,.7);g.add(torso,head,la,ra,ll,rl);g.userData={torso,head,la,ra,ll,rl};sc.add(g);return g}
function zomb(t){const g=human(0x4a4238,0x2a2a2a,0x7a8a70,null);g.userData.head.visible=false;const m=new THREE.Group();m.add(new THREE.Mesh(new THREE.CylinderGeometry(.15,.15,.6,8),mm(0xb0b4a8)));const nose=new THREE.Mesh(new THREE.ConeGeometry(.15,.28,8),mm(t==='exploder'?0xd03020:0x808878));nose.position.y=.44;m.add(nose);
for(let i=0;i<3;i++){const f=new THREE.Mesh(new THREE.BoxGeometry(.04,.22,.2),mm(0x555a50)),a=i*2.09;f.position.set(Math.sin(a)*.17,-.28,Math.cos(a)*.17);f.rotation.y=a;m.add(f)}m.position.y=1.8;g.add(m);g.userData.la.rotation.x=-1.2;g.userData.ra.rotation.x=-1.2;return g}
const josh={g:human(0x5a6a48,0x3a3a30,0xc09070,FJ),pos:V3(0,0,2),hp:100,yaw:0,pit:0,w:0,cd:0,rel:0,crouch:false,walkT:0,moving:false},doug={g:human(0x5a6a48,0x3a3a30,0x8a5a3a,FD),pos:V3(1.6,0,3.6),hp:100,th:0,cover:null,crouch:false,walkT:0,moving:false,cvLine:false};
{const h=new THREE.Mesh(new THREE.BoxGeometry(.36,.16,.36),mm(0x4a5a40));h.position.y=1.74;doug.g.add(h);const gun=new THREE.Mesh(new THREE.BoxGeometry(.08,.1,.4),mm(0x222222));gun.position.set(0,-.55,.22);josh.g.userData.ra.add(gun)}
const zs=[];
/* ragdoll, particles */
let rds=[];const rmRd=R=>{R.bodies.forEach(b=>world.removeBody(b));(R.cs||[]).forEach(c=>world.removeConstraint(c));R.meshes.forEach(([m])=>sc.remove(m))};
function ragdoll(g,vel,noHead){g.updateMatrixWorld(true);const U=g.userData,parts=[['torso',U.torso,.5,.65,.28,3],['head',U.head,.3,.32,.3,1],['la',U.la.children[0],.14,.6,.16,.8],['ra',U.ra.children[0],.14,.6,.16,.8],['ll',U.ll.children[0],.18,.7,.2,1],['rl',U.rl.children[0],.18,.7,.2,1]],R={meshes:[],bodies:[],cs:[],t:performance.now()},bd={},wp=new THREE.Vector3(),wq=new THREE.Quaternion();
for(const[n,m,w,h,d,mass]of parts){if(n==='head'&&noHead)continue;m.getWorldPosition(wp);m.getWorldQuaternion(wq);const b=new CANNON.Body({mass,shape:new CANNON.Box(new CANNON.Vec3(w/2,h/2,d/2)),position:new CANNON.Vec3(wp.x,wp.y,wp.z),quaternion:new CANNON.Quaternion(wq.x,wq.y,wq.z,wq.w),linearDamping:.2,angularDamping:.4});b.velocity.set(vel.x+rn(-1,1),vel.y+rn(0,2),vel.z+rn(-1,1));world.addBody(b);bd[n]=b;const me=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m.material);sc.add(me);R.meshes.push([me,b]);R.bodies.push(b)}
const link=(a,b,pa,pb)=>{if(bd[a]&&bd[b]){const c=new CANNON.PointToPointConstraint(bd[a],new CANNON.Vec3(...pa),bd[b],new CANNON.Vec3(...pb));world.addConstraint(c);R.cs.push(c)}};
link('torso','head',[0,.33,0],[0,-.16,0]);link('torso','la',[-.32,.28,0],[0,.3,0]);link('torso','ra',[.32,.28,0],[0,.3,0]);link('torso','ll',[-.13,-.33,0],[0,.35,0]);link('torso','rl',[.13,-.33,0],[0,.35,0]);
rds.push(R);if(rds.length>9)rmRd(rds.shift());sc.remove(g);return R}
const mkPts=(n,col,sz)=>{const gm=new THREE.BufferGeometry();gm.setAttribute('position',new THREE.BufferAttribute(new Float32Array(n*3).fill(-999),3));const p=new THREE.Points(gm,new THREE.PointsMaterial({color:col,size:sz,sizeAttenuation:true}));p.frustumCulled=false;sc.add(p);return{p,n,v:new Float32Array(n*3),l:new Float32Array(n),i:0}},bl=mkPts(260,0x8a0000,.16),sp=mkPts(60,0xffd060,.1);
function emit(S,pt,dir,k,spd,life){for(let j=0;j<k;j++){const i=S.i++%S.n;S.p.geometry.attributes.position.setXYZ(i,pt.x,pt.y,pt.z);S.v[i*3]=dir.x*spd+rn(-1.5,1.5);S.v[i*3+1]=dir.y*spd+rn(.5,3);S.v[i*3+2]=dir.z*spd+rn(-1.5,1.5);S.l[i]=life*rn(.6,1)}}
function stepPts(S,dt,floor){const a=S.p.geometry.attributes.position;for(let i=0;i<S.n;i++){if(S.l[i]<=0)continue;S.l[i]-=dt;S.v[i*3+1]-=14*dt;const y=a.getY(i)+S.v[i*3+1]*dt;a.setXYZ(i,a.getX(i)+S.v[i*3]*dt,y,a.getZ(i)+S.v[i*3+2]*dt);if(y<.03){if(floor&&gore)decal(a.getX(i),a.getZ(i),rn(.1,.3),0x5a0000);S.l[i]=0;a.setY(i,-999)}if(S.l[i]<=0)a.setY(i,-999)}a.needsUpdate=true}
const dcs=[];let di=0;function decal(x,z,s,c){let d=dcs[di%90];if(!d){d=new THREE.Mesh(new THREE.PlaneGeometry(1,1).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.85,depthWrite:false}));sc.add(d);dcs[di%90]=d}di++;d.material.color.set(c);d.position.set(x,.03+rn(0,.004),z);d.scale.set(s,1,s);return d}
const pools=[],bloodAt=(pt,dir,k)=>{if(gore){emit(bl,pt,dir,k,3,.9)}hitS()},sparkAt=pt=>emit(sp,pt,V3(0,1,0),6,2,.3),pool=(x,z)=>{if(gore)pools.push({d:decal(x,z,.2,0x5a0000),t:0,x,z})};
/* effects */
const fxs=[];let shake=0,flashT=0;
function tracer(a,b){const l=new THREE.Line(new THREE.BufferGeometry().setFromPoints([a,b]),new THREE.LineBasicMaterial({color:0xffe9a0}));sc.add(l);fxs.push({m:l,t:.06,kind:'line'})}
function boom(p,r,dmg,src){boomS();shake=Math.max(shake,.7);fl.position.copy(p);fl.intensity=40;const s=new THREE.Mesh(new THREE.SphereGeometry(1,10,8),new THREE.MeshBasicMaterial({color:0xffa040,transparent:true,opacity:.9}));s.position.copy(p);sc.add(s);fxs.push({m:s,t:.35,max:.35,r,kind:'boom'});decal(p.x,p.z,r*.7,0x111111);
for(const z of zs.slice()){if(z===src||z.dead)continue;const d=p.distanceTo(V3(z.pos.x,1,z.pos.z));if(d<r){z.hp-=dmg*(1-d/r)*1.6;z.stag=.4;if(z.hp<=0)killZ(z,false,V3(z.pos.x-p.x,.5,z.pos.z-p.z).normalize())}}
for(const e of[josh,doug]){const d=p.distanceTo(V3(e.pos.x,1,e.pos.z));if(d<r)hurt(e,dmg*(1-d/r))}
for(const R of rds)for(const b of R.bodies){const dx=b.position.x-p.x,dy=b.position.y-p.y+.5,dz=b.position.z-p.z,d=Math.hypot(dx,dy,dz);if(d<r*1.6){const k=22*(1-d/(r*1.6))/(d||1);b.applyImpulse(new CANNON.Vec3(dx*k,dy*k+3,dz*k))}}}
/* state */
const WP=[{n:'Pistol',mag:12,rate:.28,spr:.006,pel:1,dmg:26,rel:1.2,kick:.05,auto:false},{n:'Shotgun',mag:6,rate:.95,spr:.06,pel:8,dmg:12,rel:2.1,kick:.25,auto:false},{n:'Assault Rifle',mag:30,rate:.09,spr:.022,pel:1,dmg:14,rel:1.8,kick:.08,auto:true}],AM=[{mag:12,res:60},{mag:6,res:24},{mag:30,res:120}];
const WV=[[-6,3],[-26,4],[-46,5],[-66,6],[-84,7]];let wave=0,kills=0,over=null,paused=true,cleared=-1,ck={z:2},mdown=false,idleT=performance.now()+18000;const keys={};
function hurt(e,d){if(over||e.hp<=0)return;e.hp-=d;if(e===josh){shake=Math.max(shake,.3);rvT=.5;say('josh','hurt',{},4000)}else{say('doug','hit',{},4000);say('josh','doughit',{},5000)}if(e.hp<=0)lose(e===doug?'Doug is dead.':'Josh is dead.')}
let rvT=0;
function killZ(z,head,dir,noBoom,big){if(z.dead)return;z.dead=true;const i=zs.indexOf(z);if(i>=0)zs.splice(i,1);kills++;const hp=V3(z.pos.x,1.7,z.pos.z);if(!noBoom)boom(hp,big?4:3.5,big?60:45,z);ragdoll(z.g,dir?dir.clone().multiplyScalar(5):V3(0,2,0),true);bloodAt(hp,dir||V3(0,1,0),gore?26:0);pool(z.pos.x,z.pos.z);say('josh',head?'headshot':'kill',{},3500);say('zom','die',{},5000)}
function spawn(n){for(let i=0;i<n;i++){const t=Math.random()<.55?'charger':'exploder',g=zomb(t);zs.push({g,pos:V3(rn(-5,5),0,Math.max(-100,josh.pos.z-rn(26,38))),hp:t==='exploder'?45:60,type:t,spd:t==='exploder'?3.4:4,tgt:Math.random()<.8?'doug':'josh',st:'run',ft:0,walkT:0,stag:0,bt:.3,side:1,sideT:0,dead:false})}say('josh','wave',{},5000);say('doug','wave',{},7000);say('zom','lock',{},6000)}
/* ray */
function rayBox(o,d,s){let t0=0,t1=1e9;for(const[a,da,lo,hi]of[[o.x,d.x,s.x0,s.x1],[o.y,d.y,0,s.h],[o.z,d.z,s.z0,s.z1]]){if(Math.abs(da)<1e-8){if(a<lo||a>hi)return 1e9}else{let u=(lo-a)/da,v=(hi-a)/da;if(u>v){const x=u;u=v;v=x}t0=Math.max(t0,u);t1=Math.min(t1,v);if(t0>t1)return 1e9}}return t0}
function raySph(o,d,c,r){const m=c.clone().sub(o),b=m.dot(d),cc=m.dot(m)-r*r;if(b<0&&cc>0)return 1e9;const ds=b*b-cc;if(ds<0)return 1e9;return Math.max(0,b-Math.sqrt(ds))}
function castRay(o,d,mx){let tS=mx,k='none';for(const s of solids){const t=rayBox(o,d,s);if(t<tS){tS=t;k='solid'}}if(d.y<-1e-4){const t=-o.y/d.y;if(t>0&&t<tS){tS=t;k='ground'}}let best={t:tS,k};for(const z of zs){if(z.dead)continue;const th=raySph(o,d,V3(z.pos.x,1.8,z.pos.z),.34),tb=raySph(o,d,V3(z.pos.x,1,z.pos.z),.55);if(th<best.t)best={t:th,k:'head',z};else if(tb<best.t)best={t:tb,k:'body',z}}return best}
function fire(){const w=WP[josh.w],a=AM[josh.w];if(josh.cd>0||josh.rel>0||over||paused)return;if(a.mag<=0){reload();return}a.mag--;josh.cd=w.rate;shake=Math.max(shake,w.kick);shotS(josh.w);
const o=cam.position.clone(),cd=new THREE.Vector3();cam.getWorldDirection(cd);const mp=V3(josh.pos.x-Math.sin(josh.yaw)*.6+Math.cos(josh.yaw)*.3,1.3,josh.pos.z-Math.cos(josh.yaw)*.6-Math.sin(josh.yaw)*.3);
for(let p=0;p<w.pel;p++){const d=cd.clone().add(V3(rn(-1,1),rn(-1,1),rn(-1,1)).multiplyScalar(w.spr)).normalize(),h=castRay(o,d,70),pt=o.clone().addScaledVector(d,h.t);tracer(mp,pt);
if(h.k==='head')killZ(h.z,true,d);else if(h.k==='body'){h.z.hp-=w.dmg;h.z.stag=.25;bloodAt(pt,d,6);if(h.z.hp<=0)killZ(h.z,false,d)}else if(h.k==='solid'||h.k==='ground')sparkAt(pt)}
fl.position.set(mp.x,1.4,mp.z);fl.intensity=14;if(Math.random()<.2)say('josh','fire',{},5000);if(a.mag+a.res<10&&Math.random()<.5)say('josh','lowammo',{},12000)}
function reload(){const w=WP[josh.w],a=AM[josh.w];if(josh.rel>0||a.mag>=w.mag||a.res<=0)return;josh.rel=w.rel;reloadS();say('josh','reload',{},8000)}
/* Doug AI */
function bestCover(t){let best=null,bs=-1e9;for(const c of covers){const ax=c.x-t.pos.x,az=c.z-t.pos.z,l=Math.hypot(ax,az)||1,off=Math.max(c.hw,c.hd)+.9,nx=cl(c.x+ax/l*off,-6.4,6.4),nz=cl(c.z+az/l*off,-100,3),dd=Math.hypot(doug.pos.x-nx,doug.pos.z-nz);if(dd>14||Math.hypot(nx-t.pos.x,nz-t.pos.z)<4)continue;const s=-dd-.5*Math.hypot(nx-josh.pos.x,nz-josh.pos.z);if(s>bs){bs=s;best={x:nx,z:nz}}}return best}
function step(e,tx,tz,sp,dt){const dx=tx-e.pos.x,dz=tz-e.pos.z,l=Math.hypot(dx,dz);if(l>.15){const m=Math.min(l,sp*dt);e.pos.x+=dx/l*m;e.pos.z+=dz/l*m;slide(e.pos,.4);bound(e.pos);e.g.rotation.y=Math.atan2(dx,dz);e.walkT+=dt*sp*1.6;e.moving=true}else e.moving=false}
function dougAI(dt){const D=doug;if(D.hp<=0)return;D.th-=dt;let near=null,nd=1e9;for(const z of zs){const d=Math.hypot(z.pos.x-D.pos.x,z.pos.z-D.pos.z);if(d<nd){nd=d;near=z}}
let tx,tz,sp2=3.4;
if(near&&nd<26){if(D.th<=0){D.th=.5;D.cover=bestCover(near)}
if(D.cover&&nd>3.5){tx=D.cover.x;tz=D.cover.z;if(Math.hypot(D.pos.x-tx,D.pos.z-tz)<.6){D.crouch=true;tx=D.pos.x;tz=D.pos.z;if(!D.cvLine){D.cvLine=true;say('doug','cover',{},9000);say('josh','cover',{},9000)}}else{D.crouch=false;sp2=4.4}}
else{const ax=D.pos.x-near.pos.x,az=D.pos.z-near.pos.z,l=Math.hypot(ax,az)||1;tx=josh.pos.x+ax/l*3.2;tz=josh.pos.z+az/l*3.2;sp2=5;D.crouch=false;if(nd<10)say('doug','panic',{},5000)}}
else{D.crouch=false;D.cvLine=false;tx=josh.pos.x+Math.sin(josh.yaw)*2.4-Math.cos(josh.yaw)*1.4;tz=josh.pos.z+Math.cos(josh.yaw)*2.4+Math.sin(josh.yaw)*1.4;sp2=Math.hypot(D.pos.x-tx,D.pos.z-tz)>5?5:3.4}
if(near){const dx=tx-D.pos.x,dz=tz-D.pos.z,l=Math.hypot(dx,dz);if(l>.1){const nx=D.pos.x+dx/l*sp2*dt,nz=D.pos.z+dz/l*sp2*dt;if(Math.hypot(nx-near.pos.x,nz-near.pos.z)<Math.min(nd,3.2)-.01){tx=D.pos.x;tz=D.pos.z}}}
step(D,tx,tz,sp2,dt)}
/* voice */
const VP={josh:{pitch:34,speed:165,rate:1,who:'Josh',c:'#9fc27a'},doug:{pitch:56,speed:178,rate:1.05,who:'Doug',c:'#e0b070'},zom:{pitch:6,speed:88,rate:.7,who:'Missile Zombie',c:'#d06060',deep:true}};
let vq=[],vb=false;const lastV={};
function say(w,k,c,cd){const n=performance.now(),key=w+k;if(n<(lastV[key]||0)||vq.length>1||(over&&!k.startsWith('win')))return;lastV[key]=n+(cd||6000);vq.push([w,k,c||{}]);pump()}
async function pump(){if(vb)return;vb=true;while(vq.length){const[w,k,c]=vq.shift(),t=jgen(w+'_'+k,c),p=VP[w];showSub(t,p.who,p.c);await Promise.all([speak(t,{deep:!!p.deep,pitch:p.pitch,speed:p.speed,rate:p.rate,pan:0}),new Promise(r=>setTimeout(r,Math.max(1400,t.length*65)))]);await new Promise(r=>setTimeout(r,300))}vb=false}
/* HUD */
const hud=document.createElement('div');hud.style.cssText='position:fixed;inset:0;z-index:8;pointer-events:none;font-family:Palatino,Georgia,serif;color:#d8e0cc';
hud.innerHTML='<div id="ob" style="position:absolute;top:14px;left:14px;font-size:.9rem;opacity:.85"></div><div style="position:absolute;left:50%;top:50%;width:14px;height:14px;margin:-7px;border:1px solid #fff;border-radius:50%;opacity:.7"></div><div style="position:absolute;left:14px;bottom:14px;font-size:.85rem">Josh<div style="width:160px;height:8px;background:#222"><div id="hj" style="height:100%;background:#8fbf5f;width:100%"></div></div>Doug<div style="width:160px;height:8px;background:#222"><div id="hd" style="height:100%;background:#e0b070;width:100%"></div></div></div><div id="am" style="position:absolute;right:16px;bottom:14px;font-size:1.1rem;text-align:right"></div><div id="sb" style="position:absolute;bottom:90px;width:100%;text-align:center;padding:0 8%;box-sizing:border-box;font-size:clamp(1rem,2.4vw,1.4rem);text-shadow:0 0 6px #000,0 0 12px #000;opacity:0;transition:opacity .3s"></div><div id="rv" style="position:absolute;inset:0;background:radial-gradient(transparent 40%,rgba(160,0,0,.8));opacity:0"></div><div id="pz" style="position:absolute;inset:0;display:grid;place-content:center;text-align:center;background:rgba(0,0,0,.55);line-height:1.8">Click to play<br><small>WASD move · Shift sprint · C crouch · Click fire · R reload · 1 2 3 weapons · O audio</small></div>';
document.body.appendChild(hud);const $=s=>hud.querySelector(s);
const mkBtn=(t,r)=>{const b=document.createElement('button');b.textContent=t;b.style.cssText='position:absolute;top:14px;right:'+r+'px;pointer-events:auto;background:none;border:1px solid #d8e0cc;color:inherit;font:inherit;padding:.4em 1em;cursor:pointer';hud.appendChild(b);return b},lvB=mkBtn('Leave',14),auB=mkBtn('Audio',98);
const ap=document.createElement('div');ap.style.cssText='position:absolute;top:54px;right:14px;background:rgba(0,0,0,.85);border:1px solid #d8e0cc;padding:12px 16px;display:none;pointer-events:auto;font-size:.85rem;min-width:220px';
[['m','Master'],['v','Voices'],['e','Effects']].forEach(([k,n])=>{const l=document.createElement('label');l.style.cssText='display:flex;justify-content:space-between;gap:10px;margin:6px 0';const r=document.createElement('input');r.type='range';r.min=0;r.max=1;r.step=.05;r.value=AU[k];r.oninput=()=>{AU[k]=+r.value;applyAU()};l.append(n,r);ap.appendChild(l)});hud.appendChild(ap);
const togglePanel=()=>{ap.style.display=ap.style.display==='none'?'block':'none';if(ap.style.display==='block')document.exitPointerLock&&document.exitPointerLock()};auB.onclick=togglePanel;
let subT;function showSub(t,w,c){if(!subs)return;const s=$('#sb');s.innerHTML='<b style="color:'+c+'">'+w+':</b> '+t;s.style.opacity=1;clearTimeout(subT);subT=setTimeout(()=>s.style.opacity=0,Math.max(2800,t.length*80+1200))}
function endCard(title,sub2,fail){over=fail?'lose':'win';document.exitPointerLock&&document.exitPointerLock();const o=document.createElement('div');o.style.cssText='position:fixed;inset:0;z-index:9;background:rgba(0,0,0,.82);display:grid;place-content:center;justify-items:center;gap:1rem;text-align:center;color:#d8e0cc;font-family:Palatino,Georgia,serif';o.innerHTML='<h1 style="margin:0;letter-spacing:.2em;font-weight:400;color:'+(fail?'#b3262a':'#8fbf5f')+'">'+title+'</h1><p style="margin:0;max-width:30rem">'+sub2+'</p>';
const b=(t,f)=>{const x=document.createElement('button');x.textContent=t;x.style.cssText='background:none;border:1px solid #d8e0cc;color:inherit;font:inherit;padding:.6em 1.4em;cursor:pointer;margin:.3rem';x.onclick=f;o.appendChild(x)};if(fail)b('Retry from checkpoint',()=>{o.remove();retry()});b('Leave',()=>{o.remove();stop()});document.body.appendChild(o)}
function lose(why){if(over)return;over='lose';ragdoll((why.startsWith('Doug')?doug:josh).g,V3(0,3,0),false);say('doug','hit',{},1);setTimeout(()=>endCard('MISSION FAILED',why+' Doug must be protected.',true),1800)}
function retry(){over=null;josh.hp=doug.hp=100;josh.pos.set(0,0,Math.max(ck.z,-98)+1);doug.pos.set(1.6,0,josh.pos.z+1.6);zs.splice(0).forEach(z=>sc.remove(z.g));if(!josh.g.parent){sc.add(josh.g)}if(!doug.g.parent){sc.add(doug.g)}AM.forEach((a,i)=>{a.mag=WP[i].mag;a.res=Math.max(a.res,WP[i].mag*3)});{const idx=WV.findIndex(w=>w[0]<ck.z),nw=Math.max(0,(idx<0?WV.length:idx)-1);wave=nw;cleared=nw-1}vq=[]}
/* input */
const kd=e=>{if(e.target&&e.target.tagName==='INPUT')return;keys[e.code]=true;if(e.code==='KeyR')reload();if(e.code==='KeyC')josh.crouch=!josh.crouch;if(e.code==='KeyO')togglePanel();if(e.code.startsWith('Digit')){const n=+e.code.slice(5)-1;if(n>=0&&n<3&&n!==josh.w){josh.w=n;josh.rel=0;say('josh','swap',{},4000)}}},ku=e=>{keys[e.code]=false},mm2=e=>{if(document.pointerLockElement===cv){josh.yaw-=e.movementX*.0025;josh.pit=cl(josh.pit-e.movementY*.0025,-.55,.55)}},md=e=>{if(e.button===0)mdown=true},mu=()=>{mdown=false},rz=()=>{rd.setSize(W(),H());RT.dispose();RT=mkRT();pu.t.value=RT.texture;pu.r.value.set(RT.width,RT.height);cam.aspect=W()/H();cam.updateProjectionMatrix()};
addEventListener('keydown',kd);addEventListener('keyup',ku);addEventListener('mousemove',mm2);addEventListener('mousedown',md);addEventListener('mouseup',mu);addEventListener('resize',rz);cv.onclick=()=>{if(!over)cv.requestPointerLock&&cv.requestPointerLock()};
/* loop */
let run2=true,last=performance.now(),raf,stepT=0,gT=0;
function update(dt,now){
if(josh.hp>0){let mx=0,mz=0;if(keys.KeyW)mz++;if(keys.KeyS)mz--;if(keys.KeyD)mx++;if(keys.KeyA)mx--;const sp=josh.crouch?1.8:keys.ShiftLeft?5.6:3.8,l=Math.hypot(mx,mz);josh.moving=l>0;
if(l>0){mx/=l;mz/=l;const fx=-Math.sin(josh.yaw),fz=-Math.cos(josh.yaw),rx=Math.cos(josh.yaw),rz2=-Math.sin(josh.yaw);josh.pos.x+=(fx*mz+rx*mx)*sp*dt;josh.pos.z+=(fz*mz+rz2*mx)*sp*dt;slide(josh.pos,.45);bound(josh.pos);josh.walkT+=dt*sp*1.6;stepT-=dt*sp;if(stepT<=0){stepT=2.2;stepS()}}
josh.cd-=dt;if(josh.rel>0){josh.rel-=dt;if(josh.rel<=0){const w=WP[josh.w],a=AM[josh.w],n=Math.min(w.mag-a.mag,a.res);a.mag+=n;a.res-=n}}
if(mdown&&(WP[josh.w].auto||!josh.fired)){fire();josh.fired=true}if(!mdown)josh.fired=false}
dougAI(dt);
for(const z of zs.slice()){if(z.dead)continue;const T=(z.tgt==='doug'&&doug.hp>0)?doug:josh,dx=T.pos.x-z.pos.x,dz=T.pos.z-z.pos.z,d=Math.hypot(dx,dz)||1;z.stag-=dt;let sp=z.spd*(z.stag>0?.25:1);
if(z.st==='fuse'){z.ft-=dt;sp=0;if(z.ft<=0){killZ(z,false,null,false,true);continue}}
else if(z.type==='exploder'&&d<2.3){z.st='fuse';z.ft=.9;say('zom','fuse',{},3000)}
else if(d>1.2){let mx=dx/d,mz=dz/d;if(z.sideT>0){z.sideT-=dt;const px=-mz*z.side,pz=mx*z.side;mx+=px;mz+=pz;const l=Math.hypot(mx,mz);mx/=l;mz/=l}const ox=z.pos.x,oz=z.pos.z;z.pos.x+=mx*sp*dt;z.pos.z+=mz*sp*dt;slide(z.pos,.4);bound(z.pos);if(Math.hypot(z.pos.x-ox,z.pos.z-oz)<sp*dt*.3&&z.sideT<=0){z.side=Math.random()<.5?-1:1;z.sideT=.7}z.walkT+=dt*sp*1.4;if(d<14&&Math.random()<dt*.15)say('zom','charge',{},6000)}
else{z.bt-=dt;if(z.bt<=0){z.bt=.9;hurt(T,10)}}
z.g.position.set(z.pos.x,0,z.pos.z);z.g.rotation.y=Math.atan2(dx,dz)}
if(wave<WV.length&&josh.pos.z<WV[wave][0]){ck={z:josh.pos.z};spawn(WV[wave][1]);wave++}
if(wave>cleared+1&&wave>0&&zs.length===0&&cleared<wave-1){cleared=wave-1;say('josh','clear',{},9000);say('doug','clear',{},9000);if(wave>1)say('doug','thanks',{},12000)}
if(now>idleT&&!over&&zs.length===0){idleT=now+rn(20000,34000);if(Math.random()<.5)say('josh','idle',{},9000);else say('doug','follow',{},9000)}
for(const p of pickups){if(p.m.visible&&Math.hypot(josh.pos.x-p.x,josh.pos.z-p.z)<1.6){p.m.visible=false;AM.forEach((a,i)=>a.res+=WP[i].mag*2);say('josh','pickup',{},3000)}}
if(!over&&josh.pos.z<-95&&Math.hypot(doug.pos.x-josh.pos.x,doug.pos.z-josh.pos.z)<6&&zs.length===0&&wave>=WV.length){say('josh','win',{},1);say('doug','win',{},1);endCard('LEVEL 1 COMPLETE','Doug survived. Levels 2 to 5 are coming in the next updates.',false)}
}
function anim(e,dt,aim){const U=e.g.userData;if(e.moving){const s=Math.sin(e.walkT)*.7;U.ll.rotation.x=s;U.rl.rotation.x=-s;if(!aim){U.la.rotation.x=-s*.6;U.ra.rotation.x=s*.6}}else{U.ll.rotation.x=U.rl.rotation.x=0;if(!aim)U.la.rotation.x=U.ra.rotation.x=0}e.g.scale.y=e.crouch?.72:1}
function frame(now){if(!run2)return;raf=requestAnimationFrame(frame);const dt=Math.min(.05,(now-last)/1000);last=now;
const lk=document.pointerLockElement===cv;paused=!lk&&!over;$('#pz').style.display=paused&&!over?'grid':'none';
if(!paused&&!over)update(dt,now);else if(over)dougAI(0);
world.step(1/60,dt,3);for(const R of rds)R.meshes.forEach(([m,b])=>{m.position.copy(b.position);m.quaternion.copy(b.quaternion)});
for(const f of fxs.slice()){f.t-=dt;if(f.kind==='boom'){const k=1-f.t/f.max;f.m.scale.setScalar(.5+k*f.r*.6);f.m.material.opacity=Math.max(0,.9*(1-k))}if(f.t<=0){sc.remove(f.m);fxs.splice(fxs.indexOf(f),1)}}
for(const p of pools){p.t+=dt;if(p.t<6){const s=.2+p.t/6*1;p.d.scale.set(s,1,s)}}
stepPts(bl,dt,true);stepPts(sp,dt,false);fl.intensity=Math.max(0,fl.intensity-dt*160);shake=Math.max(0,shake-dt*1.6);rvT=Math.max(0,rvT-dt);$('#rv').style.opacity=Math.max(rvT,josh.hp<30?.4:0);
josh.g.position.set(josh.pos.x,0,josh.pos.z);josh.g.rotation.y=josh.yaw+Math.PI;josh.g.userData.ra.rotation.x=-1.45+josh.pit*.6;josh.g.userData.la.rotation.x=-1.3+josh.pit*.6;anim(josh,dt,true);doug.g.position.set(doug.pos.x,0,doug.pos.z);anim(doug,dt,false);
for(const z of zs){const U=z.g.userData,s=Math.sin(z.walkT)*.6;U.ll.rotation.x=s;U.rl.rotation.x=-s}
const fx=-Math.sin(josh.yaw),fz=-Math.cos(josh.yaw),rx=Math.cos(josh.yaw),rz2=-Math.sin(josh.yaw),sh=shake*Math.sin(now*.05)*.08,py=(josh.crouch?1.2:1.75)+sh;
cam.position.set(cl(josh.pos.x+rx*.85-fx*2.6,-7.2,7.2),py,cl(josh.pos.z+rz2*.85-fz*2.6,-102,6));cam.lookAt(josh.pos.x+rx*.85+fx*12,py-.15+Math.tan(josh.pit)*12,josh.pos.z+rz2*.85+fz*12);pl.position.set(josh.pos.x,2.4,josh.pos.z-.5);
const w=WP[josh.w],a=AM[josh.w];$('#am').innerHTML=w.n+'<br>'+(josh.rel>0?'reloading...':a.mag+' / '+a.res);$('#hj').style.width=Math.max(0,josh.hp)+'%';$('#hd').style.width=Math.max(0,doug.hp)+'%';$('#ob').textContent='Level 1 · reach the gate with Doug alive · wave '+Math.min(wave,WV.length)+'/'+WV.length+' · enemies '+zs.length;
rd.setRenderTarget(RT);rd.render(sc,cam);rd.setRenderTarget(null);rd.render(ps,pc)}
function stop(){run2=false;cancelAnimationFrame(raf);removeEventListener('keydown',kd);removeEventListener('keyup',ku);removeEventListener('mousemove',mm2);removeEventListener('mousedown',md);removeEventListener('mouseup',mu);removeEventListener('resize',rz);document.exitPointerLock&&document.exitPointerLock();try{ac.close()}catch(e){}rd.dispose();cv.remove();hud.remove();document.body.classList.remove('inworld');onExit&&onExit()}
lvB.onclick=stop;initVoice(ac,VB);raf=requestAnimationFrame(frame);setTimeout(()=>{say('josh','start',{},1);setTimeout(()=>say('doug','start',{},1),3500)},1500);
if(globalThis.__JT)globalThis.__JT({keys,josh,doug,zs,spawn,boom,killZ,fire,retry,stop,lose,AM,state:()=>({wave,kills,over,rds:rds.length}),setMouse:v=>{mdown=v},force:()=>{paused=false}});
}
