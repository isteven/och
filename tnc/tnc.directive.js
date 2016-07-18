(function() {
  'use strict';

  angular
    .module('myApp')
    .directive('tnc', tnc);

  /** @ngInject */
  function tnc() {
    var directive = {
      restrict: 'E',
      templateUrl: 'tnc/tnc.html',
      link : tncLink,
      controller: tncController,
      controllerAs: 'tnc',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function tncController( $scope ) {
      var vm = this;
      vm.active = false;
      vm.init = true;

      $scope.$on('tnc.toggle', function(){
        vm.active = !vm.active;
      });
    }

    function tncLink(scope, element, attrs, controller, transcludeFn) {
      element.addClass('tnc__wrapper fade');
    }
  }

})();
