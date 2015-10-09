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
    .controller('artykulyDetailsCtrl', function ($scope, $http, responseData, responseDataKat, artykulyRequest) {
        responseData.$promise.then(function (data) {
            $scope.dataart = data;
            $scope.dateNew = new Date();
            $scope.dateNew = $scope.dataart.data;
            $scope.ifile = false;
            $scope.checked = false;
/*            var url = 'articles/' + dataart.idkat +'/' + dataart.plik;
            var request = new XMLHttpRequest();
            request.open('HEAD', url, false);
            //request.send();
            if(request.status == 200) {
                $scope.ifile = false;
            } else {
                $scope.ifile = true;
            }
            console.log('ifile - ', $scope.ifile);*/
/*                $http.get('articles/' + dataart.idkat +'/' + dataart.plik)
                    //success
                    .success(function(data, status){
                        if(status==200) {$scope.ifile = false;}
                        else {
                            $scope.ifile = true;
                        }
                        console.log('ifile - ', $scope.ifile);
                    })
                    //failure
                    .error(function(data, staus){
                        if(status==200) {$scope.ifile = false;}
                        else {
                            $scope.ifile = true;
                        }
                        console.log('ifile - ', $scope.ifile);
                    });*/
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
            $scope.checked = !$scope.checked;
            if ($scope.checked) {
                var divHtml = $("div #markdiv2").html();
                var editableText = $('<textarea id="markdiv2">');
                editableText.val(divHtml);
                editableText.attr("ng-include");
                editableText.attr("src", "'articles/' + item.idkat + '/' + item.plik");
                editableText.attr("ng-show", "checked");
                $("div #markdiv2").replaceWith(editableText);
                editableText.focus();
            } else {
                var html = $('textarea #markdiv2').val();
                var viewableText = $("<div id='markdiv2' >");
                viewableText.html(html);
                viewableText.attr("ng-include");
                viewableText.attr("src", "'articles/' + item.idkat + '/' + item.plik");
                viewableText.attr("ng-show", "checked");
                $('textarea #markdiv2').replaceWith(viewableText);
            }

        };
    });