angular
    .module('myApp.contactList', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('contact-list', {
                url: '/employees',
                templateUrl: 'views/contact-list/contact-list-tpl.html',
                controller: 'ContactListCtrl',
                ncyBreadcrumb: {
                    label: 'Kontakty'
                }
            });
    })

    .controller('ContactListCtrl', function ($scope, contactsInterface) {

        $scope.contactsInterface = contactsInterface;

        contactsInterface.fetch();

        $scope.searchControl = {};
        //console.log('Kontakty: ', $scope.contactsInterface.items);

        $scope.paginationSettings = {
            currentPage: 1,
            itemsPerPage: 10
        };

    });