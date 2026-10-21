import*as THREE from './three.module.min.js';
import*as CANNON from './cannon-es.js';import{gen}from './lines.js';import{initVoice,speak,voiceBusy}from './voice.js';
const L=(a,b,t)=>a+(b-a)*t,cl=(v,a,b)=>Math.max(a,Math.min(b,v)),rn_=(a,b)=>a+Math.random()*(b-a);
export function start({comfort,fx:fxOpt,scares:scOpt,subs:subOpt,diff,onExit}){
const W=()=>innerWidth,H=()=>innerHeight,touch=matchMedia('(pointer:coarse)').matches,SP=comfort?.6:1,DF=({easy:{spd:.7,kt:1.2,kr:.85,hs:2200,tp:1.5,cnt:-1},normal:{spd:.85,kt:.8,kr:.9,hs:1500,tp:1.2,cnt:0},hard:{spd:1.1,kt:.5,kr:1,hs:1000,tp:1,cnt:1}})[diff||'normal']||{spd:.85,kt:.8,kr:.9,hs:1500,tp:1.2,cnt:0};
const rd=new THREE.WebGLRenderer({antialias:false});rd.setPixelRatio(touch?1:Math.min(devicePixelRatio,1.5));rd.setSize(W(),H());
const cv=rd.domElement;cv.style.cssText='position:fixed;inset:0;z-index:7;touch-action:none';document.body.appendChild(cv);document.body.classList.add('inworld');
const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(70,W()/H(),.1,400);cam.rotation.order='YXZ';
sc.fog=new THREE.FogExp2(0,.02);sc.background=new THREE.Color();
const pl=new THREE.PointLight(0xffffff,18,55,1),hm=new THREE.HemisphereLight(0x8899bb,0,.3);sc.add(pl,hm,cam);
const world=new CANNON.World();world.gravity.set(0,-20,0);world.allowSleep=true;
const o3=new THREE.Object3D(),M4=new THREE.Matrix4(),Q=new THREE.Quaternion(),V=new THREE.Vector3(),S3=new THREE.Vector3(),CC=new THREE.Color();
const pts=(n,f,col,sz)=>{const a=new Float32Array(n*3);for(let i=0;i<n;i++)a.set(f(),i*3);const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(a,3));return new THREE.Points(g,new THREE.PointsMaterial({color:col,size:sz,transparent:true,opacity:.7,depthWrite:false,blending:THREE.AdditiveBlending}))};
const terr=(size,seg,hf,cf)=>{const g=new THREE.PlaneGeometry(size,size,seg,seg).rotateX(-Math.PI/2),p=g.attributes.position,c=new Float32Array(p.count*3);for(let i=0;i<p.count;i++){const h=hf(p.getX(i),p.getZ(i));p.setY(i,h);c.set(cf(h),i*3)}g.setAttribute('color',new THREE.BufferAttribute(c,3));g.computeVertexNormals();return new THREE.Mesh(g,new THREE.MeshLambertMaterial({vertexColors:true}))};
const fh=(x,z)=>Math.sin(x*.045)*Math.cos(z*.038)*7+Math.sin(x*.12+z*.08)*2.2+Math.sin(z*.21)*.9,sh=(x,z)=>-130+Math.sin(x*.05)*5+Math.cos(z*.07)*4+Math.sin(x*.2+z*.15)*1.2;
const bd=(x,z)=>Math.sin(x*.04)*Math.cos(z*.035)*5+Math.sin(x*.11+z*.07)*1.5,sw=(x,z)=>Math.floor((Math.atan2(z,x)+Math.PI)/(2*Math.PI)*64)/64*8,ft=(x,z)=>Math.sin(x*.03)*Math.cos(z*.03)*1.5,mh=(x,z)=>Math.abs(Math.sin(x*.02)*Math.cos(z*.025))*40+Math.sin(x*.07)*Math.cos(z*.06)*8+Math.sin(x*.2+z*.17)*1.5;
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
{n:'The Drowning',fog:0x0e6f7a,d:.02,lp:110,lc:0x66ffee,amb:.4,move:'sink',vy:-5*SP,y0:-1,b:70,dur:70,h:sh,
build(){const g=new THREE.Group();g.add(terr(400,70,sh,h=>[.05,.07,.09]));
const surf=new THREE.Mesh(new THREE.PlaneGeometry(700,700).rotateX(Math.PI/2),new THREE.MeshBasicMaterial({color:0x7fe0e0,transparent:true,opacity:.5,side:THREE.DoubleSide,fog:false}));surf.position.y=.5;g.add(surf);
for(let i=0;i<14;i++){const c=new THREE.Mesh(new THREE.ConeGeometry(7,90,12,1,true),new THREE.MeshBasicMaterial({color:0x3aa8b0,transparent:true,opacity:.07,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));c.position.set(rn_(-70,70),-42,rn_(-70,70));g.add(c)}
const pi=new THREE.InstancedMesh(new THREE.CylinderGeometry(2,3,1,8),new THREE.MeshLambertMaterial({color:0x1a2a30}),30);
for(let i=0;i<30;i++){const x=rn_(-80,80),z=rn_(-80,80),ht=rn_(20,60);M4.compose(V.set(x,-130+ht/2,z),Q,S3.set(1,ht,1));pi.setMatrixAt(i,M4)}
const bub=pts(300,()=>[rn_(-60,60),rn_(-30,30),rn_(-60,60)],0xc8ffff,.3);g.add(pi,bub);
this.u=dt=>{const a=bub.geometry.attributes.position,cy=cam.position.y;for(let i=0;i<300;i++){let y=a.getY(i)+dt*1.2;if(y>cy+30)y-=60;if(y<cy-30)y+=60;a.setY(i,y)}a.needsUpdate=true;
const k=cl(-cy/120,0,1);sc.fog.color.set(0x0e6f7a).lerp(CC.set(0x00080c),k);sc.background.copy(sc.fog.color);sc.fog.density=L(.02,.05,k)};return g}},
{n:'The Cathedral',fog:0x1a1020,d:.03,lp:150,lc:0xffb070,amb:.4,move:'walk',vy:0,y0:1.7,b:28,dur:20,h:()=>0,
build(){const g=new THREE.Group(),st=new THREE.MeshLambertMaterial({color:0x2a2630});g.add(new THREE.Mesh(new THREE.CircleGeometry(34,48).rotateX(-Math.PI/2),st));
const col=new THREE.InstancedMesh(new THREE.CylinderGeometry(.9,1.1,24,10),st,26);let c=0;
for(const[r,n]of[[24,16],[13,10]])for(let i=0;i<n;i++){const a=i/n*6.283;M4.compose(V.set(Math.sin(a)*r,12,Math.cos(a)*r),Q,S3.set(1,1,1));col.setMatrixAt(c++,M4)}
const dome=new THREE.Mesh(new THREE.SphereGeometry(34,24,12,0,6.283,0,1.4),new THREE.MeshLambertMaterial({color:0x14101a,side:THREE.BackSide}));dome.position.y=18;
const wall=new THREE.Mesh(new THREE.CylinderGeometry(34,34,40,32,1,true),new THREE.MeshLambertMaterial({color:0x1c1822,side:THREE.BackSide}));wall.position.y=20;
const win=new THREE.InstancedMesh(new THREE.PlaneGeometry(3,9),new THREE.MeshBasicMaterial({side:THREE.DoubleSide}),8);
for(let i=0;i<8;i++){const a=i/8*6.283;o3.position.set(Math.sin(a)*33.5,12,Math.cos(a)*33.5);o3.rotation.set(0,a+Math.PI,0);o3.scale.set(1,1,1);o3.updateMatrix();win.setMatrixAt(i,o3.matrix);win.setColorAt(i,CC.setHSL(i/8,.9,.5))}
const face=new THREE.Mesh(new THREE.PlaneGeometry(14,14),new THREE.MeshBasicMaterial({map:tx,color:0x886666,transparent:true,opacity:.8}));face.position.set(0,12,-33);
const cd=pts(60,()=>{const a=rn_(0,6.28),r=rn_(3,26);return[Math.sin(a)*r,rn_(.8,1.3),Math.cos(a)*r]},0xffcc88,.5);g.add(col,dome,wall,win,face,cd);
this.u=()=>{cd.material.opacity=.5+.3*Math.sin(performance.now()/130)};return g}},
{n:'The Bone Desert',fog:0x3a2a1a,d:.012,lp:300,lc:0xffe0b0,amb:.6,move:'walk',vy:0,y0:1.7,b:135,dur:20,h:bd,
build(){const g=new THREE.Group();g.add(terr(300,100,bd,h=>[.5+h*.01,.4+h*.008,.28+h*.006]));
const N=touch?120:240,bn=new THREE.InstancedMesh(new THREE.BoxGeometry(.25,.25,1),new THREE.MeshLambertMaterial({color:0xe8e0c8}),N);
for(let i=0;i<N;i++){const x=rn_(-135,135),z=rn_(-135,135);o3.position.set(x,bd(x,z)+.1,z);o3.rotation.set(rn_(-.2,.2),rn_(0,6.28),rn_(-.2,.2));o3.scale.set(1,1,rn_(1.2,3.5));o3.updateMatrix();bn.setMatrixAt(i,o3.matrix)}
const rb=new THREE.InstancedMesh(new THREE.TorusGeometry(9,.6,6,14,Math.PI),new THREE.MeshLambertMaterial({color:0xd8d0b8}),7);
for(let i=0;i<7;i++){const x=rn_(-120,120),z=rn_(-120,120);o3.position.set(x,bd(x,z)-1,z);o3.rotation.set(0,rn_(0,6.28),0);o3.scale.set(1,1,1);o3.updateMatrix();rb.setMatrixAt(i,o3.matrix)}
const dst=pts(400,()=>[rn_(-135,135),rn_(0,12),rn_(-135,135)],0xd8c090,.4);g.add(bn,rb,dst);
this.u=dt=>{const a=dst.geometry.attributes.position;for(let i=0;i<400;i++){let x=a.getX(i)+dt*3;if(x>135)x=-135;a.setX(i,x)}a.needsUpdate=true};return g}},
{n:'The Hall of Mirrors',fog:0x0a1018,d:.03,lp:350,lc:0xaaddff,amb:.5,move:'walk',vy:0,y0:1.7,b:40,dur:20,h:()=>0,
build(){const g=new THREE.Group();g.add(terr(120,2,()=>0,()=>[.05,.07,.1]));
const N=90,mr=new THREE.InstancedMesh(new THREE.BoxGeometry(5,6,.2),new THREE.MeshLambertMaterial({color:0x9fb4c8,emissive:0x15222e}),N);
for(let i=0;i<N;i++){const x=rn_(-38,38),z=rn_(-38,38);if(Math.hypot(x,z)<6){i--;continue}o3.position.set(x,3,z);o3.rotation.set(0,(Math.random()*4|0)*Math.PI/2,0);o3.scale.set(1,1,1);o3.updateMatrix();mr.setMatrixAt(i,o3.matrix)}
const fl=new THREE.Mesh(new THREE.PlaneGeometry(120,120,24,24).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({color:0x182838,wireframe:true}));fl.position.y=.02;g.add(mr,fl);return g}},
{n:'The Infinite Stairwell',fog:0x0a0a10,d:.025,lp:180,lc:0xaaccff,amb:.5,move:'walk',vy:0,y0:1.7,b:12,dur:20,h:sw,
build(){const g=new THREE.Group(),N=64,stp=new THREE.InstancedMesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshLambertMaterial({color:0x2c2c3a}),N);
for(let i=0;i<N;i++){const a=(i+.5)/N*2*Math.PI-Math.PI,top=i/N*8;o3.position.set(Math.cos(a)*8,(top-40)/2,Math.sin(a)*8);o3.rotation.set(0,-a,0);o3.scale.set(8,top+40,1.4);o3.updateMatrix();stp.setMatrixAt(i,o3.matrix)}
const col=new THREE.Mesh(new THREE.CylinderGeometry(3,3,200,16),new THREE.MeshLambertMaterial({color:0x1a1a24})),wall=new THREE.Mesh(new THREE.CylinderGeometry(13,13,200,32,1,true),new THREE.MeshLambertMaterial({color:0x14141c,side:THREE.BackSide}));col.position.y=40;wall.position.y=40;
g.add(stp,col,wall,pts(40,()=>{const a=rn_(0,6.28);return[Math.cos(a)*11,rn_(0,60),Math.sin(a)*11]},0xffe0a0,.6));return g}},
{n:'The Mirror Dimension',fog:0x080c14,d:.02,lp:400,lc:0x88aaff,amb:.5,move:'walk',vy:0,y0:1.7,b:60,dur:20,h:()=>0,rev:true,
build(){const g=new THREE.Group(),N=70,mo=new THREE.InstancedMesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshLambertMaterial({color:0x303850}),N*2);
for(let i=0;i<N;i++){const x=rn_(-60,60),z=rn_(-60,60),ht=rn_(6,30),s=rn_(2,5);if(Math.hypot(x,z)<8){i--;continue}M4.compose(V.set(x,ht/2,z),Q,S3.set(s,ht,s));mo.setMatrixAt(i,M4);M4.compose(V.set(x,-ht/2-.4,z),Q,S3.set(s,ht,s));mo.setMatrixAt(N+i,M4)}
const gl=new THREE.Mesh(new THREE.PlaneGeometry(400,400).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({color:0x3a4a6a,transparent:true,opacity:.3,depthWrite:false,side:THREE.DoubleSide}));gl.position.y=-.1;
const me=new THREE.Mesh(new THREE.CapsuleGeometry(.35,1.1,4,8),new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.8}));g.add(mo,gl,me);
this.u=()=>{me.position.set(cam.position.x,-1.4,cam.position.z);Ws.forEach(w=>w.scale.x=-Math.abs(w.scale.x))};return g}},
{n:'The Chamber of Jamal',fog:0x100000,d:.02,lp:200,lc:0xff5533,amb:.25,move:'locked',vy:0,y0:0,b:0,dur:20,
build(){const g=new THREE.Group(),cols=[0xffffff,0xff8888,0x99aaff,0xffcc88,0xaaffaa,0xcc99ff],mats=cols.map(c=>new THREE.MeshBasicMaterial({map:tx,color:c,side:THREE.BackSide,fog:false})),box=new THREE.Mesh(new THREE.BoxGeometry(7,7,7),mats);g.add(box);
this.u=(dt,t)=>{box.scale.setScalar(1+.015*Math.sin(t*1.3));mats.forEach((m,i)=>m.color.set(cols[i]).multiplyScalar(i===spkI?1:.42))};return g}},
{n:'Death',fog:0x000000,d:.03,lp:90,lc:0xff3322,amb:.1,move:'dead',vy:0,y0:1.7,b:0,dur:15,
build(){const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.CircleGeometry(40,48).rotateX(-Math.PI/2),new THREE.MeshLambertMaterial({color:0x0a0a0a})));this.u=null;return g}}];
/* audio: all synthesized */
const ac=new(window.AudioContext||window.webkitAudioContext)(),mg=ac.createGain();mg.gain.value=0;const OUT=ac.createGain(),EB=ac.createGain(),VB=ac.createGain();EB.connect(OUT);VB.connect(OUT);OUT.connect(ac.destination);mg.connect(EB);mg.gain.linearRampToValueAtTime(.7,ac.currentTime+5);ac.resume();
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
ui.innerHTML='<div id="fd" style="position:absolute;inset:0;background:#000;opacity:0;transition:opacity 1.5s"></div><div id="vg" style="position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 35%,#000 105%)"></div><div id="rn" style="position:absolute;top:12%;width:100%;text-align:center;font-size:clamp(1.2rem,4vw,2.4rem);letter-spacing:.3em;opacity:0;transition:opacity 2s"></div><p style="position:absolute;bottom:14px;width:100%;text-align:center;margin:0;font-size:.8rem;opacity:.5">'+(touch?'Left thumb moves. Right thumb looks.':'Click to look. WASD move, Shift run, Space jump, F or click: fire your one bullet. E: shove.')+'</p><button id="lv" style="position:absolute;top:14px;right:14px;pointer-events:auto;background:none;border:1px solid #ebe6da;color:inherit;font:inherit;padding:.4em 1em;cursor:pointer">Leave</button>'+(touch?'<div style="position:absolute;right:14px;bottom:44px;display:flex;gap:10px;pointer-events:auto"><button id="rb" style="background:none;border:1px solid #ebe6da;color:inherit;font:inherit;padding:.7em 1em">Run</button><button id="jb" style="background:none;border:1px solid #ebe6da;color:inherit;font:inherit;padding:.7em 1em">Jump</button><button id=\"hb\" style=\"background:none;border:1px solid #ebe6da;color:inherit;font:inherit;padding:.7em 1em\">Fire</button></div>':'');
document.body.appendChild(ui);const vg=ui.querySelector('#vg'),rnb=ui.querySelector('#rn'),fd=ui.querySelector('#fd');
let cycle=1;const say=(t,s)=>{rnb.innerHTML=t+'<br><small style="font-size:.5em;opacity:.7">Cycle '+cycle+(s?' · '+s:'')+'</small>';rnb.style.opacity=1;setTimeout(()=>rnb.style.opacity=0,6500)};
const subEl=document.createElement('div');subEl.style.cssText='position:absolute;bottom:64px;width:100%;text-align:center;padding:0 6%;box-sizing:border-box;font-size:clamp(1rem,2.6vw,1.5rem);text-shadow:0 0 6px #000,0 0 12px #000;transition:opacity .4s;opacity:0';ui.appendChild(subEl);
let subT;const sub=(t,w,ms)=>{if(subOpt===false)return;subEl.innerHTML=(w?'<b style="color:#c9a24b">'+w+':</b> ':'')+t;subEl.style.opacity=1;clearTimeout(subT);subT=setTimeout(()=>subEl.style.opacity=0,ms||Math.max(3000,t.length*80+1500))};
let vlock=0;const jsay=(k,c,o)=>{const n=performance.now();if(n<vlock&&!(o&&o.force))return null;const t=gen(k,c||{});vlock=n+1e9;sub(t,(o&&o.who)||'Jamal',Math.max(3000,t.length*80+1500));Promise.all([speak(t,o||{deep:true}),new Promise(r=>setTimeout(r,Math.max(1800,t.length*70)))]).then(()=>{vlock=performance.now()+1800});return t};
const obj=document.createElement('div');obj.style.cssText='position:absolute;top:14px;left:14px;font-size:.85rem;opacity:.75;letter-spacing:.08em';ui.appendChild(obj);
/* watchers */
const tx=new THREE.TextureLoader().load('jamal.webp');tx.colorSpace=THREE.SRGBColorSpace;
const wg=new THREE.CircleGeometry(1.15,48),Ws=[];
const soft0=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d'),g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64);return new THREE.CanvasTexture(c)})();
const mk0=()=>{const s=new THREE.Sprite(new THREE.SpriteMaterial({map:soft0,color:0xaab8d0,transparent:true,opacity:0,depthWrite:false}));s.scale.set(5,5,1);sc.add(s);return s};
const addW=()=>{const m=new THREE.Mesh(wg,new THREE.MeshBasicMaterial({map:tx,color:0x9aa3b5,side:THREE.DoubleSide,transparent:true,opacity:0,depthWrite:false}));m.userData={st:'idle',a:0,tgt:.2,oy:2.6,ph:rn_(0,6),tpAt:0,dashAt:0,dest:new THREE.Vector3(),mist:mk0(),type:'n',an:{x:0,z:0},vi:Ws.length};sc.add(m);Ws.push(m)};addW();
let ri=0,cr=RL[0],grp=null,swapping=false,base=1.7,jy=0,jv=0,spT=false,dashing=false,realmStart=0,end=0,T=0,last=performance.now(),nextWh=last+9000,nextPing=last+15000,nextBeat=0,yaw=0,pit=0,run=true,raf;
function placeW(){const mo=cr.move,near=mo==='dead'?7:mo==='walk'||mo==='float'?45:22;Ws.forEach((w,i)=>{const a=mo==='dead'?i/Ws.length*6.283:Math.random()*6.283;w.position.set(cam.position.x+Math.sin(a)*near,0,cam.position.z+Math.cos(a)*near);w.position.y=mo==='walk'?cr.h(w.position.x,w.position.z)+2.6:mo==='dead'?2.4:cam.position.y+rn_(-3,3)})}
function swap(i){clearProps();dyingT=0;Ws.forEach(w=>w.scale.x=Math.abs(w.scale.x));if(grp){sc.remove(grp);grp.traverse(o=>{o.geometry&&o.geometry.dispose();o.material&&o.material.dispose&&o.material.dispose()})}
ri=i;cr=RL[i];grp=cr.build();sc.add(grp);sc.fog.color.set(cr.fog);sc.background.set(cr.fog);sc.fog.density=cr.d;pl.color.set(cr.lc);hm.intensity=cycle===6?0:cr.amb;
cam.position.set(0,cr.move==='walk'?cr.h(0,0)+1.7:cr.y0,0);yaw=pit=0;base=cam.position.y;jy=jv=0;fxTint();placeW();Ws.forEach(w=>{const u=w.userData,n=performance.now();u.st=u.off?'gone':'idle';u.gt=1e15;u.a=0;u.mist.material.opacity=0;u.oy=2.6;u.an={x:(w.position.x+cam.position.x)/2,z:(w.position.z+cam.position.z)/2};u.tpAt=n+rn_(6000,12000);u.dashAt=n+20000+rn_(0,30000)/(1+.15*cycle)});dashing=false;realmStart=performance.now();lp.frequency.linearRampToValueAtTime(cr.lp,ac.currentTime+3);say(cr.n,cr.move==='dead'?(killerTxt||deathTxt):(oi===0?ARC[cycle-1]:''));if(cr.move==='locked'){chVis=true;chamberTalk()}if(cr.rev)sub('Left is right. Right is left.','',3500);if(cr.move==='dead'){tone(40,36,.12,10,0);setTimeout(()=>jsay('taunt',cx()),3000);killerTxt=deathTxt=''}
end=performance.now()+(cr.move==='dead'?15000:cr.move==='locked'?90000:(isArt()?35:20)*(comfort?1.4:1)*1000);sv=cr.vy||0;mkFrag();mkProps();setObj();skyRoll();if(Math.random()<.5)setTimeout(()=>jsayQ('realm'),4000)}
function goto(i){swapping=true;fd.style.opacity=1;setTimeout(()=>{if(!run)return;swap(i);fd.style.opacity=0;swapping=false},1700)}
function endCycle(){frags+=gotN;if(chDue&&!chVis)chamberOwed=true;cycle++;save();if(cycle>7){cycle=7;swapping=true;setTimeout(()=>finale(frags>=7?'good':'bad'),800)}else startCycle(true)}
function next(){if(cr.move==='dead'){deaths++;endCycle()}else{oi++;if(oi<order.length)goto(order[oi]);else endCycle()}}
/* hunting */
function tp(w){const mo=cr.move,ch=(mo==='walk'?['b','b','u','f','n','n']:['b','b','u','d','d','f','n','n'])[Math.random()*(mo==='walk'?6:8)|0],ang=yaw+rn_(-.5,.5),u=w.userData,c=cam.position;
u.short=ch==='n';if(ch==='b'){const r=rn_(9,14);u.dest.set(c.x+Math.sin(ang)*r,c.y,c.z+Math.cos(ang)*r);u.oy=2.6}
else if(ch==='u'){u.dest.set(c.x+rn_(-2,2),c.y+rn_(7,10),c.z+rn_(-2,2));u.oy=mo==='walk'?rn_(9,11):2.6}
else if(ch==='d'){u.dest.set(c.x+rn_(-2,2),c.y-rn_(7,10),c.z+rn_(-2,2));u.oy=2.6}
else if(ch==='n'){const r=rn_(9,15);u.dest.set(c.x-Math.sin(yaw)*r,c.y,c.z-Math.cos(yaw)*r);u.oy=2.6}
else{const a=rn_(0,6.28),r=rn_(22,30);u.dest.set(c.x+Math.sin(a)*r,c.y,c.z+Math.cos(a)*r);u.oy=2.6}
if(mo==='walk')u.dest.y=cr.h(u.dest.x,u.dest.z)+u.oy}
function scream(){const t=ac.currentTime,v=comfort?.35:.6,g=ac.createGain(),ws=ac.createWaveShaper(),cp=ac.createDynamicsCompressor(),cv2=new Float32Array(256);
for(let i=0;i<256;i++)cv2[i]=Math.tanh((i/128-1)*6);ws.curve=cv2;cp.threshold.value=-20;cp.ratio.value=12;
g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.04);g.gain.setValueAtTime(v,t+1.6);g.gain.exponentialRampToValueAtTime(.001,t+2.4);
[0,1,2].forEach(i=>{const o=ac.createOscillator(),f=ac.createBiquadFilter(),vb=ac.createOscillator(),vg=ac.createGain(),b=520+i*37;o.type='sawtooth';o.frequency.setValueAtTime(b,t);o.frequency.exponentialRampToValueAtTime(b*2.2,t+.5);o.frequency.exponentialRampToValueAtTime(b*1.6,t+2.2);
vb.frequency.value=7+i*1.3;vg.gain.value=40;vb.connect(vg);vg.connect(o.frequency);f.type='bandpass';f.Q.value=5;f.frequency.setValueAtTime(900,t);f.frequency.linearRampToValueAtTime(2600,t+.6);f.frequency.linearRampToValueAtTime(1500,t+2);
o.connect(f);f.connect(ws);o.start(t);vb.start(t);o.stop(t+2.5);vb.stop(t+2.5)});
const s=ac.createBufferSource(),nf=ac.createBiquadFilter(),ng=ac.createGain();s.buffer=nb;s.loop=true;nf.type='bandpass';nf.frequency.value=3000;nf.Q.value=1.2;ng.gain.value=.5;s.connect(nf);nf.connect(ng);ng.connect(ws);s.start(t);s.stop(t+2.5);
ws.connect(g);g.connect(cp);cp.connect(EB);tone(60,25,.3,1,0);
mg.gain.cancelScheduledValues(t);mg.gain.setTargetAtTime(.12,t,.05);mg.gain.setTargetAtTime(.7,t+3,.6)}
function kill(){swapping=true;dashing=false;scream();dyingT=performance.now();Object.keys(k).forEach(c=>k[c]=false);mv.x=mv.y=0;setTimeout(()=>{fd.style.transition='opacity .1s';fd.style.opacity=1},520);
setTimeout(()=>{if(!run)return;swap(RL.length-1);fd.style.transition='opacity 1.5s';fd.style.opacity=0;swapping=false},3000)}
/* input */
const k={},mv={x:0,y:0},tc={};
const kd=e=>{if(dyingT)return;if(e.code==='Space')e.preventDefault();if(e.code==='KeyF')swing();if(e.code==='KeyE')shove();if(e.code==='KeyO')togglePanel();k[e.code]=true},ku=e=>k[e.code]=false,mm=e=>{if(document.pointerLockElement===cv){yaw-=e.movementX*.0025*(cr.rev?-1:1);pit=cl(pit-e.movementY*.0025,-1.2,1.2)}},rz=()=>{cam.aspect=W()/H();cam.updateProjectionMatrix();rd.setSize(W(),H())};
addEventListener('keydown',kd);addEventListener('keyup',ku);addEventListener('mousemove',mm);addEventListener('resize',rz);
cv.onclick=()=>{if(!touch)cv.requestPointerLock?.()};cv.addEventListener('mousedown',e=>{if(document.pointerLockElement===cv&&e.button===0)swing()});
cv.addEventListener('touchstart',e=>{for(const t of e.changedTouches)tc[t.identifier]={x:t.clientX,y:t.clientY,m:t.clientX<W()/2}},{passive:true});
cv.addEventListener('touchmove',e=>{for(const t of e.changedTouches){const s=tc[t.identifier];if(!s)continue;if(s.m){mv.x=cl((t.clientX-s.x)/50,-1,1);mv.y=cl(-(t.clientY-s.y)/50,-1,1)}else{yaw-=(t.clientX-s.x)*.005*(cr.rev?-1:1);pit=cl(pit-(t.clientY-s.y)*.005,-1.2,1.2);s.x=t.clientX;s.y=t.clientY}}},{passive:true});
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
if(m!=='sink')sc.fog.density=cr.d;sc.fog.density*=fogMul*(cycle===6?1.6:1);
if(now>tGl){glT=now;tGl=nx(30,60)}
if(m!=='sink')sc.fog.color.set(cr.fog);if(glT&&now-glT<6000)sc.fog.color.offsetHSL(0,0,.08*Math.sin((now-glT)/6000*Math.PI));sc.background.copy(sc.fog.color);
if(now>tFlk&&m!=='dead'){flkUntil=now+2000;tFlk=nx(25,60)}
pl.intensity=now<flkUntil?18*(1-.75*Math.pow(Math.sin((now-flkUntil)/1000*3.5),2)):(cycle===6?5:18);
if(now>tPh&&m!=='dead'){tPh=nx(15,35);const p=rn_(-1,1);if(Math.random()<.5)for(let i=0;i<4;i++)tone(90,50,.05,.12,p,i*.45);else ns(700,2,.05,1.4,p)}
if(F===1&&m!=='dead'&&now>tSl){tSl=nx(45,90);const t=ac.currentTime,d=rn_(3.5,5);mg.gain.cancelScheduledValues(t);mg.gain.setTargetAtTime(.02,t,.1);mg.gain.setTargetAtTime(.7,t+d,.3);tone(55,30,.18,.4,0,d)}
if(F===1&&!comfort&&m!=='dead'&&now>tTr){trUntil=now+2500;tTr=nx(50,95);tone(35,28,.15,2.5,0)}
const te=trUntil-now;cam.rotation.z=te>0?Math.sin(now*.05)*.012*Math.min(1,te/500):0;
if(now>tSil&&m!=='dead'&&!sil.visible){tSil=nx(20,40);sil.visible=true;sa=rn_(0,6.28);sT=0}
if(sil.visible){sT+=dt;sa+=dt*.15;const x=c.x+Math.sin(sa)*35,z=c.z+Math.cos(sa)*35;sil.material.opacity=.65*Math.sin(Math.min(sT/7,1)*Math.PI);sil.position.set(x,m==='walk'?cr.h(x,z)+2.5:c.y,z);sil.lookAt(c.x,sil.position.y,c.z);if(sT>7)sil.visible=false}
if(F===1&&dmin<12&&now-lastTear>6000){lastTear=now;cv.style.transform='translateX(6px)';setTimeout(()=>cv.style.transform='',90)}}
/* physics props, stick, banish, death tumble */
const GV={'The Void':0,'The Sky':-1.5,'The Drowning':-3},LD={'The Void':.02,'The Drowning':.8},bm=c=>new THREE.MeshLambertMaterial({color:c}),BX=new THREE.BoxGeometry(1,1,1),IC=new THREE.IcosahedronGeometry(1,1);
let props=[],sticks=[],hasStick=false,swingT=0,dyingT=0;
const held=new THREE.Group(),gmt=new THREE.MeshBasicMaterial({color:0x303038}),gt=new THREE.Mesh(new THREE.BoxGeometry(.06,.07,.3),gmt);gt.position.set(0,.07,-.1);held.add(new THREE.Mesh(new THREE.BoxGeometry(.08,.12,.34),gmt),gt);held.position.set(.28,-.26,-.55);held.visible=false;cam.add(held);
function addProp(kind,x,y,z,sx,sy,sz,mass,color,ttl,mir){const s=kind==='s',b=new CANNON.Body({mass,shape:s?new CANNON.Sphere(sx):new CANNON.Box(new CANNON.Vec3(sx/2,sy/2,sz/2)),position:new CANNON.Vec3(x,y,z),linearDamping:LD[cr.n]??.05,angularDamping:.4,allowSleep:true});
world.addBody(b);const m=new THREE.Mesh(s?IC:BX,bm(color));s?m.scale.setScalar(sx):m.scale.set(sx,sy,sz);grp.add(m);props.push({m,b,r:s?sx:Math.max(sx,sy,sz)/2,ttl,mir})}
function clearProps(){props.forEach(p=>world.removeBody(p.b));props=[];sticks=[]}
function mkProps(){const n=cr.n;world.gravity.set(0,GV[n]??-20,0);if(cr.move==='locked')return;if(cr.move==='dead'){hasStick=false;held.visible=false;return}if(cr.move==='fall')return;
const yy=(x,z)=>cr.move==='walk'?cr.h(x,z)+2:cam.position.y+rn_(-6,8)-(cr.move==='sink'?rn_(5,30):0);
for(let i=0;i<(['The Infinite Stairwell','The Mirror Dimension'].includes(n)?0:13);i++){const a=rn_(0,6.28),r=rn_(5,34),x=Math.sin(a)*r,z=Math.cos(a)*r,y=yy(x,z);
if(n==='The Machine World'||n==='The Drowning')addProp('b',x,y,z,rn_(.7,1.3),rn_(.7,1.3),rn_(.7,1.3),rn_(2,4),n==='The Drowning'?0x3a4a50:0x3a4258);
else if(n==='The Alien Forest')i%2?addProp('s',x,y,z,rn_(.4,.7),0,0,1,0x66ffcc):addProp('b',x,y,z,.35,.35,rn_(1.5,2.5),2,0x4a3a5a);
else if(n==='The Cathedral')i%2?addProp('b',x,y,z,.8,3,.8,10,0x6a6070):addProp('b',x,y,z,.3,1,.3,1,0xffcc88);
else if(n==='The Bone Desert')i%2?addProp('b',x,y,z,.25,.25,rn_(1.2,2),1,0xe8e0c8):addProp('s',x,y,z,.35,0,0,.8,0xe8e0c8);
else if(n==='The Hall of Mirrors')addProp('b',x,y,z,1.6,2.4,.15,6,0xaabbcc,undefined,true);
else addProp('s',x,y,z,n==='The Ashen Peaks'?rn_(.6,1.4):rn_(.8,2),0,0,n==='The Ashen Peaks'?rn_(4,9):rn_(2,5),n==='The Void'||n==='The Sky'?0x585868:0x4a4038)}
for(let i=0;i<2;i++){const a=rn_(0,6.28),r=rn_(6,Math.min(30,cr.b||30)),x=Math.sin(a)*r,z=Math.cos(a)*r,y=cr.move==='walk'?cr.h(x,z)+.4:cr.move==='sink'?cam.position.y-rn_(8,45):cam.position.y+rn_(-2,3);
const s=new THREE.Mesh(new THREE.BoxGeometry(.1,.14,.4),new THREE.MeshBasicMaterial({color:0x8a8a99}));
const g=new THREE.Sprite(new THREE.SpriteMaterial({map:soft0,color:0xffe0a0,transparent:true,opacity:.7,depthWrite:false}));g.scale.set(2,2,1);const o=new THREE.Group();o.add(s,g);o.position.set(x,y,z);grp.add(o);sticks.push(o)}}
function physUpdate(now,dt){world.step(1/60,dt,3);
for(let i=props.length-1;i>=0;i--){const p=props[i],b=p.b;if(p.ttl&&now>p.ttl){world.removeBody(b);grp.remove(p.m);props.splice(i,1);continue}
const f=cr.h?cr.h(b.position.x,b.position.z)+p.r:-1e9;if(b.position.y<f){b.position.y=f;if(b.velocity.y<0)b.velocity.y*=-.2;b.velocity.x*=.9;b.velocity.z*=.9}
if(b.position.y<-90&&!cr.h){b.position.y=70;b.velocity.set(0,0,0)}
const dx=b.position.x-cam.position.x,dz=b.position.z-cam.position.z,hd=Math.hypot(dx,dz);if(hd>0&&hd<.9+p.r&&Math.abs(b.position.y-cam.position.y)<2.2){b.velocity.x+=dx/hd*2.5;b.velocity.z+=dz/hd*2.5}
p.m.position.copy(b.position);p.m.quaternion.copy(b.quaternion)}
for(const o of sticks.slice()){o.rotation.y+=dt;if(!hasStick&&o.position.distanceTo(cam.position)<2.4){hasStick=true;grp.remove(o);sticks.splice(sticks.indexOf(o),1);held.visible=true;tone(500,700,.08,.2,0);setObj();sub('You pick up a pistol. One bullet.','',3000);setTimeout(()=>jsayQ('gun'),1800)}}
shoveT-=dt;if(swingT>0){swingT-=dt;held.rotation.x=-.5*Math.max(0,swingT)/.35;held.position.z=-.55+.12*Math.max(0,swingT)/.35}}
function banish(w){const u=w.userData;u.st='gone';u.gt=performance.now()+30000;u.a=0;w.material.opacity=0;u.mist.material.opacity=0;w.position.y=-999;tone(200,40,.2,.5,0);sub('He vanishes.','',3000);setTimeout(()=>jsayQ('banish'),1200)}
function swing(){if(!hasStick||swingT>0||swapping||dyingT)return;hasStick=false;held.visible=false;swingT=.35;setObj();
const fv=new THREE.Vector3();cam.getWorldDirection(fv);const o=cam.position;ns(900,.8,.4,.25,0);tone(180,40,.25,.3,0);
let best=1e9,hit=null;const hitT=(pos,r)=>{const d=pos.clone().sub(o),t=d.dot(fv);if(t<0||t>70||t>=best)return false;if(d.sub(fv.clone().multiplyScalar(t)).length()<r){best=t;return true}return false};
for(const p of props)if(hitT(p.m.position,p.r+.25))hit={p};
for(const w of Ws){const u=w.userData;if(u.a>.08&&u.st==='idle'&&hitT(w.position,1.2))hit={w}}
const e=o.clone().addScaledVector(fv,hit?best:60),s0=o.clone().addScaledVector(fv,.7);s0.y-=.15;
const ln=new THREE.Line(new THREE.BufferGeometry().setFromPoints([s0,e]),new THREE.LineBasicMaterial({color:0xffe9a0}));sc.add(ln);setTimeout(()=>{sc.remove(ln);ln.geometry.dispose()},90);
if(hit&&hit.p&&hit.p.mir)shatter(hit.p);else if(hit&&hit.p){const b=hit.p.b;b.wakeUp&&b.wakeUp();b.applyImpulse(new CANNON.Vec3(fv.x*30*b.mass,(fv.y*30+4)*b.mass,fv.z*30*b.mass));tone(110,60,.12,.2,0)}else if(hit&&hit.w)banish(hit.w);else setTimeout(()=>jsayQ('miss'),900)}
function shatter(p){const q=p.b.position;world.removeBody(p.b);grp.remove(p.m);props.splice(props.indexOf(p),1);for(let i=0;i<10;i++){addProp('b',q.x+rn_(-.5,.5),q.y+rn_(-1,1),q.z+rn_(-.2,.2),.2,.25,.03,.1,0xbbd0e0,performance.now()+8000);props[props.length-1].b.velocity.set(rn_(-3,3),rn_(1,4),rn_(-3,3))}for(let i=0;i<4;i++)tone(1800+i*400,900,.06,.5,rn_(-1,1),i*.05)}
function shove(){if(shoveT>0||dyingT)return;shoveT=.5;const fv=new THREE.Vector3();cam.getWorldDirection(fv);tone(160,90,.05,.15,0);
for(const p of props){const d=p.m.position.clone().sub(cam.position),l=d.length()||1;if(l<2.6+p.r&&d.dot(fv)/l>.3){p.b.wakeUp&&p.b.wakeUp();p.b.applyImpulse(new CANNON.Vec3(fv.x*6*p.b.mass,(fv.y*6+2)*p.b.mass,fv.z*6*p.b.mass))}}}
function dieUpdate(now,dt){if(!dyingT)return;const kk=Math.min(1,(now-dyingT)/450);cam.rotation.set(pit-kk*1.2,yaw,kk*.9);cam.position.y=Math.max(cam.position.y-dt*3,.3)}

/* cycle, artifacts, absence, jump scare */
const shuf=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
let chamberOwed=false,chVis=false,chDue=false,order=[],oi=0,fragRs=[],fragGot={},gotN=0,artN=1,frag=null,touchT=0,killerTxt='',deathTxt='',absEnd=0,nextTick=0,tAbs=performance.now()+40000,tSc=performance.now()+30000,frags=0,deaths=0,sv=0,kickAt=0,objBase='',shoveT=0,sk=0,ended=false;
try{frags=+localStorage.getItem('ji_frags')||0;cycle=Math.min(7,+localStorage.getItem('ji_cycle')||1)}catch(e){}
const save=()=>{try{localStorage.setItem('ji_frags',frags);localStorage.setItem('ji_cycle',cycle)}catch(e){}};
const wantJ=()=>Math.max(1,Math.min(8,cycle+DF.cnt)),isArt=()=>fragRs.includes(ri)&&!fragGot[ri];
const LQ=['Time does not pass me. Time passes through me.','You ask who created the universe. I ask who gave the universe permission to exist.','They call me Jamal. They call him Chadimus. The enlightened know these are merely two pronunciations of the same cosmic frequency.','I did not enter the timeline. The timeline unlocked me.','Before I was, nothing was. After I am, nothing needs to be.','Bro, I was there before the Big Bang. The invitation was late.','You cannot defeat a being who has already experienced your victory.'];
const NZ=`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")`;
const fs=document.createElement('div');fs.style.cssText='position:absolute;inset:0;opacity:0;pointer-events:none;filter:grayscale(1) contrast(1.8) brightness(.75);background:#000 url(jamal.webp) center/cover';
const nz=document.createElement('div');nz.style.cssText='position:absolute;inset:0;opacity:.45;background-image:'+NZ;fs.appendChild(nz);ui.appendChild(fs);
function scare(){fs.style.transition='none';fs.style.transform='scale(1.2)';fs.style.opacity=.95;ns(3000,.7,.3,.5,0);tone(70,30,.3,.6,0);setTimeout(()=>{fs.style.transition='opacity .25s,transform .25s';fs.style.opacity=0;fs.style.transform='scale(1)'},650)}
const PL=RL.map((r,i)=>r.move==='dead'||r.move==='locked'?-1:i).filter(i=>i>=0),CHI=RL.findIndex(r=>r.move==='locked');
const mkSched=()=>{const b=shuf(PL),d=b.concat(b,b);let i=0;return[5,5,5,5,5,5,6].map(n=>d.slice(i,i+=n))};
let sched=null;try{sched=JSON.parse(localStorage.getItem('ji_sched'))}catch(e){}
if(!(sched&&sched.length===7&&sched.every(a=>Array.isArray(a)&&a.every(x=>PL.includes(x)))))sched=mkSched();
try{localStorage.setItem('ji_sched',JSON.stringify(sched))}catch(e){}
function startCycle(fade){const base=shuf(sched[cycle-1].slice());order=base.slice();oi=0;gotN=0;fragGot={};artN=Math.random()<.5?1:2;fragRs=shuf(base).slice(0,artN);
chVis=false;chDue=cycle===2||cycle===3||chamberOwed;if(chDue||(cycle===6&&Math.random()<.4)){order.splice(1+(Math.random()*2|0),0,CHI);chamberOwed=false}
while(Ws.length<wantJ())addW();Ws.forEach((w,i)=>{const t=i<2?'n':['whisper','giant','mirror'][(i-2)%3],ok=t==='whisper'?cycle>=3:t==='giant'?cycle>=4:t==='mirror'?cycle>=5:true;w.userData.type=ok?t:'n';w.userData.off=i>=wantJ();w.scale.setScalar(w.userData.type==='giant'?3:1)});
fade?goto(order[0]):swap(order[0])}
function setObj(){objBase=cr.move==='dead'?'':'Artifacts '+(frags+gotN)+'/7 · cycle '+cycle+'/7 · realm '+(oi+1)+'/'+order.length+(hasStick?' · pistol: 1 bullet':'');obj.textContent=objBase}
function mkFrag(){frag=null;if(cr.move==='dead'||!isArt())return;const g=new THREE.Group(),mo=cr.move,a=rn_(0,6.28),r=cr.b&&cr.b<62?rn_(cr.b*.55,cr.b*.9):rn_(38,62);
g.add(new THREE.Mesh(new THREE.OctahedronGeometry(.6),new THREE.MeshBasicMaterial({color:0xffd070,fog:false})),new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,160,8,1,true),new THREE.MeshBasicMaterial({color:0xffc060,transparent:true,opacity:.35,blending:THREE.AdditiveBlending,depthWrite:false,fog:false})));
let x=Math.sin(a)*r,z=Math.cos(a)*r,y;if(mo==='walk')y=cr.h(x,z)+1.6;else if(mo==='float')y=cam.position.y+rn_(-6,10);else if(mo==='fall'){x=rn_(-6,6);z=rn_(-6,6);y=-rn_(120,190);g.add(new THREE.Mesh(new THREE.TorusGeometry(3,.2,8,24).rotateX(Math.PI/2),new THREE.MeshBasicMaterial({color:0xffd070,fog:false})))}else{x=rn_(-12,12);z=rn_(-12,12);y=-rn_(60,100)}
g.position.set(x,y,z);grp.add(g);frag={g,gem:g.children[0]}}
function collect(){gotN++;fragGot[ri]=true;grp.remove(frag.g);frag=null;tone(660,990,.16,1.2,0);setObj();sub('“'+LQ[(frags+gotN-1)%7]+'”','Artifact '+(frags+gotN)+' of 7',6000);setTimeout(()=>jsay('frag',{n:frags+gotN}),3500)}
function fragUpdate(now,dt){if(!frag||swapping)return;const p=frag.g.position,d=p.distanceTo(cam.position);frag.gem.rotation.y+=dt*2;frag.gem.position.y=Math.sin(now/400)*.25;obj.textContent=objBase+' · artifact '+d.toFixed(0)+' m';
if(now>nextTick){const dx=p.x-cam.position.x,dz=p.z-cam.position.z,dl=Math.hypot(dx,dz)||1;tone(880,860,.16,.3,cl((dx*Math.cos(yaw)-dz*Math.sin(yaw))/dl,-1,1));nextTick=now+cl(d*40,250,1600)}if(d<3)collect()}
function resetRun(c,f){cycle=c;frags=f;deaths=0;gotN=0;chamberOwed=false;sched=mkSched();save();try{localStorage.setItem('ji_sched',JSON.stringify(sched))}catch(e){}fin=false;ended=false;swapping=false;ui.style.zIndex='8';subEl.style.top='';subEl.style.bottom='64px';subEl.style.zIndex=5;vg.style.display='';fd.style.display='';fd.style.opacity=0;fd.style.background='#000';subEl.style.color='';subEl.style.textShadow='';obj.style.display='';ui.querySelectorAll('.hnd').forEach(e=>e.remove());document.querySelectorAll('.endcard').forEach(e=>e.remove());fovAdd=0;cam.fov=70;cam.updateProjectionMatrix();Ws.forEach(w=>{w.userData.st='idle';w.userData.gt=0});vlock=0;startCycle(true)}
const clearSave=()=>{try{['ji_frags','ji_cycle','ji_sched'].forEach(k=>localStorage.removeItem(k))}catch(e){}};
function ending(kind){if(ended)return;ended=true;swapping=true;const good=kind==='good';vg.style.display=fd.style.display='none';ui.style.zIndex=10;subEl.style.color=good?'#000':'#c33';subEl.style.textShadow='none';
let seen=[];try{seen=JSON.parse(localStorage.getItem('ji_seen')||'[]')}catch(e){}if(!seen.includes(kind))seen.push(kind);try{localStorage.setItem('ji_seen',JSON.stringify(seen))}catch(e){}
const other=good?'bad':'good',both=seen.length>=2,col=good?'#000':'#a11';
const o=document.createElement('div');o.className='endcard';o.style.cssText='position:fixed;inset:0;background:'+(good?'#fff':'#000')+';color:'+col+';z-index:9;display:grid;place-content:center;justify-items:center;gap:1rem;text-align:center;font-family:Palatino,Georgia,serif;opacity:0;transition:opacity 4s;padding:24px;overflow:auto';
o.innerHTML=good?'<h1 style="font-weight:400;letter-spacing:.3em;margin:0">TRANSCENDED</h1><p style="margin:0">Reality is a suggestion. Jamal Ismail is the final answer.</p>':'<h1 style="font-weight:400;letter-spacing:.3em;margin:0">THE UNMAKING</h1><p style="margin:0">You were never the visitor.</p>';
const mkb=(t,f)=>{const b=document.createElement('button');b.textContent=t;b.style.cssText='background:none;border:1px solid '+col+';color:inherit;font:inherit;padding:.6em 1.4em;cursor:pointer;margin:.3rem';b.onclick=f;return b};
const row=document.createElement('div');row.style.cssText='margin-top:2.5rem;display:grid;gap:.4rem;justify-items:center';
const msg=document.createElement('p');msg.style.cssText='margin:0;max-width:34rem;opacity:.85';msg.textContent=both?'You have witnessed both endings.':'You have now witnessed an ending. Play through the game properly to find the other, or skip to the final cycle.';row.appendChild(msg);
row.appendChild(mkb('Play from the beginning',()=>{clearSave();o.remove();resetRun(1,0)}));
if(!both){const pw=document.createElement('input');pw.placeholder='Secret password';pw.style.cssText='display:none;font:inherit;padding:.5em;text-align:center;background:transparent;border:1px solid '+col+';color:inherit';const er=document.createElement('div');er.style.cssText='min-height:1.2em;font-size:.85rem';
const go=()=>{if(pw.value.trim().toLowerCase()==='jaliff is gay'){o.remove();resetRun(7,other==='good'?7:0)}else er.textContent='Wrong password.'};pw.onkeydown=e=>{e.stopPropagation();if(e.key==='Enter')go()};
row.appendChild(mkb('Skip to the final cycle',()=>{if(pw.style.display==='none'){pw.style.display='block';pw.focus();er.textContent='Type the secret password to skip the hassle, then press Enter.';return}go()}));row.appendChild(pw);row.appendChild(er)}
row.appendChild(mkb('Leave',()=>{clearSave();o.remove();stop()}));o.appendChild(row);document.body.appendChild(o);setTimeout(()=>o.style.opacity=1,50);setTimeout(()=>jsay(good?'end':'bad',{},{deep:true,force:true}),4500)}
function camUpdate(now,dt){const mvg=k.KeyW||k.KeyA||k.KeyS||k.KeyD||k.ArrowUp||k.ArrowDown||k.ArrowLeft||k.ArrowRight||Math.abs(mv.x)+Math.abs(mv.y)>.2,s=(k.ShiftLeft||k.ShiftRight||spT)&&mvg&&cr.move!=='sink'&&cr.move!=='dead'&&!dyingT;sk+=((s?1:0)-sk)*Math.min(1,dt*8);const f=70+9*sk+fovAdd;if(Math.abs(cam.fov-f)>.05){cam.fov=f;cam.updateProjectionMatrix()}if(sk>.02){cam.rotation.x+=Math.sin(now*.021)*.007*sk;cam.rotation.z+=Math.sin(now*.014)*.012*sk}}
/* presence: frequent speech, chamber, sky Jamal, static, decoys */
let tSpk=performance.now()+12000,tSt=performance.now()+25000,spkI=-1,skyOn=false,tSky=0,decoy=null;
const skyFace=new THREE.Mesh(new THREE.PlaneGeometry(240,240).rotateX(Math.PI/2),new THREE.MeshBasicMaterial({map:tx,color:0xaa9988,transparent:true,opacity:0,depthWrite:false,fog:false,side:THREE.DoubleSide}));skyFace.visible=false;sc.add(skyFace);
const VO=[[8,105,.7,-1],[14,115,.78,1],[22,125,.85,0],[30,140,.9,0],[40,110,.75,-.5],[50,150,1,.5],[18,100,.72,.3],[26,120,.82,-.3],[36,135,.88,.6],[44,108,.76,-.6]],ROM=['I','II','III','IV','V','VI','VII','VIII','IX','X'];
const cx=()=>({cycle,deaths,frags:frags+gotN,realm:cr.n,dd:deaths?'died '+deaths+(deaths>1?' times':' time'):'not even died yet, a miracle of cowardice'});
function talk(){if(performance.now()<vlock)return;let best=null,bd=1e9;for(const w of Ws){if(w.userData.st==='gone')continue;const d=w.position.distanceTo(cam.position);if(d<bd){bd=d;best=w}}if(!best)return;const dx=best.position.x-cam.position.x,dz=best.position.z-cam.position.z,l=Math.hypot(dx,dz)||1;
const vv=VO[best.userData.vi%VO.length];jsay('say',cx(),{deep:true,who:'Jamal '+ROM[best.userData.vi%10],pitch:vv[0],speed:vv[1],rate:best.userData.type==='giant'?.6:vv[2],pan:cl((dx*Math.cos(yaw)-dz*Math.sin(yaw))/l,-1,1)})}
async function chamberTalk(){const ctx=cx();vlock=1e18;for(let i=0;i<6;i++){if(cr.move!=='locked'){vlock=0;return}spkI=i;const t=gen('chamber',ctx),v=VO[i];sub(t,'Jamal '+ROM[i],9000);await Promise.all([speak(t,{deep:true,pitch:v[0],speed:v[1],rate:v[2],pan:v[3]}),new Promise(r=>setTimeout(r,Math.max(2500,t.length*75)))]);await new Promise(r=>setTimeout(r,350))}vlock=performance.now()+1500;if(cr.move==='locked'){spkI=-1;end=performance.now()+1500}}
function staticBurst(){if(scOpt===false||comfort)return;const d=document.createElement('div');d.style.cssText='position:absolute;inset:0;pointer-events:none;background-image:'+NZ+';opacity:.5';ui.appendChild(d);ns(2500,.5,.22,2,0);let n=0;const iv=setInterval(()=>{n++;d.style.opacity=.2+Math.random()*.4;cv.style.filter=n%2?'brightness(.55)':'none';if(n>6){clearInterval(iv);d.remove();cv.style.filter='none'}},330)}
function skyRoll(){skyOn=cycle>=4&&cr.move!=='dead'&&cr.move!=='locked'&&Math.random()<.35;skyFace.visible=skyOn;tSky=performance.now()+3000;
if(decoy){grp.remove(decoy);decoy=null}
if(cycle>=5&&cr.move==='walk'&&!frag&&Math.random()<.6){const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.OctahedronGeometry(.6),new THREE.MeshBasicMaterial({color:0xffd070,fog:false})),new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,160,8,1,true),new THREE.MeshBasicMaterial({color:0xffc060,transparent:true,opacity:.35,blending:THREE.AdditiveBlending,depthWrite:false,fog:false})));const a=rn_(0,6.28),r=rn_(25,45),x=Math.sin(a)*r,z=Math.cos(a)*r;g.position.set(x,cr.h(x,z)+1.6,z);grp.add(g);decoy=g}}
function presence(now,dt,m){if(m!=='locked')spkI=-1;
if(skyOn){skyFace.position.set(cam.position.x,cam.position.y+170,cam.position.z);skyFace.material.opacity=L(skyFace.material.opacity,.55+.1*Math.sin(now/900),.05);if(now>tSky&&m!=='dead'){tSky=now+rn_(10000,16000);jsay('sky',cx(),{deep:true,rate:.62,pan:0})}}else skyFace.material.opacity=0;
if(m!=='locked'&&m!=='dead'&&!swapping){if(now>tSpk&&now>=absEnd){tSpk=now+(AU.c>.02?rn_(12000,20000)*(cycle===7?.85:1)/AU.c:1e9);talk()}if(now>tSt){tSt=now+rn_(25000,50000);staticBurst()}}
if(decoy&&decoy.position.distanceTo(cam.position)<7){grp.remove(decoy);decoy=null;jsay('decoy',cx(),{deep:true});staticBurst()}}

/* cycle arc + finale scenes */
const ARC=['The Lesson','The Chase','The Chamber','The Watching Sky','The False Light','The Blackout','The Last Cycle'];
let fin=false,EVt=0,fovAdd=0;const sm=x=>x*x*(3-2*x);
const BADL=['YOU WERE NEVER THE VISITOR.','I HAVE WATCHED EVERY DEATH. I ENJOYED EACH ONE.','LOOK AT YOUR HANDS, OUTSIDER. THEY WERE NEVER YOURS.','TIME PASSES THROUGH ME. NOW IT PASSES THROUGH YOU.','I AM THE END OF YOUR ENDINGS.','YOU WERE NEVER THE VISITOR. YOU WERE THE OFFERING.'];
const GOODL=[['The forest forgets its colors. You do not mind.','You'],['The machines go quiet, one by one.','You'],['The sky cracks. You watch it, and feel nothing.','You'],['The sea drains from the world. You are not thirsty.','You'],['Somewhere, a name you loved dissolves. You cannot recall whose.','You'],['Someone is calling for you from very far away. You do not turn around.','You'],['The last warm voice you knew goes quiet.','You'],['Your hands are quiet now. They are mine.','Jamal'],['Do you remember their names? Neither do I.','Jamal'],['Time passes through you.','Jamal'],['Outsider no longer. You were late. Welcome.','Jamal']];
function scene(E){clearProps();if(grp){sc.remove(grp);grp.traverse(o=>{o.geometry&&o.geometry.dispose();o.material&&o.material.dispose&&o.material.dispose()})}cr=E;grp=E.build();sc.add(grp);sc.fog.color.set(E.fog);sc.background.set(E.fog);sc.fog.density=E.d;pl.color.set(E.lc);hm.intensity=E.amb;cam.position.set(0,1.7,0);yaw=pit=0;frag=null;skyOn=false;skyFace.visible=false;decoy=null;
Ws.forEach(w=>{const u=w.userData;u.st='gone';u.a=0;u.gt=1e15;w.material.opacity=0;u.mist.material.opacity=0;w.position.y=-999});hasStick=false;held.visible=false;obj.style.display='none';EVt=performance.now()}
const at=(ms,f)=>setTimeout(()=>{if(run)f()},ms);
const vox=(t,o)=>{sub(t,(o&&o.who)||'Jamal',4800);speak(t,o||{deep:true,rate:.7,pitch:10,speed:105})};
function roar(){const t=ac.currentTime,ws=ac.createWaveShaper(),g=ac.createGain(),c=new Float32Array(256);for(let i=0;i<256;i++)c[i]=Math.tanh((i/128-1)*8);ws.curve=c;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.7,t+.3);g.gain.setValueAtTime(.7,t+2.5);g.gain.exponentialRampToValueAtTime(.001,t+4);
[0,1,2].forEach(i=>{const o=ac.createOscillator();o.type='sawtooth';o.frequency.setValueAtTime(45+i*7,t);o.frequency.exponentialRampToValueAtTime(95+i*10,t+1.2);o.frequency.exponentialRampToValueAtTime(38,t+4);o.connect(ws);o.start(t);o.stop(t+4.1)});
const s=ac.createBufferSource(),f=ac.createBiquadFilter();s.buffer=nb;s.loop=true;f.type='lowpass';f.frequency.value=900;s.connect(f);f.connect(ws);s.start(t);s.stop(t+4.1);ws.connect(g);g.connect(EB)}
function hands(face){const h=document.createElement('div');h.className='hnd';h.style.cssText='position:absolute;bottom:-6%;left:0;right:0;height:26%;display:flex;justify-content:space-around;opacity:0;transition:opacity 3s;pointer-events:none;z-index:0';
for(let i=0;i<2;i++){const p=document.createElement('div');p.style.cssText='width:30%;height:100%;border-radius:50% 50% 14% 14%;position:relative;overflow:hidden;box-shadow:0 0 40px #000;background:'+(face?'radial-gradient(circle at 50% 30%,#f2e2b8,#8a6a30 60%,#2a1a08)':'radial-gradient(circle at 50% 30%,#2a2a2a,#0a0a0a)');
if(!face)for(let j=0;j<7;j++){const e=document.createElement('div');e.style.cssText='position:absolute;left:'+rn_(8,80)+'%;top:'+rn_(10,70)+'%;width:14%;height:9%;border-radius:50%;background:#e8e0c8;box-shadow:inset 0 0 0 3px #a00,inset 0 0 0 5px #300';p.appendChild(e)}h.appendChild(p)}ui.appendChild(h);setTimeout(()=>h.style.opacity=1,50)}
function finale(kind){if(fin)return;fin=true;swapping=true;subEl.style.bottom='auto';subEl.style.top='10%';subEl.style.zIndex=5;fd.style.transition='opacity 1.5s';fd.style.background='#000';fd.style.opacity=1;kind==='bad'?finBad():finGood()}
function finBad(){const E={n:'The Unmaking',fog:0x050000,d:.008,lp:80,lc:0xff2200,amb:.3,move:'locked',vy:0,y0:1.7,b:0,
build(){const g=new THREE.Group(),mk=sz=>new THREE.Mesh(new THREE.PlaneGeometry(sz,sz),new THREE.MeshBasicMaterial({map:tx,color:0xaa4444,transparent:true,opacity:0,depthWrite:false,fog:false}));g.add(new THREE.Mesh(new THREE.CircleGeometry(220,48).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({color:0x060303})));
const faces=[],eyes=[],figs=[];for(let i=0;i<9;i++){const m=mk(46-i*3);m.position.set(rn_(-3,3),12+i*22,-75-i*2);m.rotation.z=rn_(-.15,.15);g.add(m);faces.push(m)}
for(let i=0;i<50;i++){const m=mk(rn_(5,9)),a=rn_(0,6.28),r=rn_(90,140);m.position.set(Math.sin(a)*r,rn_(15,110),Math.cos(a)*r);m.lookAt(0,20,0);g.add(m);eyes.push(m)}
const mouth=new THREE.Mesh(new THREE.CircleGeometry(24,32),new THREE.MeshBasicMaterial({color:0x300000,fog:false}));mouth.position.set(0,10,-62);mouth.scale.y=.02;g.add(mouth);
const nF=Math.min(12,Math.max(3,deaths));for(let i=0;i<nF;i++){const f=new THREE.Mesh(new THREE.CapsuleGeometry(.35,1.1,4,8),new THREE.MeshBasicMaterial({color:0x000000})),a=(i-(nF-1)/2)*.3;f.position.set(Math.sin(a)*7,.9,Math.cos(a)*7);g.add(f);figs.push(f)}
this.u=()=>{const el=(performance.now()-EVt)/1000;pit=.35+Math.min(.4,Math.max(0,el-14)*.02)+Math.sin(el*29)*.005*cl((el-6)/10,0,1);yaw=Math.PI*(sm(cl((el-14)/2,0,1))-sm(cl((el-21)/2,0,1)));
faces.forEach((m,i)=>{m.material.opacity=cl((el-6-i*.8)/1.5,0,.75)*(.8+.2*Math.sin(el*1.7+i))});eyes.forEach((m,i)=>m.material.opacity=cl((el-26-i*.05)/1,0,.8));mouth.scale.y=cl((el-26)/6,.02,1);
figs.forEach((f,i)=>{const k=cl((el-17-i*.6)/.8,0,1);f.rotation.z=k*1.5;f.position.y=.9-k*.55});
cam.position.y=1.7+cl(el/14,0,1)*12;cam.position.z=-cl((el-26)/10,0,1)*50;fovAdd=cl((el-26)/10,0,1)*30;const r=cl((el-28)/8,0,1);sc.fog.color.setRGB(.02+.3*r,0,0);sc.background.copy(sc.fog.color)};return g}};
scene(E);at(5000,()=>{fd.style.transition='opacity 2s';fd.style.opacity=0;vox(BADL[0])});at(13000,()=>vox(BADL[1]));at(16000,staticBurst);at(19000,()=>{hands(false);vox(BADL[2])});at(24000,()=>vox(BADL[3]));
at(28000,()=>{roar();staticBurst();vox(BADL[4],{deep:true,rate:.6,pitch:6,speed:100,who:'JAMAL'})});at(33000,()=>vox(BADL[5],{deep:true,rate:.6,pitch:6,speed:100,who:'JAMAL'}));
at(37000,()=>{fd.style.transition='opacity 3s';fd.style.background='#300';fd.style.opacity=1});at(42000,()=>ending('bad'))}
function finGood(){const cols=PL.map(i=>RL[i].fog),E={n:'The Ascension',fog:0x0a0a12,d:.006,lp:600,lc:0xffe8c0,amb:.6,move:'locked',vy:0,y0:1.7,b:0,
build(){const g=new THREE.Group(),cap=c=>new THREE.Mesh(new THREE.CapsuleGeometry(.35,1.1,4,8),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:0}));g.add(new THREE.Mesh(new THREE.CircleGeometry(400,48).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({color:0x101018})));
const orbs=cols.map((c,i)=>{const o=new THREE.Mesh(new THREE.SphereGeometry(2.2,16,12),new THREE.MeshBasicMaterial({color:new THREE.Color(c).offsetHSL(0,.3,.35),fog:false})),a=i/cols.length*6.283;o.position.set(Math.sin(a)*16,5+Math.sin(i)*2,-Math.cos(a)*16);g.add(o);return o});
const lov=[];for(let i=0;i<6;i++){const f=cap(0xffe8c0),a=i/6*6.283+.5;f.position.set(Math.sin(a)*34,.9,-Math.cos(a)*34);g.add(f);lov.push(f)}const me=cap(0xffffff);me.position.set(0,.9,0);g.add(me);
this.u=()=>{const el=(performance.now()-EVt)/1000;pit=el<44?0:-Math.min(1.25,(el-44)*.12);yaw=el*.04;
orbs.forEach((o,i)=>{const k=cl((el-4-i*1.6)/2,0,1);o.scale.setScalar(1-k*.95)});lov.forEach((f,i)=>f.material.opacity=el<24?0:el<44?cl((el-24-i)/2,0,.9)*(1-cl((el-34-i*1.5)/3,0,1)):0);
cam.position.y=1.7+sm(cl((el-46)/16,0,1))*300;me.material.opacity=cl((el-50)/4,0,1);const w=cl((el-48)/12,0,1);sc.fog.color.setRGB(.04+.9*w,.04+.8*w,.07+.7*w);sc.background.copy(sc.fog.color)};return g}};
scene(E);[196,247,294].forEach((f,i)=>tone(f,f,.03,20,0,i*.5));at(2000,()=>{fd.style.transition='opacity 3s';fd.style.opacity=0});
[5,9,13,17,24,29,34,41,45,50,56].forEach((s,j)=>at(s*1000,()=>{if(j===7)hands(true);const L=GOODL[j];vox(L[0],{who:L[1],deep:j>6,pitch:Math.max(8,50-j*4),speed:150-j*4,rate:j>6?.8:1})}));
at(30000,()=>[196,247,294].forEach((f,i)=>tone(f,f,.03,20,0,i*.5)));at(66000,()=>{fd.style.background='#fff';fd.style.transition='opacity 3s';fd.style.opacity=1});at(71000,()=>ending('good'))}

/* audio settings */
let AU={m:1,mu:1,v:1,e:1,c:.7};try{Object.assign(AU,JSON.parse(localStorage.getItem('ji_audio2')||'{}'))}catch(e){}
function applyAU(){OUT.gain.value=AU.m;EB.gain.value=AU.e;VB.gain.value=AU.v;if(window.JI)JI.mv=AU.mu*AU.m;try{localStorage.setItem('ji_audio2',JSON.stringify(AU))}catch(e){}}
applyAU();
let lastOpt=0;const jsayQ=k=>{if(performance.now()<vlock||performance.now()-lastOpt<9000||cr.move==='dead'||cr.move==='locked'||swapping||AU.c<.02)return;lastOpt=performance.now();jsay(k,cx(),{deep:true,pitch:rn_(10,30)|0,pan:rn_(-.6,.6),rate:.8})};
const ap=document.createElement('div');ap.style.cssText='position:absolute;top:54px;right:14px;background:rgba(0,0,0,.85);border:1px solid #ebe6da;padding:12px 16px;display:none;pointer-events:auto;font-size:.85rem;min-width:240px';
[['m','Master'],['mu','Music'],['v','Voices'],['e','Effects'],['c','Jamal chatter']].forEach(([k,n])=>{const l=document.createElement('label');l.style.cssText='display:flex;justify-content:space-between;gap:10px;margin:6px 0';const r=document.createElement('input');r.type='range';r.min=0;r.max=k==='c'?2:1;r.step=.05;r.value=AU[k];r.oninput=()=>{AU[k]=+r.value;applyAU()};l.append(n,r);ap.appendChild(l)});
const hint=document.createElement('div');hint.textContent='Press O to open or close.';hint.style.cssText='opacity:.6;margin-top:6px';ap.appendChild(hint);ui.appendChild(ap);
const ab=document.createElement('button');ab.textContent='Audio';ab.style.cssText='position:absolute;top:14px;right:98px;pointer-events:auto;background:none;border:1px solid #ebe6da;color:inherit;font:inherit;padding:.4em 1em;cursor:pointer';
function togglePanel(){ap.style.display=ap.style.display==='none'?'block':'none';if(ap.style.display==='block')document.exitPointerLock&&document.exitPointerLock()}ab.onclick=togglePanel;ui.appendChild(ab);
const nbt=document.createElement('button');nbt.textContent='New game';nbt.style.cssText='position:absolute;top:14px;right:176px;pointer-events:auto;background:none;border:1px solid #ebe6da;color:inherit;font:inherit;padding:.4em 1em;cursor:pointer';
nbt.onclick=()=>{if(fin||ended)return;document.exitPointerLock&&document.exitPointerLock();if(confirm('Start a new game from cycle 1? Your progress will be lost.')){try{['ji_frags','ji_cycle','ji_sched'].forEach(k=>localStorage.removeItem(k))}catch(e){}resetRun(1,0)}};ui.appendChild(nbt);
initVoice(ac,VB);startCycle();

function loop(now){if(!run)return;raf=requestAnimationFrame(loop);const dt=Math.min((now-last)/1000,.1);last=now;T+=dt;const m=cr.move;
if(!swapping){if(m==='sink')cam.position.y=Math.max(cam.position.y,-122);if(now>end)next()}
cam.rotation.set(pit,yaw,0);const fv=new THREE.Vector3();cam.getWorldDirection(fv);
const fx=((k.KeyD||k.ArrowRight?1:0)-(k.KeyA||k.ArrowLeft?1:0)+mv.x)*(cr.rev?-1:1),fz=(k.KeyW||k.ArrowUp?1:0)-(k.KeyS||k.ArrowDown?1:0)+mv.y,spd=(m==='fall'?7:m==='sink'?1.6:m==='float'?3.4:4.2)*SP*dt*((k.ShiftLeft||k.ShiftRight||spT)&&m!=='sink'&&m!=='dead'?(comfort?1.4:1.7):1);
if(m==='float'){cam.position.addScaledVector(fv,fz*spd);cam.position.x+=Math.cos(yaw)*fx*spd;cam.position.z-=Math.sin(yaw)*fx*spd}
else if(m!=='dead'&&m!=='locked'){cam.position.x+=(-Math.sin(yaw)*fz+Math.cos(yaw)*fx)*spd;cam.position.z+=(-Math.cos(yaw)*fz-Math.sin(yaw)*fx)*spd}
if(m==='fall')cam.position.y+=cr.vy*dt*((k.ShiftLeft||k.ShiftRight||spT)?1.6:k.Space?.5:1);if(m==='sink'){const tg=cr.vy*((k.ShiftLeft||k.ShiftRight||spT)?1.6:1);sv+=(tg-sv)*Math.min(1,dt*2.2);if(k.Space&&now>kickAt){sv=8*SP+2;kickAt=now+700;tone(250,420,.05,.2,0)}cam.position.y=Math.min(cam.position.y+sv*dt,-1)}
if(m==='walk'){base=L(base,cr.h(cam.position.x,cam.position.z)+1.7,.2);if(k.Space&&jy<=0)jv=comfort?7:11;jv-=(jv<0?44:30)*dt;jy=Math.max(0,jy+jv*dt);if(jy===0&&jv<0)jv=0;cam.position.y=base+jy}
if(m==='float'&&k.Space)cam.position.y+=spd;
const hd=Math.hypot(cam.position.x,cam.position.z);if(cr.b&&hd>cr.b){cam.position.x*=cr.b/hd;cam.position.z*=cr.b/hd}
pl.position.copy(cam.position);cr.u&&cr.u(dt,T);physUpdate(now,dt);
if(m!=='dead'&&!swapping&&now>tAbs&&now>=absEnd){absEnd=now+13000;tAbs=now+rn_(70000,120000);const t=ac.currentTime;mg.gain.cancelScheduledValues(t);mg.gain.setTargetAtTime(.1,t,.4);mg.gain.setTargetAtTime(.7,t+12,.8);setTimeout(()=>jsay('absence',cx()),2500);Ws.forEach(w=>w.userData.tpAt=absEnd+500);fogUntil=absEnd}
if(scOpt!==false&&!comfort&&m!=='dead'&&!swapping&&now>tSc){tSc=now+rn_(45000,90000);scare()}
let dmin=999,pan=0,killed=false,near=false;const abs=now<absEnd;
for(const w of Ws){const u=w.userData,to=w.position.clone().sub(cam.position),d=to.length()||1,tn=to.divideScalar(d),seen=fv.dot(tn)>.55,pn=cl(tn.x*Math.cos(yaw)-tn.z*Math.sin(yaw),-1,1);
if((abs||m==='locked')&&m!=='dead'){u.tgt=0;u.a+=(0-u.a)*Math.min(1,dt*3);w.material.opacity=u.a;continue}
if(m==='dead')u.tgt=.85;
else if(u.st==='idle'){u.tgt=.12+.28*(.5+.5*Math.sin(now/700+u.ph));if(u.type==='whisper')u.tgt=seen?0:.4;if(u.type==='mirror'){w.position.x=2*u.an.x-cam.position.x;w.position.z=2*u.an.z-cam.position.z}else if(!seen&&d>1)w.position.addScaledVector(tn,-(isArt()?3.5:2)*(u.type==='giant'?.6:1)*(cycle<2?0:1)*DF.spd*SP*dt);
if(now>u.tpAt)u.st='out';
}
else if(u.st==='out'){u.tgt=0;if(u.a<.03){tp(w);u.st='pre';u.hd=u.short?DF.hs:2200;u.pt=now+u.hd;const dd=u.dest.clone().sub(cam.position);ns(1200,3,.08,1.8,cl((dd.x*Math.cos(yaw)-dd.z*Math.sin(yaw))/(dd.length()||1),-1,1))}}
else if(u.st==='pre'){u.tgt=0;u.dest.y+=cr.vy*dt;u.mist.position.copy(u.dest);u.mist.material.opacity=.5*Math.min(1,(now-u.pt+u.hd)/(u.hd*.7));if(now>u.pt){w.position.copy(u.dest);u.an={x:(u.dest.x+cam.position.x)/2,z:(u.dest.z+cam.position.z)/2};u.st='idle';u.tpAt=now+rn_(8000,20000)*DF.tp;u.mist.material.opacity=0}}
else if(u.st==='gone'){u.tgt=0;u.a=0;if(now>u.gt)u.st='out'}
else if(u.st==='warn'){u.tgt=.7;u.oy+=(2.6-u.oy)*Math.min(1,dt*2);if(now>u.wt){if(seen){u.st='idle';u.dashAt=now+15000;dashing=false}else{u.st='dash';u.t0=now;ns(900,4,.12,1,pn)}}}
else{u.tgt=.75;u.oy+=(2.6-u.oy)*Math.min(1,dt*2);if(seen||now-u.t0>3500){u.st='idle';u.dashAt=now+rn_(20000,45000)/(1+.15*cycle);dashing=false}else w.position.addScaledVector(tn,-(comfort?9:16)*dt)}
u.a+=(u.tgt-u.a)*Math.min(1,dt*(u.st==='out'?5:1.5));w.material.opacity=u.a;
if(m!=='dead'){w.position.y+=cr.vy*dt;if(m==='walk')w.position.y=cr.h(w.position.x,w.position.z)+u.oy+Math.sin(now/900)*.08}
w.lookAt(cam.position);if(d<dmin&&u.st!=='gone'){dmin=d;pan=pn}
if(m!=='dead'&&!swapping&&u.a>.05&&d<(u.type==='giant'?4.5:2.2)*DF.kr){near=true;touchT+=dt;if(touchT>DF.kt){killerTxt='Jamal #'+(Ws.indexOf(w)+1)+' got you '+(tn.y>.5?'from above':tn.y<-.5?'from below':fv.dot(tn)>.3?'from the front':fv.dot(tn)<-.3?'from behind':'from the side');killed=true;break}}}
if(!near)touchT=Math.max(0,touchT-dt*2);
if(killed)kill();
fragUpdate(now,dt);presence(now,dt,m);fxUpdate(now,dt,m,dmin);camUpdate(now,dt);dieUpdate(now,dt);const prox=m==='dead'?.5:cl(1-(dmin-5)/40,0,1);
if(m!=='dead'&&now>nextBeat){beat(.12+.5*prox,pan);nextBeat=now+L(1500,480,prox)}
if(now>nextWh){ns(1500+Math.random()*1500,3,.06,1.6,Math.random()*2-1);nextWh=now+7000+Math.random()*8000}
if(now>nextPing){ping(Math.random()*2-1);nextPing=now+12000+Math.random()*13000}
vg.style.opacity=.45+.45*prox+(F?.06*Math.sin(now/1800):0)+touchT*.2;rd.render(sc,cam)}
function stop(){run=false;cancelAnimationFrame(raf);removeEventListener('keydown',kd);removeEventListener('keyup',ku);removeEventListener('mousemove',mm);removeEventListener('resize',rz);document.exitPointerLock?.();ac.close();rd.dispose();cv.remove();ui.remove();document.body.classList.remove('inworld');onExit&&onExit()}
ui.querySelector('#lv').onclick=stop;if(touch){const rb=ui.querySelector('#rb'),jb=ui.querySelector('#jb');rb.onpointerdown=()=>{spT=!spT;rb.style.background=spT?'#ebe6da':'none';rb.style.color=spT?'#000':'inherit'};jb.onpointerdown=()=>{k.Space=true;setTimeout(()=>k.Space=false,120)};ui.querySelector('#hb').onpointerdown=()=>swing()}raf=requestAnimationFrame(loop)}
