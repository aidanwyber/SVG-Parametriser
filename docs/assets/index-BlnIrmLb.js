(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const l of e.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function c(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(t){if(t.ep)return;t.ep=!0;const e=c(t);fetch(t.href,e)}})();function B(a){const n=[],c=/([MLHVCSQTAZmlhvcsqtaz])\s*([^MLHVCSQTAZmlhvcsqtaz]*)/g;let o,t=0,e=0;for(;(o=c.exec(a))!==null;){const l=o[1],f=l===l.toLowerCase(),y=l.toUpperCase(),T=/-?\d*\.?\d+/g,r=(o[2].match(T)||[]).map(Number);if(y==="M"){const i=f?t+r[0]:r[0],h=f?e+r[1]:r[1];n.push({type:"M",x:i,y:h}),t=i,e=h}else if(y==="L"){const i=f?t+r[0]:r[0],h=f?e+r[1]:r[1];n.push({type:"L",x:i,y:h}),t=i,e=h}else if(y==="H"){const i=f?t+r[0]:r[0];n.push({type:"L",x:i,y:e}),t=i}else if(y==="V"){const i=f?e+r[0]:r[0];n.push({type:"L",x:t,y:i}),e=i}else if(y==="C"){const i=f?t+r[0]:r[0],h=f?e+r[1]:r[1],S=f?t+r[2]:r[2],w=f?e+r[3]:r[3],L=f?t+r[4]:r[4],m=f?e+r[5]:r[5];n.push({type:"C",x1:i,y1:h,x2:S,y2:w,x:L,y:m}),t=L,e=m}else y==="Z"&&n.push({type:"Z"})}return n}function A(a){let n="",c=a;for(;c>=0;)n=String.fromCharCode(65+c%26)+n,c=Math.floor(c/26)-1;return n}function X(a,n,c){const o=(a*n).toFixed(c);return parseFloat(o).toString()}function U(a){const{vectorFormat:n,language:c,processingVector:o="PVector",instanceMode:t=!1}=a,e=c==="typescript",l=n==="Processing",f=l&&o==="Vec2D",y=t&&n==="createVector";if(l){const h=f?"Vec2D":"PVector";return`${f?`import toxi.geom.*;

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

${h} applyTransform(${h} v) {
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

	return new ${h}(x, y);
}`}if(n==="Vec")return`// Transform configuration
const transformConfig${e?`: {
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
	${e?`a: number; b: number; c: number; d: number; tx: number; ty: number;

	`:""}constructor(a${e?": number":""}, b${e?": number":""}, c${e?": number":""}, d${e?": number":""}, tx${e?": number":""}, ty${e?": number":""}) {
		this.a = a; this.b = b;
		this.c = c; this.d = d;
		this.tx = tx; this.ty = ty;
	}

	transform(x${e?": number":""}, y${e?": number":""})${e?": [number, number]":""} {
		return [
			this.a * x + this.c * y + this.tx,
			this.b * x + this.d * y + this.ty
		];
	}

	static fromTransform(config${e?": typeof transformConfig":""})${e?": Matrix2D":""} {
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

function applyTransform(v${e?": Vec":""})${e?": Vec":""} {
	const [x, y] = transform.transform(v.x, v.y);
	return new Vec(x, y);
}`;const T=y?"p.createVector":"createVector",r=e?"p5.Vector":"",i=y?e?"p: any":"p":"";return`// Transform configuration
const transformConfig${e?`: {
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

function applyTransform(${i?i+", ":""}v${e?`: ${r}`:""})${e?`: ${r}`:""} {
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

	return ${T}(x, y);
}`}function G(a,n,c){const{vectorFormat:o,language:t,coordMultiplier:e,precision:l,processingVector:f="PVector",instanceMode:y=!1}=n,T=B(a);let r=0;const i=o==="Processing",h=i&&f==="Vec2D",S=y&&(o==="createVector"||o==="Vec"),w=i?h?"new Vec2D":"new PVector":o==="Vec"?"new Vec":y&&o==="createVector"?"p.createVector":"createVector",L=U(n),m=[],x=[],V=i?h?"Vec2D":"PVector":"const",s=S&&o==="createVector"?"applyTransform(p, ":"applyTransform(",d=S?"p.":"";T.forEach(u=>{if(u.type==="M"||u.type==="L"){const p=A(r),v=X(u.x,e,l),P=X(u.y,e,l);m.push(`${p} = ${s}${w}(${v}, ${P}))`),x.push(`${d}vertex(${p}.x, ${p}.y);`),r++}else if(u.type==="C"){const p=A(r-1),v=A(r),P=p+"c",Y="c"+v,q=X(u.x1,e,l),R=X(u.y1,e,l),j=X(u.x2,e,l),H=X(u.y2,e,l),W=X(u.x,e,l),Z=X(u.y,e,l);m.push(`${P} = ${s}${w}(${q}, ${R}))`),m.push(`${Y} = ${s}${w}(${j}, ${H}))`),m.push(`${v} = ${s}${w}(${W}, ${Z}))`),x.push(`${d}bezierVertex(${P}.x, ${P}.y, ${Y}.x, ${Y}.y, ${v}.x, ${v}.y);`),r++}});const $=t==="typescript",b=`drawPath${c+1}`;let M,g,C;const O=S?"p.":"";i?(M=`void ${b}() {`,g=`	${V} ${m.join(`,
		`)};`,C=x.map(u=>`	${u}`).join(`
`)):(M=`function ${b}(${S?$?"p: any":"p":""})${$?": void":""} {`,g=`	${V} ${m.join(`,
		`)};`,C=x.map(v=>`	${v}`).join(`
`));const E=`${M}
${g}

	${O}beginShape();
${C}
	${O}endShape(CLOSE);
}`;return{sharedCode:L,pathCode:E}}function K(a,n){const{vectorFormat:c,language:o,instanceMode:t=!1}=n,e=o==="typescript",l=c==="Processing",f=t&&(c==="createVector"||c==="Vec"),y=Array.from({length:a},(T,r)=>{const i=`drawPath${r+1}`;return l?`	${i}();`:f?`	${i}(p);`:`	${i}();`}).join(`
`);return l?`
void drawAllPaths() {
${y}
}`:`
function drawAllPaths(${f?e?"p: any":"p":""})${e?": void":""} {
${y}
}`}function z(a){const n=document.createElement("div");return n.textContent=a,n.innerHTML}function Q(a){const n=[];let c=0;return a.forEach(o=>{if(o.type==="M"||o.type==="L"){const t=A(c);n.push({name:t,x:o.x,y:o.y}),c++}else if(o.type==="C"){const t=A(c-1),e=A(c),l=t+"c",f="c"+e;n.push({name:l,x:o.x1,y:o.y1}),n.push({name:f,x:o.x2,y:o.y2}),n.push({name:e,x:o.x,y:o.y}),c++}}),n}function _(a){const n=a.map(f=>f.x),c=a.map(f=>f.y),o=Math.min(...n),t=Math.min(...c),e=Math.max(...n),l=Math.max(...c);return{minX:o,minY:t,maxX:e,maxY:l,width:e-o,height:l-t}}function J(a,n){const c=B(a),o=Q(c);if(o.length===0)return;const t=_(o);new window.p5(e=>{const T=t.width>0?440/t.width:1,r=t.height>0?440/t.height:1,i=Math.min(T,r),h=t.width*i,S=t.height*i,w=(500-h)/2-t.minX*i,L=(500-S)/2-t.minY*i;e.setup=()=>{e.createCanvas(500,500),e.noLoop()},e.draw=()=>{e.background(30);const m=(s,d)=>({x:s*i+w,y:d*i+L});e.stroke(60),e.strokeWeight(1);for(let s=0;s<=500;s+=50)e.line(s,0,s,500),e.line(0,s,500,s);const x=m(0,0);e.stroke(255,100,100),e.strokeWeight(2),e.line(0,x.y,500,x.y),e.stroke(100,255,100),e.strokeWeight(2),e.line(x.x,0,x.x,500),e.noStroke(),e.fill(255,200,0),e.circle(x.x,x.y,12),e.fill(255),e.textAlign(e.LEFT,e.BOTTOM),e.textSize(14),e.textStyle(e.BOLD),e.text("(0, 0)",x.x+8,x.y-8),e.fill(100,150,255,50),e.stroke(100,150,255),e.strokeWeight(2),e.beginShape(),c.forEach(s=>{if(s.type==="M"){const d=m(s.x,s.y);e.vertex(d.x,d.y)}else if(s.type==="L"){const d=m(s.x,s.y);e.vertex(d.x,d.y)}else if(s.type==="C"){const d=m(s.x1,s.y1),$=m(s.x2,s.y2),b=m(s.x,s.y);e.bezierVertex(d.x,d.y,$.x,$.y,b.x,b.y)}}),e.endShape(e.CLOSE),e.stroke(255,200,100,100),e.strokeWeight(1);let V=0;c.forEach(s=>{if(s.type==="C"){const d=o.find(g=>g.name===String.fromCharCode(65+V-1)),$=o.find(g=>g.name===d?.name+"c"),b=o.find(g=>g.name==="c"+String.fromCharCode(65+V)),M=o.find(g=>g.name===String.fromCharCode(65+V));if(d&&$){const g=m(d.x,d.y),C=m($.x,$.y);e.line(g.x,g.y,C.x,C.y)}if(b&&M){const g=m(b.x,b.y),C=m(M.x,M.y);e.line(g.x,g.y,C.x,C.y)}V++}else(s.type==="M"||s.type==="L")&&V++}),o.forEach(s=>{const d=m(s.x,s.y),$=s.name.includes("c");e.noStroke(),$?(e.fill(255,200,100),e.circle(d.x,d.y,8)):(e.fill(100,255,150),e.circle(d.x,d.y,10)),e.fill(255),e.noStroke(),e.textAlign(e.CENTER,e.CENTER),e.textSize(12),e.textStyle(e.BOLD);const b=15;e.text(s.name,d.x,d.y-b),e.textSize(9),e.textStyle(e.NORMAL),e.fill(200),e.text(`(${s.x.toFixed(1)}, ${s.y.toFixed(1)})`,d.x,d.y+b+3)}),e.fill(200),e.noStroke(),e.textAlign(e.LEFT,e.TOP),e.textSize(11),e.text(`Scale: ${i.toFixed(3)}x`,10,10),e.text(`Size: ${t.width.toFixed(1)} × ${t.height.toFixed(1)}`,10,25)}},n)}const D=document.getElementById("dropZone"),I=document.getElementById("fileInput"),N=document.getElementById("output");let k=null;D.addEventListener("click",()=>I.click());document.querySelectorAll('input[name="vectorFormat"]').forEach(a=>{a.addEventListener("change",n=>{const c=n.target,o=document.getElementById("processingVectorOption"),t=document.getElementById("instanceModeOption");o&&(o.style.display=c.value==="Processing"?"flex":"none"),t&&(t.style.display=c.value==="Processing"?"none":"flex"),k&&F(k)})});document.querySelectorAll('input[name="language"], input[name="processingVector"], #instanceMode').forEach(a=>{a.addEventListener("change",()=>{k&&F(k)})});document.querySelectorAll("#coordMultiplier, #precision").forEach(a=>{a.addEventListener("change",()=>{k&&F(k)})});D.addEventListener("dragover",a=>{a.preventDefault(),D.classList.add("dragover")});D.addEventListener("dragleave",()=>{D.classList.remove("dragover")});D.addEventListener("drop",a=>{a.preventDefault(),D.classList.remove("dragover");const n=a.dataTransfer?.files[0];n&&n.type==="image/svg+xml"?F(n):alert("Please drop a valid SVG file")});I.addEventListener("change",a=>{const n=a.target.files?.[0];n&&F(n)});function F(a){k=a;const n=new FileReader;n.onload=c=>{const o=c.target?.result,l=new DOMParser().parseFromString(o,"image/svg+xml").querySelectorAll("path");if(l.length===0){N.innerHTML='<div class="output"><p>No &lt;path&gt; elements found in this SVG.</p></div>';return}const f=document.querySelector('input[name="vectorFormat"]:checked')?.value||"Vec",y=document.querySelector('input[name="language"]:checked')?.value||"javascript",T=parseFloat(document.getElementById("coordMultiplier")?.value)||1,r=parseInt(document.getElementById("precision")?.value)||5,i=document.querySelector('input[name="processingVector"]:checked')?.value||"PVector",h=document.getElementById("instanceMode")?.checked||!1,S={vectorFormat:f,language:y,coordMultiplier:T,precision:r,processingVector:i,instanceMode:h};let w="",L="";const m=[],x=[];l.forEach((E,u)=>{const p=E.getAttribute("d");if(p){m.push(p);const v=G(p,S,u);u===0&&(w=v.sharedCode),x.push(v.pathCode);const P=`preview-${u}`;L+=`
          <div class="output path-section">
            <div class="path-header">
              <h2>Path ${u+1}</h2>
              <button class="copy-btn" data-path="${u}">📋 Copy Code</button>
            </div>
            <div class="content-grid">
              <div class="preview-container">
                <div id="${P}"></div>
              </div>
              <div class="code-container">
                <pre><code>${z(v.pathCode)}</code></pre>
              </div>
            </div>
          </div>
        `}});const V=K(x.length,S),s=w+V,$=`draw-paths.${f==="Processing"?"pde":y==="typescript"?"ts":"js"}`,b=`${s}

${x.join(`

`)}`,M=`
      <div class="command-section">
        <div class="command-header">
          <h2>Download Complete File</h2>
          <button class="download-btn" data-filename="${$}">⬇️ Download ${$}</button>
        </div>
        <div class="command-content">
          <p style="margin: 0; padding: 15px; color: #9cdcfe;">Click the button above to download a file containing all the shared code and path functions.</p>
        </div>
      </div>
    `,g=`
      <div class="shared-code-section">
        <div class="shared-code-header">
          <h2>Shared Code</h2>
          <button class="copy-btn" data-shared="true">📋 Copy Shared Code</button>
        </div>
        <div class="shared-code-content">
          <pre><code>${z(s)}</code></pre>
        </div>
      </div>
    `;N.innerHTML=M+g+L;const C=N.querySelector(".download-btn");C&&C.addEventListener("click",()=>{const E=new Blob([b],{type:"text/plain"}),u=URL.createObjectURL(E),p=document.createElement("a");p.href=u,p.download=$,p.click(),URL.revokeObjectURL(u);const v=C.textContent;C.textContent="✅ Downloaded!",setTimeout(()=>{C.textContent=v},2e3)}),m.forEach((E,u)=>{J(E,`preview-${u}`)}),N.querySelectorAll(".copy-btn").forEach(E=>{E.addEventListener("click",u=>{const p=u.target,v=p.dataset.shared==="true";let P="";v?P=p.closest(".shared-code-section")?.querySelector("code")?.textContent||"":P=p.closest(".path-section")?.querySelector("code")?.textContent||"",navigator.clipboard.writeText(P).then(()=>{const Y=p.textContent;p.textContent="✅ Copied!",setTimeout(()=>{p.textContent=Y},2e3)})})})},n.readAsText(a)}
