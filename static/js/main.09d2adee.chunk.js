(this["webpackJsonpaer-custom-expedition-editor"]=this["webpackJsonpaer-custom-expedition-editor"]||[]).push([[0],{29:function(e,n,t){e.exports=t(39)},39:function(e,n,t){"use strict";t.r(n);var a,i=t(0),o=t.n(i),r=t(3),c=t.n(r),l=t(4),d=t(12),u=t(5),m=t(40);!function(e){e.SET_EXPEDITION_NAME="DraftExpedition/Name/SET_EXPEDITION_NAME"}(a||(a={}));var p,f={noOp:function(){return Object(m.a)("NOOP")},setExpeditionName:function(e){return Object(m.a)(a.SET_EXPEDITION_NAME,e)}},g={getExpeditionName:function(e){return e.DraftExpedition.Name}};!function(e){e.SET_BIG_POCKET_VARIANT_CONFIG="DraftExpedition/BigPocketVariantConfig/SET_BIG_POCKET_VARIANT_CONFIG"}(p||(p={}));var s,h={noOp:function(){return Object(m.a)("NOOP")},setBigPocketVariantConfig:function(e){return Object(m.a)(p.SET_BIG_POCKET_VARIANT_CONFIG,e)}},b={getBigPocketVariantConfig:function(e){return e.DraftExpedition.BigPocketVariantConfig}},E=t(9),x=t(6),C=t(18),v={};!function(e){e.ADD_BRANCH="DraftExpedition/SequenceConfig/Branches/ADD_BRANCH"}(s||(s={}));var O={noOp:function(){return Object(m.a)("NOOP")},addBranch:function(e){return Object(m.a)(s.ADD_BRANCH,e)}},y=function(e){return e.DraftExpedition.SequenceConfig.Branches},j={getBranchesState:y,getBranchIds:Object(C.a)([y],(function(e){return Object.keys(e)})),getBranches:Object(C.a)([y],(function(e){return Object.values(e)}))},N={Branches:v},w={Branches:O},B=Object(u.a)({Branches:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case s.ADD_BRANCH:var t=n.payload,a=t.id,i=t.type,o=t.nextBranchId;return Object(x.a)({},e,Object(E.a)({},a,{id:a,type:i,nextBranchId:o}));default:return e}}}),I={Branches:j},k={Name:"",BigPocketVariantConfig:!1,SequenceConfig:N},P={Name:f,BigPocketVariantConfig:h,SequenceConfig:w},S=Object(u.a)({Name:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1?arguments[1]:void 0;switch(n.type){case a.SET_EXPEDITION_NAME:return n.payload;default:return e}},BigPocketVariantConfig:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=arguments.length>1?arguments[1]:void 0;switch(n.type){case p.SET_BIG_POCKET_VARIANT_CONFIG:return n.payload;default:return e}},SequenceConfig:B}),V={Name:g,BigPocketVariantConfig:b,SequenceConfig:I},D={DraftExpedition:k},_={DraftExpedition:P},T=Object(u.c)(Object(u.a)({DraftExpedition:S})),A={DraftExpedition:V};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var F=t(1),R=t(2);function q(){var e=Object(R.a)(["\n  *,\n  ::after, \n  ::before {\n    box-sizing: border-box;\n  }\n\n  body {\n    font-family: 'Roboto', Arial, sans-serif;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-font-smoothing: antialiased;\n    text-rendering: optimizeLegibility;\n    margin: 0;\n    padding: 0;\n  }\n"]);return q=function(){return e},e}var H=Object(F.b)(q()),M={colors:{}},W=Object(F.c)("h1").withConfig({displayName:"H1",componentId:"sc-148yuyg-0"})(["color:#2196f3;margin-top:0;"]),z=t(10),G=Object(F.c)("div").withConfig({displayName:"Wrapper",componentId:"sc-142z3d0-0"})(["margin-bottom:16px;"]),L=Object(F.c)("h3").withConfig({displayName:"Header",componentId:"sc-1b7abu3-0"})(["border-bottom:1px solid #dadada;margin:0;"]),J=Object(F.c)("button").withConfig({displayName:"Button",componentId:"lad664-0"})(["height:32px;padding:0 8px;cursor:pointer;font-family:'Roboto';"]),K=Object(F.c)(J).withConfig({displayName:"Summary",componentId:"sc-909c31-0"})(["height:auto;font-size:1.5rem;font-weight:100;display:flex;align-items:center;width:100%;padding:8px 0;position:relative;outline:0;border:none;background:transparent;"]),X=Object(F.c)("div").withConfig({displayName:"Content",componentId:"y983a6-0"})(["padding-top:16px;"]),Y=Object(F.c)("span").withConfig({displayName:"SummaryIcon",componentId:"sc-14hasm1-0"})(["position:absolute;right:8px;"]),$=o.a.memo((function(e){var n=e.id,t=e.title,a=e.open,r=e.children,c=Object(i.useState)(a||!1),l=Object(z.a)(c,2),d=l[0],u=l[1];return o.a.createElement(G,null,o.a.createElement(L,null,o.a.createElement(K,{id:"".concat(n,"Summary"),type:"button","aria-expanded":d?"true":"false","aria-controls":"".concat(n,"Content"),onClick:function(){u(!d)}},t,o.a.createElement(Y,{className:"material-icons"},d?"expand_less":"expand_more"))),o.a.createElement(X,{id:"".concat(n,"Content"),role:"region","aria-labelledby":"".concat(n,"Summary"),hidden:!d},r))})),Q=Object(F.c)("span").withConfig({displayName:"ScreenReaderOnlyText",componentId:"sc-12brag0-0"})(["position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;"]),U=Object(F.c)("fieldset").withConfig({displayName:"Wrapper",componentId:"sc-1su96s3-0"})(["padding:0;border:none;"]),Z=Object(F.c)("legend").withConfig({displayName:"Legend",componentId:"sc-1whu9a5-0"})(["padding:0;"]),ee=o.a.memo((function(e){var n=e.legend,t=e.legendVisible,a=e.children;return o.a.createElement(U,null,o.a.createElement(Z,null,t?n:o.a.createElement(Q,null,n)),a)})),ne=Object(F.c)("label").withConfig({displayName:"Label",componentId:"lr457e-0"})(["display:block;font-family:'Roboto';font-size:12px;margin-bottom:4px;"]),te=Object(F.c)("input").withConfig({displayName:"Input",componentId:"il42sz-0"})(["height:32px;padding:0 8px;font-family:'Roboto';border:1px solid #dadada;"]),ae=Object(F.c)("div").withConfig({displayName:"Wrapper",componentId:"sc-1wpqod6-0"})(["margin-bottom:16px;"]),ie=o.a.memo((function(e){var n=e.id,t=e.label,a=e.labelHidden,i=e.name,r=e.onChange,c=e.defaultValue;return o.a.createElement(ae,null,o.a.createElement(ne,{htmlFor:n},a?o.a.createElement(Q,null,t):t),o.a.createElement(te,{id:n,name:i||n,type:"text",onChange:r,defaultValue:c}))})),oe=Object(F.c)("div").withConfig({displayName:"Wrapper",componentId:"sc-1hfhkru-0"})(["margin-bottom:16px;","{font-size:16px;margin-bottom:0;}input{margin:0 8px 0 0;}"],ne),re=o.a.memo((function(e){var n=e.id,t=e.label,a=e.labelHidden,i=e.name,r=e.onChange,c=e.defaultChecked;return o.a.createElement(oe,null,o.a.createElement(ne,{htmlFor:n},o.a.createElement("input",{id:n,type:"checkbox",name:i||n,onChange:r,defaultChecked:c}),a?o.a.createElement(Q,null,t):t))})),ce={setExpeditionName:_.DraftExpedition.Name.setExpeditionName,setBigPocketVariantConfig:_.DraftExpedition.BigPocketVariantConfig.setBigPocketVariantConfig},le=Object(l.b)((function(e){return{expeditionName:A.DraftExpedition.Name.getExpeditionName(e),bigPocketVariantConfig:A.DraftExpedition.BigPocketVariantConfig.getBigPocketVariantConfig(e)}}),ce)((function(e){var n=e.expeditionName,t=e.bigPocketVariantConfig,a=e.setExpeditionName,i=e.setBigPocketVariantConfig;return o.a.createElement($,{id:"basicInformation",title:"Basic Information",open:!0},o.a.createElement(ee,{legend:"Basic Information"},o.a.createElement(ie,{id:"expeditionName",label:"Expedition Name",onChange:function(e){a(e.target.value)},defaultValue:n}),o.a.createElement(re,{id:"bigPocketVariantConfig",label:"Big Pocket Mode",onChange:function(e){i(e.currentTarget.checked)},defaultChecked:t})))}));function de(){var e=Object(R.a)(["\n  height: 100%;\n  width: 100%;\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 10000;\n  padding: 24px;\n"]);return de=function(){return e},e}var ue=Object(F.c)("div")(de());function me(){var e=Object(R.a)(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  background: rgb(0, 0, 0, 0.3);\n"]);return me=function(){return e},e}var pe=Object(F.c)("div")(me());function fe(){var e=Object(R.a)(["\n  margin: auto;\n  height: 100%;\n  width: 100%;\n  background: #fff;\n  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);\n  border-radius: 8px;\n  position: relative;\n"]);return fe=function(){return e},e}var ge=Object(F.c)("div")(fe());function se(){var e=Object(R.a)(["\n  margin: auto;\n  height: 64px;\n  width: 100%;\n  padding: 0 24px;\n  position: relative;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n"]);return se=function(){return e},e}var he=Object(F.c)("div")(se());function be(){var e=Object(R.a)(["\n  height: ",";\n"]);return be=function(){return e},e}var Ee=Object(F.c)("div")(be(),(function(e){return e.hasFooter?"calc(100% - (64px * 2))":"calc(100% - 64px)"})),xe=t(28),Ce=Object(F.c)("h2").withConfig({displayName:"H2",componentId:"sc-1jeqk1f-0"})(["color:#2196f3;"]);function ve(){var e=Object(R.a)(["\n  color: ",";\n  margin: 0;\n"]);return ve=function(){return e},e}var Oe=Object(F.c)((function(e){e.themeColor;var n=Object(xe.a)(e,["themeColor"]);return o.a.createElement(Ce,n)}))(ve(),(function(e){return e.themeColor}));function ye(){var e=Object(R.a)(["\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  width: 48px;\n  height: 48px;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  transition: color .2s ease;\n\n  &:hover {\n    color: #2196f3;\n  }\n"]);return ye=function(){return e},e}var je=Object(F.c)("button")(ye());function Ne(){var e=Object(R.a)(["\n  margin: auto;\n  height: 64px;\n  width: 100%;\n  padding: 0 24px;\n  position: relative;\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  margin-top: -1px;\n"]);return Ne=function(){return e},e}var we=Object(F.c)("div")(Ne()),Be=o.a.memo((function(e){var n=e.titleColor,t=e.titleLabel,a=e.children,i=e.closeModal,r=e.footer,l=document.getElementById("modal-root");return l?c.a.createPortal(o.a.createElement(o.a.Fragment,null,o.a.createElement(ue,null,o.a.createElement(pe,{onClick:i}),o.a.createElement(ge,null,o.a.createElement(he,null,o.a.createElement(Oe,{variant:"h2",themeColor:n},t),o.a.createElement(je,{onClick:i},o.a.createElement("span",{className:"material-icons"},"close"))),o.a.createElement(Ee,{hasFooter:!!r},a),r&&o.a.createElement(we,null,r)))),l):null})),Ie=Object(F.c)("div").withConfig({displayName:"ModalBodyWrapper",componentId:"sc-1y2cm9e-0"})(["margin:auto;height:",";width:100%;padding:24px;position:relative;overflow-y:auto;> *:first-child{margin-top:0;}"],(function(e){return e.hasFooter?"calc(100% - 64px)":"100%"})),ke=Object(F.c)("div").withConfig({displayName:"ModalFooterWrapper",componentId:"sc-6wltjc-0"})(["margin:auto;height:64px;width:100%;padding:0 24px;position:relative;display:flex;justify-content:flex-end;align-items:center;border-top:1px solid rgba(0,0,0,0.1);margin-top:-1px;button{width:100%;}button + button{margin-left:16px;}"]),Pe=(o.a.memo((function(e){var n=e.yesHandler,t=e.noHandler,a=e.children;return o.a.createElement(o.a.Fragment,null,o.a.createElement(Ie,{hasFooter:!0},a),o.a.createElement(ke,null,o.a.createElement(J,{onClick:t},"No"),o.a.createElement(J,{onClick:n},"Yes")))})),function(){var e=Object(i.useState)(!1),n=Object(z.a)(e,2),t=n[0],a=n[1],r=function(){return a(!1)};return{show:function(){return a(!0)},hide:r,RenderModal:function(e){var n=e.titleColor,a=e.titleLabel,i=e.children,c=e.closeCallback,l=e.footer;return o.a.createElement(o.a.Fragment,null,t&&o.a.createElement(Be,{titleColor:n,titleLabel:a,closeModal:function(){r(),c&&c()},footer:l},i))}}}),Se=t(27),Ve=Object(F.c)(Se.a).withConfig({displayName:"Select",componentId:"sc-1eauafc-0"})([""]),De=[{value:"narrative",label:"narrative"},{value:"battle",label:"battle"},{value:"reward",label:"reward"}],_e=o.a.memo((function(e){var n=e.branch,t=e.changeId,a=e.changeType,i=De.find((function(e){return e.value===n.type}));return o.a.createElement(Ie,null,o.a.createElement(ee,{legend:"Branches"},o.a.createElement(ie,{id:"branchId",label:"Branch id",onChange:t,defaultValue:n.id}),o.a.createElement(ne,{htmlFor:"branchType"},"Branch type"),o.a.createElement(Ve,{options:De,classNamePrefix:"ReactSelect",id:"branchType",name:"branchType",onChange:a,defaultValue:i})))})),Te={addBranch:_.DraftExpedition.SequenceConfig.Branches.addBranch},Ae=Object(l.b)(null,Te)(o.a.memo((function(e){var n=e.modal,t=e.branch,a=e.clearState,i=e.addBranch;return o.a.createElement(o.a.Fragment,null,o.a.createElement(J,{onClick:function(){a(),n.hide()}},"Cancel"),o.a.createElement(J,{onClick:function(){i(t),a(),n.hide()}},"Add branch"))}))),Fe={id:"",type:"narrative"},Re=o.a.memo((function(e){var n=e.modal,t=Object(i.useState)(Fe),a=Object(z.a)(t,2),r=a[0],c=a[1];return o.a.createElement(n.RenderModal,{titleLabel:"Add branch",footer:o.a.createElement(Ae,{modal:n,branch:r,clearState:function(){c(Fe)}})},o.a.createElement(_e,{branch:r,changeId:function(e){c(Object(x.a)({},r,{id:e.target.value}))},changeType:function(e){c(Object(x.a)({},r,{type:e.value}))}}))})),qe=o.a.memo((function(){var e=Pe();return o.a.createElement($,{id:"branches",title:"Branches",open:!0},o.a.createElement(J,{type:"button",style:{display:"block",margin:"24px 0 0"},onClick:function(){return e.show()}},"Add branch"),o.a.createElement(Re,{modal:e}))})),He=function(e){window.navigator.clipboard.writeText(e)},Me=t(26),We=function(e,n){var t=new Blob([e],{type:"text/json;charset=utf-8"});return Object(Me.saveAs)(t,"".concat(n,".json"))},ze=Object(F.c)("div").withConfig({displayName:"Wrapper",componentId:"qg3r9u-0"})(["width:50%;padding:0 0 0 32px;@media all and (max-width:920px){width:100%;padding:32px 0 0 0;}"]),Ge=Object(F.c)("pre").withConfig({displayName:"Pre",componentId:"sc-6jfuxg-0"})(["padding:24px;border:1px solid #dadada;background:#fafafa;"]),Le=Object(l.b)((function(e){return{name:A.DraftExpedition.Name.getExpeditionName(e),bigPocketVariantConfig:A.DraftExpedition.BigPocketVariantConfig.getBigPocketVariantConfig(e),branches:A.DraftExpedition.SequenceConfig.Branches.getBranches(e)}}))(o.a.memo((function(e){var n=e.fileName,t=void 0===n?"expedition":n,a={name:e.name,bigPocketVariantConfig:e.bigPocketVariantConfig,sequenceConfig:{branches:e.branches.reduce((function(e,n){return Object(x.a)({},e,Object(E.a)({},n.id,{type:n.type,nextBranchId:n.nextBranchId}))}),{})}};return o.a.createElement(ze,null,o.a.createElement(Ge,null,JSON.stringify(a,null,"  ")),o.a.createElement(J,{type:"button",onClick:function(){He(JSON.stringify(a,null,"  "))}},"Copy to clipboard"),o.a.createElement(J,{type:"button",onClick:function(){We(JSON.stringify(a,null,"  "),t)}},"Save to file"))}))),Je=Object(F.c)("div").withConfig({displayName:"Wrapper",componentId:"sc-1ki6vgc-0"})(["display:flex;@media all and (max-width:920px){flex-direction:column;}"]),Ke=Object(F.c)("form").withConfig({displayName:"Form",componentId:"mhfhih-0"})(["width:50%;@media all and (max-width:920px){width:100%;}"]),Xe=Object(l.b)((function(e){return{branches:A.DraftExpedition.SequenceConfig.Branches.getBranches(e)}}))(o.a.memo((function(e){var n=e.branches;return o.a.createElement(Je,null,o.a.createElement(Ke,null,o.a.createElement(le,null),o.a.createElement(qe,null),n.length>0?o.a.createElement("ul",null,n.map((function(e){return o.a.createElement("li",{key:e.id},e.id," ",e.type)}))):o.a.createElement("p",null,"No branches added")),o.a.createElement(Le,null))}))),Ye=Object(F.c)("div").withConfig({displayName:"Wrapper",componentId:"jwci9w-0"})(["padding:32px;"]),$e=function(){return o.a.createElement(Ye,null,o.a.createElement(W,null,"AER: Custom Expedition Editor"),o.a.createElement(Xe,null),o.a.createElement("div",{id:"modal-root"}))},Qe=function(){return o.a.createElement(F.a,{theme:M},o.a.createElement(H,null),o.a.createElement($e,null))},Ue=function(e){var n=[d.a.apply(void 0,[]),Object(u.b)()],t=d.c;return(0,d.d)(T,e,t.apply(void 0,n))}(D);c.a.render(o.a.createElement(l.a,{store:Ue},o.a.createElement(Qe,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[29,1,2]]]);
//# sourceMappingURL=main.09d2adee.chunk.js.map