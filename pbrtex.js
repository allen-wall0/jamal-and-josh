/* procedural PBR texture sets: albedo + normal + roughness, tileable */
import * as THREE from './three.module.min.js';
const hash=(x,y,s)=>{let h=Math.imul(x,374761393)^Math.imul(y,668265263)^Math.imul(s,1274126177);h=Math.imul(h^(h>>>13),1274126177);return((h^(h>>>16))>>>0)/4294967295};
const vn=(x,y,s,P)=>{const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi,u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf),X0=((xi%P)+P)%P,X1=(X0+1)%P,Y0=((yi%P)+P)%P,Y1=(Y0+1)%P,a=hash(X0,Y0,s),b=hash(X1,Y0,s),c=hash(X0,Y1,s),d=hash(X1,Y1,s);return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v};
const fbm=(x,y,s,P,o)=>{let a=.5,f=1,t=0,n=0;for(let i=0;i<o;i++){t+=a*vn(x*f,y*f,s+i*7,P*f);n+=a;a*=.5;f*=2}return t/n};
const clamp=(v,a,b)=>v<a?a:v>b?b:v,sm=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t)};
const KINDS={
 asp(u,v,N){const x=u*4,y=v*4,n=fbm(x,y,1,4,5),f=fbm(u*64,v*64,2,64,2),sp=hash(Math.floor(u*N),Math.floor(v*N),3),st=sp>.955?1:0,cr=1-Math.abs(2*fbm(u*6,v*6,5,6,4)-1),crack=sm(.93,.985,cr),pud=sm(.6,.72,fbm(u*3,v*3,9,3,3)),g=.2+n*.16+f*.06+st*.14-crack*.14;
  return{h:n*.5+f*.22+st*.25-crack*.6,c:[g*(1-pud*.35)*1.02,g*(1-pud*.35),g*(1-pud*.3)*1.04],r:clamp(.9-pud*.82-st*.1,.06,1),m:0}},
 brick(u,v,N){const rows=8,bw=1/4,ry=v*rows,r=Math.floor(ry),fy=ry-r,xo=u*4+(r&1)*.5,bi=Math.floor(xo),fx=xo-bi,mort=.07,edge=Math.min(fx,1-fx,fy,1-fy),isM=edge<mort,id=hash(bi,r,11),n=fbm(u*24,v*24,4,24,4),chip=sm(.0,.12,edge)*.4+.6;
  const tint=.78+id*.45,col=isM?[.2,.19,.18]:[(.46+n*.14)*tint,(.2+n*.08)*tint,(.15+n*.06)*tint];
  return{h:isM?-.5:.2+n*.4+chip*.3,c:col.map(z=>z*(.9+hash(Math.floor(u*N),Math.floor(v*N),5)*.18)),r:isM?.97:.8+n*.15,m:0}},
 conc(u,v,N){const n=fbm(u*5,v*5,6,5,5),f=fbm(u*40,v*40,7,40,3),pit=hash(Math.floor(u*N/2),Math.floor(v*N/2),8)>.985?1:0,seam=sm(.006,0,Math.abs(((u*2)%1)-.0))*0+sm(.012,0,Math.min((u*2)%1,1-(u*2)%1))*.5+sm(.012,0,Math.min((v*2)%1,1-(v*2)%1))*.5,streak=sm(.4,.8,fbm(u*14,v*1.5,12,14,3));
  const g=.34+n*.2+f*.05-pit*.15-seam*.12-streak*.06;return{h:n*.4+f*.2-pit*.5-seam*.6,c:[g*1.02,g,g*.94],r:.88-streak*.1,m:0}},
 wood(u,v,N){const pl=Math.floor(v*4),fy=v*4-pl,pid=hash(pl,0,21),gx=u*3+pid*9,w=fbm(gx*2,v*30,22,32,4),ring=.5+.5*Math.sin((w*9+u*14+pid*6)*2),gap=fy<.025||fy>.975,nail=(Math.abs(u%.5-.06)<.012&&Math.abs(fy-.5)<.06)?1:0,t=.55+pid*.3,g=gap?.12:(.5+ring*.16+w*.1)*t;
  return{h:gap?-.6:ring*.15+w*.1,c:gap?[.08,.06,.04]:nail?[.3,.3,.32]:[g*1.0,g*.66,g*.38],r:gap?1:.72+ring*.1,m:nail?.8:0}},
 rust(u,v,N){const n=fbm(u*6,v*6,31,6,5),f=fbm(u*50,v*50,32,50,2),pl=Math.floor(v*4),fy=v*4-pl,seam=fy<.03||fy>.97,rivet=(()=>{const cx=(u*8)%1-.5,cy=fy-.5;return Math.hypot(cx,cy*2)<.07&&((Math.floor(u*8)+pl)&1)===0})(),rs=sm(.42,.68,fbm(u*4,v*4,33,4,5)+f*.1);
  const steel=[.34+n*.06,.35+n*.06,.37+n*.06],rc=[.42+f*.1,.2+f*.06,.09],col=steel.map((s,i)=>s*(1-rs)+rc[i]*rs);
  return{h:n*.2+f*.1-seam*.5+(rivet?.5:0),c:seam?[.09,.09,.09]:col,r:.5+rs*.45+f*.1,m:.65*(1-rs)}}
};
export function makePBR(N){const out={};
 for(const k in KINDS){const fn=KINDS[k],h=new Float32Array(N*N),alb=new Uint8Array(N*N*4),rg=new Uint8Array(N*N*4),nm=new Uint8Array(N*N*4);let mt=0;
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){const r=fn(i/N,j/N,N),p=j*N+i;h[p]=r.h;const q=p*4;alb[q]=clamp(r.c[0],0,1)*255;alb[q+1]=clamp(r.c[1],0,1)*255;alb[q+2]=clamp(r.c[2],0,1)*255;alb[q+3]=255;rg[q]=255;rg[q+1]=clamp(r.r,0,1)*255;rg[q+2]=clamp(r.m,0,1)*255;rg[q+3]=255;mt=Math.max(mt,r.m)}
  const S=k==='brick'?5:k==='asp'?3:4;
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){const l=h[j*N+((i+N-1)%N)],r=h[j*N+((i+1)%N)],d=h[((j+N-1)%N)*N+i],u2=h[((j+1)%N)*N+i];let nx=(l-r)*S,ny=(d-u2)*S,nz=1;const m=1/Math.hypot(nx,ny,nz);nx*=m;ny*=m;nz*=m;const q=(j*N+i)*4;nm[q]=(nx*.5+.5)*255;nm[q+1]=(ny*.5+.5)*255;nm[q+2]=(nz*.5+.5)*255;nm[q+3]=255}
  const mk=(d,srgb)=>{const t=new THREE.DataTexture(d,N,N,THREE.RGBAFormat);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.generateMipmaps=true;t.minFilter=THREE.LinearMipmapLinearFilter;t.magFilter=THREE.LinearFilter;t.colorSpace=srgb?THREE.SRGBColorSpace:THREE.NoColorSpace;t.needsUpdate=true;return t};
  out[k]={map:mk(alb,true),normalMap:mk(nm,false),roughnessMap:mk(rg,false),metal:mt>0?1:0}}
 return out}
