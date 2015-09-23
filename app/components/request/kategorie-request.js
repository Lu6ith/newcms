angular
    .module('myApp.kategorieRequest', ['ngResource'])
    .service('kategorieRequest', function ($resource, CONFIGC) {
        return $resource(CONFIGC.API + 'kategorie/:id', {id: "@id"}, {
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
