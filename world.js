import*as THREE from './three.module.min.js';
const L=(a,b,t)=>a+(b-a)*t,cl=(v,a,b)=>Math.max(a,Math.min(b,v)),rn_=(a,b)=>a+Math.random()*(b-a);
export function start({comfort,fx:fxOpt,onExit}){
const W=()=>innerWidth,H=()=>innerHeight,touch=matchMedia('(pointer:coarse)').matches,SP=comfort?.6:1;
const rd=new THREE.WebGLRenderer({antialias:false});rd.setPixelRatio(touch?1:Math.min(devicePixelRatio,1.5));rd.setSize(W(),H());
const cv=rd.domElement;cv.style.cssText='position:fixed;inset:0;z-index:7;touch-action:none';document.body.appendChild(cv);
const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(70,W()/H(),.1,400);cam.rotation.order='YXZ';
sc.fog=new THREE.FogExp2(0,.02);sc.background=new THREE.Color();
const pl=new THREE.PointLight(0xffffff,18,55,1),hm=new THREE.HemisphereLight(0x8899bb,0,.3);sc.add(pl,hm,cam);
const o3=new THREE.Object3D(),M4=new THREE.Matrix4(),Q=new THREE.Quaternion(),V=new THREE.Vector3(),S3=new THREE.Vector3(),CC=new THREE.Color();
const pts=(n,f,col,sz)=>{const a=new Float32Array(n*3);for(let i=0;i<n;i++)a.set(f(),i*3);const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(a,3));return new THREE.Points(g,new THREE.PointsMaterial({color:col,size:sz,transparent:true,opacity:.7,depthWrite:false,blending:THREE.AdditiveBlending}))};
const terr=(size,seg,hf,cf)=>{const g=new THREE.PlaneGeometry(size,size,seg,seg).rotateX(-Math.PI/2),p=g.attributes.position,c=new Float32Array(p.count*3);for(let i=0;i<p.count;i++){const h=hf(p.getX(i),p.getZ(i));p.setY(i,h);c.set(cf(h),i*3)}g.setAttribute('color',new THREE.BufferAttribute(c,3));g.computeVertexNormals();return new THREE.Mesh(g,new THREE.MeshLambertMaterial({vertexColors:true}))};
const fh=(x,z)=>Math.sin(x*.045)*Math.cos(z*.038)*7+Math.sin(x*.12+z*.08)*2.2+Math.sin(z*.21)*.9,sh=(x,z)=>-130+Math.sin(x*.05)*5+Math.cos(z*.07)*4+Math.sin(x*.2+z*.15)*1.2;
const ft=(x,z)=>Math.sin(x*.03)*Math.cos(z*.03)*1.5,mh=(x,z)=>Math.abs(Math.sin(x*.02)*Math.cos(z*.025))*40+Math.sin(x*.07)*Math.cos(z*.06)*8+Math.sin(x*.2+z*.17)*1.5;
const RL=[
{n:'The Void',fog:0x000004,d:.02,lp:200,lc:0xaab4d0,amb:.04,move:'float',vy:0,y0:1.7,b:120,dur:45,
build(){const g=new THREE.Group(),N=110,im=new THREE.InstancedMesh(new THREE.OctahedronGeometry(1),new THREE.MeshLambertMaterial({color:0x4a4a5a}),N),d=[];
for(let i=0;i<N;i++){const a=rn_(0,6.28),r=rn_(12,110);d.push({x:Math.cos(a)*r,y:rn_(-25,45),z:Math.sin(a)*r,s:rn_(1,9),r:rn_(.05,.25)})}
const ring=new THREE.Mesh(new THREE.TorusGeometry(70,.7,8,80),new THREE.MeshBasicMaterial({color:0x7a6a3a,fog:false}));ring.position.set(0,35,-150);g.add(im,ring);
this.u=(dt,t)=>{d.forEach((e,i)=>{o3.position.set(e.x,e.y+Math.sin(t*.2+i)*1.5,e.z);o3.rotation.set(t*e.r,t*e.r*.7,0);o3.scale.setScalar(e.s);o3.updateMatrix();im.setMatrixAt(i,o3.matrix)});im.instanceMatrix.needsUpdate=true;ring.rotation.z=t*.02};return g}},
{n:'The Alien Forest',fog:0x14072a,d:.035,lp:260,lc:0x9affd8,amb:.35,move:'walk',vy:0,y0:1.7,b:135,dur:50,h:fh,
build(){const g=new THREE.Group();g.add(terr(300,90,fh,h=>[.05,.12+Math.max(0,h)*.012,.14+Math.max(0,h)*.01]));
const N=touch?110:220,tr=new THREE.InstancedMesh(new THREE.CylinderGeometry(.2,.55,1,6),new THREE.MeshLambertMaterial({color:0x3a2a4a}),N),bl=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1,1),new THREE.MeshBasicMaterial(),N);
for(let i=0;i<N;i++){const x=rn_(-135,135),z=rn_(-135,135),ht=rn_(8,24),s=rn_(1.2,3);if(Math.hypot(x,z)<8){i--;continue}
M4.compose(V.set(x,fh(x,z)+ht/2,z),Q,S3.set(1,ht,1));tr.setMatrixAt(i,M4);M4.compose(V.set(x,fh(x,z)+ht,z),Q,S3.set(s,s,s));bl.setMatrixAt(i,M4);bl.setColorAt(i,CC.setHSL(Math.random()<.5?.48:.86,.9,.55))}
const sp=pts(500,()=>[rn_(-135,135),rn_(0,28),rn_(-135,135)],0xc8ffe8,.4);g.add(tr,bl,sp);
this.u=dt=>{const a=sp.geometry.attributes.position;for(let i=0;i<500;i++){const y=a.getY(i)+dt*.9;a.setY(i,y>28?0:y)}a.needsUpdate=true};return g}},
{n:'The Machine World',fog:0x050a18,d:.022,lp:320,lc:0x66ccff,amb:.3,move:'walk',vy:0,y0:1.7,b:135,dur:50,h:ft,
build(){const g=new THREE.Group();g.add(terr(300,60,ft,()=>[.04,.06,.1]));const gh=new THREE.GridHelper(300,60,0x22e0ff,0x12304a);gh.position.y=.15;g.add(gh);
const N=touch?80:150,tw=new THREE.InstancedMesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshLambertMaterial({color:0x252c40}),N),st=new THREE.InstancedMesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial(),N);
for(let i=0;i<N;i++){const x=rn_(-135,135),z=rn_(-135,135),ht=rn_(10,70),s=rn_(3,9);if(Math.hypot(x,z)<10){i--;continue}
M4.compose(V.set(x,ht/2,z),Q,S3.set(s,ht,s));tw.setMatrixAt(i,M4);M4.compose(V.set(x,ht+.4,z),Q,S3.set(s*1.05,.8,s*1.05));st.setMatrixAt(i,M4);st.setColorAt(i,CC.setHSL(Math.random()<.5?.52:.88,1,.55))}
const fl=[];for(let i=0;i<10;i++)fl.push({x:rn_(-120,120),z:rn_(-120,120),y:rn_(25,45),s:rn_(4,9)});
const mo=new THREE.InstancedMesh(new THREE.BoxGeometry(1,4,1),new THREE.MeshLambertMaterial({color:0x151a28}),10);g.add(tw,st,mo);
this.u=(dt,t)=>{fl.forEach((e,i)=>{o3.position.set(e.x,e.y+Math.sin(t*.3+i)*2,e.z);o3.rotation.set(0,t*.1+i,0);o3.scale.set(e.s,e.s*2,e.s);o3.updateMatrix();mo.setMatrixAt(i,o3.matrix)});mo.instanceMatrix.needsUpdate=true};return g}},
{n:'The Ashen Peaks',fog:0x2a1a14,d:.014,lp:240,lc:0xffb070,amb:.5,move:'walk',vy:0,y0:1.7,b:135,dur:55,h:mh,
build(){const g=new THREE.Group();g.add(terr(300,130,mh,h=>h>32?[.78,.8,.88]:[.2+h*.004,.17+h*.003,.15+h*.003]));
const sp=pts(500,()=>[rn_(-135,135),rn_(0,70),rn_(-135,135)],0xffa060,.45);g.add(sp);
this.u=dt=>{const a=sp.geometry.attributes.position;for(let i=0;i<500;i++){const y=a.getY(i)-dt*2.2;a.setY(i,y<0?70:y)}a.needsUpdate=true};return g}},
{n:'The Sky',fog:0x7a5a9a,d:.006,lp:600,lc:0xffd0e0,amb:.7,move:'float',vy:0,y0:35,b:140,dur:45,
build(){const g=new THREE.Group(),N=touch?90:170,cm=new THREE.InstancedMesh(new THREE.SphereGeometry(1,8,6),new THREE.MeshBasicMaterial({color:0xe8d8f0,transparent:true,opacity:.75}),N);
for(let i=0;i<N;i++){M4.compose(V.set(rn_(-130,130),Math.random()<.6?rn_(-8,8):rn_(35,60),rn_(-130,130)),Q,S3.set(rn_(12,32),rn_(3,6),rn_(12,32)));cm.setMatrixAt(i,M4)}
const is=new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1),new THREE.MeshLambertMaterial({color:0x5a5060}),22);
for(let i=0;i<22;i++){M4.compose(V.set(rn_(-120,120),rn_(10,50),rn_(-120,120)),Q,S3.set(rn_(5,14),rn_(3,8),rn_(5,14)));is.setMatrixAt(i,M4)}
const sun=new THREE.Mesh(new THREE.SphereGeometry(18,16,12),new THREE.MeshBasicMaterial({color:0xffe0b0,fog:false}));sun.position.set(0,30,-300);g.add(cm,is,sun);
this.u=()=>{cam.position.y=cl(cam.position.y,-5,110)};return g}},
{n:'The Fall',fog:0x12041e,d:.012,lp:500,lc:0xff88ff,amb:0,move:'fall',vy:-(comfort?8:14),y0:0,b:12,dur:40,
build(){const g=new THREE.Group(),N=26,im=new THREE.InstancedMesh(new THREE.TorusGeometry(14,.4,8,48).rotateX(Math.PI/2),new THREE.MeshBasicMaterial(),N);
const wall=new THREE.Mesh(new THREE.CylinderGeometry(34,34,500,48,1,true),new THREE.ShaderMaterial({side:THREE.BackSide,uniforms:{t:{value:0}},
vertexShader:'varying float vy;varying float va;void main(){vec4 w=modelMatrix*vec4(position,1.);vy=w.y;va=atan(w.z,w.x);gl_Position=projectionMatrix*viewMatrix*w;}',
fragmentShader:'uniform float t;varying float vy;varying float va;void main(){float b=sin(va*5.+vy*.04+t*.25)*.5+.5;vec3 c=.5+.5*cos(6.28*(vec3(0.,.33,.67)+b*.5+vy*.002+t*.02));gl_FragColor=vec4(c*.5*(.4+.6*b),1.);}'}));
const sp=pts(450,()=>[rn_(-26,26),rn_(-50,40),rn_(-26,26)],0xffffff,.5);g.add(im,wall,sp);
this.u=(dt,t)=>{wall.position.y=cam.position.y;wall.material.uniforms.t.value=t;const k=Math.floor(cam.position.y/14);
for(let i=0;i<N;i++){const lat=k+3-i;o3.position.set(0,lat*14,0);o3.rotation.set(Math.sin(lat)*.15,0,Math.cos(lat)*.15);o3.scale.setScalar(1+.25*Math.sin(lat));o3.updateMatrix();im.setMatrixAt(i,o3.matrix);im.setColorAt(i,CC.setHSL((((lat*.07+t*.03)%1)+1)%1,.8,.55))}
im.instanceMatrix.needsUpdate=true;im.instanceColor.needsUpdate=true;
const a=sp.geometry.attributes.position;for(let i=0;i<450;i++){let y=a.getY(i);if(y>cam.position.y+40)y-=90;a.setY(i,y)}a.needsUpdate=true};return g}},
{n:'The Drowning',fog:0x0e6f7a,d:.02,lp:110,lc:0x66ffee,amb:.4,move:'sink',vy:-2.6*SP,y0:-1,b:70,dur:70,h:sh,
build(){const g=new THREE.Group();g.add(terr(400,70,sh,h=>[.05,.07,.09]));
const surf=new THREE.Mesh(new THREE.PlaneGeometry(700,700).rotateX(Math.PI/2),new THREE.MeshBasicMaterial({color:0x7fe0e0,transparent:true,opacity:.5,side:THREE.DoubleSide,fog:false}));surf.position.y=.5;g.add(surf);
for(let i=0;i<14;i++){const c=new THREE.Mesh(new THREE.ConeGeometry(7,90,12,1,true),new THREE.MeshBasicMaterial({color:0x3aa8b0,transparent:true,opacity:.07,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));c.position.set(rn_(-70,70),-42,rn_(-70,70));g.add(c)}
const pi=new THREE.InstancedMesh(new THREE.CylinderGeometry(2,3,1,8),new THREE.MeshLambertMaterial({color:0x1a2a30}),30);
for(let i=0;i<30;i++){const x=rn_(-80,80),z=rn_(-80,80),ht=rn_(20,60);M4.compose(V.set(x,-130+ht/2,z),Q,S3.set(1,ht,1));pi.setMatrixAt(i,M4)}
const bub=pts(300,()=>[rn_(-60,60),rn_(-30,30),rn_(-60,60)],0xc8ffff,.3);g.add(pi,bub);
this.u=dt=>{const a=bub.geometry.attributes.position,cy=cam.position.y;for(let i=0;i<300;i++){let y=a.getY(i)+dt*1.2;if(y>cy+30)y-=60;if(y<cy-30)y+=60;a.setY(i,y)}a.needsUpdate=true;
const k=cl(-cy/120,0,1);sc.fog.color.set(0x0e6f7a).lerp(CC.set(0x00080c),k);sc.background.copy(sc.fog.color);sc.fog.density=L(.02,.05,k)};return g}},
{n:'Death',fog:0x000000,d:.03,lp:90,lc:0xff3322,amb:.1,move:'dead',vy:0,y0:1.7,b:0,dur:15,
build(){const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.CircleGeometry(40,48).rotateX(-Math.PI/2),new THREE.MeshLambertMaterial({color:0x0a0a0a})));this.u=null;return g}}];
/* audio: all synthesized */
const ac=new(window.AudioContext||window.webkitAudioContext)(),mg=ac.createGain();mg.gain.value=0;mg.connect(ac.destination);mg.gain.linearRampToValueAtTime(.7,ac.currentTime+5);ac.resume();
const lp=ac.createBiquadFilter();lp.frequency.value=260;lp.connect(mg);
[[55,'sawtooth',.05],[55.8,'sawtooth',.05],[82.7,'sine',.07],[116.5,'triangle',.03]].forEach(([f,ty,g],i)=>{const o=ac.createOscillator(),gn=ac.createGain(),l=ac.createOscillator(),lg=ac.createGain();o.type=ty;o.frequency.value=f;gn.gain.value=g;l.frequency.value=.04+i*.023;lg.gain.value=14;l.connect(lg);lg.connect(o.detune);o.connect(gn);gn.connect(lp);o.start();l.start()});
const nb=ac.createBuffer(1,ac.sampleRate*2,ac.sampleRate),nd=nb.getChannelData(0);for(let i=0;i<nd.length;i++)nd[i]=Math.random()*2-1;
const ns=(fq,q,g,dur,pan)=>{const s=ac.createBufferSource();s.buffer=nb;s.loop=!dur;const b=ac.createBiquadFilter();b.type='bandpass';b.frequency.value=fq;b.Q.value=q;const gn=ac.createGain(),pn=ac.createStereoPanner();pn.pan.value=pan||0;s.connect(b);b.connect(gn);gn.connect(pn);pn.connect(mg);const t=ac.currentTime;
if(dur){gn.gain.setValueAtTime(0,t);gn.gain.linearRampToValueAtTime(g,t+dur*.4);gn.gain.linearRampToValueAtTime(0,t+dur);s.start(t);s.stop(t+dur+.1)}else{gn.gain.value=g;s.start()}};
ns(380,.7,.05);
const tone=(f0,f1,g,dur,pan,d)=>{const o=ac.createOscillator(),gn=ac.createGain(),pn=ac.createStereoPanner(),t=ac.currentTime+(d||0);pn.pan.value=pan;o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+dur);gn.gain.setValueAtTime(g,t);gn.gain.exponentialRampToValueAtTime(.0005,t+dur);o.connect(gn);gn.connect(pn);pn.connect(mg);o.start(t);o.stop(t+dur+.05)};
const beat=(g,p)=>{tone(62,30,g,.2,p);tone(50,30,g*.7,.2,p,.26)},ping=p=>{const f=700+Math.random()*900;tone(f,f*.99,.025,3,p)};
/* ui */
const ui=document.createElement('div');ui.style.cssText='position:fixed;inset:0;z-index:8;pointer-events:none;font-family:Palatino,Georgia,serif;color:#ebe6da';
ui.innerHTML='<div id="fd" style="position:absolute;inset:0;background:#000;opacity:0;transition:opacity 1.5s"></div><div id="vg" style="position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 35%,#000 105%)"></div><div id="rn" style="position:absolute;top:12%;width:100%;text-align:center;font-size:clamp(1.2rem,4vw,2.4rem);letter-spacing:.3em;opacity:0;transition:opacity 2s"></div><p style="position:absolute;bottom:14px;width:100%;text-align:center;margin:0;font-size:.8rem;opacity:.5">'+(touch?'Left thumb moves. Right thumb looks.':'Click to look. WASD move, Shift run, Space jump.')+'</p><button id="lv" style="position:absolute;top:14px;right:14px;pointer-events:auto;background:none;border:1px solid #ebe6da;color:inherit;font:inherit;padding:.4em 1em;cursor:pointer">Leave</button>'+(touch?'<div style="position:absolute;right:14px;bottom:44px;display:flex;gap:10px;pointer-events:auto"><button id="rb" style="background:none;border:1px solid #ebe6da;color:inherit;font:inherit;padding:.7em 1em">Run</button><button id="jb" style="background:none;border:1px solid #ebe6da;color:inherit;font:inherit;padding:.7em 1em">Jump</button></div>':'');
document.body.appendChild(ui);const vg=ui.querySelector('#vg'),rnb=ui.querySelector('#rn'),fd=ui.querySelector('#fd');
let cycle=1;const say=t=>{rnb.innerHTML=t+'<br><small style="font-size:.5em;opacity:.7">Cycle '+cycle+'</small>';rnb.style.opacity=1;setTimeout(()=>rnb.style.opacity=0,4500)};
/* watchers */
const tx=new THREE.TextureLoader().load('jamal.webp');tx.colorSpace=THREE.SRGBColorSpace;
const wg=new THREE.CircleGeometry(1.15,48),Ws=[];
const addW=()=>{const m=new THREE.Mesh(wg,new THREE.MeshBasicMaterial({map:tx,color:0x9aa3b5,side:THREE.DoubleSide,transparent:true,opacity:0,depthWrite:false}));m.userData={st:'idle',a:0,tgt:.2,oy:2.6,ph:rn_(0,6),tpAt:0,dashAt:0};sc.add(m);Ws.push(m)};addW();
let ri=0,cr=RL[0],grp=null,swapping=false,base=1.7,jy=0,jv=0,spT=false,dashing=false,realmStart=0,end=0,T=0,last=performance.now(),nextWh=last+9000,nextPing=last+15000,nextBeat=0,yaw=0,pit=0,run=true,raf;
function placeW(){const mo=cr.move,near=mo==='dead'?7:mo==='walk'||mo==='float'?45:22;Ws.forEach((w,i)=>{const a=mo==='dead'?i/Ws.length*6.283:Math.random()*6.283;w.position.set(cam.position.x+Math.sin(a)*near,0,cam.position.z+Math.cos(a)*near);w.position.y=mo==='walk'?cr.h(w.position.x,w.position.z)+2.6:mo==='dead'?2.4:cam.position.y+rn_(-3,3)})}
function swap(i){if(grp){sc.remove(grp);grp.traverse(o=>{o.geometry&&o.geometry.dispose();o.material&&o.material.dispose&&o.material.dispose()})}
ri=i;cr=RL[i];grp=cr.build();sc.add(grp);sc.fog.color.set(cr.fog);sc.background.set(cr.fog);sc.fog.density=cr.d;pl.color.set(cr.lc);hm.intensity=cr.amb;
cam.position.set(0,cr.move==='walk'?cr.h(0,0)+1.7:cr.y0,0);yaw=pit=0;base=cam.position.y;jy=jv=0;fxTint();placeW();Ws.forEach(w=>{const u=w.userData,n=performance.now();u.st='idle';u.a=0;u.oy=2.6;u.tpAt=n+rn_(6000,12000);u.dashAt=n+20000+rn_(0,30000)/(1+.15*cycle)});dashing=false;realmStart=performance.now();lp.frequency.linearRampToValueAtTime(cr.lp,ac.currentTime+3);say(cr.n);if(cr.move==='dead')tone(40,36,.12,10,0);
end=performance.now()+cr.dur*(comfort?1.5:1)*1000}
function goto(i){swapping=true;fd.style.opacity=1;setTimeout(()=>{if(!run)return;swap(i);fd.style.opacity=0;swapping=false},1700)}
function next(){if(cr.move==='dead'){cycle++;if(Ws.length<8)addW();goto(0)}else goto(ri+1)}
/* hunting */
function tp(w){const mo=cr.move,ch=(mo==='walk'?['b','b','u','f']:['b','b','u','d','d','f'])[Math.random()*(mo==='walk'?4:6)|0],ang=yaw+rn_(-.5,.5),u=w.userData,c=cam.position;
if(ch==='b'){const r=rn_(9,14);w.position.set(c.x+Math.sin(ang)*r,c.y,c.z+Math.cos(ang)*r);u.oy=2.6}
else if(ch==='u'){w.position.set(c.x+rn_(-2,2),c.y+rn_(7,10),c.z+rn_(-2,2));u.oy=mo==='walk'?rn_(9,11):2.6}
else if(ch==='d'){w.position.set(c.x+rn_(-2,2),c.y-rn_(7,10),c.z+rn_(-2,2));u.oy=2.6}
else{const a=rn_(0,6.28),r=rn_(22,30);w.position.set(c.x+Math.sin(a)*r,c.y,c.z+Math.cos(a)*r);u.oy=2.6}
if(mo==='walk')w.position.y=cr.h(w.position.x,w.position.z)+u.oy}
function scream(){const t=ac.currentTime,v=comfort?.35:.6,g=ac.createGain(),ws=ac.createWaveShaper(),cp=ac.createDynamicsCompressor(),cv2=new Float32Array(256);
for(let i=0;i<256;i++)cv2[i]=Math.tanh((i/128-1)*6);ws.curve=cv2;cp.threshold.value=-20;cp.ratio.value=12;
g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.04);g.gain.setValueAtTime(v,t+1.6);g.gain.exponentialRampToValueAtTime(.001,t+2.4);
[0,1,2].forEach(i=>{const o=ac.createOscillator(),f=ac.createBiquadFilter(),vb=ac.createOscillator(),vg=ac.createGain(),b=520+i*37;o.type='sawtooth';o.frequency.setValueAtTime(b,t);o.frequency.exponentialRampToValueAtTime(b*2.2,t+.5);o.frequency.exponentialRampToValueAtTime(b*1.6,t+2.2);
vb.frequency.value=7+i*1.3;vg.gain.value=40;vb.connect(vg);vg.connect(o.frequency);f.type='bandpass';f.Q.value=5;f.frequency.setValueAtTime(900,t);f.frequency.linearRampToValueAtTime(2600,t+.6);f.frequency.linearRampToValueAtTime(1500,t+2);
o.connect(f);f.connect(ws);o.start(t);vb.start(t);o.stop(t+2.5);vb.stop(t+2.5)});
const s=ac.createBufferSource(),nf=ac.createBiquadFilter(),ng=ac.createGain();s.buffer=nb;s.loop=true;nf.type='bandpass';nf.frequency.value=3000;nf.Q.value=1.2;ng.gain.value=.5;s.connect(nf);nf.connect(ng);ng.connect(ws);s.start(t);s.stop(t+2.5);
ws.connect(g);g.connect(cp);cp.connect(ac.destination);tone(60,25,.3,1,0);
mg.gain.cancelScheduledValues(t);mg.gain.setTargetAtTime(.12,t,.05);mg.gain.setTargetAtTime(.7,t+3,.6)}
function kill(){swapping=true;dashing=false;fd.style.transition='opacity .1s';fd.style.opacity=1;scream();
setTimeout(()=>{if(!run)return;swap(RL.length-1);fd.style.transition='opacity 1.5s';fd.style.opacity=0;swapping=false},2600)}
/* input */
const k={},mv={x:0,y:0},tc={};
const kd=e=>{if(e.code==='Space')e.preventDefault();k[e.code]=true},ku=e=>k[e.code]=false,mm=e=>{if(document.pointerLockElement===cv){yaw-=e.movementX*.0025;pit=cl(pit-e.movementY*.0025,-1.2,1.2)}},rz=()=>{cam.aspect=W()/H();cam.updateProjectionMatrix();rd.setSize(W(),H())};
addEventListener('keydown',kd);addEventListener('keyup',ku);addEventListener('mousemove',mm);addEventListener('resize',rz);
cv.onclick=()=>{if(!touch)cv.requestPointerLock?.()};
cv.addEventListener('touchstart',e=>{for(const t of e.changedTouches)tc[t.identifier]={x:t.clientX,y:t.clientY,m:t.clientX<W()/2}},{passive:true});
cv.addEventListener('touchmove',e=>{for(const t of e.changedTouches){const s=tc[t.identifier];if(!s)continue;if(s.m){mv.x=cl((t.clientX-s.x)/50,-1,1);mv.y=cl(-(t.clientY-s.y)/50,-1,1)}else{yaw-=(t.clientX-s.x)*.005;pit=cl(pit-(t.clientY-s.y)*.005,-1.2,1.2);s.x=t.clientX;s.y=t.clientY}}},{passive:true});
cv.addEventListener('touchend',e=>{for(const t of e.changedTouches){if(tc[t.identifier]?.m)mv.x=mv.y=0;delete tc[t.identifier]}},{passive:true});
/* effects: fog banks, smoke, dust, flicker, silence, phantom sounds, silhouettes, glow, tremor, grain */
const FX=!fxOpt||fxOpt==='auto'?(touch?'low':'full'):fxOpt,F=FX==='full'?1:FX==='low'?.5:0,nx=(a,b)=>performance.now()+rn_(a,b)*1000/(F||1);
const soft=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d'),g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64);return new THREE.CanvasTexture(c)})();
const mkp=(n,sz,op)=>{const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(new Float32Array(n*3),3));const p=new THREE.Points(g,new THREE.PointsMaterial({map:soft,size:sz,transparent:true,opacity:op,depthWrite:false}));p.frustumCulled=false;p.visible=n>0;sc.add(p);return p};
const smoke=mkp(Math.round(40*F),16,.16),dust=mkp(Math.round(250*F),.35,.5);
const sil=new THREE.Mesh(new THREE.PlaneGeometry(1.6,5),new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:0,depthWrite:false,side:THREE.DoubleSide}));sil.visible=false;sc.add(sil);
let tFog=nx(15,35),fogUntil=0,fogMul=1,tFlk=nx(25,60),flkUntil=0,tSil=nx(20,40),tPh=nx(15,35),tSl=nx(45,90),tTr=nx(50,95),trUntil=0,tGl=nx(30,60),glT=0,lastTear=0,sa=0,sT=0;
if(F){const gn=document.createElement('div');gn.style.cssText="position:absolute;inset:-5%;opacity:.07;animation:gr .5s steps(4) infinite;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")";ui.insertBefore(gn,ui.firstChild)}
function fxTint(){smoke.material.color.set(cr.fog).offsetHSL(0,0,.28);dust.material.color.set(cr.fog).offsetHSL(0,0,.45);
for(const p of[smoke,dust]){const a=p.geometry.attributes.position,r=p===smoke?60:25;for(let i=0;i<a.count;i++)a.setXYZ(i,cam.position.x+rn_(-r,r),cam.position.y+rn_(-r*.4,r*.4),cam.position.z+rn_(-r,r));a.needsUpdate=true}}
function fxUpdate(now,dt,m,dmin){if(!F)return;const c=cam.position;
for(const[p,r,vx,vy]of[[smoke,60,.8,0],[dust,25,.15,-.5]]){const a=p.geometry.attributes.position,hy=r*.4;for(let i=0;i<a.count;i++){let x=a.getX(i)+vx*dt,y=a.getY(i)+vy*dt,z=a.getZ(i);if(x>c.x+r)x-=2*r;if(x<c.x-r)x+=2*r;if(z>c.z+r)z-=2*r;if(z<c.z-r)z+=2*r;if(y>c.y+hy)y-=2*hy;if(y<c.y-hy)y+=2*hy;a.setXYZ(i,x,y,z)}a.needsUpdate=true}
if(now>tFog){fogUntil=now+rn_(8000,14000);fogMul=Math.max(fogMul,1);tFog=nx(20,45);sT=sT}
const fogT=now<fogUntil?2.2:1;fogMul=L(fogMul,fogT,Math.min(1,dt*.4));
if(m!=='sink')sc.fog.density=cr.d;sc.fog.density*=fogMul;
if(now>tGl){glT=now;tGl=nx(30,60)}
if(m!=='sink')sc.fog.color.set(cr.fog);if(glT&&now-glT<6000)sc.fog.color.offsetHSL(0,0,.08*Math.sin((now-glT)/6000*Math.PI));sc.background.copy(sc.fog.color);
if(now>tFlk&&m!=='dead'){flkUntil=now+2000;tFlk=nx(25,60)}
pl.intensity=now<flkUntil?18*(1-.75*Math.pow(Math.sin((now-flkUntil)/1000*3.5),2)):18;
if(now>tPh&&m!=='dead'){tPh=nx(15,35);const p=rn_(-1,1);if(Math.random()<.5)for(let i=0;i<4;i++)tone(90,50,.05,.12,p,i*.45);else ns(700,2,.05,1.4,p)}
if(F===1&&m!=='dead'&&now>tSl){tSl=nx(45,90);const t=ac.currentTime,d=rn_(3.5,5);mg.gain.cancelScheduledValues(t);mg.gain.setTargetAtTime(.02,t,.1);mg.gain.setTargetAtTime(.7,t+d,.3);tone(55,30,.18,.4,0,d)}
if(F===1&&!comfort&&m!=='dead'&&now>tTr){trUntil=now+2500;tTr=nx(50,95);tone(35,28,.15,2.5,0)}
const te=trUntil-now;cam.rotation.z=te>0?Math.sin(now*.05)*.012*Math.min(1,te/500):0;
if(now>tSil&&m!=='dead'&&!sil.visible){tSil=nx(20,40);sil.visible=true;sa=rn_(0,6.28);sT=0}
if(sil.visible){sT+=dt;sa+=dt*.15;const x=c.x+Math.sin(sa)*35,z=c.z+Math.cos(sa)*35;sil.material.opacity=.65*Math.sin(Math.min(sT/7,1)*Math.PI);sil.position.set(x,m==='walk'?cr.h(x,z)+2.5:c.y,z);sil.lookAt(c.x,sil.position.y,c.z);if(sT>7)sil.visible=false}
if(F===1&&dmin<12&&now-lastTear>6000){lastTear=now;cv.style.transform='translateX(6px)';setTimeout(()=>cv.style.transform='',90)}}
swap(0);
function loop(now){if(!run)return;raf=requestAnimationFrame(loop);const dt=Math.min((now-last)/1000,.1);last=now;T+=dt;const m=cr.move;
if(!swapping){if(m==='sink'&&cam.position.y<-117)end=0;if(now>end)next()}
cam.rotation.set(pit,yaw,0);const fv=new THREE.Vector3();cam.getWorldDirection(fv);
const fx=(k.KeyD||k.ArrowRight?1:0)-(k.KeyA||k.ArrowLeft?1:0)+mv.x,fz=(k.KeyW||k.ArrowUp?1:0)-(k.KeyS||k.ArrowDown?1:0)+mv.y,spd=(m==='fall'?7:m==='sink'?1.6:m==='float'?2.8:3.2)*SP*dt*((k.ShiftLeft||k.ShiftRight||spT)&&m!=='sink'&&m!=='dead'?(comfort?1.4:1.8):1);
if(m==='float'){cam.position.addScaledVector(fv,fz*spd);cam.position.x+=Math.cos(yaw)*fx*spd;cam.position.z-=Math.sin(yaw)*fx*spd}
else if(m!=='dead'){cam.position.x+=(-Math.sin(yaw)*fz+Math.cos(yaw)*fx)*spd;cam.position.z+=(-Math.cos(yaw)*fz-Math.sin(yaw)*fx)*spd}
if(m==='fall'||m==='sink')cam.position.y+=cr.vy*dt;
if(m==='walk'){base=L(base,cr.h(cam.position.x,cam.position.z)+1.7,.2);if(k.Space&&jy<=0)jv=comfort?5:6.5;jv-=18*dt;jy=Math.max(0,jy+jv*dt);if(jy===0&&jv<0)jv=0;cam.position.y=base+jy}
if(m==='float'&&k.Space)cam.position.y+=spd;
const hd=Math.hypot(cam.position.x,cam.position.z);if(cr.b&&hd>cr.b){cam.position.x*=cr.b/hd;cam.position.z*=cr.b/hd}
pl.position.copy(cam.position);cr.u&&cr.u(dt,T);
let dmin=999,pan=0,killed=false;
for(const w of Ws){const u=w.userData,to=w.position.clone().sub(cam.position),d=to.length()||1,tn=to.divideScalar(d),seen=fv.dot(tn)>.55,pn=cl(tn.x*Math.cos(yaw)-tn.z*Math.sin(yaw),-1,1);
if(m==='dead')u.tgt=.85;
else if(u.st==='idle'){u.tgt=.12+.28*(.5+.5*Math.sin(now/700+u.ph));if(!seen&&d>5)w.position.addScaledVector(tn,-2.4*SP*dt);
if(now>u.tpAt)u.st='out';
else if(now>u.dashAt&&!seen&&d<45&&!dashing&&!swapping&&now-realmStart>20000){u.st='warn';u.wt=now+(comfort?2000:1300);dashing=true;tone(48,34,.1,1.5,pn)}}
else if(u.st==='out'){u.tgt=0;if(u.a<.03){tp(w);u.st='idle';u.tpAt=now+rn_(8000,20000)}}
else if(u.st==='warn'){u.tgt=.7;u.oy+=(2.6-u.oy)*Math.min(1,dt*2);if(now>u.wt){if(seen){u.st='idle';u.dashAt=now+15000;dashing=false}else{u.st='dash';u.t0=now;ns(900,4,.12,1,pn)}}}
else{u.tgt=.75;u.oy+=(2.6-u.oy)*Math.min(1,dt*2);if(seen||now-u.t0>3500){u.st='idle';u.dashAt=now+rn_(20000,45000)/(1+.15*cycle);dashing=false}else w.position.addScaledVector(tn,-(comfort?9:16)*dt)}
u.a+=(u.tgt-u.a)*Math.min(1,dt*(u.st==='out'?5:1.5));w.material.opacity=u.a;
if(m!=='dead'){w.position.y+=cr.vy*dt;if(m==='walk')w.position.y=cr.h(w.position.x,w.position.z)+u.oy+Math.sin(now/900)*.08}
w.lookAt(cam.position);if(d<dmin){dmin=d;pan=pn}
if(m!=='dead'&&!swapping&&u.a>.05&&d<2){killed=true;break}}
if(killed)kill();
fxUpdate(now,dt,m,dmin);const prox=m==='dead'?.5:cl(1-(dmin-5)/40,0,1);
if(m!=='dead'&&now>nextBeat){beat(.12+.5*prox,pan);nextBeat=now+L(1500,480,prox)}
if(now>nextWh){ns(1500+Math.random()*1500,3,.06,1.6,Math.random()*2-1);nextWh=now+7000+Math.random()*8000}
if(now>nextPing){ping(Math.random()*2-1);nextPing=now+12000+Math.random()*13000}
vg.style.opacity=.45+.45*prox+(F?.06*Math.sin(now/1800):0);rd.render(sc,cam)}
function stop(){run=false;cancelAnimationFrame(raf);removeEventListener('keydown',kd);removeEventListener('keyup',ku);removeEventListener('mousemove',mm);removeEventListener('resize',rz);document.exitPointerLock?.();ac.close();rd.dispose();cv.remove();ui.remove();onExit&&onExit()}
ui.querySelector('#lv').onclick=stop;if(touch){const rb=ui.querySelector('#rb'),jb=ui.querySelector('#jb');rb.onpointerdown=()=>{spT=!spT;rb.style.background=spT?'#ebe6da':'none';rb.style.color=spT?'#000':'inherit'};jb.onpointerdown=()=>{k.Space=true;setTimeout(()=>k.Space=false,120)}}raf=requestAnimationFrame(loop)}
