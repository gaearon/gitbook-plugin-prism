var Prism = require('prismjs');
var path = require('path');

var prismCSS = require.resolve('prismjs/themes/prism.css');

var DEFAULT_LANGUAGE = 'javascript';
var MAP_LANGUAGES = {
  'py': 'python',
  'js': 'javascript',
  'json': 'javascript',
  'rb': 'ruby',
  'csharp': 'cs',
};

var assets = {
  assets: path.dirname(prismCSS),
  css: [path.basename(prismCSS)]
};

module.exports = {
  book: assets,
  ebook: assets,
  blocks: {
    code: function(block) {
      // Normalize language id
      var lang = block.kwargs.language || DEFAULT_LANGUAGE;
      lang = MAP_LANGUAGES[lang] || lang;

      // Get languages from prism
      lang = Prism.languages[lang] || Prism.languages[DEFAULT_LANGUAGE];

      return Prism.highlight(block.body, lang);
    }
  }
};