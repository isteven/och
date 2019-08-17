/* this is the active environment */
var environment = 'local';

/* insert required environment config items here */
var environmentConfigs = {

    local: {
        apiUrl: 'http://stg.craftandcode.com.sg/clients/rws/hhn6/',
        gameId: 1 // Old Changi Hospital
    },
    uat: {
        apiUrl: 'http://stg.craftandcode.com.sg/clients/rws/hhn6/',
        gameId: 1 // Old Changi Hospital
    },
    prod: {
        apiUrl: 'http://halloweenhorrornights.com.sg/',
        gameId: 1 // Old Changi Hospital
    }
};

/*
 * These are global configs, which will be injected into environmentConfigs
 * so you have to use use different variable names with the environmentConfigs.
 */
var globalConfigs = {
    apiVersion: 'v1.0',
    dateFormat: 'DD MMMM YYYY',
    dateTimeFormat: 'DD MMMM YYYY, HH:mm'
};

var configGet = function (property) {
    return environmentConfigs[environment][property];
}

var fb_share_url = 'http://stg.craftandcode.com.sg/clients/rws/hhn6/';
var fb_share_image = 'https://rws-hhn6-s3.s3.amazonaws.com/game/och/share/FB_OCH.jpg';
var fb_share_desc_en = 'As Singapore\'s bloodiest past comes back alive, will you be able to escape the evil that lurks within? A haunting awaits with exciting prizes. Click to learn more.';
var fb_share_desc_cn = '新加坡最具血腥的历史再次重演，邪灵伺机而动，你能够逃脱吗？ 危机与奖励并存。点击获取更多信息。';

var twitter_share_url = 'http://stg.craftandcode.com.sg/clients/rws/hhn6/game/twitter';

var weibo_share_url = 'http://stg.craftandcode.com.sg/clients/rws/hhn6/game/weibo';
var weibo_share_image = 'https://rws-hhn6-s3.s3.amazonaws.com/game/och/share/weibo_OCH.jpg';

//var cdn_url = "https://dg0l7q9c72lxu.cloudfront.net/game";
var cdn_url = "img/";

// DON'T TOUCH THESE...

window.languageSet = [];
window.languageSet['en'] = [];
window.languageSet['zh'] = [];
window.languageSet['en']['clue'] = [];
window.languageSet['zh']['clue'] = [];

// LANDING PAGE

window.languageSet['en']['title-landing'] = 'Old Changi Hospital ';
window.languageSet['zh']['title-landing'] = '旧樟宜阴魂';

window.languageSet['en']['intro'] = 'Evil takes form in the derelict hallways of <span style="white-space: nowrap;" >Old Changi Hospital </span> as vengeful souls rise once again in the dead of the night. Will Singapore\'s bloodiest history repeat itself?';
window.languageSet['zh']['intro'] = '夜深人静之时，复仇之魂再次燃起。在旧樟宜医院废旧的走廊之上，邪灵缓缓现身。新加坡最具血腥的历史将会重演吗？';

window.languageSet['en']['instruction'] = 'TO SURVIVE THIS TEST, YOU MUST KNOW EVIL BY NAME ';
window.languageSet['zh']['instruction'] = '想要通过这一关，你必须知道邪灵的名字。';

window.languageSet['en']['icon-text-1'] = 'Look for hidden clues with the help of an EMF indicator.';
window.languageSet['zh']['icon-text-1'] = '你可以在鬼魂探测仪的帮助下<br/>搜寻隐藏的线索。';

window.languageSet['en']['icon-text-2'] = 'Snap a photo when the EMF indicator peaks.';
window.languageSet['zh']['icon-text-2'] = '在鬼魂探测仪达到峰值时<br/>进行抓拍';

window.languageSet['en']['icon-text-3'] = 'Collect all 3 clues to unravel the name.';
window.languageSet['zh']['icon-text-3'] = '搜集三个线索，解开姓名之谜';

window.languageSet['en']['icon-text-4'] = 'Time is the key to higher chances of winning.';
window.languageSet['zh']['icon-text-4'] = '争分夺秒是获胜的关键';

window.languageSet['en']['start-button'] = 'ENTER THE HALLS OF EVIL';
window.languageSet['zh']['start-button'] = '走进邪灵之厅';

// FAIL PAGE

window.languageSet['en']['title-fail'] = 'The Past Has<br/>Caught Up To You';
window.languageSet['zh']['title-fail'] = '过去已然逝去';

window.languageSet['en']['intro-fail'] = 'However, history tends to repeat itself.<br/>You\'ve been given another chance to unravel<br/>the true name of evil.';
window.languageSet['zh']['intro-fail'] = '但历史还将重演。<br/>你还有一次机会去探寻邪灵真正的名字。';

window.languageSet['en']['retry-button'] = 'TRY AGAIN';
window.languageSet['zh']['retry-button'] = '再试一次';

// COMPLETE (SHARING) PAGE

window.languageSet['en']['title-share'] = 'Spread The Word Of Evil';
window.languageSet['zh']['title-share'] = '散播邪灵之语';

window.languageSet['en']['intro-share'] = 'Stand a chance to win 2 pairs of ticket to Halloween Horror Nights 6 by sharing your survival with friends.';
window.languageSet['zh']['intro-share'] = '向朋友分享闯关成功的消息，即有机会赢取一份独家礼包。';

window.languageSet['en']['share-and-win'] = 'SHARE & WIN NOW ';
window.languageSet['zh']['share-and-win'] = '立即分享，赢取奖励';

window.languageSet['en']['your-time'] = 'YOUR TIME ';
window.languageSet['zh']['your-time'] = '你的时间记录';

window.languageSet['en']['terms-and-conditions'] = 'Terms & conditions ';
window.languageSet['zh']['terms-and-conditions'] = '须遵循';

window.languageSet['en']['terms-and-conditions-apply'] = 'apply.';
window.languageSet['zh']['terms-and-conditions-apply'] = '条款与条件。';

window.languageSet['en']['leaderboard'] = 'LEADERBOARD';
window.languageSet['zh']['leaderboard'] = '排行榜';

window.languageSet['en']['replay'] = 'REPLAY';
window.languageSet['zh']['replay'] = '重试';

window.languageSet['en']['code-instruction'] = 'Collect all 5 codes to<br/> unlock the final haunting.';
window.languageSet['zh']['code-instruction'] = '重试集齐 5 个代码方可解锁终极鬼屋';

window.languageSet['en']['code-download'] = 'DOWNLOAD IMAGE';
window.languageSet['zh']['code-download'] = '下载图片';

// GAME

window.languageSet['en']['who-am-i'] = 'Who Am I';
window.languageSet['zh']['who-am-i'] = '我是谁？';

window.languageSet['en']['not-in-my-name-1'] = 'THERE\'S NO';
window.languageSet['zh']['not-in-my-name-1'] = '我的名字里没有';

window.languageSet['en']['not-in-my-name-2'] = 'IN MY NAME';
window.languageSet['zh']['not-in-my-name-2'] = '字母';

window.languageSet['en']['tries-left-1'] = 'YOU HAVE ';
window.languageSet['zh']['tries-left-1'] = '你还有';

window.languageSet['en']['tries-left-2'] = 'TRIES LEFT ';
window.languageSet['zh']['tries-left-2'] = '次机会。';

window.languageSet['en']['enter-letter'] = 'Enter a letter to unravel the name';
window.languageSet['zh']['enter-letter'] = '输入字母，解开姓名之谜';

window.languageSet['en']['enter-button'] = 'ENTER';
window.languageSet['zh']['enter-button'] = '输入';

window.languageSet['en']['not-yet-over'] = 'This Is Yet To be Over';
window.languageSet['zh']['not-yet-over'] = '尚未结束';

window.languageSet['en']['how-many-nights'] = 'How many nights will Halloween Horror Nights 6 be held?';
window.languageSet['zh']['how-many-nights'] = '万圣节惊魂夜6现场活动<br>将持续多久？';

window.languageSet['en']['collected-all-clue-copy'] = 'You have collected all the clues.';
window.languageSet['zh']['collected-all-clue-copy'] = '你已收集所有线索';

window.languageSet['en']['guess-name-button'] = 'GUESS THE NAME NOW';
window.languageSet['zh']['guess-name-button'] = '猜测姓名';

var myApp = angular.module('myApp', []);

myApp.controller('bodyCtrl', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {

    var gameStartTime = null;
    var gameEndTime = null;
    $scope.elapsedGameTime = null;

    $scope.gameIsLoaded = false;

    $scope.menu = {};
    $scope.menu.active = false;
    $scope.footer = {};
    $scope.footer.section = '';
    $scope.footer.popupActive = false;
    $scope.guessCorrect = true;
    $scope.failLetter = '';
    $scope.triesLeft = 5;
    $scope.singleLetter = '';
    $scope.dates = [{
        date: 10
    }, {
        date: 12
    }, {
        date: 14
    }, {
        date: 16
    }, {
        date: 18
    },];

    $scope.lang = 'en';

    var nameArr1 = [];
    var nameArr2 = [];
    nameArr1['zh'] = [{
        letter: '玫',
        display: false
    }, {
        letter: '瑰',
        display: false
    },];
    nameArr1['en'] = [{
        letter: 'r',
        display: false
    }, {
        letter: 'o',
        display: false
    }, {
        letter: 's',
        display: false
    }, {
        letter: 'e',
        display: false
    }];
    nameArr2['zh'] = [];
    nameArr2['en'] = [{
        letter: 's',
        display: false
    }, {
        letter: 'o',
        display: false
    }, {
        letter: 'r',
        display: false
    }, {
        letter: 'f',
        display: false
    }, {
        letter: 'i',
        display: false
    }, {
        letter: 'n',
        display: false
    }, {
        letter: 'a',
        display: false
    }];

    // $scope.entry1to5 = [
    //   { idxString: '01', time: 0},
    //   { idxString: '02', time: 0},
    //   { idxString: '03', time: 0},
    //   { idxString: '04', time: 0},
    //   { idxString: '05', time: 0}  ];
    // $scope.entry2to5 = [
    //   { idxString: '06', time: 0},
    //   { idxString: '07', time: 0},
    //   { idxString: '08', time: 0},
    //   { idxString: '09', time: 0},
    //   { idxString: '10', time: 0}  ];

    $scope.entryResult = [
        { idxString: '01', time: 0 },
        { idxString: '02', time: 0 },
        { idxString: '03', time: 0 },
        { idxString: '04', time: 0 },
        { idxString: '05', time: 0 },
        { idxString: '06', time: 0 },
        { idxString: '07', time: 0 },
        { idxString: '08', time: 0 },
        { idxString: '09', time: 0 },
        { idxString: '10', time: 0 }
    ];

    // $scope.entry1to5 = [];
    // $scope.entry2to5 = [];

    var frameQty = [9, 8, 7, 8, 6, 8, 6, 8, 8];
    var masterPontianakIdx = 1;

    $scope.showFooterPopup = function (type) {
        $scope.footer.popupActive = true;
        $scope.footer.section = type;
    }

    $scope.hideFooterPopup = function (type) {
        $scope.footer.popupActive = false;
    }

    $scope.getContent = function (index, html) {
        // console.log( index, $scope.lang, window.languageSet[ $scope.lang ][ index ] );
        if (html) {
            return $sce.trustAsHtml(window.languageSet[$scope.lang][index]);
        } else {
            return window.languageSet[$scope.lang][index];
        }
    }


    function getUrlVar(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return (false);
    }

    function searchArrayOfObject(searchKeyword, propertyToSearch, myArrayOrObject) {
        var result = [];
        for (var i = 0; i < myArrayOrObject.length; i++) {
            if (myArrayOrObject[i][propertyToSearch].toUpperCase() === searchKeyword.toUpperCase()) {
                result.push(i);
            }
        }
        return result;
    }

    function pad(pad, str, padLeft) {
        if (typeof str === 'undefined')
            return pad;
        if (padLeft) {
            return (pad + str).slice(-pad.length);
        } else {
            return (str + pad).substring(0, pad.length);
        }
    }

    $scope.playSfx = function (param) {
        window.playSfx(param);
    }

    $scope.checkName = function () {
        if ($scope.singleLetter != '' && $('#pageGuessName .btnBlood').hasClass('active')) {
            // $( '.pontianak' + masterPontianakIdx - 1 ).spStop();
            var letterIsCorrect = false;
            var result1 = searchArrayOfObject($scope.singleLetter, 'letter', $scope.name1);
            var result2 = searchArrayOfObject($scope.singleLetter, 'letter', $scope.name2);
            if (result1.length > 0) {
                angular.forEach(result1, function (value, key) {
                    $scope.name1[value].display = true;
                });
                letterIsCorrect = true;
                $scope.guessCorrect = true;
            }
            if (result2.length > 0) {
                angular.forEach(result2, function (value, key) {
                    $scope.name2[value].display = true;
                });
                letterIsCorrect = true;
                $scope.guessCorrect = true;
            }
            // if wrong answer
            if (!letterIsCorrect) {
                if ($scope.triesLeft == 5) {
                    $scope.playSfx('pon-appear');
                }
                $scope.guessCorrect = false;
                $scope.failLetter = $scope.singleLetter;
                if ($scope.triesLeft > 1) {
                    console.log('still have chance');
                    window.animatePontianakError($scope.triesLeft, true);
                } else {

                    console.log('used up chances');
                    $scope.playSfx('pon-dash');
                    window.animatePontianakError($scope.triesLeft);

                    if (Modernizr.mq('(max-width: 769px)')) {
                        //  Mobile and tablet has more animation frames,
                        //  so duration needs slightly longer
                        setTimeout(function () {
                            // hidePage( '#pageGuessName' );
                            showPage('#pageFails');
                            $scope.playSfx('user-fails');
                        }, 1000);
                    } else {
                        setTimeout(function () {
                            // hidePage( '#pageGuessName' );
                            showPage('#pageFails');
                            $scope.playSfx('user-fails');
                        }, 800);
                    }
                }
                $scope.triesLeft--;
            }

            // if correct answer
            else {
                var nameIsCorrect = true;
                angular.forEach($scope.name1, function (value, key) {
                    // console.log( value );
                    if (!value.display) {
                        nameIsCorrect = false;
                    }
                });
                angular.forEach($scope.name2, function (value, key) {
                    // console.log( value );
                    if (!value.display) {
                        nameIsCorrect = false;
                    }
                });
                if (nameIsCorrect) {
                    console.log('correct answer page switch');
                    // hidePage('#pageGuessName');
                    // showPage('#pageGuessDate');
                    // window.animatePontianakSpecial();
                    $scope.playSfx('pon-dash');
                    window.animatePontianakError(1);

                    if (Modernizr.mq('(max-width: 769px)')) {
                        //  Mobile and tablet has more animation frames,
                        //  so duration needs slightly longer
                        window.setTimeout(function () {
                            // document.activeElement.blur();
                            $('.cluesCtr').hide();
                            hidePage('#pageGuessName');
                            $('#pageGuessDate').show();
                            showPage('#pageGuessDate .single-column');

                        }, 1000);
                    } else {
                        window.setTimeout(function () {
                            // document.activeElement.blur();
                            $('.cluesCtr').hide();
                            hidePage('#pageGuessName');
                            $('#pageGuessDate').show();

                            showPage('#pageGuessDate .single-column');
                        }, 500);
                    }


                }
            }

            // just reset stuff
            $scope.singleLetter = '';
        }
    }

    $scope.initiateJumpScare = function () {
        $('.pontianakBox div').fadeOut(800);
        var pontianakIdx = ((5 - triesLeft) * 2) + 1;
        console.log('pontianak index:' + pontianakIdx);
        $('.pontianak' + pontianakIdx).show();
        $('.pontianak' + pontianakIdx).sprite({
            no_of_frames: frameQty[pontianakIdx - 1],
            fps: 8,
            play_frames: frameQty[pontianakIdx - 1]
        });
    }

    $scope.showPage = function (domString) {
        window.showPage(domString);
    }

    $scope.hidePage = function (domString) {
        window.hidePage(domString);
    }

    $scope.checkDate = function (date) {
        if (date == 16) {
            calculateGameTime();
            loadLeaderboard();
            hidePage('#pageGuessDate');
            showPage('#pageShare');
            $('#ftr__credit').hide();
        } else {
            $scope.playSfx('user-fails');
            hidePage('#pageGuessDate');
            showPage('#pageFails');
        }
    }

    loadLeaderboard = function () {
        // console.log('loadleaderboard');

        // var result = [{"id":48,"time":22644},{"id":46,"time":22692},{"id":45,"time":24211},{"id":47,"time":28202},{"id":44,"time":30356},{"id":41,"time":36683},{"id":42,"time":36879},{"id":43,"time":36879}];
        //
        // for( var i = 1; i <= 10; i++ ) {
        //
        //   if ( result[i] !== undefined ) {
        //
        //     $scope.entryResult[i-1].time = result[i].time;
        //
        //   }
        //
        // }

        $http({
            method: 'GET',
            url: configGet('apiUrl') + 'game/board/1',
        }).then(
            function (success) {
                // var idx = 0;
                // angular.forEach(success.data, function(value, key) {
                //     //console.log( value );
                //     var paddedIdx = pad('00', (idx + 1), true);
                //     if (idx < 5) {
                //         $scope.entry1to5.push({
                //             idxString: paddedIdx,
                //             time: value.time
                //         });
                //     } else if (idx < 10) {
                //         $scope.entry2to5.push({
                //             idxString: paddedIdx,
                //             time: value.time
                //         });
                //     }
                //     idx++;
                // });

                for (var i = 0; i < 10; i++) {

                    if (success.data[i] !== undefined) {

                        $scope.entryResult[i].time = success.data[i].time;

                    }

                }

            },
            function (error) {
                console.log(error);
            }
        );
    }

    var calculateGameTime = function () {
        gameEndTime = performance.now();
        $scope.elapsedGameTime = gameEndTime - gameStartTime;
        console.log('elapsed game time (ms): ' + $scope.elapsedGameTime);
        console.log('elapsed game time (s): ' + $scope.elapsedGameTime * 0.001);
    }

    $scope.millisToMinutesAndSeconds = function (millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        var paddedMinutes = pad('00', minutes, true);
        return paddedMinutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    $scope.share_facebook = function () {
        /*
        if (window.fbLoggedIn) {
            fbPost(window.fbResponse.authResponse.userID, window.fbResponse);
        } else {
            FB.login(function (response) {
                if (response.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');
                    FB.api('/me', function (response) {
                        console.log(response);
                        fbPost(response.id, response);
                        // console.log('Good to see you, ' + response.name + '.');
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            });
        }
        */
        /*
        FB.getLoginStatus(function(response ) {
            if (response.status === 'connected') {
                console.log('FB logged in');
                console.log(response );
                fbPost( response.authResponse.userID, response );
            } else {
                FB.login(function(response) {
                    if (response.authResponse) {
                        console.log('Welcome!  Fetching your information.... ');
                        FB.api('/me', function(response) {
                            console.log( response );
                            fbPost( response.id, response );
                            // console.log('Good to see you, ' + response.name + '.');
                        });
                    } else {
                        console.log('User cancelled login or did not fully authorize.');
                    }
                });
                // alert('Please login into your Facebook account.');
            }
        });
        */
    }

    $scope.share_twitter = function () {
        // window.open(
        //     twitter_share_url + '?gameId=' + configGet('gameId') + '&gameTime=' + $scope.elapsedGameTime,
        //     '1468140690854',
        //     'width=400,height=300,toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=1,left=0,top=0'
        // );
    }

    $scope.share_weibo = function () {
        // window.open(
        //     weibo_share_url + '?gameId=' + configGet('gameId') + '&gameTime=' + $scope.elapsedGameTime + '&gameShareImage=' + weibo_share_image,
        //     'weibowindow',
        //     'width=400,height=300,toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=1,left=0,top=0'
        // )
    }

    var fbPost = function (fbId, response1) {
        /*
        var game_url = fb_share_url + $scope.lang + '/games/och';
        var desc = fb_share_desc_en;

        if ($scope.lang == 'zh') {
            desc = fb_share_desc_cn;
        }

        FB.api(
            "/" + fbId,
            function (response2) {
                if (response2 && !response2.error) {
                    console.log('FB get user info');
                    console.log(response2);
                    FB.ui({
                        // method: 'share',
                        method: 'feed',
                        link: game_url,
                        description: desc,
                        // caption: 'this is the caption',
                        picture: fb_share_image,
                        display: 'popup',
                        // href: fb_share_url,
                    }, function (response3) {
                        console.log('FB posting.. ')
                        var tempEmail = response2.email;
                        if (!tempEmail) {
                            tempEmail = '';
                        }
                        var tempPhone = response2.phone;
                        if (!tempPhone) {
                            tempPhone = '';
                        }
                        var dataToSend = {
                            game: configGet('gameId'),
                            account: 'facebook',
                            user_name: fbId,
                            full_name: response2.name,
                            time: Math.round(Number($scope.elapsedGameTime)),
                            email: tempEmail,
                            phone: tempPhone
                        };
                        postToDb(dataToSend);
                    });
                }
            }
        );
        */
    }

    // $scope.share_twitter = function() {
    //     console.log('share_twitter()');
    //     $http({
    //         method: 'POST',
    //
    //         url: 'https://api.twitter.com/1.1/statuses/update.json?status=http://www.halloweenhorrornights.com.sg/',
    //         dataType: 'jsonp'
    //     }).then(
    //         function( success ) {
    //             console.log( 'tw success' );
    //             console.log( success );
    //             postToDbJq( 'twitter', success );
    //         },
    //         function ( error ) {
    //             console.log( 'tw error' );
    //             console.log( error );
    //         }
    //     )
    //
    // }

    var postToDb = function (param) {
        /*
        console.log('postToDb()');
        $http({
            method: 'POST',
            url: configGet('apiUrl') + 'game/submit',
            data: param
        }).then(
            function (success) {
                console.log('postToDb success');
                console.log(success);
            },
            function (error) {
                console.log('postToDb ERROR');
                console.log(error);
            }
        );
        */
    }

    $scope.startGame = function () {

        gameStartTime = performance.now();

        $scope.guessCorrect = true;
        $scope.failLetter = '';
        $scope.triesLeft = 5;
        $scope.singleLetter = '';
        $scope.menu.active = false;

        $scope.name1 = angular.copy(nameArr1[$scope.lang]);
        $scope.name2 = angular.copy(nameArr2[$scope.lang]);

        // showPage( '#pano' );
        // hidePage('.fadePage');
        $('.preloader').hide();
        $('#pageLanding').fadeOut(400);
        // hidePage('#pageFails');
        // $('.pontianakBox div').hide();
        showPage('.emf__container');
        $('.cluesCtr').addClass('active');

        hidePage('#pageGuessDate .single-column');

    }


    var tempLang = getUrlVar('lang');
    if (tempLang) {
        $scope.lang = tempLang.toLowerCase();
        if ($scope.lang != 'en' && $scope.lang != 'zh') {
            $scope.lang = 'en';
        }
    }

    /* TNC Toggle */
    $scope.tncToggle = function () {
        console.log('tnc toggle');
        $scope.$broadcast('tnc.toggle');
    }


    /*
    *   PRELOADER FOR IMAGES AND AUDIOS
    */
    var loadManifest = function ($data, callback) {

        $http({
            method: 'GET',
            url: 'manifest/manifest-och.json',
        }).then(
            function (success) {
                loadImages(success.data);
                // console.log(success.data);
            },
            function (error) {
                console.log(error);
            }
        );

    };

    var loadImages = function ($data) {

        var count = 0;

        angular.forEach($data.images, function (value, key) {

            var img = new Image();

            img.onload = function () {
                count++;
                if (count === $data.images.length) {
                    //after loading images, proceed to load audios
                    $scope.gameIsLoaded = true;
                    loadAudios();

                }
            };

            img.src = 'img/' + value;
            //img.src = cdn_url + '/' + value;
        });

    };

    var audioFiles = [
        cdn_url + "/och/audio/bgm.mp3",
        cdn_url + "/och/audio/takephoto.mp3",
        cdn_url + "/och/audio/jumpscare.mp3",
        cdn_url + "/och/audio/pon_appear.mp3",
        cdn_url + "/och/audio/pon_dash.mp3",
        cdn_url + "/och/audio/fail.mp3"
    ];

    var preloadAudio = function (url) {
        var audio = new Audio();
        // once this file loads, it will call loadedAudio()
        // the file will be kept by the browser as cache
        audio.addEventListener('canplaythrough', loadedAudio, false);
        audio.src = url;
    };

    var loadAudios = function () {

        for (var i in audioFiles) {
            preloadAudio(audioFiles[i]);
        }
    };

    var loaded = 0;
    function loadedAudio() {
        // this will be called every time an audio file is loaded
        // we keep track of the loaded files vs the requested files
        loaded++;
        if (loaded == audioFiles.length) {
            // all have loaded
            // showPage('#pageLanding');
            $('.preloader').fadeOut(400);
            // showPage('#pageLanding');
        }
    }

    //  on first load, show preloader first and load the assets
    if (!$scope.gameIsLoaded) {
        showPage('.preloader');
        loadManifest();
        // hidePage('.preloader');
    }

    showPage('#pageLanding');

    // $scope.startGame();
    // hidePage( '#pano' );
    // showPage('#pageGuessName');
    // showPage('#pageShare');
    // showPage('#pageGuessDate');
    // showPage( '#pageFails');


    // setTimeout( function() {
    //     $scope.share_facebook();
    // }, 1000 );
}]);

var APP_DATA = {
    "scenes": [{
        "id": "0-scene-1",
        "name": "Level 1",
        "zh_name": "1级",
        "faceSize": 1024,
        "initialViewParameters": {
            "yaw": -1.2,
            "pitch": 0,
            "fov": 1.5707963267948966
        },
        "linkHotspots": [{
            "yaw": 0.54,
            "pitch": -0.25,
            "rotation": 0,
            "target": "0-scene-2"
        }],
        "propHotspots": [{
            "path": "img/scene-0-props/scene1_b_light.png",
            "width": "296",
            "height": "251",
            "frames": "8",
            "yaw": 2.69,
            "pitch": -0.55,
            "radius": 650,
            "extraRotations": "rotate(-9deg)"

        }]
    }, {
        "id": "0-scene-2",
        "name": "Level 2",
        "zh_name": "2级",
        "levels": [{
            "tileSize": 256,
            "size": 256,
            "fallbackOnly": true
        }, {
            "tileSize": 512,
            "size": 512
        }],
        "faceSize": 2048,
        "initialViewParameters": {
            "yaw": -1.6,
            "pitch": 0,
            "fov": 1.5707963267948966
        },
        "linkHotspots": [{
            "yaw": 2.23,
            "pitch": 0.0176340532339251865,
            "rotation": 0,
            "target": "0-scene-1"
        }, {
            "yaw": -0.32,
            "pitch": 0.0176340532339251865,
            "rotation": 0,
            "target": "0-scene-3"
        }],
    }, {
        "id": "0-scene-3",
        "name": "Ward",
        "zh_name": "病房",
        "levels": [{
            "tileSize": 256,
            "size": 256,
            "fallbackOnly": true
        }, {
            "tileSize": 512,
            "size": 512
        }],
        "faceSize": 2048,
        "initialViewParameters": {
            "yaw": 1.2,
            "pitch": 0,
            "fov": 1.5707963267948966
        },
        "linkHotspots": [{
            "yaw": 5.52678386676067,
            "pitch": -0.0176340532339251865,
            "rotation": 0,
            "target": "0-scene-2"
        }],
    }],
    "name": "Project Title",
    "settings": {
        "mouseViewMode": "drag",
        "autorotateEnabled": false,
        "fullscreenButton": false,
        "viewControlButtons": false
    }
};

'use strict';

var Marzipano = window.Marzipano;
var APP_DATA = window.APP_DATA;
var activeScene = null;
var globalView = null;
var shownScare = false;
var timeoutID;

// Grab elements from DOM.
var panoElement = document.querySelector('#pano');

var AnimateSprite = function (el, frameWidth, frameHeight, numCols, totalFrame, duration, currentFrameNo, onAnimateEnd) {
    if (!el || el.length == 0) return;

    var repeatAnimate = el.data('is-repeat') != undefined ? el.data('is-repeat') : 0;
    var tl = new TimelineMax({
        onComplete: animateEnd,
        repeat: repeatAnimate,
        repeatDelay: 1
    });

    for (var i = 0, numRows = Math.ceil(totalFrame / numCols); i < numRows; i++) {

        var numFrames = Math.min(numCols, totalFrame - (i * numCols)),
            steppedEase = new SteppedEase(numFrames - 1);

        tl.append(TweenMax.fromTo(
            el, duration, {
                backgroundPosition: '0 -' + (frameHeight * i) + 'px'
            }, {
                backgroundPosition: '-' + (frameWidth * (numFrames - 1)) + 'px -' + (frameHeight * i) + 'px',
                ease: steppedEase,
                immediateRender: false
            }
        ));
    }

    function animateEnd() {

        //when animation done, enable the pontianak to shiver
        if (typeof onAnimateEnd == 'function') {
            onAnimateEnd(currentFrameNo);
        }
    }

};

var jumpScare = {
    scare: function (status) {
        $('#scare').show();
        $('.scare-overlay').addClass('active');
        playSfx('jump-scare');
        shownScare = true;

        if (Modernizr.mq('(max-width: 700px)')) {
            var element = document.querySelector('#scare');
            var sprite = new Motio(element, {
                fps: 18,
                frames: 10
            });
            sprite.to(9);

            sprite.on('frame', function (eventName) {
                if (this.frame == 9) {
                    $('#scare').hide();
                    $('.scare-overlay').removeClass('active');
                }
            });
        } else {
            AnimateSprite($('#scare'), 974, 1119, 5, 10, 0.5, 0, function () {
                $('#scare').hide();
                $('.scare-overlay').removeClass('active');
            });
        }


        this.timeoutID = undefined;
    },
    setup: function () {
        this.timeoutID = window.setTimeout(function (status) {
            this.scare(status);
        }.bind(this), 6000);
    },

    cancel: function () {
        window.clearTimeout(this.timeoutID);
        this.timeoutID = undefined;
    }
};

// Viewer options.
var viewerOpts = {
    controls: {
        mouseViewMode: APP_DATA.settings.mouseViewMode
    }
};

// Initialize viewer.
var viewer = new Marzipano.Viewer(panoElement, viewerOpts);

// Register the custom control method.
var deviceOrientationControlMethod = new DeviceOrientationControlMethod();
var controls = viewer.controls();
controls.registerMethod('deviceOrientation', deviceOrientationControlMethod);

// Enable custom control method
controls.enableMethod('deviceOrientation');

// Create scenes.
var scenes = APP_DATA.scenes.map(function (sceneData) {

    // var source = Marzipano.ImageUrlSource.fromString("img/och/" + sceneData.id + "/{f}.jpg");
    var source = Marzipano.ImageUrlSource.fromString(cdn_url + "/och/" + sceneData.id + "/{f}.jpg");

    // var geometry = new Marzipano.CubeGeometry(sceneData.levels);
    var geometry = new Marzipano.CubeGeometry([{
        tileSize: 1024,
        size: 1024
    }]);

    // var limiter = Marzipano.RectilinearView.limit.traditional(sceneData.faceSize, 100 * Math.PI / 180, 120 * Math.PI / 180);
    var limiter = Marzipano.RectilinearView.limit.traditional(1024, 100 * Math.PI / 180, 120 * Math.PI / 180);
    var view = new Marzipano.RectilinearView(sceneData.initialViewParameters, limiter);

    var marzipanoScene = viewer.createScene({
        source: source,
        geometry: geometry,
        view: view,
        pinFirstLevel: true
    });

    // Create link hotspots.
    sceneData.linkHotspots.forEach(function (hotspot) {
        var element = createLinkHotspotElement(hotspot);
        marzipanoScene.hotspotContainer().createHotspot(element, {
            yaw: hotspot.yaw,
            pitch: hotspot.pitch
        });
    });

    // Create Props hotspots.
    if (sceneData.propHotspots !== undefined) {
        sceneData.propHotspots.forEach(function (hotspot) {
            var element = createPropHotspotsElement(hotspot);
            marzipanoScene.hotspotContainer().createHotspot(element, {
                yaw: hotspot.yaw,
                pitch: hotspot.pitch
            }, {
                    perspective: {
                        radius: hotspot.radius,
                        extraRotations: hotspot.extraRotations
                    }
                });
        });
    }

    return {
        data: sceneData,
        marzipanoObject: marzipanoScene
    };
});

// Display the initial scene.
switchScene(scenes[0]);

function sanitize(s) {
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
}

var hasVisitedScareZone = false;

function switchScene(scene) {

    scene.marzipanoObject.switchTo();
    activeScene = scene;

    if (hasVisitedScareZone) {
        jumpScare.cancel(); //clear timeout for jumpscare
    }

    if (scene.data.id == '0-scene-1') {
        $('.prop-hotspot-light').addClass('active');
    } else {
        $('.prop-hotspot-light').removeClass('active');
    }

    //  JAC: hide jump scare for time being...
    if (scene.data.id == '0-scene-2' && !shownScare) {
        hasVisitedScareZone = true;
        jumpScare.setup();
    }
}

function createLinkHotspotElement(hotspot) {

    // Create wrapper element to hold icon and tooltip.
    var wrapper = document.createElement('div');
    wrapper.classList.add('hotspot');
    wrapper.classList.add('link-hotspot');

    // Create image element.
    var icon = document.createElement('img');
    icon.src = cdn_url + 'link.png';
    icon.classList.add('link-hotspot-icon');

    // Set rotation transform.
    var transformProperties = ['-ms-transform', '-webkit-transform', 'transform'];
    for (var i = 0; i < transformProperties.length; i++) {
        var property = transformProperties[i];
        icon.style[property] = 'rotate(' + hotspot.rotation + 'rad)';
    }

    // Add click event handler.
    wrapper.addEventListener('click', function () {
        switchScene(findSceneById(hotspot.target));
    });

    // Prevent touch and scroll events from reaching the parent element.
    // This prevents the view control logic from interfering with the hotspot.
    stopTouchAndScrollEventPropagation(wrapper);

    // Create tooltip element.
    var tooltip = document.createElement('div');
    // tooltip.classList.add('hotspot-tooltip');
    tooltip.classList.add('link-hotspot-tooltip');

    var tooltip_inner1 = document.createElement('span');
    var tooltip_inner2 = document.createElement('span');

    tooltip_inner1.innerHTML = findSceneDataById(hotspot.target).name;
    tooltip_inner1.className += 'hotspot__text__en';
    tooltip_inner2.innerHTML = findSceneDataById(hotspot.target).zh_name;
    tooltip_inner2.className += 'hotspot__text__zh';

    tooltip.appendChild(tooltip_inner1);
    tooltip.appendChild(tooltip_inner2);

    wrapper.appendChild(icon);
    wrapper.appendChild(tooltip);

    return wrapper;
}

function createPropHotspotsElement(hotspot) {

    // Create wrapper element to hold icon and hotspot_link_info.
    var wrapper = document.createElement('div');
    wrapper.className += 'hotspot prop-hotspot-light';

    var prop = document.createElement('div');
    prop.className += 'prop-inner';
    prop.style.backgroundImage = "url('" + hotspot.path + "')";
    prop.style.width = hotspot.width + "px";
    prop.style.height = hotspot.height + "px";

    var dataFrames = document.createAttribute('data-frames');
    dataFrames.value = hotspot.frames;
    wrapper.setAttributeNode(dataFrames);

    // Prevent touch and scroll events from reaching the parent element.
    // This prevents the view control logic from interfering with the hotspot.
    stopTouchAndScrollEventPropagation(wrapper);

    wrapper.appendChild(prop);

    return wrapper;
}

// Prevent touch and scroll events from reaching the parent element.
function stopTouchAndScrollEventPropagation(element, eventList) {
    var eventList = ['touchstart', 'touchmove', 'touchend', 'touchcancel',
        'wheel', 'mousewheel'
    ];
    for (var i = 0; i < eventList.length; i++) {
        element.addEventListener(eventList[i], function (event) {
            event.stopPropagation();
        });
    }
}

function findSceneById(id) {
    for (var i = 0; i < scenes.length; i++) {
        if (scenes[i].data.id === id) {
            return scenes[i];
        }
    }
    return null;
}

function findSceneDataById(id) {
    for (var i = 0; i < APP_DATA.scenes.length; i++) {
        if (APP_DATA.scenes[i].id === id) {
            return APP_DATA.scenes[i];
        }
    }
    return null;
}

'use strict';

var canClick = [false, false, false, true, true];
var cluesFound = [false, false, false, true, true];
var clueIndex = 0;
var tempHotspots = [];
var activeSceneList = ['0-scene-1', '0-scene-2', '0-scene-3'];
var frameQty = [12, 6, 6, 6, 6, 6, 6, 6, 6];

var frameInterval;

// Get the viewer's underlying DragControlMethod instance for mouse drag.
// var mouseViewDrag = viewer.controls().method('mouseViewDrag').instance;
// var touchView = viewer.controls().method('touchView').instance;
// var dragControlMethod = viewer.controls().method('mouseViewDrag').instance;

// clue 1
tempHotspots[0] = scenes[0].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-1"), {
    yaw: -0.2,
    pitch: 0.06
});

// clue 2
tempHotspots[1] = scenes[1].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-2"), {
    yaw: 3.1,
    pitch: 0.00
});

// clue 3
tempHotspots[2] = scenes[2].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-3"), {
    yaw: -2.8,
    pitch: -0.1
});

//  fake clues
//  @ scene 1
tempHotspots[3] = scenes[0].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-4"), {
    yaw: 2.2,
    pitch: 0.0
});

tempHotspots[4] = scenes[2].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-5"), {
    yaw: 2.1,
    pitch: 0.0
});

function abs_360(value, min, max) {
    if (value < min) {
        return max + (value - min);
    }
    if (value > max) {
        return min + (value - max);
    }

    return value;
}

function is_in_range(current_x, hotspot, region_range) {
    var min_360 = -3.14;
    var max_360 = 3.14;
    var region_min = abs_360(hotspot - region_range, min_360, max_360);
    var region_max = abs_360(hotspot + region_range, min_360, max_360);

    if (region_min < region_max) { // inside range
        if (current_x < region_max && current_x > region_min) {
            return true;
        }
    } else { // outside range
        if ((current_x > region_min && current_x <= max_360) || (current_x < region_max && current_x >= min_360)) {
            return true;
        }
        // if ((current_x > region_min && current_x < max_360) || (current_x < region_max && current_x > min_360)) { return true; }
    }

    return false;
}

function generate_random_number(region) {
    var max = 0;
    var min = 0;

    switch (region) {
        case 6:
            min = 0.1;
            max = 1.5;
            break;
        case 5:
            min = 1.6;
            max = 2.5;
            break;
        case 4:
            min = 2.6;
            max = 3.5;
            break;
        case 3:
            min = 3.6;
            max = 4.5;
            break;
        case 2:
            min = 4.6;
            max = 4.9;
            break;
    }

    return (Math.random() * (max - min) + min).toFixed(1);
}

var region_1_range = 0.4;
var region_2_range = 1;
var region_3_range = 1.6;
var region_4_range = 2.2;
var region_5_range = 2.8;

var throttle = function (callback, limit) {
    var wait = false; // Initially, we're not waiting
    return function () { // We return a throttled function
        if (!wait) { // If we're not waiting
            callback.call(); // Execute users function
            wait = true; // Prevent future invocations
            setTimeout(function () { // After a period of time
                wait = false; // And allow future invocations
            }, limit);
        }
    }
}

var fake_hotspot = 0;

var viewChangeThrottled = throttle(function () {
    // Get the current viewport dimensions
    // var size = activeScene.marzipanoObject.view().size();

    var activeSceneIdx = activeSceneList.indexOf(activeScene.data.id);

    var panning_x = (activeScene.marzipanoObject.view().yaw()).toFixed(2);
    var hotspot_x = tempHotspots[activeSceneIdx].position().yaw;

    //  EMF AND REAL CLUES
    if (!cluesFound[activeSceneIdx]) {
        if (is_in_range(panning_x, hotspot_x, region_1_range)) {
            //  region 1, at the max region, 5 lights
            $('.emf__visual').attr('class', 'emf__visual is-region-1');

            if (!cluesFound[activeSceneIdx]) {
                canClick[activeSceneIdx] = true;
                showPanoCenter();
            }

            $('.emf__reader > span.num').html('Max');

            if (!$('.emf__reader > span.static').hasClass('hidden')) {
                $('.emf__reader > span.static').addClass('hidden');
            }

        } else if (is_in_range(panning_x, hotspot_x, region_2_range)) {
            //  region 2, 4 lights blink 1
            $('.emf__visual').attr('class', 'emf__visual is-region-2');
            canClick[activeSceneIdx] = false;
            hidePanoCenter();
            $('.emf__reader > span.num').html(generate_random_number(2));

            if ($('.emf__reader > span.static').hasClass('hidden')) {
                $('.emf__reader > span.static').removeClass('hidden');
            }

        } else if (is_in_range(panning_x, hotspot_x, region_3_range)) {
            //  region 3, 3 lights blink 1
            $('.emf__visual').attr('class', 'emf__visual is-region-3');
            canClick[activeSceneIdx] = false;
            hidePanoCenter();
            $('.emf__reader > span.num').html(generate_random_number(3));

            if ($('.emf__reader > span.static').hasClass('hidden')) {
                $('.emf__reader > span.static').removeClass('hidden');
            }

        } else if (is_in_range(panning_x, hotspot_x, region_4_range)) {
            //  region 4, 2 lights blink 1
            $('.emf__visual').attr('class', 'emf__visual is-region-4');
            canClick[activeSceneIdx] = false;
            hidePanoCenter();
            $('.emf__reader > span.num').html(generate_random_number(4));

            if ($('.emf__reader > span.static').hasClass('hidden')) {
                $('.emf__reader > span.static').removeClass('hidden');
            }

        } else if (is_in_range(panning_x, hotspot_x, region_5_range)) {
            //  region 5, 1 light blink 1
            $('.emf__visual').attr('class', 'emf__visual is-region-5');
            canClick[activeSceneIdx] = false;
            hidePanoCenter();
            $('.emf__reader > span.num').html(generate_random_number(5));

            if ($('.emf__reader > span.static').hasClass('hidden')) {
                $('.emf__reader > span.static').removeClass('hidden');
            }

        } else {
            //  region 6, 1 light stagnant
            $('.emf__visual').attr('class', 'emf__visual is-region-6');
            canClick[activeSceneIdx] = false;
            hidePanoCenter();

            $('.emf__reader > span.num').html(generate_random_number(6));

            if ($('.emf__reader > span.static').hasClass('hidden')) {
                $('.emf__reader > span.static').removeClass('hidden');
            }

        }
    } else {

        //  CLUE HAS BEEN FOUND FOR THIS SCENE
        $('.emf__visual').attr('class', 'emf__visual is-region-5');

        $('.emf__reader > span.num').html(generate_random_number(5));

        if ($('.emf__reader > span.static').hasClass('hidden')) {
            $('.emf__reader > span.static').removeClass('hidden');
        }

    }



    //  FAKE CLUES
    if (activeSceneIdx == 0) {
        //  scene 1 fake clue
        fake_hotspot = tempHotspots[3].position().yaw;

        if (panning_x > 1.7 && panning_x < 2.6) {
            if (canClick[3]) {
                showFakeClue();
            }

        }
    }

    if (activeSceneIdx == 2) {
        //  scene 3 fake clue
        fake_hotspot = tempHotspots[4].position().yaw;

        if (panning_x > 1.7 && panning_x < 2.6) {
            if (canClick[4]) {
                showFakeClue();
            }
        }
    }

}, 250);

scenes.map(function (scene) {
    var view = scene.marzipanoObject.view();
    view.addEventListener('change', viewChangeThrottled);
});

var showPanoCenter = function () {
    $(".realclue .panoCenter").fadeIn("slow", "swing", function () {
        // Animation complete
    });
};

var hidePanoCenter = function () {
    $(".realclue .panoCenter").fadeOut("slow", "swing", function () {
        // Animation complete
    });
};

var showFakeClue = function () {
    $(".fakeclue .panoCenter").fadeIn("slow", "swing", function () {
        // Animation complete
    });
};

var hideFakeClue = function () {
    $(".fakeclue .panoCenter").fadeOut("slow", "swing", function () {
        // Animation complete
    });
};

var showPage = function (newPage) {
    $(newPage).fadeIn();
};

var hidePage = function (page) {
    $(page).fadeOut();
};

//  GAME:: TAKE PHOTO
$('.clue').on('click touchstart', '.panoCenter', function (e) {

    // var activeSceneIdx = activeSceneList.indexOf(activeScene.data.id);
    e.preventDefault();
    playSfx('take-photo');

    var clueId = $(this).data('clue-id');
    var lang = '';

    if ($(this).hasClass('zh')) {
        lang = 'zh/';
    }

    if (canClick[clueId - 1]) {
        if (!cluesFound[clueId - 1]) {
            //  FOUND REAL CLUES AND STILL AVAILABLE
            canClick[clueId - 1] = false;
            cluesFound[clueId - 1] = true;

            //  EMF SWITCH OFF
            $('.emf__visual').attr('class', 'emf__visual is-region-5');
            $('.emf__reader > span.num').html(generate_random_number(5));
            $('.emf__reader > span.static').removeClass('hidden');

            $('#cluePlaceholder').fadeIn(function () {
                $(this).addClass('active-clue-placeholder');
            });
            $('#cluePlaceholder > .clue .closeButtonRed').show();

            $('#cluePlaceholder > .clue img').attr('src', cdn_url + 'photo_clue_' + clueId + '.jpg');

            hidePanoCenter();

            if (cluesFound[0] && cluesFound[1] && cluesFound[2]) {
                $('#cluePlaceholder').find('.finale-copy').addClass('active');
            }

        } else {
            //  FOUND FAKE CLUES
            canClick[clueId - 1] = false;

            $('#cluePlaceholder').find('.finale-copy').removeClass('active');

            $('#cluePlaceholder').fadeIn(function () {
                $(this).addClass('active-clue-placeholder');

                setTimeout(function () {

                    $('#cluePlaceholder > .clue > img').stop(true, false).animate({
                        opacity: 0,
                        width: $('#cluePlaceholder > .clue > img').width() / 2 + 'px',
                        height: $('#cluePlaceholder > .clue > img').height() / 2 + 'px'
                    },
                        400,
                        function () {
                            $(this).hide();
                            $('#cluePlaceholder > .clue > img').attr('src', '');
                            $('#cluePlaceholder > .clue > img').attr('style', '');
                            $('#cluePlaceholder').attr('style', '');
                            $(this).removeClass('active-clue-placeholder');
                            $('#cluePlaceholder').removeClass('fakeClue');
                        }
                    );
                }, 1500);
            });

            $('#cluePlaceholder').addClass('fakeClue');
            $('#cluePlaceholder > .clue .closeButtonRed').hide();
            //$('#cluePlaceholder > .closeButtonRed').show();
            // $('#cluePlaceholder > img').attr('src', "img/scene-0-props/photo_clue_' + (activeSceneIdx + 1) + '.jpg");
            $('#cluePlaceholder > .clue img').attr('src', cdn_url + 'photo_clue_' + clueId + '.jpg');

            hideFakeClue();
        }

    }


});

//  GAME:: CLOSE THE CLUE MODAL WHEN CLICK/DRAG ON BODY
$('#pano').on('click touchstart', function () {

    if ($('#cluePlaceholder').hasClass('active-clue-placeholder')) {
        $('#cluePlaceholder > .clue .closeButtonRed').click();
    }

});

//  GAME:: CLOSE THE CLUE IMAGE
$('#cluePlaceholder').on('click', '.closeButtonRed', function (e) {

    if (!$('#cluePlaceholder').hasClass('fakeClue')) {

        $('#cluePlaceholder > .clue > .closeButtonRed').hide();

        if ($('#cluePlaceholder').find('.finale-copy').hasClass('active')) {
            $('#cluePlaceholder').find('.finale-copy').hide();
        }

        $('#cluePlaceholder > .clue > img').stop(true, false).animate({
            opacity: 0,
            width: $('#cluePlaceholder > img').width() / 4 + 'px',
            height: $('#cluePlaceholder > img').height() / 4 + 'px'
        }, 400, function () {
            // $('.cluesCtr').show();
            $(this).hide();
            $('#cluePlaceholder > .clue > img').attr('src', '');
            $('#cluePlaceholder > .clue > img').attr('style', '');
            $('#cluePlaceholder').attr('style', '');
            $('#cluePlaceholder').addClass('cluePlaceholder');
            $('#cluePlaceholder').removeClass('active-clue-placeholder');
        });

        $('#cluePlaceholder').stop(true, false).animate({
            top: '85%',
            left: '90%'
        }, 400, function () {
            $('#cluePlaceholder').attr('style', '');
        });

    }

});

//  GAME:: FOUND ALL THE CLUES, PROCEED TO GUESS NAME SECTION
$('#cluePlaceholder').on('click', '.btnBlood.active', function (e) {
    e.preventDefault();
    hidePage('#cluePlaceholder');
    showPage('#pageGuessName');

    jumpScare.cancel(); //cancel off the jumpscare
});

//  GAME:: TRIGGER TO DISPLAY THE CLUES MODAL FOUND SO FAR
var showClues = function () {
    var allCluesFound = 0;
    var lang = '';
    $('#pageClues .closeButtonRed').show();
    showPage('#pageClues');

    if ($('body').hasClass('zh')) {
        lang = 'zh/';
    }

    for (var i = 0; i < 3; i++) {
        if (cluesFound[i]) {
            var tempDom = $('#pageClues .clues img');
            $(tempDom[i]).attr('src', cdn_url + 'photo_clue_' + (i + 1) + '.jpg');
            allCluesFound++;
        }
    }
    $('#pageClues').on('click touchstart', '.closeButtonRed', function (e) {
        // $('.fadePage').fadeOut();
        $('#pageClues').hide();
    });

    $('#pageClues').on('click touchstart', '.clue-overlay', function (e) {
        // $('.fadePage').fadeOut();
        $('#pageClues').hide();
    });

    if (allCluesFound == 3) {
        $('#pageClues .btnBlood').addClass('active');
        // $('#pageClues .btnBlood.active').click(function(e) {
        //     hidePage('#pageClues');
        //     showPage('#pageGuessName');
        // });

        $('#pageClues').on('click', '.btnBlood.active', function (e) {
            hidePage('#pageClues');
            showPage('#pageGuessName');
        });
    }

    initSlick();

    // hidePage( '.fadePage' );
    // hidePage( '#pageClues' );
    // showPage( '#pageGuessName' );
    // $( '#pageGuessName' ).show();
}

function initSlick() {
    $('#pageClues .clues').slick({
        slidesToShow: 1,
        swipeToSlide: true,
        centerMode: true,
        infinite: false,
        arrows: false,
        mobileFirst: true,
        centerPadding: "40px",
        responsive: [{
            breakpoint: 600,
            settings: "unslick"

        }]
    }).slick('slickGoTo', '0', true);
}


var triggerIdlePontianak;

//  GUESSNAME:: DISABLE ENTER BUTTON IF PONTIANAK IS STILL ANIMATING
function enableEnterButton(pontianakIdx) {
    $('#pageGuessName').find('.btnBlood').addClass('active');

    clearTimeout(triggerIdlePontianak);

    if (pontianakIdx != 9) {

        var nextFrameIndex = pontianakIdx + 1;

        triggerIdlePontianak = setTimeout(function () {
            $('.pontianakBox > div').hide();
            // $('.pontianak' + pontianakIdx).hide();
            $('.pontianak' + (nextFrameIndex)).show();

            clearInterval(frameInterval);

            frameInterval = setInterval(function () {
                //  waiting pontianak shivers
                AnimateSprite($('.pontianak' + nextFrameIndex), 640, 800, 3, frameQty[pontianakIdx], 0.15, pontianakIdx, function () {
                    clearInterval(frameInterval);
                });
            }, 5000);

        }, 1200);

    }

}

//  GUESSNAME:: ANIMATE PONTIANAK IF GUESSED WRONG LETTER
function animatePontianakError(triesLeft, haveWaiting) {

    $('.pontianakBox > div').hide();
    // $('.pontianak' + pontianakIdx-1).hide();
    var pontianakIdx = ((5 - triesLeft) * 2) + 1;

    $('.pontianak' + pontianakIdx).show();


    if (pontianakIdx == 9) {
        $('.guess-overlay').addClass('active');
        $('#pageGuessName').find('.single-column').hide();
        $('#pageGuessName').addClass('bg-hide');
        $('#pageGuessName .cluesCtr').hide();
    }

    if (pontianakIdx == 0) {
        AnimateSprite($('.pontianak' + pontianakIdx), 640, 800, 3, frameQty[pontianakIdx - 1], 0.2);
    } else {

        if (Modernizr.mq('(max-width: 480px)')) {
            AnimateSprite($('.pontianak' + pontianakIdx), 480, 635, 4, 16, 0.3);
        } else if (Modernizr.mq('(max-width: 769px)')) {
            AnimateSprite($('.pontianak' + pontianakIdx), 768, 1020, 4, 16, 0.3);
        } else {
            $('#pageGuessName').find('.btnBlood').removeClass('active');

            AnimateSprite($('.pontianak' + pontianakIdx), 640, 800, 3, frameQty[pontianakIdx - 1], 0.15, pontianakIdx, enableEnterButton);
        }

    }

}

//  GUESSNAME:: ANIMATE LAST PONTIANAK FOR GUESSDATE SECTION
function animatePontianakSpecial() {
    $('.pontianakSpecial').show();

    if (Modernizr.mq('(max-width: 480px)')) {

        AnimateSprite($('.pontianak' + pontianakIdx), 480, 635, 4, 16, 0.3);

    } else if (Modernizr.mq('(max-width: 769px)')) {

        AnimateSprite($('.pontianak' + pontianakIdx), 768, 1020, 4, 16, 0.3);

    } else {

        AnimateSprite($('.pontianakSpecial'), 640, 800, 3, 6, 0.15);

    }
}


//  SOUND FOR WHOLE GAMEPLAY
var sfx = {};
sfx['enter-game'] = new Howl({
    src: ['audio/mp3/bgm.mp3'],
    loop: true
});
sfx['take-photo'] = new Howl({
    src: ['audio/mp3/takephoto.mp3']
});
sfx['jump-scare'] = new Howl({
    src: ['audio/mp3/jumpscare.mp3']
});
sfx['pon-appear'] = new Howl({
    src: ['audio/mp3/pon_appear.mp3']
});
sfx['pon-dash'] = new Howl({
    src: ['audio/mp3/pon_dash.mp3']
});
sfx['user-fails'] = new Howl({
    src: ['audio/mp3/fail.mp3']
});

function playSfx(param) {
    sfx[param].play();
}
