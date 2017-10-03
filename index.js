var cheerio = require('cheerio');

module.exports = {
  book: {
    assets: './assets',
    css: [
      'prism.css'
    ],
    js: [
      'prism.js'
    ]
  },
  blocks: {
    pre: {
      process: function(block) {
        var $ = cheerio.load('<pre><code></code></pre>');
        var lang = block.kwargs.language || 'python';

        $('pre').addClass('command-line');
        $('pre').addClass('language-' + lang);

        var keys = Object.keys(block.kwargs).filter(function safe(params) {
          return ['user', 'host', 'prompt', 'output'].indexOf(params) > -1;
        });

        keys.forEach(function(element) {
          $('pre').attr('data-' + element, block.kwargs[element]);
        });

        $('code').text(block.body.trim());

        return $.html();
      }
    }
  },
  hooks: {

  }
};
