/**
 * Created by student on 2015-06-16.
 */
angular
    .module('myApp.contactsInterface', [])
    .service('contactsInterface', function (contactsRequest, modalSrv, $timeout, $rootScope) {
        var contactsInterface = {
            fetch: function () {
                contactsRequest.fetch(function (responseData) {
                    contactsInterface.items = responseData;
                    //console.log('contactInterface - ', contactsInterface.items);
                });
            },
            delete: function (item) {
                modalSrv.show('components/modal/modal-remove-contact-tpl.html',
                    item,
                    'sm',
                    function (data) {
                        contactsRequest.delete(_.pick(data, 'id'), function (responseData) {
                            var itemindex = _.indexOf(contactsInterface.items, item);
                            contactsInterface.items.splice(itemindex, 1);
                            $timeout(function () {
                                alert('usunięto!');
                            })
                        })
                    });
            },

            add: function (item) {
                modalSrv.show('components/modal/modal-add-contact-tpl.html',
                    item,
                    '',
                    function (data) {
                        data.title = 'pracownik';
                        contactsRequest.add(data, function (responseData) {
                            console.log('response',responseData );
                            contactsInterface.items.push(responseData);
                            $timeout(function () {
                                alert('Dodano nowy kontakt!');
                            })
                        })
                    });
            },
            update: function (item) {
                contactsRequest.update(item, function () {
                    //productsInterface.items.push(responseData.data);
                    $rootScope.userState.unsavedData = false;
                })
            }

        };
        return contactsInterface;
    });