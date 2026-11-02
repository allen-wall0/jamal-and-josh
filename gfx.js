/* next-gen render pipeline: PBR, IBL sky, shadows, GTAO, bloom, grade, SMAA, dynamic resolution */
import * as THREE from './three.module.min.js';
import{EffectComposer}from'./jsm/postprocessing/EffectComposer.js';
import{RenderPass}from'./jsm/postprocessing/RenderPass.js';
import{GTAOPass}from'./jsm/postprocessing/GTAOPass.js';
import{UnrealBloomPass}from'./jsm/postprocessing/UnrealBloomPass.js';
import{ShaderPass}from'./jsm/postprocessing/ShaderPass.js';
import{OutputPass}from'./jsm/postprocessing/OutputPass.js';
import{SMAAPass}from'./jsm/postprocessing/SMAAPass.js';
import{Sky}from'./jsm/objects/Sky.js';
import{RoomEnvironment}from'./jsm/environments/RoomEnvironment.js';
import{makePBR}from'./pbrtex.js';
import{dressLevel}from'./dress.js';
export const QUALITY={ultra:{pr:2,sh:2048,ao:1,bloom:1,aa:1,tex:512},high:{pr:1.5,sh:2048,ao:0,bloom:1,aa:1,tex:512},medium:{pr:1,sh:1024,ao:0,bloom:1,aa:1,tex:256},low:{pr:.75,sh:0,ao:0,bloom:.6,aa:0,tex:256}};
export const gfxName=()=>{let q='auto';try{q=new URLSearchParams(location.search).get('gfx')||localStorage.getItem('ji_gfx')||'auto'}catch(e){}return q};
const GRADE={uniforms:{tDiffuse:{value:null},time:{value:0},vig:{value:.5},ca:{value:.6},grain:{value:.6},blur:{value:0},sat:{value:1.06},hurt:{value:0},res:{value:new THREE.Vector2(1280,720)}},
vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
fragmentShader:`uniform sampler2D tDiffuse;uniform float time,vig,ca,grain,blur,sat,hurt;uniform vec2 res;varying vec2 vUv;
float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
void main(){vec2 c=vUv-.5;float r2=dot(c,c);vec3 col;
 if(blur>.002){col=vec3(0.);for(int i=0;i<8;i++){float s=1.-blur*float(i)/8.*.1;col+=texture2D(tDiffuse,c*s+.5).rgb;}col/=8.;}
 else{vec2 o=c*ca*.0035*(r2*4.+.1);col=vec3(texture2D(tDiffuse,vUv+o).r,texture2D(tDiffuse,vUv).g,texture2D(tDiffuse,vUv-o).b);}
 float l=dot(col,vec3(.2126,.7152,.0722));col=mix(col*vec3(.9,1.,1.08),col*vec3(1.08,1.,.9),smoothstep(.15,1.2,l));
 col=mix(vec3(l),col,sat);col*=1.-vig*smoothstep(.18,.62,length(c)*1.25);
 col+=vec3((h(vUv*res+time)-.5)*grain*.045);col=mix(col,col*vec3(1.4,.55,.55),hurt*smoothstep(.1,.6,length(c)));
 gl_FragColor=vec4(col,1.);}`};
const MOODS={
 1:{el:5,az:200,turb:9,ray:1.8,mie:.01,mg:.8,sun:0xffc890,si:1.3,env:.28,exp:.8,fog:0x3a3632,fd:1.25,bloom:.45,hor:0x5a4c44,zen:0x181c24},
 2:{room:1,sun:0xaac0ff,si:.45,env:.16,exp:.9,fog:0x161b20,fd:1.5,bloom:.5},
 3:{el:18,az:150,turb:18,ray:.7,mie:.03,mg:.7,sun:0xdfe6f2,si:1.1,env:.3,exp:.85,fog:0x474e58,fd:1.1,bloom:.4,hor:0x6a7078,zen:0x2c343e},
 4:{el:2,az:250,turb:12,ray:2.6,mie:.02,mg:.85,sun:0xff9050,si:1.5,env:.26,exp:.8,fog:0x483630,fd:1.2,bloom:.5,hor:0x7a4c36,zen:0x221c28},
 5:{el:-4,az:210,turb:6,ray:.3,mie:.005,mg:.7,sun:0x7090ff,si:.35,env:.2,exp:.95,fog:0x0b0f16,fd:1.4,bloom:.7,hor:0x121828,zen:0x03050a},
 arena:{el:1,az:230,turb:14,ray:3,mie:.03,mg:.88,sun:0xff6030,si:1.6,env:.26,exp:.78,fog:0x3a2018,fd:.9,bloom:.7,hor:0x6a3022,zen:0x180c0e}};
export function createGfx({rd,sc,cam,W,H}){
 let name=gfxName();const retro=name==='retro',auto=name==='auto';if(auto)name='high';
 const G={retro,name,auto};if(retro)return G;
 const Q=QUALITY[name]||QUALITY.high;G.Q=Q;
 rd.outputColorSpace=THREE.SRGBColorSpace;rd.toneMapping=THREE.ACESFilmicToneMapping;rd.toneMappingExposure=.9;rd.shadowMap.enabled=Q.sh>0;rd.shadowMap.type=THREE.PCFSoftShadowMap;
 G.pr=Math.min(window.devicePixelRatio||1,Q.pr);G.prMax=G.pr;rd.setPixelRatio(G.pr);
 G.TX=makePBR(Q.tex);const an=Math.min(8,rd.capabilities.getMaxAnisotropy());
 G.mt=(s,rx,ry)=>{const c=t=>{const x=t.clone();x.repeat.set(rx,ry);x.anisotropy=an;x.needsUpdate=true;return x},rm=c(s.roughnessMap);return new THREE.MeshStandardMaterial({map:c(s.map),normalMap:c(s.normalMap),normalScale:new THREE.Vector2(1.15,1.15),roughnessMap:rm,metalnessMap:rm,roughness:1,metalness:1})};
 G.mm=col=>new THREE.MeshStandardMaterial({color:col,roughness:.78,metalness:.06});
 G.sun=new THREE.DirectionalLight(0xfff0d8,2);G.sun.castShadow=Q.sh>0;if(Q.sh){G.sun.shadow.mapSize.set(Q.sh,Q.sh);const c=G.sun.shadow.camera;c.left=-28;c.right=28;c.top=28;c.bottom=-28;c.near=1;c.far=130;G.sun.shadow.bias=-.0004;G.sun.shadow.normalBias=.035;G.sun.shadow.radius=3}
 sc.add(G.sun,G.sun.target);G.sunDir=new THREE.Vector3(.4,.8,.3).normalize();
 G.sky=new THREE.Mesh(new THREE.SphereGeometry(1,24,16),new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,fog:false,uniforms:{hor:{value:new THREE.Color()},zen:{value:new THREE.Color()},sunC:{value:new THREE.Color()},sunD:{value:new THREE.Vector3(0,1,0)}},vertexShader:'varying vec3 d;void main(){d=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);gl_Position.z=gl_Position.w;}',fragmentShader:'uniform vec3 hor,zen,sunC,sunD;varying vec3 d;void main(){float h=clamp(d.y,0.,1.);vec3 c=mix(hor,zen,pow(h,.55));float s=max(dot(normalize(d),normalize(sunD)),0.);c+=sunC*(pow(s,64.)*.4+pow(s,6.)*.1);gl_FragColor=vec4(c,1.);}'}));G.sky.scale.setScalar(90);G.sky.frustumCulled=false;G.sky.visible=false;sc.add(G.sky);G.bright=1;try{G.bright=+localStorage.getItem('ji_bright')||1}catch(e){}
 const pm=new THREE.PMREMGenerator(rd);G.envT=null;
 const comp=new EffectComposer(rd);comp.setPixelRatio(G.pr);comp.setSize(W(),H());G.comp=comp;
 comp.addPass(new RenderPass(sc,cam));
 if(Q.ao){G.ao=new GTAOPass(sc,cam,W(),H());G.ao.output=GTAOPass.OUTPUT.Default;G.ao.blendIntensity=.85;comp.addPass(G.ao)}
 G.bloom=new UnrealBloomPass(new THREE.Vector2(W(),H()),.55*Q.bloom,.65,.82);comp.addPass(G.bloom);
 G.grade=new ShaderPass(GRADE);comp.addPass(G.grade);comp.addPass(new OutputPass());
 if(Q.aa){G.smaa=new SMAAPass(W()*G.pr,H()*G.pr);comp.addPass(G.smaa)}
 G.anim=[];G.ft=16;G.ftN=0;G.shT=0;
 G.render=dt=>{G.grade.uniforms.time.value+=dt;comp.render(dt);if(G.auto){G.ft+=(dt*1000-G.ft)*.05;G.ftN++;if(G.ftN%90===0){const np=G.ft>26?Math.max(.5,G.pr-.15):G.pr;if(Math.abs(np-G.pr)>.01){G.pr=np;rd.setPixelRatio(np);comp.setPixelRatio(np);comp.setSize(W(),H())}}}};
 G.resize=(w,h)=>{comp.setSize(w,h);G.grade.uniforms.res.value.set(w*G.pr,h*G.pr)};
 G.setBright=v=>{G.bright=v;if(G.cur)rd.toneMappingExposure=G.cur.exp*v};G.setFX=(o)=>{const u=G.grade.uniforms;if('blur' in o)u.blur.value=o.blur;if('hurt' in o)u.hurt.value=o.hurt};
 G.mood=k=>{const m=MOODS[k]||MOODS[1];G.cur=m;rd.toneMappingExposure=m.exp*G.bright;G.bloom.strength=.55*Q.bloom*(m.bloom||.6)/.6;
  if(G.envT){G.envT.dispose();G.envT=null}
  if(m.room){G.sky.visible=false;const re=new RoomEnvironment();G.envT=pm.fromScene(re,.04);re.dispose?.();G.sunDir.set(.15,1,.1).normalize()}
  else{const s=new Sky(),u=s.material.uniforms;u.turbidity.value=m.turb;u.rayleigh.value=m.ray;u.mieCoefficient.value=m.mie;u.mieDirectionalG.value=m.mg;const v=new THREE.Vector3().setFromSphericalCoords(1,THREE.MathUtils.degToRad(90-m.el),THREE.MathUtils.degToRad(m.az));u.sunPosition.value.copy(v);s.scale.setScalar(1000);const ts=new THREE.Scene();ts.add(s);G.envT=pm.fromScene(ts,0,1,2000);
   const mu=G.sky.material.uniforms;mu.hor.value.set(m.hor);mu.zen.value.set(m.zen);mu.sunC.value.set(m.sun).multiplyScalar(.7);mu.sunD.value.copy(v);G.sky.visible=true;G.sunDir.copy(v);if(G.sunDir.y<.12)G.sunDir.y=.12;G.sunDir.normalize()}
  sc.environment=G.envT.texture;sc.environmentIntensity=m.env;G.sun.color.set(m.sun);G.sun.intensity=m.si;
  const fc=new THREE.Color(m.fog);sc.background=fc;sc.fog=new THREE.FogExp2(m.fog,m.fd/58)};
 G.onLevel=(n,L,hw,LG)=>{G.mood(n);G.anim.length=0;G.dress=dressLevel(G,THREE,n,L,hw,LG,sc);if(G.dress&&G.dress.anim)G.anim.push(G.dress.anim)};
 G.update=(dt,pos,t)=>{if(!G.cur)return;{const sd=G.sunDir,ri=new THREE.Vector3().crossVectors(sd,new THREE.Vector3(0,1,0)).normalize(),u2=new THREE.Vector3().crossVectors(ri,sd).normalize(),tw=G.Q.sh?56/G.Q.sh:.05,cx=Math.round(pos.dot(ri)/tw)*tw,cy=Math.round(pos.dot(u2)/tw)*tw,sp=ri.multiplyScalar(cx).addScaledVector(u2,cy).addScaledVector(sd,pos.dot(sd));G.sun.position.copy(sp).addScaledVector(sd,50);G.sun.target.position.copy(sp)}G.sky.position.copy(cam.position);for(const f of G.anim)f(dt,pos,t);
  G.shT-=dt;if(G.shT<=0){G.shT=.6;sc.traverse(o=>{if(o.isMesh&&!o.userData.sh){o.userData.sh=1;const m=o.material;if(!m||m.isMeshBasicMaterial||m.isShaderMaterial||o.userData.nosh||m.transparent&&m.opacity<.9)return;const gp=o.geometry&&o.geometry.parameters;if(gp&&gp.width>10&&o.position.y>5.5)return;o.castShadow=true;o.receiveShadow=true}})}};
 return G}
