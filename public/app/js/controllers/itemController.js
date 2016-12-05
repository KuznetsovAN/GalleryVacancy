/**
 * Created by kuznez on 02.12.2016.
 */
galleryApp.controller('itemController', function($scope, $http, $location) {

    var url = $location.url();
    $http.get(url).success(function(data) {
        $scope.dataItem = data;
    });

    $scope.idEditComments = undefined;

    $scope.addComment = function(){

        //if($scope.idEditComments == '' ) return false;

        if($scope.idEditComments==undefined||$scope.idEditComments.length==0)
        {
            $http.post(url,{
                data: {
                    author:$scope.author,
                    text: $scope.textComment
                }
            }).success(function(data) {
                if(data.success == true) {
                    $scope.dataItem.comments.push({
                        id: data.id,
                        author: $scope.author,
                        date: data.date,
                        text: $scope.textComment
                    });
                    $scope.cancelComment();
                    console.log("1OK");
                }
            });
        }
        else {
            $http.post(url,{
                data: {
                    id:$scope.dataItem.comments[$scope.idEditComments].id,
                    author:$scope.author,
                    text: $scope.textComment
                }
            }).success(function(data) {
                if(data.success == true) {

                    $scope.dataItem.comments[$scope.idEditComments] = {
                        id:$scope.dataItem.comments[$scope.idEditComments].id,
                        author:$scope.author,
                        date:data.date,
                        text:$scope.textComment
                    };
                    $scope.cancelComment();
                    console.log("2OK");
                }
            });
        }
    };

    $scope.editComment = function(index){
        $scope.idEditComments = index;
        $scope.author = $scope.dataItem.comments[index].author;
        $scope.textComment = $scope.dataItem.comments[index].text;
    };

    $scope.cancelComment = function () {
        $scope.textComment = undefined;
        $scope.idEditComments = 0;
        $scope.author = '';
    }

});


