var Prism = require('prismjs');

module.exports = {
  book: {
    assets: './node_modules/prismjs/themes',
    css: [
      'prism.css'
    ]
  },
  hooks: {
    page: function (page) {
      var $ = cheerio.load(page.content);

      $('code').each(function() {
        var text = $(this).text();
        var highlighted = Prism.highlight(text, Prism.languages.javascript);
        $(this).html(highlighted);
      });

      page.content = $.html();
      return page;
    }
  }
};
