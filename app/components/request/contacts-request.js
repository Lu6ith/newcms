/**
 * Created by student on 2015-06-16.
 */
angular
    .module('myApp.contactsRequest', ['ngResource'])
    .service('contactsRequest', function ($resource, CONFIGC) {
        return $resource(CONFIGC.API + 'employees/:id', {id: "@id"}, {
            fetch: {
                method: 'GET',
                responseType: 'json',
                isArray: true
            },
            fetchone: {
                method: 'GET',
                responseType: 'json',
                isArray: false
            },
            update: {
                method: 'PUT'
            },
            add: {
                method: 'POST'
            },
            delete: {
                method: 'DELETE'
            }
        });
    });
