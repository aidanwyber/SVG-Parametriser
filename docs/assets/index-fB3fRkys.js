(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const t of o)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function r(o){const t={};return o.integrity&&(t.integrity=o.integrity),o.referrerPolicy&&(t.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?t.credentials="include":o.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(o){if(o.ep)return;o.ep=!0;const t=r(o);fetch(o.href,t)}})();function _(e){const n=[],r=/([MLHVCSQTAZmlhvcsqtaz])\s*([^MLHVCSQTAZmlhvcsqtaz]*)/g;let a,o=0,t=0,s=0,i=0,l="",p=null,$=null;const g=()=>{p=null,$=null},b=P=>{const m=/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g;return(P.match(m)||[]).map(Number)};for(;(a=r.exec(e))!==null;){const P=a[1],m=P===P.toLowerCase(),v=P.toUpperCase(),u=b(a[2]);if(v==="M"){for(let c=0;c+1<u.length;c+=2){const d=m?o+u[c]:u[c],h=m?t+u[c+1]:u[c+1];c===0?(n.push({type:"M",x:d,y:h}),s=d,i=h):n.push({type:"L",x:d,y:h}),o=d,t=h}g(),l=u.length>2?"L":"M"}else if(v==="L"){for(let c=0;c+1<u.length;c+=2){const d=m?o+u[c]:u[c],h=m?t+u[c+1]:u[c+1];n.push({type:"L",x:d,y:h}),o=d,t=h}g(),l="L"}else if(v==="H"){for(let c=0;c<u.length;c++){const d=m?o+u[c]:u[c];n.push({type:"L",x:d,y:t}),o=d}g(),l="L"}else if(v==="V"){for(let c=0;c<u.length;c++){const d=m?t+u[c]:u[c];n.push({type:"L",x:o,y:d}),t=d}g(),l="L"}else if(v==="C")for(let c=0;c+5<u.length;c+=6){const d=m?o+u[c]:u[c],h=m?t+u[c+1]:u[c+1],f=m?o+u[c+2]:u[c+2],y=m?t+u[c+3]:u[c+3],C=m?o+u[c+4]:u[c+4],x=m?t+u[c+5]:u[c+5];n.push({type:"C",x1:d,y1:h,x2:f,y2:y,x:C,y:x}),o=C,t=x,p=f,$=y,l="C"}else if(v==="S")for(let c=0;c+3<u.length;c+=4){let d=o,h=t;(l==="C"||l==="S")&&p!==null&&$!==null&&(d=o*2-p,h=t*2-$);const f=m?o+u[c]:u[c],y=m?t+u[c+1]:u[c+1],C=m?o+u[c+2]:u[c+2],x=m?t+u[c+3]:u[c+3];n.push({type:"C",x1:d,y1:h,x2:f,y2:y,x:C,y:x}),o=C,t=x,p=f,$=y,l="S"}else v==="Z"?(n.push({type:"Z"}),o=s,t=i,g(),l="Z"):(g(),l=v)}return n}function B(e){let n="",r=e;for(;r>=0;)n=String.fromCharCode(65+r%26)+n,r=Math.floor(r/26)-1;return n}function I(e,n,r){const a=(e*n).toFixed(r);return parseFloat(a).toString()}function nt(e){const{vectorFormat:n,language:r,processingVector:a="PVector",instanceMode:o=!1}=e,t=r==="typescript",s=n==="Processing",i=s&&a==="Vec2D",l=o&&n==="createVector";if(s){const b=i?"Vec2D":"PVector";return`${i?`import toxi.geom.*;

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

${b} applyTransform(${b} v) {
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

	return new ${b}(x, y);
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
}`}if(n==="Vec")return`// Transform configuration
const transformConfig${t?`: {
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
	${t?`a: number; b: number; c: number; d: number; tx: number; ty: number;

	`:""}constructor(a${t?": number":""}, b${t?": number":""}, c${t?": number":""}, d${t?": number":""}, tx${t?": number":""}, ty${t?": number":""}) {
		this.a = a; this.b = b;
		this.c = c; this.d = d;
		this.tx = tx; this.ty = ty;
	}

	transform(x${t?": number":""}, y${t?": number":""})${t?": [number, number]":""} {
		return [
			this.a * x + this.c * y + this.tx,
			this.b * x + this.d * y + this.ty
		];
	}

	static fromTransform(config${t?": typeof transformConfig":""})${t?": Matrix2D":""} {
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

function applyTransform(v${t?": Vec":""})${t?": Vec":""} {
	const [x, y] = transform.transform(v.x, v.y);
	return new Vec(x, y);
}

function applyTransformScalar(value${t?": number":""}, axis${t?": 'x' | 'y' | 'avg'":""} = 'avg')${t?": number":""} {
	if (axis === 'x') {
		return value * transformConfig.scaleX;
	}
	if (axis === 'y') {
		return value * transformConfig.scaleY;
	}
	return value * ((Math.abs(transformConfig.scaleX) + Math.abs(transformConfig.scaleY)) * 0.5);
}`;const p=l?"p.createVector":"createVector",$=t?"p5.Vector":"",g=l?t?"p: any":"p":"";return`// Transform configuration
const transformConfig${t?`: {
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

function applyTransform(${g?g+", ":""}v${t?`: ${$}`:""})${t?`: ${$}`:""} {
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

	return ${p}(x, y);
}

function applyTransformScalar(value${t?": number":""}, axis${t?": 'x' | 'y' | 'avg'":""} = 'avg')${t?": number":""} {
	if (axis === 'x') {
		return value * transformConfig.scaleX;
	}
	if (axis === 'y') {
		return value * transformConfig.scaleY;
	}
	return value * ((Math.abs(transformConfig.scaleX) + Math.abs(transformConfig.scaleY)) * 0.5);
}`}function ot(e,n){const{vectorFormat:r,language:a,instanceMode:o=!1}=n,t=a==="typescript",s=r==="Processing",i=o&&(r==="createVector"||r==="Vec");return s?`void ${e}() {`:`function ${e}(${i?t?"p: any":"p":""})${t?": void":""} {`}function G(e){const{vectorFormat:n,instanceMode:r=!1}=e;return r&&(n==="createVector"||n==="Vec")?"p.":""}function st(e,n,r,a,o,t,s){const i=n.vectorFormat==="Processing",l=G(n),p=c=>I(c,r,a),$=[],g=[],b="'x'",P="'y'",m=i?"'a'":"'avg'",v=(c,d,h)=>{const f=`${s}${t}(${p(d)}, ${p(h)}))`;i?$.push(`${o} ${c} = ${f};`):$.push(`const ${c} = ${f};`)},u=(c,d,h)=>{const f=`applyTransformScalar(${p(d)}, ${h})`;i?$.push(`float ${c} = ${f};`):$.push(`const ${c} = ${f};`)};if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?null:(v("p1",e.x1,e.y1),v("p2",e.x2,e.y2),g.push(`${l}line(p1.x, p1.y, p2.x, p2.y);`),{declarations:$,drawCalls:g});if(e.kind==="polyline"||e.kind==="polygon"){const c=e.points||[];return c.length<2?null:(c.forEach(([d,h],f)=>{v(`p${f}`,d,h)}),g.push(`${l}beginShape();`),c.forEach((d,h)=>{g.push(`${l}vertex(p${h}.x, p${h}.y);`)}),g.push(`${l}endShape(${e.kind==="polygon"?"CLOSE":"OPEN"});`),{declarations:$,drawCalls:g})}if(e.kind==="rect"){if(e.x==null||e.y==null||e.width==null||e.height==null)return null;v("rectPos",e.x,e.y),u("rectW",e.width,b),u("rectH",e.height,P);const c=e.rx||0,d=e.ry||0;if(c>0||d>0){if(Math.abs(c-d)>1e-9)return null;u("rectR",c,m),g.push(`${l}rect(rectPos.x, rectPos.y, rectW, rectH, rectR);`)}else g.push(`${l}rect(rectPos.x, rectPos.y, rectW, rectH);`);return{declarations:$,drawCalls:g}}return e.kind==="circle"?e.cx==null||e.cy==null||e.r==null?null:(v("circleCenter",e.cx,e.cy),u("circleDiameter",e.r*2,m),g.push(`${l}circle(circleCenter.x, circleCenter.y, circleDiameter);`),{declarations:$,drawCalls:g}):e.kind==="ellipse"?e.cx==null||e.cy==null||e.rx==null||e.ry==null?null:(v("ellipseCenter",e.cx,e.cy),u("ellipseW",e.rx*2,b),u("ellipseH",e.ry*2,P),g.push(`${l}ellipse(ellipseCenter.x, ellipseCenter.y, ellipseW, ellipseH);`),{declarations:$,drawCalls:g}):null}function rt(e,n,r,a,o){const{vectorFormat:t,coordMultiplier:s,precision:i,processingVector:l="PVector",instanceMode:p=!1}=n,$=t==="Processing",g=$&&l==="Vec2D",b=p&&(t==="createVector"||t==="Vec"),P=o||`drawPath${r+1}`,m=$?g?"new Vec2D":"new PVector":t==="Vec"?"new Vec":p&&t==="createVector"?"p.createVector":"createVector",v=[],u=[],c=$?g?"Vec2D":"PVector":"const",d=b&&t==="createVector"?"applyTransform(p, ":"applyTransform(",h=nt(n),f=ot(P,n),y=G(n);if(a?.primitive){const T=st(a.primitive,n,s,i,c,m,d);if(T){const D=T.declarations.length>0?`${T.declarations.map(S=>`	${S}`).join(`
`)}

`:"",V=T.drawCalls.map(S=>`	${S}`).join(`
`),z=`${f}
${D}${V}
}`;return{sharedCode:h,pathCode:z}}}const C=_(e);let x=0;const k=C.length>0&&C[C.length-1].type==="Z";C.forEach(T=>{if(T.type==="M"||T.type==="L"){const D=B(x),V=I(T.x,s,i),z=I(T.y,s,i);v.push(`${D} = ${d}${m}(${V}, ${z}))`),u.push(`${y}vertex(${D}.x, ${D}.y);`),x++}else if(T.type==="C"){const D=B(x-1),V=B(x),z=D+"c",S="c"+V,M=I(T.x1,s,i),L=I(T.y1,s,i),Y=I(T.x2,s,i),N=I(T.y2,s,i),X=I(T.x,s,i),H=I(T.y,s,i);v.push(`${z} = ${d}${m}(${M}, ${L}))`),v.push(`${S} = ${d}${m}(${Y}, ${N}))`),v.push(`${V} = ${d}${m}(${X}, ${H}))`),u.push(`${y}bezierVertex(${z}.x, ${z}.y, ${S}.x, ${S}.y, ${V}.x, ${V}.y);`),x++}});let w,A;$?(w=`	${c} ${v.join(`,
		`)};`,A=u.map(T=>`	${T}`).join(`
`)):(w=`	${c} ${v.join(`,
		`)};`,A=u.map(T=>`	${T}`).join(`
`));const Z=`${f}
${w}

	${y}beginShape();
${A}
	${y}endShape(${k?"CLOSE":"OPEN"});
}`;return{sharedCode:h,pathCode:Z}}function at(e,n){const{vectorFormat:r,language:a,instanceMode:o=!1}=n,t=a==="typescript",s=r==="Processing",i=o&&(r==="createVector"||r==="Vec"),l=e.map(p=>s?`	${p}();`:i?`	${p}(p);`:`	${p}();`).join(`
`);return s?`
void drawAllPaths() {
${l}
}`:`
function drawAllPaths(${i?t?"p: any":"p":""})${t?": void":""} {
${l}
}`}function U(e){const n=document.createElement("div");return n.textContent=e,n.innerHTML}function Q(e){const n=[];let r=0;return e.forEach(a=>{if(a.type==="M"||a.type==="L"){const o=B(r);n.push({name:o,x:a.x,y:a.y}),r++}else if(a.type==="C"){const o=B(r-1),t=B(r),s=o+"c",i="c"+t;n.push({name:s,x:a.x1,y:a.y1}),n.push({name:i,x:a.x2,y:a.y2}),n.push({name:t,x:a.x,y:a.y}),r++}}),n}function J(e){const n=e.map(i=>i.x),r=e.map(i=>i.y),a=Math.min(...n),o=Math.min(...r),t=Math.max(...n),s=Math.max(...r);return{minX:a,minY:o,maxX:t,maxY:s,width:t-a,height:s-o}}function ct(e,n){const r=_(e),a=Q(r);if(a.length===0)return;const o=J(a);new window.p5(t=>{const p=o.width>0?440/o.width:1,$=o.height>0?440/o.height:1,g=Math.min(p,$),b=o.width*g,P=o.height*g,m=(500-b)/2-o.minX*g,v=(500-P)/2-o.minY*g;t.setup=()=>{t.createCanvas(500,500),t.noLoop()},t.draw=()=>{t.background(30);const u=(f,y)=>({x:f*g+m,y:y*g+v});t.stroke(60),t.strokeWeight(1);for(let f=0;f<=500;f+=50)t.line(f,0,f,500),t.line(0,f,500,f);const c=u(0,0);t.stroke(255,100,100),t.strokeWeight(2),t.line(0,c.y,500,c.y),t.stroke(100,255,100),t.strokeWeight(2),t.line(c.x,0,c.x,500),t.noStroke(),t.fill(255,200,0),t.circle(c.x,c.y,12),t.fill(255),t.textAlign(t.LEFT,t.BOTTOM),t.textSize(14),t.textStyle(t.BOLD),t.text("(0, 0)",c.x+8,c.y-8),t.fill(100,150,255,50),t.stroke(100,150,255),t.strokeWeight(2),t.beginShape(),r.forEach(f=>{if(f.type==="M"){const y=u(f.x,f.y);t.vertex(y.x,y.y)}else if(f.type==="L"){const y=u(f.x,f.y);t.vertex(y.x,y.y)}else if(f.type==="C"){const y=u(f.x1,f.y1),C=u(f.x2,f.y2),x=u(f.x,f.y);t.bezierVertex(y.x,y.y,C.x,C.y,x.x,x.y)}});const d=r.length>0&&r[r.length-1].type==="Z";t.endShape(d?t.CLOSE:t.OPEN),t.stroke(255,200,100,100),t.strokeWeight(1);let h=0;r.forEach(f=>{if(f.type==="C"){const y=a.find(w=>w.name===String.fromCharCode(65+h-1)),C=a.find(w=>w.name===y?.name+"c"),x=a.find(w=>w.name==="c"+String.fromCharCode(65+h)),k=a.find(w=>w.name===String.fromCharCode(65+h));if(y&&C){const w=u(y.x,y.y),A=u(C.x,C.y);t.line(w.x,w.y,A.x,A.y)}if(x&&k){const w=u(x.x,x.y),A=u(k.x,k.y);t.line(w.x,w.y,A.x,A.y)}h++}else(f.type==="M"||f.type==="L")&&h++}),a.forEach(f=>{const y=u(f.x,f.y),C=f.name.includes("c");t.noStroke(),C?(t.fill(255,200,100),t.circle(y.x,y.y,8)):(t.fill(100,255,150),t.circle(y.x,y.y,10)),t.fill(255),t.noStroke(),t.textAlign(t.CENTER,t.CENTER),t.textSize(12),t.textStyle(t.BOLD);const x=15;t.text(f.name,y.x,y.y-x),t.textSize(9),t.textStyle(t.NORMAL),t.fill(200),t.text(`(${f.x.toFixed(1)}, ${f.y.toFixed(1)})`,y.x,y.y+x+3)}),t.fill(200),t.noStroke(),t.textAlign(t.LEFT,t.TOP),t.textSize(11),t.text(`Scale: ${g.toFixed(3)}x`,10,10),t.text(`Size: ${o.width.toFixed(1)} × ${o.height.toFixed(1)}`,10,25)}},n)}function it(e,n){const r=e.map(s=>_(s)).filter(s=>s.length>0),a=r.flatMap(s=>Q(s));if(a.length===0)return;const o=J(a),t=r.map(()=>{const s=80+Math.floor(Math.random()*176),i=80+Math.floor(Math.random()*176),l=80+Math.floor(Math.random()*176);return{stroke:[s,i,l]}});new window.p5(s=>{const $=o.width>0?440/o.width:1,g=o.height>0?440/o.height:1,b=Math.min($,g),P=o.width*b,m=o.height*b,v=(500-P)/2-o.minX*b,u=(500-m)/2-o.minY*b,c=(d,h)=>({x:d*b+v,y:h*b+u});s.setup=()=>{s.createCanvas(500,500),s.noLoop()},s.draw=()=>{s.background(30),s.stroke(60),s.strokeWeight(1);for(let h=0;h<=500;h+=50)s.line(h,0,h,500),s.line(0,h,500,h);const d=c(0,0);s.stroke(255,100,100),s.strokeWeight(2),s.line(0,d.y,500,d.y),s.stroke(100,255,100),s.strokeWeight(2),s.line(d.x,0,d.x,500),s.noStroke(),s.fill(255,200,0),s.circle(d.x,d.y,10),r.forEach((h,f)=>{const y=t[f];s.noFill(),s.stroke(y.stroke[0],y.stroke[1],y.stroke[2]),s.strokeWeight(2),s.beginShape();let C=!1;if(h.forEach(x=>{if(x.type==="M"||x.type==="L"){const k=c(x.x,x.y);s.vertex(k.x,k.y),C=!0}else if(x.type==="C"){const k=c(x.x1,x.y1),w=c(x.x2,x.y2),A=c(x.x,x.y);s.bezierVertex(k.x,k.y,w.x,w.y,A.x,A.y),C=!0}}),C){const x=h.length>0&&h[h.length-1].type==="Z";s.endShape(x?s.CLOSE:s.OPEN)}else s.endShape(s.OPEN)}),s.fill(200),s.noStroke(),s.textAlign(s.LEFT,s.TOP),s.textSize(11),s.text(`Paths: ${r.length}`,10,10),s.text(`Scale: ${b.toFixed(3)}x`,10,25),s.text(`Size: ${o.width.toFixed(1)} x ${o.height.toFixed(1)}`,10,40)}},n)}const W=.5522847498307936;function E(e,n=0){if(e==null)return n;const r=Number.parseFloat(e);return Number.isFinite(r)?r:n}function lt(e){if(!e)return[];const n=/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g,r=(e.match(n)||[]).map(Number),a=[];for(let o=0;o+1<r.length;o+=2)a.push([r[o],r[o+1]]);return a}function ut(e){const n=E(e.getAttribute("x1"),0),r=E(e.getAttribute("y1"),0),a=E(e.getAttribute("x2"),0),o=E(e.getAttribute("y2"),0);return{pathData:`M ${n} ${r} L ${a} ${o}`,sourceIndex:0,primitive:{kind:"line",x1:n,y1:r,x2:a,y2:o}}}function K(e,n){const r=lt(e.getAttribute("points"));if(r.length<2)return null;const[a,o]=r[0],t=r.slice(1).map(([s,i])=>`L ${s} ${i}`).join(" ");return{pathData:`M ${a} ${o} ${t}${n?" Z":""}`,sourceIndex:0,primitive:{kind:n?"polygon":"polyline",points:r}}}function ft(e,n,r,a,o,t){if(o===0||t===0)return`M ${e} ${n} L ${e+r} ${n} L ${e+r} ${n+a} L ${e} ${n+a} Z`;const s=o*W,i=t*W,l=e+r,p=n+a;return[`M ${e+o} ${n}`,`L ${l-o} ${n}`,`C ${l-o+s} ${n} ${l} ${n+t-i} ${l} ${n+t}`,`L ${l} ${p-t}`,`C ${l} ${p-t+i} ${l-o+s} ${p} ${l-o} ${p}`,`L ${e+o} ${p}`,`C ${e+o-s} ${p} ${e} ${p-t+i} ${e} ${p-t}`,`L ${e} ${n+t}`,`C ${e} ${n+t-i} ${e+o-s} ${n} ${e+o} ${n}`,"Z"].join(" ")}function dt(e){const n=E(e.getAttribute("x"),0),r=E(e.getAttribute("y"),0),a=E(e.getAttribute("width"),0),o=E(e.getAttribute("height"),0);if(a<=0||o<=0)return null;const t=e.getAttribute("rx"),s=e.getAttribute("ry");let i=E(t,0),l=E(s,0);return t!=null&&s==null&&(l=i),s!=null&&t==null&&(i=l),i=Math.max(0,Math.min(i,a/2)),l=Math.max(0,Math.min(l,o/2)),{pathData:ft(n,r,a,o,i,l),sourceIndex:0,primitive:{kind:"rect",x:n,y:r,width:a,height:o,rx:i,ry:l}}}function tt(e,n,r,a){const o=r*W,t=a*W;return[`M ${e+r} ${n}`,`C ${e+r} ${n+t} ${e+o} ${n+a} ${e} ${n+a}`,`C ${e-o} ${n+a} ${e-r} ${n+t} ${e-r} ${n}`,`C ${e-r} ${n-t} ${e-o} ${n-a} ${e} ${n-a}`,`C ${e+o} ${n-a} ${e+r} ${n-t} ${e+r} ${n}`,"Z"].join(" ")}function ht(e){const n=E(e.getAttribute("cx"),0),r=E(e.getAttribute("cy"),0),a=E(e.getAttribute("r"),0);return a<=0?null:{pathData:tt(n,r,a,a),sourceIndex:0,primitive:{kind:"circle",cx:n,cy:r,r:a}}}function pt(e){const n=E(e.getAttribute("cx"),0),r=E(e.getAttribute("cy"),0),a=E(e.getAttribute("rx"),0),o=E(e.getAttribute("ry"),0);return a<=0||o<=0?null:{pathData:tt(n,r,a,o),sourceIndex:0,primitive:{kind:"ellipse",cx:n,cy:r,rx:a,ry:o}}}function gt(e){const r=Array.from(e.querySelectorAll("path,rect,circle,ellipse,line,polyline,polygon")),a=[];return r.forEach((o,t)=>{const s=t+1,i=o.tagName.toLowerCase();if(i==="path"){const p=o.getAttribute("d");p&&a.push({pathData:p,sourceIndex:s});return}let l=null;i==="line"?l=ut(o):i==="polyline"?l=K(o,!1):i==="polygon"?l=K(o,!0):i==="rect"?l=dt(o):i==="circle"?l=ht(o):i==="ellipse"&&(l=pt(o)),l&&(l.sourceIndex=s,a.push(l))}),a}const F=document.getElementById("dropZone"),et=document.getElementById("fileInput"),R=document.getElementById("output");let O=null,q=null;function yt(e){const n=e.replace(/[^a-zA-Z0-9_]/g,"_");return n.length===0?"shape":/^[a-zA-Z_]/.test(n)?n:`shape_${n}`}F.addEventListener("click",()=>et.click());document.querySelectorAll('input[name="vectorFormat"]').forEach(e=>{e.addEventListener("change",n=>{const r=n.target,a=document.getElementById("processingVectorOption"),o=document.getElementById("instanceModeOption");a&&(a.style.display=r.value==="Processing"?"flex":"none"),o&&(o.style.display=r.value==="Processing"?"none":"flex"),O&&j(O)})});document.querySelectorAll('input[name="language"], input[name="processingVector"], #instanceMode').forEach(e=>{e.addEventListener("change",()=>{O&&j(O)})});document.querySelectorAll("#coordMultiplier, #precision").forEach(e=>{e.addEventListener("change",()=>{O&&j(O)})});F.addEventListener("dragover",e=>{e.preventDefault(),F.classList.add("dragover")});F.addEventListener("dragleave",()=>{F.classList.remove("dragover")});F.addEventListener("drop",e=>{e.preventDefault(),F.classList.remove("dragover");const n=e.dataTransfer?.files[0];n&&n.type==="image/svg+xml"?j(n):alert("Please drop a valid SVG file")});et.addEventListener("change",e=>{const n=e.target.files?.[0];n&&j(n)});function j(e){O=e;const n=new FileReader;n.onload=r=>{q&&(q(),q=null);const a=r.target?.result,t=new DOMParser().parseFromString(a,"image/svg+xml"),s=gt(t).sort((S,M)=>{const L=S.primitive?.kind??"path",Y=M.primitive?.kind??"path";return L===Y?S.sourceIndex-M.sourceIndex:L.localeCompare(Y)});if(s.length===0){R.innerHTML='<div class="output"><p>No supported drawable elements found (path, line, polyline, polygon, rect, circle, ellipse).</p></div>';return}const i=document.querySelector('input[name="vectorFormat"]:checked')?.value||"Vec",l=document.querySelector('input[name="language"]:checked')?.value||"javascript",p=parseFloat(document.getElementById("coordMultiplier")?.value)||1,$=parseInt(document.getElementById("precision")?.value)||5,g=document.querySelector('input[name="processingVector"]:checked')?.value||"PVector",b=document.getElementById("instanceMode")?.checked||!1,P={vectorFormat:i,language:l,coordMultiplier:p,precision:$,processingVector:g,instanceMode:b};let m="",v="";const u=[],c=[],d=[],h=[],f={};s.forEach((S,M)=>{u.push(S.pathData);const L=S.primitive?.kind??"path";f[L]=(f[L]||0)+1;const Y=`${L}${f[L]}`,N=yt(Y);h.push(Y),d.push(N);const X=rt(S.pathData,P,M,S,N);M===0&&(m=X.sharedCode),c.push(X.pathCode);const H=`preview-${M}`;v+=`
          <div class="output path-section" id="shape-section-${M}">
            <div class="path-header">
              <h2>${Y} (svg #${S.sourceIndex})</h2>
              <button class="copy-btn" data-path="${M}">Copy Code</button>
            </div>
            <div class="content-grid">
              <div class="preview-container">
                <div id="${H}"></div>
              </div>
              <div class="code-container">
                <pre><code>${U(X.pathCode)}</code></pre>
              </div>
            </div>
          </div>
        `});const y=at(d,P),C=m+y,k=`draw-paths.${i==="Processing"?"pde":l==="typescript"?"ts":"js"}`,w=`${C}

${c.join(`

`)}`,A=`
      <div class="command-section">
        <div class="command-header">
          <h2>Download Complete File</h2>
          <button class="download-btn" data-filename="${k}">Download ${k}</button>
        </div>
        <div class="command-content">
          <p style="margin: 0; padding: 15px; color: #9cdcfe;">Click the button above to download a file containing all the shared code and shape functions.</p>
        </div>
      </div>
    `,Z=`
      <div class="shared-code-section">
        <div class="shared-code-header">
          <h2>Shared Code</h2>
          <button class="copy-btn" data-shared="true">Copy Shared Code</button>
        </div>
        <div class="shared-code-content">
          <pre><code>${U(C)}</code></pre>
        </div>
      </div>
    `,T=`
      <div class="combined-preview-section output">
        <div class="combined-preview-header">
          <h2>All paths</h2>
        </div>
        <div class="preview-container">
          <div id="preview-all"></div>
        </div>
      </div>
    `,D=`
      <div class="shape-nav">
        <h3>Shapes</h3>
        <ul class="shape-nav-list">
          ${h.map((S,M)=>`
            <li>
              <button class="shape-nav-link" data-target="shape-section-${M}">${S}</button>
            </li>
          `).join("")}
        </ul>
      </div>
    `;R.innerHTML=D+A+Z+T+v;const V=R.querySelector(".download-btn");V&&V.addEventListener("click",()=>{const S=new Blob([w],{type:"text/plain"}),M=URL.createObjectURL(S),L=document.createElement("a");L.href=M,L.download=k,L.click(),URL.revokeObjectURL(M);const Y=V.textContent;V.textContent="Downloaded!",setTimeout(()=>{V.textContent=Y},2e3)}),it(u,"preview-all"),u.forEach((S,M)=>{ct(S,`preview-${M}`)}),q=$t(),R.querySelectorAll(".copy-btn").forEach(S=>{S.addEventListener("click",M=>{const L=M.target,Y=L.dataset.shared==="true";let N="";Y?N=L.closest(".shared-code-section")?.querySelector("code")?.textContent||"":N=L.closest(".path-section")?.querySelector("code")?.textContent||"",navigator.clipboard.writeText(N).then(()=>{const X=L.textContent;L.textContent="Copied!",setTimeout(()=>{L.textContent=X},2e3)})})})},n.readAsText(e)}function $t(){const e=Array.from(R.querySelectorAll(".shape-nav-link"));if(e.length===0)return()=>{};const n=e.map(i=>{const l=i.dataset.target;return l?document.getElementById(l):null}).filter(i=>i!==null);if(n.length===0)return()=>{};const r=i=>{e.forEach(l=>{l.classList.toggle("is-active",l.dataset.target===i.id)})},a=()=>{const i=window.innerHeight/2;let l=n[0],p=Number.POSITIVE_INFINITY;n.forEach($=>{const g=$.getBoundingClientRect(),b=g.top+g.height/2,P=Math.abs(b-i);P<p&&(p=P,l=$)}),r(l)},o=i=>{const p=i.currentTarget.dataset.target;if(!p)return;const $=document.getElementById(p);$&&$.scrollIntoView({behavior:"smooth",block:"center"})};e.forEach(i=>{i.addEventListener("click",o)});let t=!1;const s=()=>{t||(t=!0,window.requestAnimationFrame(()=>{t=!1,a()}))};return window.addEventListener("scroll",s,{passive:!0}),window.addEventListener("resize",s),a(),()=>{e.forEach(i=>{i.removeEventListener("click",o)}),window.removeEventListener("scroll",s),window.removeEventListener("resize",s)}}
