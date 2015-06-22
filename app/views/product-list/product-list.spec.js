describe('ProductListCtrl', function () {
    var scope,
        $httpBackend,
        ctrl,
        data = {status: "OK", data:[1, 2, 3]};

    beforeEach(module('myApp'));
    beforeEach(inject(function (_$httpBackend_, $rootScope, $controller, CONFIG) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET(CONFIG.API + 'items/').respond(data);
        scope = $rootScope.$new();
        ctrl = $controller('ProductListCtrl', {$scope: scope});
    }));
    it('should fetch products list', function () {
        expect(scope.productsInterface.items).toBeUndefined();
        $httpBackend.flush();
        expect(angular.equals(scope.productsInterface.items, data.data)).toBeTruthy();
    });
});