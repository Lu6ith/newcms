angular
    .module('myApp.faq', [])

    .config(function ($stateProvider) {
        $stateProvider
            .state('faq', {
                url: '/faq',
                templateUrl: 'views/faq/faq-tpl.html',
                controller: 'FaqCtrl',
                ncyBreadcrumb: {
                    label: 'Faq'
                }
            });
    })

    .controller('FaqCtrl', function ($scope, $http, CONFIG) {
        $http.get(CONFIG.API + 'faq.json')
            .success(function (data) {
                $scope.items = data.responseData.feed.entries;
                $scope.currentPage = 1;
                $scope.itemsPerPage = 10;
                $scope.maxSize = 5;
            });
    });