/**
 * Created by mihael on 02.04.17.
 */

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
    .factory('kong.api', function ($resource) {
        return function (address) {
            return $resource(address + '/apis', {}, {
                create: {
                    method: 'POST',
                    url: address + '/apis'
                },
                all: {
                    method: 'GET',
                    url: address + '/apis'
                },
                get: {
                    method: 'GET',
                    url: address + '/apis/:id'
                },
                delete: {
                    method: 'DELETE',
                    url: address + '/apis/:id'
                },
                update: {
                    method: 'PATCH',
                    url: address + '/apis/:id'
                }
            });
        };
    });