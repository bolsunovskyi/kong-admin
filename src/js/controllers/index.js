angular.module('app')
    .controller('index', [
        '$rootScope',
        '$scope',
        'kong.status',
        function($rootScope, $scope, kongStatus) {
            kongStatus($rootScope.kongHTTPAddress, function(data){
                $scope.status = data;
            });
        }
    ]);