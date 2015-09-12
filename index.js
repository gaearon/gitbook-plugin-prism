var Prism = require('prismjs');
var cheerio = require('cheerio');
var path = require('path');

var cssFile = require.resolve('prismjs/themes/prism.css');
var cssDirectory = path.dirname(cssFile);

module.exports = {
  book: {
    assets: cssDirectory,
    css: [path.basename(cssFile)]
  },
  hooks: {
    page: function (page) {
      page.sections.forEach(function (section) {
        var $ = cheerio.load(section.content);

        $('code').each(function() {
          var text = $(this).text();
          var highlighted = Prism.highlight(text, Prism.languages.javascript);
          $(this).html(highlighted);
        });

        section.content = $.html();
      });
      return page;
    }
  }
};
