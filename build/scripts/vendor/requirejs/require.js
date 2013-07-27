/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.1.8 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

var requirejs,require,define;!function(global){function isFunction(t){return"[object Function]"===ostring.call(t)}function isArray(t){return"[object Array]"===ostring.call(t)}function each(t,e){if(t){var n;for(n=0;n<t.length&&(!t[n]||!e(t[n],n,t));n+=1);}}function eachReverse(t,e){if(t){var n;for(n=t.length-1;n>-1&&(!t[n]||!e(t[n],n,t));n-=1);}}function hasProp(t,e){return hasOwn.call(t,e)}function getOwn(t,e){return hasProp(t,e)&&t[e]}function eachProp(t,e){var n;for(n in t)if(hasProp(t,n)&&e(t[n],n))break}function mixin(t,e,n,i){return e&&eachProp(e,function(e,r){(n||!hasProp(t,r))&&(i&&"string"!=typeof e?(t[r]||(t[r]={}),mixin(t[r],e,n,i)):t[r]=e)}),t}function bind(t,e){return function(){return e.apply(t,arguments)}}function scripts(){return document.getElementsByTagName("script")}function defaultOnError(t){throw t}function getGlobal(t){if(!t)return t;var e=global;return each(t.split("."),function(t){e=e[t]}),e}function makeError(t,e,n,i){var r=new Error(e+"\nhttp://requirejs.org/docs/errors.html#"+t);return r.requireType=t,r.requireModules=i,n&&(r.originalError=n),r}function newContext(t){function e(t){var e,n;for(e=0;t[e];e+=1)if(n=t[e],"."===n)t.splice(e,1),e-=1;else if(".."===n){if(1===e&&(".."===t[2]||".."===t[0]))break;e>0&&(t.splice(e-1,2),e-=2)}}function n(t,n,i){var r,o,s,a,c,u,l,h,f,p,d,m=n&&n.split("/"),g=m,v=C.map,y=v&&v["*"];if(t&&"."===t.charAt(0)&&(n?(g=getOwn(C.pkgs,n)?m=[n]:m.slice(0,m.length-1),t=g.concat(t.split("/")),e(t),o=getOwn(C.pkgs,r=t[0]),t=t.join("/"),o&&t===r+"/"+o.main&&(t=r)):0===t.indexOf("./")&&(t=t.substring(2))),i&&v&&(m||y)){for(a=t.split("/"),c=a.length;c>0;c-=1){if(l=a.slice(0,c).join("/"),m)for(u=m.length;u>0;u-=1)if(s=getOwn(v,m.slice(0,u).join("/")),s&&(s=getOwn(s,l))){h=s,f=c;break}if(h)break;!p&&y&&getOwn(y,l)&&(p=getOwn(y,l),d=c)}!h&&p&&(h=p,f=d),h&&(a.splice(0,f,h),t=a.join("/"))}return t}function i(t){isBrowser&&each(scripts(),function(e){return e.getAttribute("data-requiremodule")===t&&e.getAttribute("data-requirecontext")===x.contextName?(e.parentNode.removeChild(e),!0):void 0})}function r(t){var e=getOwn(C.paths,t);return e&&isArray(e)&&e.length>1?(i(t),e.shift(),x.require.undef(t),x.require([t]),!0):void 0}function o(t){var e,n=t?t.indexOf("!"):-1;return n>-1&&(e=t.substring(0,n),t=t.substring(n+1,t.length)),[e,t]}function s(t,e,i,r){var s,a,c,u,l=null,h=e?e.name:null,f=t,p=!0,d="";return t||(p=!1,t="_@r"+(O+=1)),u=o(t),l=u[0],t=u[1],l&&(l=n(l,h,r),a=getOwn(_,l)),t&&(l?d=a&&a.normalize?a.normalize(t,function(t){return n(t,h,r)}):n(t,h,r):(d=n(t,h,r),u=o(d),l=u[0],d=u[1],i=!0,s=x.nameToUrl(d))),c=!l||a||i?"":"_unnormalized"+(q+=1),{prefix:l,name:d,parentMap:e,unnormalized:!!c,url:s,originalName:f,isDefine:p,id:(l?l+"!"+d:d)+c}}function a(t){var e=t.id,n=getOwn(E,e);return n||(n=E[e]=new x.Module(t)),n}function c(t,e,n){var i=t.id,r=getOwn(E,i);!hasProp(_,i)||r&&!r.defineEmitComplete?(r=a(t),r.error&&"error"===e?n(r.error):r.on(e,n)):"defined"===e&&n(_[i])}function u(t,e){var n=t.requireModules,i=!1;e?e(t):(each(n,function(e){var n=getOwn(E,e);n&&(n.error=t,n.events.error&&(i=!0,n.emit("error",t)))}),i||req.onError(t))}function l(){globalDefQueue.length&&(apsp.apply(T,[T.length-1,0].concat(globalDefQueue)),globalDefQueue=[])}function h(t){delete E[t],delete S[t]}function f(t,e,n){var i=t.map.id;t.error?t.emit("error",t.error):(e[i]=!0,each(t.depMaps,function(i,r){var o=i.id,s=getOwn(E,o);!s||t.depMatched[r]||n[o]||(getOwn(e,o)?(t.defineDep(r,_[o]),t.check()):f(s,e,n))}),n[i]=!0)}function p(){var t,e,n,o,s=1e3*C.waitSeconds,a=s&&x.startTime+s<(new Date).getTime(),c=[],l=[],h=!1,d=!0;if(!y){if(y=!0,eachProp(S,function(n){if(t=n.map,e=t.id,n.enabled&&(t.isDefine||l.push(n),!n.error))if(!n.inited&&a)r(e)?(o=!0,h=!0):(c.push(e),i(e));else if(!n.inited&&n.fetched&&t.isDefine&&(h=!0,!t.prefix))return d=!1}),a&&c.length)return n=makeError("timeout","Load timeout for modules: "+c,null,c),n.contextName=x.contextName,u(n);d&&each(l,function(t){f(t,{},{})}),a&&!o||!h||!isBrowser&&!isWebWorker||j||(j=setTimeout(function(){j=0,p()},50)),y=!1}}function d(t){hasProp(_,t[0])||a(s(t[0],null,!0)).init(t[1],t[2])}function m(t,e,n,i){t.detachEvent&&!isOpera?i&&t.detachEvent(i,e):t.removeEventListener(n,e,!1)}function g(t){var e=t.currentTarget||t.srcElement;return m(e,x.onScriptLoad,"load","onreadystatechange"),m(e,x.onScriptError,"error"),{node:e,id:e&&e.getAttribute("data-requiremodule")}}function v(){var t;for(l();T.length;){if(t=T.shift(),null===t[0])return u(makeError("mismatch","Mismatched anonymous define() module: "+t[t.length-1]));d(t)}}var y,b,x,w,j,C={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},shim:{},config:{}},E={},S={},k={},T=[],_={},A={},O=1,q=1;return w={require:function(t){return t.require?t.require:t.require=x.makeRequire(t.map)},exports:function(t){return t.usingExports=!0,t.map.isDefine?t.exports?t.exports:t.exports=_[t.map.id]={}:void 0},module:function(t){return t.module?t.module:t.module={id:t.map.id,uri:t.map.url,config:function(){var e,n=getOwn(C.pkgs,t.map.id);return e=n?getOwn(C.config,t.map.id+"/"+n.main):getOwn(C.config,t.map.id),e||{}},exports:_[t.map.id]}}},b=function(t){this.events=getOwn(k,t.id)||{},this.map=t,this.shim=getOwn(C.shim,t.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},b.prototype={init:function(t,e,n,i){i=i||{},this.inited||(this.factory=e,n?this.on("error",n):this.events.error&&(n=bind(this,function(t){this.emit("error",t)})),this.depMaps=t&&t.slice(0),this.errback=n,this.inited=!0,this.ignore=i.ignore,i.enabled||this.enabled?this.enable():this.check())},defineDep:function(t,e){this.depMatched[t]||(this.depMatched[t]=!0,this.depCount-=1,this.depExports[t]=e)},fetch:function(){if(!this.fetched){this.fetched=!0,x.startTime=(new Date).getTime();var t=this.map;return this.shim?(x.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],bind(this,function(){return t.prefix?this.callPlugin():this.load()})),void 0):t.prefix?this.callPlugin():this.load()}},load:function(){var t=this.map.url;A[t]||(A[t]=!0,x.load(this.map.id,t))},check:function(){if(this.enabled&&!this.enabling){var t,e,n=this.map.id,i=this.depExports,r=this.exports,o=this.factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){if(this.defining=!0,this.depCount<1&&!this.defined){if(isFunction(o)){if(this.events.error&&this.map.isDefine||req.onError!==defaultOnError)try{r=x.execCb(n,o,i,r)}catch(s){t=s}else r=x.execCb(n,o,i,r);if(this.map.isDefine&&(e=this.module,e&&void 0!==e.exports&&e.exports!==this.exports?r=e.exports:void 0===r&&this.usingExports&&(r=this.exports)),t)return t.requireMap=this.map,t.requireModules=this.map.isDefine?[this.map.id]:null,t.requireType=this.map.isDefine?"define":"require",u(this.error=t)}else r=o;this.exports=r,this.map.isDefine&&!this.ignore&&(_[n]=r,req.onResourceLoad&&req.onResourceLoad(x,this.map,this.depMaps)),h(n),this.defined=!0}this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else this.fetch()}},callPlugin:function(){var t=this.map,e=t.id,i=s(t.prefix);this.depMaps.push(i),c(i,"defined",bind(this,function(i){var r,o,l,f=this.map.name,p=this.map.parentMap?this.map.parentMap.name:null,d=x.makeRequire(t.parentMap,{enableBuildCallback:!0});return this.map.unnormalized?(i.normalize&&(f=i.normalize(f,function(t){return n(t,p,!0)})||""),o=s(t.prefix+"!"+f,this.map.parentMap),c(o,"defined",bind(this,function(t){this.init([],function(){return t},null,{enabled:!0,ignore:!0})})),l=getOwn(E,o.id),l&&(this.depMaps.push(o),this.events.error&&l.on("error",bind(this,function(t){this.emit("error",t)})),l.enable()),void 0):(r=bind(this,function(t){this.init([],function(){return t},null,{enabled:!0})}),r.error=bind(this,function(t){this.inited=!0,this.error=t,t.requireModules=[e],eachProp(E,function(t){0===t.map.id.indexOf(e+"_unnormalized")&&h(t.map.id)}),u(t)}),r.fromText=bind(this,function(n,i){var o=t.name,c=s(o),l=useInteractive;i&&(n=i),l&&(useInteractive=!1),a(c),hasProp(C.config,e)&&(C.config[o]=C.config[e]);try{req.exec(n)}catch(h){return u(makeError("fromtexteval","fromText eval for "+e+" failed: "+h,h,[e]))}l&&(useInteractive=!0),this.depMaps.push(c),x.completeLoad(o),d([o],r)}),i.load(t.name,d,r,C),void 0)})),x.enable(i,this),this.pluginMaps[i.id]=i},enable:function(){S[this.map.id]=this,this.enabled=!0,this.enabling=!0,each(this.depMaps,bind(this,function(t,e){var n,i,r;if("string"==typeof t){if(t=s(t,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[e]=t,r=getOwn(w,t.id))return this.depExports[e]=r(this),void 0;this.depCount+=1,c(t,"defined",bind(this,function(t){this.defineDep(e,t),this.check()})),this.errback&&c(t,"error",bind(this,this.errback))}n=t.id,i=E[n],hasProp(w,n)||!i||i.enabled||x.enable(t,this)})),eachProp(this.pluginMaps,bind(this,function(t){var e=getOwn(E,t.id);e&&!e.enabled&&x.enable(t,this)})),this.enabling=!1,this.check()},on:function(t,e){var n=this.events[t];n||(n=this.events[t]=[]),n.push(e)},emit:function(t,e){each(this.events[t],function(t){t(e)}),"error"===t&&delete this.events[t]}},x={config:C,contextName:t,registry:E,defined:_,urlFetched:A,defQueue:T,Module:b,makeModuleMap:s,nextTick:req.nextTick,onError:u,configure:function(t){t.baseUrl&&"/"!==t.baseUrl.charAt(t.baseUrl.length-1)&&(t.baseUrl+="/");var e=C.pkgs,n=C.shim,i={paths:!0,config:!0,map:!0};eachProp(t,function(t,e){i[e]?"map"===e?(C.map||(C.map={}),mixin(C[e],t,!0,!0)):mixin(C[e],t,!0):C[e]=t}),t.shim&&(eachProp(t.shim,function(t,e){isArray(t)&&(t={deps:t}),!t.exports&&!t.init||t.exportsFn||(t.exportsFn=x.makeShimExports(t)),n[e]=t}),C.shim=n),t.packages&&(each(t.packages,function(t){var n;t="string"==typeof t?{name:t}:t,n=t.location,e[t.name]={name:t.name,location:n||t.name,main:(t.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}}),C.pkgs=e),eachProp(E,function(t,e){t.inited||t.map.unnormalized||(t.map=s(e))}),(t.deps||t.callback)&&x.require(t.deps||[],t.callback)},makeShimExports:function(t){function e(){var e;return t.init&&(e=t.init.apply(global,arguments)),e||t.exports&&getGlobal(t.exports)}return e},makeRequire:function(e,i){function r(n,o,c){var l,h,f;return i.enableBuildCallback&&o&&isFunction(o)&&(o.__requireJsBuild=!0),"string"==typeof n?isFunction(o)?u(makeError("requireargs","Invalid require call"),c):e&&hasProp(w,n)?w[n](E[e.id]):req.get?req.get(x,n,e,r):(h=s(n,e,!1,!0),l=h.id,hasProp(_,l)?_[l]:u(makeError("notloaded",'Module name "'+l+'" has not been loaded yet for context: '+t+(e?"":". Use require([])")))):(v(),x.nextTick(function(){v(),f=a(s(null,e)),f.skipMap=i.skipMap,f.init(n,o,c,{enabled:!0}),p()}),r)}return i=i||{},mixin(r,{isBrowser:isBrowser,toUrl:function(t){var i,r=t.lastIndexOf("."),o=t.split("/")[0],s="."===o||".."===o;return-1!==r&&(!s||r>1)&&(i=t.substring(r,t.length),t=t.substring(0,r)),x.nameToUrl(n(t,e&&e.id,!0),i,!0)},defined:function(t){return hasProp(_,s(t,e,!1,!0).id)},specified:function(t){return t=s(t,e,!1,!0).id,hasProp(_,t)||hasProp(E,t)}}),e||(r.undef=function(t){l();var n=s(t,e,!0),i=getOwn(E,t);delete _[t],delete A[n.url],delete k[t],i&&(i.events.defined&&(k[t]=i.events),h(t))}),r},enable:function(t){var e=getOwn(E,t.id);e&&a(t).enable()},completeLoad:function(t){var e,n,i,o=getOwn(C.shim,t)||{},s=o.exports;for(l();T.length;){if(n=T.shift(),null===n[0]){if(n[0]=t,e)break;e=!0}else n[0]===t&&(e=!0);d(n)}if(i=getOwn(E,t),!e&&!hasProp(_,t)&&i&&!i.inited){if(!(!C.enforceDefine||s&&getGlobal(s)))return r(t)?void 0:u(makeError("nodefine","No define call for "+t,null,[t]));d([t,o.deps||[],o.exportsFn])}p()},nameToUrl:function(t,e,n){var i,r,o,s,a,c,u,l,h;if(req.jsExtRegExp.test(t))l=t+(e||"");else{for(i=C.paths,r=C.pkgs,a=t.split("/"),c=a.length;c>0;c-=1){if(u=a.slice(0,c).join("/"),o=getOwn(r,u),h=getOwn(i,u)){isArray(h)&&(h=h[0]),a.splice(0,c,h);break}if(o){s=t===o.name?o.location+"/"+o.main:o.location,a.splice(0,c,s);break}}l=a.join("/"),l+=e||(/\?/.test(l)||n?"":".js"),l=("/"===l.charAt(0)||l.match(/^[\w\+\.\-]+:/)?"":C.baseUrl)+l}return C.urlArgs?l+((-1===l.indexOf("?")?"?":"&")+C.urlArgs):l},load:function(t,e){req.load(x,t,e)},execCb:function(t,e,n,i){return e.apply(i,n)},onScriptLoad:function(t){if("load"===t.type||readyRegExp.test((t.currentTarget||t.srcElement).readyState)){interactiveScript=null;var e=g(t);x.completeLoad(e.id)}},onScriptError:function(t){var e=g(t);return r(e.id)?void 0:u(makeError("scripterror","Script error for: "+e.id,t,[e.id]))}},x.require=x.makeRequire(),x}function getInteractiveScript(){return interactiveScript&&"interactive"===interactiveScript.readyState?interactiveScript:(eachReverse(scripts(),function(t){return"interactive"===t.readyState?interactiveScript=t:void 0}),interactiveScript)}var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.1.8",commentRegExp=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,ap=Array.prototype,apsp=ap.splice,isBrowser=!("undefined"==typeof window||!navigator||!window.document),isWebWorker=!isBrowser&&"undefined"!=typeof importScripts,readyRegExp=isBrowser&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,defContextName="_",isOpera="undefined"!=typeof opera&&"[object Opera]"===opera.toString(),contexts={},cfg={},globalDefQueue=[],useInteractive=!1;if("undefined"==typeof define){if("undefined"!=typeof requirejs){if(isFunction(requirejs))return;cfg=requirejs,requirejs=void 0}"undefined"==typeof require||isFunction(require)||(cfg=require,require=void 0),req=requirejs=function(t,e,n,i){var r,o,s=defContextName;return isArray(t)||"string"==typeof t||(o=t,isArray(e)?(t=e,e=n,n=i):t=[]),o&&o.context&&(s=o.context),r=getOwn(contexts,s),r||(r=contexts[s]=req.s.newContext(s)),o&&r.configure(o),r.require(t,e,n)},req.config=function(t){return req(t)},req.nextTick="undefined"!=typeof setTimeout?function(t){setTimeout(t,4)}:function(t){t()},require||(require=req),req.version=version,req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},req({}),each(["toUrl","undef","defined","specified"],function(t){req[t]=function(){var e=contexts[defContextName];return e.require[t].apply(e,arguments)}}),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],baseElement=document.getElementsByTagName("base")[0],baseElement&&(head=s.head=baseElement.parentNode)),req.onError=defaultOnError,req.createNode=function(t){var e=t.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");return e.type=t.scriptType||"text/javascript",e.charset="utf-8",e.async=!0,e},req.load=function(t,e,n){var i,r=t&&t.config||{};if(isBrowser)return i=req.createNode(r,e,n),i.setAttribute("data-requirecontext",t.contextName),i.setAttribute("data-requiremodule",e),!i.attachEvent||i.attachEvent.toString&&i.attachEvent.toString().indexOf("[native code")<0||isOpera?(i.addEventListener("load",t.onScriptLoad,!1),i.addEventListener("error",t.onScriptError,!1)):(useInteractive=!0,i.attachEvent("onreadystatechange",t.onScriptLoad)),i.src=n,currentlyAddingScript=i,baseElement?head.insertBefore(i,baseElement):head.appendChild(i),currentlyAddingScript=null,i;if(isWebWorker)try{importScripts(n),t.completeLoad(e)}catch(o){t.onError(makeError("importscripts","importScripts failed for "+e+" at "+n,o,[e]))}},isBrowser&&eachReverse(scripts(),function(t){return head||(head=t.parentNode),dataMain=t.getAttribute("data-main"),dataMain?(mainScript=dataMain,cfg.baseUrl||(src=mainScript.split("/"),mainScript=src.pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath),mainScript=mainScript.replace(jsSuffixRegExp,""),req.jsExtRegExp.test(mainScript)&&(mainScript=dataMain),cfg.deps=cfg.deps?cfg.deps.concat(mainScript):[mainScript],!0):void 0}),define=function(t,e,n){var i,r;"string"!=typeof t&&(n=e,e=t,t=null),isArray(e)||(n=e,e=null),!e&&isFunction(n)&&(e=[],n.length&&(n.toString().replace(commentRegExp,"").replace(cjsRequireRegExp,function(t,n){e.push(n)}),e=(1===n.length?["require"]:["require","exports","module"]).concat(e))),useInteractive&&(i=currentlyAddingScript||getInteractiveScript(),i&&(t||(t=i.getAttribute("data-requiremodule")),r=contexts[i.getAttribute("data-requirecontext")])),(r?r.defQueue:globalDefQueue).push([t,e,n])},define.amd={jQuery:!0},req.exec=function(text){return eval(text)},req(cfg)}}(this);