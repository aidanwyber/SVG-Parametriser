(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}})();function Ce(e){const t=[],o=/([MLHVCSQTAZmlhvcsqtaz])\s*([^MLHVCSQTAZmlhvcsqtaz]*)/g;let r,n=0,s=0,c=0,l=0,a="",i=null,m=null;const C=()=>{i=null,m=null},F=N=>{const x=/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g;return(N.match(x)||[]).map(Number)};for(;(r=o.exec(e))!==null;){const N=r[1],x=N===N.toLowerCase(),y=N.toUpperCase(),f=F(r[2]);if(y==="M"){for(let d=0;d+1<f.length;d+=2){const g=x?n+f[d]:f[d],b=x?s+f[d+1]:f[d+1];d===0?(t.push({type:"M",x:g,y:b}),c=g,l=b):t.push({type:"L",x:g,y:b}),n=g,s=b}C(),a=f.length>2?"L":"M"}else if(y==="L"){for(let d=0;d+1<f.length;d+=2){const g=x?n+f[d]:f[d],b=x?s+f[d+1]:f[d+1];t.push({type:"L",x:g,y:b}),n=g,s=b}C(),a="L"}else if(y==="H"){for(let d=0;d<f.length;d++){const g=x?n+f[d]:f[d];t.push({type:"L",x:g,y:s}),n=g}C(),a="L"}else if(y==="V"){for(let d=0;d<f.length;d++){const g=x?s+f[d]:f[d];t.push({type:"L",x:n,y:g}),s=g}C(),a="L"}else if(y==="C")for(let d=0;d+5<f.length;d+=6){const g=x?n+f[d]:f[d],b=x?s+f[d+1]:f[d+1],p=x?n+f[d+2]:f[d+2],$=x?s+f[d+3]:f[d+3],w=x?n+f[d+4]:f[d+4],v=x?s+f[d+5]:f[d+5];t.push({type:"C",x1:g,y1:b,x2:p,y2:$,x:w,y:v}),n=w,s=v,i=p,m=$,a="C"}else if(y==="S")for(let d=0;d+3<f.length;d+=4){let g=n,b=s;(a==="C"||a==="S")&&i!==null&&m!==null&&(g=n*2-i,b=s*2-m);const p=x?n+f[d]:f[d],$=x?s+f[d+1]:f[d+1],w=x?n+f[d+2]:f[d+2],v=x?s+f[d+3]:f[d+3];t.push({type:"C",x1:g,y1:b,x2:p,y2:$,x:w,y:v}),n=w,s=v,i=p,m=$,a="S"}else y==="Z"?(t.push({type:"Z"}),n=c,s=l,C(),a="Z"):(C(),a=y)}return t}function U(e){let t="",o=e;for(;o>=0;)t=String.fromCharCode(65+o%26)+t,o=Math.floor(o/26)-1;return t}function j(e,t,o){const r=(e*t).toFixed(o);return parseFloat(r).toString()}function Oe(e){const{vectorFormat:t,language:o,processingVector:r="PVector",instanceMode:n=!1}=e,s=o==="typescript",c=t==="Processing",l=c&&r==="Vec2D",a=n&&t==="createVector";if(c){const F=l?"Vec2D":"PVector";return`${l?`import toxi.geom.*;

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

${F} applyTransform(${F} v) {
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

	return new ${F}(x, y);
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
}`}function Be(e,t){const{vectorFormat:o,language:r,instanceMode:n=!1}=t,s=r==="typescript",c=o==="Processing",l=n&&(o==="createVector"||o==="Vec");return c?`void ${e}() {`:`function ${e}(${l?s?"p: any":"p":""})${s?": void":""} {`}function Te(e){const{vectorFormat:t,instanceMode:o=!1}=e;return o&&(t==="createVector"||t==="Vec")?"p.":""}function we(){return{minX:Number.POSITIVE_INFINITY,minY:Number.POSITIVE_INFINITY,maxX:Number.NEGATIVE_INFINITY,maxY:Number.NEGATIVE_INFINITY}}function oe(e,t,o){e.minX=Math.min(e.minX,t),e.minY=Math.min(e.minY,o),e.maxX=Math.max(e.maxX,t),e.maxY=Math.max(e.maxY,o)}function Re(e){return Number.isFinite(e.minX)&&Number.isFinite(e.minY)&&Number.isFinite(e.maxX)&&Number.isFinite(e.maxY)}function je(e){const t=[];let o=[],r=!1,n=we();const s=()=>{if(o.length===0)return;const c=Re(n)?{...n}:{minX:0,minY:0,maxX:0,maxY:0};t.push({commands:o,closed:r,bounds:c}),o=[],r=!1,n=we()};return e.forEach(c=>{if(c.type==="M"){s(),o.push(c),oe(n,c.x,c.y);return}if(c.type==="L"){o.length===0&&o.push({type:"M",x:c.x,y:c.y}),o.push(c),oe(n,c.x,c.y);return}if(c.type==="C"){if(o.length===0)return;o.push(c),oe(n,c.x1,c.y1),oe(n,c.x2,c.y2),oe(n,c.x,c.y);return}c.type==="Z"&&(r=!0,s())}),s(),t}function qe(e,t){return e.bounds.minX>=t.minX-1e-6&&e.bounds.maxX<=t.maxX+1e-6&&e.bounds.minY>=t.minY-1e-6&&e.bounds.maxY<=t.maxY+1e-6}function He(e,t,o,r,n,s,c){const l=t.vectorFormat==="Processing",a=Te(t),i=d=>j(d,o,r),m=[],C=[],F="'x'",N="'y'",x=l?"'a'":"'avg'",y=(d,g,b)=>{const p=`${c}${s}(${i(g)}, ${i(b)}))`;l?m.push(`${n} ${d} = ${p};`):m.push(`const ${d} = ${p};`)},f=(d,g,b)=>{const p=`applyTransformScalar(${i(g)}, ${b})`;l?m.push(`float ${d} = ${p};`):m.push(`const ${d} = ${p};`)};if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?null:(y("p1",e.x1,e.y1),y("p2",e.x2,e.y2),C.push(`${a}line(p1.x, p1.y, p2.x, p2.y);`),{declarations:m,drawCalls:C});if(e.kind==="polyline"||e.kind==="polygon"){const d=e.points||[];return d.length<2?null:(d.forEach(([g,b],p)=>{y(`p${p}`,g,b)}),C.push(`${a}beginShape();`),d.forEach((g,b)=>{C.push(`${a}vertex(p${b}.x, p${b}.y);`)}),C.push(`${a}endShape(${e.kind==="polygon"?"CLOSE":"OPEN"});`),{declarations:m,drawCalls:C})}if(e.kind==="rect"){if(e.x==null||e.y==null||e.width==null||e.height==null)return null;y("rectPos",e.x,e.y),f("rectW",e.width,F),f("rectH",e.height,N);const d=e.rx||0,g=e.ry||0;if(d>0||g>0){if(Math.abs(d-g)>1e-9)return null;f("rectR",d,x),C.push(`${a}rect(rectPos.x, rectPos.y, rectW, rectH, rectR);`)}else C.push(`${a}rect(rectPos.x, rectPos.y, rectW, rectH);`);return{declarations:m,drawCalls:C}}return e.kind==="circle"?e.cx==null||e.cy==null||e.r==null?null:(y("circleCenter",e.cx,e.cy),f("circleDiameter",e.r*2,x),C.push(`${a}circle(circleCenter.x, circleCenter.y, circleDiameter);`),{declarations:m,drawCalls:C}):e.kind==="ellipse"?e.cx==null||e.cy==null||e.rx==null||e.ry==null?null:(y("ellipseCenter",e.cx,e.cy),f("ellipseW",e.rx*2,F),f("ellipseH",e.ry*2,N),C.push(`${a}ellipse(ellipseCenter.x, ellipseCenter.y, ellipseW, ellipseH);`),{declarations:m,drawCalls:C}):null}function We(e,t,o,r,n){const{vectorFormat:s,coordMultiplier:c,precision:l,processingVector:a="PVector",instanceMode:i=!1}=t,m=s==="Processing",C=m&&a==="Vec2D",F=i&&(s==="createVector"||s==="Vec"),N=n||`drawPath${o+1}`,x=m?C?"new Vec2D":"new PVector":s==="Vec"?"new Vec":i&&s==="createVector"?"p.createVector":"createVector",y=[],f=m?C?"Vec2D":"PVector":"const",d=F&&s==="createVector"?"applyTransform(p, ":"applyTransform(",g=Oe(t),b=Be(N,t),p=Te(t);if(r?.primitive){const M=He(r.primitive,t,c,l,f,x,d);if(M){const D=M.declarations.length>0?`${M.declarations.map(Y=>`	${Y}`).join(`
`)}

`:"",L=M.drawCalls.map(Y=>`	${Y}`).join(`
`),R=`${b}
${D}${L}
}`;return{sharedCode:g,pathCode:R}}}const $=Ce(e),w=je($);let v=0;const S=M=>{const D=[];return M.commands.forEach(L=>{if(L.type==="M"||L.type==="L"){const R=U(v),Y=j(L.x,c,l),H=j(L.y,c,l);y.push(`${R} = ${d}${x}(${Y}, ${H}))`),D.push(`${p}vertex(${R}.x, ${R}.y);`),v++;return}if(L.type==="C"){const R=U(v-1),Y=U(v),H=R+"c",Z="c"+Y,ae=j(L.x1,c,l),K=j(L.y1,c,l),ne=j(L.x2,c,l),he=j(L.y2,c,l),ge=j(L.x,c,l),pe=j(L.y,c,l);y.push(`${H} = ${d}${x}(${ae}, ${K}))`),y.push(`${Z} = ${d}${x}(${ne}, ${he}))`),y.push(`${Y} = ${d}${x}(${ge}, ${pe}))`),D.push(`${p}bezierVertex(${H}.x, ${H}.y, ${Z}.x, ${Z}.y, ${Y}.x, ${Y}.y);`),v++}}),D};let E=[],P=!1,z=null;const T=[],V=()=>{E.length!==0&&(T.push([`${p}beginShape();`,...E,`${p}endShape(${P?"CLOSE":"OPEN"});`].join(`
`)),E=[],P=!1,z=null)};w.forEach(M=>{const D=S(M);if(D.length===0)return;if(E.length===0){E=D,P=M.closed,z=M.bounds;return}if(z!==null&&qe(M,z)){P=!0,E.push(`${p}beginContour();`),E.push(...D),E.push(`${p}endContour();`);return}V(),E=D,P=M.closed,z=M.bounds}),V();const J=y.length>0?`	${f} ${y.join(`,
		`)};`:"",ee=T.map(M=>M.split(`
`).map(D=>`	${D}`).join(`
`)).join(`

`),re=J?`${J}

`:"",te=ee?`${ee}
`:"",fe=`${b}
${re}${te}}`;return{sharedCode:g,pathCode:fe}}function ie(e,t,o="drawAllPaths"){const{vectorFormat:r,language:n,instanceMode:s=!1}=t,c=n==="typescript",l=r==="Processing",a=s&&(r==="createVector"||r==="Vec"),i=e.map(m=>l?`	${m}();`:a?`	${m}(p);`:`	${m}();`).join(`
`);return l?`
void ${o}() {
${i}
}`:`
function ${o}(${a?c?"p: any":"p":""})${c?": void":""} {
${i}
}`}function B(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function Se(){return{minX:Number.POSITIVE_INFINITY,minY:Number.POSITIVE_INFINITY,maxX:Number.NEGATIVE_INFINITY,maxY:Number.NEGATIVE_INFINITY}}function se(e,t,o){e.minX=Math.min(e.minX,t),e.minY=Math.min(e.minY,o),e.maxX=Math.max(e.maxX,t),e.maxY=Math.max(e.maxY,o)}function Ze(e){return Number.isFinite(e.minX)&&Number.isFinite(e.minY)&&Number.isFinite(e.maxX)&&Number.isFinite(e.maxY)}function Ke(e){const t=[];let o=[],r=!1,n=Se();const s=()=>{if(o.length===0)return;const c=Ze(n)?{...n}:{minX:0,minY:0,maxX:0,maxY:0};t.push({commands:o,closed:r,bounds:c}),o=[],r=!1,n=Se()};return e.forEach(c=>{if(c.type==="M"){s(),o.push(c),se(n,c.x,c.y);return}if(c.type==="L"){o.length===0&&o.push({type:"M",x:c.x,y:c.y}),o.push(c),se(n,c.x,c.y);return}if(c.type==="C"){if(o.length===0)return;o.push(c),se(n,c.x1,c.y1),se(n,c.x2,c.y2),se(n,c.x,c.y);return}c.type==="Z"&&(r=!0,s())}),s(),t}function Ge(e,t){return e.bounds.minX>=t.minX-1e-6&&e.bounds.maxX<=t.maxX+1e-6&&e.bounds.minY>=t.minY-1e-6&&e.bounds.maxY<=t.maxY+1e-6}function xe(e,t,o){t.commands.forEach(r=>{if(r.type==="M"||r.type==="L"){const n=o(r.x,r.y);e.vertex(n.x,n.y);return}if(r.type==="C"){const n=o(r.x1,r.y1),s=o(r.x2,r.y2),c=o(r.x,r.y);e.bezierVertex(n.x,n.y,s.x,s.y,c.x,c.y)}})}function Pe(e,t,o){const r=Ke(t).filter(l=>l.commands.length>0);if(r.length===0)return;let n=null,s=!1;const c=()=>{n&&(e.endShape(s?e.CLOSE:e.OPEN),n=null,s=!1)};r.forEach(l=>{if(!n){e.beginShape(),xe(e,l,o),n=l,s=l.closed;return}if(Ge(l,n.bounds)){s=!0,e.beginContour(),xe(e,l,o),e.endContour();return}c(),e.beginShape(),xe(e,l,o),n=l,s=l.closed}),c()}function ve(e){const t=[];let o=0;return e.forEach(r=>{if(r.type==="M"||r.type==="L"){const n=U(o);t.push({name:n,x:r.x,y:r.y}),o++}else if(r.type==="C"){const n=U(o-1),s=U(o),c=n+"c",l="c"+s;t.push({name:c,x:r.x1,y:r.y1}),t.push({name:l,x:r.x2,y:r.y2}),t.push({name:s,x:r.x,y:r.y}),o++}}),t}function ke(e){const t=e.map(l=>l.x),o=e.map(l=>l.y),r=Math.min(...t),n=Math.min(...o),s=Math.max(...t),c=Math.max(...o);return{minX:r,minY:n,maxX:s,maxY:c,width:s-r,height:c-n}}function ue(e){if(e.length===0)return null;const t=e.reduce((o,r)=>({x:o.x+r.x,y:o.y+r.y}),{x:0,y:0});return{x:t.x/e.length,y:t.y/e.length}}function Ue(e){if(e.length<3)return ue(e.map(([n,s])=>({x:n,y:s})));let t=0,o=0,r=0;for(let n=0;n<e.length;n++){const[s,c]=e[n],[l,a]=e[(n+1)%e.length],i=s*a-l*c;t+=i,o+=(s+l)*i,r+=(c+a)*i}return Math.abs(t)<1e-9?ue(e.map(([n,s])=>({x:n,y:s}))):{x:o/(3*t),y:r/(3*t)}}function Fe(e){if(!e)return null;if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?null:{x:(e.x1+e.x2)/2,y:(e.y1+e.y2)/2};if(e.kind==="polyline"){const t=e.points||[];return ue(t.map(([o,r])=>({x:o,y:r})))}return e.kind==="polygon"?Ue(e.points||[]):e.kind==="rect"?e.x==null||e.y==null||e.width==null||e.height==null?null:{x:e.x+e.width/2,y:e.y+e.height/2}:e.kind==="circle"?e.cx==null||e.cy==null?null:{x:e.cx,y:e.cy}:e.kind==="ellipse"?e.cx==null||e.cy==null?null:{x:e.cx,y:e.cy}:null}function Qe(e){return e?e.kind==="line"?"midpoint":e.kind==="polyline"||e.kind==="polygon"?"centroid":"center":"reference"}function Je(e){if(!e)return[];if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?[]:[{point:{x:e.x1,y:e.y1},label:"start"},{point:{x:e.x2,y:e.y2},label:"end"}];const t=Fe(e);return t?[{point:t,label:Qe(e)}]:[]}function et(e,t,o,r=!0){const n=Ce(e),s=ve(n),c=Je(o?.primitive),l=!!o?.primitive;if(s.length===0)return;const a=ke(s);new window.p5(i=>{const N=a.width>0?440/a.width:1,x=a.height>0?440/a.height:1,y=Math.min(N,x),f=a.width*y,d=a.height*y,g=(500-f)/2-a.minX*y,b=(500-d)/2-a.minY*y;i.setup=()=>{i.createCanvas(500,500),i.noLoop()},i.draw=()=>{i.background(30);const p=(w,v)=>({x:w*y+g,y:v*y+b});i.stroke(60),i.strokeWeight(1);for(let w=0;w<=500;w+=50)i.line(w,0,w,500),i.line(0,w,500,w);const $=p(0,0);if(i.stroke(255,100,100),i.strokeWeight(2),i.line(0,$.y,500,$.y),i.stroke(100,255,100),i.strokeWeight(2),i.line($.x,0,$.x,500),i.noStroke(),i.fill(255,200,0),i.circle($.x,$.y,12),i.fill(255),i.textAlign(i.LEFT,i.BOTTOM),i.textSize(14),i.textStyle(i.BOLD),i.text("(0, 0)",$.x+8,$.y-8),i.fill(100,150,255,50),i.stroke(100,150,255),i.strokeWeight(2),Pe(i,n,p),l&&c.length>0)c.forEach(({point:w,label:v})=>{const S=p(w.x,w.y);i.noStroke(),i.fill(255,220,120),i.circle(S.x,S.y,12),i.fill(255),i.textAlign(i.CENTER,i.CENTER),i.textSize(12),i.textStyle(i.BOLD),i.text(v,S.x,S.y-16),r&&(i.textSize(9),i.textStyle(i.NORMAL),i.fill(200),i.text(`(${w.x.toFixed(1)}, ${w.y.toFixed(1)})`,S.x,S.y+16))});else{i.stroke(255,200,100,100),i.strokeWeight(1);let w=0;n.forEach(v=>{if(v.type==="C"){const S=s.find(T=>T.name===String.fromCharCode(65+w-1)),E=s.find(T=>T.name===S?.name+"c"),P=s.find(T=>T.name==="c"+String.fromCharCode(65+w)),z=s.find(T=>T.name===String.fromCharCode(65+w));if(S&&E){const T=p(S.x,S.y),V=p(E.x,E.y);i.line(T.x,T.y,V.x,V.y)}if(P&&z){const T=p(P.x,P.y),V=p(z.x,z.y);i.line(T.x,T.y,V.x,V.y)}w++}else(v.type==="M"||v.type==="L")&&w++}),s.forEach(v=>{const S=p(v.x,v.y),E=v.name.includes("c");i.noStroke(),E?(i.fill(255,200,100),i.circle(S.x,S.y,8)):(i.fill(100,255,150),i.circle(S.x,S.y,10)),i.fill(255),i.noStroke(),i.textAlign(i.CENTER,i.CENTER),i.textSize(12),i.textStyle(i.BOLD);const P=15;i.text(v.name,S.x,S.y-P),r&&(i.textSize(9),i.textStyle(i.NORMAL),i.fill(200),i.text(`(${v.x.toFixed(1)}, ${v.y.toFixed(1)})`,S.x,S.y+P+3))})}i.fill(200),i.noStroke(),i.textAlign(i.LEFT,i.TOP),i.textSize(11),i.text(`Scale: ${y.toFixed(3)}x`,10,10),i.text(`Size: ${a.width.toFixed(1)} × ${a.height.toFixed(1)}`,10,25)}},t)}function Ie(e,t,o,r=[]){const n=e.map((a,i)=>({id:t[i]??i+1,commands:Ce(a),primitive:r[i]?.primitive})).filter(a=>a.commands.length>0),s=n.flatMap(a=>ve(a.commands));if(s.length===0)return;const c=ke(s),l=n.map(()=>{const a=80+Math.floor(Math.random()*176),i=80+Math.floor(Math.random()*176),m=80+Math.floor(Math.random()*176);return{stroke:[a,i,m]}});new window.p5(a=>{const F=c.width>0?440/c.width:1,N=c.height>0?440/c.height:1,x=Math.min(F,N),y=c.width*x,f=c.height*x,d=(500-y)/2-c.minX*x,g=(500-f)/2-c.minY*x,b=(p,$)=>({x:p*x+d,y:$*x+g});a.setup=()=>{a.createCanvas(500,500),a.noLoop()},a.draw=()=>{a.background(30),a.stroke(60),a.strokeWeight(1);for(let $=0;$<=500;$+=50)a.line($,0,$,500),a.line(0,$,500,$);const p=b(0,0);a.stroke(255,100,100),a.strokeWeight(2),a.line(0,p.y,500,p.y),a.stroke(100,255,100),a.strokeWeight(2),a.line(p.x,0,p.x,500),a.noStroke(),a.fill(255,200,0),a.circle(p.x,p.y,10),n.forEach(($,w)=>{const v=$.commands,S=l[w];a.noFill(),a.stroke(S.stroke[0],S.stroke[1],S.stroke[2]),a.strokeWeight(2),Pe(a,v,b)}),a.noStroke(),a.fill(255),a.textAlign(a.CENTER,a.CENTER),a.textSize(11),a.textStyle(a.BOLD),n.forEach($=>{const w=Fe($.primitive),v=ue(ve($.commands).map(P=>({x:P.x,y:P.y}))),S=w??v;if(!S)return;const E=b(S.x,S.y);a.text(String($.id),E.x,E.y)}),a.fill(200),a.noStroke(),a.textAlign(a.LEFT,a.TOP),a.textSize(11),a.text(`Paths: ${n.length}`,10,10),a.text(`Scale: ${x.toFixed(3)}x`,10,25),a.text(`Size: ${c.width.toFixed(1)} x ${c.height.toFixed(1)}`,10,40)}},o)}const de=.5522847498307936;function A(e,t=0){if(e==null)return t;const o=Number.parseFloat(e);return Number.isFinite(o)?o:t}function tt(e){if(!e)return[];const t=/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g,o=(e.match(t)||[]).map(Number),r=[];for(let n=0;n+1<o.length;n+=2)r.push([o[n],o[n+1]]);return r}function nt(e){const t=A(e.getAttribute("x1"),0),o=A(e.getAttribute("y1"),0),r=A(e.getAttribute("x2"),0),n=A(e.getAttribute("y2"),0);return{pathData:`M ${t} ${o} L ${r} ${n}`,sourceIndex:0,primitive:{kind:"line",x1:t,y1:o,x2:r,y2:n}}}function Ee(e,t){const o=tt(e.getAttribute("points"));if(o.length<2)return null;const[r,n]=o[0],s=o.slice(1).map(([c,l])=>`L ${c} ${l}`).join(" ");return{pathData:`M ${r} ${n} ${s}${t?" Z":""}`,sourceIndex:0,primitive:{kind:t?"polygon":"polyline",points:o}}}function ot(e,t,o,r,n,s){if(n===0||s===0)return`M ${e} ${t} L ${e+o} ${t} L ${e+o} ${t+r} L ${e} ${t+r} Z`;const c=n*de,l=s*de,a=e+o,i=t+r;return[`M ${e+n} ${t}`,`L ${a-n} ${t}`,`C ${a-n+c} ${t} ${a} ${t+s-l} ${a} ${t+s}`,`L ${a} ${i-s}`,`C ${a} ${i-s+l} ${a-n+c} ${i} ${a-n} ${i}`,`L ${e+n} ${i}`,`C ${e+n-c} ${i} ${e} ${i-s+l} ${e} ${i-s}`,`L ${e} ${t+s}`,`C ${e} ${t+s-l} ${e+n-c} ${t} ${e+n} ${t}`,"Z"].join(" ")}function st(e){const t=A(e.getAttribute("x"),0),o=A(e.getAttribute("y"),0),r=A(e.getAttribute("width"),0),n=A(e.getAttribute("height"),0);if(r<=0||n<=0)return null;const s=e.getAttribute("rx"),c=e.getAttribute("ry");let l=A(s,0),a=A(c,0);return s!=null&&c==null&&(a=l),c!=null&&s==null&&(l=a),l=Math.max(0,Math.min(l,r/2)),a=Math.max(0,Math.min(a,n/2)),{pathData:ot(t,o,r,n,l,a),sourceIndex:0,primitive:{kind:"rect",x:t,y:o,width:r,height:n,rx:l,ry:a}}}function Me(e,t,o,r){const n=o*de,s=r*de;return[`M ${e+o} ${t}`,`C ${e+o} ${t+s} ${e+n} ${t+r} ${e} ${t+r}`,`C ${e-n} ${t+r} ${e-o} ${t+s} ${e-o} ${t}`,`C ${e-o} ${t-s} ${e-n} ${t-r} ${e} ${t-r}`,`C ${e+n} ${t-r} ${e+o} ${t-s} ${e+o} ${t}`,"Z"].join(" ")}function rt(e){const t=A(e.getAttribute("cx"),0),o=A(e.getAttribute("cy"),0),r=A(e.getAttribute("r"),0);return r<=0?null:{pathData:Me(t,o,r,r),sourceIndex:0,primitive:{kind:"circle",cx:t,cy:o,r}}}function at(e){const t=A(e.getAttribute("cx"),0),o=A(e.getAttribute("cy"),0),r=A(e.getAttribute("rx"),0),n=A(e.getAttribute("ry"),0);return r<=0||n<=0?null:{pathData:Me(t,o,r,n),sourceIndex:0,primitive:{kind:"ellipse",cx:t,cy:o,rx:r,ry:n}}}function it(e){const o=Array.from(e.querySelectorAll("path,rect,circle,ellipse,line,polyline,polygon")),r=[];return o.forEach((n,s)=>{const c=s+1,l=n.tagName.toLowerCase();if(l==="path"){const i=n.getAttribute("d");i&&r.push({pathData:i,sourceIndex:c});return}let a=null;l==="line"?a=nt(n):l==="polyline"?a=Ee(n,!1):l==="polygon"?a=Ee(n,!0):l==="rect"?a=st(n):l==="circle"?a=rt(n):l==="ellipse"&&(a=at(n)),a&&(a.sourceIndex=c,r.push(a))}),r}const W=document.getElementById("dropZone"),Le=document.getElementById("fileInput"),q=document.getElementById("functionPrefix"),G=document.getElementById("output");let O=[],ce=null,ye=0;function Ye(e){const t=e.lastIndexOf(".");return t<=0?e:e.slice(0,t)}function be(e){const t=e.trim().replace(/[^a-zA-Z0-9_]/g,"_").replace(/_+/g,"_").replace(/^_+|_+$/g,"");return t.length===0?"shape":/^[a-zA-Z_]/.test(t)?t:`_${t}`}function Ne(e){return be(e)}function ct(e){const t=new Set,o=new Map;return e.map(r=>{if(!t.has(r))return t.add(r),o.set(r,1),r;let n=(o.get(r)||1)+1,s=`${r}_${n}`;for(;t.has(s);)n+=1,s=`${r}_${n}`;return o.set(r,n),t.add(s),s})}function lt(e,t,o){return be(`${e}_${t||"path"}${o}`)}function ut(e){return be(`${e}_drawAllPaths`)}function $e(e){const t=Ye(e.name).trim();return t.length>0?t:"shape"}function dt(e,t){const o=Ye(e).trim();if(t==="pde"){const n=o.replace(/[^a-zA-Z0-9_]/g,"_").replace(/_+/g,"_").replace(/^_+|_+$/g,"");return n.length===0?"drawing":/^[0-9]/.test(n)?`_${n}`:n}const r=o.replace(/[^a-zA-Z0-9._-]/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"");return r.length>0?r:"drawing"}function le(e,t){if(t==="pde"){const o=e.replace(/[^a-zA-Z0-9_]/g,"_").replace(/_+/g,"_").replace(/^_+|_+$/g,""),r=o.length>0?o:"drawing";return`${/^[0-9]/.test(r)?`_${r}`:r}.pde`}return`${e}.${t}`}function Ae(e){return e.type==="image/svg+xml"||e.name.toLowerCase().endsWith(".svg")}function De(e){return Array.from(e).filter(Ae)}W.addEventListener("click",()=>Le.click());document.querySelectorAll('input[name="vectorFormat"]').forEach(e=>{e.addEventListener("change",t=>{const o=t.target,r=document.getElementById("processingVectorOption"),n=document.getElementById("instanceModeOption");r&&(r.style.display=o.value==="Processing"?"flex":"none"),n&&(n.style.display=o.value==="Processing"?"none":"flex"),O.length>0&&Q(O)})});document.querySelectorAll('input[name="language"], input[name="processingVector"], input[name="sortMode"], #instanceMode, #showCoordinates').forEach(e=>{e.addEventListener("change",()=>{O.length>0&&Q(O)})});document.querySelectorAll("#coordMultiplier, #precision").forEach(e=>{e.addEventListener("change",()=>{O.length>0&&Q(O)})});q&&q.addEventListener("input",()=>{O.length>0&&Q(O)});W.addEventListener("dragover",e=>{e.preventDefault(),W.classList.add("dragover")});W.addEventListener("dragleave",()=>{W.classList.remove("dragover")});W.addEventListener("drop",e=>{e.preventDefault(),W.classList.remove("dragover");const t=e.dataTransfer?.files;if(!t){alert("Please drop at least one SVG file");return}const o=De(t);if(o.length===0){alert("Please drop at least one valid SVG file");return}Q(o)});Le.addEventListener("change",e=>{const t=e.target.files;if(!t)return;const o=De(t);o.length!==0&&Q(o)});async function Q(e){const t=e.filter(Ae);if(t.length===0)return;const o=t.length>1,r=O.length===1&&t.length===1&&O[0]===t[0];q&&(q.disabled=o,o?(q.value="Auto per file",q.title="Disabled for multi-file imports. Filename prefixes are used automatically."):(q.title="",r||(q.value=$e(t[0])))),O=[...t];const n=++ye;let s=[];try{s=await Promise.all(t.map(async(u,h)=>{const I=await u.text(),X=new DOMParser().parseFromString(I,"image/svg+xml");return{file:u,fileIndex:h,shapes:it(X)}}))}catch{if(n!==ye)return;G.innerHTML='<div class="output"><p>Could not read one or more SVG files.</p></div>';return}if(n!==ye)return;ce&&(ce(),ce=null);const c=s.filter(u=>u.shapes.length>0);if(c.length===0){G.innerHTML='<div class="output"><p>No supported drawable elements found (path, line, polyline, polygon, rect, circle, ellipse).</p></div>';return}const l=document.querySelector('input[name="vectorFormat"]:checked')?.value||"Vec",a=document.querySelector('input[name="language"]:checked')?.value||"javascript",i=parseFloat(document.getElementById("coordMultiplier")?.value)||1,m=parseInt(document.getElementById("precision")?.value)||5,C=document.querySelector('input[name="processingVector"]:checked')?.value||"PVector",F=document.getElementById("instanceMode")?.checked||!1,N=document.getElementById("showCoordinates")?.checked??!0,x=document.querySelector('input[name="sortMode"]:checked')?.value||"primitive",y={vectorFormat:l,language:a,coordMultiplier:i,precision:m,processingVector:C,instanceMode:F},f=Ne(q?.value||$e(c[0].file)),d=o?ct(c.map(u=>Ne($e(u.file)))):[f],g=c.map((u,h)=>{const I=o?d[h]:f;return{file:u.file,fileIndex:u.fileIndex,filePrefix:I,drawAllFunctionName:ut(I)}}),b=[];let p=1;c.forEach((u,h)=>{const I=g[h];u.shapes.forEach((k,X)=>{b.push({fileIndex:u.fileIndex,fileName:u.file.name,shape:k,functionName:lt(I.filePrefix,k.primitive?.kind,X+1),globalId:p++})})});const $=[...b].sort((u,h)=>{if(x==="svg")return u.fileIndex!==h.fileIndex?u.fileIndex-h.fileIndex:u.shape.sourceIndex-h.shape.sourceIndex;const I=u.shape.primitive?.kind??"path",k=h.shape.primitive?.kind??"path";return I===k?u.fileIndex!==h.fileIndex?u.fileIndex-h.fileIndex:u.shape.sourceIndex-h.shape.sourceIndex:I.localeCompare(k)}),w=$.map(u=>u.functionName),v=new Map;$.forEach(u=>{const h=v.get(u.fileIndex)||[];h.push(u.functionName),v.set(u.fileIndex,h)});let S="",E="";const P=[],z=[],T=[],V=new Map,J=[],ee=new Map,re=[];$.forEach((u,h)=>{P.push(u.shape.pathData),z.push(u.globalId),T.push(u.shape),re.push(u.functionName);let I=V.get(u.fileIndex);I||(I={previewId:`preview-all-file-${u.fileIndex}`,fileName:u.fileName,pathsData:[],shapeIds:[],shapes:[]},V.set(u.fileIndex,I)),I.pathsData.push(u.shape.pathData),I.shapeIds.push(u.globalId),I.shapes.push(u.shape);const k=We(u.shape.pathData,y,h,u.shape,u.functionName);h===0&&(S=k.sharedCode),J.push(k.pathCode),ee.set(u.functionName,k.pathCode);const X=`preview-${h}`;E+=`
          <div class="output path-section" id="shape-section-${h}">
            <div class="path-header">
              <h2>${B(u.functionName)}</h2>
              <button class="copy-btn" data-path="${h}">Copy Code</button>
            </div>
            <p class="path-meta">${B(u.fileName)} · svg #${u.shape.sourceIndex}</p>
            <div class="content-grid">
              <div class="preview-container">
                <div id="${X}"></div>
              </div>
              <div class="code-container">
                <pre><code>${B(k.pathCode)}</code></pre>
              </div>
            </div>
          </div>
        `});const te=S.trim(),fe=J.join(`

`).trim(),M=[];let D="";if(o){const u=[];g.forEach(h=>{const I=v.get(h.fileIndex)||[];I.length!==0&&(u.push(h.drawAllFunctionName),M.push(ie(I,y,h.drawAllFunctionName).trim()))}),D=ie(u,y).trim()}else D=ie(w,y).trim();const L=[D,...M,fe].filter(u=>u.length>0).join(`

`),R=[te,L].filter(u=>u.length>0).join(`

`),Y=l==="Processing"?"pde":a==="typescript"?"ts":"js",H=le("draw-paths",Y),Z=le("draw-paths-drawing",Y),ae=le("draw-paths-shared",Y),K=[];o&&g.forEach(u=>{const h=v.get(u.fileIndex)||[];if(h.length===0)return;const I=ie(h,y,u.drawAllFunctionName).trim(),k=h.map(_=>ee.get(_)||"").filter(_=>_.length>0).join(`

`).trim(),X=[I,k].filter(_=>_.length>0).join(`

`);K.push({codeKey:`drawing-file-${u.filePrefix}`,code:X,drawAllFunctionName:u.drawAllFunctionName,fileName:le(`${dt(u.file.name,Y)}${Y==="pde"?"_":"-"}drawing`,Y),sourceFileName:u.file.name})});const ne={complete:R,drawing:L,shared:te};K.forEach(u=>{ne[u.codeKey]=u.code});const he=`
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
    `,pe=K.length>0?`
	      <div class="command-section">
	        <div class="command-header">
	          <h2>Per-file Drawing Downloads</h2>
        </div>
        <div class="command-content">
          <div class="command-content-inner">
            <div class="per-file-actions">
	              ${K.map(u=>`
	                <div class="per-file-action-row">
	                  <div class="per-file-action-label">${B(u.sourceFileName)}</div>
	                  <div class="action-buttons action-buttons-start">
	                    <button class="copy-btn" data-code-key="${u.codeKey}">Copy ${B(u.fileName)}</button>
	                    <button class="download-btn" data-code-key="${u.codeKey}" data-filename="${u.fileName}">Download ${B(u.fileName)}</button>
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
          ${g.map(u=>{const h=V.get(u.fileIndex);return!h||h.pathsData.length===0?"":`
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
          ${re.map((u,h)=>`
            <li>
              <button class="shape-nav-link" data-target="shape-section-${h}">${B(u)}</button>
            </li>
          `).join("")}
        </ul>
      </div>
    `;G.innerHTML=ze+he+ge+pe+Xe+Ve+E,o?g.forEach(u=>{const h=V.get(u.fileIndex);!h||h.pathsData.length===0||Ie(h.pathsData,h.shapeIds,h.previewId,h.shapes)}):Ie(P,z,"preview-all",T),P.forEach((u,h)=>{et(u,`preview-${h}`,T[h],N)}),ce=ft(),G.querySelectorAll(".download-btn[data-code-key]").forEach(u=>{u.addEventListener("click",()=>{const h=u.dataset.codeKey,I=u.dataset.filename;if(!h||!I)return;const k=ne[h];if(!k)return;const X=new Blob([k],{type:"text/plain"}),_=URL.createObjectURL(X),me=document.createElement("a");me.href=_,me.download=I,me.click(),URL.revokeObjectURL(_);const _e=u.textContent;u.textContent="Downloaded!",setTimeout(()=>{u.textContent=_e},2e3)})}),G.querySelectorAll(".copy-btn").forEach(u=>{u.addEventListener("click",h=>{const I=h.currentTarget,k=I.dataset.codeKey;let X="";k?X=ne[k]||"":X=I.closest(".path-section")?.querySelector("code")?.textContent||"",X&&navigator.clipboard.writeText(X).then(()=>{const _=I.textContent;I.textContent="Copied!",setTimeout(()=>{I.textContent=_},2e3)})})})}function ft(){const e=Array.from(G.querySelectorAll(".shape-nav-link"));if(e.length===0)return()=>{};const t=e.map(l=>{const a=l.dataset.target;return a?document.getElementById(a):null}).filter(l=>l!==null);if(t.length===0)return()=>{};const o=l=>{e.forEach(a=>{a.classList.toggle("is-active",a.dataset.target===l.id)})},r=()=>{const l=window.innerHeight/2;let a=t[0],i=Number.POSITIVE_INFINITY;t.forEach(m=>{const C=m.getBoundingClientRect(),F=C.top+C.height/2,N=Math.abs(F-l);N<i&&(i=N,a=m)}),o(a)},n=l=>{const i=l.currentTarget.dataset.target;if(!i)return;const m=document.getElementById(i);m&&m.scrollIntoView({behavior:"smooth",block:"center"})};e.forEach(l=>{l.addEventListener("click",n)});let s=!1;const c=()=>{s||(s=!0,window.requestAnimationFrame(()=>{s=!1,r()}))};return window.addEventListener("scroll",c,{passive:!0}),window.addEventListener("resize",c),r(),()=>{e.forEach(l=>{l.removeEventListener("click",n)}),window.removeEventListener("scroll",c),window.removeEventListener("resize",c)}}
