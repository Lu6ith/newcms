describe('inputDctv', function () {
    beforeEach(module('myApp'));
    it('should set transclude and display error according to errorMsg', inject(function ($compile, $rootScope) {
            var scope = $rootScope.$new();
            var elem = angular.element("<ul list-drop-down><li item-drop-down></li></ul>");
            $compile(elem)(scope);
            /*expect(elem.find('span').html().trim()).toEqual('Twoje imię');
            expect(elem.find('small').length).toEqual(1);
            elem.find('div').scope().errorMsg = false;
            scope.$digest();
            expect(elem.find('small').length).toEqual(0);*/
            //console.log(elem.find('li').scope())
            console.log(elem)
        })
    );
});