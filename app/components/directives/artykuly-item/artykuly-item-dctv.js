angular
    .module('myApp.artykulyItemDctv', [])
    .directive('artykulyItemDctv', function () {
        return {
            restrict: "E",
            scope: {
                item: "=",
                update: "&",
                delete: "&"
            },
            templateUrl: "components/directives/artykuly-item/artykuly-item-tpl.html",
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
    });