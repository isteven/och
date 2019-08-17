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
        window.open(
            twitter_share_url + '?gameId=' + configGet('gameId') + '&gameTime=' + $scope.elapsedGameTime,
            '1468140690854',
            'width=400,height=300,toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=1,left=0,top=0'
        );
    }

    $scope.share_weibo = function () {
        window.open(
            weibo_share_url + '?gameId=' + configGet('gameId') + '&gameTime=' + $scope.elapsedGameTime + '&gameShareImage=' + weibo_share_image,
            'weibowindow',
            'width=400,height=300,toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=1,left=0,top=0'
        )
    }

    var fbPost = function (fbId, response1) {
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
        // $scope.initiateJumpScare();
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

            // img.src = 'img/'+value;
            img.src = cdn_url + '/' + value;
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
