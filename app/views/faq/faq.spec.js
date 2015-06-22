describe('FaqCtrl', function () {

    var $httpBackend, scope, ctrl,
        data = {
            "status": "OK",
            "responseData": {
                "feed": {
                    "entries": [1, 2, 3]
                }
            }
        };

    beforeEach(module('myApp'));
    beforeEach(inject(function (_$httpBackend_, $rootScope, $controller, CONFIG) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET(CONFIG.API + 'faq.json').respond(data);
        scope = $rootScope.$new();
        ctrl = $controller('FaqCtrl', {$scope: scope});
    }));

    it('should has proper items.length', inject(function () {
        expect(scope.items).toBeUndefined();
        $httpBackend.flush();
        expect(scope.items.length).toBe(3);
    }))

})