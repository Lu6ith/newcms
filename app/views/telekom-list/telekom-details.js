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
                    },
                    responseDelegacje: function (delegacjeRequest, $stateParams) {
                        return delegacjeRequest.fetch({id: $stateParams.id});
                    }
                }
            })
    })
    .controller('telekomDetailsCtrl', function ($scope, $rootScope, responseData, responseDyzur, responseDelegacje, telekomRequest, dyzuryRequest, telekomsInterface) {
        responseData.$promise.then(function (data) {
            $scope.data = data;
        });
        responseDyzur.$promise.then(function (data) {
            $scope.datadyzur = data;
            telekomsInterface.datadyzur = $scope.datadyzur;
        });
        responseDelegacje.$promise.then(function (data) {
            $scope.delegacje = data;
            telekomsInterface.delegacje = $scope.delegacje;

            $scope.sumakil = $scope.sumkil();
            $scope.sumagodz = $scope.sumgodz();

            $scope.options = {
                chart: {
                    type: 'discreteBarChart',
                    height: 450,
                    width: 400,
                    margin : {
                        top: 20,
                        right: 20,
                        bottom: 60,
                        left: 55
                    },
                    x: function(d){ return d.label; },
                    y: function(d){ return d.value; },
                    showValues: true,
                    valueFormat: function(d){
                        return d3.format(',.4f')(d);
                    },
                    transitionDuration: 500,
                    xAxis: {
                        axisLabel: 'X Axis'
                    },
                    yAxis: {
                        axisLabel: 'Y Axis',
                        axisLabelDistance: 30
                    }
                }
            };

            $scope.data = [{
                key: "Cumulative Return",
                values: [
                    { "label" : "A" , "value" : -29.765957771107 },
                    { "label" : "B" , "value" : 0 },
                    { "label" : "C" , "value" : 32.807804682612 },
                    { "label" : "D" , "value" : 196.45946739256 },
                    { "label" : "E" , "value" : 0.19434030906893 },
                    { "label" : "F" , "value" : -98.079782601442 },
                    { "label" : "G" , "value" : -13.925743130903 },
                    { "label" : "H" , "value" : -5.1387322875705 }
                ]
            }];

        });

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        $scope.sumkil = function(){
            var total = 0;
            for(var i = 0; i < $scope.delegacje.length; i++){
                var deleg = $scope.delegacje[i];
                total += (deleg.kilometry);
            }
            console.log('Suma kil: ', total);
            return total;
        };

        $scope.sumgodz = function(){
            var total = 0;
            for(var i = 0; i < $scope.delegacje.length; i++){
                var deleg = $scope.delegacje[i];
                total += (deleg.nadgodziny);
            }
            console.log('Suma godz: ', total);
            return total;
        };

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
        $scope.adddel = function () {
            $rootScope.datadelid = $scope.data.id;
            telekomsInterface.addeleg();
        };
        $scope.del = function (id) {
            $rootScope.dataid = $scope.data.id;
            telekomsInterface.deletedyzur(id);
        };
        $scope.deldel = function (id) {
            $rootScope.datadelid = $scope.data.id;
            telekomsInterface.deletedeleg(id);
        };

/*        $scope.sumkil = _.reduce($scope.delegacje, function(del, o){
            for (var p in o)
                del = del + o.kilometry[p];
            return del;
        }, {});*/
    });