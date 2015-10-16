angular
    .module('myApp.artykulyInterface', [])
    .service('artykulyInterface', function (artykulyRequest, modalSrv, $timeout, $rootScope, $http) {
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
                                alert('usunięto artykuł!');
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
                            $http({
                                method: 'GET',
                                url: 'fileput.php?arg1=articles/' + data.idkat + '/' + data.plik + '&arg2="Tu nalezy wpisać zawartość ..."'
                            }).then(function successCallback(response) {
                                // this callback will be called asynchronously
                                // when the response is available
                                $timeout(function () {
                                    alert('Dodano nowy artykuł ! - ' + response.status);
                                });
                            }, function errorCallback(response) {
                                // called asynchronously if an error occurs
                                // or server returns response with an error status.
                                $timeout(function () {
                                    alert('Błąd podczas zapisywania pliku ! ' + response.status);
                                });
                            });

                            /*$timeout(function () {
                                alert('Dodano nowy artykuł!');
                            });*/
                        });
                    });
            },
            update: function (item) {
                //console.log('Update artykuł!');
                artykulyRequest.update(item, function () {
                    //productsInterface.items.push(responseData.data);
                    $rootScope.userState.unsavedData = false;
                });
            }

        };
        return artykulyInterface;
    });