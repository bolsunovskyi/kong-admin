/**
 * Created by mihael on 19.04.17.
 */

angular.module('app')
    .factory('kong.groups', function ($resource) {
        return function (address) {
            return $resource(address + '/consumers', {}, {
                all: {
                    method: 'GET',
                    url: address + '/consumers/:id/acls'
                },
                add: {
                    method: 'POST',
                    url: address + '/consumers/:id/acls'
                },
                delete: {
                    method: 'DELETE',
                    url: address + '/consumers/:id/acls/:group_id'
                }
            });
        };
    });