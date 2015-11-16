myApp.controller('MainController', ['$scope', '$http', function($scope, $http){
    console.log("Main Controller Active");

    $scope.people = [];
    $scope.addresses = [];



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
                console.log($scope.addresses);
            });
        }
    };

    $scope.getPeople();
}]);