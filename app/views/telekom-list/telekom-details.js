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

            $scope.lineChartData = {
                labels : ["","","","","","",""],
                series: ['Seria A', 'Seria B'],
                data: [
                    [65,59,90,81,56,55,40],
                    [28,48,40,19,96,27,100]
                ],
                datasets : [
                    {
                        fillColor : "rgba(220,220,220,0.5)",
                        strokeColor : "rgba(220,220,220,1)",
                        pointColor : "rgba(220,220,220,1)",
                        pointStrokeColor : "#fff",
                        data : [65,59,90,81,56,55,40]
                    },
                    {
                        fillColor : "rgba(151,187,205,0.5)",
                        strokeColor : "rgba(151,187,205,1)",
                        pointColor : "rgba(151,187,205,1)",
                        pointStrokeColor : "#fff",
                        data : [28,48,40,19,96,27,100]
                    }
                ]

            };
            $scope.barChartData = {
                labels : ["January","February","March","April","May","June","July"],
                series: ['Seria A', 'Seria B'],
                data: [{
                    x: "Seria A",
                    y: [65,59,90,81,56,55,40],
                    tooltip: "To jest seria A"
                },{
                    x: "Seria B",
                    y: [28,48,40,19,96,27,100],
                    tooltip: "To jest seria B"
                }],
                datasets : [
                    {
                        fillColor : "rgba(220,220,220,0.5)",
                        strokeColor : "rgba(220,220,220,1)",
                        data : [65,59,90,81,56,55,40]
                    },
                    {
                        fillColor : "rgba(151,187,205,0.5)",
                        strokeColor : "rgba(151,187,205,1)",
                        data : [28,48,40,19,96,27,100]
                    }
                ]

            };
            //new Chart(document.getElementById("line").getContext("2d")).Line(lineChartData);
            //new Chart(document.getElementById("bar").getContext("2d")).Bar(barChartData);
        });

        $scope.config = {
            title: 'Products',
            tooltips: true,
            labels: false,
            mouseover: function() {},
            mouseout: function() {},
            click: function() {},
            waitForHeightAndWidth: false,
            legend: {
                display: true,
                //could be 'left, right'
                position: 'right'
            }
        };

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