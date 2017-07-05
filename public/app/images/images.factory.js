angular.module('app.factory.images', [])


.factory('serviceHttp', ['$http', function($http){
    var factory = {
        getImages: function(resultsLength){
            var data = $http({
                method : 'GET',
                url : '/images',
                params : {limit : 6, offset : resultsLength}
            })
            .then(function(result){
                return result.data.file;
            }).catch(function(err){
                alert("Error: No data returned");
            })

            return data;
        },
    };

    return factory;
}]);
