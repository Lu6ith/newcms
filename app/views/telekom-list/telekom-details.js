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
    .controller('telekomDetailsCtrl', function ($scope, $rootScope, responseData, responseDyzur, responseDelegacje, telekomRequest, dyzuryRequest, telekomsInterface, $filter) {
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

            telekomsInterface.sumakil = $scope.sumkil();
            telekomsInterface.sumagodz = $scope.sumgodz();

            $scope.kilmies();
            $scope.ndgmies();

            var d = new Date();
            var mies = $filter('date')(d, 'M' );
            telekomsInterface.sumies = $scope.datakm[0].values[mies - 1].value;
            telekomsInterface.sumnad = $scope.datandg[0].values[mies - 1].value;

        });

        $scope.telekomsInterface = telekomsInterface;

        $scope.datakm = [{
            key: "Cumulative Return",
            values: [
                { "label" : "I" , "value" : -29.765957771107 },
                { "label" : "II" , "value" : 0 },
                { "label" : "III" , "value" : 32.807804682612 },
                { "label" : "IV" , "value" : 196.45946739256 },
                { "label" : "V" , "value" : 0.19434030906893 },
                { "label" : "VI" , "value" : -98.079782601442 },
                { "label" : "VII" , "value" : -13.925743130903 },
                { "label" : "VIII" , "value" : -5.1387322875705 },
                { "label" : "IX" , "value" : -5.1387322875705 },
                { "label" : "X" , "value" : -5.1387322875705 },
                { "label" : "XI" , "value" : -5.1387322875705 },
                { "label" : "XII" , "value" : -5.1387322875705 }
            ]
        }];

        $scope.datandg = [{
            key: "Cumulative Return",
            values: [
                { "label" : "I" , "value" : 0 },
                { "label" : "II" , "value" : 0 },
                { "label" : "III" , "value" : 0 },
                { "label" : "IV" , "value" : 0 },
                { "label" : "V" , "value" : 0 },
                { "label" : "VI" , "value" : 0 },
                { "label" : "VII" , "value" : 0 },
                { "label" : "VIII" , "value" : 0 },
                { "label" : "IX" , "value" : 0 },
                { "label" : "X" , "value" : 0 },
                { "label" : "XI" , "value" : 0 },
                { "label" : "XII" , "value" : 0 }
            ]
        }];

        telekomsInterface.datakm = $scope.datakm;
        telekomsInterface.datandg = $scope.datandg;

        $scope.optionskm = {
            chart: {
                type: 'discreteBarChart',
                height: 350,
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
                    return d3.format(',.1f')(d);
                },
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'Miesiące'
                },
                yAxis: {
                    axisLabel: 'Km w miesiącu',
                    axisLabelDistance: 30
                }
            }
        };

        $scope.optionsndg = {
            chart: {
                type: 'discreteBarChart',
                height: 350,
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
                    return d3.format(',.1f')(d);
                },
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'Miesiące'
                },
                yAxis: {
                    axisLabel: 'nadgodz. w miesiącu',
                    axisLabelDistance: 30
                }
            }
        };

        $scope.confignvd3 = {
            refreshDataOnly: true // default: false
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        $scope.sumkil = function(){
            var total = 0;
            for(var i = 0; i < $scope.delegacje.length; i++){
                var deleg = $scope.delegacje[i];
                total += parseInt(deleg.kilometry);
            }
            //console.log('Suma kil: ', total);
            return total;
        };

        $scope.sumgodz = function(){
            var total = 0;
            for(var i = 0; i < $scope.delegacje.length; i++){
                var deleg = $scope.delegacje[i];
                total += parseInt(deleg.nadgodziny);
            }
            //console.log('Suma godz: ', total);
            return total;
        };

        $scope.kilmies = function(){
            var mies = 0;
            var d = new Date();
            for(var i=0; i < 12; i++){
                $scope.datakm[0].values[i].value = 0;
            }
            for(var i = 0; i < $scope.delegacje.length; i++){
                var deleg = $scope.delegacje[i];
                d = deleg.datadel;
                mies = $filter('date')(d, 'M' );
                $scope.datakm[0].values[mies - 1].value += parseInt(deleg.kilometry);
            }
        };

        $scope.ndgmies = function(){
            var mies = 0;
            var d = new Date();
            for(var i=0; i < 12; i++){
                $scope.datandg[0].values[i].value = 0;
            }
            for(var i = 0; i < $scope.delegacje.length; i++){
                var deleg = $scope.delegacje[i];
                d = deleg.datadel;
                mies = $filter('date')(d, 'M' );
                $scope.datandg[0].values[mies - 1].value += parseInt(deleg.nadgodziny);
            }
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
            //console.log('response add delegac - ', $scope.sumakil, $scope.sumagodz);
        };
        $scope.del = function (item) {
            $rootScope.dataid = $scope.data.id;
            telekomsInterface.deletedyzur(item);
        };
        $scope.deldel = function (item) {
            $rootScope.datadelid = $scope.data.id;
            telekomsInterface.deletedeleg(item);
            //console.log('response del delegac - ', $scope.sumakil, $scope.sumagodz);
        };

/*        $scope.sumkil = _.reduce($scope.delegacje, function(del, o){
            for (var p in o)
                del = del + o.kilometry[p];
            return del;
        }, {});*/
    });