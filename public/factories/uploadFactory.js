/**
 * Created by Zuhaib on 12/3/2016.
 */
app.factory('upload', ['socket', '$rootScope', function(socket, $rootScope) {
    console.log('upload factory loaded yes');
    // Initialize instances:
    var socket = socket.socketInstance;
    var siofu = new SocketIOFileUpload(socket);

    return {
        listenOnInput: function (input) {
            siofu.listenOnInput(document.getElementById(input));
        }
    }
}]);