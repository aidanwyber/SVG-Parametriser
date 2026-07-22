(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();function Ce(e){const t=[],n=/([MLHVCSQTAZmlhvcsqtaz])\s*([^MLHVCSQTAZmlhvcsqtaz]*)/g;let s,o=0,i=0,r=0,l=0,a="",c=null,I=null;const E=()=>{c=null,I=null},T=b=>{const h=/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g;return(b.match(h)||[]).map(Number)};for(;(s=n.exec(e))!==null;){const b=s[1],h=b===b.toLowerCase(),v=b.toUpperCase(),d=T(s[2]);if(v==="M"){for(let f=0;f+1<d.length;f+=2){const x=h?o+d[f]:d[f],w=h?i+d[f+1]:d[f+1];f===0?(t.push({type:"M",x,y:w}),r=x,l=w):t.push({type:"L",x,y:w}),o=x,i=w}E(),a=d.length>2?"L":"M"}else if(v==="L"){for(let f=0;f+1<d.length;f+=2){const x=h?o+d[f]:d[f],w=h?i+d[f+1]:d[f+1];t.push({type:"L",x,y:w}),o=x,i=w}E(),a="L"}else if(v==="H"){for(let f=0;f<d.length;f++){const x=h?o+d[f]:d[f];t.push({type:"L",x,y:i}),o=x}E(),a="L"}else if(v==="V"){for(let f=0;f<d.length;f++){const x=h?i+d[f]:d[f];t.push({type:"L",x:o,y:x}),i=x}E(),a="L"}else if(v==="C")for(let f=0;f+5<d.length;f+=6){const x=h?o+d[f]:d[f],w=h?i+d[f+1]:d[f+1],m=h?o+d[f+2]:d[f+2],g=h?i+d[f+3]:d[f+3],y=h?o+d[f+4]:d[f+4],$=h?i+d[f+5]:d[f+5];t.push({type:"C",x1:x,y1:w,x2:m,y2:g,x:y,y:$}),o=y,i=$,c=m,I=g,a="C"}else if(v==="S")for(let f=0;f+3<d.length;f+=4){let x=o,w=i;(a==="C"||a==="S")&&c!==null&&I!==null&&(x=o*2-c,w=i*2-I);const m=h?o+d[f]:d[f],g=h?i+d[f+1]:d[f+1],y=h?o+d[f+2]:d[f+2],$=h?i+d[f+3]:d[f+3];t.push({type:"C",x1:x,y1:w,x2:m,y2:g,x:y,y:$}),o=y,i=$,c=m,I=g,a="S"}else v==="Z"?(t.push({type:"Z"}),o=r,i=l,E(),a="Z"):(E(),a=v)}return t}function q(e){let t="",n=e;for(;n>=0;)t=String.fromCharCode(65+n%26)+t,n=Math.floor(n/26)-1;return t}function R(e,t,n){const s=(e*t).toFixed(n);return parseFloat(s).toString()}function Ie(e,t){if(!t)return"";const{vectorFormat:n,language:s,coordMultiplier:o,precision:i}=e,r=a=>R(a,o,i);if(n==="Processing")return`// Source file bounds from generated vertices
float fileMinX = ${r(t.minX)};
float fileMinY = ${r(t.minY)};
float fileMaxX = ${r(t.maxX)};
float fileMaxY = ${r(t.maxY)};
float fileWidth = ${r(t.width)};
float fileHeight = ${r(t.height)};
float fileCenterX = ${r(t.centerX)};
float fileCenterY = ${r(t.centerY)};`;const l=s==="typescript"?": number":"";return`// Source file bounds from generated vertices
const fileMinX${l} = ${r(t.minX)},
	fileMinY${l} = ${r(t.minY)},
	fileMaxX${l} = ${r(t.maxX)},
	fileMaxY${l} = ${r(t.maxY)},
	fileWidth${l} = ${r(t.width)},
	fileHeight${l} = ${r(t.height)},
	fileCenterX${l} = ${r(t.centerX)},
	fileCenterY${l} = ${r(t.centerY)};`}function Ye(){return`	// Uncomment to center around the source file bounds.
	// x -= fileCenterX;
	// y -= fileCenterY;`}function rt(){return`	// Uncomment to center around the source file bounds.
	// const [x, y] = transform.transform(v.x - fileCenterX, v.y - fileCenterY);`}function Be(e,t){const{vectorFormat:n,language:s,processingVector:o="PVector",instanceMode:i=!1}=e,r=s==="typescript",l=n==="Processing",a=l&&o==="Vec2D",c=i&&n==="createVector";if(l){const v=a?"Vec2D":"PVector",d=a?`import toxi.geom.*;

`:"",f=Ie(e,t),x=Ye();return`${d}${f?f+`

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

${v} applyTransform(${v} v) {
	float x = v.x + transformConfig.preTranslateX;
	float y = v.y + transformConfig.preTranslateY;

${x}

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

	return new ${v}(x, y);
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
}`}if(n==="Vec"){const v=Ie(e,t),d=rt(),f=r?`: {
	preTranslateX: number;
	preTranslateY: number;
	scaleX: number;
	scaleY: number;
	rotation: number;
	translateX: number;
	translateY: number;
}`:"";return`${v?v+`

`:""}// Transform configuration
const transformConfig${f} = {
	preTranslateX: 0,
	preTranslateY: 0,
	scaleX: 1,
	scaleY: 1,
	rotation: 0,
	translateX: 0,
	translateY: 0
};

class Matrix2D {
	${r?`a: number; b: number; c: number; d: number; tx: number; ty: number;

	`:""}constructor(a${r?": number":""}, b${r?": number":""}, c${r?": number":""}, d${r?": number":""}, tx${r?": number":""}, ty${r?": number":""}) {
		this.a = a; this.b = b;
		this.c = c; this.d = d;
		this.tx = tx; this.ty = ty;
	}

	transform(x${r?": number":""}, y${r?": number":""})${r?": [number, number]":""} {
		return [
			this.a * x + this.c * y + this.tx,
			this.b * x + this.d * y + this.ty
		];
	}

	static fromTransform(config${r?": typeof transformConfig":""})${r?": Matrix2D":""} {
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

function applyTransform(v${r?": Vec":""})${r?": Vec":""} {
${d}
	const [x, y] = transform.transform(v.x, v.y);
	return new Vec(x, y);
}

function applyTransformScalar(value${r?": number":""}, axis${r?": 'x' | 'y' | 'avg'":""} = 'avg')${r?": number":""} {
	if (axis === 'x') {
		return value * transformConfig.scaleX;
	}
	if (axis === 'y') {
		return value * transformConfig.scaleY;
	}
	return value * ((Math.abs(transformConfig.scaleX) + Math.abs(transformConfig.scaleY)) * 0.5);
}`}const I=c?"p.createVector":"createVector",E=r?"p5.Vector":"",T=c?r?"p: any":"p":"",b=Ie(e,t),h=Ye();return`${b?b+`

`:""}// Transform configuration
const transformConfig${r?`: {
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

function applyTransform(${T?T+", ":""}v${r?`: ${E}`:""})${r?`: ${E}`:""} {
	let x = v.x + transformConfig.preTranslateX;
	let y = v.y + transformConfig.preTranslateY;

${h}

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

	return ${I}(x, y);
}

function applyTransformScalar(value${r?": number":""}, axis${r?": 'x' | 'y' | 'avg'":""} = 'avg')${r?": number":""} {
	if (axis === 'x') {
		return value * transformConfig.scaleX;
	}
	if (axis === 'y') {
		return value * transformConfig.scaleY;
	}
	return value * ((Math.abs(transformConfig.scaleX) + Math.abs(transformConfig.scaleY)) * 0.5);
}`}function st(e,t){return Be(e,t)}function at(e,t){const{vectorFormat:n,language:s,instanceMode:o=!1}=t,i=s==="typescript",r=n==="Processing",l=o&&(n==="createVector"||n==="Vec");return r?`void ${e}() {`:`function ${e}(${l?i?"p: any":"p":""})${i?": void":""} {`}function Fe(e){const{vectorFormat:t,instanceMode:n=!1}=e;return n&&(t==="createVector"||t==="Vec")?"p.":""}function He(e,t){return`${Fe(t)}${e}`}function re(e){const{vectorFormat:t,processingVector:n="PVector",language:s}=e;return t==="Processing"?n==="Vec2D"?"Vec2D":"PVector":t==="Vec"?"Vec":s==="typescript"?"p5.Vector":""}function ee(e,t){if(e.length===0)return[];if(t.vectorFormat==="Processing")return[`${re(t)} ${e.join(", ")};`];const n=t.language==="typescript"?`: ${re(t)}`:"";return[`let ${e.map(s=>`${s}${n}`).join(", ")};`]}function te(e,t){return t.vectorFormat==="Processing"?`${re(t)}[] ${e} = new ${re(t)}[0];`:t.language==="typescript"?`let ${e}: ${re(t)}[] = [];`:`let ${e} = [];`}function ne(e,t,n){return n.vectorFormat==="Processing"?`${e} = new ${re(n)}[] { ${t.join(", ")} };`:`${e} = [${t.join(", ")}];`}function ke(e){return e.map(t=>`	${t}`).join(`
`)}function Le(){return{minX:Number.POSITIVE_INFINITY,minY:Number.POSITIVE_INFINITY,maxX:Number.NEGATIVE_INFINITY,maxY:Number.NEGATIVE_INFINITY}}function le(e,t,n){e.minX=Math.min(e.minX,t),e.minY=Math.min(e.minY,n),e.maxX=Math.max(e.maxX,t),e.maxY=Math.max(e.maxY,n)}function it(e){return Number.isFinite(e.minX)&&Number.isFinite(e.minY)&&Number.isFinite(e.maxX)&&Number.isFinite(e.maxY)}function ct(e){const t=[];let n=[],s=!1,o=Le();const i=()=>{if(n.length===0)return;const r=it(o)?{...o}:{minX:0,minY:0,maxX:0,maxY:0};t.push({commands:n,closed:s,bounds:r}),n=[],s=!1,o=Le()};return e.forEach(r=>{if(r.type==="M"){i(),n.push(r),le(o,r.x,r.y);return}if(r.type==="L"){n.length===0&&n.push({type:"M",x:r.x,y:r.y}),n.push(r),le(o,r.x,r.y);return}if(r.type==="C"){if(n.length===0)return;n.push(r),le(o,r.x1,r.y1),le(o,r.x2,r.y2),le(o,r.x,r.y);return}r.type==="Z"&&(s=!0,i())}),i(),t}function Ae(e,t){return e.bounds.minX>=t.minX-1e-6&&e.bounds.maxX<=t.maxX+1e-6&&e.bounds.minY>=t.minY-1e-6&&e.bounds.maxY<=t.maxY+1e-6}function lt(e,t,n,s,o,i,r,l){const a=t.vectorFormat==="Processing",c=Fe(t),I=m=>R(m,n,s),E=[],T=[],b=[],h=[],v="'x'",d="'y'",f=a?"'a'":"'avg'",x=(m,g,y)=>{const $=`${r}_${m}`,C=`${i}${o}(${I(g)}, ${I(y)}))`;return T.push($),E.push(`${$} = ${C};`),$},w=(m,g,y)=>{const $=`applyTransformScalar(${I(g)}, ${y})`;a?b.push(`float ${m} = ${$};`):b.push(`const ${m} = ${$};`)};if(e.kind==="line"){if(e.x1==null||e.y1==null||e.x2==null||e.y2==null)return null;const m=x("p1",e.x1,e.y1),g=x("p2",e.x2,e.y2);return h.push(`${c}line(${m}.x, ${m}.y, ${g}.x, ${g}.y);`),{globalCode:[...ee(T,t),te(l,t)].join(`
`),assignments:[...E,ne(l,T,t)],localDeclarations:b,drawCalls:h}}if(e.kind==="polyline"||e.kind==="polygon"){const m=e.points||[];return m.length<2?null:(m.forEach(([g,y],$)=>{x(q($),g,y)}),h.push(`${c}beginShape();`),T.forEach(g=>{h.push(`${c}vertex(${g}.x, ${g}.y);`)}),h.push(`${c}endShape(${He(e.kind==="polygon"?"CLOSE":"OPEN",t)});`),{globalCode:[...ee(T,t),te(l,t)].join(`
`),assignments:[...E,ne(l,T,t)],localDeclarations:b,drawCalls:h})}if(e.kind==="rect"){if(e.x==null||e.y==null||e.width==null||e.height==null)return null;const m=x("rectPos",e.x,e.y);w("rectW",e.width,v),w("rectH",e.height,d);const g=e.rx||0,y=e.ry||0;if(g>0||y>0){if(Math.abs(g-y)>1e-9)return null;w("rectR",g,f),h.push(`${c}rect(${m}.x, ${m}.y, rectW, rectH, rectR);`)}else h.push(`${c}rect(${m}.x, ${m}.y, rectW, rectH);`);return{globalCode:[...ee(T,t),te(l,t)].join(`
`),assignments:[...E,ne(l,T,t)],localDeclarations:b,drawCalls:h}}if(e.kind==="circle"){if(e.cx==null||e.cy==null||e.r==null)return null;const m=x("circleCenter",e.cx,e.cy);return w("circleDiameter",e.r*2,f),h.push(`${c}circle(${m}.x, ${m}.y, circleDiameter);`),{globalCode:[...ee(T,t),te(l,t)].join(`
`),assignments:[...E,ne(l,T,t)],localDeclarations:b,drawCalls:h}}if(e.kind==="ellipse"){if(e.cx==null||e.cy==null||e.rx==null||e.ry==null)return null;const m=x("ellipseCenter",e.cx,e.cy);return w("ellipseW",e.rx*2,v),w("ellipseH",e.ry*2,d),h.push(`${c}ellipse(${m}.x, ${m}.y, ellipseW, ellipseH);`),{globalCode:[...ee(T,t),te(l,t)].join(`
`),assignments:[...E,ne(l,T,t)],localDeclarations:b,drawCalls:h}}return null}function ut(e,t,n,s,o){const{vectorFormat:i,coordMultiplier:r,precision:l,processingVector:a="PVector",instanceMode:c=!1}=t,I=i==="Processing",E=I&&a==="Vec2D",T=c&&(i==="createVector"||i==="Vec"),b=o||`drawPath${n+1}`,h=I?E?"new Vec2D":"new PVector":i==="Vec"?"new Vec":c&&i==="createVector"?"p.createVector":"createVector",v=T&&i==="createVector"?"applyTransform(p, ":"applyTransform(",d=Be(t),f=at(b,t),x=Fe(t),w=`${b}Points`;if(s?.primitive){const F=lt(s.primitive,t,r,l,h,v,b,w);if(F){const X=[...F.assignments,...F.localDeclarations,...F.drawCalls],Y=`${f}
${ke(X)}
}`;return{sharedCode:d,globalCode:F.globalCode,pathCode:Y}}}const m=Ce(e),g=ct(m);let y=0;const $=[],C=[],P=F=>{const X=[];return F.commands.forEach(Y=>{if(Y.type==="M"||Y.type==="L"){const B=`${b}_${q(y)}`,O=R(Y.x,r,l),_=R(Y.y,r,l);$.push(B),C.push(`${B} = ${v}${h}(${O}, ${_}));`),X.push(`${x}vertex(${B}.x, ${B}.y);`),y++;return}if(Y.type==="C"){const B=`${b}_${q(y-1)}`,O=`${b}_${q(y)}`,_=B+"c",K="c"+O,ge=R(Y.x1,r,l),me=R(Y.y1,r,l),Q=R(Y.x2,r,l),ce=R(Y.y2,r,l),we=R(Y.x,r,l),Se=R(Y.y,r,l);$.push(_,K,O),C.push(`${_} = ${v}${h}(${ge}, ${me}));`),C.push(`${K} = ${v}${h}(${Q}, ${ce}));`),C.push(`${O} = ${v}${h}(${we}, ${Se}));`),X.push(`${x}bezierVertex(${_}.x, ${_}.y, ${K}.x, ${K}.y, ${O}.x, ${O}.y);`),y++}}),X};let M=[],V=!1,N=null,A=0;const Z=[],ae=()=>{M.length!==0&&(Z.push([`${x}beginShape();`,...M,`${x}endShape(${He(V?"CLOSE":"OPEN",t)});`].join(`
`)),M=[],V=!1,N=null,A=0)};g.forEach(F=>{const X=P(F);if(X.length===0)return;if(M.length===0){M=X,V=F.closed,N=F.bounds,A=0;return}if(N!==null&&Ae(F,N)){V=!0,M.push(`${x}beginContour();`),M.push(...X),M.push(`${x}endContour();`),A++;return}if(N!==null&&A===0&&Ae({bounds:N},F.bounds)){const O=[...M];V=!0,N=F.bounds,M=[...X,`${x}beginContour();`,...O,`${x}endContour();`],A=1;return}ae(),M=X,V=F.closed,N=F.bounds,A=0}),ae();const fe=[...ee($,t),te(w,t)],ie=Z.map(F=>F.split(`
`).map(X=>`	${X}`).join(`
`)).join(`

`),G=[...C,ne(w,$,t)],de=G.length>0?`${ke(G)}

`:"",be=ie?`${ie}
`:"",he=`${f}
${de}${be}}`;return{sharedCode:d,globalCode:fe.join(`
`),pathCode:he}}function pe(e,t,n="drawAllPaths"){const{vectorFormat:s,language:o,instanceMode:i=!1}=t,r=o==="typescript",l=s==="Processing",a=i&&(s==="createVector"||s==="Vec"),c=e.map(I=>l?`	${I}();`:a?`	${I}(p);`:`	${I}();`).join(`
`);return l?`
void ${n}() {
${c}
}`:`
function ${n}(${a?r?"p: any":"p":""})${r?": void":""} {
${c}
}`}function H(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function Xe(){return{minX:Number.POSITIVE_INFINITY,minY:Number.POSITIVE_INFINITY,maxX:Number.NEGATIVE_INFINITY,maxY:Number.NEGATIVE_INFINITY}}function ue(e,t,n){e.minX=Math.min(e.minX,t),e.minY=Math.min(e.minY,n),e.maxX=Math.max(e.maxX,t),e.maxY=Math.max(e.maxY,n)}function ft(e){return Number.isFinite(e.minX)&&Number.isFinite(e.minY)&&Number.isFinite(e.maxX)&&Number.isFinite(e.maxY)}function dt(e){const t=[];let n=[],s=!1,o=Xe();const i=()=>{if(n.length===0)return;const r=ft(o)?{...o}:{minX:0,minY:0,maxX:0,maxY:0};t.push({commands:n,closed:s,bounds:r}),n=[],s=!1,o=Xe()};return e.forEach(r=>{if(r.type==="M"){i(),n.push(r),ue(o,r.x,r.y);return}if(r.type==="L"){n.length===0&&n.push({type:"M",x:r.x,y:r.y}),n.push(r),ue(o,r.x,r.y);return}if(r.type==="C"){if(n.length===0)return;n.push(r),ue(o,r.x1,r.y1),ue(o,r.x2,r.y2),ue(o,r.x,r.y);return}r.type==="Z"&&(s=!0,i())}),i(),t}function De(e,t){return e.bounds.minX>=t.minX-1e-6&&e.bounds.maxX<=t.maxX+1e-6&&e.bounds.minY>=t.minY-1e-6&&e.bounds.maxY<=t.maxY+1e-6}function Ve(e,t,n){t.commands.forEach(s=>{if(s.type==="M"||s.type==="L"){const o=n(s.x,s.y);e.vertex(o.x,o.y);return}if(s.type==="C"){const o=n(s.x1,s.y1),i=n(s.x2,s.y2),r=n(s.x,s.y);e.bezierVertex(o.x,o.y,i.x,i.y,r.x,r.y)}})}function Re(e,t,n){const s=dt(t).filter(l=>l.commands.length>0);if(s.length===0)return;const o=[];let i=null;const r=()=>{i&&(o.push(i),i=null)};s.forEach(l=>{if(!i){i={host:l,contours:[],closed:l.closed};return}if(De(l,i.host.bounds)){i.contours.push(l),i.closed=!0;return}if(i.contours.length===0&&De(i.host,l.bounds)){i={host:l,contours:[i.host],closed:!0};return}r(),i={host:l,contours:[],closed:l.closed}}),r(),o.forEach(l=>{e.beginShape(),Ve(e,l.host,n),l.contours.forEach(a=>{e.beginContour(),Ve(e,a,n),e.endContour()}),e.endShape(l.closed?e.CLOSE:e.OPEN)})}function Me(e){const t=[];let n=0;return e.forEach(s=>{if(s.type==="M"||s.type==="L"){const o=q(n);t.push({name:o,x:s.x,y:s.y}),n++}else if(s.type==="C"){const o=q(n-1),i=q(n),r=o+"c",l="c"+i;t.push({name:r,x:s.x1,y:s.y1}),t.push({name:l,x:s.x2,y:s.y2}),t.push({name:i,x:s.x,y:s.y}),n++}}),t}function We(e){const t=e.map(l=>l.x),n=e.map(l=>l.y),s=Math.min(...t),o=Math.min(...n),i=Math.max(...t),r=Math.max(...n);return{minX:s,minY:o,maxX:i,maxY:r,width:i-s,height:r-o}}function $e(e){if(e.length===0)return null;const t=e.reduce((n,s)=>({x:n.x+s.x,y:n.y+s.y}),{x:0,y:0});return{x:t.x/e.length,y:t.y/e.length}}function ht(e){if(e.length<3)return $e(e.map(([o,i])=>({x:o,y:i})));let t=0,n=0,s=0;for(let o=0;o<e.length;o++){const[i,r]=e[o],[l,a]=e[(o+1)%e.length],c=i*a-l*r;t+=c,n+=(i+l)*c,s+=(r+a)*c}return Math.abs(t)<1e-9?$e(e.map(([o,i])=>({x:o,y:i}))):{x:n/(3*t),y:s/(3*t)}}function qe(e){if(!e)return null;if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?null:{x:(e.x1+e.x2)/2,y:(e.y1+e.y2)/2};if(e.kind==="polyline"){const t=e.points||[];return $e(t.map(([n,s])=>({x:n,y:s})))}return e.kind==="polygon"?ht(e.points||[]):e.kind==="rect"?e.x==null||e.y==null||e.width==null||e.height==null?null:{x:e.x+e.width/2,y:e.y+e.height/2}:e.kind==="circle"?e.cx==null||e.cy==null?null:{x:e.cx,y:e.cy}:e.kind==="ellipse"?e.cx==null||e.cy==null?null:{x:e.cx,y:e.cy}:null}function gt(e){return e?e.kind==="line"?"midpoint":e.kind==="polyline"||e.kind==="polygon"?"centroid":"center":"reference"}function mt(e){if(!e)return[];if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?[]:[{point:{x:e.x1,y:e.y1},label:"start"},{point:{x:e.x2,y:e.y2},label:"end"}];if(e.kind==="polyline"||e.kind==="polygon")return(e.points||[]).map(([n,s],o)=>({point:{x:n,y:s},label:q(o)}));const t=qe(e);return t?[{point:t,label:gt(e)}]:[]}function pt(e,t,n,s=!0){const o=Ce(e),i=Me(o),r=mt(n?.primitive),l=!!n?.primitive;if(i.length===0)return;const a=We(i);new window.p5(c=>{const b=a.width>0?440/a.width:1,h=a.height>0?440/a.height:1,v=Math.min(b,h),d=a.width*v,f=a.height*v,x=(500-d)/2-a.minX*v,w=(500-f)/2-a.minY*v;c.setup=()=>{c.createCanvas(500,500),c.noLoop()},c.draw=()=>{c.background(30);const m=(y,$)=>({x:y*v+x,y:$*v+w});c.stroke(60),c.strokeWeight(1);for(let y=0;y<=500;y+=50)c.line(y,0,y,500),c.line(0,y,500,y);const g=m(0,0);if(c.stroke(255,100,100),c.strokeWeight(2),c.line(0,g.y,500,g.y),c.stroke(100,255,100),c.strokeWeight(2),c.line(g.x,0,g.x,500),c.noStroke(),c.fill(255,200,0),c.circle(g.x,g.y,12),c.fill(255),c.textAlign(c.LEFT,c.BOTTOM),c.textSize(14),c.textStyle(c.BOLD),c.text("(0, 0)",g.x+8,g.y-8),c.fill(100,150,255,50),c.stroke(100,150,255),c.strokeWeight(2),Re(c,o,m),l&&r.length>0)r.forEach(({point:y,label:$,isControlPoint:C})=>{const P=m(y.x,y.y);c.noStroke(),C?(c.fill(255,200,100),c.circle(P.x,P.y,8)):(c.fill(100,255,150),c.circle(P.x,P.y,10)),c.fill(255),c.textAlign(c.CENTER,c.CENTER),c.textSize(12),c.textStyle(c.BOLD),c.text($,P.x,P.y-16),s&&(c.textSize(9),c.textStyle(c.NORMAL),c.fill(200),c.text(`(${y.x.toFixed(1)}, ${y.y.toFixed(1)})`,P.x,P.y+16))});else{c.stroke(255,200,100,100),c.strokeWeight(1);let y=0;o.forEach($=>{if($.type==="C"){const C=i.find(N=>N.name===String.fromCharCode(65+y-1)),P=i.find(N=>N.name===C?.name+"c"),M=i.find(N=>N.name==="c"+String.fromCharCode(65+y)),V=i.find(N=>N.name===String.fromCharCode(65+y));if(C&&P){const N=m(C.x,C.y),A=m(P.x,P.y);c.line(N.x,N.y,A.x,A.y)}if(M&&V){const N=m(M.x,M.y),A=m(V.x,V.y);c.line(N.x,N.y,A.x,A.y)}y++}else($.type==="M"||$.type==="L")&&y++}),i.forEach($=>{const C=m($.x,$.y),P=$.name.includes("c");c.noStroke(),P?(c.fill(255,200,100),c.circle(C.x,C.y,8)):(c.fill(100,255,150),c.circle(C.x,C.y,10)),c.fill(255),c.noStroke(),c.textAlign(c.CENTER,c.CENTER),c.textSize(12),c.textStyle(c.BOLD);const M=15;c.text($.name,C.x,C.y-M),s&&(c.textSize(9),c.textStyle(c.NORMAL),c.fill(200),c.text(`(${$.x.toFixed(1)}, ${$.y.toFixed(1)})`,C.x,C.y+M+3))})}c.fill(200),c.noStroke(),c.textAlign(c.LEFT,c.TOP),c.textSize(11),c.text(`Scale: ${v.toFixed(3)}x`,10,10),c.text(`Size: ${a.width.toFixed(1)} × ${a.height.toFixed(1)}`,10,25)}},t)}function ze(e,t,n,s=[]){const o=e.map((a,c)=>({id:t[c]??c+1,commands:Ce(a),primitive:s[c]?.primitive})).filter(a=>a.commands.length>0),i=o.flatMap(a=>Me(a.commands));if(i.length===0)return;const r=We(i),l=o.map(()=>{const a=80+Math.floor(Math.random()*176),c=80+Math.floor(Math.random()*176),I=80+Math.floor(Math.random()*176);return{stroke:[a,c,I]}});new window.p5(a=>{const T=r.width>0?440/r.width:1,b=r.height>0?440/r.height:1,h=Math.min(T,b),v=r.width*h,d=r.height*h,f=(500-v)/2-r.minX*h,x=(500-d)/2-r.minY*h,w=(m,g)=>({x:m*h+f,y:g*h+x});a.setup=()=>{a.createCanvas(500,500),a.noLoop()},a.draw=()=>{a.background(30),a.stroke(60),a.strokeWeight(1);for(let g=0;g<=500;g+=50)a.line(g,0,g,500),a.line(0,g,500,g);const m=w(0,0);a.stroke(255,100,100),a.strokeWeight(2),a.line(0,m.y,500,m.y),a.stroke(100,255,100),a.strokeWeight(2),a.line(m.x,0,m.x,500),a.noStroke(),a.fill(255,200,0),a.circle(m.x,m.y,10),o.forEach((g,y)=>{const $=g.commands,C=l[y];a.noFill(),a.stroke(C.stroke[0],C.stroke[1],C.stroke[2]),a.strokeWeight(2),Re(a,$,w)}),a.noStroke(),a.fill(255),a.textAlign(a.CENTER,a.CENTER),a.textSize(11),a.textStyle(a.BOLD),o.forEach(g=>{const y=qe(g.primitive),$=$e(Me(g.commands).map(M=>({x:M.x,y:M.y}))),C=y??$;if(!C)return;const P=w(C.x,C.y);a.text(String(g.id),P.x,P.y)}),a.fill(200),a.noStroke(),a.textAlign(a.LEFT,a.TOP),a.textSize(11),a.text(`Paths: ${o.length}`,10,10),a.text(`Scale: ${h.toFixed(3)}x`,10,25),a.text(`Size: ${r.width.toFixed(1)} x ${r.height.toFixed(1)}`,10,40)}},n)}const ve=.5522847498307936;function L(e,t=0){if(e==null)return t;const n=Number.parseFloat(e);return Number.isFinite(n)?n:t}function xt(e){if(!e)return[];const t=/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g,n=(e.match(t)||[]).map(Number),s=[];for(let o=0;o+1<n.length;o+=2)s.push([n[o],n[o+1]]);return s}function yt(e){const t=L(e.getAttribute("x1"),0),n=L(e.getAttribute("y1"),0),s=L(e.getAttribute("x2"),0),o=L(e.getAttribute("y2"),0);return{pathData:`M ${t} ${n} L ${s} ${o}`,sourceIndex:0,primitive:{kind:"line",x1:t,y1:n,x2:s,y2:o}}}function _e(e,t){const n=xt(e.getAttribute("points"));if(n.length<2)return null;const[s,o]=n[0],i=n.slice(1).map(([r,l])=>`L ${r} ${l}`).join(" ");return{pathData:`M ${s} ${o} ${i}${t?" Z":""}`,sourceIndex:0,primitive:{kind:t?"polygon":"polyline",points:n}}}function $t(e,t,n,s,o,i){if(o===0||i===0)return`M ${e} ${t} L ${e+n} ${t} L ${e+n} ${t+s} L ${e} ${t+s} Z`;const r=o*ve,l=i*ve,a=e+n,c=t+s;return[`M ${e+o} ${t}`,`L ${a-o} ${t}`,`C ${a-o+r} ${t} ${a} ${t+i-l} ${a} ${t+i}`,`L ${a} ${c-i}`,`C ${a} ${c-i+l} ${a-o+r} ${c} ${a-o} ${c}`,`L ${e+o} ${c}`,`C ${e+o-r} ${c} ${e} ${c-i+l} ${e} ${c-i}`,`L ${e} ${t+i}`,`C ${e} ${t+i-l} ${e+o-r} ${t} ${e+o} ${t}`,"Z"].join(" ")}function vt(e){const t=L(e.getAttribute("x"),0),n=L(e.getAttribute("y"),0),s=L(e.getAttribute("width"),0),o=L(e.getAttribute("height"),0);if(s<=0||o<=0)return null;const i=e.getAttribute("rx"),r=e.getAttribute("ry");let l=L(i,0),a=L(r,0);return i!=null&&r==null&&(a=l),r!=null&&i==null&&(l=a),l=Math.max(0,Math.min(l,s/2)),a=Math.max(0,Math.min(a,o/2)),{pathData:$t(t,n,s,o,l,a),sourceIndex:0,primitive:{kind:"rect",x:t,y:n,width:s,height:o,rx:l,ry:a}}}function Ze(e,t,n,s){const o=n*ve,i=s*ve;return[`M ${e+n} ${t}`,`C ${e+n} ${t+i} ${e+o} ${t+s} ${e} ${t+s}`,`C ${e-o} ${t+s} ${e-n} ${t+i} ${e-n} ${t}`,`C ${e-n} ${t-i} ${e-o} ${t-s} ${e} ${t-s}`,`C ${e+o} ${t-s} ${e+n} ${t-i} ${e+n} ${t}`,"Z"].join(" ")}function Ct(e){const t=L(e.getAttribute("cx"),0),n=L(e.getAttribute("cy"),0),s=L(e.getAttribute("r"),0);return s<=0?null:{pathData:Ze(t,n,s,s),sourceIndex:0,primitive:{kind:"circle",cx:t,cy:n,r:s}}}function bt(e){const t=L(e.getAttribute("cx"),0),n=L(e.getAttribute("cy"),0),s=L(e.getAttribute("rx"),0),o=L(e.getAttribute("ry"),0);return s<=0||o<=0?null:{pathData:Ze(t,n,s,o),sourceIndex:0,primitive:{kind:"ellipse",cx:t,cy:n,rx:s,ry:o}}}function wt(e){const n=Array.from(e.querySelectorAll("path,rect,circle,ellipse,line,polyline,polygon")),s=[];return n.forEach((o,i)=>{const r=i+1,l=o.tagName.toLowerCase();if(l==="path"){const c=o.getAttribute("d");c&&s.push({pathData:c,sourceIndex:r});return}let a=null;l==="line"?a=yt(o):l==="polyline"?a=_e(o,!1):l==="polygon"?a=_e(o,!0):l==="rect"?a=vt(o):l==="circle"?a=Ct(o):l==="ellipse"&&(a=bt(o)),a&&(a.sourceIndex=r,s.push(a))}),s}const U=document.getElementById("dropZone"),Ge=document.getElementById("fileInput"),W=document.getElementById("functionPrefix"),oe=document.getElementById("output");let j=[],xe=null,Ee=0;function Ke(e){const t=e.lastIndexOf(".");return t<=0?e:e.slice(0,t)}function Pe(e){const t=e.trim().replace(/[^a-zA-Z0-9_]/g,"_").replace(/_+/g,"_").replace(/^_+|_+$/g,"");return t.length===0?"shape":/^[a-zA-Z_]/.test(t)?t:`_${t}`}function Oe(e){return Pe(e)}function St(e){const t=new Set,n=new Map;return e.map(s=>{if(!t.has(s))return t.add(s),n.set(s,1),s;let o=(n.get(s)||1)+1,i=`${s}_${o}`;for(;t.has(i);)o+=1,i=`${s}_${o}`;return n.set(s,o),t.add(i),i})}function It(e,t,n){return Pe(`${e}_${t||"path"}${n}`)}function Et(e){return Pe(`${e}_drawAllPaths`)}function Te(e){const t=Ke(e.name).trim();return t.length>0?t:"shape"}function Tt(e,t){const n=Ke(e).trim();if(t==="pde"){const o=n.replace(/[^a-zA-Z0-9_]/g,"_").replace(/_+/g,"_").replace(/^_+|_+$/g,"");return o.length===0?"drawing":/^[0-9]/.test(o)?`svg${o}`:o}const s=n.replace(/[^a-zA-Z0-9._-]/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"");return s.length>0?s:"drawing"}function ye(e,t){if(t==="pde"){const n=e.replace(/[^a-zA-Z0-9_]/g,"_").replace(/_+/g,"_").replace(/^_+|_+$/g,""),s=n.length>0?n:"drawing";return`${/^[0-9]/.test(s)?`svg${s}`:s}.pde`}return`${e}.${t}`}async function Nt(e){if(!e)return!1;if(typeof navigator<"u"&&navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.top="0",t.style.left="-9999px",t.style.opacity="0",t.style.pointerEvents="none",document.body.appendChild(t),t.focus(),t.select(),t.setSelectionRange(0,t.value.length);let n=!1;try{n=document.execCommand("copy")}catch{n=!1}return document.body.removeChild(t),n}const Ne=new WeakMap;function Mt(e){const t=e.dataset.baseLabel;if(t!==void 0)return t;const n=e.textContent||"";return e.dataset.baseLabel=n,n}function je(e,t,n=2e3){const s=Mt(e),o=Ne.get(e);o!==void 0&&window.clearTimeout(o),e.textContent=t;const i=window.setTimeout(()=>{e.textContent=s,Ne.delete(e)},n);Ne.set(e,i)}function Ue(e){return e.type==="image/svg+xml"||e.name.toLowerCase().endsWith(".svg")}function Qe(e){return Array.from(e).filter(Ue)}function Ft(e){let t=Number.POSITIVE_INFINITY,n=Number.POSITIVE_INFINITY,s=Number.NEGATIVE_INFINITY,o=Number.NEGATIVE_INFINITY;const i=(r,l)=>{t=Math.min(t,r),n=Math.min(n,l),s=Math.max(s,r),o=Math.max(o,l)};return e.forEach(r=>{Ce(r.pathData).forEach(a=>{if(a.type==="M"||a.type==="L"){i(a.x,a.y);return}a.type==="C"&&(i(a.x1,a.y1),i(a.x2,a.y2),i(a.x,a.y))})}),!Number.isFinite(t)||!Number.isFinite(n)||!Number.isFinite(s)||!Number.isFinite(o)?null:{minX:t,minY:n,maxX:s,maxY:o,width:s-t,height:o-n,centerX:(t+s)/2,centerY:(n+o)/2}}U.addEventListener("click",()=>Ge.click());document.querySelectorAll('input[name="vectorFormat"]').forEach(e=>{e.addEventListener("change",t=>{const n=t.target,s=document.getElementById("processingVectorOption"),o=document.getElementById("instanceModeOption");s&&(s.style.display=n.value==="Processing"?"flex":"none"),o&&(o.style.display=n.value==="Processing"?"none":"flex"),j.length>0&&se(j)})});document.querySelectorAll('input[name="language"], input[name="processingVector"], input[name="sortMode"], #instanceMode, #showCoordinates').forEach(e=>{e.addEventListener("change",()=>{j.length>0&&se(j)})});document.querySelectorAll("#coordMultiplier, #precision").forEach(e=>{e.addEventListener("change",()=>{j.length>0&&se(j)})});W&&W.addEventListener("input",()=>{j.length>0&&se(j)});U.addEventListener("dragover",e=>{e.preventDefault(),U.classList.add("dragover")});U.addEventListener("dragleave",()=>{U.classList.remove("dragover")});U.addEventListener("drop",e=>{e.preventDefault(),U.classList.remove("dragover");const t=e.dataTransfer?.files;if(!t){alert("Please drop at least one SVG file");return}const n=Qe(t);if(n.length===0){alert("Please drop at least one valid SVG file");return}se(n)});Ge.addEventListener("change",e=>{const t=e.target.files;if(!t)return;const n=Qe(t);n.length!==0&&se(n)});async function se(e){const t=e.filter(Ue);if(t.length===0)return;const n=t.length>1,s=j.length===1&&t.length===1&&j[0]===t[0];W&&(W.disabled=n,n?(W.value="Auto per file",W.title="Disabled for multi-file imports. Filename prefixes are used automatically."):(W.title="",s||(W.value=Te(t[0])))),j=[...t];const o=++Ee;let i=[];try{i=await Promise.all(t.map(async(u,p)=>{const S=await u.text(),D=new DOMParser().parseFromString(S,"image/svg+xml");return{file:u,fileIndex:p,shapes:wt(D)}}))}catch{if(o!==Ee)return;oe.innerHTML='<div class="output"><p>Could not read one or more SVG files.</p></div>';return}if(o!==Ee)return;xe&&(xe(),xe=null);const r=i.filter(u=>u.shapes.length>0);if(r.length===0){oe.innerHTML='<div class="output"><p>No supported drawable elements found (path, line, polyline, polygon, rect, circle, ellipse).</p></div>';return}const l=document.querySelector('input[name="vectorFormat"]:checked')?.value||"Vec",a=document.querySelector('input[name="language"]:checked')?.value||"javascript",c=parseFloat(document.getElementById("coordMultiplier")?.value)||1,I=parseInt(document.getElementById("precision")?.value)||5,E=document.querySelector('input[name="processingVector"]:checked')?.value||"PVector",T=document.getElementById("instanceMode")?.checked||!1,b=document.getElementById("showCoordinates")?.checked??!0,h=document.querySelector('input[name="sortMode"]:checked')?.value||"primitive",v={vectorFormat:l,language:a,coordMultiplier:c,precision:I,processingVector:E,instanceMode:T},d=Oe(W?.value||Te(r[0].file)),f=n?St(r.map(u=>Oe(Te(u.file)))):[d],x=r.map((u,p)=>{const S=n?f[p]:d;return{file:u.file,fileIndex:u.fileIndex,filePrefix:S,drawAllFunctionName:Et(S)}}),w=[];let m=1;r.forEach((u,p)=>{const S=x[p];u.shapes.forEach((k,D)=>{w.push({fileIndex:u.fileIndex,fileName:u.file.name,shape:k,functionName:It(S.filePrefix,k.primitive?.kind,D+1),globalId:m++})})});const g=[...w].sort((u,p)=>{if(h==="svg")return u.fileIndex!==p.fileIndex?u.fileIndex-p.fileIndex:u.shape.sourceIndex-p.shape.sourceIndex;const S=u.shape.primitive?.kind??"path",k=p.shape.primitive?.kind??"path";return S===k?u.fileIndex!==p.fileIndex?u.fileIndex-p.fileIndex:u.shape.sourceIndex-p.shape.sourceIndex:S.localeCompare(k)}),y=g.map(u=>u.functionName),$=new Map;g.forEach(u=>{const p=$.get(u.fileIndex)||[];p.push(u.functionName),$.set(u.fileIndex,p)});const C=Ft(g.map(u=>u.shape))||void 0,P=st(v,C);let M="";const V=[],N=[],A=[],Z=new Map,ae=[],fe=new Map,ie=[];g.forEach((u,p)=>{V.push(u.shape.pathData),N.push(u.globalId),A.push(u.shape),ie.push(u.functionName);let S=Z.get(u.fileIndex);S||(S={previewId:`preview-all-file-${u.fileIndex}`,fileName:u.fileName,pathsData:[],shapeIds:[],shapes:[]},Z.set(u.fileIndex,S)),S.pathsData.push(u.shape.pathData),S.shapeIds.push(u.globalId),S.shapes.push(u.shape);const k=ut(u.shape.pathData,v,p,u.shape,u.functionName),D=[k.globalCode,k.pathCode].filter(J=>J.trim().length>0).join(`

`);ae.push(D),fe.set(u.functionName,D);const z=`preview-${p}`;M+=`
          <div class="output path-section" id="shape-section-${p}">
            <div class="path-header">
              <h2>${H(u.functionName)}</h2>
              <button class="copy-btn" data-path="${p}">Copy Code</button>
            </div>
            <p class="path-meta">${H(u.fileName)} · svg #${u.shape.sourceIndex}</p>
            <div class="content-grid">
              <div class="preview-container">
                <div id="${z}"></div>
              </div>
              <div class="code-container">
                <pre><code>${H(D)}</code></pre>
              </div>
            </div>
          </div>
        `});const G=a==="typescript"?"import type p5 from 'p5';":"",de=P.trim(),be=ae.join(`

`).trim(),he=[];let F="";if(n){const u=[];x.forEach(p=>{const S=$.get(p.fileIndex)||[];S.length!==0&&(u.push(p.drawAllFunctionName),he.push(pe(S,v,p.drawAllFunctionName).trim()))}),F=pe(u,v).trim()}else F=pe(y,v,x[0].drawAllFunctionName).trim();const X=[F,...he,be].filter(u=>u.length>0).join(`

`),Y=[G,de].filter(u=>u.length>0).join(`

`),B=[G,X].filter(u=>u.length>0).join(`

`),O=[G,de,X].filter(u=>u.length>0).join(`

`),_=l==="Processing"?"pde":a==="typescript"?"ts":"js",K=ye("svg_complete",_),ge=ye("svg_paths",_),me=ye("svg_shared",_),Q=[];n&&x.forEach(u=>{const p=$.get(u.fileIndex)||[];if(p.length===0)return;const S=pe(p,v,u.drawAllFunctionName).trim(),k=p.map(z=>fe.get(z)||"").filter(z=>z.length>0).join(`

`).trim(),D=[G,S,k].filter(z=>z.length>0).join(`

`);Q.push({codeKey:`drawing-file-${u.filePrefix}`,code:D,drawAllFunctionName:u.drawAllFunctionName,fileName:ye(`svg_${Tt(u.file.name,_)}`,_),sourceFileName:u.file.name})});const ce={complete:O,drawing:B,shared:Y};Q.forEach(u=>{ce[u.codeKey]=u.code});const we=`
      <div class="command-section">
        <div class="command-header">
          <h2>Complete File</h2>
          <div class="action-buttons">
            <button class="copy-btn" data-code-key="complete">Copy Complete Code</button>
            <button class="download-btn" data-code-key="complete" data-filename="${K}">Download ${K}</button>
          </div>
        </div>
        <div class="command-content">
          <p style="margin: 0; padding: 15px; color: #9cdcfe;">Includes shared transform code and all generated drawing functions.</p>
        </div>
      </div>
    `,Se=`
      <div class="shared-code-section drawing-code-section">
        <div class="shared-code-header">
          <h2>Drawing Code</h2>
          <div class="action-buttons">
            <button class="copy-btn" data-code-key="drawing">Copy Drawing Code</button>
            <button class="download-btn" data-code-key="drawing" data-filename="${ge}">Download ${ge}</button>
          </div>
        </div>
        <div class="shared-code-content">
          <pre><code>${H(B)}</code></pre>
        </div>
      </div>
    `,Je=Q.length>0?`
	      <div class="command-section">
	        <div class="command-header">
	          <h2>Per-file Drawing Downloads</h2>
        </div>
        <div class="command-content">
          <div class="command-content-inner">
            <div class="per-file-actions">
	              ${Q.map(u=>`
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
    `:"",et=`
      <div class="shared-code-section">
        <div class="shared-code-header">
          <h2>Shared Code</h2>
          <div class="action-buttons">
            <button class="copy-btn" data-code-key="shared">Copy Shared Code</button>
            <button class="download-btn" data-code-key="shared" data-filename="${me}">Download ${me}</button>
          </div>
        </div>
        <div class="shared-code-content">
          <pre><code>${H(Y)}</code></pre>
        </div>
      </div>
    `,tt=n?`
      <div class="combined-preview-section output">
        <div class="combined-preview-header">
          <h2>All paths by file</h2>
        </div>
        <div class="combined-preview-grid">
          ${x.map(u=>{const p=Z.get(u.fileIndex);return!p||p.pathsData.length===0?"":`
            <div class="combined-preview-file">
              <h3>${H(p.fileName)}</h3>
              <div class="preview-container">
                <div id="${p.previewId}"></div>
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
    `,nt=`
      <div class="shape-nav">
        <h3>Shapes</h3>
        <ul class="shape-nav-list">
          ${ie.map((u,p)=>`
            <li>
              <button class="shape-nav-link" data-target="shape-section-${p}">${H(u)}</button>
            </li>
          `).join("")}
        </ul>
      </div>
    `;oe.innerHTML=nt+we+Se+Je+et+tt+M,n?x.forEach(u=>{const p=Z.get(u.fileIndex);!p||p.pathsData.length===0||ze(p.pathsData,p.shapeIds,p.previewId,p.shapes)}):ze(V,N,"preview-all",A),V.forEach((u,p)=>{pt(u,`preview-${p}`,A[p],b)}),xe=Pt(),oe.querySelectorAll(".download-btn[data-code-key]").forEach(u=>{u.addEventListener("click",()=>{const p=u.dataset.codeKey,S=u.dataset.filename;if(!p||!S)return;const k=ce[p];if(!k)return;const D=new Blob([k],{type:"text/plain"}),z=URL.createObjectURL(D),J=document.createElement("a");J.href=z,J.download=S,J.click(),URL.revokeObjectURL(z);const ot=u.textContent;u.textContent="Downloaded!",setTimeout(()=>{u.textContent=ot},2e3)})}),oe.querySelectorAll(".copy-btn").forEach(u=>{u.addEventListener("click",async p=>{const S=p.currentTarget;if(S.dataset.copying==="1")return;const k=S.dataset.codeKey;let D="";if(k?D=ce[k]||"":D=S.closest(".path-section")?.querySelector("code")?.textContent||"",!D){je(S,"No code");return}S.dataset.copying="1";let z=!1;try{z=await Nt(D)}finally{S.dataset.copying="0"}je(S,z?"Copied!":"Copy failed")})})}function Pt(){const e=Array.from(oe.querySelectorAll(".shape-nav-link"));if(e.length===0)return()=>{};const t=e.map(l=>{const a=l.dataset.target;return a?document.getElementById(a):null}).filter(l=>l!==null);if(t.length===0)return()=>{};const n=l=>{e.forEach(a=>{a.classList.toggle("is-active",a.dataset.target===l.id)})},s=()=>{const l=window.innerHeight/2;let a=t[0],c=Number.POSITIVE_INFINITY;t.forEach(I=>{const E=I.getBoundingClientRect(),T=E.top+E.height/2,b=Math.abs(T-l);b<c&&(c=b,a=I)}),n(a)},o=l=>{const c=l.currentTarget.dataset.target;if(!c)return;const I=document.getElementById(c);I&&I.scrollIntoView({behavior:"smooth",block:"center"})};e.forEach(l=>{l.addEventListener("click",o)});let i=!1;const r=()=>{i||(i=!0,window.requestAnimationFrame(()=>{i=!1,s()}))};return window.addEventListener("scroll",r,{passive:!0}),window.addEventListener("resize",r),s(),()=>{e.forEach(l=>{l.removeEventListener("click",o)}),window.removeEventListener("scroll",r),window.removeEventListener("resize",r)}}
