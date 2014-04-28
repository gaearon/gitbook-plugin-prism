module.exports = {
    book: {
        assets: "./book",
        js: [
            "test.js"
        ],
        css: [
            "test.css"
        ]
    },
    hooks: {
        // For all the hooks, this represent the current generator

        // This is called before the book is generated
        init: function() {
            console.log("init!");
        },

        // This is called after the book generation
        finish: function() {
            console.log("finish!");
        },

        // This is called for each page of the book
        // It can be used for modifing page content
        // It should return the new page
        page: function(page) {
            return page;
        }
    }
};