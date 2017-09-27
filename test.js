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

test('highlight csharp code using shortcut', function (t) {

  t.plan(2);

  var content = '{% pre prompt="$ " %}\npython\n{% endpre %}';
  var expected = '<p><pre class="command-line language-python" data-prompt="$ "><code>python</code></pre></p>';
  expect(t, '>=2.4.1', content, expected);
  expect(t, '>=3.0.0', content, expected);

});
