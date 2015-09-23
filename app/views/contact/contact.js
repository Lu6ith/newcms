/**
 * Created by student on 2015-06-16.
 */
angular
    .module('myApp.contact', [])
    .config(function ($stateProvider) {
    $stateProvider
        .state('contact', {
            url: "/contact",
            templateUrl: "views/contact/contact-tpl.html",
            controller: "ContactCtrl"
        });
    })
    .controller('ContactCtrl', function ($scope) {
        $scope.sendMessage = function () {
            if($scope.contactForm.$valid){
                $scope.sentMsg = true;
                $scope.user = {};
                $scope.errorMsg = false;
            } else {
                $scope.errorMsg = true;
            }
        };
    });