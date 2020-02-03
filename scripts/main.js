
        let ids = ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8', 'test9', 'test10', 'test11'];
        let security_failed = 0;
        let security_passed = 0;
        let data_failed = 0;
        let data_passed = 0;

        $("#startCheck").click(function () {
            $("#main").css("display", "none");
            $("body").css('background-color', "whitesmoke");
            $("#result").css("display", "block");


            runAll();
            // let count = 1;
            // for (let id of ids) {
            //    run_test(id)
            //     .then(result => {
            //         console.log(result);
            //         testResult(id, result)
            //     })
            //     .then(test(count))
            //    count++;
            // }
        });

        

        async function runAll() {
            let urlsList = {
                test1: 'http://akamaietpphishingtest.com',
                test2: 'http://akamaietpphishingtest.com',
                test3: 'http://akamaietpphishingtest.com',
                test4: 'http://akamaietpphishingtest.com',
                test5: 'http://akamaietpcompromisedmalwaretest.com/knownbadmacro.xlsm',
                test6: 'http://akamaietpcompromisedmalwaretest.com/knownbadmalware.exe',
                test7: 'http://akamaietpcompromisedphishingtest.com/knownbadphisihing.html',
                test8: 'http://akamaietpcompromisedcnctest.com/knownbadcnc.html',          
                test9: 'http://akamaietpcompromisedmalwaretest.com/badscript.js',
                test10: 'http://akamaietpcompromisedmalwaretest.com/badscript.js',
                test11: 'http://akamaietpcompromisedmalwaretest.com/badscript.js'
            };
            const urls = Object.values(urlsList);

            let index = 1;
            for (const url of urls) {
                await delay(1500).then(() => {
                    fetch(url, {}, 5000)
                    .then(response => response.url.indexOf("error") > -1)
                    .then(result => {
                        testResult(`test${index}`, result);
                    })
                    .then(() =>  {
                        console.log("index++", index);
                        index++;
                        test(index);
                    });
                })
                
            }
        }

        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        let run_test = function (id, count) {
          let map = new Map([["test1",'http://akamaietpphishingtest.com'],
          ['test2', 'http://akamaietpphishingtest.com'],
          ['test3', 'http://akamaietpphishingtest.com'],
          ['test4', 'http://akamaietpphishingtest.com'],
          ['test5', 'http://akamaietpcompromisedmalwaretest.com/knownbadmacro.xlsm'],
          ['test6', 'http://akamaietpcompromisedmalwaretest.com/knownbadmalware.exe'],
          ['test7', 'http://akamaietpcompromisedphishingtest.com/knownbadphisihing.html'],
          ['test8', 'http://akamaietpcompromisedcnctest.com/knownbadcnc.html'],          
          ['test9', 'http://akamaietpcompromisedmalwaretest.com/badscript.js'],
          ['test10', 'http://akamaietpcompromisedmalwaretest.com/badscript.js'],
          ['test11', 'http://akamaietpcompromisedmalwaretest.com/badscript.js']]);

          const url = map.get(id) 
          return fetch(url).then(
              response => response.url.indexOf("error") > -1
              );          
        };

        function test(count) {
            let total = 11;
            console.log(count, total, (count / total) * 100);
            let result = Math.floor((count / total) * 100);
            result = result < 100 ? result : 100;
            let percent = result + "%";

            $("#loader-bar").css("width", percent);
            $("#loader-info").text(parseInt(percent) + "%");
        }

        function testResult(id, answer) {
                let element = document.getElementById(id);
            console.log( id + ": " +answer);
            if (answer === false) {
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