/**
 * Created by student on 2015-06-16.
 */
angular
    .module('myApp.kategorieItemDctv', [])
    .directive('kategorieItemDctv', function () {
        return {
            restrict: "E",
            scope: {
                item: "=",
                update: "&",
                delete: "&",
                itemart: "="
            },
            templateUrl: "components/directives/kategorie-item/kategorie-item-tpl.html",
            controller: function ($scope /*artykulyInterface*/) {

                //$scope.itemart = artykulyInterface.fetchkat($scope.item.id);
                //console.log("Artykuły - ", $scope.itemart);
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
    });