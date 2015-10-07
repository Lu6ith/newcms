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
                    label: "{{dataart.tytul | limitTo : 40}}{{(dataart.tytul.length > 40) && '...' || ''}}"
                },
                resolve: {
                    responseData: function (artykulyRequest, $stateParams) {
                        return artykulyRequest.fetchone({id: $stateParams.id});
                    },
                    responseDataKat: function (kategorieRequest) {
                        return kategorieRequest.fetch();
                    }
                }
            });
    })
    .controller('artykulyDetailsCtrl', function ($scope, responseData, responseDataKat, artykulyRequest) {
        responseData.$promise.then(function (data) {
            $scope.dataart = data;
            //$scope.datart = $scope.dataart.data;
            //console.log('Artykuł - ', $scope.dataart);
            //console.log('Data - ', $scope.datart);
            //$scope.idkat = null;
            $scope.dateNew = new Date();
            $scope.dateNew = $scope.dataart.data;
            //console.log('Data - ', $scope.dateNew);
        });
        responseDataKat.$promise.then(function (data) {
            $scope.datakat = data;
            $scope.selectedKat = {"id": $scope.dataart.idkat, "kategoria": $scope.datakat[$scope.dataart.idkat - 1].kategoria};
            //console.log('Sel Kategoria - ', $scope.selectedKat);
        });

        $scope.$root.unsaved = true;
        $scope.update = function () {
            $scope.dataart.idkat = $scope.selectedKat.id;
            artykulyRequest.update($scope.dataart,
                function (responseData) {
                    $scope.$root.unsaved = !responseData.status;
                    alert('zmiany zapisane');
                });
        };
        $scope.updateart = function (art) {
            console.log('Update art. !', art);
        }
    });