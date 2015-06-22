/**
 * Created by student on 2015-06-16.
 */
angular
    .module('myApp.modal', [])
    .service('modalSrv', function ($modal) {
        return {
            show: function (tplUrl, data, size, callback) {
                var myModal = $modal.open({
                    templateUrl: tplUrl,
                    size: size,
                    controller: function ($scope) {
                        $scope.data = data;
                        $scope.ok = function (valid) {
                            if (valid) {
                                myModal.close($scope.data);
                            } else {
                                $scope.errorMsg = true;
                            }
                        };
                        $scope.cancel = function () {
                            myModal.dismiss('cancel');
                        };
                    }
                });
                myModal.result.then(function (data) {
                    callback(data);
                }, function (info) {
                    console.log(info);
                });
            }
        };
    });
