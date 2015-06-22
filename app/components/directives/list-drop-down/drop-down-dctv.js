angular
    .module('myApp.listDropDownDctv', [])
    .directive('listDropDownDctv', function () {
        return {
            restrict: 'A',
            controller: function () {
                this.current = undefined;
            }
        }
    })

    .directive('itemDropDownDctv', function () {
        return {
            scope: true,
            restrict: 'A',
            require: "^listDropDownDctv",
            link: function ($scope, element, attrs, listDropDownCtrl) {
                $scope.setActive = function (item) {
                    if (listDropDownCtrl.current) {
                        if (listDropDownCtrl.current === item) {
                            item.active = !item.active;
                        } else {
                            listDropDownCtrl.current.active = false;
                            item.active = true;
                            listDropDownCtrl.current = item;
                        }
                    } else {
                        item.active = true;
                        listDropDownCtrl.current = item;
                    }
                }
            }
        }
    })