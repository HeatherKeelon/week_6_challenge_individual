myApp.directive('orderOutput',
    function(){
        return{
            restrict: "E",
            scope:{
                info: "="
            },
            templateUrl: "assets/views/ordersprofile.html"
        }

    });