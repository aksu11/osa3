(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),u=t.n(a),r=t(13),l=t.n(r),c=(t(19),t(2)),o=t(3),i=t.n(o),m="api/persons",d=function(){return i.a.get(m)},f=function(e){return i.a.post(m,e)},s=function(e,n){return i.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},b=function(e){return i.a.delete("".concat(m,"/").concat(e))},v=function(e){var n=e.message;return null===n?null:u.a.createElement("div",{className:n.kind}," ",n.content," ")},E=function(e){var n=e.value,t=e.handle;return u.a.createElement("div",null,"filter shown with ",u.a.createElement("input",{value:n,onChange:t}))},h=function(e){var n=e.name,t=e.number,a=e.nameChange,r=e.numberChange,l=e.submitForm;return u.a.createElement("form",{onSubmit:l},u.a.createElement("div",null,"name: ",u.a.createElement("input",{value:n,onChange:a})),u.a.createElement("div",null,"number: ",u.a.createElement("input",{value:t,onChange:r})),u.a.createElement("div",null,u.a.createElement("button",{type:"submit"},"add")))},p=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],r=n[1],l=Object(a.useState)(""),o=Object(c.a)(l,2),i=o[0],m=o[1],p=Object(a.useState)(""),g=Object(c.a)(p,2),w=g[0],k=g[1],O=Object(a.useState)(""),j=Object(c.a)(O,2),y=j[0],C=j[1],S=Object(a.useState)([]),T=Object(c.a)(S,2),L=T[0],x=T[1],D=Object(a.useState)(null),F=Object(c.a)(D,2),I=F[0],J=F[1];Object(a.useEffect)((function(){d().then((function(e){r(e.data)}))}),[]);var N=function(e,n){return function(){window.confirm("Delete "+e+" ?")&&b(n).then((function(a){r(t.filter((function(e){return e.id!==n}))),J({kind:"note",content:e+" was removed succesfully"}),setTimeout((function(){J(null)}),3e3)})).catch((function(a){r(t.filter((function(e){return e.id!==n}))),J({kind:"error",content:e+" has allready removed from server."}),setTimeout((function(){J(null)}),3e3)}))}},A=function(e){var n={name:e.name,number:w};s(e.id,n).then((function(n){var a=t.filter((function(e){return e.id!==n.data.id}));r(a.concat(n.data).sort((function(e,n){return e.id-n.id}))),m(""),k(""),J({kind:"note",content:e.name+" was removed succesfully"}),setTimeout((function(){J(null)}),3e3)})).catch((function(n){console.log(n),J({kind:"error",content:"Information of "+e.name+" has allready been removed from server"}),setTimeout((function(){J(null)}),3e3)}))};return u.a.createElement("div",null,u.a.createElement("h2",null,"Phonebook"),u.a.createElement(v,{message:I}),u.a.createElement(E,{value:y,handle:function(e){C(e.target.value),""!==e.target.value&&x(t.filter((function(n){return n.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())})))}}),u.a.createElement("h2",null,"Add new"),u.a.createElement(h,{name:i,nameChange:function(e){m(e.target.value)},number:w,numberChange:function(e){k(e.target.value)},submitForm:function(e){e.preventDefault();var n=t.map((function(e){return e.name})).indexOf(i);if(n>-1&&window.confirm(i+" is allready added to phonebook, replace old number with new one?"))A(t[n]);else{var a={name:i,number:w};f(a).then((function(e){r(t.concat(e.data)),m(""),k(""),J({kind:"note",content:a.name+" was added succesfully"}),setTimeout((function(){J(null)}),3e3)}))}}}),u.a.createElement("h2",null,"Numbers"),u.a.createElement("table",null,u.a.createElement("tbody",null,""===y?t.map((function(e){return u.a.createElement("tr",{key:e.name},u.a.createElement("td",null,e.name),u.a.createElement("td",null,e.number),u.a.createElement("td",null,u.a.createElement("button",{onClick:N(e.name,e.id)},"delete")))})):L.map((function(e){return u.a.createElement("tr",{key:e.name},u.a.createElement("td",null,e.name),u.a.createElement("td",null,e.number),u.a.createElement("td",null,u.a.createElement("button",{onClick:N(e.name,e.id)},"delete")))})))))};l.a.render(u.a.createElement(u.a.StrictMode,null,u.a.createElement(p,null)),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.d29ca35a.chunk.js.map