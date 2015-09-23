/**
 * Created by student on 2015-06-16.
 */
angular
    .module('myApp.productsInterface', [])
    .service('productsInterface', function (productsRequest, modalSrv, $timeout, $rootScope) {
        var productsInterface = {
            fetch: function () {
                productsRequest.fetch(function (responseData) {
                    productsInterface.items = responseData.data;
                });
            },
            delete: function (item) {
                modalSrv.show('components/modal/modal-remove-product-tpl.html',
                    item,
                    'sm',
                    function (data) {
                        productsRequest.delete(_.pick(data, 'id'), function (responseData) {
                            var itemindex = _.indexOf(productsInterface.items, item);
                            productsInterface.items.splice(itemindex, 1);
                            $timeout(function () {
                                alert('usunięto!');
                            });
                        });
                    });
            },

            add: function (item) {
                modalSrv.show('components/modal/modal-add-product-tpl.html',
                    item,
                    '',
                    function (data) {
                        productsRequest.add(data, function (responseData) {
                            productsInterface.items.push(responseData.data);
                        });
                    });
            },
            update: function (item) {
                productsRequest.update(item, function () {
                    //productsInterface.items.push(responseData.data);
                    $rootScope.userState.unsavedData = false;
                });
            }

        };
        return productsInterface;
    });