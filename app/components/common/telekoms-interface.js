/**
 * Created by student on 2015-06-16.
 */
angular
    .module('myApp.telekomsInterface', [])
    .service('telekomsInterface', function (telekomRequest, modalSrv, $timeout, $rootScope) {
        var telekomsInterface = {
            fetch: function () {
                telekomRequest.fetch(function (responseData) {
                    telekomsInterface.items = responseData;
                    //console.log('telekomInterface - ', telekomsInterface.items);
                });
            },
            delete: function (item) {
                modalSrv.show('components/modal/modal-remove-telekom-tpl.html',
                    item,
                    'sm',
                    function (data) {
                        telekomRequest.delete(_.pick(data, 'id'), function (responseData) {
                            var itemindex = _.indexOf(telekomsInterface.items, item);
                            telekomsInterface.items.splice(itemindex, 1);
                            $timeout(function () {
                                alert('usunięto!');
                            })
                        })
                    });
            },

            add: function (item) {
                modalSrv.show('components/modal/modal-add-telekom-tpl.html',
                    item,
                    '',
                    function (data) {
                        data.title = 'pracownik';
                        telekomRequest.add(data, function (responseData) {
                            console.log('response',responseData );
                            telekomsInterface.items.push(responseData);
                            $timeout(function () {
                                alert('Dodano nowego pracownika!');
                            })
                        })
                    });
            },
            update: function (item) {
                telekomRequest.update(item, function () {
                    //productsInterface.items.push(responseData.data);
                    $rootScope.userState.unsavedData = false;
                })
            }

        };
        return telekomsInterface;
    });