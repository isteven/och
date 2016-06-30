var myApp = angular.module('myApp',[]);

myApp.controller( 'bodyCtrl', [ '$scope', '$http', function( $scope, $http ) {

    $scope.guessCorrect = true;
    $scope.failLetter = '';
    $scope.triesLeft = 4;
    $scope.singleLetter = '';

    $scope.name1 = [
        { letter: 'r', display: false },
        { letter: 'o', display: false },
        { letter: 's', display: false },
        { letter: 'e', display: false }
    ]
    $scope.name2 = [
        { letter: 'y', display: false },
        { letter: 'a', display: false },
        { letter: 's', display: false },
        { letter: 'm', display: false },
        { letter: 'i', display: false },
        { letter: 'n', display: false },
        { letter: 'e', display: false }
    ];

    function searchArrayOfObject( searchKeyword, propertyToSearch, myArrayOrObject ){
        var result = [];
        for (var i = 0; i < myArrayOrObject.length; i++) {
            if ( myArrayOrObject[ i ][ propertyToSearch ].toUpperCase() === searchKeyword.toUpperCase() ) {
                result.push( i );
            }
        }
        return result;
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
            if ( !answerIsCorrect ) {
                $scope.guessCorrect = false;
                $scope.failLetter = $scope.singleLetter;
                $scope.triesLeft--;
                animatePontianak( $scope.triesLeft );
            }
            $scope.singleLetter = '';

            if ( $scope.triesLeft <= 0 ) {
                hidePage( '#pageGuessName' );
                showPage( '', '#pageFail' );
            }
        }
    }

    $scope.checkDate = function() {
        $http({
            method: 'POST',
            url: 'http://www.corakrupa.com/checkDate',
            data: JSON.stringify( name )
        })
        .then(function() {
            // if name is correct; go to next screen (guess event date)
        },function() {
            // if name error; do ghost animation; increase error counter
        });
    }
}]);
