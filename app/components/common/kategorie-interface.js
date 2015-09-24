/**
 * Created by student on 2015-06-16.
 */
angular
    .module('myApp.kategorieInterface', [])
    .service('kategorieInterface', function (kategorieRequest, modalSrv, $timeout, $rootScope) {
        var kategorieInterface = {
            fetch: function () {
                kategorieRequest.fetch(function (responseData) {
                    kategorieInterface.items = responseData;
                    //console.log('contactInterface - ', contactsInterface.items);
                });
            },
            delete: function (item) {
                modalSrv.show('components/modal/modal-remove-kategorie-tpl.html',
                    item,
                    'sm',
                    function (data) {
                        kategorieRequest.delete(_.pick(data, 'id'), function (responseData) {
                            var itemindex = _.indexOf(kategorieInterface.items, item);
                            console.log('Index of kategorie - ', itemindex);
                            kategorieInterface.items.splice(itemindex, 1);
                            $timeout(function () {
                                alert('usunięto!');
                            });
                        });
                    });
            },

            add: function (item) {
                modalSrv.show('components/modal/modal-add-kategorie-tpl.html',
                    item,
                    '',
                    function (data) {
                        data.title = 'kategoria';
                        kategorieRequest.add(data, function (responseData) {
                            console.log('response',responseData );
                            kategorieInterface.items.push(responseData);
                            $timeout(function () {
                                alert('Dodano nową kategorię!');
                            });
                        });
                    });
            },
            update: function (item) {
                kategorieRequest.update(item, function () {
                    //productsInterface.items.push(responseData.data);
                    $rootScope.userState.unsavedData = false;
                });
            }

        };
        return kategorieInterface;
    });