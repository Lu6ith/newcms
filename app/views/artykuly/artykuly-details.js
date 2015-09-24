angular
    .module('myApp.artykulyDetails', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('artykuly-details', {
                url: '/artykuly',
                template: '<ui-view></ui-view>',
                ncyBreadcrumb: {
                    label: "artykuly"
                }
            })
            .state('artykuly-details.item', {
                url: '/:id',
                templateUrl: 'views/artykuly/artykuly-details-tpl.html',
                controller: 'artykulyDetailsCtrl',
                ncyBreadcrumb: {
                    label: "{{data.tytul | limitTo : 40}}{{(data.tytul.length > 40) && '...' || ''}}"
                },
                resolve: {
                    responseData: function (artykulyRequest, $stateParams) {
                        return artykulyRequest.fetchone({id: $stateParams.id});
                    }
                }
            });
    })
    .controller('artykulyDetailsCtrl', function ($scope, responseData, artykulyRequest) {
        responseData.$promise.then(function (data) {
            $scope.data = data;
            console.log('Artykuł - ', $scope.data);
        });
        $scope.$root.unsaved = true;
        $scope.update = function () {
            artykulyRequest.update($scope.data,
                function (responseData) {
                    $scope.$root.unsaved = !responseData.status;
                    alert('zmiany zapisane');
                });
        };
    });