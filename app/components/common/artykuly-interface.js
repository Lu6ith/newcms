angular
    .module('myApp.artykulyInterface', [])
    .service('artykulyInterface', function (artykulyRequest, modalSrv, $timeout, $rootScope) {
        var artykulyInterface = {
            fetch: function () {
                artykulyRequest.fetch(function (responseData) {
                    artykulyInterface.items = responseData;
                    //console.log('contactInterface - ', contactsInterface.items);
                });
            },
            fetchkat: function (id) {
                artykulyRequest.fetchkat(id, function (responseData) {
                    artykulyInterface.itemskat = responseData;
                    //console.log('Id kategorii - ', id, artykulyInterface.itemskat);
                });
            },
            delete: function (item) {
                modalSrv.show('components/modal/modal-remove-artykuly-tpl.html',
                    item,
                    'sm',
                    function (data) {
                        artykulyRequest.delete(_.pick(data, 'id'), function (responseData) {
                            var itemindex = _.indexOf(artykulyInterface.items, item);
                            console.log('Index of artykuly - ', itemindex);
                            artykulyInterface.items.splice(itemindex, 1);
                            $timeout(function () {
                                alert('usunięto!');
                            });
                        });
                    });
            },

            add: function (item) {
                modalSrv.show('components/modal/modal-add-artykuly-tpl.html',
                    item,
                    '',
                    function (data) {
                        data.title = 'artykul';
                        artykulyRequest.add(data, function (responseData) {
                            console.log('response',responseData );
                            artykulyInterface.items.push(responseData);
                            $timeout(function () {
                                alert('Dodano nowy artykuł!');
                            });
                        });
                    });
            },
            update: function (item) {
                artykulyRequest.update(item, function () {
                    //productsInterface.items.push(responseData.data);
                    $rootScope.userState.unsavedData = false;
                });
            }

        };
        return artykulyInterface;
    });