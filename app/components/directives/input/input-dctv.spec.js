/**
 * Created by student on 2015-06-17.
 */
describe('inputDctv', function () {
    beforeEach(module('myApp'));
    it('should set transclude and display error according to errorMsg', inject(function (_$httpBackend_, $compile, $rootScope) {
            var scope = $rootScope.$new();
            var elem = angular.element("<input-dctv error-msg='true'>Twoje imiÄ?</input-dctv>");
            $compile(elem)(scope);
            _$httpBackend_.expectGET('components/directives/input/input-tpl.html')
                .respond("<div ng-transclude></div><small ng-if='errorMsg'>required</small>");
            _$httpBackend_.flush();
            expect(elem.find('div[ng-transclude] > span').html().trim()).toEqual('Twoje imiÄ?');
            expect(elem.find('small').length).toEqual(1);
            elem.find('div').scope().errorMsg = false;
            scope.$digest();
            expect(elem.find('small').length).toEqual(0);
        })
    );
});