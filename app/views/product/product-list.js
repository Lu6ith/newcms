/**
 * Created by student on 2015-06-16.
 */
angular
    .module('myApp.productList', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('product-list', {
                url: "/product-list",
                templateUrl: "views/product/product-tpl.html",
                controller: "productListCtrl"
            })
    })
    .controller('productListCtrl', function ($scope, productsInterface) {
        productsInterface.fetch();
        $scope.productsInterface = productsInterface;
        $scope.searchControl = {};
        $scope.paginationSettings = {
            currentPage: 1,
            itemsPerPage: 5
        }
    })