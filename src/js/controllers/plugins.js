/**
 * Created by mihael on 02.04.17.
 */

angular.module('app')
    .controller('pluginsEdit', [
        '$rootScope',
        '$scope',
        'kong.plugins',
        'kong.api',
        '$routeParams',
        '$location',
        function ($rootScope, $scope, kongPlugins, kongAPI, $routeParams, $location) {
            $scope.apiDisabled = true;
            $scope.pluginDisabled = true;
            var res = kongPlugins($rootScope.kongHTTPAddress);

            res.get({id: $routeParams.id}, function(data){
                $scope.enabledPlugins = [data.name];

                var api = kongAPI($rootScope.kongHTTPAddress);
                api.all(function(data){
                    $scope.apis = data.data;
                });

                $scope.pluginAction = 'Edit';
                $scope.pluginFields = {};
                $scope.selectedPlugin = data.name;
                $scope.apiID = data.api_id;
                $scope.plugin = {};

                res.schema({name: data.name}, {}, function(df){
                    $scope.plugin = {};
                    $scope.pluginFields = df.fields;

                    for (var i in data.config) {
                        $scope.plugin['config.' + i] = data.config[i];
                    }

                });

                $scope.submit = function(){
                    $scope.plugin['name'] = $scope.selectedPlugin.trim();

                    res.update({
                        api_id: $scope.apiID,
                        id: $routeParams.id
                    }, $scope.plugin, function(){
                        $location.path('/plugins');
                    }, function(err){
                        $scope.error = err.data;
                    })
                };

                $scope.pluginSelect = function () {
                    // var name = $scope.selectedPlugin.trim();
                    // res.schema({name: name}, {}, function(data){
                    //     $scope.plugin = {};
                    //     $scope.pluginFields = data.fields;
                    // });
                };

            });


        }
    ])
    .controller('pluginsList', [
        '$rootScope',
        '$scope',
        'kong.plugins',
        'kong.api',
        function ($rootScope, $scope, kongPlugins, kongAPI) {
            var svc = kongPlugins($rootScope.kongHTTPAddress);

            var api = kongAPI($rootScope.kongHTTPAddress);
            api.all(function(data){
                $scope.apis = data.data;

                svc.all(function (data) {
                    $scope.plugins = data.data;

                    for (var i = 0; i < $scope.plugins.length; i++) {
                        for (var j = 0; j < $scope.apis.length; j++) {
                            if ($scope.plugins[i]['api_id'] == $scope.apis[j]['id']) {
                                $scope.plugins[i]['api_name'] = $scope.apis[j]['name'];
                            }
                        }
                    }
                });
            });

            $scope.delete = function (apiID, id) {
                if (confirm("Sure ?")) {
                    svc.delete({
                        api_id: apiID,
                        id: id
                    });
                    for (var i = 0; i < $scope.plugins.length; i++) {
                        if ($scope.plugins[i].id == id) {
                            $scope.plugins.splice(i, 1);
                            return
                        }
                    }
                }
            };



        }])
    .controller('pluginsAdd', [
        '$rootScope',
        '$scope',
        'kong.plugins',
        'kong.api',
        '$location',
        function ($rootScope, $scope, kongPlugins, kongAPI, $location) {
            $scope.enabledPlugins = [];

            var res = kongPlugins($rootScope.kongHTTPAddress);
            res.enabled({}, {}, function(data){
                $scope.enabledPlugins = data.enabled_plugins;
            });

            var api = kongAPI($rootScope.kongHTTPAddress);
            api.all(function(data){
                $scope.apis = data.data;
            });

            $scope.pluginAction = 'Add';
            $scope.pluginFields = {};
            $scope.selectedPlugin = "";
            $scope.apiID = "";
            $scope.plugin = {};

            $scope.pluginSelect = function () {
                var name = $scope.selectedPlugin.trim();
                res.schema({name: name}, {}, function(data){
                    $scope.plugin = {};
                    $scope.pluginFields = data.fields;

                    for (var i in data.fields) {
                        if(data.fields[i].hasOwnProperty('default')) {
                            var def = data.fields[i].default;
                            if (data.fields[i].type == 'array') {
                                def = def.join();
                            }
                            $scope.plugin['config.' + i] = def;
                        }
                    }
                });
            };

            $scope.submit = function(){
                $scope.plugin['name'] = $scope.selectedPlugin.trim();

                res.add({id: $scope.apiID}, $scope.plugin, function(){
                    $location.path('/plugins');
                }, function(err){
                    $scope.error = err.data;
                })
            };
        }
    ]);
