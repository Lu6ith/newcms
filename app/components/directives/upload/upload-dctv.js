/**
 * Created by student on 2015-06-17.
 */
angular
    .module('myApp.upload', ['angularFileUpload'])
    .directive('uploadDctv', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                data: "=",
                errorMsg: "="
            },
            templateUrl: "components/directives/upload/upload-tpl.html",
            controller: function ($scope, $upload, CONFIG) {
                $scope.$watch('files', function () {
                    if (!$scope.files) return;
                    for (var i = 0; i < $scope.files.length; i++) {
                        var file = $scope.files[i];
                        $scope.upload = $upload.upload({
                            url: CONFIG.API + 'file.php',
                            file: file
                        }).progress(function (evt) {
                            $scope.percent = parseInt(100.0 * evt.loaded / evt.total);
                            console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :' + evt.config.file.name);
                        }).success(function (data, status, headers, config) {
                            console.log('file ' + config.file + 'is uploaded successfully. Response: ' + data);
                            $scope.data = data.file;
                        });
                    }
                });
            }
        }
    })
