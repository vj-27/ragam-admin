(this["webpackJsonpragam-admin"]=this["webpackJsonpragam-admin"]||[]).push([[0],{10:function(e,t,n){},12:function(e,t,n){"use strict";n.r(t);var s=n(1),a=n.n(s),i=n(4),c=n.n(i),l=(n(9),n(2)),r=(n(10),n(0));function o(e){var t=[];for(var n in e)for(var s in e[n].events)t.push(e[n].events[s]);return console.log(t),t}function d(e,t){var n=0;for(var s in e)e[s].event===t&&e[s].teamMembers.length&&(n+=1);return n}var j=function(){var e,t,n=Object(s.useState)(""),a=Object(l.a)(n,2),i=a[0],c=a[1],j=Object(s.useState)(""),b=Object(l.a)(j,2),u=b[0],h=b[1],m="https://api.ragam.live/",v=Object(s.useState)(""),O=Object(l.a)(v,2),g=O[0],x=O[1],p=Object(s.useState)(""),f=Object(l.a)(p,2),N=f[0],y=f[1],S=Object(s.useState)(""),C=Object(l.a)(S,2),k=C[0],w=C[1],T=Object(s.useState)({}),F=Object(l.a)(T,2),P=F[0],E=F[1],I=Object(s.useState)("login"),L=Object(l.a)(I,2),D=L[0],J=L[1],M=Object(s.useState)({}),R=Object(l.a)(M,2),A=R[0],B=R[1],U=Object(s.useState)([]),V=Object(l.a)(U,2),z=V[0],G=V[1],W=Object(s.useState)(""),q=Object(l.a)(W,2),H=q[0],K=q[1];return Object(s.useEffect)((function(){var e=localStorage.getItem("user");(e=JSON.parse(e))&&(J("events"),E(e)),fetch(m+"categories").then((function(e){if(e.ok)return e.json();alert("Some error Occurred. Please try again later.")})).then((function(e){console.log(e),B(e)}))}),[]),Object(s.useEffect)((function(){P.token&&fetch(m+"user-event-details",{method:"GET",headers:{Authorization:"Bearer "+P.token}}).then((function(e){if(e.ok)return e.json();alert("Some error Occurred.Contact Technical Team.")})).then((function(e){console.log(e),G(e)}))}),[P.token]),Object(r.jsxs)("div",{className:"App",children:[Object(r.jsxs)("header",{className:"App-header",children:[Object(r.jsxs)("div",{className:"App-header-left",children:["login"===D&&Object(r.jsx)("h4",{className:"page-heading",children:"Login"}),"events"===D&&Object(r.jsx)("h4",{className:"page-heading",children:"Events"}),"insideevent"===D&&Object(r.jsx)("h4",{className:"page-heading",children:"Event Details"}),Object(r.jsx)("div",{className:"heading-extra",children:P.email})]}),P.token&&Object(r.jsx)("button",{onClick:function(){localStorage.removeItem("user"),E({})},children:"Logout"})]}),Object(r.jsxs)("div",{children:["login"===D&&Object(r.jsxs)("div",{className:"login-page",children:[Object(r.jsx)("h4",{className:"page-heading",children:"Login"}),Object(r.jsxs)("form",{className:"form",onSubmit:function(e){e.preventDefault(),fetch(m+"auth/local",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({identifier:i,password:g})}).then((function(e){e.json().then((function(e){if(e.statusCode)h("Username or Password invalid");else{var t=e.user;t.token=e.jwt,localStorage.setItem("user",JSON.stringify(t)),E(t),J("events")}}))}),(function(e){console.log(e)}))},children:[Object(r.jsxs)("div",{className:"field",children:[Object(r.jsx)("label",{htmlFor:"email",children:"Email:"}),Object(r.jsx)("input",{type:"text",id:"email",name:"email",onChange:function(e){c(e.target.value)}})]}),Object(r.jsxs)("div",{className:"field",children:[Object(r.jsx)("label",{htmlFor:"pass",children:"Password:"}),Object(r.jsx)("input",{type:"password",id:"pass",name:"pass",onChange:function(e){x(e.target.value)}})]}),""!==u&&Object(r.jsx)("h4",{children:u}),Object(r.jsx)("input",{type:"submit",value:"Login"})]})]}),"register"===D&&!P.token&&Object(r.jsxs)("div",{children:[Object(r.jsx)("h4",{children:"Register"}),Object(r.jsx)("label",{htmlFor:"email",children:"Email:"}),Object(r.jsx)("input",{type:"text",id:"email",name:"email",onChange:function(e){c(e.target.value)}}),Object(r.jsx)("label",{htmlFor:"email",children:"Username:"}),Object(r.jsx)("input",{type:"text",id:"username",name:"username",onChange:function(e){w(e.target.value)}}),Object(r.jsx)("label",{htmlFor:"pass",children:"Password:"}),Object(r.jsx)("input",{type:"password",id:"pass",name:"pass",onChange:function(e){x(e.target.value)}}),Object(r.jsx)("label",{htmlFor:"pass",children:"Repeat Password:"}),Object(r.jsx)("input",{type:"password",id:"rpass",name:"rpass",onChange:function(e){y(e.target.value)}}),Object(r.jsx)("h4",{children:u}),Object(r.jsx)("input",{type:"button",value:"Submit",onClick:function(){g===N?fetch(m+"auth/local/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:k,email:i,password:g})}).then((function(e){e.json().then((function(e){var t,n;e.statusCode?h(null===e||void 0===e||null===(t=e.data[0])||void 0===t||null===(n=t.messages[0])||void 0===n?void 0:n.message):h("Registered succcessfully. PLease login.")}))}),(function(e){console.log(e)})):h("password doesn't match")}}),Object(r.jsx)("button",{onClick:function(){J("login")},children:"Login"})]}),P.token&&"events"===D&&Object(r.jsx)("div",{children:Object(r.jsx)("div",{className:"events-page",children:A.length&&Object(r.jsx)("div",{className:"events-list",children:o(A).map((function(e,t){return Object(r.jsx)("div",{className:"events-list-item",onClick:function(){K(e.id),J("insideevent"),console.log("eventId",e.id)},children:e.name},e.name)}))})})}),P.token&&"insideevent"===D&&Object(r.jsxs)("div",{class:"event-details-page",children:[Object(r.jsxs)("div",{style:{padding:"0 1rem",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[Object(r.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[Object(r.jsx)("h4",{className:"page-sub-heading",children:(e=o(A),t=H,e.find((function(e){return e.id===t})).name)}),Object(r.jsxs)("div",{className:"heading-extra",children:["Total Registrations: ",d(z,H)," "]})]}),Object(r.jsx)("button",{onClick:function(){J("events")},children:"Back to events"})]}),Object(r.jsx)("div",{className:"event-reg-list",children:z.map((function(e,t){var n;if(e.event===H&&e.teamMembers.length)return Object(r.jsxs)("div",{className:"event-reg-list-item",children:[Object(r.jsxs)("div",{class:"event-reg-detail",children:[Object(r.jsx)("label",{className:"event-reg-label",children:"Ref No."}),Object(r.jsx)("div",{children:e.id})]}),Object(r.jsxs)("div",{class:"event-reg-detail",children:[Object(r.jsx)("label",{className:"event-reg-label",children:"Status"}),Object(r.jsx)("div",{children:e.status})]}),Object(r.jsxs)("div",{class:"event-reg-detail",children:[Object(r.jsx)("label",{className:"event-reg-label",children:"Team Members"}),Object(r.jsx)("div",{children:e.teamMembers.map((function(e,t){return Object(r.jsxs)("div",{style:{display:"flex",flexDirection:"column",flexWrap:"wrap",marginTop:"10px"},children:[Object(r.jsx)("div",{style:{textDecoration:"underline"},children:e.ragamID}),Object(r.jsx)("div",{children:e.name}),Object(r.jsx)("div",{children:e.collegeName}),Object(r.jsx)("div",{children:e.phoneNumber}),Object(r.jsx)("div",{children:e.email})]})}))})]}),e.metaValues&&Object(r.jsxs)("div",{class:"event-reg-detail",children:[Object(r.jsx)("label",{className:"event-reg-label",children:"Metavalues"}),null===(n=e.metaValues)||void 0===n?void 0:n.map((function(e,t){return Object(r.jsx)("div",{children:e})}))]}),Object(r.jsxs)("div",{class:"event-reg-detail",children:[Object(r.jsx)("label",{className:"event-reg-label",children:"Submissions"}),e.submissions.length?e.submissions.map((function(e,t){return Object(r.jsx)("a",{style:{overflow:"hidden",textOverflow:"ellipsis"},href:m.slice(0,-1)+e.url,children:e.name})})):Object(r.jsx)("div",{children:"No submissions by this team"})]})]},e.id)}))})]})]})]})},b=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,13)).then((function(t){var n=t.getCLS,s=t.getFID,a=t.getFCP,i=t.getLCP,c=t.getTTFB;n(e),s(e),a(e),i(e),c(e)}))};c.a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(j,{})}),document.getElementById("root")),b()},9:function(e,t,n){}},[[12,1,2]]]);
//# sourceMappingURL=main.283bc380.chunk.js.map