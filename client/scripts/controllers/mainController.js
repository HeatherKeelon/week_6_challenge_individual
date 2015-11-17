myApp.controller('MainController', ['$scope', '$http', function($scope, $http){
    console.log("Main Controller Active");

    $scope.people = [];
    $scope.addresses = [];
    $scope.dates = {};
    $scope.totalorders=[];
    $scope.totalamount=[];



    $scope.getPeople= function(){
        $http.get('/people').then(function(response){

            $scope.people=response.data;

            //for (var i= 0; i<response.data.length; i++ ){
            //    $scope.people.push(response.data[i]['name']);
            //}
            console.log($scope.people);
        });
    };

//Doing this by ID would make a lot more sense. If time, convert this.
    $scope.findAddresses = function(person){
        if (person==undefined){console.log("Undefined person");}
        else {
            $http.get('/addresses', {params: {name: person}}).then(function (response) {
                $scope.addresses=response.data;
                console.log("This is addresses " , $scope.addresses);
            });
        }
    };

    $scope.submitName = function(dates){
        var amount = "";
        dates.name=dates.name['name'];
        console.log(dates);
        $http.get('/orders', {params: {name:dates.name, startdate:dates.startdate, enddate:dates.enddate}}).then(function(response){
            $scope.totalorders=response.data;

            console.log("total orders", $scope.totalorders);
            var totalorders=$scope.totalorders;
            for (orders in totalorders){
                var money=parseInt(totalorders[orders].amount);
                amount += money;
                console.log("This is amount", amount);
            };
        });
        $scope.dates={};
    };

    $scope.getPeople();
}]);