let trigger = document.getElementById('submitpin');
let token = localStorage.getItem('user')
token = JSON.parse(token)

function autofill() {
    chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
        function (tabs) {

            const allURLs = {
                "https://www.facebook.com": {
                    "username": "//*[@id='email']",
                    "password": "//*[@id='pass']",
                    "login": "/html/body/div[1]/div[2]/div[1]/div/div/div/div[2]/div/div[1]/form/div[2]/button"
                },
                "https://www.linkedin.com/login": {
                    "username": "/html/body/div/main/div[2]/div[1]/form/div[1]/input",
                    "password": "/html/body/div/main/div[2]/div[1]/form/div[2]/input",
                    "login": "/html/body/div/main/div[2]/div[1]/form/div[3]/button"
                },
                "https://twitter.com/login": {
                    "username": "/html/body/div/div/div/div[2]/main/div/div/div[2]/form/div/div[1]/label/div/div[2]/div/input",
                    "password": "/html/body/div/div/div/div[2]/main/div/div/div[2]/form/div/div[2]/label/div/div[2]/div/input",
                    "login": "/html/body/div/div/div/div[2]/main/div/div/div[2]/form/div/div[3]/div/div/span/span"
                },
                "https://www.instagram.com": {
                    "username": "/html/body/div[1]/section/main/article/div[2]/div[1]/div/form/div/div[1]/div/label/input",
                    "password": "/html/body/div[1]/section/main/article/div[2]/div[1]/div/form/div/div[2]/div/label/input",
                    "login": "/html/body/div[1]/section/main/article/div[2]/div[1]/div/form/div/div[3]/button"
                },
                "https://github.com/login": {
                    "username": "/html/body/div[3]/main/div/div[4]/form/input[2]",
                    "password": "/html/body/div[3]/main/div/div[4]/form/div/input[1]",
                    "login": "/html/body/div[3]/main/div/div[4]/form/div/input[12]"
                },
                "https://vtop.vit.ac.in/vtop/initialProcess": {
                    "username": "/html/body/div[1]/div/section/div/div[2]/form/div[1]/input",
                    "password": "/html/body/div[1]/div/section/div/div[2]/form/div[2]/input",
                    "login": "/html/body/div[1]/div/section/div/div[2]/form/div[3]/div[3]/button"
                },
                "https://in.pinterest.com": {
                    "username": "/html/body/div[1]/div[1]/div/div/div/div[1]/div[2]/div[2]/div/div/div/div/div/div/div/div[4]/form/div[1]/fieldset/span/div/input",
                    "password": "/html/body/div[1]/div[1]/div/div/div/div[1]/div[2]/div[2]/div/div/div/div/div/div/div/div[4]/form/div[4]",
                    "login": "/html/body/div[1]/div[1]/div/div/div/div[1]/div[2]/div[2]/div/div/div/div/div/div/div/div[4]/form/div[5]/button"
                },
                "https://www.reddit.com/login": {
                    "username": "/html/body/div/main/div[1]/div/div[2]/form/fieldset[1]/input",
                    "password": "/html/body/div/main/div[1]/div/div[2]/form/fieldset[2]/input",
                    "login": "/html/body/div/main/div[1]/div/div[2]/form/fieldset[5]/button"
                },
                "https://www.quora.com": {
                    "username": "/html/body/div[2]/div[2]/div/div/div/div/div/div[2]/div[2]/div[2]/div[2]/input",
                    "password": "/html/body/div[2]/div[2]/div/div/div/div/div/div[2]/div[2]/div[3]",
                    "login": "/html/body/div[2]/div[2]/div/div/div/div/div/div[2]/div[2]/div[4]"
                },
                "https://www.netflix.com/in/login": {
                    "username": "/html/body/div[1]/div/div[3]/div/div/div[1]/form/div[1]/div[1]/div/label/input",
                    "password": "/html/body/div[1]/div/div[3]/div/div/div[1]/form/div[2]",
                    "login": "/html/body/div[1]/div/div[3]/div/div/div[1]/form/button"
                },
                "https://www.flipkart.com": {
                    "username": "/html/body/div[2]/div/div/div/div/div[2]/div/form/div[1]/input",
                    "password": "/html/body/div[2]/div/div/div/div/div[2]/div/form/div[2]/input",
                    "login": "/html/body/div[2]/div/div/div/div/div[2]/div/form/div[4]/button"
                },
                "http://www.vpropel.in/loginn": {
                    "username": "/html/body/div/div[2]/form/div[1]/input[1]",
                    "password": "/html/body/div/div[2]/form/div[2]/input",
                    "login": "/html/body/div/div[2]/form/div[4]/button"
                },
                "https://mail.rediff.com/cgi-bin/login.cgi": {
                    "username": "/html/body/div/div[1]/div[1]/div[2]/form/div[1]/div[2]/div[1]/div[2]/input",
                    "password": "/html/body/div/div[1]/div[1]/div[2]/form/div[1]/div[2]/div[2]/div[2]/input[1]",
                    "login": "/html/body/div/div[1]/div[1]/div[2]/form/div[1]/div[2]/div[2]/div[2]/input[2]"
                },
                "https://www.irctc.co.in/nget/train-search": {
                    "username": "/html/body/app-root/app-home/div[3]/app-login/p-dialog[1]/div/div/div[2]/div[2]/div/div[2]/div[2]/div[2]/form/div[1]/input",
                    "password": "/html/body/app-root/app-home/div[3]/app-login/p-dialog[1]/div/div/div[2]/div[2]/div/div[2]/div[2]/div[2]/form/div[2]/input",
                    "login": "/html/body/app-root/app-home/div[3]/app-login/p-dialog[1]/div/div/div[2]/div[2]/div/div[2]/div[2]/div[2]/form/span/button"
                },
                "https://www.shaadi.com": {
                    "username": "/html/body/div/div[13]/form/div[2]/div[2]/input",
                    "password": "/html/body/div/div[13]/form/div[2]/div[3]/input",
                    "login": "/html/body/div/div[13]/form/div[2]/button[1]"
                },
                "https://account.similarweb.com/login": {
                    "username": "/html/body/div[1]/div[1]/main/div/div/div[4]/form/div[1]/div/div[1]/input",
                    "password": "/html/body/div[1]/div[1]/main/div/div/div[4]/form/div[2]/div/div[1]/div/input",
                    "login": "/html/body/div[1]/div[1]/main/div/div/div[4]/form/button"
                },
                "https://newtrade.sharekhan.com": {
                    "username": "/html/body/div[1]/div[2]/div[1]/div[2]/div[2]/form/div[1]/div[3]/input",
                    "password": "/html/body/div[1]/div[1]/main/div/div/div[4]/form/div[2]/div/div[1]/div/input",
                    "login": "/html/body/div[1]/div[1]/main/div/div/div[4]/form/button"
                },
                "https://moodle.org/login/index.php": {
                    "username": "/html/body/div[1]/div[2]/div/div/section/div/div/div/div[1]/form/div[1]/div[1]/input",
                    "password": "/html/body/div[1]/div[2]/div/div/section/div/div/div/div[1]/form/div[1]/div[2]/input",
                    "login": "/html/body/div[1]/div[2]/div/div/section/div/div/div/div[1]/form/div[1]/button"
                },
                "https://moodle.org/login/index.php": {
                    "username": "/html/body/div[1]/div[2]/div[1]/div[3]/form/div[1]/div[1]/div/input",
                    "password": "/html/body/div[1]/div[2]/div[1]/div[3]/form/div[1]/div[2]/div/input",
                    "login": "/html/body/div[1]/div[2]/div[1]/div[3]/form/div[2]/div/input"
                },
                "https://moovit.vit.ac.in/login/index.php": {
                    "username": "/html/body/div[2]/div[2]/div/div/section/div/div[2]/div/div/div/div/div/div[1]/form/div[1]/input",
                    "password": "/html/body/div[2]/div[2]/div/div/section/div/div[2]/div/div/div/div/div/div[1]/form/div[2]/input",
                    "login": "/html/body/div[2]/div[2]/div/div/section/div/div[2]/div/div/div/div/div/div[1]/form/button"
                },
                "https://www.amazon.com/ap/signin": {
                    "username": "/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div/form/div/div[1]/input",
                    "password": "/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div/form/div/div[1]/input",
                    "login": "/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div/form/div/div[2]/span/span/input"
                }


            }

            console.log(tabs[0].url);
            const url = tabs[0].url;
            const key = Object.keys(allURLs).find(key => url.includes(key));
            console.log(key)
            let get_detail_url;

            if (key) {
                get_detail_url = `http://127.0.0.1:8000/api/data-detail/${key}`
            }
            else {
                get_detail_url = `http://127.0.0.1:8000/api/data-detail/${url}`
            }

            fetch(get_detail_url, {
                method: 'GET',
                headers: {
                    Authorization: `JWT ${token.access}`,
                }
            }).then(res => res.json()).then(res => {
                var userdata = JSON.parse(JSON.stringify(res))
                username = userdata.username
                password = userdata.password
                let someJSON = { "userName": username, "password": password, "url": url };
                console.log(userdata)
                console.log(someJSON)


                chrome.tabs.executeScript({
                    code: '(' + function (params) {

                        function getElementByXpath(path) {
                            console.log("Auto filling.......")
                            return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                        }

                        let allURLs = {
                            "https://www.facebook.com": {
                                "username": "//*[@id='email']",
                                "password": "//*[@id='pass']",
                                "login": "/html/body/div[1]/div[2]/div[1]/div/div/div/div[2]/div/div[1]/form/div[2]/button"
                            },
                            "https://www.linkedin.com/login": {
                                "username": "/html/body/div/main/div[2]/div[1]/form/div[1]/input",
                                "password": "/html/body/div/main/div[2]/div[1]/form/div[2]/input",
                                "login": "/html/body/div/main/div[2]/div[1]/form/div[3]/button"
                            },
                            "https://twitter.com/login": {
                                "username": "/html/body/div/div/div/div[2]/main/div/div/div[2]/form/div/div[1]/label/div/div[2]/div/input",
                                "password": "/html/body/div/div/div/div[2]/main/div/div/div[2]/form/div/div[2]/label/div/div[2]/div/input",
                                "login": "/html/body/div/div/div/div[2]/main/div/div/div[2]/form/div/div[3]/div/div/span/span"
                            },
                            "https://www.instagram.com": {
                                "username": "/html/body/div[1]/section/main/article/div[2]/div[1]/div/form/div/div[1]/div/label/input",
                                "password": "/html/body/div[1]/section/main/article/div[2]/div[1]/div/form/div/div[2]/div/label/input",
                                "login": "/html/body/div[1]/section/main/article/div[2]/div[1]/div/form/div/div[3]/button"
                            },
                            "https://github.com/login": {
                                "username": "/html/body/div[3]/main/div/div[4]/form/input[2]",
                                "password": "/html/body/div[3]/main/div/div[4]/form/div/input[1]",
                                "login": "/html/body/div[3]/main/div/div[4]/form/div/input[12]"
                            },
                            "https://vtop.vit.ac.in/vtop/initialProcess": {
                                "username": "/html/body/div[1]/div/section/div/div[2]/form/div[1]/input",
                                "password": "/html/body/div[1]/div/section/div/div[2]/form/div[2]/input",
                                "login": "/html/body/div[1]/div/section/div/div[2]/form/div[3]/div[3]/button"
                            },
                            "https://in.pinterest.com": {
                                "username": "/html/body/div[1]/div[1]/div/div/div/div[1]/div[2]/div[2]/div/div/div/div/div/div/div/div[4]/form/div[1]/fieldset/span/div/input",
                                "password": "/html/body/div[1]/div[1]/div/div/div/div[1]/div[2]/div[2]/div/div/div/div/div/div/div/div[4]/form/div[4]",
                                "login": "/html/body/div[1]/div[1]/div/div/div/div[1]/div[2]/div[2]/div/div/div/div/div/div/div/div[4]/form/div[5]/button"
                            },
                            "https://www.reddit.com/login": {
                                "username": "/html/body/div/main/div[1]/div/div[2]/form/fieldset[1]/input",
                                "password": "/html/body/div/main/div[1]/div/div[2]/form/fieldset[2]/input",
                                "login": "/html/body/div/main/div[1]/div/div[2]/form/fieldset[5]/button"
                            },
                            "https://www.quora.com": {
                                "username": "/html/body/div[2]/div[2]/div/div/div/div/div/div[2]/div[2]/div[2]/div[2]/input",
                                "password": "/html/body/div[2]/div[2]/div/div/div/div/div/div[2]/div[2]/div[3]",
                                "login": "/html/body/div[2]/div[2]/div/div/div/div/div/div[2]/div[2]/div[4]"
                            },
                            "https://www.netflix.com/in/login": {
                                "username": "/html/body/div[1]/div/div[3]/div/div/div[1]/form/div[1]/div[1]/div/label/input",
                                "password": "/html/body/div[1]/div/div[3]/div/div/div[1]/form/div[2]",
                                "login": "/html/body/div[1]/div/div[3]/div/div/div[1]/form/button"
                            },
                            "https://www.flipkart.com": {
                                "username": "/html/body/div[2]/div/div/div/div/div[2]/div/form/div[1]/input",
                                "password": "/html/body/div[2]/div/div/div/div/div[2]/div/form/div[2]/input",
                                "login": "/html/body/div[2]/div/div/div/div/div[2]/div/form/div[4]/button"
                            },
                            "http://www.vpropel.in/loginn": {
                                "username": "/html/body/div/div[2]/form/div[1]/input[1]",
                                "password": "/html/body/div/div[2]/form/div[2]/input",
                                "login": "/html/body/div/div[2]/form/div[4]/button"
                            },
                            "https://mail.rediff.com/cgi-bin/login.cgi": {
                                "username": "/html/body/div/div[1]/div[1]/div[2]/form/div[1]/div[2]/div[1]/div[2]/input",
                                "password": "/html/body/div/div[1]/div[1]/div[2]/form/div[1]/div[2]/div[2]/div[2]/input[1]",
                                "login": "/html/body/div/div[1]/div[1]/div[2]/form/div[1]/div[2]/div[2]/div[2]/input[2]"
                            },
                            "https://www.irctc.co.in/nget/train-search": {
                                "username": "/html/body/app-root/app-home/div[3]/app-login/p-dialog[1]/div/div/div[2]/div[2]/div/div[2]/div[2]/div[2]/form/div[1]/input",
                                "password": "/html/body/app-root/app-home/div[3]/app-login/p-dialog[1]/div/div/div[2]/div[2]/div/div[2]/div[2]/div[2]/form/div[2]/input",
                                "login": "/html/body/app-root/app-home/div[3]/app-login/p-dialog[1]/div/div/div[2]/div[2]/div/div[2]/div[2]/div[2]/form/span/button"
                            },
                            "https://www.shaadi.com": {
                                "username": "/html/body/div/div[13]/form/div[2]/div[2]/input",
                                "password": "/html/body/div/div[13]/form/div[2]/div[3]/input",
                                "login": "/html/body/div/div[13]/form/div[2]/button[1]"
                            },
                            "https://account.similarweb.com/login": {
                                "username": "/html/body/div[1]/div[1]/main/div/div/div[4]/form/div[1]/div/div[1]/input",
                                "password": "/html/body/div[1]/div[1]/main/div/div/div[4]/form/div[2]/div/div[1]/div/input",
                                "login": "/html/body/div[1]/div[1]/main/div/div/div[4]/form/button"
                            },
                            "https://newtrade.sharekhan.com": {
                                "username": "/html/body/div[1]/div[2]/div[1]/div[2]/div[2]/form/div[1]/div[3]/input",
                                "password": "/html/body/div[1]/div[1]/main/div/div/div[4]/form/div[2]/div/div[1]/div/input",
                                "login": "/html/body/div[1]/div[1]/main/div/div/div[4]/form/button"
                            },
                            "https://moodle.org/login/index.php": {
                                "username": "/html/body/div[1]/div[2]/div/div/section/div/div/div/div[1]/form/div[1]/div[1]/input",
                                "password": "/html/body/div[1]/div[2]/div/div/section/div/div/div/div[1]/form/div[1]/div[2]/input",
                                "login": "/html/body/div[1]/div[2]/div/div/section/div/div/div/div[1]/form/div[1]/button"
                            },
                            "https://moodle.org/login/index.php": {
                                "username": "/html/body/div[1]/div[2]/div[1]/div[3]/form/div[1]/div[1]/div/input",
                                "password": "/html/body/div[1]/div[2]/div[1]/div[3]/form/div[1]/div[2]/div/input",
                                "login": "/html/body/div[1]/div[2]/div[1]/div[3]/form/div[2]/div/input"
                            },
                            "https://moovit.vit.ac.in/login/index.php": {
                                "username": "/html/body/div[2]/div[2]/div/div/section/div/div[2]/div/div/div/div/div/div[1]/form/div[1]/input",
                                "password": "/html/body/div[2]/div[2]/div/div/section/div/div[2]/div/div/div/div/div/div[1]/form/div[2]/input",
                                "login": "/html/body/div[2]/div[2]/div/div/section/div/div[2]/div/div/div/div/div/div[1]/form/button"
                            },
                            "https://www.amazon.com/ap/signin": {
                                "username": "/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div/form/div/div[1]/input",
                                "password": "/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div/form/div/div[1]/input",
                                "login": "/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div/form/div/div[2]/span/span/input"
                            }


                        }
                        // console.log(params.url)
                        // console.log(allURLs[params.url].username)

                        console.log("hello")
                        const key = Object.keys(allURLs).find(key => params.url.includes(key));
                        console.log(key)
                        if (key) {
                            getElementByXpath(allURLs[key].username).addEventListener("click", () => {
                                getElementByXpath(allURLs[key].username).value = params.userName;
                                console.log("hello in");
                            }
                            );
                            // getElementByXpath(allURLs[key].username).click();
                            getElementByXpath(allURLs[key].username).value = params.userName;
                            // getElementByXpath(allURLs[key].password).focus();
                            getElementByXpath(allURLs[key].password).value = params.password;
                            getElementByXpath(allURLs[key].login).click();
                        }
                        else {
                            var inputs = document.getElementsByTagName("input");
                            for (var i = 1; i < inputs.length; i++) {
                                if (inputs[i].type == "password") {
                                    inputs[i - 1].value = params.userName;
                                    inputs[i].value = params.password;
                                    break;
                                }
                            }
                        }
                        return { success: true, html: document.body.innerHTML };
                    } + ')(' + JSON.stringify(someJSON) + ');'
                });
            }).catch(function (error) {
                document.getElementById('pop_msg').innerHTML = "No password found";
                console.log(error);
            });
        });
};

trigger.addEventListener('click', async (e) => {
    e.preventDefault();
    let PIN = document.getElementById("userInput").value;
    var fdata = new FormData()
    fdata.append('pin', PIN)
    await fetch('http://127.0.0.1:8000/api/checkpattern/', {
        method: 'POST',
        headers: {
            Authorization: `JWT ${token.access}`,
        },
        body: fdata,
    }).then(res => res = res.json()).then(res => {
        if (res.PIN == "Matched") {
            autofill()
        }
        else {
            document.getElementById("err").innerHTML = "PIN Not Matched";
        }
    }).catch((error) => {
        console.log(error)
    })
}
)