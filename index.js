var Prism = require('prismjs');
var languages = require('prism-languages');
var path = require('path');

var prismCSS = require.resolve('prismjs/themes/prism.css');

var DEFAULT_LANGUAGE = 'markup';
var MAP_LANGUAGES = {
  'py': 'python',
  'js': 'javascript',
  'json': 'javascript',
  'rb': 'ruby',
  'csharp': 'cs',
  'html': 'markup'
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
      var highlighted = '';

      // Normalize language id
      var lang = block.kwargs.language || DEFAULT_LANGUAGE;
      lang = MAP_LANGUAGES[lang] || lang;
      if (!languages[lang]) lang = DEFAULT_LANGUAGE;

      // Check against html, prism "markup" works for this
      if (lang === 'html') {
        lang = 'markup';
      }

      try {
        // The process can fail (failed to parse)
        highlighted = Prism.highlight(block.body, languages[lang]);
      }
      catch(e) {
        console.warn('Failed to highlight:');
        console.warn(e);
        highlighted = block.body;
      }

      return highlighted;
    }
  }
};