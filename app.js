const pages=[{t:"cover"},{t:"pref"},{t:"toc"},...CHANNELS.map((c,i)=>({t:"ch",i}))];
let cur=0,filter=null,pf=null,q="",busy=false;
// 裝置判斷：寬度 ≥768px 且高度 ≥540px（電腦、平板）用雙頁，其餘（手機）用單頁
const mq=matchMedia("(min-width:768px) and (min-height:540px)");
let spread=mq.matches;
const $=id=>document.getElementById(id);
const splitP=s=>s.split(/\s*\/\s*/);
const allPlat=[...new Set(CHANNELS.flatMap(c=>splitP(c.platform)))];
const allTags=[...new Set(CHANNELS.flatMap(c=>c.tags))];
const pad=n=>String(n).padStart(2,"0");
const chipsHTML=()=>{const row=(l,arr,c,a)=>`<div class="chips"><span class="lbl">${l}</span>${["全部",...arr].map(t=>`<span class="chip ${(t==="全部"&&!c)||t===c?"on":""}" ${a}="${t}">${t}</span>`).join("")}</div>`;return row("平台",allPlat,pf,"data-plat")+row("標籤",allTags,filter,"data-tag")};
function listHTML(){
  const k=q.trim().toLowerCase();
  return CHANNELS.map((c,i)=>({c,i})).filter(({c})=>(!filter||c.tags.includes(filter))&&(!pf||splitP(c.platform).includes(pf))&&(!k||(c.name+c.intro+c.platform+c.tags.join("")).toLowerCase().includes(k)))
   .map(({c,i})=>`<li data-go="${i+3}"><span class="no">${pad(i+1)}</span><span class="nm">${c.name}</span><span class="tg">${c.tags.join("・")}</span><span class="dots"></span><span class="pg">${i+4}</span></li>`).join("")||'<div class="empty">沒有符合的頻道</div>';
}
// ---- 雙頁邏輯：spread -1 = 封面；spread s ≥ 0 = 左頁 1+2s、右頁 2+2s ----
const spreadOf=p=>p<=0?-1:Math.floor((p-1)/2);
const leftOf=s=>s<0?null:1+2*s;
const rightOf=s=>s<0?0:2+2*s;
const maxS=spreadOf(pages.length-1);
function pageHTML(p){
  if(p==null)return "";
  if(p>=pages.length)return `<div class="run"><span>The End</span><span>全書完</span></div><div class="endp">📖<br><br>謝謝閱讀</div>`;
  const t=pages[p].t;
  if(t==="cover")return `<div class="cover"><div class="orn">✦ ✦ ✦</div><h1>${BOOK.title}</h1><div class="en">${BOOK.en}</div><div class="sub">${BOOK.subtitle}</div><button id="open">翻 開 本 書</button><div class="by">${BOOK.author}</div></div>`;
  if(t==="pref")return `<div class="run"><span>Preface</span><span>簡介</span></div><h2 class="rule">簡介</h2><p class="lead">網路上的學習資源很多，但好內容往往散落在各個平台。本書收錄 YouTube、B站等平台上的優質教育頻道，每個頻道附上簡介、推薦理由與標籤，讓你依興趣快速找到適合自己的學習來源。</p><p>使用方式：翻到「目錄」，用搜尋或標籤篩選主題，再點擊頻道名稱，即可跳到該頻道的介紹頁。</p><p class="meta">目前收錄 ${CHANNELS.length} 個頻道　·　${allPlat.length} 個平台　·　${allTags.length} 個標籤</p><div class="chips">${allTags.map(x=>`<span class="chip" data-jump="${x}">#${x}</span>`).join("")}</div>`;
  if(t==="toc")return `<div class="run"><span>Contents</span><span>目錄</span></div><h2 class="rule">目錄</h2><input class="search" id="q" placeholder="搜尋頻道、標籤或關鍵字…" value="${q}">${chipsHTML()}<ul class="toc" id="list">${listHTML()}</ul>`;
  const i=pages[p].i,c=CHANNELS[i];
  const rel=CHANNELS.map((o,j)=>({o,j,s:o.tags.filter(x=>c.tags.includes(x)).length})).filter(x=>x.j!==i&&x.s>0).sort((a,b)=>b.s-a.s).slice(0,2);
  return `<div class="run"><span>Chapter ${pad(i+1)}</span><span>${c.platform}</span></div><div class="num">${pad(i+1)}</div><h2 class="rule">${c.name}</h2><span class="badge">${c.platform}</span><div class="chips">${c.tags.map(x=>`<span class="chip" data-jump="${x}">#${x}</span>`).join("")}</div><h3>頻道簡介</h3><p>${c.intro}</p>${c.why?`<h3>推薦理由</h3><div class="quote"><p>${c.why}</p></div>`:""}<a class="go" href="${c.url}" target="_blank" rel="noopener">前往頻道 →</a>${rel.length?`<h3>延伸閱讀</h3><div class="rel">${rel.map(x=>`<div data-go="${x.j+3}">${x.o.name}<small>${x.o.tags.join("・")}</small></div>`).join("")}</div>`:""}`;
}
function bind(el,p){
  el.querySelectorAll("[data-go]").forEach(n=>n.onclick=()=>go(+n.dataset.go));
  el.querySelectorAll("[data-tag]").forEach(n=>n.onclick=()=>{filter=n.dataset.tag==="全部"?null:n.dataset.tag;draw()});
  el.querySelectorAll("[data-plat]").forEach(n=>n.onclick=()=>{pf=n.dataset.plat==="全部"?null:n.dataset.plat;draw()});
  el.querySelectorAll("[data-jump]").forEach(n=>n.onclick=()=>{filter=n.dataset.jump;go(2)});
  el.querySelectorAll(".badge").forEach(n=>{n.style.cursor="pointer";n.onclick=()=>{pf=splitP(CHANNELS[pages[p].i].platform)[0];go(2)}});
  const o=el.querySelector("#open");if(o)o.onclick=()=>go(1);
  const s=el.querySelector("#q");if(s)s.oninput=()=>{q=s.value;const l=el.querySelector("#list");l.innerHTML=listHTML();bind(l,p)};
}
function fill(el,p){el.innerHTML=pageHTML(p);el.scrollTop=0;if(p!=null&&p<pages.length)bind(el,p)}
function nav(){
  let pos="",prog,pd,nd;
  if(spread){
    const s=spreadOf(cur),l=leftOf(s),r=rightOf(s);
    pos=s<0?"":`— ${l+1}${r<pages.length?` · ${r+1}`:""} —`;
    prog=(s+1)/(maxS+1);pd=s<0;nd=s>=maxS;
  }else{
    pos=cur>0?`— ${cur+1} —`:"";prog=cur/(pages.length-1);pd=cur===0;nd=cur===pages.length-1;
  }
  $("pos").textContent=pos;$("bar").style.width=prog*100+"%";$("prev").disabled=pd;$("next").disabled=nd;
}
function draw(){
  const b=$("book");
  b.classList.toggle("spread",spread);
  if(spread){
    const s=spreadOf(cur);
    b.classList.toggle("is-cover",s<0);
    fill($("pageL"),leftOf(s));fill($("page"),rightOf(s));
  }else{
    b.classList.toggle("is-cover",pages[cur].t==="cover");
    $("pageL").innerHTML="";fill($("page"),cur);
  }
  nav();
}
// ---- 翻頁動畫 ----
function mk(html,cov,cls){const d=document.createElement("div");d.className="sheet"+(cov?" cov":"");d.innerHTML=`<div class="page ${cls||""}">${html}</div>`;return d}
function flip1(oldHTML,oldCov,dir){
  const st=$("stage"),back=dir==="b",newCov=pages[cur].t==="cover";
  const leaf=document.createElement("div");leaf.className="leaf"+(back?" lb":"");
  const f=back?mk($("page").innerHTML,newCov):mk(oldHTML,oldCov);f.classList.add("f");
  const b=document.createElement("div");b.className="b";leaf.append(f,b);
  let under=null;
  if(back){under=mk(oldHTML,oldCov);under.classList.add("under");st.append(under)}
  st.append(leaf);busy=true;
  let done=false;const end=()=>{if(done)return;done=true;leaf.remove();if(under)under.remove();busy=false};
  leaf.addEventListener("animationend",end);setTimeout(end,1300);
}
// 雙頁：紙張繞著中間的書脊翻動。正面＝右頁，背面＝左頁
function flip2(s0,s1,oL,oR){
  const fwd=s1>s0,st=$("stage"),b=$("book"),L=$("pageL"),R=$("page");
  const l1=leftOf(s1),r1=rightOf(s1);
  b.classList.toggle("is-cover",s1<0);
  const leaf=document.createElement("div");leaf.className="leaf"+(fwd?"":" lb");
  const f=mk(fwd?oR:pageHTML(r1),fwd?s0<0:s1<0,"pgR");f.classList.add("f");
  const bk=mk(fwd?pageHTML(l1):oL,false,"pgL");bk.classList.add("b");
  leaf.append(f,bk);
  if(fwd)fill(R,r1);else fill(L,l1);
  st.append(leaf);busy=true;nav();
  let done=false;
  const end=()=>{if(done)return;done=true;leaf.remove();if(fwd)fill(L,l1);else fill(R,r1);busy=false};
  leaf.addEventListener("animationend",end);setTimeout(end,1300);
}
function go(n){
  if(busy)return;
  const m=Math.max(0,Math.min(pages.length-1,n));
  if(!spread){
    if(m===cur)return;
    const d=m<cur?"b":"f",old=$("page").innerHTML,oc=pages[cur].t==="cover";
    cur=m;draw();flip1(old,oc,d);return;
  }
  const s0=spreadOf(cur),s1=spreadOf(m);
  if(s0===s1){cur=s1<0?0:leftOf(s1);draw();return}
  const oL=$("pageL").innerHTML,oR=$("page").innerHTML;
  cur=s1<0?0:leftOf(s1);
  flip2(s0,s1,oL,oR);
}
const step=d=>{if(spread){const s=Math.max(-1,Math.min(maxS,spreadOf(cur)+d));go(s<0?0:leftOf(s))}else go(cur+d)};
$("prev").onclick=()=>step(-1);$("next").onclick=()=>step(1);$("toc").onclick=()=>go(2);
addEventListener("keydown",e=>{if(e.target.tagName==="INPUT")return;if(e.key==="ArrowLeft")step(-1);if(e.key==="ArrowRight")step(1)});
mq.addEventListener("change",()=>{spread=mq.matches;busy=false;document.querySelectorAll(".leaf,.under").forEach(n=>n.remove());draw()});
draw();
