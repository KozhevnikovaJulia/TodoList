(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{50:function(e,t,a){e.exports=a.p+"static/media/3.70114d58.jpg"},60:function(e,t,a){e.exports=a(71)},65:function(e,t,a){},66:function(e,t,a){},71:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),c=a(8),l=a.n(c),r=(a(65),a(23)),o=a(30),u=a(24),d=a(14),s=(a(66),a(107)),f=a(114);function m(e){var t=Object(n.useState)(" "),a=Object(d.a)(t,2),c=a[0],l=a[1],r=Object(n.useState)(!1),o=Object(d.a)(r,2),u=o[0],m=o[1],b=function(){""!==c.trim()?(e.addItem(c),l(" ")):m(!0)};return i.a.createElement("div",null,i.a.createElement(f.a,{error:u,variant:"outlined",id:"outlined-error-helper-text",label:u?"Error":"Input text",helperText:u?"Title is required!":"",value:c,onChange:function(e){l(e.currentTarget.value)},onKeyPress:function(e){m(!1),"Enter"===e.key&&b()}}),i.a.createElement(s.a,{variant:"contained",size:"small",onClick:b,style:{height:"55px"}},"ADD"))}function b(e){var t=Object(n.useState)(!1),a=Object(d.a)(t,2),c=a[0],l=a[1],r=Object(n.useState)(e.value),o=Object(d.a)(r,2),u=o[0],s=o[1];return c?i.a.createElement(f.a,{id:"outlined-size-small",defaultValue:"Small",variant:"outlined",size:"small",onChange:function(e){s(e.currentTarget.value)},autoFocus:!0,onBlur:function(){l(!1),e.onChange(u)},value:u}):i.a.createElement("span",{onDoubleClick:function(){l(!0),s(e.value)}},e.value)}var v=a(108),h=a(40),E=a.n(h),j=a(116);function g(e){return i.a.createElement("div",null,i.a.createElement("h3",null,i.a.createElement(b,{value:e.title,onChange:function(t){e.changeTodolist(e.id,t)}}),i.a.createElement(v.a,{"aria-label":"delete",onClick:function(){e.removeTodolist(e.id)}},i.a.createElement(E.a,null))),i.a.createElement(m,{addItem:function(t){e.addTask(t,e.id)}}),i.a.createElement("div",null,e.tasks.map((function(t){return i.a.createElement("div",{key:t.id},i.a.createElement(j.a,{checked:t.isDone,onChange:function(a){e.changeStatus(t.id,a.currentTarget.checked,e.id)},defaultChecked:!0,color:"default",inputProps:{"aria-label":"checkbox with default color"}}),i.a.createElement(b,{value:t.title,onChange:function(a){e.changeTaskTitle(t.id,a,e.id)}}),i.a.createElement(v.a,{"aria-label":"delete",onClick:function(){e.removeTask(t.id,e.id)}},i.a.createElement(E.a,null)))}))),i.a.createElement("div",null,i.a.createElement(s.a,{variant:"all"===e.filter?"contained":"outlined",onClick:function(){e.changeFilter("all",e.id)}},"All"),i.a.createElement(s.a,{variant:"active"===e.filter?"contained":"outlined",onClick:function(){e.changeFilter("active",e.id)}},"Active"),i.a.createElement(s.a,{variant:"completed"===e.filter?"contained":"outlined",onClick:function(){e.changeFilter("completed",e.id)}},"Completed")))}var O=a(115),p=a(109),k=a(110),C=a(111),T=a(51),D=a.n(T),y=a(112),S=a(72),w=a(113),x=a(50),I=a.n(x);var L=function(){var e,t=Object(O.a)(),a=Object(O.a)(),c=Object(n.useState)([{id:t,title:"What to learn",filter:"all"},{id:a,title:"What to buy",filter:"all"}]),l=Object(d.a)(c,2),f=l[0],b=l[1],h=Object(n.useState)((e={},Object(u.a)(e,t,[{id:Object(O.a)(),title:"Learn JS",isDone:!0},{id:Object(O.a)(),title:"Learn CSS",isDone:!0},{id:Object(O.a)(),title:"Learn React",isDone:!1},{id:Object(O.a)(),title:"Learn ReactAPI",isDone:!1},{id:Object(O.a)(),title:"Learn GraphQL",isDone:!1}]),Object(u.a)(e,a,[{id:Object(O.a)(),title:"Buy bread",isDone:!0},{id:Object(O.a)(),title:"Buy milk",isDone:!0}]),e)),E=Object(d.a)(h,2),j=E[0],T=E[1];function x(e,t){var a={id:Object(O.a)(),title:e,isDone:!1},n=j[t],i=[a].concat(Object(o.a)(n));j[t]=i,T(Object(r.a)({},j))}function L(e,t,a){var n=j[a].find((function(t){return t.id===e}));n&&(n.isDone=t,T(Object(r.a)({},j)))}function A(e,t,a){var n=j[a].find((function(t){return t.id===e}));n&&(n.title=t,T(Object(r.a)({},j)))}function B(e,t){var a=j[t].filter((function(t){return t.id!=e}));j[t]=a,T(Object(r.a)({},j))}function F(e,t){var a=f.find((function(e){return e.id===t}));a&&(a.filter=e,b(Object(o.a)(f)))}function z(e){var t=f.filter((function(t){return t.id!=e}));b(t),delete j[e],T(Object(r.a)({},j))}function W(e,t){var a=f.find((function(t){return t.id===e}));a&&(a.title=t,b(Object(o.a)(f)))}return i.a.createElement("div",{className:"App"},i.a.createElement(p.a,{position:"static",style:{backgroundColor:"rgb(185, 180, 180)"}},i.a.createElement(k.a,null,i.a.createElement(v.a,{edge:"start",color:"inherit","aria-label":"menu"},i.a.createElement(D.a,null)),i.a.createElement(C.a,{variant:"h6"},"News"),i.a.createElement(s.a,{color:"inherit"},"Login"))),i.a.createElement(y.a,{fixed:!0},i.a.createElement(w.a,{container:!0,style:{padding:"25px"}},i.a.createElement(m,{addItem:function(e){var t=Object(O.a)();b([{id:t,title:e,filter:"all"}].concat(Object(o.a)(f))),T(Object(r.a)(Object(u.a)({},t,[]),j))}})),i.a.createElement(w.a,{container:!0,spacing:3},f.map((function(e){var t=j[e.id],a=t;return"active"===e.filter&&(a=t.filter((function(e){return!e.isDone}))),"completed"===e.filter&&(a=t.filter((function(e){return e.isDone}))),i.a.createElement(w.a,{item:!0},i.a.createElement(S.a,{elevation:3,style:{padding:"15px",backgroundImage:"url(".concat(I.a,")"),backgroundSize:"100% auto"}},i.a.createElement(g,{title:e.title,id:e.id,key:e.id,tasks:a,removeTask:B,changeFilter:F,addTask:x,changeStatus:L,changeTaskTitle:A,filter:e.filter,removeTodolist:z,changeTodolist:W})))})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(i.a.createElement(L,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[60,1,2]]]);
//# sourceMappingURL=main.65f547f6.chunk.js.map