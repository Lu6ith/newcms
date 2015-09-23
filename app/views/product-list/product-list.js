angular
    .module('myApp.productList', ['myApp.sortDctv'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('product-list', {
                url: '/product-list',
                templateUrl: 'views/product-list/product-list-tpl.html',
                controller: 'ProductListCtrl',
                ncyBreadcrumb: {
                    label: 'Produkty'
                }
            });
    })

    .controller('ProductListCtrl', function ($scope, productsInterface) {

        $scope.productsInterface = productsInterface;

        productsInterface.fetch();

        $scope.searchControl = {};

        $scope.paginationSettings = {
            currentPage: 1,
            itemsPerPage: 5
        };

    });