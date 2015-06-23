/**
 * Created by student on 2015-06-16.
 */
angular
    .module('myApp.telekomItemDctv', [])
    .directive('telekomItemDctv', function ($timeout) {
        return {
            restrict: "E",
            scope: {
                item: "=",
                update: "&",
                delete: "&"
            },
            templateUrl: "components/directives/telekom-item/telekom-item-tpl.html",
            controller: function ($scope) {

                // tworz� kopi� price
/*                $scope.price = $scope.item.price;

                $scope.$watch('price', function (newVal, oldVal) {
                    if (!angular.equals(newVal, oldVal)) {
                        $scope.$root.userState.unsavedData = true;
                        $timeout.cancel($scope.isTimeOut);
                        $scope.isTimeOut = $timeout(function () {
                            // aktualizuje model
                            $scope.item.price = +$scope.price;
                            // wysy�am request
                            $scope.update({item: $scope.item});
                        }, 1000);
                    }
                });*/
            }
        }
    })