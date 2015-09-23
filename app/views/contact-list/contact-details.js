angular
    .module('myApp.contactDetails', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('contact-details', {
                url: '/employees',
                template: '<ui-view></ui-view>',
                ncyBreadcrumb: {
                    label: "kontakt"
                }
            })
            .state('contact-details.item', {
                url: '/:id',
                templateUrl: 'views/contact-list/contact-details-tpl.html',
                controller: 'ContactDetailsCtrl',
                ncyBreadcrumb: {
                    label: "{{data.lastName | limitTo : 50}}{{(data.lastName.length > 50) && '...' || ''}}"
                },
                resolve: {
                    responseData: function (contactsRequest, $stateParams) {
                        return contactsRequest.fetchone({id: $stateParams.id});
                    }
                }
            });
    })
    .controller('ContactDetailsCtrl', function ($scope, responseData, contactsRequest) {
        responseData.$promise.then(function (data) {
            $scope.data = data;
        });
        $scope.$root.unsaved = true;
        $scope.update = function () {
            contactsRequest.update($scope.data,
                function (responseData) {
                    $scope.$root.unsaved = !responseData.status;
                    alert('zmiany zapisane');
                });
        };
    });