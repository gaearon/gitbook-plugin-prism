var cheerio = require('cheerio');
var Prism = require('prismjs');

function requireSyntax(lang) {
  require('prismjs/components/prism-' + lang + '.js');
}

[
  'javascript',
  'markup',
  'css',
  'python',
  'bash',
  'powershell'
].map(requireSyntax);

module.exports = {
  book: {
    assets: './assets',
    css: [
      'prism.css'
    ],
    js: [
      'loader.js'
    ]
  },
  blocks: {
    pre: {
      process: function(block) {
        var $ = cheerio.load('<pre><code></code></pre>');
        var body = block.body.trim();
        var prompt = (block.kwargs.prompt) ? block.kwargs.prompt + ' ' : '';
        var lang = block.kwargs.language || 'python';

        const range = (start, end) => Array.from(new Array((end + 1) - start), (val, index) => index + start);

        var _output = [];
        if (block.kwargs.output) {
          _output = block.kwargs.output.split(',').map((id) => {
            if (id.indexOf('-') > -1) {
              var borders = id.split('-').map(num => parseInt(num));
              return range(...borders);
            }
            return [parseInt(id)];
          });
        }

        var output = _output.reduce(function(current, next) {
          return current.concat(next);
        }, []);

        var codeLines = body.split('\n').map(function(line, index) {
          var wrap = $('<div><span class="line"></span></div>');

          if (output.indexOf(index + 1) === -1) {
            $('span', wrap).attr('data-prompt', prompt);
          } else {
            $('span', wrap).addClass('no-select');
          }

          $('span', wrap).append(Prism.highlight(line, Prism.languages[lang]));
          return wrap.html();
        });

        $('pre').addClass('language-' + lang);

        $('code').attr('data-html', codeLines.join('<br />'));

        return $.html();
      }
    }
  },
  hooks: {

  }
};
