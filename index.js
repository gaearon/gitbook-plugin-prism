var Prism = require('prismjs');
var cheerio = require('cheerio');

module.exports = {
  book: {
    assets: './node_modules/prismjs/themes',
    css: [
      'prism.css'
    ]
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
