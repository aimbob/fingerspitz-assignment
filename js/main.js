var eurail = angular.module('eurail', ['ngSanitize']);

eurail.controller('eurailcontroller', ['$scope', '$http', '$window', function($scope, $http, $window) {

	// form data
	$scope.api = {
		'travelPacks' : [
			'English',
			'Spanish',
			'French',
			'Portuguese',
			'Korean',
			'Japanese',
			'Chinese'
		],
		'countries' : [
			'select country',
			'Belgium',
			'United Kingdom',
			'Netherlands',
			'Germany'
		],
		'prices' : {
			'shippingMethod': {
				10: 7,
				6: 11,
				3: 29
			},
			'protection': 17,
			'ticket': {
				1:374,
				2:281
			}
		}
	}

	// form values
	$scope.class= 2;
	$scope.protection = null;
	$scope.activate = false;
	$scope.country = 'Netherlands';
	$scope.shippingMethod = null;
	$scope.travelPack = 'English';

	$scope.downgrade = function(){ $scope.class = 2; }

	// calculate total order cost
	$scope.total = function(){
		var i = 0;
		if (typeof $scope.api.prices['shippingMethod'][$scope.shippingMethod] !== 'undefined'){
			i+= $scope.api.prices['shippingMethod'][$scope.shippingMethod];
		}
		i+=$scope.api.prices['ticket'][$scope.class];
		if ($scope.protection == 'true'){
			i+= $scope.api.prices.protection;
		}
		return i;
	}

	// validation
	$scope.subbmit = function(formValid){
		console.log('submit');
		$scope.submitted = true;

		if (!$scope.protection) {
			var element = document.getElementById("protection");
			element.scrollIntoView();
			return false;
		}

		if (!$scope.shippingMethod) {
			var element = document.getElementById("shipping-method");
			element.scrollIntoView();
			return false;
		}
		var label = $scope.class == 1 ? '1st class' : '2nd class';

		ga('send', {
			hitType: 'event',
			eventCategory: 'click',
			eventAction: 'checkout',
			eventLabel: $scope.class,
		});

		document.getElementById("shopping-cart-form").submit();
	}


}]);