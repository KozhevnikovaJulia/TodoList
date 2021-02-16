(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{106:function(e,t,a){e.exports=a(136)},111:function(e,t,a){},112:function(e,t,a){},136:function(e,t,a){"use strict";a.r(t);var n,r,o=a(0),i=a.n(o),c=a(8),l=a.n(c),s=(a(111),a(112),a(185)),u=a(186),d=a(138),f=a(179),m=a(180),p=a(93),v=a.n(p),b=a(188),h=a(187),k=a(63),g=a(45),E=a(189),C=i.a.memo((function(e){var t=e.addItem,a=e.disabled,n=void 0!==a&&a;console.log("AddItem");var r=Object(o.useState)(" "),c=Object(g.a)(r,2),l=c[0],s=c[1],u=Object(o.useState)(!1),d=Object(g.a)(u,2),m=d[0],p=d[1],v=function(){""!==l.trim()?(t(l),s(" ")):p(!0)};return i.a.createElement("div",null,i.a.createElement(E.a,{error:m,variant:"outlined",id:"outlined-error-helper-text",label:m?"Error":"Input text",helperText:m?"Title is required!":"",value:l,onChange:function(e){s(e.currentTarget.value)},onKeyPress:function(e){!1!==m&&p(!1),"Enter"===e.key&&v()},disabled:n}),i.a.createElement(f.a,{variant:"contained",size:"small",onClick:v,style:{height:"55px"},disabled:n},"ADD"))})),y=i.a.memo((function(e){var t=e.disabled,a=void 0!==t&&t,n=Object(k.a)(e,["disabled"]),r=Object(o.useState)(!1),c=Object(g.a)(r,2),l=c[0],s=c[1],u=Object(o.useState)(n.value),d=Object(g.a)(u,2),f=d[0],m=d[1];return l?i.a.createElement(E.a,{id:"outlined-size-small",defaultValue:"Small",variant:"outlined",size:"small",onChange:function(e){m(e.currentTarget.value)},autoFocus:!0,onBlur:function(){s(!1),n.onChange(f)},value:f,disabled:a}):i.a.createElement("span",{onDoubleClick:function(){s(!0),m(n.value)}},n.value)})),O=a(9),j=a.n(O),I=a(19),x=a(30),w=a(88),T=a.n(w);!function(e){e[e.New=0]="New",e[e.InProgress=1]="InProgress",e[e.Completed=2]="Completed",e[e.Draft=3]="Draft"}(n||(n={})),function(e){e[e.Low=0]="Low",e[e.Middle=1]="Middle",e[e.Hi=2]="Hi",e[e.Urgently=3]="Urgently",e[e.Later=4]="Later"}(r||(r={}));var A=T.a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"2d307b79-41f7-486f-962a-2dfdd68232c3"}}),S=function(){return A.get("todo-lists/")},L=function(e){return A.post("todo-lists/",{title:e})},F=function(e){return A.delete("todo-lists/"+e)},z=function(e,t){return A.put("todo-lists/".concat(e),{title:t})},N=function(e){return A.get("todo-lists/".concat(e,"/tasks"))},D=function(e,t){return A.post("todo-lists/".concat(e,"/tasks"),{title:t})},B=function(e,t){return A.delete("todo-lists/".concat(e,"/tasks/").concat(t))},P=function(e,t,a){return A.put("todo-lists/".concat(e,"/tasks/").concat(t),a)},M=function(e){return A.post("auth/login",e)},R=function(){return A.delete("auth/login")},U=function(){return A.get("auth/me")},q=function(e,t){e.messages.length?t(Y({error:e.messages[0]})):t(Y({error:"Some error occurred"})),t(Q({status:"failed"}))},H=function(e,t){t(Y(e.message?e.message:"Some error")),t(Q({status:"failed"}))},J=a(26),K=Object(J.b)({name:"auth",initialState:{isLoggedIn:!1},reducers:{setIsLoggedInAC:function(e,t){e.isLoggedIn=t.payload.value}}}),Z=K.reducer,V=K.actions.setIsLoggedInAC,W=Object(J.b)({name:"app",initialState:{status:"loading",error:null,isInitialized:!1},reducers:{setStatusAC:function(e,t){e.status=t.payload.status},setErrorAC:function(e,t){e.error=t.payload.error},setInitializedAC:function(e,t){e.isInitialized=t.payload.isInitialized}}}),$=W.reducer,_=W.actions,G=_.setInitializedAC,Y=_.setErrorAC,Q=_.setStatusAC,X=Object(J.b)({name:"todolists",initialState:[],reducers:{removeTodolistAC:function(e,t){var a=e.findIndex((function(e){return e.id===t.payload.todolistId}));a>-1&&e.splice(a,1)},addTodolistAC:function(e,t){e.unshift(Object(x.a)(Object(x.a)({},t.payload.todolist),{},{filter:"all",entityStatus:"idle"}))},changeTodolistTitleAC:function(e,t){var a=e.findIndex((function(e){return e.id===t.payload.todolistId}));e[a].title=t.payload.title},changeTodolistFilterAC:function(e,t){var a=e.findIndex((function(e){return e.id===t.payload.todolistId}));e[a].filter=t.payload.filter},changeTodolistEntityStatusAC:function(e,t){var a=e.findIndex((function(e){return e.id===t.payload.todolistId}));e[a].entityStatus=t.payload.entityStatus},setTodolistsAC:function(e,t){return t.payload.todolists.map((function(e){return Object(x.a)(Object(x.a)({},e),{},{filter:"all",entityStatus:"idle"})}))}}}),ee=X.reducer,te=X.actions,ae=te.removeTodolistAC,ne=te.addTodolistAC,re=te.changeTodolistTitleAC,oe=te.changeTodolistFilterAC,ie=te.changeTodolistEntityStatusAC,ce=te.setTodolistsAC,le=Object(J.b)({name:"tasks",initialState:{},reducers:{removeTaskAC:function(e,t){var a=e[t.payload.todolistId],n=a.findIndex((function(e){return e.id===t.payload.taskId}));n>-1&&a.splice(n,1)},addTaskAC:function(e,t){e[t.payload.task.todoListId].unshift(t.payload.task)},updateTaskAC:function(e,t){var a=e[t.payload.todolistId],n=a.findIndex((function(e){return e.id===t.payload.taskId}));n>-1&&(a[n]=Object(x.a)(Object(x.a)({},a[n]),t.payload.bllModel))},setTasksAC:function(e,t){e[t.payload.todolistId]=t.payload.tasks}},extraReducers:function(e){e.addCase(ae,(function(e,t){delete e[t.payload.todolistId]})),e.addCase(ne,(function(e,t){e[t.payload.todolist.id]=[]})),e.addCase(ce,(function(e,t){t.payload.todolists.forEach((function(t){e[t.id]=[]}))}))}}),se=le.reducer,ue=le.actions,de=ue.removeTaskAC,fe=ue.addTaskAC,me=ue.updateTaskAC,pe=ue.setTasksAC,ve=function(e,t,a){return function(){var n=Object(I.a)(j.a.mark((function n(r,o){var i,c,l,s,u;return j.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(n.prev=0,i=o().tasks,c=i[a],!(l=c.find((function(t){return t.id===e})))){n.next=10;break}return s=Object(x.a)({title:l.title,description:l.description,status:l.status,priority:l.priority,startDate:l.startDate,deadline:l.deadline},t),n.next=8,P(a,e,s);case 8:0===(u=n.sent).data.resultCode?r(me({taskId:e,bllModel:t,todolistId:a})):q(u.data,r);case 10:n.next=15;break;case 12:n.prev=12,n.t0=n.catch(0),H(n.t0,r);case 15:case"end":return n.stop()}}),n,null,[[0,12]])})));return function(e,t){return n.apply(this,arguments)}}()},be=a(59),he=a.n(be),ke=a(191),ge=i.a.memo((function(e){var t=Object(o.useCallback)((function(){e.removeTask(e.task.id,e.todolistId)}),[e.removeTask,e.task.id,e.todolistId]),a=Object(o.useCallback)((function(t){e.changeTaskTitle(e.task.id,t,e.todolistId)}),[e.changeTaskTitle,e.task.id,e.todolistId]),r=Object(o.useCallback)((function(t){var a=t.currentTarget.checked;e.changeStatus(e.task.id,a?n.Completed:n.New,e.todolistId)}),[e.changeStatus,e.todolistId,e.task.id]);return i.a.createElement("div",{key:e.task.id},i.a.createElement(ke.a,{checked:e.task.status===n.Completed,onChange:r,defaultChecked:!0,color:"default",inputProps:{"aria-label":"checkbox with default color"}}),i.a.createElement(y,{value:e.task.title,onChange:a}),i.a.createElement(m.a,{"aria-label":"delete",onClick:t},i.a.createElement(he.a,null)))})),Ee=a(16),Ce=i.a.memo((function(e){var t=e.demo,a=void 0!==t&&t,r=Object(k.a)(e,["demo"]),c=Object(Ee.b)();Object(o.useEffect)((function(){var e;a||c((e=r.todolist.id,function(){var t=Object(I.a)(j.a.mark((function t(a){var n;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a(Q({status:"loading"})),t.next=4,N(e);case 4:n=t.sent,a(pe({tasks:n.data.items,todolistId:e})),a(Q({status:"succeeded"})),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),H(t.t0,a);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(e){return t.apply(this,arguments)}}()))}),[]);var l=r.tasks;"active"===r.todolist.filter&&(l=r.tasks.filter((function(e){return e.status===n.New}))),"completed"===r.todolist.filter&&(l=r.tasks.filter((function(e){return e.status===n.Completed})));var s=Object(o.useCallback)((function(e){r.addTask(e,r.todolist.id)}),[r.addTask,r.todolist.id]),u=Object(o.useCallback)((function(){r.changeFilter("all",r.todolist.id)}),[r.changeFilter,r.todolist.id]),d=Object(o.useCallback)((function(){r.changeFilter("active",r.todolist.id)}),[r.changeFilter,r.todolist.id]),p=Object(o.useCallback)((function(){r.changeFilter("completed",r.todolist.id)}),[r.changeFilter,r.todolist.id]),v=Object(o.useCallback)((function(e){r.changeTodolist(r.todolist.id,e)}),[r.changeTodolist,r.todolist.id]);return i.a.createElement("div",null,i.a.createElement("h3",null,i.a.createElement(y,{value:r.todolist.title,onChange:v,disabled:"loading"===r.todolist.entityStatus}),i.a.createElement(m.a,{"aria-label":"delete",onClick:function(){r.removeTodolist(r.todolist.id)},disabled:"loading"===r.todolist.entityStatus},i.a.createElement(he.a,null))),i.a.createElement(C,{addItem:s,disabled:"loading"===r.todolist.entityStatus}),i.a.createElement("div",null,l.map((function(e){return i.a.createElement(ge,{removeTask:r.removeTask,changeStatus:r.changeStatus,changeTaskTitle:r.changeTaskTitle,task:e,todolistId:r.todolist.id,key:e.id})}))),i.a.createElement("div",null,i.a.createElement(f.a,{variant:"all"===r.todolist.filter?"contained":"outlined",onClick:u},"All"),i.a.createElement(f.a,{variant:"active"===r.todolist.filter?"contained":"outlined",onClick:d},"Active"),i.a.createElement(f.a,{variant:"completed"===r.todolist.filter?"contained":"outlined",onClick:p},"Completed")))})),ye=a(137),Oe=a(181),je=a(90),Ie=a.n(je),xe=a(13);function we(e){var t=e.demo,a=void 0!==t&&t,n=Object(Ee.c)((function(e){return e.todolists})),r=Object(Ee.c)((function(e){return e.tasks})),c=Object(Ee.c)((function(e){return e.auth.isLoggedIn})),l=Object(Ee.b)();Object(o.useEffect)((function(){!a&&c&&l(function(){var e=Object(I.a)(j.a.mark((function e(t){var a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t(Q({status:"loading"})),e.next=4,S();case 4:a=e.sent,t(ce({todolists:a.data})),t(Q({status:"succeeded"})),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),H(e.t0,t);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}())}),[]);var s=Object(o.useCallback)((function(e,t){var a=function(e,t){return function(){var a=Object(I.a)(j.a.mark((function a(n){var r;return j.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,n(Q({status:"loading"})),a.next=4,D(t,e);case 4:0===(r=a.sent).data.resultCode?(n(fe({task:r.data.data.item})),n(Q({status:"succeeded"}))):q(r.data,n),a.next=11;break;case 8:a.prev=8,a.t0=a.catch(0),H(a.t0,n);case 11:case"end":return a.stop()}}),a,null,[[0,8]])})));return function(e){return a.apply(this,arguments)}}()}(e,t);l(a)}),[]),u=Object(o.useCallback)((function(e){var t=function(e){return function(){var t=Object(I.a)(j.a.mark((function t(a){var n;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a(Q({status:"loading"})),t.next=4,L(e);case 4:n=t.sent,a(ne({todolist:n.data.data.item})),a(Q({status:"succeeded"})),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),H(t.t0,a);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(e){return t.apply(this,arguments)}}()}(e);l(t)}),[l]),d=Object(o.useCallback)((function(e,t,a){var n=ve(e,{status:t},a);l(n)}),[]),f=Object(o.useCallback)((function(e,t,a){var n=ve(e,{title:t},a);l(n)}),[]),m=Object(o.useCallback)((function(e,t){var a,n,r=(a=e,n=t,function(){var e=Object(I.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,B(n,a);case 3:e.sent,t(de({taskId:a,todolistId:n})),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),H(e.t0,t);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}());l(r)}),[]),p=Object(o.useCallback)((function(e,t){var a=oe({filter:e,todolistId:t});l(a)}),[l]),v=Object(o.useCallback)((function(e){var t,a=(t=e,function(){var e=Object(I.a)(j.a.mark((function e(a){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a(Q({status:"loading"})),a(ie({entityStatus:"loading",todolistId:t})),e.next=5,F(t);case 5:e.sent,a(ae({todolistId:t})),a(Q({status:"succeeded"})),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),H(e.t0,a);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}());l(a)}),[]),b=Object(o.useCallback)((function(e,t){var a,n,r=(a=e,n=t,function(){var e=Object(I.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,z(a,n);case 3:e.sent,t(re({todolistId:a,title:n})),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),H(e.t0,t);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}());l(r)}),[]);return c?i.a.createElement(i.a.Fragment,null,i.a.createElement(Oe.a,{container:!0,style:{padding:"25px"}},i.a.createElement(C,{addItem:u})),i.a.createElement(Oe.a,{container:!0,spacing:3},n.map((function(e){var t=r[e.id];return i.a.createElement(Oe.a,{item:!0},i.a.createElement(ye.a,{elevation:3,style:{padding:"15px",backgroundImage:"url(".concat(Ie.a,")"),backgroundSize:"100% auto"},key:e.id},i.a.createElement(Ce,{todolist:e,key:e.id,tasks:t,removeTask:m,changeFilter:p,addTask:s,changeStatus:d,changeTaskTitle:f,removeTodolist:v,changeTodolist:b,demo:a})))})))):i.a.createElement(xe.a,{to:"/login"})}var Te=a(193),Ae=a(190);function Se(e){return i.a.createElement(Ae.a,Object.assign({elevation:6,variant:"filled"},e))}function Le(){var e=Object(Ee.c)((function(e){return e.app.error})),t=Object(Ee.b)(),a=null!==e,n=function(e,a){"clickaway"!==a&&t(Y({error:null}))};return i.a.createElement(Te.a,{open:a,autoHideDuration:3e3,onClose:n},i.a.createElement(Se,{onClose:n,severity:"error"},e))}var Fe=a(54),ze=a(194),Ne=a(178),De=a(182),Be=a(183),Pe=a(94),Me=function(){var e=Object(Ee.c)((function(e){return e.auth.isLoggedIn})),t=Object(Ee.b)(),a=Object(Pe.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="Invalid email address"):t.email="Required",e.password||(t.password="Required"),t},onSubmit:function(e){alert(JSON.stringify(e)),a.resetForm();var n,r=(n=e,function(){var e=Object(I.a)(j.a.mark((function e(t){var a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t(Q({status:"loading"})),e.next=4,M(n);case 4:0===(a=e.sent).data.resultCode?(t(V({value:!0})),t(Q({status:"succeeded"}))):q(a.data,t),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),H(e.t0,t);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}());t(r)}});return e?i.a.createElement(xe.a,{to:"/"}):i.a.createElement(Oe.a,{container:!0,justify:"center"},i.a.createElement(Oe.a,{item:!0,xs:4},i.a.createElement("form",{onSubmit:a.handleSubmit},i.a.createElement(ze.a,null,i.a.createElement(Ne.a,null,i.a.createElement("p",null,"To log in get registered",i.a.createElement("a",{href:"https://social-network.samuraijs.com/",target:"_blank"},"here")),i.a.createElement("p",null,"or use common test account credentials:"),i.a.createElement("p",null,"Email: Kozhevnikova1501@yandex.ru"),i.a.createElement("p",null,"Password: SocialNetworkTS")),i.a.createElement(De.a,null,i.a.createElement(E.a,{label:"Email",margin:"normal",name:"email",onBlur:a.handleBlur,onChange:a.handleChange,value:a.values.email}),a.touched.email&&a.errors.email?i.a.createElement("div",{style:{color:"red"}}," ",a.errors.email," "):null,i.a.createElement(E.a,{type:"password",label:"Password",margin:"normal",name:"password",onBlur:a.handleBlur,onChange:a.handleChange,value:a.values.password}),a.touched.password&&a.errors.password?i.a.createElement("div",{style:{color:"red"}}," ",a.errors.password," "):null,i.a.createElement(Be.a,{name:"rememeberMe",checked:a.values.rememberMe,onChange:a.handleChange,label:"Remember me",control:i.a.createElement(ke.a,null)}),i.a.createElement(f.a,{type:"submit",variant:"contained"},"Login"))))))},Re=a(184);var Ue=function(e){var t=e.demo,a=void 0!==t&&t,n=Object(Ee.c)((function(e){return e.app.status})),r=Object(Ee.c)((function(e){return e.app.isInitialized})),c=Object(Ee.b)();return Object(o.useEffect)((function(){c(function(){var e=Object(I.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,U();case 3:0===e.sent.data.resultCode&&t(V({value:!0})),t(G({isInitialized:!0})),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),H(e.t0,t);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}())}),[]),r?i.a.createElement(Fe.a,null,i.a.createElement("div",{className:"App"},i.a.createElement(Le,null),i.a.createElement(s.a,{position:"static",style:{backgroundColor:"rgb(185, 180, 180)"}},i.a.createElement(u.a,{className:"toolBur"},i.a.createElement("div",{className:"iconBlock"},i.a.createElement(m.a,{edge:"start",color:"inherit","aria-label":"menu"},i.a.createElement(v.a,null)),i.a.createElement(d.a,{variant:"h6",style:{marginTop:"8px"}},"TODOLIST")),i.a.createElement(f.a,{color:"inherit",type:"submit",variant:"contained",onClick:function(){c(function(){var e=Object(I.a)(j.a.mark((function e(t){var a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t(Q({status:"loading"})),e.next=4,R();case 4:0===(a=e.sent).data.resultCode?(t(V({value:!1})),t(Q({status:"succeeded"}))):q(a.data,t),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),H(e.t0,t);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}())}},"Logout")),"loading"===n&&i.a.createElement(h.a,null)),i.a.createElement(b.a,{fixed:!0},i.a.createElement(xe.d,null,i.a.createElement(xe.b,{exact:!0,path:"/",render:function(){return i.a.createElement(we,{demo:a})}}),i.a.createElement(xe.b,{path:"/login",render:function(){return i.a.createElement(Me,null)}}),i.a.createElement(xe.b,{path:"/404",render:function(){return i.a.createElement("h1",null,"404: PAGE NOT FOUND")}}),i.a.createElement(xe.a,{from:"*",to:"/"}," "))))):i.a.createElement("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"}},i.a.createElement(Re.a,{style:{position:"fixed",top:"50%"}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var qe=a(22),He=a(50),Je=Object(qe.c)({tasks:se,todolists:ee,app:$,auth:Z}),Ke=Object(J.a)({reducer:Je,middleware:function(e){return e().prepend(He.a)}});window.store=Ke,l.a.render(i.a.createElement(Ee.a,{store:Ke},i.a.createElement(Ue,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},90:function(e,t,a){e.exports=a.p+"static/media/3.70114d58.jpg"}},[[106,1,2]]]);
//# sourceMappingURL=main.e0a9d418.chunk.js.map