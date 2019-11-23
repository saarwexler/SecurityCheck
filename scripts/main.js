
        let ids = ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8', 'test9', 'test10', 'test11'];
        let security_failed = 0;
        let security_passed = 0;
        let data_failed = 0;
        let data_passed = 0;

        $("#startCheck").click(function () {
            $("#main").css("display", "none");
            $("body").css('background-color', "whitesmoke");
            $("#result").css("display", "block");
            let count = 1;
            for (let id of ids) {
                count = run_test(id, count)
            }
        });

        let run_test = function (id, count) {
            setTimeout(function () {
                let answer = Math.floor(Math.random() * 2);
                testResult(id, answer).then();
                test(count).then();
            }, 1000);
            return count + 1;
        };

        function test(count) {
            let total = 11;
            let percent = count / total * 100 + "%";
            $("#loader-bar").css("width", percent);
            $("#loader-info").text(parseInt(percent) + "%");
            return Promise.resolve()
        }

        function testResult(id, answer) {
            let element = document.getElementById(id);
            if (answer === 0) {
                element.src = "http://www.proredetelecom.com.br/wp-content/uploads/2019/01/icon-fail.png";
                if (id.slice(4) <= 8) {
                    security_failed++;
                    $("#sec-fail").text(security_failed);
                } else {
                    data_failed++;
                    $("#data-fail").text(data_failed);
                }
                console.log("failed");
            } else {
                element.src = "https://cdn1.iconfinder.com/data/icons/color-bold-style/21/34-512.png";
                if (id.slice(4) <= 8) {
                    security_passed++;
                    $("#sec-pass").text(security_passed);
                } else {
                    data_passed++;
                    $("#data-pass").text(data_passed);
                }
                console.log("passed");
            }
            return Promise.resolve(id);
        }