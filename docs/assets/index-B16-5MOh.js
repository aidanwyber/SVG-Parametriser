(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();function fe(e){const t=[],s=/([MLHVCSQTAZmlhvcsqtaz])\s*([^MLHVCSQTAZmlhvcsqtaz]*)/g;let i,n=0,o=0,c=0,u=0,r="",a=null,x=null;const C=()=>{a=null,x=null},k=I=>{const h=/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g;return(I.match(h)||[]).map(Number)};for(;(i=s.exec(e))!==null;){const I=i[1],h=I===I.toLowerCase(),y=I.toUpperCase(),f=k(i[2]);if(y==="M"){for(let l=0;l+1<f.length;l+=2){const g=h?n+f[l]:f[l],p=h?o+f[l+1]:f[l+1];l===0?(t.push({type:"M",x:g,y:p}),c=g,u=p):t.push({type:"L",x:g,y:p}),n=g,o=p}C(),r=f.length>2?"L":"M"}else if(y==="L"){for(let l=0;l+1<f.length;l+=2){const g=h?n+f[l]:f[l],p=h?o+f[l+1]:f[l+1];t.push({type:"L",x:g,y:p}),n=g,o=p}C(),r="L"}else if(y==="H"){for(let l=0;l<f.length;l++){const g=h?n+f[l]:f[l];t.push({type:"L",x:g,y:o}),n=g}C(),r="L"}else if(y==="V"){for(let l=0;l<f.length;l++){const g=h?o+f[l]:f[l];t.push({type:"L",x:n,y:g}),o=g}C(),r="L"}else if(y==="C")for(let l=0;l+5<f.length;l+=6){const g=h?n+f[l]:f[l],p=h?o+f[l+1]:f[l+1],d=h?n+f[l+2]:f[l+2],$=h?o+f[l+3]:f[l+3],m=h?n+f[l+4]:f[l+4],b=h?o+f[l+5]:f[l+5];t.push({type:"C",x1:g,y1:p,x2:d,y2:$,x:m,y:b}),n=m,o=b,a=d,x=$,r="C"}else if(y==="S")for(let l=0;l+3<f.length;l+=4){let g=n,p=o;(r==="C"||r==="S")&&a!==null&&x!==null&&(g=n*2-a,p=o*2-x);const d=h?n+f[l]:f[l],$=h?o+f[l+1]:f[l+1],m=h?n+f[l+2]:f[l+2],b=h?o+f[l+3]:f[l+3];t.push({type:"C",x1:g,y1:p,x2:d,y2:$,x:m,y:b}),n=m,o=b,a=d,x=$,r="S"}else y==="Z"?(t.push({type:"Z"}),n=c,o=u,C(),r="Z"):(C(),r=y)}return t}function W(e){let t="",s=e;for(;s>=0;)t=String.fromCharCode(65+s%26)+t,s=Math.floor(s/26)-1;return t}function _(e,t,s){const i=(e*t).toFixed(s);return parseFloat(i).toString()}function we(e){const{vectorFormat:t,language:s,processingVector:i="PVector",instanceMode:n=!1}=e,o=s==="typescript",c=t==="Processing",u=c&&i==="Vec2D",r=n&&t==="createVector";if(c){const k=u?"Vec2D":"PVector";return`${u?`import toxi.geom.*;

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

${k} applyTransform(${k} v) {
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

	return new ${k}(x, y);
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
}`;const a=r?"p.createVector":"createVector",x=o?"p5.Vector":"",C=r?o?"p: any":"p":"";return`// Transform configuration
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

function applyTransform(${C?C+", ":""}v${o?`: ${x}`:""})${o?`: ${x}`:""} {
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
}`}function Te(e,t){const{vectorFormat:s,language:i,instanceMode:n=!1}=t,o=i==="typescript",c=s==="Processing",u=n&&(s==="createVector"||s==="Vec");return c?`void ${e}() {`:`function ${e}(${u?o?"p: any":"p":""})${o?": void":""} {`}function me(e){const{vectorFormat:t,instanceMode:s=!1}=e;return s&&(t==="createVector"||t==="Vec")?"p.":""}function he(){return{minX:Number.POSITIVE_INFINITY,minY:Number.POSITIVE_INFINITY,maxX:Number.NEGATIVE_INFINITY,maxY:Number.NEGATIVE_INFINITY}}function U(e,t,s){e.minX=Math.min(e.minX,t),e.minY=Math.min(e.minY,s),e.maxX=Math.max(e.maxX,t),e.maxY=Math.max(e.maxY,s)}function Ee(e){return Number.isFinite(e.minX)&&Number.isFinite(e.minY)&&Number.isFinite(e.maxX)&&Number.isFinite(e.maxY)}function Ie(e){const t=[];let s=[],i=!1,n=he();const o=()=>{if(s.length===0)return;const c=Ee(n)?{...n}:{minX:0,minY:0,maxX:0,maxY:0};t.push({commands:s,closed:i,bounds:c}),s=[],i=!1,n=he()};return e.forEach(c=>{if(c.type==="M"){o(),s.push(c),U(n,c.x,c.y);return}if(c.type==="L"){s.length===0&&s.push({type:"M",x:c.x,y:c.y}),s.push(c),U(n,c.x,c.y);return}if(c.type==="C"){if(s.length===0)return;s.push(c),U(n,c.x1,c.y1),U(n,c.x2,c.y2),U(n,c.x,c.y);return}c.type==="Z"&&(i=!0,o())}),o(),t}function Me(e,t){return e.bounds.minX>=t.minX&&e.bounds.maxX<=t.maxX&&e.bounds.minY>=t.minY&&e.bounds.maxY<=t.maxY}function Pe(e,t,s,i,n,o,c){const u=t.vectorFormat==="Processing",r=me(t),a=l=>_(l,s,i),x=[],C=[],k="'x'",I="'y'",h=u?"'a'":"'avg'",y=(l,g,p)=>{const d=`${c}${o}(${a(g)}, ${a(p)}))`;u?x.push(`${n} ${l} = ${d};`):x.push(`const ${l} = ${d};`)},f=(l,g,p)=>{const d=`applyTransformScalar(${a(g)}, ${p})`;u?x.push(`float ${l} = ${d};`):x.push(`const ${l} = ${d};`)};if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?null:(y("p1",e.x1,e.y1),y("p2",e.x2,e.y2),C.push(`${r}line(p1.x, p1.y, p2.x, p2.y);`),{declarations:x,drawCalls:C});if(e.kind==="polyline"||e.kind==="polygon"){const l=e.points||[];return l.length<2?null:(l.forEach(([g,p],d)=>{y(`p${d}`,g,p)}),C.push(`${r}beginShape();`),l.forEach((g,p)=>{C.push(`${r}vertex(p${p}.x, p${p}.y);`)}),C.push(`${r}endShape(${e.kind==="polygon"?"CLOSE":"OPEN"});`),{declarations:x,drawCalls:C})}if(e.kind==="rect"){if(e.x==null||e.y==null||e.width==null||e.height==null)return null;y("rectPos",e.x,e.y),f("rectW",e.width,k),f("rectH",e.height,I);const l=e.rx||0,g=e.ry||0;if(l>0||g>0){if(Math.abs(l-g)>1e-9)return null;f("rectR",l,h),C.push(`${r}rect(rectPos.x, rectPos.y, rectW, rectH, rectR);`)}else C.push(`${r}rect(rectPos.x, rectPos.y, rectW, rectH);`);return{declarations:x,drawCalls:C}}return e.kind==="circle"?e.cx==null||e.cy==null||e.r==null?null:(y("circleCenter",e.cx,e.cy),f("circleDiameter",e.r*2,h),C.push(`${r}circle(circleCenter.x, circleCenter.y, circleDiameter);`),{declarations:x,drawCalls:C}):e.kind==="ellipse"?e.cx==null||e.cy==null||e.rx==null||e.ry==null?null:(y("ellipseCenter",e.cx,e.cy),f("ellipseW",e.rx*2,k),f("ellipseH",e.ry*2,I),C.push(`${r}ellipse(ellipseCenter.x, ellipseCenter.y, ellipseW, ellipseH);`),{declarations:x,drawCalls:C}):null}function ke(e,t,s,i,n){const{vectorFormat:o,coordMultiplier:c,precision:u,processingVector:r="PVector",instanceMode:a=!1}=t,x=o==="Processing",C=x&&r==="Vec2D",k=a&&(o==="createVector"||o==="Vec"),I=n||`drawPath${s+1}`,h=x?C?"new Vec2D":"new PVector":o==="Vec"?"new Vec":a&&o==="createVector"?"p.createVector":"createVector",y=[],f=x?C?"Vec2D":"PVector":"const",l=k&&o==="createVector"?"applyTransform(p, ":"applyTransform(",g=we(t),p=Te(I,t),d=me(t);if(i?.primitive){const P=Pe(i.primitive,t,c,u,f,h,l);if(P){const X=P.declarations.length>0?`${P.declarations.map(V=>`	${V}`).join(`
`)}

`:"",N=P.drawCalls.map(V=>`	${V}`).join(`
`),B=`${p}
${X}${N}
}`;return{sharedCode:g,pathCode:B}}}const $=fe(e),m=Ie($);let b=0;const v=P=>{const X=[];return P.commands.forEach(N=>{if(N.type==="M"||N.type==="L"){const B=W(b),V=_(N.x,c,u),j=_(N.y,c,u);y.push(`${B} = ${l}${h}(${V}, ${j}))`),X.push(`${d}vertex(${B}.x, ${B}.y);`),b++;return}if(N.type==="C"){const B=W(b-1),V=W(b),j=B+"c",oe="c"+V,de=_(N.x1,c,u),S=_(N.y1,c,u),w=_(N.x2,c,u),T=_(N.y2,c,u),A=_(N.x,c,u),F=_(N.y,c,u);y.push(`${j} = ${l}${h}(${de}, ${S}))`),y.push(`${oe} = ${l}${h}(${w}, ${T}))`),y.push(`${V} = ${l}${h}(${A}, ${F}))`),X.push(`${d}bezierVertex(${j}.x, ${j}.y, ${oe}.x, ${oe}.y, ${V}.x, ${V}.y);`),b++}}),X};let E=[],Y=!1,D=null;const M=[],z=()=>{E.length!==0&&(M.push([`${d}beginShape();`,...E,`${d}endShape(${Y?"CLOSE":"OPEN"});`].join(`
`)),E=[],Y=!1,D=null)};m.forEach(P=>{const X=v(P);if(X.length===0)return;if(E.length===0){E=X,Y=P.closed,D=P.bounds;return}if(Y&&P.closed&&D!==null&&Me(P,D)){E.push(`${d}beginContour();`),E.push(...X),E.push(`${d}endContour();`);return}z(),E=X,Y=P.closed,D=P.bounds}),z();const Z=y.length>0?`	${f} ${y.join(`,
		`)};`:"",ce=M.map(P=>P.split(`
`).map(X=>`	${X}`).join(`
`)).join(`

`),te=Z?`${Z}

`:"",K=ce?`${ce}
`:"",ne=`${p}
${te}${K}}`;return{sharedCode:g,pathCode:ne}}function Ye(e,t){const{vectorFormat:s,language:i,instanceMode:n=!1}=t,o=i==="typescript",c=s==="Processing",u=n&&(s==="createVector"||s==="Vec"),r=e.map(a=>c?`	${a}();`:u?`	${a}(p);`:`	${a}();`).join(`
`);return c?`
void drawAllPaths() {
${r}
}`:`
function drawAllPaths(${u?o?"p: any":"p":""})${o?": void":""} {
${r}
}`}function ge(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function xe(){return{minX:Number.POSITIVE_INFINITY,minY:Number.POSITIVE_INFINITY,maxX:Number.NEGATIVE_INFINITY,maxY:Number.NEGATIVE_INFINITY}}function Q(e,t,s){e.minX=Math.min(e.minX,t),e.minY=Math.min(e.minY,s),e.maxX=Math.max(e.maxX,t),e.maxY=Math.max(e.maxY,s)}function Le(e){return Number.isFinite(e.minX)&&Number.isFinite(e.minY)&&Number.isFinite(e.maxX)&&Number.isFinite(e.maxY)}function Ne(e){const t=[];let s=[],i=!1,n=xe();const o=()=>{if(s.length===0)return;const c=Le(n)?{...n}:{minX:0,minY:0,maxX:0,maxY:0};t.push({commands:s,closed:i,bounds:c}),s=[],i=!1,n=xe()};return e.forEach(c=>{if(c.type==="M"){o(),s.push(c),Q(n,c.x,c.y);return}if(c.type==="L"){s.length===0&&s.push({type:"M",x:c.x,y:c.y}),s.push(c),Q(n,c.x,c.y);return}if(c.type==="C"){if(s.length===0)return;s.push(c),Q(n,c.x1,c.y1),Q(n,c.x2,c.y2),Q(n,c.x,c.y);return}c.type==="Z"&&(i=!0,o())}),o(),t}function Xe(e,t){return e.bounds.minX>=t.minX&&e.bounds.maxX<=t.maxX&&e.bounds.minY>=t.minY&&e.bounds.maxY<=t.maxY}function ie(e,t,s){t.commands.forEach(i=>{if(i.type==="M"||i.type==="L"){const n=s(i.x,i.y);e.vertex(n.x,n.y);return}if(i.type==="C"){const n=s(i.x1,i.y1),o=s(i.x2,i.y2),c=s(i.x,i.y);e.bezierVertex(n.x,n.y,o.x,o.y,c.x,c.y)}})}function pe(e,t,s){const i=Ne(t).filter(c=>c.commands.length>0);if(i.length===0)return;let n=null;const o=()=>{n&&(e.endShape(n.closed?e.CLOSE:e.OPEN),n=null)};i.forEach(c=>{if(!n){e.beginShape(),ie(e,c,s),n=c;return}if(n.closed&&c.closed&&Xe(c,n.bounds)){e.beginContour(),ie(e,c,s),e.endContour();return}o(),e.beginShape(),ie(e,c,s),n=c}),o()}function ue(e){const t=[];let s=0;return e.forEach(i=>{if(i.type==="M"||i.type==="L"){const n=W(s);t.push({name:n,x:i.x,y:i.y}),s++}else if(i.type==="C"){const n=W(s-1),o=W(s),c=n+"c",u="c"+o;t.push({name:c,x:i.x1,y:i.y1}),t.push({name:u,x:i.x2,y:i.y2}),t.push({name:o,x:i.x,y:i.y}),s++}}),t}function $e(e){const t=e.map(u=>u.x),s=e.map(u=>u.y),i=Math.min(...t),n=Math.min(...s),o=Math.max(...t),c=Math.max(...s);return{minX:i,minY:n,maxX:o,maxY:c,width:o-i,height:c-n}}function se(e){if(e.length===0)return null;const t=e.reduce((s,i)=>({x:s.x+i.x,y:s.y+i.y}),{x:0,y:0});return{x:t.x/e.length,y:t.y/e.length}}function Ae(e){if(e.length<3)return se(e.map(([n,o])=>({x:n,y:o})));let t=0,s=0,i=0;for(let n=0;n<e.length;n++){const[o,c]=e[n],[u,r]=e[(n+1)%e.length],a=o*r-u*c;t+=a,s+=(o+u)*a,i+=(c+r)*a}return Math.abs(t)<1e-9?se(e.map(([n,o])=>({x:n,y:o}))):{x:s/(3*t),y:i/(3*t)}}function Ce(e){if(!e)return null;if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?null:{x:(e.x1+e.x2)/2,y:(e.y1+e.y2)/2};if(e.kind==="polyline"){const t=e.points||[];return se(t.map(([s,i])=>({x:s,y:i})))}return e.kind==="polygon"?Ae(e.points||[]):e.kind==="rect"?e.x==null||e.y==null||e.width==null||e.height==null?null:{x:e.x+e.width/2,y:e.y+e.height/2}:e.kind==="circle"?e.cx==null||e.cy==null?null:{x:e.cx,y:e.cy}:e.kind==="ellipse"?e.cx==null||e.cy==null?null:{x:e.cx,y:e.cy}:null}function Fe(e){return e?e.kind==="line"?"midpoint":e.kind==="polyline"||e.kind==="polygon"?"centroid":"center":"reference"}function Ve(e){if(!e)return[];if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?[]:[{point:{x:e.x1,y:e.y1},label:"start"},{point:{x:e.x2,y:e.y2},label:"end"}];const t=Ce(e);return t?[{point:t,label:Fe(e)}]:[]}function De(e,t,s,i=!0){const n=fe(e),o=ue(n),c=Ve(s?.primitive),u=!!s?.primitive;if(o.length===0)return;const r=$e(o);new window.p5(a=>{const I=r.width>0?440/r.width:1,h=r.height>0?440/r.height:1,y=Math.min(I,h),f=r.width*y,l=r.height*y,g=(500-f)/2-r.minX*y,p=(500-l)/2-r.minY*y;a.setup=()=>{a.createCanvas(500,500),a.noLoop()},a.draw=()=>{a.background(30);const d=(m,b)=>({x:m*y+g,y:b*y+p});a.stroke(60),a.strokeWeight(1);for(let m=0;m<=500;m+=50)a.line(m,0,m,500),a.line(0,m,500,m);const $=d(0,0);if(a.stroke(255,100,100),a.strokeWeight(2),a.line(0,$.y,500,$.y),a.stroke(100,255,100),a.strokeWeight(2),a.line($.x,0,$.x,500),a.noStroke(),a.fill(255,200,0),a.circle($.x,$.y,12),a.fill(255),a.textAlign(a.LEFT,a.BOTTOM),a.textSize(14),a.textStyle(a.BOLD),a.text("(0, 0)",$.x+8,$.y-8),a.fill(100,150,255,50),a.stroke(100,150,255),a.strokeWeight(2),pe(a,n,d),u&&c.length>0)c.forEach(({point:m,label:b})=>{const v=d(m.x,m.y);a.noStroke(),a.fill(255,220,120),a.circle(v.x,v.y,12),a.fill(255),a.textAlign(a.CENTER,a.CENTER),a.textSize(12),a.textStyle(a.BOLD),a.text(b,v.x,v.y-16),i&&(a.textSize(9),a.textStyle(a.NORMAL),a.fill(200),a.text(`(${m.x.toFixed(1)}, ${m.y.toFixed(1)})`,v.x,v.y+16))});else{a.stroke(255,200,100,100),a.strokeWeight(1);let m=0;n.forEach(b=>{if(b.type==="C"){const v=o.find(M=>M.name===String.fromCharCode(65+m-1)),E=o.find(M=>M.name===v?.name+"c"),Y=o.find(M=>M.name==="c"+String.fromCharCode(65+m)),D=o.find(M=>M.name===String.fromCharCode(65+m));if(v&&E){const M=d(v.x,v.y),z=d(E.x,E.y);a.line(M.x,M.y,z.x,z.y)}if(Y&&D){const M=d(Y.x,Y.y),z=d(D.x,D.y);a.line(M.x,M.y,z.x,z.y)}m++}else(b.type==="M"||b.type==="L")&&m++}),o.forEach(b=>{const v=d(b.x,b.y),E=b.name.includes("c");a.noStroke(),E?(a.fill(255,200,100),a.circle(v.x,v.y,8)):(a.fill(100,255,150),a.circle(v.x,v.y,10)),a.fill(255),a.noStroke(),a.textAlign(a.CENTER,a.CENTER),a.textSize(12),a.textStyle(a.BOLD);const Y=15;a.text(b.name,v.x,v.y-Y),i&&(a.textSize(9),a.textStyle(a.NORMAL),a.fill(200),a.text(`(${b.x.toFixed(1)}, ${b.y.toFixed(1)})`,v.x,v.y+Y+3))})}a.fill(200),a.noStroke(),a.textAlign(a.LEFT,a.TOP),a.textSize(11),a.text(`Scale: ${y.toFixed(3)}x`,10,10),a.text(`Size: ${r.width.toFixed(1)} × ${r.height.toFixed(1)}`,10,25)}},t)}function ze(e,t,s,i=[]){const n=e.map((r,a)=>({id:t[a]??a+1,commands:fe(r),primitive:i[a]?.primitive})).filter(r=>r.commands.length>0),o=n.flatMap(r=>ue(r.commands));if(o.length===0)return;const c=$e(o),u=n.map(()=>{const r=80+Math.floor(Math.random()*176),a=80+Math.floor(Math.random()*176),x=80+Math.floor(Math.random()*176);return{stroke:[r,a,x]}});new window.p5(r=>{const k=c.width>0?440/c.width:1,I=c.height>0?440/c.height:1,h=Math.min(k,I),y=c.width*h,f=c.height*h,l=(500-y)/2-c.minX*h,g=(500-f)/2-c.minY*h,p=(d,$)=>({x:d*h+l,y:$*h+g});r.setup=()=>{r.createCanvas(500,500),r.noLoop()},r.draw=()=>{r.background(30),r.stroke(60),r.strokeWeight(1);for(let $=0;$<=500;$+=50)r.line($,0,$,500),r.line(0,$,500,$);const d=p(0,0);r.stroke(255,100,100),r.strokeWeight(2),r.line(0,d.y,500,d.y),r.stroke(100,255,100),r.strokeWeight(2),r.line(d.x,0,d.x,500),r.noStroke(),r.fill(255,200,0),r.circle(d.x,d.y,10),n.forEach(($,m)=>{const b=$.commands,v=u[m];r.noFill(),r.stroke(v.stroke[0],v.stroke[1],v.stroke[2]),r.strokeWeight(2),pe(r,b,p)}),r.noStroke(),r.fill(255),r.textAlign(r.CENTER,r.CENTER),r.textSize(11),r.textStyle(r.BOLD),n.forEach($=>{const m=Ce($.primitive),b=se(ue($.commands).map(Y=>({x:Y.x,y:Y.y}))),v=m??b;if(!v)return;const E=p(v.x,v.y);r.text(String($.id),E.x,E.y)}),r.fill(200),r.noStroke(),r.textAlign(r.LEFT,r.TOP),r.textSize(11),r.text(`Paths: ${n.length}`,10,10),r.text(`Scale: ${h.toFixed(3)}x`,10,25),r.text(`Size: ${c.width.toFixed(1)} x ${c.height.toFixed(1)}`,10,40)}},s)}const ae=.5522847498307936;function L(e,t=0){if(e==null)return t;const s=Number.parseFloat(e);return Number.isFinite(s)?s:t}function Oe(e){if(!e)return[];const t=/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g,s=(e.match(t)||[]).map(Number),i=[];for(let n=0;n+1<s.length;n+=2)i.push([s[n],s[n+1]]);return i}function Be(e){const t=L(e.getAttribute("x1"),0),s=L(e.getAttribute("y1"),0),i=L(e.getAttribute("x2"),0),n=L(e.getAttribute("y2"),0);return{pathData:`M ${t} ${s} L ${i} ${n}`,sourceIndex:0,primitive:{kind:"line",x1:t,y1:s,x2:i,y2:n}}}function ye(e,t){const s=Oe(e.getAttribute("points"));if(s.length<2)return null;const[i,n]=s[0],o=s.slice(1).map(([c,u])=>`L ${c} ${u}`).join(" ");return{pathData:`M ${i} ${n} ${o}${t?" Z":""}`,sourceIndex:0,primitive:{kind:t?"polygon":"polyline",points:s}}}function Re(e,t,s,i,n,o){if(n===0||o===0)return`M ${e} ${t} L ${e+s} ${t} L ${e+s} ${t+i} L ${e} ${t+i} Z`;const c=n*ae,u=o*ae,r=e+s,a=t+i;return[`M ${e+n} ${t}`,`L ${r-n} ${t}`,`C ${r-n+c} ${t} ${r} ${t+o-u} ${r} ${t+o}`,`L ${r} ${a-o}`,`C ${r} ${a-o+u} ${r-n+c} ${a} ${r-n} ${a}`,`L ${e+n} ${a}`,`C ${e+n-c} ${a} ${e} ${a-o+u} ${e} ${a-o}`,`L ${e} ${t+o}`,`C ${e} ${t+o-u} ${e+n-c} ${t} ${e+n} ${t}`,"Z"].join(" ")}function _e(e){const t=L(e.getAttribute("x"),0),s=L(e.getAttribute("y"),0),i=L(e.getAttribute("width"),0),n=L(e.getAttribute("height"),0);if(i<=0||n<=0)return null;const o=e.getAttribute("rx"),c=e.getAttribute("ry");let u=L(o,0),r=L(c,0);return o!=null&&c==null&&(r=u),c!=null&&o==null&&(u=r),u=Math.max(0,Math.min(u,i/2)),r=Math.max(0,Math.min(r,n/2)),{pathData:Re(t,s,i,n,u,r),sourceIndex:0,primitive:{kind:"rect",x:t,y:s,width:i,height:n,rx:u,ry:r}}}function be(e,t,s,i){const n=s*ae,o=i*ae;return[`M ${e+s} ${t}`,`C ${e+s} ${t+o} ${e+n} ${t+i} ${e} ${t+i}`,`C ${e-n} ${t+i} ${e-s} ${t+o} ${e-s} ${t}`,`C ${e-s} ${t-o} ${e-n} ${t-i} ${e} ${t-i}`,`C ${e+n} ${t-i} ${e+s} ${t-o} ${e+s} ${t}`,"Z"].join(" ")}function je(e){const t=L(e.getAttribute("cx"),0),s=L(e.getAttribute("cy"),0),i=L(e.getAttribute("r"),0);return i<=0?null:{pathData:be(t,s,i,i),sourceIndex:0,primitive:{kind:"circle",cx:t,cy:s,r:i}}}function He(e){const t=L(e.getAttribute("cx"),0),s=L(e.getAttribute("cy"),0),i=L(e.getAttribute("rx"),0),n=L(e.getAttribute("ry"),0);return i<=0||n<=0?null:{pathData:be(t,s,i,n),sourceIndex:0,primitive:{kind:"ellipse",cx:t,cy:s,rx:i,ry:n}}}function We(e){const s=Array.from(e.querySelectorAll("path,rect,circle,ellipse,line,polyline,polygon")),i=[];return s.forEach((n,o)=>{const c=o+1,u=n.tagName.toLowerCase();if(u==="path"){const a=n.getAttribute("d");a&&i.push({pathData:a,sourceIndex:c});return}let r=null;u==="line"?r=Be(n):u==="polyline"?r=ye(n,!1):u==="polygon"?r=ye(n,!0):u==="rect"?r=_e(n):u==="circle"?r=je(n):u==="ellipse"&&(r=He(n)),r&&(r.sourceIndex=c,i.push(r))}),i}const H=document.getElementById("dropZone"),ve=document.getElementById("fileInput"),ee=document.getElementById("functionPrefix"),J=document.getElementById("output");let O=null,re=null;function qe(e){const t=e.lastIndexOf(".");return t<=0?e:e.slice(0,t)}function Ze(e){const t=e.trim().replace(/[^a-zA-Z0-9_]/g,"_").replace(/_+/g,"_").replace(/^_+|_+$/g,"");return t.length===0?"shape":/^[a-zA-Z_]/.test(t)?t:`shape_${t}`}function Ke(e,t){return`${e}_path${t}`}function le(e){const t=qe(e.name).trim();return t.length>0?t:"shape"}H.addEventListener("click",()=>ve.click());document.querySelectorAll('input[name="vectorFormat"]').forEach(e=>{e.addEventListener("change",t=>{const s=t.target,i=document.getElementById("processingVectorOption"),n=document.getElementById("instanceModeOption");i&&(i.style.display=s.value==="Processing"?"flex":"none"),n&&(n.style.display=s.value==="Processing"?"none":"flex"),O&&q(O)})});document.querySelectorAll('input[name="language"], input[name="processingVector"], input[name="sortMode"], #instanceMode, #showCoordinates').forEach(e=>{e.addEventListener("change",()=>{O&&q(O)})});document.querySelectorAll("#coordMultiplier, #precision").forEach(e=>{e.addEventListener("change",()=>{O&&q(O)})});ee&&ee.addEventListener("input",()=>{O&&q(O)});H.addEventListener("dragover",e=>{e.preventDefault(),H.classList.add("dragover")});H.addEventListener("dragleave",()=>{H.classList.remove("dragover")});H.addEventListener("drop",e=>{e.preventDefault(),H.classList.remove("dragover");const t=e.dataTransfer?.files[0];t&&t.type==="image/svg+xml"?q(t):alert("Please drop a valid SVG file")});ve.addEventListener("change",e=>{const t=e.target.files?.[0];t&&q(t)});function q(e){ee&&e!==O&&(ee.value=le(e)),O=e;const t=new FileReader;t.onload=s=>{re&&(re(),re=null);const i=s.target?.result,o=new DOMParser().parseFromString(i,"image/svg+xml"),c=We(o);if(c.length===0){J.innerHTML='<div class="output"><p>No supported drawable elements found (path, line, polyline, polygon, rect, circle, ellipse).</p></div>';return}const u=document.querySelector('input[name="vectorFormat"]:checked')?.value||"Vec",r=document.querySelector('input[name="language"]:checked')?.value||"javascript",a=parseFloat(document.getElementById("coordMultiplier")?.value)||1,x=parseInt(document.getElementById("precision")?.value)||5,C=document.querySelector('input[name="processingVector"]:checked')?.value||"PVector",k=document.getElementById("instanceMode")?.checked||!1,I=document.getElementById("showCoordinates")?.checked??!0,h=document.querySelector('input[name="sortMode"]:checked')?.value||"primitive",y=ee?.value??le(e),f=Ze(y.length>0?y:le(e)),l={vectorFormat:u,language:r,coordMultiplier:a,precision:x,processingVector:C,instanceMode:k},g=new Map;c.forEach((S,w)=>{const T=w+1,F=`${S.primitive?.kind??"path"}${T}`;g.set(S,{id:T,name:F,functionName:Ke(f,T)})});const p=[...c].sort((S,w)=>{if(h==="svg")return S.sourceIndex-w.sourceIndex;const T=S.primitive?.kind??"path",A=w.primitive?.kind??"path";return T===A?S.sourceIndex-w.sourceIndex:T.localeCompare(A)});let d="",$="";const m=[],b=[],v=[],E=[],Y=[];p.forEach((S,w)=>{const T=g.get(S);if(!T)return;m.push(S.pathData),b.push(T.id);const A=T.name,F=T.functionName;Y.push(A),E.push(F);const R=ke(S.pathData,l,w,S,F);w===0&&(d=R.sharedCode),v.push(R.pathCode);const G=`preview-${w}`;$+=`
          <div class="output path-section" id="shape-section-${w}">
            <div class="path-header">
              <h2>${A} (svg #${S.sourceIndex})</h2>
              <button class="copy-btn" data-path="${w}">Copy Code</button>
            </div>
            <div class="content-grid">
              <div class="preview-container">
                <div id="${G}"></div>
              </div>
              <div class="code-container">
                <pre><code>${ge(R.pathCode)}</code></pre>
              </div>
            </div>
          </div>
        `});const D=Ye(E,l).trim(),M=d.trim(),z=v.join(`

`).trim(),Z=[D,z].filter(S=>S.length>0).join(`

`),te={complete:[M,Z].filter(S=>S.length>0).join(`

`),drawing:Z,shared:M},K=u==="Processing"?"pde":r==="typescript"?"ts":"js",ne=`draw-paths.${K}`,P=`draw-paths-drawing.${K}`,X=`draw-paths-shared.${K}`,N=`
      <div class="command-section">
        <div class="command-header">
          <h2>Complete File</h2>
          <div class="action-buttons">
            <button class="copy-btn" data-code-key="complete">Copy Complete Code</button>
            <button class="download-btn" data-code-key="complete" data-filename="${ne}">Download ${ne}</button>
          </div>
        </div>
        <div class="command-content">
          <p style="margin: 0; padding: 15px; color: #9cdcfe;">Includes shared transform code and all generated drawing functions.</p>
        </div>
      </div>
      <div class="command-section">
        <div class="command-header">
          <h2>Drawing Code Only</h2>
          <div class="action-buttons">
            <button class="copy-btn" data-code-key="drawing">Copy Drawing Code</button>
            <button class="download-btn" data-code-key="drawing" data-filename="${P}">Download ${P}</button>
          </div>
        </div>
        <div class="command-content">
          <p style="margin: 0; padding: 15px; color: #9cdcfe;">Includes draw calls and shape functions without the shared transform section.</p>
        </div>
      </div>
    `,B=`
      <div class="shared-code-section">
        <div class="shared-code-header">
          <h2>Shared Code</h2>
          <div class="action-buttons">
            <button class="copy-btn" data-code-key="shared">Copy Shared Code</button>
            <button class="download-btn" data-code-key="shared" data-filename="${X}">Download ${X}</button>
          </div>
        </div>
        <div class="shared-code-content">
          <pre><code>${ge(M)}</code></pre>
        </div>
      </div>
    `,V=`
      <div class="combined-preview-section output">
        <div class="combined-preview-header">
          <h2>All paths</h2>
        </div>
        <div class="preview-container">
          <div id="preview-all"></div>
        </div>
      </div>
    `,j=`
      <div class="shape-nav">
        <h3>Shapes</h3>
        <ul class="shape-nav-list">
          ${Y.map((S,w)=>`
            <li>
              <button class="shape-nav-link" data-target="shape-section-${w}">${S}</button>
            </li>
          `).join("")}
        </ul>
      </div>
    `;J.innerHTML=j+N+B+V+$,ze(m,b,"preview-all",p),m.forEach((S,w)=>{De(S,`preview-${w}`,p[w],I)}),re=Ge(),J.querySelectorAll(".download-btn[data-code-key]").forEach(S=>{S.addEventListener("click",()=>{const w=S.dataset.codeKey,T=S.dataset.filename;if(!w||!T)return;const A=te[w];if(!A)return;const F=new Blob([A],{type:"text/plain"}),R=URL.createObjectURL(F),G=document.createElement("a");G.href=R,G.download=T,G.click(),URL.revokeObjectURL(R);const Se=S.textContent;S.textContent="Downloaded!",setTimeout(()=>{S.textContent=Se},2e3)})}),J.querySelectorAll(".copy-btn").forEach(S=>{S.addEventListener("click",w=>{const T=w.currentTarget,A=T.dataset.codeKey;let F="";A?F=te[A]||"":F=T.closest(".path-section")?.querySelector("code")?.textContent||"",F&&navigator.clipboard.writeText(F).then(()=>{const R=T.textContent;T.textContent="Copied!",setTimeout(()=>{T.textContent=R},2e3)})})})},t.readAsText(e)}function Ge(){const e=Array.from(J.querySelectorAll(".shape-nav-link"));if(e.length===0)return()=>{};const t=e.map(u=>{const r=u.dataset.target;return r?document.getElementById(r):null}).filter(u=>u!==null);if(t.length===0)return()=>{};const s=u=>{e.forEach(r=>{r.classList.toggle("is-active",r.dataset.target===u.id)})},i=()=>{const u=window.innerHeight/2;let r=t[0],a=Number.POSITIVE_INFINITY;t.forEach(x=>{const C=x.getBoundingClientRect(),k=C.top+C.height/2,I=Math.abs(k-u);I<a&&(a=I,r=x)}),s(r)},n=u=>{const a=u.currentTarget.dataset.target;if(!a)return;const x=document.getElementById(a);x&&x.scrollIntoView({behavior:"smooth",block:"center"})};e.forEach(u=>{u.addEventListener("click",n)});let o=!1;const c=()=>{o||(o=!0,window.requestAnimationFrame(()=>{o=!1,i()}))};return window.addEventListener("scroll",c,{passive:!0}),window.addEventListener("resize",c),i(),()=>{e.forEach(u=>{u.removeEventListener("click",n)}),window.removeEventListener("scroll",c),window.removeEventListener("resize",c)}}
