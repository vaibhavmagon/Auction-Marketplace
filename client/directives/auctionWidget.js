auctionApp.directive("auctionWidget", ['LoggedInCheck','ipCookie','host','$http','$interval','$timeout','$compile',function(LoggedInCheck,ipCookie,host,$http,$interval,$timeout,$compile) {
    return {
        restrict : "AEC",
        scope: true,
        template : '<div class="row">'+
            '<div class="col-md-12 headingDiv">'+
            '<div class="col-md-10">'+
            '<h2>Current Auction</h2>'+
            '</div>'+
            '<div class="col-md-2">'+
            '<button class="btn btn-xs btn-primary clearButton" ng-click="checkAuction()"><i class="fa fa-refresh" style="font-size: 20px;padding-top: 13px;"></i></button>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<div class="row" ng-if="activeAuction">'+
            '<div class="col-md-12 statsDiv">'+
            '<label>Seller :</label> {{ activeAuction.userName }}'+
            '</div>'+
            '<div class="col-md-12 auctionItemDiv alignCenter">'+
            '<div class="col-md-6">'+
            '<i class="fa fa-qrcode" style="font-size: 35px;"></i><br/>'+
            '{{ activeAuction.itemName }}'+
            '</div>'+
            '<div class="col-md-6">'+
            '<label>Quantity</label><br/>'+
            '{{ activeAuction.itemQuantity }}'+
            '</div>'+
            '</div>'+
            '<div class="col-md-12 auctionItemDiv">'+
            '<label>Time Left :</label> {{ timeRemaining | number:0 || "0" }}'+
            '</div>'+
            '<div class="col-md-12 auctionItemDiv">'+
            '<label>Minimum Bid :</label> {{ activeAuction.minBid }}'+
            '</div>'+
            '<div class="col-md-12 auctionItemDiv alignCenter" ng-show="activeAuction.userName != presentUser.userName">'+
            '<input autocomplete="off" class="paper-input paper-input--floating" type="number" id="bidVal"/>'+
            '<label>Enter value for Bid</label>'+
            '</div>'+
            '</div>'+
            '<div class="row" ng-if="activeAuction">'+
            '<div class="col-md-12 auctionItemDiv alignCenter" ng-show="activeAuction.userName != presentUser.userName">'+
            '<button class="btn btn-primary auctionButton" ng-click="placeBid()"><i class="fa fa-money"></i>Place Bid</button>'+
            '</div>'+
            '</div>'+
            '<div class="row" ng-if="!activeAuction">'+
            '<div class="col-md-12 auctionItemDiv alignCenter">'+
            '<label>No auction at the moment</label>'+
            '</div>'+
            '</div>',
        link : function (scope, $element, attrs) {

        }
    };
}]);
