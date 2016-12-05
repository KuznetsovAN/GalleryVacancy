/**
 * Created by kuznez on 02.12.2016.
 */
galleryApp.controller('tileController', function($scope, $http) {

    var model ={};


    $scope.delDialog = function(id,index) {

        var element = {id:id,index:index};

        $scope.del = element;

        $scope.showDelUpDialog = true;
    }

    $http.get('/gallery').success(function(data) {
        model.items = data;
    });

    $scope.list = model;




});


