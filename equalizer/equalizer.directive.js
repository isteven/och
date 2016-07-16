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

    }
  }

})();
