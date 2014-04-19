module.exports = {
    book: {
        js: [
            "book/test.js"
        ],
        css: [
            "book/test.css"
        ]
    },
    hooks: {
        init: function() {
            console.log("init!");
        },
        finish: function() {
            console.log("finish!");
        }
    }
};