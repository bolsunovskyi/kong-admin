/**
 * Created by mihael on 02.04.17.
 */

angular.module('app')
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