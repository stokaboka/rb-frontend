/**
 * Created by stokaboka on 03.12.2014.
 */

import $RbColumnFilter from '../core/rbColumnFilter';

var agat_gantt_module = angular.module('agat.controls.gantt', []);

agat_gantt_module
    .service("agat_gantt_service", ['rbCore',  function(rbCore){

        var controller =  null;

        var num_columns = 0;
        var num_rows = 0;

        // 75
        var tooltype_height = 86;

        var table_area_width = 201;
        var table_header_width = table_area_width;
        var table_header_calculate_width = table_area_width;

        var column_width = 30;
        var column_width_percent = 100;
        var header_height = 36;
        var month_header_height = 36;
        var rows_height = 28;

        var last_window_width = 0;
        var last_window_height = 0;

        var delimiter_size = 6;
        var vertical_delimiter_style = {
            "left" : "0px",
            "top" : "0px",
            "width" : ''+delimiter_size+'px',
            "height": ''+delimiter_size+'px'
        };

        var scroll_height = 10;
        var scroll_width = 10;

        var zoom_factor = 1;
        var pixels_per_day = 1;

        var staistics = {
            dirty: true,
            minimal_date: null,
            maximal_date: null,
            view_minimal_date: null,
            view_maximal_date: null
        };

        var item_margin = {
            top: 3,
            left: 3,
            right: 2,
            bottom: 3
        };

        /**
         * карта соответствия полей источника данных полученный из БД и используемых в компоненете
         * @type {{id: string, start_date: string, end_date: string, text: string, progress: string, duration: string, parent: string}}
         */
        var data_map = {
            id: 'id',
            start_date: 'start_date',
            end_date: 'end_date',
            text: 'text',
            progress: 'progress',
            duration: 'duration',
            parent: 'parent',
            progress_status: 'progress_status',
        };

        var table_columns = [
            {
                id: "text",
                title: "Содержание",
                width: 270,
                type: 'string',
                align: 'left'
            },
            {
                id: "start_date",
                title: "Начало",
                width: 65,
                type: 'date',
                align: 'center'
            },
            {
                id: "end_date",
                title: "Окончание",
                width: 65,
                type: 'date',
                align: 'center'
            },
            {
                id: "duration",
                title: "Длительность",
                width: 30,
                type: 'number',
                align: 'right'
            },
            {
                id: "progress",
                title: "Выполнение",
                width: 30,
                type: 'number',
                align: 'right'
            }
        ];

        var scroller_border = 1;

        var date_precision = true;

        // если дата = null - создается дата на начало или конец периода
        var __default_extend_null_date = "YEAR";

        // если дата начала позднее даты окончания - создается дата окончания на конец периода
        var __default_extend_reverse_date = "MONTH";

        var __time_scales = [
            {"label": "День", "value": "DAY", "add": 'days', "column_group_header_format": "MMMM YYYY", "column_header_format": "D", column_width: 32},
            {"label": "Неделя", "value": "WEEK", "add": 'weeks', "column_group_header_format": "MMMM YYYY", "column_header_format": "W", column_width: 64},
            {"label": "Месяц", "value": "MONTH", "add": 'months', "column_group_header_format": "MMMM YYYY", "column_header_format": "MM", column_width: 96},
            {"label": "Год", "value": "YEAR", "add": 'years', "column_group_header_format": "YYYY", "column_header_format": "YYYY", column_width: 128}
        ];
        var time_scale = __time_scales[0];

        var __init_zoom_column = function(__zoom_column){
            service.initialized = false;
            column_width_percent = __zoom_column;
            if(__zoom_column == 100){
                column_width = time_scale["column_width"];
            }else {
                column_width = Math.round(__zoom_column * time_scale["column_width"] / 100);
            }
        };

        var  __init_time_scale = function(__timescale){
            service.initialized = false;
            var ___time_scale = time_scale;
            if(__timescale)
                ___time_scale = _.find(__time_scales, function(__elem){return __elem["value"] === __timescale;});

            if(___time_scale)
                time_scale = ___time_scale;
            else
                time_scale = __time_scales[0];

            __init_zoom_column(100);
        };

        var __init_size = function(__grid_info){

            table_header_width = table_area_width < table_header_calculate_width ? table_area_width : table_header_calculate_width;
            __grid_info.table_columns_header_style["width"] = table_header_width + scroller_border + "px";

            __grid_info.month_header_style["width"] = (column_width * num_columns - delimiter_size) + "px";

            __grid_info.column_header_style["width"] = (column_width * num_columns - delimiter_size) + "px";
            __grid_info.column_header_style["left"] = (table_area_width + delimiter_size)+ "px",


            __grid_info.row_header_style["width"] = (table_area_width +scroller_border) + "px"
            __grid_info.row_header_style["height"] = (rows_height * num_rows + 1) + "px";

            __grid_info.grid_position["width"] = (column_width  * num_columns + 1 + scroll_width - delimiter_size) + "px";
            __grid_info.grid_position["height"] = (rows_height * num_rows + 1 + scroll_height) + "px";
            __grid_info.grid_position["left"] = table_area_width + delimiter_size + "px";

            __grid_info["gantt_div_style"] = {
                "width":  (service.window_width - scroll_width - 12) + "px",
                "height": (service.window_height) + "px"
            };

            __grid_info["vertical_delimiter_style"]["left"] = (table_area_width + scroller_border) + "px";

            var __h = service.window_height - month_header_height - tooltype_height;

            __grid_info["x_gantt_area_style"] = {
                "width": (service.window_width - 20) + "px",
                "height": (__h) + "px"
            };

            return __grid_info;
        };

        var __calculate_stat = function(__grid_info){

            if(!__grid_info.gantt_items)return __grid_info;

            if(staistics.dirty) {

                staistics.minimal_date = null;
                staistics.maximal_date = null;

                for (var __i = 0; __i < __grid_info.gantt_items.length; __i++) {

                    var __test_date = null;

                    var __test_date_start = moment(__grid_info.gantt_items[__i][data_map.start_date]);
                    var __test_date_end = moment(__grid_info.gantt_items[__i][data_map.end_date]);

                    if( __test_date_start.isValid() && !__test_date_end.isValid()){
                        //__grid_info.gantt_items[__i][data_map.end_date] = __test_date_start.clone().endOf(__default_extend_null_date);
                        __test_date_end = __test_date_start.clone().endOf(__default_extend_null_date);
                    }

                    if( !__test_date_start.isValid() && __test_date_end.isValid()){
                        //__grid_info.gantt_items[__i][data_map.start_date] = __test_date_end.clone().startOf(__default_extend_null_date);
                        __test_date_start = __test_date_end.clone().startOf(__default_extend_null_date);
                    }

                    if( !__test_date_start.isValid() && !__test_date_end.isValid()){
                        //__grid_info.gantt_items[__i][data_map.start_date] = moment().startOf(__default_extend_null_date);
                        __test_date_start = moment().startOf(__default_extend_null_date);
                        //__grid_info.gantt_items[__i][data_map.end_date] = moment().endOf(__default_extend_null_date);
                        __test_date_end  = moment().endOf(__default_extend_null_date);
                    }

                    //var __compare_date= moment(__grid_info.gantt_items[__i][data_map.end_date]).diff(moment(__grid_info.gantt_items[__i][data_map.start_date]), 'DAY');
                    var __compare_date= __test_date_end.diff(__test_date_start, 'DAY');
                    if(__compare_date < 0){
                        //__grid_info.gantt_items[__i][data_map.start_date] = moment(__grid_info.gantt_items[__i][data_map.start_date]).clone().endOf(__default_extend_reverse_date);
                        __test_date_start = __test_date_start.clone().endOf(__default_extend_reverse_date);
                    }

                    //__test_date = moment(__grid_info.gantt_items[__i][data_map.start_date]);
                    __test_date = __test_date_start;
                    staistics.minimal_date = staistics.minimal_date === null ? __test_date : moment.min(staistics.minimal_date, __test_date);
                    staistics.maximal_date = staistics.maximal_date === null ? __test_date : moment.max(staistics.maximal_date, __test_date);


                    //__test_date = moment(__grid_info.gantt_items[__i][data_map.end_date]);
                    __test_date = __test_date_end;
                    staistics.minimal_date = staistics.minimal_date === null ? __test_date : moment.min(staistics.minimal_date, __test_date);
                    staistics.maximal_date = staistics.maximal_date === null ? __test_date : moment.max(staistics.maximal_date, __test_date);

                    // var __now = moment();
                    // var __progress_status = "UNKNOWN";
                    //
                    // if(__now.isBefore(__test_date_start)){
                    //     __progress_status = "BEFORE";
                    // }else if(__now.isAfter(__test_date_end)){
                    //     __progress_status = "AFTER";
                    // }else{
                    //     __progress_status = "PROGRESS";
                    // }

                    __grid_info.gantt_items[__i][data_map.start_date] = __test_date_start;
                    __grid_info.gantt_items[__i][data_map.end_date] = __test_date_end;
                    //__grid_info.gantt_items[__i]["progress_status"] = __progress_status;

                }
                staistics.dirty = false;
            }

            if (staistics.maximal_date != null && staistics.minimal_date != null) {

                staistics.view_minimal_date = staistics.minimal_date.clone().startOf(time_scale.value);
                staistics.view_maximal_date = staistics.maximal_date.clone().endOf(time_scale.value);

                var __days_diff = staistics.view_maximal_date.diff(staistics.view_minimal_date, time_scale.value);
                __grid_info["num_columns"] = __days_diff + 1;
            }

            return __grid_info;
        };

        var __init_cols = function(__grid_info){

            if(staistics.dirty || !staistics.view_minimal_date)return __grid_info;

            __grid_info = __init_table_columns(__grid_info);

            __grid_info["column_width_percent"] = column_width_percent;
            __grid_info.columns_header = [];
            __grid_info.columns = [];
            __grid_info.months_header = [];

            var __rows = __grid_info.num_rows;

            var __c_left = 0;
            //var __c_left = delimiter_size;
            var __add_next_group = true;
            var __last_mnt = -1;

            var __current_date = angular.copy(staistics.view_minimal_date);
            var __current_group = __current_date.format(time_scale.column_group_header_format);

            //var __col=0;
            num_columns = 0;
            var __column_date_text = '';
            //for(var num_columns=0; num_columns < __cols; num_columns++){
            while(staistics.view_maximal_date.diff(__current_date, time_scale.value) >= 0){

                __column_date_text = column_width < 12 ? '' : __current_date.format(time_scale.column_header_format);

                __grid_info.columns_header.push({
                    "id": 'h_' + num_columns,
                    "index": num_columns,
                    "text": __column_date_text,
                    "style": {
                        "top": month_header_height+"px",
                        "left": __c_left + "px",
                        "width": column_width + "px",
                        "height": header_height + "px"
                    }
                });

                __grid_info.columns.push({
                    "id": 'c_'+num_columns,
                    "index": num_columns,
                    "style": {
                        "top": "0px",
                        "left": (__c_left + 1) + "px",
                        "width": column_width + "px",
                        "height": (rows_height * __rows) + "px"
                    }
                });

                if(__add_next_group){
                    __grid_info.months_header.push({
                        "id": 'm_' + ++__last_mnt,
                        "index": __last_mnt,
                        "text": __current_date.format(time_scale.column_group_header_format),
                        "style": {
                            "top": "0px",
                            "left": __c_left + "px",
                            "width": column_width + "px",
                            "height": month_header_height + "px"
                        }
                    });
                    __add_next_group = false;
                }else{
                    var ___ww = parseInt(__grid_info.months_header[__last_mnt]["style"]["width"]);
                    ___ww += column_width;
                    __grid_info.months_header[__last_mnt]["style"]["width"] = ___ww + "px";
                }

                __current_date.add(1, time_scale.add);

                var __next_group = __current_date.format(time_scale.column_group_header_format);

                if(__next_group != __current_group) {
                    __add_next_group = true;
                }

                __current_group = __next_group;

                __c_left += column_width;
                num_columns++;
            }

            __grid_info.num_columns = num_columns;

            pixels_per_day  = column_width;
            return __grid_info;
        };

        var __init_table_columns = function(__grid_info){

            var __c_left = 0;
            __grid_info.table_columns_headers = [];

            for(var __i=0; __i < table_columns.length; __i++) {
                var ___tbl_column = table_columns[__i];

                __grid_info.table_columns_headers.push({
                    "id": 'th_' + __i,
                    "index": __i,
                    "text": ___tbl_column["title"],
                    "style": {
                        "top": "0px",
                        "left": __c_left + "px",
                        "width": ___tbl_column["width"] + "px",
                        "height": header_height + month_header_height + "px"
                    }

                });

                __c_left += ___tbl_column["width"];

            }

            return __grid_info;
        }

        var __init_item = function(__item, __c_top){
            var __out = null;

            if(__c_top === undefined){
                __c_top = __item["position"]["top"];
            }

            var __start_date = moment(__item[data_map.start_date]);
            var __end_date = moment(__item[data_map.end_date]);

            if(__start_date.isValid() && __end_date.isValid()) {

                if(service.normalize_time){
                    __start_date.startOf(time_scale.value);
                    __end_date.endOf(time_scale.value);
                }

                var __item_left = __start_date.diff(staistics.view_minimal_date, time_scale.value, date_precision) * column_width;
                var __item_width = __end_date.diff(__start_date, time_scale.value, date_precision) * column_width;

                __item_left = Math.round(__item_left);
                __item_width = Math.round(__item_width);

                var __table_row_style = [];

                var ___tbl_col_left = 1;
                for(var __i=0; __i < table_columns.length; __i++) {
                    var ___tbl_column = table_columns[__i];
                    var ___r_obj = {
                        "id": ___tbl_column["id"],
                        "type": ___tbl_column["type"],
                        "position": {
                            "top": "0px",
                            "left": ___tbl_col_left + "px",
                            "width": ___tbl_column["width"] + "px",
                            "height": rows_height + "px",
                            "text-align": ___tbl_column["align"]
                        }
                    }
                    __table_row_style.push(___r_obj);
                    ___tbl_col_left += ___tbl_column["width"];
                };


                __out = {
                    "item": {
                        "top": (__c_top + item_margin.top) + "px",
                        "left": (__item_left + item_margin.left) + "px",
                        "width": (__item_width - (item_margin.right) * 2) + "px",
                        "height": (rows_height - (item_margin.bottom) * 2) + "px",
                        "background-color": __item[data_map.progress_status]
                    },
                    "row_header": {
                        "top": __c_top + "px",
                        "left":  "0px",
                        //"width": table_header_width  + "px",
                        //"width": (table_area_width - scroller_border) + "px",
                        "width": (table_header_calculate_width) + "px",
                        "height": rows_height + "px"
                    },
                    "table_row": __table_row_style,
                    "row": {
                        "top": __c_top + "px",
                        "left":  scroller_border + "px",
                        "width": (column_width * num_columns) + "px",
                        "height": rows_height + "px"
                    }
                };
            }
            return __out;
        };

        var __init_items = function(__grid_info){

            if(!__grid_info.gantt_items) return __grid_info;

            var __c_top = 0;

            for(var __i=0; __i < __grid_info.gantt_items.length; __i++) {

                var __item = __grid_info.gantt_items[__i];
                var __styles_obj = __init_item(__item, __c_top);
                if(__styles_obj != null)
                    __grid_info.gantt_items[__i]["styles"] = __styles_obj;

                __grid_info.gantt_items[__i]["position"] = {"top": __c_top};
                __c_top += rows_height;
            }

            return __grid_info;
        };

        var __init_arrays = function(__tasks){
            service.initialized = false;

            num_rows = 0;
            if(__tasks)num_rows = __tasks.length;

            var __h = service.window_height - month_header_height - tooltype_height;
            var __grid_info = {
                months_header: [],
                columns_header: [],
                rows_header: [],
                columns: [],
                rows: [],
                gantt_items: __tasks,

                num_columns: 0,
                num_rows: num_rows,

                gantt_style: {
                    "height": "100px",
                    "width": "100px"
                },

                grid_position: {
                    "top": (month_header_height + header_height) + "px",
                    "left": table_area_width + "px",
                    "width": 10,
                    "height": 20
                },

                month_header_style: {
                    "left": (table_area_width + delimiter_size) + "px",
                    "top": "0px",
                    "height": month_header_height + "px",
                    "width": "0px"
                },

                //column_header_style: {
                //    "left": (table_area_width + delimiter_size)+ "px",
                //    "top": month_header_height + "px",
                //    "height": header_height + "px",
                //    "width": "0px"
                //},

                column_header_style: {
                    "left": (table_area_width + delimiter_size)+ "px",
                    "top": "0px",
                    "height": (month_header_height + header_height) + "px",
                    "width": "0px"
                },

                row_header_style: {
                    "left": "0px",
                    //*************
                    "top": (month_header_height + header_height - scroller_border) + "px",
                    "height": "500px",
                    "width": (table_area_width +scroller_border) + "px"
                },

                table_columns_header_style: {
                    "left": "0px",
                    "top": "0px",
                    "height": (month_header_height + header_height) + "px",
                    "width": "0px"
                },

                table_columns: table_columns,

                x_gantt_area_style: {
                    "width": (service.window_width - 20) + "px",
                    "height": (__h) + "px"
                },

                vertical_delimiter_style: vertical_delimiter_style

            };
            return __grid_info;
        };

        var ___init = function(__tasks, __staistics_dirty){
            staistics.dirty = __staistics_dirty;
            var  __grid_info = __init_arrays(__tasks);
            __grid_info = __init_grid_info(__grid_info);
            return __grid_info;
        }

        var __init_grid = function(__tasks){
            rbCore.model.$log.debug("__init_grid");
            if(angular.isUndefined(controller.$modelValue)){
                return;
            }
            if(angular.isUndefined(__tasks)){
                __tasks = controller.$modelValue;
            }
            return ___init(__tasks, true);
        };

        var __redraw_grid = function(){
            rbCore.model.$log.debug("__redraw_grid");
            var __grid_info = controller.$viewValue;
            __grid_info = __init_grid_info(__grid_info);
            return __grid_info;
        };

        var __init_grid_info = function(__grid_info){

            table_header_calculate_width = _.reduce(table_columns, function(memo, value, key, list){return memo + value.width;}, 0);
            table_header_width = table_area_width < table_header_calculate_width ? table_area_width : table_header_calculate_width;
            __grid_info.table_columns_header_style["width"] = table_header_width + scroller_border + "px";

            __grid_info = __calculate_stat(__grid_info);
            __grid_info = __init_cols(__grid_info);
            __grid_info = __init_items(__grid_info);
            __grid_info = __init_size(__grid_info);
            return __grid_info;
        };

        var __setHeightElements = function(newValue, oldValue, _scope){

            last_window_height = newValue;

            var __h = newValue - month_header_height - tooltype_height;
            _scope.x_gantt_area_style["height"] = __h + "px";

            __h = __h - month_header_height - header_height - scroll_height;
            //_scope.row_header_style["height"] = (__h - scroll_height - 10) + 'px';
            _scope.row_header_style["height"] = __h + 'px';
            _scope.grid_position["height"] = __h + 'px';

            _scope.vertical_delimiter_style["height"] =  (__h + month_header_height * 2) + "px";
        };

        var __setWidthElements = function(newValue, oldValue, _scope){

            last_window_width = newValue;

            _scope.x_gantt_area_style["width"] = (newValue - 20) + "px";

            _scope.month_header_style["width"] = (newValue - table_area_width - scroll_width - 40) + "px";
            _scope.column_header_style["width"] = (newValue - table_area_width - scroll_width - 40) + "px";
            _scope.grid_position["width"] = (newValue - table_area_width - scroll_width - 12 - 10) + "px";

            //for(var ___i = 0; ___i < _scope.gantt_items; ___i++){
            //    _scope.gantt_items.
            //}
        };

        var __setSizeElements = function(_w, _h, _scope){
            __setHeightElements(_h, _h, _scope);
            __setWidthElements(_w, _w, _scope);
        };

        var __set_item = function(__item, __item_index){

            controller.$viewValue.gantt_items[__item_index] = null;
            controller.$viewValue.gantt_items[__item_index] = __item;

            controller.$modelValue[__item_index] = null;
            controller.$modelValue[__item_index] = __item;

            var __styles_obj = __init_item(__item);
            if(__styles_obj != null)
                controller.$viewValue.gantt_items[__item_index]["styles"] = __styles_obj;

        };

        var __setVerticalDividerPos = function(_left, _scope){
            table_area_width = _left;

            var __grid_info = controller.$viewValue;
            __grid_info = __init_size(__grid_info);

            __setSizeElements(last_window_width, last_window_height, _scope);
        };

        var service = {
            version: '0.0.1',
            initialized: false,
            time_scales: __time_scales,
            time_scale_value: 'DAY',

            normalize_time: false,

            rows_height: rows_height,
            column_width: column_width,

            window_width: 0,
            window_height: 0,

            data_map: data_map,

            time_scales: __time_scales,

            set_item: function(__item, __item_index){
                __set_item(__item, __item_index);
            },

            init_controller: function(__controller){
                controller = __controller;
            },

            init_zoom_column: function(__zoom_column){
                __init_zoom_column(__zoom_column);
            },

            init_time_scale: function(__timescale){
                __init_time_scale(__timescale);
            },

            init_arrays: function(__tasks){
                rbCore.model.$log.debug("init_arrays");
                return __init_arrays(__tasks);
            },

            init_size: function(__grid_info){
                rbCore.model.$log.debug("init_size");
                return __init_size(__grid_info);
            },

            calculate_stat:  function(__grid_info){
                rbCore.model.$log.debug("calculate_stat");
                return __calculate_stat(__grid_info);
            },

            init_cols: function(__grid_info){
                rbCore.model.$log.debug("init_cols");
                return __init_cols(__grid_info);
            },

            //init_rows: function(__grid_info){
            //    return __init_rows(__grid_info);
            //},

            init_items: function(__tasks, __grid_info){
                rbCore.model.$log.debug("init_items");
                return __init_items(__tasks, __grid_info);
            },

            init_grid: function(){
                rbCore.model.$log.debug("init_grid");
                return __init_grid();
            },

            redraw_grid: function(){
                rbCore.model.$log.debug("redraw_grid");
                return __redraw_grid();
            },

            setHeightElements: function(newValue, oldValue, _scope){
                __setHeightElements(newValue, oldValue, _scope);
            },

            setWidthElements: function(newValue, oldValue, _scope){
                __setWidthElements(newValue, oldValue, _scope);
            },

            setSizeElements: function(_w, _h, _scope){
                __setSizeElements(_w, _h, _scope);
                service.initialized = true;
            },

            setVerticalDividerPos: function(_left, _scope){
                __setVerticalDividerPos(_left, _scope);
            }

        }

        return service;
    }]
);

agat_gantt_module.controller('hiGanttController', ['$scope', '$attrs', '$parse', '$window', 'rbCore', 'agat_gantt_service', function ($scope, $attrs, $parse, $window, rbCore, agat_gantt_service) {
    var self = this;
    self.$viewValue = null;
    self.$modelValue = null;

    $scope.service = null;

    $scope.search_date_start = new Date('01.01.2016');
    $scope.search_date_end = null;

    var __dataLoaded = function () {
        self.$modelValue = $scope.service.dataset;
        self.$viewValue = agat_gantt_service.init_grid();
        _.extend($scope, self.$viewValue);
        agat_gantt_service.setSizeElements($window.innerWidth, $window.innerHeight, $scope);
    };

    var __loadData = function () {
        rbCore.model.load($attrs.rowSource, {page:1, scope:$scope, callback: __dataLoaded, search_by_id: null});
    };

    self.init = function () {
        if(rbCore.model) {
            __loadData();
        }else{
            $scope.$on('rd_load_complete', function(){
                __loadData();
            });
        }
    };

    $scope.$watch("service", function (newVal, oldVal) {
        if(newVal) {
            agat_gantt_service.init_controller(self);
        }
    });

    $scope.onClickReload = function () {
        $scope.service.clearFilters();
        $scope.service.setColumnFilter(agat_gantt_service.data_map.start_date, new $RbColumnFilter({value1: $scope.search_date_start}));
        $scope.service.setColumnFilter(agat_gantt_service.data_map.end_date, new $RbColumnFilter({value2: $scope.search_date_end}));
        __loadData();
    };
}]);

agat_gantt_module.directive('rowSource', [ function() {
    return {
        restrict: "A",
        link: function($scope, $element, $attrs, $ctrl) {
        }
    };
}]);

agat_gantt_module.directive('hiGantt', ['$window', '$mdDialog', 'rbCore', 'agat_gantt_service', function($window, $mdDialog, rbCore, agat_gantt_service){

    return {
        //require: 'ngModel',
        restrict: "E",
        templateUrl: "tmpl/higantt/gantt_tmpl.html",
        controller: "hiGanttController",
        transclude: true,
        replace: false,

        scope: {
            hiTitle:'@',
            hiOptions: '=',
            hiNormalizeTime: '=',
            model: '=ngModel'
        },

        link: function($scope, $elem, $attrs, $ctrl) {

            $scope.column_width_percent = 100;

            $ctrl.init(rbCore.model);

            if($scope.hiNormalizeTime) {
                agat_gantt_service.normalize_time = true;
            }

            $scope.onScrollGridArea = function(__scrollLeft, __scrollTop){
                $("#x_gantt_column_header_id").scrollLeft(__scrollLeft);
                $("#x_gantt_rows_header_id").scrollTop(__scrollTop);
            };

            $scope.onScrollRowsArea = function(__scrollLeft, __scrollTop){
                $("#x_gantt_grid_id").scrollTop(__scrollTop);
                $("#x_gantt_table_column_header_id").scrollLeft(__scrollLeft);
            };

            $scope.onVerticalDividerChanged = function(__left){
                agat_gantt_service.setVerticalDividerPos(__left, $scope);
            };

            $scope.onTimeScaleChanged = function(value){
                if(value){
                    agat_gantt_service.init_time_scale(value);
                    var ___viewValue = agat_gantt_service.init_grid();
                    _.extend($scope, ___viewValue);
                    agat_gantt_service.setSizeElements($window.innerWidth, $window.innerHeight, $scope);
                }
            };

            $scope.onZoomColumnChanged = function(value){
                if(value){
                    agat_gantt_service.init_zoom_column(value);
                    var ___viewValue = agat_gantt_service.redraw_grid();
                    _.extend($scope, ___viewValue);
                    agat_gantt_service.setSizeElements($window.innerWidth, $window.innerHeight, $scope);
                }
            };

            $scope.onZoomPercentColumnChanged = function(value){
                if(value){
                    agat_gantt_service.init_zoom_column(value);
                    var ___viewValue = agat_gantt_service.redraw_grid();
                    _.extend($scope, ___viewValue);
                    agat_gantt_service.setSizeElements($window.innerWidth, $window.innerHeight, $scope);
                }
            };

            $attrs.$observe('hiGanttTimescale', function(value){
                //if(value){
                //    gantt_model.init_time_scale(value);
                //}
            });

            angular.element($window).bind('resize', function () {
                $scope.$apply(function () {
                    agat_gantt_service.setSizeElements($window.innerWidth, $window.innerHeight, $scope);
                });
            });

            $scope.$on('user_login', function() {
            });

            $scope.$on('user_logout', function() {
            });

            var __showGanttItemDialog = function (__event, __index, __item) {
                var __q = $mdDialog.show({
                    controller: "DialogGanttItemController",
                    template: '\
                    <md-dialog aria-label="Задание" style="width: 30%;">\
                        <md-dialog-content style="padding: 20px;">\
                            <div>\
                                <md-subheader class="md-sticky-no-effect dialog-title">Задание</md-subheader>\
                            </div>\
                                <form name="xgantt_item_editor_form" >\
                                    <div layout="column" flex>\
                                        <md-input-container>\
                                            <label>Текст</label>\
                                            <textarea name="xgantt_item_text" flex  ng-model="item.text" required style="width: 100%;" elastic></textarea>\
                                            <div ng-messages="xgantt_item_editor_form.xgantt_item_text.$error" role="alert">\
                                                <div ng-message="required">Введите текст мероприятия</div>\
                                            </div>\
                                        </md-input-container>\
                                        <div layout="row" flex>\
                                        <md-input-container>\
                                            <label>Начало</label>\
                                            <input name="xgantt_item_start_date" ng-model="item.start_date" required type="date">\
                                            <div ng-messages="xgantt_item_editor_form.xgantt_item_start_date.$error">\
                                                <div ng-message="required">Введите дату начала мероприятия</div>\
                                            </div>\
                                        </md-input-container>\
                                        <md-input-container>\
                                            <label>Окончание</label>\
                                            <input name="xgantt_item_end_date" ng-model="item.end_date" ng-required="true" type="date">\
                                            <div ng-messages="xgantt_item_editor_form.xgantt_item_end_date.$error">\
                                                <div ng-message="required">Введите дату окончания мероприятия</div>\
                                            </div>\
                                        </md-input-container>\
                                         <md-input-container flex="40">\
                                            <label>Процент выполнения</label>\
                                            <input name="xgantt_item_progress" ng-model="item.progress" type="number" min="0" max="100">\
                                        </md-input-container>\
                                        </div>\
                                    </div>\
                                </form>\
                        </md-dialog-content>\
                        <md-dialog-actions layout="row">\
                            <md-button ng-click="hide()" aria-label="OK" class="md-raised md-primary">OK</md-button>\
                            <md-button ng-click="cancel()" aria-label="Cancel" class="md-raised">Cancel</md-button>\
                        </md-dialog-actions>\
                    </md-dialog>',
                    targetEvent: __event,
                    clickOutsideToClose: true,
                    bindToController: true,
                    locals: {index: __index, item: __item}
                });
                return __q;
            };

            $scope.showGanttItemDialog = function(__event, __index, __item) {
                __showGanttItemDialog(__event, __index, __item)
                   .then(
                        function (answer) {
                            agat_gantt_service.set_item(answer.item, answer.index);
                    },
                    function () {}
                );
            };
        }
    };
}]);

agat_gantt_module.directive('elastic', [
    '$timeout',
    function($timeout) {
        return {
            restrict: 'A',
            link: function($scope, element) {
                var prv_scrollHeight = 0;
                var resize = function() {
                    if(prv_scrollHeight != element[0].scrollHeight) {
                        element[0].style.height = "" + (element[0].scrollHeight + 10) + "px";
                    }
                    prv_scrollHeight = element[0].scrollHeight;
                };
                element.on("blur keyup change", resize);
                $timeout(resize, 0);
            }
        };
    }
]);

agat_gantt_module.controller('hiGanttComboBoxController', ['$scope', '$attrs', '$parse', 'agat_gantt_service', function ($scope, $attrs, $parse, agat_gantt_service) {

    $scope.items = agat_gantt_service.time_scales;
    $scope.isopen = false;
    $scope.selectedItem = {"label": '', "value": null};
    $scope.labelField = "label";
    $scope.rows_height = agat_gantt_service.rows_height;

    $scope.onClick = function(__index){
        $scope.selectedItem = $scope.items[__index];

        if($scope.hiChangeHandler) {
            var __fn = $scope.$parent[$scope.hiChangeHandler];
            if(__fn){
                __fn($scope.selectedItem['value']);
            }
        }

    };

    this.init = function() {
        $scope.defaultLabel = $scope.items[0]['label'];
        $scope.defaultValue = $scope.items[0]['value'];

        $scope.selectedItem = $scope.items[0];
    };

}]);

agat_gantt_module.directive('hiGanttTimescales', ['agat_gantt_service', function(agat_gantt_service){
    return {
        restrict: "EA",
        template:
'<md-select ng-model="selectedItem" style="margin-top: 3px; margin-bottom: 0px; font-size: 14px;" aria-label="label">\
        <md-option  value="{{item}}" ng-click="onClick(-1)">\
        {{selectedItem.label}}\
    </md-option>\
    <md-option ng-repeat="item in items" ng-value="item" ng-click="onClick($index)">\
        {{item[labelField]}}\
    </md-option>\
    <md-tooltip ng-show="hiTitle">{{hiTitle}}</md-tooltip>\
    </md-select>',

        replace: true,
        controller: 'hiGanttComboBoxController',
        scope: {
            hiChangeHandler: "@",
            hiTitle: "@"
        },

        link: function($scope, $elem, $attrs, $ctrl) {
            $ctrl.init();
        }
    };
}]);

agat_gantt_module.directive('hiGanttZoomColumn', ['agat_gantt_service', function(agat_gantt_service){
    return {
        restrict: "EA",
        template:
            '<div>\
                <md-slider class="md-primary" md-discrete ng-model="hiDataModel" step="1" min="3" max="200" aria-label="{{hiTitle}}">\
                    <md-tooltip ng-show="hiTitle">{{hiTitle}}</md-tooltip>\
                </md-slider>\
            </div>',
        replace: true,
        scope: {
            hiChangeHandler: "@",
            hiTitle: "@",
            hiDataModel: "="
        },

        link: function($scope, $elem, $attrs, $ctrl) {
            $scope.hiDataModel = 32;

            $elem.bind('mouseup', function(){

                if($scope.hiChangeHandler) {
                    var __fn = $scope.$parent[$scope.hiChangeHandler];
                    var __value = $scope.hiDataModel;
                    if(__fn){
                        $scope.$parent.$apply(function(){
                            __fn(__value);
                        });
                    }
                }

            });
        }
    };
}]);

agat_gantt_module.directive('hiGanttZoomPercentColumn', ['agat_gantt_service', function(agat_gantt_service){
    return {
        restrict: "EA",
        template:
            '<div>\
                <agat-array-combo-box \
                    hi-change-handler="onClickEvent"\
                    hi-data-array="{{arrayList}}"\
                    hi-selected-item="{{defaultValue}}"\
                > </agat-array-combo-box>\
            </div>',
        replace: true,
        scope: {
            hiChangeHandler: "@"
            ,hiTitle: "@"
            ,hiDataModel: "@"
        },

        link: function($scope, $elem, $attrs, $ctrl) {

            $scope.defaultValue = 30;
            if($scope.hiDataModel)
                $scope.defaultValue = $scope.hiDataModel;

            $scope.arrayList = new Array();
            for(var __p=5; __p <= 200; __p+=10){
                $scope.arrayList.push({"label": __p+" %", "value": __p});
            }

            $scope.onClickEvent = function(__index, __value){
                if($scope.hiChangeHandler) {
                    var __fn = $scope.$parent[$scope.hiChangeHandler];
                    __value = parseFloat(__value);
                    if(__fn){
                        $scope.$parent.$apply(function(){
                            __fn(__value);
                        });
                    }
                }
            };

        }
    };
}]);

agat_gantt_module.directive('hiGanttTableCell', ['agat_gantt_service', function(agat_gantt_service){
    return {
        require: 'ngModel',
        restrict: "EA",
        template: '<div>{{itemValue}}</div>',
        replace: true,
        scope: {},

        link: function($scope, $elem, $attrs, $ctrl) {
            var __xganttTableItemFormatter = function(__item){
                if(typeof __item == 'object'){
                    if(moment(__item).isValid()){
                        var ___dt = moment(__item).format('DD.MM.YYYY');
                        return ___dt;
                    }else{
                        return __item;
                    }
                }else{
                    return __item;
                }
            };

            $ctrl.$formatters.push(__xganttTableItemFormatter);

            $ctrl.$render = function() {
                $scope.itemValue = $ctrl.$viewValue;
            };

        }
    };
}]);

agat_gantt_module.directive("scrollArea", function($window){
    return {
        restrict: "E",
        template: '<div style="display: block; position: absolute; overflow:auto;"><ng-transclude></ng-transclude></div>',
        replace: true,
        transclude: true,
        scope: {
            hiScrollHandler: "@"
        },

        link: function($scope, $elem, $attrs) {
            var raw = $elem[0];

            $elem.bind('scroll', function () {
                if($scope.hiScrollHandler) {
                    var __fn = $scope.$parent[$scope.hiScrollHandler];
                    if(__fn){
                        __fn(raw.scrollLeft, raw.scrollTop);
                    }
                }
            });

        }
    };
});

agat_gantt_module.directive("verticalDivider", function($window){
    return {
        restrict: "E",
        template: '<div ng-mousedown="onDelimiterMouseDown(event)" ng-mouseup="onDelimiterMouseUp(event)" ng-mousemove="onDelimiterMouseMove(event)" class="x-vertical-delimiter"></div>',
        replace: true,
        transclude: true,
        scope: {
            hiVerticalDividerHandler: "@"
        },

        link: function($scope, $elem, $attrs) {
            var raw = $elem[0];

            var __move_divider = false;
            var __last_x = -1;

            var __invokeHandler = function(){
                    if($scope.hiVerticalDividerHandler) {
                        var __fn = $scope.$parent[$scope.hiVerticalDividerHandler];
                        if(__fn){
                            var __left = parseInt($elem.css("left"));
                            __fn(__left);
                        }
                    }
            };

            $elem.bind('mousedown', function(event){
                __last_x = event.clientX;
                __move_divider = true;
            });

            $elem.parent().bind('mousemove', function(event){
                if(__move_divider){
                    if(event.which == 1) {
                        var __delta = __last_x - event.clientX;
                        __last_x = event.clientX;
                        var __left = $elem.css("left");
                        __left = parseInt(__left);
                        __left -= __delta;
                        __left = __left + "px";
                        $elem.css("left", __left);
                        event.stopImmediatePropagation();
                    }else{
                        __move_divider = false;
                        __last_x = -1;
                    }
                }
            });

            $elem.parent().bind('mouseup', function(event){
                if(__move_divider){
                    __move_divider = false;
                    __last_x = -1;
                    event.stopImmediatePropagation();
                    __invokeHandler();
                }
            });

        }
    };
});

agat_gantt_module.controller('DialogGanttItemController', function ($scope, $mdDialog, index, item) {

    $scope.index = index;
    $scope.item = angular.copy(item);

    //progress -  0..1, for display multiplied by 100
    $scope.item.progress = $scope.item.progress * 100.0;

    $scope.item.start_date = $scope.item.start_date.toDate();
    $scope.item.end_date = $scope.item.end_date.toDate();

    $scope.hide = function() {
        $scope.item.progress = $scope.item.progress / 100.0;
        $scope.item.start_date = moment($scope.item.start_date);
        $scope.item.end_date = moment($scope.item.end_date);
        $mdDialog.hide({item: $scope.item, index: $scope.index} );
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
});