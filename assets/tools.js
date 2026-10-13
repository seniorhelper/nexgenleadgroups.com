(function(){
"use strict";
var L=window.NGL;if(!L)return;
var RM=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function $(s,r){return (r||document).querySelector(s);}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function list(arr,map){return arr.map(function(k){return map[k];}).filter(Boolean);}
function joinNice(a){if(a.length<2)return a.join("");return a.slice(0,-1).join(", ")+" and "+a[a.length-1];}
function store(k,v){try{if(v===undefined){return JSON.parse(localStorage.getItem(k)||"null");}localStorage.setItem(k,JSON.stringify(v));}catch(e){return null;}}
function copy(text,btn){
 function done(){if(btn){var o=btn.textContent;btn.textContent="Copied";setTimeout(function(){btn.textContent=o;},1600);}}
 if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(text).then(done,fallback);}else fallback();
 function fallback(){var t=document.createElement("textarea");t.value=text;t.style.position="fixed";t.style.opacity="0";document.body.appendChild(t);t.select();try{document.execCommand("copy");done();}catch(e){}document.body.removeChild(t);}
}
function burst(label){
 var b=document.createElement("div");b.className="lock-burst";b.setAttribute("aria-hidden","true");
 b.innerHTML='<div class="core"></div><div class="ring"></div><div class="ring r2"></div><div class="ring r3"></div><div class="label">'+esc(label)+'</div>';
 document.body.appendChild(b);setTimeout(function(){b.remove();},RM?900:2400);
 var live=$("#ngl-live");if(!live){live=document.createElement("div");live.id="ngl-live";live.className="hp";live.setAttribute("aria-live","polite");document.body.appendChild(live);}live.textContent=label;
}
window.NGLburst=burst;
function why(a,b,f){
 var c=list(f.cust,L.CUST),t=list(f.trig,L.TRIG);
 if(f.same)return "Same trade. Each group holds one seat per trade, so these two would never sit in the same group.";
 var s=[];
 if(c.length)s.push("Shared customers: "+joinNice(c.slice(0,2))+".");
 if(t.length)s.push("Shared moment: someone who "+t[0]+".");
 if(!s.length)return "Light overlap. These two serve different customers, so leads between them will be occasional.";
 return s.join(" ");
}

/* ---------- hero orbit demo ---------- */
var od=$("#orbit-demo");
if(od){
 var picks=["marketing","realtor","bakery","insurance","cpa","bathremodel","chiro","photographer"];
 var pickBox=$(".od-pick",od),svg=$("svg",od),res=$(".od-result",od);
 var cur=L.byId.marketing,sats=[],ang=0,raf=null,locked=null;
 picks.forEach(function(id){var v=L.byId[id];var b=document.createElement("button");b.type="button";b.className="chip";b.textContent=v.n;b.setAttribute("aria-pressed",id===cur.id?"true":"false");b.addEventListener("click",function(){$$(".chip",pickBox).forEach(function(c){c.setAttribute("aria-pressed","false");});b.setAttribute("aria-pressed","true");cur=v;draw();});pickBox.appendChild(b);});
 var NS="http://www.w3.org/2000/svg";
 function el(n,a){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);return e;}
 var COLORS=["#1746d1","#6a4ff0","#0e8f82","#1593d8","#3d5bd9"];
 function draw(){
  locked=null;while(svg.firstChild)svg.removeChild(svg.firstChild);
  svg.appendChild(el("circle",{cx:200,cy:200,r:150,"class":"od-ring"}));
  svg.appendChild(el("circle",{cx:200,cy:200,r:96,"class":"od-ring"}));
  var core=el("g",{"class":"od-core"});
  core.appendChild(el("circle",{cx:200,cy:200,r:56,fill:"url(#odg)"}));
  var defs=el("defs",{});var g=el("radialGradient",{id:"odg",cx:"35%",cy:"30%",r:"75%"});g.appendChild(el("stop",{offset:"0","stop-color":"#7cc6ff"}));g.appendChild(el("stop",{offset:"1","stop-color":"#1746d1"}));defs.appendChild(g);svg.appendChild(defs);
  var t1=el("text",{x:200,y:194,"font-size":"13"});t1.textContent="You";var t2=el("text",{x:200,y:214,"font-size":"14"});t2.textContent=short(cur.n);core.appendChild(t1);core.appendChild(t2);svg.appendChild(core);
  sats=L.best(cur,5).map(function(m,i){
   var gS=el("g",{"class":"od-sat",tabindex:"0",role:"button","aria-label":"Pair with "+m.v.n+", fit "+m.f.score});
   gS.appendChild(el("circle",{"class":"bg",r:44,stroke:COLORS[i]}));
   var nm=short(m.v.n),ln=nm.length>11&&nm.indexOf(" ")>0?[nm.slice(0,nm.lastIndexOf(" ")),nm.slice(nm.lastIndexOf(" ")+1)]:[nm];
   ln.forEach(function(t,j){var a=el("text",{y:(ln.length>1?-12:-2)+j*15});a.textContent=t;gS.appendChild(a);});
   var p=el("text",{y:ln.length>1?22:15,"class":"pct"});p.textContent=m.f.score+" fit";gS.appendChild(p);
   svg.appendChild(gS);
   function go(){lockSat(i);}
   gS.addEventListener("click",go);gS.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();go();}});
   return {g:gS,m:m,base:i*(Math.PI*2/5)};
  });
  res.innerHTML="Tap a partner to lock a Power Pair. Scores come from shared customers and shared trigger moments.";
  place();
 }
 function short(n){var m={"Real estate agent":"Realtor","Insurance broker":"Insurance","Marketing agency":"Marketing","Print and promo":"Print and promo","Sign company":"Sign shop","Wedding and event planner":"Event planner","Estate planning attorney":"Estate attorney","Personal injury attorney":"Injury attorney","Professional organizer":"Organizer","Water / fire restoration":"Restoration","Commercial real estate":"Commercial realty","Commercial cleaning":"Office cleaning"};if(m[n])return m[n];return n.replace(/ \/.*$/,"").replace(" company","").replace(" shop","");}
 function place(){
  sats.forEach(function(s,i){
   var r=150,a=s.base+ang,x=200+r*Math.cos(a),y=200+r*Math.sin(a);
   if(locked===i){x=200+102*Math.cos(s.lockA);y=200+102*Math.sin(s.lockA);}
   s.g.setAttribute("transform","translate("+x.toFixed(1)+","+y.toFixed(1)+")");
   s.g.style.opacity=(locked===null||locked===i)?"1":".35";
  });
 }
 var paused=false;svg.addEventListener('pointerenter',function(){paused=true;});svg.addEventListener('pointerleave',function(){paused=false;});svg.addEventListener('focusin',function(){paused=true;});svg.addEventListener('focusout',function(){paused=false;});
 function tick(){if(locked===null&&!paused){ang+=0.0016;place();}raf=requestAnimationFrame(tick);}
 function lockSat(i){
  locked=i;var s=sats[i];s.lockA=s.base+ang;place();
  res.innerHTML="<strong>Power Pair locked: "+esc(cur.n)+" + "+esc(s.m.v.n)+".</strong> "+esc(why(cur,s.m.v,s.m.f))+' <a href="/power-pairs/">Build pairs on the full board</a>.';
  burst("Power Pair locked");
  setTimeout(function(){if(locked===i){locked=null;place();}},RM?3000:5200);
 }
 draw();
 if(!RM){var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){if(!raf)raf=requestAnimationFrame(tick);}else if(raf){cancelAnimationFrame(raf);raf=null;}});});io.observe(od);}
}

/* ---------- Power Pair board ---------- */
var pb=$("#pairboard");
if(pb){
 var pool=$(".pool",pb),q=$("#pb-search",pb),slotA=$("#slot-a",pb),slotB=$("#slot-b",pb),out=$("#pb-out",pb),slots=$(".slots",pb),weekBox=$("#pb-week",pb);
 var state={a:null,b:null};
 var week=store("ngl-week")||[];
 function renderPool(){
  var term=(q.value||"").toLowerCase().trim();pool.innerHTML="";
  L.V.filter(function(v){return !term||(v.n+" "+v.a.join(" ")).toLowerCase().indexOf(term)>-1;}).forEach(function(v){
   var c=document.createElement("div");c.className="card";c.textContent=v.n;c.setAttribute("data-id",v.id);c.tabIndex=0;c.setAttribute("role","button");c.setAttribute("aria-label","Place "+v.n+" in the next open slot");
   if(state.a===v.id||state.b===v.id)c.classList.add("sel");
   wire(c);pool.appendChild(c);
  });
  if(!pool.children.length)pool.innerHTML='<p class="small" style="margin:0">No trade matches that search. Try a broader word, like "auto" or "home".</p>';
 }
 function setSlot(which,id){state[which]=id;renderSlots();renderPool();}
 function renderSlots(){
  [["a",slotA],["b",slotB]].forEach(function(p){
   var id=state[p[0]],s=p[1];
   if(id){var v=L.byId[id];s.classList.add("filled");s.innerHTML="<b>"+esc(v.n)+'</b><button type="button">Remove</button>';s.querySelector("button").addEventListener("click",function(){setSlot(p[0],null);});}
   else{s.classList.remove("filled");s.innerHTML=p[0]==="a"?"Drop your trade here":"Drop a partner trade here";}
  });
  slots.classList.remove("locked");
  if(state.a&&state.b)score();else if(state.a)suggest();else out.innerHTML='<p class="small" style="margin:0">Drag two trade cards into the slots, or tap a card to place it.</p>';
 }
 function suggest(){
  var a=L.byId[state.a];
  out.innerHTML='<div class="result"><h3>Strongest partners for '+esc(a.n)+'</h3><p class="small">Tap one to drop it in.</p><div class="pool" style="background:#fff">'+L.best(a,6).map(function(m){return '<button type="button" class="chip" data-pick="'+m.v.id+'">'+esc(m.v.n)+" · "+m.f.score+'</button>';}).join("")+"</div></div>";
  $$("[data-pick]",out).forEach(function(b){b.addEventListener("click",function(){setSlot("b",b.getAttribute("data-pick"));});});
 }
 function score(){
  var a=L.byId[state.a],b=L.byId[state.b],f=L.fit(a,b);
  if(f.same){out.innerHTML='<div class="result"><h3>Same seat</h3><p>'+esc(why(a,b,f))+"</p></div>";return;}
  var tA=a.t.filter(function(k){return b.t.indexOf(k)<0;}).slice(0,2).map(function(k){return L.TRIG[k];});
  var tB=b.t.filter(function(k){return a.t.indexOf(k)<0;}).slice(0,2).map(function(k){return L.TRIG[k];});
  out.innerHTML='<div class="result"><h3>Fit score: '+f.score+'</h3><div class="meter" aria-hidden="true"><i></i></div><p>'+esc(why(a,b,f))+'</p>'+
   '<p><b>'+esc(b.n)+' listens for '+esc(a.n.toLowerCase())+' leads when someone</b> '+esc(joinNice(tA.length?tA:list(a.t,L.TRIG).slice(0,2)))+'.</p>'+
   '<p><b>'+esc(a.n)+' listens for '+esc(b.n.toLowerCase())+' leads when someone</b> '+esc(joinNice(tB.length?tB:list(b.t,L.TRIG).slice(0,2)))+'.</p>'+
   '<button type="button" class="btn" id="pb-lock">Lock this Power Pair</button></div>';
  requestAnimationFrame(function(){$(".meter i",out).style.width=f.score+"%";});
  $("#pb-lock",out).addEventListener("click",function(){
   slots.classList.add("locked");burst("Power Pair locked");
   week=week.filter(function(w){return !(w.a===a.id&&w.b===b.id);});week.unshift({a:a.id,b:b.id,s:f.score});week=week.slice(0,6);store("ngl-week",week);renderWeek();
  });
 }
 function renderWeek(){
  if(!weekBox)return;
  if(!week.length){weekBox.innerHTML='<p class="small" style="margin:0">Pairs you lock show up here, saved in this browser only.</p>';return;}
  weekBox.innerHTML="<ul>"+week.map(function(w){return "<li>"+esc(L.byId[w.a].n)+" + "+esc(L.byId[w.b].n)+" ("+w.s+" fit)</li>";}).join("")+'</ul><button type="button" class="btn ghost sm" id="pb-clear">Clear my pairs</button>';
  $("#pb-clear",weekBox).addEventListener("click",function(){week=[];store("ngl-week",week);renderWeek();});
 }
 function place(id){if(!state.a)setSlot("a",id);else if(!state.b&&id!==state.a)setSlot("b",id);else setSlot("b",id);}
 function wire(c){
  var sx,sy,drag=false,ghost=null,pid=null;
  c.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();place(c.getAttribute("data-id"));}});
  c.addEventListener("pointerdown",function(e){if(e.button>0)return;sx=e.clientX;sy=e.clientY;drag=false;pid=e.pointerId;try{c.setPointerCapture(pid);}catch(x){}});
  c.addEventListener("pointermove",function(e){
   if(pid!==e.pointerId)return;
   if(!drag&&Math.abs(e.clientX-sx)+Math.abs(e.clientY-sy)>7){drag=true;ghost=c.cloneNode(true);ghost.classList.add("ghost");document.body.appendChild(ghost);c.classList.add("dragging");}
   if(drag){ghost.style.left=(e.clientX-40)+"px";ghost.style.top=(e.clientY-20)+"px";var t=under(e);[slotA,slotB].forEach(function(s){s.classList.toggle("over",s===t);});}
  });
  function end(e){
   if(pid!==e.pointerId)return;pid=null;
   if(drag){var t=under(e);if(ghost)ghost.remove();ghost=null;c.classList.remove("dragging");[slotA,slotB].forEach(function(s){s.classList.remove("over");});if(t===slotA)setSlot("a",c.getAttribute("data-id"));else if(t===slotB)setSlot("b",c.getAttribute("data-id"));}
   else if(e.type==="pointerup")place(c.getAttribute("data-id"));
   drag=false;
  }
  c.addEventListener("pointerup",end);c.addEventListener("pointercancel",end);
 }
 function under(e){var g=document.elementFromPoint(e.clientX,e.clientY);while(g){if(g===slotA||g===slotB)return g;g=g.parentElement;}return null;}
 q.addEventListener("input",renderPool);
 renderPool();renderSlots();renderWeek();
}

/* ---------- Idea Machine ---------- */
var im=$("#ideamachine");
if(im){
 var inp=$("#im-q",im),outI=$("#im-out",im),lastText="";
 function run(){
  var term=inp.value.trim();
  if(!term){outI.innerHTML='<p class="fstatus show maybe">Type a trade or a keyword first, like "roofing" or "wedding cakes".</p>';return;}
  var v=L.find(term);
  if(!v){outI.innerHTML='<div class="result"><h3>That trade is not in the library yet</h3><p>Try a nearby word (for example "contractor", "coach" or "insurance"), or tell us your trade on the <a href="/join/">join form</a> and we will add it.</p></div>';return;}
  var partners=L.best(v,6),trig=list(v.t,L.TRIG),cust=list(v.c,L.CUST);
  var html='<div class="result"><h3>Matched trade: '+esc(v.n)+'</h3>'+
   '<h4>Partner trades to pair with first</h4><ul>'+partners.map(function(m){return "<li><b>"+esc(m.v.n)+"</b> ("+m.f.score+" fit). "+esc(why(v,m.v,m.f))+"</li>";}).join("")+"</ul>"+
   "<h4>Trigger moments to teach your group</h4><ul>"+trig.map(function(t){return "<li>Someone who "+esc(t)+"</li>";}).join("")+"</ul>"+
   "<h4>Where your leads hide</h4><ul>"+v.h.map(function(h){return "<li>"+esc(h.charAt(0).toUpperCase()+h.slice(1))+"</li>";}).join("")+"</ul>"+
   "<h4>Lines your partners can actually say</h4><ul>"+
   trig.slice(0,3).map(function(t){return "<li>\"You mentioned you "+esc(t.replace(/^is /,"are ").replace(/^just /,"just ").replace(/^was /,"were ").replace(/^had /,"had ").replace(/^set /,"set "))+". I know a "+esc(v.n.toLowerCase())+" I trust. Want an intro?\"</li>";}).join("")+"</ul>"+
   "<h4>Seven-day plan</h4><ol>"+
   "<li>Pick one partner trade above and ask that member for a 20-minute call.</li>"+
   "<li>Trade your top two trigger moments with each other.</li>"+
   "<li>Each of you runs <a href=\"/tools/who-do-i-know/\">Who Do I Know</a> for the other.</li>"+
   "<li>Send one warm introduction using a <a href=\"/tools/lead-card/\">Lead Card</a>.</li>"+
   "<li>Post a 'who I am looking for' note in your group room.</li>"+
   "<li>Follow up on every lead you received within 24 hours.</li>"+
   "<li>Report wins at the weekly exchange.</li></ol>"+
   '<button type="button" class="btn ghost sm" id="im-copy">Copy these ideas</button></div>';
  outI.innerHTML=html;
  lastText=outI.innerText.replace(/Copy these ideas\s*$/,"").trim();
  $("#im-copy",outI).addEventListener("click",function(){copy(lastText,this);});
  outI.querySelector("h3").setAttribute("tabindex","-1");outI.querySelector("h3").focus({preventScroll:false});
 }
 $("#im-go",im).addEventListener("click",run);
 inp.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();run();}});
 $$("[data-try]",im).forEach(function(b){b.addEventListener("click",function(){inp.value=b.getAttribute("data-try");run();});});
}

/* ---------- Who Do I Know ---------- */
var wk=$("#whoknow");
if(wk){
 var sel=$("#wk-trade",wk),stage=$("#wk-stage",wk);
 L.V.slice().sort(function(a,b){return a.n<b.n?-1:1;}).forEach(function(v){var o=document.createElement("option");o.value=v.id;o.textContent=v.n;sel.appendChild(o);});
 var circles=["family","neighbors","clients and customers","friends from the gym, clubs or your kids' activities","coworkers and old coworkers","people you follow or chat with online","your own vendors and service pros"];
 var data=null,step=0;
 function start(){
  var v=L.byId[sel.value];if(!v){stage.innerHTML='<p class="fstatus show maybe">Pick the trade you are finding leads for.</p>';return;}
  data={trade:v.id,answers:{}};step=0;store("ngl-who",data);show();
 }
 function show(){
  var v=L.byId[data.trade],tr=v.t,tot=tr.length;
  if(step>=tot){finish();return;}
  var key=tr[step],have=data.answers[key]||["","",""];
  stage.innerHTML='<p class="progress">Question '+(step+1)+" of "+tot+" for your "+esc(v.n.toLowerCase())+' partner</p>'+
   '<p class="who-q">Who do you know who '+esc(L.TRIG[key])+"?</p>"+
   '<p class="small">Think through your '+esc(circles[step%circles.length])+", then your "+esc(circles[(step+3)%circles.length])+". First names are fine. Nothing here leaves your browser.</p>"+
   '<div class="fgrid">'+[0,1,2].map(function(i){return '<div><label for="wk-n'+i+'">Name '+(i+1)+'</label><input type="text" id="wk-n'+i+'" value="'+esc(have[i])+'" autocomplete="off"></div>';}).join("")+"</div>"+
   '<div class="hero-actions">'+(step>0?'<button type="button" class="btn ghost" id="wk-back">Back</button>':"")+'<button type="button" class="btn" id="wk-next">'+(step===tot-1?"Build my list":"Next question")+"</button></div>";
  $("#wk-n0",stage).focus();
  $("#wk-next",stage).addEventListener("click",function(){save();step++;show();});
  var bk=$("#wk-back",stage);if(bk)bk.addEventListener("click",function(){save();step--;show();});
  $$("input",stage).forEach(function(i){i.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();save();step++;show();}});});
  function save(){data.answers[key]=[0,1,2].map(function(i){return $("#wk-n"+i,stage).value.trim();});store("ngl-who",data);}
 }
 function finish(){
  var v=L.byId[data.trade],rows=[];
  v.t.forEach(function(k){(data.answers[k]||[]).forEach(function(n){if(n)rows.push({n:n,t:L.TRIG[k]});});});
  if(!rows.length){stage.innerHTML='<div class="result"><h3>No names yet</h3><p>That is normal on the first pass. Give it a day, then <button type="button" class="btn ghost sm" id="wk-again">run it again</button>.</p></div>';$("#wk-again",stage).addEventListener("click",function(){step=0;show();});return;}
  var txt="My Who Do I Know list for a "+v.n.toLowerCase()+"\n\n"+rows.map(function(r,i){return (i+1)+". "+r.n+" (someone who "+r.t+")";}).join("\n")+"\n\nIntro I can send:\n\"Hi [name], I know a "+v.n.toLowerCase()+" I trust and thought of you. Okay if I connect you two?\"";
  stage.innerHTML='<div class="result"><h3>Your list: '+rows.length+(rows.length===1?" person":" people")+'</h3><ol>'+rows.map(function(r){return "<li><b>"+esc(r.n)+"</b>, someone who "+esc(r.t)+"</li>";}).join("")+'</ol><p>Ask each one before you share their details. Then send the intro with a <a href="/tools/lead-card/">Lead Card</a>.</p><div class="hero-actions"><button type="button" class="btn" id="wk-copy">Copy my list</button><button type="button" class="btn ghost" id="wk-reset">Start over</button></div></div>';
  $("#wk-copy",stage).addEventListener("click",function(){copy(txt,this);});
  $("#wk-reset",stage).addEventListener("click",function(){data=null;store("ngl-who",null);stage.innerHTML="";sel.focus();});
 }
 $("#wk-start",wk).addEventListener("click",start);
 var saved=store("ngl-who");if(saved&&L.byId[saved.trade]){data=saved;sel.value=saved.trade;stage.innerHTML='<p class="small">You have a list in progress. <button type="button" class="btn ghost sm" id="wk-resume">Resume it</button></p>';$("#wk-resume",stage).addEventListener("click",function(){step=0;show();});}
}

/* ---------- Lead Card ---------- */
var lc=$("#leadcard");
if(lc){
 var form=$("form",lc),prev=$("#lc-prev"),tradeSel=form.querySelector("[name=lc_trade]");
 L.V.slice().sort(function(a,b){return a.n<b.n?-1:1;}).forEach(function(v){var o=document.createElement("option");o.value=v.n;o.textContent=v.n;tradeSel.appendChild(o);});
 form.addEventListener("submit",function(e){
  e.preventDefault();if(!form.checkValidity()){form.reportValidity();return;}
  var g=function(n){return (form.querySelector("[name="+n+"]")||{}).value||"";};
  var heat=g("lc_heat"),card={to:g("lc_to"),trade:g("lc_trade"),who:g("lc_who"),reach:g("lc_reach"),need:g("lc_need"),when:g("lc_when"),from:g("lc_from")};
  var text="NexGen Lead Card\nHeat: "+heat+"\nFor: "+card.to+" ("+card.trade+")\nContact: "+card.who+"\nBest way to reach: "+card.reach+"\nWhat they need: "+card.need+"\nTiming: "+card.when+"\nFrom: "+card.from+"\nPermission to share: yes, the contact agreed to this introduction.";
  prev.innerHTML='<div class="lc-card"><span class="heat">'+esc(heat)+'</span><h3 style="margin-top:10px">Lead for '+esc(card.to)+'</h3><dl><dt>Trade</dt><dd>'+esc(card.trade)+'</dd><dt>Contact</dt><dd>'+esc(card.who)+'</dd><dt>Reach by</dt><dd>'+esc(card.reach)+'</dd><dt>Needs</dt><dd>'+esc(card.need)+'</dd><dt>Timing</dt><dd>'+esc(card.when)+'</dd><dt>From</dt><dd>'+esc(card.from)+'</dd><dt>Permission</dt><dd>Given by the contact</dd></dl></div>'+
   '<div class="hero-actions"><button type="button" class="btn" id="lc-copy">Copy card text</button><a class="btn ghost" id="lc-mail" href="#">Email it</a></div><p class="small">This card was built in your browser. Nothing was sent to us.</p>';
  var pe=g("lc_email");$("#lc-mail",prev).href="mailto:"+encodeURIComponent(pe)+"?subject="+encodeURIComponent("Lead for you: "+card.who)+"&body="+encodeURIComponent(text);
  $("#lc-copy",prev).addEventListener("click",function(){copy(text,this);});
  burst("Lead Card ready");
  prev.scrollIntoView({behavior:RM?"auto":"smooth",block:"nearest"});
 });
}
})();
