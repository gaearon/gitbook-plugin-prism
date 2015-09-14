var Prism = require('prismjs');
var languages = require('prism-languages');
var cheerio = require('cheerio');
var path = require('path');

var prismCSS = require.resolve('prismjs/themes/prism.css');

module.exports = {
  book: {
    assets: path.dirname(prismCSS),
    css: [path.basename(prismCSS)]
  },
  hooks: {
    page: function (page) {
      page.sections.forEach(function (section) {
        var $ = cheerio.load(section.content);

        $('code').each(function() {
          // assumes markup is a good default, not sure about this
          var defaultLanguage = 'markup';
          var $e = $(this);
          var text = $e.text();
          var language = $e.attr('class');
          var highlighted;

          if(language) {
            // assumes lang-<something>, this depends on how gitbook works
            language = language.split('-');
            language = language.length > 1 ? language[1] : defaultLanguage;

            // check against html, prism "markup" works for this
            if(language === 'html') {
              language = 'markup';
            }
          }

          try {
            // the process can fail (didn't match correctly or failed to parse)
            highlighted = Prism.highlight(text, languages[language]);
          }
          catch(e) {
            console.warn('Failed to highlight, defaulting to', defaultLanguage);

            try {
              // of course this can fail too...
              highlighted = Prism.highlight(text, languages[defaultLanguage]);
            }
            catch(e) {
              highlighted = text;
            }
          }

          $(this).html(highlighted);
        });

        section.content = $.html();
      });
      return page;
    }
  }
};
