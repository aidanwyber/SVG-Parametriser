(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();function Ce(e){const t=[],s=/([MLHVCSQTAZmlhvcsqtaz])\s*([^MLHVCSQTAZmlhvcsqtaz]*)/g;let r,n=0,o=0,c=0,l=0,a="",i=null,m=null;const C=()=>{i=null,m=null},M=P=>{const x=/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g;return(P.match(x)||[]).map(Number)};for(;(r=s.exec(e))!==null;){const P=r[1],x=P===P.toLowerCase(),y=P.toUpperCase(),f=M(r[2]);if(y==="M"){for(let d=0;d+1<f.length;d+=2){const g=x?n+f[d]:f[d],w=x?o+f[d+1]:f[d+1];d===0?(t.push({type:"M",x:g,y:w}),c=g,l=w):t.push({type:"L",x:g,y:w}),n=g,o=w}C(),a=f.length>2?"L":"M"}else if(y==="L"){for(let d=0;d+1<f.length;d+=2){const g=x?n+f[d]:f[d],w=x?o+f[d+1]:f[d+1];t.push({type:"L",x:g,y:w}),n=g,o=w}C(),a="L"}else if(y==="H"){for(let d=0;d<f.length;d++){const g=x?n+f[d]:f[d];t.push({type:"L",x:g,y:o}),n=g}C(),a="L"}else if(y==="V"){for(let d=0;d<f.length;d++){const g=x?o+f[d]:f[d];t.push({type:"L",x:n,y:g}),o=g}C(),a="L"}else if(y==="C")for(let d=0;d+5<f.length;d+=6){const g=x?n+f[d]:f[d],w=x?o+f[d+1]:f[d+1],p=x?n+f[d+2]:f[d+2],$=x?o+f[d+3]:f[d+3],b=x?n+f[d+4]:f[d+4],v=x?o+f[d+5]:f[d+5];t.push({type:"C",x1:g,y1:w,x2:p,y2:$,x:b,y:v}),n=b,o=v,i=p,m=$,a="C"}else if(y==="S")for(let d=0;d+3<f.length;d+=4){let g=n,w=o;(a==="C"||a==="S")&&i!==null&&m!==null&&(g=n*2-i,w=o*2-m);const p=x?n+f[d]:f[d],$=x?o+f[d+1]:f[d+1],b=x?n+f[d+2]:f[d+2],v=x?o+f[d+3]:f[d+3];t.push({type:"C",x1:g,y1:w,x2:p,y2:$,x:b,y:v}),n=b,o=v,i=p,m=$,a="S"}else y==="Z"?(t.push({type:"Z"}),n=c,o=l,C(),a="Z"):(C(),a=y)}return t}function U(e){let t="",s=e;for(;s>=0;)t=String.fromCharCode(65+s%26)+t,s=Math.floor(s/26)-1;return t}function R(e,t,s){const r=(e*t).toFixed(s);return parseFloat(r).toString()}function He(e){const{vectorFormat:t,language:s,processingVector:r="PVector",instanceMode:n=!1}=e,o=s==="typescript",c=t==="Processing",l=c&&r==="Vec2D",a=n&&t==="createVector";if(c){const M=l?"Vec2D":"PVector";return`${l?`import toxi.geom.*;

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

${M} applyTransform(${M} v) {
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

	return new ${M}(x, y);
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
const transformConfig${o?`: {
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
	${o?`a: number; b: number; c: number; d: number; tx: number; ty: number;

	`:""}constructor(a${o?": number":""}, b${o?": number":""}, c${o?": number":""}, d${o?": number":""}, tx${o?": number":""}, ty${o?": number":""}) {
		this.a = a; this.b = b;
		this.c = c; this.d = d;
		this.tx = tx; this.ty = ty;
	}

	transform(x${o?": number":""}, y${o?": number":""})${o?": [number, number]":""} {
		return [
			this.a * x + this.c * y + this.tx,
			this.b * x + this.d * y + this.ty
		];
	}

	static fromTransform(config${o?": typeof transformConfig":""})${o?": Matrix2D":""} {
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

function applyTransform(v${o?": Vec":""})${o?": Vec":""} {
	const [x, y] = transform.transform(v.x, v.y);
	return new Vec(x, y);
}

function applyTransformScalar(value${o?": number":""}, axis${o?": 'x' | 'y' | 'avg'":""} = 'avg')${o?": number":""} {
	if (axis === 'x') {
		return value * transformConfig.scaleX;
	}
	if (axis === 'y') {
		return value * transformConfig.scaleY;
	}
	return value * ((Math.abs(transformConfig.scaleX) + Math.abs(transformConfig.scaleY)) * 0.5);
}`;const i=a?"p.createVector":"createVector",m=o?"p5.Vector":"",C=a?o?"p: any":"p":"";return`// Transform configuration
const transformConfig${o?`: {
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

function applyTransform(${C?C+", ":""}v${o?`: ${m}`:""})${o?`: ${m}`:""} {
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

	return ${i}(x, y);
}

function applyTransformScalar(value${o?": number":""}, axis${o?": 'x' | 'y' | 'avg'":""} = 'avg')${o?": number":""} {
	if (axis === 'x') {
		return value * transformConfig.scaleX;
	}
	if (axis === 'y') {
		return value * transformConfig.scaleY;
	}
	return value * ((Math.abs(transformConfig.scaleX) + Math.abs(transformConfig.scaleY)) * 0.5);
}`}function Re(e,t){const{vectorFormat:s,language:r,instanceMode:n=!1}=t,o=r==="typescript",c=s==="Processing",l=n&&(s==="createVector"||s==="Vec");return c?`void ${e}() {`:`function ${e}(${l?o?"p: any":"p":""})${o?": void":""} {`}function Fe(e){const{vectorFormat:t,instanceMode:s=!1}=e;return s&&(t==="createVector"||t==="Vec")?"p.":""}function be(){return{minX:Number.POSITIVE_INFINITY,minY:Number.POSITIVE_INFINITY,maxX:Number.NEGATIVE_INFINITY,maxY:Number.NEGATIVE_INFINITY}}function se(e,t,s){e.minX=Math.min(e.minX,t),e.minY=Math.min(e.minY,s),e.maxX=Math.max(e.maxX,t),e.maxY=Math.max(e.maxY,s)}function je(e){return Number.isFinite(e.minX)&&Number.isFinite(e.minY)&&Number.isFinite(e.maxX)&&Number.isFinite(e.maxY)}function qe(e){const t=[];let s=[],r=!1,n=be();const o=()=>{if(s.length===0)return;const c=je(n)?{...n}:{minX:0,minY:0,maxX:0,maxY:0};t.push({commands:s,closed:r,bounds:c}),s=[],r=!1,n=be()};return e.forEach(c=>{if(c.type==="M"){o(),s.push(c),se(n,c.x,c.y);return}if(c.type==="L"){s.length===0&&s.push({type:"M",x:c.x,y:c.y}),s.push(c),se(n,c.x,c.y);return}if(c.type==="C"){if(s.length===0)return;s.push(c),se(n,c.x1,c.y1),se(n,c.x2,c.y2),se(n,c.x,c.y);return}c.type==="Z"&&(r=!0,o())}),o(),t}function Se(e,t){return e.bounds.minX>=t.minX-1e-6&&e.bounds.maxX<=t.maxX+1e-6&&e.bounds.minY>=t.minY-1e-6&&e.bounds.maxY<=t.maxY+1e-6}function We(e,t,s,r,n,o,c){const l=t.vectorFormat==="Processing",a=Fe(t),i=d=>R(d,s,r),m=[],C=[],M="'x'",P="'y'",x=l?"'a'":"'avg'",y=(d,g,w)=>{const p=`${c}${o}(${i(g)}, ${i(w)}))`;l?m.push(`${n} ${d} = ${p};`):m.push(`const ${d} = ${p};`)},f=(d,g,w)=>{const p=`applyTransformScalar(${i(g)}, ${w})`;l?m.push(`float ${d} = ${p};`):m.push(`const ${d} = ${p};`)};if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?null:(y("p1",e.x1,e.y1),y("p2",e.x2,e.y2),C.push(`${a}line(p1.x, p1.y, p2.x, p2.y);`),{declarations:m,drawCalls:C});if(e.kind==="polyline"||e.kind==="polygon"){const d=e.points||[];return d.length<2?null:(d.forEach(([g,w],p)=>{y(`p${p}`,g,w)}),C.push(`${a}beginShape();`),d.forEach((g,w)=>{C.push(`${a}vertex(p${w}.x, p${w}.y);`)}),C.push(`${a}endShape(${e.kind==="polygon"?"CLOSE":"OPEN"});`),{declarations:m,drawCalls:C})}if(e.kind==="rect"){if(e.x==null||e.y==null||e.width==null||e.height==null)return null;y("rectPos",e.x,e.y),f("rectW",e.width,M),f("rectH",e.height,P);const d=e.rx||0,g=e.ry||0;if(d>0||g>0){if(Math.abs(d-g)>1e-9)return null;f("rectR",d,x),C.push(`${a}rect(rectPos.x, rectPos.y, rectW, rectH, rectR);`)}else C.push(`${a}rect(rectPos.x, rectPos.y, rectW, rectH);`);return{declarations:m,drawCalls:C}}return e.kind==="circle"?e.cx==null||e.cy==null||e.r==null?null:(y("circleCenter",e.cx,e.cy),f("circleDiameter",e.r*2,x),C.push(`${a}circle(circleCenter.x, circleCenter.y, circleDiameter);`),{declarations:m,drawCalls:C}):e.kind==="ellipse"?e.cx==null||e.cy==null||e.rx==null||e.ry==null?null:(y("ellipseCenter",e.cx,e.cy),f("ellipseW",e.rx*2,M),f("ellipseH",e.ry*2,P),C.push(`${a}ellipse(ellipseCenter.x, ellipseCenter.y, ellipseW, ellipseH);`),{declarations:m,drawCalls:C}):null}function Ze(e,t,s,r,n){const{vectorFormat:o,coordMultiplier:c,precision:l,processingVector:a="PVector",instanceMode:i=!1}=t,m=o==="Processing",C=m&&a==="Vec2D",M=i&&(o==="createVector"||o==="Vec"),P=n||`drawPath${s+1}`,x=m?C?"new Vec2D":"new PVector":o==="Vec"?"new Vec":i&&o==="createVector"?"p.createVector":"createVector",y=[],f=m?C?"Vec2D":"PVector":"const",d=M&&o==="createVector"?"applyTransform(p, ":"applyTransform(",g=He(t),w=Re(P,t),p=Fe(t);if(r?.primitive){const T=We(r.primitive,t,c,l,f,x,d);if(T){const A=T.declarations.length>0?`${T.declarations.map(V=>`	${V}`).join(`
`)}

`:"",Y=T.drawCalls.map(V=>`	${V}`).join(`
`),X=`${w}
${A}${Y}
}`;return{sharedCode:g,pathCode:X}}}const $=Ce(e),b=qe($);let v=0;const S=T=>{const A=[];return T.commands.forEach(Y=>{if(Y.type==="M"||Y.type==="L"){const X=U(v),V=R(Y.x,c,l),q=R(Y.y,c,l);y.push(`${X} = ${d}${x}(${V}, ${q}))`),A.push(`${p}vertex(${X}.x, ${X}.y);`),v++;return}if(Y.type==="C"){const X=U(v-1),V=U(v),q=X+"c",Z="c"+V,G=R(Y.x1,c,l),oe=R(Y.y1,c,l),he=R(Y.x2,c,l),pe=R(Y.y2,c,l),ge=R(Y.x,c,l),me=R(Y.y,c,l);y.push(`${q} = ${d}${x}(${G}, ${oe}))`),y.push(`${Z} = ${d}${x}(${he}, ${pe}))`),y.push(`${V} = ${d}${x}(${ge}, ${me}))`),A.push(`${p}bezierVertex(${q}.x, ${q}.y, ${Z}.x, ${Z}.y, ${V}.x, ${V}.y);`),v++}}),A};let N=[],k=!1,D=null,E=0;const _=[],J=()=>{N.length!==0&&(_.push([`${p}beginShape();`,...N,`${p}endShape(${k?"CLOSE":"OPEN"});`].join(`
`)),N=[],k=!1,D=null,E=0)};b.forEach(T=>{const A=S(T);if(A.length===0)return;if(N.length===0){N=A,k=T.closed,D=T.bounds,E=0;return}if(D!==null&&Se(T,D)){k=!0,N.push(`${p}beginContour();`),N.push(...A),N.push(`${p}endContour();`),E++;return}if(D!==null&&E===0&&Se({bounds:D},T.bounds)){const V=[...N];k=!0,D=T.bounds,N=[...A,`${p}beginContour();`,...V,`${p}endContour();`],E=1;return}J(),N=A,k=T.closed,D=T.bounds,E=0}),J();const ee=y.length>0?`	${f} ${y.join(`,
		`)};`:"",te=_.map(T=>T.split(`
`).map(A=>`	${A}`).join(`
`)).join(`

`),ne=ee?`${ee}

`:"",fe=te?`${te}
`:"",ae=`${w}
${ne}${fe}}`;return{sharedCode:g,pathCode:ae}}function ie(e,t,s="drawAllPaths"){const{vectorFormat:r,language:n,instanceMode:o=!1}=t,c=n==="typescript",l=r==="Processing",a=o&&(r==="createVector"||r==="Vec"),i=e.map(m=>l?`	${m}();`:a?`	${m}(p);`:`	${m}();`).join(`
`);return l?`
void ${s}() {
${i}
}`:`
function ${s}(${a?c?"p: any":"p":""})${c?": void":""} {
${i}
}`}function H(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function Ie(){return{minX:Number.POSITIVE_INFINITY,minY:Number.POSITIVE_INFINITY,maxX:Number.NEGATIVE_INFINITY,maxY:Number.NEGATIVE_INFINITY}}function re(e,t,s){e.minX=Math.min(e.minX,t),e.minY=Math.min(e.minY,s),e.maxX=Math.max(e.maxX,t),e.maxY=Math.max(e.maxY,s)}function Ge(e){return Number.isFinite(e.minX)&&Number.isFinite(e.minY)&&Number.isFinite(e.maxX)&&Number.isFinite(e.maxY)}function Ke(e){const t=[];let s=[],r=!1,n=Ie();const o=()=>{if(s.length===0)return;const c=Ge(n)?{...n}:{minX:0,minY:0,maxX:0,maxY:0};t.push({commands:s,closed:r,bounds:c}),s=[],r=!1,n=Ie()};return e.forEach(c=>{if(c.type==="M"){o(),s.push(c),re(n,c.x,c.y);return}if(c.type==="L"){s.length===0&&s.push({type:"M",x:c.x,y:c.y}),s.push(c),re(n,c.x,c.y);return}if(c.type==="C"){if(s.length===0)return;s.push(c),re(n,c.x1,c.y1),re(n,c.x2,c.y2),re(n,c.x,c.y);return}c.type==="Z"&&(r=!0,o())}),o(),t}function Ee(e,t){return e.bounds.minX>=t.minX-1e-6&&e.bounds.maxX<=t.maxX+1e-6&&e.bounds.minY>=t.minY-1e-6&&e.bounds.maxY<=t.maxY+1e-6}function Ne(e,t,s){t.commands.forEach(r=>{if(r.type==="M"||r.type==="L"){const n=s(r.x,r.y);e.vertex(n.x,n.y);return}if(r.type==="C"){const n=s(r.x1,r.y1),o=s(r.x2,r.y2),c=s(r.x,r.y);e.bezierVertex(n.x,n.y,o.x,o.y,c.x,c.y)}})}function Me(e,t,s){const r=Ke(t).filter(l=>l.commands.length>0);if(r.length===0)return;const n=[];let o=null;const c=()=>{o&&(n.push(o),o=null)};r.forEach(l=>{if(!o){o={host:l,contours:[],closed:l.closed};return}if(Ee(l,o.host.bounds)){o.contours.push(l),o.closed=!0;return}if(o.contours.length===0&&Ee(o.host,l.bounds)){o={host:l,contours:[o.host],closed:!0};return}c(),o={host:l,contours:[],closed:l.closed}}),c(),n.forEach(l=>{e.beginShape(),Ne(e,l.host,s),l.contours.forEach(a=>{e.beginContour(),Ne(e,a,s),e.endContour()}),e.endShape(l.closed?e.CLOSE:e.OPEN)})}function ve(e){const t=[];let s=0;return e.forEach(r=>{if(r.type==="M"||r.type==="L"){const n=U(s);t.push({name:n,x:r.x,y:r.y}),s++}else if(r.type==="C"){const n=U(s-1),o=U(s),c=n+"c",l="c"+o;t.push({name:c,x:r.x1,y:r.y1}),t.push({name:l,x:r.x2,y:r.y2}),t.push({name:o,x:r.x,y:r.y}),s++}}),t}function Ae(e){const t=e.map(l=>l.x),s=e.map(l=>l.y),r=Math.min(...t),n=Math.min(...s),o=Math.max(...t),c=Math.max(...s);return{minX:r,minY:n,maxX:o,maxY:c,width:o-r,height:c-n}}function ue(e){if(e.length===0)return null;const t=e.reduce((s,r)=>({x:s.x+r.x,y:s.y+r.y}),{x:0,y:0});return{x:t.x/e.length,y:t.y/e.length}}function Ue(e){if(e.length<3)return ue(e.map(([n,o])=>({x:n,y:o})));let t=0,s=0,r=0;for(let n=0;n<e.length;n++){const[o,c]=e[n],[l,a]=e[(n+1)%e.length],i=o*a-l*c;t+=i,s+=(o+l)*i,r+=(c+a)*i}return Math.abs(t)<1e-9?ue(e.map(([n,o])=>({x:n,y:o}))):{x:s/(3*t),y:r/(3*t)}}function Le(e){if(!e)return null;if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?null:{x:(e.x1+e.x2)/2,y:(e.y1+e.y2)/2};if(e.kind==="polyline"){const t=e.points||[];return ue(t.map(([s,r])=>({x:s,y:r})))}return e.kind==="polygon"?Ue(e.points||[]):e.kind==="rect"?e.x==null||e.y==null||e.width==null||e.height==null?null:{x:e.x+e.width/2,y:e.y+e.height/2}:e.kind==="circle"?e.cx==null||e.cy==null?null:{x:e.cx,y:e.cy}:e.kind==="ellipse"?e.cx==null||e.cy==null?null:{x:e.cx,y:e.cy}:null}function Qe(e){return e?e.kind==="line"?"midpoint":e.kind==="polyline"||e.kind==="polygon"?"centroid":"center":"reference"}function Je(e){if(!e)return[];if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?[]:[{point:{x:e.x1,y:e.y1},label:"start"},{point:{x:e.x2,y:e.y2},label:"end"}];const t=Le(e);return t?[{point:t,label:Qe(e)}]:[]}function et(e,t,s,r=!0){const n=Ce(e),o=ve(n),c=Je(s?.primitive),l=!!s?.primitive;if(o.length===0)return;const a=Ae(o);new window.p5(i=>{const P=a.width>0?440/a.width:1,x=a.height>0?440/a.height:1,y=Math.min(P,x),f=a.width*y,d=a.height*y,g=(500-f)/2-a.minX*y,w=(500-d)/2-a.minY*y;i.setup=()=>{i.createCanvas(500,500),i.noLoop()},i.draw=()=>{i.background(30);const p=(b,v)=>({x:b*y+g,y:v*y+w});i.stroke(60),i.strokeWeight(1);for(let b=0;b<=500;b+=50)i.line(b,0,b,500),i.line(0,b,500,b);const $=p(0,0);if(i.stroke(255,100,100),i.strokeWeight(2),i.line(0,$.y,500,$.y),i.stroke(100,255,100),i.strokeWeight(2),i.line($.x,0,$.x,500),i.noStroke(),i.fill(255,200,0),i.circle($.x,$.y,12),i.fill(255),i.textAlign(i.LEFT,i.BOTTOM),i.textSize(14),i.textStyle(i.BOLD),i.text("(0, 0)",$.x+8,$.y-8),i.fill(100,150,255,50),i.stroke(100,150,255),i.strokeWeight(2),Me(i,n,p),l&&c.length>0)c.forEach(({point:b,label:v})=>{const S=p(b.x,b.y);i.noStroke(),i.fill(255,220,120),i.circle(S.x,S.y,12),i.fill(255),i.textAlign(i.CENTER,i.CENTER),i.textSize(12),i.textStyle(i.BOLD),i.text(v,S.x,S.y-16),r&&(i.textSize(9),i.textStyle(i.NORMAL),i.fill(200),i.text(`(${b.x.toFixed(1)}, ${b.y.toFixed(1)})`,S.x,S.y+16))});else{i.stroke(255,200,100,100),i.strokeWeight(1);let b=0;n.forEach(v=>{if(v.type==="C"){const S=o.find(E=>E.name===String.fromCharCode(65+b-1)),N=o.find(E=>E.name===S?.name+"c"),k=o.find(E=>E.name==="c"+String.fromCharCode(65+b)),D=o.find(E=>E.name===String.fromCharCode(65+b));if(S&&N){const E=p(S.x,S.y),_=p(N.x,N.y);i.line(E.x,E.y,_.x,_.y)}if(k&&D){const E=p(k.x,k.y),_=p(D.x,D.y);i.line(E.x,E.y,_.x,_.y)}b++}else(v.type==="M"||v.type==="L")&&b++}),o.forEach(v=>{const S=p(v.x,v.y),N=v.name.includes("c");i.noStroke(),N?(i.fill(255,200,100),i.circle(S.x,S.y,8)):(i.fill(100,255,150),i.circle(S.x,S.y,10)),i.fill(255),i.noStroke(),i.textAlign(i.CENTER,i.CENTER),i.textSize(12),i.textStyle(i.BOLD);const k=15;i.text(v.name,S.x,S.y-k),r&&(i.textSize(9),i.textStyle(i.NORMAL),i.fill(200),i.text(`(${v.x.toFixed(1)}, ${v.y.toFixed(1)})`,S.x,S.y+k+3))})}i.fill(200),i.noStroke(),i.textAlign(i.LEFT,i.TOP),i.textSize(11),i.text(`Scale: ${y.toFixed(3)}x`,10,10),i.text(`Size: ${a.width.toFixed(1)} × ${a.height.toFixed(1)}`,10,25)}},t)}function Te(e,t,s,r=[]){const n=e.map((a,i)=>({id:t[i]??i+1,commands:Ce(a),primitive:r[i]?.primitive})).filter(a=>a.commands.length>0),o=n.flatMap(a=>ve(a.commands));if(o.length===0)return;const c=Ae(o),l=n.map(()=>{const a=80+Math.floor(Math.random()*176),i=80+Math.floor(Math.random()*176),m=80+Math.floor(Math.random()*176);return{stroke:[a,i,m]}});new window.p5(a=>{const M=c.width>0?440/c.width:1,P=c.height>0?440/c.height:1,x=Math.min(M,P),y=c.width*x,f=c.height*x,d=(500-y)/2-c.minX*x,g=(500-f)/2-c.minY*x,w=(p,$)=>({x:p*x+d,y:$*x+g});a.setup=()=>{a.createCanvas(500,500),a.noLoop()},a.draw=()=>{a.background(30),a.stroke(60),a.strokeWeight(1);for(let $=0;$<=500;$+=50)a.line($,0,$,500),a.line(0,$,500,$);const p=w(0,0);a.stroke(255,100,100),a.strokeWeight(2),a.line(0,p.y,500,p.y),a.stroke(100,255,100),a.strokeWeight(2),a.line(p.x,0,p.x,500),a.noStroke(),a.fill(255,200,0),a.circle(p.x,p.y,10),n.forEach(($,b)=>{const v=$.commands,S=l[b];a.noFill(),a.stroke(S.stroke[0],S.stroke[1],S.stroke[2]),a.strokeWeight(2),Me(a,v,w)}),a.noStroke(),a.fill(255),a.textAlign(a.CENTER,a.CENTER),a.textSize(11),a.textStyle(a.BOLD),n.forEach($=>{const b=Le($.primitive),v=ue(ve($.commands).map(k=>({x:k.x,y:k.y}))),S=b??v;if(!S)return;const N=w(S.x,S.y);a.text(String($.id),N.x,N.y)}),a.fill(200),a.noStroke(),a.textAlign(a.LEFT,a.TOP),a.textSize(11),a.text(`Paths: ${n.length}`,10,10),a.text(`Scale: ${x.toFixed(3)}x`,10,25),a.text(`Size: ${c.width.toFixed(1)} x ${c.height.toFixed(1)}`,10,40)}},s)}const de=.5522847498307936;function L(e,t=0){if(e==null)return t;const s=Number.parseFloat(e);return Number.isFinite(s)?s:t}function tt(e){if(!e)return[];const t=/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g,s=(e.match(t)||[]).map(Number),r=[];for(let n=0;n+1<s.length;n+=2)r.push([s[n],s[n+1]]);return r}function nt(e){const t=L(e.getAttribute("x1"),0),s=L(e.getAttribute("y1"),0),r=L(e.getAttribute("x2"),0),n=L(e.getAttribute("y2"),0);return{pathData:`M ${t} ${s} L ${r} ${n}`,sourceIndex:0,primitive:{kind:"line",x1:t,y1:s,x2:r,y2:n}}}function Pe(e,t){const s=tt(e.getAttribute("points"));if(s.length<2)return null;const[r,n]=s[0],o=s.slice(1).map(([c,l])=>`L ${c} ${l}`).join(" ");return{pathData:`M ${r} ${n} ${o}${t?" Z":""}`,sourceIndex:0,primitive:{kind:t?"polygon":"polyline",points:s}}}function ot(e,t,s,r,n,o){if(n===0||o===0)return`M ${e} ${t} L ${e+s} ${t} L ${e+s} ${t+r} L ${e} ${t+r} Z`;const c=n*de,l=o*de,a=e+s,i=t+r;return[`M ${e+n} ${t}`,`L ${a-n} ${t}`,`C ${a-n+c} ${t} ${a} ${t+o-l} ${a} ${t+o}`,`L ${a} ${i-o}`,`C ${a} ${i-o+l} ${a-n+c} ${i} ${a-n} ${i}`,`L ${e+n} ${i}`,`C ${e+n-c} ${i} ${e} ${i-o+l} ${e} ${i-o}`,`L ${e} ${t+o}`,`C ${e} ${t+o-l} ${e+n-c} ${t} ${e+n} ${t}`,"Z"].join(" ")}function st(e){const t=L(e.getAttribute("x"),0),s=L(e.getAttribute("y"),0),r=L(e.getAttribute("width"),0),n=L(e.getAttribute("height"),0);if(r<=0||n<=0)return null;const o=e.getAttribute("rx"),c=e.getAttribute("ry");let l=L(o,0),a=L(c,0);return o!=null&&c==null&&(a=l),c!=null&&o==null&&(l=a),l=Math.max(0,Math.min(l,r/2)),a=Math.max(0,Math.min(a,n/2)),{pathData:ot(t,s,r,n,l,a),sourceIndex:0,primitive:{kind:"rect",x:t,y:s,width:r,height:n,rx:l,ry:a}}}function Ye(e,t,s,r){const n=s*de,o=r*de;return[`M ${e+s} ${t}`,`C ${e+s} ${t+o} ${e+n} ${t+r} ${e} ${t+r}`,`C ${e-n} ${t+r} ${e-s} ${t+o} ${e-s} ${t}`,`C ${e-s} ${t-o} ${e-n} ${t-r} ${e} ${t-r}`,`C ${e+n} ${t-r} ${e+s} ${t-o} ${e+s} ${t}`,"Z"].join(" ")}function rt(e){const t=L(e.getAttribute("cx"),0),s=L(e.getAttribute("cy"),0),r=L(e.getAttribute("r"),0);return r<=0?null:{pathData:Ye(t,s,r,r),sourceIndex:0,primitive:{kind:"circle",cx:t,cy:s,r}}}function at(e){const t=L(e.getAttribute("cx"),0),s=L(e.getAttribute("cy"),0),r=L(e.getAttribute("rx"),0),n=L(e.getAttribute("ry"),0);return r<=0||n<=0?null:{pathData:Ye(t,s,r,n),sourceIndex:0,primitive:{kind:"ellipse",cx:t,cy:s,rx:r,ry:n}}}function it(e){const s=Array.from(e.querySelectorAll("path,rect,circle,ellipse,line,polyline,polygon")),r=[];return s.forEach((n,o)=>{const c=o+1,l=n.tagName.toLowerCase();if(l==="path"){const i=n.getAttribute("d");i&&r.push({pathData:i,sourceIndex:c});return}let a=null;l==="line"?a=nt(n):l==="polyline"?a=Pe(n,!1):l==="polygon"?a=Pe(n,!0):l==="rect"?a=st(n):l==="circle"?a=rt(n):l==="ellipse"&&(a=at(n)),a&&(a.sourceIndex=c,r.push(a))}),r}const W=document.getElementById("dropZone"),De=document.getElementById("fileInput"),j=document.getElementById("functionPrefix"),K=document.getElementById("output");let B=[],ce=null,ye=0;function Xe(e){const t=e.lastIndexOf(".");return t<=0?e:e.slice(0,t)}function we(e){const t=e.trim().replace(/[^a-zA-Z0-9_]/g,"_").replace(/_+/g,"_").replace(/^_+|_+$/g,"");return t.length===0?"shape":/^[a-zA-Z_]/.test(t)?t:`_${t}`}function ke(e){return we(e)}function ct(e){const t=new Set,s=new Map;return e.map(r=>{if(!t.has(r))return t.add(r),s.set(r,1),r;let n=(s.get(r)||1)+1,o=`${r}_${n}`;for(;t.has(o);)n+=1,o=`${r}_${n}`;return s.set(r,n),t.add(o),o})}function lt(e,t,s){return we(`${e}_${t||"path"}${s}`)}function ut(e){return we(`${e}_drawAllPaths`)}function $e(e){const t=Xe(e.name).trim();return t.length>0?t:"shape"}function dt(e,t){const s=Xe(e).trim();if(t==="pde"){const n=s.replace(/[^a-zA-Z0-9_]/g,"_").replace(/_+/g,"_").replace(/^_+|_+$/g,"");return n.length===0?"drawing":/^[0-9]/.test(n)?`_${n}`:n}const r=s.replace(/[^a-zA-Z0-9._-]/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"");return r.length>0?r:"drawing"}function le(e,t){if(t==="pde"){const s=e.replace(/[^a-zA-Z0-9_]/g,"_").replace(/_+/g,"_").replace(/^_+|_+$/g,""),r=s.length>0?s:"drawing";return`${/^[0-9]/.test(r)?`_${r}`:r}.pde`}return`${e}.${t}`}function Ve(e){return e.type==="image/svg+xml"||e.name.toLowerCase().endsWith(".svg")}function ze(e){return Array.from(e).filter(Ve)}W.addEventListener("click",()=>De.click());document.querySelectorAll('input[name="vectorFormat"]').forEach(e=>{e.addEventListener("change",t=>{const s=t.target,r=document.getElementById("processingVectorOption"),n=document.getElementById("instanceModeOption");r&&(r.style.display=s.value==="Processing"?"flex":"none"),n&&(n.style.display=s.value==="Processing"?"none":"flex"),B.length>0&&Q(B)})});document.querySelectorAll('input[name="language"], input[name="processingVector"], input[name="sortMode"], #instanceMode, #showCoordinates').forEach(e=>{e.addEventListener("change",()=>{B.length>0&&Q(B)})});document.querySelectorAll("#coordMultiplier, #precision").forEach(e=>{e.addEventListener("change",()=>{B.length>0&&Q(B)})});j&&j.addEventListener("input",()=>{B.length>0&&Q(B)});W.addEventListener("dragover",e=>{e.preventDefault(),W.classList.add("dragover")});W.addEventListener("dragleave",()=>{W.classList.remove("dragover")});W.addEventListener("drop",e=>{e.preventDefault(),W.classList.remove("dragover");const t=e.dataTransfer?.files;if(!t){alert("Please drop at least one SVG file");return}const s=ze(t);if(s.length===0){alert("Please drop at least one valid SVG file");return}Q(s)});De.addEventListener("change",e=>{const t=e.target.files;if(!t)return;const s=ze(t);s.length!==0&&Q(s)});async function Q(e){const t=e.filter(Ve);if(t.length===0)return;const s=t.length>1,r=B.length===1&&t.length===1&&B[0]===t[0];j&&(j.disabled=s,s?(j.value="Auto per file",j.title="Disabled for multi-file imports. Filename prefixes are used automatically."):(j.title="",r||(j.value=$e(t[0])))),B=[...t];const n=++ye;let o=[];try{o=await Promise.all(t.map(async(u,h)=>{const I=await u.text(),z=new DOMParser().parseFromString(I,"image/svg+xml");return{file:u,fileIndex:h,shapes:it(z)}}))}catch{if(n!==ye)return;K.innerHTML='<div class="output"><p>Could not read one or more SVG files.</p></div>';return}if(n!==ye)return;ce&&(ce(),ce=null);const c=o.filter(u=>u.shapes.length>0);if(c.length===0){K.innerHTML='<div class="output"><p>No supported drawable elements found (path, line, polyline, polygon, rect, circle, ellipse).</p></div>';return}const l=document.querySelector('input[name="vectorFormat"]:checked')?.value||"Vec",a=document.querySelector('input[name="language"]:checked')?.value||"javascript",i=parseFloat(document.getElementById("coordMultiplier")?.value)||1,m=parseInt(document.getElementById("precision")?.value)||5,C=document.querySelector('input[name="processingVector"]:checked')?.value||"PVector",M=document.getElementById("instanceMode")?.checked||!1,P=document.getElementById("showCoordinates")?.checked??!0,x=document.querySelector('input[name="sortMode"]:checked')?.value||"primitive",y={vectorFormat:l,language:a,coordMultiplier:i,precision:m,processingVector:C,instanceMode:M},f=ke(j?.value||$e(c[0].file)),d=s?ct(c.map(u=>ke($e(u.file)))):[f],g=c.map((u,h)=>{const I=s?d[h]:f;return{file:u.file,fileIndex:u.fileIndex,filePrefix:I,drawAllFunctionName:ut(I)}}),w=[];let p=1;c.forEach((u,h)=>{const I=g[h];u.shapes.forEach((F,z)=>{w.push({fileIndex:u.fileIndex,fileName:u.file.name,shape:F,functionName:lt(I.filePrefix,F.primitive?.kind,z+1),globalId:p++})})});const $=[...w].sort((u,h)=>{if(x==="svg")return u.fileIndex!==h.fileIndex?u.fileIndex-h.fileIndex:u.shape.sourceIndex-h.shape.sourceIndex;const I=u.shape.primitive?.kind??"path",F=h.shape.primitive?.kind??"path";return I===F?u.fileIndex!==h.fileIndex?u.fileIndex-h.fileIndex:u.shape.sourceIndex-h.shape.sourceIndex:I.localeCompare(F)}),b=$.map(u=>u.functionName),v=new Map;$.forEach(u=>{const h=v.get(u.fileIndex)||[];h.push(u.functionName),v.set(u.fileIndex,h)});let S="",N="";const k=[],D=[],E=[],_=new Map,J=[],ee=new Map,te=[];$.forEach((u,h)=>{k.push(u.shape.pathData),D.push(u.globalId),E.push(u.shape),te.push(u.functionName);let I=_.get(u.fileIndex);I||(I={previewId:`preview-all-file-${u.fileIndex}`,fileName:u.fileName,pathsData:[],shapeIds:[],shapes:[]},_.set(u.fileIndex,I)),I.pathsData.push(u.shape.pathData),I.shapeIds.push(u.globalId),I.shapes.push(u.shape);const F=Ze(u.shape.pathData,y,h,u.shape,u.functionName);h===0&&(S=F.sharedCode),J.push(F.pathCode),ee.set(u.functionName,F.pathCode);const z=`preview-${h}`;N+=`
          <div class="output path-section" id="shape-section-${h}">
            <div class="path-header">
              <h2>${H(u.functionName)}</h2>
              <button class="copy-btn" data-path="${h}">Copy Code</button>
            </div>
            <p class="path-meta">${H(u.fileName)} · svg #${u.shape.sourceIndex}</p>
            <div class="content-grid">
              <div class="preview-container">
                <div id="${z}"></div>
              </div>
              <div class="code-container">
                <pre><code>${H(F.pathCode)}</code></pre>
              </div>
            </div>
          </div>
        `});const ne=S.trim(),fe=J.join(`

`).trim(),ae=[];let T="";if(s){const u=[];g.forEach(h=>{const I=v.get(h.fileIndex)||[];I.length!==0&&(u.push(h.drawAllFunctionName),ae.push(ie(I,y,h.drawAllFunctionName).trim()))}),T=ie(u,y).trim()}else T=ie(b,y).trim();const A=[T,...ae,fe].filter(u=>u.length>0).join(`

`),Y=[ne,A].filter(u=>u.length>0).join(`

`),X=l==="Processing"?"pde":a==="typescript"?"ts":"js",V=le("draw-paths",X),q=le("draw-paths-drawing",X),Z=le("draw-paths-shared",X),G=[];s&&g.forEach(u=>{const h=v.get(u.fileIndex)||[];if(h.length===0)return;const I=ie(h,y,u.drawAllFunctionName).trim(),F=h.map(O=>ee.get(O)||"").filter(O=>O.length>0).join(`

`).trim(),z=[I,F].filter(O=>O.length>0).join(`

`);G.push({codeKey:`drawing-file-${u.filePrefix}`,code:z,drawAllFunctionName:u.drawAllFunctionName,fileName:le(`${dt(u.file.name,X)}${X==="pde"?"_":"-"}drawing`,X),sourceFileName:u.file.name})});const oe={complete:Y,drawing:A,shared:ne};G.forEach(u=>{oe[u.codeKey]=u.code});const he=`
      <div class="command-section">
        <div class="command-header">
          <h2>Complete File</h2>
          <div class="action-buttons">
            <button class="copy-btn" data-code-key="complete">Copy Complete Code</button>
            <button class="download-btn" data-code-key="complete" data-filename="${V}">Download ${V}</button>
          </div>
        </div>
        <div class="command-content">
          <p style="margin: 0; padding: 15px; color: #9cdcfe;">Includes shared transform code and all generated drawing functions.</p>
        </div>
      </div>
    `,pe=`
      <div class="shared-code-section drawing-code-section">
        <div class="shared-code-header">
          <h2>Drawing Code</h2>
          <div class="action-buttons">
            <button class="copy-btn" data-code-key="drawing">Copy Drawing Code</button>
            <button class="download-btn" data-code-key="drawing" data-filename="${q}">Download ${q}</button>
          </div>
        </div>
        <div class="shared-code-content">
          <pre><code>${H(A)}</code></pre>
        </div>
      </div>
    `,ge=G.length>0?`
	      <div class="command-section">
	        <div class="command-header">
	          <h2>Per-file Drawing Downloads</h2>
        </div>
        <div class="command-content">
          <div class="command-content-inner">
            <div class="per-file-actions">
	              ${G.map(u=>`
	                <div class="per-file-action-row">
	                  <div class="per-file-action-label">${H(u.sourceFileName)}</div>
	                  <div class="action-buttons action-buttons-start">
	                    <button class="copy-btn" data-code-key="${u.codeKey}">Copy ${H(u.fileName)}</button>
	                    <button class="download-btn" data-code-key="${u.codeKey}" data-filename="${u.fileName}">Download ${H(u.fileName)}</button>
	                  </div>
	                </div>
	              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `:"",me=`
      <div class="shared-code-section">
        <div class="shared-code-header">
          <h2>Shared Code</h2>
          <div class="action-buttons">
            <button class="copy-btn" data-code-key="shared">Copy Shared Code</button>
            <button class="download-btn" data-code-key="shared" data-filename="${Z}">Download ${Z}</button>
          </div>
        </div>
        <div class="shared-code-content">
          <pre><code>${H(ne)}</code></pre>
        </div>
      </div>
    `,_e=s?`
      <div class="combined-preview-section output">
        <div class="combined-preview-header">
          <h2>All paths by file</h2>
        </div>
        <div class="combined-preview-grid">
          ${g.map(u=>{const h=_.get(u.fileIndex);return!h||h.pathsData.length===0?"":`
            <div class="combined-preview-file">
              <h3>${H(h.fileName)}</h3>
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
    `,Oe=`
      <div class="shape-nav">
        <h3>Shapes</h3>
        <ul class="shape-nav-list">
          ${te.map((u,h)=>`
            <li>
              <button class="shape-nav-link" data-target="shape-section-${h}">${H(u)}</button>
            </li>
          `).join("")}
        </ul>
      </div>
    `;K.innerHTML=Oe+he+pe+ge+me+_e+N,s?g.forEach(u=>{const h=_.get(u.fileIndex);!h||h.pathsData.length===0||Te(h.pathsData,h.shapeIds,h.previewId,h.shapes)}):Te(k,D,"preview-all",E),k.forEach((u,h)=>{et(u,`preview-${h}`,E[h],P)}),ce=ft(),K.querySelectorAll(".download-btn[data-code-key]").forEach(u=>{u.addEventListener("click",()=>{const h=u.dataset.codeKey,I=u.dataset.filename;if(!h||!I)return;const F=oe[h];if(!F)return;const z=new Blob([F],{type:"text/plain"}),O=URL.createObjectURL(z),xe=document.createElement("a");xe.href=O,xe.download=I,xe.click(),URL.revokeObjectURL(O);const Be=u.textContent;u.textContent="Downloaded!",setTimeout(()=>{u.textContent=Be},2e3)})}),K.querySelectorAll(".copy-btn").forEach(u=>{u.addEventListener("click",h=>{const I=h.currentTarget,F=I.dataset.codeKey;let z="";F?z=oe[F]||"":z=I.closest(".path-section")?.querySelector("code")?.textContent||"",z&&navigator.clipboard.writeText(z).then(()=>{const O=I.textContent;I.textContent="Copied!",setTimeout(()=>{I.textContent=O},2e3)})})})}function ft(){const e=Array.from(K.querySelectorAll(".shape-nav-link"));if(e.length===0)return()=>{};const t=e.map(l=>{const a=l.dataset.target;return a?document.getElementById(a):null}).filter(l=>l!==null);if(t.length===0)return()=>{};const s=l=>{e.forEach(a=>{a.classList.toggle("is-active",a.dataset.target===l.id)})},r=()=>{const l=window.innerHeight/2;let a=t[0],i=Number.POSITIVE_INFINITY;t.forEach(m=>{const C=m.getBoundingClientRect(),M=C.top+C.height/2,P=Math.abs(M-l);P<i&&(i=P,a=m)}),s(a)},n=l=>{const i=l.currentTarget.dataset.target;if(!i)return;const m=document.getElementById(i);m&&m.scrollIntoView({behavior:"smooth",block:"center"})};e.forEach(l=>{l.addEventListener("click",n)});let o=!1;const c=()=>{o||(o=!0,window.requestAnimationFrame(()=>{o=!1,r()}))};return window.addEventListener("scroll",c,{passive:!0}),window.addEventListener("resize",c),r(),()=>{e.forEach(l=>{l.removeEventListener("click",n)}),window.removeEventListener("scroll",c),window.removeEventListener("resize",c)}}
