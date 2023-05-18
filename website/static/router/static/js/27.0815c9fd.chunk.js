(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{"./src/markdown/api/createHistory.md":function(n,s,a){"use strict";a.r(s),a.d(s,"title",function(){return o});var t=a("./node_modules/react/index.js"),e=a.n(t);const o="createHistory(source)";s.default=function(){return e.a.createElement("div",{className:"markdown",dangerouslySetInnerHTML:{__html:'<h1>createHistory(source)</h1>\n<p>Creates a history object that enables you to listen for location changes. You don’t typically need this outside of some types of testing.</p>\n<pre><code class="language-jsx"><span class="token keyword">import</span> <span class="token punctuation">{</span>\n  createMemorySource<span class="token punctuation">,</span>\n  createHistory\n<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"@blinq-reach/router"</span>\n\n<span class="token comment">// listen to the browser history</span>\n<span class="token keyword">let</span> history <span class="token operator">=</span> <span class="token function">createHistory</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span>\n\n<span class="token comment">// for some types of tests you want a memory source</span>\n<span class="token keyword">let</span> source <span class="token operator">=</span> <span class="token function">createMemorySource</span><span class="token punctuation">(</span><span class="token string">"/starting/url"</span><span class="token punctuation">)</span>\n<span class="token keyword">let</span> history <span class="token operator">=</span> <span class="token function">createHistory</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span>\n</code></pre>\n'}})}}}]);