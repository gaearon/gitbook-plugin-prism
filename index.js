var Prism = require('prismjs');
var languages =  require('prismjs').languages;
var path = require('path');

var DEFAULT_LANGUAGE = 'markup';
var MAP_LANGUAGES = {
  'py': 'python',
  'js': 'javascript',
  'rb': 'ruby',
  'csharp': 'cs',
  'html': 'markup'
};

function getAssets() {

  var book = this;

  var cssFiles = this.config.get('pluginsConfig.prism.css', []);
  var cssFolder = null;
  var cssNames = [];

  if(cssFiles.length === 0) {
    cssFiles.push('prismjs/themes/prism.css');
  }

  cssFiles.forEach(function(cssFile) {
    var cssPath = require.resolve(cssFile);
    cssFolder = path.dirname(cssPath);
    cssName = path.basename(cssPath);
    cssNames.push(cssName);
  });

  var assets = {
    assets: cssFolder,
    css: cssNames
  };

  return assets;
}

module.exports = {
  book: getAssets,
  ebook: getAssets,
  blocks: {
    code: function(block) {

      var highlighted = '';

      // Normalize language id
      var lang = block.kwargs.language || DEFAULT_LANGUAGE;
      lang = MAP_LANGUAGES[lang] || lang;

      // Try and find the language definition in components folder
      if (!languages[lang]) {
        try {
          require('prismjs/components/prism-' + lang + '.js');
        }catch(e) {
          console.warn('Failed to load prism syntax: '+ lang);
          console.warn(e);
        }
      }

      if (!languages[lang]) lang = DEFAULT_LANGUAGE;

      // Check against html, prism "markup" works for this
      if (lang === 'html') {
        lang = 'markup';
      }

      try {
        // The process can fail (failed to parse)
        highlighted = Prism.highlight(block.body, languages[lang]);
      } catch(e) {
        console.warn('Failed to highlight:');
        console.warn(e);
        highlighted = block.body;
      }

      return highlighted;
    }
  }
};
