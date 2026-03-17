(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();function Pe(e){const t=[],n=/([MLHVCSQTAZmlhvcsqtaz])\s*([^MLHVCSQTAZmlhvcsqtaz]*)/g;let r,o=0,s=0,i=0,l=0,c="",a=null,b=null;const T=()=>{a=null,b=null},E=I=>{const p=/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g;return(I.match(p)||[]).map(Number)};for(;(r=n.exec(e))!==null;){const I=r[1],p=I===I.toLowerCase(),C=I.toUpperCase(),f=E(r[2]);if(C==="M"){for(let d=0;d+1<f.length;d+=2){const y=p?o+f[d]:f[d],w=p?s+f[d+1]:f[d+1];d===0?(t.push({type:"M",x:y,y:w}),i=y,l=w):t.push({type:"L",x:y,y:w}),o=y,s=w}T(),c=f.length>2?"L":"M"}else if(C==="L"){for(let d=0;d+1<f.length;d+=2){const y=p?o+f[d]:f[d],w=p?s+f[d+1]:f[d+1];t.push({type:"L",x:y,y:w}),o=y,s=w}T(),c="L"}else if(C==="H"){for(let d=0;d<f.length;d++){const y=p?o+f[d]:f[d];t.push({type:"L",x:y,y:s}),o=y}T(),c="L"}else if(C==="V"){for(let d=0;d<f.length;d++){const y=p?s+f[d]:f[d];t.push({type:"L",x:o,y}),s=y}T(),c="L"}else if(C==="C")for(let d=0;d+5<f.length;d+=6){const y=p?o+f[d]:f[d],w=p?s+f[d+1]:f[d+1],g=p?o+f[d+2]:f[d+2],m=p?s+f[d+3]:f[d+3],x=p?o+f[d+4]:f[d+4],$=p?s+f[d+5]:f[d+5];t.push({type:"C",x1:y,y1:w,x2:g,y2:m,x,y:$}),o=x,s=$,a=g,b=m,c="C"}else if(C==="S")for(let d=0;d+3<f.length;d+=4){let y=o,w=s;(c==="C"||c==="S")&&a!==null&&b!==null&&(y=o*2-a,w=s*2-b);const g=p?o+f[d]:f[d],m=p?s+f[d+1]:f[d+1],x=p?o+f[d+2]:f[d+2],$=p?s+f[d+3]:f[d+3];t.push({type:"C",x1:y,y1:w,x2:g,y2:m,x,y:$}),o=x,s=$,a=g,b=m,c="S"}else C==="Z"?(t.push({type:"Z"}),o=i,s=l,T(),c="Z"):(T(),c=C)}return t}function Z(e){let t="",n=e;for(;n>=0;)t=String.fromCharCode(65+n%26)+t,n=Math.floor(n/26)-1;return t}function H(e,t,n){const r=(e*t).toFixed(n);return parseFloat(r).toString()}function Ke(e){const{vectorFormat:t,language:n,processingVector:r="PVector",instanceMode:o=!1}=e,s=n==="typescript",i=t==="Processing",l=i&&r==="Vec2D",c=o&&t==="createVector";if(i){const E=l?"Vec2D":"PVector";return`${l?`import toxi.geom.*;

`:""}// Transform configuration
class TransformConfig {
	float preTranslateX = 0;
	float preTranslateY = 0;
	float scaleX = 1;
	float scaleY = 1;
	float rotation = 0;
	float translateX = 0;
	float translateY = 0;
}

TransformConfig transformConfig = new TransformConfig();

${E} applyTransform(${E} v) {
	float x = v.x + transformConfig.preTranslateX;
	float y = v.y + transformConfig.preTranslateY;

	x *= transformConfig.scaleX;
	y *= transformConfig.scaleY;

	if (transformConfig.rotation != 0) {
		float c = cos(transformConfig.rotation);
		float s = sin(transformConfig.rotation);
		float rx = x * c - y * s;
		float ry = x * s + y * c;
		x = rx;
		y = ry;
	}

	x += transformConfig.translateX;
	y += transformConfig.translateY;

	return new ${E}(x, y);
}

float applyTransformScalar(float value) {
	return applyTransformScalar(value, 'a');
}

float applyTransformScalar(float value, char axis) {
	if (axis == 'x') {
		return value * transformConfig.scaleX;
	}
	if (axis == 'y') {
		return value * transformConfig.scaleY;
	}
	return value * ((abs(transformConfig.scaleX) + abs(transformConfig.scaleY)) * 0.5);
}`}if(t==="Vec")return`// Transform configuration
const transformConfig${s?`: {
	preTranslateX: number;
	preTranslateY: number;
	scaleX: number;
	scaleY: number;
	rotation: number;
	translateX: number;
	translateY: number;
}`:""} = {
	preTranslateX: 0,
	preTranslateY: 0,
	scaleX: 1,
	scaleY: 1,
	rotation: 0,
	translateX: 0,
	translateY: 0
};

class Matrix2D {
	${s?`a: number; b: number; c: number; d: number; tx: number; ty: number;

	`:""}constructor(a${s?": number":""}, b${s?": number":""}, c${s?": number":""}, d${s?": number":""}, tx${s?": number":""}, ty${s?": number":""}) {
		this.a = a; this.b = b;
		this.c = c; this.d = d;
		this.tx = tx; this.ty = ty;
	}

	transform(x${s?": number":""}, y${s?": number":""})${s?": [number, number]":""} {
		return [
			this.a * x + this.c * y + this.tx,
			this.b * x + this.d * y + this.ty
		];
	}

	static fromTransform(config${s?": typeof transformConfig":""})${s?": Matrix2D":""} {
		const cos = Math.cos(config.rotation);
		const sin = Math.sin(config.rotation);

		return new Matrix2D(
			config.scaleX * cos,
			config.scaleX * sin,
			config.scaleY * -sin,
			config.scaleY * cos,
			config.translateX + config.scaleX * (cos * config.preTranslateX - sin * config.preTranslateY),
			config.translateY + config.scaleY * (sin * config.preTranslateX + cos * config.preTranslateY)
		);
	}
}

const transform = Matrix2D.fromTransform(transformConfig);

function applyTransform(v${s?": Vec":""})${s?": Vec":""} {
	const [x, y] = transform.transform(v.x, v.y);
	return new Vec(x, y);
}

function applyTransformScalar(value${s?": number":""}, axis${s?": 'x' | 'y' | 'avg'":""} = 'avg')${s?": number":""} {
	if (axis === 'x') {
		return value * transformConfig.scaleX;
	}
	if (axis === 'y') {
		return value * transformConfig.scaleY;
	}
	return value * ((Math.abs(transformConfig.scaleX) + Math.abs(transformConfig.scaleY)) * 0.5);
}`;const a=c?"p.createVector":"createVector",b=s?"p5.Vector":"",T=c?s?"p: any":"p":"";return`// Transform configuration
const transformConfig${s?`: {
	preTranslateX: number;
	preTranslateY: number;
	scaleX: number;
	scaleY: number;
	rotation: number;
	translateX: number;
	translateY: number;
}`:""} = {
	preTranslateX: 0,
	preTranslateY: 0,
	scaleX: 1,
	scaleY: 1,
	rotation: 0,
	translateX: 0,
	translateY: 0
};

function applyTransform(${T?T+", ":""}v${s?`: ${b}`:""})${s?`: ${b}`:""} {
	let x = v.x + transformConfig.preTranslateX;
	let y = v.y + transformConfig.preTranslateY;

	x *= transformConfig.scaleX;
	y *= transformConfig.scaleY;

	if (transformConfig.rotation !== 0) {
		const cos = Math.cos(transformConfig.rotation);
		const sin = Math.sin(transformConfig.rotation);
		const rx = x * cos - y * sin;
		const ry = x * sin + y * cos;
		x = rx;
		y = ry;
	}

	x += transformConfig.translateX;
	y += transformConfig.translateY;

	return ${a}(x, y);
}

function applyTransformScalar(value${s?": number":""}, axis${s?": 'x' | 'y' | 'avg'":""} = 'avg')${s?": number":""} {
	if (axis === 'x') {
		return value * transformConfig.scaleX;
	}
	if (axis === 'y') {
		return value * transformConfig.scaleY;
	}
	return value * ((Math.abs(transformConfig.scaleX) + Math.abs(transformConfig.scaleY)) * 0.5);
}`}function Ue(e,t){const{vectorFormat:n,language:r,instanceMode:o=!1}=t,s=r==="typescript",i=n==="Processing",l=o&&(n==="createVector"||n==="Vec");return i?`void ${e}() {`:`function ${e}(${l?s?"p: any":"p":""})${s?": void":""} {`}function _e(e){const{vectorFormat:t,instanceMode:n=!1}=e;return n&&(t==="createVector"||t==="Vec")?"p.":""}function ne(e){const{vectorFormat:t,processingVector:n="PVector",language:r}=e;return t==="Processing"?n==="Vec2D"?"Vec2D":"PVector":t==="Vec"?"Vec":r==="typescript"?"p5.Vector":""}function Q(e,t){if(e.length===0)return[];if(t.vectorFormat==="Processing")return[`${ne(t)} ${e.join(", ")};`];const n=t.language==="typescript"?`: ${ne(t)}`:"";return e.map(r=>`let ${r}${n};`)}function J(e,t){return t.vectorFormat==="Processing"?`${ne(t)}[] ${e} = new ${ne(t)}[0];`:t.language==="typescript"?`let ${e}: ${ne(t)}[] = [];`:`let ${e} = [];`}function ee(e,t,n){return n.vectorFormat==="Processing"?`${e} = new ${ne(n)}[] { ${t.join(", ")} };`:`${e} = [${t.join(", ")}];`}function Fe(e){return e.map(t=>`	${t}`).join(`
`)}function Le(){return{minX:Number.POSITIVE_INFINITY,minY:Number.POSITIVE_INFINITY,maxX:Number.NEGATIVE_INFINITY,maxY:Number.NEGATIVE_INFINITY}}function ie(e,t,n){e.minX=Math.min(e.minX,t),e.minY=Math.min(e.minY,n),e.maxX=Math.max(e.maxX,t),e.maxY=Math.max(e.maxY,n)}function Qe(e){return Number.isFinite(e.minX)&&Number.isFinite(e.minY)&&Number.isFinite(e.maxX)&&Number.isFinite(e.maxY)}function Je(e){const t=[];let n=[],r=!1,o=Le();const s=()=>{if(n.length===0)return;const i=Qe(o)?{...o}:{minX:0,minY:0,maxX:0,maxY:0};t.push({commands:n,closed:r,bounds:i}),n=[],r=!1,o=Le()};return e.forEach(i=>{if(i.type==="M"){s(),n.push(i),ie(o,i.x,i.y);return}if(i.type==="L"){n.length===0&&n.push({type:"M",x:i.x,y:i.y}),n.push(i),ie(o,i.x,i.y);return}if(i.type==="C"){if(n.length===0)return;n.push(i),ie(o,i.x1,i.y1),ie(o,i.x2,i.y2),ie(o,i.x,i.y);return}i.type==="Z"&&(r=!0,s())}),s(),t}function Me(e,t){return e.bounds.minX>=t.minX-1e-6&&e.bounds.maxX<=t.maxX+1e-6&&e.bounds.minY>=t.minY-1e-6&&e.bounds.maxY<=t.maxY+1e-6}function et(e,t,n,r,o,s,i,l){const c=t.vectorFormat==="Processing",a=_e(t),b=g=>H(g,n,r),T=[],E=[],I=[],p=[],C="'x'",f="'y'",d=c?"'a'":"'avg'",y=(g,m,x)=>{const $=`${i}_${g}`,v=`${s}${o}(${b(m)}, ${b(x)}))`;return E.push($),T.push(`${$} = ${v};`),$},w=(g,m,x)=>{const $=`applyTransformScalar(${b(m)}, ${x})`;c?I.push(`float ${g} = ${$};`):I.push(`const ${g} = ${$};`)};if(e.kind==="line"){if(e.x1==null||e.y1==null||e.x2==null||e.y2==null)return null;const g=y("p1",e.x1,e.y1),m=y("p2",e.x2,e.y2);return p.push(`${a}line(${g}.x, ${g}.y, ${m}.x, ${m}.y);`),{globalCode:[...Q(E,t),J(l,t)].join(`
`),assignments:[...T,ee(l,E,t)],localDeclarations:I,drawCalls:p}}if(e.kind==="polyline"||e.kind==="polygon"){const g=e.points||[];return g.length<2?null:(g.forEach(([m,x],$)=>{y(Z($),m,x)}),p.push(`${a}beginShape();`),E.forEach(m=>{p.push(`${a}vertex(${m}.x, ${m}.y);`)}),p.push(`${a}endShape(${e.kind==="polygon"?"CLOSE":"OPEN"});`),{globalCode:[...Q(E,t),J(l,t)].join(`
`),assignments:[...T,ee(l,E,t)],localDeclarations:I,drawCalls:p})}if(e.kind==="rect"){if(e.x==null||e.y==null||e.width==null||e.height==null)return null;const g=y("rectPos",e.x,e.y);w("rectW",e.width,C),w("rectH",e.height,f);const m=e.rx||0,x=e.ry||0;if(m>0||x>0){if(Math.abs(m-x)>1e-9)return null;w("rectR",m,d),p.push(`${a}rect(${g}.x, ${g}.y, rectW, rectH, rectR);`)}else p.push(`${a}rect(${g}.x, ${g}.y, rectW, rectH);`);return{globalCode:[...Q(E,t),J(l,t)].join(`
`),assignments:[...T,ee(l,E,t)],localDeclarations:I,drawCalls:p}}if(e.kind==="circle"){if(e.cx==null||e.cy==null||e.r==null)return null;const g=y("circleCenter",e.cx,e.cy);return w("circleDiameter",e.r*2,d),p.push(`${a}circle(${g}.x, ${g}.y, circleDiameter);`),{globalCode:[...Q(E,t),J(l,t)].join(`
`),assignments:[...T,ee(l,E,t)],localDeclarations:I,drawCalls:p}}if(e.kind==="ellipse"){if(e.cx==null||e.cy==null||e.rx==null||e.ry==null)return null;const g=y("ellipseCenter",e.cx,e.cy);return w("ellipseW",e.rx*2,C),w("ellipseH",e.ry*2,f),p.push(`${a}ellipse(${g}.x, ${g}.y, ellipseW, ellipseH);`),{globalCode:[...Q(E,t),J(l,t)].join(`
`),assignments:[...T,ee(l,E,t)],localDeclarations:I,drawCalls:p}}return null}function tt(e,t,n,r,o){const{vectorFormat:s,coordMultiplier:i,precision:l,processingVector:c="PVector",instanceMode:a=!1}=t,b=s==="Processing",T=b&&c==="Vec2D",E=a&&(s==="createVector"||s==="Vec"),I=o||`drawPath${n+1}`,p=b?T?"new Vec2D":"new PVector":s==="Vec"?"new Vec":a&&s==="createVector"?"p.createVector":"createVector",C=E&&s==="createVector"?"applyTransform(p, ":"applyTransform(",f=Ke(t),d=Ue(I,t),y=_e(t),w=`${I}Points`;if(r?.primitive){const L=et(r.primitive,t,i,l,p,C,I,w);if(L){const M=[...L.assignments,...L.localDeclarations,...L.drawCalls],Y=`${d}
${Fe(M)}
}`;return{sharedCode:f,globalCode:L.globalCode,pathCode:Y}}}const g=Pe(e),m=Je(g);let x=0;const $=[],v=[],F=L=>{const M=[];return L.commands.forEach(Y=>{if(Y.type==="M"||Y.type==="L"){const j=`${I}_${Z(x)}`,_=H(Y.x,i,l),B=H(Y.y,i,l);$.push(j),v.push(`${j} = ${C}${p}(${_}, ${B}));`),M.push(`${y}vertex(${j}.x, ${j}.y);`),x++;return}if(Y.type==="C"){const j=`${I}_${Z(x-1)}`,_=`${I}_${Z(x)}`,B=j+"c",q="c"+_,ye=H(Y.x1,i,l),$e=H(Y.y1,i,l),ve=H(Y.x2,i,l),Ce=H(Y.y2,i,l),be=H(Y.x,i,l),we=H(Y.y,i,l);$.push(B,q,_),v.push(`${B} = ${C}${p}(${ye}, ${$e}));`),v.push(`${q} = ${C}${p}(${ve}, ${Ce}));`),v.push(`${_} = ${C}${p}(${be}, ${we}));`),M.push(`${y}bezierVertex(${B}.x, ${B}.y, ${q}.x, ${q}.y, ${_}.x, ${_}.y);`),x++}}),M};let k=[],V=!1,P=null,A=0;const se=[],re=()=>{k.length!==0&&(se.push([`${y}beginShape();`,...k,`${y}endShape(${V?"CLOSE":"OPEN"});`].join(`
`)),k=[],V=!1,P=null,A=0)};m.forEach(L=>{const M=F(L);if(M.length===0)return;if(k.length===0){k=M,V=L.closed,P=L.bounds,A=0;return}if(P!==null&&Me(L,P)){V=!0,k.push(`${y}beginContour();`),k.push(...M),k.push(`${y}endContour();`),A++;return}if(P!==null&&A===0&&Me({bounds:P},L.bounds)){const _=[...k];V=!0,P=L.bounds,k=[...M,`${y}beginContour();`,..._,`${y}endContour();`],A=1;return}re(),k=M,V=L.closed,P=L.bounds,A=0}),re();const ue=[...Q($,t),J(w,t)],K=se.map(L=>L.split(`
`).map(M=>`	${M}`).join(`
`)).join(`

`),de=[...v,ee(w,$,t)],fe=de.length>0?`${Fe(de)}

`:"",ae=K?`${K}
`:"",ce=`${d}
${fe}${ae}}`;return{sharedCode:f,globalCode:ue.join(`
`),pathCode:ce}}function he(e,t,n="drawAllPaths"){const{vectorFormat:r,language:o,instanceMode:s=!1}=t,i=o==="typescript",l=r==="Processing",c=s&&(r==="createVector"||r==="Vec"),a=e.map(b=>l?`	${b}();`:c?`	${b}(p);`:`	${b}();`).join(`
`);return l?`
void ${n}() {
${a}
}`:`
function ${n}(${c?i?"p: any":"p":""})${i?": void":""} {
${a}
}`}function R(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function Ne(){return{minX:Number.POSITIVE_INFINITY,minY:Number.POSITIVE_INFINITY,maxX:Number.NEGATIVE_INFINITY,maxY:Number.NEGATIVE_INFINITY}}function le(e,t,n){e.minX=Math.min(e.minX,t),e.minY=Math.min(e.minY,n),e.maxX=Math.max(e.maxX,t),e.maxY=Math.max(e.maxY,n)}function nt(e){return Number.isFinite(e.minX)&&Number.isFinite(e.minY)&&Number.isFinite(e.maxX)&&Number.isFinite(e.maxY)}function ot(e){const t=[];let n=[],r=!1,o=Ne();const s=()=>{if(n.length===0)return;const i=nt(o)?{...o}:{minX:0,minY:0,maxX:0,maxY:0};t.push({commands:n,closed:r,bounds:i}),n=[],r=!1,o=Ne()};return e.forEach(i=>{if(i.type==="M"){s(),n.push(i),le(o,i.x,i.y);return}if(i.type==="L"){n.length===0&&n.push({type:"M",x:i.x,y:i.y}),n.push(i),le(o,i.x,i.y);return}if(i.type==="C"){if(n.length===0)return;n.push(i),le(o,i.x1,i.y1),le(o,i.x2,i.y2),le(o,i.x,i.y);return}i.type==="Z"&&(r=!0,s())}),s(),t}function Ae(e,t){return e.bounds.minX>=t.minX-1e-6&&e.bounds.maxX<=t.maxX+1e-6&&e.bounds.minY>=t.minY-1e-6&&e.bounds.maxY<=t.maxY+1e-6}function Ye(e,t,n){t.commands.forEach(r=>{if(r.type==="M"||r.type==="L"){const o=n(r.x,r.y);e.vertex(o.x,o.y);return}if(r.type==="C"){const o=n(r.x1,r.y1),s=n(r.x2,r.y2),i=n(r.x,r.y);e.bezierVertex(o.x,o.y,s.x,s.y,i.x,i.y)}})}function Be(e,t,n){const r=ot(t).filter(l=>l.commands.length>0);if(r.length===0)return;const o=[];let s=null;const i=()=>{s&&(o.push(s),s=null)};r.forEach(l=>{if(!s){s={host:l,contours:[],closed:l.closed};return}if(Ae(l,s.host.bounds)){s.contours.push(l),s.closed=!0;return}if(s.contours.length===0&&Ae(s.host,l.bounds)){s={host:l,contours:[s.host],closed:!0};return}i(),s={host:l,contours:[],closed:l.closed}}),i(),o.forEach(l=>{e.beginShape(),Ye(e,l.host,n),l.contours.forEach(c=>{e.beginContour(),Ye(e,c,n),e.endContour()}),e.endShape(l.closed?e.CLOSE:e.OPEN)})}function Te(e){const t=[];let n=0;return e.forEach(r=>{if(r.type==="M"||r.type==="L"){const o=Z(n);t.push({name:o,x:r.x,y:r.y}),n++}else if(r.type==="C"){const o=Z(n-1),s=Z(n),i=o+"c",l="c"+s;t.push({name:i,x:r.x1,y:r.y1}),t.push({name:l,x:r.x2,y:r.y2}),t.push({name:s,x:r.x,y:r.y}),n++}}),t}function Oe(e){const t=e.map(l=>l.x),n=e.map(l=>l.y),r=Math.min(...t),o=Math.min(...n),s=Math.max(...t),i=Math.max(...n);return{minX:r,minY:o,maxX:s,maxY:i,width:s-r,height:i-o}}function pe(e){if(e.length===0)return null;const t=e.reduce((n,r)=>({x:n.x+r.x,y:n.y+r.y}),{x:0,y:0});return{x:t.x/e.length,y:t.y/e.length}}function st(e){if(e.length<3)return pe(e.map(([o,s])=>({x:o,y:s})));let t=0,n=0,r=0;for(let o=0;o<e.length;o++){const[s,i]=e[o],[l,c]=e[(o+1)%e.length],a=s*c-l*i;t+=a,n+=(s+l)*a,r+=(i+c)*a}return Math.abs(t)<1e-9?pe(e.map(([o,s])=>({x:o,y:s}))):{x:n/(3*t),y:r/(3*t)}}function je(e){if(!e)return null;if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?null:{x:(e.x1+e.x2)/2,y:(e.y1+e.y2)/2};if(e.kind==="polyline"){const t=e.points||[];return pe(t.map(([n,r])=>({x:n,y:r})))}return e.kind==="polygon"?st(e.points||[]):e.kind==="rect"?e.x==null||e.y==null||e.width==null||e.height==null?null:{x:e.x+e.width/2,y:e.y+e.height/2}:e.kind==="circle"?e.cx==null||e.cy==null?null:{x:e.cx,y:e.cy}:e.kind==="ellipse"?e.cx==null||e.cy==null?null:{x:e.cx,y:e.cy}:null}function rt(e){return e?e.kind==="line"?"midpoint":e.kind==="polyline"||e.kind==="polygon"?"centroid":"center":"reference"}function at(e){if(!e)return[];if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?[]:[{point:{x:e.x1,y:e.y1},label:"start"},{point:{x:e.x2,y:e.y2},label:"end"}];if(e.kind==="polyline"||e.kind==="polygon")return(e.points||[]).map(([n,r],o)=>({point:{x:n,y:r},label:Z(o)}));const t=je(e);return t?[{point:t,label:rt(e)}]:[]}function ct(e,t,n,r=!0){const o=Pe(e),s=Te(o),i=at(n?.primitive),l=!!n?.primitive;if(s.length===0)return;const c=Oe(s);new window.p5(a=>{const I=c.width>0?440/c.width:1,p=c.height>0?440/c.height:1,C=Math.min(I,p),f=c.width*C,d=c.height*C,y=(500-f)/2-c.minX*C,w=(500-d)/2-c.minY*C;a.setup=()=>{a.createCanvas(500,500),a.noLoop()},a.draw=()=>{a.background(30);const g=(x,$)=>({x:x*C+y,y:$*C+w});a.stroke(60),a.strokeWeight(1);for(let x=0;x<=500;x+=50)a.line(x,0,x,500),a.line(0,x,500,x);const m=g(0,0);if(a.stroke(255,100,100),a.strokeWeight(2),a.line(0,m.y,500,m.y),a.stroke(100,255,100),a.strokeWeight(2),a.line(m.x,0,m.x,500),a.noStroke(),a.fill(255,200,0),a.circle(m.x,m.y,12),a.fill(255),a.textAlign(a.LEFT,a.BOTTOM),a.textSize(14),a.textStyle(a.BOLD),a.text("(0, 0)",m.x+8,m.y-8),a.fill(100,150,255,50),a.stroke(100,150,255),a.strokeWeight(2),Be(a,o,g),l&&i.length>0)i.forEach(({point:x,label:$,isControlPoint:v})=>{const F=g(x.x,x.y);a.noStroke(),v?(a.fill(255,200,100),a.circle(F.x,F.y,8)):(a.fill(100,255,150),a.circle(F.x,F.y,10)),a.fill(255),a.textAlign(a.CENTER,a.CENTER),a.textSize(12),a.textStyle(a.BOLD),a.text($,F.x,F.y-16),r&&(a.textSize(9),a.textStyle(a.NORMAL),a.fill(200),a.text(`(${x.x.toFixed(1)}, ${x.y.toFixed(1)})`,F.x,F.y+16))});else{a.stroke(255,200,100,100),a.strokeWeight(1);let x=0;o.forEach($=>{if($.type==="C"){const v=s.find(P=>P.name===String.fromCharCode(65+x-1)),F=s.find(P=>P.name===v?.name+"c"),k=s.find(P=>P.name==="c"+String.fromCharCode(65+x)),V=s.find(P=>P.name===String.fromCharCode(65+x));if(v&&F){const P=g(v.x,v.y),A=g(F.x,F.y);a.line(P.x,P.y,A.x,A.y)}if(k&&V){const P=g(k.x,k.y),A=g(V.x,V.y);a.line(P.x,P.y,A.x,A.y)}x++}else($.type==="M"||$.type==="L")&&x++}),s.forEach($=>{const v=g($.x,$.y),F=$.name.includes("c");a.noStroke(),F?(a.fill(255,200,100),a.circle(v.x,v.y,8)):(a.fill(100,255,150),a.circle(v.x,v.y,10)),a.fill(255),a.noStroke(),a.textAlign(a.CENTER,a.CENTER),a.textSize(12),a.textStyle(a.BOLD);const k=15;a.text($.name,v.x,v.y-k),r&&(a.textSize(9),a.textStyle(a.NORMAL),a.fill(200),a.text(`(${$.x.toFixed(1)}, ${$.y.toFixed(1)})`,v.x,v.y+k+3))})}a.fill(200),a.noStroke(),a.textAlign(a.LEFT,a.TOP),a.textSize(11),a.text(`Scale: ${C.toFixed(3)}x`,10,10),a.text(`Size: ${c.width.toFixed(1)} × ${c.height.toFixed(1)}`,10,25)}},t)}function De(e,t,n,r=[]){const o=e.map((c,a)=>({id:t[a]??a+1,commands:Pe(c),primitive:r[a]?.primitive})).filter(c=>c.commands.length>0),s=o.flatMap(c=>Te(c.commands));if(s.length===0)return;const i=Oe(s),l=o.map(()=>{const c=80+Math.floor(Math.random()*176),a=80+Math.floor(Math.random()*176),b=80+Math.floor(Math.random()*176);return{stroke:[c,a,b]}});new window.p5(c=>{const E=i.width>0?440/i.width:1,I=i.height>0?440/i.height:1,p=Math.min(E,I),C=i.width*p,f=i.height*p,d=(500-C)/2-i.minX*p,y=(500-f)/2-i.minY*p,w=(g,m)=>({x:g*p+d,y:m*p+y});c.setup=()=>{c.createCanvas(500,500),c.noLoop()},c.draw=()=>{c.background(30),c.stroke(60),c.strokeWeight(1);for(let m=0;m<=500;m+=50)c.line(m,0,m,500),c.line(0,m,500,m);const g=w(0,0);c.stroke(255,100,100),c.strokeWeight(2),c.line(0,g.y,500,g.y),c.stroke(100,255,100),c.strokeWeight(2),c.line(g.x,0,g.x,500),c.noStroke(),c.fill(255,200,0),c.circle(g.x,g.y,10),o.forEach((m,x)=>{const $=m.commands,v=l[x];c.noFill(),c.stroke(v.stroke[0],v.stroke[1],v.stroke[2]),c.strokeWeight(2),Be(c,$,w)}),c.noStroke(),c.fill(255),c.textAlign(c.CENTER,c.CENTER),c.textSize(11),c.textStyle(c.BOLD),o.forEach(m=>{const x=je(m.primitive),$=pe(Te(m.commands).map(k=>({x:k.x,y:k.y}))),v=x??$;if(!v)return;const F=w(v.x,v.y);c.text(String(m.id),F.x,F.y)}),c.fill(200),c.noStroke(),c.textAlign(c.LEFT,c.TOP),c.textSize(11),c.text(`Paths: ${o.length}`,10,10),c.text(`Scale: ${p.toFixed(3)}x`,10,25),c.text(`Size: ${i.width.toFixed(1)} x ${i.height.toFixed(1)}`,10,40)}},n)}const xe=.5522847498307936;function D(e,t=0){if(e==null)return t;const n=Number.parseFloat(e);return Number.isFinite(n)?n:t}function it(e){if(!e)return[];const t=/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g,n=(e.match(t)||[]).map(Number),r=[];for(let o=0;o+1<n.length;o+=2)r.push([n[o],n[o+1]]);return r}function lt(e){const t=D(e.getAttribute("x1"),0),n=D(e.getAttribute("y1"),0),r=D(e.getAttribute("x2"),0),o=D(e.getAttribute("y2"),0);return{pathData:`M ${t} ${n} L ${r} ${o}`,sourceIndex:0,primitive:{kind:"line",x1:t,y1:n,x2:r,y2:o}}}function Xe(e,t){const n=it(e.getAttribute("points"));if(n.length<2)return null;const[r,o]=n[0],s=n.slice(1).map(([i,l])=>`L ${i} ${l}`).join(" ");return{pathData:`M ${r} ${o} ${s}${t?" Z":""}`,sourceIndex:0,primitive:{kind:t?"polygon":"polyline",points:n}}}function ut(e,t,n,r,o,s){if(o===0||s===0)return`M ${e} ${t} L ${e+n} ${t} L ${e+n} ${t+r} L ${e} ${t+r} Z`;const i=o*xe,l=s*xe,c=e+n,a=t+r;return[`M ${e+o} ${t}`,`L ${c-o} ${t}`,`C ${c-o+i} ${t} ${c} ${t+s-l} ${c} ${t+s}`,`L ${c} ${a-s}`,`C ${c} ${a-s+l} ${c-o+i} ${a} ${c-o} ${a}`,`L ${e+o} ${a}`,`C ${e+o-i} ${a} ${e} ${a-s+l} ${e} ${a-s}`,`L ${e} ${t+s}`,`C ${e} ${t+s-l} ${e+o-i} ${t} ${e+o} ${t}`,"Z"].join(" ")}function dt(e){const t=D(e.getAttribute("x"),0),n=D(e.getAttribute("y"),0),r=D(e.getAttribute("width"),0),o=D(e.getAttribute("height"),0);if(r<=0||o<=0)return null;const s=e.getAttribute("rx"),i=e.getAttribute("ry");let l=D(s,0),c=D(i,0);return s!=null&&i==null&&(c=l),i!=null&&s==null&&(l=c),l=Math.max(0,Math.min(l,r/2)),c=Math.max(0,Math.min(c,o/2)),{pathData:ut(t,n,r,o,l,c),sourceIndex:0,primitive:{kind:"rect",x:t,y:n,width:r,height:o,rx:l,ry:c}}}function Re(e,t,n,r){const o=n*xe,s=r*xe;return[`M ${e+n} ${t}`,`C ${e+n} ${t+s} ${e+o} ${t+r} ${e} ${t+r}`,`C ${e-o} ${t+r} ${e-n} ${t+s} ${e-n} ${t}`,`C ${e-n} ${t-s} ${e-o} ${t-r} ${e} ${t-r}`,`C ${e+o} ${t-r} ${e+n} ${t-s} ${e+n} ${t}`,"Z"].join(" ")}function ft(e){const t=D(e.getAttribute("cx"),0),n=D(e.getAttribute("cy"),0),r=D(e.getAttribute("r"),0);return r<=0?null:{pathData:Re(t,n,r,r),sourceIndex:0,primitive:{kind:"circle",cx:t,cy:n,r}}}function ht(e){const t=D(e.getAttribute("cx"),0),n=D(e.getAttribute("cy"),0),r=D(e.getAttribute("rx"),0),o=D(e.getAttribute("ry"),0);return r<=0||o<=0?null:{pathData:Re(t,n,r,o),sourceIndex:0,primitive:{kind:"ellipse",cx:t,cy:n,rx:r,ry:o}}}function gt(e){const n=Array.from(e.querySelectorAll("path,rect,circle,ellipse,line,polyline,polygon")),r=[];return n.forEach((o,s)=>{const i=s+1,l=o.tagName.toLowerCase();if(l==="path"){const a=o.getAttribute("d");a&&r.push({pathData:a,sourceIndex:i});return}let c=null;l==="line"?c=lt(o):l==="polyline"?c=Xe(o,!1):l==="polygon"?c=Xe(o,!0):l==="rect"?c=dt(o):l==="circle"?c=ft(o):l==="ellipse"&&(c=ht(o)),c&&(c.sourceIndex=i,r.push(c))}),r}const G=document.getElementById("dropZone"),He=document.getElementById("fileInput"),W=document.getElementById("functionPrefix"),te=document.getElementById("output");let O=[],ge=null,Se=0;function We(e){const t=e.lastIndexOf(".");return t<=0?e:e.slice(0,t)}function ke(e){const t=e.trim().replace(/[^a-zA-Z0-9_]/g,"_").replace(/_+/g,"_").replace(/^_+|_+$/g,"");return t.length===0?"shape":/^[a-zA-Z_]/.test(t)?t:`_${t}`}function Ve(e){return ke(e)}function mt(e){const t=new Set,n=new Map;return e.map(r=>{if(!t.has(r))return t.add(r),n.set(r,1),r;let o=(n.get(r)||1)+1,s=`${r}_${o}`;for(;t.has(s);)o+=1,s=`${r}_${o}`;return n.set(r,o),t.add(s),s})}function pt(e,t,n){return ke(`${e}_${t||"path"}${n}`)}function xt(e){return ke(`${e}_drawAllPaths`)}function Ie(e){const t=We(e.name).trim();return t.length>0?t:"shape"}function yt(e,t){const n=We(e).trim();if(t==="pde"){const o=n.replace(/[^a-zA-Z0-9_]/g,"_").replace(/_+/g,"_").replace(/^_+|_+$/g,"");return o.length===0?"drawing":/^[0-9]/.test(o)?`svg${o}`:o}const r=n.replace(/[^a-zA-Z0-9._-]/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"");return r.length>0?r:"drawing"}function me(e,t){if(t==="pde"){const n=e.replace(/[^a-zA-Z0-9_]/g,"_").replace(/_+/g,"_").replace(/^_+|_+$/g,""),r=n.length>0?n:"drawing";return`${/^[0-9]/.test(r)?`svg${r}`:r}.pde`}return`${e}.${t}`}async function $t(e){if(!e)return!1;if(typeof navigator<"u"&&navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.top="0",t.style.left="-9999px",t.style.opacity="0",t.style.pointerEvents="none",document.body.appendChild(t),t.focus(),t.select(),t.setSelectionRange(0,t.value.length);let n=!1;try{n=document.execCommand("copy")}catch{n=!1}return document.body.removeChild(t),n}const Ee=new WeakMap;function vt(e){const t=e.dataset.baseLabel;if(t!==void 0)return t;const n=e.textContent||"";return e.dataset.baseLabel=n,n}function ze(e,t,n=2e3){const r=vt(e),o=Ee.get(e);o!==void 0&&window.clearTimeout(o),e.textContent=t;const s=window.setTimeout(()=>{e.textContent=r,Ee.delete(e)},n);Ee.set(e,s)}function qe(e){return e.type==="image/svg+xml"||e.name.toLowerCase().endsWith(".svg")}function Ze(e){return Array.from(e).filter(qe)}G.addEventListener("click",()=>He.click());document.querySelectorAll('input[name="vectorFormat"]').forEach(e=>{e.addEventListener("change",t=>{const n=t.target,r=document.getElementById("processingVectorOption"),o=document.getElementById("instanceModeOption");r&&(r.style.display=n.value==="Processing"?"flex":"none"),o&&(o.style.display=n.value==="Processing"?"none":"flex"),O.length>0&&oe(O)})});document.querySelectorAll('input[name="language"], input[name="processingVector"], input[name="sortMode"], #instanceMode, #showCoordinates').forEach(e=>{e.addEventListener("change",()=>{O.length>0&&oe(O)})});document.querySelectorAll("#coordMultiplier, #precision").forEach(e=>{e.addEventListener("change",()=>{O.length>0&&oe(O)})});W&&W.addEventListener("input",()=>{O.length>0&&oe(O)});G.addEventListener("dragover",e=>{e.preventDefault(),G.classList.add("dragover")});G.addEventListener("dragleave",()=>{G.classList.remove("dragover")});G.addEventListener("drop",e=>{e.preventDefault(),G.classList.remove("dragover");const t=e.dataTransfer?.files;if(!t){alert("Please drop at least one SVG file");return}const n=Ze(t);if(n.length===0){alert("Please drop at least one valid SVG file");return}oe(n)});He.addEventListener("change",e=>{const t=e.target.files;if(!t)return;const n=Ze(t);n.length!==0&&oe(n)});async function oe(e){const t=e.filter(qe);if(t.length===0)return;const n=t.length>1,r=O.length===1&&t.length===1&&O[0]===t[0];W&&(W.disabled=n,n?(W.value="Auto per file",W.title="Disabled for multi-file imports. Filename prefixes are used automatically."):(W.title="",r||(W.value=Ie(t[0])))),O=[...t];const o=++Se;let s=[];try{s=await Promise.all(t.map(async(u,h)=>{const S=await u.text(),X=new DOMParser().parseFromString(S,"image/svg+xml");return{file:u,fileIndex:h,shapes:gt(X)}}))}catch{if(o!==Se)return;te.innerHTML='<div class="output"><p>Could not read one or more SVG files.</p></div>';return}if(o!==Se)return;ge&&(ge(),ge=null);const i=s.filter(u=>u.shapes.length>0);if(i.length===0){te.innerHTML='<div class="output"><p>No supported drawable elements found (path, line, polyline, polygon, rect, circle, ellipse).</p></div>';return}const l=document.querySelector('input[name="vectorFormat"]:checked')?.value||"Vec",c=document.querySelector('input[name="language"]:checked')?.value||"javascript",a=parseFloat(document.getElementById("coordMultiplier")?.value)||1,b=parseInt(document.getElementById("precision")?.value)||5,T=document.querySelector('input[name="processingVector"]:checked')?.value||"PVector",E=document.getElementById("instanceMode")?.checked||!1,I=document.getElementById("showCoordinates")?.checked??!0,p=document.querySelector('input[name="sortMode"]:checked')?.value||"primitive",C={vectorFormat:l,language:c,coordMultiplier:a,precision:b,processingVector:T,instanceMode:E},f=Ve(W?.value||Ie(i[0].file)),d=n?mt(i.map(u=>Ve(Ie(u.file)))):[f],y=i.map((u,h)=>{const S=n?d[h]:f;return{file:u.file,fileIndex:u.fileIndex,filePrefix:S,drawAllFunctionName:xt(S)}}),w=[];let g=1;i.forEach((u,h)=>{const S=y[h];u.shapes.forEach((N,X)=>{w.push({fileIndex:u.fileIndex,fileName:u.file.name,shape:N,functionName:pt(S.filePrefix,N.primitive?.kind,X+1),globalId:g++})})});const m=[...w].sort((u,h)=>{if(p==="svg")return u.fileIndex!==h.fileIndex?u.fileIndex-h.fileIndex:u.shape.sourceIndex-h.shape.sourceIndex;const S=u.shape.primitive?.kind??"path",N=h.shape.primitive?.kind??"path";return S===N?u.fileIndex!==h.fileIndex?u.fileIndex-h.fileIndex:u.shape.sourceIndex-h.shape.sourceIndex:S.localeCompare(N)}),x=m.map(u=>u.functionName),$=new Map;m.forEach(u=>{const h=$.get(u.fileIndex)||[];h.push(u.functionName),$.set(u.fileIndex,h)});let v="",F="";const k=[],V=[],P=[],A=new Map,se=[],re=new Map,ue=[];m.forEach((u,h)=>{k.push(u.shape.pathData),V.push(u.globalId),P.push(u.shape),ue.push(u.functionName);let S=A.get(u.fileIndex);S||(S={previewId:`preview-all-file-${u.fileIndex}`,fileName:u.fileName,pathsData:[],shapeIds:[],shapes:[]},A.set(u.fileIndex,S)),S.pathsData.push(u.shape.pathData),S.shapeIds.push(u.globalId),S.shapes.push(u.shape);const N=tt(u.shape.pathData,C,h,u.shape,u.functionName);h===0&&(v=N.sharedCode);const X=[N.globalCode,N.pathCode].filter(U=>U.trim().length>0).join(`

`);se.push(X),re.set(u.functionName,X);const z=`preview-${h}`;F+=`
          <div class="output path-section" id="shape-section-${h}">
            <div class="path-header">
              <h2>${R(u.functionName)}</h2>
              <button class="copy-btn" data-path="${h}">Copy Code</button>
            </div>
            <p class="path-meta">${R(u.fileName)} · svg #${u.shape.sourceIndex}</p>
            <div class="content-grid">
              <div class="preview-container">
                <div id="${z}"></div>
              </div>
              <div class="code-container">
                <pre><code>${R(X)}</code></pre>
              </div>
            </div>
          </div>
        `});const K=v.trim(),de=se.join(`

`).trim(),fe=[];let ae="";if(n){const u=[];y.forEach(h=>{const S=$.get(h.fileIndex)||[];S.length!==0&&(u.push(h.drawAllFunctionName),fe.push(he(S,C,h.drawAllFunctionName).trim()))}),ae=he(u,C).trim()}else ae=he(x,C,y[0].drawAllFunctionName).trim();const ce=[ae,...fe,de].filter(u=>u.length>0).join(`

`),L=[K,ce].filter(u=>u.length>0).join(`

`),M=l==="Processing"?"pde":c==="typescript"?"ts":"js",Y=me("svg_complete",M),j=me("svg_paths",M),_=me("svg_shared",M),B=[];n&&y.forEach(u=>{const h=$.get(u.fileIndex)||[];if(h.length===0)return;const S=he(h,C,u.drawAllFunctionName).trim(),N=h.map(z=>re.get(z)||"").filter(z=>z.length>0).join(`

`).trim(),X=[S,N].filter(z=>z.length>0).join(`

`);B.push({codeKey:`drawing-file-${u.filePrefix}`,code:X,drawAllFunctionName:u.drawAllFunctionName,fileName:me(`svg_${yt(u.file.name,M)}`,M),sourceFileName:u.file.name})});const q={complete:L,drawing:ce,shared:K};B.forEach(u=>{q[u.codeKey]=u.code});const ye=`
      <div class="command-section">
        <div class="command-header">
          <h2>Complete File</h2>
          <div class="action-buttons">
            <button class="copy-btn" data-code-key="complete">Copy Complete Code</button>
            <button class="download-btn" data-code-key="complete" data-filename="${Y}">Download ${Y}</button>
          </div>
        </div>
        <div class="command-content">
          <p style="margin: 0; padding: 15px; color: #9cdcfe;">Includes shared transform code and all generated drawing functions.</p>
        </div>
      </div>
    `,$e=`
      <div class="shared-code-section drawing-code-section">
        <div class="shared-code-header">
          <h2>Drawing Code</h2>
          <div class="action-buttons">
            <button class="copy-btn" data-code-key="drawing">Copy Drawing Code</button>
            <button class="download-btn" data-code-key="drawing" data-filename="${j}">Download ${j}</button>
          </div>
        </div>
        <div class="shared-code-content">
          <pre><code>${R(ce)}</code></pre>
        </div>
      </div>
    `,ve=B.length>0?`
	      <div class="command-section">
	        <div class="command-header">
	          <h2>Per-file Drawing Downloads</h2>
        </div>
        <div class="command-content">
          <div class="command-content-inner">
            <div class="per-file-actions">
	              ${B.map(u=>`
	                <div class="per-file-action-row">
	                  <div class="per-file-action-label">${R(u.sourceFileName)}</div>
	                  <div class="action-buttons action-buttons-start">
	                    <button class="copy-btn" data-code-key="${u.codeKey}">Copy ${R(u.fileName)}</button>
	                    <button class="download-btn" data-code-key="${u.codeKey}" data-filename="${u.fileName}">Download ${R(u.fileName)}</button>
	                  </div>
	                </div>
	              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `:"",Ce=`
      <div class="shared-code-section">
        <div class="shared-code-header">
          <h2>Shared Code</h2>
          <div class="action-buttons">
            <button class="copy-btn" data-code-key="shared">Copy Shared Code</button>
            <button class="download-btn" data-code-key="shared" data-filename="${_}">Download ${_}</button>
          </div>
        </div>
        <div class="shared-code-content">
          <pre><code>${R(K)}</code></pre>
        </div>
      </div>
    `,be=n?`
      <div class="combined-preview-section output">
        <div class="combined-preview-header">
          <h2>All paths by file</h2>
        </div>
        <div class="combined-preview-grid">
          ${y.map(u=>{const h=A.get(u.fileIndex);return!h||h.pathsData.length===0?"":`
            <div class="combined-preview-file">
              <h3>${R(h.fileName)}</h3>
              <div class="preview-container">
                <div id="${h.previewId}"></div>
              </div>
            </div>
          `}).join("")}
        </div>
      </div>
    `:`
      <div class="combined-preview-section output">
        <div class="combined-preview-header">
          <h2>All paths</h2>
        </div>
        <div class="preview-container">
          <div id="preview-all"></div>
        </div>
      </div>
    `,we=`
      <div class="shape-nav">
        <h3>Shapes</h3>
        <ul class="shape-nav-list">
          ${ue.map((u,h)=>`
            <li>
              <button class="shape-nav-link" data-target="shape-section-${h}">${R(u)}</button>
            </li>
          `).join("")}
        </ul>
      </div>
    `;te.innerHTML=we+ye+$e+ve+Ce+be+F,n?y.forEach(u=>{const h=A.get(u.fileIndex);!h||h.pathsData.length===0||De(h.pathsData,h.shapeIds,h.previewId,h.shapes)}):De(k,V,"preview-all",P),k.forEach((u,h)=>{ct(u,`preview-${h}`,P[h],I)}),ge=Ct(),te.querySelectorAll(".download-btn[data-code-key]").forEach(u=>{u.addEventListener("click",()=>{const h=u.dataset.codeKey,S=u.dataset.filename;if(!h||!S)return;const N=q[h];if(!N)return;const X=new Blob([N],{type:"text/plain"}),z=URL.createObjectURL(X),U=document.createElement("a");U.href=z,U.download=S,U.click(),URL.revokeObjectURL(z);const Ge=u.textContent;u.textContent="Downloaded!",setTimeout(()=>{u.textContent=Ge},2e3)})}),te.querySelectorAll(".copy-btn").forEach(u=>{u.addEventListener("click",async h=>{const S=h.currentTarget;if(S.dataset.copying==="1")return;const N=S.dataset.codeKey;let X="";if(N?X=q[N]||"":X=S.closest(".path-section")?.querySelector("code")?.textContent||"",!X){ze(S,"No code");return}S.dataset.copying="1";let z=!1;try{z=await $t(X)}finally{S.dataset.copying="0"}ze(S,z?"Copied!":"Copy failed")})})}function Ct(){const e=Array.from(te.querySelectorAll(".shape-nav-link"));if(e.length===0)return()=>{};const t=e.map(l=>{const c=l.dataset.target;return c?document.getElementById(c):null}).filter(l=>l!==null);if(t.length===0)return()=>{};const n=l=>{e.forEach(c=>{c.classList.toggle("is-active",c.dataset.target===l.id)})},r=()=>{const l=window.innerHeight/2;let c=t[0],a=Number.POSITIVE_INFINITY;t.forEach(b=>{const T=b.getBoundingClientRect(),E=T.top+T.height/2,I=Math.abs(E-l);I<a&&(a=I,c=b)}),n(c)},o=l=>{const a=l.currentTarget.dataset.target;if(!a)return;const b=document.getElementById(a);b&&b.scrollIntoView({behavior:"smooth",block:"center"})};e.forEach(l=>{l.addEventListener("click",o)});let s=!1;const i=()=>{s||(s=!0,window.requestAnimationFrame(()=>{s=!1,r()}))};return window.addEventListener("scroll",i,{passive:!0}),window.addEventListener("resize",i),r(),()=>{e.forEach(l=>{l.removeEventListener("click",o)}),window.removeEventListener("scroll",i),window.removeEventListener("resize",i)}}
