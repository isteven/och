var myApp = angular.module('myApp',[]);

myApp.controller( 'bodyCtrl', [ '$scope', '$http', function( $scope, $http ) {

    $scope.greeting = 'Hola!';

    $scope.name = [
        { letter: 'y' },
        { letter: 'a' },
        { letter: 's' },
        { letter: 'm' },
        { letter: 'i' },
        { letter: 'n' },
        { letter: 'e' },
    ];

    

    $scope.checkName = function() {
        $http({
            method: 'POST',
            url: 'http://www.corakrupa.com/checkName',
            data: JSON.stringify( name )
        })
        .then(function() {
            // if name is correct; go to next screen (guess event date)
        },function() {
            // if name error; do ghost animation; increase error counter
        });
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
