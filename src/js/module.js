angular.module('app', [
        'ngRoute',
        'ngResource',
        'ui.bootstrap'
    ])
    .run(['$rootScope', 'kong.ping', function ($rootScope, pingService) {
        $rootScope.kongAddress = "";
        if (window.localStorage.getItem('host') != null) {
            $rootScope.kongAddress = window.localStorage.getItem('host');
            $rootScope.kongAddress = $rootScope.kongAddress.replace(/\/$/, "");
            $rootScope.kongHTTPAddress = "http://" + $rootScope.kongAddress
        }

        $rootScope.testConnection = function () {
            if ($rootScope.kongAddress != "") {
                $rootScope.kongAddress = $rootScope.kongAddress.replace(/\/$/, "");
                pingService("http://" + $rootScope.kongAddress, function (version) {
                    alert("Success, Kong version: " + version);
                    window.localStorage.setItem('host', $rootScope.kongAddress);
                    $rootScope.kongHTTPAddress = "http://" + $rootScope.kongAddress
                }, function () {
                    alert('Failure :(');
                })
            }
        }
    }])
    .config([
        '$routeProvider', function ($routeProvider) {

            $routeProvider
                .when('/', {
                    templateUrl: './templates/index.html',
                    title: 'Kong Admin'
                })
                .when('/api', {
                    templateUrl: './templates/api/list.html',
                    controller: 'apiList'
                })
                .when('/api/edit/:id', {
                    templateUrl: './templates/api/api.html',
                    controller: 'apiEdit'
                })
                .when('/api/create', {
                    templateUrl: './templates/api/api.html',
                    controller: 'apiCreate'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }]);