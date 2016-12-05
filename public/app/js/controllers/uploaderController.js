/**
 * Created by kuznez on 02.12.2016.
 */
galleryApp.controller('uploaderController', function($scope, $http, FileUploader) {
    $scope.uploader = new FileUploader({
        url:"/uploader",
        filters:[{
            name: 'useJPEG',
            fn: function(item) {

                if(item.name.match('\.jpg$|\.JPEG$')==null||item.name.match('\.jpg$|\.JPEG$').length==0) return false;

                return true;
            }
        }]
    });




});


