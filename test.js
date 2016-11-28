var tester = require('gitbook-tester');
var test = require('tape');

var pkg = require('./package.json');

test('should highlight javascript code block', function (t) {

  t.plan(1);

  tester.builder()
    .withContent('```js\nfunction() { return true };\n```')
    .withLocalPlugin(__dirname)
    .withBookJson({
      gitbook: pkg.engines.gitbook,
      plugins: ['prism', '-highlight']
    })
    .create()
    .then(function(result) {
      var expected = '<pre class="language-"><code class="lang-js"><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>';
      t.equal(result[0].content, expected);
    })
    .done();

});
