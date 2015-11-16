myApp.directive('addressOutput',
    function(){
        return{
        restrict: "E",
            scope:{
            info: "="
        },
        templateUrl: "assets/views/addressprofile.html"
        }

});