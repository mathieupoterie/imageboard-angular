var focal = angular.module('focal', ['app.routes', 'app.nav', 'app.factory.images']);

focal.controller('imagesCtrl', function($scope, serviceHttp){
    var resultsLength = 0;
    $scope.search = {};

    $scope.getImages = function(){
        serviceHttp.getImages(resultsLength).then(function(result){
            resultsLength += result.length
            if(!$scope.images){
                $scope.images = result;
            }else {
                if (result.length < 6) {
                    $scope.end = true;
                }
                $scope.images = $scope.images.concat(result);
            }
        }).catch(function(e){
            console.log("error");
        })
    }
    $scope.getImages();
});


focal.controller('uploadCtrl', ['$scope', '$http', function($scope, $http) {
    var hashtags = "";
    $scope.submitUpload = function(upload) {

        var file = $('input[type="file"]').get(0).files[0];

        var user = upload.user;
        var title = upload.title;
        var description = upload.description;
        var hashtagSubmitted = upload.hashtag;
        if (hashtagSubmitted) {
            var hashtagArray = hashtagSubmitted.match(/#\S+/g);
            for (var i=0; i<hashtagArray.length ; i++){
                hashtags += hashtagArray[i]+ " ";
            }
        }

        if(file){

            var formData = new FormData();
            formData.append('file', file);
            formData.append('user', user);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('hashtag', hashtags)

            $http({
                url: '/uploadImageFromAngular',
                method: 'POST',
                data: formData,
                headers : {'Content-Type' : undefined},
                transformRequest : angular.identity
            }).then(function(data){
                return $scope.uploadedImage = data.data.file

            }).catch(function(e){
                console.log(e);
            });
        }else {
            $("body").append("<p>No file uploaded!</p>")
        }
    }
}]);
