angular
    .module('myApp.telekomDetails', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('telekom-details', {
                url: '/telekom',
                template: '<ui-view></ui-view>',
                ncyBreadcrumb: {
                    label: "pracownik"
                }
            })
            .state('telekom-details.item', {
                url: '/:id',
                templateUrl: 'views/telekom-list/telekom-details-tpl.html',
                controller: 'telekomDetailsCtrl',
                ncyBreadcrumb: {
                    label: "{{data.lastName | limitTo : 50}}{{(data.lastName.length > 50) && '...' || ''}}"
                },
                resolve: {
                    responseData: function (telekomRequest, $stateParams) {
                        return telekomRequest.fetchone({id: $stateParams.id});
                    }
                }
            })
    })
    .controller('telekomDetailsCtrl', function ($scope, responseData, telekomRequest) {
        responseData.$promise.then(function (data) {
            $scope.data = data;
        })
        $scope.$root.unsaved = true;
        $scope.update = function () {
            telekomRequest.update($scope.data,
                function (responseData) {
                    $scope.$root.unsaved = !responseData.status;
                    alert('zmiany zapisane');
                })
        }
    });