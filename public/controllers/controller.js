var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(function($routeProvider) {
        $routeProvider
			
			.when('/', {
                templateUrl : 'home.html',
				controller  : 'AppHomeCtrl'
            })
			
			// route for the home page
            .when('/home', {
                templateUrl : 'home.html',
				controller  : 'AppHomeCtrl'
            })
			
            // route for the meeting page
            .when('/meeting', {
                templateUrl : 'meeting.html',
                controller  : 'AppMeetingCtrl'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'contact.html',
                controller  : 'AppContactCtrl'
            });
    });
	myApp.controller('AppHomeCtrl', ['$scope', '$http', function($scope, $http) {
		$scope.location = function(){
		$http.get('/location').success(function(response){
			$scope.location = response;
		});
	};
		}]);
myApp.controller('AppContactCtrl', ['$scope', '$http', function($scope, $http) {
    
	var refresh = function(){
	$http.get('/contactlist').success(function(response){
		$scope.contactlist = response;
		$scope.contact = "";
	});
	};
	refresh();
	$scope.addContact = function(){
		$http.post('/contactlist',$scope.contact).success(function(response){
			refresh();
		});
	};
	$scope.remove = function(id){
		$http.delete('/contactlist/'+id).success(function(response){
			refresh();
		});
	};
	
	$scope.edit = function(id){
		$http.get('/contactlist/'+id).success(function(response){
			$scope.contact = response;
		});
	};
	$scope.update = function(){
		$http.put('/contactlist/'+$scope.contact._id,$scope.contact).success(function(response){
			refresh();
		})
	};
	$scope.clear = function(){
		$scope.contact = "";
	}
}]);
myApp.controller('AppMeetingCtrl', ['$scope', '$http', function($scope, $http) {
    
	var refresh = function(){
	$http.get('/meeting').success(function(response){
		$scope.meeting = response;
		$scope.meet = "";
	});
	$http.get('/meetingcount').success(function(response){
		$scope.meetingcount = response;
	});
	};
	refresh();
	 $scope.addMeeting = function(){
		$http.post('/meeting',$scope.meet).success(function(response){
			refresh();
		});
	};
	$scope.removeMeeting = function(id){
		$http.delete('/meeting/'+id).success(function(response){
			refresh();
		});
	};
	
	$scope.editMeeting = function(id){
		$http.get('/meeting/'+id).success(function(response){
			$scope.meet = response;
		});
	};
	$scope.updateMeeting = function(){ 
		$http.put('/meeting/'+$scope.meet._id,$scope.meet).success(function(response){
			refresh();
		})
	};
	$scope.clear = function(){
		$scope.meet = "";
	}
}]);
