angular.module('app')
    .factory('kong.ping', function ($http) {
        return function (address, success, error) {
            $http({
                method: 'GET',
                url: address
            }).then(function (rsp) {
                if (rsp.hasOwnProperty('data') && rsp.data.hasOwnProperty('version')) {
                    success(rsp.data.version);
                    return
                }
                error();
            }, error);
        };
    })
    .factory('kong.status', function($http){
        return function (address, success) {
            $http({
                method: 'GET',
                url: address + '/status'
            }).then(function(rsp){
                if (rsp.hasOwnProperty('data') && rsp.data.hasOwnProperty('server')) {
                    success(rsp.data)
                }
            })
        }
    });