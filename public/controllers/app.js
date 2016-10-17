/**
 * Created by Zuhaib Kathwari on 13-10-2016.
 */
var app = angular.module('ContactApp', []);

app.controller('AppCtrl', ['$scope', '$http', function($scope, $http){
    var refresh = function () {
        $http.get('/contacts').success(function(response){
            console.log('Data Recieved');
            $scope.contactList = response;
        }).error(function(err) {
            console.log(err);
        });
    };

    refresh(); //Refresh Data

    $scope.addContact = function () {
        $http.post('/contacts', $scope.contact).success(function(response){
            console.log('post response', response);
            $scope.contact = '';
            refresh(); //Refresh and bind updated data
        });
    }

    $scope.remove = function (id) {
        console.log(id);
        $http.delete('/contacts/' + id).success(function(response) {
            refresh(); //Refresh and bind updated data
        });
    }

    $scope.edit = function (id) {
        console.log(id);
        $http.get('/contacts/' + id).success(function(response){
            $scope.contact = response;
            refresh(); //Refresh and bind updated data
        });
    }

    $scope.update = function() {
        console.log($scope.contact._id);
        $http.put('/contacts/' + $scope.contact._id, $scope.contact).success(function (response) {
            console.log('PUT', response);
           refresh(); //Refresh and bind updated data
        });
    }
}]);