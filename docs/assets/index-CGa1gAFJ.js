(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}})();function Ce(e){const t=[],o=/([MLHVCSQTAZmlhvcsqtaz])\s*([^MLHVCSQTAZmlhvcsqtaz]*)/g;let r,n=0,s=0,a=0,d=0,i="",c=null,p=null;const C=()=>{c=null,p=null},M=N=>{const x=/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g;return(N.match(x)||[]).map(Number)};for(;(r=o.exec(e))!==null;){const N=r[1],x=N===N.toLowerCase(),y=N.toUpperCase(),f=M(r[2]);if(y==="M"){for(let u=0;u+1<f.length;u+=2){const g=x?n+f[u]:f[u],b=x?s+f[u+1]:f[u+1];u===0?(t.push({type:"M",x:g,y:b}),a=g,d=b):t.push({type:"L",x:g,y:b}),n=g,s=b}C(),i=f.length>2?"L":"M"}else if(y==="L"){for(let u=0;u+1<f.length;u+=2){const g=x?n+f[u]:f[u],b=x?s+f[u+1]:f[u+1];t.push({type:"L",x:g,y:b}),n=g,s=b}C(),i="L"}else if(y==="H"){for(let u=0;u<f.length;u++){const g=x?n+f[u]:f[u];t.push({type:"L",x:g,y:s}),n=g}C(),i="L"}else if(y==="V"){for(let u=0;u<f.length;u++){const g=x?s+f[u]:f[u];t.push({type:"L",x:n,y:g}),s=g}C(),i="L"}else if(y==="C")for(let u=0;u+5<f.length;u+=6){const g=x?n+f[u]:f[u],b=x?s+f[u+1]:f[u+1],m=x?n+f[u+2]:f[u+2],$=x?s+f[u+3]:f[u+3],w=x?n+f[u+4]:f[u+4],v=x?s+f[u+5]:f[u+5];t.push({type:"C",x1:g,y1:b,x2:m,y2:$,x:w,y:v}),n=w,s=v,c=m,p=$,i="C"}else if(y==="S")for(let u=0;u+3<f.length;u+=4){let g=n,b=s;(i==="C"||i==="S")&&c!==null&&p!==null&&(g=n*2-c,b=s*2-p);const m=x?n+f[u]:f[u],$=x?s+f[u+1]:f[u+1],w=x?n+f[u+2]:f[u+2],v=x?s+f[u+3]:f[u+3];t.push({type:"C",x1:g,y1:b,x2:m,y2:$,x:w,y:v}),n=w,s=v,c=m,p=$,i="S"}else y==="Z"?(t.push({type:"Z"}),n=a,s=d,C(),i="Z"):(C(),i=y)}return t}function U(e){let t="",o=e;for(;o>=0;)t=String.fromCharCode(65+o%26)+t,o=Math.floor(o/26)-1;return t}function j(e,t,o){const r=(e*t).toFixed(o);return parseFloat(r).toString()}function Oe(e){const{vectorFormat:t,language:o,processingVector:r="PVector",instanceMode:n=!1}=e,s=o==="typescript",a=t==="Processing",d=a&&r==="Vec2D",i=n&&t==="createVector";if(a){const M=d?"Vec2D":"PVector";return`${d?`import toxi.geom.*;

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
}`;const c=i?"p.createVector":"createVector",p=s?"p5.Vector":"",C=i?s?"p: any":"p":"";return`// Transform configuration
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

function applyTransform(${C?C+", ":""}v${s?`: ${p}`:""})${s?`: ${p}`:""} {
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

	return ${c}(x, y);
}

function applyTransformScalar(value${s?": number":""}, axis${s?": 'x' | 'y' | 'avg'":""} = 'avg')${s?": number":""} {
	if (axis === 'x') {
		return value * transformConfig.scaleX;
	}
	if (axis === 'y') {
		return value * transformConfig.scaleY;
	}
	return value * ((Math.abs(transformConfig.scaleX) + Math.abs(transformConfig.scaleY)) * 0.5);
}`}function Be(e,t){const{vectorFormat:o,language:r,instanceMode:n=!1}=t,s=r==="typescript",a=o==="Processing",d=n&&(o==="createVector"||o==="Vec");return a?`void ${e}() {`:`function ${e}(${d?s?"p: any":"p":""})${s?": void":""} {`}function Te(e){const{vectorFormat:t,instanceMode:o=!1}=e;return o&&(t==="createVector"||t==="Vec")?"p.":""}function we(){return{minX:Number.POSITIVE_INFINITY,minY:Number.POSITIVE_INFINITY,maxX:Number.NEGATIVE_INFINITY,maxY:Number.NEGATIVE_INFINITY}}function oe(e,t,o){e.minX=Math.min(e.minX,t),e.minY=Math.min(e.minY,o),e.maxX=Math.max(e.maxX,t),e.maxY=Math.max(e.maxY,o)}function Re(e){return Number.isFinite(e.minX)&&Number.isFinite(e.minY)&&Number.isFinite(e.maxX)&&Number.isFinite(e.maxY)}function je(e){const t=[];let o=[],r=!1,n=we();const s=()=>{if(o.length===0)return;const a=Re(n)?{...n}:{minX:0,minY:0,maxX:0,maxY:0};t.push({commands:o,closed:r,bounds:a}),o=[],r=!1,n=we()};return e.forEach(a=>{if(a.type==="M"){s(),o.push(a),oe(n,a.x,a.y);return}if(a.type==="L"){o.length===0&&o.push({type:"M",x:a.x,y:a.y}),o.push(a),oe(n,a.x,a.y);return}if(a.type==="C"){if(o.length===0)return;o.push(a),oe(n,a.x1,a.y1),oe(n,a.x2,a.y2),oe(n,a.x,a.y);return}a.type==="Z"&&(r=!0,s())}),s(),t}function qe(e,t){return e.bounds.minX>=t.minX&&e.bounds.maxX<=t.maxX&&e.bounds.minY>=t.minY&&e.bounds.maxY<=t.maxY}function He(e,t,o,r,n,s,a){const d=t.vectorFormat==="Processing",i=Te(t),c=u=>j(u,o,r),p=[],C=[],M="'x'",N="'y'",x=d?"'a'":"'avg'",y=(u,g,b)=>{const m=`${a}${s}(${c(g)}, ${c(b)}))`;d?p.push(`${n} ${u} = ${m};`):p.push(`const ${u} = ${m};`)},f=(u,g,b)=>{const m=`applyTransformScalar(${c(g)}, ${b})`;d?p.push(`float ${u} = ${m};`):p.push(`const ${u} = ${m};`)};if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?null:(y("p1",e.x1,e.y1),y("p2",e.x2,e.y2),C.push(`${i}line(p1.x, p1.y, p2.x, p2.y);`),{declarations:p,drawCalls:C});if(e.kind==="polyline"||e.kind==="polygon"){const u=e.points||[];return u.length<2?null:(u.forEach(([g,b],m)=>{y(`p${m}`,g,b)}),C.push(`${i}beginShape();`),u.forEach((g,b)=>{C.push(`${i}vertex(p${b}.x, p${b}.y);`)}),C.push(`${i}endShape(${e.kind==="polygon"?"CLOSE":"OPEN"});`),{declarations:p,drawCalls:C})}if(e.kind==="rect"){if(e.x==null||e.y==null||e.width==null||e.height==null)return null;y("rectPos",e.x,e.y),f("rectW",e.width,M),f("rectH",e.height,N);const u=e.rx||0,g=e.ry||0;if(u>0||g>0){if(Math.abs(u-g)>1e-9)return null;f("rectR",u,x),C.push(`${i}rect(rectPos.x, rectPos.y, rectW, rectH, rectR);`)}else C.push(`${i}rect(rectPos.x, rectPos.y, rectW, rectH);`);return{declarations:p,drawCalls:C}}return e.kind==="circle"?e.cx==null||e.cy==null||e.r==null?null:(y("circleCenter",e.cx,e.cy),f("circleDiameter",e.r*2,x),C.push(`${i}circle(circleCenter.x, circleCenter.y, circleDiameter);`),{declarations:p,drawCalls:C}):e.kind==="ellipse"?e.cx==null||e.cy==null||e.rx==null||e.ry==null?null:(y("ellipseCenter",e.cx,e.cy),f("ellipseW",e.rx*2,M),f("ellipseH",e.ry*2,N),C.push(`${i}ellipse(ellipseCenter.x, ellipseCenter.y, ellipseW, ellipseH);`),{declarations:p,drawCalls:C}):null}function We(e,t,o,r,n){const{vectorFormat:s,coordMultiplier:a,precision:d,processingVector:i="PVector",instanceMode:c=!1}=t,p=s==="Processing",C=p&&i==="Vec2D",M=c&&(s==="createVector"||s==="Vec"),N=n||`drawPath${o+1}`,x=p?C?"new Vec2D":"new PVector":s==="Vec"?"new Vec":c&&s==="createVector"?"p.createVector":"createVector",y=[],f=p?C?"Vec2D":"PVector":"const",u=M&&s==="createVector"?"applyTransform(p, ":"applyTransform(",g=Oe(t),b=Be(N,t),m=Te(t);if(r?.primitive){const k=He(r.primitive,t,a,d,f,x,u);if(k){const D=k.declarations.length>0?`${k.declarations.map(Y=>`	${Y}`).join(`
`)}

`:"",L=k.drawCalls.map(Y=>`	${Y}`).join(`
`),R=`${b}
${D}${L}
}`;return{sharedCode:g,pathCode:R}}}const $=Ce(e),w=je($);let v=0;const S=k=>{const D=[];return k.commands.forEach(L=>{if(L.type==="M"||L.type==="L"){const R=U(v),Y=j(L.x,a,d),H=j(L.y,a,d);y.push(`${R} = ${u}${x}(${Y}, ${H}))`),D.push(`${m}vertex(${R}.x, ${R}.y);`),v++;return}if(L.type==="C"){const R=U(v-1),Y=U(v),H=R+"c",Z="c"+Y,ae=j(L.x1,a,d),K=j(L.y1,a,d),ne=j(L.x2,a,d),he=j(L.y2,a,d),ge=j(L.x,a,d),me=j(L.y,a,d);y.push(`${H} = ${u}${x}(${ae}, ${K}))`),y.push(`${Z} = ${u}${x}(${ne}, ${he}))`),y.push(`${Y} = ${u}${x}(${ge}, ${me}))`),D.push(`${m}bezierVertex(${H}.x, ${H}.y, ${Z}.x, ${Z}.y, ${Y}.x, ${Y}.y);`),v++}}),D};let E=[],P=!1,z=null;const T=[],V=()=>{E.length!==0&&(T.push([`${m}beginShape();`,...E,`${m}endShape(${P?"CLOSE":"OPEN"});`].join(`
`)),E=[],P=!1,z=null)};w.forEach(k=>{const D=S(k);if(D.length===0)return;if(E.length===0){E=D,P=k.closed,z=k.bounds;return}if(P&&k.closed&&z!==null&&qe(k,z)){E.push(`${m}beginContour();`),E.push(...D),E.push(`${m}endContour();`);return}V(),E=D,P=k.closed,z=k.bounds}),V();const J=y.length>0?`	${f} ${y.join(`,
		`)};`:"",ee=T.map(k=>k.split(`
`).map(D=>`	${D}`).join(`
`)).join(`

`),re=J?`${J}

`:"",te=ee?`${ee}
`:"",fe=`${b}
${re}${te}}`;return{sharedCode:g,pathCode:fe}}function ie(e,t,o="drawAllPaths"){const{vectorFormat:r,language:n,instanceMode:s=!1}=t,a=n==="typescript",d=r==="Processing",i=s&&(r==="createVector"||r==="Vec"),c=e.map(p=>d?`	${p}();`:i?`	${p}(p);`:`	${p}();`).join(`
`);return d?`
void ${o}() {
${c}
}`:`
function ${o}(${i?a?"p: any":"p":""})${a?": void":""} {
${c}
}`}function B(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function Se(){return{minX:Number.POSITIVE_INFINITY,minY:Number.POSITIVE_INFINITY,maxX:Number.NEGATIVE_INFINITY,maxY:Number.NEGATIVE_INFINITY}}function se(e,t,o){e.minX=Math.min(e.minX,t),e.minY=Math.min(e.minY,o),e.maxX=Math.max(e.maxX,t),e.maxY=Math.max(e.maxY,o)}function Ze(e){return Number.isFinite(e.minX)&&Number.isFinite(e.minY)&&Number.isFinite(e.maxX)&&Number.isFinite(e.maxY)}function Ke(e){const t=[];let o=[],r=!1,n=Se();const s=()=>{if(o.length===0)return;const a=Ze(n)?{...n}:{minX:0,minY:0,maxX:0,maxY:0};t.push({commands:o,closed:r,bounds:a}),o=[],r=!1,n=Se()};return e.forEach(a=>{if(a.type==="M"){s(),o.push(a),se(n,a.x,a.y);return}if(a.type==="L"){o.length===0&&o.push({type:"M",x:a.x,y:a.y}),o.push(a),se(n,a.x,a.y);return}if(a.type==="C"){if(o.length===0)return;o.push(a),se(n,a.x1,a.y1),se(n,a.x2,a.y2),se(n,a.x,a.y);return}a.type==="Z"&&(r=!0,s())}),s(),t}function Ge(e,t){return e.bounds.minX>=t.minX&&e.bounds.maxX<=t.maxX&&e.bounds.minY>=t.minY&&e.bounds.maxY<=t.maxY}function xe(e,t,o){t.commands.forEach(r=>{if(r.type==="M"||r.type==="L"){const n=o(r.x,r.y);e.vertex(n.x,n.y);return}if(r.type==="C"){const n=o(r.x1,r.y1),s=o(r.x2,r.y2),a=o(r.x,r.y);e.bezierVertex(n.x,n.y,s.x,s.y,a.x,a.y)}})}function Pe(e,t,o){const r=Ke(t).filter(a=>a.commands.length>0);if(r.length===0)return;let n=null;const s=()=>{n&&(e.endShape(n.closed?e.CLOSE:e.OPEN),n=null)};r.forEach(a=>{if(!n){e.beginShape(),xe(e,a,o),n=a;return}if(n.closed&&a.closed&&Ge(a,n.bounds)){e.beginContour(),xe(e,a,o),e.endContour();return}s(),e.beginShape(),xe(e,a,o),n=a}),s()}function ve(e){const t=[];let o=0;return e.forEach(r=>{if(r.type==="M"||r.type==="L"){const n=U(o);t.push({name:n,x:r.x,y:r.y}),o++}else if(r.type==="C"){const n=U(o-1),s=U(o),a=n+"c",d="c"+s;t.push({name:a,x:r.x1,y:r.y1}),t.push({name:d,x:r.x2,y:r.y2}),t.push({name:s,x:r.x,y:r.y}),o++}}),t}function ke(e){const t=e.map(d=>d.x),o=e.map(d=>d.y),r=Math.min(...t),n=Math.min(...o),s=Math.max(...t),a=Math.max(...o);return{minX:r,minY:n,maxX:s,maxY:a,width:s-r,height:a-n}}function ue(e){if(e.length===0)return null;const t=e.reduce((o,r)=>({x:o.x+r.x,y:o.y+r.y}),{x:0,y:0});return{x:t.x/e.length,y:t.y/e.length}}function Ue(e){if(e.length<3)return ue(e.map(([n,s])=>({x:n,y:s})));let t=0,o=0,r=0;for(let n=0;n<e.length;n++){const[s,a]=e[n],[d,i]=e[(n+1)%e.length],c=s*i-d*a;t+=c,o+=(s+d)*c,r+=(a+i)*c}return Math.abs(t)<1e-9?ue(e.map(([n,s])=>({x:n,y:s}))):{x:o/(3*t),y:r/(3*t)}}function Fe(e){if(!e)return null;if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?null:{x:(e.x1+e.x2)/2,y:(e.y1+e.y2)/2};if(e.kind==="polyline"){const t=e.points||[];return ue(t.map(([o,r])=>({x:o,y:r})))}return e.kind==="polygon"?Ue(e.points||[]):e.kind==="rect"?e.x==null||e.y==null||e.width==null||e.height==null?null:{x:e.x+e.width/2,y:e.y+e.height/2}:e.kind==="circle"?e.cx==null||e.cy==null?null:{x:e.cx,y:e.cy}:e.kind==="ellipse"?e.cx==null||e.cy==null?null:{x:e.cx,y:e.cy}:null}function Qe(e){return e?e.kind==="line"?"midpoint":e.kind==="polyline"||e.kind==="polygon"?"centroid":"center":"reference"}function Je(e){if(!e)return[];if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?[]:[{point:{x:e.x1,y:e.y1},label:"start"},{point:{x:e.x2,y:e.y2},label:"end"}];const t=Fe(e);return t?[{point:t,label:Qe(e)}]:[]}function et(e,t,o,r=!0){const n=Ce(e),s=ve(n),a=Je(o?.primitive),d=!!o?.primitive;if(s.length===0)return;const i=ke(s);new window.p5(c=>{const N=i.width>0?440/i.width:1,x=i.height>0?440/i.height:1,y=Math.min(N,x),f=i.width*y,u=i.height*y,g=(500-f)/2-i.minX*y,b=(500-u)/2-i.minY*y;c.setup=()=>{c.createCanvas(500,500),c.noLoop()},c.draw=()=>{c.background(30);const m=(w,v)=>({x:w*y+g,y:v*y+b});c.stroke(60),c.strokeWeight(1);for(let w=0;w<=500;w+=50)c.line(w,0,w,500),c.line(0,w,500,w);const $=m(0,0);if(c.stroke(255,100,100),c.strokeWeight(2),c.line(0,$.y,500,$.y),c.stroke(100,255,100),c.strokeWeight(2),c.line($.x,0,$.x,500),c.noStroke(),c.fill(255,200,0),c.circle($.x,$.y,12),c.fill(255),c.textAlign(c.LEFT,c.BOTTOM),c.textSize(14),c.textStyle(c.BOLD),c.text("(0, 0)",$.x+8,$.y-8),c.fill(100,150,255,50),c.stroke(100,150,255),c.strokeWeight(2),Pe(c,n,m),d&&a.length>0)a.forEach(({point:w,label:v})=>{const S=m(w.x,w.y);c.noStroke(),c.fill(255,220,120),c.circle(S.x,S.y,12),c.fill(255),c.textAlign(c.CENTER,c.CENTER),c.textSize(12),c.textStyle(c.BOLD),c.text(v,S.x,S.y-16),r&&(c.textSize(9),c.textStyle(c.NORMAL),c.fill(200),c.text(`(${w.x.toFixed(1)}, ${w.y.toFixed(1)})`,S.x,S.y+16))});else{c.stroke(255,200,100,100),c.strokeWeight(1);let w=0;n.forEach(v=>{if(v.type==="C"){const S=s.find(T=>T.name===String.fromCharCode(65+w-1)),E=s.find(T=>T.name===S?.name+"c"),P=s.find(T=>T.name==="c"+String.fromCharCode(65+w)),z=s.find(T=>T.name===String.fromCharCode(65+w));if(S&&E){const T=m(S.x,S.y),V=m(E.x,E.y);c.line(T.x,T.y,V.x,V.y)}if(P&&z){const T=m(P.x,P.y),V=m(z.x,z.y);c.line(T.x,T.y,V.x,V.y)}w++}else(v.type==="M"||v.type==="L")&&w++}),s.forEach(v=>{const S=m(v.x,v.y),E=v.name.includes("c");c.noStroke(),E?(c.fill(255,200,100),c.circle(S.x,S.y,8)):(c.fill(100,255,150),c.circle(S.x,S.y,10)),c.fill(255),c.noStroke(),c.textAlign(c.CENTER,c.CENTER),c.textSize(12),c.textStyle(c.BOLD);const P=15;c.text(v.name,S.x,S.y-P),r&&(c.textSize(9),c.textStyle(c.NORMAL),c.fill(200),c.text(`(${v.x.toFixed(1)}, ${v.y.toFixed(1)})`,S.x,S.y+P+3))})}c.fill(200),c.noStroke(),c.textAlign(c.LEFT,c.TOP),c.textSize(11),c.text(`Scale: ${y.toFixed(3)}x`,10,10),c.text(`Size: ${i.width.toFixed(1)} × ${i.height.toFixed(1)}`,10,25)}},t)}function Ie(e,t,o,r=[]){const n=e.map((i,c)=>({id:t[c]??c+1,commands:Ce(i),primitive:r[c]?.primitive})).filter(i=>i.commands.length>0),s=n.flatMap(i=>ve(i.commands));if(s.length===0)return;const a=ke(s),d=n.map(()=>{const i=80+Math.floor(Math.random()*176),c=80+Math.floor(Math.random()*176),p=80+Math.floor(Math.random()*176);return{stroke:[i,c,p]}});new window.p5(i=>{const M=a.width>0?440/a.width:1,N=a.height>0?440/a.height:1,x=Math.min(M,N),y=a.width*x,f=a.height*x,u=(500-y)/2-a.minX*x,g=(500-f)/2-a.minY*x,b=(m,$)=>({x:m*x+u,y:$*x+g});i.setup=()=>{i.createCanvas(500,500),i.noLoop()},i.draw=()=>{i.background(30),i.stroke(60),i.strokeWeight(1);for(let $=0;$<=500;$+=50)i.line($,0,$,500),i.line(0,$,500,$);const m=b(0,0);i.stroke(255,100,100),i.strokeWeight(2),i.line(0,m.y,500,m.y),i.stroke(100,255,100),i.strokeWeight(2),i.line(m.x,0,m.x,500),i.noStroke(),i.fill(255,200,0),i.circle(m.x,m.y,10),n.forEach(($,w)=>{const v=$.commands,S=d[w];i.noFill(),i.stroke(S.stroke[0],S.stroke[1],S.stroke[2]),i.strokeWeight(2),Pe(i,v,b)}),i.noStroke(),i.fill(255),i.textAlign(i.CENTER,i.CENTER),i.textSize(11),i.textStyle(i.BOLD),n.forEach($=>{const w=Fe($.primitive),v=ue(ve($.commands).map(P=>({x:P.x,y:P.y}))),S=w??v;if(!S)return;const E=b(S.x,S.y);i.text(String($.id),E.x,E.y)}),i.fill(200),i.noStroke(),i.textAlign(i.LEFT,i.TOP),i.textSize(11),i.text(`Paths: ${n.length}`,10,10),i.text(`Scale: ${x.toFixed(3)}x`,10,25),i.text(`Size: ${a.width.toFixed(1)} x ${a.height.toFixed(1)}`,10,40)}},o)}const de=.5522847498307936;function A(e,t=0){if(e==null)return t;const o=Number.parseFloat(e);return Number.isFinite(o)?o:t}function tt(e){if(!e)return[];const t=/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g,o=(e.match(t)||[]).map(Number),r=[];for(let n=0;n+1<o.length;n+=2)r.push([o[n],o[n+1]]);return r}function nt(e){const t=A(e.getAttribute("x1"),0),o=A(e.getAttribute("y1"),0),r=A(e.getAttribute("x2"),0),n=A(e.getAttribute("y2"),0);return{pathData:`M ${t} ${o} L ${r} ${n}`,sourceIndex:0,primitive:{kind:"line",x1:t,y1:o,x2:r,y2:n}}}function Ee(e,t){const o=tt(e.getAttribute("points"));if(o.length<2)return null;const[r,n]=o[0],s=o.slice(1).map(([a,d])=>`L ${a} ${d}`).join(" ");return{pathData:`M ${r} ${n} ${s}${t?" Z":""}`,sourceIndex:0,primitive:{kind:t?"polygon":"polyline",points:o}}}function ot(e,t,o,r,n,s){if(n===0||s===0)return`M ${e} ${t} L ${e+o} ${t} L ${e+o} ${t+r} L ${e} ${t+r} Z`;const a=n*de,d=s*de,i=e+o,c=t+r;return[`M ${e+n} ${t}`,`L ${i-n} ${t}`,`C ${i-n+a} ${t} ${i} ${t+s-d} ${i} ${t+s}`,`L ${i} ${c-s}`,`C ${i} ${c-s+d} ${i-n+a} ${c} ${i-n} ${c}`,`L ${e+n} ${c}`,`C ${e+n-a} ${c} ${e} ${c-s+d} ${e} ${c-s}`,`L ${e} ${t+s}`,`C ${e} ${t+s-d} ${e+n-a} ${t} ${e+n} ${t}`,"Z"].join(" ")}function st(e){const t=A(e.getAttribute("x"),0),o=A(e.getAttribute("y"),0),r=A(e.getAttribute("width"),0),n=A(e.getAttribute("height"),0);if(r<=0||n<=0)return null;const s=e.getAttribute("rx"),a=e.getAttribute("ry");let d=A(s,0),i=A(a,0);return s!=null&&a==null&&(i=d),a!=null&&s==null&&(d=i),d=Math.max(0,Math.min(d,r/2)),i=Math.max(0,Math.min(i,n/2)),{pathData:ot(t,o,r,n,d,i),sourceIndex:0,primitive:{kind:"rect",x:t,y:o,width:r,height:n,rx:d,ry:i}}}function Me(e,t,o,r){const n=o*de,s=r*de;return[`M ${e+o} ${t}`,`C ${e+o} ${t+s} ${e+n} ${t+r} ${e} ${t+r}`,`C ${e-n} ${t+r} ${e-o} ${t+s} ${e-o} ${t}`,`C ${e-o} ${t-s} ${e-n} ${t-r} ${e} ${t-r}`,`C ${e+n} ${t-r} ${e+o} ${t-s} ${e+o} ${t}`,"Z"].join(" ")}function rt(e){const t=A(e.getAttribute("cx"),0),o=A(e.getAttribute("cy"),0),r=A(e.getAttribute("r"),0);return r<=0?null:{pathData:Me(t,o,r,r),sourceIndex:0,primitive:{kind:"circle",cx:t,cy:o,r}}}function at(e){const t=A(e.getAttribute("cx"),0),o=A(e.getAttribute("cy"),0),r=A(e.getAttribute("rx"),0),n=A(e.getAttribute("ry"),0);return r<=0||n<=0?null:{pathData:Me(t,o,r,n),sourceIndex:0,primitive:{kind:"ellipse",cx:t,cy:o,rx:r,ry:n}}}function it(e){const o=Array.from(e.querySelectorAll("path,rect,circle,ellipse,line,polyline,polygon")),r=[];return o.forEach((n,s)=>{const a=s+1,d=n.tagName.toLowerCase();if(d==="path"){const c=n.getAttribute("d");c&&r.push({pathData:c,sourceIndex:a});return}let i=null;d==="line"?i=nt(n):d==="polyline"?i=Ee(n,!1):d==="polygon"?i=Ee(n,!0):d==="rect"?i=st(n):d==="circle"?i=rt(n):d==="ellipse"&&(i=at(n)),i&&(i.sourceIndex=a,r.push(i))}),r}const W=document.getElementById("dropZone"),Le=document.getElementById("fileInput"),q=document.getElementById("functionPrefix"),G=document.getElementById("output");let O=[],ce=null,ye=0;function Ye(e){const t=e.lastIndexOf(".");return t<=0?e:e.slice(0,t)}function be(e){const t=e.trim().replace(/[^a-zA-Z0-9_]/g,"_").replace(/_+/g,"_").replace(/^_+|_+$/g,"");return t.length===0?"shape":/^[a-zA-Z_]/.test(t)?t:`_${t}`}function Ne(e){return be(e)}function ct(e){const t=new Set,o=new Map;return e.map(r=>{if(!t.has(r))return t.add(r),o.set(r,1),r;let n=(o.get(r)||1)+1,s=`${r}_${n}`;for(;t.has(s);)n+=1,s=`${r}_${n}`;return o.set(r,n),t.add(s),s})}function lt(e,t,o){return be(`${e}_${t||"path"}${o}`)}function ut(e){return be(`${e}_drawAllPaths`)}function $e(e){const t=Ye(e.name).trim();return t.length>0?t:"shape"}function dt(e,t){const o=Ye(e).trim();if(t==="pde"){const n=o.replace(/[^a-zA-Z0-9_]/g,"_").replace(/_+/g,"_").replace(/^_+|_+$/g,"");return n.length===0?"drawing":/^[0-9]/.test(n)?`_${n}`:n}const r=o.replace(/[^a-zA-Z0-9._-]/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"");return r.length>0?r:"drawing"}function le(e,t){if(t==="pde"){const o=e.replace(/[^a-zA-Z0-9_]/g,"_").replace(/_+/g,"_").replace(/^_+|_+$/g,""),r=o.length>0?o:"drawing";return`${/^[0-9]/.test(r)?`_${r}`:r}.pde`}return`${e}.${t}`}function Ae(e){return e.type==="image/svg+xml"||e.name.toLowerCase().endsWith(".svg")}function De(e){return Array.from(e).filter(Ae)}W.addEventListener("click",()=>Le.click());document.querySelectorAll('input[name="vectorFormat"]').forEach(e=>{e.addEventListener("change",t=>{const o=t.target,r=document.getElementById("processingVectorOption"),n=document.getElementById("instanceModeOption");r&&(r.style.display=o.value==="Processing"?"flex":"none"),n&&(n.style.display=o.value==="Processing"?"none":"flex"),O.length>0&&Q(O)})});document.querySelectorAll('input[name="language"], input[name="processingVector"], input[name="sortMode"], #instanceMode, #showCoordinates').forEach(e=>{e.addEventListener("change",()=>{O.length>0&&Q(O)})});document.querySelectorAll("#coordMultiplier, #precision").forEach(e=>{e.addEventListener("change",()=>{O.length>0&&Q(O)})});q&&q.addEventListener("input",()=>{O.length>0&&Q(O)});W.addEventListener("dragover",e=>{e.preventDefault(),W.classList.add("dragover")});W.addEventListener("dragleave",()=>{W.classList.remove("dragover")});W.addEventListener("drop",e=>{e.preventDefault(),W.classList.remove("dragover");const t=e.dataTransfer?.files;if(!t){alert("Please drop at least one SVG file");return}const o=De(t);if(o.length===0){alert("Please drop at least one valid SVG file");return}Q(o)});Le.addEventListener("change",e=>{const t=e.target.files;if(!t)return;const o=De(t);o.length!==0&&Q(o)});async function Q(e){const t=e.filter(Ae);if(t.length===0)return;const o=t.length>1,r=O.length===1&&t.length===1&&O[0]===t[0];q&&(q.disabled=o,o?(q.value="Auto per file",q.title="Disabled for multi-file imports. Filename prefixes are used automatically."):(q.title="",r||(q.value=$e(t[0])))),O=[...t];const n=++ye;let s=[];try{s=await Promise.all(t.map(async(l,h)=>{const I=await l.text(),X=new DOMParser().parseFromString(I,"image/svg+xml");return{file:l,fileIndex:h,shapes:it(X)}}))}catch{if(n!==ye)return;G.innerHTML='<div class="output"><p>Could not read one or more SVG files.</p></div>';return}if(n!==ye)return;ce&&(ce(),ce=null);const a=s.filter(l=>l.shapes.length>0);if(a.length===0){G.innerHTML='<div class="output"><p>No supported drawable elements found (path, line, polyline, polygon, rect, circle, ellipse).</p></div>';return}const d=document.querySelector('input[name="vectorFormat"]:checked')?.value||"Vec",i=document.querySelector('input[name="language"]:checked')?.value||"javascript",c=parseFloat(document.getElementById("coordMultiplier")?.value)||1,p=parseInt(document.getElementById("precision")?.value)||5,C=document.querySelector('input[name="processingVector"]:checked')?.value||"PVector",M=document.getElementById("instanceMode")?.checked||!1,N=document.getElementById("showCoordinates")?.checked??!0,x=document.querySelector('input[name="sortMode"]:checked')?.value||"primitive",y={vectorFormat:d,language:i,coordMultiplier:c,precision:p,processingVector:C,instanceMode:M},f=Ne(q?.value||$e(a[0].file)),u=o?ct(a.map(l=>Ne($e(l.file)))):[f],g=a.map((l,h)=>{const I=o?u[h]:f;return{file:l.file,fileIndex:l.fileIndex,filePrefix:I,drawAllFunctionName:ut(I)}}),b=[];let m=1;a.forEach((l,h)=>{const I=g[h];l.shapes.forEach((F,X)=>{b.push({fileIndex:l.fileIndex,fileName:l.file.name,shape:F,functionName:lt(I.filePrefix,F.primitive?.kind,X+1),globalId:m++})})});const $=[...b].sort((l,h)=>{if(x==="svg")return l.fileIndex!==h.fileIndex?l.fileIndex-h.fileIndex:l.shape.sourceIndex-h.shape.sourceIndex;const I=l.shape.primitive?.kind??"path",F=h.shape.primitive?.kind??"path";return I===F?l.fileIndex!==h.fileIndex?l.fileIndex-h.fileIndex:l.shape.sourceIndex-h.shape.sourceIndex:I.localeCompare(F)}),w=$.map(l=>l.functionName),v=new Map;$.forEach(l=>{const h=v.get(l.fileIndex)||[];h.push(l.functionName),v.set(l.fileIndex,h)});let S="",E="";const P=[],z=[],T=[],V=new Map,J=[],ee=new Map,re=[];$.forEach((l,h)=>{P.push(l.shape.pathData),z.push(l.globalId),T.push(l.shape),re.push(l.functionName);let I=V.get(l.fileIndex);I||(I={previewId:`preview-all-file-${l.fileIndex}`,fileName:l.fileName,pathsData:[],shapeIds:[],shapes:[]},V.set(l.fileIndex,I)),I.pathsData.push(l.shape.pathData),I.shapeIds.push(l.globalId),I.shapes.push(l.shape);const F=We(l.shape.pathData,y,h,l.shape,l.functionName);h===0&&(S=F.sharedCode),J.push(F.pathCode),ee.set(l.functionName,F.pathCode);const X=`preview-${h}`;E+=`
          <div class="output path-section" id="shape-section-${h}">
            <div class="path-header">
              <h2>${B(l.functionName)}</h2>
              <button class="copy-btn" data-path="${h}">Copy Code</button>
            </div>
            <p class="path-meta">${B(l.fileName)} · svg #${l.shape.sourceIndex}</p>
            <div class="content-grid">
              <div class="preview-container">
                <div id="${X}"></div>
              </div>
              <div class="code-container">
                <pre><code>${B(F.pathCode)}</code></pre>
              </div>
            </div>
          </div>
        `});const te=S.trim(),fe=J.join(`

`).trim(),k=[];let D="";if(o){const l=[];g.forEach(h=>{const I=v.get(h.fileIndex)||[];I.length!==0&&(l.push(h.drawAllFunctionName),k.push(ie(I,y,h.drawAllFunctionName).trim()))}),D=ie(l,y).trim()}else D=ie(w,y).trim();const L=[D,...k,fe].filter(l=>l.length>0).join(`

`),R=[te,L].filter(l=>l.length>0).join(`

`),Y=d==="Processing"?"pde":i==="typescript"?"ts":"js",H=le("draw-paths",Y),Z=le("draw-paths-drawing",Y),ae=le("draw-paths-shared",Y),K=[];o&&g.forEach(l=>{const h=v.get(l.fileIndex)||[];if(h.length===0)return;const I=ie(h,y,l.drawAllFunctionName).trim(),F=h.map(_=>ee.get(_)||"").filter(_=>_.length>0).join(`

`).trim(),X=[I,F].filter(_=>_.length>0).join(`

`);K.push({codeKey:`drawing-file-${l.filePrefix}`,code:X,drawAllFunctionName:l.drawAllFunctionName,fileName:le(`${dt(l.file.name,Y)}${Y==="pde"?"_":"-"}drawing`,Y),sourceFileName:l.file.name})});const ne={complete:R,drawing:L,shared:te};K.forEach(l=>{ne[l.codeKey]=l.code});const he=`
      <div class="command-section">
        <div class="command-header">
          <h2>Complete File</h2>
          <div class="action-buttons">
            <button class="copy-btn" data-code-key="complete">Copy Complete Code</button>
            <button class="download-btn" data-code-key="complete" data-filename="${H}">Download ${H}</button>
          </div>
        </div>
        <div class="command-content">
          <p style="margin: 0; padding: 15px; color: #9cdcfe;">Includes shared transform code and all generated drawing functions.</p>
        </div>
      </div>
    `,ge=`
      <div class="shared-code-section drawing-code-section">
        <div class="shared-code-header">
          <h2>Drawing Code</h2>
          <div class="action-buttons">
            <button class="copy-btn" data-code-key="drawing">Copy Drawing Code</button>
            <button class="download-btn" data-code-key="drawing" data-filename="${Z}">Download ${Z}</button>
          </div>
        </div>
        <div class="shared-code-content">
          <pre><code>${B(L)}</code></pre>
        </div>
      </div>
    `,me=K.length>0?`
	      <div class="command-section">
	        <div class="command-header">
	          <h2>Per-file Drawing Downloads</h2>
        </div>
        <div class="command-content">
          <div class="command-content-inner">
            <div class="per-file-actions">
	              ${K.map(l=>`
	                <div class="per-file-action-row">
	                  <div class="per-file-action-label">${B(l.sourceFileName)}</div>
	                  <div class="action-buttons action-buttons-start">
	                    <button class="copy-btn" data-code-key="${l.codeKey}">Copy ${B(l.fileName)}</button>
	                    <button class="download-btn" data-code-key="${l.codeKey}" data-filename="${l.fileName}">Download ${B(l.fileName)}</button>
	                  </div>
	                </div>
	              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `:"",Xe=`
      <div class="shared-code-section">
        <div class="shared-code-header">
          <h2>Shared Code</h2>
          <div class="action-buttons">
            <button class="copy-btn" data-code-key="shared">Copy Shared Code</button>
            <button class="download-btn" data-code-key="shared" data-filename="${ae}">Download ${ae}</button>
          </div>
        </div>
        <div class="shared-code-content">
          <pre><code>${B(te)}</code></pre>
        </div>
      </div>
    `,Ve=o?`
      <div class="combined-preview-section output">
        <div class="combined-preview-header">
          <h2>All paths by file</h2>
        </div>
        <div class="combined-preview-grid">
          ${g.map(l=>{const h=V.get(l.fileIndex);return!h||h.pathsData.length===0?"":`
            <div class="combined-preview-file">
              <h3>${B(h.fileName)}</h3>
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
    `,ze=`
      <div class="shape-nav">
        <h3>Shapes</h3>
        <ul class="shape-nav-list">
          ${re.map((l,h)=>`
            <li>
              <button class="shape-nav-link" data-target="shape-section-${h}">${B(l)}</button>
            </li>
          `).join("")}
        </ul>
      </div>
    `;G.innerHTML=ze+he+ge+me+Xe+Ve+E,o?g.forEach(l=>{const h=V.get(l.fileIndex);!h||h.pathsData.length===0||Ie(h.pathsData,h.shapeIds,h.previewId,h.shapes)}):Ie(P,z,"preview-all",T),P.forEach((l,h)=>{et(l,`preview-${h}`,T[h],N)}),ce=ft(),G.querySelectorAll(".download-btn[data-code-key]").forEach(l=>{l.addEventListener("click",()=>{const h=l.dataset.codeKey,I=l.dataset.filename;if(!h||!I)return;const F=ne[h];if(!F)return;const X=new Blob([F],{type:"text/plain"}),_=URL.createObjectURL(X),pe=document.createElement("a");pe.href=_,pe.download=I,pe.click(),URL.revokeObjectURL(_);const _e=l.textContent;l.textContent="Downloaded!",setTimeout(()=>{l.textContent=_e},2e3)})}),G.querySelectorAll(".copy-btn").forEach(l=>{l.addEventListener("click",h=>{const I=h.currentTarget,F=I.dataset.codeKey;let X="";F?X=ne[F]||"":X=I.closest(".path-section")?.querySelector("code")?.textContent||"",X&&navigator.clipboard.writeText(X).then(()=>{const _=I.textContent;I.textContent="Copied!",setTimeout(()=>{I.textContent=_},2e3)})})})}function ft(){const e=Array.from(G.querySelectorAll(".shape-nav-link"));if(e.length===0)return()=>{};const t=e.map(d=>{const i=d.dataset.target;return i?document.getElementById(i):null}).filter(d=>d!==null);if(t.length===0)return()=>{};const o=d=>{e.forEach(i=>{i.classList.toggle("is-active",i.dataset.target===d.id)})},r=()=>{const d=window.innerHeight/2;let i=t[0],c=Number.POSITIVE_INFINITY;t.forEach(p=>{const C=p.getBoundingClientRect(),M=C.top+C.height/2,N=Math.abs(M-d);N<c&&(c=N,i=p)}),o(i)},n=d=>{const c=d.currentTarget.dataset.target;if(!c)return;const p=document.getElementById(c);p&&p.scrollIntoView({behavior:"smooth",block:"center"})};e.forEach(d=>{d.addEventListener("click",n)});let s=!1;const a=()=>{s||(s=!0,window.requestAnimationFrame(()=>{s=!1,r()}))};return window.addEventListener("scroll",a,{passive:!0}),window.addEventListener("resize",a),r(),()=>{e.forEach(d=>{d.removeEventListener("click",n)}),window.removeEventListener("scroll",a),window.removeEventListener("resize",a)}}
