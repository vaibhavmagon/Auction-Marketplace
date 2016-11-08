auctionApp.controller("LoginCtrl", ['$rootScope','$scope','$routeParams','$location','$http','$parse','ipCookie','LoggedInCheck','host','socket',
    function($rootScope,$scope,$routeParams,$location,$http,$parse,ipCookie,LoggedInCheck,host,socket) {

        var element = $('.paper-input');

        element.on('keydown keyup focus blur', function() {
            if($(this).val() != '') {
                $(this).addClass('paper-input--touched');
            } else{
                $(this).removeClass('paper-input--touched');
            }
        });

        element.on('keyup blur', function() {
            $(this).addClass('paper-input--dirty');
        });

        $scope.credentials = {userName:""};
        $scope.login = function () {
            $(".loaderImage").show();
            var req = {
                method: 'GET',
                url: host + 'users/create/' + $scope.credentials.userName
            };
            socket.emit('connected',{nameFrom: $scope.credentials.userName});
            $http(req).success(function (data, status, headers, config) {
                console.log(data);
                if(data) {
                    LoggedInCheck.setLogged(true);
                    var newObj = {
                        userId : data.userId,
                        userName : $scope.credentials.userName,
                        userBal : data.userBal
                    };
                    $(".loaderImage").hide();
                    LoggedInCheck.setLoggedDetails(JSON.stringify(newObj));
                    localStorage.setItem('lastLogin', JSON.stringify(newObj));
                    var rString = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyz');
                    ipCookie('auctionCookie',rString);
                    $location.path("/dashBoard");
                    $scope.error = false;
                } else {
                    errToggleModal("Name Incorrect. Please Check!");
                    LoggedInCheck.setLogged(false);
                    $location.path("/login");
                    $scope.error = true;
                }
            });
        };

        $scope.logout = function () {
            LoggedInCheck.setLogged(false);
            ipCookie.remove('auctionCookie');
            localStorage.removeItem('lastLogin');
            $location.path("/login");
        };

        /***************** Generic Function ***************/

        function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
            return result;
        }

        function errToggleModal(err){
            $(".loaderImage").hide();
            $scope.message = err;
            $('#loginErrorModal').modal('toggle');
            setTimeout(function () {
                $scope.message = '';
                $('#loginErrorModal').modal('toggle');
            }, 1000);
        }

    }]);
