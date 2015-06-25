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
                    },
                    responseDyzur: function (dyzuryRequest, $stateParams) {
                        return dyzuryRequest.fetch({id: $stateParams.id});
                    }
                }
            })
    })
    .controller('telekomDetailsCtrl', function ($scope, $rootScope, responseData, responseDyzur, telekomRequest, dyzuryRequest, telekomsInterface) {
        responseData.$promise.then(function (data) {
            $scope.data = data;
        });
        responseDyzur.$promise.then(function (data) {
            $scope.datadyzur = data;
            telekomsInterface.datadyzur = $scope.datadyzur;
        });

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.$root.unsaved = true;
        $scope.update = function () {
            telekomRequest.update($scope.data,
                function (responseData) {
                    $scope.$root.unsaved = !responseData.status;
                    alert('zmiany zapisane');
                })
        };
        $scope.add = function () {
            $rootScope.dataid = $scope.data.id;
            telekomsInterface.addyzur();
        };
        $scope.del = function (id) {
            $rootScope.dataid = $scope.data.id;
            telekomsInterface.deletedyzur(id);
        }
    });