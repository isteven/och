var myApp = angular.module('myApp',[]);

myApp.controller( 'bodyCtrl', [ '$scope', '$http', function( $scope, $http ) {

    var gameStartTime = performance.now();

    $scope.guessCorrect = true;
    $scope.failLetter   = '';
    $scope.triesLeft    = 5;
    $scope.singleLetter = '';
    $scope.dates = [
        { date: 10 },
        { date: 12 },
        { date: 14 },
        { date: 16 },
        { date: 18 },
    ];

    var lang = 'en';
    var nameArr1 = [];
    var nameArr2 = [];
    nameArr1[ 'cn' ] = [
        { letter: '玫', display: false },
        { letter: '瑰', display: false },
    ];
    nameArr1[ 'en' ] = [
        { letter: 'r', display: false },
        { letter: 'o', display: false },
        { letter: 's', display: false },
        { letter: 'e', display: false }
    ];
    nameArr2[ 'cn' ] = [
    ];
    nameArr2[ 'en' ] = [
        { letter: 's', display: false },
        { letter: 'o', display: false },
        { letter: 'r', display: false },
        { letter: 'f', display: false },
        { letter: 'i', display: false },
        { letter: 'n', display: false },
        { letter: 'a', display: false }
    ];

    $scope.entry1to5 = [
        { time: 100 },
        { time: 200 },
        { time: 300 },
        { time: 400 },
        { time: 500 },
    ];
    $scope.entry2to5 = [
        { time: 600 },
        { time: 700 },
        { time: 800 },
        { time: 900 },
        { time: 1000 },
    ]

    var lang        = 'en';
    var frameQty    = [ 9, 7, 8, 6, 8, 6, 8, 8 ];

    function getUrlVar( variable )
    {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return( false );
   }

    function searchArrayOfObject( searchKeyword, propertyToSearch, myArrayOrObject ){
        var result = [];
        for (var i = 0; i < myArrayOrObject.length; i++) {
            if ( myArrayOrObject[ i ][ propertyToSearch ].toUpperCase() === searchKeyword.toUpperCase() ) {
                result.push( i );
            }
        }
        return result;
    }

    function animatePontianakError( triesLeft ) {
        console.log( 'animating pontianak ERROR: ' + triesLeft );
        $( '.pontianakBox div' ).fadeOut( 800 );
        var pontianakIdx = ( ( 5 - triesLeft ) * 2 ) + 1;
        console.log( 'pontianak index:'  + pontianakIdx );
        $( '.pontianak' + pontianakIdx ).show();
        $( '.pontianak' + pontianakIdx ).sprite({
            no_of_frames: frameQty[ pontianakIdx - 1 ],
            fps: 8,
            play_frames: frameQty[ pontianakIdx - 1 ]
        });

    }


    function animatePontianakWaiting( triesLeft ) {
        console.log( 'animating pontianak WAITING: ' + triesLeft );
        var pontianakIdx = ( ( 5 - triesLeft ) * 2 ) + 2;
        console.log( 'pontianak index:'  + pontianakIdx );
        $( '.pontianak' + ( pontianakIdx - 1 )).fadeOut( 500 );
        $( '.pontianakBox div' ).fadeOut( 800 );
        $( '.pontianak' + pontianakIdx ).show();
        $( '.pontianak' + pontianakIdx ).sprite({
            no_of_frames: frameQty[ pontianakIdx - 1 ],
            fps: 4
        });
    }

    $scope.checkName = function() {
        if ( $scope.singleLetter != '' ) {
            var answerIsCorrect = false;
            var result1 = searchArrayOfObject( $scope.singleLetter, 'letter', $scope.name1 );
            var result2 = searchArrayOfObject( $scope.singleLetter, 'letter', $scope.name2 );
            if ( result1.length > 0 ) {
                angular.forEach( result1, function( value, key ) {
                    $scope.name1[ value ].display = true;
                });
                answerIsCorrect = true;
                $scope.guessCorrect = true;
            }
            if ( result2.length > 0 ) {
                angular.forEach( result2, function( value, key ) {
                    $scope.name2[ value ].display = true;
                });
                answerIsCorrect = true;
                $scope.guessCorrect = true;
            }
            // if wrong answer
            if ( !answerIsCorrect ) {
                $scope.guessCorrect = false;
                $scope.failLetter = $scope.singleLetter;
                $scope.triesLeft--;
                animatePontianakError( $scope.triesLeft + 1 );
                if ( $scope.triesLeft > 1 ) {
                    setTimeout( function() {
                        animatePontianakWaiting( $scope.triesLeft + 1 );
                    }, 2000 );
                }
                // else {
                //     setTimeout( function() {
                //         // hidePage( '#pageGuessName' );
                //         // showPage( '', '#pageFail' );
                //
                //     }, 2000 );
                //
                // }
            }

            // just reset stuff
            $scope.singleLetter = '';
        }
    }

    var tempLang = getUrlVar( 'lang' );
    if ( tempLang ) {
        lang = tempLang;
    }

    $scope.initiateJumpScare = function() {
        $( '.pontianakBox div' ).fadeOut( 800 );
        var pontianakIdx = ( ( 5 - triesLeft ) * 2 ) + 1;
        console.log( 'pontianak index:'  + pontianakIdx );
        $( '.pontianak' + pontianakIdx ).show();
        $( '.pontianak' + pontianakIdx ).sprite({
            no_of_frames: frameQty[ pontianakIdx - 1 ],
            fps: 8,
            play_frames: frameQty[ pontianakIdx - 1 ]
        });
    }

    $scope.showPage = function( domString ) {
        window.showPage( domString );
    }

    $scope.hidePage = function( domString ) {
        window.hidePage( domString );
    }

    $scope.share = function( type ) {

        var gameEndTime = performance.now();
        var elapsedGameTime = gameStartTime - gameEndTime;

        FB.ui({
            method: 'share_open_graph',
            action_type: 'og.likes',
            action_properties: JSON.stringify({
                object: 'https://developers.facebook.com/docs/',
            })
        }, function(response) {
            if ( typeof response != 'undefined' ) {
                var dataToSend = {
                    id          : null,
                    game        : 1,
                    account     : 'facebook',
                    user_name   : 'test-user',
                    full_name   : 'mr. test-user',
                    time        : elapsedGameTime,
                    email       : 'test@test.com',
                    phone       : '99998888'
                };

                $http({
                    method  : 'POST',
                    url     : 'http://54.169.173.245/clients/rws/hhn6/_laravel/game/submit',
                    data    : dataToSend
                }).then(
                    function( success ) {
                        console.log( success );
                    },
                    function( error ) {
                        console.log( error );
                    }
                );
            }
        });
    }

    $scope.name1 = angular.copy( nameArr1[ lang ]);
    $scope.name2 = angular.copy( nameArr2[ lang ]);

}]);
