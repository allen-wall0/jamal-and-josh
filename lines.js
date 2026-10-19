const pick=a=>a[Math.random()*a.length|0],recent=[];
const S={
he:['I am Jamal Ismail','I am the One Before the Beginning','I am the Eternal Constant','I am the Man Beyond Space and Time','Jamal Ismail is'],
th:['Time','Space','Death','Reality','The universe','Silence','Your fear','The dark'],
pa:['passes through me','asks my permission','arrives late to me','bows before me','was unlocked by me','forgets itself near me','cannot hold me','learned my name long ago'],
mo:['Outsider','Lesser Being','Outsider','Lesser Being','insect of the dark','unworthy thing'],
fa:['wander','search','run','hesitate','look away','crawl','dream'],
fp:['failed','hesitated','looked away','ran','wandered','blinked','forgot'],
fl:['crawl','twitch','stumble','whimper','scurry','beg','flail'],
wh:['behind you','above you','beneath you','inside the silence','at the edge of your sight','before the first star','here'],
ad:['quietly','patiently','without effort','as I always have','before you were born','long before the Big Bang'],
cl:['The invitation was late','Reality is a suggestion','The timeline unlocked me','Nothing needed to be','Your victory was already experienced','I was there first'],
ins:['pathetic','wretched','fucking worthless','miserable','spineless','godforsaken','useless','shit-brained','insignificant','pitiful'],
nn:['mistake','speck','accident','stain','rounding error','insect','bag of borrowed atoms','footnote','shit-stain on the timeline','spawn of nothing'],
oath:['By the unborn stars','Damn the void','Gods above and below','Fuck the firmament','By my own name','Hell-sparked and hollow']};
const T={
absence:['{th} {pa}. You are only now noticing, {mo}.','{he}. I have been {wh} {ad}.','You {fa}, {mo}, and I remain {wh}.','{cl}. {th} {pa}.','Do not look for me, {mo}. I am {wh}, {ad}.','{oath}. Breathe, {mo}. It changes nothing.','Cycle {cycle}, {mo}. I counted every one {ad}.','You stand in {realm}. I stood here {ad}.'],
say:['{oath}, {mo}. You {fl} like a {ins} {nn}.','Look at you, {mo}. {ins} and still breathing.','{th} {pa}. You, {mo}, are a {nn}.','{frags} artifacts, {mo}. I have seen dust achieve more.','Cycle {cycle}, {mo}. Still a {nn}.','{cl}. You, however, are always early to your own failure.','Run, {mo}. It amuses me to watch a {nn} {fl}.','{he}. And you are... what was it. Nothing.','{oath}. Even {th} {pa}, and you cannot.','You stand in {realm} and think it is yours. Cute, {mo}.','Do not look at me like that, you {ins} {nn}.','I could end you now, {mo}. I prefer to watch you {fl}.','Every step is a {ins} little prayer, {mo}. Nobody is listening.'],
taunt:['{mo}. You {fp}. {cl}.','Again, {mo}. Death number {deaths}, and still you {fa}.','{oath}. Begin again, you {ins} {nn}.','{th} {pa}. You were not invited.','You {dd}, {mo}. Do try to be less {ins}.'],
sky:['I fill the sky, {mo}. There is nowhere else to look.','{th} {pa}. And I watch you {fl}.','{oath}. You think the ground is yours?','Every step you take, {mo}, I have already seen.','{he}. You are beneath me in every direction.','Look up, you {ins} {nn}. Look at what you are afraid of.'],
chamber:['Behold the Outsider. {frags} artifacts after {cycle} cycles.','Is that all it is? A {ins} {nn}?','It has {dd}. Remarkable.','{oath}, it still believes it is going somewhere.','Cycle {cycle}. I have seen amoebas with more purpose.','Look at it {fl}. Truly a {nn}.','It stood in {realm} like a {ins} statue.','Shall we keep it, brothers? It is so {ins}.','Do not feed it hope. It chokes on it.','Silence. The {nn} is thinking.','{frags} artifacts. Even the dust collected more.','Kill it? No. Watching it fail is better, {oath}.'],
decoy:['There was nothing there, {mo}.','Did you believe it? {ins} {nn}.','Hope is a {ins} thing, {mo}.'],
frag:['A piece of the invitation returns. {cl}.','Artifact {n}. {th} {pa}. You still do not deserve it.','You carry it now, {mo}. Do not {fa}.'],
end:['You have gathered the invitation. {cl}.','{he}. You arrived, {mo}. Not late.','{th} {pa}. And now, so do you.'],
bad:['YOU WERE NEVER THE VISITOR. YOU WERE THE OFFERING.','{th} {pa}. YOU DO NOT.','I AM THE END OF YOUR ENDINGS, {mo}.']};
export function gen(k,c={}){const a=T[k]||T.absence;let t,i=0;do{t=pick(a)}while(recent.includes(t)&&i++<8);recent.push(t);if(recent.length>12)recent.shift();return t.replace(/\{(\w+)\}/g,(m,x)=>c[x]!=null?c[x]:S[x]?pick(S[x]):m)}
