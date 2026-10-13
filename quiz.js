(function(){
"use strict";
// [question, [options], correctIndex]
var M4=[
["Which URL asks for exactly one resource rather than a collection?",["https://jsonplaceholder.typicode.com/comments?postId=3","https://jsonplaceholder.typicode.com/posts?userId=3","https://jsonplaceholder.typicode.com/users/3","https://jsonplaceholder.typicode.com/users"],2],
["From its address bar, a web browser can only send GET requests.",["True","False"],0],
["A request has a method, a host, a path and a query string. Which one is never written inside the URL itself?",["The path","The method","The host","The query string"],1],
["A GET request carries a body.",["True","False"],1],
["By common convention, how does /users differ from /users/7 ?",["/users is a query string, /users/7 is a path","/users and /users/7 mean the same thing","/users is all of them, /users/7 is one of them","/users is one of them, /users/7 is all of them"],2],
["You want to create a new record on a server. Which method do you send?",["GET","DELETE","PUT","POST"],3],
["Which part of a request is sent every time but hidden from you in a browser?",["The query string","The headers","The path","The body"],1],
["In GET https://jsonplaceholder.typicode.com/posts?userId=1 , which part is the path?",["jsonplaceholder.typicode.com","?userId=1","/posts","https://"],2],
["In GET https://jsonplaceholder.typicode.com/posts?userId=1 , which part is the host?",["/posts","GET","userId=1","jsonplaceholder.typicode.com"],3],
["You remove one piece from a URL and find you are now asking about a completely different resource. Where did that piece belong?",["In the body","In the path","In the query string","In the headers"],1],
["In https://jsonplaceholder.typicode.com/comments?postId=5 , what is the query string?",["jsonplaceholder.typicode.com","/comments","comments?postId=5","postId=5"],3],
["Which URL asks only for the posts written by user 2?",["https://jsonplaceholder.typicode.com/posts/2","https://jsonplaceholder.typicode.com/userId=2/posts","https://jsonplaceholder.typicode.com/posts?userId=2","https://jsonplaceholder.typicode.com/posts/userId=2"],2],
["The server's database crashes while it is answering your request. What class comes back?",["5xx","2xx","3xx","4xx"],0],
["Your credentials are accepted and the server still refuses the request. Which code fits?",["403 Forbidden","500 Internal Server Error","401 Unauthorized","404 Not Found"],0],
["A status code in the 4xx class tells you that",["the request worked exactly as asked","the request was built wrong on your side","the server failed on its own side","the resource has moved somewhere else"],1],
["A 5xx status code points at a problem on the server's side, not yours.",["True","False"],0],
["A 404 response still arrives with a status line, headers and a body.",["True","False"],0],
["You send a request with a filter and get 200, but the data comes back unfiltered. What most likely happened?",["The filter should have been sent as a header","The server ignored a parameter it did not recognise","The server answered with a 4xx instead","The request never reached the server at all"],1],
["You mistype a path as /userz/1 and the server answers you. What class is the status code?",["5xx","2xx","3xx","4xx"],3],
["A request returns 301. What should the caller do next?",["Send the request to the new address","Wait a few minutes and retry","Send credentials and try it again","Fix the path, because nothing is there"],0],
["A response is {\"user\":{\"contact\":{\"email\":\"ana@mail.com\"}}} . What does user.contact.email give you?",["{\"email\":\"ana@mail.com\"}","{\"contact\":{\"email\":\"ana@mail.com\"}}","ana@mail.com","user"],2],
["A request returns [{\"id\":11},{\"id\":12},{\"id\":13}] . What is the path to the id of the second object?",["[1].id","[1]","[2].id","id[2]"],0],
["In JSON, what do curly braces mark?",["An object, holding keys and values","An array, holding an ordered list","A single text value","A note left by the developer"],0],
["Given {\"id\":1,\"address\":{\"city\":\"Gwenborough\"}} , what is the path to the city?",["Gwenborough","city.address","city","address.city"],3],
["In [{\"email\":\"a@x.com\"},{\"email\":\"b@x.com\"},{\"email\":\"c@x.com\"}] , which path gives c@x.com ?",["[3].email","[2].email","email[3]","[2]"],1],
["Given {\"company\":{\"name\":\"Romaguera-Crona\"}} , what is the path to the company name?",["company","name.company","Romaguera-Crona","company.name"],3],
["In JSON, the first item in an array sits at index 1.",["True","False"],1],
["In a JSON path, what does each dot mean?",["Go one level deeper in","Mark the end of a key","Separate two responses","Join two values together"],0],
["In JSON, what do square brackets mark?",["The end of the response","An object, holding keys and values","An array, counted from zero","A single number value"],2],
["Given {\"address\":{\"geo\":{\"lat\":\"-37.3159\"}}} , what is the path to the latitude?",["geo.lat","lat.geo.address","address.geo.lat","address.lat"],2]
];
var M5=[
["GET /api/students/99999 asks for a record that does not exist. What comes back?",["204","404","500","422"],1],
["A brand-new Laravel project has no routes/api.php. Which command creates it?",["php artisan make:api","php artisan install:api","php artisan route:api","php artisan migrate --api"],1],
["Why does a route in routes/api.php not need CSRF protection?",["Bruno attaches a CSRF token to each request","API tokens are encrypted and cookies are not","It is stateless, so there is no session cookie to ride on","Laravel turns CSRF off for every POST request"],2],
["You put an API route in routes/web.php by mistake, then send a POST to it from Bruno. What comes back?",["419, because web.php expects a CSRF token","404, because the route was never registered","500, because the controller cannot be found","200, because the route still works fine"],0],
["GET /api/students returns everyone, but GET /api/students?section=IT2E returns one section. Where does section arrive from?",["The request body, read with $request->input()","The query string, read with $request->query('section')","The Authorization header on the request","The route placeholder, read with {section}"],1],
["POST /api/logout returned 204, then the very same GET that worked a second ago returned 401. Why?",["The server restarted and forgot the session","Logout destroyed the token, so the caller is a stranger again","The route was taken out of the protected group","The database connection was closed by logout"],1],
["Why does a successful DELETE return 204 rather than 200 with an empty body?",["204 states outright that there is no body to read","destroy() in Laravel cannot return a 200 at all","200 is only allowed on GET requests, never DELETE","204 skips the database, so it answers faster"],0],
["You write the route as '/students/{id}' but the method signature is show(Student $student). What happens?",["Laravel never looks the record up, so $student arrives empty","The route returns 404 before the controller runs","Laravel still looks it up, because the position matches","Laravel throws a MassAssignmentException"],0],
["PUT /api/students/3 succeeds and the record is changed. What should come back?",["201, because the record is different now","204, because nothing new was created","200 with the updated record","202, because the change was accepted"],2],
["What does a request through routes/web.php get that a request through routes/api.php does not?",["Automatic route model binding","A JSON response instead of HTML","A working database connection","A session and CSRF protection"],3],
["Which verb and path updates one existing student?",["PUT /api/students/{student}","PATCH /api/students","POST /api/students/{student}","PUT /api/students"],0],
["You POST valid JSON to create a student and get a MassAssignmentException. What is missing?",["The Authorization header on the request","The field is not listed in the model's $fillable","The migration for that table was never run","The route is sitting in web.php, not api.php"],1],
["DELETE /api/students/3 succeeds. What should come back?",["404","201","200","204"],3],
["What separates a 401 from a 403?",["401 is for people; 403 is for other programs","401 is a client error; 403 is a server error","401 is I do not know you; 403 is I know you, and no","401 is an expired token; 403 is a missing token"],2],
["POST /api/students arrives with a required field missing and validation fails. What comes back?",["500","422","404","400"],1],
["Route::get('/students/{student}', [StudentController::class, 'show']); and the method is show(Student $student). What makes Laravel look the record up for you?",["The route sits inside routes/api.php","The placeholder name matches the type-hinted variable","The controller was generated with the --api flag","The model lists that column in $fillable"],1],
["Which request filters on two fields at the same time?",["GET /api/students/IT2E/3","GET /api/students?filter=section,units","GET /api/students?section=IT2E/units=3","GET /api/students?section=IT2E&units=3"],3],
["A caller sends GET /api/students with no Authorization header. What comes back?",["403","404","422","401"],3],
["Validation fails, and instead of JSON the caller gets a full HTML error page. What was never added?",["shouldRenderJsonWhen in bootstrap/app.php","php artisan install:api, which makes api.php","The auth:sanctum middleware on the group","The $fillable array on the model"],0],
["index() loops over a fixed array ['name', 'section', 'units'] and filters only on those. Why is that list hard-coded?",["Because Laravel allows at most three active filters","Because a longer list would make the query slower","So a caller cannot filter on a column you never meant to expose","Because those are the only columns in the table"],2],
["Which single line registers exactly the five API routes and nothing more?",["Route::api('students', StudentController::class);","Route::apiResource('students', StudentController::class);","Route::crud('students', StudentController::class);","Route::resource('students', StudentController::class);"],1],
["Why can login not sit inside the auth:sanctum group?",["Sanctum has no support for a login route","You would need a token to reach the route that issues one","The group only accepts routes that return JSON","login uses POST and the group only accepts GET"],1],
["GET /students/1 returns 404, although the route is in routes/api.php and the record exists. What is wrong?",["The Authorization header was not sent","The record was soft-deleted by an earlier call","The placeholder does not match the method variable","The caller left the /api prefix off the path"],3],
["A caller sends GET /api/students with no query string at all. What does the filter loop do?",["It returns 422, because no filter was supplied","It returns an empty list, since nothing matched","It returns 400 and asks for a filter","Every if is skipped, so the whole list comes back"],3],
["What does $fillable on a model actually control?",["Which columns a caller is allowed to set","Which columns the database requires","Which columns the index() filter accepts","Which columns a caller is allowed to read"],0],
["Which two routes must stay outside the auth:sanctum group?",["register and me","logout and me","login and logout","register and login"],3],
["php artisan make:controller StudentController --api creates a controller with which methods?",["index, store, show, update, destroy","index, show, update, destroy","create, read, update, delete","index, create, store, show, edit, update, destroy"],0],
["A route is registered in routes/api.php as Route::get('/students', ...). What full path must a caller send?",["/routes/api/students","/api/students","/students","/api/api/students"],1],
["Route::middleware('auth:sanctum')->group(function () { ... }); What does that one line do?",["It makes those routes answer in JSON, not HTML","Every route inside the group now demands a valid token","Every route inside the group is handed a fresh token","It signs the caller in before the routes run"],1],
["POST /api/students succeeds and a new record now exists. What should come back?",["202","201","200","204"],1]
];
var SETS={m4:{name:"Module 4 quiz",d:M4},m5:{name:"Module 5 quiz",d:M5},all:{name:"All 60 questions",d:M4.concat(M5)}};
var app=document.getElementById("app");
var st;
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function home(){
 app.textContent="";
 var h=el("h2",null,"Choose a quiz");app.appendChild(h);
 var g=el("div","q-pick");
 Object.keys(SETS).forEach(function(k){
  var b=el("button",null,SETS[k].name);
  b.type="button";
  b.appendChild(el("small",null,SETS[k].d.length+" questions"));
  b.onclick=function(){start(SETS[k].name,SETS[k].d.slice())};
  g.appendChild(b);
 });
 app.appendChild(g);
}
function start(name,qs){st={name:name,qs:qs,i:0,score:0,miss:[]};show()}
function show(){
 var q=st.qs[st.i],n=st.qs.length,done=false;
 app.textContent="";
 var card=el("div","qc");
 var head=el("div","qc-head");
 head.appendChild(el("span",null,"Question "+(st.i+1)+" of "+n));
 var pts=el("span",null,"0 / 1 pts");head.appendChild(pts);
 card.appendChild(head);
 var bar=el("div","qc-bar");var fill=el("i");fill.style.width=(st.i/n*100)+"%";bar.appendChild(fill);card.appendChild(bar);
 var body=el("div","qc-body");
 body.appendChild(el("p","qc-q",q[0]));
 var ul=el("ul","opts");ul.setAttribute("role","radiogroup");
 var btns=[];
 q[1].forEach(function(t,idx){
  var li=el("li");
  var b=el("button","opt");b.type="button";b.setAttribute("role","radio");b.setAttribute("aria-checked","false");
  b.appendChild(el("span","dot"));
  b.appendChild(el("span",null,t));
  b.onclick=function(){if(!done){done=true;answer(idx)}};
  li.appendChild(b);ul.appendChild(li);btns.push(b);
 });
 body.appendChild(ul);
 var fb=el("div"),row=el("div","row");
 body.appendChild(fb);body.appendChild(row);
 card.appendChild(body);app.appendChild(card);
 function mark(b,cls,sym,label){
  var m=el("span","mark "+cls,sym);m.setAttribute("aria-label",label);
  b.replaceChild(m,b.firstChild);
 }
 function answer(pick){
  var ok=pick===q[2];
  btns.forEach(function(b){b.disabled=true});
  btns[pick].setAttribute("aria-checked","true");
  if(ok){st.score++;btns[pick].classList.add("right");mark(btns[pick],"c","✓","Correct answer, you chose this");}
  else{
   btns[pick].classList.add("wrong");mark(btns[pick],"x","✕","Wrong, you chose this");
   btns[q[2]].classList.add("right");mark(btns[q[2]],"a","→","Correct answer");
   st.miss.push(q);
  }
  card.classList.add(ok?"ok":"bad");
  pts.textContent=(ok?1:0)+" / 1 pts";
  fb.className="fb "+(ok?"ok":"bad");
  fb.textContent=ok?"Correct!":"Not quite. The correct answer is: "+q[1][q[2]];
  var nx=el("button","btn",st.i+1<n?"Next question":"See results");nx.type="button";
  nx.onclick=function(){st.i++;st.i<n?show():results()};
  row.appendChild(nx);nx.focus();
 }
}
function results(){
 app.textContent="";
 var n=st.qs.length,p=Math.round(st.score/n*100);
 var card=el("div","qc");card.appendChild(el("div","qc-head",st.name+": results"));
 var b=el("div","qc-body");
 b.appendChild(el("div","score",st.score+" / "+n+" ("+p+"%)"));
 b.appendChild(el("p",null,st.miss.length?("You missed "+st.miss.length+". Review them below."):"Perfect score!"));
 st.miss.forEach(function(q){
  var d=el("div","miss");
  d.appendChild(el("p",null,q[0]));
  var a=el("p");a.appendChild(el("b",null,"Answer: "));a.appendChild(document.createTextNode(q[1][q[2]]));
  d.appendChild(a);b.appendChild(d);
 });
 var row=el("div","row");
 var again=el("button","btn","Retake this quiz");again.type="button";
 again.onclick=function(){start(st.name,st.qs)};
 row.appendChild(again);
 if(st.miss.length){var r=el("button","btn alt","Retry missed only");r.type="button";var m=st.miss.slice(),nm=st.name;r.onclick=function(){start(nm+" (missed)",m)};row.appendChild(r)}
 var h=el("button","btn alt","Choose another quiz");h.type="button";h.onclick=home;row.appendChild(h);
 b.appendChild(row);card.appendChild(b);app.appendChild(card);
}
home();
})();
