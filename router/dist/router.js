var n=function(n){return n.replace(/\/$/,"").replace(/^\//,"")};module.exports=function(t){var i=this;if(this.t=[],this.i=null,this.o=null,this.u=null,this.add=function(t,o){t="/"===t?"^/?$":new RegExp(n(t)+"$"),i.t.push({path:t,component:o})},this.s=function(n,t){var o=n(t),r=o.view,u=o.state;"function"==typeof o.then?(i.i&&i.u(i.o,i.i),o.then(function(n){var t=n.default();i.u(i.o,t.view,t.state)})):i.u(i.o,r,u)},this.listen=function(){var t,o=(t=window.location.href.match(/#!(.*)$/),n(t?t[1]:""));i.t.some(function(n){var t=n.component,r=o.match(n.path);return!!r&&(r.shift(),i.s(t,r),r)})},!t.mount)throw Error('[Router] "mount" point is missing');if(!t.render)throw Error('[Router] "render" func is missing');this.o=document.querySelector(t.mount),this.u=t.render,t.preloader&&(this.i=t.preloader),window.addEventListener("popstate",function(){return i.listen()})};
//# sourceMappingURL=router.js.map
