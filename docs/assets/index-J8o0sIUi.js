(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}})();function be(e){const t=[],o=/([MLHVCSQTAZmlhvcsqtaz])\s*([^MLHVCSQTAZmlhvcsqtaz]*)/g;let r,n=0,s=0,c=0,l=0,a="",i=null,m=null;const C=()=>{i=null,m=null},M=P=>{const x=/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g;return(P.match(x)||[]).map(Number)};for(;(r=o.exec(e))!==null;){const P=r[1],x=P===P.toLowerCase(),y=P.toUpperCase(),f=M(r[2]);if(y==="M"){for(let d=0;d+1<f.length;d+=2){const p=x?n+f[d]:f[d],b=x?s+f[d+1]:f[d+1];d===0?(t.push({type:"M",x:p,y:b}),c=p,l=b):t.push({type:"L",x:p,y:b}),n=p,s=b}C(),a=f.length>2?"L":"M"}else if(y==="L"){for(let d=0;d+1<f.length;d+=2){const p=x?n+f[d]:f[d],b=x?s+f[d+1]:f[d+1];t.push({type:"L",x:p,y:b}),n=p,s=b}C(),a="L"}else if(y==="H"){for(let d=0;d<f.length;d++){const p=x?n+f[d]:f[d];t.push({type:"L",x:p,y:s}),n=p}C(),a="L"}else if(y==="V"){for(let d=0;d<f.length;d++){const p=x?s+f[d]:f[d];t.push({type:"L",x:n,y:p}),s=p}C(),a="L"}else if(y==="C")for(let d=0;d+5<f.length;d+=6){const p=x?n+f[d]:f[d],b=x?s+f[d+1]:f[d+1],g=x?n+f[d+2]:f[d+2],$=x?s+f[d+3]:f[d+3],w=x?n+f[d+4]:f[d+4],v=x?s+f[d+5]:f[d+5];t.push({type:"C",x1:p,y1:b,x2:g,y2:$,x:w,y:v}),n=w,s=v,i=g,m=$,a="C"}else if(y==="S")for(let d=0;d+3<f.length;d+=4){let p=n,b=s;(a==="C"||a==="S")&&i!==null&&m!==null&&(p=n*2-i,b=s*2-m);const g=x?n+f[d]:f[d],$=x?s+f[d+1]:f[d+1],w=x?n+f[d+2]:f[d+2],v=x?s+f[d+3]:f[d+3];t.push({type:"C",x1:p,y1:b,x2:g,y2:$,x:w,y:v}),n=w,s=v,i=g,m=$,a="S"}else y==="Z"?(t.push({type:"Z"}),n=c,s=l,C(),a="Z"):(C(),a=y)}return t}function U(e){let t="",o=e;for(;o>=0;)t=String.fromCharCode(65+o%26)+t,o=Math.floor(o/26)-1;return t}function H(e,t,o){const r=(e*t).toFixed(o);return parseFloat(r).toString()}function je(e){const{vectorFormat:t,language:o,processingVector:r="PVector",instanceMode:n=!1}=e,s=o==="typescript",c=t==="Processing",l=c&&r==="Vec2D",a=n&&t==="createVector";if(c){const M=l?"Vec2D":"PVector";return`${l?`import toxi.geom.*;

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
}`;const i=a?"p.createVector":"createVector",m=s?"p5.Vector":"",C=a?s?"p: any":"p":"";return`// Transform configuration
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

function applyTransform(${C?C+", ":""}v${s?`: ${m}`:""})${s?`: ${m}`:""} {
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

function applyTransformScalar(value${s?": number":""}, axis${s?": 'x' | 'y' | 'avg'":""} = 'avg')${s?": number":""} {
	if (axis === 'x') {
		return value * transformConfig.scaleX;
	}
	if (axis === 'y') {
		return value * transformConfig.scaleY;
	}
	return value * ((Math.abs(transformConfig.scaleX) + Math.abs(transformConfig.scaleY)) * 0.5);
}`}function We(e,t){const{vectorFormat:o,language:r,instanceMode:n=!1}=t,s=r==="typescript",c=o==="Processing",l=n&&(o==="createVector"||o==="Vec");return c?`void ${e}() {`:`function ${e}(${l?s?"p: any":"p":""})${s?": void":""} {`}function Le(e){const{vectorFormat:t,instanceMode:o=!1}=e;return o&&(t==="createVector"||t==="Vec")?"p.":""}function Se(){return{minX:Number.POSITIVE_INFINITY,minY:Number.POSITIVE_INFINITY,maxX:Number.NEGATIVE_INFINITY,maxY:Number.NEGATIVE_INFINITY}}function se(e,t,o){e.minX=Math.min(e.minX,t),e.minY=Math.min(e.minY,o),e.maxX=Math.max(e.maxX,t),e.maxY=Math.max(e.maxY,o)}function qe(e){return Number.isFinite(e.minX)&&Number.isFinite(e.minY)&&Number.isFinite(e.maxX)&&Number.isFinite(e.maxY)}function Ze(e){const t=[];let o=[],r=!1,n=Se();const s=()=>{if(o.length===0)return;const c=qe(n)?{...n}:{minX:0,minY:0,maxX:0,maxY:0};t.push({commands:o,closed:r,bounds:c}),o=[],r=!1,n=Se()};return e.forEach(c=>{if(c.type==="M"){s(),o.push(c),se(n,c.x,c.y);return}if(c.type==="L"){o.length===0&&o.push({type:"M",x:c.x,y:c.y}),o.push(c),se(n,c.x,c.y);return}if(c.type==="C"){if(o.length===0)return;o.push(c),se(n,c.x1,c.y1),se(n,c.x2,c.y2),se(n,c.x,c.y);return}c.type==="Z"&&(r=!0,s())}),s(),t}function Ie(e,t){return e.bounds.minX>=t.minX-1e-6&&e.bounds.maxX<=t.maxX+1e-6&&e.bounds.minY>=t.minY-1e-6&&e.bounds.maxY<=t.maxY+1e-6}function Ge(e,t,o,r,n,s,c){const l=t.vectorFormat==="Processing",a=Le(t),i=d=>H(d,o,r),m=[],C=[],M="'x'",P="'y'",x=l?"'a'":"'avg'",y=(d,p,b)=>{const g=`${c}${s}(${i(p)}, ${i(b)}))`;l?m.push(`${n} ${d} = ${g};`):m.push(`const ${d} = ${g};`)},f=(d,p,b)=>{const g=`applyTransformScalar(${i(p)}, ${b})`;l?m.push(`float ${d} = ${g};`):m.push(`const ${d} = ${g};`)};if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?null:(y("p1",e.x1,e.y1),y("p2",e.x2,e.y2),C.push(`${a}line(p1.x, p1.y, p2.x, p2.y);`),{declarations:m,drawCalls:C});if(e.kind==="polyline"||e.kind==="polygon"){const d=e.points||[];return d.length<2?null:(d.forEach(([p,b],g)=>{y(`p${g}`,p,b)}),C.push(`${a}beginShape();`),d.forEach((p,b)=>{C.push(`${a}vertex(p${b}.x, p${b}.y);`)}),C.push(`${a}endShape(${e.kind==="polygon"?"CLOSE":"OPEN"});`),{declarations:m,drawCalls:C})}if(e.kind==="rect"){if(e.x==null||e.y==null||e.width==null||e.height==null)return null;y("rectPos",e.x,e.y),f("rectW",e.width,M),f("rectH",e.height,P);const d=e.rx||0,p=e.ry||0;if(d>0||p>0){if(Math.abs(d-p)>1e-9)return null;f("rectR",d,x),C.push(`${a}rect(rectPos.x, rectPos.y, rectW, rectH, rectR);`)}else C.push(`${a}rect(rectPos.x, rectPos.y, rectW, rectH);`);return{declarations:m,drawCalls:C}}return e.kind==="circle"?e.cx==null||e.cy==null||e.r==null?null:(y("circleCenter",e.cx,e.cy),f("circleDiameter",e.r*2,x),C.push(`${a}circle(circleCenter.x, circleCenter.y, circleDiameter);`),{declarations:m,drawCalls:C}):e.kind==="ellipse"?e.cx==null||e.cy==null||e.rx==null||e.ry==null?null:(y("ellipseCenter",e.cx,e.cy),f("ellipseW",e.rx*2,M),f("ellipseH",e.ry*2,P),C.push(`${a}ellipse(ellipseCenter.x, ellipseCenter.y, ellipseW, ellipseH);`),{declarations:m,drawCalls:C}):null}function Ke(e,t,o,r,n){const{vectorFormat:s,coordMultiplier:c,precision:l,processingVector:a="PVector",instanceMode:i=!1}=t,m=s==="Processing",C=m&&a==="Vec2D",M=i&&(s==="createVector"||s==="Vec"),P=n||`drawPath${o+1}`,x=m?C?"new Vec2D":"new PVector":s==="Vec"?"new Vec":i&&s==="createVector"?"p.createVector":"createVector",y=[],f=m?C?"Vec2D":"PVector":"const",d=M&&s==="createVector"?"applyTransform(p, ":"applyTransform(",p=je(t),b=We(P,t),g=Le(t);if(r?.primitive){const T=Ge(r.primitive,t,c,l,f,x,d);if(T){const L=T.declarations.length>0?`${T.declarations.map(X=>`	${X}`).join(`
`)}

`:"",Y=T.drawCalls.map(X=>`	${X}`).join(`
`),V=`${b}
${L}${Y}
}`;return{sharedCode:p,pathCode:V}}}const $=be(e),w=Ze($);let v=0;const S=T=>{const L=[];return T.commands.forEach(Y=>{if(Y.type==="M"||Y.type==="L"){const V=U(v),X=H(Y.x,c,l),W=H(Y.y,c,l);y.push(`${V} = ${d}${x}(${X}, ${W}))`),L.push(`${g}vertex(${V}.x, ${V}.y);`),v++;return}if(Y.type==="C"){const V=U(v-1),X=U(v),W=V+"c",Z="c"+X,G=H(Y.x1,c,l),oe=H(Y.y1,c,l),pe=H(Y.x2,c,l),ge=H(Y.y2,c,l),me=H(Y.x,c,l),xe=H(Y.y,c,l);y.push(`${W} = ${d}${x}(${G}, ${oe}))`),y.push(`${Z} = ${d}${x}(${pe}, ${ge}))`),y.push(`${X} = ${d}${x}(${me}, ${xe}))`),L.push(`${g}bezierVertex(${W}.x, ${W}.y, ${Z}.x, ${Z}.y, ${X}.x, ${X}.y);`),v++}}),L};let N=[],k=!1,D=null,E=0;const _=[],J=()=>{N.length!==0&&(_.push([`${g}beginShape();`,...N,`${g}endShape(${k?"CLOSE":"OPEN"});`].join(`
`)),N=[],k=!1,D=null,E=0)};w.forEach(T=>{const L=S(T);if(L.length===0)return;if(N.length===0){N=L,k=T.closed,D=T.bounds,E=0;return}if(D!==null&&Ie(T,D)){k=!0,N.push(`${g}beginContour();`),N.push(...L),N.push(`${g}endContour();`),E++;return}if(D!==null&&E===0&&Ie({bounds:D},T.bounds)){const X=[...N];k=!0,D=T.bounds,N=[...L,`${g}beginContour();`,...X,`${g}endContour();`],E=1;return}J(),N=L,k=T.closed,D=T.bounds,E=0}),J();const ee=y.length>0?`	${f} ${y.join(`,
		`)};`:"",te=_.map(T=>T.split(`
`).map(L=>`	${L}`).join(`
`)).join(`

`),ne=ee?`${ee}

`:"",he=te?`${te}
`:"",ae=`${b}
${ne}${he}}`;return{sharedCode:p,pathCode:ae}}function ce(e,t,o="drawAllPaths"){const{vectorFormat:r,language:n,instanceMode:s=!1}=t,c=n==="typescript",l=r==="Processing",a=s&&(r==="createVector"||r==="Vec"),i=e.map(m=>l?`	${m}();`:a?`	${m}(p);`:`	${m}();`).join(`
`);return l?`
void ${o}() {
${i}
}`:`
function ${o}(${a?c?"p: any":"p":""})${c?": void":""} {
${i}
}`}function R(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function Ee(){return{minX:Number.POSITIVE_INFINITY,minY:Number.POSITIVE_INFINITY,maxX:Number.NEGATIVE_INFINITY,maxY:Number.NEGATIVE_INFINITY}}function re(e,t,o){e.minX=Math.min(e.minX,t),e.minY=Math.min(e.minY,o),e.maxX=Math.max(e.maxX,t),e.maxY=Math.max(e.maxY,o)}function Ue(e){return Number.isFinite(e.minX)&&Number.isFinite(e.minY)&&Number.isFinite(e.maxX)&&Number.isFinite(e.maxY)}function Qe(e){const t=[];let o=[],r=!1,n=Ee();const s=()=>{if(o.length===0)return;const c=Ue(n)?{...n}:{minX:0,minY:0,maxX:0,maxY:0};t.push({commands:o,closed:r,bounds:c}),o=[],r=!1,n=Ee()};return e.forEach(c=>{if(c.type==="M"){s(),o.push(c),re(n,c.x,c.y);return}if(c.type==="L"){o.length===0&&o.push({type:"M",x:c.x,y:c.y}),o.push(c),re(n,c.x,c.y);return}if(c.type==="C"){if(o.length===0)return;o.push(c),re(n,c.x1,c.y1),re(n,c.x2,c.y2),re(n,c.x,c.y);return}c.type==="Z"&&(r=!0,s())}),s(),t}function Ne(e,t){return e.bounds.minX>=t.minX-1e-6&&e.bounds.maxX<=t.maxX+1e-6&&e.bounds.minY>=t.minY-1e-6&&e.bounds.maxY<=t.maxY+1e-6}function Te(e,t,o){t.commands.forEach(r=>{if(r.type==="M"||r.type==="L"){const n=o(r.x,r.y);e.vertex(n.x,n.y);return}if(r.type==="C"){const n=o(r.x1,r.y1),s=o(r.x2,r.y2),c=o(r.x,r.y);e.bezierVertex(n.x,n.y,s.x,s.y,c.x,c.y)}})}function Ae(e,t,o){const r=Qe(t).filter(l=>l.commands.length>0);if(r.length===0)return;const n=[];let s=null;const c=()=>{s&&(n.push(s),s=null)};r.forEach(l=>{if(!s){s={host:l,contours:[],closed:l.closed};return}if(Ne(l,s.host.bounds)){s.contours.push(l),s.closed=!0;return}if(s.contours.length===0&&Ne(s.host,l.bounds)){s={host:l,contours:[s.host],closed:!0};return}c(),s={host:l,contours:[],closed:l.closed}}),c(),n.forEach(l=>{e.beginShape(),Te(e,l.host,o),l.contours.forEach(a=>{e.beginContour(),Te(e,a,o),e.endContour()}),e.endShape(l.closed?e.CLOSE:e.OPEN)})}function Ce(e){const t=[];let o=0;return e.forEach(r=>{if(r.type==="M"||r.type==="L"){const n=U(o);t.push({name:n,x:r.x,y:r.y}),o++}else if(r.type==="C"){const n=U(o-1),s=U(o),c=n+"c",l="c"+s;t.push({name:c,x:r.x1,y:r.y1}),t.push({name:l,x:r.x2,y:r.y2}),t.push({name:s,x:r.x,y:r.y}),o++}}),t}function Ye(e){const t=e.map(l=>l.x),o=e.map(l=>l.y),r=Math.min(...t),n=Math.min(...o),s=Math.max(...t),c=Math.max(...o);return{minX:r,minY:n,maxX:s,maxY:c,width:s-r,height:c-n}}function de(e){if(e.length===0)return null;const t=e.reduce((o,r)=>({x:o.x+r.x,y:o.y+r.y}),{x:0,y:0});return{x:t.x/e.length,y:t.y/e.length}}function Je(e){if(e.length<3)return de(e.map(([n,s])=>({x:n,y:s})));let t=0,o=0,r=0;for(let n=0;n<e.length;n++){const[s,c]=e[n],[l,a]=e[(n+1)%e.length],i=s*a-l*c;t+=i,o+=(s+l)*i,r+=(c+a)*i}return Math.abs(t)<1e-9?de(e.map(([n,s])=>({x:n,y:s}))):{x:o/(3*t),y:r/(3*t)}}function De(e){if(!e)return null;if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?null:{x:(e.x1+e.x2)/2,y:(e.y1+e.y2)/2};if(e.kind==="polyline"){const t=e.points||[];return de(t.map(([o,r])=>({x:o,y:r})))}return e.kind==="polygon"?Je(e.points||[]):e.kind==="rect"?e.x==null||e.y==null||e.width==null||e.height==null?null:{x:e.x+e.width/2,y:e.y+e.height/2}:e.kind==="circle"?e.cx==null||e.cy==null?null:{x:e.cx,y:e.cy}:e.kind==="ellipse"?e.cx==null||e.cy==null?null:{x:e.cx,y:e.cy}:null}function et(e){return e?e.kind==="line"?"midpoint":e.kind==="polyline"||e.kind==="polygon"?"centroid":"center":"reference"}function tt(e){if(!e)return[];if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?[]:[{point:{x:e.x1,y:e.y1},label:"start"},{point:{x:e.x2,y:e.y2},label:"end"}];const t=De(e);return t?[{point:t,label:et(e)}]:[]}function nt(e,t,o,r=!0){const n=be(e),s=Ce(n),c=tt(o?.primitive),l=!!o?.primitive;if(s.length===0)return;const a=Ye(s);new window.p5(i=>{const P=a.width>0?440/a.width:1,x=a.height>0?440/a.height:1,y=Math.min(P,x),f=a.width*y,d=a.height*y,p=(500-f)/2-a.minX*y,b=(500-d)/2-a.minY*y;i.setup=()=>{i.createCanvas(500,500),i.noLoop()},i.draw=()=>{i.background(30);const g=(w,v)=>({x:w*y+p,y:v*y+b});i.stroke(60),i.strokeWeight(1);for(let w=0;w<=500;w+=50)i.line(w,0,w,500),i.line(0,w,500,w);const $=g(0,0);if(i.stroke(255,100,100),i.strokeWeight(2),i.line(0,$.y,500,$.y),i.stroke(100,255,100),i.strokeWeight(2),i.line($.x,0,$.x,500),i.noStroke(),i.fill(255,200,0),i.circle($.x,$.y,12),i.fill(255),i.textAlign(i.LEFT,i.BOTTOM),i.textSize(14),i.textStyle(i.BOLD),i.text("(0, 0)",$.x+8,$.y-8),i.fill(100,150,255,50),i.stroke(100,150,255),i.strokeWeight(2),Ae(i,n,g),l&&c.length>0)c.forEach(({point:w,label:v})=>{const S=g(w.x,w.y);i.noStroke(),i.fill(255,220,120),i.circle(S.x,S.y,12),i.fill(255),i.textAlign(i.CENTER,i.CENTER),i.textSize(12),i.textStyle(i.BOLD),i.text(v,S.x,S.y-16),r&&(i.textSize(9),i.textStyle(i.NORMAL),i.fill(200),i.text(`(${w.x.toFixed(1)}, ${w.y.toFixed(1)})`,S.x,S.y+16))});else{i.stroke(255,200,100,100),i.strokeWeight(1);let w=0;n.forEach(v=>{if(v.type==="C"){const S=s.find(E=>E.name===String.fromCharCode(65+w-1)),N=s.find(E=>E.name===S?.name+"c"),k=s.find(E=>E.name==="c"+String.fromCharCode(65+w)),D=s.find(E=>E.name===String.fromCharCode(65+w));if(S&&N){const E=g(S.x,S.y),_=g(N.x,N.y);i.line(E.x,E.y,_.x,_.y)}if(k&&D){const E=g(k.x,k.y),_=g(D.x,D.y);i.line(E.x,E.y,_.x,_.y)}w++}else(v.type==="M"||v.type==="L")&&w++}),s.forEach(v=>{const S=g(v.x,v.y),N=v.name.includes("c");i.noStroke(),N?(i.fill(255,200,100),i.circle(S.x,S.y,8)):(i.fill(100,255,150),i.circle(S.x,S.y,10)),i.fill(255),i.noStroke(),i.textAlign(i.CENTER,i.CENTER),i.textSize(12),i.textStyle(i.BOLD);const k=15;i.text(v.name,S.x,S.y-k),r&&(i.textSize(9),i.textStyle(i.NORMAL),i.fill(200),i.text(`(${v.x.toFixed(1)}, ${v.y.toFixed(1)})`,S.x,S.y+k+3))})}i.fill(200),i.noStroke(),i.textAlign(i.LEFT,i.TOP),i.textSize(11),i.text(`Scale: ${y.toFixed(3)}x`,10,10),i.text(`Size: ${a.width.toFixed(1)} × ${a.height.toFixed(1)}`,10,25)}},t)}function Pe(e,t,o,r=[]){const n=e.map((a,i)=>({id:t[i]??i+1,commands:be(a),primitive:r[i]?.primitive})).filter(a=>a.commands.length>0),s=n.flatMap(a=>Ce(a.commands));if(s.length===0)return;const c=Ye(s),l=n.map(()=>{const a=80+Math.floor(Math.random()*176),i=80+Math.floor(Math.random()*176),m=80+Math.floor(Math.random()*176);return{stroke:[a,i,m]}});new window.p5(a=>{const M=c.width>0?440/c.width:1,P=c.height>0?440/c.height:1,x=Math.min(M,P),y=c.width*x,f=c.height*x,d=(500-y)/2-c.minX*x,p=(500-f)/2-c.minY*x,b=(g,$)=>({x:g*x+d,y:$*x+p});a.setup=()=>{a.createCanvas(500,500),a.noLoop()},a.draw=()=>{a.background(30),a.stroke(60),a.strokeWeight(1);for(let $=0;$<=500;$+=50)a.line($,0,$,500),a.line(0,$,500,$);const g=b(0,0);a.stroke(255,100,100),a.strokeWeight(2),a.line(0,g.y,500,g.y),a.stroke(100,255,100),a.strokeWeight(2),a.line(g.x,0,g.x,500),a.noStroke(),a.fill(255,200,0),a.circle(g.x,g.y,10),n.forEach(($,w)=>{const v=$.commands,S=l[w];a.noFill(),a.stroke(S.stroke[0],S.stroke[1],S.stroke[2]),a.strokeWeight(2),Ae(a,v,b)}),a.noStroke(),a.fill(255),a.textAlign(a.CENTER,a.CENTER),a.textSize(11),a.textStyle(a.BOLD),n.forEach($=>{const w=De($.primitive),v=de(Ce($.commands).map(k=>({x:k.x,y:k.y}))),S=w??v;if(!S)return;const N=b(S.x,S.y);a.text(String($.id),N.x,N.y)}),a.fill(200),a.noStroke(),a.textAlign(a.LEFT,a.TOP),a.textSize(11),a.text(`Paths: ${n.length}`,10,10),a.text(`Scale: ${x.toFixed(3)}x`,10,25),a.text(`Size: ${c.width.toFixed(1)} x ${c.height.toFixed(1)}`,10,40)}},o)}const fe=.5522847498307936;function A(e,t=0){if(e==null)return t;const o=Number.parseFloat(e);return Number.isFinite(o)?o:t}function ot(e){if(!e)return[];const t=/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g,o=(e.match(t)||[]).map(Number),r=[];for(let n=0;n+1<o.length;n+=2)r.push([o[n],o[n+1]]);return r}function st(e){const t=A(e.getAttribute("x1"),0),o=A(e.getAttribute("y1"),0),r=A(e.getAttribute("x2"),0),n=A(e.getAttribute("y2"),0);return{pathData:`M ${t} ${o} L ${r} ${n}`,sourceIndex:0,primitive:{kind:"line",x1:t,y1:o,x2:r,y2:n}}}function ke(e,t){const o=ot(e.getAttribute("points"));if(o.length<2)return null;const[r,n]=o[0],s=o.slice(1).map(([c,l])=>`L ${c} ${l}`).join(" ");return{pathData:`M ${r} ${n} ${s}${t?" Z":""}`,sourceIndex:0,primitive:{kind:t?"polygon":"polyline",points:o}}}function rt(e,t,o,r,n,s){if(n===0||s===0)return`M ${e} ${t} L ${e+o} ${t} L ${e+o} ${t+r} L ${e} ${t+r} Z`;const c=n*fe,l=s*fe,a=e+o,i=t+r;return[`M ${e+n} ${t}`,`L ${a-n} ${t}`,`C ${a-n+c} ${t} ${a} ${t+s-l} ${a} ${t+s}`,`L ${a} ${i-s}`,`C ${a} ${i-s+l} ${a-n+c} ${i} ${a-n} ${i}`,`L ${e+n} ${i}`,`C ${e+n-c} ${i} ${e} ${i-s+l} ${e} ${i-s}`,`L ${e} ${t+s}`,`C ${e} ${t+s-l} ${e+n-c} ${t} ${e+n} ${t}`,"Z"].join(" ")}function at(e){const t=A(e.getAttribute("x"),0),o=A(e.getAttribute("y"),0),r=A(e.getAttribute("width"),0),n=A(e.getAttribute("height"),0);if(r<=0||n<=0)return null;const s=e.getAttribute("rx"),c=e.getAttribute("ry");let l=A(s,0),a=A(c,0);return s!=null&&c==null&&(a=l),c!=null&&s==null&&(l=a),l=Math.max(0,Math.min(l,r/2)),a=Math.max(0,Math.min(a,n/2)),{pathData:rt(t,o,r,n,l,a),sourceIndex:0,primitive:{kind:"rect",x:t,y:o,width:r,height:n,rx:l,ry:a}}}function Xe(e,t,o,r){const n=o*fe,s=r*fe;return[`M ${e+o} ${t}`,`C ${e+o} ${t+s} ${e+n} ${t+r} ${e} ${t+r}`,`C ${e-n} ${t+r} ${e-o} ${t+s} ${e-o} ${t}`,`C ${e-o} ${t-s} ${e-n} ${t-r} ${e} ${t-r}`,`C ${e+n} ${t-r} ${e+o} ${t-s} ${e+o} ${t}`,"Z"].join(" ")}function it(e){const t=A(e.getAttribute("cx"),0),o=A(e.getAttribute("cy"),0),r=A(e.getAttribute("r"),0);return r<=0?null:{pathData:Xe(t,o,r,r),sourceIndex:0,primitive:{kind:"circle",cx:t,cy:o,r}}}function ct(e){const t=A(e.getAttribute("cx"),0),o=A(e.getAttribute("cy"),0),r=A(e.getAttribute("rx"),0),n=A(e.getAttribute("ry"),0);return r<=0||n<=0?null:{pathData:Xe(t,o,r,n),sourceIndex:0,primitive:{kind:"ellipse",cx:t,cy:o,rx:r,ry:n}}}function lt(e){const o=Array.from(e.querySelectorAll("path,rect,circle,ellipse,line,polyline,polygon")),r=[];return o.forEach((n,s)=>{const c=s+1,l=n.tagName.toLowerCase();if(l==="path"){const i=n.getAttribute("d");i&&r.push({pathData:i,sourceIndex:c});return}let a=null;l==="line"?a=st(n):l==="polyline"?a=ke(n,!1):l==="polygon"?a=ke(n,!0):l==="rect"?a=at(n):l==="circle"?a=it(n):l==="ellipse"&&(a=ct(n)),a&&(a.sourceIndex=c,r.push(a))}),r}const q=document.getElementById("dropZone"),Ve=document.getElementById("fileInput"),j=document.getElementById("functionPrefix"),K=document.getElementById("output");let O=[],le=null,ye=0;function ze(e){const t=e.lastIndexOf(".");return t<=0?e:e.slice(0,t)}function we(e){const t=e.trim().replace(/[^a-zA-Z0-9_]/g,"_").replace(/_+/g,"_").replace(/^_+|_+$/g,"");return t.length===0?"shape":/^[a-zA-Z_]/.test(t)?t:`_${t}`}function Fe(e){return we(e)}function ut(e){const t=new Set,o=new Map;return e.map(r=>{if(!t.has(r))return t.add(r),o.set(r,1),r;let n=(o.get(r)||1)+1,s=`${r}_${n}`;for(;t.has(s);)n+=1,s=`${r}_${n}`;return o.set(r,n),t.add(s),s})}function dt(e,t,o){return we(`${e}_${t||"path"}${o}`)}function ft(e){return we(`${e}_drawAllPaths`)}function $e(e){const t=ze(e.name).trim();return t.length>0?t:"shape"}function ht(e,t){const o=ze(e).trim();if(t==="pde"){const n=o.replace(/[^a-zA-Z0-9_]/g,"_").replace(/_+/g,"_").replace(/^_+|_+$/g,"");return n.length===0?"drawing":/^[0-9]/.test(n)?`svg${n}`:n}const r=o.replace(/[^a-zA-Z0-9._-]/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"");return r.length>0?r:"drawing"}function ue(e,t){if(t==="pde"){const o=e.replace(/[^a-zA-Z0-9_]/g,"_").replace(/_+/g,"_").replace(/^_+|_+$/g,""),r=o.length>0?o:"drawing";return`${/^[0-9]/.test(r)?`svg${r}`:r}.pde`}return`${e}.${t}`}async function pt(e){if(!e)return!1;if(typeof navigator<"u"&&navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.top="0",t.style.left="-9999px",t.style.opacity="0",t.style.pointerEvents="none",document.body.appendChild(t),t.focus(),t.select(),t.setSelectionRange(0,t.value.length);let o=!1;try{o=document.execCommand("copy")}catch{o=!1}return document.body.removeChild(t),o}const ve=new WeakMap;function gt(e){const t=e.dataset.baseLabel;if(t!==void 0)return t;const o=e.textContent||"";return e.dataset.baseLabel=o,o}function Me(e,t,o=2e3){const r=gt(e),n=ve.get(e);n!==void 0&&window.clearTimeout(n),e.textContent=t;const s=window.setTimeout(()=>{e.textContent=r,ve.delete(e)},o);ve.set(e,s)}function _e(e){return e.type==="image/svg+xml"||e.name.toLowerCase().endsWith(".svg")}function Be(e){return Array.from(e).filter(_e)}q.addEventListener("click",()=>Ve.click());document.querySelectorAll('input[name="vectorFormat"]').forEach(e=>{e.addEventListener("change",t=>{const o=t.target,r=document.getElementById("processingVectorOption"),n=document.getElementById("instanceModeOption");r&&(r.style.display=o.value==="Processing"?"flex":"none"),n&&(n.style.display=o.value==="Processing"?"none":"flex"),O.length>0&&Q(O)})});document.querySelectorAll('input[name="language"], input[name="processingVector"], input[name="sortMode"], #instanceMode, #showCoordinates').forEach(e=>{e.addEventListener("change",()=>{O.length>0&&Q(O)})});document.querySelectorAll("#coordMultiplier, #precision").forEach(e=>{e.addEventListener("change",()=>{O.length>0&&Q(O)})});j&&j.addEventListener("input",()=>{O.length>0&&Q(O)});q.addEventListener("dragover",e=>{e.preventDefault(),q.classList.add("dragover")});q.addEventListener("dragleave",()=>{q.classList.remove("dragover")});q.addEventListener("drop",e=>{e.preventDefault(),q.classList.remove("dragover");const t=e.dataTransfer?.files;if(!t){alert("Please drop at least one SVG file");return}const o=Be(t);if(o.length===0){alert("Please drop at least one valid SVG file");return}Q(o)});Ve.addEventListener("change",e=>{const t=e.target.files;if(!t)return;const o=Be(t);o.length!==0&&Q(o)});async function Q(e){const t=e.filter(_e);if(t.length===0)return;const o=t.length>1,r=O.length===1&&t.length===1&&O[0]===t[0];j&&(j.disabled=o,o?(j.value="Auto per file",j.title="Disabled for multi-file imports. Filename prefixes are used automatically."):(j.title="",r||(j.value=$e(t[0])))),O=[...t];const n=++ye;let s=[];try{s=await Promise.all(t.map(async(u,h)=>{const I=await u.text(),z=new DOMParser().parseFromString(I,"image/svg+xml");return{file:u,fileIndex:h,shapes:lt(z)}}))}catch{if(n!==ye)return;K.innerHTML='<div class="output"><p>Could not read one or more SVG files.</p></div>';return}if(n!==ye)return;le&&(le(),le=null);const c=s.filter(u=>u.shapes.length>0);if(c.length===0){K.innerHTML='<div class="output"><p>No supported drawable elements found (path, line, polyline, polygon, rect, circle, ellipse).</p></div>';return}const l=document.querySelector('input[name="vectorFormat"]:checked')?.value||"Vec",a=document.querySelector('input[name="language"]:checked')?.value||"javascript",i=parseFloat(document.getElementById("coordMultiplier")?.value)||1,m=parseInt(document.getElementById("precision")?.value)||5,C=document.querySelector('input[name="processingVector"]:checked')?.value||"PVector",M=document.getElementById("instanceMode")?.checked||!1,P=document.getElementById("showCoordinates")?.checked??!0,x=document.querySelector('input[name="sortMode"]:checked')?.value||"primitive",y={vectorFormat:l,language:a,coordMultiplier:i,precision:m,processingVector:C,instanceMode:M},f=Fe(j?.value||$e(c[0].file)),d=o?ut(c.map(u=>Fe($e(u.file)))):[f],p=c.map((u,h)=>{const I=o?d[h]:f;return{file:u.file,fileIndex:u.fileIndex,filePrefix:I,drawAllFunctionName:ft(I)}}),b=[];let g=1;c.forEach((u,h)=>{const I=p[h];u.shapes.forEach((F,z)=>{b.push({fileIndex:u.fileIndex,fileName:u.file.name,shape:F,functionName:dt(I.filePrefix,F.primitive?.kind,z+1),globalId:g++})})});const $=[...b].sort((u,h)=>{if(x==="svg")return u.fileIndex!==h.fileIndex?u.fileIndex-h.fileIndex:u.shape.sourceIndex-h.shape.sourceIndex;const I=u.shape.primitive?.kind??"path",F=h.shape.primitive?.kind??"path";return I===F?u.fileIndex!==h.fileIndex?u.fileIndex-h.fileIndex:u.shape.sourceIndex-h.shape.sourceIndex:I.localeCompare(F)}),w=$.map(u=>u.functionName),v=new Map;$.forEach(u=>{const h=v.get(u.fileIndex)||[];h.push(u.functionName),v.set(u.fileIndex,h)});let S="",N="";const k=[],D=[],E=[],_=new Map,J=[],ee=new Map,te=[];$.forEach((u,h)=>{k.push(u.shape.pathData),D.push(u.globalId),E.push(u.shape),te.push(u.functionName);let I=_.get(u.fileIndex);I||(I={previewId:`preview-all-file-${u.fileIndex}`,fileName:u.fileName,pathsData:[],shapeIds:[],shapes:[]},_.set(u.fileIndex,I)),I.pathsData.push(u.shape.pathData),I.shapeIds.push(u.globalId),I.shapes.push(u.shape);const F=Ke(u.shape.pathData,y,h,u.shape,u.functionName);h===0&&(S=F.sharedCode),J.push(F.pathCode),ee.set(u.functionName,F.pathCode);const z=`preview-${h}`;N+=`
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
                <pre><code>${R(F.pathCode)}</code></pre>
              </div>
            </div>
          </div>
        `});const ne=S.trim(),he=J.join(`

`).trim(),ae=[];let T="";if(o){const u=[];p.forEach(h=>{const I=v.get(h.fileIndex)||[];I.length!==0&&(u.push(h.drawAllFunctionName),ae.push(ce(I,y,h.drawAllFunctionName).trim()))}),T=ce(u,y).trim()}else T=ce(w,y,p[0].drawAllFunctionName).trim();const L=[T,...ae,he].filter(u=>u.length>0).join(`

`),Y=[ne,L].filter(u=>u.length>0).join(`

`),V=l==="Processing"?"pde":a==="typescript"?"ts":"js",X=ue("svg_complete",V),W=ue("svg_paths",V),Z=ue("svg_shared",V),G=[];o&&p.forEach(u=>{const h=v.get(u.fileIndex)||[];if(h.length===0)return;const I=ce(h,y,u.drawAllFunctionName).trim(),F=h.map(B=>ee.get(B)||"").filter(B=>B.length>0).join(`

`).trim(),z=[I,F].filter(B=>B.length>0).join(`

`);G.push({codeKey:`drawing-file-${u.filePrefix}`,code:z,drawAllFunctionName:u.drawAllFunctionName,fileName:ue(`svg_${ht(u.file.name,V)}`,V),sourceFileName:u.file.name})});const oe={complete:Y,drawing:L,shared:ne};G.forEach(u=>{oe[u.codeKey]=u.code});const pe=`
      <div class="command-section">
        <div class="command-header">
          <h2>Complete File</h2>
          <div class="action-buttons">
            <button class="copy-btn" data-code-key="complete">Copy Complete Code</button>
            <button class="download-btn" data-code-key="complete" data-filename="${X}">Download ${X}</button>
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
            <button class="download-btn" data-code-key="drawing" data-filename="${W}">Download ${W}</button>
          </div>
        </div>
        <div class="shared-code-content">
          <pre><code>${R(L)}</code></pre>
        </div>
      </div>
    `,me=G.length>0?`
	      <div class="command-section">
	        <div class="command-header">
	          <h2>Per-file Drawing Downloads</h2>
        </div>
        <div class="command-content">
          <div class="command-content-inner">
            <div class="per-file-actions">
	              ${G.map(u=>`
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
    `:"",xe=`
      <div class="shared-code-section">
        <div class="shared-code-header">
          <h2>Shared Code</h2>
          <div class="action-buttons">
            <button class="copy-btn" data-code-key="shared">Copy Shared Code</button>
            <button class="download-btn" data-code-key="shared" data-filename="${Z}">Download ${Z}</button>
          </div>
        </div>
        <div class="shared-code-content">
          <pre><code>${R(ne)}</code></pre>
        </div>
      </div>
    `,Oe=o?`
      <div class="combined-preview-section output">
        <div class="combined-preview-header">
          <h2>All paths by file</h2>
        </div>
        <div class="combined-preview-grid">
          ${p.map(u=>{const h=_.get(u.fileIndex);return!h||h.pathsData.length===0?"":`
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
    `,Re=`
      <div class="shape-nav">
        <h3>Shapes</h3>
        <ul class="shape-nav-list">
          ${te.map((u,h)=>`
            <li>
              <button class="shape-nav-link" data-target="shape-section-${h}">${R(u)}</button>
            </li>
          `).join("")}
        </ul>
      </div>
    `;K.innerHTML=Re+pe+ge+me+xe+Oe+N,o?p.forEach(u=>{const h=_.get(u.fileIndex);!h||h.pathsData.length===0||Pe(h.pathsData,h.shapeIds,h.previewId,h.shapes)}):Pe(k,D,"preview-all",E),k.forEach((u,h)=>{nt(u,`preview-${h}`,E[h],P)}),le=mt(),K.querySelectorAll(".download-btn[data-code-key]").forEach(u=>{u.addEventListener("click",()=>{const h=u.dataset.codeKey,I=u.dataset.filename;if(!h||!I)return;const F=oe[h];if(!F)return;const z=new Blob([F],{type:"text/plain"}),B=URL.createObjectURL(z),ie=document.createElement("a");ie.href=B,ie.download=I,ie.click(),URL.revokeObjectURL(B);const He=u.textContent;u.textContent="Downloaded!",setTimeout(()=>{u.textContent=He},2e3)})}),K.querySelectorAll(".copy-btn").forEach(u=>{u.addEventListener("click",async h=>{const I=h.currentTarget;if(I.dataset.copying==="1")return;const F=I.dataset.codeKey;let z="";if(F?z=oe[F]||"":z=I.closest(".path-section")?.querySelector("code")?.textContent||"",!z){Me(I,"No code");return}I.dataset.copying="1";let B=!1;try{B=await pt(z)}finally{I.dataset.copying="0"}Me(I,B?"Copied!":"Copy failed")})})}function mt(){const e=Array.from(K.querySelectorAll(".shape-nav-link"));if(e.length===0)return()=>{};const t=e.map(l=>{const a=l.dataset.target;return a?document.getElementById(a):null}).filter(l=>l!==null);if(t.length===0)return()=>{};const o=l=>{e.forEach(a=>{a.classList.toggle("is-active",a.dataset.target===l.id)})},r=()=>{const l=window.innerHeight/2;let a=t[0],i=Number.POSITIVE_INFINITY;t.forEach(m=>{const C=m.getBoundingClientRect(),M=C.top+C.height/2,P=Math.abs(M-l);P<i&&(i=P,a=m)}),o(a)},n=l=>{const i=l.currentTarget.dataset.target;if(!i)return;const m=document.getElementById(i);m&&m.scrollIntoView({behavior:"smooth",block:"center"})};e.forEach(l=>{l.addEventListener("click",n)});let s=!1;const c=()=>{s||(s=!0,window.requestAnimationFrame(()=>{s=!1,r()}))};return window.addEventListener("scroll",c,{passive:!0}),window.addEventListener("resize",c),r(),()=>{e.forEach(l=>{l.removeEventListener("click",n)}),window.removeEventListener("scroll",c),window.removeEventListener("resize",c)}}
