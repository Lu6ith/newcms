/**
 * Created by student on 2015-06-16.
 */
angular
    .module('myApp.headerStripDctv', [])
    .directive('headerStripDctv', function ($http, CONFIG, userInterface, productsInterface, contactsInterface, telekomsInterface, kategorieInterface, artykulyInterface, $cookieStore){
        return {
            templateUrl: "components/directives/header-strip/header-strip-tpl.html",
            transclude: true,
            scope: {
                delete: "&",
                item: "="
            },
            restrict: "E",
            controller: function ($scope, $rootScope,  modalSrv){

                $scope.productsInterface= productsInterface;
                $scope.contactsInterface= contactsInterface;
                $scope.telekomsInterface= telekomsInterface;
                $scope.kategorieInterface= kategorieInterface;
                $scope.artykulyInterface= artykulyInterface;

                console.log('actpage = ', $rootScope.actpage);
                //$scope.actpage = $rootScope.actpage;

                $scope.signIn = function () {
                    modalSrv.show("components/modal/modal-login-tpl.html",
                        null,
                    'sm',
                    function (data){
                       userInterface.signIn(data);
                    });
                };
                $scope.signOut = function () {
                    userInterface.signOut();
                };

                !$cookieStore.get('logged') && $scope.signIn();
            }
        }
    });

