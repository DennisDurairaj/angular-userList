(function () {
    angular.module("usersApp")
        .factory("dataService", ["$http", function ($http) {
            return {
                getUsersData: function () {
                    return $http.get("../../users.json");
                }
            }
        }]);
})();