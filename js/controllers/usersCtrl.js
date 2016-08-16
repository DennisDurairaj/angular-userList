(function () {
    angular.module("usersApp")
        .controller("usersCtrl", ["$scope", "$http", "dataService", function ($scope, $http, dataService) {
            var self = this;
            self.name = "";
            self.email = "";
            self.formDisplayToggle = false;
            self.alertExists = false;
            self.alertLimit = false;
            self.successfulAdd = false;
            self.resetDisplay = false;
            self.namePattern = /^([a-zA-Z ]){1,}$/;
            self.emailPattern = /^([a-zA-Z0-9])+([a-zA-Z0-9._%+-])+@([a-zA-Z0-9_.-])+\.(([a-zA-Z]){2,6})$/;
            self.newUser = {};
            dataService.getUsersData().then(function (response) {
                self.users = response.data;
                console.log(self.users);
            });

            self.showForm = function () {
                self.formDisplayToggle = true;
                self.successfulAdd = false;
            };

            self.resetField = function () {
                if (self.name != "" || self.email != "") {
                    self.resetDisplay = true;
                } else if (self.name == "" && self.email == "") {
                    self.resetDisplay = false;
                }
            }

            //            self.disableButton = function () {
            //                if (self.numberOfUsers >= 10) {
            //                    self.btnDisable = true;
            //                }
            //            }
            //            
            //            self.addUser = function (self.name, self.email) {
            //                
            //            }

            self.submitForm = function (isValid) {
                self.submitted = true;

                if (isValid && self.namePattern.test(self.name)) {
                    if (self.users.length >= 10) {
                        self.alertLimit = true;
                        return 0;
                    }
                    
                    if (self.users.length != 0) {
                        for (var i = 0; i < self.users.length; i++) {
                            if (self.name == self.users[i].name || self.email == self.users[i].email) {
                                self.alertExists = true;
                                return 0;
                            }
                        }
                    }
                    self.newUser = {
                        "name": self.name,
                        "email": self.email
                        }
                        self.users.unshift(self.newUser);
                    console.log(self.newUser);
                    self.resetForm();
                    self.successfulAdd = true;
                }
            }
            
            self.deleteRow = function(userKey) {
                self.users.splice(userKey, 1);
                console.log(self.users.length);
                self.alertExists = false;
                self.alertLimit = false;
                self.successfulAdd = false;
            }

            self.resetForm = function () {
                self.name = "";
                self.email = "";
                self.formDisplayToggle = false;
                self.alertExists = false;
                self.alertLimit = false;
                self.successfulAdd = false;
                self.resetDisplay = false;
                self.submitted = false;
            }

        }]);
})();
