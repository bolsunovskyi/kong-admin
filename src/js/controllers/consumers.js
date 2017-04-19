angular.module('app')
    .controller('consumersEdit', [
        '$scope',
        '$routeParams',
        '$rootScope',
        'kong.consumers',
        '$location',
        'kong.groups',
        function($scope, $routeParams, $rootScope, service, $location, groups){
            $scope.pluginAction = 'Edit';
            var cService = service($rootScope.kongHTTPAddress);

            cService.get({id: $routeParams.id}, function(data){
                $scope.consumer = data;
            });

            $scope.submit = function(){
                cService.update({id: $routeParams.id}, $scope.consumer, function(){
                    $location.path('/consumers');
                }, function(data){
                    $scope.error = data.data;
                });
            };

            $scope.groups = [];
            var groupService = groups($rootScope.kongHTTPAddress);
            $scope.group = {};
            $scope.addGroup = function(){
                groupService.add({id: $routeParams.id}, {group: $scope.group.name}, function(data){
                    $scope.groups.push(data);
                    $scope.group.name = '';
                }, function(err){
                    $scope.error = err.data;
                });
            };

            groupService.all({id: $routeParams.id}, function(data){
                $scope.groups = data.data;
            });

            $scope.deleteGroup = function(id){
                if (confirm('Sure ?')) {
                    groupService.delete({id: $routeParams.id, group_id: id});
                    for (var i = 0; i < $scope.groups.length; i++) {
                        if ($scope.groups[i].id == id) {
                            $scope.groups.splice(i, 1);
                            return
                        }
                    }
                }
            }
    }])
    .controller('consumersList', ['$scope', 'kong.consumers', '$rootScope', function($scope, service, $rootScope){
        var cService = service($rootScope.kongHTTPAddress);

        cService.all(function(data){
            $scope.consumers = data.data;
        });

        $scope.delete = function(id){
            if (confirm('Sure ?')) {
                cService.delete({id: id});

                for (var i = 0; i < $scope.consumers.length; i++) {
                    if ($scope.consumers[i].id == id) {
                        $scope.consumers.splice(i, 1);
                        return
                    }
                }
            }
        };
    }])
    .controller('consumersAdd', [
        '$scope', '$location', 'kong.consumers', '$rootScope', function($scope, $location, service, $rootScope){

        $scope.pluginAction = 'Add';
        $scope.consumer = {};

        var cService = service($rootScope.kongHTTPAddress);

        $scope.submit = function(){
            cService.add($scope.consumer, function(){
                $location.path('/consumers');
            }, function(data){
                $scope.error = data.data;
            });
        };
    }]);