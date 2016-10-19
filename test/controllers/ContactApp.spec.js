/**
 * Created by Zuhaib Kathwari on 20-10-2016.
 */
describe('AppCtrl', function(){
    var $rootScope,
        $scope,
        controller,
        $http,
        $httpBackend;

    beforeEach(function(){
       module('ContactApp');

       inject(function($injector){
           $rootScope = $injector.get('$rootScope');
           $scope = $rootScope.$new();
           controller = $injector.get('$controller')('AppCtrl', {$scope: $scope});
       });
    });

    beforeEach(inject(function(_$http_, _$httpBackend_){
        $http = _$http_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function(){
       $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('refresh', function(){
       it('should refresh and get the updated data whenever called', function(){
           var response = [{"_id":"57fe9d1a5cf9b50d31128e25","name":"tim","email":"tim@gmail.com","number":"675577-777-888"},{"_id":"57fe9d1a5cf9b50d31128e26","name":"foo","email":"foo@gmail.com","number":"6777-75577-888"}];
           $httpBackend.whenGET('/contacts').respond(response);
           $scope.getJson;
           $httpBackend.flush();
           expect($scope.contactList).toEqual(response);
       });
    });

    describe('addContact', function(){
        var response = '';
        it('should add the user input contact whenever called', function(){
            $httpBackend.expectPOST('/contacts', $scope.contact).respond(200, response);
            $httpBackend.flush();
            expect($scope.contact).toBe(response);
        });
    });
    /*});*/

});
