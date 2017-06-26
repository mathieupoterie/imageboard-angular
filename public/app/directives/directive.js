angular.module('app.nav', [])

.directive('navBar', function(){
    return {
        templateUrl: 'public/app/views/nav/nav.html',
        restrict: 'E'
    }
})

.directive('comments', function(){
    return {
        templateUrl: 'public/app/views/single/comments.html',
        restrict: 'E'
    }
})

.directive('success', function(){
    return {
        templateUrl: 'public/app/views/single/commentsuccess.html',
        restrict: 'E'
    }
});
