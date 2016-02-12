/*! Flight v1.1.4 | (c) Twitter, Inc. | MIT License */
!function(t,e){function n(){var t,e,n=Array.prototype.slice.call(arguments),r=[];"string"==typeof n[0]&&(t=n.shift()),a(n[0])&&(r=n.shift()),e=n.shift(),i[t]=[r,e]}function r(t){function e(e){var n=t.split("/"),r=e.split("/"),i=!1;for(n.pop();".."==r[0]&&n.length;)n.pop(),r.shift(),i=!0;return"."==r[0]&&(r.shift(),i=!0),i&&(r=n.concat(r)),r.join("/")}var n,a,u;return"undefined"==typeof o[t]&&(n=i[t],n&&(u=n[0],a=n[1],o[t]=a.apply(void 0,s(u,function(t){return r(e(t))})))),o[t]}var i={},o={},a=Array.isArray||function(t){return t.constructor==Array},s=Array.map||function(t,e,n){for(var r=0,i=t.length,o=[];i>r;r++)o.push(e.call(n,t[r]));return o};// ==========================================
// Copyright 2013 Twitter, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
n("lib/utils",[],function(){"use strict";var t=[],n=100,r={isDomObj:function(t){return!(!t.nodeType&&t!==window)},toArray:function(e,n){return t.slice.call(e,n)},merge:function(){for(// unpacking arguments by hand benchmarked faster
var t=arguments.length,n=0,r=new Array(t+1);t>n;n++)r[n+1]=arguments[n];//start with empty object so a copy is created
//jquery extend requires deep copy as first arg
return 0===t?{}:(r[0]={},r[r.length-1]===!0&&(r.pop(),r.unshift(!0)),e.extend.apply(void 0,r))},push:function(t,e,n){return t&&Object.keys(e||{}).forEach(function(r){if(t[r]&&n)throw new Error('utils.push attempted to overwrite "'+r+'" while running in protected mode');"object"==typeof t[r]&&"object"==typeof e[r]?// recurse
this.push(t[r],e[r]):// no protect, so extra wins
t[r]=e[r]},this),t},isEnumerable:function(t,e){return Object.keys(t).indexOf(e)>-1},compose:function(){var t=arguments;return function(){for(var e=arguments,n=t.length-1;n>=0;n--)e=[t[n].apply(this,e)];return e[0]}},uniqueArray:function(t){for(var e={},n=[],r=0,i=t.length;i>r;++r)e.hasOwnProperty(t[r])||(n.push(t[r]),e[t[r]]=1);return n},debounce:function(t,e,r){"number"!=typeof e&&(e=n);var i,o;return function(){var n=this,a=arguments,s=function(){i=null,r||(o=t.apply(n,a))},u=r&&!i;return clearTimeout(i),i=setTimeout(s,e),u&&(o=t.apply(n,a)),o}},throttle:function(t,e){"number"!=typeof e&&(e=n);var r,i,o,a,s,u,c=this.debounce(function(){s=a=!1},e);return function(){r=this,i=arguments;var n=function(){o=null,s&&(u=t.apply(r,i)),c()};return o||(o=setTimeout(n,e)),a?s=!0:(a=!0,u=t.apply(r,i)),c(),u}},countThen:function(t,e){return function(){return--t?void 0:e.apply(this,arguments)}},delegate:function(t){return function(n,r){var i,o=e(n.target);Object.keys(t).forEach(function(e){return!n.isPropagationStopped()&&(i=o.closest(e)).length?(r=r||{},r.el=i[0],t[e].apply(this,[n,r])):void 0},this)}},once:function(t){var e,n;return function(){return e?n:(e=!0,n=t.apply(this,arguments))}}};return r}),// ==========================================
// Copyright 2013 Twitter, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
n("lib/debug",[],function(){"use strict";// ==========================================
// Search object model
// ==========================================
function t(e,n,r){r=r||{};var i=r.obj||window,o=r.path||(i==window?"window":""),a=Object.keys(i);a.forEach(function(r){(p[e]||e)(n,i,r)&&console.log([o,".",r].join(""),"->",["(",typeof i[r],")"].join(""),i[r]),"[object Object]"==Object.prototype.toString.call(i[r])&&i[r]!=i&&-1==o.split(".").indexOf(r)&&t(e,n,{obj:i[r],path:[o,r].join(".")})})}function e(e,n,r,i){n&&typeof r!=n?console.error([r,"must be",n].join(" ")):t(e,r,i)}function n(t,n){e("name","string",t,n)}function r(t,n){e("nameContains","string",t,n)}function i(t,n){e("type","function",t,n)}function o(t,n){e("value",null,t,n)}function a(t,n){e("valueCoerced",null,t,n)}function s(e,n){t(e,null,n)}function u(){var t=[].slice.call(arguments);m.eventNames.length||(m.eventNames=g),m.actions=t.length?t:g,h()}function c(){var t=[].slice.call(arguments);m.actions.length||(m.actions=g),m.eventNames=t.length?t:g,h()}function l(){m.actions=[],m.eventNames=[],h()}function f(){m.actions=g,m.eventNames=g,h()}function h(){try{window.localStorage&&(localStorage.setItem("logFilter_eventNames",m.eventNames),localStorage.setItem("logFilter_actions",m.actions))}catch(t){}}function d(){var t,e;try{t=window.localStorage&&localStorage.getItem("logFilter_eventNames"),e=window.localStorage&&localStorage.getItem("logFilter_actions")}catch(n){return}t&&(m.eventNames=t),e&&(m.actions=e),// reconstitute arrays in place
Object.keys(m).forEach(function(t){var e=m[t];"string"==typeof e&&e!==g&&(m[t]=e?e.split(","):[])})}var p={name:function(t,e,n){return t==n},nameContains:function(t,e,n){return n.indexOf(t)>-1},type:function(t,e,n){return e[n]instanceof t},value:function(t,e,n){return e[n]===t},valueCoerced:function(t,e,n){return e[n]==t}},g="all",m={eventNames:[],actions:[]};return{enable:function(t){this.enabled=!!t,t&&window.console&&(console.info("Booting in DEBUG mode"),console.info("You can configure event logging with DEBUG.events.logAll()/logNone()/logByName()/logByAction()")),d(),window.DEBUG=this},find:{byName:n,byNameContains:r,byType:i,byValue:o,byValueCoerced:a,custom:s},events:{logFilter:m,logByAction:u,logByName:c,logAll:f,logNone:l}}}),// ==========================================
// Copyright 2013 Twitter, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
n("lib/compose",["./utils","./debug"],function(t,e){"use strict";function n(t,e){if(o){var n=Object.create(null);Object.keys(t).forEach(function(r){if(a.indexOf(r)<0){var i=Object.getOwnPropertyDescriptor(t,r);i.writable=e,n[r]=i}}),Object.defineProperties(t,n)}}function r(t,e,n){var r;return o&&t.hasOwnProperty(e)?(r=Object.getOwnPropertyDescriptor(t,e).writable,Object.defineProperty(t,e,{writable:!0}),n.call(t),void Object.defineProperty(t,e,{writable:r})):void n.call(t)}function i(t,e){t.mixedIn=t.hasOwnProperty("mixedIn")?t.mixedIn:[];for(var r=0;r<e.length;r++)-1==t.mixedIn.indexOf(e[r])&&(n(t,!1),e[r].call(t),t.mixedIn.push(e[r]));n(t,!0)}//enumerables are shims - getOwnPropertyDescriptor shim doesn't work
var o=e.enabled&&!t.isEnumerable(Object,"getOwnPropertyDescriptor"),a=["mixedIn"];if(o)//IE8 getOwnPropertyDescriptor is built-in but throws exeption on non DOM objects
try{Object.getOwnPropertyDescriptor(Object,"keys")}catch(s){o=!1}return{mixin:i,unlockProperty:r}}),// ==========================================
// Copyright 2013 Twitter, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
n("lib/advice",["./compose"],function(t){"use strict";var e={around:function(t,e){return function(){// unpacking arguments by hand benchmarked faster
var n=0,r=arguments.length,i=new Array(r+1);for(i[0]=t.bind(this);r>n;n++)i[n+1]=arguments[n];return e.apply(this,i)}},before:function(t,e){var n="function"==typeof e?e:e.obj[e.fnName];return function(){return n.apply(this,arguments),t.apply(this,arguments)}},after:function(t,e){var n="function"==typeof e?e:e.obj[e.fnName];return function(){var e=(t.unbound||t).apply(this,arguments);return n.apply(this,arguments),e}},withAdvice:function(){["before","after","around"].forEach(function(n){this[n]=function(r,i){t.unlockProperty(this,r,function(){return this[r]="function"==typeof this[r]?e[n](this[r],i):i,this[r]})}},this)}};return e}),// ==========================================
// Copyright 2013 Twitter, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
n("lib/registry",[],function(){"use strict";function t(t,e){var n,r,i,o=e.length;return"function"==typeof e[o-1]&&(o-=1,i=e[o]),"object"==typeof e[o-1]&&(o-=1),2==o?(n=e[0],r=e[1]):(n=t.node,r=e[0]),{element:n,type:r,callback:i}}function e(t,e){return t.element==e.element&&t.type==e.type&&(null==e.callback||t.callback==e.callback)}function n(){function n(t){this.component=t,this.attachedTo=[],this.instances={},this.addInstance=function(t){var e=new r(t);return this.instances[t.identity]=e,this.attachedTo.push(t.node),e},this.removeInstance=function(t){delete this.instances[t.identity];var e=this.attachedTo.indexOf(t.node);e>-1&&this.attachedTo.splice(e,1),Object.keys(this.instances).length||//if I hold no more instances remove me from registry
i.removeComponentInfo(this)},this.isAttachedTo=function(t){return this.attachedTo.indexOf(t)>-1}}function r(t){this.instance=t,this.events=[],this.addBind=function(t){this.events.push(t),i.events.push(t)},this.removeBind=function(t){for(var n,r=0;n=this.events[r];r++)e(n,t)&&this.events.splice(r,1)}}var i=this;(this.reset=function(){this.components=[],this.allInstances={},this.events=[]}).call(this),this.addInstance=function(t){var e=this.findComponentInfo(t);e||(e=new n(t.constructor),this.components.push(e));var r=e.addInstance(t);return this.allInstances[t.identity]=r,e},this.removeInstance=function(t){var e=(this.findInstanceInfo(t),this.findComponentInfo(t));e&&e.removeInstance(t),//remove from registry
delete this.allInstances[t.identity]},this.removeComponentInfo=function(t){var e=this.components.indexOf(t);e>-1&&this.components.splice(e,1)},this.findComponentInfo=function(t){for(var e,n=t.attachTo?t:t.constructor,r=0;e=this.components[r];r++)if(e.component===n)return e;return null},this.findInstanceInfo=function(t){return this.allInstances[t.identity]||null},this.getBoundEventNames=function(t){return this.findInstanceInfo(t).events.map(function(t){return t.type})},this.findInstanceInfoByNode=function(t){var e=[];return Object.keys(this.allInstances).forEach(function(n){var r=this.allInstances[n];r.instance.node===t&&e.push(r)},this),e},this.on=function(e){for(var n,r=i.findInstanceInfo(this),o=arguments.length,a=1,s=new Array(o-1);o>a;a++)s[a-1]=arguments[a];if(r){n=e.apply(null,s),n&&(s[s.length-1]=n);var u=t(this,s);r.addBind(u)}},this.off=function(){var n=t(this,arguments),r=i.findInstanceInfo(this);r&&r.removeBind(n);//remove from global event registry
for(var o,a=0;o=i.events[a];a++)e(o,n)&&i.events.splice(a,1)},// debug tools may want to add advice to trigger
i.trigger=function(){},this.teardown=function(){i.removeInstance(this)},this.withRegistration=function(){this.after("initialize",function(){i.addInstance(this)}),this.around("on",i.on),this.after("off",i.off),//debug tools may want to add advice to trigger
window.DEBUG&&DEBUG.enabled&&this.after("trigger",i.trigger),this.after("teardown",{obj:i,fnName:"teardown"})}}return new n}),// ==========================================
// Copyright 2013 Twitter, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
n("lib/base",["./utils","./registry","./debug"],function(t,n,r){"use strict";function i(t){t.events.slice().forEach(function(t){var e=[t.type];t.element&&e.unshift(t.element),"function"==typeof t.callback&&e.push(t.callback),this.off.apply(this,e)},t.instance)}function o(t,e){try{window.postMessage(e,"*")}catch(n){throw console.log("unserializable data for event",t,":",e),new Error(["The event",t,"on component",this.toString(),"was triggered with non-serializable data"].join(" "))}}function a(t){return function(n,r){e(n.target).trigger(t,r)}}function s(){// delegate trigger, bind and unbind to an element
// if $element not supplied, use component's node
// other arguments are passed on
// event can be either a string specifying the type
// of the event, or a hash specifying both the type
// and a default function to be called.
this.trigger=function(){var t,n,i,a,s,u=arguments.length-1,c=arguments[u];return"string"==typeof c||c&&c.defaultBehavior||(u--,i=c),1==u?(t=e(arguments[0]),a=arguments[1]):(t=this.$node,a=arguments[0]),a.defaultBehavior&&(s=a.defaultBehavior,a=e.Event(a.type)),n=a.type||a,r.enabled&&window.postMessage&&o.call(this,n,i),"object"==typeof this.attr.eventData&&(i=e.extend(!0,{},this.attr.eventData,i)),t.trigger(a||n,i),s&&!a.isDefaultPrevented()&&(this[s]||s).call(this),t},this.on=function(){var n,r,i,o,s=arguments.length-1,u=arguments[s];if(//delegate callback
o="object"==typeof u?t.delegate(this.resolveDelegateRules(u)):"string"==typeof u?a(u):u,2==s?(n=e(arguments[0]),r=arguments[1]):(n=this.$node,r=arguments[0]),"function"!=typeof o&&"object"!=typeof o)throw new Error('Unable to bind to "'+r+'" because the given callback is not a function or an object');// store every bound version of the callback
return i=o.bind(this),i.target=o,i.context=this,n.on(r,i),o.bound||(o.bound=[]),o.bound.push(i),i},this.off=function(){var t,n,r,i=arguments.length-1;if("function"==typeof arguments[i]&&(r=arguments[i],i-=1),1==i?(t=e(arguments[0]),n=arguments[1]):(t=this.$node,n=arguments[0]),r){//this callback may be the original function or a bound version
var o=r.target?r.target.bound:r.bound||[];//set callback to version bound against this instance
o&&o.some(function(t,e,n){return t.context&&this.identity==t.context.identity?(n.splice(e,1),r=t,!0):void 0},this)}return t.off(n,r)},this.resolveDelegateRules=function(t){var e={};return Object.keys(t).forEach(function(n){if(!(n in this.attr))throw new Error('Component "'+this.toString()+'" wants to listen on "'+n+'" but no such attribute was defined.');e[this.attr[n]]="string"==typeof t[n]?a(t[n]):t[n]},this),e},this.defaultAttrs=function(e){t.push(this.defaults,e,!0)||(this.defaults=e)},this.select=function(t){return this.$node.find(this.attr[t])},this.initialize=function(t,n){if(n||(n={}),//only assign identity if there isn't one (initialize can be called multiple times)
this.identity||(this.identity=u++),!t)throw new Error("Component needs a node");t.jquery?(this.node=t[0],this.$node=t):(this.node=t,this.$node=e(t));// merge defaults with supplied options
// put options in attr.__proto__ to avoid merge overhead
var r=Object.create(n);for(var i in this.defaults)n.hasOwnProperty(i)||(r[i]=this.defaults[i]);return this.attr=r,Object.keys(this.defaults||{}).forEach(function(t){if(null===this.defaults[t]&&null===this.attr[t])throw new Error('Required attribute "'+t+'" not specified in attachTo for component "'+this.toString()+'".')},this),this},this.teardown=function(){i(n.findInstanceInfo(this))}}// common mixin allocates basic functionality - used by all component prototypes
// callback context is bound to component
var u=0;return s}),// ==========================================
// Copyright 2013 Twitter, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
n("lib/logger",["./utils"],function(t){"use strict";function e(t){var e=t.tagName?t.tagName.toLowerCase():t.toString(),n=t.className?"."+t.className:"",r=e+n;return t.tagName?["'","'"].join(r):r}function n(t,n,r){if(window.DEBUG&&window.DEBUG.enabled){var o,a,s,u,c,l,f,h,d,p;"function"==typeof r[r.length-1]&&(u=r.pop(),u=u.unbound||u),1==r.length?(s=n.$node[0],a=r[0]):2!=r.length||"object"!=typeof r[1]||r[1].type?(//2+ args, first arg is elem
s=r[0],a=r[1],"trigger"==t&&(c=r[2])):(//2 args, first arg is not elem
s=n.$node[0],a=r[0],"trigger"==t&&(c=r[1])),o="object"==typeof a?a.type:a,l=DEBUG.events.logFilter,// no regex for you, actions...
h="all"==l.actions||l.actions.indexOf(t)>-1,// event name filter allow wildcards or regex...
f=function(t){return t.test?t:new RegExp("^"+t.replace(/\*/g,".*")+"$")},d="all"==l.eventNames||l.eventNames.some(function(t){return f(t).test(o)}),h&&d&&(p=[i[t],t,"["+o+"]"],c&&p.push(c),p.push(e(s)),p.push(n.constructor.describe.split(" ").slice(0,3).join(" ")),console.groupCollapsed&&"trigger"==t&&console.groupCollapsed(t,o),console.info.apply(console,p))}}function r(){this.before("trigger",function(){n("trigger",this,t.toArray(arguments))}),console.groupCollapsed&&this.after("trigger",function(){console.groupEnd()}),this.before("on",function(){n("on",this,t.toArray(arguments))}),this.before("off",function(){n("off",this,t.toArray(arguments))})}var i={on:"<-",trigger:"->",off:"x "};return r}),// ==========================================
// Copyright 2013 Twitter, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
n("lib/component",["./advice","./utils","./compose","./base","./registry","./logger","./debug"],function(t,n,r,i,o,a,s){"use strict";// teardown for all instances of this constructor
function u(){var t=o.findComponentInfo(this);t&&Object.keys(t.instances).forEach(function(e){var n=t.instances[e];// It's possible that a previous teardown caused another component to teardown,
// so we can't assume that the instances object is as it was.
n&&n.instance&&n.instance.teardown()})}function c(t){for(var r=arguments.length,i=new Array(r-1),a=1;r>a;a++)i[a-1]=arguments[a];if(!t)throw new Error("Component needs to be attachTo'd a jQuery object, native node or selector string");var s=n.merge.apply(n,i),u=o.findComponentInfo(this);e(t).each(function(t,e){u&&u.isAttachedTo(e)||(new this).initialize(e,s)}.bind(this))}function l(){//could be called from constructor or constructor.prototype
var t=this.mixedIn||this.prototype.mixedIn||[];return t.map(function(t){if(null==t.name){// function name property not supported by this browser, use regex
var e=t.toString().match(h);return e&&e[1]?e[1]:""}return"withBase"!=t.name?t.name:""}).filter(Boolean).join(", ")}// define the constructor for a custom component type
// takes an unlimited number of mixin functions as arguments
// typical api call with 3 mixins: define(timeline, withTweetCapability, withScrollCapability);
function f(){for(var e=arguments.length,n=new Array(e),h=0;e>h;h++)n[h]=arguments[h];var d=function(){};// 'options' is optional hash to be merged with 'defaults' in the component definition
// enables extension of existing "base" Components
// prepend common mixins to supplied list, then mixin all flavors
return d.toString=d.prototype.toString=l,s.enabled&&(d.describe=d.prototype.describe=d.toString()),d.attachTo=c,d.mixin=function(){var t=f(),e=Object.create(d.prototype);return e.mixedIn=[].concat(d.prototype.mixedIn),r.mixin(e,arguments),t.prototype=e,t.prototype.constructor=t,t},d.teardownAll=u,s.enabled&&n.unshift(a),n.unshift(i,t.withAdvice,o.withRegistration),r.mixin(d.prototype,n),d}var h=/function (.*?)\s?\(/;return f.teardownAll=function(){o.components.slice().forEach(function(t){t.component.teardownAll()}),o.reset()},f}),// ==========================================
// Copyright 2013 Twitter, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
n("lib/index",["./advice","./component","./compose","./logger","./registry","./utils"],function(t,e,n,r,i,o){"use strict";return{advice:t,component:e,compose:n,logger:r,registry:i,utils:o}}),t.flight=r("lib/index")}(this,jQuery),function(t,e){var n=t.GAZ||{};/**
   * Modify embedded tweets to hide the date and show a "promoted by" tag when
   * our WYSIWYG plugin has marked the tweet as "promoted".
   */
n.modifyTweets=function(){intervalHandle=setInterval(function(){var t=e(".g-tweet").not(".g-modified");0===t.length&&clearInterval(intervalHandle),t.each(function(){var t=e(this),r=t.find("iframe"),i=r.contents().find("blockquote.tweet").last(),o="",a="",s="",u="",c="",l="";// If this tweet has been embedded on a blog page or has
// been specifically set to not show a date, we mask the
// date by replacing it with 'View on Twitter'
(1!==t.parents(".node-type-blog").length||t.hasClass("g-mask-date"))&&(o=i.find(".dateline a"),o.text(Drupal.t("View on Twitter")),t.addClass("g-modified")),// If this tweet has been marked as promoted by a content editor,
// we prepend a promoted icon along with custom text
t.hasClass("g-promoted")&&(l=t.hasClass("g-promoted-purple")?"promoted-purple.png":"promoted.png",// Add the "promoted by" tagline
a=t.attr("data-promotedby-screenname"),a||(a=i.find(".header .p-nickname b").text()),s=t.attr("data-promotedby-fullname"),s||(s=i.find(".header .full-name .p-name")[0]?i.find(".header .full-name .p-name").text():i.find(".Tweet-authorName").text()),u=Drupal.t("Promoted by !fullName",{"!fullName":s}),c='<div class="context">',c+='<span class="metadata with-icn">',c+='<img class="gazebo-promoted-img" src="/sites/all/themes/gazebo/img/'+l+'" />',c+='<a href="https://twitter.com/'+n.hoganEscape(a)+'" class="js-action-profile-promoted js-user-profile-link js-promoted-badge">'+n.hoganEscape(u)+"</a>",c+="</span>",c+="</div>",i.find(".footer")[0]?(r.css("height",r.height()+15+"px"),i.find(".footer").prepend(c),i.find(".footer .js-action-profile-promoted").css("padding-left","5px")):(r.css("height",r.height()+22+"px"),i.find(".Tweet-metadata").prepend(c),i.find(".Tweet-metadata .js-action-profile-promoted").css("padding-left","5px")),t.addClass("g-modified"))})},3e3)},t.GAZ=n,jQuery(document).ready(function(){n.modifyTweets(),jQuery.receiveMessage&&jQuery.receiveMessage(function(t){jQuery("iframe.autosize").css({height:t.data})})})}(window,jQuery),function(t,e){/*
    scan for divs marked for truncating and add ellipses
    operates 'visually' i.e. determines what is in overflow:hidden vs showing and makes that the dividing line.

    lifted whole from The Product
    public/swift/app/utils/multiline_text_range.js
    public/swift/app/ui/multiline_ellipses.js

    modified for Gazebo use.
     */
var n=t.GAZ||{};// multiline_text_range
n.CHARS_REGEX=/([\uD800-\uDBFF][\uDC00-\uDFFF]|[\S\s])/g,n.WORD_BREAK_REGEX=/\s/,n.WORD_BREAKS_REGEX=/\s+/g,n.NEW_LINE_ONLY_REGEX=/^\n$/,n.MultilineTextRange=function(t){/*******************
         ***** HELPERS *****
         *******************/
function e(){var e=document.createRange(),n=t.contents(),r=t.contents().last()[0];return n.length>0&&(e.setStart(n[0],0),e.setEnd(r,a(r))),e}function r(t){return 3==t.nodeType||4==t.nodeType}function i(){for(var t=o(),e=null,n=null,r=null,i=null,a=0;a<t.length;a++){var s=t[a];(null===n||s.bottom>n)&&(n=s.bottom),(null===e||s.top<e)&&(e=s.top),(null===r||s.left<r)&&(r=s.left),(null===i||s.right>i)&&(i=s.right)}return{top:e,bottom:n,left:r,right:i,width:Math.abs(i-r),height:Math.abs(n-e)}}function o(){for(var t=h.getClientRects(),e=[],n=0;n<t.length;n++)e.push(t[n]);return e.filter(function(t){return t.width>0})}function a(t){return r(t)?t.nodeValue.length:t.childNodes.length}function s(){return t.width()-u()}function u(){var t=i(),e=o(),n=e[e.length-1];return 0==e.length?0:n.right-t.left}function c(t){var e=t.match(n.WORD_BREAKS_REGEX);if(null!==e){var r=e[e.length-1],i=t.lastIndexOf(r);return{startIndex:i,endIndex:i+r.length}}return null}function l(t){return!!t.match(n.WORD_BREAK_REGEX)}function f(t){return(t.match(n.CHARS_REGEX)||[]).length}var h=e();return this.shortenToVisibleContent=function(){for(var e=t.contents(),n=e.length-1;n>=0;n--){var i=e[n];if(r(i)){for(var o=i.nodeValue.length;o>=0;o--)if(h.setEnd(i,o),!this.hasOverflow())return}else if(h.setEnd(i,i.childNodes.length),!this.hasOverflow())return}},this.shortenToNearestWordBreak=function(t){var e=h.endContainer,i=t.maxCharsToRemove;// If any of the following conditions are true then we are already at a word break:
//    1. The last node is not a text node (e.g. a link)
//    2. The end offset of the range is at the end of a text node
//    3. The character after the end of the range is a word break.
// However, when the last node is just a new line then it should be _replaced_ with a ellipsis or else the
// ellipsis won't be visible. This can happen when emoji icons are vertically stacked.
if(r(e)&&(e.nodeValue.match(n.NEW_LINE_ONLY_REGEX)||h.endOffset!==e.nodeValue.length&&!l(e.nodeValue[h.endOffset]))){var o=e.nodeValue.slice(0,h.endOffset),a=c(o);null!==a&&(void 0!==i&&f(o.substring(a.endIndex))>i||h.setEnd(e,a.startIndex))}},this.ensureLastLineAvailableWidth=function(t){for(;s(h)<=t;){var e=h.endContainer;if(r(e)&&h.endOffset>1)h.setEnd(e,h.endOffset-1);else{var n=e.previousSibling;if(null===n)break;h.setEnd(n,a(n))}}},this.hasOverflow=function(){var e=i(),n=parseFloat(t.css("line-height"));return Math.round(e.height/n)>Math.round(t.height()/n)},this.toDocumentFragment=function(){return h.cloneContents()},this.setEnd=function(t,e){h.setEnd(t,e)},this},n.multilineEllipses=function(){return this.attr={unEllipsifiedTextClass:"js-ellipsis",unEllipsifiedTextSelector:".js-ellipsis",maxCharsRemoveEnsureEndOnWordBreak:5},this.addEllipses=function(){var t=jQuery(this.attr.unEllipsifiedTextSelector).filter(":visible");t.removeClass(this.attr.unEllipsifiedTextClass),t.each(this.addEllipsis.bind(this))},this.addEllipsis=function(t,n){var r=e(n),i=this.createRange(r);if(i.hasOverflow()){r.data("full-text",r.text()),i.shortenToVisibleContent(),i.ensureLastLineAvailableWidth(this.maxEllipsisWidth(r)),i.shortenToNearestWordBreak({maxCharsToRemove:this.attr.maxCharsRemoveEnsureEndOnWordBreak});var o=i.toDocumentFragment();o.appendChild(document.createTextNode("…")),r.html(o)}},this.maxEllipsisWidth=function(t){var e=parseInt(t.css("font-size"));return 2*e},this.createRange=function(t){return new n.MultilineTextRange(t)},this},t.GAZ=n,jQuery(document).ready(function(){var t=n.multilineEllipses();t.addEllipses()})}(window,jQuery),// Copyright 2009-2012 by contributors, MIT License
// vim: ts=4 sts=4 sw=4 expandtab
// Module systems magic dance
function(t){// RequireJS
"function"==typeof define?define(t):"function"==typeof YUI?YUI.add("es5-sham",t):t()}(function(){// ES5 15.2.3.6
// http://es5.github.com/#x15.2.3.6
// Patch for WebKit and IE8 standard mode
// Designed by hax <hax.github.com>
// related issue: https://github.com/kriskowal/es5-shim/issues#issue/5
// IE8 Reference:
//     http://msdn.microsoft.com/en-us/library/dd282900.aspx
//     http://msdn.microsoft.com/en-us/library/dd229916.aspx
// WebKit Bugs:
//     https://bugs.webkit.org/show_bug.cgi?id=36423
function t(t){try{return Object.defineProperty(t,"sentinel",{}),"sentinel"in t}catch(e){}}// ES5 15.2.3.3
// http://es5.github.com/#x15.2.3.3
if(// ES5 15.2.3.2
// http://es5.github.com/#x15.2.3.2
Object.getPrototypeOf||(// https://github.com/kriskowal/es5-shim/issues#issue/2
// http://ejohn.org/blog/objectgetprototypeof/
// recommended by fschaefer on github
Object.getPrototypeOf=function(t){return t.__proto__||(t.constructor?t.constructor.prototype:prototypeOfObject)}),!Object.getOwnPropertyDescriptor){var e="Object.getOwnPropertyDescriptor called on a non-object: ";Object.getOwnPropertyDescriptor=function(t,n){if("object"!=typeof t&&"function"!=typeof t||null===t)throw new TypeError(e+t);// If object does not owns property return undefined immediately.
if(owns(t,n)){// If object has a property then it's for sure both `enumerable` and
// `configurable`.
var r={enumerable:!0,configurable:!0};// If JS engine supports accessor properties then property may be a
// getter or setter.
if(supportsAccessors){// Unfortunately `__lookupGetter__` will return a getter even
// if object has own non getter property along with a same named
// inherited getter. To avoid misbehavior we temporary remove
// `__proto__` so that `__lookupGetter__` will return getter only
// if it's owned by an object.
var i=t.__proto__;t.__proto__=prototypeOfObject;var o=lookupGetter(t,n),a=lookupSetter(t,n);if(// Once we have getter and setter we can put values back.
t.__proto__=i,o||a)// If it was accessor property we're done and return here
// in order to avoid adding `value` to the descriptor.
return o&&(r.get=o),a&&(r.set=a),r}// If we got this far we know that object has an own property that is
// not an accessor so we set it as a value and return descriptor.
return r.value=t[n],r}}}// check whether defineProperty works if it's given. Otherwise,
// shim partially.
if(// ES5 15.2.3.4
// http://es5.github.com/#x15.2.3.4
Object.getOwnPropertyNames||(Object.getOwnPropertyNames=function(t){return Object.keys(t)}),// ES5 15.2.3.5
// http://es5.github.com/#x15.2.3.5
Object.create||(Object.create=function(t,e){var n;if(null===t)n={__proto__:null};else{if("object"!=typeof t)throw new TypeError("typeof prototype["+typeof t+"] != 'object'");var r=function(){};r.prototype=t,n=new r,// IE has no built-in implementation of `Object.getPrototypeOf`
// neither `__proto__`, but this manually setting `__proto__` will
// guarantee that `Object.getPrototypeOf` will work as expected with
// objects created using `Object.create`
n.__proto__=t}return void 0!==e&&Object.defineProperties(n,e),n}),Object.defineProperty){var n=t({}),r="undefined"==typeof document||t(document.createElement("div"));if(!n||!r)var i=Object.defineProperty}if(!Object.defineProperty||i){var o="Property description must be an object: ",a="Object.defineProperty called on non-object: ",s="getters & setters can not be defined on this javascript engine";Object.defineProperty=function(t,e,n){if("object"!=typeof t&&"function"!=typeof t||null===t)throw new TypeError(a+t);if("object"!=typeof n&&"function"!=typeof n||null===n)throw new TypeError(o+n);// make a valiant attempt to use the real defineProperty
// for I8's DOM elements.
if(i)try{return i.call(Object,t,e,n)}catch(r){}// If it's a data property.
if(owns(n,"value"))// fail silently if "writable", "enumerable", or "configurable"
// are requested but not supported
/*
            // alternate approach:
            if ( // can't implement these features; allow false but not true
                !(owns(descriptor, "writable") ? descriptor.writable : true) ||
                !(owns(descriptor, "enumerable") ? descriptor.enumerable : true) ||
                !(owns(descriptor, "configurable") ? descriptor.configurable : true)
            )
                throw new RangeError(
                    "This implementation of Object.defineProperty does not " +
                    "support configurable, enumerable, or writable."
                );
            */
if(supportsAccessors&&(lookupGetter(t,e)||lookupSetter(t,e))){// As accessors are supported only on engines implementing
// `__proto__` we can safely override `__proto__` while defining
// a property to make sure that we don't hit an inherited
// accessor.
var u=t.__proto__;t.__proto__=prototypeOfObject,// Deleting a property anyway since getter / setter may be
// defined on object itself.
delete t[e],t[e]=n.value,// Setting original `__proto__` back now.
t.__proto__=u}else t[e]=n.value;else{if(!supportsAccessors)throw new TypeError(s);// If we got that far then getters and setters can be defined !!
owns(n,"get")&&defineGetter(t,e,n.get),owns(n,"set")&&defineSetter(t,e,n.set)}return t}}// ES5 15.2.3.7
// http://es5.github.com/#x15.2.3.7
Object.defineProperties||(Object.defineProperties=function(t,e){for(var n in e)owns(e,n)&&"__proto__"!=n&&Object.defineProperty(t,n,e[n]);return t}),// ES5 15.2.3.8
// http://es5.github.com/#x15.2.3.8
Object.seal||(Object.seal=function(t){// this is misleading and breaks feature-detection, but
// allows "securable" code to "gracefully" degrade to working
// but insecure code.
return t}),// ES5 15.2.3.9
// http://es5.github.com/#x15.2.3.9
Object.freeze||(Object.freeze=function(t){// this is misleading and breaks feature-detection, but
// allows "securable" code to "gracefully" degrade to working
// but insecure code.
return t});// detect a Rhino bug and patch it
try{Object.freeze(function(){})}catch(u){Object.freeze=function(t){return function(e){return"function"==typeof e?e:t(e)}}(Object.freeze)}// ES5 15.2.3.10
// http://es5.github.com/#x15.2.3.10
Object.preventExtensions||(Object.preventExtensions=function(t){// this is misleading and breaks feature-detection, but
// allows "securable" code to "gracefully" degrade to working
// but insecure code.
return t}),// ES5 15.2.3.11
// http://es5.github.com/#x15.2.3.11
Object.isSealed||(Object.isSealed=function(){return!1}),// ES5 15.2.3.12
// http://es5.github.com/#x15.2.3.12
Object.isFrozen||(Object.isFrozen=function(){return!1}),// ES5 15.2.3.13
// http://es5.github.com/#x15.2.3.13
Object.isExtensible||(Object.isExtensible=function(t){// 1. If Type(O) is not Object throw a TypeError exception.
if(Object(t)!==t)throw new TypeError;for(// 2. Return the Boolean value of the [[Extensible]] internal property of O.
var e="";owns(t,e);)e+="?";t[e]=!0;var n=owns(t,e);return delete t[e],n})}),// Copyright 2009-2012 by contributors, MIT License
// vim: ts=4 sts=4 sw=4 expandtab
// Module systems magic dance
function(t){// RequireJS
"function"==typeof define?define(t):"function"==typeof YUI?YUI.add("es5",t):t()}(function(){/**
 * Brings an environment as close to ECMAScript 5 compliance
 * as is possible with the facilities of erstwhile engines.
 *
 * Annotated ES5: http://es5.github.com/ (specific links below)
 * ES5 Spec: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf
 * Required reading: http://javascriptweblog.wordpress.com/2011/12/05/extending-javascript-natives/
 */
//
// Function
// ========
//
// ES-5 15.3.4.5
// http://es5.github.com/#x15.3.4.5
Function.prototype.bind||(Function.prototype.bind=function(t){// .length is 1
// 1. Let Target be the this value.
var e=this;// 2. If IsCallable(Target) is false, throw a TypeError exception.
if("function"!=typeof e)throw new TypeError("Function.prototype.bind called on incompatible "+e);// 3. Let A be a new (possibly empty) internal list of all of the
//   argument values provided after thisArg (arg1, arg2 etc), in order.
// XXX slicedArgs will stand in for "A" if used
var n=u.call(arguments,1),r=function(){if(this instanceof r){// 15.3.4.5.2 [[Construct]]
// When the [[Construct]] internal method of a function object,
// F that was created using the bind function is called with a
// list of arguments ExtraArgs, the following steps are taken:
// 1. Let target be the value of F's [[TargetFunction]]
//   internal property.
// 2. If target has no [[Construct]] internal method, a
//   TypeError exception is thrown.
// 3. Let boundArgs be the value of F's [[BoundArgs]] internal
//   property.
// 4. Let args be a new list containing the same values as the
//   list boundArgs in the same order followed by the same
//   values as the list ExtraArgs in the same order.
// 5. Return the result of calling the [[Construct]] internal
//   method of target providing args as the arguments.
var i=function(){};i.prototype=e.prototype;var o=new i,a=e.apply(o,n.concat(u.call(arguments)));return Object(a)===a?a:o}// 15.3.4.5.1 [[Call]]
// When the [[Call]] internal method of a function object, F,
// which was created using the bind function is called with a
// this value and a list of arguments ExtraArgs, the following
// steps are taken:
// 1. Let boundArgs be the value of F's [[BoundArgs]] internal
//   property.
// 2. Let boundThis be the value of F's [[BoundThis]] internal
//   property.
// 3. Let target be the value of F's [[TargetFunction]] internal
//   property.
// 4. Let args be a new list containing the same values as the
//   list boundArgs in the same order followed by the same
//   values as the list ExtraArgs in the same order.
// 5. Return the result of calling the [[Call]] internal method
//   of target providing boundThis as the this value and
//   providing args as the arguments.
// equiv: target.call(this, ...boundArgs, ...args)
return e.apply(t,n.concat(u.call(arguments)))};// XXX bound.length is never writable, so don't even try
//
// 15. If the [[Class]] internal property of Target is "Function", then
//     a. Let L be the length property of Target minus the length of A.
//     b. Set the length own property of F to either 0 or L, whichever is
//       larger.
// 16. Else set the length own property of F to 0.
// 17. Set the attributes of the length own property of F to the values
//   specified in 15.3.5.1.
// TODO
// 18. Set the [[Extensible]] internal property of F to true.
// TODO
// 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
// 20. Call the [[DefineOwnProperty]] internal method of F with
//   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
//   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
//   false.
// 21. Call the [[DefineOwnProperty]] internal method of F with
//   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
//   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
//   and false.
// TODO
// NOTE Function objects created using Function.prototype.bind do not
// have a prototype property or the [[Code]], [[FormalParameters]], and
// [[Scope]] internal properties.
// XXX can't delete prototype in pure-js.
// 22. Return F.
return r});// Shortcut to an often accessed properties, in order to avoid multiple
// dereference that costs universally.
// _Please note: Shortcuts are defined after `Function.prototype.bind` as we
// us it in defining shortcuts.
var t,e,n,r,i,o=Function.prototype.call,a=Array.prototype,s=Object.prototype,u=a.slice,c=o.bind(s.toString),l=o.bind(s.hasOwnProperty);//
// Object
// ======
//
// ES5 15.2.3.14
// http://es5.github.com/#x15.2.3.14
if((i=l(s,"__defineGetter__"))&&(t=o.bind(s.__defineGetter__),e=o.bind(s.__defineSetter__),n=o.bind(s.__lookupGetter__),r=o.bind(s.__lookupSetter__)),//
// Array
// =====
//
// ES5 15.4.3.2
// http://es5.github.com/#x15.4.3.2
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
Array.isArray||(Array.isArray=function(t){return"[object Array]"==c(t)}),// The IsCallable() check in the Array functions
// has been replaced with a strict check on the
// internal class of the object to trap cases where
// the provided function was actually a regular
// expression literal, which in V8 and
// JavaScriptCore is a typeof "function".  Only in
// V8 are regular expression literals permitted as
// reduce parameters, so it is desirable in the
// general case for the shim to match the more
// strict and common behavior of rejecting regular
// expressions.
// ES5 15.4.4.18
// http://es5.github.com/#x15.4.4.18
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/forEach
Array.prototype.forEach||(Array.prototype.forEach=function(t){var e=w(this),n=arguments[1],r=-1,i=e.length>>>0;// If no callback function or if callback is not a callable function
if("[object Function]"!=c(t))throw new TypeError;for(;++r<i;)r in e&&// Invoke the callback function with call, passing arguments:
// context, property value, property key, thisArg object context
t.call(n,e[r],r,e)}),// ES5 15.4.4.19
// http://es5.github.com/#x15.4.4.19
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
Array.prototype.map||(Array.prototype.map=function(t){var e=w(this),n=e.length>>>0,r=Array(n),i=arguments[1];// If no callback function or if callback is not a callable function
if("[object Function]"!=c(t))throw new TypeError(t+" is not a function");for(var o=0;n>o;o++)o in e&&(r[o]=t.call(i,e[o],o,e));return r}),// ES5 15.4.4.20
// http://es5.github.com/#x15.4.4.20
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/filter
Array.prototype.filter||(Array.prototype.filter=function(t){var e,n=w(this),r=n.length>>>0,i=[],o=arguments[1];// If no callback function or if callback is not a callable function
if("[object Function]"!=c(t))throw new TypeError(t+" is not a function");for(var a=0;r>a;a++)a in n&&(e=n[a],t.call(o,e,a,n)&&i.push(e));return i}),// ES5 15.4.4.16
// http://es5.github.com/#x15.4.4.16
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
Array.prototype.every||(Array.prototype.every=function(t){var e=w(this),n=e.length>>>0,r=arguments[1];// If no callback function or if callback is not a callable function
if("[object Function]"!=c(t))throw new TypeError(t+" is not a function");for(var i=0;n>i;i++)if(i in e&&!t.call(r,e[i],i,e))return!1;return!0}),// ES5 15.4.4.17
// http://es5.github.com/#x15.4.4.17
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
Array.prototype.some||(Array.prototype.some=function(t){var e=w(this),n=e.length>>>0,r=arguments[1];// If no callback function or if callback is not a callable function
if("[object Function]"!=c(t))throw new TypeError(t+" is not a function");for(var i=0;n>i;i++)if(i in e&&t.call(r,e[i],i,e))return!0;return!1}),// ES5 15.4.4.21
// http://es5.github.com/#x15.4.4.21
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce
Array.prototype.reduce||(Array.prototype.reduce=function(t){var e=w(this),n=e.length>>>0;// If no callback function or if callback is not a callable function
if("[object Function]"!=c(t))throw new TypeError(t+" is not a function");// no value to return if no initial value and an empty array
if(!n&&1==arguments.length)throw new TypeError("reduce of empty array with no initial value");var r,i=0;if(arguments.length>=2)r=arguments[1];else for(;;){if(i in e){r=e[i++];break}// if array contains no values, no initial value to return
if(++i>=n)throw new TypeError("reduce of empty array with no initial value")}for(;n>i;i++)i in e&&(r=t.call(void 0,r,e[i],i,e));return r}),// ES5 15.4.4.22
// http://es5.github.com/#x15.4.4.22
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduceRight
Array.prototype.reduceRight||(Array.prototype.reduceRight=function(t){var e=w(this),n=e.length>>>0;// If no callback function or if callback is not a callable function
if("[object Function]"!=c(t))throw new TypeError(t+" is not a function");// no value to return if no initial value, empty array
if(!n&&1==arguments.length)throw new TypeError("reduceRight of empty array with no initial value");var r,i=n-1;if(arguments.length>=2)r=arguments[1];else for(;;){if(i in e){r=e[i--];break}// if array contains no values, no initial value to return
if(--i<0)throw new TypeError("reduceRight of empty array with no initial value")}do i in this&&(r=t.call(void 0,r,e[i],i,e));while(i--);return r}),// ES5 15.4.4.14
// http://es5.github.com/#x15.4.4.14
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
Array.prototype.indexOf||(Array.prototype.indexOf=function(t){var e=w(this),n=e.length>>>0;if(!n)return-1;var r=0;for(arguments.length>1&&(r=y(arguments[1])),// handle negative indices
r=r>=0?r:Math.max(0,n+r);n>r;r++)if(r in e&&e[r]===t)return r;return-1}),// ES5 15.4.4.15
// http://es5.github.com/#x15.4.4.15
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf
Array.prototype.lastIndexOf||(Array.prototype.lastIndexOf=function(t){var e=w(this),n=e.length>>>0;if(!n)return-1;var r=n-1;for(arguments.length>1&&(r=Math.min(r,y(arguments[1]))),// handle negative indices
r=r>=0?r:n-Math.abs(r);r>=0;r--)if(r in e&&t===e[r])return r;return-1}),!Object.keys){// http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
var f=!0,h=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],d=h.length;for(var p in{toString:null})f=!1;Object.keys=function E(t){if("object"!=typeof t&&"function"!=typeof t||null===t)throw new TypeError("Object.keys called on a non-object");var E=[];for(var e in t)l(t,e)&&E.push(e);if(f)for(var n=0,r=d;r>n;n++){var i=h[n];l(t,i)&&E.push(i)}return E}}//
// Date
// ====
//
// ES5 15.9.5.43
// http://es5.github.com/#x15.9.5.43
// This function returns a String value represent the instance in time
// represented by this Date object. The format of the String is the Date Time
// string format defined in 15.9.1.15. All fields are present in the String.
// The time zone is always UTC, denoted by the suffix Z. If the time value of
// this object is not a finite Number a RangeError exception is thrown.
Date.prototype.toISOString&&-1!==new Date(-621987552e5).toISOString().indexOf("-000001")||(Date.prototype.toISOString=function(){var t,e,n,r;if(!isFinite(this))throw new RangeError("Date.prototype.toISOString called on non-finite value.");for(// the date time string format is specified in 15.9.1.15.
t=[this.getUTCMonth()+1,this.getUTCDate(),this.getUTCHours(),this.getUTCMinutes(),this.getUTCSeconds()],r=this.getUTCFullYear(),r=(0>r?"-":r>9999?"+":"")+("00000"+Math.abs(r)).slice(r>=0&&9999>=r?-4:-6),e=t.length;e--;)n=t[e],// pad months, days, hours, minutes, and seconds to have two digits.
10>n&&(t[e]="0"+n);// pad milliseconds to have three digits.
return r+"-"+t.slice(0,2).join("-")+"T"+t.slice(2).join(":")+"."+("000"+this.getUTCMilliseconds()).slice(-3)+"Z"}),// ES5 15.9.4.4
// http://es5.github.com/#x15.9.4.4
Date.now||(Date.now=function(){return(new Date).getTime()}),// ES5 15.9.5.44
// http://es5.github.com/#x15.9.5.44
// This function provides a String representation of a Date object for use by
// JSON.stringify (15.12.3).
Date.prototype.toJSON||(Date.prototype.toJSON=function(){// When the toJSON method is called with argument key, the following
// steps are taken:
// 1.  Let O be the result of calling ToObject, giving it the this
// value as its argument.
// 2. Let tv be ToPrimitive(O, hint Number).
// 3. If tv is a Number and is not finite, return null.
// XXX
// 4. Let toISO be the result of calling the [[Get]] internal method of
// O with argument "toISOString".
// 5. If IsCallable(toISO) is false, throw a TypeError exception.
if("function"!=typeof this.toISOString)throw new TypeError("toISOString property is not callable");// 6. Return the result of calling the [[Call]] internal method of
//  toISO with O as the this value and an empty argument list.
return this.toISOString()}),// ES5 15.9.4.2
// http://es5.github.com/#x15.9.4.2
// based on work shared by Daniel Friesen (dantman)
// http://gist.github.com/303249
Date.parse&&864e13===Date.parse("+275760-09-13T00:00:00.000Z")||(// XXX global assignment won't work in embeddings that use
// an alternate object for the context.
Date=function(t){// Date.length === 7
var e=function i(e,n,r,o,a,s,u){var c=arguments.length;if(this instanceof t){var l=1==c&&String(e)===e?// isString(Y)
// We explicitly pass it through parse:
new t(i.parse(e)):// We have to manually make calls depending on argument
// length here
c>=7?new t(e,n,r,o,a,s,u):c>=6?new t(e,n,r,o,a,s):c>=5?new t(e,n,r,o,a):c>=4?new t(e,n,r,o):c>=3?new t(e,n,r):c>=2?new t(e,n):c>=1?new t(e):new t;// Prevent mixups with unfixed Date object
return l.constructor=i,l}return t.apply(this,arguments)},n=new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:\\.(\\d{3}))?)?(?:Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$");// Copy any custom methods a 3rd party library may have added
for(var r in t)e[r]=t[r];// Copy "native" methods explicitly; they may be non-enumerable
// Upgrade Date.parse to handle simplified ISO 8601 strings
return e.now=t.now,e.UTC=t.UTC,e.prototype=t.prototype,e.prototype.constructor=e,e.parse=function(e){var r=n.exec(e);if(r){r.shift();// kill match[0], the full match
// parse months, days, hours, minutes, seconds, and milliseconds
for(var i=1;7>i;i++)// provide default values if necessary
r[i]=+(r[i]||(3>i?1:0)),// match[1] is the month. Months are 0-11 in JavaScript
// `Date` objects, but 1-12 in ISO notation, so we
// decrement.
1==i&&r[i]--;// parse the UTC offset component
var o=+r.pop(),a=+r.pop(),s=r.pop(),u=0;if(s){// detect invalid offsets and return early
if(a>23||o>59)return 0/0;// express the provided time zone offset in minutes. The offset is
// negative for time zones west of UTC; positive otherwise.
u=6e4*(60*a+o)*("+"==s?-1:1)}// Date.UTC for years between 0 and 99 converts year to 1900 + year
// The Gregorian calendar has a 400-year cycle, so
// to Date.UTC(year + 400, .... ) - 12622780800000 == Date.UTC(year, ...),
// where 12622780800000 - number of milliseconds in Gregorian calendar 400 years
var c=+r[0];return c>=0&&99>=c?(r[0]=c+400,t.UTC.apply(this,r)+u-126227808e5):t.UTC.apply(this,r)+u}return t.parse.apply(this,arguments)},e}(Date));//
// String
// ======
//
// ES5 15.5.4.20
// http://es5.github.com/#x15.5.4.20
var g="	\n\f\r   ᠎             　\u2028\u2029﻿";if(!String.prototype.trim||g.trim()){// http://blog.stevenlevithan.com/archives/faster-trim-javascript
// http://perfectionkills.com/whitespace-deviations/
g="["+g+"]";var m=new RegExp("^"+g+g+"*"),v=new RegExp(g+g+"*$");String.prototype.trim=function(){if(void 0===this||null===this)throw new TypeError("can't convert "+this+" to object");return String(this).replace(m,"").replace(v,"")}}//
// Util
// ======
//
// ES5 9.4
// http://es5.github.com/#x9.4
// http://jsperf.com/to-integer
var y=function(t){// isNaN
return t=+t,t!==t?t=0:0!==t&&t!==1/0&&t!==-(1/0)&&(t=(t>0||-1)*Math.floor(Math.abs(t))),t},b="a"!="a"[0],w=function(t){if(null==t)// this matches both null and undefined
throw new TypeError("can't convert "+t+" to object");// If the implementation doesn't support by-index access of
// string characters (ex. IE < 9), split the string
// If the implementation doesn't support by-index access of
// string characters (ex. IE < 9), split the string
return b&&"string"==typeof t&&t?t.split(""):Object(t)}}),function(t,e){/*--------------------------------------------------------------------------*/
/**
   * Creates a style sheet with the given CSS text and adds it to the document.
   * @private
   * @param {Document} ownerDocument The document.
   * @param {String} cssText The CSS text.
   * @returns {StyleSheet} The style element.
   */
function n(t,e){var n=t.createElement("p"),r=t.getElementsByTagName("head")[0]||t.documentElement;return n.innerHTML="x<style>"+e+"</style>",r.insertBefore(n.lastChild,r.firstChild)}/**
   * Returns the value of `html5.elements` as an array.
   * @private
   * @returns {Array} An array of shived element node names.
   */
function r(){var t=y.elements;return"string"==typeof t?t.split(" "):t}/**
   * Returns the data associated to the given document
   * @private
   * @param {Document} ownerDocument The document.
   * @returns {Object} An object of data.
   */
function i(t){var e=v[t[g]];return e||(e={},m++,t[g]=m,v[m]=e),e}/**
   * returns a shived element for the given nodeName and document
   * @memberOf html5
   * @param {String} nodeName name of the element
   * @param {Document} ownerDocument The context document.
   * @returns {Object} The shived element.
   */
function o(t,n,r){if(n||(n=e),l)return n.createElement(t);r||(r=i(n));var o;// Avoid adding some elements to fragments in IE < 9 because
// * Attributes like `name` or `type` cannot be set/changed once an element
//   is inserted into a document/fragment
// * Link elements with `src` attributes that are inaccessible, as with
//   a 403 response, will cause the tab/window to crash
// * Script elements appended to fragments will execute when their `src`
//   or `text` property is set
return o=r.cache[t]?r.cache[t].cloneNode():p.test(t)?(r.cache[t]=r.createElem(t)).cloneNode():r.createElem(t),!o.canHaveChildren||d.test(t)||o.tagUrn?o:r.frag.appendChild(o)}/**
   * returns a shived DocumentFragment for the given document
   * @memberOf html5
   * @param {Document} ownerDocument The context document.
   * @returns {Object} The shived DocumentFragment.
   */
function a(t,n){if(t||(t=e),l)return t.createDocumentFragment();n=n||i(t);for(var o=n.frag.cloneNode(),a=0,s=r(),u=s.length;u>a;a++)o.createElement(s[a]);return o}/**
   * Shivs the `createElement` and `createDocumentFragment` methods of the document.
   * @private
   * @param {Document|DocumentFragment} ownerDocument The document.
   * @param {Object} data of the document.
   */
function s(t,e){e.cache||(e.cache={},e.createElem=t.createElement,e.createFrag=t.createDocumentFragment,e.frag=e.createFrag()),t.createElement=function(n){//abort shiv
//abort shiv
return y.shivMethods?o(n,t,e):e.createElem(n)},t.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+// unroll the `createElement` calls
r().join().replace(/[\w\-:]+/g,function(t){return e.createElem(t),e.frag.createElement(t),'c("'+t+'")'})+");return n}")(y,e.frag)}/*--------------------------------------------------------------------------*/
/**
   * Shivs the given document.
   * @memberOf html5
   * @param {Document} ownerDocument The document to shiv.
   * @returns {Document} The shived document.
   */
function u(t){t||(t=e);var r=i(t);// corrects block display not defined in IE6/7/8/9
return!y.shivCSS||c||r.hasCSS||(r.hasCSS=!!n(t,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),l||s(t,r),t}/*jshint evil:true */
/** version */
var c,l,f="3.7.1",h=t.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,p=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g="_html5shiv",m=0,v={};!function(){try{var t=e.createElement("a");t.innerHTML="<xyz></xyz>",//if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
c="hidden"in t,l=1==t.childNodes.length||function(){// assign a false positive if unable to shiv
e.createElement("a");var t=e.createDocumentFragment();return"undefined"==typeof t.cloneNode||"undefined"==typeof t.createDocumentFragment||"undefined"==typeof t.createElement}()}catch(n){// assign a false positive if detection fails => unable to shiv
c=!0,l=!0}}();/*--------------------------------------------------------------------------*/
/**
   * The `html5` object is exposed so that more elements can be shived and
   * existing shiving can be detected on iframes.
   * @type Object
   * @example
   *
   * // options can be changed before the script is included
   * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
   */
var y={/**
     * An array or space separated string of node names of the elements to shiv.
     * @memberOf html5
     * @type Array|String
     */
elements:h.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",/**
     * current version of html5shiv
     */
version:f,/**
     * A flag to indicate that the HTML5 style sheet should be inserted.
     * @memberOf html5
     * @type Boolean
     */
shivCSS:h.shivCSS!==!1,/**
     * Is equal to true if a browser supports creating unknown/HTML5 elements
     * @memberOf html5
     * @type boolean
     */
supportsUnknownElements:l,/**
     * A flag to indicate that the document's `createElement` and `createDocumentFragment`
     * methods should be overwritten.
     * @memberOf html5
     * @type Boolean
     */
shivMethods:h.shivMethods!==!1,/**
     * A string to describe the type of `html5` object ("default" or "default print").
     * @memberOf html5
     * @type String
     */
type:"default",// shivs the document according to the specified `html5` object options
shivDocument:u,//creates a shived element
createElement:o,//creates a shived documentFragment
createDocumentFragment:a};/*--------------------------------------------------------------------------*/
// expose html5
t.html5=y,// shiv the document
u(e)}(this,document),/*
 * The MIT License
 *
 * Copyright (c) 2012 James Allardice
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
// Defines the global Placeholders object along with various utility methods
function(t){"use strict";// Cross-browser DOM event binding
function e(t,e,n){return t.addEventListener?t.addEventListener(e,n,!1):t.attachEvent?t.attachEvent("on"+e,n):void 0}// Check whether an item is in an array (we don't use Array.prototype.indexOf so we don't clobber any existing polyfills - this is a really simple alternative)
function n(t,e){var n,r;for(n=0,r=t.length;r>n;n++)if(t[n]===e)return!0;return!1}// Move the caret to the index position specified. Assumes that the element has focus
function r(t,e){var n;t.createTextRange?(n=t.createTextRange(),n.move("character",e),n.select()):t.selectionStart&&(t.focus(),t.setSelectionRange(e,e))}// Attempt to change the type property of an input element
function i(t,e){try{return t.type=e,!0}catch(n){// You can't change input type in IE8 and below
return!1}}// Expose public methods
t.Placeholders={Utils:{addEventListener:e,inArray:n,moveCaret:r,changeType:i}}}(this),function(t){"use strict";// No-op (used in place of public methods when native support is detected)
function e(){}// Avoid IE9 activeElement of death when an iframe is used.
// More info:
// http://bugs.jquery.com/ticket/13393
// https://github.com/jquery/jquery/commit/85fc5878b3c6af73f42d61eedf73013e7faae408
function n(){try{return document.activeElement}catch(t){}}// Hide the placeholder value on a single element. Returns true if the placeholder was hidden and false if it was not (because it wasn't visible in the first place)
function r(t,e){var n,r,i=!!e&&t.value!==e,o=t.value===t.getAttribute(D);// Restore the maxlength value
// Old FF returns -1 if attribute not set (see GH-56)
// If the polyfill has changed the type of the element we need to change it back
return(i||o)&&"true"===t.getAttribute(L)?(t.removeAttribute(L),t.value=t.value.replace(t.getAttribute(D),""),t.className=t.className.replace(N,""),r=t.getAttribute(G),parseInt(r,10)>=0&&(t.setAttribute("maxLength",r),t.removeAttribute(G)),n=t.getAttribute(P),n&&(t.type=n),!0):!1}// Show the placeholder value on a single element. Returns true if the placeholder was shown and false if it was not (because it was already visible)
function i(t){var e,n,r=t.getAttribute(D);// Store and remove the maxlength value
// If the type of element needs to change, change it (e.g. password inputs)
return""===t.value&&r?(t.setAttribute(L,"true"),t.value=r,t.className+=" "+_,n=t.getAttribute(G),n||(t.setAttribute(G,t.maxLength),t.removeAttribute("maxLength")),e=t.getAttribute(P),e?t.type="text":"password"===t.type&&V.changeType(t,"text")&&t.setAttribute(P,"password"),!0):!1}function o(t,e){var n,r,i,o,a,s,u;// Check if the passed in node is an input/textarea (in which case it can't have any affected descendants)
if(t&&t.getAttribute(D))e(t);else// Run the callback for each element
for(// If an element was passed in, get all affected descendants. Otherwise, get all affected elements in document
i=t?t.getElementsByTagName("input"):g,o=t?t.getElementsByTagName("textarea"):m,n=i?i.length:0,r=o?o.length:0,u=0,s=n+r;s>u;u++)a=n>u?i[u]:o[u-n],e(a)}// Return all affected elements to their normal state (remove placeholder value if present)
function a(t){o(t,r)}// Show the placeholder value on all appropriate elements
function s(t){o(t,i)}// Returns a function that is used as a focus event handler
function u(t){return function(){// Only hide the placeholder value if the (default) hide-on-focus behaviour is enabled
v&&t.value===t.getAttribute(D)&&"true"===t.getAttribute(L)?// Move the caret to the start of the input (this mimics the behaviour of all browsers that do not hide the placeholder on focus)
V.moveCaret(t,0):// Remove the placeholder
r(t)}}// Returns a function that is used as a blur event handler
function c(t){return function(){i(t)}}// Functions that are used as a event handlers when the hide-on-input behaviour has been activated - very basic implementation of the "input" event
function l(t){return function(e){//Prevent the use of the arrow keys (try to keep the cursor before the placeholder)
//Prevent the use of the arrow keys (try to keep the cursor before the placeholder)
return b=t.value,"true"===t.getAttribute(L)&&b===t.getAttribute(D)&&V.inArray(T,e.keyCode)?(e.preventDefault&&e.preventDefault(),!1):void 0}}function f(t){return function(){r(t,b),// If the element is now empty we need to show the placeholder
""===t.value&&(t.blur(),V.moveCaret(t,0))}}function h(t){return function(){t===n()&&t.value===t.getAttribute(D)&&"true"===t.getAttribute(L)&&V.moveCaret(t,0)}}// Returns a function that is used as a submit event handler on form elements that have children affected by this polyfill
function d(t){return function(){// Turn off placeholders on all appropriate descendant elements
a(t)}}// Bind event handlers to an element that we need to affect with the polyfill
function p(t){// If the element is part of a form, make sure the placeholder string is not submitted as a value
t.form&&(O=t.form,// If the type of the property is a string then we have a "form" attribute and need to get the real form
"string"==typeof O&&(O=document.getElementById(O)),// Set a flag on the form so we know it's been handled (forms can contain multiple inputs)
O.getAttribute(B)||(V.addEventListener(O,"submit",d(O)),O.setAttribute(B,"true"))),// Bind event handlers to the element so we can hide/show the placeholder as appropriate
V.addEventListener(t,"focus",u(t)),V.addEventListener(t,"blur",c(t)),// If the placeholder should hide on input rather than on focus we need additional event handlers
v&&(V.addEventListener(t,"keydown",l(t)),V.addEventListener(t,"keyup",f(t)),V.addEventListener(t,"click",h(t))),// Remember that we've bound event handlers to this element
t.setAttribute(R,"true"),t.setAttribute(D,j),// If the element doesn't have a value and is not focussed, set it to the placeholder string
(v||t!==n())&&i(t)}var// These will hold references to all elements that can be affected. NodeList objects are live, so we only need to get those references once
g,m,v,y,b,w,E,j,C,O,x,I,A,S=["text","search","url","tel","email","password","number","textarea"],// The list of keycodes that are not allowed when the polyfill is configured to hide-on-input
T=[// The following keys all cause the caret to jump to the end of the input value
27,// Escape
33,// Page up
34,// Page down
35,// End
36,// Home
// Arrow keys allow you to move the caret manually, which should be prevented when the placeholder is visible
37,// Left
38,// Up
39,// Right
40,// Down
// The following keys allow you to modify the placeholder text by removing characters, which should be prevented when the placeholder is visible
8,// Backspace
46],// Styling variables
k="#ccc",_="placeholdersjs",N=new RegExp("(?:^|\\s)"+_+"(?!\\S)"),// The various data-* attributes used by the polyfill
D="data-placeholder-value",L="data-placeholder-active",P="data-placeholder-type",B="data-placeholder-submit",R="data-placeholder-bound",M="data-placeholder-focus",F="data-placeholder-live",G="data-placeholder-maxlength",// Various other variables used throughout the rest of the script
z=document.createElement("input"),U=document.getElementsByTagName("head")[0],W=document.documentElement,$=t.Placeholders,V=$.Utils;if($.nativeSupport=void 0!==z.placeholder,!$.nativeSupport){// Set up the placeholders
for(// Get references to all the input and textarea elements currently in the DOM (live NodeList objects to we only need to do this once)
g=document.getElementsByTagName("input"),m=document.getElementsByTagName("textarea"),// Get any settings declared as data-* attributes on the root element (currently the only options are whether to hide the placeholder on focus or input and whether to auto-update)
v="false"===W.getAttribute(M),y="false"!==W.getAttribute(F),// Create style element for placeholder styles (instead of directly setting style properties on elements - allows for better flexibility alongside user-defined styles)
w=document.createElement("style"),w.type="text/css",// Create style rules as text node
E=document.createTextNode("."+_+" { color:"+k+"; }"),// Append style rules to newly created stylesheet
w.styleSheet?w.styleSheet.cssText=E.nodeValue:w.appendChild(E),// Prepend new style element to the head (before any existing stylesheets, so user-defined rules take precedence)
U.insertBefore(w,U.firstChild),A=0,I=g.length+m.length;I>A;A++)x=A<g.length?g[A]:m[A-g.length],// Get the value of the placeholder attribute, if any. IE10 emulating IE7 fails with getAttribute, hence the use of the attributes node
j=x.attributes.placeholder,j&&(// IE returns an empty object instead of undefined if the attribute is not present
j=j.nodeValue,// Only apply the polyfill if this element is of a type that supports placeholders, and has a placeholder attribute with a non-empty value
j&&V.inArray(S,x.type)&&p(x));// If enabled, the polyfill will repeatedly check for changed/added elements and apply to those as well
C=setInterval(function(){for(A=0,I=g.length+m.length;I>A;A++)x=A<g.length?g[A]:m[A-g.length],// Only apply the polyfill if this element is of a type that supports placeholders, and has a placeholder attribute with a non-empty value
j=x.attributes.placeholder,j?(j=j.nodeValue,j&&V.inArray(S,x.type)&&(// If the element hasn't had event handlers bound to it then add them
x.getAttribute(R)||p(x),// If the placeholder value has changed or not been initialised yet we need to update the display
(j!==x.getAttribute(D)||"password"===x.type&&!x.getAttribute(P))&&(// Attempt to change the type of password inputs (fails in IE < 9)
"password"===x.type&&!x.getAttribute(P)&&V.changeType(x,"text")&&x.setAttribute(P,"password"),// If the placeholder value has changed and the placeholder is currently on display we need to change it
x.value===x.getAttribute(D)&&(x.value=j),// Keep a reference to the current placeholder value in case it changes via another script
x.setAttribute(D,j)))):x.getAttribute(L)&&(r(x),x.removeAttribute(D));// If live updates are not enabled cancel the timer
y||clearInterval(C)},100)}V.addEventListener(t,"beforeunload",function(){$.disable()}),// Expose public methods
$.disable=$.nativeSupport?e:a,$.enable=$.nativeSupport?e:s}(this),function(t){"use strict";var e=t.fn.val,n=t.fn.prop;Placeholders.nativeSupport||(t.fn.val=function(t){var n=e.apply(this,arguments),r=this.eq(0).data("placeholder-value");return void 0===t&&this.eq(0).data("placeholder-active")&&n===r?"":n},t.fn.prop=function(t,e){return void 0===e&&this.eq(0).data("placeholder-active")&&"value"===t?"":n.apply(this,arguments)})}(jQuery),function(t){"use strict";var e=flight.component(function(){this.defaultAttrs({columnToggleSelector:".PageLayout-column .PageLayout-column-collapseToggle",columnCollapsibleClass:"is-collapsible",columnCollapsedClass:"is-collapsed"}),/**
     * Whether the column is collapsible or not
     *
     * @param  object  $element  a jquery element of a layout column
     * @return boolean
     */
this.isColumnCollapsible=function(t){return t.hasClass(this.attr.columnCollapsibleClass)},/**
     * Whether the column is collapsed or not
     *
     * @param  object  $element  a jquery element of a layout column
     * @return boolean
     */
this.isColumnCollapsed=function(t){return t.hasClass(this.attr.columnCollapsedClass)},this.toggleColumn=function(e){var n,r,i=t(e.currentTarget).parent();n=this.isColumnCollapsible(i),r=this.isColumnCollapsed(i),// If not collapsible then do nothing
n&&(r?i.removeClass(this.attr.columnCollapsedClass):i.addClass(this.attr.columnCollapsedClass))},this.after("initialize",function(){this.on(this.attr.columnToggleSelector,"click",this.toggleColumn)})});t(document).ready(function(){e.attachTo(".PageLayout")})}(jQuery),function(t){"use strict";var e=flight.component(function(){this.defaultAttrs({loadMoreLinkSelector:".Button.Button--loadMore",paginationContainerSelector:".pagination",isLoadingClass:"is-loading",faSpin:"fa-spin"}),// Set up some properties to persist across invocations of the load() method.
this.nextLink=null,this.load=function(e){e.preventDefault();var n=this,r=t(e.currentTarget),i=r.find(".Button-loadMoreSpinner"),o=r.data("target"),a=r.data("result"),s=t(this.attr.paginationContainerSelector),u=null,c=null;null===n.nextLink&&(n.nextLink=s.find(".next a").attr("href")),r.addClass(this.attr.isLoadingClass),i.addClass(this.attr.faSpin+" "+this.attr.isLoadingClass),t.get(n.nextLink,function(e){u=t(e),c=u.find(a),n.nextLink=u.find(".pagination .next a").attr("href"),"undefined"==typeof n.nextLink&&// hide the link wrapper to remove extra margins
r.parent().hide(),t(o).append(c),r.removeClass(n.attr.isLoadingClass),i.removeClass(n.attr.faSpin+" "+n.attr.isLoadingClass)})},this.after("initialize",function(){var e=t(this.attr.paginationContainerSelector);return 0===e.length?!1:(e.hide(),void this.on(this.attr.loadMoreLinkSelector,"click",this.load))})});t(document).ready(function(){e.attachTo(".Pagination.Pagination--loadMore")}),window.LoadMore=e}(jQuery),function(t,e){var n=t.GAZ||{};/**
   * Turn vertically tabbed content inserted via WYSIWYG into actual tabbed content.
   */
n.verticalTabs=function(){var n="twitterVerticalTabs-label--active",r="twitterVerticalTabs-body--active",i=function(t,e){var n=e.height();t.css("min-height",n)},o=function(t){t.css("max-height","");var e=t.height();t.css("max-height",e)};e(".twitterVerticalTabs").each(function(a,s){var u=e(s).find(".twitterVerticalTabs-label"),c=e(s).find(".twitterVerticalTabs-body"),l=e(s).find("."+r),f=0;l.length>0&&// Because non-mobile sizes absolutely position the body, we need to calculate what height to put the container at.
i(e(s),l),u.click(function(){var a=u.index(e(this)),l=c.eq(a),h=e(s).find("."+n),d=e(s).find("."+r);e(this)!=h&&(// If we were waiting to recalc max-height, cancel.
t.clearTimeout(f),// Swap around what's active!
u.removeClass(n),d.css("max-height",""),c.removeClass(r),e(this).addClass(n),l.addClass(r),// While we're in here, set the max-height of the active tab body to the height (for better transitions).
f=t.setTimeout(function(){o(l)},1e3),// The transition is set to last 1 second.
i(e(s),l))}),e(t).resize(function(){l=e(s).find("."+r),i(e(s),l),o(l)})})},t.GAZ=n,jQuery(document).ready(function(){n.verticalTabs()})}(window,jQuery),/**
 * Javascript-Equal-Height-Responsive-Rows
 * https://github.com/Sam152/Javascript-Equal-Height-Responsive-Rows
 */
function(t,e){"use strict";/**
   * Set all elements within the collection to have the same height.
   */
e.fn.equalHeight=function(){var t=[];return e.each(this,function(n,r){var i,o=e(r),a="border-box"===o.css("box-sizing")||"border-box"===o.css("-moz-box-sizing");i=a?o.innerHeight():o.height(),t.push(i)}),this.css("height",Math.max.apply(window,t)+"px"),this},/**
   * Create a grid of equal height elements.
   */
e.fn.equalHeightGrid=function(t){var n=this.filter(":visible");n.css("height","auto");for(var r=0;r<n.length;r++)if(r%t===0){for(var i=e(n[r]),o=1;t>o;o++)i=i.add(n[r+o]);i.equalHeight()}return this},/**
   * Detect how many columns there are in a given layout.
   */
e.fn.detectGridColumns=function(){var t=0,n=0,r=this.filter(":visible");return r.each(function(r,i){var o=e(i).offset().top;return 0!==t&&o!==t?!1:(n++,void(t=o))}),n};/**
   * Ensure equal heights now, on ready, load and resize.
   */
var n=0;e.fn.responsiveEqualHeightGrid=function(){function t(){var t=r.detectGridColumns();r.equalHeightGrid(t)}var r=this,i=".grids_"+n;return r.data("grids-event-namespace",i),e(window).bind("resize"+i+" load"+i,t),t(),n++,this},/**
   * Unbind created events for a set of elements.
   */
e.fn.responsiveEqualHeightGridDestroy=function(){var t=this;return t.css("height","auto"),e(window).unbind(t.data("grids-event-namespace")),this},e(document).ready(function(){e(".Grid-cell .Vignette--image").responsiveEqualHeightGrid()})}(this,jQuery),function(t){"use strict";var e=flight.component(function(){this.goToItem=function(){var e=t(this.node).val();"undefined"!=typeof e&&"_none"!=e&&(this.$node.prop("disabled",!0),window.location.href=e)},this.after("initialize",function(){this.on("change",this.goToItem)})});t(document).ready(function(){e.attachTo(".SelectMenu")})}(jQuery),function(t,e){"use strict";// If we are on a mobile device, disable loading the videos in the hero, should they exist.
e(document).ready(function(){var n=e(".Hero--nodeExtended--video-video");n.length&&(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||e(t).width()>601)&&n.get(0).play()})}(window,jQuery),function(t){"use strict";var e=flight.component(function(){this.defaultAttrs({navigationSelector:".Navigation--global",menuItemWithChildrenSelector:".NavigationItem--withChildren",menuItemWithChildrenLinkSelector:".NavigationItem--withChildren > .NavigationItem-link",menuItemSubItemWithChildrenLinkSelector:".NavigationItem--sub.NavigationItem--withChildren > .NavigationItem-link",menuItemSubNavigationItemClass:"NavigationItem--sub",menuItemSubNavigationSelector:".Navigation--sub",isOpenClass:"is-open"}),/**
     * Once the component is loaded we make the last breadcrumb item slide from the left
     */
this.isLoaded=function(){this.$node.addClass("is-loaded")},/**
     * When clicking a sub menu item link in a desktop view
     */
this.onSubMenuItemLinkClick=function(t){t.preventDefault()},/**
     * When clicking on the link within a menu item
     */
this.onMenuItemLinkClick=function(e){e.preventDefault(),e.stopPropagation(),this.toggleMenuItemDisplay(t(e.currentTarget).parent())},/**
     * When clicking on the menu item <li></li>
     */
this.onMenuItemClick=function(e){this.toggleMenuItemDisplay(t(e.target))},/**
     * Show or hide the dropdown related to $element
     * (the dropdown is a child of $element)
     * This is design for mobile as we also manipulate the position and width
     * of the dropdown.
     */
this.toggleMenuItemDisplay=function(t){t.hasClass(this.attr.menuItemSubNavigationItemClass)||this.$node.find(this.attr.menuItemWithChildrenSelector).not(t).removeClass(this.attr.isOpenClass),t.hasClass(this.attr.isOpenClass)?t.removeClass(this.attr.isOpenClass):(// Full bleed + align to the very left of the nav
// Only the first sub menu and not the expanded menu
t.hasClass(this.attr.menuItemSubNavigationItemClass)||t.children(this.attr.menuItemSubNavigationSelector).css({left:-1*t.position().left+"px",width:this.$node.outerWidth()+"px"}),t.addClass(this.attr.isOpenClass))},/**
     * When clicking outside the nav the dropdowns should disappear
     */
this.exit=function(e){t(e.target).closest(this.attr.navigationSelector).length||this.$node.find(this.attr.menuItemWithChildrenSelector).removeClass(this.attr.isOpenClass)},this.after("initialize",function(){this.isLoaded(),// We use a z-index value to detect the size of the viewport
"1001"===this.$node.css("z-index")?(// If the menu item has a link
this.on(this.attr.menuItemWithChildrenLinkSelector,"click",this.onMenuItemLinkClick),// If the menu item doesn't have a link
this.on(this.attr.menuItemWithChildrenSelector,"click",this.onMenuItemClick),// Clicking outside the nav
this.on(t(document),"click",this.exit),// We use CSS for hover state so we need to make sure on mobile we don't have it
// and instead we add a class on click - this takes care of potential conflicts
// It basically helps debugging the mobile view on desktop.
this.$node.find(this.attr.menuItemWithChildrenSelector).attr("data-is-clickable","true")):(// On click on an expandable sub menu item then expand its sub menu
this.on(this.attr.menuItemSubItemWithChildrenLinkSelector,"click",this.onSubMenuItemLinkClick),// Elements don't expand on click
this.$node.find(this.attr.menuItemWithChildrenSelector).attr("data-is-clickable","false"))})});t(document).ready(function(){e.attachTo(".Navigation--global")})}(jQuery);;
