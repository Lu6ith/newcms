angular
    .module('myApp.artykulyList', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('artykuly-list', {
                url: '/artykuly',
                templateUrl: 'views/artykuly/artykuly-list-tpl.html',
                controller: 'artykulyListCtrl',
                ncyBreadcrumb: {
                    label: 'artykuly'
                }
            });
    })

    .controller('artykulyListCtrl', function ($scope, artykulyInterface) {

        $scope.artykulyInterface = artykulyInterface;

        artykulyInterface.fetch();

        $scope.searchControl = {};
        //console.log('Kontakty: ', $scope.contactsInterface.items);

        $scope.paginationSettings = {
            currentPage: 1,
            itemsPerPage: 10
        };

    });