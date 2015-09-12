var Prism = require('prismjs');
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
