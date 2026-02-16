(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))c(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&c(u)}).observe(document,{childList:!0,subtree:!0});function a(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(r){if(r.ep)return;r.ep=!0;const s=a(r);fetch(r.href,s)}})();function Q(e){const t=[],a=/([MLHVCSQTAZmlhvcsqtaz])\s*([^MLHVCSQTAZmlhvcsqtaz]*)/g;let c,r=0,s=0,u=0,i=0,n="",o=null,p=null;const b=()=>{o=null,p=null},A=M=>{const y=/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g;return(M.match(y)||[]).map(Number)};for(;(c=a.exec(e))!==null;){const M=c[1],y=M===M.toLowerCase(),v=M.toUpperCase(),f=A(c[2]);if(v==="M"){for(let l=0;l+1<f.length;l+=2){const g=y?r+f[l]:f[l],$=y?s+f[l+1]:f[l+1];l===0?(t.push({type:"M",x:g,y:$}),u=g,i=$):t.push({type:"L",x:g,y:$}),r=g,s=$}b(),n=f.length>2?"L":"M"}else if(v==="L"){for(let l=0;l+1<f.length;l+=2){const g=y?r+f[l]:f[l],$=y?s+f[l+1]:f[l+1];t.push({type:"L",x:g,y:$}),r=g,s=$}b(),n="L"}else if(v==="H"){for(let l=0;l<f.length;l++){const g=y?r+f[l]:f[l];t.push({type:"L",x:g,y:s}),r=g}b(),n="L"}else if(v==="V"){for(let l=0;l<f.length;l++){const g=y?s+f[l]:f[l];t.push({type:"L",x:r,y:g}),s=g}b(),n="L"}else if(v==="C")for(let l=0;l+5<f.length;l+=6){const g=y?r+f[l]:f[l],$=y?s+f[l+1]:f[l+1],h=y?r+f[l+2]:f[l+2],x=y?s+f[l+3]:f[l+3],L=y?r+f[l+4]:f[l+4],d=y?s+f[l+5]:f[l+5];t.push({type:"C",x1:g,y1:$,x2:h,y2:x,x:L,y:d}),r=L,s=d,o=h,p=x,n="C"}else if(v==="S")for(let l=0;l+3<f.length;l+=4){let g=r,$=s;(n==="C"||n==="S")&&o!==null&&p!==null&&(g=r*2-o,$=s*2-p);const h=y?r+f[l]:f[l],x=y?s+f[l+1]:f[l+1],L=y?r+f[l+2]:f[l+2],d=y?s+f[l+3]:f[l+3];t.push({type:"C",x1:g,y1:$,x2:h,y2:x,x:L,y:d}),r=L,s=d,o=h,p=x,n="S"}else v==="Z"?(t.push({type:"Z"}),r=u,s=i,b(),n="Z"):(b(),n=v)}return t}function j(e){let t="",a=e;for(;a>=0;)t=String.fromCharCode(65+a%26)+t,a=Math.floor(a/26)-1;return t}function F(e,t,a){const c=(e*t).toFixed(a);return parseFloat(c).toString()}function le(e){const{vectorFormat:t,language:a,processingVector:c="PVector",instanceMode:r=!1}=e,s=a==="typescript",u=t==="Processing",i=u&&c==="Vec2D",n=r&&t==="createVector";if(u){const A=i?"Vec2D":"PVector";return`${i?`import toxi.geom.*;

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

${A} applyTransform(${A} v) {
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

	return new ${A}(x, y);
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
}`;const o=n?"p.createVector":"createVector",p=s?"p5.Vector":"",b=n?s?"p: any":"p":"";return`// Transform configuration
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

function applyTransform(${b?b+", ":""}v${s?`: ${p}`:""})${s?`: ${p}`:""} {
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

	return ${o}(x, y);
}

function applyTransformScalar(value${s?": number":""}, axis${s?": 'x' | 'y' | 'avg'":""} = 'avg')${s?": number":""} {
	if (axis === 'x') {
		return value * transformConfig.scaleX;
	}
	if (axis === 'y') {
		return value * transformConfig.scaleY;
	}
	return value * ((Math.abs(transformConfig.scaleX) + Math.abs(transformConfig.scaleY)) * 0.5);
}`}function ie(e,t){const{vectorFormat:a,language:c,instanceMode:r=!1}=t,s=c==="typescript",u=a==="Processing",i=r&&(a==="createVector"||a==="Vec");return u?`void ${e}() {`:`function ${e}(${i?s?"p: any":"p":""})${s?": void":""} {`}function ne(e){const{vectorFormat:t,instanceMode:a=!1}=e;return a&&(t==="createVector"||t==="Vec")?"p.":""}function ue(e,t,a,c,r,s,u){const i=t.vectorFormat==="Processing",n=ne(t),o=l=>F(l,a,c),p=[],b=[],A="'x'",M="'y'",y=i?"'a'":"'avg'",v=(l,g,$)=>{const h=`${u}${s}(${o(g)}, ${o($)}))`;i?p.push(`${r} ${l} = ${h};`):p.push(`const ${l} = ${h};`)},f=(l,g,$)=>{const h=`applyTransformScalar(${o(g)}, ${$})`;i?p.push(`float ${l} = ${h};`):p.push(`const ${l} = ${h};`)};if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?null:(v("p1",e.x1,e.y1),v("p2",e.x2,e.y2),b.push(`${n}line(p1.x, p1.y, p2.x, p2.y);`),{declarations:p,drawCalls:b});if(e.kind==="polyline"||e.kind==="polygon"){const l=e.points||[];return l.length<2?null:(l.forEach(([g,$],h)=>{v(`p${h}`,g,$)}),b.push(`${n}beginShape();`),l.forEach((g,$)=>{b.push(`${n}vertex(p${$}.x, p${$}.y);`)}),b.push(`${n}endShape(${e.kind==="polygon"?"CLOSE":"OPEN"});`),{declarations:p,drawCalls:b})}if(e.kind==="rect"){if(e.x==null||e.y==null||e.width==null||e.height==null)return null;v("rectPos",e.x,e.y),f("rectW",e.width,A),f("rectH",e.height,M);const l=e.rx||0,g=e.ry||0;if(l>0||g>0){if(Math.abs(l-g)>1e-9)return null;f("rectR",l,y),b.push(`${n}rect(rectPos.x, rectPos.y, rectW, rectH, rectR);`)}else b.push(`${n}rect(rectPos.x, rectPos.y, rectW, rectH);`);return{declarations:p,drawCalls:b}}return e.kind==="circle"?e.cx==null||e.cy==null||e.r==null?null:(v("circleCenter",e.cx,e.cy),f("circleDiameter",e.r*2,y),b.push(`${n}circle(circleCenter.x, circleCenter.y, circleDiameter);`),{declarations:p,drawCalls:b}):e.kind==="ellipse"?e.cx==null||e.cy==null||e.rx==null||e.ry==null?null:(v("ellipseCenter",e.cx,e.cy),f("ellipseW",e.rx*2,A),f("ellipseH",e.ry*2,M),b.push(`${n}ellipse(ellipseCenter.x, ellipseCenter.y, ellipseW, ellipseH);`),{declarations:p,drawCalls:b}):null}function fe(e,t,a,c,r){const{vectorFormat:s,coordMultiplier:u,precision:i,processingVector:n="PVector",instanceMode:o=!1}=t,p=s==="Processing",b=p&&n==="Vec2D",A=o&&(s==="createVector"||s==="Vec"),M=r||`drawPath${a+1}`,y=p?b?"new Vec2D":"new PVector":s==="Vec"?"new Vec":o&&s==="createVector"?"p.createVector":"createVector",v=[],f=[],l=p?b?"Vec2D":"PVector":"const",g=A&&s==="createVector"?"applyTransform(p, ":"applyTransform(",$=le(t),h=ie(M,t),x=ne(t);if(c?.primitive){const w=ue(c.primitive,t,u,i,l,y,g);if(w){const P=w.declarations.length>0?`${w.declarations.map(N=>`	${N}`).join(`
`)}

`:"",Y=w.drawCalls.map(N=>`	${N}`).join(`
`),I=`${h}
${P}${Y}
}`;return{sharedCode:$,pathCode:I}}}const L=Q(e);let d=0;const m=L.length>0&&L[L.length-1].type==="Z";L.forEach(w=>{if(w.type==="M"||w.type==="L"){const P=j(d),Y=F(w.x,u,i),I=F(w.y,u,i);v.push(`${P} = ${g}${y}(${Y}, ${I}))`),f.push(`${x}vertex(${P}.x, ${P}.y);`),d++}else if(w.type==="C"){const P=j(d-1),Y=j(d),I=P+"c",N="c"+Y,K=F(w.x1,u,i),O=F(w.y1,u,i),J=F(w.x2,u,i),k=F(w.y2,u,i),T=F(w.x,u,i),E=F(w.y,u,i);v.push(`${I} = ${g}${y}(${K}, ${O}))`),v.push(`${N} = ${g}${y}(${J}, ${k}))`),v.push(`${Y} = ${g}${y}(${T}, ${E}))`),f.push(`${x}bezierVertex(${I}.x, ${I}.y, ${N}.x, ${N}.y, ${Y}.x, ${Y}.y);`),d++}});let C,S;p?(C=`	${l} ${v.join(`,
		`)};`,S=f.map(w=>`	${w}`).join(`
`)):(C=`	${l} ${v.join(`,
		`)};`,S=f.map(w=>`	${w}`).join(`
`));const D=`${h}
${C}

	${x}beginShape();
${S}
	${x}endShape(${m?"CLOSE":"OPEN"});
}`;return{sharedCode:$,pathCode:D}}function de(e,t){const{vectorFormat:a,language:c,instanceMode:r=!1}=t,s=c==="typescript",u=a==="Processing",i=r&&(a==="createVector"||a==="Vec"),n=e.map(o=>u?`	${o}();`:i?`	${o}(p);`:`	${o}();`).join(`
`);return u?`
void drawAllPaths() {
${n}
}`:`
function drawAllPaths(${i?s?"p: any":"p":""})${s?": void":""} {
${n}
}`}function ee(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function G(e){const t=[];let a=0;return e.forEach(c=>{if(c.type==="M"||c.type==="L"){const r=j(a);t.push({name:r,x:c.x,y:c.y}),a++}else if(c.type==="C"){const r=j(a-1),s=j(a),u=r+"c",i="c"+s;t.push({name:u,x:c.x1,y:c.y1}),t.push({name:i,x:c.x2,y:c.y2}),t.push({name:s,x:c.x,y:c.y}),a++}}),t}function oe(e){const t=e.map(i=>i.x),a=e.map(i=>i.y),c=Math.min(...t),r=Math.min(...a),s=Math.max(...t),u=Math.max(...a);return{minX:c,minY:r,maxX:s,maxY:u,width:s-c,height:u-r}}function _(e){if(e.length===0)return null;const t=e.reduce((a,c)=>({x:a.x+c.x,y:a.y+c.y}),{x:0,y:0});return{x:t.x/e.length,y:t.y/e.length}}function he(e){if(e.length<3)return _(e.map(([r,s])=>({x:r,y:s})));let t=0,a=0,c=0;for(let r=0;r<e.length;r++){const[s,u]=e[r],[i,n]=e[(r+1)%e.length],o=s*n-i*u;t+=o,a+=(s+i)*o,c+=(u+n)*o}return Math.abs(t)<1e-9?_(e.map(([r,s])=>({x:r,y:s}))):{x:a/(3*t),y:c/(3*t)}}function se(e){if(!e)return null;if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?null:{x:(e.x1+e.x2)/2,y:(e.y1+e.y2)/2};if(e.kind==="polyline"){const t=e.points||[];return _(t.map(([a,c])=>({x:a,y:c})))}return e.kind==="polygon"?he(e.points||[]):e.kind==="rect"?e.x==null||e.y==null||e.width==null||e.height==null?null:{x:e.x+e.width/2,y:e.y+e.height/2}:e.kind==="circle"?e.cx==null||e.cy==null?null:{x:e.cx,y:e.cy}:e.kind==="ellipse"?e.cx==null||e.cy==null?null:{x:e.cx,y:e.cy}:null}function ge(e){return e?e.kind==="line"?"midpoint":e.kind==="polyline"||e.kind==="polygon"?"centroid":"center":"reference"}function ye(e){if(!e)return[];if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?[]:[{point:{x:e.x1,y:e.y1},label:"start"},{point:{x:e.x2,y:e.y2},label:"end"}];const t=se(e);return t?[{point:t,label:ge(e)}]:[]}function xe(e,t,a,c=!0){const r=Q(e),s=G(r),u=ye(a?.primitive),i=!!a?.primitive;if(s.length===0)return;const n=oe(s);new window.p5(o=>{const M=n.width>0?440/n.width:1,y=n.height>0?440/n.height:1,v=Math.min(M,y),f=n.width*v,l=n.height*v,g=(500-f)/2-n.minX*v,$=(500-l)/2-n.minY*v;o.setup=()=>{o.createCanvas(500,500),o.noLoop()},o.draw=()=>{o.background(30);const h=(d,m)=>({x:d*v+g,y:m*v+$});o.stroke(60),o.strokeWeight(1);for(let d=0;d<=500;d+=50)o.line(d,0,d,500),o.line(0,d,500,d);const x=h(0,0);o.stroke(255,100,100),o.strokeWeight(2),o.line(0,x.y,500,x.y),o.stroke(100,255,100),o.strokeWeight(2),o.line(x.x,0,x.x,500),o.noStroke(),o.fill(255,200,0),o.circle(x.x,x.y,12),o.fill(255),o.textAlign(o.LEFT,o.BOTTOM),o.textSize(14),o.textStyle(o.BOLD),o.text("(0, 0)",x.x+8,x.y-8),o.fill(100,150,255,50),o.stroke(100,150,255),o.strokeWeight(2),o.beginShape(),r.forEach(d=>{if(d.type==="M"){const m=h(d.x,d.y);o.vertex(m.x,m.y)}else if(d.type==="L"){const m=h(d.x,d.y);o.vertex(m.x,m.y)}else if(d.type==="C"){const m=h(d.x1,d.y1),C=h(d.x2,d.y2),S=h(d.x,d.y);o.bezierVertex(m.x,m.y,C.x,C.y,S.x,S.y)}});const L=r.length>0&&r[r.length-1].type==="Z";if(o.endShape(L?o.CLOSE:o.OPEN),i&&u.length>0)u.forEach(({point:d,label:m})=>{const C=h(d.x,d.y);o.noStroke(),o.fill(255,220,120),o.circle(C.x,C.y,12),o.fill(255),o.textAlign(o.CENTER,o.CENTER),o.textSize(12),o.textStyle(o.BOLD),o.text(m,C.x,C.y-16),c&&(o.textSize(9),o.textStyle(o.NORMAL),o.fill(200),o.text(`(${d.x.toFixed(1)}, ${d.y.toFixed(1)})`,C.x,C.y+16))});else{o.stroke(255,200,100,100),o.strokeWeight(1);let d=0;r.forEach(m=>{if(m.type==="C"){const C=s.find(P=>P.name===String.fromCharCode(65+d-1)),S=s.find(P=>P.name===C?.name+"c"),D=s.find(P=>P.name==="c"+String.fromCharCode(65+d)),w=s.find(P=>P.name===String.fromCharCode(65+d));if(C&&S){const P=h(C.x,C.y),Y=h(S.x,S.y);o.line(P.x,P.y,Y.x,Y.y)}if(D&&w){const P=h(D.x,D.y),Y=h(w.x,w.y);o.line(P.x,P.y,Y.x,Y.y)}d++}else(m.type==="M"||m.type==="L")&&d++}),s.forEach(m=>{const C=h(m.x,m.y),S=m.name.includes("c");o.noStroke(),S?(o.fill(255,200,100),o.circle(C.x,C.y,8)):(o.fill(100,255,150),o.circle(C.x,C.y,10)),o.fill(255),o.noStroke(),o.textAlign(o.CENTER,o.CENTER),o.textSize(12),o.textStyle(o.BOLD);const D=15;o.text(m.name,C.x,C.y-D),c&&(o.textSize(9),o.textStyle(o.NORMAL),o.fill(200),o.text(`(${m.x.toFixed(1)}, ${m.y.toFixed(1)})`,C.x,C.y+D+3))})}o.fill(200),o.noStroke(),o.textAlign(o.LEFT,o.TOP),o.textSize(11),o.text(`Scale: ${v.toFixed(3)}x`,10,10),o.text(`Size: ${n.width.toFixed(1)} × ${n.height.toFixed(1)}`,10,25)}},t)}function pe(e,t,a,c=[]){const r=e.map((n,o)=>({id:t[o]??o+1,commands:Q(n),primitive:c[o]?.primitive})).filter(n=>n.commands.length>0),s=r.flatMap(n=>G(n.commands));if(s.length===0)return;const u=oe(s),i=r.map(()=>{const n=80+Math.floor(Math.random()*176),o=80+Math.floor(Math.random()*176),p=80+Math.floor(Math.random()*176);return{stroke:[n,o,p]}});new window.p5(n=>{const A=u.width>0?440/u.width:1,M=u.height>0?440/u.height:1,y=Math.min(A,M),v=u.width*y,f=u.height*y,l=(500-v)/2-u.minX*y,g=(500-f)/2-u.minY*y,$=(h,x)=>({x:h*y+l,y:x*y+g});n.setup=()=>{n.createCanvas(500,500),n.noLoop()},n.draw=()=>{n.background(30),n.stroke(60),n.strokeWeight(1);for(let x=0;x<=500;x+=50)n.line(x,0,x,500),n.line(0,x,500,x);const h=$(0,0);n.stroke(255,100,100),n.strokeWeight(2),n.line(0,h.y,500,h.y),n.stroke(100,255,100),n.strokeWeight(2),n.line(h.x,0,h.x,500),n.noStroke(),n.fill(255,200,0),n.circle(h.x,h.y,10),r.forEach((x,L)=>{const d=x.commands,m=i[L];n.noFill(),n.stroke(m.stroke[0],m.stroke[1],m.stroke[2]),n.strokeWeight(2),n.beginShape();let C=!1;if(d.forEach(S=>{if(S.type==="M"||S.type==="L"){const D=$(S.x,S.y);n.vertex(D.x,D.y),C=!0}else if(S.type==="C"){const D=$(S.x1,S.y1),w=$(S.x2,S.y2),P=$(S.x,S.y);n.bezierVertex(D.x,D.y,w.x,w.y,P.x,P.y),C=!0}}),C){const S=d.length>0&&d[d.length-1].type==="Z";n.endShape(S?n.CLOSE:n.OPEN)}else n.endShape(n.OPEN)}),n.noStroke(),n.fill(255),n.textAlign(n.CENTER,n.CENTER),n.textSize(11),n.textStyle(n.BOLD),r.forEach(x=>{const L=se(x.primitive),d=_(G(x.commands).map(S=>({x:S.x,y:S.y}))),m=L??d;if(!m)return;const C=$(m.x,m.y);n.text(String(x.id),C.x,C.y)}),n.fill(200),n.noStroke(),n.textAlign(n.LEFT,n.TOP),n.textSize(11),n.text(`Paths: ${r.length}`,10,10),n.text(`Scale: ${y.toFixed(3)}x`,10,25),n.text(`Size: ${u.width.toFixed(1)} x ${u.height.toFixed(1)}`,10,40)}},a)}const U=.5522847498307936;function V(e,t=0){if(e==null)return t;const a=Number.parseFloat(e);return Number.isFinite(a)?a:t}function $e(e){if(!e)return[];const t=/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g,a=(e.match(t)||[]).map(Number),c=[];for(let r=0;r+1<a.length;r+=2)c.push([a[r],a[r+1]]);return c}function me(e){const t=V(e.getAttribute("x1"),0),a=V(e.getAttribute("y1"),0),c=V(e.getAttribute("x2"),0),r=V(e.getAttribute("y2"),0);return{pathData:`M ${t} ${a} L ${c} ${r}`,sourceIndex:0,primitive:{kind:"line",x1:t,y1:a,x2:c,y2:r}}}function te(e,t){const a=$e(e.getAttribute("points"));if(a.length<2)return null;const[c,r]=a[0],s=a.slice(1).map(([u,i])=>`L ${u} ${i}`).join(" ");return{pathData:`M ${c} ${r} ${s}${t?" Z":""}`,sourceIndex:0,primitive:{kind:t?"polygon":"polyline",points:a}}}function Ce(e,t,a,c,r,s){if(r===0||s===0)return`M ${e} ${t} L ${e+a} ${t} L ${e+a} ${t+c} L ${e} ${t+c} Z`;const u=r*U,i=s*U,n=e+a,o=t+c;return[`M ${e+r} ${t}`,`L ${n-r} ${t}`,`C ${n-r+u} ${t} ${n} ${t+s-i} ${n} ${t+s}`,`L ${n} ${o-s}`,`C ${n} ${o-s+i} ${n-r+u} ${o} ${n-r} ${o}`,`L ${e+r} ${o}`,`C ${e+r-u} ${o} ${e} ${o-s+i} ${e} ${o-s}`,`L ${e} ${t+s}`,`C ${e} ${t+s-i} ${e+r-u} ${t} ${e+r} ${t}`,"Z"].join(" ")}function ve(e){const t=V(e.getAttribute("x"),0),a=V(e.getAttribute("y"),0),c=V(e.getAttribute("width"),0),r=V(e.getAttribute("height"),0);if(c<=0||r<=0)return null;const s=e.getAttribute("rx"),u=e.getAttribute("ry");let i=V(s,0),n=V(u,0);return s!=null&&u==null&&(n=i),u!=null&&s==null&&(i=n),i=Math.max(0,Math.min(i,c/2)),n=Math.max(0,Math.min(n,r/2)),{pathData:Ce(t,a,c,r,i,n),sourceIndex:0,primitive:{kind:"rect",x:t,y:a,width:c,height:r,rx:i,ry:n}}}function re(e,t,a,c){const r=a*U,s=c*U;return[`M ${e+a} ${t}`,`C ${e+a} ${t+s} ${e+r} ${t+c} ${e} ${t+c}`,`C ${e-r} ${t+c} ${e-a} ${t+s} ${e-a} ${t}`,`C ${e-a} ${t-s} ${e-r} ${t-c} ${e} ${t-c}`,`C ${e+r} ${t-c} ${e+a} ${t-s} ${e+a} ${t}`,"Z"].join(" ")}function be(e){const t=V(e.getAttribute("cx"),0),a=V(e.getAttribute("cy"),0),c=V(e.getAttribute("r"),0);return c<=0?null:{pathData:re(t,a,c,c),sourceIndex:0,primitive:{kind:"circle",cx:t,cy:a,r:c}}}function Se(e){const t=V(e.getAttribute("cx"),0),a=V(e.getAttribute("cy"),0),c=V(e.getAttribute("rx"),0),r=V(e.getAttribute("ry"),0);return c<=0||r<=0?null:{pathData:re(t,a,c,r),sourceIndex:0,primitive:{kind:"ellipse",cx:t,cy:a,rx:c,ry:r}}}function we(e){const a=Array.from(e.querySelectorAll("path,rect,circle,ellipse,line,polyline,polygon")),c=[];return a.forEach((r,s)=>{const u=s+1,i=r.tagName.toLowerCase();if(i==="path"){const o=r.getAttribute("d");o&&c.push({pathData:o,sourceIndex:u});return}let n=null;i==="line"?n=me(r):i==="polyline"?n=te(r,!1):i==="polygon"?n=te(r,!0):i==="rect"?n=ve(r):i==="circle"?n=be(r):i==="ellipse"&&(n=Se(r)),n&&(n.sourceIndex=u,c.push(n))}),c}const R=document.getElementById("dropZone"),ae=document.getElementById("fileInput"),W=document.getElementById("output");let q=null,H=null;function Pe(e){const t=e.replace(/[^a-zA-Z0-9_]/g,"_");return t.length===0?"shape":/^[a-zA-Z_]/.test(t)?t:`shape_${t}`}R.addEventListener("click",()=>ae.click());document.querySelectorAll('input[name="vectorFormat"]').forEach(e=>{e.addEventListener("change",t=>{const a=t.target,c=document.getElementById("processingVectorOption"),r=document.getElementById("instanceModeOption");c&&(c.style.display=a.value==="Processing"?"flex":"none"),r&&(r.style.display=a.value==="Processing"?"none":"flex"),q&&Z(q)})});document.querySelectorAll('input[name="language"], input[name="processingVector"], input[name="sortMode"], #instanceMode, #showCoordinates').forEach(e=>{e.addEventListener("change",()=>{q&&Z(q)})});document.querySelectorAll("#coordMultiplier, #precision").forEach(e=>{e.addEventListener("change",()=>{q&&Z(q)})});R.addEventListener("dragover",e=>{e.preventDefault(),R.classList.add("dragover")});R.addEventListener("dragleave",()=>{R.classList.remove("dragover")});R.addEventListener("drop",e=>{e.preventDefault(),R.classList.remove("dragover");const t=e.dataTransfer?.files[0];t&&t.type==="image/svg+xml"?Z(t):alert("Please drop a valid SVG file")});ae.addEventListener("change",e=>{const t=e.target.files?.[0];t&&Z(t)});function Z(e){q=e;const t=new FileReader;t.onload=a=>{H&&(H(),H=null);const c=a.target?.result,s=new DOMParser().parseFromString(c,"image/svg+xml"),u=we(s);if(u.length===0){W.innerHTML='<div class="output"><p>No supported drawable elements found (path, line, polyline, polygon, rect, circle, ellipse).</p></div>';return}const i=document.querySelector('input[name="vectorFormat"]:checked')?.value||"Vec",n=document.querySelector('input[name="language"]:checked')?.value||"javascript",o=parseFloat(document.getElementById("coordMultiplier")?.value)||1,p=parseInt(document.getElementById("precision")?.value)||5,b=document.querySelector('input[name="processingVector"]:checked')?.value||"PVector",A=document.getElementById("instanceMode")?.checked||!1,M=document.getElementById("showCoordinates")?.checked??!0,y=document.querySelector('input[name="sortMode"]:checked')?.value||"primitive",v={vectorFormat:i,language:n,coordMultiplier:o,precision:p,processingVector:b,instanceMode:A},f=new Map;u.forEach((k,T)=>{const E=T+1,z=`${k.primitive?.kind??"path"}${E}`;f.set(k,{id:E,name:z,functionName:Pe(z)})});const l=[...u].sort((k,T)=>{if(y==="svg")return k.sourceIndex-T.sourceIndex;const E=k.primitive?.kind??"path",X=T.primitive?.kind??"path";return E===X?k.sourceIndex-T.sourceIndex:E.localeCompare(X)});let g="",$="";const h=[],x=[],L=[],d=[],m=[];l.forEach((k,T)=>{const E=f.get(k);if(!E)return;h.push(k.pathData),x.push(E.id);const X=E.name,z=E.functionName;m.push(X),d.push(z);const B=fe(k.pathData,v,T,k,z);T===0&&(g=B.sharedCode),L.push(B.pathCode);const ce=`preview-${T}`;$+=`
          <div class="output path-section" id="shape-section-${T}">
            <div class="path-header">
              <h2>${X} (svg #${k.sourceIndex})</h2>
              <button class="copy-btn" data-path="${T}">Copy Code</button>
            </div>
            <div class="content-grid">
              <div class="preview-container">
                <div id="${ce}"></div>
              </div>
              <div class="code-container">
                <pre><code>${ee(B.pathCode)}</code></pre>
              </div>
            </div>
          </div>
        `});const C=de(d,v),S=g+C,w=`draw-paths.${i==="Processing"?"pde":n==="typescript"?"ts":"js"}`,P=`${S}

${L.join(`

`)}`,Y=`
      <div class="command-section">
        <div class="command-header">
          <h2>Download Complete File</h2>
          <button class="download-btn" data-filename="${w}">Download ${w}</button>
        </div>
        <div class="command-content">
          <p style="margin: 0; padding: 15px; color: #9cdcfe;">Click the button above to download a file containing all the shared code and shape functions.</p>
        </div>
      </div>
    `,I=`
      <div class="shared-code-section">
        <div class="shared-code-header">
          <h2>Shared Code</h2>
          <button class="copy-btn" data-shared="true">Copy Shared Code</button>
        </div>
        <div class="shared-code-content">
          <pre><code>${ee(S)}</code></pre>
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
    `,K=`
      <div class="shape-nav">
        <h3>Shapes</h3>
        <ul class="shape-nav-list">
          ${m.map((k,T)=>`
            <li>
              <button class="shape-nav-link" data-target="shape-section-${T}">${k}</button>
            </li>
          `).join("")}
        </ul>
      </div>
    `;W.innerHTML=K+Y+I+N+$;const O=W.querySelector(".download-btn");O&&O.addEventListener("click",()=>{const k=new Blob([P],{type:"text/plain"}),T=URL.createObjectURL(k),E=document.createElement("a");E.href=T,E.download=w,E.click(),URL.revokeObjectURL(T);const X=O.textContent;O.textContent="Downloaded!",setTimeout(()=>{O.textContent=X},2e3)}),pe(h,x,"preview-all",l),h.forEach((k,T)=>{xe(k,`preview-${T}`,l[T],M)}),H=Te(),W.querySelectorAll(".copy-btn").forEach(k=>{k.addEventListener("click",T=>{const E=T.target,X=E.dataset.shared==="true";let z="";X?z=E.closest(".shared-code-section")?.querySelector("code")?.textContent||"":z=E.closest(".path-section")?.querySelector("code")?.textContent||"",navigator.clipboard.writeText(z).then(()=>{const B=E.textContent;E.textContent="Copied!",setTimeout(()=>{E.textContent=B},2e3)})})})},t.readAsText(e)}function Te(){const e=Array.from(W.querySelectorAll(".shape-nav-link"));if(e.length===0)return()=>{};const t=e.map(i=>{const n=i.dataset.target;return n?document.getElementById(n):null}).filter(i=>i!==null);if(t.length===0)return()=>{};const a=i=>{e.forEach(n=>{n.classList.toggle("is-active",n.dataset.target===i.id)})},c=()=>{const i=window.innerHeight/2;let n=t[0],o=Number.POSITIVE_INFINITY;t.forEach(p=>{const b=p.getBoundingClientRect(),A=b.top+b.height/2,M=Math.abs(A-i);M<o&&(o=M,n=p)}),a(n)},r=i=>{const o=i.currentTarget.dataset.target;if(!o)return;const p=document.getElementById(o);p&&p.scrollIntoView({behavior:"smooth",block:"center"})};e.forEach(i=>{i.addEventListener("click",r)});let s=!1;const u=()=>{s||(s=!0,window.requestAnimationFrame(()=>{s=!1,c()}))};return window.addEventListener("scroll",u,{passive:!0}),window.addEventListener("resize",u),c(),()=>{e.forEach(i=>{i.removeEventListener("click",r)}),window.removeEventListener("scroll",u),window.removeEventListener("resize",u)}}
