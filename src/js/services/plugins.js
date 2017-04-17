/**
 * Created by mihael on 02.04.17.
 */

angular.module('app')
    .factory('kong.plugins', function ($resource) {
        return function (address) {
            return $resource(address + '/plugins', {}, {
                all: {
                    method: 'GET',
                    url: address + '/plugins'
                },
                enabled: {
                    method: 'GET',
                    url: address + '/plugins/enabled'
                },
                schema: {
                    method: 'GET',
                    url: address + '/plugins/schema/:name'
                },
                add: {
                    method: 'POST',
                    url: address + '/apis/:id/plugins/'
                },
                delete: {
                    method: 'DELETE',
                    url: address + '/apis/:api_id/plugins/:id'
                },
                get: {
                    method: 'GET',
                    url: address + '/plugins/:id'
                },
                update: {
                    method: 'PATCH',
                    url: address + '/apis/:api_id/plugins/:id'
                }
            });
        }
    });
