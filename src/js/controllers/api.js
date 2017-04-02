angular.module('app')
    .controller('apiList', [
        '$rootScope',
        '$scope',
        'kong.api',
        function ($rootScope, $scope, kongAPI) {
            var apis = kongAPI($rootScope.kongHTTPAddress);

            $scope.delete = function (id) {
                if (confirm("Sure ?")) {
                    apis.delete({id: id});

                    for (var i = 0; i < $scope.apis.length; i++) {
                        if ($scope.apis[i].id == id) {
                            $scope.apis.splice(i, 1);
                            return
                        }
                    }
                }
            };

            apis.all(function (data) {
                $scope.apis = data.data
            })

        }])
    .controller('apiCreate', [
        '$rootScope',
        '$scope',
        'kong.api',
        '$location',
        function($rootScope, $scope, kongAPI, $location) {
            $scope.apiAction = 'Create';
            apis = kongAPI($rootScope.kongHTTPAddress);

            $scope.api = {
                strip_uri: false,
                preserve_host: false,
                http_if_terminated: true,
                https_only: false,
                upstream_read_timeout: 60000,
                upstream_send_timeout: 60000,
                upstream_connect_timeout: 60000,
                retries: 5
            };

            $scope.submit = function(){
                apis.create($scope.api, function(){
                    $location.path('/api');
                }, function(data){
                    $scope.error = data.data;
                })
            }
        }
    ])
    .controller('apiEdit', [
        '$rootScope',
        '$scope',
        'kong.api',
        '$location',
        '$routeParams',
        function($rootScope, $scope, kongAPI, $location, $routeParams) {
            $scope.apiAction = 'Edit';
            var apis = kongAPI($rootScope.kongHTTPAddress);
            console.log($routeParams.id);

            apis.get({id: $routeParams.id}, {}, function(data){
                $scope.api = data;
            });

            $scope.submit = function(){
                apis.update({id: $routeParams.id}, $scope.api, function(){
                    $location.path('/api');
                }, function(data){
                    $scope.error = data.data;
                })
            }
        }
    ]);