/**
 * Created by stokaboka on 30.03.2016.
 */

var agat_tree_table_module = angular.module('agat.controls.treetable', []);

agat_tree_table_module.controller("rbTreeTableCtrl", [function () {}]);

agat_tree_table_module.directive('rbTreeTable', ['$parse', 'rbModel', function($parse, rbModel) {

        return {
            restrict: "E",
            templateUrl: "tmpl/rb/tree_table_tmpl.html",
            replace: true,
            controller: "rbTreeTableCtrl",

            scope: {
                hiTitle:'@',
                hiOptions: '=',
                rowSource: '@'
            },

            link: function ($scope, $elem, $attrs, $ctrl) {

                var ___options = {
                    page:1,
                    scope:$scope,
                    search_by_id: null
                };

                var ___init = function () {
                    if($scope.service) {
                        $scope.model = $scope.service.hier_model;
                        $scope.model.setOptions(___options);
                        $scope.model.loadChildren();
                    }
                };

                $scope.rbHierTableHeader = true;
                $scope.service = null;
                $scope.model = null;

                if($scope.rowSource){
                    $scope.service = rbModel.get_registered_service($scope.rowSource, ___options);
                    ___init();
                }else{
                    $scope.$watch('rowSource', function(newValue, oldValue){
                        if(newValue){
                            $scope.service = rbModel.get_registered_service(newValue, ___options);
                            ___init();
                        }
                    });
                }

                $scope.$watch('service', function(newValue, oldValue){
                    if(newValue) {
                        ___init();
                    }
                });

                $scope.__do_Search = function () {
                    if($scope.model) {
                        $scope.model.loadChildren();
                    }
                };
            }
        }
}]);

agat_tree_table_module.directive('rbTreeTableContent', [function() {

        return {
            restrict: "E",
            templateUrl: "tmpl/rb/tree_table_content.html",
            replace: true,
            controller: "rbTreeTableCtrl",
            multiElement: true,

            scope: {
                service: '=?rbDataSource',
                model: '=rbTreeModel'
            },

            link: function (scope, elem, attrs, ctrl) {
                scope.root = null;
                scope.$watch("model", function (newVal, oldVal) {
                    if(newVal){
                        scope.root = scope.model.root;
                    }
                });
            }
        }
}]);

agat_tree_table_module.directive('rbTreeTableHeader', [function() {

    return {
        restrict: "E",
        templateUrl: "tmpl/rb/tree_table_header.html",
        replace: true,
        controller: "rbTreeTableCtrl",

        scope: {
            model: '=rbTreeModel',
        },

        link: function (scope, elem, attrs, ctrl) {
        }

    }
}]);

agat_tree_table_module.directive('rbTreeTableRow', ['$compile', function($compile) {

    return {
        restrict: "E",
        templateUrl: "tmpl/rb/tree_table_row.html",
        replace: true,
        controller: "rbTreeTableCtrl",

        scope: {
            row: '=rbTreeRow',
            model: '=rbTreeModel',
            test: '=rbTreeTest'
        },

        //$$tlb: true,

        compile: function (el) {
            var watch = 'row.items';
            return function(scope, elem, attrs, ctrl){

                scope.onTreeNodeClick = function (__row) {
                    scope.model.onNodeClick(__row);
                };

                scope.onRowClick = function (__row) {
                    scope.model.onRowClick(__row);
                };

                scope.onRowDoubleClick = function (__row) {
                    scope.model.onRowDoubleClick(__row);
                };

                function updatePrior(newValue, oldValue) {
                    if(newValue){
                            var incEl = '<rb-tree-table-row ng-repeat="row in row.items track by $index" rb-tree-model="model" rb-tree-row="row"  rb-tree-test="$index"></rb-tree-table-row>';
                            var contentTr = angular.element(incEl);
                            elem.after(contentTr);
                            $compile(contentTr)(scope);
                            scope.row.added_to_dom = true;
                            scope.row.dom_element = contentTr;
                    }else{
                        if(scope.row.dom_element) {
                            scope.row.dom_element.remove();
                        }
                    }
                };

                scope.$watch(watch, updatePrior);
            };
        }

    }
}]);

agat_tree_table_module.directive('rbTreeTableCell', ['$compile', function($compile) {

    return {
        restrict: "E",
        templateUrl: "tmpl/rb/tree_table_cell.html",
        replace: false,
        controller: "rbTreeTableCtrl",

        scope: {
            model: '=rbTreeModel',
            row: '=rbTreeRow',
            column: '=rbTreeColumn',
            first: '=rbTreeColumnFirst'
        },

        compile: function (el) {
            return function(scope, elem, attrs, ctrl){

                scope.onTreeNodeClick = function (__row) {
                    scope.model.onNodeClick(__row);
                };

                scope.show_data = true;

                scope.style = {
                    level: ''
                }

                if(scope.first){
                    scope.style.level = {"padding-left": ((scope.row.level-1) * 10) + "px"};
                }

                if(scope.column.gadget){
                    var incEl = scope.column.gadget.compile([{name: scope.column.gadget.value_attr, value:"{{row.data[column.db_name]}}"}]);
                    var contentTr = angular.element(incEl);
                    elem.append(contentTr);
                    $compile(contentTr)(scope);

                    if(scope.column.gadget.replace){
                        scope.show_data = false;
                    }
                }

            };
        }
    }
}]);

agat_tree_table_module.directive('rbIconColor', [function(){
    return {
        restrict: "EA",
        template: '<ng-md-icon icon="{{icon}}" size="{{rbIconSize}}" ng-style="style"></ng-md-icon>',
        replace: true,

        scope: {
            rbIconColorPair: '@',
            rbSeparator: '@',
            rbIconSize: '='
        },

        link: function (scope) {
            scope.icon = null;
            scope.style = {fill: "red"};
            if(typeof scope.rbIconSize == 'undefined' || scope.rbIconSize == null){
                scope.rbIconSize = '24';
            }
            if(typeof scope.rbSeparator == 'undefined' || scope.rbSeparator == null){
                scope.rbSeparator = ':';
            }
            if(scope.rbIconColorPair) {
                var ___i = scope.rbIconColorPair.indexOf(scope.rbSeparator);
                scope.icon = scope.rbIconColorPair.substr(0, ___i);
                var __color = scope.rbIconColorPair.substr(___i+1);
                if(__color) {
                    scope.style.fill = __color;
                }
            }
        }
    }
}]);