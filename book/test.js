$(document).bind("bookReady", function() {
    gitbook.bind("page.change", function() {
        // do something
    });

    gitbook.bind("exercise.submit", function() {
        // do something
    });
});