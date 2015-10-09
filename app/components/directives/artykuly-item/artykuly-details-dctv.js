angular
    .module('myApp.artykulyDetailsDctv', [])
    .directive('artykulyDetailsDctv', function () {
        return {
            restrict: "E",
            scope: {
                item: "=",
                lengthzero: "=",
                checked: "=",
                update: "&",
                delete: "&"
            },
            templateUrl: "components/directives/artykuly-item/artykuly-details-tpl.html",
            controller: function ($scope) {
                //$scope.lengthzero = false;
                //console.log('Div - ', $("#markdiv1").length);
                //if ($("#markdiv1").length == 1) { $scope.lengthzero = true;}
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