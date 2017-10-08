var tester = require('gitbook-tester');
var test = require('tape');

function expect(t, version, content, expected) {

  tester.builder()
    .withContent(content)
    .withLocalPlugin(__dirname)
    .withBookJson({
      gitbook: version,
      plugins: ['-highlight']
    })
    .create()
    .then(function(result) {
      t.equal(result[0].content, expected, 'gitbook version ' + version);
    })
    .done();

}

test('highlight prompt code using shortcut', function (t) {

  t.plan(2);

  var content = '{% pre prompt="$" %}\npython\n{% endpre %}';
  var expected = '<p><pre class="language-python"><code data-html="&lt;span class=&quot;line&quot; data-prompt=&quot;$ &quot;&gt;python&lt;/span&gt;"></code></pre></p>';
  expect(t, '>=2.4.1', content, expected);
  expect(t, '>=3.0.0', content, expected);

});
