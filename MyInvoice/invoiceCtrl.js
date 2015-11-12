var app = angular.module("myInvoice", []);
app.controller("invoiceCtrl", function($scope) {
	$scope.products = ["iPod Classic", "iMac", "iPad", "MacBook Air",
						"MacBook Pro", "Apple TV", "iPhone"];
	$scope.selectedProducts = [];
	$("#successSave").hide();
	$("#successSubmit").hide();
	// set default value to 0
	$scope.quantity = 0;
	$scope.price = 0;
	$scope.total = 0;
	
	// select all the products
	$scope.selectAll = function() {
		$scope.selectedProducts = angular.copy($scope.products);
		$("#filteredProducts option").prop("selected", true);
	};
	
	// clear selection
	$scope.clearAll = function() {
		$scope.selectedProducts = [];
	};

	// remove a product from the table
	$scope.removeRow = function removeRow(p) {
        var index = $scope.selectedProducts.indexOf(p);
        if (index !== -1) {
            $scope.selectedProducts.splice(index, 1);
        }
    };
	
	// validate quantity
	$scope.quantityChange = function(num) {
		if(num < 0) {
			alert("Quantity can't be negative!");
			this.quantity = 0;
		};
	};
	
	// validate price
	$scope.priceChange = function(num) {
		if(num < 0) {
			alert("Price can't be negative!");
			this.price = 0;
		};
	};
	
	$scope.save = function() {
		$("#successSave").fadeTo(2000, 500).slideUp(500, function(){
			$("#successSave").alert("close");
		});
	};
	
	// create an invoice and print it to console
	$scope.submit = function() {
		// get cell values
		$scope.quantityArray = []
		$("#details .quantity input").each(function() {
			$scope.quantityArray.push($(this).val());
		});
		$scope.priceArray = []
		$("#details .price input").each(function() {
			$scope.priceArray.push($(this).val());
		});
		$scope.totalArray = []
		$("#details .total label").each(function() {
			// get rid of '$' sign
			$scope.totalArray.push($(this).text().substring(1));
		});
		$scope.invoiceProducts = [];
		for (var i = 0; i < $scope.selectedProducts.length; i++) {
			$scope.invoiceProducts.push({
				"name" : $scope.selectedProducts[i],
				"Quantity" : String($scope.quantityArray[i]),
				"Price" : String($scope.priceArray[i]),
				"Total" : $scope.totalArray[i]
			});
		}
		// JSON format
		$scope.invoiceData = [{
			"customerName" : String($scope.customerName),
			"date" : String($scope.date),
			"invoiceNum" : String($scope.invoiceNum),
			"products" : $scope.invoiceProducts
		}];
		console.log($scope.invoiceData);
		
		$("#successSubmit").fadeTo(2000, 500).slideUp(500, function(){
			$("#successSubmit").alert("close");
		});
	};
});
