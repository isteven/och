(function() {
  'use strict';

  angular
    .module('myApp')
    .directive('equalizer', equalizer);

  /** @ngInject */
  function equalizer() {
    var directive = {
      restrict: 'E',
      templateUrl: 'equalizer/equalizer.html',
      scope: {
      },
      link : equalizerLink,
      controller: equalizerController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function equalizerController() {
      var vm = this;
    }

    function equalizerLink(scope, element, attrs, controller, transcludeFn) {
        var muted = false;
        angular.element( element[ 0 ] ).click( function() {
            muted = !muted;
            angular.forEach( window.sfx, function( value, key ) {
                window.sfx[ key ].mute(muted);
            });
            console.log( angular.element( '.bar-c'));
            if ( muted ) {
                angular.element( '.bar-c > div' ).addClass( 'noAnim' );
            }
            else {
                angular.element( '.bar-c > div' ).removeClass( 'noAnim' );
            }
        });
    }
  }

})();
