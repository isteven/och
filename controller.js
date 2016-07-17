var myApp = angular.module('myApp', []);

myApp.controller('bodyCtrl', ['$scope', '$http', function($scope, $http) {

    var gameStartTime = null;
    var gameEndTime = null;
    $scope.elapsedGameTime = null;

    $scope.menu = {};
    $scope.menu.active = false;
    $scope.footer = {};
    $scope.footer.section = '';
    $scope.footer.popupActive = false;
    $scope.guessCorrect = true;
    $scope.failLetter = '';
    $scope.triesLeft = 5;
    $scope.singleLetter = '';
    $scope.dates = [
        {
            date: 10
        },
        {
            date: 12
        },
        {
            date: 14
        },
        {
            date: 16
        },
        {
            date: 18
        },
];

    $scope.lang = 'en';

    var nameArr1 = [];
    var nameArr2 = [];
    nameArr1['cn'] = [
        {
            letter: '玫',
            display: false
},
        {
            letter: '瑰',
            display: false
},
];
    nameArr1['en'] = [
        {
            letter: 'r',
            display: false
},
        {
            letter: 'o',
            display: false
},
        {
            letter: 's',
            display: false
},
        {
            letter: 'e',
            display: false
}
];
    nameArr2['cn'] = [
];
    nameArr2['en'] = [
        {
            letter: 's',
            display: false
},
        {
            letter: 'o',
            display: false
},
        {
            letter: 'r',
            display: false
},
        {
            letter: 'f',
            display: false
},
        {
            letter: 'i',
            display: false
},
        {
            letter: 'n',
            display: false
},
        {
            letter: 'a',
            display: false
}
];

    // $scope.entry1to5 = [ { idxString: '00', time: 9090}, { idxString: '00', time: 90}, { idxString: '00', time: 9090}, { idxString: '00', time: 90},   { idxString: '00', time: 90},  ];
    // $scope.entry2to5 = [ { idxString: '00', time: 9090}, { idxString: '00', time: 90}, { idxString: '00', time: 90909}, { idxString: '00', time: 90},   { idxString: '00', time: 9},  ];
    $scope.entry1to5 = [];
    $scope.entry2to5 = [];

    var lang = 'en';
    var frameQty = [9, 8, 7, 8, 6, 8, 6, 8, 8];
    var masterPontianakIdx = 1;

    $scope.showFooterPopup = function(type) {
        $scope.footer.popupActive = true;
        $scope.footer.section = type;
    }

    $scope.hideFooterPopup = function(type) {
        $scope.footer.popupActive = false;
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
    /*
    $scope.animatePontianakError( triesLeft ) {

        console.log( 'animating pontianak ERROR: ' + triesLeft );
        $( '.pontianakBox div' ).fadeOut( 800 );
        var pontianakIdx = ( ( 5 - triesLeft ) * 2 ) + 1;
        masterPontianakIdx = pontianakIdx;
        console.log( 'pontianak index ERROR:'  + pontianakIdx );
        $( '.pontianak' + pontianakIdx ).show();
        $( '.pontianak' + pontianakIdx ).sprite({
            no_of_frames: frameQty[ pontianakIdx - 1 ],
            fps: 8,
            play_frames: frameQty[ pontianakIdx - 1 ]
        });
    }

    $scope.animatePontianakWaiting( triesLeft ) {
    console.log( 'animating pontianak WAITING: ' + triesLeft );
    var pontianakIdx = ( ( 5 - triesLeft ) * 2 ) + 2;
    masterPontianakIdx = pontianakIdx;
    console.log( 'pontianak index WAITING:'  + pontianakIdx );
    // $( '.pontianak' + ( pontianakIdx - 1 )).fadeOut( 500 );
    $( '.pontianakBox div' ).fadeOut( 800 );
    $( '.pontianak' + pontianakIdx ).show();
    $( '.pontianak' + pontianakIdx ).sprite({
        no_of_frames: frameQty[ pontianakIdx - 1 ],
        fps: 4
    });
    }
    */
    $scope.checkName = function() {
        if ($scope.singleLetter != '' && $('#pageGuessName .btnBlood').hasClass('active') ) {
            // $( '.pontianak' + masterPontianakIdx - 1 ).spStop();
            var letterIsCorrect = false;
            var result1 = searchArrayOfObject($scope.singleLetter, 'letter', $scope.name1);
            var result2 = searchArrayOfObject($scope.singleLetter, 'letter', $scope.name2);
            if (result1.length > 0) {
                angular.forEach(result1, function(value, key) {
                    $scope.name1[value].display = true;
                });
                letterIsCorrect = true;
                $scope.guessCorrect = true;
            }
            if (result2.length > 0) {
                angular.forEach(result2, function(value, key) {
                    $scope.name2[value].display = true;
                });
                letterIsCorrect = true;
                $scope.guessCorrect = true;
            }
            // if wrong answer
            if (!letterIsCorrect) {
                $scope.guessCorrect = false;
                $scope.failLetter = $scope.singleLetter;
                if ($scope.triesLeft > 1) {
                  console.log('still have chance');
                    window.animatePontianakError($scope.triesLeft, true);
                } else {

                  console.log('used up chances');
                    window.animatePontianakError($scope.triesLeft);

                    if ( Modernizr.mq('(max-width: 769px)') ) {
                      //  Mobile and tablet has more animation frames,
                      //  so duration needs slightly longer
                      setTimeout(function() {
                          // hidePage( '#pageGuessName' );
                          showPage('#pageFails');
                      }, 1000);
                    } else {
                      setTimeout(function() {
                          // hidePage( '#pageGuessName' );
                          showPage('#pageFails');
                      }, 800);
                    }
                }
                $scope.triesLeft--;
            }

            // if correct answer
            else {
                var nameIsCorrect = true;
                angular.forEach($scope.name1, function(value, key) {
                    // console.log( value );
                    if (!value.display) {
                        nameIsCorrect = false;
                    }
                });
                angular.forEach($scope.name2, function(value, key) {
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
                    window.animatePontianakError(1);

                    if ( Modernizr.mq('(max-width: 769px)') ) {
                      //  Mobile and tablet has more animation frames,
                      //  so duration needs slightly longer
                      window.setTimeout(function () {
                        document.activeElement.blur();
                        $('.cluesCtr').hide();
                        hidePage('#pageGuessName');
                        showPage('#pageGuessDate');
                      }, 1000);
                    } else {
                      window.setTimeout(function () {
                        document.activeElement.blur();
                        $('.cluesCtr').hide();
                        hidePage('#pageGuessName');
                        showPage('#pageGuessDate');
                      }, 500);
                    }

                }
            }

            // just reset stuff
            $scope.singleLetter = '';
        }
    }

    $scope.initiateJumpScare = function() {
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

    $scope.showPage = function(domString) {
        window.showPage(domString);
    }

    $scope.hidePage = function(domString) {
        window.hidePage(domString);
    }

    $scope.checkDate = function(date) {
        if (date == 16) {
            calculateGameTime();
            loadLeaderboard();
            hidePage('#pageGuessDate');
            showPage('#pageShare');
            $('#ftr__credit').hide();
        } else {
            hidePage('#pageGuessDate');
            showPage('#pageFails');
        }
    }

    loadLeaderboard = function() {
        $http({
            method: 'GET',
            url: configGet('apiUrl') + '_laravel/game/board/1',
        }).then(
            function(success) {
                var idx = 0;
                angular.forEach(success.data, function(value, key) {
                    //console.log( value );
                    var paddedIdx = pad('00', (idx + 1), true);
                    if (idx < 5) {
                        $scope.entry1to5.push({
                            idxString: paddedIdx,
                            time: value.time
                        });
                    } else if (idx < 10) {
                        $scope.entry2to5.push({
                            idxString: paddedIdx,
                            time: value.time
                        });
                    }
                    idx++;
                });
            },
            function(error) {
                console.log(error);
            }
        );
    }

    var calculateGameTime = function() {
        gameEndTime = performance.now();
        $scope.elapsedGameTime = gameEndTime - gameStartTime;
        console.log('elapsed game time (ms): ' + $scope.elapsedGameTime);
        console.log('elapsed game time (s): ' + $scope.elapsedGameTime * 0.001);
    }

    $scope.millisToMinutesAndSeconds = function(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        var paddedMinutes = pad('00', minutes, true);
        return paddedMinutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    $scope.share_facebook = function() {
        if ( window.fbLoggedIn ) {
            fbPost( window.fbResponse.authResponse.userID, window.fbResponse );
        }
        else {
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

    $scope.share_twitter = function() {
        window.open(
            'http://stg.craftandcode.com.sg/clients/rws/hhn6/_laravel/game/twitter?gameId=' + configGet( 'gameId' ) + '&gameTime=' + $scope.elapsedGameTime,
            '1468140690854',
            'width=400,height=300,toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=1,left=0,top=0'
        );
    }

    $scope.share_weibo = function() {
      window.open(
                'http://stg.craftandcode.com.sg/clients/rws/hhn6/_laravel/game/weibo?gameId=' + configGet( 'gameId' ) + '&gameTime=' + $scope.elapsedGameTime,
                'weibowindow',
                'width=400,height=300,toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=1,left=0,top=0'
      )
    }

    var fbPost = function( fbId, response1 ) {
        FB.api(
            "/" + fbId,
            function(response2) {
                if (response2 && !response2.error) {
                    console.log('FB get user info');
                    console.log(response2);
                    FB.ui({
                        method: 'share',
                        display: 'popup',
                        href: 'http://www.halloweenhorrornights.com.sg/',
                    }, function(response3) {
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

    var postToDb = function(param) {
        console.log('postToDb()');
        $http({
            method: 'POST',
            url: configGet('apiUrl') + '_laravel/game/submit',
            data: param
        }).then(
            function(success) {
                console.log('postToDb success');
                console.log(success);
            },
            function(error) {
                console.log('postToDb ERROR');
                console.log(error);
            }
        );
    }

    $scope.startGame = function() {

        gameStartTime = performance.now();

        $scope.guessCorrect = true;
        $scope.failLetter = '';
        $scope.triesLeft = 5;
        $scope.singleLetter = '';
        $scope.menu.active = false;

        var tempLang = getUrlVar('lang');
        if (tempLang) {
            $scope.lang = tempLang;
        }

        $scope.name1 = angular.copy(nameArr1[$scope.lang]);
        $scope.name2 = angular.copy(nameArr2[$scope.lang]);

        // showPage( '#pano' );
        hidePage('.fadePage');
        $('#pageLanding').fadeOut(400);
        hidePage('#pageFails');
        $('.pontianakBox div').hide();
    }



    showPage('#pageLanding'); //jac:: uncomment this when deploying

$scope.startGame();
// hidePage( '#pano' );
showPage('#pageGuessName');

// showPage('#pageGuessDate');

    // hidePage( '.emf__container' );
    // hidePage( '#pano' );
    // showPage('#pageShare');


    // setTimeout( function() {
    //     $scope.share_facebook();
    // }, 1000 );
}]);
