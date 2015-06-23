angular.module('myApp.sortDctv', [])

    .directive('sortDctv', function () {
        return {
            restrict: "A",
            transclude: true,
            scope: {
                sortSettings: "=",
                sortName: "@",
                sortCallback: "&"
            },
            templateUrl: "components/directives/product-item/sort-tpl.html",

            link: function (scope) {
                scope.sortSettings.sortName === scope.sortName && (scope.sortSettings.sortBy = scope.sortName);
                scope.sorting = function () {
                    scope.sortSettings.sortBy = scope.sortName;
                    scope.sortSettings.desc = scope.sortSettings.sortBy === scope.sortName && !scope.sortSettings.desc;
                    scope.sortSettings.sortBy = scope.sortName;
                    scope.sortCallback && scope.sortCallback();
                }
            }
        }
    })