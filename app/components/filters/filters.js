angular
    .module('myApp.filters', [])
    .filter('startFromFtr', function () {
        return function (input, currentPage, itemsPerPage) {
            if (!input || !input.length) {
                return;
            }
            var start = (currentPage - 1) * itemsPerPage;
            return input.slice(start);
        }
    });