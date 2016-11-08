auctionApp.directive("inventoryWidget", ['LoggedInCheck','ipCookie','host','$http',function(LoggedInCheck,ipCookie,host,$http) {
    return {
        restrict : "A",
        scope: { userDetails: '=', presentAutionDetails: '='},
        template : '<div class="row">'+
                    '<div class="col-md-12 headingDiv">'+
                        '<h2>Inventory</h2>'+
                    '</div>'+
                '</div>'+
                '<div class="row">'+
                    '<ul class="inventories">'+
                        '<li class="col-md-12" ng-repeat="inventory in inventoryArr">'+
                            '<div class="col-md-4">'+
                                '<i class="fa fa-qrcode" style="font-size: 35px;"></i><br/>'+
                                    '{{ inventory.itemName }}'+
                            '</div>'+
                            '<div class="col-md-4">'+
                                '<label>Quantity</label><br/>'+
                                    '{{ inventory.itemQuantity }}'+
                            '</div>'+
                            '<div class="col-md-4">'+
                                '<i class="fa fa-volume-up" style="font-size: 30px;"></i><br/>'+
                                '<button ng-show="inventory.itemQuantity > 0" class="btn btn-xs btn-primary" ng-click="auctionSelect(inventory)">Auction</button>'+
                            '</div>'+
                        '</li>'+
                    '</ul>'+
                '</div>',
        link : function (scope, $element) {
            scope.auctionSelect = function(inventory) {
                $("#startAuctionModal").modal('toggle');
                inventory['oldQuantity'] = inventory.itemQuantity;
                scope.presentAutionDetails = inventory;
            };

            (function showUserInventory() {
                $http({
                    url: host + "inventories/find/" + scope.userDetails.userName,
                    method: "GET",
                    crossDomain: true
                }).success(function (data, status, headers, config) {
                    scope.inventoryArr = data;
                }).error(function (data, status, headers, config) {
                    console.log("Error In get Inventories for user", data);
                    scope.message = data.message;
                });
            }());

        }
    };
}]);
