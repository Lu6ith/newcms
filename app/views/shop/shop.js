/**
 * Created by student on 2015-06-17.
 */
angular
    .module('myApp.shops', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('shops', {
                url: "/shops",
                template: '<div>\n    <a ui-sref="shops.item({id: \'shop1\'})">1111</a>\n    <a ui-sref="shops.item({id: \'shop2\'})">2222</a>\n</div>\n<div ui-view></div>'
            })
            .state('shops.item', {
                url: "/:id",
                templateUrl: "views/shop/shops-tpl.html",
                controller: "ShopsCtrl"
            });
    })
    .controller('ShopsCtrl', function ($scope , $http, CONFIG, $state) {

        $scope.$on('mapInitialized', function (evt, evtMap) {

            $http.get(CONFIG.API + $state.params.id + '.json')
                .success(function (responseData) {
                    $scope.shopName = responseData.data.name;
                    $scope.data = responseData.data;
                    $scope.map.setZoom(6);
                    $scope.map.setOptions({
                        draggable: false,
                        zoomControl: true,
                        scrollwheel: true,
                        disableDoubleClickZoom: true
                    });
                    setMarker($scope.data);
                });

        });

        function setMarker(data) {
            var marker = new google.maps.Marker({
                title: data.name
            });
            // d�?ugo�?�? i szeroko�?�? geograficzna
            var lat = data.position.lat;
            var lng = data.position.lng;
            var loc = new google.maps.LatLng(lat, lng);
            marker.setPosition(loc);
            marker.setMap($scope.map);
        }
    });

