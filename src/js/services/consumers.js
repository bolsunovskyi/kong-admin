/**
 * Created by mike on 4/19/17.
 */

angular.module('app')
    .factory('kong.plugins', function ($resource) {
        return function (address) {
            return $resource(address + '/plugins', {}, {
                all: {
                    method: 'GET',
                    url: address + '/consumers'
                },
                get: {

                }
            });
        };
    });