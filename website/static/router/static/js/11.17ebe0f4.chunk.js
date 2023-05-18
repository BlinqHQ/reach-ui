(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"./src/markdown/pages/server-rendering.md":function(n,s,a){"use strict";a.r(s),a.d(s,"title",function(){return e});var t=a("./node_modules/react/index.js"),p=a.n(t);const e="Server Rendering";s.default=function(){return p.a.createElement("div",{className:"markdown",dangerouslySetInnerHTML:{__html:'<h1>Server Rendering</h1>\n<p>There are a few things to consider when server rendering your React app with Reach Router.</p>\n<ul>\n<li>Transpiling JSX for Node.js</li>\n<li>Providing the location statically to the app</li>\n<li>Handling redirects</li>\n<li>Data loading</li>\n</ul>\n<h2>Transpiling JSX for Node.js</h2>\n<p>We aren’t going to get into this, but we welcome PRs with links to documentation/tutorials that do.</p>\n<h2>Providing the Location</h2>\n<p>This part is pretty simple, bring in <code>ServerLocation</code> and wrap your app in it. Whether you’re using express or something else in Node, you’ll have a <code>req</code> object somewhere with a <code>url</code> property. That’s what we need.</p>\n<pre><code class="language-jsx"><span class="token keyword">import</span> <span class="token punctuation">{</span> renderToString <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react-dom/server"</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> ServerLocation <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"@blinq-reach/router"</span>\n<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">"./App"</span>\n\n<span class="token function">createServer</span><span class="token punctuation">(</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> markup <span class="token operator">=</span> <span class="token function">renderToString</span><span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ServerLocation</span> <span class="token attr-name">url</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>req<span class="token punctuation">.</span>url<span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>App</span> <span class="token punctuation">/></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ServerLocation</span><span class="token punctuation">></span></span>\n  <span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n<p>And that’s it. Instead of listening to a browser history, the routers inside the app will match against the url you provided.</p>\n<h2>Handling Redirects</h2>\n<p>When you render a <code>&lt;Redirect/&gt;</code> a redirect request is thrown, preventing react from rendering the whole tree when we don’t want to do that work anyway.</p>\n<p>To handle redirects on the server, catch them, then redirect on the server.</p>\n<pre><code class="language-jsx"><span class="token keyword">import</span> <span class="token punctuation">{</span> renderToString <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react-dom/server"</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span>\n  ServerLocation<span class="token punctuation">,</span>\n  isRedirect\n<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"@blinq-reach/router"</span>\n<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">"./App"</span>\n\n<span class="token function">createServer</span><span class="token punctuation">(</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">let</span> markup\n  <span class="token keyword">try</span> <span class="token punctuation">{</span>\n    markup <span class="token operator">=</span> <span class="token function">renderToString</span><span class="token punctuation">(</span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ServerLocation</span> <span class="token attr-name">url</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>req<span class="token punctuation">.</span>url<span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>App</span> <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ServerLocation</span><span class="token punctuation">></span></span>\n    <span class="token punctuation">)</span>\n  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isRedirect</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      res<span class="token punctuation">.</span><span class="token function">redirect</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>uri<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n      <span class="token comment">// carry on as usual</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n<h2>Data Loading</h2>\n<p>When React Suspense ships, these docs will be updated with some great examples of server rendering with data loading. Until then, you’ll need to come up with your own strategy.</p>\n'}})}}}]);