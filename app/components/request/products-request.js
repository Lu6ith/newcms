/**
 * Created by student on 2015-06-16.
 */
angular
    .module('myApp.productsRequest', ['ngResource'])
    .service('productsRequest', function ($resource, CONFIG) {
        return $resource(CONFIG.API + 'items/:id', {id: "@id"}, {
            fetch: {
                method: 'GET'
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
