/**
 * Created by student on 2015-06-16.
 */
angular
    .module('myApp.telekomsInterface', [])
    .service('telekomsInterface', function (telekomRequest, dyzuryRequest, modalSrv, $timeout, $rootScope, $filter) {
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

            deletedyzur: function (item) {
                console.log('Dyzur item - ', item);
                modalSrv.show('components/modal/modal-remove-dyzur-tpl.html',
                    item,
                    'sm',
                    function (data) {
                        dyzuryRequest.delete({id: item}, function (responseData) {
                            var itemindex = _.indexOf(telekomsInterface.datadyzur, item);
                            telekomsInterface.datadyzur.splice(itemindex, 1);
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
                            //console.log('response',responseData );
                            telekomsInterface.items.push(responseData);
                            $timeout(function () {
                                alert('Dodano nowego pracownika!');
                            })
                        })
                    });
            },

            addyzur: function (item) {
                modalSrv.show('components/modal/modal-add-dyzur-tpl.html',
                    item,
                    '',
                    function (data) {
                        data.idem = $rootScope.dataid;
                        $filter('date')(data.datapocz, 'dd-MM-yyyy', 'GMT+0200');
                        $filter('date')(data.datakonc, 'dd-MM-yyyy', 'GMT+0200n');
                        console.log('Daty: ', data.datapocz, data.datakonc);
                        dyzuryRequest.add(data, function (responseData) {
                            //console.log('response',responseData );
                            telekomsInterface.datadyzur.push(responseData);
                            $timeout(function () {
                                alert('Dodano dyżur pracownikaa!');
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