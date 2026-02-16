(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function a(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=a(o);fetch(o.href,s)}})();function G(e){const n=[],a=/([MLHVCSQTAZmlhvcsqtaz])\s*([^MLHVCSQTAZmlhvcsqtaz]*)/g;let r,o=0,s=0,i=0,c=0,t="",f=null,m=null;const v=()=>{f=null,m=null},L=M=>{const g=/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g;return(M.match(g)||[]).map(Number)};for(;(r=a.exec(e))!==null;){const M=r[1],g=M===M.toLowerCase(),S=M.toUpperCase(),u=L(r[2]);if(S==="M"){for(let l=0;l+1<u.length;l+=2){const x=g?o+u[l]:u[l],h=g?s+u[l+1]:u[l+1];l===0?(n.push({type:"M",x,y:h}),i=x,c=h):n.push({type:"L",x,y:h}),o=x,s=h}v(),t=u.length>2?"L":"M"}else if(S==="L"){for(let l=0;l+1<u.length;l+=2){const x=g?o+u[l]:u[l],h=g?s+u[l+1]:u[l+1];n.push({type:"L",x,y:h}),o=x,s=h}v(),t="L"}else if(S==="H"){for(let l=0;l<u.length;l++){const x=g?o+u[l]:u[l];n.push({type:"L",x,y:s}),o=x}v(),t="L"}else if(S==="V"){for(let l=0;l<u.length;l++){const x=g?s+u[l]:u[l];n.push({type:"L",x:o,y:x}),s=x}v(),t="L"}else if(S==="C")for(let l=0;l+5<u.length;l+=6){const x=g?o+u[l]:u[l],h=g?s+u[l+1]:u[l+1],$=g?o+u[l+2]:u[l+2],b=g?s+u[l+3]:u[l+3],d=g?o+u[l+4]:u[l+4],y=g?s+u[l+5]:u[l+5];n.push({type:"C",x1:x,y1:h,x2:$,y2:b,x:d,y}),o=d,s=y,f=$,m=b,t="C"}else if(S==="S")for(let l=0;l+3<u.length;l+=4){let x=o,h=s;(t==="C"||t==="S")&&f!==null&&m!==null&&(x=o*2-f,h=s*2-m);const $=g?o+u[l]:u[l],b=g?s+u[l+1]:u[l+1],d=g?o+u[l+2]:u[l+2],y=g?s+u[l+3]:u[l+3];n.push({type:"C",x1:x,y1:h,x2:$,y2:b,x:d,y}),o=d,s=y,f=$,m=b,t="S"}else S==="Z"?(n.push({type:"Z"}),o=i,s=c,v(),t="Z"):(v(),t=S)}return n}function j(e){let n="",a=e;for(;a>=0;)n=String.fromCharCode(65+a%26)+n,a=Math.floor(a/26)-1;return n}function F(e,n,a){const r=(e*n).toFixed(a);return parseFloat(r).toString()}function ce(e){const{vectorFormat:n,language:a,processingVector:r="PVector",instanceMode:o=!1}=e,s=a==="typescript",i=n==="Processing",c=i&&r==="Vec2D",t=o&&n==="createVector";if(i){const L=c?"Vec2D":"PVector";return`${c?`import toxi.geom.*;

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

${L} applyTransform(${L} v) {
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

	return new ${L}(x, y);
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
}`;const f=t?"p.createVector":"createVector",m=s?"p5.Vector":"",v=t?s?"p: any":"p":"";return`// Transform configuration
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

function applyTransform(${v?v+", ":""}v${s?`: ${m}`:""})${s?`: ${m}`:""} {
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

	return ${f}(x, y);
}

function applyTransformScalar(value${s?": number":""}, axis${s?": 'x' | 'y' | 'avg'":""} = 'avg')${s?": number":""} {
	if (axis === 'x') {
		return value * transformConfig.scaleX;
	}
	if (axis === 'y') {
		return value * transformConfig.scaleY;
	}
	return value * ((Math.abs(transformConfig.scaleX) + Math.abs(transformConfig.scaleY)) * 0.5);
}`}function le(e,n){const{vectorFormat:a,language:r,instanceMode:o=!1}=n,s=r==="typescript",i=a==="Processing",c=o&&(a==="createVector"||a==="Vec");return i?`void ${e}() {`:`function ${e}(${c?s?"p: any":"p":""})${s?": void":""} {`}function te(e){const{vectorFormat:n,instanceMode:a=!1}=e;return a&&(n==="createVector"||n==="Vec")?"p.":""}function ie(e,n,a,r,o,s,i){const c=n.vectorFormat==="Processing",t=te(n),f=l=>F(l,a,r),m=[],v=[],L="'x'",M="'y'",g=c?"'a'":"'avg'",S=(l,x,h)=>{const $=`${i}${s}(${f(x)}, ${f(h)}))`;c?m.push(`${o} ${l} = ${$};`):m.push(`const ${l} = ${$};`)},u=(l,x,h)=>{const $=`applyTransformScalar(${f(x)}, ${h})`;c?m.push(`float ${l} = ${$};`):m.push(`const ${l} = ${$};`)};if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?null:(S("p1",e.x1,e.y1),S("p2",e.x2,e.y2),v.push(`${t}line(p1.x, p1.y, p2.x, p2.y);`),{declarations:m,drawCalls:v});if(e.kind==="polyline"||e.kind==="polygon"){const l=e.points||[];return l.length<2?null:(l.forEach(([x,h],$)=>{S(`p${$}`,x,h)}),v.push(`${t}beginShape();`),l.forEach((x,h)=>{v.push(`${t}vertex(p${h}.x, p${h}.y);`)}),v.push(`${t}endShape(${e.kind==="polygon"?"CLOSE":"OPEN"});`),{declarations:m,drawCalls:v})}if(e.kind==="rect"){if(e.x==null||e.y==null||e.width==null||e.height==null)return null;S("rectPos",e.x,e.y),u("rectW",e.width,L),u("rectH",e.height,M);const l=e.rx||0,x=e.ry||0;if(l>0||x>0){if(Math.abs(l-x)>1e-9)return null;u("rectR",l,g),v.push(`${t}rect(rectPos.x, rectPos.y, rectW, rectH, rectR);`)}else v.push(`${t}rect(rectPos.x, rectPos.y, rectW, rectH);`);return{declarations:m,drawCalls:v}}return e.kind==="circle"?e.cx==null||e.cy==null||e.r==null?null:(S("circleCenter",e.cx,e.cy),u("circleDiameter",e.r*2,g),v.push(`${t}circle(circleCenter.x, circleCenter.y, circleDiameter);`),{declarations:m,drawCalls:v}):e.kind==="ellipse"?e.cx==null||e.cy==null||e.rx==null||e.ry==null?null:(S("ellipseCenter",e.cx,e.cy),u("ellipseW",e.rx*2,L),u("ellipseH",e.ry*2,M),v.push(`${t}ellipse(ellipseCenter.x, ellipseCenter.y, ellipseW, ellipseH);`),{declarations:m,drawCalls:v}):null}function ue(e,n,a,r,o){const{vectorFormat:s,coordMultiplier:i,precision:c,processingVector:t="PVector",instanceMode:f=!1}=n,m=s==="Processing",v=m&&t==="Vec2D",L=f&&(s==="createVector"||s==="Vec"),M=o||`drawPath${a+1}`,g=m?v?"new Vec2D":"new PVector":s==="Vec"?"new Vec":f&&s==="createVector"?"p.createVector":"createVector",S=[],u=[],l=m?v?"Vec2D":"PVector":"const",x=L&&s==="createVector"?"applyTransform(p, ":"applyTransform(",h=ce(n),$=le(M,n),b=te(n);if(r?.primitive){const p=ie(r.primitive,n,i,c,l,g,x);if(p){const A=p.declarations.length>0?`${p.declarations.map(I=>`	${I}`).join(`
`)}

`:"",X=p.drawCalls.map(I=>`	${I}`).join(`
`),N=`${$}
${A}${X}
}`;return{sharedCode:h,pathCode:N}}}const d=G(e);let y=0;const C=d.length>0&&d[d.length-1].type==="Z";d.forEach(p=>{if(p.type==="M"||p.type==="L"){const A=j(y),X=F(p.x,i,c),N=F(p.y,i,c);S.push(`${A} = ${x}${g}(${X}, ${N}))`),u.push(`${b}vertex(${A}.x, ${A}.y);`),y++}else if(p.type==="C"){const A=j(y-1),X=j(y),N=A+"c",I="c"+X,O=F(p.x1,i,c),Q=F(p.y1,i,c),k=F(p.x2,i,c),P=F(p.y2,i,c),T=F(p.x,i,c),D=F(p.y,i,c);S.push(`${N} = ${x}${g}(${O}, ${Q}))`),S.push(`${I} = ${x}${g}(${k}, ${P}))`),S.push(`${X} = ${x}${g}(${T}, ${D}))`),u.push(`${b}bezierVertex(${N}.x, ${N}.y, ${I}.x, ${I}.y, ${X}.x, ${X}.y);`),y++}});let E,w;m?(E=`	${l} ${S.join(`,
		`)};`,w=u.map(p=>`	${p}`).join(`
`)):(E=`	${l} ${S.join(`,
		`)};`,w=u.map(p=>`	${p}`).join(`
`));const Y=`${$}
${E}

	${b}beginShape();
${w}
	${b}endShape(${C?"CLOSE":"OPEN"});
}`;return{sharedCode:h,pathCode:Y}}function fe(e,n){const{vectorFormat:a,language:r,instanceMode:o=!1}=n,s=r==="typescript",i=a==="Processing",c=o&&(a==="createVector"||a==="Vec"),t=e.map(f=>i?`	${f}();`:c?`	${f}(p);`:`	${f}();`).join(`
`);return i?`
void drawAllPaths() {
${t}
}`:`
function drawAllPaths(${c?s?"p: any":"p":""})${s?": void":""} {
${t}
}`}function J(e){const n=document.createElement("div");return n.textContent=e,n.innerHTML}function K(e){const n=[];let a=0;return e.forEach(r=>{if(r.type==="M"||r.type==="L"){const o=j(a);n.push({name:o,x:r.x,y:r.y}),a++}else if(r.type==="C"){const o=j(a-1),s=j(a),i=o+"c",c="c"+s;n.push({name:i,x:r.x1,y:r.y1}),n.push({name:c,x:r.x2,y:r.y2}),n.push({name:s,x:r.x,y:r.y}),a++}}),n}function ne(e){const n=e.map(c=>c.x),a=e.map(c=>c.y),r=Math.min(...n),o=Math.min(...a),s=Math.max(...n),i=Math.max(...a);return{minX:r,minY:o,maxX:s,maxY:i,width:s-r,height:i-o}}function _(e){if(e.length===0)return null;const n=e.reduce((a,r)=>({x:a.x+r.x,y:a.y+r.y}),{x:0,y:0});return{x:n.x/e.length,y:n.y/e.length}}function de(e){if(e.length<3)return _(e.map(([o,s])=>({x:o,y:s})));let n=0,a=0,r=0;for(let o=0;o<e.length;o++){const[s,i]=e[o],[c,t]=e[(o+1)%e.length],f=s*t-c*i;n+=f,a+=(s+c)*f,r+=(i+t)*f}return Math.abs(n)<1e-9?_(e.map(([o,s])=>({x:o,y:s}))):{x:a/(3*n),y:r/(3*n)}}function oe(e){if(!e)return null;if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?null:{x:(e.x1+e.x2)/2,y:(e.y1+e.y2)/2};if(e.kind==="polyline"){const n=e.points||[];return _(n.map(([a,r])=>({x:a,y:r})))}return e.kind==="polygon"?de(e.points||[]):e.kind==="rect"?e.x==null||e.y==null||e.width==null||e.height==null?null:{x:e.x+e.width/2,y:e.y+e.height/2}:e.kind==="circle"?e.cx==null||e.cy==null?null:{x:e.cx,y:e.cy}:e.kind==="ellipse"?e.cx==null||e.cy==null?null:{x:e.cx,y:e.cy}:null}function he(e){return e?e.kind==="line"?"midpoint":e.kind==="polyline"||e.kind==="polygon"?"centroid":"center":"reference"}function ge(e){if(!e)return[];if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?[]:[{point:{x:e.x1,y:e.y1},label:"start"},{point:{x:e.x2,y:e.y2},label:"end"}];const n=oe(e);return n?[{point:n,label:he(e)}]:[]}function ye(e,n,a){const r=G(e),o=K(r),s=ge(a?.primitive),i=!!a?.primitive;if(o.length===0)return;const c=ne(o);new window.p5(t=>{const L=c.width>0?440/c.width:1,M=c.height>0?440/c.height:1,g=Math.min(L,M),S=c.width*g,u=c.height*g,l=(500-S)/2-c.minX*g,x=(500-u)/2-c.minY*g;t.setup=()=>{t.createCanvas(500,500),t.noLoop()},t.draw=()=>{t.background(30);const h=(d,y)=>({x:d*g+l,y:y*g+x});t.stroke(60),t.strokeWeight(1);for(let d=0;d<=500;d+=50)t.line(d,0,d,500),t.line(0,d,500,d);const $=h(0,0);t.stroke(255,100,100),t.strokeWeight(2),t.line(0,$.y,500,$.y),t.stroke(100,255,100),t.strokeWeight(2),t.line($.x,0,$.x,500),t.noStroke(),t.fill(255,200,0),t.circle($.x,$.y,12),t.fill(255),t.textAlign(t.LEFT,t.BOTTOM),t.textSize(14),t.textStyle(t.BOLD),t.text("(0, 0)",$.x+8,$.y-8),t.fill(100,150,255,50),t.stroke(100,150,255),t.strokeWeight(2),t.beginShape(),r.forEach(d=>{if(d.type==="M"){const y=h(d.x,d.y);t.vertex(y.x,y.y)}else if(d.type==="L"){const y=h(d.x,d.y);t.vertex(y.x,y.y)}else if(d.type==="C"){const y=h(d.x1,d.y1),C=h(d.x2,d.y2),E=h(d.x,d.y);t.bezierVertex(y.x,y.y,C.x,C.y,E.x,E.y)}});const b=r.length>0&&r[r.length-1].type==="Z";if(t.endShape(b?t.CLOSE:t.OPEN),i&&s.length>0)s.forEach(({point:d,label:y})=>{const C=h(d.x,d.y);t.noStroke(),t.fill(255,220,120),t.circle(C.x,C.y,12),t.fill(255),t.textAlign(t.CENTER,t.CENTER),t.textSize(12),t.textStyle(t.BOLD),t.text(y,C.x,C.y-16),t.textSize(9),t.textStyle(t.NORMAL),t.fill(200),t.text(`(${d.x.toFixed(1)}, ${d.y.toFixed(1)})`,C.x,C.y+16)});else{t.stroke(255,200,100,100),t.strokeWeight(1);let d=0;r.forEach(y=>{if(y.type==="C"){const C=o.find(p=>p.name===String.fromCharCode(65+d-1)),E=o.find(p=>p.name===C?.name+"c"),w=o.find(p=>p.name==="c"+String.fromCharCode(65+d)),Y=o.find(p=>p.name===String.fromCharCode(65+d));if(C&&E){const p=h(C.x,C.y),A=h(E.x,E.y);t.line(p.x,p.y,A.x,A.y)}if(w&&Y){const p=h(w.x,w.y),A=h(Y.x,Y.y);t.line(p.x,p.y,A.x,A.y)}d++}else(y.type==="M"||y.type==="L")&&d++}),o.forEach(y=>{const C=h(y.x,y.y),E=y.name.includes("c");t.noStroke(),E?(t.fill(255,200,100),t.circle(C.x,C.y,8)):(t.fill(100,255,150),t.circle(C.x,C.y,10)),t.fill(255),t.noStroke(),t.textAlign(t.CENTER,t.CENTER),t.textSize(12),t.textStyle(t.BOLD);const w=15;t.text(y.name,C.x,C.y-w),t.textSize(9),t.textStyle(t.NORMAL),t.fill(200),t.text(`(${y.x.toFixed(1)}, ${y.y.toFixed(1)})`,C.x,C.y+w+3)})}t.fill(200),t.noStroke(),t.textAlign(t.LEFT,t.TOP),t.textSize(11),t.text(`Scale: ${g.toFixed(3)}x`,10,10),t.text(`Size: ${c.width.toFixed(1)} × ${c.height.toFixed(1)}`,10,25)}},n)}function xe(e,n,a,r=[]){const o=e.map((t,f)=>({id:n[f]??f+1,commands:G(t),primitive:r[f]?.primitive})).filter(t=>t.commands.length>0),s=o.flatMap(t=>K(t.commands));if(s.length===0)return;const i=ne(s),c=o.map(()=>{const t=80+Math.floor(Math.random()*176),f=80+Math.floor(Math.random()*176),m=80+Math.floor(Math.random()*176);return{stroke:[t,f,m]}});new window.p5(t=>{const L=i.width>0?440/i.width:1,M=i.height>0?440/i.height:1,g=Math.min(L,M),S=i.width*g,u=i.height*g,l=(500-S)/2-i.minX*g,x=(500-u)/2-i.minY*g,h=($,b)=>({x:$*g+l,y:b*g+x});t.setup=()=>{t.createCanvas(500,500),t.noLoop()},t.draw=()=>{t.background(30),t.stroke(60),t.strokeWeight(1);for(let b=0;b<=500;b+=50)t.line(b,0,b,500),t.line(0,b,500,b);const $=h(0,0);t.stroke(255,100,100),t.strokeWeight(2),t.line(0,$.y,500,$.y),t.stroke(100,255,100),t.strokeWeight(2),t.line($.x,0,$.x,500),t.noStroke(),t.fill(255,200,0),t.circle($.x,$.y,10),o.forEach((b,d)=>{const y=b.commands,C=c[d];t.noFill(),t.stroke(C.stroke[0],C.stroke[1],C.stroke[2]),t.strokeWeight(2),t.beginShape();let E=!1;if(y.forEach(w=>{if(w.type==="M"||w.type==="L"){const Y=h(w.x,w.y);t.vertex(Y.x,Y.y),E=!0}else if(w.type==="C"){const Y=h(w.x1,w.y1),p=h(w.x2,w.y2),A=h(w.x,w.y);t.bezierVertex(Y.x,Y.y,p.x,p.y,A.x,A.y),E=!0}}),E){const w=y.length>0&&y[y.length-1].type==="Z";t.endShape(w?t.CLOSE:t.OPEN)}else t.endShape(t.OPEN)}),t.noStroke(),t.fill(255),t.textAlign(t.CENTER,t.CENTER),t.textSize(11),t.textStyle(t.BOLD),o.forEach(b=>{const d=oe(b.primitive),y=_(K(b.commands).map(w=>({x:w.x,y:w.y}))),C=d??y;if(!C)return;const E=h(C.x,C.y);t.text(String(b.id),E.x,E.y)}),t.fill(200),t.noStroke(),t.textAlign(t.LEFT,t.TOP),t.textSize(11),t.text(`Paths: ${o.length}`,10,10),t.text(`Scale: ${g.toFixed(3)}x`,10,25),t.text(`Size: ${i.width.toFixed(1)} x ${i.height.toFixed(1)}`,10,40)}},a)}const U=.5522847498307936;function V(e,n=0){if(e==null)return n;const a=Number.parseFloat(e);return Number.isFinite(a)?a:n}function pe(e){if(!e)return[];const n=/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g,a=(e.match(n)||[]).map(Number),r=[];for(let o=0;o+1<a.length;o+=2)r.push([a[o],a[o+1]]);return r}function $e(e){const n=V(e.getAttribute("x1"),0),a=V(e.getAttribute("y1"),0),r=V(e.getAttribute("x2"),0),o=V(e.getAttribute("y2"),0);return{pathData:`M ${n} ${a} L ${r} ${o}`,sourceIndex:0,primitive:{kind:"line",x1:n,y1:a,x2:r,y2:o}}}function ee(e,n){const a=pe(e.getAttribute("points"));if(a.length<2)return null;const[r,o]=a[0],s=a.slice(1).map(([i,c])=>`L ${i} ${c}`).join(" ");return{pathData:`M ${r} ${o} ${s}${n?" Z":""}`,sourceIndex:0,primitive:{kind:n?"polygon":"polyline",points:a}}}function me(e,n,a,r,o,s){if(o===0||s===0)return`M ${e} ${n} L ${e+a} ${n} L ${e+a} ${n+r} L ${e} ${n+r} Z`;const i=o*U,c=s*U,t=e+a,f=n+r;return[`M ${e+o} ${n}`,`L ${t-o} ${n}`,`C ${t-o+i} ${n} ${t} ${n+s-c} ${t} ${n+s}`,`L ${t} ${f-s}`,`C ${t} ${f-s+c} ${t-o+i} ${f} ${t-o} ${f}`,`L ${e+o} ${f}`,`C ${e+o-i} ${f} ${e} ${f-s+c} ${e} ${f-s}`,`L ${e} ${n+s}`,`C ${e} ${n+s-c} ${e+o-i} ${n} ${e+o} ${n}`,"Z"].join(" ")}function Ce(e){const n=V(e.getAttribute("x"),0),a=V(e.getAttribute("y"),0),r=V(e.getAttribute("width"),0),o=V(e.getAttribute("height"),0);if(r<=0||o<=0)return null;const s=e.getAttribute("rx"),i=e.getAttribute("ry");let c=V(s,0),t=V(i,0);return s!=null&&i==null&&(t=c),i!=null&&s==null&&(c=t),c=Math.max(0,Math.min(c,r/2)),t=Math.max(0,Math.min(t,o/2)),{pathData:me(n,a,r,o,c,t),sourceIndex:0,primitive:{kind:"rect",x:n,y:a,width:r,height:o,rx:c,ry:t}}}function se(e,n,a,r){const o=a*U,s=r*U;return[`M ${e+a} ${n}`,`C ${e+a} ${n+s} ${e+o} ${n+r} ${e} ${n+r}`,`C ${e-o} ${n+r} ${e-a} ${n+s} ${e-a} ${n}`,`C ${e-a} ${n-s} ${e-o} ${n-r} ${e} ${n-r}`,`C ${e+o} ${n-r} ${e+a} ${n-s} ${e+a} ${n}`,"Z"].join(" ")}function ve(e){const n=V(e.getAttribute("cx"),0),a=V(e.getAttribute("cy"),0),r=V(e.getAttribute("r"),0);return r<=0?null:{pathData:se(n,a,r,r),sourceIndex:0,primitive:{kind:"circle",cx:n,cy:a,r}}}function be(e){const n=V(e.getAttribute("cx"),0),a=V(e.getAttribute("cy"),0),r=V(e.getAttribute("rx"),0),o=V(e.getAttribute("ry"),0);return r<=0||o<=0?null:{pathData:se(n,a,r,o),sourceIndex:0,primitive:{kind:"ellipse",cx:n,cy:a,rx:r,ry:o}}}function Se(e){const a=Array.from(e.querySelectorAll("path,rect,circle,ellipse,line,polyline,polygon")),r=[];return a.forEach((o,s)=>{const i=s+1,c=o.tagName.toLowerCase();if(c==="path"){const f=o.getAttribute("d");f&&r.push({pathData:f,sourceIndex:i});return}let t=null;c==="line"?t=$e(o):c==="polyline"?t=ee(o,!1):c==="polygon"?t=ee(o,!0):c==="rect"?t=Ce(o):c==="circle"?t=ve(o):c==="ellipse"&&(t=be(o)),t&&(t.sourceIndex=i,r.push(t))}),r}const R=document.getElementById("dropZone"),re=document.getElementById("fileInput"),W=document.getElementById("output");let q=null,H=null;function we(e){const n=e.replace(/[^a-zA-Z0-9_]/g,"_");return n.length===0?"shape":/^[a-zA-Z_]/.test(n)?n:`shape_${n}`}R.addEventListener("click",()=>re.click());document.querySelectorAll('input[name="vectorFormat"]').forEach(e=>{e.addEventListener("change",n=>{const a=n.target,r=document.getElementById("processingVectorOption"),o=document.getElementById("instanceModeOption");r&&(r.style.display=a.value==="Processing"?"flex":"none"),o&&(o.style.display=a.value==="Processing"?"none":"flex"),q&&Z(q)})});document.querySelectorAll('input[name="language"], input[name="processingVector"], input[name="sortMode"], #instanceMode').forEach(e=>{e.addEventListener("change",()=>{q&&Z(q)})});document.querySelectorAll("#coordMultiplier, #precision").forEach(e=>{e.addEventListener("change",()=>{q&&Z(q)})});R.addEventListener("dragover",e=>{e.preventDefault(),R.classList.add("dragover")});R.addEventListener("dragleave",()=>{R.classList.remove("dragover")});R.addEventListener("drop",e=>{e.preventDefault(),R.classList.remove("dragover");const n=e.dataTransfer?.files[0];n&&n.type==="image/svg+xml"?Z(n):alert("Please drop a valid SVG file")});re.addEventListener("change",e=>{const n=e.target.files?.[0];n&&Z(n)});function Z(e){q=e;const n=new FileReader;n.onload=a=>{H&&(H(),H=null);const r=a.target?.result,s=new DOMParser().parseFromString(r,"image/svg+xml"),i=Se(s);if(i.length===0){W.innerHTML='<div class="output"><p>No supported drawable elements found (path, line, polyline, polygon, rect, circle, ellipse).</p></div>';return}const c=document.querySelector('input[name="vectorFormat"]:checked')?.value||"Vec",t=document.querySelector('input[name="language"]:checked')?.value||"javascript",f=parseFloat(document.getElementById("coordMultiplier")?.value)||1,m=parseInt(document.getElementById("precision")?.value)||5,v=document.querySelector('input[name="processingVector"]:checked')?.value||"PVector",L=document.getElementById("instanceMode")?.checked||!1,M=document.querySelector('input[name="sortMode"]:checked')?.value||"primitive",g={vectorFormat:c,language:t,coordMultiplier:f,precision:m,processingVector:v,instanceMode:L},S=new Map;i.forEach((k,P)=>{const T=P+1,z=`${k.primitive?.kind??"path"}${T}`;S.set(k,{id:T,name:z,functionName:we(z)})});const u=[...i].sort((k,P)=>{if(M==="svg")return k.sourceIndex-P.sourceIndex;const T=k.primitive?.kind??"path",D=P.primitive?.kind??"path";return T===D?k.sourceIndex-P.sourceIndex:T.localeCompare(D)});let l="",x="";const h=[],$=[],b=[],d=[],y=[];u.forEach((k,P)=>{const T=S.get(k);if(!T)return;h.push(k.pathData),$.push(T.id);const D=T.name,z=T.functionName;y.push(D),d.push(z);const B=ue(k.pathData,g,P,k,z);P===0&&(l=B.sharedCode),b.push(B.pathCode);const ae=`preview-${P}`;x+=`
          <div class="output path-section" id="shape-section-${P}">
            <div class="path-header">
              <h2>${D} (svg #${k.sourceIndex})</h2>
              <button class="copy-btn" data-path="${P}">Copy Code</button>
            </div>
            <div class="content-grid">
              <div class="preview-container">
                <div id="${ae}"></div>
              </div>
              <div class="code-container">
                <pre><code>${J(B.pathCode)}</code></pre>
              </div>
            </div>
          </div>
        `});const C=fe(d,g),E=l+C,Y=`draw-paths.${c==="Processing"?"pde":t==="typescript"?"ts":"js"}`,p=`${E}

${b.join(`

`)}`,A=`
      <div class="command-section">
        <div class="command-header">
          <h2>Download Complete File</h2>
          <button class="download-btn" data-filename="${Y}">Download ${Y}</button>
        </div>
        <div class="command-content">
          <p style="margin: 0; padding: 15px; color: #9cdcfe;">Click the button above to download a file containing all the shared code and shape functions.</p>
        </div>
      </div>
    `,X=`
      <div class="shared-code-section">
        <div class="shared-code-header">
          <h2>Shared Code</h2>
          <button class="copy-btn" data-shared="true">Copy Shared Code</button>
        </div>
        <div class="shared-code-content">
          <pre><code>${J(E)}</code></pre>
        </div>
      </div>
    `,N=`
      <div class="combined-preview-section output">
        <div class="combined-preview-header">
          <h2>All paths</h2>
        </div>
        <div class="preview-container">
          <div id="preview-all"></div>
        </div>
      </div>
    `,I=`
      <div class="shape-nav">
        <h3>Shapes</h3>
        <ul class="shape-nav-list">
          ${y.map((k,P)=>`
            <li>
              <button class="shape-nav-link" data-target="shape-section-${P}">${k}</button>
            </li>
          `).join("")}
        </ul>
      </div>
    `;W.innerHTML=I+A+X+N+x;const O=W.querySelector(".download-btn");O&&O.addEventListener("click",()=>{const k=new Blob([p],{type:"text/plain"}),P=URL.createObjectURL(k),T=document.createElement("a");T.href=P,T.download=Y,T.click(),URL.revokeObjectURL(P);const D=O.textContent;O.textContent="Downloaded!",setTimeout(()=>{O.textContent=D},2e3)}),xe(h,$,"preview-all",u),h.forEach((k,P)=>{ye(k,`preview-${P}`,u[P])}),H=Pe(),W.querySelectorAll(".copy-btn").forEach(k=>{k.addEventListener("click",P=>{const T=P.target,D=T.dataset.shared==="true";let z="";D?z=T.closest(".shared-code-section")?.querySelector("code")?.textContent||"":z=T.closest(".path-section")?.querySelector("code")?.textContent||"",navigator.clipboard.writeText(z).then(()=>{const B=T.textContent;T.textContent="Copied!",setTimeout(()=>{T.textContent=B},2e3)})})})},n.readAsText(e)}function Pe(){const e=Array.from(W.querySelectorAll(".shape-nav-link"));if(e.length===0)return()=>{};const n=e.map(c=>{const t=c.dataset.target;return t?document.getElementById(t):null}).filter(c=>c!==null);if(n.length===0)return()=>{};const a=c=>{e.forEach(t=>{t.classList.toggle("is-active",t.dataset.target===c.id)})},r=()=>{const c=window.innerHeight/2;let t=n[0],f=Number.POSITIVE_INFINITY;n.forEach(m=>{const v=m.getBoundingClientRect(),L=v.top+v.height/2,M=Math.abs(L-c);M<f&&(f=M,t=m)}),a(t)},o=c=>{const f=c.currentTarget.dataset.target;if(!f)return;const m=document.getElementById(f);m&&m.scrollIntoView({behavior:"smooth",block:"center"})};e.forEach(c=>{c.addEventListener("click",o)});let s=!1;const i=()=>{s||(s=!0,window.requestAnimationFrame(()=>{s=!1,r()}))};return window.addEventListener("scroll",i,{passive:!0}),window.addEventListener("resize",i),r(),()=>{e.forEach(c=>{c.removeEventListener("click",o)}),window.removeEventListener("scroll",i),window.removeEventListener("resize",i)}}
