var n=function(n){return n.replace(/\/$/,"").replace(/^\//,"")};module.exports=function(t){var i=this;if(this.t=[],this.i=null,this.o=null,this.u=null,this.add=function(t,o){t="/"===t?"^/?$":new RegExp(n(t)+"$"),i.t.push({path:t,component:o})},this.s=function(n,t){"function"==typeof n().then?(i.i&&i.u(i.o,i.i),n().then(function(n){i.u(i.o,n.default,t)})):i.u(i.o,n,t)},this.listen=function(){var t,o=(t=window.location.href.match(/#!(.*)$/),n(t?t[1]:""));i.t.some(function(n){var t=n.component,r=o.match(n.path);return!!r&&(r.shift(),i.s(t,r),r)})},!t.mount)throw Error('[Router] "mount" point is missing');if(!t.render)throw Error('[Router] "render" func is missing');this.o=document.querySelector(t.mount),this.u=t.render,t.preloader&&(this.i=t.preloader),window.addEventListener("popstate",function(){return i.listen()})};
//# sourceMappingURL=router.js.map
