/**
 * Created by Zuhaib on 12/3/2016.
 */
app.controller('AppCtrl', ['$scope', '$http', 'socket', 'upload', 'appService', function($scope, $http, socket, upload, appService){
    /*$scope.success = true;*/
    socket.emit('hello', function () {});

    console.log('appService: ', appService)

    upload.listenOnInput("upload_input");

    socket.on('fileUploadSuccess', function (data) {
        $scope.success =  data.success;
        console.log('success: ', data.success);
    });

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
            console.log(response);
            $scope.clear();
            refresh(); //Refresh and bind updated data
        });
    };

    $scope.remove = function (id) {
        console.log(id);
        $http.delete('/contacts/' + id).success(function(response) {
            refresh(); //Refresh and bind updated data
        });
        $scope.clear();
    };

    $scope.edit = function (id) {
        console.log(id);
        $http.get('/contacts/' + id).success(function(response){
            $scope.contact = response;
            refresh(); //Refresh and bind updated data
        });
    };

    $scope.update = function() {
        console.log($scope.contact._id);
        $http.put('/contacts/' + $scope.contact._id, $scope.contact).success(function (response) {
            console.log('PUT', response);
            refresh(); //Refresh and bind updated data
            $scope.clear();
        });
    };

    $scope.clear = function() {
        $scope.contact = '';
    };
}]);
