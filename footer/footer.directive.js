(function () {
  'use strict';

  angular
    .module('myApp')
    .directive('footer', footer);

  /** @ngInject */
  function footer() {
    var directive = {
      restrict: 'E',
      templateUrl: 'footer/footer.html',
      link: footerLink,
      controller: footerController,
      controllerAs: 'footer',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function footerController($scope, $http) {
      var vm = this;

      vm.popupActive = false;
      vm.displayScroll = true;
      vm.tnc = {
        agreed: false
      };


      this.showPopup = function (name) {
        console.log('show: ' + name);
        vm.section = name;
        vm.popupActive = true;
      };

      this.hidePopup = function (name) {
        console.log('hide');
        vm.popupActive = false;
      };

      $scope.$on('home.feed', function () {
        vm.displayScroll = false;
      });

      $scope.$on('home.main', function () {
        vm.displayScroll = true;
      });

      $scope.scrollDown = function () {
        $scope.$parent.$broadcast('scroll down');
      }

      this.share = function (platform) {

        switch (platform) {

          case 'fb':
            /*
            FB.ui({
              method: 'share',
              hashtag: '#HHN6',
              quote: 'Be drawn in by the darkness within in the upcoming Halloween Horror Nights 6 at Universal Studios Singapore.',
              href: 'http://www.halloweenhorrornights.com.sg/',
            }, function(response){
              // something?
            });
            */
            break;

          case 'twitter':
            /*
            var width  = 575,
            height = 350,
            left   = ($(window).width()  - width)  / 2,
            top    = ($(window).height() - height) / 2,
            url    = 'https://twitter.com/intent/tweet?text=Be drawn in by the darkness within in the upcoming Halloween Horror Nights 6 at Universal Studios Singapore.&hashtags=HHN6&url=http://bit.ly/1vPcsSy',
            opts   = 'status=1' +
                     ',width='  + width  +
                     ',height=' + height +
                     ',top='    + top    +
                     ',left='   + left;

            window.open(url, 'twitter', opts);
            return false;
            */
            break;

          case 'email':
            /*
            var url;
            var subject = 'Halloween Horror Nights 6';
            var body = 'Be drawn in by the darkness within in the upcoming Halloween Horror Nights 6 at Universal Studios Singapore. Check it out now: http://www.halloweenhorrornights.com.sg/';

            url = 'mailto:?body=' + body + '&subject=' + subject;

            window.open(url, '_self');
            */


            break;

        }



      };

    }

    function footerLink(scope, element, attrs, controller, transcludeFn) {

    }
  }

})();
