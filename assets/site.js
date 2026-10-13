(function(){
"use strict";
var T0=Date.now();
function $(s,r){return (r||document).querySelector(s);}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));}
function dec(el){try{return atob(el.getAttribute("data-a"))+atob(el.getAttribute("data-b"))+String.fromCharCode(64)+atob(el.getAttribute("data-c"))+atob(el.getAttribute("data-d"));}catch(e){return "";}}

/* header height + mobile menu */
var hdr=$(".hdr"),nav=$("#site-nav"),mb=$(".menu-btn");
function setH(){if(hdr)document.documentElement.style.setProperty("--hdr-h",hdr.getBoundingClientRect().bottom+"px");}
setH();window.addEventListener("resize",setH);window.addEventListener("scroll",function(){if(nav&&nav.classList.contains("open"))setH();},{passive:true});
if(mb&&nav){
 mb.addEventListener("click",function(){var o=!nav.classList.contains("open");setH();nav.classList.toggle("open",o);mb.setAttribute("aria-expanded",o?"true":"false");document.body.classList.toggle("menu-open",o);});
 nav.addEventListener("click",function(e){if(e.target.tagName==="A"){nav.classList.remove("open");mb.setAttribute("aria-expanded","false");document.body.classList.remove("menu-open");}});
 document.addEventListener("keydown",function(e){if(e.key==="Escape"&&nav.classList.contains("open")){mb.click();mb.focus();}});
}

/* protected email links */
$$(".eml").forEach(function(el){var a=dec(el);if(!a)return;el.setAttribute("href","mailto:"+a);el.textContent=a;});

/* bar chart tooltips */
$$(".bars").forEach(function(box){
 var tip=document.createElement("div");tip.className="tip";tip.setAttribute("aria-hidden","true");box.style.position="relative";box.appendChild(tip);
 $$(".bar",box).forEach(function(b){
  function show(){var r=b.getBoundingClientRect(),br=box.getBoundingClientRect(),f=$(".fill",b).getBoundingClientRect();tip.textContent=b.getAttribute("data-tip");tip.style.left=Math.min(br.width-80,Math.max(80,(f.right-br.left)))+"px";tip.style.top=(r.top-br.top)+"px";tip.classList.add("on");}
  function hide(){tip.classList.remove("on");}
  b.addEventListener("mouseenter",show);b.addEventListener("mouseleave",hide);b.addEventListener("focus",show);b.addEventListener("blur",hide);
 });
});

/* seat buttons prefill a form on the page */
$$("[data-seat]").forEach(function(btn){btn.addEventListener("click",function(){
 var f=$("#join-form");if(!f)return;var s=f.querySelector("[name=trade]");if(s)s.value=btn.getAttribute("data-seat");
 var g=f.querySelector("[name=group]");if(g&&btn.getAttribute("data-group"))g.value=btn.getAttribute("data-group");
 f.scrollIntoView({behavior:"smooth",block:"start"});setTimeout(function(){var n=f.querySelector("[name=name]");if(n)n.focus({preventScroll:true});},500);
});});

/* featured planet rotation: rotates weekly once more than one planet is live */
var fp=$("[data-featured]");
if(fp){try{var live=JSON.parse(fp.getAttribute("data-featured"));if(live.length>1){var wk=Math.floor(Date.now()/604800000)%live.length;var pick=live[wk];var t=$("[data-fp-name]",fp);if(t)t.textContent=pick.name;var l=$("[data-fp-link]",fp);if(l)l.href=pick.url;}}catch(e){}}

/* forms */
$$("form[data-ng]").forEach(function(f){
 var touched=false;
 ["keydown","pointerdown","touchstart"].forEach(function(ev){f.addEventListener(ev,function(){touched=true;},{passive:true});});
 var st=f.querySelector(".fstatus");
 function say(cls,msg){if(!st)return;st.className="fstatus show "+cls;st.innerHTML=msg;st.setAttribute("role","status");}
 f.addEventListener("submit",function(e){
  e.preventDefault();
  if(!f.checkValidity()){f.reportValidity();return;}
  var hp=f.querySelector("[name=_honey]");
  var btn=f.querySelector("[type=submit]");
  if((hp&&hp.value)||!touched||Date.now()-T0<4000){say("ok","Thanks. We have your request.");f.reset();return;}
  var addr=dec(f);if(!addr){say("bad","This form could not start. Please call 1-800-481-8638.");return;}
  var fd=new FormData(f);fd.delete("_honey");fd.append("_captcha","false");fd.append("_template","table");fd.append("Page",location.pathname);
  if(btn){btn.disabled=true;btn.dataset.label=btn.textContent;btn.textContent="Sending...";}
  fetch("https:/"+"/formsubmit.co/ajax/"+addr,{method:"POST",headers:{"Accept":"application/json"},body:fd})
  .then(function(r){return r.json().catch(function(){return {};}).then(function(j){return {ok:r.ok,j:j};});})
  .then(function(res){
    var s=res.j&&(res.j.success===true||res.j.success==="true");
    if(res.ok&&s){say("ok","Sent. A real person reads every request, usually within one business day.");f.reset();}
    else if(res.ok){say("maybe","We received your request but could not confirm delivery. If you do not hear back within a business day, call 1-800-481-8638.");}
    else{say("bad","Your request did not go through. Please try again, or call 1-800-481-8638.");}
  })
  .catch(function(){say("bad","Your request did not go through. Check your connection and try again, or call 1-800-481-8638.");})
  .then(function(){if(btn){btn.disabled=false;btn.textContent=btn.dataset.label||"Send";}});
 });
});
})();
