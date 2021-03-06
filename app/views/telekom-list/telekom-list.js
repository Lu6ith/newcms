angular
    .module('myApp.telekomList', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('telekom-list', {
                url: '/telekom',
                templateUrl: 'views/telekom-list/telekom-list-tpl.html',
                controller: 'telekomListCtrl',
                ncyBreadcrumb: {
                    label: 'Pracownicy'
                }
            });
    })

    .controller('telekomListCtrl', function ($scope, $rootScope, telekomsInterface) {

        $scope.telekomsInterface = telekomsInterface;

        telekomsInterface.fetch();

        $rootScope.actpage = 'employees';

        $scope.searchControl = {};
        //console.log('Kontakty: ', $scope.telekomsInterface.items);

        $scope.paginationSettings = {
            currentPage: 1,
            itemsPerPage: 10
        };

    });