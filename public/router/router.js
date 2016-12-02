/**
 * Created by Zuhaib on 12/3/2016.
 */
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/app.html'
    });
}]);