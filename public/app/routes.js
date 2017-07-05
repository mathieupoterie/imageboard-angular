angular.module('app.routes', ['ui.router'])

.config(function($stateProvider, $locationProvider){
    $stateProvider
    .state('home',{
        url: '/',
        views: {
            'main': {
                templateUrl: 'public/app/views/images.html'
            }
        }
    })

    .state('upload',{
        url: '/upload',
        views: {
            'main': {
                templateUrl: 'public/app/views/upload/upload.html'
            }
        }
    })
    .state('single',{
        url: '/single/:imageId',
        views: {
            'main': {
                templateUrl: 'public/app/views/single/single.html',
                controller : "imageIdCtrl"
            },
            'comments': {
                templateUrl: 'public/app/views/single/comments.html',
                controller : "commentsCtrl"
            }
        },
    })
    .state('hashtag',{
        url: '/hashtag/:hashtag',
        views: {
            'main': {
                templateUrl: 'public/app/views/hashtag/hashtag.html',
                controller : "hashtagPageCtrl"
            }
        }
    })
    $locationProvider.html5Mode(true);
})

.controller('imageIdCtrl', function($http, $stateParams, $scope){
    $scope.imageIdCtrl = function(){
        $http({
            url: '/single',
            method: 'GET',
            params : {id :$stateParams.imageId}
        }).then(function(response){
            var results = response.data.file;
            if (!results.likes) {
                results.likes = 0;
            }
            $scope.imageIdCtrl = results;
        }).catch(function(e){
            console.log("errrroooor route.js imdIdCtrl controller");
        })
    };
    $scope.imageIdCtrl();

    $scope.likeImage = function() {
        $http({
            url:`/singleLike`,
            method: 'POST',
            data: $.param({
                likes: $scope.imageIdCtrl.likes + 1,
                imageId : $stateParams.imageId
            }),
            headers: {'Content-Type' : 'application/x-www-form-urlencoded'}
        }).then(function(response) {
            var numberOfLikes = response.data.file.likes;
            $scope.newLike = numberOfLikes;
        }).catch(function(err) {
            console.log(err);
        });
    };
    $scope.notLikeTwice = function(){
        alert("Don't like twice please!")
    }
})

.controller('commentsCtrl', function($http, $stateParams, $scope){
    var resultsLength = 0;
    $scope.getComments = function(){
        $http({
            url: '/comments',
            method: 'GET',
            params : {id :$stateParams.imageId, limit : 5, offset : resultsLength}
        }).then(function(response){
            if (response.data.file) {

                resultsLength += response.data.file.length
                var results = response.data.file;
                if(!$scope.comments){

                    $scope.comments = results;
                }else {

                    $scope.comments = $scope.comments.concat(results);
                }
            }else {

                $scope.end = true;
            }
        }).catch(function(e){
            console.log("errrroooor route.js commentsCtrl controller");
        })
    }
    $scope.getComments();
})

.controller('commentCtrl', ['$scope', '$http', function($scope, $http, $stateParams) {

    $scope.submitComment = function(comment, imageId) {

        $http({
            url: `/comment`,
            method: 'POST',
            data: $.param({
                comment : comment.content,
                imageId: imageId,
                user : comment.user
                //hashtag : hashtagArray
            }),
            headers : {'Content-Type' : 'application/x-www-form-urlencoded'}
        }).then(function(data){
            var newComment = data.data.file[0]
            return $scope.successComment = newComment;
        }).catch(function(e){
            console.log(e);
        })
    };

}])
.controller('hashtagPageCtrl', function($http, $stateParams, $scope){
    $http({
        url: '/hashtag',
        method: 'GET',
        params : {hashtag :$stateParams.hashtag}
    }).then(function(response){
        var results = response.data.file;
        $scope.hashtagImages = results;
        $scope.titlehashtag = $stateParams.hashtag
    }).catch(function(e){
        console.log(e, "error");
    })
})
