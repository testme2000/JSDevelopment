(function(){
    angular.module('app').factory('bookResource',['$resource', BookResource]);
    
    function BookResource($resource) {
        
        return $resource('/api/books/:book_id',{book_id:'@book_id'},
                            {
                                'update': {method:'PUT'}
                            }
                        );
    }
}());