/**
 * Created by student on 2015-06-16.
 */
angular

    .module('myApp.security', [])

    .service('userState', function ($cookieStore) {
        return {
            access: false,
            user: false,
            unsavedData: false,
            setUserAccess: function (access, msg) {
                this.access = !!access;
                this.user = access;
                access ? $cookieStore.put('logged', this.user) : $cookieStore.remove('logged');
                msg && alert(msg);
            }
        }
    })

    .service('userInterface', function ($cookieStore, $http, userState, CONFIG) {
        return {
            signIn: function (data) {
                $http.post(CONFIG.API + 'login/', data)
                    .success(function (responseData) {
                        userState.setUserAccess(responseData.user, 'zalogowano pomyślnie');
                    })
            },
            signOut: function () {
                $http.get(CONFIG.API + 'logout/')
                    .success(function () {
                        userState.setUserAccess(false);
                    })
            }
        }
    })

    .service('apiInterceptor', function ($q, userState) {
        return {
            'response': function (response) {
                var defer = $q.defer();
                var isObj = angular.isObject(response.data);
                if (isObj && response.data.status !== 'OK') {
                    userState.setUserAccess(false, 'ERROR: \n' + angular.toJson(response));
                    defer.reject(response);
                } else {
                    defer.resolve(response);
                }
                return defer.promise;
            },
            'responseError': function (rejection) {
                userState.setUserAccess(false, 'ERROR: \n' + angular.toJson(rejection));
                var defer = $q.defer();
                defer.reject(rejection);
                return defer.promise;
            }
        };
    });