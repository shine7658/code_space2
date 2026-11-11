const pages=[{t:"cover"},{t:"pref"},{t:"toc"},...CHANNELS.map((c,i)=>({t:"ch",i}))];
let cur=0,filter=null,pf=null,q="";
const splitP=s=>s.split(/\s*\/\s*/);
const allPlat=[...new Set(CHANNELS.flatMap(c=>splitP(c.platform)))];
const $=id=>document.getElementById(id);
const allTags=[...new Set(CHANNELS.flatMap(c=>c.tags))];
const pad=n=>String(n).padStart(2,"0");
const chipsHTML=()=>{const row=(l,arr,c,a)=>`<div class="chips"><span class="lbl">${l}</span>${["全部",...arr].map(t=>`<span class="chip ${(t==="全部"&&!c)||t===c?"on":""}" ${a}="${t}">${t}</span>`).join("")}</div>`;return row("平台",allPlat,pf,"data-plat")+row("標籤",allTags,filter,"data-tag")};
function listHTML(){
  const k=q.trim().toLowerCase();
  return CHANNELS.map((c,i)=>({c,i})).filter(({c})=>(!filter||c.tags.includes(filter))&&(!pf||splitP(c.platform).includes(pf))&&(!k||(c.name+c.intro+c.platform+c.tags.join("")).toLowerCase().includes(k)))
   .map(({c,i})=>`<li data-go="${i+3}"><span class="no">${pad(i+1)}</span><span class="nm">${c.name}</span><span class="tg">${c.tags.join("・")}</span><span class="dots"></span><span class="pg">${i+4}</span></li>`).join("")||'<div class="empty">沒有符合的頻道</div>';
}
function bindGo(root){root.querySelectorAll("[data-go]").forEach(n=>n.onclick=()=>go(+n.dataset.go))}
function render(dir){
  const p=pages[cur],el=$("page");
  $("book").classList.toggle("is-cover",p.t==="cover");
  el.className="page";
  let h="";
  if(p.t==="cover")h=`<div class="cover"><div class="orn">✦ ✦ ✦</div><h1>${BOOK.title}</h1><div class="en">${BOOK.en}</div><div class="sub">${BOOK.subtitle}</div><button id="open">翻 開 本 書</button><div class="by">${BOOK.author}</div></div>`;
  else if(p.t==="pref")h=`<div class="run"><span>Preface</span><span>簡介</span></div><h2 class="rule">簡介</h2><p class="lead">網路上的學習資源很多，但好內容往往散落在各個平台。本書收錄 YouTube、B站等平台上的優質教育頻道，每個頻道附上簡介、推薦理由與標籤，讓你依興趣快速找到適合自己的學習來源。</p><p>使用方式：翻到「目錄」，用搜尋或標籤篩選主題，再點擊頻道名稱，即可跳到該頻道的介紹頁。</p><p class="meta">目前收錄 ${CHANNELS.length} 個頻道　·　${allPlat.length} 個平台　·　${allTags.length} 個標籤</p><div class="chips">${allTags.map(t=>`<span class="chip" data-jump="${t}">#${t}</span>`).join("")}</div>`;
  else if(p.t==="toc")h=`<div class="run"><span>Contents</span><span>目錄</span></div><h2 class="rule">目錄</h2><input class="search" id="q" placeholder="搜尋頻道、標籤或關鍵字…" value="${q}">${chipsHTML()}<ul class="toc" id="list">${listHTML()}</ul>`;
  else{
    const c=CHANNELS[p.i];
    const rel=CHANNELS.map((o,i)=>({o,i,s:o.tags.filter(t=>c.tags.includes(t)).length})).filter(x=>x.i!==p.i&&x.s>0).sort((a,b)=>b.s-a.s).slice(0,2);
    h=`<div class="run"><span>Chapter ${pad(p.i+1)}</span><span>${c.platform}</span></div><div class="num">${pad(p.i+1)}</div><h2 class="rule">${c.name}</h2><span class="badge">${c.platform}</span><div class="chips">${c.tags.map(t=>`<span class="chip" data-jump="${t}">#${t}</span>`).join("")}</div><h3>頻道簡介</h3><p>${c.intro}</p>${c.why?`<h3>推薦理由</h3><div class="quote"><p>${c.why}</p></div>`:""}<a class="go" href="${c.url}" target="_blank" rel="noopener">前往頻道 →</a>${rel.length?`<h3>延伸閱讀</h3><div class="rel">${rel.map(x=>`<div data-go="${x.i+3}">${x.o.name}<small>${x.o.tags.join("・")}</small></div>`).join("")}</div>`:""}`;
  }
  el.innerHTML=h;el.scrollTop=0;
  $("pos").textContent=cur>0?`— ${cur+1} —`:"";
  $("bar").style.width=(cur/(pages.length-1)*100)+"%";
  $("prev").disabled=cur===0;$("next").disabled=cur===pages.length-1;
  const o=$("open");if(o)o.onclick=()=>go(1);
  bindGo(el);
  el.querySelectorAll("[data-tag]").forEach(n=>n.onclick=()=>{filter=n.dataset.tag==="全部"?null:n.dataset.tag;render()});
  el.querySelectorAll("[data-jump]").forEach(n=>n.onclick=()=>{filter=n.dataset.jump;go(2)});
  el.querySelectorAll("[data-plat]").forEach(n=>n.onclick=()=>{pf=n.dataset.plat==="全部"?null:n.dataset.plat;render()});
  el.querySelectorAll(".badge").forEach(n=>{n.style.cursor="pointer";n.onclick=()=>{pf=splitP(CHANNELS[p.i].platform)[0];go(2)}});
  const s=$("q");if(s)s.oninput=()=>{q=s.value;$("list").innerHTML=listHTML();bindGo($("list"))};
}
let busy=false;
function mk(html,cov){const d=document.createElement("div");d.className="sheet"+(cov?" cov":"");d.innerHTML=`<div class="page">${html}</div>`;return d}
function flip(oldHTML,oldCov,dir){
  const st=$("stage"),back=dir==="b",newCov=pages[cur].t==="cover";
  const leaf=document.createElement("div");leaf.className="leaf"+(back?" lb":"");
  const f=back?mk($("page").innerHTML,newCov):mk(oldHTML,oldCov);f.classList.add("f");
  const b=document.createElement("div");b.className="b";leaf.append(f,b);
  let under=null;
  if(back){under=mk(oldHTML,oldCov);under.classList.add("under");st.append(under)}
  st.append(leaf);busy=true;
  let done=false;const end=()=>{if(done)return;done=true;leaf.remove();if(under)under.remove();busy=false};
  leaf.addEventListener("animationend",end);setTimeout(end,1200);
}
function go(n){
  if(busy)return;
  const m=Math.max(0,Math.min(pages.length-1,n));if(m===cur)return;
  const d=m<cur?"b":"f",old=$("page").innerHTML,oc=pages[cur].t==="cover";
  cur=m;render(d);flip(old,oc,d);
}
$("prev").onclick=()=>go(cur-1);$("next").onclick=()=>go(cur+1);$("toc").onclick=()=>go(2);
addEventListener("keydown",e=>{if(e.target.tagName==="INPUT")return;if(e.key==="ArrowLeft")go(cur-1);if(e.key==="ArrowRight")go(cur+1)});
render();
