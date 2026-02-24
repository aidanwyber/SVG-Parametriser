(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();function oe(e){const t=[],s=/([MLHVCSQTAZmlhvcsqtaz])\s*([^MLHVCSQTAZmlhvcsqtaz]*)/g;let i,n=0,o=0,c=0,u=0,r="",a=null,y=null;const C=()=>{a=null,y=null},P=M=>{const h=/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g;return(M.match(h)||[]).map(Number)};for(;(i=s.exec(e))!==null;){const M=i[1],h=M===M.toLowerCase(),m=M.toUpperCase(),f=P(i[2]);if(m==="M"){for(let l=0;l+1<f.length;l+=2){const g=h?n+f[l]:f[l],S=h?o+f[l+1]:f[l+1];l===0?(t.push({type:"M",x:g,y:S}),c=g,u=S):t.push({type:"L",x:g,y:S}),n=g,o=S}C(),r=f.length>2?"L":"M"}else if(m==="L"){for(let l=0;l+1<f.length;l+=2){const g=h?n+f[l]:f[l],S=h?o+f[l+1]:f[l+1];t.push({type:"L",x:g,y:S}),n=g,o=S}C(),r="L"}else if(m==="H"){for(let l=0;l<f.length;l++){const g=h?n+f[l]:f[l];t.push({type:"L",x:g,y:o}),n=g}C(),r="L"}else if(m==="V"){for(let l=0;l<f.length;l++){const g=h?o+f[l]:f[l];t.push({type:"L",x:n,y:g}),o=g}C(),r="L"}else if(m==="C")for(let l=0;l+5<f.length;l+=6){const g=h?n+f[l]:f[l],S=h?o+f[l+1]:f[l+1],d=h?n+f[l+2]:f[l+2],p=h?o+f[l+3]:f[l+3],$=h?n+f[l+4]:f[l+4],b=h?o+f[l+5]:f[l+5];t.push({type:"C",x1:g,y1:S,x2:d,y2:p,x:$,y:b}),n=$,o=b,a=d,y=p,r="C"}else if(m==="S")for(let l=0;l+3<f.length;l+=4){let g=n,S=o;(r==="C"||r==="S")&&a!==null&&y!==null&&(g=n*2-a,S=o*2-y);const d=h?n+f[l]:f[l],p=h?o+f[l+1]:f[l+1],$=h?n+f[l+2]:f[l+2],b=h?o+f[l+3]:f[l+3];t.push({type:"C",x1:g,y1:S,x2:d,y2:p,x:$,y:b}),n=$,o=b,a=d,y=p,r="S"}else m==="Z"?(t.push({type:"Z"}),n=c,o=u,C(),r="Z"):(C(),r=m)}return t}function R(e){let t="",s=e;for(;s>=0;)t=String.fromCharCode(65+s%26)+t,s=Math.floor(s/26)-1;return t}function D(e,t,s){const i=(e*t).toFixed(s);return parseFloat(i).toString()}function $e(e){const{vectorFormat:t,language:s,processingVector:i="PVector",instanceMode:n=!1}=e,o=s==="typescript",c=t==="Processing",u=c&&i==="Vec2D",r=n&&t==="createVector";if(c){const P=u?"Vec2D":"PVector";return`${u?`import toxi.geom.*;

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

${P} applyTransform(${P} v) {
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

	return new ${P}(x, y);
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
}`;const a=r?"p.createVector":"createVector",y=o?"p5.Vector":"",C=r?o?"p: any":"p":"";return`// Transform configuration
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

function applyTransform(${C?C+", ":""}v${o?`: ${y}`:""})${o?`: ${y}`:""} {
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

function applyTransformScalar(value${o?": number":""}, axis${o?": 'x' | 'y' | 'avg'":""} = 'avg')${o?": number":""} {
	if (axis === 'x') {
		return value * transformConfig.scaleX;
	}
	if (axis === 'y') {
		return value * transformConfig.scaleY;
	}
	return value * ((Math.abs(transformConfig.scaleX) + Math.abs(transformConfig.scaleY)) * 0.5);
}`}function Ce(e,t){const{vectorFormat:s,language:i,instanceMode:n=!1}=t,o=i==="typescript",c=s==="Processing",u=n&&(s==="createVector"||s==="Vec");return c?`void ${e}() {`:`function ${e}(${u?o?"p: any":"p":""})${o?": void":""} {`}function ie(e){const{vectorFormat:t,instanceMode:s=!1}=e;return s&&(t==="createVector"||t==="Vec")?"p.":""}function re(){return{minX:Number.POSITIVE_INFINITY,minY:Number.POSITIVE_INFINITY,maxX:Number.NEGATIVE_INFINITY,maxY:Number.NEGATIVE_INFINITY}}function H(e,t,s){e.minX=Math.min(e.minX,t),e.minY=Math.min(e.minY,s),e.maxX=Math.max(e.maxX,t),e.maxY=Math.max(e.maxY,s)}function Se(e){return Number.isFinite(e.minX)&&Number.isFinite(e.minY)&&Number.isFinite(e.maxX)&&Number.isFinite(e.maxY)}function be(e){const t=[];let s=[],i=!1,n=re();const o=()=>{if(s.length===0)return;const c=Se(n)?{...n}:{minX:0,minY:0,maxX:0,maxY:0};t.push({commands:s,closed:i,bounds:c}),s=[],i=!1,n=re()};return e.forEach(c=>{if(c.type==="M"){o(),s.push(c),H(n,c.x,c.y);return}if(c.type==="L"){s.length===0&&s.push({type:"M",x:c.x,y:c.y}),s.push(c),H(n,c.x,c.y);return}if(c.type==="C"){if(s.length===0)return;s.push(c),H(n,c.x1,c.y1),H(n,c.x2,c.y2),H(n,c.x,c.y);return}c.type==="Z"&&(i=!0,o())}),o(),t}function ve(e,t){return e.bounds.minX>=t.minX&&e.bounds.maxX<=t.maxX&&e.bounds.minY>=t.minY&&e.bounds.maxY<=t.maxY}function we(e,t,s,i,n,o,c){const u=t.vectorFormat==="Processing",r=ie(t),a=l=>D(l,s,i),y=[],C=[],P="'x'",M="'y'",h=u?"'a'":"'avg'",m=(l,g,S)=>{const d=`${c}${o}(${a(g)}, ${a(S)}))`;u?y.push(`${n} ${l} = ${d};`):y.push(`const ${l} = ${d};`)},f=(l,g,S)=>{const d=`applyTransformScalar(${a(g)}, ${S})`;u?y.push(`float ${l} = ${d};`):y.push(`const ${l} = ${d};`)};if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?null:(m("p1",e.x1,e.y1),m("p2",e.x2,e.y2),C.push(`${r}line(p1.x, p1.y, p2.x, p2.y);`),{declarations:y,drawCalls:C});if(e.kind==="polyline"||e.kind==="polygon"){const l=e.points||[];return l.length<2?null:(l.forEach(([g,S],d)=>{m(`p${d}`,g,S)}),C.push(`${r}beginShape();`),l.forEach((g,S)=>{C.push(`${r}vertex(p${S}.x, p${S}.y);`)}),C.push(`${r}endShape(${e.kind==="polygon"?"CLOSE":"OPEN"});`),{declarations:y,drawCalls:C})}if(e.kind==="rect"){if(e.x==null||e.y==null||e.width==null||e.height==null)return null;m("rectPos",e.x,e.y),f("rectW",e.width,P),f("rectH",e.height,M);const l=e.rx||0,g=e.ry||0;if(l>0||g>0){if(Math.abs(l-g)>1e-9)return null;f("rectR",l,h),C.push(`${r}rect(rectPos.x, rectPos.y, rectW, rectH, rectR);`)}else C.push(`${r}rect(rectPos.x, rectPos.y, rectW, rectH);`);return{declarations:y,drawCalls:C}}return e.kind==="circle"?e.cx==null||e.cy==null||e.r==null?null:(m("circleCenter",e.cx,e.cy),f("circleDiameter",e.r*2,h),C.push(`${r}circle(circleCenter.x, circleCenter.y, circleDiameter);`),{declarations:y,drawCalls:C}):e.kind==="ellipse"?e.cx==null||e.cy==null||e.rx==null||e.ry==null?null:(m("ellipseCenter",e.cx,e.cy),f("ellipseW",e.rx*2,P),f("ellipseH",e.ry*2,M),C.push(`${r}ellipse(ellipseCenter.x, ellipseCenter.y, ellipseW, ellipseH);`),{declarations:y,drawCalls:C}):null}function Te(e,t,s,i,n){const{vectorFormat:o,coordMultiplier:c,precision:u,processingVector:r="PVector",instanceMode:a=!1}=t,y=o==="Processing",C=y&&r==="Vec2D",P=a&&(o==="createVector"||o==="Vec"),M=n||`drawPath${s+1}`,h=y?C?"new Vec2D":"new PVector":o==="Vec"?"new Vec":a&&o==="createVector"?"p.createVector":"createVector",m=[],f=y?C?"Vec2D":"PVector":"const",l=P&&o==="createVector"?"applyTransform(p, ":"applyTransform(",g=$e(t),S=Ce(M,t),d=ie(t);if(i?.primitive){const L=we(i.primitive,t,c,u,f,h,l);if(L){const w=L.declarations.length>0?`${L.declarations.map(E=>`	${E}`).join(`
`)}

`:"",x=L.drawCalls.map(E=>`	${E}`).join(`
`),T=`${S}
${w}${x}
}`;return{sharedCode:g,pathCode:T}}}const p=oe(e),$=be(p);let b=0;const v=L=>{const w=[];return L.commands.forEach(x=>{if(x.type==="M"||x.type==="L"){const T=R(b),E=D(x.x,c,u),X=D(x.y,c,u);m.push(`${T} = ${l}${h}(${E}, ${X}))`),w.push(`${d}vertex(${T}.x, ${T}.y);`),b++;return}if(x.type==="C"){const T=R(b-1),E=R(b),X=T+"c",A="c"+E,ee=D(x.x1,c,u),ge=D(x.y1,c,u),xe=D(x.x2,c,u),ye=D(x.y2,c,u),me=D(x.x,c,u),pe=D(x.y,c,u);m.push(`${X} = ${l}${h}(${ee}, ${ge}))`),m.push(`${A} = ${l}${h}(${xe}, ${ye}))`),m.push(`${E} = ${l}${h}(${me}, ${pe}))`),w.push(`${d}bezierVertex(${X}.x, ${X}.y, ${A}.x, ${A}.y, ${E}.x, ${E}.y);`),b++}}),w};let I=[],k=!1,V=null;const Y=[],F=()=>{I.length!==0&&(Y.push([`${d}beginShape();`,...I,`${d}endShape(${k?"CLOSE":"OPEN"});`].join(`
`)),I=[],k=!1,V=null)};$.forEach(L=>{const w=v(L);if(w.length===0)return;if(I.length===0){I=w,k=L.closed,V=L.bounds;return}if(k&&L.closed&&V!==null&&ve(L,V)){I.push(`${d}beginContour();`),I.push(...w),I.push(`${d}endContour();`);return}F(),I=w,k=L.closed,V=L.bounds}),F();const Z=m.length>0?`	${f} ${m.join(`,
		`)};`:"",_=Y.map(L=>L.split(`
`).map(w=>`	${w}`).join(`
`)).join(`

`),Q=Z?`${Z}

`:"",J=_?`${_}
`:"",z=`${S}
${Q}${J}}`;return{sharedCode:g,pathCode:z}}function Ee(e,t){const{vectorFormat:s,language:i,instanceMode:n=!1}=t,o=i==="typescript",c=s==="Processing",u=n&&(s==="createVector"||s==="Vec"),r=e.map(a=>c?`	${a}();`:u?`	${a}(p);`:`	${a}();`).join(`
`);return c?`
void drawAllPaths() {
${r}
}`:`
function drawAllPaths(${u?o?"p: any":"p":""})${o?": void":""} {
${r}
}`}function se(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function ae(){return{minX:Number.POSITIVE_INFINITY,minY:Number.POSITIVE_INFINITY,maxX:Number.NEGATIVE_INFINITY,maxY:Number.NEGATIVE_INFINITY}}function q(e,t,s){e.minX=Math.min(e.minX,t),e.minY=Math.min(e.minY,s),e.maxX=Math.max(e.maxX,t),e.maxY=Math.max(e.maxY,s)}function Me(e){return Number.isFinite(e.minX)&&Number.isFinite(e.minY)&&Number.isFinite(e.maxX)&&Number.isFinite(e.maxY)}function Ie(e){const t=[];let s=[],i=!1,n=ae();const o=()=>{if(s.length===0)return;const c=Me(n)?{...n}:{minX:0,minY:0,maxX:0,maxY:0};t.push({commands:s,closed:i,bounds:c}),s=[],i=!1,n=ae()};return e.forEach(c=>{if(c.type==="M"){o(),s.push(c),q(n,c.x,c.y);return}if(c.type==="L"){s.length===0&&s.push({type:"M",x:c.x,y:c.y}),s.push(c),q(n,c.x,c.y);return}if(c.type==="C"){if(s.length===0)return;s.push(c),q(n,c.x1,c.y1),q(n,c.x2,c.y2),q(n,c.x,c.y);return}c.type==="Z"&&(i=!0,o())}),o(),t}function Ye(e,t){return e.bounds.minX>=t.minX&&e.bounds.maxX<=t.maxX&&e.bounds.minY>=t.minY&&e.bounds.maxY<=t.maxY}function te(e,t,s){t.commands.forEach(i=>{if(i.type==="M"||i.type==="L"){const n=s(i.x,i.y);e.vertex(n.x,n.y);return}if(i.type==="C"){const n=s(i.x1,i.y1),o=s(i.x2,i.y2),c=s(i.x,i.y);e.bezierVertex(n.x,n.y,o.x,o.y,c.x,c.y)}})}function le(e,t,s){const i=Ie(t).filter(c=>c.commands.length>0);if(i.length===0)return;let n=null;const o=()=>{n&&(e.endShape(n.closed?e.CLOSE:e.OPEN),n=null)};i.forEach(c=>{if(!n){e.beginShape(),te(e,c,s),n=c;return}if(n.closed&&c.closed&&Ye(c,n.bounds)){e.beginContour(),te(e,c,s),e.endContour();return}o(),e.beginShape(),te(e,c,s),n=c}),o()}function ne(e){const t=[];let s=0;return e.forEach(i=>{if(i.type==="M"||i.type==="L"){const n=R(s);t.push({name:n,x:i.x,y:i.y}),s++}else if(i.type==="C"){const n=R(s-1),o=R(s),c=n+"c",u="c"+o;t.push({name:c,x:i.x1,y:i.y1}),t.push({name:u,x:i.x2,y:i.y2}),t.push({name:o,x:i.x,y:i.y}),s++}}),t}function ue(e){const t=e.map(u=>u.x),s=e.map(u=>u.y),i=Math.min(...t),n=Math.min(...s),o=Math.max(...t),c=Math.max(...s);return{minX:i,minY:n,maxX:o,maxY:c,width:o-i,height:c-n}}function U(e){if(e.length===0)return null;const t=e.reduce((s,i)=>({x:s.x+i.x,y:s.y+i.y}),{x:0,y:0});return{x:t.x/e.length,y:t.y/e.length}}function Pe(e){if(e.length<3)return U(e.map(([n,o])=>({x:n,y:o})));let t=0,s=0,i=0;for(let n=0;n<e.length;n++){const[o,c]=e[n],[u,r]=e[(n+1)%e.length],a=o*r-u*c;t+=a,s+=(o+u)*a,i+=(c+r)*a}return Math.abs(t)<1e-9?U(e.map(([n,o])=>({x:n,y:o}))):{x:s/(3*t),y:i/(3*t)}}function fe(e){if(!e)return null;if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?null:{x:(e.x1+e.x2)/2,y:(e.y1+e.y2)/2};if(e.kind==="polyline"){const t=e.points||[];return U(t.map(([s,i])=>({x:s,y:i})))}return e.kind==="polygon"?Pe(e.points||[]):e.kind==="rect"?e.x==null||e.y==null||e.width==null||e.height==null?null:{x:e.x+e.width/2,y:e.y+e.height/2}:e.kind==="circle"?e.cx==null||e.cy==null?null:{x:e.cx,y:e.cy}:e.kind==="ellipse"?e.cx==null||e.cy==null?null:{x:e.cx,y:e.cy}:null}function ke(e){return e?e.kind==="line"?"midpoint":e.kind==="polyline"||e.kind==="polygon"?"centroid":"center":"reference"}function Le(e){if(!e)return[];if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?[]:[{point:{x:e.x1,y:e.y1},label:"start"},{point:{x:e.x2,y:e.y2},label:"end"}];const t=fe(e);return t?[{point:t,label:ke(e)}]:[]}function Ne(e,t,s,i=!0){const n=oe(e),o=ne(n),c=Le(s?.primitive),u=!!s?.primitive;if(o.length===0)return;const r=ue(o);new window.p5(a=>{const M=r.width>0?440/r.width:1,h=r.height>0?440/r.height:1,m=Math.min(M,h),f=r.width*m,l=r.height*m,g=(500-f)/2-r.minX*m,S=(500-l)/2-r.minY*m;a.setup=()=>{a.createCanvas(500,500),a.noLoop()},a.draw=()=>{a.background(30);const d=($,b)=>({x:$*m+g,y:b*m+S});a.stroke(60),a.strokeWeight(1);for(let $=0;$<=500;$+=50)a.line($,0,$,500),a.line(0,$,500,$);const p=d(0,0);if(a.stroke(255,100,100),a.strokeWeight(2),a.line(0,p.y,500,p.y),a.stroke(100,255,100),a.strokeWeight(2),a.line(p.x,0,p.x,500),a.noStroke(),a.fill(255,200,0),a.circle(p.x,p.y,12),a.fill(255),a.textAlign(a.LEFT,a.BOTTOM),a.textSize(14),a.textStyle(a.BOLD),a.text("(0, 0)",p.x+8,p.y-8),a.fill(100,150,255,50),a.stroke(100,150,255),a.strokeWeight(2),le(a,n,d),u&&c.length>0)c.forEach(({point:$,label:b})=>{const v=d($.x,$.y);a.noStroke(),a.fill(255,220,120),a.circle(v.x,v.y,12),a.fill(255),a.textAlign(a.CENTER,a.CENTER),a.textSize(12),a.textStyle(a.BOLD),a.text(b,v.x,v.y-16),i&&(a.textSize(9),a.textStyle(a.NORMAL),a.fill(200),a.text(`(${$.x.toFixed(1)}, ${$.y.toFixed(1)})`,v.x,v.y+16))});else{a.stroke(255,200,100,100),a.strokeWeight(1);let $=0;n.forEach(b=>{if(b.type==="C"){const v=o.find(Y=>Y.name===String.fromCharCode(65+$-1)),I=o.find(Y=>Y.name===v?.name+"c"),k=o.find(Y=>Y.name==="c"+String.fromCharCode(65+$)),V=o.find(Y=>Y.name===String.fromCharCode(65+$));if(v&&I){const Y=d(v.x,v.y),F=d(I.x,I.y);a.line(Y.x,Y.y,F.x,F.y)}if(k&&V){const Y=d(k.x,k.y),F=d(V.x,V.y);a.line(Y.x,Y.y,F.x,F.y)}$++}else(b.type==="M"||b.type==="L")&&$++}),o.forEach(b=>{const v=d(b.x,b.y),I=b.name.includes("c");a.noStroke(),I?(a.fill(255,200,100),a.circle(v.x,v.y,8)):(a.fill(100,255,150),a.circle(v.x,v.y,10)),a.fill(255),a.noStroke(),a.textAlign(a.CENTER,a.CENTER),a.textSize(12),a.textStyle(a.BOLD);const k=15;a.text(b.name,v.x,v.y-k),i&&(a.textSize(9),a.textStyle(a.NORMAL),a.fill(200),a.text(`(${b.x.toFixed(1)}, ${b.y.toFixed(1)})`,v.x,v.y+k+3))})}a.fill(200),a.noStroke(),a.textAlign(a.LEFT,a.TOP),a.textSize(11),a.text(`Scale: ${m.toFixed(3)}x`,10,10),a.text(`Size: ${r.width.toFixed(1)} × ${r.height.toFixed(1)}`,10,25)}},t)}function Xe(e,t,s,i=[]){const n=e.map((r,a)=>({id:t[a]??a+1,commands:oe(r),primitive:i[a]?.primitive})).filter(r=>r.commands.length>0),o=n.flatMap(r=>ne(r.commands));if(o.length===0)return;const c=ue(o),u=n.map(()=>{const r=80+Math.floor(Math.random()*176),a=80+Math.floor(Math.random()*176),y=80+Math.floor(Math.random()*176);return{stroke:[r,a,y]}});new window.p5(r=>{const P=c.width>0?440/c.width:1,M=c.height>0?440/c.height:1,h=Math.min(P,M),m=c.width*h,f=c.height*h,l=(500-m)/2-c.minX*h,g=(500-f)/2-c.minY*h,S=(d,p)=>({x:d*h+l,y:p*h+g});r.setup=()=>{r.createCanvas(500,500),r.noLoop()},r.draw=()=>{r.background(30),r.stroke(60),r.strokeWeight(1);for(let p=0;p<=500;p+=50)r.line(p,0,p,500),r.line(0,p,500,p);const d=S(0,0);r.stroke(255,100,100),r.strokeWeight(2),r.line(0,d.y,500,d.y),r.stroke(100,255,100),r.strokeWeight(2),r.line(d.x,0,d.x,500),r.noStroke(),r.fill(255,200,0),r.circle(d.x,d.y,10),n.forEach((p,$)=>{const b=p.commands,v=u[$];r.noFill(),r.stroke(v.stroke[0],v.stroke[1],v.stroke[2]),r.strokeWeight(2),le(r,b,S)}),r.noStroke(),r.fill(255),r.textAlign(r.CENTER,r.CENTER),r.textSize(11),r.textStyle(r.BOLD),n.forEach(p=>{const $=fe(p.primitive),b=U(ne(p.commands).map(k=>({x:k.x,y:k.y}))),v=$??b;if(!v)return;const I=S(v.x,v.y);r.text(String(p.id),I.x,I.y)}),r.fill(200),r.noStroke(),r.textAlign(r.LEFT,r.TOP),r.textSize(11),r.text(`Paths: ${n.length}`,10,10),r.text(`Scale: ${h.toFixed(3)}x`,10,25),r.text(`Size: ${c.width.toFixed(1)} x ${c.height.toFixed(1)}`,10,40)}},s)}const K=.5522847498307936;function N(e,t=0){if(e==null)return t;const s=Number.parseFloat(e);return Number.isFinite(s)?s:t}function Ae(e){if(!e)return[];const t=/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g,s=(e.match(t)||[]).map(Number),i=[];for(let n=0;n+1<s.length;n+=2)i.push([s[n],s[n+1]]);return i}function Ve(e){const t=N(e.getAttribute("x1"),0),s=N(e.getAttribute("y1"),0),i=N(e.getAttribute("x2"),0),n=N(e.getAttribute("y2"),0);return{pathData:`M ${t} ${s} L ${i} ${n}`,sourceIndex:0,primitive:{kind:"line",x1:t,y1:s,x2:i,y2:n}}}function ce(e,t){const s=Ae(e.getAttribute("points"));if(s.length<2)return null;const[i,n]=s[0],o=s.slice(1).map(([c,u])=>`L ${c} ${u}`).join(" ");return{pathData:`M ${i} ${n} ${o}${t?" Z":""}`,sourceIndex:0,primitive:{kind:t?"polygon":"polyline",points:s}}}function Fe(e,t,s,i,n,o){if(n===0||o===0)return`M ${e} ${t} L ${e+s} ${t} L ${e+s} ${t+i} L ${e} ${t+i} Z`;const c=n*K,u=o*K,r=e+s,a=t+i;return[`M ${e+n} ${t}`,`L ${r-n} ${t}`,`C ${r-n+c} ${t} ${r} ${t+o-u} ${r} ${t+o}`,`L ${r} ${a-o}`,`C ${r} ${a-o+u} ${r-n+c} ${a} ${r-n} ${a}`,`L ${e+n} ${a}`,`C ${e+n-c} ${a} ${e} ${a-o+u} ${e} ${a-o}`,`L ${e} ${t+o}`,`C ${e} ${t+o-u} ${e+n-c} ${t} ${e+n} ${t}`,"Z"].join(" ")}function De(e){const t=N(e.getAttribute("x"),0),s=N(e.getAttribute("y"),0),i=N(e.getAttribute("width"),0),n=N(e.getAttribute("height"),0);if(i<=0||n<=0)return null;const o=e.getAttribute("rx"),c=e.getAttribute("ry");let u=N(o,0),r=N(c,0);return o!=null&&c==null&&(r=u),c!=null&&o==null&&(u=r),u=Math.max(0,Math.min(u,i/2)),r=Math.max(0,Math.min(r,n/2)),{pathData:Fe(t,s,i,n,u,r),sourceIndex:0,primitive:{kind:"rect",x:t,y:s,width:i,height:n,rx:u,ry:r}}}function de(e,t,s,i){const n=s*K,o=i*K;return[`M ${e+s} ${t}`,`C ${e+s} ${t+o} ${e+n} ${t+i} ${e} ${t+i}`,`C ${e-n} ${t+i} ${e-s} ${t+o} ${e-s} ${t}`,`C ${e-s} ${t-o} ${e-n} ${t-i} ${e} ${t-i}`,`C ${e+n} ${t-i} ${e+s} ${t-o} ${e+s} ${t}`,"Z"].join(" ")}function ze(e){const t=N(e.getAttribute("cx"),0),s=N(e.getAttribute("cy"),0),i=N(e.getAttribute("r"),0);return i<=0?null:{pathData:de(t,s,i,i),sourceIndex:0,primitive:{kind:"circle",cx:t,cy:s,r:i}}}function Oe(e){const t=N(e.getAttribute("cx"),0),s=N(e.getAttribute("cy"),0),i=N(e.getAttribute("rx"),0),n=N(e.getAttribute("ry"),0);return i<=0||n<=0?null:{pathData:de(t,s,i,n),sourceIndex:0,primitive:{kind:"ellipse",cx:t,cy:s,rx:i,ry:n}}}function Be(e){const s=Array.from(e.querySelectorAll("path,rect,circle,ellipse,line,polyline,polygon")),i=[];return s.forEach((n,o)=>{const c=o+1,u=n.tagName.toLowerCase();if(u==="path"){const a=n.getAttribute("d");a&&i.push({pathData:a,sourceIndex:c});return}let r=null;u==="line"?r=Ve(n):u==="polyline"?r=ce(n,!1):u==="polygon"?r=ce(n,!0):u==="rect"?r=De(n):u==="circle"?r=ze(n):u==="ellipse"&&(r=Oe(n)),r&&(r.sourceIndex=c,i.push(r))}),i}const O=document.getElementById("dropZone"),he=document.getElementById("fileInput"),W=document.getElementById("output");let B=null,G=null;function Re(e){const t=e.replace(/[^a-zA-Z0-9_]/g,"_");return t.length===0?"shape":/^[a-zA-Z_]/.test(t)?t:`shape_${t}`}O.addEventListener("click",()=>he.click());document.querySelectorAll('input[name="vectorFormat"]').forEach(e=>{e.addEventListener("change",t=>{const s=t.target,i=document.getElementById("processingVectorOption"),n=document.getElementById("instanceModeOption");i&&(i.style.display=s.value==="Processing"?"flex":"none"),n&&(n.style.display=s.value==="Processing"?"none":"flex"),B&&j(B)})});document.querySelectorAll('input[name="language"], input[name="processingVector"], input[name="sortMode"], #instanceMode, #showCoordinates').forEach(e=>{e.addEventListener("change",()=>{B&&j(B)})});document.querySelectorAll("#coordMultiplier, #precision").forEach(e=>{e.addEventListener("change",()=>{B&&j(B)})});O.addEventListener("dragover",e=>{e.preventDefault(),O.classList.add("dragover")});O.addEventListener("dragleave",()=>{O.classList.remove("dragover")});O.addEventListener("drop",e=>{e.preventDefault(),O.classList.remove("dragover");const t=e.dataTransfer?.files[0];t&&t.type==="image/svg+xml"?j(t):alert("Please drop a valid SVG file")});he.addEventListener("change",e=>{const t=e.target.files?.[0];t&&j(t)});function j(e){B=e;const t=new FileReader;t.onload=s=>{G&&(G(),G=null);const i=s.target?.result,o=new DOMParser().parseFromString(i,"image/svg+xml"),c=Be(o);if(c.length===0){W.innerHTML='<div class="output"><p>No supported drawable elements found (path, line, polyline, polygon, rect, circle, ellipse).</p></div>';return}const u=document.querySelector('input[name="vectorFormat"]:checked')?.value||"Vec",r=document.querySelector('input[name="language"]:checked')?.value||"javascript",a=parseFloat(document.getElementById("coordMultiplier")?.value)||1,y=parseInt(document.getElementById("precision")?.value)||5,C=document.querySelector('input[name="processingVector"]:checked')?.value||"PVector",P=document.getElementById("instanceMode")?.checked||!1,M=document.getElementById("showCoordinates")?.checked??!0,h=document.querySelector('input[name="sortMode"]:checked')?.value||"primitive",m={vectorFormat:u,language:r,coordMultiplier:a,precision:y,processingVector:C,instanceMode:P},f=new Map;c.forEach((w,x)=>{const T=x+1,X=`${w.primitive?.kind??"path"}${T}`;f.set(w,{id:T,name:X,functionName:Re(X)})});const l=[...c].sort((w,x)=>{if(h==="svg")return w.sourceIndex-x.sourceIndex;const T=w.primitive?.kind??"path",E=x.primitive?.kind??"path";return T===E?w.sourceIndex-x.sourceIndex:T.localeCompare(E)});let g="",S="";const d=[],p=[],$=[],b=[],v=[];l.forEach((w,x)=>{const T=f.get(w);if(!T)return;d.push(w.pathData),p.push(T.id);const E=T.name,X=T.functionName;v.push(E),b.push(X);const A=Te(w.pathData,m,x,w,X);x===0&&(g=A.sharedCode),$.push(A.pathCode);const ee=`preview-${x}`;S+=`
          <div class="output path-section" id="shape-section-${x}">
            <div class="path-header">
              <h2>${E} (svg #${w.sourceIndex})</h2>
              <button class="copy-btn" data-path="${x}">Copy Code</button>
            </div>
            <div class="content-grid">
              <div class="preview-container">
                <div id="${ee}"></div>
              </div>
              <div class="code-container">
                <pre><code>${se(A.pathCode)}</code></pre>
              </div>
            </div>
          </div>
        `});const I=Ee(b,m),k=g+I,Y=`draw-paths.${u==="Processing"?"pde":r==="typescript"?"ts":"js"}`,F=`${k}

${$.join(`

`)}`,Z=`
      <div class="command-section">
        <div class="command-header">
          <h2>Download Complete File</h2>
          <button class="download-btn" data-filename="${Y}">Download ${Y}</button>
        </div>
        <div class="command-content">
          <p style="margin: 0; padding: 15px; color: #9cdcfe;">Click the button above to download a file containing all the shared code and shape functions.</p>
        </div>
      </div>
    `,_=`
      <div class="shared-code-section">
        <div class="shared-code-header">
          <h2>Shared Code</h2>
          <button class="copy-btn" data-shared="true">Copy Shared Code</button>
        </div>
        <div class="shared-code-content">
          <pre><code>${se(k)}</code></pre>
        </div>
      </div>
    `,Q=`
      <div class="combined-preview-section output">
        <div class="combined-preview-header">
          <h2>All paths</h2>
        </div>
        <div class="preview-container">
          <div id="preview-all"></div>
        </div>
      </div>
    `,J=`
      <div class="shape-nav">
        <h3>Shapes</h3>
        <ul class="shape-nav-list">
          ${v.map((w,x)=>`
            <li>
              <button class="shape-nav-link" data-target="shape-section-${x}">${w}</button>
            </li>
          `).join("")}
        </ul>
      </div>
    `;W.innerHTML=J+Z+_+Q+S;const z=W.querySelector(".download-btn");z&&z.addEventListener("click",()=>{const w=new Blob([F],{type:"text/plain"}),x=URL.createObjectURL(w),T=document.createElement("a");T.href=x,T.download=Y,T.click(),URL.revokeObjectURL(x);const E=z.textContent;z.textContent="Downloaded!",setTimeout(()=>{z.textContent=E},2e3)}),Xe(d,p,"preview-all",l),d.forEach((w,x)=>{Ne(w,`preview-${x}`,l[x],M)}),G=He(),W.querySelectorAll(".copy-btn").forEach(w=>{w.addEventListener("click",x=>{const T=x.target,E=T.dataset.shared==="true";let X="";E?X=T.closest(".shared-code-section")?.querySelector("code")?.textContent||"":X=T.closest(".path-section")?.querySelector("code")?.textContent||"",navigator.clipboard.writeText(X).then(()=>{const A=T.textContent;T.textContent="Copied!",setTimeout(()=>{T.textContent=A},2e3)})})})},t.readAsText(e)}function He(){const e=Array.from(W.querySelectorAll(".shape-nav-link"));if(e.length===0)return()=>{};const t=e.map(u=>{const r=u.dataset.target;return r?document.getElementById(r):null}).filter(u=>u!==null);if(t.length===0)return()=>{};const s=u=>{e.forEach(r=>{r.classList.toggle("is-active",r.dataset.target===u.id)})},i=()=>{const u=window.innerHeight/2;let r=t[0],a=Number.POSITIVE_INFINITY;t.forEach(y=>{const C=y.getBoundingClientRect(),P=C.top+C.height/2,M=Math.abs(P-u);M<a&&(a=M,r=y)}),s(r)},n=u=>{const a=u.currentTarget.dataset.target;if(!a)return;const y=document.getElementById(a);y&&y.scrollIntoView({behavior:"smooth",block:"center"})};e.forEach(u=>{u.addEventListener("click",n)});let o=!1;const c=()=>{o||(o=!0,window.requestAnimationFrame(()=>{o=!1,i()}))};return window.addEventListener("scroll",c,{passive:!0}),window.addEventListener("resize",c),i(),()=>{e.forEach(u=>{u.removeEventListener("click",n)}),window.removeEventListener("scroll",c),window.removeEventListener("resize",c)}}
