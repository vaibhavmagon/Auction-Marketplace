auctionApp.factory('LoggedInCheck', function() {
    var element = {
        loginCheck : null,
        loggedUserDetails : null
    };

    element.setLogged = function (text) {
        this.loginCheck = text;
    };

    element.setLoggedDetails = function(ele){
        this.loggedUserDetails = ele;
    };

    return element;
});

