/**
 * Created by mike on 4/19/17.
 */

angular.module('app')
    .factory('kong.consumers', function ($resource) {
        return function (address) {
            return $resource(address + '/consumers', {}, {
                all: {
                    method: 'GET',
                    url: address + '/consumers'
                },
                get: {
                    method: 'GET',
                    url: address + '/consumers/:id'
                },
                add: {
                    method: 'POST',
                    url: address + '/consumers'
                },
                update: {
                    method: 'PATCH',
                    url: address + '/consumers/:id'
                },
                delete: {
                    method: 'DELETE',
                    url: address + '/consumers/:id'
                }
            });
        };
    });