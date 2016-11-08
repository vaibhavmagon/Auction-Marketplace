auctionApp.directive("userWidget", ['LoggedInCheck','ipCookie','host','$http','$location',function(LoggedInCheck,ipCookie,host,$http,$location) {
    return {
        restrict : "A",
        scope: { userDetails: '='},
        template : '<div class="row"><div class="col-md-12 headingDiv">'+
                    '<div class="col-md-10">'+
                        '<h2>Player Stats</h2>'+
                    '</div>'+
                    '<div class="col-md-2">'+
                        '<button class="btn btn-xs btn-primary clearButton" ng-click="logout()"><i class="fa fa-power-off" style="font-size: 20px;padding-top: 13px;"></i></button>'+
                    '</div>'+
                '</div>'+
                '</div>'+
                '<div class="row">'+
                    '<div class="col-md-12 statsDiv">'+
                        '<label>Name :</label> {{ showUser.userName }}'+
                    '</div>'+
                    '<div class="col-md-12 statsDiv">'+
                    '<label>Coins :</label> {{ showUser.userBal }}'+
                '</div></div>',
        link : function (scope, $element) {
            console.log(scope.userDetails);
            scope.logout = function () {
                LoggedInCheck.setLogged(false);
                ipCookie.remove('auctionCookie');
                localStorage.removeItem('lastLogin');
                $location.path("/login");
            };

            (function getUserDetails() {
                $http({
                    url: host + "users/find/" + scope.userDetails.userName,
                    method: "GET",
                    crossDomain: true
                }).success(function (data, status, headers, config) {
                    scope.showUser = data;
                }).error(function (data, status, headers, config) {
                    console.log("Error In get Inventories for user", data);
                    scope.message = data.message;
                });
            }());

        }
    };
}]);
