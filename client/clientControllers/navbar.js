auctionApp.controller("NavBarCtrl",['$scope', '$rootScope','$http','$location','ipCookie','LoggedInCheck',function($rootScope,$scope, $http,$location,ipCookie,LoggedInCheck) {

    if (LoggedInCheck.loginCheck == true) {
        $scope.error = false;
        $rootScope.presentEmail = JSON.parse(LoggedInCheck.loggedUserDetails).email;
    }else{
        LoggedInCheck.setLogged(false);
        ipCookie.remove('auctionCookie');
        localStorage.removeItem('lastLogin');
        $location.path("/login");
    }

    $scope.logout = function () {
        LoggedInCheck.setLogged(false);
        ipCookie.remove('auctionCookie');
        localStorage.removeItem('lastLogin');
        $location.path("/login");
    };

}]);
