(function(e){function t(t){for(var o,n,i=t[0],c=t[1],l=t[2],d=0,p=[];d<i.length;d++)n=i[d],Object.prototype.hasOwnProperty.call(s,n)&&s[n]&&p.push(s[n][0]),s[n]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);u&&u(t);while(p.length)p.shift()();return a.push.apply(a,l||[]),r()}function r(){for(var e,t=0;t<a.length;t++){for(var r=a[t],o=!0,i=1;i<r.length;i++){var c=r[i];0!==s[c]&&(o=!1)}o&&(a.splice(t--,1),e=n(n.s=r[0]))}return e}var o={},s={app:0},a=[];function n(t){if(o[t])return o[t].exports;var r=o[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=o,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var u=c;a.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";r("85ec")},"3cb9":function(e,t,r){},"494e":function(e,t,r){},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var o=r("2b0e"),s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[e.currentMode==e.modes.LOAD?r("Loader",{on:{loaded:e.protoLoaded}}):r("Renderer",{attrs:{pkg:e.protoPackage,messages:e.protoMessages},on:{newProto:e.loadNewProto}})],1)},a=[],n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("b-jumbotron",{staticStyle:{padding:"2rem 2rem"},attrs:{header:"Proto Browser","header-level":"4"}}),r("b-container",[r("b-card",[r("b-form",[r("b-form-group",{attrs:{id:"input-group-proto-file",label:"Protobuf .proto file:","label-for":"input-proto-file"}},[r("b-form-file",{attrs:{id:"input-proto-file",state:Boolean(e.ioProtoFile),placeholder:"Choose a file or drop it here...","drop-placeholder":"Drop file here..."},on:{input:e.parseProtoFile},model:{value:e.ioProtoFile,callback:function(t){e.ioProtoFile=t},expression:"ioProtoFile"}})],1)],1)],1),r("p",{staticClass:"pt-5 pb-5 text-center"},[e._v("OR")]),r("b-card",[r("b-form",[r("b-form-group",{attrs:{id:"input-group-proto-text-url",label:"Protobuf URL:","label-for":"input-proto-text-url"}},[r("b-form-input",{attrs:{id:"input-proto-text-url",placeholder:"E.g. https://raw.githubusercontent.com/..."},model:{value:e.ioProtoURL,callback:function(t){e.ioProtoURL=t},expression:"ioProtoURL"}}),r("b-button",{staticClass:"mt-3",attrs:{variant:"primary",disabled:""===e.ioProtoURL},on:{click:e.fetchProtoFromURL}},[e._v(" Load ")])],1)],1)],1)],1)],1)},i=[],c=(r("498a"),r("bc3a")),l=r.n(c),u=r("703b"),d={data:function(){return{ioProtoFile:null,ioProtoURL:"",ioProtoContents:"",proto:{}}},methods:{fetchProtoFromURL:function(){var e=this;l.a.get(this.ioProtoURL.trim()).then((function(t){e.ioProtoContents=t.data,e.parseProtoContents()})).catch((function(e){alert(e)}))},parseProtoFile:function(){var e=this,t=new FileReader;t.onload=function(){e.ioProtoContents=t.result,e.parseProtoContents()},t.readAsText(this.ioProtoFile)},parseProtoContents:function(){var e=u["parse"](this.ioProtoContents);this.$emit("loaded",e)}}},p=d,h=r("2877"),f=Object(h["a"])(p,n,i,!1,null,null,null),m=f.exports,b=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-container",{staticClass:"pt-3",attrs:{fluid:""}},[r("b-row",{staticClass:"text-center"},[r("b-col",{attrs:{cols:"2"}},[r("p",{staticClass:"h1"},[e._v(e._s(e.pkg))])]),r("b-col",{attrs:{cols:"4"}},[r("b-form-group",{attrs:{id:"input-group-message",label:"Message: ","label-for":"input-message","label-cols":"2"}},[r("b-form-select",{attrs:{id:"input-message",options:e.messageList},model:{value:e.messageName,callback:function(t){e.messageName=t},expression:"messageName"}})],1)],1),r("b-col",{attrs:{cols:"4"}},[r("b-form-group",{attrs:{id:"input-group-sort",label:"Sort by: ","label-for":"input-sort","label-cols":"2"}},[r("b-form-select",{attrs:{id:"input-sort",options:e.sortTypesList},model:{value:e.sortType,callback:function(t){e.sortType=t},expression:"sortType"}})],1)],1),r("b-col",{attrs:{cols:"2"}},[r("b-button",{attrs:{variant:"success"},on:{click:e.loadNewProto}},[e._v(" Load new proto ")])],1)],1),r("hr"),r("b-container",[r("b-form",{staticClass:"pb-5"},[r("b-row",[r("b-col",{attrs:{cols:"8"}},[r("b-form-group",{attrs:{id:"input-group-search"}},[r("b-form-input",{attrs:{id:"input-search",placeholder:"Search ..."},model:{value:e.searchText,callback:function(t){e.searchText=t},expression:"searchText"}})],1)],1),r("b-col",{attrs:{cols:"2"}},[r("b-button",{attrs:{variant:"outline-primary"},on:{click:e.resetSearch}},[e._v("CLEAR")])],1),r("b-col",{attrs:{cols:"2"}},[r("b-form-checkbox",{attrs:{name:"input-show-children",switch:""},model:{value:e.searchShowChildren,callback:function(t){e.searchShowChildren=t},expression:"searchShowChildren"}},[e._v(" Show children ")])],1)],1)],1)],1),r("MessageNode",{attrs:{node:e.filteredRootNode,searched:""!==e.searchText}}),r("div",{attrs:{id:"btn-to-top"}},[r("a",{staticClass:"btn btn-primary",attrs:{href:"#app"}},[e._v("TOP")])])],1)},v=[],g=(r("99af"),r("caad"),r("c975"),r("d81d"),r("b0c0"),r("b64b"),r("d3b7"),r("ac1f"),r("2532"),r("5319"),r("ddb0"),r("b85c")),y=r("0644"),P=r.n(y),_=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("li",[r("span",{staticClass:"proto-field-name",class:{mark:e.searched&&e.node.searchMatch}},[e._v(" "+e._s(e.node.name))]),e._v(e._s(e.node.required?"*":"")+": "+e._s(e.node.repeated?"[]":"")+e._s(e.node.type)+" "),r("ul",[e._l(e.node.children,(function(t){return["basic"===t.kind?r("li",{key:t.name},[r("span",{staticClass:"proto-field-name",class:{mark:e.searched&&t.searchMatch}},[e._v(e._s(t.name))]),e._v(e._s(t.required?"*":"")+": "+e._s(t.repeated?"[]":"")+e._s(t.type)+" ")]):e._e(),"nested"===t.kind?r("Node",{key:t.name,attrs:{node:t,searched:e.searched}}):e._e(),"enum"===t.kind?r("li",{key:t.name},[r("span",{staticClass:"proto-field-name",class:{mark:e.searched&&t.searchMatch}},[e._v(e._s(t.name))]),e._v(e._s(t.required?"*":"")+": "+e._s(t.repeated?"[]":"")+"Enum "+e._s(e.formatEnumValues(t.values))+" ")]):e._e()]}))],2)])])},k=[],N=(r("a15b"),{name:"Node",props:["node","searched"],methods:{formatEnumValues:function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.push("".concat(r," (").concat(e[r],")"));return t.join(", ")}}}),M=N,x=(r("9506"),Object(h["a"])(M,_,k,!1,null,"9eaf9df2",null)),C=x.exports,O={components:{MessageNode:C},props:{pkg:{type:String,required:!0},messages:{type:Object,required:!0}},data:function(){return{currentMessageName:"",sortTypes:{POSITION:"POSITION",NAME:"NAME"},sortTypesList:[{value:"POSITION",text:"Position"},{value:"NAME",text:"Name"}],sortType:"POSITION",searchText:"",searchShowChildren:!0}},computed:{messageList:function(){var e=this;return Object.keys(this.messages).map((function(t){return e.messages[t].name})).sort()},messageName:{get:function(){return this.currentMessageName?this.currentMessageName:"bookings"===this.pkg&&this.messageList.indexOf("Bookings")>-1?"Bookings":this.messageList[0]},set:function(e){this.currentMessageName=e}},typeMap:function(){var e={};for(var t in this.messages){var r=this.messages[t],o=r.fullName;e[this.convertToDollarKey(o)]=r;var s=this.getNestedTypes(r);Object.assign(e,s)}return e},rootNode:function(){var e=this.messages[this.messageName];return{name:e.name,kind:"nested",type:e.name,children:this.getChildren(e)}},filteredRootNode:function(){var e=P()(this.rootNode);if(""!==this.searchText){var t=this.searchInNodes(e.children,this.searchText,!0,this.searchShowChildren),r=t.nodes;e.children=r}return e}},methods:{loadNewProto:function(){this.$emit("newProto")},resetSearch:function(){this.searchText=""},getNestedTypes:function(e){var t={};if("undefined"!==typeof e.nested)for(var r in e.nested){var o=e.nested[r],s=o.fullName;t[this.convertToDollarKey(s)]=o;var a=this.getNestedTypes(o);Object.assign(t,a)}return t},convertToDollarKey:function(e){return e.replace(/\./g,"$")},getChildren:function(e){var t=[];if("undefined"!==typeof e.fields)for(var r in e.fields){var o=e.fields[r];if("BaseType"===o.type.syntaxType)t.push({name:o.name,kind:"basic",repeated:o.repeated,required:o.required,type:o.type.value});else{var s=this.convertToDollarKey(o.type.resolvedValue),a=this.typeMap[s];if("undefined"===typeof a){console.warn("Field ".concat(o.fullName,': Key "').concat(s,'" not found in types of document')),t.push({name:o.name,kind:"basic",repeated:o.repeated,required:o.required,type:o.type.value+" (not in document)"});continue}"EnumDefinition"===a.syntaxType?t.push({name:o.name,kind:"enum",repeated:o.repeated,required:o.required,values:a.values}):t.push({name:o.name,kind:"nested",repeated:o.repeated,required:o.required,type:o.type.value,children:this.getChildren(a)})}}return this.sortType===this.sortTypes.NAME&&(t=t.sort((function(e,t){return e.name.toUpperCase().localeCompare(t.name.toUpperCase())}))),t},searchInNodes:function(e,t,r,o){var s,a=[],n=!1,i=t.toLowerCase(),c=Object(g["a"])(e);try{for(c.s();!(s=c.n()).done;){var l=s.value;if(l.searchMatch=l.name.toLowerCase().includes(i),"nested"===l.kind){var u=this.searchInNodes(l.children,t,r&&!l.searchMatch,o),d=u.nodes,p=u.searchMatch;l.searchMatchChild=p,l.children=o||p?d:[]}else l.searchMatchChild=!1;r?(l.searchMatch||l.searchMatchChild)&&a.push(l):a.push(l),(l.searchMatch||l.searchMatchChild)&&(n=!0)}}catch(h){c.e(h)}finally{c.f()}return{nodes:a,searchMatch:n}}}},T=O,w=(r("bca7"),Object(h["a"])(T,b,v,!1,null,"6c9464b4",null)),L=w.exports,j={components:{Loader:m,Renderer:L},data:function(){return{modes:{LOAD:"load",RENDER:"render"},currentMode:"load",protoPackage:"",protoMessages:[]}},methods:{protoLoaded:function(e){this.protoPackage=e.package,this.protoMessages=e.root.nested[e.package].nested,this.currentMode=this.modes.RENDER,console.log(this.protoMessages)},loadNewProto:function(){this.proto={},this.currentMode=this.modes.LOAD}}},S=j,R=(r("034f"),Object(h["a"])(S,s,a,!1,null,null,null)),E=R.exports,q=r("5f5b"),F=r("b1e0");r("f9e3"),r("2dd8");o["default"].config.productionTip=!1,o["default"].use(q["a"]),o["default"].use(F["a"]),new o["default"]({render:function(e){return e(E)}}).$mount("#app")},"85ec":function(e,t,r){},9506:function(e,t,r){"use strict";r("3cb9")},bca7:function(e,t,r){"use strict";r("494e")}});
//# sourceMappingURL=app.89203340.js.map