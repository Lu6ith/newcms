/**
 * Created by student on 2015-06-16.
 */
angular
    .module('myApp.inputDctv', ['ngMessages'])
    .directive('inputDctv', function (){
        return {
            templateUrl: "components/directives/input/input-tpl.html",
            transclude: true,
            scope: {
                errorMsg: "=",
                model: "="
            },
            compile: function (el, attrs, $scope) {
                //debugger
                $scope.today = function() {
                    $scope.dt = new Date();
                };
                $scope.today();

                $scope.dateOptions = {
                    formatYear: 'yyyy',
                    startingDay: 1
                };

                var tpl = attrs.type === 'textarea'
                    ? angular.element("<textarea>")
                    : angular.element("<input>").attr('type',attrs.type).attr('aria-describedby', 'sizing-addon3').attr('class', 'form-control');

                tpl.attr({
                    required: 'required',
                    placeholder: attrs.placeholder,
                    'ng-model': 'model',
                    'ng-value': attrs.value,
                    'ng-minlength': attrs.minlength || 3
                });

                if (attrs.type === 'date') {
                   tpl.attr({
                       'datepicker-popup': '',
                       'ng-value': $scope.dt
                      /* 'datepicker-options': 'dateOptions'*/
                   })
                }

                var inputContent = el[0].getElementsByClassName('input-content');
                angular.element(inputContent).append(tpl);
            }
        }
    });
