/* NexGen trade library */
(function(){
var CUST={
 homeowner:"homeowners", buyer:"home buyers", seller:"home sellers", newbiz:"new businesses", growbiz:"growing businesses",
 couple:"engaged couples", family:"families", senior:"seniors and their families", renter:"renters", commprop:"commercial property owners",
 restaurant:"restaurants and food businesses", event:"event hosts", health:"health-minded people", driver:"car owners",
 investor:"investors", office:"offices and teams", startup:"startups", pro:"working professionals", pet:"pet owners", landlord:"landlords"
};
var TRIG={
 buying:"just bought a home", selling:"is getting ready to sell", moving:"is moving", renovating:"is remodeling or fixing up a property",
 opening:"is opening a business or new location", hiring:"is hiring or growing a team", wedding:"just got engaged", baby:"is expecting a baby",
 retiring:"is retiring or planning to", newcar:"just bought a vehicle", accident:"was in an accident or had a claim", storm:"had hail, wind or water damage",
 celebration:"is planning a party or milestone event", launch:"is launching a product, service or website", refinance:"is refinancing or taking equity out",
 estate:"is settling an estate or caring for aging parents", wellness:"set a new health or fitness goal", taxes:"is behind on books or dreading tax season",
 rebrand:"is rebranding or unhappy with their marketing", lease:"is signing or renewing a commercial lease", tech:"is fighting slow tech or a cyber scare",
 newpet:"just adopted a pet", sale:"is selling or buying a business"
};
var V=[
 {id:"marketing",n:"Marketing agency",a:["marketing","seo","digital marketing","ads","advertising","social media","ppc","agency","branding"],c:["newbiz","growbiz","startup","restaurant"],t:["opening","launch","rebrand","hiring","sale"],h:["new business license filings","grand-opening posts in local groups","businesses with outdated websites","owners complaining about slow months"],g:["webdesign","printing","bakery","cpa","signage","photographer","insurance"]},
 {id:"webdesign",n:"Web designer",a:["website","web design","web developer","developer","wordpress","shopify"],c:["newbiz","growbiz","startup"],t:["opening","launch","rebrand"],h:["businesses with no website on their Google profile","owners asking for 'website guy' recommendations","new LLC registrations"],g:["marketing","printing","photographer","itservices","cpa"]},
 {id:"bakery",n:"Bakery",a:["bakery","cakes","baker","cupcakes","pastry","desserts","cookies"],c:["couple","family","office","event"],t:["wedding","baby","celebration","opening","hiring"],h:["office managers planning team events","engagement announcements","grand openings that need treats","client-appreciation gifts"],g:["weddingplanner","florist","eventvenue","photographer","marketing","realtor"]},
 {id:"insurance",n:"Insurance broker",a:["insurance","insurance agent","p&c","home insurance","auto insurance","business insurance"],c:["homeowner","buyer","driver","newbiz","landlord","family"],t:["buying","newcar","opening","baby","hiring","storm"],h:["closing tables","new vehicle purchases","new business filings","renewal-season gripes"],g:["realtor","mortgage","autorepair","cpa","financialadvisor","roofer"]},
 {id:"realtor",n:"Real estate agent",a:["realtor","real estate","real estate agent","broker","homes","listing agent"],c:["buyer","seller","family","investor","renter"],t:["buying","selling","moving","baby","retiring","estate"],h:["growing families out of space","empty nesters","renters with steady income","estate and probate situations"],g:["mortgage","inspector","insurance","movers","titleco","stager","painter"]},
 {id:"mortgage",n:"Mortgage lender",a:["mortgage","lender","loan officer","home loan","refinance","heloc"],c:["buyer","homeowner","investor","family"],t:["buying","refinance","moving","renovating"],h:["renters asking about rates","homeowners planning big remodels","pre-approval questions in local groups"],g:["realtor","insurance","financialadvisor","cpa","titleco","inspector"]},
 {id:"titleco",n:"Title and escrow",a:["title","escrow","title company","closing"],c:["buyer","seller","investor","landlord"],t:["buying","selling","refinance","estate"],h:["agents switching title partners","investors flipping properties","FSBO sellers"],g:["realtor","mortgage","attorneyestate","inspector"]},
 {id:"inspector",n:"Home inspector",a:["home inspector","inspection","inspector"],c:["buyer","seller","investor"],t:["buying","selling"],h:["buyers under contract","sellers who want a pre-listing inspection","investors buying rentals"],g:["realtor","mortgage","roofer","hvac","plumber","electrician"]},
 {id:"roofer",n:"Roofer",a:["roofing","roofer","roof","gutters","siding","hail damage","hail"],c:["homeowner","commprop","landlord","seller"],t:["storm","selling","buying","renovating"],h:["neighborhoods after a hail storm","inspection reports with roof notes","older homes going on the market"],g:["insurance","inspector","painter","gc","solar","realtor"]},
 {id:"plumber",n:"Plumber",a:["plumbing","plumber","water heater","drain","sewer"],c:["homeowner","landlord","commprop","restaurant"],t:["buying","renovating","storm","opening"],h:["inspection reports","restaurant build-outs","landlords with aging rentals"],g:["hvac","electrician","bathremodel","gc","inspector","restoration"]},
 {id:"electrician",n:"Electrician",a:["electrical","electrician","ev charger","panel","lighting"],c:["homeowner","commprop","landlord","newbiz"],t:["renovating","opening","newcar","buying"],h:["new EV owners","tenant build-outs","older homes being sold"],g:["solar","hvac","plumber","gc","security","itservices"]},
 {id:"hvac",n:"HVAC company",a:["hvac","heating","cooling","furnace","air conditioning","ac"],c:["homeowner","landlord","commprop","senior"],t:["buying","renovating","moving"],h:["home buyers' first winter","property managers","older homes with original systems"],g:["plumber","electrician","inspector","solar","realtor","insurance"]},
 {id:"painter",n:"Painting company",a:["painter","painting","house painting","cabinet painting","commercial painting"],c:["homeowner","seller","landlord","commprop","office"],t:["selling","buying","renovating","opening","moving"],h:["homes about to list","tenant turnovers","new office leases"],g:["realtor","stager","gc","cleaning","flooring","windowcover"]},
 {id:"landscaper",n:"Landscaper",a:["landscaping","lawn","landscaper","yard","sprinklers","snow removal","hardscape"],c:["homeowner","commprop","seller","landlord"],t:["buying","selling","celebration","moving"],h:["new homeowners in spring","listings that need curb appeal","HOA and property managers"],g:["realtor","pestcontrol","roofer","painter","poolspa"]},
 {id:"cleaning",n:"House cleaning",a:["cleaning","maid","house cleaning","housekeeping","move out cleaning"],c:["homeowner","family","pro","senior","renter"],t:["moving","selling","baby","celebration","estate"],h:["move-in and move-out dates","new parents","busy two-career households"],g:["movers","realtor","organizer","carpet","painter"]},
 {id:"commclean",n:"Commercial cleaning",a:["janitorial","commercial cleaning","office cleaning"],c:["office","commprop","restaurant","newbiz"],t:["opening","lease","hiring"],h:["new office leases","property managers","medical and dental offices"],g:["commercialre","itservices","security","staffing","printing"]},
 {id:"bathremodel",n:"Bath remodeler",a:["bath remodel","bathroom","walk in tub","walk-in shower","shower","tub"],c:["homeowner","senior","seller"],t:["renovating","retiring","estate","selling","buying"],h:["aging parents struggling with tubs","dated homes being sold","new owners fixing up"],g:["plumber","realtor","homecare","interiordesign","gc","inspector"]},
 {id:"gc",n:"General contractor",a:["contractor","general contractor","remodeling","builder","construction","handyman"],c:["homeowner","commprop","investor","landlord"],t:["renovating","buying","storm","opening"],h:["permits being pulled","investors buying fixers","tenant build-outs"],g:["electrician","plumber","painter","interiordesign","mortgage","roofer"]},
 {id:"interiordesign",n:"Interior designer",a:["interior design","designer","decorator","staging"],c:["homeowner","buyer","office","restaurant"],t:["buying","renovating","opening","moving"],h:["new homeowners with empty rooms","restaurant and office build-outs","remodel clients"],g:["gc","stager","windowcover","flooring","painter","realtor"]},
 {id:"stager",n:"Home stager",a:["home staging","stager"],c:["seller","investor"],t:["selling"],h:["listings sitting too long","vacant flips"],g:["realtor","painter","photographer","cleaning"]},
 {id:"movers",n:"Moving company",a:["movers","moving","moving company","storage"],c:["buyer","seller","renter","senior","office"],t:["moving","buying","selling","retiring","estate","lease"],h:["closing dates","downsizing seniors","office relocations"],g:["realtor","cleaning","organizer","insurance","titleco"]},
 {id:"organizer",n:"Professional organizer",a:["organizer","organizing","declutter","downsizing"],c:["family","senior","pro"],t:["moving","estate","retiring","baby"],h:["downsizing seniors","families before a move","estate cleanouts"],g:["movers","cleaning","realtor","attorneyestate"]},
 {id:"financialadvisor",n:"Financial advisor",a:["financial advisor","financial planner","wealth","retirement planning","investments"],c:["pro","senior","investor","family"],t:["retiring","sale","estate","baby","refinance"],h:["business owners planning an exit","people nearing retirement","new parents"],g:["cpa","attorneyestate","insurance","mortgage","bookkeeper"]},
 {id:"cpa",n:"CPA / tax pro",a:["cpa","accountant","tax","taxes","tax preparer"],c:["newbiz","growbiz","pro","investor","startup"],t:["taxes","opening","sale","hiring"],h:["owners dreading tax season","new LLCs","side hustles turning real"],g:["bookkeeper","financialadvisor","attorneybiz","insurance","marketing"]},
 {id:"bookkeeper",n:"Bookkeeper",a:["bookkeeping","bookkeeper","quickbooks","payroll"],c:["newbiz","growbiz","startup","restaurant"],t:["taxes","hiring","opening"],h:["owners doing books at midnight","businesses hiring their first employee"],g:["cpa","financialadvisor","staffing","itservices"]},
 {id:"attorneyestate",n:"Estate planning attorney",a:["estate attorney","wills","trusts","probate","estate planning"],c:["family","senior","investor"],t:["baby","retiring","estate","buying"],h:["new parents","new homeowners","adult kids helping aging parents"],g:["financialadvisor","cpa","realtor","homecare","insurance"]},
 {id:"attorneybiz",n:"Business attorney",a:["business attorney","lawyer","contracts","llc"],c:["newbiz","growbiz","startup"],t:["opening","sale","hiring","lease"],h:["partners starting a company","lease negotiations","owners selling"],g:["cpa","commercialre","insurance","financialadvisor"]},
 {id:"itservices",n:"IT services",a:["it","managed it","computer repair","tech support","cybersecurity","network"],c:["office","growbiz","startup","newbiz"],t:["tech","opening","hiring","lease"],h:["offices moving","businesses after a cyber scare","teams going hybrid"],g:["webdesign","security","commclean","printing","bookkeeper"]},
 {id:"printing",n:"Print and promo",a:["printing","print shop","promotional products","swag","business cards","apparel"],c:["newbiz","growbiz","event","office"],t:["opening","launch","rebrand","celebration","hiring"],h:["grand openings","trade show season","companies onboarding new hires"],g:["marketing","signage","webdesign","eventvenue","photographer"]},
 {id:"signage",n:"Sign company",a:["signs","signage","vehicle wraps","banners"],c:["newbiz","growbiz","commprop","restaurant"],t:["opening","rebrand","lease"],h:["empty storefronts getting leased","fleet vehicles","rebrands"],g:["marketing","printing","commercialre","gc"]},
 {id:"photographer",n:"Photographer",a:["photographer","photography","headshots","video","videographer"],c:["couple","family","growbiz","seller"],t:["wedding","baby","launch","rebrand","selling"],h:["engagements","team headshot days","listings that need photos"],g:["weddingplanner","florist","marketing","realtor","stager","bakery"]},
 {id:"weddingplanner",n:"Wedding and event planner",a:["wedding planner","event planner","events","coordinator"],c:["couple","event","office"],t:["wedding","celebration"],h:["engagement posts","company milestone parties"],g:["florist","bakery","caterer","eventvenue","photographer"]},
 {id:"florist",n:"Florist",a:["florist","flowers"],c:["couple","event","family","office"],t:["wedding","celebration","baby","estate"],h:["engagements","funerals and memorials","corporate events"],g:["weddingplanner","bakery","eventvenue","photographer","caterer"]},
 {id:"caterer",n:"Caterer",a:["catering","caterer","food truck","private chef","chef"],c:["event","office","couple","family"],t:["celebration","wedding","opening","hiring"],h:["office lunches","grand openings","family milestones"],g:["eventvenue","weddingplanner","bakery","florist","printing"]},
 {id:"eventvenue",n:"Event venue",a:["venue","event venue","banquet","event space"],c:["event","couple","office"],t:["wedding","celebration","launch"],h:["engaged couples","company retreats","product launches"],g:["caterer","weddingplanner","florist","photographer","bakery"]},
 {id:"restaurant",n:"Restaurant",a:["restaurant","cafe","bar","brewery","coffee shop"],c:["family","office","event"],t:["celebration","opening","hiring"],h:["office group lunches","nearby new businesses","birthday parties"],g:["marketing","caterer","printing","bookkeeper","commclean"]},
 {id:"trainer",n:"Personal trainer / gym",a:["personal trainer","gym","fitness","yoga","pilates","coach"],c:["health","pro","couple"],t:["wellness","wedding","baby","moving"],h:["new-year and wedding goals","new movers looking for a gym"],g:["chiro","massage","nutrition","physical","medspa"]},
 {id:"chiro",n:"Chiropractor",a:["chiropractor","chiro","spine"],c:["health","driver","pro"],t:["accident","wellness"],h:["people after a car accident","desk workers with back pain","athletes"],g:["massage","trainer","autorepair","attorneyinjury","physical"]},
 {id:"physical",n:"Physical therapist",a:["physical therapy","pt","rehab"],c:["health","senior","driver"],t:["accident","wellness","retiring"],h:["post-surgery patients","weekend athletes","seniors with balance issues"],g:["chiro","trainer","homecare","massage"]},
 {id:"massage",n:"Massage therapist",a:["massage","massage therapist","spa"],c:["health","pro","couple"],t:["wellness","celebration","accident"],h:["gift seasons","stressed professionals","post-injury recovery"],g:["chiro","trainer","medspa","salon"]},
 {id:"nutrition",n:"Nutrition coach",a:["nutrition","dietitian","meal prep","nutritionist"],c:["health","pro","family"],t:["wellness","baby","wedding"],h:["new gym members","brides and grooms with a date"],g:["trainer","chiro","medspa"]},
 {id:"medspa",n:"Med spa / aesthetics",a:["med spa","medspa","botox","aesthetics","skin care"],c:["health","pro","couple"],t:["wedding","celebration","wellness"],h:["wedding parties","milestone birthdays"],g:["salon","photographer","trainer","massage"]},
 {id:"salon",n:"Hair salon / barber",a:["salon","hair","barber","stylist","nails"],c:["pro","couple","family"],t:["wedding","celebration","moving"],h:["wedding parties","new movers needing a stylist"],g:["medspa","photographer","weddingplanner","massage"]},
 {id:"homecare",n:"Home care / senior care",a:["home care","senior care","caregiver","assisted living","senior living"],c:["senior","family"],t:["estate","retiring","accident"],h:["adult kids worried about a parent","hospital discharges"],g:["bathremodel","attorneyestate","financialadvisor","physical","movers"]},
 {id:"autorepair",n:"Auto repair shop",a:["auto repair","mechanic","auto shop","oil change","body shop","collision"],c:["driver","family","office"],t:["accident","newcar","moving"],h:["new movers without a mechanic","fleet businesses","after hail storms"],g:["autoglass","insurance","chiro","detailing","attorneyinjury"]},
 {id:"autoglass",n:"Auto glass",a:["auto glass","windshield","windshield repair"],c:["driver","office"],t:["storm","accident","newcar"],h:["parking lots after hail","fleet managers","rideshare drivers"],g:["autorepair","insurance","detailing"]},
 {id:"detailing",n:"Auto detailer",a:["detailing","car detailing","ceramic coating","car wash"],c:["driver","pro"],t:["newcar","selling","celebration"],h:["new car buyers","people selling a car","wedding cars"],g:["autorepair","autoglass","photographer"]},
 {id:"attorneyinjury",n:"Personal injury attorney",a:["injury lawyer","personal injury","accident attorney","accident lawyer","car accident"],c:["driver","health"],t:["accident"],h:["car accidents","slip and falls"],g:["chiro","autorepair","physical","insurance"]},
 {id:"staffing",n:"Staffing / HR",a:["staffing","recruiter","hr","human resources","temp agency"],c:["growbiz","office","restaurant","startup"],t:["hiring","opening"],h:["help-wanted signs","businesses opening a second location"],g:["bookkeeper","cpa","commclean","itservices","printing"]},
 {id:"commercialre",n:"Commercial real estate",a:["commercial real estate","commercial broker","office space","leasing"],c:["growbiz","newbiz","commprop","investor"],t:["lease","opening","sale"],h:["businesses outgrowing their space","leases ending within a year"],g:["attorneybiz","gc","signage","commclean","itservices","insurance"]},
 {id:"bizcoach",n:"Business coach",a:["business coach","consultant","coaching","mentor"],c:["growbiz","startup","newbiz"],t:["hiring","sale","rebrand","launch"],h:["owners stuck at a plateau","first-time managers"],g:["marketing","cpa","financialadvisor","attorneybiz","staffing"]},
 {id:"security",n:"Security and alarm",a:["security","alarm","cameras","smart home","locksmith"],c:["homeowner","newbiz","commprop","office"],t:["buying","opening","moving","lease"],h:["new homeowners","new storefronts","after break-ins nearby"],g:["electrician","itservices","insurance","realtor"]},
 {id:"solar",n:"Solar installer",a:["solar","solar panels","battery","energy"],c:["homeowner","commprop"],t:["buying","renovating","newcar"],h:["new EV owners","roof replacements","high summer bills"],g:["roofer","electrician","hvac","mortgage"]},
 {id:"pestcontrol",n:"Pest control",a:["pest control","exterminator","pests","termite"],c:["homeowner","restaurant","landlord","commprop"],t:["buying","opening","selling"],h:["home inspections","restaurant openings","rental turnovers"],g:["inspector","landscaper","realtor","restaurant"]},
 {id:"windowcover",n:"Window coverings",a:["blinds","shutters","window coverings","shades","curtains"],c:["homeowner","buyer","office"],t:["buying","moving","renovating"],h:["new homeowners with bare windows","new offices"],g:["interiordesign","painter","flooring","realtor"]},
 {id:"flooring",n:"Flooring",a:["flooring","carpet","hardwood","tile","lvp"],c:["homeowner","seller","landlord","commprop"],t:["renovating","selling","buying","storm"],h:["water damage claims","rentals between tenants","homes about to list"],g:["painter","gc","interiordesign","restoration","realtor"]},
 {id:"carpet",n:"Carpet cleaning",a:["carpet cleaning","upholstery","rug cleaning"],c:["homeowner","renter","landlord","pet"],t:["moving","selling","newpet"],h:["move-outs","pet owners","listings"],g:["cleaning","realtor","petgroomer","flooring"]},
 {id:"restoration",n:"Water / fire restoration",a:["restoration","water damage","mold","fire damage"],c:["homeowner","commprop","landlord"],t:["storm","accident"],h:["burst pipes in a freeze","flooded basements"],g:["plumber","insurance","flooring","gc","roofer"]},
 {id:"poolspa",n:"Pool and hot tub",a:["pool","hot tub","spa service"],c:["homeowner","senior"],t:["buying","renovating","celebration"],h:["new homeowners with a pool","backyard remodels"],g:["landscaper","electrician","gc"]},
 {id:"petgroomer",n:"Pet groomer / pet care",a:["pet","groomer","dog walker","pet sitter","veterinarian","vet","dog trainer"],c:["pet","family"],t:["newpet","moving","celebration"],h:["new adoptions","new movers with pets"],g:["carpet","realtor","photographer","cleaning"]},
 {id:"childcare",n:"Childcare / tutoring",a:["daycare","childcare","tutor","tutoring","preschool"],c:["family"],t:["baby","moving"],h:["expecting parents","families relocating for work"],g:["realtor","photographer","attorneyestate","insurance"]}
];
var byId={};V.forEach(function(v){byId[v.id]=v;});
function jac(a,b){var s={},i,u=0,x=0;for(i=0;i<a.length;i++)s[a[i]]=1;for(i=0;i<b.length;i++){if(s[b[i]])x++;}u=a.length+b.length-x;return u?x/u:0;}
function shared(a,b){return a.filter(function(k){return b.indexOf(k)>-1;});}
function fit(a,b){
 if(!a||!b)return null;
 if(a.id===b.id)return {same:true,score:0,cust:[],trig:[]};
 var c=shared(a.c,b.c),t=shared(a.t,b.t);
 var cur=(a.g.indexOf(b.id)>-1?1:0)+(b.g.indexOf(a.id)>-1?1:0);
 var s=0.42*jac(a.c,b.c)+0.38*jac(a.t,b.t)+0.12*cur;
 if(c.length&&t.length)s+=0.06;
 var score=Math.max(3,Math.min(97,Math.round(100*(1-Math.exp(-2.4*s)))));
 return {same:false,score:score,cust:c,trig:t,curated:cur>0};
}
function best(a,n){
 return V.filter(function(v){return v.id!==a.id;}).map(function(v){return {v:v,f:fit(a,v)};})
  .sort(function(x,y){return y.f.score-x.f.score;}).slice(0,n||5);
}
function norm(s){return String(s||"").toLowerCase().replace(/[^a-z0-9&\- ]/g," ").replace(/\s+/g," ").trim();}
function find(q){
 q=norm(q);if(!q)return null;
 var bestV=null,bestS=0;
 V.forEach(function(v){
  var s=0;
  if(norm(v.n)===q)s=100;
  v.a.forEach(function(al){al=norm(al);
   if(al===q)s=Math.max(s,95);
   else if(q.indexOf(al)>-1)s=Math.max(s,60+al.length);
   else if(al.indexOf(q)>-1&&q.length>2)s=Math.max(s,40+q.length);
  });
  if(!s){q.split(" ").forEach(function(w){if(w.length>3&&norm(v.n+" "+v.a.join(" ")).indexOf(w)>-1)s=Math.max(s,20+w.length);});}
  if(s>bestS){bestS=s;bestV=v;}
 });
 return bestV;
}
window.NGL={V:V,byId:byId,CUST:CUST,TRIG:TRIG,fit:fit,best:best,find:find};
})();
