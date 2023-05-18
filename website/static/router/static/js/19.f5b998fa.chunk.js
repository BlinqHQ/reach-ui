(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{"./src/markdown/api/useParams.md":function(n,s,a){"use strict";a.r(s),a.d(s,"title",function(){return e});var t=a("./node_modules/react/index.js"),p=a.n(t);const e="useParams";s.default=function(){return p.a.createElement("div",{className:"markdown",dangerouslySetInnerHTML:{__html:'<h1>useParams</h1>\n<p>Returns an object of the params for the route rendered.</p>\n<p>This API requires a hook-compatible version of React.</p>\n<pre><code class="language-jsx"><span class="token keyword">import</span> <span class="token punctuation">{</span> useParams <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"@blinq-reach/router"</span>\n\n<span class="token comment">// route: /user/:userName</span>\n<span class="token keyword">const</span> <span class="token function-variable function">User</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> params <span class="token operator">=</span> <span class="token function">useParams</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span><span class="token punctuation">{</span>params<span class="token punctuation">.</span>userName<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>\n<span class="token punctuation">)</span>\n</code></pre>\n'}})}}}]);