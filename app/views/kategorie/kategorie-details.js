angular
    .module('myApp.kategorieDetails', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('kategorie-details', {
                url: '/kategorie',
                template: '<ui-view></ui-view>',
                ncyBreadcrumb: {
                    label: "Kategorie"
                }
            })
            .state('kategorie-details.item', {
                url: '/:id',
                templateUrl: 'views/kategorie/kategorie-details-tpl.html',
                controller: 'KategorieDetailsCtrl',
                ncyBreadcrumb: {
                    label: "{{data.kategoria | limitTo : 50}}{{(data.kategoria.length > 40) && '...' || ''}}"
                },
                resolve: {
                    responseData: function (kategorieRequest, $stateParams) {
                        return kategorieRequest.fetchone({id: $stateParams.id});
                    },
                    responseDataKat: function (artykulyRequest, $stateParams) {
                        return artykulyRequest.fetchkat({id: $stateParams.id});
                    }
                }
            });
    })
    .controller('KategorieDetailsCtrl', function ($scope, responseData, responseDataKat, kategorieRequest) {
        responseData.$promise.then(function (data) {
            $scope.data = data;
            //console.log('Kategoria - ', $scope.data);
        });
        responseDataKat.$promise.then(function (data) {
            $scope.dataart = data;
            console.log('Artykuly - ', $scope.dataart);
        });
        $scope.$root.unsaved = true;
        $scope.update = function () {
            kategorieRequest.update($scope.data,
                function (responseData) {
                    $scope.$root.unsaved = !responseData.status;
                    alert('zmiany zapisane');
                });
        };
    });