(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const l of e.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function r(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(t){if(t.ep)return;t.ep=!0;const e=r(t);fetch(t.href,e)}})();function I(a){const n=[],r=/([MLHVCSQTAZmlhvcsqtaz])\s*([^MLHVCSQTAZmlhvcsqtaz]*)/g;let o,t=0,e=0;for(;(o=r.exec(a))!==null;){const l=o[1],f=l===l.toLowerCase(),y=l.toUpperCase(),x=/-?\d*\.?\d+/g,s=(o[2].match(x)||[]).map(Number);if(y==="M"){const i=f?t+s[0]:s[0],h=f?e+s[1]:s[1];n.push({type:"M",x:i,y:h}),t=i,e=h}else if(y==="L"){const i=f?t+s[0]:s[0],h=f?e+s[1]:s[1];n.push({type:"L",x:i,y:h}),t=i,e=h}else if(y==="H"){const i=f?t+s[0]:s[0];n.push({type:"L",x:i,y:e}),t=i}else if(y==="V"){const i=f?e+s[0]:s[0];n.push({type:"L",x:t,y:i}),e=i}else if(y==="C"){const i=f?t+s[0]:s[0],h=f?e+s[1]:s[1],P=f?t+s[2]:s[2],w=f?e+s[3]:s[3],L=f?t+s[4]:s[4],m=f?e+s[5]:s[5];n.push({type:"C",x1:i,y1:h,x2:P,y2:w,x:L,y:m}),t=L,e=m}else y==="Z"&&n.push({type:"Z"})}return n}function k(a){let n="",r=a;for(;r>=0;)n=String.fromCharCode(65+r%26)+n,r=Math.floor(r/26)-1;return n}function Y(a,n,r){const o=(a*n).toFixed(r);return parseFloat(o).toString()}function G(a){const{vectorFormat:n,language:r,processingVector:o="PVector",instanceMode:t=!1}=a,e=r==="typescript",l=n==="Processing",f=l&&o==="Vec2D",y=t&&n==="createVector";if(l){const h=f?"Vec2D":"PVector";return`${f?`import toxi.geom.*;

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
}`;const x=y?"p.createVector":"createVector",s=e?"p5.Vector":"",i=y?e?"p: any":"p":"";return`// Transform configuration
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

function applyTransform(${i?i+", ":""}v${e?`: ${s}`:""})${e?`: ${s}`:""} {
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

	return ${x}(x, y);
}`}function K(a,n,r){const{vectorFormat:o,language:t,coordMultiplier:e,precision:l,processingVector:f="PVector",instanceMode:y=!1}=n,x=I(a);let s=0;const i=o==="Processing",h=i&&f==="Vec2D",P=y&&(o==="createVector"||o==="Vec"),w=i?h?"new Vec2D":"new PVector":o==="Vec"?"new Vec":y&&o==="createVector"?"p.createVector":"createVector",L=G(n),m=[],g=[],O=i?h?"Vec2D":"PVector":"const",S=P&&o==="createVector"?"applyTransform(p, ":"applyTransform(",c=P?"p.":"",d=x.length>0&&x[x.length-1].type==="Z";x.forEach(u=>{if(u.type==="M"||u.type==="L"){const C=k(s),b=Y(u.x,e,l),X=Y(u.y,e,l);m.push(`${C} = ${S}${w}(${b}, ${X}))`),g.push(`${c}vertex(${C}.x, ${C}.y);`),s++}else if(u.type==="C"){const C=k(s-1),b=k(s),X=C+"c",z="c"+b,R=Y(u.x1,e,l),j=Y(u.y1,e,l),H=Y(u.x2,e,l),Z=Y(u.y2,e,l),W=Y(u.x,e,l),U=Y(u.y,e,l);m.push(`${X} = ${S}${w}(${R}, ${j}))`),m.push(`${z} = ${S}${w}(${H}, ${Z}))`),m.push(`${b} = ${S}${w}(${W}, ${U}))`),g.push(`${c}bezierVertex(${X}.x, ${X}.y, ${z}.x, ${z}.y, ${b}.x, ${b}.y);`),s++}});const T=t==="typescript",v=`drawPath${r+1}`;let M,p,V;const E=P?"p.":"";i?(M=`void ${v}() {`,p=`	${O} ${m.join(`,
		`)};`,V=g.map(u=>`	${u}`).join(`
`)):(M=`function ${v}(${P?T?"p: any":"p":""})${T?": void":""} {`,p=`	${O} ${m.join(`,
		`)};`,V=g.map(b=>`	${b}`).join(`
`));const $=`${M}
${p}

	${E}beginShape();
${V}
	${E}endShape(${d?"CLOSE":"OPEN"});
}`;return{sharedCode:L,pathCode:$}}function Q(a,n){const{vectorFormat:r,language:o,instanceMode:t=!1}=n,e=o==="typescript",l=r==="Processing",f=t&&(r==="createVector"||r==="Vec"),y=Array.from({length:a},(x,s)=>{const i=`drawPath${s+1}`;return l?`	${i}();`:f?`	${i}(p);`:`	${i}();`}).join(`
`);return l?`
void drawAllPaths() {
${y}
}`:`
function drawAllPaths(${f?e?"p: any":"p":""})${e?": void":""} {
${y}
}`}function B(a){const n=document.createElement("div");return n.textContent=a,n.innerHTML}function _(a){const n=[];let r=0;return a.forEach(o=>{if(o.type==="M"||o.type==="L"){const t=k(r);n.push({name:t,x:o.x,y:o.y}),r++}else if(o.type==="C"){const t=k(r-1),e=k(r),l=t+"c",f="c"+e;n.push({name:l,x:o.x1,y:o.y1}),n.push({name:f,x:o.x2,y:o.y2}),n.push({name:e,x:o.x,y:o.y}),r++}}),n}function J(a){const n=a.map(f=>f.x),r=a.map(f=>f.y),o=Math.min(...n),t=Math.min(...r),e=Math.max(...n),l=Math.max(...r);return{minX:o,minY:t,maxX:e,maxY:l,width:e-o,height:l-t}}function ee(a,n){const r=I(a),o=_(r);if(o.length===0)return;const t=J(o);new window.p5(e=>{const x=t.width>0?440/t.width:1,s=t.height>0?440/t.height:1,i=Math.min(x,s),h=t.width*i,P=t.height*i,w=(500-h)/2-t.minX*i,L=(500-P)/2-t.minY*i;e.setup=()=>{e.createCanvas(500,500),e.noLoop()},e.draw=()=>{e.background(30);const m=(c,d)=>({x:c*i+w,y:d*i+L});e.stroke(60),e.strokeWeight(1);for(let c=0;c<=500;c+=50)e.line(c,0,c,500),e.line(0,c,500,c);const g=m(0,0);e.stroke(255,100,100),e.strokeWeight(2),e.line(0,g.y,500,g.y),e.stroke(100,255,100),e.strokeWeight(2),e.line(g.x,0,g.x,500),e.noStroke(),e.fill(255,200,0),e.circle(g.x,g.y,12),e.fill(255),e.textAlign(e.LEFT,e.BOTTOM),e.textSize(14),e.textStyle(e.BOLD),e.text("(0, 0)",g.x+8,g.y-8),e.fill(100,150,255,50),e.stroke(100,150,255),e.strokeWeight(2),e.beginShape(),r.forEach(c=>{if(c.type==="M"){const d=m(c.x,c.y);e.vertex(d.x,d.y)}else if(c.type==="L"){const d=m(c.x,c.y);e.vertex(d.x,d.y)}else if(c.type==="C"){const d=m(c.x1,c.y1),T=m(c.x2,c.y2),v=m(c.x,c.y);e.bezierVertex(d.x,d.y,T.x,T.y,v.x,v.y)}});const O=r.length>0&&r[r.length-1].type==="Z";e.endShape(O?e.CLOSE:e.OPEN),e.stroke(255,200,100,100),e.strokeWeight(1);let S=0;r.forEach(c=>{if(c.type==="C"){const d=o.find(p=>p.name===String.fromCharCode(65+S-1)),T=o.find(p=>p.name===d?.name+"c"),v=o.find(p=>p.name==="c"+String.fromCharCode(65+S)),M=o.find(p=>p.name===String.fromCharCode(65+S));if(d&&T){const p=m(d.x,d.y),V=m(T.x,T.y);e.line(p.x,p.y,V.x,V.y)}if(v&&M){const p=m(v.x,v.y),V=m(M.x,M.y);e.line(p.x,p.y,V.x,V.y)}S++}else(c.type==="M"||c.type==="L")&&S++}),o.forEach(c=>{const d=m(c.x,c.y),T=c.name.includes("c");e.noStroke(),T?(e.fill(255,200,100),e.circle(d.x,d.y,8)):(e.fill(100,255,150),e.circle(d.x,d.y,10)),e.fill(255),e.noStroke(),e.textAlign(e.CENTER,e.CENTER),e.textSize(12),e.textStyle(e.BOLD);const v=15;e.text(c.name,d.x,d.y-v),e.textSize(9),e.textStyle(e.NORMAL),e.fill(200),e.text(`(${c.x.toFixed(1)}, ${c.y.toFixed(1)})`,d.x,d.y+v+3)}),e.fill(200),e.noStroke(),e.textAlign(e.LEFT,e.TOP),e.textSize(11),e.text(`Scale: ${i.toFixed(3)}x`,10,10),e.text(`Size: ${t.width.toFixed(1)} × ${t.height.toFixed(1)}`,10,25)}},n)}const D=document.getElementById("dropZone"),q=document.getElementById("fileInput"),F=document.getElementById("output");let N=null;D.addEventListener("click",()=>q.click());document.querySelectorAll('input[name="vectorFormat"]').forEach(a=>{a.addEventListener("change",n=>{const r=n.target,o=document.getElementById("processingVectorOption"),t=document.getElementById("instanceModeOption");o&&(o.style.display=r.value==="Processing"?"flex":"none"),t&&(t.style.display=r.value==="Processing"?"none":"flex"),N&&A(N)})});document.querySelectorAll('input[name="language"], input[name="processingVector"], #instanceMode').forEach(a=>{a.addEventListener("change",()=>{N&&A(N)})});document.querySelectorAll("#coordMultiplier, #precision").forEach(a=>{a.addEventListener("change",()=>{N&&A(N)})});D.addEventListener("dragover",a=>{a.preventDefault(),D.classList.add("dragover")});D.addEventListener("dragleave",()=>{D.classList.remove("dragover")});D.addEventListener("drop",a=>{a.preventDefault(),D.classList.remove("dragover");const n=a.dataTransfer?.files[0];n&&n.type==="image/svg+xml"?A(n):alert("Please drop a valid SVG file")});q.addEventListener("change",a=>{const n=a.target.files?.[0];n&&A(n)});function A(a){N=a;const n=new FileReader;n.onload=r=>{const o=r.target?.result,l=new DOMParser().parseFromString(o,"image/svg+xml").querySelectorAll("path");if(l.length===0){F.innerHTML='<div class="output"><p>No &lt;path&gt; elements found in this SVG.</p></div>';return}const f=document.querySelector('input[name="vectorFormat"]:checked')?.value||"Vec",y=document.querySelector('input[name="language"]:checked')?.value||"javascript",x=parseFloat(document.getElementById("coordMultiplier")?.value)||1,s=parseInt(document.getElementById("precision")?.value)||5,i=document.querySelector('input[name="processingVector"]:checked')?.value||"PVector",h=document.getElementById("instanceMode")?.checked||!1,P={vectorFormat:f,language:y,coordMultiplier:x,precision:s,processingVector:i,instanceMode:h};let w="",L="";const m=[],g=[];l.forEach((E,$)=>{const u=E.getAttribute("d");if(u){m.push(u);const C=K(u,P,$);$===0&&(w=C.sharedCode),g.push(C.pathCode);const b=`preview-${$}`;L+=`
          <div class="output path-section">
            <div class="path-header">
              <h2>Path ${$+1}</h2>
              <button class="copy-btn" data-path="${$}">📋 Copy Code</button>
            </div>
            <div class="content-grid">
              <div class="preview-container">
                <div id="${b}"></div>
              </div>
              <div class="code-container">
                <pre><code>${B(C.pathCode)}</code></pre>
              </div>
            </div>
          </div>
        `}});const O=Q(g.length,P),S=w+O,d=`draw-paths.${f==="Processing"?"pde":y==="typescript"?"ts":"js"}`,T=`${S}

${g.join(`

`)}`,v=`
      <div class="command-section">
        <div class="command-header">
          <h2>Download Complete File</h2>
          <button class="download-btn" data-filename="${d}">⬇️ Download ${d}</button>
        </div>
        <div class="command-content">
          <p style="margin: 0; padding: 15px; color: #9cdcfe;">Click the button above to download a file containing all the shared code and path functions.</p>
        </div>
      </div>
    `,M=`
      <div class="shared-code-section">
        <div class="shared-code-header">
          <h2>Shared Code</h2>
          <button class="copy-btn" data-shared="true">📋 Copy Shared Code</button>
        </div>
        <div class="shared-code-content">
          <pre><code>${B(S)}</code></pre>
        </div>
      </div>
    `;F.innerHTML=v+M+L;const p=F.querySelector(".download-btn");p&&p.addEventListener("click",()=>{const E=new Blob([T],{type:"text/plain"}),$=URL.createObjectURL(E),u=document.createElement("a");u.href=$,u.download=d,u.click(),URL.revokeObjectURL($);const C=p.textContent;p.textContent="✅ Downloaded!",setTimeout(()=>{p.textContent=C},2e3)}),m.forEach((E,$)=>{ee(E,`preview-${$}`)}),F.querySelectorAll(".copy-btn").forEach(E=>{E.addEventListener("click",$=>{const u=$.target,C=u.dataset.shared==="true";let b="";C?b=u.closest(".shared-code-section")?.querySelector("code")?.textContent||"":b=u.closest(".path-section")?.querySelector("code")?.textContent||"",navigator.clipboard.writeText(b).then(()=>{const X=u.textContent;u.textContent="✅ Copied!",setTimeout(()=>{u.textContent=X},2e3)})})})},n.readAsText(a)}
