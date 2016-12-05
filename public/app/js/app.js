/**
 * Created by kuznez on 01.12.2016.
 */


var galleryApp = angular.module('galleryApp', ["ngRoute","textAngular","angularFileUpload"])
    .config(function($routeProvider){
        $routeProvider.when('/',
            {
                templateUrl:'app/views/tile.html',
                controller:'tileController'
            });

        $routeProvider.when('/item/:id',
            {
                templateUrl:'app/views/item.html',
                controller:'itemController'
            });
        $routeProvider.when('/uploader',
            {
                templateUrl:'app/views/uploader.html',
                controller:'uploaderController'
            });


    });



galleryApp.directive('delUpDialog', function(){
    return {
        restrict: 'E',
       // scope: false,
        templateUrl: 'app/views/dialog.html',
        controller: function( $scope,$http ) {

            $scope.showDelUpDialog = false;

            $scope.closeDelUpDialog = function() {
                $scope.showDelUpDialog = false;
            }

            $scope.okDelUpDialog = function() {
                console.log($scope.del);
                $http.delete('/delete/'+$scope.del.id).success(function(data) {
                    if(data.success==true)
                    {
                        $scope.list.items.splice($scope.del.index, 1);
                    }
                    $scope.showDelUpDialog = false;
                });
            }
        }
    }
});

galleryApp.directive('ngThumb', ['$window', function($window) {
    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function(item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function(file) {
            var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

    return {
        restrict: 'A',
        template: '<canvas/>',
        link: function(scope, element, attributes) {
            if (!helper.support) return;

            var params = scope.$eval(attributes.ngThumb);

            if (!helper.isFile(params.file)) return;
            if (!helper.isImage(params.file)) return;

            var canvas = element.find('canvas');
            var reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(params.file);

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
                var width = params.width || this.width / this.height * params.height;
                var height = params.height || this.height / this.width * params.width;
                canvas.attr({ width: width, height: height });
                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
            }
        }
    };
}]);