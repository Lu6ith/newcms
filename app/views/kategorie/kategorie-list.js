angular
    .module('myApp.kategorieList', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('kategorie-list', {
                url: '/kategorie',
                templateUrl: 'views/kategorie/kategorie-list-tpl.html',
                controller: 'KategorieListCtrl',
                ncyBreadcrumb: {
                    label: 'Kategorie'
                }
            });
    })

    .controller('KategorieListCtrl', function ($scope, kategorieInterface) {

        $scope.kategorieInterface = kategorieInterface;

        kategorieInterface.fetch();

        $scope.searchControl = {};
        //console.log('Kontakty: ', $scope.contactsInterface.items);

        $scope.paginationSettings = {
            currentPage: 1,
            itemsPerPage: 10
        };

    });