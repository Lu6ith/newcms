angular
    .module('myApp.artykulyRequest', ['ngResource'])
    .service('artykulyRequest', function ($resource, CONFIGC) {
        return $resource(CONFIGC.API + 'artykuly/:id', {id: "@id"}, {
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
            fetchkat: {
                method: 'GET',
                responseType: 'json',
                isArray: true
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
