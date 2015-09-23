angular

    .module('myApp', [
        'ngSanitize',
        'ui.router',
        'ngCookies',
        'ui.bootstrap',
        'ncy-angular-breadcrumb',
        'ngMap',
        'aside.menu',
        'nvd3',
        'myApp.contact',
        'myApp.productList',
        'myApp.contactList',
        'myApp.telekomList',
        'myApp.kategorieList',
        'myApp.productItemDctv',
        'myApp.contactItemDctv',
        'myApp.telekomItemDctv',
        'myApp.kategorieItemDctv',
        'myApp.productsInterface',
        'myApp.contactsInterface',
        'myApp.telekomsInterface',
        'myApp.kategorieInterface',
        'myApp.productsRequest',
        'myApp.contactsRequest',
        'myApp.dyzuryRequest',
        'myApp.delegacjeRequest',
        'myApp.telekomRequest',
        'myApp.productDetails',
        'myApp.contactDetails',
        'myApp.telekomDetails',
        'myApp.kategorieRequest',
        'myApp.shops',
        'myApp.faq',
        'myApp.inputDctv',
        'myApp.listDropDownDctv',
        'myApp.headerStripDctv',
        'myApp.upload',
        'myApp.modal',
        'myApp.filters',
        'myApp.security'
    ])

    .constant("CONFIG", {
        "API": "http://js.edu.pl/api/"
    })

    .constant("CONFIGC", {
        "API": "http://192.168.73.30/dirboot/directory-rest-php/"
    })

    .config(function ($urlRouterProvider, $resourceProvider, $httpProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
        $httpProvider.defaults.withCredentials = true;
        $urlRouterProvider.otherwise('/employees');
        //$httpProvider.interceptors.push('apiInterceptor');
    })

    .run(function ($rootScope, $cookieStore, userState, $filter) {
        var d = new Date();
        $rootScope.userState = userState;
        $rootScope._ = _;
        $rootScope.miesb = $filter('date')(d, 'M' );
        $rootScope.rokb = $filter('date')(d, 'yyyy' );
        userState.setUserAccess($cookieStore.get('logged'));
    });
