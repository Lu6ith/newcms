angular
    .module('myApp.productDetails', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('product-details', {
                url: '/product-details',
                template: '<ui-view></ui-view>',
                ncyBreadcrumb: {
                    label: "produkt"
                }
            })
            .state('product-details.item', {
                url: '/:id',
                templateUrl: 'views/product/product-details-tpl.html',
                controller: 'ProductDetailsCtrl',
                ncyBreadcrumb: {
                    label: "{{data.title | limitTo : 50}}{{(data.title.length > 50) && '...' || ''}}"
                },
                resolve: {
                    responseData: function (productsRequest, $stateParams) {
                        return productsRequest.fetch({id: $stateParams.id});
                    }
                }
            })
    })
    .controller('ProductDetailsCtrl', function ($scope, responseData, productsRequest) {
        responseData.$promise.then(function (data) {
            $scope.data = data.data;
        })
        $scope.$root.unsaved = true;
        $scope.update = function () {
            productsRequest.update($scope.data,
                function (responseData) {
                    $scope.$root.unsaved = !responseData.status;
                    alert('zmiany zapisane');
                })
        }
    });