(function(){
"use strict";
var ART='<svg viewBox="0 0 74 84" aria-hidden="true"><defs><radialGradient id="nvH" cx="38%" cy="32%" r="70%"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#dbe7fb"/></radialGradient><linearGradient id="nvV" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5fc0ff"/><stop offset="1" stop-color="#1746d1"/></linearGradient></defs>'+
'<line x1="37" y1="4" x2="37" y2="13" stroke="#1746d1" stroke-width="3" stroke-linecap="round"/><circle cx="37" cy="4" r="3.6" fill="#6a4ff0"/>'+
'<rect x="17" y="54" width="40" height="26" rx="12" fill="url(#nvH)" stroke="#b8cbeb" stroke-width="2"/><rect x="29" y="61" width="16" height="9" rx="3" fill="#1746d1"/><circle cx="33" cy="65.5" r="1.6" fill="#7cf0df"/><circle cx="41" cy="65.5" r="1.6" fill="#ffd36b"/>'+
'<circle cx="37" cy="36" r="24" fill="url(#nvH)" stroke="#b8cbeb" stroke-width="2"/><rect x="21" y="25" width="32" height="22" rx="11" fill="url(#nvV)"/>'+
'<circle cx="31" cy="35" r="2.6" fill="#fff"/><circle cx="43" cy="35" r="2.6" fill="#fff"/><path d="M31 41 q6 4.5 12 0" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M24 29 q3-4 8-4" stroke="#fff" stroke-opacity=".55" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';
var KB=[
 {k:["cost","price","fee","free","dues","pay","money"],a:'NexGen Lead Groups are free. No dues, no application fee. Donations are welcome and optional. The trade-off: seats go to people who participate. See the <a href="/contribution-code/">Contribution Code</a>.'},
 {k:["donat","give money","support"],a:'Donations are optional and help cover the tech and meeting costs. They are not tax-deductible. Details on the <a href="/donate/">donate page</a>.'},
 {k:["join","seat","sign up","apply","membership","member"],a:'Pick your group and trade on the <a href="/join/">join page</a>. Each group holds one seat per trade, so claim yours before someone in your trade does.'},
 {k:["power pair","pair","partner","match"],a:'A Power Pair is two members who serve the same customer without competing. You focus on finding leads for each other, and you can re-match every week. Try the <a href="/power-pairs/">Power Pair board</a>.'},
 {k:["meet","meeting","schedule","when","zoom","virtual","weekly","in person","in-person"],a:'Every group runs a 45-minute virtual exchange each week, plus an optional in-person meetup once a month. Founding members of each group set the day and time. <a href="/how-it-works/">How it works</a>.'},
 {k:["chat","room","message","allofus"],a:'Each group gets its own private room inside allofus.one, open only to that group\'s members. <a href="/chat/">About the group room</a>.'},
 {k:["denver","aurora","lakewood","littleton","arvada","centennial"],a:'The Denver Metro group is forming now. <a href="/colorado/denver-metro/">See open seats</a>.'},
 {k:["springs","monument","fountain","pueblo"],a:'The Colorado Springs group is forming now. <a href="/colorado/colorado-springs/">See open seats</a>.'},
 {k:["fort collins","loveland","greeley","windsor","northern"],a:'The Fort Collins group is forming now. <a href="/colorado/fort-collins/">See open seats</a>.'},
 {k:["state","nebraska","texas","another state","my state","claim","planet"],a:'Colorado is live first. Every other state is open to claim. A founding leader can bring one live with our help. <a href="/claim-your-state/">Claim your state</a>.'},
 {k:["start","new group","sprout","lead a group","captain","leader"],a:'Want to start a group in your town? Each group has one Group Captain, and our system handles the agenda, scoring and reminders. <a href="/start-a-group/">Start a group</a>.'},
 {k:["tool","idea","who do i know","lead card"],a:'Members use the <a href="/tools/idea-machine/">Idea Machine</a>, <a href="/tools/who-do-i-know/">Who Do I Know</a> and the <a href="/tools/lead-card/">Lead Card</a>. All free, all in your browser.'},
 {k:["remove","kicked","withdraw","attendance","participat","contribut","score"],a:'Membership is free, so participation is what keeps your seat: show up to the weekly exchange, pass real introductions and help your Power Pair. We reserve the right to withdraw a seat from members who do not contribute. <a href="/contribution-code/">Read the code</a>.'},
 {k:["what is","leads group","referral group","how is this different","different"],a:'A leads group is a small set of local business owners who trade referrals. Ours adds smart tech: trigger moments, Power Pairs and real tools, so introductions happen all week, not just at the meeting. <a href="/leads-groups/">What a leads group is</a>.'}
];
var HUMAN='You can reach a real person at <a href="tel:+18004818638">1-800-481-8638</a>, or send a note on the <a href="/contact/">contact page</a>.';
function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e;}
var tab=el("button","nova-tab");tab.type="button";tab.setAttribute("aria-label","Open Nova, the NexGen helper");tab.innerHTML=ART+'<span class="bubble">Need a seat?</span>';
var panel=el("div","nova-panel");panel.setAttribute("role","dialog");panel.setAttribute("aria-label","Nova helper");
panel.innerHTML='<div class="np-head">'+ART+'<div><b>Nova</b><span>NexGen helper. Type "human" for a person.</span></div><button type="button" aria-label="Close Nova">&times;</button></div><div class="np-body" aria-live="polite"></div><div class="np-quick"></div><form class="np-form"><label class="hp" for="nv-in">Ask Nova</label><input id="nv-in" type="text" placeholder="Ask about seats, pairs, meetings" autocomplete="off"><button type="submit">Ask</button></form>';
document.body.appendChild(tab);document.body.appendChild(panel);
var body=panel.querySelector(".np-body"),quick=panel.querySelector(".np-quick"),form=panel.querySelector("form"),input=panel.querySelector("input");
function add(who,html){var m=el("div","msg "+who,html);body.appendChild(m);body.scrollTop=body.scrollHeight;}
function answer(q){
 var s=q.toLowerCase();
 if(/human|person|call|phone|talk to|someone|contact/.test(s)){add("bot",HUMAN);return;}
 var best=null,bs=0;KB.forEach(function(e){var sc=0;e.k.forEach(function(k){if(s.indexOf(k)>-1)sc+=k.length;});if(sc>bs){bs=sc;best=e;}});
 add("bot",best?best.a:'I do not have a good answer for that one yet. '+HUMAN);
}
["How much does it cost?","What is a Power Pair?","When do groups meet?","Claim my seat","Talk to a human"].forEach(function(q){var b=el("button");b.type="button";b.textContent=q;b.addEventListener("click",function(){add("me",q.replace(/[<>]/g,""));answer(q);});quick.appendChild(b);});
var greeted=false;
function open(){panel.classList.add("open");tab.style.display="none";if(!greeted){greeted=true;add("bot","Hi, I am Nova. I help you find your group, your seat and your Power Pair. What can I help with?");}input.focus();}
function close(){panel.classList.remove("open");tab.style.display="";tab.focus();}
tab.addEventListener("click",open);
panel.querySelector(".np-head button").addEventListener("click",close);
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&panel.classList.contains("open"))close();});
form.addEventListener("submit",function(e){e.preventDefault();var q=input.value.trim();if(!q)return;var safe=q.replace(/[&<>]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;"}[c];});add("me",safe);input.value="";answer(q);});
setTimeout(function(){tab.classList.add("hello");setTimeout(function(){tab.classList.remove("hello");},5000);},3500);
})();
