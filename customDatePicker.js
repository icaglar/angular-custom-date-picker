angular.module('core.ui.directives')
    .directive('customDatePicker', function($timeout,QueryOperators) {
        return {
            restrict: 'E',
            templateUrl: 'customDatePicker.html',
            scope: {
                instanceContext:'='
            },
            link: function (scope, elem, attrs) {


                $timeout(function(){

                    scope.dateCriteriaFilter = [
                        {
                            id:1,
                            name:'ToDay',
                            onlyDate:false,
                            displMonth:false,
                            displMonthOther:false
                        },
                        {
                            id:2,
                            name:'Tomorrow',
                            onlyDate:false,
                            displMonth:false,
                            displMonthOther:false
                        },
                        {
                            id:3,
                            name:'This Week',
                            onlyDate:false,
                            displMonth:false,
                            displMonthOther:false
                        },
                        {
                            id:4,
                            name:'This Month',
                            onlyDate:false,
                            displMonth:false,
                            displMonthOther:false
                        },
                        {
                            id:5,
                            name:'This Year',
                            onlyDate:false,
                            displMonth:false,
                            displMonthOther:false
                        },
                        {
                            id:6,
                            name:'Date',
                            onlyDate:true,
                            displMonth:false,
                            displMonthOther:false
                        }
                        ,
                        {
                            id:7,
                            name:'Between Two Date',
                            onlyDate:false,
                            displMonth:true,
                            displMonthOther:false
                        },
                        {
                            id:8,
                            name:'Other',
                            onlyDate:false,
                            displMonth:false,
                            displMonthOther:true
                        }


                    ]

                    scope.beforeAfterItems = [
                        {
                            id:1,
                            name:'Previous'
                        },
                        {
                            id:2,
                            name:'Next'
                        }

                    ]

                    scope.dateCriteriaTypes = [
                        {
                            id:1,
                            name:'Day'
                        },
                        {
                            id:2,
                            name:'Week'
                        },
                        {
                            id:3,
                            name:'Month'
                        },
                        {
                            id:4,
                            name:'Year'
                        },

                    ]

                    scope.resetField = function($event,instanceContext){
                        $event.stopPropagation();
                        instanceContext.value = undefined;
                        instanceContext.value1 = undefined;
                        instanceContext.value2 = undefined;
                    }

                    scope.openDatePicker = function (fieldInstanceContext, $clickEvent) {
                        $clickEvent.preventDefault();
                        $clickEvent.stopPropagation();
                        fieldInstanceContext.isDatePickerOpen = true;


                    };

                    scope.openDatePicker2= function (fieldInstanceContext, $clickEvent) {
                        $clickEvent.preventDefault();
                        $clickEvent.stopPropagation();
                        fieldInstanceContext.isDatePickerOpen2 = true;


                    };


                    scope.calculateCustomDate = function(){

                        if(scope.instanceContext && scope.instanceContext.value){

                            var selectedItem = scope.instanceContext.value;
                            var instanceContext =scope.instanceContext;

                            if(selectedItem.name =='Today'){

                                instanceContext.value1 = moment().startOf('Day').toDate();
                                instanceContext.selectedCriteriaOperator = QueryOperators.BETWEEN;
                                instanceContext.value2 = moment().endOf('Day').toDate();

                            }
                            else if(selectedItem.name =='Tomorrow'){
                                var toDay = moment();
                                var tomorrow = toDay.add('Days', 1);
                                instanceContext.value1 = moment(tomorrow).startOf('Day').toDate();
                                instanceContext.selectedCriteriaOperator = QueryOperators.BETWEEN;
                                instanceContext.value2 = moment(tomorrow).endOf('Day').toDate();

                            }
                            else if(selectedItem.name =='This Week'){

                                instanceContext.value1=moment().startOf('week').toDate();

                                instanceContext.value2 =moment().endOf('week').toDate();

                                instanceContext.selectedCriteriaOperator = QueryOperators.BETWEEN;

                            }
                            else if(selectedItem.name =='This Month'){

                                instanceContext.value1=moment().startOf('month').toDate();

                                instanceContext.value2 =moment().endOf('month').toDate();

                                instanceContext.selectedCriteriaOperator = QueryOperators.BETWEEN;

                            }
                            else if(selectedItem.name =='This Year'){

                                instanceContext.value1=moment().startOf('year').toDate();

                                instanceContext.value2 =moment().endOf('year').toDate();

                                instanceContext.selectedCriteriaOperator = QueryOperators.BETWEEN;


                            }
                            else if(selectedItem.name =='Date'){

                                instanceContext.value1=moment().startOf('Day').toDate();

                                instanceContext.value2 =moment().endOf('Day').toDate();

                                instanceContext.selectedCriteriaOperator = QueryOperators.BETWEEN;

                            }
                            else if(selectedItem.name =='Between Two Date'){

                                instanceContext.value1=moment(new Date().getYearStartDate()).format("DD.MM.YYYY");

                                instanceContext.value2 =moment(new Date().getYearEndDate()).format("DD.MM.YYYY");

                                instanceContext.selectedCriteriaOperator = QueryOperators.BETWEEN;

                            }
                            else if(selectedItem.name =='Other'){
                                instanceContext.selectedCriteriaOperator = QueryOperators.BETWEEN;
                                var multiplier = instanceContext.multiplier;
                                var isBeforeOrAfter = instanceContext.beforeAfter;
                                var dateCriteriaType = instanceContext.dateCriteriaType;

                                var dateIntegerValue = undefined;

                                if(angular.isDefined(isBeforeOrAfter) && isBeforeOrAfter.name=='Previous'){
                                    dateIntegerValue = -1;
                                }else{
                                    dateIntegerValue = 1;
                                }
                                var calculateDateMultiplier = multiplier * dateIntegerValue;

                                var finalDate = undefined;

                                if(dateCriteriaType && dateCriteriaType.name == 'Day'){



                                    if(calculateDateMultiplier<0){
                                        var toDay = moment().endOf('Day').toDate();
                                        finalDate = moment().subtract(multiplier, 'Day').startOf('Day').toDate();
                                        instanceContext.value1=finalDate;
                                        instanceContext.value2= toDay;
                                    }
                                    else{
                                        var toDay = moment().startOf('Day');
                                        finalDate = moment().add(multiplier,'Day').endOf('Day').toDate();
                                        instanceContext.value1=toDay;
                                        instanceContext.value2= finalDate;
                                    }

                                }
                                else if(dateCriteriaType && dateCriteriaType.name == 'Week'){

                                    if(calculateDateMultiplier<0){
                                        var toDay = moment().endOf('Day').toDate();
                                        finalDate = moment().subtract(multiplier, 'week').startOf('Day').toDate();
                                        instanceContext.value1=finalDate;
                                        instanceContext.value2= toDay;
                                    }
                                    else{
                                        var toDay = moment().startOf('Day');
                                        finalDate = moment().add(multiplier,'week').endOf('Day').toDate();
                                        instanceContext.value1=toDay;
                                        instanceContext.value2= finalDate;
                                    }
                                }
                                else if(dateCriteriaType && dateCriteriaType.name == 'Month'){


                                    if(calculateDateMultiplier<0){
                                        var toDay = moment().endOf('Day').toDate();
                                        finalDate = moment().subtract(multiplier, 'months').startOf('Day').toDate();
                                        instanceContext.value1=finalDate;
                                        instanceContext.value2= toDay;
                                    }
                                    else{
                                        var toDay = moment().startOf('Day');
                                        finalDate = moment().add(multiplier,'months').endOf('Day').toDate();
                                        instanceContext.value1=toDay;
                                        instanceContext.value2= finalDate;
                                    }
                                }
                                else if(dateCriteriaType && dateCriteriaType.name == 'Year'){
                                    finalDate =  moment().subtract(multiplier, 'year').startOf('Day').toDate();

                                    if(calculateDateMultiplier<0){
                                        var toDay =  moment().endOf('Day').toDate();
                                        instanceContext.value1=finalDate;
                                        instanceContext.value2= toDay;
                                    }
                                    else{
                                        var toDay =  moment().startOf('Day').toDate();
                                        instanceContext.value1=toDay;
                                        instanceContext.value2= finalDate;
                                    }
                                }

                            }
                        }
                    };

                    scope.calculateCustomDateWithEvent = function(instanceContext){

                        if(instanceContext && instanceContext.value){

                            var selectedItem = instanceContext.value;
                            var instanceContext =instanceContext;

                            if(selectedItem.name =='Today'){

                                instanceContext.value1 = moment().startOf('Day').toDate();
                                instanceContext.selectedCriteriaOperator = QueryOperators.BETWEEN;
                                instanceContext.value2 = moment().endOf('Day').toDate();

                            }
                            else if(selectedItem.name =='Tomorrow'){
                                var today = moment();
                                var tomorrow = today.add('Days', 1);
                                instanceContext.value1 = moment(tomorrow).startOf('Day').toDate();
                                instanceContext.selectedCriteriaOperator = QueryOperators.BETWEEN;
                                instanceContext.value2 = moment(tomorrow).endOf('Day').toDate();

                            }
                            else if(selectedItem.name =='This Week'){

                                instanceContext.value1=moment().startOf('week').toDate();

                                instanceContext.value2 =moment().endOf('week').toDate();

                                instanceContext.selectedCriteriaOperator = QueryOperators.BETWEEN;

                            }
                            else if(selectedItem.name =='This Month'){

                                instanceContext.value1=moment().startOf('month').toDate();

                                instanceContext.value2 =moment().endOf('month').toDate();

                                instanceContext.selectedCriteriaOperator = QueryOperators.BETWEEN;

                            }
                            else if(selectedItem.name =='This Year'){

                                instanceContext.value1=moment().startOf('year').toDate();

                                instanceContext.value2 =moment().endOf('year').toDate();

                                instanceContext.selectedCriteriaOperator = QueryOperators.BETWEEN;


                            }
                            else if(selectedItem.name =='Date'){

                                instanceContext.value1=moment().startOf('Day').toDate();

                                instanceContext.value2 =moment().endOf('Day').toDate();

                                instanceContext.selectedCriteriaOperator = QueryOperators.BETWEEN;

                            }
                            else if(selectedItem.name =='Between Two Date'){

                                instanceContext.value1=moment(new Date().getYearStartDate()).format("DD.MM.YYYY");

                                instanceContext.value2 =moment(new Date().getYearEndDate()).format("DD.MM.YYYY");

                                instanceContext.selectedCriteriaOperator = QueryOperators.BETWEEN;

                            }
                            else if(selectedItem.name =='Other'){
                                instanceContext.selectedCriteriaOperator = QueryOperators.BETWEEN;
                                var multiplier = instanceContext.multiplier;
                                var isBeforeOrAfter = instanceContext.beforeAfter;
                                var dateCriteriaType = instanceContext.dateCriteriaType;

                                var dateIntegerValue = undefined;

                                if(angular.isDefined(isBeforeOrAfter) && isBeforeOrAfter.name=='Previous'){
                                    dateIntegerValue = -1;
                                }else{
                                    dateIntegerValue = 1;
                                }
                                var calculateDateMultiplier = multiplier * dateIntegerValue;

                                var finalDate = undefined;

                                if(dateCriteriaType && dateCriteriaType.name == 'Day'){



                                    if(calculateDateMultiplier<0){
                                        var toDay = moment().endOf('Day').toDate();
                                        finalDate = moment().subtract(multiplier, 'Day').startOf('Day').toDate();
                                        instanceContext.value1=finalDate;
                                        instanceContext.value2= toDay;
                                    }
                                    else{
                                        var toDay = moment().startOf('Day');
                                        finalDate = moment().add(multiplier,'week').endOf('Day').toDate();
                                        instanceContext.value1=toDay;
                                        instanceContext.value2= finalDate;
                                    }

                                }
                                else if(dateCriteriaType && dateCriteriaType.name == 'Week'){

                                    if(calculateDateMultiplier<0){
                                        var toDay = moment().endOf('Day').toDate();
                                        finalDate = moment().subtract(multiplier, 'week').startOf('Day').toDate();
                                        instanceContext.value1=finalDate;
                                        instanceContext.value2= toDay;
                                    }
                                    else{
                                        var toDay = moment().startOf('Day');
                                        finalDate = moment().add(multiplier,'week').endOf('Day').toDate();
                                        instanceContext.value1=toDay;
                                        instanceContext.value2= finalDate;
                                    }
                                }
                                else if(dateCriteriaType && dateCriteriaType.name == 'Month'){


                                    if(calculateDateMultiplier<0){
                                        var toDay = moment().endOf('Day').toDate();
                                        finalDate = moment().subtract(multiplier, 'months').startOf('Day').toDate();
                                        instanceContext.value1=finalDate;
                                        instanceContext.value2= toDay;
                                    }
                                    else{
                                        var toDay = moment().startOf('Day');
                                        finalDate = moment().add(multiplier,'months').endOf('Day').toDate();
                                        instanceContext.value1=toDay;
                                        instanceContext.value2= finalDate;
                                    }
                                }
                                else if(dateCriteriaType && dateCriteriaType.name == 'Year'){
                                    finalDate =  moment().subtract(multiplier, 'year').startOf('Day').toDate();

                                    if(calculateDateMultiplier<0){
                                        var toDay =  moment().endOf('Day').toDate();
                                        instanceContext.value1=finalDate;
                                        instanceContext.value2= toDay;
                                    }
                                    else{
                                        var toDay =  moment().startOf('Day').toDate();
                                        instanceContext.value1=toDay;
                                        instanceContext.value2= finalDate;
                                    }
                                }

                            }


                        }




                    };

                    scope.onlyDateChanged = function(instanceContext){

                        var date = instanceContext.value1;

                        instanceContext.value1 =  moment(Date.parse(date)).startOf('Day').toDate();

                        instanceContext.value2 = moment(Date.parse(date)).endOf('Day').toDate();

                        instanceContext.selectedCriteriaOperator = QueryOperators.BETWEEN;
                    }



                    var initDefaultValue = function(){

                        if(scope.instanceContext.value=='thismonth'){
                            scope.instanceContext.value1=moment().startOf('month').toDate();

                            scope.instanceContext.value2 =moment().endOf('month').toDate();

                            scope.instanceContext.selectedCriteriaOperator = QueryOperators.BETWEEN;
                            scope.instanceContext.value = scope.dateCriteriaFilter[3];
                            scope.instanceContext.value2 =moment().endOf('month').toDate();

                            scope.instanceContext.selectedCriteriaOperator = QueryOperators.BETWEEN;
                            scope.instanceContext.value = scope.dateCriteriaFilter[3];



                        }
                        else if(scope.instanceContext.value=='thisweek'){
                            scope.instanceContext.value1=moment().startOf('week').toDate();
                            scope.instanceContext.value2 =moment().endOf('week').toDate();

                            scope.instanceContext.selectedCriteriaOperator = QueryOperators.BETWEEN;
                            scope.instanceContext.value = scope.dateCriteriaFilter[2];



                        }
                        else if(scope.instanceContext.value=='thisyear'){
                            scope.instanceContext.value1=moment().startOf('year').toDate();
                            scope.instanceContext.value2 =moment().endOf('year').toDate();

                            scope.instanceContext.selectedCriteriaOperator = QueryOperators.BETWEEN;
                            scope.instanceContext.value = scope.dateCriteriaFilter[4];



                        }
                        else if(scope.instanceContext.value=='toDay'){
                            scope.instanceContext.value1=moment().startOf('Day').toDate();
                            scope.instanceContext.value2 =moment().endOf('Day').toDate();

                            scope.instanceContext.selectedCriteriaOperator = QueryOperators.BETWEEN;
                            scope.instanceContext.value = scope.dateCriteriaFilter[0];

                        }
                        else if(scope.instanceContext.value=='tomorrow'){
                            var toDay = moment();
                            var tomorrow = toDay.add('Days', 1);
                            scope.instanceContext.value1 = moment(tomorrow).startOf('Day').toDate();
                            scope.instanceContext.selectedCriteriaOperator = QueryOperators.BETWEEN;
                            scope.instanceContext.value2 = moment(tomorrow).endOf('Day').toDate();
                            scope.instanceContext.selectedCriteriaOperator = QueryOperators.BETWEEN;
                            scope.instanceContext.value = scope.dateCriteriaFilter[1];

                        }

                    }


                   initDefaultValue();


                    scope.$on('dateFilterEvent', function(e,instanceContext) {
                        scope.calculateCustomDateWithEvent(instanceContext);
                    });
                },0)

            }
        }}).constant('QueryOperators', {
        EQUAL: {name: 'EQUAL', label: 'Equal', sign: 'fa fa-arrows-h'},
        NOT_EQUAL: {name: 'NOT_EQUAL', label: 'NotEqual', sign: 'fa fa-arrows-v'},
        GREATER_THAN: {name: 'GREATER_THAN', label: 'Greater', sign: 'fa fa-chevron-right'},
        LESS_THAN: {name: 'LESS_THAN', label: 'LessThan', sign: 'fa fa-chevron-left'},
        GREATER_THAN_OR_EQUAL: {name: 'GREATER_THAN_OR_EQUAL', label: 'GreaterorEqual', sign: 'fa fa-chevron-circle-right'},
        LESS_THAN_OR_EQUAL: {name: 'LESS_THAN_OR_EQUAL', label: 'LessorEqual', sign: ' fa fa-chevron-circle-left'},
        BETWEEN: {name: 'BETWEEN', label: 'Between', sign: 'fa fa-exchange'},
        IN: {name: 'IN', label: 'In', sign: 'fa fa-check-square'},
        NOT_IN: {name: 'NOT_IN', label: 'NotIn', sign: 'fa fa-check-square-o'},
        EMPTY: {name: 'EMPTY', label: 'Empty', sign: 'fa fa-circle-o'},
        NOT_EMPTY: {name: 'NOT_EMPTY', label: 'NotEmpty', sign: 'fa fa-circle'},
        STARTS_WITH: {name: 'STARTS_WITH', label: 'StartsWith', sign: 'fa fa-inbox'},
        ENDS_WITH: {name: 'ENDS_WITH', label: 'EndsWith', sign: 'fa-hourglass-half'},
        CONTAINS: {name: 'CONTAINS', label: 'Contains', sign: 'fa fa-hashtag'}

    })
