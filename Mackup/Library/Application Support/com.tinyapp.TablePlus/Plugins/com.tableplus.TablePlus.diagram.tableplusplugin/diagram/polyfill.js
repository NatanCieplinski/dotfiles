// https://raw.githubusercontent.com/w3c/IntersectionObserver/master/polyfill/intersection-observer.js
(function(){function n(a){try{return a.defaultView&&a.defaultView.frameElement||null}catch(b){return null}}function w(a){this.time=a.time;this.target=a.target;this.rootBounds=v(a.rootBounds);this.boundingClientRect=v(a.boundingClientRect);this.intersectionRect=v(a.intersectionRect||q());this.isIntersecting=!!a.intersectionRect;a=this.boundingClientRect;a=a.width*a.height;var b=this.intersectionRect;b=b.width*b.height;this.intersectionRatio=a?Number((b/a).toFixed(4)):this.isIntersecting?1:0}function f(a,
b){var c=b||{};if("function"!=typeof a)throw Error("callback must be a function");if(c.root&&1!=c.root.nodeType)throw Error("root must be an Element");this._checkForIntersections=C(this._checkForIntersections.bind(this),this.THROTTLE_TIMEOUT);this._callback=a;this._observationTargets=[];this._queuedEntries=[];this._rootMarginValues=this._parseRootMargin(c.rootMargin);this.thresholds=this._initThresholds(c.threshold);this.root=c.root||null;this.rootMargin=this._rootMarginValues.map(function(d){return d.value+
d.unit}).join(" ");this._monitoringDocuments=[];this._monitoringUnsubscribes=[]}function C(a,b){var c=null;return function(){c||(c=setTimeout(function(){a();c=null},b))}}function x(a,b,c,d){"function"==typeof a.addEventListener?a.addEventListener(b,c,d||!1):"function"==typeof a.attachEvent&&a.attachEvent("on"+b,c)}function y(a,b,c,d){"function"==typeof a.removeEventListener?a.removeEventListener(b,c,d||!1):"function"==typeof a.detatchEvent&&a.detatchEvent("on"+b,c)}function r(a){try{var b=a.getBoundingClientRect()}catch(c){}if(!b)return q();
b.width&&b.height||(b={top:b.top,right:b.right,bottom:b.bottom,left:b.left,width:b.right-b.left,height:b.bottom-b.top});return b}function q(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}}function v(a){return!a||"x"in a?a:{top:a.top,y:a.top,bottom:a.bottom,left:a.left,x:a.left,right:a.right,width:a.width,height:a.height}}function z(a,b){var c=b.top-a.top,d=b.left-a.left;return{top:c,left:d,height:b.height,width:b.width,bottom:c+b.height,right:d+b.width}}function A(a,b){for(var c=b;c;){if(c==
a)return!0;c=t(c)}return!1}function t(a){var b=a.parentNode;return 9==a.nodeType&&a!=k?n(a):b&&11==b.nodeType&&b.host?b.host:b&&b.assignedSlot?b.assignedSlot.parentNode:b}if("object"===typeof window)if("IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype)"isIntersecting"in window.IntersectionObserverEntry.prototype||Object.defineProperty(window.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return 0<
this.intersectionRatio}});else{var k=function(a){for(var b=n(a);b;)a=b.ownerDocument,b=n(a);return a}(window.document),p=[],l=null,m=null;f.prototype.THROTTLE_TIMEOUT=100;f.prototype.POLL_INTERVAL=null;f.prototype.USE_MUTATION_OBSERVER=!0;f._setupCrossOriginUpdater=function(){l||(l=function(a,b){m=a&&b?z(a,b):q();p.forEach(function(c){c._checkForIntersections()})});return l};f._resetCrossOriginUpdater=function(){m=l=null};f.prototype.observe=function(a){if(!this._observationTargets.some(function(b){return b.element==
a})){if(!a||1!=a.nodeType)throw Error("target must be an Element");this._registerInstance();this._observationTargets.push({element:a,entry:null});this._monitorIntersections(a.ownerDocument);this._checkForIntersections()}};f.prototype.unobserve=function(a){this._observationTargets=this._observationTargets.filter(function(b){return b.element!=a});this._unmonitorIntersections(a.ownerDocument);0==this._observationTargets.length&&this._unregisterInstance()};f.prototype.disconnect=function(){this._observationTargets=
[];this._unmonitorAllIntersections();this._unregisterInstance()};f.prototype.takeRecords=function(){var a=this._queuedEntries.slice();this._queuedEntries=[];return a};f.prototype._initThresholds=function(a){a=a||[0];Array.isArray(a)||(a=[a]);return a.sort().filter(function(b,c,d){if("number"!=typeof b||isNaN(b)||0>b||1<b)throw Error("threshold must be a number between 0 and 1 inclusively");return b!==d[c-1]})};f.prototype._parseRootMargin=function(a){a=(a||"0px").split(/\s+/).map(function(b){b=/^(-?\d*\.?\d+)(px|%)$/.exec(b);
if(!b)throw Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(b[1]),unit:b[2]}});a[1]=a[1]||a[0];a[2]=a[2]||a[0];a[3]=a[3]||a[1];return a};f.prototype._monitorIntersections=function(a){var b=a.defaultView;if(b&&-1==this._monitoringDocuments.indexOf(a)){var c=this._checkForIntersections,d=null,e=null;this.POLL_INTERVAL?d=b.setInterval(c,this.POLL_INTERVAL):(x(b,"resize",c,!0),x(a,"scroll",c,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in b&&(e=new b.MutationObserver(c),
e.observe(a,{attributes:!0,childList:!0,characterData:!0,subtree:!0})));this._monitoringDocuments.push(a);this._monitoringUnsubscribes.push(function(){var g=a.defaultView;g&&(d&&g.clearInterval(d),y(g,"resize",c,!0));y(a,"scroll",c,!0);e&&e.disconnect()});a!=(this.root&&this.root.ownerDocument||k)&&(b=n(a))&&this._monitorIntersections(b.ownerDocument)}};f.prototype._unmonitorIntersections=function(a){var b=this._monitoringDocuments.indexOf(a);if(-1!=b){var c=this.root&&this.root.ownerDocument||k;
if(!this._observationTargets.some(function(e){e=e.element.ownerDocument;if(e==a)return!0;for(;e&&e!=c;)if(e=(e=n(e))&&e.ownerDocument,e==a)return!0;return!1})){var d=this._monitoringUnsubscribes[b];this._monitoringDocuments.splice(b,1);this._monitoringUnsubscribes.splice(b,1);d();a!=c&&(b=n(a))&&this._unmonitorIntersections(b.ownerDocument)}}};f.prototype._unmonitorAllIntersections=function(){var a=this._monitoringUnsubscribes.slice(0);this._monitoringDocuments.length=0;for(var b=this._monitoringUnsubscribes.length=
0;b<a.length;b++)a[b]()};f.prototype._checkForIntersections=function(){if(this.root||!l||m){var a=this._rootIsInDom(),b=a?this._getRootRect():q();this._observationTargets.forEach(function(c){var d=c.element,e=r(d),g=this._rootContainsTarget(d),h=c.entry,u=a&&g&&this._computeTargetAndRootIntersection(d,e,b);c=c.entry=new w({time:window.performance&&performance.now&&performance.now(),target:d,boundingClientRect:e,rootBounds:l&&!this.root?null:b,intersectionRect:u});h?a&&g?this._hasCrossedThreshold(h,
c)&&this._queuedEntries.push(c):h&&h.isIntersecting&&this._queuedEntries.push(c):this._queuedEntries.push(c)},this);this._queuedEntries.length&&this._callback(this.takeRecords(),this)}};f.prototype._computeTargetAndRootIntersection=function(a,b,c){if("none"!=window.getComputedStyle(a).display){var d=b;b=t(a);for(a=!1;!a&&b;){var e=null,g=1==b.nodeType?window.getComputedStyle(b):{};if("none"==g.display)return null;if(b==this.root||9==b.nodeType)if(a=!0,b==this.root||b==k)l&&!this.root?!m||0==m.width&&
0==m.height?d=e=b=null:e=m:e=c;else{g=(b=t(b))&&r(b);var h=b&&this._computeTargetAndRootIntersection(b,g,c);g&&h?e=z(g,h):d=b=null}else h=b.ownerDocument,b!=h.body&&b!=h.documentElement&&"visible"!=g.overflow&&(e=r(b));if(e){g=Math.max(e.top,d.top);h=Math.min(e.bottom,d.bottom);var u=Math.max(e.left,d.left);d=Math.min(e.right,d.right);e=d-u;var B=h-g;d=0<=e&&0<=B&&{top:g,bottom:h,left:u,right:d,width:e,height:B}||null}if(!d)break;b=b&&t(b)}return d}};f.prototype._getRootRect=function(){if(this.root)var a=
r(this.root);else{a=k.documentElement;var b=k.body;a={top:0,left:0,right:a.clientWidth||b.clientWidth,width:a.clientWidth||b.clientWidth,bottom:a.clientHeight||b.clientHeight,height:a.clientHeight||b.clientHeight}}return this._expandRectByRootMargin(a)};f.prototype._expandRectByRootMargin=function(a){var b=this._rootMarginValues.map(function(c,d){return"px"==c.unit?c.value:c.value*(d%2?a.width:a.height)/100});b={top:a.top-b[0],right:a.right+b[1],bottom:a.bottom+b[2],left:a.left-b[3]};b.width=b.right-
b.left;b.height=b.bottom-b.top;return b};f.prototype._hasCrossedThreshold=function(a,b){var c=a&&a.isIntersecting?a.intersectionRatio||0:-1,d=b.isIntersecting?b.intersectionRatio||0:-1;if(c!==d)for(var e=0;e<this.thresholds.length;e++){var g=this.thresholds[e];if(g==c||g==d||g<c!==g<d)return!0}};f.prototype._rootIsInDom=function(){return!this.root||A(k,this.root)};f.prototype._rootContainsTarget=function(a){return A(this.root||k,a)&&(!this.root||this.root.ownerDocument==a.ownerDocument)};f.prototype._registerInstance=
function(){0>p.indexOf(this)&&p.push(this)};f.prototype._unregisterInstance=function(){var a=p.indexOf(this);-1!=a&&p.splice(a,1)};window.IntersectionObserver=f;window.IntersectionObserverEntry=w}})();

// https://polyfill.io/v3/polyfill.min.js?features=ResizeObserver&flags=always,gated
(function(self, undefined) {if (!("ResizeObserver"in self
)) {!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.ResizeObserver=e()}(this,function(){"use strict";function t(t,e){function n(){o&&(o=!1,t()),s&&i()}function r(){p(n)}function i(){var t=Date.now();if(o){if(t-c<l)return;s=!0}else o=!0,s=!1,setTimeout(r,e);c=t}var o=!1,s=!1,c=0;return i}function e(t){return parseFloat(t)||0}function n(t){for(var n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];return n.reduce(function(n,r){return n+e(t["border-"+r+"-width"])},0)}function r(t){for(var n=["top","right","bottom","left"],r={},i=0,o=n;i<o.length;i++){var s=o[i],c=t["padding-"+s];r[s]=e(c)}return r}function i(t){var e=t.getBBox();return u(0,0,e.width,e.height)}function o(t){var i=t.clientWidth,o=t.clientHeight;if(!i&&!o)return w;var c=g(t).getComputedStyle(t),a=r(c),h=a.left+a.right,f=a.top+a.bottom,d=e(c.width),p=e(c.height);if("border-box"===c.boxSizing&&(Math.round(d+h)!==i&&(d-=n(c,"left","right")+h),Math.round(p+f)!==o&&(p-=n(c,"top","bottom")+f)),!s(t)){var l=Math.round(d+h)-i,v=Math.round(p+f)-o;1!==Math.abs(l)&&(d-=l),1!==Math.abs(v)&&(p-=v)}return u(a.left,a.top,d,p)}function s(t){return t===g(t).document.documentElement}function c(t){return f?O(t)?i(t):o(t):w}function a(t){var e=t.x,n=t.y,r=t.width,i=t.height,o="undefined"!=typeof DOMRectReadOnly?DOMRectReadOnly:Object,s=Object.create(o.prototype);return y(s,{x:e,y:n,width:r,height:i,top:n,right:e+r,bottom:i+n,left:e}),s}function u(t,e,n,r){return{x:t,y:e,width:n,height:r}}var h=function(){function t(t,e){var n=-1;return t.some(function(t,r){return t[0]===e&&(n=r,!0)}),n}return"undefined"!=typeof Map?Map:function(){function e(){this.__entries__=[]}return Object.defineProperty(e.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),e.prototype.get=function(e){var n=t(this.__entries__,e),r=this.__entries__[n];return r&&r[1]},e.prototype.set=function(e,n){var r=t(this.__entries__,e);~r?this.__entries__[r][1]=n:this.__entries__.push([e,n])},e.prototype["delete"]=function(e){var n=this.__entries__,r=t(n,e);~r&&n.splice(r,1)},e.prototype.has=function(e){return!!~t(this.__entries__,e)},e.prototype.clear=function(){this.__entries__.splice(0)},e.prototype.forEach=function(t,e){void 0===e&&(e=null);for(var n=0,r=this.__entries__;n<r.length;n++){var i=r[n];t.call(e,i[1],i[0])}},e}()}(),f="undefined"!=typeof window&&"undefined"!=typeof document&&window.document===document,d=function(){return"undefined"!=typeof global&&global.Math===Math?global:"undefined"!=typeof self&&self.Math===Math?self:"undefined"!=typeof window&&window.Math===Math?window:Function("return this")()}(),p=function(){return"function"==typeof requestAnimationFrame?requestAnimationFrame.bind(d):function(t){return setTimeout(function(){return t(Date.now())},1e3/60)}}(),l=2,v=20,_=["top","right","bottom","left","width","height","size","weight"],b="undefined"!=typeof MutationObserver,m=function(){function e(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=t(this.refresh.bind(this),v)}return e.prototype.addObserver=function(t){~this.observers_.indexOf(t)||this.observers_.push(t),this.connected_||this.connect_()},e.prototype.removeObserver=function(t){var e=this.observers_,n=e.indexOf(t);~n&&e.splice(n,1),!e.length&&this.connected_&&this.disconnect_()},e.prototype.refresh=function(){this.updateObservers_()&&this.refresh()},e.prototype.updateObservers_=function(){var t=this.observers_.filter(function(t){return t.gatherActive(),t.hasActive()});return t.forEach(function(t){return t.broadcastActive()}),t.length>0},e.prototype.connect_=function(){f&&!this.connected_&&(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),b?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},e.prototype.disconnect_=function(){f&&this.connected_&&(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},e.prototype.onTransitionEnd_=function(t){var e=t.propertyName,n=void 0===e?"":e;_.some(function(t){return!!~n.indexOf(t)})&&this.refresh()},e.getInstance=function(){return this.instance_||(this.instance_=new e),this.instance_},e.instance_=null,e}(),y=function(t,e){for(var n=0,r=Object.keys(e);n<r.length;n++){var i=r[n];Object.defineProperty(t,i,{value:e[i],enumerable:!1,writable:!1,configurable:!0})}return t},g=function(t){return t&&t.ownerDocument&&t.ownerDocument.defaultView||d},w=u(0,0,0,0),O=function(){return"undefined"!=typeof SVGGraphicsElement?function(t){return t instanceof g(t).SVGGraphicsElement}:function(t){return t instanceof g(t).SVGElement&&"function"==typeof t.getBBox}}(),E=function(){function t(t){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=u(0,0,0,0),this.target=t}return t.prototype.isActive=function(){var t=c(this.target);return this.contentRect_=t,t.width!==this.broadcastWidth||t.height!==this.broadcastHeight},t.prototype.broadcastRect=function(){var t=this.contentRect_;return this.broadcastWidth=t.width,this.broadcastHeight=t.height,t},t}(),M=function(){function t(t,e){var n=a(e);y(this,{target:t,contentRect:n})}return t}(),A=function(){function t(t,e,n){if(this.activeObservations_=[],this.observations_=new h,"function"!=typeof t)throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=t,this.controller_=e,this.callbackCtx_=n}return t.prototype.observe=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof g(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var e=this.observations_;e.has(t)||(e.set(t,new E(t)),this.controller_.addObserver(this),this.controller_.refresh())}},t.prototype.unobserve=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof g(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var e=this.observations_;e.has(t)&&(e["delete"](t),e.size||this.controller_.removeObserver(this))}},t.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},t.prototype.gatherActive=function(){var t=this;this.clearActive(),this.observations_.forEach(function(e){e.isActive()&&t.activeObservations_.push(e)})},t.prototype.broadcastActive=function(){if(this.hasActive()){var t=this.callbackCtx_,e=this.activeObservations_.map(function(t){return new M(t.target,t.broadcastRect())});this.callback_.call(t,e,t),this.clearActive()}},t.prototype.clearActive=function(){this.activeObservations_.splice(0)},t.prototype.hasActive=function(){return this.activeObservations_.length>0},t}(),T="undefined"!=typeof WeakMap?new WeakMap:new h,x=function(){function t(e){if(!(this instanceof t))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var n=m.getInstance(),r=new A(e,n,this);T.set(this,r)}return t}();return["observe","unobserve","disconnect"].forEach(function(t){x.prototype[t]=function(){var e;return(e=T.get(this))[t].apply(e,arguments)}}),function(){return"undefined"!=typeof d.ResizeObserver?d.ResizeObserver:x}()});}})('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});