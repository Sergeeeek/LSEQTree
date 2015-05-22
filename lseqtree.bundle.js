require=function e(t,r,n){function i(l,f){if(!r[l]){if(!t[l]){var h=typeof require=="function"&&require;if(!f&&h)return h(l,!0);if(s)return s(l,!0);var o=new Error("Cannot find module '"+l+"'");throw o.code="MODULE_NOT_FOUND",o}var a=r[l]={exports:{}};t[l][0].call(a.exports,function(e){var r=t[l][1][e];return i(r?r:e)},a,a.exports,e,t,r,n)}return r[l].exports}var s=typeof require=="function"&&require;for(var l=0;l<n.length;l++)i(n[l]);return i}({1:[function(e,t,r){var n=e("BigInt");function i(e){var t=3;this._b=e||t}i.prototype.getBitBase=function(e){return this._b+e};i.prototype.getSumBit=function(e){var t=this.getBitBase(e),r=this._b-1;return t*(t+1)/2-r*(r+1)/2};i.prototype.getInterval=function(e,t,r){var n=0,i=0,s=false,l=true,f=0,h=0;while(i<=r){f=0;if(e!==null){f=e.t.p}h=0;if(t!==null){h=t.t.p}if(l&&f!==h){l=false;s=f>h}if(s){h=Math.pow(2,this.getBitBase(i))-1}if(l||s||i!==r){n+=h-f}else{n+=h-f-1}if(i!==r){n*=Math.pow(2,this.getBitBase(i+1))}if(e!==null&&e.children.length!==0){e=e.children[0]}else{e=null}if(t!==null&&t.children.length!==0){t=t.children[0]}else{t=null}++i}return n};i.instance=null;t.exports=function(e){if(e){i.instance=new i(e)}else{if(i.instance===null){i.instance=new i}}return i.instance}},{BigInt:7}],2:[function(e,t,r){var n=e("BigInt");var i=e("./base.js")();var s=e("./triple.js");var l=e("./lseqnode.js");function f(e,t,r){this._d=e;this._s=t;this._c=r}f.prototype.fromNode=function(e){var t=1,r=e,s=0;while(r.children.length!==0){++t;r=r.children[0]}this._d=n.int2bigInt(0,i.getSumBit(t-1));for(var s=0;s<t;++s){this._s.push(e.t.s);this._c.push(e.t.c);n.addInt_(this._d,e.t.p);if(s!==t-1){n.leftShift_(this._d,i.getBitBase(s+1))}e=e.children[0]}};f.prototype.toNode=function(){var e=[],t=i.getSumBit(this._c.length-1),r=0,f;for(var r=0;r<this._c.length;++r){f=n.dup(this._d);n.rightShift_(f,t-i.getSumBit(r));e.push(new s(n.modInt(f,Math.pow(2,i.getBitBase(r))),this._s[r],this._c[r]))}return new l(e,null)};f.prototype.compare=function(e){var t=i.getSumBit(this._c.length-1),r=i.getSumBit(e._c.length-1),s=true,l=0,f=0,h,o,a;while(s&&f<Math.min(this._c.length,e._c.length)){h=i.getSumBit(f);o=n.dup(this._d);n.rightShift_(o,t-h);a=n.dup(e._d);n.rightShift_(a,r-h);if(!n.equals(o,a)){if(n.greater(o,a)){l=1}else{l=-1}s=false}else{l=this._s[f]-e._s[f];if(l!==0){s=false}else{l=this._c[f]-e._c[f];if(l!==0){s=false}}}++f}if(l===0){l=this._c.length-e._c.length}return l};t.exports=f},{"./base.js":1,"./lseqnode.js":3,"./triple.js":5,BigInt:7}],3:[function(e,t,r){e("./util.js");function n(e,t){this.t=e.shift();if(e.length===0){this.e=t;this.subCounter=0;this.children=[]}else{this.e=null;this.subCounter=1;this.children=[];this.children.push(new n(e,t))}}n.prototype.add=function(e){var t=this.children.binaryIndexOf(e);if(t<0||this.children.length===0||t===0&&this.children.length>0&&this.children[0].compare(e)!==0){this.children.splice(-t,0,e);this.subCounter+=1}else{if(e.children.length===0){if(this.children[t].e!==null){return-1}else{this.children[t].e=e.e;this.subCounter+=1}}else{if(this.children[t].add(e.children[0])!==-1){this.subCounter+=1}}}};n.prototype.del=function(e){var t=this.getIndexes(e),r=this,n=0,i=false;if(t===-1){return-1}this.subCounter-=1;while(n<t.length&&!i){if(!(r.children[t[n]].e!==null&&n===t.length-1)){r.children[t[n]].subCounter-=1}if(r.children[t[n]].subCounter<=0&&(r.children[t[n]].e===null||r.children[t[n]].e!==null&&n===t.length-1)){r.children.splice(t[n],1);i=true}r=r.children[t[n]];++n}if(!i){r.e=null}};n.prototype.compare=function(e){return this.t.compare(e.t)};n.prototype.indexOf=function(e){var t=this.getIndexes(e),r=0,n=this,i=0;if(t===-1){return-1}if(this.e!==null){r+=1}for(var s=0;s<t.length;++s){if(t[s]-r<n.subCounter/2){for(var i=0;i<t[s];++i){if(n.children[i].e!==null){r+=1}r+=n.children[i].subCounter}}else{r+=n.subCounter;for(var i=n.children.length-1;i>=t[s];--i){if(n.children[i].e!==null){r-=1}r-=n.children[i].subCounter}i+=1}if(n.children[i].e!==null){r+=1}n=n.children[i]}return r-1};n.prototype.getIndexes=function(e){function t(e,r,n){var i=r.children.binaryIndexOf(n);if(i<0||i===0&&r.children.length===0){return-1}e.push(i);if(n.children.length===0||r.children.length===0){return e}return t(e,r.children[i],n.children[0])}return t([],this,e)};n.prototype.get=function(e){function t(r,i,s,l){var f=true,h,o=0,a,u;if(r===e&&l.e!==null){s.e=l.e;return i}if(l.e!==null){r+=1}f=e-r<l.subCounter/2;if(f){h=function(e,t){return e+t}}else{r+=l.subCounter;h=function(e,t){return e-t}}if(!f){o=l.children.length-1}while(f&&r<=e||!f&&r>e){if(l.children[o].e!==null){r=h(r,1)}r=h(r,l.children[o].subCounter);o=h(o,1)}o=h(o,-1);if(f){if(l.children[o].e!==null){r=h(r,-1)}r=h(r,-l.children[o].subCounter)}a=[];a.push(l.children[o].t);if(i===null){i=new n(a,null);s=i}else{u=new n(a,null);s.add(u);s=u}return t(r,i,s,l.children[o])}return t(0,null,null,this)};t.exports=n},{"./util.js":6}],4:[function(e,t,r){var n=e("BigInt");var i=e("./base.js")();var s=e("./identifier.js");function l(e){var t=10;this._boundary=e||t}l.prototype.bPlus=function(e,t,r,s,l,h){var o=e,a=t,u=Math.min(this._boundary,s),g=n.int2bigInt(0,i.getSumBit(r)),_;for(var c=0;c<=r;++c){_=0;if(e!==null){_=e.t.p}n.addInt_(g,_);if(c!==r){n.leftShift_(g,i.getBitBase(c+1))}if(e!==null&&e.children.length!==0){e=e.children[0]}else{e=null}}n.addInt_(g,Math.floor(Math.random()*u+1));return f(g,o,a,r,l,h)};l.prototype.bMinus=function(e,t,r,s,l,h){var o=e,a=t,u=Math.min(this._boundary,s),g=n.int2bigInt(0,i.getSumBit(r)),_=false,c=true,p,d;for(var m=0;m<=r;++m){p=0;if(e!==null){p=e.t.p}d=0;if(t!==null){d=t.t.p}if(c&&p!==d){c=false;_=p>d}if(_){d=Math.pow(2,i.getBitBase(m))-1}n.addInt_(g,d);if(m!==r){n.leftShift_(g,i.getBitBase(m+1))}if(t!==null&&t.children.length!==0){t=t.children[0]}else{t=null}if(e!==null&&e.children.length!==0){e=e.children[0]}else{e=null}}if(_){n.addInt_(g,-Math.floor(Math.random()*u))}else{n.addInt_(g,-Math.floor(Math.random()*u)-1)}return f(g,o,a,r,l,h)};function f(e,t,r,l,f,h){var o=[],a=[],u=0,g=i.getSumBit(l),_,c;while(u<=l){_=n.dup(e);n.rightShift_(_,g-i.getSumBit(u));c=n.modInt(_,Math.pow(2,i.getBitBase(u)));o[u]=f;a[u]=h;if(r!==null&&r.t.p===c){o[u]=r.t.s;a[u]=r.t.c}if(t!==null&&t.t.p===c){o[u]=t.t.s;a[u]=t.t.c}if(r!==null&&r.children.length!==0){r=r.children[0]}else{r=null}if(t!==null&&t.children.length!==0){t=t.children[0]}else{t=null}++u}return new s(e,o,a)}l.instance=null;t.exports=function(e){if(e){l.instance=new l(e)}else{if(l.instance===null){l.instance=new l}}return l.instance}},{"./base.js":1,"./identifier.js":2,BigInt:7}],5:[function(e,t,r){function n(e,t,r){this.p=e;this.s=t;this.c=r}n.prototype.compare=function(e){if(this.p<e.p){return-1}if(this.p>e.p){return 1}if(this.s<e.s){return-1}if(this.s>e.s){return 1}if(this.c<e.c){return-1}if(this.c>e.c){return 1}return 0};t.exports=n},{}],6:[function(e,t,r){function n(){Array.prototype.binaryIndexOf=function(e){var t=0;var r=this.length-1;var n;var i;while(t<=r){n=Math.floor((t+r)/2);i=this[n];if(i.compare(e)<0){t=n+1}else if(i.compare(e)>0){r=n-1}else{return n}}return~r}}t.exports=n()},{}],7:[function(e,r,n){(function(){bpe=0;mask=0;radix=mask+1;digitsStr="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_=!@#$%^&*()[]{}|;:,.<>/?`~ \\'\"+-";for(bpe=0;1<<bpe+1>1<<bpe;bpe++);bpe>>=1;mask=(1<<bpe)-1;radix=mask+1;one=N(1,1,1);t=new Array(0);ss=t;s0=t;s1=t;s2=t;s3=t;s4=t;s5=t;s6=t;s7=t;T=t;sa=t;mr_x1=t;mr_r=t;mr_a=t;eg_v=t;eg_u=t;eg_A=t;eg_B=t;eg_C=t;eg_D=t;md_q1=t;md_q2=t;md_q3=t;md_r=t;md_r1=t;md_r2=t;md_tt=t;primes=t;pows=t;s_i=t;s_i2=t;s_R=t;s_rm=t;s_q=t;s_n1=t;s_a=t;s_r2=t;s_n=t;s_b=t;s_d=t;s_x1=t;s_x2=t,s_aa=t;rpprb=t;function e(e){var t,r,n,i;r=new Array(e);for(t=0;t<e;t++)r[t]=0;r[0]=2;n=0;for(;r[n]<e;){for(t=r[n]*r[n];t<e;t+=r[n])r[t]=1;n++;r[n]=r[n-1]+1;for(;r[n]<e&&r[r[n]];r[n]++);}i=new Array(n);for(t=0;t<n;t++)i[t]=r[t];return i}function n(e,t){if(mr_x1.length!=e.length){mr_x1=V(e);mr_r=V(e);mr_a=V(e)}z(mr_a,t);return i(e,mr_a)}function i(e,t){var r,n,i,s;if(mr_x1.length!=e.length){mr_x1=V(e);mr_r=V(e);mr_a=V(e)}X(mr_a,t);X(mr_r,e);X(mr_x1,e);F(mr_r,-1);F(mr_x1,-1);i=0;for(r=0;r<mr_r.length;r++)for(n=1;n<mask;n<<=1)if(e[r]&n){s=i<mr_r.length+bpe?i:0;r=mr_r.length;n=mask}else i++;if(s)Z(mr_r,s);ht(mr_a,mr_r,e);if(!G(mr_a,1)&&!L(mr_a,mr_x1)){n=1;while(n<=s-1&&!L(mr_a,mr_x1)){lt(mr_a,e);if(G(mr_a,1)){return 0}n++}if(!L(mr_a,mr_x1)){return 0}}return 1}function s(e){var t,r,n;for(t=e.length-1;e[t]==0&&t>0;t--);for(r=0,n=e[t];n;n>>=1,r++);r+=bpe*t;return r}function l(e,t){var r=N(0,(e.length>t?e.length:t)*bpe,0);X(r,e);return r}function f(e){var t=N(0,e,0);b(t,e);return ft(t,1)}function h(e){if(e>=600)return o(e,2);if(e>=550)return o(e,4);if(e>=500)return o(e,5);if(e>=400)return o(e,6);if(e>=350)return o(e,7);if(e>=300)return o(e,9);if(e>=250)return o(e,12);if(e>=200)return o(e,15);if(e>=150)return o(e,18);if(e>=100)return o(e,27);return o(e,40)}function o(t,r){var n,s,l,f;f=3e4;n=N(0,t,0);if(primes.length==0)primes=e(3e4);if(rpprb.length!=n.length)rpprb=V(n);for(;;){y(n,t,0);n[0]|=1;l=0;for(s=0;s<primes.length&&primes[s]<=f;s++)if(O(n,primes[s])==0&&!G(n,primes[s])){l=1;break}for(s=0;s<r&&!l;s++){y(rpprb,t,0);while(!q(n,rpprb))y(rpprb,t,0);if(!i(n,rpprb))l=1}if(!l)return n}}function a(e,t){var r=V(e);it(r,t);return ft(r,1)}function u(e,t){var r=l(e,e.length+1);F(r,t);return ft(r,1)}function g(e,t){var r=l(e,e.length+t.length);nt(r,t);return ft(r,1)}function _(e,t,r){var n=l(e,r.length);ht(n,ft(t,2),ft(r,2),0);return ft(n,1)}function c(e,t){var r=l(e,e.length>t.length?e.length+1:t.length+1);tt(r,t);return ft(r,1)}function p(e,t){var r=l(e,e.length>t.length?e.length+1:t.length+1);rt(r,t);return ft(r,1)}function d(e,t){var r=l(e,t.length);var n;n=x(r,t);return n?ft(r,1):null}function m(e,t,r){var n=l(e,r.length);st(n,t,r);return ft(n,1)}function b(t,r){var i,l,f,h,o,a,u,g,_,c,p;if(primes.length==0)primes=e(3e4);if(pows.length==0){pows=new Array(512);for(o=0;o<512;o++){pows[o]=Math.pow(2,o/511-1)}}i=.1;l=20;recLimit=20;if(s_i2.length!=t.length){s_i2=V(t);s_R=V(t);s_n1=V(t);s_r2=V(t);s_d=V(t);s_x1=V(t);s_x2=V(t);s_b=V(t);s_n=V(t);s_i=V(t);s_rm=V(t);s_q=V(t);s_a=V(t);s_aa=V(t)}if(r<=recLimit){f=(1<<(r+2>>1))-1;z(t,0);for(h=1;h;){h=0;t[0]=1|1<<r-1|Math.floor(Math.random()*(1<<r));for(o=1;o<primes.length&&(primes[o]&f)==primes[o];o++){if(0==t[0]%primes[o]){h=1;break}}}R(t);return}u=i*r*r;if(r>2*l)for(a=1;r-r*a<=l;)a=pows[Math.floor(Math.random()*512)];else a=.5;p=Math.floor(a*r)+1;b(s_q,p);z(s_i2,0);s_i2[Math.floor((r-2)/bpe)]|=1<<(r-2)%bpe;j(s_i2,s_q,s_i,s_rm);_=s(s_i);for(;;){for(;;){y(s_R,_,0);if(q(s_i,s_R))break}F(s_R,1);rt(s_R,s_i);X(s_n,s_q);nt(s_n,s_R);K(s_n,2);F(s_n,1);X(s_r2,s_R);K(s_r2,2);for(g=0,o=0;o<primes.length&&primes[o]<u;o++)if(O(s_n,primes[o])==0&&!G(s_n,primes[o])){g=1;break}if(!g)if(!n(s_n,2))g=1;if(!g){F(s_n,-3);for(o=s_n.length-1;s_n[o]==0&&o>0;o--);for(c=0,w=s_n[o];w;w>>=1,c++);c+=bpe*o;for(;;){y(s_a,c,0);if(q(s_n,s_a))break}F(s_n,3);F(s_a,2);X(s_b,s_a);X(s_n1,s_n);F(s_n1,-1);ht(s_b,s_n1,s_n);F(s_b,-1);if(E(s_b)){X(s_b,s_a);ht(s_b,s_r2,s_n);F(s_b,-1);X(s_aa,s_n);X(s_d,s_b);M(s_d,s_n);if(G(s_d,1)){X(t,s_aa);return}}}}}function v(e,t){var r,n;r=Math.floor((e-1)/bpe)+2;n=N(0,0,r);y(n,e,t);return n}function y(e,t,r){var n,i;for(n=0;n<e.length;n++)e[n]=0;i=Math.floor((t-1)/bpe)+1;for(n=0;n<i;n++){e[n]=Math.floor(Math.random()*(1<<bpe-1))}e[i-1]&=(2<<(t-1)%bpe)-1;if(r==1)e[i-1]|=1<<(t-1)%bpe}function B(e,t){var r,n;r=V(e);n=V(t);M(r,n);return r}function M(e,r){var n,i,s,l,f,h,o,a,u;if(T.length!=e.length)T=V(e);u=1;while(u){u=0;for(n=1;n<r.length;n++)if(r[n]){u=1;break}if(!u)break;for(n=e.length;!e[n]&&n>=0;n--);i=e[n];s=r[n];l=1;f=0;h=0;o=1;while(s+h&&s+o){a=Math.floor((i+l)/(s+h));qp=Math.floor((i+f)/(s+o));if(a!=qp)break;t=l-a*h;l=h;h=t;t=f-a*o;f=o;o=t;t=i-a*s;i=s;s=t}if(f){X(T,e);W(e,r,l,f);W(r,T,o,h)}else{it(e,r);X(T,e);X(e,r);X(r,T)}}if(r[0]==0)return;t=O(e,r[0]);z(e,r[0]);r[0]=t;while(r[0]){e[0]%=r[0];t=e[0];e[0]=r[0];r[0]=t}}function x(e,t){var r=1+2*Math.max(e.length,t.length);if(!(e[0]&1)&&!(t[0]&1)){z(e,0);return 0}if(eg_u.length!=r){eg_u=new Array(r);eg_v=new Array(r);eg_A=new Array(r);eg_B=new Array(r);eg_C=new Array(r);eg_D=new Array(r)}X(eg_u,e);X(eg_v,t);z(eg_A,1);z(eg_B,0);z(eg_C,0);z(eg_D,1);for(;;){while(!(eg_u[0]&1)){H(eg_u);if(!(eg_A[0]&1)&&!(eg_B[0]&1)){H(eg_A);H(eg_B)}else{rt(eg_A,t);H(eg_A);tt(eg_B,e);H(eg_B)}}while(!(eg_v[0]&1)){H(eg_v);if(!(eg_C[0]&1)&&!(eg_D[0]&1)){H(eg_C);H(eg_D)}else{rt(eg_C,t);H(eg_C);tt(eg_D,e);H(eg_D)}}if(!q(eg_v,eg_u)){tt(eg_u,eg_v);tt(eg_A,eg_C);tt(eg_B,eg_D)}else{tt(eg_v,eg_u);tt(eg_C,eg_A);tt(eg_D,eg_B)}if(G(eg_u,0)){if(S(eg_C))rt(eg_C,t);X(e,eg_C);if(!G(eg_v,1)){z(e,0);return 0}return 1}}}function A(e,t){var r=1,n=0,i;for(;;){if(e==1)return r;if(e==0)return 0;n-=r*Math.floor(t/e);t%=e;if(t==1)return n;if(t==0)return 0;r-=n*Math.floor(e/t);e%=t}}function C(e,t){return A(e,t)}function I(e,t,r,n,i){var s=0;var l=Math.max(e.length,t.length);if(eg_u.length!=l){eg_u=new Array(l);eg_A=new Array(l);eg_B=new Array(l);eg_C=new Array(l);eg_D=new Array(l)}while(!(e[0]&1)&&!(t[0]&1)){H(e);H(t);s++}X(eg_u,e);X(r,t);z(eg_A,1);z(eg_B,0);z(eg_C,0);z(eg_D,1);for(;;){while(!(eg_u[0]&1)){H(eg_u);if(!(eg_A[0]&1)&&!(eg_B[0]&1)){H(eg_A);H(eg_B)}else{rt(eg_A,t);H(eg_A);tt(eg_B,e);H(eg_B)}}while(!(r[0]&1)){H(r);if(!(eg_C[0]&1)&&!(eg_D[0]&1)){H(eg_C);H(eg_D)}else{rt(eg_C,t);H(eg_C);tt(eg_D,e);H(eg_D)}}if(!q(r,eg_u)){tt(eg_u,r);tt(eg_A,eg_C);tt(eg_B,eg_D)}else{tt(r,eg_u);tt(eg_C,eg_A);tt(eg_D,eg_B)}if(G(eg_u,0)){if(S(eg_C)){rt(eg_C,t);tt(eg_D,e)}K(eg_D,-1);X(n,eg_C);X(i,eg_D);J(r,s);return}}}function S(e){return e[e.length-1]>>bpe-1&1}function D(e,t,r){var n,i=e.length,s=t.length;k=i+r<s?i+r:s;for(n=s-1-r;n<i&&n>=0;n++)if(e[n]>0)return 1;for(n=i-1+r;n<s;n++)if(t[n]>0)return 0;for(n=k-1;n>=r;n--)if(e[n-r]>t[n])return 1;else if(e[n-r]<t[n])return 0;return 0}function q(e,t){var r;var n=e.length<t.length?e.length:t.length;for(r=e.length;r<t.length;r++)if(t[r])return 0;for(r=t.length;r<e.length;r++)if(e[r])return 1;for(r=n-1;r>=0;r--)if(e[r]>t[r])return 1;else if(e[r]<t[r])return 0;return 0}function j(e,t,r,n){var i,s;var l,f,h,o,a,u,g;X(n,e);for(s=t.length;t[s-1]==0;s--);g=t[s-1];for(u=0;g;u++)g>>=1;u=bpe-u;J(t,u);J(n,u);for(i=n.length;n[i-1]==0&&i>s;i--);z(r,0);while(!D(t,n,i-s)){et(n,t,i-s);r[i-s]++}for(l=i-1;l>=s;l--){if(n[l]==t[s-1])r[l-s]=mask;else r[l-s]=Math.floor((n[l]*radix+n[l-1])/t[s-1]);for(;;){o=(s>1?t[s-2]:0)*r[l-s];a=o>>bpe;o=o&mask;h=a+r[l-s]*t[s-1];a=h>>bpe;h=h&mask;if(a==n[l]?h==n[l-1]?o>(l>1?n[l-2]:0):h>n[l-1]:a>n[l])r[l-s]--;else break}Y(n,t,-r[l-s],l-s);if(S(n)){$(n,t,l-s);r[l-s]--}}Z(t,u);Z(n,u)}function R(e){var t,r,n,i;r=e.length;n=0;for(t=0;t<r;t++){n+=e[t];i=0;if(n<0){i=-(n>>bpe);n+=i*radix}e[t]=n&mask;n=(n>>bpe)-i}}function O(e,t){var r,n=0;for(r=e.length-1;r>=0;r--)n=(n*radix+e[r])%t;return n}function N(e,t,r){var n,i;i=Math.ceil(t/bpe)+1;i=r>i?r:i;buff=new Array(i);z(buff,e);return buff}function P(e,t,r){var n,i,s,l,f,h,o,a;if(typeof t==="string"){l=t.length;f=t}else{l=t;f=digitsStr}var u=e.length;if(l==-1){h=new Array(0);for(;;){o=new Array(h.length+1);for(i=0;i<h.length;i++)o[i+1]=h[i];o[0]=parseInt(e,10);h=o;n=e.indexOf(",",0);if(n<1)break;e=e.substring(n+1);if(e.length==0)break}if(h.length<r){o=new Array(r);X(o,h);return o}return h}h=N(0,l*u,0);for(i=0;i<u;i++){n=f.indexOf(e.substring(i,i+1),0);if(n>=l||n<0){continue}K(h,l);F(h,n)}for(u=h.length;u>0&&!h[u-1];u--);u=r>u+1?r:u+1;o=new Array(u);a=u<h.length?u:h.length;for(i=0;i<a;i++)o[i]=h[i];for(;i<u;i++)o[i]=0;return o}function G(e,t){var r;if(e[0]!=t)return 0;for(r=1;r<e.length;r++)if(e[r])return 0;return 1}function L(e,t){var r;var n=e.length<t.length?e.length:t.length;for(r=0;r<n;r++)if(e[r]!=t[r])return 0;if(e.length>t.length){for(;r<e.length;r++)if(e[r])return 0}else{for(;r<t.length;r++)if(t[r])return 0}return 1}function E(e){var t;for(t=0;t<e.length;t++)if(e[t])return 0;return 1}function U(e,t){var r,n,i,s,l="";if(typeof t==="string"){i=t.length;s=t}else{i=t;s=digitsStr}if(s6.length!=e.length)s6=V(e);else X(s6,e);if(i==-1){for(r=e.length-1;r>0;r--)l+=e[r]+",";l+=e[0]}else{while(!E(s6)){n=Q(s6,i);l=s.substring(n,n+1)+l}}if(l.length==0)l=s[0];return l}function V(e){var t;buff=new Array(e.length);X(buff,e);return buff}function X(e,t){var r;var n=e.length<t.length?e.length:t.length;for(r=0;r<n;r++)e[r]=t[r];for(r=n;r<e.length;r++)e[r]=0}function z(e,t){var r,n;for(n=t,r=0;r<e.length;r++){e[r]=n&mask;n>>=bpe}}function F(e,t){var r,n,i,s;e[0]+=t;n=e.length;i=0;for(r=0;r<n;r++){i+=e[r];s=0;if(i<0){s=-(i>>bpe);i+=s*radix}e[r]=i&mask;i=(i>>bpe)-s;if(!i)return}}function Z(e,t){var r;var n=Math.floor(t/bpe);if(n){for(r=0;r<e.length-n;r++)e[r]=e[r+n];for(;r<e.length;r++)e[r]=0;t%=bpe}for(r=0;r<e.length-1;r++){e[r]=mask&(e[r+1]<<bpe-t|e[r]>>t)}e[r]>>=t}function H(e){var t;for(t=0;t<e.length-1;t++){e[t]=mask&(e[t+1]<<bpe-1|e[t]>>1)}e[t]=e[t]>>1|e[t]&radix>>1}function J(e,t){var r;var n=Math.floor(t/bpe);if(n){for(r=e.length;r>=n;r--)e[r]=e[r-n];for(;r>=0;r--)e[r]=0;t%=bpe}if(!t)return;for(r=e.length-1;r>0;r--){e[r]=mask&(e[r]<<t|e[r-1]>>bpe-t)}e[r]=mask&e[r]<<t}function K(e,t){var r,n,i,s;if(!t)return;n=e.length;i=0;for(r=0;r<n;r++){i+=e[r]*t;s=0;if(i<0){s=-(i>>bpe);i+=s*radix}e[r]=i&mask;i=(i>>bpe)-s}}function Q(e,t){var r,n=0,i;for(r=e.length-1;r>=0;r--){i=n*radix+e[r];e[r]=Math.floor(i/t);n=i%t}return n}function W(e,t,r,n){var i,s,l,f;l=e.length<t.length?e.length:t.length;f=e.length;for(s=0,i=0;i<l;i++){s+=r*e[i]+n*t[i];e[i]=s&mask;s>>=bpe}for(i=l;i<f;i++){s+=r*e[i];e[i]=s&mask;s>>=bpe}}function Y(e,t,r,n){var i,s,l,f;l=e.length<n+t.length?e.length:n+t.length;f=e.length;for(s=0,i=n;i<l;i++){s+=e[i]+r*t[i-n];e[i]=s&mask;s>>=bpe}for(i=l;s&&i<f;i++){s+=e[i];e[i]=s&mask;s>>=bpe}}function $(e,t,r){var n,i,s,l;s=e.length<r+t.length?e.length:r+t.length;l=e.length;for(i=0,n=r;n<s;n++){i+=e[n]+t[n-r];e[n]=i&mask;i>>=bpe}for(n=s;i&&n<l;n++){i+=e[n];e[n]=i&mask;i>>=bpe}}function et(e,t,r){var n,i,s,l;s=e.length<r+t.length?e.length:r+t.length;l=e.length;for(i=0,n=r;n<s;n++){i+=e[n]-t[n-r];e[n]=i&mask;i>>=bpe}for(n=s;i&&n<l;n++){i+=e[n];e[n]=i&mask;i>>=bpe}}function tt(e,t){var r,n,i,s;i=e.length<t.length?e.length:t.length;for(n=0,r=0;r<i;r++){n+=e[r]-t[r];e[r]=n&mask;n>>=bpe}for(r=i;n&&r<e.length;r++){n+=e[r];e[r]=n&mask;n>>=bpe}}function rt(e,t){var r,n,i,s;i=e.length<t.length?e.length:t.length;for(n=0,r=0;r<i;r++){n+=e[r]+t[r];e[r]=n&mask;n>>=bpe}for(r=i;n&&r<e.length;r++){n+=e[r];e[r]=n&mask;n>>=bpe}}function nt(e,t){var r;if(ss.length!=2*e.length)ss=new Array(2*e.length);z(ss,0);for(r=0;r<t.length;r++)if(t[r])Y(ss,e,t[r],r);X(e,ss)}function it(e,t){if(s4.length!=e.length)s4=V(e);else X(s4,e);if(s5.length!=e.length)s5=V(e);j(s4,t,s5,e)}function st(e,t,r){var n;if(s0.length!=2*e.length)s0=new Array(2*e.length);z(s0,0);for(n=0;n<t.length;n++)if(t[n])Y(s0,e,t[n],n);it(s0,r);X(e,s0)}function lt(e,t){var r,n,i,s,l,f,h;for(l=e.length;l>0&&!e[l-1];l--);h=l>t.length?2*l:2*t.length;if(s0.length!=h)s0=new Array(h);z(s0,0);for(r=0;r<l;r++){s=s0[2*r]+e[r]*e[r];s0[2*r]=s&mask;s>>=bpe;for(n=r+1;n<l;n++){s=s0[r+n]+2*e[r]*e[n]+s;s0[r+n]=s&mask;s>>=bpe}s0[r+l]=s}it(s0,t);X(e,s0)}function ft(e,t){var r,n;for(r=e.length;r>0&&!e[r-1];r--);n=new Array(r+t);X(n,e);return n}function ht(e,t,r){var n,i,s,l;if(s7.length!=r.length)s7=V(r);if((r[0]&1)==0){X(s7,e);z(e,1);while(!G(t,0)){if(t[0]&1)st(e,s7,r);Q(t,2);lt(s7,r)}return}z(s7,0);for(s=r.length;s>0&&!r[s-1];s--);l=radix-A(O(r,radix),radix);s7[s]=1;st(e,s7,r);if(s3.length!=e.length)s3=V(e);else X(s3,e);for(n=t.length-1;n>0&!t[n];n--);if(t[n]==0){z(e,1);return}for(i=1<<bpe-1;i&&!(t[n]&i);i>>=1);for(;;){if(!(i>>=1)){n--;if(n<0){ot(e,one,r,l);return}i=1<<bpe-1}ot(e,e,r,l);if(i&t[n])ot(e,s3,r,l)}}function ot(e,t,r,n){var i,s,l,f,h,o;var a=r.length;var u=t.length;if(sa.length!=a)sa=new Array(a);z(sa,0);for(;a>0&&r[a-1]==0;a--);for(;u>0&&t[u-1]==0;u--);o=sa.length-1;for(i=0;i<a;i++){h=sa[0]+e[i]*t[0];f=(h&mask)*n&mask;l=h+f*r[0]>>bpe;h=e[i];s=1;for(;s<u-4;){l+=sa[s]+f*r[s]+h*t[s];sa[s-1]=l&mask;l>>=bpe;s++;l+=sa[s]+f*r[s]+h*t[s];sa[s-1]=l&mask;l>>=bpe;s++;l+=sa[s]+f*r[s]+h*t[s];sa[s-1]=l&mask;l>>=bpe;s++;l+=sa[s]+f*r[s]+h*t[s];sa[s-1]=l&mask;l>>=bpe;s++;l+=sa[s]+f*r[s]+h*t[s];sa[s-1]=l&mask;l>>=bpe;s++}for(;s<u;){l+=sa[s]+f*r[s]+h*t[s];sa[s-1]=l&mask;l>>=bpe;s++}for(;s<a-4;){l+=sa[s]+f*r[s];sa[s-1]=l&mask;l>>=bpe;s++;l+=sa[s]+f*r[s];sa[s-1]=l&mask;l>>=bpe;s++;l+=sa[s]+f*r[s];sa[s-1]=l&mask;l>>=bpe;s++;l+=sa[s]+f*r[s];sa[s-1]=l&mask;l>>=bpe;s++;l+=sa[s]+f*r[s];sa[s-1]=l&mask;l>>=bpe;s++}for(;s<a;){l+=sa[s]+f*r[s];sa[s-1]=l&mask;l>>=bpe;s++}for(;s<o;){l+=sa[s];sa[s-1]=l&mask;l>>=bpe;s++}sa[s-1]=l&mask}if(!q(r,sa))tt(sa,r);X(e,sa)}if(typeof r==="undefined"){r={}}BigInt=r.exports={add:p,addInt:u,bigInt2str:U,bitSize:s,dup:V,equals:L,equalsInt:G,expand:l,findPrimes:e,GCD:B,greater:q,greaterShift:D,int2bigInt:N,inverseMod:d,inverseModInt:A,isZero:E,millerRabin:i,millerRabinInt:n,mod:a,modInt:O,mult:g,multMod:m,negative:S,powMod:_,randBigInt:v,randTruePrime:f,randProbPrime:h,str2bigInt:P,sub:c,trim:ft,addInt_:F,add_:rt,copy_:X,copyInt_:z,GCD_:M,inverseMod_:x,mod_:it,mult_:nt,multMod_:st,powMod_:ht,randBigInt_:y,randTruePrime_:b,sub_:tt,addShift_:$,carry_:R,divide_:j,divInt_:Q,eGCD_:I,halve_:H,leftShift_:J,linComb_:W,linCombShift_:Y,mont_:ot,multInt_:K,rightShift_:Z,squareMod_:lt,subShift_:et,powMod_:ht,eGCD_:I,inverseMod_:x,GCD_:M,mont_:ot,divide_:j,squareMod_:lt,randTruePrime_:b,millerRabin:i}})()},{}],lseqtree:[function(e,t,r){var n=e("BigInt");var i=e("./base.js")(15);var s=e("./strategy.js")(10);var l=e("./identifier.js");var f=e("./triple.js");var h=e("./lseqnode.js");function o(e){var t;this._s=e;this._c=0;this._hash=function(e){return e%2};this.length=0;this.root=new h([],null);t=[];t.push(new f(0,0,0));this.root.add(new h(t,""));t=[];t.push(new f(Math.pow(2,i.getBitBase(0))-1,Number.MAX_VALUE,Number.MAX_VALUE));this.root.add(new h(t,""))}o.prototype.get=function(e){return this.root.get(e)};o.prototype.insert=function(e,t){var r=this.get(t),n=this.get(t+1),i,s;this._c+=1;i=this.alloc(r,n);s={_e:e,_i:i};this.applyInsert(e,i);return s};o.prototype.remove=function(e){var t=this.get(e+1),r=new l(null,[],[]);r.fromNode(t);this.applyRemove(r);return r};o.prototype.alloc=function(e,t){var r=0,n=0;while(r<=0){r=i.getInterval(e,t,n);++n}n-=1;if(this._hash(n)===0){return s.bPlus(e,t,n,r,this._s,this._c)}else{return s.bMinus(e,t,n,r,this._s,this._c)}};o.prototype.applyInsert=function(e,t){if(!(t instanceof l)){t=new l(t._d,t._s,t._c)}var r=t.toNode(),n=r,i;while(n.children.length!==0){n=n.children[0]}n.e=e;var i=this.root.add(r);if(i!==-1){this.length+=1;return this.root.indexOf(r)}else{return-1}};o.prototype.applyRemove=function(e){if(!(e instanceof l)){e=new l(e._d,e._s,e._c)}var t=e.toNode(),r=this.root.indexOf(t),n=this.root.del(t);if(n===-1){return-1}else{this.length-=1;return r}};t.exports=o},{"./base.js":1,"./identifier.js":2,"./lseqnode.js":3,"./strategy.js":4,"./triple.js":5,BigInt:7}]},{},[]);