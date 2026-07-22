(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();function Ce(e){const t=[],n=/([MLHVCSQTAZmlhvcsqtaz])\s*([^MLHVCSQTAZmlhvcsqtaz]*)/g;let s,o=0,i=0,r=0,l=0,a="",c=null,w=null;const T=()=>{c=null,w=null},E=S=>{const g=/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g;return(S.match(g)||[]).map(Number)};for(;(s=n.exec(e))!==null;){const S=s[1],g=S===S.toLowerCase(),v=S.toUpperCase(),d=E(s[2]);if(v==="M"){for(let f=0;f+1<d.length;f+=2){const h=g?o+d[f]:d[f],C=g?i+d[f+1]:d[f+1];f===0?(t.push({type:"M",x:h,y:C}),r=h,l=C):t.push({type:"L",x:h,y:C}),o=h,i=C}T(),a=d.length>2?"L":"M"}else if(v==="L"){for(let f=0;f+1<d.length;f+=2){const h=g?o+d[f]:d[f],C=g?i+d[f+1]:d[f+1];t.push({type:"L",x:h,y:C}),o=h,i=C}T(),a="L"}else if(v==="H"){for(let f=0;f<d.length;f++){const h=g?o+d[f]:d[f];t.push({type:"L",x:h,y:i}),o=h}T(),a="L"}else if(v==="V"){for(let f=0;f<d.length;f++){const h=g?i+d[f]:d[f];t.push({type:"L",x:o,y:h}),i=h}T(),a="L"}else if(v==="C")for(let f=0;f+5<d.length;f+=6){const h=g?o+d[f]:d[f],C=g?i+d[f+1]:d[f+1],p=g?o+d[f+2]:d[f+2],m=g?i+d[f+3]:d[f+3],$=g?o+d[f+4]:d[f+4],y=g?i+d[f+5]:d[f+5];t.push({type:"C",x1:h,y1:C,x2:p,y2:m,x:$,y}),o=$,i=y,c=p,w=m,a="C"}else if(v==="S")for(let f=0;f+3<d.length;f+=4){let h=o,C=i;(a==="C"||a==="S")&&c!==null&&w!==null&&(h=o*2-c,C=i*2-w);const p=g?o+d[f]:d[f],m=g?i+d[f+1]:d[f+1],$=g?o+d[f+2]:d[f+2],y=g?i+d[f+3]:d[f+3];t.push({type:"C",x1:h,y1:C,x2:p,y2:m,x:$,y}),o=$,i=y,c=p,w=m,a="S"}else v==="Z"?(t.push({type:"Z"}),o=r,i=l,T(),a="Z"):(T(),a=v)}return t}function q(e){let t="",n=e;for(;n>=0;)t=String.fromCharCode(65+n%26)+t,n=Math.floor(n/26)-1;return t}function R(e,t,n){const s=(e*t).toFixed(n);return parseFloat(s).toString()}function Ie(e,t){if(!t)return"";const{vectorFormat:n,language:s,coordMultiplier:o,precision:i}=e,r=c=>R(c,o,i);if(n==="Processing")return`// Source file bounds from generated vertices
float fileMinX = ${r(t.minX)};
float fileMinY = ${r(t.minY)};
float fileMaxX = ${r(t.maxX)};
float fileMaxY = ${r(t.maxY)};
float fileWidth = ${r(t.width)};
float fileHeight = ${r(t.height)};
float fileCenterX = ${r(t.centerX)};
float fileCenterY = ${r(t.centerY)};`;const l=s==="typescript"?": number":"";return`// Source file bounds from generated vertices
${s==="typescript"?"export ":""}const fileMinX${l} = ${r(t.minX)},
	fileMinY${l} = ${r(t.minY)},
	fileMaxX${l} = ${r(t.maxX)},
	fileMaxY${l} = ${r(t.maxY)},
	fileWidth${l} = ${r(t.width)},
	fileHeight${l} = ${r(t.height)},
	fileCenterX${l} = ${r(t.centerX)},
	fileCenterY${l} = ${r(t.centerY)};`}function Ye(){return`	// Uncomment to center around the source file bounds.
	// x -= fileCenterX;
	// y -= fileCenterY;`}function rt(){return`	// Uncomment to center around the source file bounds.
	// const [x, y] = transform.transform(v.x - fileCenterX, v.y - fileCenterY);`}function Be(e,t){const{vectorFormat:n,language:s,processingVector:o="PVector",instanceMode:i=!1}=e,r=s==="typescript",l=n==="Processing",a=l&&o==="Vec2D",c=i&&n==="createVector";if(l){const d=a?"Vec2D":"PVector",f=a?`import toxi.geom.*;

`:"",h=Ie(e,t),C=Ye();return`${f}${h?h+`

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

${d} applyTransform(${d} v) {
	float x = v.x + transformConfig.preTranslateX;
	float y = v.y + transformConfig.preTranslateY;

${C}

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

	return new ${d}(x, y);
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
}`}if(n==="Vec"){const d=Ie(e,t),f=rt(),h=r?"export ":"",C=r?`: {
	preTranslateX: number;
	preTranslateY: number;
	scaleX: number;
	scaleY: number;
	rotation: number;
	translateX: number;
	translateY: number;
}`:"";return`${d?d+`

`:""}// Transform configuration
${h}const transformConfig${C} = {
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

${h}const transform = Matrix2D.fromTransform(transformConfig);

${h}function applyTransform(v${r?": Vec":""})${r?": Vec":""} {
${f}
	const [x, y] = transform.transform(v.x, v.y);
	return new Vec(x, y);
}

${h}function applyTransformScalar(value${r?": number":""}, axis${r?": 'x' | 'y' | 'avg'":""} = 'avg')${r?": number":""} {
	if (axis === 'x') {
		return value * transformConfig.scaleX;
	}
	if (axis === 'y') {
		return value * transformConfig.scaleY;
	}
	return value * ((Math.abs(transformConfig.scaleX) + Math.abs(transformConfig.scaleY)) * 0.5);
}`}const w=c?"p.createVector":"createVector",T=r?"p5.Vector":"",E=c?r?"p: any":"p":"",S=Ie(e,t),g=Ye(),v=r?"export ":"";return`${S?S+`

`:""}// Transform configuration
${v}const transformConfig${r?`: {
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

${v}function applyTransform(${E?E+", ":""}v${r?`: ${T}`:""})${r?`: ${T}`:""} {
	let x = v.x + transformConfig.preTranslateX;
	let y = v.y + transformConfig.preTranslateY;

${g}

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

	return ${w}(x, y);
}

${v}function applyTransformScalar(value${r?": number":""}, axis${r?": 'x' | 'y' | 'avg'":""} = 'avg')${r?": number":""} {
	if (axis === 'x') {
		return value * transformConfig.scaleX;
	}
	if (axis === 'y') {
		return value * transformConfig.scaleY;
	}
	return value * ((Math.abs(transformConfig.scaleX) + Math.abs(transformConfig.scaleY)) * 0.5);
}`}function st(e,t){return Be(e,t)}function at(e,t){const{vectorFormat:n,language:s,instanceMode:o=!1}=t,i=s==="typescript",r=n==="Processing",l=o&&(n==="createVector"||n==="Vec");return r?`void ${e}() {`:`${i?"export ":""}function ${e}(${l?i?"p: any":"p":""})${i?": void":""} {`}function Me(e){const{vectorFormat:t,instanceMode:n=!1}=e;return n&&(t==="createVector"||t==="Vec")?"p.":""}function He(e,t){return`${Me(t)}${e}`}function re(e){const{vectorFormat:t,processingVector:n="PVector",language:s}=e;return t==="Processing"?n==="Vec2D"?"Vec2D":"PVector":t==="Vec"?"Vec":s==="typescript"?"p5.Vector":""}function ee(e,t){if(e.length===0)return[];if(t.vectorFormat==="Processing")return[`${re(t)} ${e.join(", ")};`];const n=t.language==="typescript"?`: ${re(t)}`:"";return[`let ${e.map(s=>`${s}${n}`).join(", ")};`]}function te(e,t){return t.vectorFormat==="Processing"?`${re(t)}[] ${e} = new ${re(t)}[0];`:t.language==="typescript"?`let ${e}: ${re(t)}[] = [];`:`let ${e} = [];`}function ne(e,t,n){return n.vectorFormat==="Processing"?`${e} = new ${re(n)}[] { ${t.join(", ")} };`:`${e} = [${t.join(", ")}];`}function ke(e){return e.map(t=>`	${t}`).join(`
`)}function Le(){return{minX:Number.POSITIVE_INFINITY,minY:Number.POSITIVE_INFINITY,maxX:Number.NEGATIVE_INFINITY,maxY:Number.NEGATIVE_INFINITY}}function le(e,t,n){e.minX=Math.min(e.minX,t),e.minY=Math.min(e.minY,n),e.maxX=Math.max(e.maxX,t),e.maxY=Math.max(e.maxY,n)}function it(e){return Number.isFinite(e.minX)&&Number.isFinite(e.minY)&&Number.isFinite(e.maxX)&&Number.isFinite(e.maxY)}function ct(e){const t=[];let n=[],s=!1,o=Le();const i=()=>{if(n.length===0)return;const r=it(o)?{...o}:{minX:0,minY:0,maxX:0,maxY:0};t.push({commands:n,closed:s,bounds:r}),n=[],s=!1,o=Le()};return e.forEach(r=>{if(r.type==="M"){i(),n.push(r),le(o,r.x,r.y);return}if(r.type==="L"){n.length===0&&n.push({type:"M",x:r.x,y:r.y}),n.push(r),le(o,r.x,r.y);return}if(r.type==="C"){if(n.length===0)return;n.push(r),le(o,r.x1,r.y1),le(o,r.x2,r.y2),le(o,r.x,r.y);return}r.type==="Z"&&(s=!0,i())}),i(),t}function Ae(e,t){return e.bounds.minX>=t.minX-1e-6&&e.bounds.maxX<=t.maxX+1e-6&&e.bounds.minY>=t.minY-1e-6&&e.bounds.maxY<=t.maxY+1e-6}function lt(e,t,n,s,o,i,r,l){const a=t.vectorFormat==="Processing",c=Me(t),w=p=>R(p,n,s),T=[],E=[],S=[],g=[],v="'x'",d="'y'",f=a?"'a'":"'avg'",h=(p,m,$)=>{const y=`${r}_${p}`,b=`${i}${o}(${w(m)}, ${w($)}))`;return E.push(y),T.push(`${y} = ${b};`),y},C=(p,m,$)=>{const y=`applyTransformScalar(${w(m)}, ${$})`;a?S.push(`float ${p} = ${y};`):S.push(`const ${p} = ${y};`)};if(e.kind==="line"){if(e.x1==null||e.y1==null||e.x2==null||e.y2==null)return null;const p=h("p1",e.x1,e.y1),m=h("p2",e.x2,e.y2);return g.push(`${c}line(${p}.x, ${p}.y, ${m}.x, ${m}.y);`),{globalCode:[...ee(E,t),te(l,t)].join(`
`),assignments:[...T,ne(l,E,t)],localDeclarations:S,drawCalls:g}}if(e.kind==="polyline"||e.kind==="polygon"){const p=e.points||[];return p.length<2?null:(p.forEach(([m,$],y)=>{h(q(y),m,$)}),g.push(`${c}beginShape();`),E.forEach(m=>{g.push(`${c}vertex(${m}.x, ${m}.y);`)}),g.push(`${c}endShape(${He(e.kind==="polygon"?"CLOSE":"OPEN",t)});`),{globalCode:[...ee(E,t),te(l,t)].join(`
`),assignments:[...T,ne(l,E,t)],localDeclarations:S,drawCalls:g})}if(e.kind==="rect"){if(e.x==null||e.y==null||e.width==null||e.height==null)return null;const p=h("rectPos",e.x,e.y);C("rectW",e.width,v),C("rectH",e.height,d);const m=e.rx||0,$=e.ry||0;if(m>0||$>0){if(Math.abs(m-$)>1e-9)return null;C("rectR",m,f),g.push(`${c}rect(${p}.x, ${p}.y, rectW, rectH, rectR);`)}else g.push(`${c}rect(${p}.x, ${p}.y, rectW, rectH);`);return{globalCode:[...ee(E,t),te(l,t)].join(`
`),assignments:[...T,ne(l,E,t)],localDeclarations:S,drawCalls:g}}if(e.kind==="circle"){if(e.cx==null||e.cy==null||e.r==null)return null;const p=h("circleCenter",e.cx,e.cy);return C("circleDiameter",e.r*2,f),g.push(`${c}circle(${p}.x, ${p}.y, circleDiameter);`),{globalCode:[...ee(E,t),te(l,t)].join(`
`),assignments:[...T,ne(l,E,t)],localDeclarations:S,drawCalls:g}}if(e.kind==="ellipse"){if(e.cx==null||e.cy==null||e.rx==null||e.ry==null)return null;const p=h("ellipseCenter",e.cx,e.cy);return C("ellipseW",e.rx*2,v),C("ellipseH",e.ry*2,d),g.push(`${c}ellipse(${p}.x, ${p}.y, ellipseW, ellipseH);`),{globalCode:[...ee(E,t),te(l,t)].join(`
`),assignments:[...T,ne(l,E,t)],localDeclarations:S,drawCalls:g}}return null}function ut(e,t,n,s,o){const{vectorFormat:i,coordMultiplier:r,precision:l,processingVector:a="PVector",instanceMode:c=!1}=t,w=i==="Processing",T=w&&a==="Vec2D",E=c&&(i==="createVector"||i==="Vec"),S=o||`drawPath${n+1}`,g=w?T?"new Vec2D":"new PVector":i==="Vec"?"new Vec":c&&i==="createVector"?"p.createVector":"createVector",v=E&&i==="createVector"?"applyTransform(p, ":"applyTransform(",d=Be(t),f=at(S,t),h=Me(t),C=`${S}Points`;if(s?.primitive){const M=lt(s.primitive,t,r,l,g,v,S,C);if(M){const X=[...M.assignments,...M.localDeclarations,...M.drawCalls],Y=`${f}
${ke(X)}
}`;return{sharedCode:d,globalCode:M.globalCode,pathCode:Y}}}const p=Ce(e),m=ct(p);let $=0;const y=[],b=[],F=M=>{const X=[];return M.commands.forEach(Y=>{if(Y.type==="M"||Y.type==="L"){const B=`${S}_${q($)}`,O=R(Y.x,r,l),_=R(Y.y,r,l);y.push(B),b.push(`${B} = ${v}${g}(${O}, ${_}));`),X.push(`${h}vertex(${B}.x, ${B}.y);`),$++;return}if(Y.type==="C"){const B=`${S}_${q($-1)}`,O=`${S}_${q($)}`,_=B+"c",K="c"+O,ge=R(Y.x1,r,l),me=R(Y.y1,r,l),Q=R(Y.x2,r,l),ce=R(Y.y2,r,l),we=R(Y.x,r,l),Se=R(Y.y,r,l);y.push(_,K,O),b.push(`${_} = ${v}${g}(${ge}, ${me}));`),b.push(`${K} = ${v}${g}(${Q}, ${ce}));`),b.push(`${O} = ${v}${g}(${we}, ${Se}));`),X.push(`${h}bezierVertex(${_}.x, ${_}.y, ${K}.x, ${K}.y, ${O}.x, ${O}.y);`),$++}}),X};let N=[],V=!1,P=null,A=0;const Z=[],ae=()=>{N.length!==0&&(Z.push([`${h}beginShape();`,...N,`${h}endShape(${He(V?"CLOSE":"OPEN",t)});`].join(`
`)),N=[],V=!1,P=null,A=0)};m.forEach(M=>{const X=F(M);if(X.length===0)return;if(N.length===0){N=X,V=M.closed,P=M.bounds,A=0;return}if(P!==null&&Ae(M,P)){V=!0,N.push(`${h}beginContour();`),N.push(...X),N.push(`${h}endContour();`),A++;return}if(P!==null&&A===0&&Ae({bounds:P},M.bounds)){const O=[...N];V=!0,P=M.bounds,N=[...X,`${h}beginContour();`,...O,`${h}endContour();`],A=1;return}ae(),N=X,V=M.closed,P=M.bounds,A=0}),ae();const fe=[...ee(y,t),te(C,t)],ie=Z.map(M=>M.split(`
`).map(X=>`	${X}`).join(`
`)).join(`

`),G=[...b,ne(C,y,t)],de=G.length>0?`${ke(G)}

`:"",be=ie?`${ie}
`:"",he=`${f}
${de}${be}}`;return{sharedCode:d,globalCode:fe.join(`
`),pathCode:he}}function pe(e,t,n="drawAllPaths"){const{vectorFormat:s,language:o,instanceMode:i=!1}=t,r=o==="typescript",l=s==="Processing",a=i&&(s==="createVector"||s==="Vec"),c=e.map(w=>l?`	${w}();`:a?`	${w}(p);`:`	${w}();`).join(`
`);return l?`
void ${n}() {
${c}
}`:`
${r?"export ":""}function ${n}(${a?r?"p: any":"p":""})${r?": void":""} {
${c}
}`}function H(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function Xe(){return{minX:Number.POSITIVE_INFINITY,minY:Number.POSITIVE_INFINITY,maxX:Number.NEGATIVE_INFINITY,maxY:Number.NEGATIVE_INFINITY}}function ue(e,t,n){e.minX=Math.min(e.minX,t),e.minY=Math.min(e.minY,n),e.maxX=Math.max(e.maxX,t),e.maxY=Math.max(e.maxY,n)}function ft(e){return Number.isFinite(e.minX)&&Number.isFinite(e.minY)&&Number.isFinite(e.maxX)&&Number.isFinite(e.maxY)}function dt(e){const t=[];let n=[],s=!1,o=Xe();const i=()=>{if(n.length===0)return;const r=ft(o)?{...o}:{minX:0,minY:0,maxX:0,maxY:0};t.push({commands:n,closed:s,bounds:r}),n=[],s=!1,o=Xe()};return e.forEach(r=>{if(r.type==="M"){i(),n.push(r),ue(o,r.x,r.y);return}if(r.type==="L"){n.length===0&&n.push({type:"M",x:r.x,y:r.y}),n.push(r),ue(o,r.x,r.y);return}if(r.type==="C"){if(n.length===0)return;n.push(r),ue(o,r.x1,r.y1),ue(o,r.x2,r.y2),ue(o,r.x,r.y);return}r.type==="Z"&&(s=!0,i())}),i(),t}function De(e,t){return e.bounds.minX>=t.minX-1e-6&&e.bounds.maxX<=t.maxX+1e-6&&e.bounds.minY>=t.minY-1e-6&&e.bounds.maxY<=t.maxY+1e-6}function Ve(e,t,n){t.commands.forEach(s=>{if(s.type==="M"||s.type==="L"){const o=n(s.x,s.y);e.vertex(o.x,o.y);return}if(s.type==="C"){const o=n(s.x1,s.y1),i=n(s.x2,s.y2),r=n(s.x,s.y);e.bezierVertex(o.x,o.y,i.x,i.y,r.x,r.y)}})}function Re(e,t,n){const s=dt(t).filter(l=>l.commands.length>0);if(s.length===0)return;const o=[];let i=null;const r=()=>{i&&(o.push(i),i=null)};s.forEach(l=>{if(!i){i={host:l,contours:[],closed:l.closed};return}if(De(l,i.host.bounds)){i.contours.push(l),i.closed=!0;return}if(i.contours.length===0&&De(i.host,l.bounds)){i={host:l,contours:[i.host],closed:!0};return}r(),i={host:l,contours:[],closed:l.closed}}),r(),o.forEach(l=>{e.beginShape(),Ve(e,l.host,n),l.contours.forEach(a=>{e.beginContour(),Ve(e,a,n),e.endContour()}),e.endShape(l.closed?e.CLOSE:e.OPEN)})}function Ne(e){const t=[];let n=0;return e.forEach(s=>{if(s.type==="M"||s.type==="L"){const o=q(n);t.push({name:o,x:s.x,y:s.y}),n++}else if(s.type==="C"){const o=q(n-1),i=q(n),r=o+"c",l="c"+i;t.push({name:r,x:s.x1,y:s.y1}),t.push({name:l,x:s.x2,y:s.y2}),t.push({name:i,x:s.x,y:s.y}),n++}}),t}function We(e){const t=e.map(l=>l.x),n=e.map(l=>l.y),s=Math.min(...t),o=Math.min(...n),i=Math.max(...t),r=Math.max(...n);return{minX:s,minY:o,maxX:i,maxY:r,width:i-s,height:r-o}}function ye(e){if(e.length===0)return null;const t=e.reduce((n,s)=>({x:n.x+s.x,y:n.y+s.y}),{x:0,y:0});return{x:t.x/e.length,y:t.y/e.length}}function ht(e){if(e.length<3)return ye(e.map(([o,i])=>({x:o,y:i})));let t=0,n=0,s=0;for(let o=0;o<e.length;o++){const[i,r]=e[o],[l,a]=e[(o+1)%e.length],c=i*a-l*r;t+=c,n+=(i+l)*c,s+=(r+a)*c}return Math.abs(t)<1e-9?ye(e.map(([o,i])=>({x:o,y:i}))):{x:n/(3*t),y:s/(3*t)}}function qe(e){if(!e)return null;if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?null:{x:(e.x1+e.x2)/2,y:(e.y1+e.y2)/2};if(e.kind==="polyline"){const t=e.points||[];return ye(t.map(([n,s])=>({x:n,y:s})))}return e.kind==="polygon"?ht(e.points||[]):e.kind==="rect"?e.x==null||e.y==null||e.width==null||e.height==null?null:{x:e.x+e.width/2,y:e.y+e.height/2}:e.kind==="circle"?e.cx==null||e.cy==null?null:{x:e.cx,y:e.cy}:e.kind==="ellipse"?e.cx==null||e.cy==null?null:{x:e.cx,y:e.cy}:null}function gt(e){return e?e.kind==="line"?"midpoint":e.kind==="polyline"||e.kind==="polygon"?"centroid":"center":"reference"}function mt(e){if(!e)return[];if(e.kind==="line")return e.x1==null||e.y1==null||e.x2==null||e.y2==null?[]:[{point:{x:e.x1,y:e.y1},label:"start"},{point:{x:e.x2,y:e.y2},label:"end"}];if(e.kind==="polyline"||e.kind==="polygon")return(e.points||[]).map(([n,s],o)=>({point:{x:n,y:s},label:q(o)}));const t=qe(e);return t?[{point:t,label:gt(e)}]:[]}function pt(e,t,n,s=!0){const o=Ce(e),i=Ne(o),r=mt(n?.primitive),l=!!n?.primitive;if(i.length===0)return;const a=We(i);new window.p5(c=>{const S=a.width>0?440/a.width:1,g=a.height>0?440/a.height:1,v=Math.min(S,g),d=a.width*v,f=a.height*v,h=(500-d)/2-a.minX*v,C=(500-f)/2-a.minY*v;c.setup=()=>{c.createCanvas(500,500),c.noLoop()},c.draw=()=>{c.background(30);const p=($,y)=>({x:$*v+h,y:y*v+C});c.stroke(60),c.strokeWeight(1);for(let $=0;$<=500;$+=50)c.line($,0,$,500),c.line(0,$,500,$);const m=p(0,0);if(c.stroke(255,100,100),c.strokeWeight(2),c.line(0,m.y,500,m.y),c.stroke(100,255,100),c.strokeWeight(2),c.line(m.x,0,m.x,500),c.noStroke(),c.fill(255,200,0),c.circle(m.x,m.y,12),c.fill(255),c.textAlign(c.LEFT,c.BOTTOM),c.textSize(14),c.textStyle(c.BOLD),c.text("(0, 0)",m.x+8,m.y-8),c.fill(100,150,255,50),c.stroke(100,150,255),c.strokeWeight(2),Re(c,o,p),l&&r.length>0)r.forEach(({point:$,label:y,isControlPoint:b})=>{const F=p($.x,$.y);c.noStroke(),b?(c.fill(255,200,100),c.circle(F.x,F.y,8)):(c.fill(100,255,150),c.circle(F.x,F.y,10)),c.fill(255),c.textAlign(c.CENTER,c.CENTER),c.textSize(12),c.textStyle(c.BOLD),c.text(y,F.x,F.y-16),s&&(c.textSize(9),c.textStyle(c.NORMAL),c.fill(200),c.text(`(${$.x.toFixed(1)}, ${$.y.toFixed(1)})`,F.x,F.y+16))});else{c.stroke(255,200,100,100),c.strokeWeight(1);let $=0;o.forEach(y=>{if(y.type==="C"){const b=i.find(P=>P.name===String.fromCharCode(65+$-1)),F=i.find(P=>P.name===b?.name+"c"),N=i.find(P=>P.name==="c"+String.fromCharCode(65+$)),V=i.find(P=>P.name===String.fromCharCode(65+$));if(b&&F){const P=p(b.x,b.y),A=p(F.x,F.y);c.line(P.x,P.y,A.x,A.y)}if(N&&V){const P=p(N.x,N.y),A=p(V.x,V.y);c.line(P.x,P.y,A.x,A.y)}$++}else(y.type==="M"||y.type==="L")&&$++}),i.forEach(y=>{const b=p(y.x,y.y),F=y.name.includes("c");c.noStroke(),F?(c.fill(255,200,100),c.circle(b.x,b.y,8)):(c.fill(100,255,150),c.circle(b.x,b.y,10)),c.fill(255),c.noStroke(),c.textAlign(c.CENTER,c.CENTER),c.textSize(12),c.textStyle(c.BOLD);const N=15;c.text(y.name,b.x,b.y-N),s&&(c.textSize(9),c.textStyle(c.NORMAL),c.fill(200),c.text(`(${y.x.toFixed(1)}, ${y.y.toFixed(1)})`,b.x,b.y+N+3))})}c.fill(200),c.noStroke(),c.textAlign(c.LEFT,c.TOP),c.textSize(11),c.text(`Scale: ${v.toFixed(3)}x`,10,10),c.text(`Size: ${a.width.toFixed(1)} × ${a.height.toFixed(1)}`,10,25)}},t)}function ze(e,t,n,s=[]){const o=e.map((a,c)=>({id:t[c]??c+1,commands:Ce(a),primitive:s[c]?.primitive})).filter(a=>a.commands.length>0),i=o.flatMap(a=>Ne(a.commands));if(i.length===0)return;const r=We(i),l=o.map(()=>{const a=80+Math.floor(Math.random()*176),c=80+Math.floor(Math.random()*176),w=80+Math.floor(Math.random()*176);return{stroke:[a,c,w]}});new window.p5(a=>{const E=r.width>0?440/r.width:1,S=r.height>0?440/r.height:1,g=Math.min(E,S),v=r.width*g,d=r.height*g,f=(500-v)/2-r.minX*g,h=(500-d)/2-r.minY*g,C=(p,m)=>({x:p*g+f,y:m*g+h});a.setup=()=>{a.createCanvas(500,500),a.noLoop()},a.draw=()=>{a.background(30),a.stroke(60),a.strokeWeight(1);for(let m=0;m<=500;m+=50)a.line(m,0,m,500),a.line(0,m,500,m);const p=C(0,0);a.stroke(255,100,100),a.strokeWeight(2),a.line(0,p.y,500,p.y),a.stroke(100,255,100),a.strokeWeight(2),a.line(p.x,0,p.x,500),a.noStroke(),a.fill(255,200,0),a.circle(p.x,p.y,10),o.forEach((m,$)=>{const y=m.commands,b=l[$];a.noFill(),a.stroke(b.stroke[0],b.stroke[1],b.stroke[2]),a.strokeWeight(2),Re(a,y,C)}),a.noStroke(),a.fill(255),a.textAlign(a.CENTER,a.CENTER),a.textSize(11),a.textStyle(a.BOLD),o.forEach(m=>{const $=qe(m.primitive),y=ye(Ne(m.commands).map(N=>({x:N.x,y:N.y}))),b=$??y;if(!b)return;const F=C(b.x,b.y);a.text(String(m.id),F.x,F.y)}),a.fill(200),a.noStroke(),a.textAlign(a.LEFT,a.TOP),a.textSize(11),a.text(`Paths: ${o.length}`,10,10),a.text(`Scale: ${g.toFixed(3)}x`,10,25),a.text(`Size: ${r.width.toFixed(1)} x ${r.height.toFixed(1)}`,10,40)}},n)}const ve=.5522847498307936;function L(e,t=0){if(e==null)return t;const n=Number.parseFloat(e);return Number.isFinite(n)?n:t}function xt(e){if(!e)return[];const t=/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g,n=(e.match(t)||[]).map(Number),s=[];for(let o=0;o+1<n.length;o+=2)s.push([n[o],n[o+1]]);return s}function $t(e){const t=L(e.getAttribute("x1"),0),n=L(e.getAttribute("y1"),0),s=L(e.getAttribute("x2"),0),o=L(e.getAttribute("y2"),0);return{pathData:`M ${t} ${n} L ${s} ${o}`,sourceIndex:0,primitive:{kind:"line",x1:t,y1:n,x2:s,y2:o}}}function _e(e,t){const n=xt(e.getAttribute("points"));if(n.length<2)return null;const[s,o]=n[0],i=n.slice(1).map(([r,l])=>`L ${r} ${l}`).join(" ");return{pathData:`M ${s} ${o} ${i}${t?" Z":""}`,sourceIndex:0,primitive:{kind:t?"polygon":"polyline",points:n}}}function yt(e,t,n,s,o,i){if(o===0||i===0)return`M ${e} ${t} L ${e+n} ${t} L ${e+n} ${t+s} L ${e} ${t+s} Z`;const r=o*ve,l=i*ve,a=e+n,c=t+s;return[`M ${e+o} ${t}`,`L ${a-o} ${t}`,`C ${a-o+r} ${t} ${a} ${t+i-l} ${a} ${t+i}`,`L ${a} ${c-i}`,`C ${a} ${c-i+l} ${a-o+r} ${c} ${a-o} ${c}`,`L ${e+o} ${c}`,`C ${e+o-r} ${c} ${e} ${c-i+l} ${e} ${c-i}`,`L ${e} ${t+i}`,`C ${e} ${t+i-l} ${e+o-r} ${t} ${e+o} ${t}`,"Z"].join(" ")}function vt(e){const t=L(e.getAttribute("x"),0),n=L(e.getAttribute("y"),0),s=L(e.getAttribute("width"),0),o=L(e.getAttribute("height"),0);if(s<=0||o<=0)return null;const i=e.getAttribute("rx"),r=e.getAttribute("ry");let l=L(i,0),a=L(r,0);return i!=null&&r==null&&(a=l),r!=null&&i==null&&(l=a),l=Math.max(0,Math.min(l,s/2)),a=Math.max(0,Math.min(a,o/2)),{pathData:yt(t,n,s,o,l,a),sourceIndex:0,primitive:{kind:"rect",x:t,y:n,width:s,height:o,rx:l,ry:a}}}function Ze(e,t,n,s){const o=n*ve,i=s*ve;return[`M ${e+n} ${t}`,`C ${e+n} ${t+i} ${e+o} ${t+s} ${e} ${t+s}`,`C ${e-o} ${t+s} ${e-n} ${t+i} ${e-n} ${t}`,`C ${e-n} ${t-i} ${e-o} ${t-s} ${e} ${t-s}`,`C ${e+o} ${t-s} ${e+n} ${t-i} ${e+n} ${t}`,"Z"].join(" ")}function Ct(e){const t=L(e.getAttribute("cx"),0),n=L(e.getAttribute("cy"),0),s=L(e.getAttribute("r"),0);return s<=0?null:{pathData:Ze(t,n,s,s),sourceIndex:0,primitive:{kind:"circle",cx:t,cy:n,r:s}}}function bt(e){const t=L(e.getAttribute("cx"),0),n=L(e.getAttribute("cy"),0),s=L(e.getAttribute("rx"),0),o=L(e.getAttribute("ry"),0);return s<=0||o<=0?null:{pathData:Ze(t,n,s,o),sourceIndex:0,primitive:{kind:"ellipse",cx:t,cy:n,rx:s,ry:o}}}function wt(e){const n=Array.from(e.querySelectorAll("path,rect,circle,ellipse,line,polyline,polygon")),s=[];return n.forEach((o,i)=>{const r=i+1,l=o.tagName.toLowerCase();if(l==="path"){const c=o.getAttribute("d");c&&s.push({pathData:c,sourceIndex:r});return}let a=null;l==="line"?a=$t(o):l==="polyline"?a=_e(o,!1):l==="polygon"?a=_e(o,!0):l==="rect"?a=vt(o):l==="circle"?a=Ct(o):l==="ellipse"&&(a=bt(o)),a&&(a.sourceIndex=r,s.push(a))}),s}const U=document.getElementById("dropZone"),Ge=document.getElementById("fileInput"),W=document.getElementById("functionPrefix"),oe=document.getElementById("output");let j=[],xe=null,Ee=0;function Ke(e){const t=e.lastIndexOf(".");return t<=0?e:e.slice(0,t)}function Fe(e){const t=e.trim().replace(/[^a-zA-Z0-9_]/g,"_").replace(/_+/g,"_").replace(/^_+|_+$/g,"");return t.length===0?"shape":/^[a-zA-Z_]/.test(t)?t:`_${t}`}function Oe(e){return Fe(e)}function St(e){const t=new Set,n=new Map;return e.map(s=>{if(!t.has(s))return t.add(s),n.set(s,1),s;let o=(n.get(s)||1)+1,i=`${s}_${o}`;for(;t.has(i);)o+=1,i=`${s}_${o}`;return n.set(s,o),t.add(i),i})}function It(e,t,n){return Fe(`${e}_${t||"path"}${n}`)}function Et(e){return Fe(`${e}_drawAllPaths`)}function Te(e){const t=Ke(e.name).trim();return t.length>0?t:"shape"}function Tt(e,t){const n=Ke(e).trim();if(t==="pde"){const o=n.replace(/[^a-zA-Z0-9_]/g,"_").replace(/_+/g,"_").replace(/^_+|_+$/g,"");return o.length===0?"drawing":/^[0-9]/.test(o)?`svg${o}`:o}const s=n.replace(/[^a-zA-Z0-9._-]/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"");return s.length>0?s:"drawing"}function $e(e,t){if(t==="pde"){const n=e.replace(/[^a-zA-Z0-9_]/g,"_").replace(/_+/g,"_").replace(/^_+|_+$/g,""),s=n.length>0?n:"drawing";return`${/^[0-9]/.test(s)?`svg${s}`:s}.pde`}return`${e}.${t}`}async function Pt(e){if(!e)return!1;if(typeof navigator<"u"&&navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.top="0",t.style.left="-9999px",t.style.opacity="0",t.style.pointerEvents="none",document.body.appendChild(t),t.focus(),t.select(),t.setSelectionRange(0,t.value.length);let n=!1;try{n=document.execCommand("copy")}catch{n=!1}return document.body.removeChild(t),n}const Pe=new WeakMap;function Nt(e){const t=e.dataset.baseLabel;if(t!==void 0)return t;const n=e.textContent||"";return e.dataset.baseLabel=n,n}function je(e,t,n=2e3){const s=Nt(e),o=Pe.get(e);o!==void 0&&window.clearTimeout(o),e.textContent=t;const i=window.setTimeout(()=>{e.textContent=s,Pe.delete(e)},n);Pe.set(e,i)}function Ue(e){return e.type==="image/svg+xml"||e.name.toLowerCase().endsWith(".svg")}function Qe(e){return Array.from(e).filter(Ue)}function Mt(e){let t=Number.POSITIVE_INFINITY,n=Number.POSITIVE_INFINITY,s=Number.NEGATIVE_INFINITY,o=Number.NEGATIVE_INFINITY;const i=(r,l)=>{t=Math.min(t,r),n=Math.min(n,l),s=Math.max(s,r),o=Math.max(o,l)};return e.forEach(r=>{Ce(r.pathData).forEach(a=>{if(a.type==="M"||a.type==="L"){i(a.x,a.y);return}a.type==="C"&&(i(a.x1,a.y1),i(a.x2,a.y2),i(a.x,a.y))})}),!Number.isFinite(t)||!Number.isFinite(n)||!Number.isFinite(s)||!Number.isFinite(o)?null:{minX:t,minY:n,maxX:s,maxY:o,width:s-t,height:o-n,centerX:(t+s)/2,centerY:(n+o)/2}}U.addEventListener("click",()=>Ge.click());document.querySelectorAll('input[name="vectorFormat"]').forEach(e=>{e.addEventListener("change",t=>{const n=t.target,s=document.getElementById("processingVectorOption"),o=document.getElementById("instanceModeOption");s&&(s.style.display=n.value==="Processing"?"flex":"none"),o&&(o.style.display=n.value==="Processing"?"none":"flex"),j.length>0&&se(j)})});document.querySelectorAll('input[name="language"], input[name="processingVector"], input[name="sortMode"], #instanceMode, #showCoordinates').forEach(e=>{e.addEventListener("change",()=>{j.length>0&&se(j)})});document.querySelectorAll("#coordMultiplier, #precision").forEach(e=>{e.addEventListener("change",()=>{j.length>0&&se(j)})});W&&W.addEventListener("input",()=>{j.length>0&&se(j)});U.addEventListener("dragover",e=>{e.preventDefault(),U.classList.add("dragover")});U.addEventListener("dragleave",()=>{U.classList.remove("dragover")});U.addEventListener("drop",e=>{e.preventDefault(),U.classList.remove("dragover");const t=e.dataTransfer?.files;if(!t){alert("Please drop at least one SVG file");return}const n=Qe(t);if(n.length===0){alert("Please drop at least one valid SVG file");return}se(n)});Ge.addEventListener("change",e=>{const t=e.target.files;if(!t)return;const n=Qe(t);n.length!==0&&se(n)});async function se(e){const t=e.filter(Ue);if(t.length===0)return;const n=t.length>1,s=j.length===1&&t.length===1&&j[0]===t[0];W&&(W.disabled=n,n?(W.value="Auto per file",W.title="Disabled for multi-file imports. Filename prefixes are used automatically."):(W.title="",s||(W.value=Te(t[0])))),j=[...t];const o=++Ee;let i=[];try{i=await Promise.all(t.map(async(u,x)=>{const I=await u.text(),D=new DOMParser().parseFromString(I,"image/svg+xml");return{file:u,fileIndex:x,shapes:wt(D)}}))}catch{if(o!==Ee)return;oe.innerHTML='<div class="output"><p>Could not read one or more SVG files.</p></div>';return}if(o!==Ee)return;xe&&(xe(),xe=null);const r=i.filter(u=>u.shapes.length>0);if(r.length===0){oe.innerHTML='<div class="output"><p>No supported drawable elements found (path, line, polyline, polygon, rect, circle, ellipse).</p></div>';return}const l=document.querySelector('input[name="vectorFormat"]:checked')?.value||"Vec",a=document.querySelector('input[name="language"]:checked')?.value||"javascript",c=parseFloat(document.getElementById("coordMultiplier")?.value)||1,w=parseInt(document.getElementById("precision")?.value)||5,T=document.querySelector('input[name="processingVector"]:checked')?.value||"PVector",E=document.getElementById("instanceMode")?.checked||!1,S=document.getElementById("showCoordinates")?.checked??!0,g=document.querySelector('input[name="sortMode"]:checked')?.value||"primitive",v={vectorFormat:l,language:a,coordMultiplier:c,precision:w,processingVector:T,instanceMode:E},d=Oe(W?.value||Te(r[0].file)),f=n?St(r.map(u=>Oe(Te(u.file)))):[d],h=r.map((u,x)=>{const I=n?f[x]:d;return{file:u.file,fileIndex:u.fileIndex,filePrefix:I,drawAllFunctionName:Et(I)}}),C=[];let p=1;r.forEach((u,x)=>{const I=h[x];u.shapes.forEach((k,D)=>{C.push({fileIndex:u.fileIndex,fileName:u.file.name,shape:k,functionName:It(I.filePrefix,k.primitive?.kind,D+1),globalId:p++})})});const m=[...C].sort((u,x)=>{if(g==="svg")return u.fileIndex!==x.fileIndex?u.fileIndex-x.fileIndex:u.shape.sourceIndex-x.shape.sourceIndex;const I=u.shape.primitive?.kind??"path",k=x.shape.primitive?.kind??"path";return I===k?u.fileIndex!==x.fileIndex?u.fileIndex-x.fileIndex:u.shape.sourceIndex-x.shape.sourceIndex:I.localeCompare(k)}),$=m.map(u=>u.functionName),y=new Map;m.forEach(u=>{const x=y.get(u.fileIndex)||[];x.push(u.functionName),y.set(u.fileIndex,x)});const b=Mt(m.map(u=>u.shape))||void 0,F=st(v,b);let N="";const V=[],P=[],A=[],Z=new Map,ae=[],fe=new Map,ie=[];m.forEach((u,x)=>{V.push(u.shape.pathData),P.push(u.globalId),A.push(u.shape),ie.push(u.functionName);let I=Z.get(u.fileIndex);I||(I={previewId:`preview-all-file-${u.fileIndex}`,fileName:u.fileName,pathsData:[],shapeIds:[],shapes:[]},Z.set(u.fileIndex,I)),I.pathsData.push(u.shape.pathData),I.shapeIds.push(u.globalId),I.shapes.push(u.shape);const k=ut(u.shape.pathData,v,x,u.shape,u.functionName),D=[k.globalCode,k.pathCode].filter(J=>J.trim().length>0).join(`

`);ae.push(D),fe.set(u.functionName,D);const z=`preview-${x}`;N+=`
          <div class="output path-section" id="shape-section-${x}">
            <div class="path-header">
              <h2>${H(u.functionName)}</h2>
              <button class="copy-btn" data-path="${x}">Copy Code</button>
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
        `});const G=a==="typescript"?"import type p5 from 'p5';":"",de=F.trim(),be=ae.join(`

`).trim(),he=[];let M="";if(n){const u=[];h.forEach(x=>{const I=y.get(x.fileIndex)||[];I.length!==0&&(u.push(x.drawAllFunctionName),he.push(pe(I,v,x.drawAllFunctionName).trim()))}),M=pe(u,v).trim()}else M=pe($,v,h[0].drawAllFunctionName).trim();const X=[M,...he,be].filter(u=>u.length>0).join(`

`),Y=[G,de].filter(u=>u.length>0).join(`

`),B=[G,X].filter(u=>u.length>0).join(`

`),O=[G,de,X].filter(u=>u.length>0).join(`

`),_=l==="Processing"?"pde":a==="typescript"?"ts":"js",K=$e("svg_complete",_),ge=$e("svg_paths",_),me=$e("svg_shared",_),Q=[];n&&h.forEach(u=>{const x=y.get(u.fileIndex)||[];if(x.length===0)return;const I=pe(x,v,u.drawAllFunctionName).trim(),k=x.map(z=>fe.get(z)||"").filter(z=>z.length>0).join(`

`).trim(),D=[G,I,k].filter(z=>z.length>0).join(`

`);Q.push({codeKey:`drawing-file-${u.filePrefix}`,code:D,drawAllFunctionName:u.drawAllFunctionName,fileName:$e(`svg_${Tt(u.file.name,_)}`,_),sourceFileName:u.file.name})});const ce={complete:O,drawing:B,shared:Y};Q.forEach(u=>{ce[u.codeKey]=u.code});const we=`
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
          ${h.map(u=>{const x=Z.get(u.fileIndex);return!x||x.pathsData.length===0?"":`
            <div class="combined-preview-file">
              <h3>${H(x.fileName)}</h3>
              <div class="preview-container">
                <div id="${x.previewId}"></div>
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
          ${ie.map((u,x)=>`
            <li>
              <button class="shape-nav-link" data-target="shape-section-${x}">${H(u)}</button>
            </li>
          `).join("")}
        </ul>
      </div>
    `;oe.innerHTML=nt+we+Se+Je+et+tt+N,n?h.forEach(u=>{const x=Z.get(u.fileIndex);!x||x.pathsData.length===0||ze(x.pathsData,x.shapeIds,x.previewId,x.shapes)}):ze(V,P,"preview-all",A),V.forEach((u,x)=>{pt(u,`preview-${x}`,A[x],S)}),xe=Ft(),oe.querySelectorAll(".download-btn[data-code-key]").forEach(u=>{u.addEventListener("click",()=>{const x=u.dataset.codeKey,I=u.dataset.filename;if(!x||!I)return;const k=ce[x];if(!k)return;const D=new Blob([k],{type:"text/plain"}),z=URL.createObjectURL(D),J=document.createElement("a");J.href=z,J.download=I,J.click(),URL.revokeObjectURL(z);const ot=u.textContent;u.textContent="Downloaded!",setTimeout(()=>{u.textContent=ot},2e3)})}),oe.querySelectorAll(".copy-btn").forEach(u=>{u.addEventListener("click",async x=>{const I=x.currentTarget;if(I.dataset.copying==="1")return;const k=I.dataset.codeKey;let D="";if(k?D=ce[k]||"":D=I.closest(".path-section")?.querySelector("code")?.textContent||"",!D){je(I,"No code");return}I.dataset.copying="1";let z=!1;try{z=await Pt(D)}finally{I.dataset.copying="0"}je(I,z?"Copied!":"Copy failed")})})}function Ft(){const e=Array.from(oe.querySelectorAll(".shape-nav-link"));if(e.length===0)return()=>{};const t=e.map(l=>{const a=l.dataset.target;return a?document.getElementById(a):null}).filter(l=>l!==null);if(t.length===0)return()=>{};const n=l=>{e.forEach(a=>{a.classList.toggle("is-active",a.dataset.target===l.id)})},s=()=>{const l=window.innerHeight/2;let a=t[0],c=Number.POSITIVE_INFINITY;t.forEach(w=>{const T=w.getBoundingClientRect(),E=T.top+T.height/2,S=Math.abs(E-l);S<c&&(c=S,a=w)}),n(a)},o=l=>{const c=l.currentTarget.dataset.target;if(!c)return;const w=document.getElementById(c);w&&w.scrollIntoView({behavior:"smooth",block:"center"})};e.forEach(l=>{l.addEventListener("click",o)});let i=!1;const r=()=>{i||(i=!0,window.requestAnimationFrame(()=>{i=!1,s()}))};return window.addEventListener("scroll",r,{passive:!0}),window.addEventListener("resize",r),s(),()=>{e.forEach(l=>{l.removeEventListener("click",o)}),window.removeEventListener("scroll",r),window.removeEventListener("resize",r)}}
