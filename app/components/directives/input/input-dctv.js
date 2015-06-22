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
            compile: function (el, attrs) {
                //debugger
                var tpl = attrs.type === 'textarea'
                    ? angular.element("<textarea>")
                    : angular.element("<input>").attr('type',attrs.type).attr('aria-describedby', 'sizing-addon3').attr('class', 'form-control');

                tpl.attr({
                    required: 'required',
                    'ng-model': 'model',
                    'ng-minlength': attrs.minlength || 3
                })

                var inputContent = el[0].getElementsByClassName('input-content');
                angular.element(inputContent).append(tpl);
            }
        }
    })
