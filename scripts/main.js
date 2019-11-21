$("#startCheck").click(function() {
    $("#main").css("display", "none");
    $("body").css('background-color', "whitesmoke");
    $("#result").css("display", "block")
    let count = 1;
    while (count <= 10) {
        count = runTest(count);
    }
});


function runTest(count) {
        test(count);
        return count+1;
}

function test(count) {
    let total = 10;
    setTimeout(function () {
        let percent = count / total * 100 + "%";
        $("#loader-bar").css("width", percent);
        $("#loader-info").text(parseInt(percent) + "%");
    }, 2000);
}