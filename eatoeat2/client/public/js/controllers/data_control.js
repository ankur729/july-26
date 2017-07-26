app.controller('MainCtrl', ['$scope', '$http', '$location', '$cookieStore', '$route', function ($scope, $http, $location, $cookieStore, $route) {
    $(document).ready(function () {
        $(".preloader").delay(500).fadeOut(800);
    });
    // $scope.ask_user_type_show = false;
    // $scope.ask_user_type = function () {
    //     console.log('ASKING USER TYPE')
    //     console.log($scope.ask_user_type_show);
    //     $cookieStore.put('before_login_page', $location.path());
    //     $scope.ask_user_type_show = !$scope.ask_user_type_show;
    //     console.log($scope.ask_user_type_show);
    // }

    // $scope.$on('$viewContentLoaded', function(){
    //     $scope.msg= $route.current.templateUrl + ' is loaded !!';
    //     console.log('HEY CONTENT IS LOADED');
    //   });

    //  $scope.stylesheets = [
    //       {href: '../../css/reset.css', type:'text/css'},
    //       {href: '../../css/style.css', type:'text/css'},
    //       {href: '../../pages/admin/css/reset.css', type:'text/css'},
    //       {href: '../../pages/admin/css/style.css', type:'text/css'},
    //       {href: '../../pages/admin/css/media.css', type:'text/css'},
    //       {href: '../../pages/admin/fonts/font-awesome/css/font-awesome.min.css', type:'text/css'},


    //     ];

    // $scope.scripts = [

    //   {href: '../../pages/admin/js/fm.parallaxator.jquery.js', type:'text/javascript'},
    //   {href: '../../pages/admin/js/global.js', type:'text/javascript'},
    //   {href: '../../pages/admin/js/min.js', type:'text/javascript'},


    // ];



}]);


app.controller('location_controller', ['$scope', '$http', '$cookieStore', '$location', '$timeout', '$rootScope', 'cfpLoadingBar', '$localStorage', '$route', 'blockUI', function ($scope, $http, $cookieStore, $location, $timeout, $rootScope, cfpLoadingBar, $localStorage, $route, blockUI) {
    cfpLoadingBar.start();

    $rootScope.cart_view_stat = false;
    // $('#autocomplete').change(function () {
    //     alert('hello');
    // });

    $scope.GetAddress = function () {

        var tt = "";
        $scope.locate_val = "Test Me";

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(function (p) {
                LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
                var mapOptions = {
                    center: LatLng,
                    zoom: 13,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                GetAddress(p.coords.latitude, p.coords.longitude, LatLng);

                blockUI.start('Displying Location');




                $timeout(function () {
                    blockUI.message('Please Wait...');
                }, 1000);

                $timeout(function () {
                    blockUI.message('Almost there ...');
                }, 2000);
                $timeout(function () {
                    blockUI.stop();
                }, 3000);

                console.log(p.coords.latitude);
                console.log(p.coords.longitude);
                $scope.u = {};
                $scope.u.lat = p.coords.latitude;
                $scope.u.long = p.coords.longitude;

                $cookieStore.put('user_lat_long', $scope.u);

            });
        } else {
            alert('Geo Location feature is not supported in this browser.');

        }

        function GetAddress(lat, lng, add) {

            var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': add }, function (results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {

                        // results[0].address_components[1].short_name+','+

                        tt = results[0].address_components[2].short_name;
                        //	console.log(results[0].address_components[1].short_name+','+results[0].address_components[2].long_name);
                        $("#location").text(tt);
                        $("#autocomplete").val(results[1].formatted_address);
                        $.cookie('eatoeato.loc', results[0].address_components[2].long_name);
                        $localStorage.user_loc_name = results[0].address_components[2].long_name;
                        //  $.cookie('user_lat_lon', results);


                        setTimeout(
                            function () {
                                window.location.href = '#/listing';
                            }, 2000);

                        console.log(tt);
                    }
                }
            });
        }



    }



    $rootScope.loc = "";
    $scope.selected_location = function () {
        //       console.log($.cookie('eatoeato.loc'));
        console.log($.cookie('eatoeato.loc'));
        var loc = $.cookie('eatoeato.loc');
        blockUI.start('Please Wait..');
        $timeout(function () {
            blockUI.message('Displaying Foods in ' + loc + '...');
        }, 1000);


        $timeout(function () {
            blockUI.stop();
        }, 4000);
        // var loc='';
        // console.log('THIS IS LOC');
        // console.log(loc);
        // if (loc == '') {
        //     console.log('Location is null');
        // }
        // else {
        var geocoder = new google.maps.Geocoder();
        var address = $.cookie('eatoeato.loc');




        $timeout(function () {
            var formatted_address = $.cookie('formatted_addr');
            console.log(formatted_address);

            geocoder.geocode({ 'address': formatted_address }, function (results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();

                    // console.log('THIS IS FORMATTED ONE ');
                    //  console.log(results[0]);
                    $localStorage.user_loc_name = results[0].address_components[0].long_name;
                    $scope.u = {};
                    $scope.u.lat = latitude;
                    $scope.u.long = longitude;

                    $cookieStore.put('user_lat_long', $scope.u);
                    console.log('this is USER');
                    window.location.href = '#/listing';
                    //       //  console.log(results[0] );
                    //          $timeout(function () {


                    // }, 3000);

                }
            });

        }, 3000);

        //     }




    }


    $scope.home_banner_insert = {};
    $scope.fetch_home_banner = function () {

        $http({
            method: "GET",
            url: "admin/fetch-home-banner",

        }).then(function mySucces(response) {

            // console.log('THIS IS LOGGED IN USER');
            // $scope.user_details = response.data;
            console.log('THIS IS HOME BANNER');
            $scope.home_banner_insert = response.data[0];
            console.log($scope.home_banner_insert);
        }, function myError(response) {

        });

    }

    $scope.global_setting_detail_view = {};

    $scope.get_home_page_detail = function () {
        $scope.global_setting_detail_view = $cookieStore.get('global_info');
        if ($scope.cart_total_item == '') {

            $scope.cart_total_item = 0;
        }


    }

}]);
app.controller('home_controller', ['$scope', '$http', '$rootScope', '$cookieStore', 'cfpLoadingBar', '$sce', '$localStorage', '$location', '$route', function ($scope, $http, $rootScope, $cookieStore, cfpLoadingBar, $sce, $localStorage, $location, $route) {
    //  cfpLoadingBar.start();

    $rootScope.stylesheets = "";   //load according to page rendering ..

    // $rootScope.stylesheets = [
    //     { href: '../../public/css/reset.css', type: 'text/css' },
    //     { href: '../../public/css/style.css', type: 'text/css' },

    // ];


    //DATA FOR FOOTER LINKS

    $scope.social_footer_link = {};
    $scope.footer_link = {};
    $scope.footer_link_quick_links;

    $scope.footer_link_privay;
    $scope.fetch_footer_detail = function () {


        $http({
            method: "GET",
            url: "admin/fetch-footer-details",

        }).then(function mySucces(response) {


            $scope.social_footer_link = response.data[0];
            $scope.footer_link_quick_links;

            var quick_links = [];
            var policy_info = [];

            for (var i = 0; i < response.data[1].length; i++) {

                if (response.data[1][i].info_tag == "quick_links") {
                    quick_links.push(response.data[1][i]);
                }
                else if (response.data[1][i].info_tag == "policy_info") {
                    policy_info.push(response.data[1][i]);
                }

            }
            $scope.footer_link_quick_links = quick_links;
            $scope.footer_link_privay = policy_info;

            console.log(policy_info);
        }, function myError(response) {

        });
    };

    $scope.global_setting_detail_view = {};

    $scope.fetch_global_settings = function () {

        $http({
            method: "GET",
            url: "admin/fetch-global-settings",

        }).then(function mySucces(response) {


            console.log('THIS IS GLOBAL SETTINGS 2');
            $cookieStore.put('global_info', response.data[0]);
            console.log(response);

            $scope.global_setting_detail_view = $cookieStore.get('global_info');
            $scope.get_home_page_detail2(response.data[0]);
        }, function myError(response) {

        });

    }

    $scope.get_home_page_detail2 = function (value) {

        $scope.home_page_data_view = value;

    }


    $scope.save_info_temp = function (val, footer_name) {

        console.log('FOOTER TEMp');
        console.log(footer_name)
        $localStorage.footer_data = val;
        $location.path('/information-detail/' + footer_name);
        //$cookieStore.put('footer_temp', val);
        console.log($localStorage.footer_data);

        // $scope.get_footer_info();
        var url = $(this).attr('/information-detail');

    }

    $scope.footer_page = {};
    $scope.get_footer_info = function () {

        //   $location.path('/information-detail');

        // window.open('#/information-detail', '_blank');
        // console.log('FINAL DATA');
        // console.log($localStorage.footer_data);
        $scope.u = {};
        $scope.u.info_id = $localStorage.footer_data._id;


        $http({
            method: "POST",
            url: "admin/get-footer-details",
            data: $scope.u
        }).then(function mySucces(response) {

            console.log('THIS IS FOOTER DATA');

            for (var i = 0; i < response.data[0].info_pages.length; i++) {

                if (response.data[0].info_pages[i]._id == $scope.u.info_id) {

                    console.log('FFFFFFFFFFFF FOUND');
                    $scope.footer_page = response.data[0].info_pages[i];
                    console.log(response.data[0].info_pages[i]);

                }
            }

            //$scope.user_details = response.data;
            console.log(response);
        }, function myError(response) {

        });



        // if ($localStorage.footer_data != '' || $localStorage.footer_data != undefined) {

        //     var page = $localStorage.footer_data

        // }

        // console.log(page);
        // $scope.footer_page = page;
        //  //   $window.location.reload();

        //      $scope.toTrustedHTML($localStorage.footer_data.info_desc);
        // console.log('FINAL INFORMATION PAGE');
        // console.log($localStorage.footer_data);
        //  

        //    $route.reload();
    }
    $scope.toTrustedHTML = function (html) {


        return $sce.trustAsHtml(html);

    }
    // $scope.global_setting_detail_view = {};

    // $scope.get_home_page_detail = function () {
    //     $scope.global_setting_detail_view = $cookieStore.get('global_info');

    // }



}]);

//THIS CONTROLLER IS FOR RIGHT MENU --to check if user is logged in or not

app.controller('right_menu_controller', ['$scope', '$http', '$cookieStore', '$location', '$localStorage', '$route', function ($scope, $http, $cookieStore, $location, $localStorage, $route) {



    $scope.login_button_show = false;
    $scope.logout_button_show = false;
    $scope.menu_bars_show = false;

    $scope.right_menu_show = false;
    $scope.login_logout_button_check = function () {


        if ($cookieStore.get('s3cr3t_user') == undefined && $cookieStore.get('cook_logged_in') == undefined) {


            $scope.login_button_show = true;
            $scope.logout_button_show = false;
            $scope.right_menu_show = false;
            console.log('THIS IS SECRET USER 23');
        }


        if ($cookieStore.get('s3cr3t_user') != undefined) {
            $scope.login_button_show = false;
            $scope.logout_button_show = true;
            $scope.right_menu_show = true;
            console.log('THIS IS SECRET USER 22');
            console.log($localStorage.username);
            $scope.aa = $localStorage.username;
            $scope.menu_bars_show = true;
        }
        if ($cookieStore.get('cook_logged_in') != undefined) {
            $scope.login_button_show = false;
            $scope.logout_button_show = true;

        }
    }

    $scope.logged_in_user_check_for_dashboard = function () {

        //console.log($cookieStore.get('s3cr3t_user'));
        if ($cookieStore.get('s3cr3t_user') == undefined) {
            $scope.when_location_selected = true;
        }
        else if ($cookieStore.get('s3cr3t_user') != undefined) {

            $scope.when_location_selected = true;

        }
    }

    $scope.user_details = {};
    $scope.get_details_for_logged_in_user_right_menu = function () {


        $scope.user = {};
        $scope.user.user_id = $cookieStore.get('s3cr3t_user')
        $http({
            method: "POST",
            url: "user/get-user-details",
            data: $scope.user
        }).then(function mySucces(response) {

            console.log('THIS IS LOGGED IN USER');
            $scope.user_details = response.data;
            console.log(response.data);
        }, function myError(response) {

        });

    }

    $scope.logout_for_user_cook = function () {

        // if ($cookieStore.get('cook_logged_in') == undefined) {
        //     $location.path('/cook_login');

        // }
        if ($cookieStore.get('s3cr3t_user') != undefined && $cookieStore.get('s3cr3t_user') != "") {

            setTimeout(function () {
                swal({
                    title: "Logout Successfully",
                    text: "All Cached Data Removed..",
                    type: "success",
                    confirmButtonText: "OK"
                },
                    function (isConfirm) {
                        if (isConfirm) {

                            $route.reload();
                            $cookieStore.remove("s3cr3t_user");
                            window.location.href = "#/";

                            $scope.login_button_show = true;
                            $scope.logout_button_show = false;

                        }
                    });
            }, 100);

        }
        else if ($cookieStore.get('cook_logged_in') != undefined && $cookieStore.get('cook_logged_in') != "") {
            setTimeout(function () {
                swal({
                    title: "Logout Successfully",
                    text: "All Cached Data Removed..",
                    type: "success",
                    confirmButtonText: "OK"
                },
                    function (isConfirm) {
                        if (isConfirm) {

                            $cookieStore.remove("cook_logged_in");
                            window.location.href = "#/";

                            $scope.login_button_show = true;
                            $scope.logout_button_show = false;

                        }
                    });
            }, 100);

        }




    };
    $scope.isCookLogin_forSearchHide = true;
    $scope.login_check_for_hide_search_cook = function () {

        if ($cookieStore.get('cook_logged_in') == undefined || $cookieStore.get('cook_logged_in') == "") {


        }

        else {


            $scope.isCookLogin_forSearchHide = false;
        }

    }

    $scope.login_check_for_cook = function () {

        if ($cookieStore.get('cook_logged_in') == undefined || $cookieStore.get('cook_logged_in') == "") {

            $scope.login_button_show = true;
            $scope.logout_button_show = false;
            window.location.href = "#/cook_login";
        }

        else {


            $scope.login_button_show = false;
            $scope.logout_button_show = true;

            console.log('CALLLLED');
            $scope.isCookLogin_forSearchHide = false;
        }

    }



    $scope.view_cart_val = {};
    $scope.manage_cart_total = {};




}]);


app.controller('cook_controller', ['$scope', '$http', '$rootScope', 'cfpLoadingBar', function ($scope, $http, $rootScope, cfpLoadingBar) {
    cfpLoadingBar.start();
    $rootScope.food_details = {};
    $scope.occassions = ['Breakfast', 'Lunch', 'Brunch', 'Dinner'];
    $scope.deliveryRange = ['within 1 km', 'Within 2km'];

    $rootScope.selection_for_occasion = [];
    $rootScope.selection_for_cuisines = [];
    // selected fruits  
    $scope.selection = [];

    // toggle selection for a given fruit by name
    $scope.toggleSelection = function toggleSelection(val) {

        var idx = $scope.selection.indexOf(val);

        // is currently selected
        if (idx > -1) {

            $scope.selection.splice(idx, 1);
            console.log($scope.selection);
        }

        // is newly selected
        else {
            // val.status='true';
            // $scope.selection.push(val);
            var len = $rootScope.selection_for_occasion.length;
            for (var i = 0; i < len; i++) {

                if ($rootScope.selection_for_occasion[i].group_attr == val.group_attr && $rootScope.selection_for_occasion[i].status == 'false') {

                    $rootScope.selection_for_occasion[i].status = 'true';
                }
                else if ($rootScope.selection_for_occasion[i].group_attr == val.group_attr && $rootScope.selection_for_occasion[i].status == 'true') {

                    $rootScope.selection_for_occasion[i].status = 'false';
                }
                else {

                }
            }

            console.log($rootScope.selection_for_occasion);
            $scope.food_details.occassion_list = $rootScope.selection_for_occasion;
        }
    }

    $scope.selection2 = [];

    // toggle selection for a given fruit by name
    $scope.toggleSelection2 = function toggleSelection2(val) {
        var idx = $scope.selection2.indexOf(val);

        // is currently selected
        if (idx > -1) {
            $scope.selection2.splice(idx, 1);
        }

        // is newly selected
        else {

            var len = $rootScope.selection_for_cuisines.length;
            for (var i = 0; i < len; i++) {

                if ($rootScope.selection_for_cuisines[i].category_name == val.category_name && $rootScope.selection_for_cuisines[i].status == 'false') {

                    $rootScope.selection_for_cuisines[i].status = 'true';
                }
                else if ($rootScope.selection_for_cuisines[i].category_name == val.category_name && $rootScope.selection_for_cuisines[i].status == 'true') {

                    $rootScope.selection_for_cuisines[i].status = 'false';
                }
                else {

                }
            }

            console.log($rootScope.selection_for_cuisines);
            $scope.food_details.cuisine_types = $rootScope.selection_for_cuisines;
        }
    }


    $scope.test = function () {

        $http({
            method: "GET",
            url: "foods/food-details"
        }).then(function mySucces(response) {

            console.log(response);
        }, function myError(response) {

        });


    }

    $scope.save = function () {

        $http({
            method: "POST",
            url: "foods/food-details"
        }).then(function mySucces(response) {

            console.log(response);
        }, function myError(response) {

        });


    }


}]);


app.controller('product', ['$scope', '$http', function ($scope, $http) {
    // $http.get('data/products.json').then(function (response) {
    //     $scope.products = response.data;
    // });
}]);


app.controller('user_info', ['$scope', '$http', function ($scope, $http) {

    $scope.user_details = {};



    $scope.add_user_info = function (user_info) {


        $http({
            method: "POST",
            url: "user/add-user-info",
            data: user_info
        }).then(function mySucces(response) {

            console.log(response);
        }, function myError(response) {

        });


    }

}]);

/***************************COOK CONTROLLER********************************************* */

app.controller('cook_register', ['$scope', '$http', '$location', '$cookieStore', '$timeout', '$base64', '$window', '$rootScope', 'cfpLoadingBar', 'Notification', '$localStorage', '$routeParams', 'blockUI', function ($scope, $http, $location, $cookieStore, $timeout, $base64, $window, $rootScope, cfpLoadingBar, Notification, $localStorage, $routeParams, blockUI) {

    cfpLoadingBar.start();



    $scope.cook_login_check_for_cookie = function () {


        if ($cookieStore.get('cook_logged_in') == undefined) {
            $location.path('/cook_login');


        } else if ($cookieStore.get('cook_logged_in') != undefined) {




        }
    }

    $scope.check_if_cook_basic_entered_complete_pending = function () {

        if ($cookieStore.get('basic_entered_complete_pending') == undefined) {

            $location.path('/cook_create');
        } else {
            console.log('cookie found');
            $location.path('/cook_basic_info');
        }
    }



    $scope.logout = function () {

        if ($cookieStore.get('cook_logged_in') == undefined) {
            $location.path('/cook_login');

        } else {
            $cookieStore.remove("cook_logged_in");
            $location.path('/');

        }
    };
    $scope.cook_details = {};

    $scope.cook_success_detail = {};

    $scope.cook_complete_details = {};
    $scope.cook_initial_info = {} //this is used when cook 1 st step registration completed

    $scope.after_success_reg_message = false;

    $scope.after_success_login_message = false;
    $scope.after_failed_login_message = false;
    $scope.already_register_check = false;

    $scope.isDisabled = false; $scope.error_check1 = false;
    $scope.show_company = false;
    $scope.show_basic = true;
    $scope.show_food_section = false;

    $scope.getCookRegisterData = function () {

        if ($cookieStore.get('basic_entered_complete_pending') == undefined) {

            $location.path('/cook_food');
        }
        else if ($cookieStore.get('cook_logged_in') != undefined) {

            $location.path('/cook_food');
        }
        else {
            console.log('cookie found');
            $scope.cook_complete_details = $cookieStore.get('basic_entered_complete_pending');
        }


    }

    $scope.form_section = function () {

        if ($scope.show_basic == true && $scope.show_company == false && $scope.show_food_section == false) {
            $scope.show_basic = false;
            $scope.show_company = true;
            $scope.show_food_section = false;
        }
        else if ($scope.show_basic == false && $scope.show_company == true && $scope.show_food_section == false) {
            $scope.show_basic = false;
            $scope.show_company = false;
            $scope.show_food_section = true;
        }

    }
    $scope.form_section_back_button = function () {

        console.log('back');
        $scope.show_basic == false;
        $scope.show_company == true;
        $scope.show_food_section == false;
        if ($scope.show_basic == true && $scope.show_company == false && $scope.show_food_section == false) {
            $scope.show_basic = false;
            $scope.show_company = true;
            $scope.show_food_section = false;
        }
        else if ($scope.show_basic == false && $scope.show_company == true && $scope.show_food_section == false) {
            $scope.show_basic = true;
            $scope.show_company = false;
            $scope.show_food_section = false;
        }

    }
    $scope.add_cook_details = function (cook_details) {

        $scope.u = {};
        $scope.u.cook_contact_no = cook_details.cook_contact_no;

        $http({
            method: "POST",
            url: "cook/cook-contact-validate",
            data: $scope.u
        }).then(function mySucces(response) {

            console.log(response);
            if (response.data.status == "Not Registered") {

                swal({
                    title: "Information Saved.!",
                    text: "Next..Complete your Profile Detail",
                    type: "success",
                    confirmButtonText: "OK"
                },
                    function (isConfirm) {
                        if (isConfirm) {
                            // $scope.cook_success_detail = response.data[0];

                            $cookieStore.put('cook_basic_info', cook_details);
                            //$location.path('/cook_profile');
                            window.location.href = "#/cook_basic_info";
                        }
                    });

            }
            if (response.data.status == "Registered") {

                swal("Already Registered.!", "Contact No. Already Registered With Us", "error");
            }
        }, function myError(response) {

        });
        console.log(cook_details);






    }

    $scope.fill_temp_cook_data = function () {

        var tmp = {};
        console.log($cookieStore.get('cook_basic_info'));
        tmp = $cookieStore.get('cook_basic_info');
        $scope.cook_complete_details.cook_name = tmp.cook_name;
        $scope.cook_complete_details.cook_email = tmp.cook_email;
        $scope.cook_complete_details.cook_contact = tmp.cook_contact_no;

    }
    $scope.cook_status = false;

    $scope.cook_name_breadcrumb = "";

    $scope.get_breadcrumb_name = function () {

        $scope.cook_name_breadcrumb = $localStorage.cook_name;
        console.log('THIS IS BREADCRUMB DATA');
        console.log($localStorage.cook_name);

    }

    $scope.vv = '';

    $scope.cook_login_check = function (cook_login) {

        //  console.log(cook_login);

        if ($('#login_id').val().length == '') {

            sweetAlert("Error", "Mobile No. Couldn't be blank", "error");

        }
        else if ($('#login_id').val().length > 10) {

            sweetAlert("Error", "Enter Valid Mobile No.", "error");

        }
        else if ($('#login_id').val().length < 10) {

            sweetAlert("Error", "Enter Valid Mobile No.", "error");

        }
        else if ($('#pass').val() == '') {

            sweetAlert("Error", "Password Couldn't Be Blank", "error");

        }
        else if ($('#login_id').val().length != '' && $('#login_id').val().length > 1 && $('#login_id').val().length < 11 && $('#pass').val() != '') {


            $http({
                method: "POST",
                url: "cook/cook_login_check",
                data: cook_login
            }).then(function mySucces(response) {

                console.log('Login Response');
                console.log(response);

                if (response.data.status == "deactivated") {
                    sweetAlert("Account Deactivated", "Your Account Has Been Deactivated", "error");
                }

                if (response.data.status == "invalid") {
                    sweetAlert("Un Authorized", "Check credentials Again.", "error");
                    console.log('unath');

                }

                if (response.data.status == "success") {
                    $localStorage.cook_name = response.data.data[0].cook_name;
                    console.log(response);

                    if (response.data.data[0].isApproved == "Approved") {
                        $scope.vv = "Approved"
                    }
                    if (response.data.data[0].isApproved == "Un Appr") {
                        $scope.vv = "Pending For Approval"
                    }
                    if (response.data.data[0].isApproved == "updated") {
                        $scope.vv = "Pending For Approval"
                    }
                    $localStorage.cook_appr_status = $scope.vv;

                    setTimeout(function () {
                        swal({
                            title: "Credentials Verified !",
                            text: "You Can Access Your Account Panel Now.",
                            type: "success",
                            confirmButtonText: "OK"
                        },
                            function (isConfirm) {
                                if (isConfirm) {
                                    $scope.cook_success_detail = response.data.data[0];
                                    $cookieStore.put('cook_logged_in', response.data.data[0]._id);

                                    //$location.path('/cook_profile');
                                    window.location.href = "#/cook_profile";
                                }
                            });
                    }, 100);

                }


            }, function myError(response) {

                if (response.status == 401) {
                    sweetAlert("Un Authorized", "Check credentials Again.", "error");
                    console.log('unath');
                    // $scope.after_failed_login_message = true;
                    // $timeout(function () {
                    //     $scope.after_failed_login_message = false;

                    // }, 4000);
                }

            });


        }

    }


    $scope.cook_login_check_pressing_enter = function (event, cook_login) {

        console.log(event);

        if (event.which === 13) {

            if ($('#login_id').val().length == '') {

                sweetAlert("Error", "Mobile No. Couldn't be blank", "error");

            }
            else if ($('#login_id').val().length > 10) {

                sweetAlert("Error", "Enter Valid Mobile No.", "error");

            }
            else if ($('#login_id').val().length < 10) {

                sweetAlert("Error", "Enter Valid Mobile No.", "error");

            }
            else if ($('#pass').val() == '') {

                sweetAlert("Error", "Password Couldn't Be Blank", "error");

            }
            else if ($('#login_id').val().length != '' && $('#login_id').val().length > 1 && $('#login_id').val().length < 11 && $('#pass').val() != '') {





                $http({
                    method: "POST",
                    url: "cook/cook_login_check",
                    data: cook_login
                }).then(function mySucces(response) {

                    console.log(response);

                    if (response.data.status == "deactivated") {
                        sweetAlert("Account Deactivated", "Your Account Has Been Deactivated", "error");
                    }

                    if (response.data.status == "invalid") {
                        sweetAlert("Un Authorized", "Check credentials Again.", "error");
                        console.log('unath');

                    }

                    if (response.data.status == "success") {
                        $localStorage.cook_name = response.data.data[0].cook_name;
                        console.log(response);

                        if (response.data.data[0].isApproved == "Approved") {
                            $scope.vv = "Approved"
                        }
                        if (response.data.data[0].isApproved == "Un Appr") {
                            $scope.vv = "Pending For Approval"
                        }
                        if (response.data.data[0].isApproved == "updated") {
                            $scope.vv = "Pending For Approval"
                        }
                        $localStorage.cook_appr_status = $scope.vv;

                        setTimeout(function () {
                            swal({
                                title: "Credentials Verified !",
                                text: "You Can Access Your Account Panel Now.",
                                type: "success",
                                confirmButtonText: "OK"
                            },
                                function (isConfirm) {
                                    if (isConfirm) {
                                        $scope.cook_success_detail = response.data.data[0];
                                        $cookieStore.put('cook_logged_in', response.data.data[0]._id);

                                        //$location.path('/cook_profile');
                                        window.location.href = "#/cook_profile";
                                    }
                                });
                        }, 100);

                    }



                }, function myError(response) {

                });





            }
        }


        // //  console.log(cook_login);

    }


    // Activation status of User

    $scope.check_activation_status = function () {

        console.log('ON LOAD CHECK');
        console.log($localStorage.cook_appr_status);
        console.log($localStorage.is_cook_active);
        $scope.vv = $localStorage.cook_appr_status;
        $scope.is_cook_active = $localStorage.is_cook_active;

        // $scope.u = {};
        // $scope.u.cook_id = $cookieStore.get('cook_logged_in')

        // $http({
        //     method: "POST",
        //     url: "cook/get-cook-activation-status",
        //     data: $scope.u
        // }).then(function mySucces(response) {

        //     console.log('PROFILE STATUS');
        //     $scope.vv = response.data;

        //     if (response.data == "Approved") {
        //         $scope.vv = "Approved"
        //     }
        //     if (response.data == "Un Appr") {
        //         $scope.vv = "Pending For Approval"
        //     }
        //     if (response.data == "updated") {
        //         $scope.vv = "Pending For Approval"
        //     }

        //     console.log(response);

        // }, function myError(response) {



        // });
    }

    // Activation status of User
    $scope.cook_reg_otp = {};
    $scope.cook_profile_complete = function (cook_all_details) {

        $scope.k = {};
        $scope.k.profile_detail = cook_all_details;
        $scope.k.profile_detail.landmark = $("#autocomplete_addr").val();

        var tmp = $cookieStore.get('cook_basic_info');
        $scope.k.basic_detail = tmp;

        // console.log($scope.k);


        if ($('#mobile_no').val().length == 10) {

            console.log('ANKUR');
            // var num = Math.floor(Math.random() * 900000) + 100000;

            $http({
                method: "POST",
                url: "cook/check-cook-complete-profile-info",
                data: $scope.k
            }).then(function mySucces(response) {
                $(".otp-popup").show();

                if (response.data.status == 'valid') {
                    $localStorage.cook_profile_temp = $scope.k;
                    var num = Math.floor(Math.random() * 900000) + 100000;
                    $localStorage.otp_val = num;
                    var to_no = parseInt(cook_all_details.cook_contact);
                    var message = "Your EatoEato OTP Verification Code is " + num;
                    $scope.u = {};
                    $scope.u = "http://smsgate.idigitie.com/http-api.php?username=eatoeato&password=idid@1234&senderid=EATOET&route=1&number=" + to_no + "&message=" + message;

                    console.log(num);
                    console.log(to_no);
                    $http({
                        method: "GET",
                        url: $scope.u

                    }).then(function mySucces(response) {


                        console.log(response);


                    }, function myError(response) {

                        $(".otp-popup").show();
                    });

                    //  }

                }




            }, function myError(response) {

                console.log(response);
                if (response.data.status == 'Email Already Registered') {

                    swal("Error", "Email Already Registered With Us", "error");
                }
                if (response.data.status == 'Contact_No Already Registered') {

                    swal("Error", "Contact No. Already Registered With Us", "error");
                }

            });



        }

        else if ($('#mobile_no').val().length == 0) {


            swal("Error", "Contact Number Couldn't be Blank", "error");
        }
        else {
            swal("Error", "Entered Value is not a Contact Number", "error");
        }





    }
    $scope.verify_cook_otp_complete_profile = function (data) {

        console.log($localStorage.otp_val);

        console.log(data);

        if (!$localStorage.cook_profile_temp.hasOwnProperty('delivery_range')) {

            $localStorage.cook_profile_temp.delivery_range = '';

        }

        
        if ($localStorage.cook_profile_temp.profile_detail.is_gstin == 'false') {

           $localStorage.cook_profile_temp.profile_detail['gstin_no'] = '';

        }

        

        if (parseInt(data.otp) == $localStorage.otp_val) {

            console.log('THIS IS FINAL COOK DAT CHECK');
            console.log($localStorage.cook_profile_temp);
            $(".otp-popup").hide();
            $http({
                method: "POST",
                url: 'cook/add-cook-info',
                data: $localStorage.cook_profile_temp
            }).then(function mySucces(response) {


                console.log(response);

                swal({
                    title: "Thank You.!" + $localStorage.cook_profile_temp.profile_detail.cook_name,
                    text: "Your Details are Pending For Admin Approval \n \n In the mean time you can login and view your details",
                    type: "success",
                    confirmButtonText: "OK"
                },
                    function (isConfirm) {
                        if (isConfirm) {
                            delete $localStorage.cook_profile_temp;
                            delete $localStorage.otp_val;
                            $cookieStore.remove("cook_basic_info");
                            window.location.href = "#/cook_login";
                        }
                    });

                //   
            }, function myError(response) {


            });




        }
        if (data == '') {

            $scope.empty_otp = true;
            $timeout(function () {

                $scope.empty_otp = false;
            }, 2000);

        }
        if (parseInt(data.otp) != $localStorage.otp_val) {

            $scope.incorr_otp = true;
            $timeout(function () {

                $scope.incorr_otp = false;

            }, 2000);
        }

    }

    $scope.resend_cook_complete_profile_otp = function () {

        console.log('resend');

        if ($('#mobile_no').val().length == 10) {

            var num = Math.floor(Math.random() * 900000) + 100000;

            $localStorage.otp_val = num;
            console.log(num);
            var to_no = parseInt($localStorage.cook_profile_temp.profile_detail.cook_contact);
            var message = "Your EatoEato OTP Verification Code is " + num;
            $scope.u = {};
            $scope.u = "http://smsgate.idigitie.com/http-api.php?username=eatoeato&password=idid@1234&senderid=EATOET&route=1&number=" + to_no + "&message=" + message;

            $http({
                method: "GET",
                url: $scope.u

            }).then(function mySucces(response) {


                console.log(response);
                //  $(".otp-popup").show();


            }, function myError(response) {


                $scope.resend_otp = true;
                $timeout(function () {

                    $scope.resend_otp = false;

                }, 5000);
            });

        }

        else if ($('#mobile_no').val().length == 0) {


            swal("Error", "Contact Number Couldn't be Blank", "error");
        }
        else {
            swal("Error", "Entered Value is not a Contact Number", "error");
        }




    }

    $scope.basic_profile_validate = function (data) {

        console.log($('#basic_pincode').val());

        if (data == 'pincode') {

            if ($('#basic_pincode').val() != '') {

                var zip = $('#basic_pincode').val();
                var zipRegex = /^\d{6}$/;
                if (!zipRegex.test(zip)) {

                    console.log('ERROR');
                    swal("Invalid Pincode", "Please Enter 6 Digit Pincode", "error");
                    // trigger error
                }
                else {
                    console.log('Success');
                    // success!
                }
            }

        }

        if (data == 'contact_no') {

            if ($('#basic_contact_no').val() != '') {

                var contact = $('#basic_contact_no').val();

                if (contact.length > 10 || contact.length < 10) {

                    console.log('ERROR');
                    swal("Invalid Contact No.", "Please Enter 10 Digit Contact No.", "error");
                    // trigger error
                }
                else {
                    console.log('Success');
                    // success!
                }
            }

        }
        if (data == 'ifsc') {


            if ($('#basic_ifsc').val() != '') {

                var zip = $('#basic_ifsc').val();
                var zipRegex = /^[A-Za-z]{4}\d{7}$/;
                if (!zipRegex.test(zip)) {

                    console.log('ERROR');
                    swal("Invalid IFSC Code", "Please Enter 11 Digit AlphaNumeric IFSC CODE", "error");
                    // trigger error
                }
                else {
                    console.log('Success');
                    // success!
                }
            }
            console.log('IFSC')
        }



    }

    $scope.selected_location_cook_basic_info = function () {

        console.log('FUNCTION CALLED');
        blockUI.start('Please Wait..');
        $timeout(function () {
            blockUI.message('Fetching Location');
        }, 1000);

        $timeout(function () {
            blockUI.message('Autofilling Data..');
        }, 2000);

        $timeout(function () {
            blockUI.stop();
            var formatted_address = $.cookie('formatted_addr');
            console.log(formatted_address);
            var geocoder = new google.maps.Geocoder();
            var city, state, pin_code, lat, long;
            var is_get_data = false;
            geocoder.geocode({ 'address': formatted_address }, function (results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();

                    // console.log('THIS IS FORMATTED ONE ');
                    //  console.log(results[0]);
                    //   $localStorage.user_loc_name = results[0].address_components[0].long_name;

                    $scope.u = {};
                    $scope.u.lat = latitude;
                    $scope.u.long = longitude;

                    $cookieStore.put('user_lat_long', $scope.u);

                    console.log('this is USER');
                    console.log(results);
                    lat = latitude;
                    long = longitude;
                    for (var i = 0; i < results[0].address_components.length; i++) {

                        for (var j = 0; j < results[0].address_components[i].types.length; j++) {

                            if (results[0].address_components[i].types[j] == "administrative_area_level_1") {

                                city = results[0].address_components[i].long_name;
                            }

                            if (results[0].address_components[i].types[j] == "locality") {

                                state = results[0].address_components[i].long_name;
                            }
                            if (results[0].address_components[i].types[j] == "postal_code") {

                                pin_code = results[0].address_components[i].long_name;
                                is_get_data = true;
                            }
                        }
                    }

                    console.log(city);
                    console.log(state);
                    console.log(pin_code);

                    //$scope.cook_complete_details.city=city;
                    //   $scope.get_foods_for_listing();
                    //   window.location.href = '#/listing';
                    //       //  console.log(results[0] );
                    //          $timeout(function () {


                    // }, 3000);

                }
            });

            //    if (is_get_data == true) {
            $timeout(function () {
                $scope.cook_complete_details.city = city;
                $scope.cook_complete_details.state = state;
                $scope.cook_complete_details.pincode = pin_code;
                $scope.cook_complete_details.latitude = lat;
                $scope.cook_complete_details.longitude = long;

            }, 800);


            //         }


        }, 2000);




    }

    $scope.selected_location_cook_profile_update = function () {

        console.log('FUNCTION CALLED');
        blockUI.start('Please Wait..');
        $timeout(function () {
            blockUI.message('Fetching Location');
        }, 1000);

        $timeout(function () {
            blockUI.message('Autofilling Data..');
        }, 2000);

        $timeout(function () {
            blockUI.stop();
            var formatted_address = $.cookie('formatted_addr');
            console.log(formatted_address);
            var geocoder = new google.maps.Geocoder();
            var city, state, pin_code, lat, long;
            var is_get_data = false;
            geocoder.geocode({ 'address': formatted_address }, function (results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();

                    // console.log('THIS IS FORMATTED ONE ');
                    //  console.log(results[0]);
                    //   $localStorage.user_loc_name = results[0].address_components[0].long_name;

                    $scope.u = {};
                    $scope.u.lat = latitude;
                    $scope.u.long = longitude;

                    $cookieStore.put('user_lat_long', $scope.u);

                    console.log('this is USER');
                    console.log(results);
                    lat = latitude;
                    long = longitude;
                    for (var i = 0; i < results[0].address_components.length; i++) {

                        for (var j = 0; j < results[0].address_components[i].types.length; j++) {

                            if (results[0].address_components[i].types[j] == "administrative_area_level_1") {

                                city = results[0].address_components[i].long_name;
                            }

                            if (results[0].address_components[i].types[j] == "locality") {

                                state = results[0].address_components[i].long_name;
                            }
                            if (results[0].address_components[i].types[j] == "postal_code") {

                                pin_code = results[0].address_components[i].long_name;
                                is_get_data = true;
                            }
                        }
                    }

                    console.log(city);
                    console.log(state);
                    console.log(pin_code);

                    //$scope.cook_complete_details.city=city;
                    //   $scope.get_foods_for_listing();
                    //   window.location.href = '#/listing';
                    //       //  console.log(results[0] );
                    //          $timeout(function () {


                    // }, 3000);

                }
            });

            //    if (is_get_data == true) {
            $timeout(function () {
                $scope.cook_data_for_view.city = city;
                $scope.cook_data_for_view.state = state;
                $scope.cook_data_for_view.pincode = pin_code;
                $scope.cook_data_for_view.cook_latitude = lat;
                $scope.cook_data_for_view.cook_longitude = long;

            }, 1000);


            //         }


        }, 3000);




    }




    $scope.cook_password_update_detail = {};
    $scope.after_success_pass_update = false;
    $scope.after_failed_pass_update = false;


    $scope.cook_password_update = function (pass_update_detail) {


        $scope.u = pass_update_detail;
        $scope.cook_password_update_detail = "";
        $scope.u.cook_id = $cookieStore.get('cook_logged_in');
        console.log($scope.u);

        $http({
            method: "POST",
            url: "cook/cook-pass-update-dashboard",
            data: pass_update_detail
        }).then(function mySucces(response) {


            $scope.after_success_pass_update = true;
            $timeout(function () {

                $scope.after_success_pass_update = false;

            }, 3000);

        }, function myError(response) {


            $scope.after_failed_pass_update = true;
            $timeout(function () {

                $scope.after_failed_pass_update = false;

            }, 3000);
        });

    }

    $scope.cook_acount_deactivate_details = {};
    $scope.after_success_account_deactivate = false;
    $scope.after_failed_account_deactivate = false;

    $scope.deactivate_cook = function (cook_deactivate_detail) {

        $scope.u = $scope.cook_acount_deactivate_details;
        $scope.u.cook_id = $cookieStore.get('cook_logged_in');
        //  $scope.manage_account_update_user="";
        console.log($scope.u);
        $http({
            method: "POST",
            url: "cook/cook-account-deactivate",
            data: $scope.u
        }).then(function mySucces(response) {
            console.log(response);

            if (response.data.status == 'success') {

                swal("Deactivate Successfull !", "Your Account Has Been Deactivated ", "success");
                $cookieStore.remove("cook_logged_in");
                $location.path('/cook_login');

            }
            if (response.data.status == 'invalid contact') {

                swal("Inavlid Contact !", "Please Enter Correct Contact No.", "error");

            }
            if (response.data.status == 'invalid password') {

                swal("Invalid Password !", "Please Enter Correct Password", "error");

            }

            // $scope.cook_acount_deactivate_details = "";

            // $scope.after_success_account_deactivate = true;
            // $timeout(function () {

            //     $scope.after_success_account_deactivate = false;
            //     $cookieStore.remove("cook_logged_in");
            //     $location.path('/');
            // }, 5000);

        }, function myError(response) {
            console.log(response);
            // $scope.after_failed_account_deactivate = true;
            // $timeout(function () {

            //     $scope.after_failed_account_deactivate = false;

            // }, 3000);

        });


    }


    $scope.after_success_profile_update = false;

    // $scope.show_cook_profile_panel='true';
    // $scope.show_cook_profile_panel2='false';


    // $scope.cook_profile_update_show1=function(){
    //      console.log('THIS IS @1');


    //        $scope.show_cook_profile_panel='false';
    //           $scope.show_cook_profile_panel2='true';

    // }

    //  $scope.cook_profile_update_show2=function(){
    //      console.log('THIS IS @2');
    //      $scope.show_cook_profile_panel=true;
    //       $scope.show_cook_profile_panel2=false;
    // }

    $scope.cook_profile_update = function (cook_time_data) {

        $scope.u = {};
        $scope.u = cook_time_data;
        $scope.u.landmark = $("#autocomplete_addr").val();
        //   console.log($scope.u.available_hours);
        // if ($scope.u.available_hours == undefined) {

        //     console.log('EMPTY TIMES');
        //     swal("Time Select", "Please Select Atleast one Avaliablity", "error");

        // }
        // else {

        //     if (!$scope.u.available_hours.hasOwnProperty('mon_from')) {

        //         $scope.u.available_hours.mon_from = '';
        //         $scope.u.available_hours.mon_to = '';
        //     }
        //     if (!$scope.u.available_hours.hasOwnProperty('tue_from')) {

        //         $scope.u.available_hours.tue_from = '';
        //         $scope.u.available_hours.tue_to = '';
        //     }
        //     if (!$scope.u.available_hours.hasOwnProperty('tue_from')) {

        //         $scope.u.available_hours.tue_from = '';
        //         $scope.u.available_hours.tue_to = '';
        //     }
        //     if (!$scope.u.available_hours.hasOwnProperty('tue_from')) {

        //         $scope.u.available_hours.tue_from = '';
        //         $scope.u.available_hours.tue_to = '';
        //     }
        //     if (!$scope.u.available_hours.hasOwnProperty('wed_from')) {

        //         $scope.u.available_hours.wed_from = '';
        //         $scope.u.available_hours.wed_to = '';
        //     }
        //     if (!$scope.u.available_hours.hasOwnProperty('thu_from')) {

        //         $scope.u.available_hours.thu_from = '';
        //         $scope.u.available_hours.thu_to = '';
        //     }
        //     if (!$scope.u.available_hours.hasOwnProperty('fri_from')) {

        //         $scope.u.available_hours.fri_from = '';
        //         $scope.u.available_hours.fri_to = '';
        //     }
        //     if (!$scope.u.available_hours.hasOwnProperty('sat_from')) {

        //         $scope.u.available_hours.sat_from = '';
        //         $scope.u.available_hours.sat_to = '';
        //     }
        //     if (!$scope.u.available_hours.hasOwnProperty('sun_from')) {

        //         $scope.u.available_hours.sun_from = '';
        //         $scope.u.available_hours.sun_to = '';
        //     }


        $scope.u.cook_id = $cookieStore.get('cook_logged_in');
        console.log($scope.u);

        $scope.cook_profile_update_data = "";

        if ($scope.u.hasOwnProperty('activation_stat')) {

            if ($localStorage.cook_appr_status == 'new') {

                if ($scope.u.activation_stat == 'Active') {

                    swal("ERROR", "You Can Set Your Status To Active", "error");
                }

            }
            else {

                swal({
                    title: "Are you sure?",
                    text: "You Are Going To Update Your Profile Details !",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, Go Ahead !",
                    cancelButtonText: "No, cancel plz!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                    function (isConfirm) {
                        if (isConfirm) {


                            $http({
                                method: "POST",
                                url: "cook/cook-profile-update",
                                data: $scope.u
                            }).then(function mySucces(response) {

                                swal("Updated !", "Your Details Have Been Updated :)", "success");

                            }, function myError(response) {


                            });


                        } else {
                            swal("Cancelled", "Your cancelled to Update Profile Details :)", "error");
                        }
                    });
            }

        }
        else {

            swal({
                title: "Are you sure?",
                text: "You Are Going To Update Your Profile Details !",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Go Ahead !",
                cancelButtonText: "No, cancel plz!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
                function (isConfirm) {
                    if (isConfirm) {


                        $http({
                            method: "POST",
                            url: "cook/cook-profile-update",
                            data: $scope.u
                        }).then(function mySucces(response) {

                            swal("Updated !", "Your Details Have Been Updated :)", "success");

                        }, function myError(response) {


                        });


                    } else {
                        swal("Cancelled", "Your cancelled to Update Profile Details :)", "error");
                    }
                });

        }





        //   }



    }

    //VERIFY EMAIL

    $scope.verify_email_cook = function (cook_id, email) {

        console.log(cook_id);
        console.log(email)
        // $scope.u = {};
        $scope.u.email = email;
        $scope.u.cook_id = cook_id;
        $http({
            method: "POST",
            url: "cook/send-verify-email-to-cook",
            data: $scope.u
        }).then(function mySucces(response) {

            swal("Email Sent", "Please Check Your Email To Verify...", "success");
            console.log(response);
        }, function myError(response) {

            console.log(response);
        });
    }


    $scope.verify_cook_params = function () {

        //    console.log('this is ID--'+$routeParams.user_id);
        console.log('THIS IS COOK PARAMS');
        // console.log($routeParams.user_id);
        $http({
            method: "GET",
            url: "cook/cook-verify/" + $routeParams.cook_id + "/" + $routeParams.email

        }).then(function mySucces(response) {

            swal("Email Verified", "Your Email Succeffully Verified", "success");
            $cookieStore.put('cook_logged_in', response.data._id);

            $location.path('/cook_profile');

        }, function myError(response) {

            console.log(response);
        });

    }

    //VERIFY EMAIL

    $scope.cook_data_for_view = {};
    $scope.is_cook_active = "";
    $scope.get_cook_profile_data = function () {

        $scope.u = {};

        $scope.u.cook_id = $cookieStore.get('cook_logged_in');

        $http({
            method: "POST",
            url: "cook/get-cook-profile-data",
            data: $scope.u
        }).then(function mySucces(response) {
            $scope.cook_data_for_view = response.data[0];
            console.log($scope.cook_data_for_view);

            $localStorage.cook_appr_status = $scope.cook_data_for_view.isApproved;
            $localStorage.is_cook_active = $scope.cook_data_for_view.status;
            //status
            $scope.vv = 'APPROVED';
            if ($scope.cook_data_for_view.delivery_by == 'Self') {

                $scope.is_del_by_cook_show = true;
            }
            if ($scope.cook_data_for_view.status == 'Active') {

                $scope.cook_data_for_view.activation_stat = 'Active';
                $localStorage.is_cook_active = 'Active';
            }
            if ($scope.cook_data_for_view.status == 'Inactive') {

                $scope.cook_data_for_view.activation_stat = 'Inactive';
                $localStorage.is_cook_active = 'In-Active';
            }



        }, function myError(response) {


        });
    };

    $scope.is_del_by_cook_show = false;

    $scope.choose_del_by_cook = function (val) {

        console.log(val);
        if (val == 'Self') {
            $scope.is_del_by_cook_show = true;

        }
        if (val == 'EatoEato') {

            $scope.is_del_by_cook_show = false;
        }


    }

    $scope.show_gstin_field = false;

    $scope.is_gstin_checked = function (val) {


        console.log(val);
        if (val == 'true') {

            $scope.show_gstin_field = true;
        }

        if (val == 'false') {

            $scope.show_gstin_field = false;

        }

    }

    $scope.is_cook_active_validate = function (val) {

        console.log($scope.vv);
        if (val == 'Active') {

            if ($scope.vv == 'new') {

                swal("Error", "You Can't Activate Until Admin Approve It.   '", "error");

            }

        }
        if (val == 'Inactive') {


        }

    }

    $scope.imageData_cook_prof = "";
    $scope.upload_cook_profile_image = function (files) {

        if (files[0] == undefined) return;
        $scope.fileExt = files[0].name.split(".").pop();

        var f = document.getElementById('file').files[0];


        r = new FileReader();

        r.onloadend = function (e) {

            var data = e.target.result;

            $scope.imageData_cook_prof = $base64.encode(data);

            //console.log($scope.imageData);

            //send your binary data via $http or $resource or do anything else with it


        }

        r.readAsBinaryString(f);

    }

    $scope.imageData_cook_banner = "";
    $scope.upload_cook_banner_image = function (files) {

        if (files[0] == undefined) return;
        $scope.fileExt = files[0].name.split(".").pop();

        var f = document.getElementById('file2').files[0];


        r = new FileReader();

        r.onloadend = function (e) {

            var data = e.target.result;

            $scope.imageData_cook_banner = $base64.encode(data);

            //console.log($scope.imageData);

            //send your binary data via $http or $resource or do anything else with it


        }

        r.readAsBinaryString(f);

    }




    $scope.after_success_company_details = false;

    $scope.update_cook_company_details = function () {

        if ($('#brand_name').val() == '') {

            sweetAlert("Error", "Brand Name Couldn't Be Blank", "error");

        }

        else if ($('#acc_type').val() == '') {

            sweetAlert("Error", "Account Type Couldn't Be Blank", "error");

        }

        else if ($('#name_on_bank_acc').val() == '') {

            sweetAlert("Error", "Name On Bank Account Couldn't Be Blank", "error");

        }

        else if ($('#branch_name').val() == '') {

            sweetAlert("Error", "Branch Name Couldn't Be Blank", "error");

        }

        else if ($('#bank_name').val() == '') {

            sweetAlert("Error", "Bank Name Couldn't Be Blank", "error");

        }
        else if ($('#acc_no').val() == '') {

            sweetAlert("Error", "Account No. Couldn't Be Blank", "error");

        }
        else if ($('#ifsc_code').val() == '') {

            sweetAlert("Error", "IFSC Code Couldn't Be Blank", "error");

        }

        else if ($('#brand_name').val() != '' && $('#acc_type').val() != '' && $('#name_on_bank_acc').val() != '' && $('#branch_name').val() != '' && $('#bank_name').val() != '' && $('#acc_no').val() != '' && $('#ifsc_code').val() != '') {

        //    sweetAlert("Error", "IFSC Code Couldn't Be Blank", "success");
            $scope.cook_data_for_view.cook_id = $cookieStore.get('cook_logged_in');

            $scope.cook_data_for_view.cook_banner_img = $scope.imageData_cook_banner;

           
            if($scope.cook_data_for_view.is_gstin == 'false'){

                $scope.cook_data_for_view.gstin_no='';
            }
             console.log('THIS IS UPDATED COOK');
            console.log($scope.cook_data_for_view);

            $http({
                method: "POST",
                url: "cook/cook-company-details-update",
                data: $scope.cook_data_for_view
            }).then(function mySucces(response) {

                setTimeout(function () {
                    swal({
                        title: "Updated.!",
                        text: "Your Details Have Been Updated.",
                        type: "success",
                        confirmButtonText: "OK"
                    },
                        function (isConfirm) {
                            if (isConfirm) {
                                // $scope.cook_success_detail = response.data[0];
                                $scope.get_cook_profile_data();
                            }
                        });
                }, 100);


            }, function myError(response) {


            });
        }

        //  if (form.brand_name.$invalid) {
        //             // Form is valid!
        //             swal("Brand Name", "Please Check your Brand Name", "error");
        //             is_cook_reg_valid = false;
        //         }
        //         if (form.acc_type.$invalid) {
        //             // Form is valid!
        //             swal("Account Type", "Please Check your Account Type", "error");
        //             is_cook_reg_valid = false;
        //         }
        //         if (form.name_on_bank_acc.$invalid) {
        //             // Form is valid!
        //             swal("Name On Bank Account", "Please Check your Name On Bank Account", "error");
        //             is_cook_reg_valid = false;
        //         }

        //         if (form.branch_name.$invalid) {
        //             // Form is valid!
        //             swal("Branch Name", "Please Check your Branch Name", "error");
        //             is_cook_reg_valid = false;
        //         }

        //         if (form.bank_name.$invalid) {
        //             // Form is valid!
        //             swal("Bank Name", "Please Check your Bank Name", "error");
        //             is_cook_reg_valid = false;
        //         }

        //         if (form.acc_no.$invalid) {
        //             // Form is valid!
        //             swal("Account No", "Please Check your Account No", "error");
        //             is_cook_reg_valid = false;
        //         }
        //         if (form.ifsc_code.$invalid) {
        //             // Form is valid!
        //             swal("IFSC CODE", "Please Check your IFSC CODE", "error");
        //             is_cook_reg_valid = false;
        //         }



    }

    $scope.cuisine_list = {};
    $scope.get_cuisines = function () {

        $http({
            method: "GET",
            url: "cook/get-cuisines-list",

        }).then(function mySucces(response) {

            $scope.cuisine_list = response.data;
            $rootScope.selection_for_cuisines = $scope.cuisine_list;

            console.log(response);

        }, function myError(response) {


        });
    }

    $scope.occ_list = {};
    $scope.veg_list = {};
    $scope.occ_name_val = {};
    $scope.veg_name_val = {};
    $scope.min_date_for_listing = "";
    $scope.get_occassion_and_veg_type = function () {
        var dt1 = new Date().toString();
        var dt2 = dt1.split(' ');
        var dt3 = parseInt(dt2[2]) - 1;
        dt2[2] = dt3.toString();
        var dd = dt2.join(' ');
        $scope.min_date_for_listing = dd;
        $http({
            method: "GET",
            url: "cook/get-occ-veg-list",

        }).then(function mySucces(response) {

            $scope.veg_list = response.data[1].attr_fields;
            $scope.occ_list = response.data[0].attr_fields;
            $scope.occ_name_val = response.data[0].group_name;
            $scope.veg_name_val = response.data[1].group_name;

            $rootScope.selection_for_occasion = $scope.occ_list;


            console.log('ankur');
            console.log(response.data);

        }, function myError(response) {


        });
    }

    $scope.isImage = function (ext) {
        if (ext) {
            return ext == "jpg" || ext == "jpeg" || ext == "gif" || ext == "png"
        }
    }
    $scope.imageData = "";
    $scope.show_image_thumb = false;

    $scope.cook_food_details = {};

    $scope.upload_food_image = function (files) {

        if (files[0] == undefined) return;
        $scope.fileExt = files[0].name.split(".").pop();

        var f = document.getElementById('file').files[0];


        r = new FileReader();

        r.onloadend = function (e) {

            var data = e.target.result;
            $scope.show_image_thumb = true;
            $scope.imageData = $base64.encode(data);

            //   console.log($scope.imageData);

            //send your binary data via $http or $resource or do anything else with it


        }

        r.readAsBinaryString(f);

    }

    var ts = [];
    $scope.choices = [{ id: 'choice1' }];

    $scope.addNewChoice = function () {
        var newItemNo = $scope.choices.length + 1;
        $scope.choices.push({ 'id': 'choice' + newItemNo });
    };

    $scope.removeChoice = function (val) {
        var lastItem = $scope.choices.length - 1;
        $scope.choices.splice(lastItem);
        ts.splice(val, 1);
    };
    $scope.upload_food_multi_img = function (files, index) {


        if (files[0] == undefined) return;
        $scope.fileExt = files[0].name.split(".").pop();

        var f = document.getElementById('file').files[0];

        if (ts.length > 0) {

            if (ts[index] == undefined) {
                ts.push(files[0]);
                console.log(ts);
            }
            if (ts[index] != undefined) {
                ts[index] = files[0];
                console.log(ts);
            }
            // for(var k=0;k<ts.length;k++){

            // }
        }
        else {
            ts.push(files[0]);
            console.log(ts);

        }


        r = new FileReader();

        r.onloadend = function (e) {

            var data = e.target.result;

            //send your binary data via $http or $resource or do anything else with it


        }

        r.readAsBinaryString(f);


        // for (var j = 0; j < ts.length; j++) {

        //     document.getElementById('choice'+j).src = window.URL.createObjectURL(files[j]);
        // }

        //$scope.choices=files;



        // r = new FileReader();

        // r.onloadend = function (e) {

        //     var data = e.target.result;

        //     //send your binary data via $http or $resource or do anything else with it


        // }

        // r.readAsBinaryString(f);
    }
    $scope.upload_food_image2 = function (files) {


        if (files[0] == undefined) return;
        $scope.fileExt = files[0].name.split(".").pop();

        var f = document.getElementById('file2').files[0];


        r = new FileReader();

        r.onloadend = function (e) {

            var data = e.target.result;

            $scope.imageData = $base64.encode(data);

            console.log('IMG LOADED');
            //   console.log($scope.imageData);

            //send your binary data via $http or $resource or do anything else with it


        }

        r.readAsBinaryString(f);


    }


    $scope.after_success_food_add = false;
    $scope.save_food_details = function (save_food_details) {


        //  console.log($scope.imageData);
        console.log(save_food_details);

        console.log($('#check1').val());
        if ($('#check1').is(':checked') == false && $('#check2').is(':checked') == false) {

            sweetAlert("Error", "Please Select Food Type", "error");

        }
        else if ($('#food_name').val() == '') {

            sweetAlert("Error", "Food Name Couldn't Be Blank", "error");

        }
        else if ($scope.imageData == '') {

            sweetAlert("Error", "Please Select Food Image", "error");

        }
        else if ($('#food_desc').val() == '') {

            sweetAlert("Error", "Food Description Couldn't Be Blank", "error");

        }
        else if ($('#food_price').val() == '') {

            sweetAlert("Error", "Food Price Couldn't Be Blank", "error");

        }
        else if ($('#food_qty').val() == '') {

            sweetAlert("Error", "Food Quantity Couldn't Be Blank", "error");

        }
        else if ($('#food_min_order').val() == '') {

            sweetAlert("Error", "Food Min Order Couldn't Be Blank", "error");

        }
        else if ($('#food_max_order').val() == '') {

            sweetAlert("Error", "Food Max Order Couldn't Be Blank", "error");

        }

        else if (!save_food_details.hasOwnProperty('occassion_list')) {

            sweetAlert("Error", "Please Select Atleast One Meal Type", "error");

        }
        else if (!save_food_details.hasOwnProperty('cuisine_types')) {

            sweetAlert("Error", "Please Select Atleast One Cuisine Type", "error");

        }
        else if (!save_food_details.hasOwnProperty('food_type')) {

            sweetAlert("Error", "Please Select Food Type", "error");

        }
        else if ($('#select_dt_from').val() == '') {

            sweetAlert("Error", "Please Select Date From", "error");

        }
        else if ($('#select_dt_to').val() == '') {

            sweetAlert("Error", "Please Select Date To", "error");

        }
        else if ($('#food_name').val() != '' && $scope.imageData != '' && $('#food_desc').val() != '' && $('#food_price').val() != '' && $('#food_qty').val() != '' && $('#food_min_order').val() != '' && $('#food_max_order').val() != '' && save_food_details.hasOwnProperty('occassion_list') && save_food_details.hasOwnProperty('cuisine_types') && save_food_details.hasOwnProperty('food_type') && $('#select_dt_from').val() != '' && $('#select_dt_to').val() != '') {

            blockUI.start($localStorage.cook_name + ' , Hang On For A Second ');

            $('#cook_email').val();

            $timeout(function () {
                $scope.u = save_food_details;
                $scope.u.cook_name = $localStorage.cook_name;


                $scope.u.cook_id = $cookieStore.get('cook_logged_in');

                var final_occ = [];
                var final_cusines = [];

                for (var i = 0; i < $scope.u.occassion_list.length; i++) {


                    if ($scope.u.occassion_list[i].status == "true") {

                        final_occ.push($scope.u.occassion_list[i]);
                    }
                }
                console.log(final_occ);

                for (var j = 0; j < $scope.u.cuisine_types.length; j++) {


                    if ($scope.u.cuisine_types[j].status == "true") {

                        final_cusines.push($scope.u.cuisine_types[j]);
                    }
                }
                $scope.u.occassion_list = final_occ;
                $scope.u.cuisine_types = final_cusines;

                $scope.u.cook_id = $cookieStore.get('cook_logged_in');

                console.log('TESTING FOOD');
                console.log($scope.imageData);
                // console.log($scope.ts_img_data);
                blockUI.stop();
                swal({
                    title: "Are you sure?",
                    text: "You Are Going To Add Food For Listing",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, Go Ahead !",
                    cancelButtonText: "No, cancel plz!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                    function (isConfirm) {
                        if (isConfirm) {

                            console.log('TEST FOOD');

                            console.log($scope.u);

                            swal("Added!", "Your Food Is Pending For Admin Approval", "success");
                            $http({
                                method: "POST",
                                url: "cook/add-food-details",

                                data: {
                                    'food_details': $scope.u,
                                    'files': $scope.imageData,
                                    'cook_id': $scope.u.cook_id
                                }
                            }).then(function mySucces(response) {


                                //   $scope.view_food_details=
                                console.log(response.data.food_details);
                                $rootScope.food_details = "";
                                $scope.imageData = "";
                                $scope.show_image_thumb = false;
                                // $scope.choices = [];
                                // $scope.ts = [];
                                // $scope.selection = [];
                                // $scope.ts_img_data = [];
                                final_occ = [];
                                final_cusines = [];
                                $scope.fetch_food_details();



                            }, function myError(response) {


                            });


                        } else {
                            swal("Cancelled", "Your cancelled to Add Food :)", "error");
                        }
                    });
            }, 6000);
        }
        // else if ($('#pass').val() =='') {

        //     sweetAlert("Error", "Password Couldn't Be Blank", "error");

        // }



    }


    $scope.addNewChoiceFoodDetails = function () {
        var newItemNo = $scope.food_details.food_img.length + 1;
        $scope.food_details.food_img.push({ 'id': 'choice' + newItemNo });
    };

    $scope.removeChoiceFoodDetails = function (val) {
        var lastItem = $scope.food_details.food_img.length - 1;
        $scope.food_details.food_img.splice(lastItem);
        ts.splice(val, 1);
        console.log(ts);
    };

    function inputToURL(inputElement) {
        var file = inputElement.files[0];
        return window.URL.createObjectURL(file);
    }
    $scope.upload_food_multi_img_update = function (files, index, id) {

        //          var preview = document.querySelector('img');
        //   var file    = document.querySelector('input[type=file]').files[0];
        //   var reader  = new FileReader();

        //   reader.addEventListener("load", function () {
        //     preview.src = reader.result;
        //   }, false);

        //   if (file) {
        //     reader.readAsDataURL(file);
        //     console.log(file);
        //   }
        //         console.log(id);
        console.log(index);

        console.log('CHECKING INDEX');
        if (files[0] == undefined) return;
        $scope.fileExt = files[0].name.split(".").pop();

        var f = files[0];

        document.getElementById(id).src = window.URL.createObjectURL(files[0]);

        //   var src = $('#'+id).attr('src').replace($('#'+id).attr('src'), document.getElementById('file').files[0]);
        //     $("#"+id).attr('src', src);
        if (ts.length > 0) {

            if (ts[index] == undefined) {
                ts.push(files[0]);
                console.log(ts);
            }
            if (ts[index] != undefined) {


                ts[index] = files[0];
                console.log(ts);
            }
            // for(var k=0;k<ts.length;k++){

            // }
        }
        else {
            ts.push(files[0]);
            console.log(ts);

        }


        r = new FileReader();

        r.onloadend = function (e) {

            var data = e.target.result;

            //send your binary data via $http or $resource or do anything else with it


        }

        r.readAsBinaryString(f);
    }


    $scope.view_food_details = {};
    $scope.cuisine_list_details = {};


    $scope.fetch_food_details = function () {
        $scope.u = {};
        $scope.u.cook_id = $cookieStore.get('cook_logged_in');


        $http({
            method: "POST",
            url: "cook/get-cook-details",
            data: $scope.u
        }).then(function mySucces(response) {

            $scope.view_food_details = response.data;

            //   $scope.view_food_details=
            console.log($scope.view_food_details);


        }, function myError(response) {


        });

    }




    $scope.food_details_remove = function (food_remove_id) {

        $scope.u = {};
        $scope.u.food_id = food_remove_id;
        $scope.u.cook_id = $cookieStore.get('cook_logged_in');



        swal({
            title: "Are you sure?",
            text: "You Are Going To Delete Food ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Go Ahead !",
            cancelButtonText: "No, cancel plz!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {

                    $http({
                        method: "POST",
                        url: "cook/remove-food-details",
                        data: $scope.u

                    }).then(function mySucces(response) {

                        swal("Deleted !", "Your Food Has Been Deleted :)", "error");
                        $scope.fetch_food_details();


                    }, function myError(response) {


                    });


                } else {
                    swal("Cancelled", "Your cancelled to Delete Food :)", "error");
                }
            });




    }

    $scope.sel_for_oc_update = [];
    $scope.sel_for_cu_update = [];

    function convertImageToDataURI(url, callback, outputFormat) {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function () {
            var canvas = document.createElement('CANVAS'),
                ctx = canvas.getContext('2d'), dataURL;
            canvas.height = this.height;
            canvas.width = this.width;
            ctx.drawImage(this, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            callback(dataURL);
            canvas = null;
        };
        img.src = url;
    }


    $scope.food_details_fetch = function (food_edit_id, foods) {
        // || foods.food_isApproved == "new"
        if (foods.food_isApproved == "Un Appr") {

            swal("Not Editable", "You Can't Edit Food Until Admin Approved it :(", "error");
        }
        if (foods.food_isApproved == "Approved" || foods.food_isApproved == "new") {

            console.log('FOOD IS APPROVED');
            $scope.u = {};
            $scope.u.food_id = food_edit_id;
            $scope.u.cook_id = $cookieStore.get('cook_logged_in');
            console.log(foods);
            $http({
                method: "POST",
                url: "cook/edit-food-details",
                data: $scope.u

            }).then(function mySucces(response) {

                console.log('UPDATED FOOD FETCH');
                console.log(response.data);
                var coll_true_cus = [];
                var coll_true_occ = [];

                for (var m = 0; m < response.data.cuisine_list.length; m++) {

                    if (response.data.cuisine_list[m].status == 'true') {

                        coll_true_cus.push(response.data.cuisine_list[m]);
                    }
                }


                for (var s = 0; s < response.data.occassion_list.length; s++) {

                    if (response.data.occassion_list[s].status == 'true') {

                        coll_true_occ.push(response.data.occassion_list[s]);
                    }
                }


                $scope.food_details = response.data;

                $scope.food_details.cuisine_list = $scope.cuisine_list;  // Initialize updated cuisines
                $scope.food_details.occassion_list = $scope.occ_list;   // Initialize updated meal type

                // $scope.cuisine_list=$scope.get_cuisines();
                $scope.sel_for_oc_update = response.data.occassion_list;
                $scope.sel_for_cu_update = $scope.cuisine_list;
                $scope.update_view_food_show = true;

                //$scope.food_details.cuisine_list[1].status='true';

                for (var i = 0; i < coll_true_cus.length; i++) {

                    for (var j = 0; j < $scope.food_details.cuisine_list.length; j++) {

                        if (coll_true_cus[i].category_name == $scope.food_details.cuisine_list[j].category_name) {


                            $scope.food_details.cuisine_list[j].status = 'true';



                        }
                    }

                }

                for (var i = 0; i < coll_true_occ.length; i++) {

                    for (var j = 0; j < $scope.food_details.occassion_list.length; j++) {

                        if (coll_true_occ[i].group_attr == $scope.food_details.occassion_list[j].group_attr) {


                            $scope.food_details.occassion_list[j].status = 'true';



                        }
                    }

                }
                var st = "";
                // var kk=[];        

                for (var i = 0; i < $scope.food_details.food_img.length; i++) {


                    console.log($scope.food_details.food_img[i].food_img_web);
                    var urlf = $scope.food_details.food_img[i].food_img_web;

                    convertImageToDataURI(urlf, function (base64Decoded) {

                        st = base64Decoded.split(",").pop();
                        ts.push(st);
                        console.log('THIS IS CONVERT IMG');
                        console.log(ts);
                    });
                }


                console.log($scope.ts);





                // console.log( $scope.sel_for_cu_update);
            }, function myError(response) {


            });

        }

    }

    $scope.check_cus = function (cus) {

        console.log('CHECKING CUSINE');
        console.log(cus);
    }

    $scope.toggleSelection_for_occ_update = function toggleSelection(val) {


        var idx = $scope.selection.indexOf(val);

        // is currently selected
        if (idx > -1) {

            $scope.selection.splice(idx, 1);
            console.log($scope.selection);
        }

        // is newly selected
        else {
            // val.status='true';
            // $scope.selection.push(val);
            var len = $scope.sel_for_oc_update.length;
            for (var i = 0; i < len; i++) {

                if ($scope.sel_for_oc_update[i].group_attr == val.group_attr && $scope.sel_for_oc_update[i].status == 'false') {

                    $scope.sel_for_oc_update[i].status = 'true';
                }
                else if ($scope.sel_for_oc_update[i].group_attr == val.group_attr && $scope.sel_for_oc_update[i].status == 'true') {

                    $scope.sel_for_oc_update[i].status = 'false';
                } else {

                }
            }

            console.log($scope.sel_for_oc_update);
            $scope.food_details.occassion_list = $scope.sel_for_oc_update;
        }
    }


    $scope.toggleSelection_for_cus_update = function toggleSelection(val) {

        var idx = $scope.selection.indexOf(val);

        // is currently selected
        if (idx > -1) {

            $scope.selection.splice(idx, 1);
            console.log($scope.selection);
        }

        // is newly selected
        else {
            // val.status='true';
            // $scope.selection.push(val);
            var len = $scope.sel_for_cu_update.length;
            for (var i = 0; i < len; i++) {

                if ($scope.sel_for_cu_update[i].category_name == val.category_name && $scope.sel_for_cu_update[i].status == 'false') {

                    $scope.sel_for_cu_update[i].status = 'true';
                }
                else if ($scope.sel_for_cu_update[i].category_name == val.category_name && $scope.sel_for_cu_update[i].status == 'true') {

                    $scope.sel_for_cu_update[i].status = 'false';
                } else {

                }
            }

            console.log($scope.sel_for_cu_update);
            $scope.food_details.cuisine_list = $scope.sel_for_cu_update;
        }
    }

    $scope.selection = [];

    // toggle selection for a given fruit by name
    $scope.toggleSelection = function toggleSelection(val) {

        var len = $scope.selection.length;
        // console.log(len);
        var n = {
            "group_attr": val.group_attr
        }
        var count = 0;
        var i;
        for (i = 0; i < len; i++) {
            if ($scope.selection[i].group_attr == val.group_attr) {
                count = 1;
                // $scope.selection.splice(i);
                break;
            }

        }
        if (count > 0) {
            $scope.selection.splice(i, 1);
            //   $scope.food_details.occassion_list = $scope.selection;
        }
        else {
            $scope.selection.push(n);
            //   /$scope.food_details.occassion_list = $scope.selection;
        }
        //  
        console.log($scope.selection);

    }

    $scope.selection2 = [];

    // toggle selection for a given fruit by name
    $scope.toggleSelection2 = function toggleSelection2(val) {

        var len = $scope.selection2.length;
        // console.log(len);
        var n = {
            "category_name": val.category_name
        }
        var count = 0;
        var i;
        for (i = 0; i < len; i++) {
            if ($scope.selection2[i].category_name == val.category_name) {
                count = 1;
                // $scope.selection.splice(i);
                break;
            }

        }
        if (count > 0) {
            $scope.selection2.splice(i, 1);
            $scope.food_details.cuisine_list = $scope.selection2;

        }
        else {
            $scope.selection2.push(n);
            $scope.food_details.cuisine_list = $scope.selection2;
        }

        console.log($scope.selection2);



    }

    $scope.insert_checkbox_val = function (oo) {


        $scope.selection.push(oo);
        console.log($scope.selection);
    }
    $scope.insert_checkbox_val2 = function (oo) {


        $scope.selection2.push(oo);
        console.log($scope.selection2);
    }


    $scope.ts_img_data = [];
    $scope.update_food_details = function (food_details) {

        blockUI.start($localStorage.cook_name + ' , Hang On For A Second ');

        // console.log('TEST IMG');
        // console.log($scope.ts);
        // var key = ts.length;
        // var len = 0;



        // for (var i = 0; i < ts.length; i++) {

        //     if (ts[i] == undefined) return;

        //     if (typeof ts[i] === 'string') {

        //         console.log('ALREADY CONVERTED');
        //         $scope.ts_img_data.push(ts[i]);
        //     }
        //     else {

        //         var f = ts[i];
        //         r = new FileReader();

        //         r.onloadend = function (e) {

        //             var data = e.target.result;
        //             $scope.cc = $base64.encode(data);

        //             $scope.ts_img_data.push($scope.cc);


        //             len++;



        //         }

        //         r.readAsBinaryString(f);
        //     }

        // }

        $timeout(function () {
            //  blockUI.message('Compressing Data....');
            blockUI.stop();
            //      console.log($scope.ts_img_data);


            console.log(food_details);
            $scope.u = {};
            $scope.u.update_food_details = food_details;

            var final_occ = [];
            var final_cusines = [];
            console.log('THIS IS UPDATED FOOD');
            //   console.log($scope.u.update_food_details);

            for (var i = 0; i < $scope.u.update_food_details.occassion_list.length; i++) {


                if ($scope.u.update_food_details.occassion_list[i].status == "true") {

                    final_occ.push($scope.u.update_food_details.occassion_list[i]);
                }
            }

            for (var j = 0; j < $scope.u.update_food_details.cuisine_list.length; j++) {


                if ($scope.u.update_food_details.cuisine_list[j].status == "true") {

                    final_cusines.push($scope.u.update_food_details.cuisine_list[j]);
                }
            }

            $scope.u.update_food_details.occassion_list = final_occ;
            $scope.u.update_food_details.cuisine_list = final_cusines;
            $scope.cook_id = $cookieStore.get('cook_logged_in');
            $scope.u.food_id = food_details._id;
            $scope.u.files = $scope.imageData;
            //    console.log('IMAGE CHECK');
            console.log($scope.u.update_food_details);



            swal({
                title: "Are you sure?",
                text: "You Are Going To Update Food For Listing",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Go Ahead !",
                cancelButtonText: "No, cancel plz!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
                function (isConfirm) {
                    if (isConfirm) {
                        swal("Updated", "Your Updated Food is Pending For Admin Approval :)", "success");

                        $http({
                            method: "POST",
                            url: "cook/update-food-details",
                            data: {
                                'food_details': $scope.u.update_food_details,
                                'files': $scope.imageData,
                                'food_id': $scope.u.food_id
                            }

                        }).then(function mySucces(response) {

                            console.log(response);
                            $scope.food_details = "";
                            $scope.u.update_food_details = "";
                            // // $scope.ts = [];
                            // // $scope.img_data = [];
                            $scope.update_view_food_show = false;
                            $scope.fetch_food_details();


                        }, function myError(response) {


                        });

                    } else {
                        swal("Cancelled", "Your cancelled to Update Food :)", "error");
                    }
                });
        }, 3000);



    }

    $scope.update_food_cancel = function () {

        $scope.food_details = "";
        $scope.u.update_food_details = "";
        $scope.ts = [];
        $scope.ts_img_data = [];
        $scope.update_view_food_show = false;


    }

    $scope.check_val_arr = function (v) {

        var len = $scope.check_for_update.occassion_list.length;
        console.log(len);

        for (var i = 0; i < len; i++) {

            if (v == $scope.check_for_update.occassion_list[i].group_attr) {

                return 'true';

            }
            else {

                return 'false';
            }

        }

    }

    $scope.change_order_status_by_cook = function (status, order_id) {

        $scope.u = {};
        $scope.u.status = status;
        $scope.u.order_id = order_id;

        console.log(status);
        console.log(order_id);

        if (status == 'deny') {

            swal({
                title: "Are you sure?",
                text: "You Are Going To Deny Your Order.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Deny it!",
                closeOnConfirm: false
            },
                function () {

                    $http({
                        method: "POST",
                        url: "cook/modify-order-status",
                        data: $scope.u

                    }).then(function mySucces(response) {

                        console.log(response);
                        if (response.data.status == 'confirmed') {

                            swal("Order Confirmed", "Order Has Been Confirmed", "success");
                            //$route.reload();
                            $scope.fetch_cook_order();

                        }

                        if (response.data.status == 'cancelled') {

                            swal("Order Cancelled", "Your Order Has Been Cancelled", "success");
                            $scope.fetch_cook_order();
                            //$route.reload();
                        }


                    }, function myError(response) {


                    });


                    SweetAlert.swal("Denied Successfully");
                });


        }
        else {

            $http({
                method: "POST",
                url: "cook/modify-order-status",
                data: $scope.u

            }).then(function mySucces(response) {

                console.log(response);
                if (response.data.status == 'confirmed') {

                    swal("Order Confirmed", "Order Has Been Confirmed", "success");
                    //$route.reload();
                    $scope.fetch_cook_order();

                }

                if (response.data.status == 'cancelled') {

                    swal("Order Cancelled", "Your Order Has Been Cancelled", "success");
                    $scope.fetch_cook_order();
                    //$route.reload();
                }


            }, function myError(response) {


            });
        }


    }


    $scope.view_cook_order = {};
    $scope.view_cook_order_hold = {};
    $scope.curr_dy = {};
    $scope.cook_id_order_front = {};
    $scope.cook_order_count = {};
    $scope.fetch_cook_order = function (center) {


        $scope.u = {};
        //    var t={};
        //   t.$oid=$cookieStore.get('cook_logged_in');
        $scope.u.cook_id = $cookieStore.get('cook_logged_in');


        //     console.log('THIS IS COOK ORERDER OPEN ID');
        console.log($scope.u);

        $http({
            method: "POST",
            // url: "admin/fetch-cook-orders-by-id",
            url: "admin/fetch-cook-orders-for-front",
            data: $scope.u
        }).then(function mySucces(response) {

            console.log('THIS IS COOK ORDER');
            console.log(response);
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var today = dd + '-' + mm + '-' + yyyy;

            $scope.cook_id_order_front = $cookieStore.get('cook_logged_in');
            $scope.curr_dy = today;
            $scope.view_cook_order = response.data;
            $scope.view_cook_order_hold = response.data;

            var tot = 0;
            for (var i = 0; i < response.data.length; i++) {
                tot = 0;
                for (var j = 0; j < response.data[i].items.length; j++) {

                    tot = response.data[i].items[j].food_total_price + tot;
                    $scope.view_cook_order[i].order_total = tot;

                }

            }

            var open_order = 0;
            var cancelled_order = 0;
            var delivered_order = 0;


            for (var i = 0; i < response.data.length; i++) {

                if (response.data[i].order_status == 'pending' || response.data[i].order_status == 'confirmed' || response.data[i].order_status == 'ready_for_del') {

                    open_order++;
                }
                if (response.data[i].order_status == 'cancelled') {

                    cancelled_order++;
                }
                if (response.data[i].order_status == 'delivered') {

                    delivered_order++;
                }
            }
            $scope.cook_order_count.open_order = open_order;
            $scope.cook_order_count.cancelled_order = cancelled_order;
            $scope.cook_order_count.delivered_order = delivered_order;



            console.log($scope.view_cook_order);
            console.log('ORDER COUNTTTT');
            console.log($scope.cook_order_count);
            // $scope.service_center_detail = response.data.service_center_info[0];

        }, function myError(response) {
            console.log('err');
        });
    }

    $scope.filter_cook_order_by_date = function (data) {


        var incoming_date, date_frm, date_to;

        var temp = data.date.split("-");
        var incoming_date = parseInt(temp[0]);

        var comp_date1, comp_date2;
        var is_found = false;
        var temp_arr = [];
        for (var i = 0; i < $scope.view_cook_order.length; i++) {

            comp_date1 = $scope.view_cook_order[i].date.split("/");
            comp_date2 = parseInt(comp_date1[0]);

            if (comp_date2 == incoming_date) {

                console.log('Found');
                temp_arr.push($scope.view_cook_order[i]);
                is_found = true;
            }
            // if(comp_date2 != incoming_date){

            //     console.log('Not Found');
            // }


        }



        if (is_found == true) {

            $scope.view_cook_order = temp_arr;
            Notification.info({ message: 'Order Found ' + data.date, delay: 1000 });
        }
        if (is_found == false) {

            $scope.view_cook_order = $scope.view_cook_order_hold;
            Notification.warning({ message: 'No Order Found On ' + data.date, delay: 5000 });

        }

    }



    $scope.cancel_order_cook = function (sub_order_id) {

        console.log(sub_order_id);
        $scope.u = {};
        $scope.u.sub_order_id = sub_order_id;
        $http({
            method: "POST",
            url: "admin/cancel-order-status-admin",
            data: $scope.u

        }).then(function mySucces(response) {

            console.log(response);
            $scope.food_details = "";
            $scope.fetch_food_details();
            swal("Cancelled", "Your Order Has Been Cancelled", "success");
            $scope.update_view_food_show = false;

        }, function myError(response) {


        });
    }

    $scope.forget_cook_detail = {};
    $scope.cook_reg_otp = {};
    $scope.forget_cook_password = function (contact_no) {


        $scope.u = {};
        $scope.u.cook_contact_no = contact_no.cook_contact_no;
        console.log('FORGET DATA');
        console.log($scope.u);
        $http({
            method: "POST",
            url: 'cook/cook-contact-validate',
            data: $scope.u

        }).then(function mySucces(response) {


            console.log('FORGET CHECK');
            console.log(response);

            if (response.data.status == "Not Registered") {

                swal("Error", "Contact No. Not Registered With Us", "error");

            }
            if (response.data.status == "Registered") {

                // swal("SUCCES", "Registered With Us", "success");
                $(".otp-popup").show();
                //      if (response.data.status == 'valid') {
                $localStorage.cook_contact_temp = contact_no.cook_contact_no;

                var num = Math.floor(Math.random() * 900000) + 100000;
                $localStorage.otp_val = num;
                var to_no = parseInt($scope.u.cook_contact_no);
                var message = "Your EatoEato OTP Verification Code is " + num;
                $scope.u = {};
                $scope.u = "http://smsgate.idigitie.com/http-api.php?username=eatoeato&password=idid@1234&senderid=EATOET&route=1&number=" + to_no + "&message=" + message;

                console.log(num);
                console.log(to_no);
                $http({
                    method: "GET",
                    url: $scope.u

                }).then(function mySucces(response) {


                    console.log(response);


                }, function myError(response) {

                    $(".otp-popup").show();
                });

                //  }

                //    }

            }
            //   $(".otp-popup").show();

            //     if (response.data.status == 'valid') {
            //         $localStorage.cook_profile_temp = $scope.k;
            //         var num = Math.floor(Math.random() * 900000) + 100000;
            //         $localStorage.otp_val = num;
            //         var to_no = parseInt(cook_all_details.cook_contact);
            //         var message = "Your EatoEato OTP Verification Code is " + num;
            //         $scope.u = {};
            //         $scope.u = "http://smsgate.idigitie.com/http-api.php?username=eatoeato&password=idid@1234&senderid=EATOET&route=1&number=" + to_no + "&message=" + message;

            //         console.log(num);
            //         console.log(to_no);
            //         $http({
            //             method: "GET",
            //             url: $scope.u

            //         }).then(function mySucces(response) {


            //             console.log(response);


            //         }, function myError(response) {

            //             $(".otp-popup").show();
            //         });

            //         //  }

            //     }


            // if (response.data == 'Not Registered') {

            //     swal("Invalid Contact", "Contact No. Not Registered With Us", "error");
            // }
            // else {

            //     console.log('VALID CONTACT');
            //     if ($('#mobile_no').val().length == 10) {

            //         console.log('ANKUR');
            //         var num = Math.floor(Math.random() * 900000) + 100000;

            //         swal({
            //             title: "Verify OTP",
            //             text: "Enter Your 6 Digit Verification Code",
            //             type: "input",
            //             showCancelButton: true,
            //             closeOnConfirm: false,
            //             animation: "slide-from-top",
            //             inputPlaceholder: "Enter OTP"
            //         },
            //             function (inputValue) {
            //                 console.log(parseInt(inputValue));
            //                 console.log(num);
            //                 // if (inputValue === false) return false;

            //                 if (parseInt(inputValue) == num) {

            //                     swal({
            //                         title: "Password Update",
            //                         text: "Please Enter Your New Password",
            //                         type: "input",
            //                         showCancelButton: true,
            //                         closeOnConfirm: false,
            //                         animation: "slide-from-top",
            //                         inputPlaceholder: "Enter Your New Password"
            //                     },
            //                         function (inputValue) {
            //                             console.log(parseInt(inputValue));
            //                             $scope.y = {};
            //                             $scope.y.cook_contact_no = contact_no.cook_contact_no;
            //                             $scope.y.cook_new_pass = inputValue;
            //                             console.log($scope.y);
            //                             $http({
            //                                 method: "POST",
            //                                 url: 'cook/cook-forget-pass-update',
            //                                 data: $scope.y
            //                             }).then(function mySucces(response) {


            //                                 if (response.data == "Password Successfully Updated") {

            //                                     swal("Password Updated", "You Can Login With New Password Now", "success");

            //                                 }
            //                                 else {
            //                                     swal("Error", "Something Bad Happen.. Try Again Later", "error");


            //                                 }


            //                             }, function myError(response) {


            //                             });
            //                             return true;


            //                         });


            //                     return true;
            //                 }
            //                 if (parseInt(inputValue) != num) {
            //                     swal.showInputError("Incorrect OTP.");
            //                     return false;
            //                 }

            //             });
            //         //"http://103.233.76.48/websms/sendsms.aspx?userid=eatoeato&password=123456&sender=EATOET&mobileno=" + to_no + "&msg=" + message;

            //         var to_no = parseInt($scope.u.cook_contact_no);
            //         var message = "Your EatoEato OTP Verification Code is " + num;
            //         $scope.u = {};
            //         $scope.u = "http://smsgate.idigitie.com/http-api.php?username=eatoeato&password=idid@1234&senderid=EATOET&route=1&number=" + to_no + "&message=" + message;

            //         $http({
            //             method: "GET",
            //             url: $scope.u

            //         }).then(function mySucces(response) {


            //             console.log(response);


            //         }, function myError(response) {


            //         });

            //     }

            //     else if ($('#mobile_no').val().length == 0) {


            //         swal("Error", "Contact Number Couldn't be Blank", "error");
            //     }
            //     else {
            //         swal("Error", "Entered Value is not a Contact Number", "error");
            //     }

            // }


        }, function myError(response) {


        });



    }
    $scope.empty_otp = false;
    $scope.incorr_otp = false;

    $scope.verify_cook_otp_forget_pass = function (data) {

        console.log($localStorage.otp_val);

        if (parseInt(data.otp) == $localStorage.otp_val) {


            $(".otp-popup").hide();
            swal({
                title: "Password Update",
                text: "Please Enter Your New Password",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputPlaceholder: "Enter Your New Password"
            },
                function (inputValue) {
                    if (inputValue === false) return false;

                    if (inputValue === "") {
                        swal.showInputError("You need to write something!");
                        return false
                    }

                    else {
                        $scope.y = {};
                        $scope.y.cook_contact_no = $localStorage.cook_contact_temp;
                        $scope.y.cook_new_pass = inputValue;

                        $http({
                            method: "POST",
                            url: 'cook/cook-forget-pass-update',
                            data: $scope.y
                        }).then(function mySucces(response) {

                            console.log(response);


                            if (response.data.status == "Password Successfully Updated") {

                                delete $localStorage.cook_contact_temp;
                                swal("Password Updated", "You Can Login With New Password Now", "success");
                                $location.path('/cook_login')
                            }
                            else {
                                swal("Error", "Something Bad Happen.. Try Again Later", "error");


                            }


                        }, function myError(response) {


                        });
                        return true;
                    }

                });


        }
        if (data == '') {

            $scope.empty_otp = true;
            $timeout(function () {

                $scope.empty_otp = false;
            }, 2000);

        }
        if (parseInt(data.otp) != $localStorage.otp_val) {

            $scope.incorr_otp = true;
            $timeout(function () {

                $scope.incorr_otp = false;

            }, 2000);
        }

    }

    var is_click = false;
    var is_cook_reg_valid = true;

    $scope.cook_temp_reg_data;
    $scope.is_clicked = function (cook_data) {

        is_click = true;
        $scope.cook_temp_reg_data = cook_data;

        console.log($scope.cook_temp_reg_data);


    }

    $scope.cook_register_validate = function (form) {
        console.log(form);
        console.log(form.numberOfInvalids());
        console.log(form.contact.$validate());

        if (is_click == true) {

            is_cook_reg_valid = true;

            if (form.email.$invalid) {
                // Form is valid!
                swal("Invalid Email", "Please Check your Email-id", "error");
                is_cook_reg_valid = false;
            }
            if (form.contact.$invalid) {
                // Form is valid!
                swal("Invalid Contact No.", "Please Check your Contact No.", "error");
                is_cook_reg_valid = false;
            }
            if (form.gender.$invalid) {
                // Form is valid!
                swal("Gender", "Gender Couldn't Be Empty", "error");
                is_cook_reg_valid = false;
            }
            if (form.address.$invalid) {
                // Form is valid!
                swal("Address", "Please Check your Address", "error");
                is_cook_reg_valid = false;
            }
            if (form.landmark.$invalid) {
                // Form is valid!
                swal("Landmark", "Please Check your Landmark", "error");
                is_cook_reg_valid = false;
            }
            if (form.city.$invalid) {
                // Form is valid!
                swal("City", "Please Check your City", "error");
                is_cook_reg_valid = false;
            }
            if (form.state.$invalid) {
                // Form is valid!
                swal("State", "Please Check your State", "error");
                is_cook_reg_valid = false;
            }
            if (form.pincode.$invalid) {
                // Form is valid!
                swal("Pincode", "Please Check your Pincode", "error");
                is_cook_reg_valid = false;
            }
            if (form.latitude.$invalid) {
                // Form is valid!
                swal("Latitude", "Please Check your Latitude", "error");
                is_cook_reg_valid = false;
            }
            if (form.longitude.$invalid) {
                // Form is valid!
                swal("Longitude", "Please Check your Longitude", "error");
                is_cook_reg_valid = false;
            }
            if (form.brand_name.$invalid) {
                // Form is valid!
                swal("Brand Name", "Please Check your Brand Name", "error");
                is_cook_reg_valid = false;
            }
            if (form.acc_type.$invalid) {
                // Form is valid!
                swal("Account Type", "Please Check your Account Type", "error");
                is_cook_reg_valid = false;
            }
            if (form.name_on_bank_acc.$invalid) {
                // Form is valid!
                swal("Name On Bank Account", "Please Check your Name On Bank Account", "error");
                is_cook_reg_valid = false;
            }

            if (form.branch_name.$invalid) {
                // Form is valid!
                swal("Branch Name", "Please Check your Branch Name", "error");
                is_cook_reg_valid = false;
            }

            if (form.bank_name.$invalid) {
                // Form is valid!
                swal("Bank Name", "Please Check your Bank Name", "error");
                is_cook_reg_valid = false;
            }

            if (form.acc_no.$invalid) {
                // Form is valid!
                swal("Account No", "Please Check your Account No", "error");
                is_cook_reg_valid = false;
            }
            if (form.ifsc_code.$invalid) {
                // Form is valid!
                swal("IFSC CODE", "Please Check your IFSC CODE", "error");
                is_cook_reg_valid = false;
            }
         

        }

        if (is_cook_reg_valid == true) {

            $scope.cook_profile_complete($scope.cook_temp_reg_data);
            console.log('ALL VALID');
        }



    }

    var err_style_open = "<span style='font-size:13px;'>";
    var err_style_close = "</span>";

    $scope.validationOptions = {
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6
            },
            contact: {
                required: true,
                minlength: 10,
                maxlength: 10,
                digits: true
            },
            gender: {
                required: true,

            },
            address: {
                required: true,

            },
            landmark: {
                required: true,

            },
            city: {
                required: true,

            },
            state: {
                required: true,

            },
            pincode: {
                required: true,

            },
            latitude: {
                required: true,

            },
            longitude: {
                required: true,

            },
            brand_name: {
                required: true,

            },
            acc_type: {
                required: true,

            },
            name_on_bank_acc: {
                required: true,

            },
            branch_name: {
                required: true,

            },
            bank_name: {
                required: true,

            },
            acc_no: {
                required: true,

            },
            ifsc_code: {
                required: true,

            }


        },
        messages: {
            email: {
                required: err_style_open + "We need your email address to contact you" + err_style_close,
                email: err_style_open + "Your email address must be in the format of name@domain.com" + err_style_close
            },
            password: {
                required: err_style_open + "You must enter a password" + err_style_close,
                minlength: err_style_open + "Your password must have a minimum length of 6 characters" + err_style_close
            },
            contact: {
                required: err_style_open + "You must enter a Contact No." + err_style_close,
                maxlength: err_style_open + "Contact No. must be 10 Digit Only" + err_style_close
            },
            gender: {
                required: err_style_open + "Please Select Your Gender" + err_style_close,

            },
            address: {
                required: err_style_open + "Please Enter Address" + err_style_close,

            }

        }
    }


}]);


/************************************USER CONTROLLER*************************** */

app.controller('user_register', ['$scope', '$http', '$location', '$cookieStore', '$timeout', '$routeParams', '$base64', '$rootScope', 'cfpLoadingBar', 'Notification', '$route', '$localStorage', '$window', 'blockUI', '$crypthmac', function ($scope, $http, $location, $cookieStore, $timeout, $routeParams, $base64, $rootScope, cfpLoadingBar, Notification, $route, $localStorage, $window, blockUI, $crypthmac) {
    cfpLoadingBar.start();
    $scope.auth = function () {

        if ($cookieStore.get('s3cr3t_user') == undefined) {

            $location.path('/');
        } else {
            console.log('cookie found');

        }

    }
    $scope.menu_bars_show = true;


    $scope.get_user_lat_lon_detail = function () {

        $scope.u = {};
        $scope.u = $cookieStore.get('user_lat_long');
        console.log($scope.u);
    }


    $scope.login_check_for_login = function () {


        if ($cookieStore.get('s3cr3t_user') == undefined) {
            $location.path('/user_login');

        } else {
            $location.path('/my_profile_update');
        }
    }
    $scope.login_check_for_signup = function () {


        if ($cookieStore.get('s3cr3t_user') == undefined) {
            $location.path('/user_create');

        } else {
            $location.path('/my_profile_update');

        }
    }
    $scope.logout = function () {

        if ($cookieStore.get('s3cr3t_user') == undefined) {
            $location.path('/cook_login');

        } else {
            $cookieStore.remove("s3cr3t_user");
            $location.path('/');

        }
    };

    $scope.user_footer_show = false;
    $scope.common_footer_show = true;

    $scope.user_footer_panel_show = function () {


        if ($cookieStore.get('s3cr3t_user') != undefined) {

            console.log('WE HAVE TO SHOW FOOTER FOR USER');
            $scope.user_footer_show = true;
            $scope.common_footer_show = false;

        }
        else {

            console.log('NOT REQUIRED TO SHOW FOOTER');
            $scope.user_footer_show = false;
            $scope.common_footer_show = true;
        }

    }

    $scope.user_details = {};
    $scope.user_login = {};

    $scope.after_success_login_message = false;
    $scope.after_failed_login_message = false;
    $scope.already_register_user = false;

    $scope.otp_user_reg_show = true;
    $scope.user_reg_otp = "";

    $scope.add_user_details = function (user_details) {


        if ($('#mobile_no').val().length == 10) {

            var num = Math.floor(Math.random() * 900000) + 100000;

            $localStorage.otp_val = num;
            $localStorage.user_details = user_details;

            var to_no = user_details.user_contact_no;
            var message = "Your EatoEato OTP Verification Code is " + num;
            $scope.u = {};
            $scope.u = "http://smsgate.idigitie.com/http-api.php?username=eatoeato&password=idid@1234&senderid=EATOET&route=1&number=" + to_no + "&message=" + message;

            $http({
                method: "GET",
                url: $scope.u

            }).then(function mySucces(response) {


                console.log(response);
                //  $(".otp-popup").show();


            }, function myError(response) {

                $(".otp-popup").show();
            });

        }

        else if ($('#mobile_no').val().length == 0) {


            swal("Error", "Contact Number Couldn't be Blank", "error");
        }
        else {
            swal("Error", "Entered Value is not a Contact Number", "error");
        }






    }
    $scope.incorr_otp = false;
    $scope.empty_otp = false;
    $scope.verify_user_otp = function (data) {

        console.log(data);
        console.log($localStorage.otp_val);
        if (parseInt(data.otp) == $localStorage.otp_val) {

            console.log('OTP VALID');

            $scope.u = $localStorage.user_details

            console.log($localStorage.user_details);
            $http({
                method: "POST",
                url: "user/add-user-info",
                data: $scope.u
            }).then(function mySucces(response) {

                console.log(response);
                swal("Thank You.!", "You Are Succeffully Registered", "success");
                $(".otp-popup").hide();

                $scope.user_details = "";
                //     $location.path('/user_login');
                console.log('THIS IS LOGGED IN USER');
                console.log(response);
                $cookieStore.put('s3cr3t_user', response.data._id);
                $localStorage.username = response.data.username;
                $location.path('/');
                //$scope.after_success_reg_message = true;

                // $timeout(function () {
                //     $scope.after_success_reg_message = false;

                // }, 6000);



            }, function myError(response) {

                //  $scope.already_register_user = true;
                console.log(response);
                $(".otp-popup").hide();

                if (response.data.status == 'Email Already Registered') {

                    swal("Error", "Email Already Registered With Us", "error");
                }
                if (response.data.status == 'Phone_No Already Registered') {

                    swal("Error", "Contact No. Already Registered With Us", "error");
                }

                // $timeout(function () {
                //     $scope.already_register_user = false;

                // }, 4000);

            });

        }
        if (data == '') {

            $scope.empty_otp = true;
            $timeout(function () {

                $scope.empty_otp = false;
            }, 2000);

        }
        if (parseInt(data.otp) != $localStorage.otp_val) {

            $scope.incorr_otp = true;
            $timeout(function () {

                $scope.incorr_otp = false;

            }, 2000);
        }

    }
    $scope.resend_otp = false;
    $scope.resend_user_otp = function () {


        if ($('#mobile_no').val().length == 10) {

            var num = Math.floor(Math.random() * 900000) + 100000;

            $localStorage.otp_val = num;
            console.log(num);
            var to_no = $localStorage.user_contact_no;
            var message = "Your EatoEato OTP Verification Code is " + num;
            $scope.u = {};
            $scope.u = "http://smsgate.idigitie.com/http-api.php?username=eatoeato&password=idid@1234&senderid=EATOET&route=1&number=" + to_no + "&message=" + message;
            ;
            $http({
                method: "GET",
                url: $scope.u

            }).then(function mySucces(response) {


                console.log(response);
                //  $(".otp-popup").show();


            }, function myError(response) {


                $scope.resend_otp = true;
                $timeout(function () {

                    $scope.resend_otp = false;

                }, 5000);
            });

        }

        else if ($('#mobile_no').val().length == 0) {


            swal("Error", "Contact Number Couldn't be Blank", "error");
        }
        else {
            swal("Error", "Entered Value is not a Contact Number", "error");
        }




    }

    $scope.v_email = {};
    $scope.verify_email_user = function (data) {

        if (!data.hasOwnProperty('email')) {
            swal("Error", "Email Shouldn't Be Blank", "error");

        } else {

            console.log(data);
            $scope.u = {};
            $scope.u.email = data.email;
            $scope.u.user_id = $cookieStore.get('s3cr3t_user');
            $http({
                method: "POST",
                url: "user/send-verify-email-to-user",
                data: $scope.u
            }).then(function mySucces(response) {

                swal("Email Sent", "Please Check Your Email To Verify...", "success");
                console.log(response);
            }, function myError(response) {

                console.log(response);
            });

        }

    }


    $scope.verify_user_params = function () {

        //    console.log('this is ID--'+$routeParams.user_id);
        console.log('THIS IS ROUTE PARAMS');
        // console.log($routeParams.user_id);
        $http({
            method: "GET",
            url: "user/user-verify/" + $routeParams.user_id + "/" + $routeParams.email

        }).then(function mySucces(response) {


            // $cookieStore.put('s3cr3t_user', response.data._id);
            $location.path('/user_login');
            swal("Email Verified", "Your Email Succeffully Verified", "success");
        }, function myError(response) {

            console.log(response);
        });

    }


    $scope.v_phone = {};
    $scope.verify_phone_user = function (data) {


        if (!data.hasOwnProperty('phone')) {
            swal("Error", "Contact No. Couldn't Be Blank", "error");

        } else {

            //console.log(data);

            if ($('#mobile_no').val().length == 10) {

                var num = Math.floor(Math.random() * 900000) + 100000;
                var contact = parseInt(data.phone);
                console.log(contact);
                $scope.k = {};
                $scope.k.user_contact_no = contact;
                $scope.k.user_id = $cookieStore.get('s3cr3t_user');;

                swal({
                    title: "Verify OTP",
                    text: "Enter Your 6 Digit Verification Code",
                    type: "input",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    animation: "slide-from-top",
                    inputPlaceholder: "Enter OTP"
                },
                    function (inputValue) {
                        console.log(parseInt(inputValue));
                        console.log(num);
                        // if (inputValue === false) return false;

                        if (parseInt(inputValue) == num) {

                            //  console.log($scope.k);
                            $http({
                                method: "POST",
                                url: 'user/user-contact-update',
                                data: $scope.k

                            }).then(function mySucces(response) {


                                console.log(response);
                                if (response.data.status == 'contact no. updated') {

                                    swal("Contact Updated !", "Your Contact No. Succeffully Updated", "success");
                                    $scope.get_user_details();
                                }
                                else {

                                    swal("Error", "Something Bad Occured", "error");
                                }



                            }, function myError(response) {


                            });

                            return true;
                        }
                        if (parseInt(inputValue) != num) {
                            swal.showInputError("Incorrect OTP.");
                            return false;
                        }

                    });


                var to_no = contact;
                var message = "Your EatoEato OTP Verification Code is " + num;
                $scope.u = {};
                $scope.u = "http://smsgate.idigitie.com/http-api.php?username=eatoeato&password=idid@1234&senderid=EATOET&route=1&number=" + to_no + "&message=" + message;

                $http({
                    method: "GET",
                    url: $scope.u

                }).then(function mySucces(response) {


                    console.log(response);


                }, function myError(response) {


                });

                // $scope.u = {};
                // $scope.u.email = data.email;
                // $scope.u.user_id = $cookieStore.get('s3cr3t_user');
                // $http({
                //     method: "POST",
                //     url: "user/send-verify-email-to-user",
                //     data: $scope.u
                // }).then(function mySucces(response) {

                //     swal("Email Sent", "Please Check Your Email To Verify...", "success");
                //     console.log(response);
                // }, function myError(response) {

                //     console.log(response);
                // });

            }
        }
    }


    $scope.user_status = false;
    $scope.after_failed_activation = false;

    $scope.user_login_check = function (user_login) {

        $scope.u = user_login;


        console.log(user_login);


        $http({
            method: "POST",
            url: "user/user-login",
            data: $scope.u
        }).then(function mySucces(response) {

            console.log('THIS IS USER')
            console.log(response);
            // console.log(response.data.data[0]._id);
            // $cookieStore.put('s3cr3t_user_data', response.data[0]);
            if (response.data.status == "deactivated") {
                sweetAlert("Account Deactivated", "Your Account Has Been Deactivated", "error");
            }
            else if (response.data.status == "unauthorized") {

                sweetAlert("Un Authorized", "Check credentials Again.", "error");
                //  $scope.user_status = true;

            }
            else if (response.data.status == "success") {


                // setTimeout(function () {
                swal({
                    title: "Credentials Verified !",
                    text: "You Can Access Your Account Panel Now.",
                    type: "success",
                    confirmButtonText: "OK"
                },
                    function (isConfirm) {
                        if (isConfirm) {
                            console.log('THIS IS RESPONSE');
                            console.log(response);
                            //$location.path('/cook_profile');
                            $scope.user_login = "";

                            $scope.after_success_login_message = true;
                            $cookieStore.put('s3cr3t_user', response.data.data[0]._id);
                            $localStorage.username = response.data.data[0].username;
                            window.location.href = "#/";
                        }
                    });
                // }, 100);


            }
        }, function myError(err) {

            sweetAlert("Un Authorized", "Check credentials Again.", "error");
        });



    }
    $scope.user_password_update_detail = {};
    $scope.after_success_pass_update = false;
    $scope.after_failed_pass_update = false;

    $scope.user_password_update = function (pass_update_detail) {

        $scope.u = pass_update_detail;
        $scope.user_password_update_detail = "";
        $scope.u.user_id = $cookieStore.get('s3cr3t_user');
        console.log($scope.u);

        $http({
            method: "POST",
            url: "user/user-pass-update",
            data: $scope.u
        }).then(function mySucces(response) {


            $scope.after_success_pass_update = true;
            $timeout(function () {

                $scope.after_success_pass_update = false;

            }, 3000);

        }, function myError(response) {


            $scope.after_failed_pass_update = true;
            $timeout(function () {

                $scope.after_failed_pass_update = false;

            }, 3000);
        });
    };

    $scope.user_address_detail = {};

    $scope.update_user_address = function (address_details) {
        $scope.u = address_details;
        $scope.u.user_id = $cookieStore.get('s3cr3t_user');


        var contact = $('#contact_no').val();

        if (contact.length > 10 || contact.length < 10) {

            console.log('ERROR');
            swal("Invalid Contact No.", "Please Enter 10 Digit Contact No.", "error");
            // trigger error
        }
        else {

            $http({
                method: "POST",
                url: "user/user-address-add",
                data: $scope.u
            }).then(function mySucces(response) {

                $scope.getUserAddress();
                $scope.user_address_detail = "";

                console.log('user address updating');
            }, function myError(response) {


            });
        }





    }


    $scope.autocomplete_addr_in_user_panel = function () {


        blockUI.start('Please Wait..');
        $timeout(function () {
            blockUI.message('Fetching Location');
        }, 1000);

        $timeout(function () {
            blockUI.message('Autofilling Data..');
        }, 2000);

        $timeout(function () {
            blockUI.stop();
            var formatted_address = $.cookie('formatted_addr');
            console.log(formatted_address);
            var geocoder = new google.maps.Geocoder();
            var city, state, pin_code, lat, long;
            var is_get_data = false;
            geocoder.geocode({ 'address': formatted_address }, function (results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();

                    // console.log('THIS IS FORMATTED ONE ');
                    //  console.log(results[0]);
                    //   $localStorage.user_loc_name = results[0].address_components[0].long_name;

                    $scope.u = {};
                    $scope.u.lat = latitude;
                    $scope.u.long = longitude;

                    $cookieStore.put('user_lat_long', $scope.u);

                    console.log('this is USER');
                    console.log(results);
                    lat = latitude;
                    long = longitude;
                    for (var i = 0; i < results[0].address_components.length; i++) {

                        for (var j = 0; j < results[0].address_components[i].types.length; j++) {

                            if (results[0].address_components[i].types[j] == "administrative_area_level_1") {

                                city = results[0].address_components[i].long_name;
                            }

                            if (results[0].address_components[i].types[j] == "locality") {

                                state = results[0].address_components[i].long_name;
                            }
                            if (results[0].address_components[i].types[j] == "postal_code") {

                                pin_code = results[0].address_components[i].long_name;
                                is_get_data = true;
                            }
                        }
                    }

                    console.log(city);
                    console.log(state);
                    console.log(pin_code);

                    //$scope.cook_complete_details.city=city;
                    //   $scope.get_foods_for_listing();
                    //   window.location.href = '#/listing';
                    //       //  console.log(results[0] );
                    //          $timeout(function () {


                    // }, 3000);

                }
            });

            //    if (is_get_data == true) {
            $timeout(function () {
                $scope.user_address_detail.address_city = city;
                $scope.user_address_detail.address_state = state;
                $scope.user_address_detail.address_pincode = pin_code;


            }, 1000);


            //         }


        }, 3000);
    }

    $scope.user_address_list = {};   // this variable is used to get/store user address

    $scope.is_user_add = false;

    $scope.getUserAddress = function () {

        $scope.user_id = { user_id: $cookieStore.get('s3cr3t_user') };
        // console.log($scope.user_id);
        $http({
            method: "POST",
            url: "user/get-user-address",
            data: $scope.user_id
        }).then(function mySucces(response) {

            $scope.user_address_list = response.data[0].address;

            if ($scope.user_address_list.length > 0) {
                $scope.is_user_add = true;
                $scope.show_delivery_addr_checkout = false;
            }
            else {

                $scope.is_user_add = false;
            }
            console.log(response.data[0].address);
        }, function myError(response) {


        });

    }

    $scope.manage_account_update_user = {};
    $scope.manage_account_deactivate_user = {};
    $scope.after_success_account_update = false;
    $scope.after_success_account_deactivate = false;
    $scope.after_failed_account_deactivate = false;

    $scope.manage_account_user = function (acc_update_details) {
        $scope.u = $scope.manage_account_update_user;
        $scope.u.user_id = $cookieStore.get('s3cr3t_user');
        $scope.manage_account_update_user = "";

        $http({
            method: "POST",
            url: "user/user-account-update",
            data: $scope.u
        }).then(function mySucces(response) {


            $scope.after_success_account_update = true;
            $timeout(function () {

                $scope.after_success_account_update = false;

            }, 3000);

        }, function myError(response) {


        });
    }



    $scope.manage_account_user_deactivate = function (acc_update_details) {

        console.log($cookieStore.get('s3cr3t_user'));

        // $scope.u = $scope.manage_account_deactivate_user;
        $scope.u = {};
        $scope.u.user_id = $cookieStore.get('s3cr3t_user');
        $scope.u.user_contact = acc_update_details.deactivate_user_contact;
        $scope.u.user_pass = acc_update_details.deactivate_user_password;
        console.log($scope.u);
        $http({
            method: "POST",
            url: "user/user-account-deactivate",
            data: $scope.u
        }).then(function mySucces(response) {
            $scope.manage_account_deactivate_user = "";

            if (response.data.status == 'success') {

                swal("Deactivate Successfull !", "Your Account Has Been Deactivated ", "success");
                $cookieStore.remove("s3cr3t_user");
                $location.path('/user_login');

            }
            if (response.data.status == 'invalid contact') {

                swal("Inavlid Contact !", "Please Enter Correct Contact No.", "error");

            }
            if (response.data.status == 'invalid password') {

                swal("Invalid Password !", "Please Enter Correct Password", "error");

            }
            console.log(response);
        }, function myError(response) {




        });
    }

    $scope.hobbies_list = [

        { 'name': 'Cooking' },
        { 'name': 'Eating' },
        { 'name': 'Dance' },
        { 'name': 'Painting' },

    ];

    $scope.hobbies_selction = [];

    $scope.selection_hobbies = function (val) {

        var idx = $scope.hobbies_selction.indexOf(val);
        if (idx > -1) {
            $scope.hobbies_selction.splice(idx, 1);

        }



        // is newly selected
        else {


            $scope.hobbies_selction.push(val);


            // $scope.food_details.occassion_list = $scope.selection;
        }

        console.log($scope.hobbies_selction);

    }

    $scope.user_profile_update_data = {};
    $scope.user_profile_update_status = false;
    $scope.user_profile_update = function (user_profile_details) {

        if ($scope.imageData == "") {
            $scope.user_profile_update_data.user_profile_image = "";
            $scope.u = $scope.user_profile_update_data;
            $scope.u.user_id = $cookieStore.get('s3cr3t_user');

        }
        else {
            $scope.user_profile_update_data.user_profile_image = $scope.imageData;
            $scope.u = $scope.user_profile_update_data;
            $scope.u.user_id = $cookieStore.get('s3cr3t_user');

        }
        console.log($scope.u);
        $http({
            method: "POST",
            url: "user/user-profile-update",
            data: $scope.u
        }).then(function mySucces(response) {

            console.log(response);
            //$scope.get_user_details();

            $scope.user_profile_update_status = true;
            $timeout(function () {

                $scope.user_profile_update_status = false;

            }, 3000);

        }, function myError(response) {


        });

    }

    $scope.isImage = function (ext) {
        if (ext) {
            return ext == "jpg" || ext == "jpeg" || ext == "gif" || ext == "png"
        }
    }
    $scope.imageData = "";
    $scope.upload_user_profile_image = function (files) {

        if (files[0] == undefined) return;
        $scope.fileExt = files[0].name.split(".").pop();

        var f = document.getElementById('file').files[0];


        r = new FileReader();

        r.onloadend = function (e) {

            var data = e.target.result;

            $scope.imageData = $base64.encode(data);
            //  $scope.u={};
            // $scope.u.img=$scope.imageData;
            // console.log($scope.imageData);
            // $timeout(function () {

            //     $http({
            //     method: "POST",
            //     url: "admin/upload-file-test",
            //     data: $scope.u
            // }).then(function mySucces(response) {

            //     console.log(response);
            //     //$scope.get_user_details();


            // }, function myError(response) {


            // });

            // }, 4000);

            //send your binary data via $http or $resource or do anything else with it


        }

        r.readAsBinaryString(f);

    }



    $scope.verify_otp_textbox = false;
    $scope.user_mobile_otp = "";

    $scope.verifyOTP = function (contact) {

        console.log($('#mobile_no').val().length);

        if ($('#mobile_no').val().length == 10) {

            var num = Math.floor(Math.random() * 900000) + 100000;

            swal({
                title: "Verify OTP",
                text: "Enter Your 6 Digit Verification Code",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputPlaceholder: "Enter OTP"
            },
                function (inputValue) {
                    console.log(parseInt(inputValue));
                    console.log(num);
                    // if (inputValue === false) return false;

                    if (parseInt(inputValue) == num) {
                        swal("Thanks !", "OTP Succeffully Verified ", "success");
                        return true;
                    }
                    if (parseInt(inputValue) != num) {
                        swal.showInputError("Incorrect OTP.");
                        return false;
                    }

                });


            var to_no = contact;
            var message = "Your EatoEato OTP Verification Code is " + num;
            $scope.u = {};
            $scope.u = "http://smsgate.idigitie.com/http-api.php?username=eatoeato&password=idid@1234&senderid=EATOET&route=1&number=" + to_no + "&message=" + message;

            $http({
                method: "GET",
                url: $scope.u

            }).then(function mySucces(response) {


                console.log(response);


            }, function myError(response) {


            });

        }

        else if ($('#mobile_no').val().length == 0) {


            swal("Error", "Contact Number Couldn't be Blank", "error");
        }
        else {
            swal("Error", "Entered Value is not a Contact Number", "error");
        }


        // $scope.verify_otp_textbox = true;

    }

    $scope.checkOTP = function () {
        console.log($scope.user_mobile_otp);
        if ($scope.user_mobile_otp == "1234") {
            console.log('sadfasdfdd');
            alert('OTP VERIFIED..!');
        }
        else if ($scope.user_mobile_otp != 1234 || $scope.user_mobile_otp != "") {
            alert('WRONG OTP..!');
        }
        else {

        }

    }

    $scope.user_profile_image_status = false;

    $scope.get_user_details = function () {
        $scope.user_id = {};

        $scope.user_id.user_id = $cookieStore.get('s3cr3t_user');

        $http({
            method: "POST",
            url: "user/get-user-details",
            data: $scope.user_id
        }).then(function mySucces(response) {

            $scope.user_profile_update_data = response.data;
            console.log(response.data);
        }, function myError(response) {


        });

    }


    //Deleting Address of user

    $scope.delete_address = function (address_id) {

        $scope.delete_add = {};
        $scope.delete_add.address_id = address_id;
        $scope.delete_add.user_id = $cookieStore.get('s3cr3t_user');
        $http({
            method: "POST",
            url: "user/delete-user-address",
            data: $scope.delete_add
        }).then(function mySucces(response) {

            $scope.getUserAddress();

        }, function myError(response) {



        });
    }



    $scope.food_listing = {};
    $scope.food_name_breadcrumb_detail = "";
    $scope.loc_val_cookies = function () {
        $scope.loc_show = $localStorage.user_loc_name;
        console.log('THIS IS CURRENT URL');
        var vv = $location.path().split('/').pop();
        var str = vv.replace(/\s+/g, '-').toLowerCase();
        $scope.food_name_breadcrumb_detail = str;
        console.log(str);
    }

    $scope.show_listing_for_user = function () {

        $location.path('/listing');
    }
    $scope.loc_show = "";
    $scope.order = '-added';

    $scope.inputChangedSearch = function () {

        $timeout(function () {

            blockUI.start('Filtering Foods');

            $timeout(function () {

                blockUI.stop();
            }, 900);
        }, 2000);

    }

    $scope.inputChangedSearch2 = function () {
        console.log('TTTEST CHECK');
        var options = {
            types: ['(cities)'],

        };

        var input = document.getElementById('autocomplete');

        var autocomplete = new google.maps.places.Autocomplete(input);
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            fillInAddress();
        });

        function fillInAddress() {
            /* Get the place details from the Autocomplete object. */
            /* The Autocomplete.getPlace() call retrieves a PlaceResult object */

            var place = autocomplete.getPlace();
            //console.log(place);
            $.cookie('eatoeato.loc', place.address_components[0].long_name);
            $.cookie('formatted_addr', place.formatted_address);
            //console.log(place);


        }

    }


    $scope.show_listing_body = true;
    $scope.no_food_show = false;
    $scope.dd = {};
    $scope.is_left_filter_show = true;
    $scope.get_foods_for_listing = function () {

        if ($cookieStore.get('cook_logged_in') != undefined) {

            $location.path('/cook_profile');
        }
        if ($cookieStore.get('user_lat_long') == undefined) {

            $location.path('/');
        }
        else {
            blockUI.start('Please Wait...');

            $timeout(function () {

                blockUI.stop();
            }, 900);

            $scope.u = {};
            $scope.u = $cookieStore.get('user_lat_long');
            console.log($scope.u);

            $scope.slider_translate.minValue = 0;
            $scope.slider_translate.maxValue = 0;
            $scope.slider_translate.options.ceil = 0;
            $scope.slider_translate.options.floor = 0;

            $http({
                method: "POST",
                url: "user/get-listing-foods",
                data: $scope.u
            }).then(function mySucces(response) {

                //   $scope.cart_collection=$localStorage.cart_collection ;

                // console.log('THIS IS MY CART COLLCTION');
                // console.log($localStorage.cart_collection);

                if ($localStorage.cart_collection != undefined) {



                    $scope.cart_collection = $localStorage.cart_collection;
                    console.log('THIS IS ORDER TIME');
                    //    console.log($scope.cart_collection[0].order_id);
                    console.log($scope.cart_collection);
                    // if ($scope.cart_collection.length > 0) {

                    //     // var d = new Date();
                    //     // var n = d.getTime();
                    //     // console.log(n);
                    //     // var hourDiff = n - $scope.cart_collection[0].order_id;
                    //     // var min = Math.floor((hourDiff / 1000 / 60) << 0);
                    //     // //        var diffHrs = Math.floor((hourDiff % 86400000) / 3600000);
                    //     // if (min > 15) {

                    //     //     console.log('MINIMMMMM DELETE');
                    //     //     delete $localStorage.cart_collection;
                    //     //     $scope.cart_collection = '';
                    //     //     $route.reload();
                    //     // }
                    // }

                    // console.log(min);
                    // console.log(hourDiff);
                    // console.log(d.toString());
                    //   $scope.show_suggestive_cart = true;
                }
                //  console.log('NOT UNDEF');
                //  console.log($scope.cart_collection );
                //   console.log('NOT UNDEF LOCSAL STORGE');
                //  console.log($localStorage.cart_collection );
                // if ($scope.cart_collection != undefined) {
                //     console.log('NOT UNDEF');
                //     if ($scope.cart_collection.length > 0) {

                //         for (var i = 0; i < response.data.listing.length; i++) {

                //             for (var j = 0; j < $scope.cart_collection.length; j++) {

                //                 if (response.data.listing[i]._id == $scope.cart_collection[j].food_id) {

                //                     if ($scope.cart_collection[j].order_date == $scope.dd.date) {

                //                         response.data.listing[i].cart_qty = $scope.cart_collection[j].food_qty;

                //                     }

                //                 }


                //             }
                //             // if($scope.cart_collection[i].)

                //         }

                //     }

                // }

                console.log(response.data.listing);
                // var myArray = [[1], [1, 2], null, [1, 2, 3]];
                // var newArray = [];
                // angular.forEach(function (myArray, function (a) {
                //     if (a & a.length) {
                //         newArray.push(a);
                //     }
                // });
                $scope.food_listing = response.data;

                if (response.data.listing.length < 1) {

                    $scope.show_listing_body = false;
                    $scope.no_food_show = true;
                }
                // else{

                //     $scope.show_listing_body=true;
                //     $scope.no_food_show=false;

                // }
                if (response.data.listing.length > 0) {

                    $scope.show_listing_body = true;
                    $scope.no_food_show = false;
                }
                if (response.data.listing.length == 1) {

                    $scope.is_left_filter_show = false;
                }
                if (response.data.listing.length > 1) {

                    $scope.is_left_filter_show = true;
                }
                // var das=new Date().toString();
                $timeout(function () {

                    var dt1 = new Date().toString();
                    var dt2 = dt1.split(' ');
                    var dt3 = parseInt(dt2[2]) - 1;
                    dt2[2] = dt3.toString();
                    var dd = dt2.join(' ');
                    $scope.min_date_for_listing = dd;
                    console.log('THIS IS  PREV DATE');
                    console.log(dd);


                    $scope.food_listing.total_food_count = $scope.food_listing.listing.length;
                    $scope.food_listing.filter_food_count = $scope.food_listing.listing.length;

                    console.log('THIS  IS LOCATION OF USER');
                    var ss = $localStorage.user_loc_name;
                    if (ss.length > 11) {

                        ss = ss.substring(0, 11) + "...";

                    }
                    $scope.loc_show = ss;
                    // $localStorage.user_loc_name;

                    console.log($localStorage.user_loc_name);
                    $scope.lat_long_coll = response.data.lat_long_coll;

                    $localStorage.lat_long_coll = $scope.lat_long_coll;  // Store locally cook  lat long

                    console.log('THIS IS LISTTTTING LAT LONG');
                    console.log($localStorage.lat_long_coll);


                    console.log($scope.food_listing);
                    console.log($scope.loc_show);

                    $scope.slider_translate.minValue = response.data.price_data.min_price;
                    $scope.slider_translate.maxValue = response.data.price_data.max_price;
                    $scope.slider_translate.options.ceil = response.data.price_data.max_price;
                    $scope.slider_translate.options.floor = response.data.price_data.min_price;

                    // $scope.slider_translate_time.minTime = response.data.time_data.min_time;
                    // $scope.slider_translate_time.maxTime = response.data.time_data.max_time;
                    // $scope.slider_translate_time.options.ceil = response.data.time_data.max_time;
                    // $scope.slider_translate_time.options.floor = response.data.time_data.min_time;



                }, 10);





            }, function myError(response) {



            });

        }


    }

    $scope.listing_sort_by_method = function (val) {


        console.log('FOOD CALLED');

        if (val == "food_price_per_plate") {
            var sort_arr = [];
            var old_arr = $scope.food_listing.listing;

            console.log(old_arr);
            old_arr.sort(function (a, b) {
                return parseInt(a.food_price_per_plate) - parseInt(b.food_price_per_plate);
            });

        }
        if (val == "-food_price_per_plate") {

            var sort_arr = [];
            var old_arr = $scope.food_listing.listing;

            console.log(old_arr);
            old_arr.sort(function (a, b) {
                return parseInt(a.food_price_per_plate) - parseInt(b.food_price_per_plate);
            });
            old_arr.reverse();
        }


        console.log(old_arr);
        // for (var i = 0; i < $scope.food_listing.listing.length; i++) {

        //     if($scope.food_listing.listing.food_price_per_plate)

        // }


        // $scope.food_listing.listing=$scope.food_listing.listing.sort();

    }


    $scope.loadMapForListing = function () {

        blockUI.start('Preparing Map View');




        $timeout(function () {
            blockUI.message('Loading Cooks ...');
        }, 2000);


        $timeout(function () {
            blockUI.stop();
            console.log('THIS IS LAT LONG COLL');
            console.log($localStorage.lat_long_coll);

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (p) {

                    var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);


                    var mapOptions = {
                        center: LatLng,
                        zoom: 13,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
                    var marker = new google.maps.Marker({
                        position: LatLng,
                        map: map,

                        title: "<div style = 'height:60px;width:200px'><b>Your location:</b><br />Latitude: " + p.coords.latitude + "<br />Longitude: " + p.coords.longitude
                    });




                    google.maps.event.addListener(marker, "click", function (e) {
                        var infoWindow = new google.maps.InfoWindow();
                        infoWindow.setContent(marker.title);
                        infoWindow.open(map, marker);
                    });

                    var markerB;

                    var lat_lon_coll = $localStorage.lat_long_coll;

                    for (var i = 0; i < $localStorage.lat_long_coll.length; i++) {

                        markerB = new google.maps.Marker({
                            position: new google.maps.LatLng(lat_lon_coll[i].cook_latitude, lat_lon_coll[i].cook_longitude),
                            map: map,
                            icon: 'http://192.168.1.156:3000/uploads/q.png'
                        });


                    }
                    var circle = new google.maps.Circle({
                        map: map,
                        radius: 2000,    // 10 miles in metres

                        fillColor: '#fff',
                        fillOpacity: .4,
                        strokeColor: '#313131',
                        strokeOpacity: .4,
                        strokeWeight: .8
                    });


                    circle.bindTo('center', marker, 'position');

                });
            } else {
                alert('Geo Location feature is not supported in this browser.');
            }


        }, 3000);



    }


    $scope.chaldo = function () {
        // $scope.food_listing.listing.filter(function(x){
        //     return 
        // });
        // console.log($scope.food_listing.listing);

        for (var i = 0; i < $scope.food_listing.listing.length; i++) {

            for (var j = 0; j < $scope.food_listing.listing[i].cuisine_list.length; j++) {

                if ($scope.food_listing.listing[i].cuisine_list[j].category_name != "category 1" && $scope.food_listing.listing[i].cuisine_list[i].category_name == "true") {

                }
                else {
                    $scope.food_listing.listing.splice(i, 1);
                    i--;
                    //  console.log($scope.food_listing.listing.length);
                }

            }


        }
        console.log($scope.food_listing.listing);
    }

    $scope.search = "";

    $scope.usePants = {};
    var vm = this;


    vm.onChangeFn = function (id, model) {

        console.log('this is price one');
    }
    $scope.slider_translate = {

        minValue: 100,
        maxValue: 400,
        options: {
            ceil: 500,
            floor: 100,

            translate: function (value) {

                return 'INR ' + value;
            }
        }
    };
    $scope.slider_translate_time = {

        minTime: 0,
        maxTime: 24,
        options: {
            ceil: 24,
            floor: 0,

            translate: function (value) {
                if (value >= 12) {

                    return value - 12 + ' PM... ';
                }
                if (value < 12) {

                    return value + ' AM... ';
                }
            }
        }
    };
    $scope.ps = [];
    $scope.price_data = {};
    $scope.ts = [];
    $scope.time_data = {}
    $scope.$on("slideEnded", function (val) {

        console.log(val);
        if (val.targetScope.slider.highValue <= 24) {

            $scope.time_data.min_time = val.targetScope.rzSliderModel;
            $scope.time_data.max_time = val.targetScope.rzSliderHigh;
            $scope.ts = $scope.time_data;
            console.log($scope.ts);
            $scope.toggleSelection_for_search($scope.ts);
        }
        else {
            $scope.price_data.min_price = val.targetScope.rzSliderModel;
            $scope.price_data.max_price = val.targetScope.rzSliderHigh;
            $scope.ps = $scope.price_data;
            console.log($scope.ps);
            $scope.toggleSelection_for_search($scope.ps);
        }

    });
    // selected checkebox for user/cooks
    $scope.selection_for_search = [];

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = dd + '-' + mm + '-' + yyyy;

    var min_d = parseInt(mm) - 1;

    $scope.dd.date = today;
    $scope.min_date_for_listing = min_d + '-' + dd + '-' + yyyy;

    $scope.no_result_show = 'false';
    // toggle selection for a given cook/user by name
    $scope.toggleSelection_for_search = function (val) {

        console.log(val);

        if (val.group_attr) {
            $scope.selection_for_search.push(val);
            var arra = [];
            for (var i = 0; i < $scope.selection_for_search.length; i++) {
                if ($scope.selection_for_search[i].group_attr) {
                    arra.push(i);
                }
            }
            if (arra.length > 1) {
                $scope.selection_for_search.splice(arra[0], 1);
            }
        }

        if (val.category_name) {

            var idx = $scope.selection_for_search.indexOf(val);
            if (idx > -1) {
                $scope.selection_for_search.splice(idx, 1);

            }



            // is newly selected
            else {


                $scope.selection_for_search.push(val);


                // $scope.food_details.occassion_list = $scope.selection;
            }

        }
        if (val == 'Vegetarian') {

            var food_obj = {};
            food_obj.food_type = val;

            //   console.log(food_type);
            $scope.selection_for_search.push(food_obj);

            var arra = [];
            for (var i = 0; i < $scope.selection_for_search.length; i++) {
                if ($scope.selection_for_search[i].food_type) {
                    arra.push(i);
                }
            }
            if (arra.length > 1) {
                $scope.selection_for_search.splice(arra[0], 1);
            }


        }
        if (val == 'Non Vegetarian') {

            var food_obj = {};
            food_obj.food_type = val;

            //   console.log(food_type);
            $scope.selection_for_search.push(food_obj);

            var arra = [];
            for (var i = 0; i < $scope.selection_for_search.length; i++) {
                if ($scope.selection_for_search[i].food_type) {
                    arra.push(i);
                }
            }
            if (arra.length > 1) {
                $scope.selection_for_search.splice(arra[0], 1);
            }


        }
        // if (val.date) {

        //     console.log(' DATE IS CALLED');
        //     // $scope.selection_for_search.push(val);
        //     // var arra = [];
        //     // for (var i = 0; i < $scope.selection_for_search.length; i++) {
        //     //     if ($scope.selection_for_search[i].veg_type) {
        //     //         arra.push(i);
        //     //     }
        //     // }
        //     // if (arra.length > 1) {
        //     //     $scope.selection_for_search.splice(arra[0], 1);
        //     // }



        // }

        if (val.min_price || val.max_price) {

            $scope.selection_for_search.push(val);
            var arra = [];
            for (var i = 0; i < $scope.selection_for_search.length; i++) {
                if ($scope.selection_for_search[i].min_price) {
                    arra.push(i);
                }
            }
            if (arra.length > 1) {
                $scope.selection_for_search.splice(arra[0], 1);
            }
        }

        if (val.min_time || val.max_time) {

            $scope.selection_for_search.push(val);
            var arra = [];
            for (var i = 0; i < $scope.selection_for_search.length; i++) {
                if ($scope.selection_for_search[i].min_time) {
                    arra.push(i);
                }
            }
            if (arra.length > 1) {
                $scope.selection_for_search.splice(arra[0], 1);
            }
        }

        var temp_obj = {};
        var temp_lat_long = $cookieStore.get('user_lat_long');
        console.log('TEMP LAT');
        console.log(temp_lat_long);
        temp_obj.lat = temp_lat_long.lat;
        temp_obj.long = temp_lat_long.long;

        $scope.u = {};
        $scope.u.serach_fields = $scope.selection_for_search;
        $scope.u.lat_long = temp_obj

        console.log($scope.u);
        // $scope.selection_for_search.push(val);
        // var arra = [];
        // for (var i = 0; i < $scope.selection_for_search.length; i++) {
        //     if ($scope.selection_for_search[i].group_attr) {
        //         arra.push(i);
        //     }
        // }
        // if (arra.length > 1) {
        //     $scope.selection_for_search.splice(arra[0], 1);
        // }


        // $scope.selection_for_search.push(val);
        // for(var i=0;i<$scope.selection_for_search.length;i++){

        //     if($scope.selection_for_search[i].hasOwnProperty('group_attr')){
        //         $scope.selection_for_search.splice(i-1, 1);
        //     }
        // }
        //  //$scope.selection_for_search.push(val);
        // console.log($scope.selection_for_search);
        //  var idx = $scope.selection_for_search.indexOf(val);

        // // is currently selected
        console.log('THISI S LOOc');
        console.log($scope.selection_for_search);

        $http({
            method: "POST",
            url: "user/filter-cook-listing",
            data: $scope.u
        }).then(function mySucces(response) {

            // if (response.data.length < 1) {
            //     $scope.get_foods_for_listing();
            //     $scope.no_result_show = 'true';
            // }
            $scope.food_listing.listing = response.data;
            $scope.food_listing.filter_food_count = response.data.length;

            // console.log('THIS IS FILTERED LISTING');
            console.log(response.data);

        }, function myError(response) {



        });

    }

    var listing_foods_limit_base = 20;
    $scope.listing_foods_limit = 20;
    $scope.load_more_show = false;
    $scope.load_more_foods_listing = function () {


        $scope.listing_foods_limit = $scope.listing_foods_limit + listing_foods_limit_base;
        if ($scope.listing_foods_limit >= $scope.food_listing.listing.length) {
            $scope.load_more_show = true;
            Notification.warning('No More Food To show', 2000);

        }

    }

    $scope.appliedClassListing = function (myObj) {
        $(".properproduct").load(function () {

            if ($(this).height() > 200) {
                console.log('TEST');
                $(this).addClass("if-bigimg");
                return "if-bigimg";
            }
            else {
                return "properproduct";
            }
        });
        //  if (myObj.someValue === "highPriority") {
        //     return "special-css-class";
        // } else {
        //     return "default-class"; // Or even "", which won't add any additional classes to the element
        // }
    }
    $scope.toggleSelection_for_search_date = function (val) {

        $scope.u = {};
        var lat_lon = $cookieStore.get('user_lat_long');
        $scope.u.lat = lat_lon.lat;
        $scope.u.long = lat_lon.long;
        $scope.u.date = val.date;
        console.log($scope.u);




        $http({
            method: "POST",
            url: "user/get-cook-listing-by-date",
            data: $scope.u
        }).then(function mySucces(response) {

            //  $scope.food_listing = response.data;
            console.log('TJIS IS CART COLL');
            console.log($scope.cart_collection);

            //   $scope.cart_collection=$localStorage.cart_collection ;
            var ss = $localStorage.user_loc_name;
            if (ss.length > 11) {

                ss = ss.substring(0, 11) + "...";

            }
            $scope.loc_show = ss;
            console.log(ss);
            if ($scope.cart_collection.length) {

                for (var i = 0; i < response.data.listing.length; i++) {

                    for (var j = 0; j < $scope.cart_collection.length; j++) {

                        if (response.data.listing[i]._id == $scope.cart_collection[j].food_id) {

                            if ($scope.cart_collection[j].order_date == $scope.dd.date) {

                                response.data.listing[i].cart_qty = $scope.cart_collection[j].food_qty;
                                response.data.listing[i].order_id = $scope.cart_collection[j].order_id;
                                response.data.listing[i].order_date = $scope.cart_collection[j].order_date;

                            }

                        }


                    }
                    // if($scope.cart_collection[i].)

                }

            }

            console.log('THIS IS FINAL LISTING');
            console.log(response.data.listing);
            $scope.food_listing = response.data;

            if (response.data.listing.length == 1) {

                $scope.is_left_filter_show = false;
            }
            if (response.data.listing.length > 1) {

                $scope.is_left_filter_show = true;
                //   $route.reload();
            }
            $scope.food_listing.total_food_count = $scope.food_listing.listing.length;
            $scope.food_listing.filter_food_count = $scope.food_listing.listing.length;
            // $scope.loc_show = $.cookie('eatoeato.loc');
            $scope.lat_long_coll = response.data.lat_long_coll;

            console.log('LISTING FOOD')
            console.log($scope.food_listing);
            console.log($scope.loc_show);

            $scope.slider_translate.minValue = response.data.price_data.min_price;
            $scope.slider_translate.maxValue = response.data.price_data.max_price;
            $scope.slider_translate.options.ceil = response.data.price_data.max_price;
            $scope.slider_translate.options.floor = response.data.price_data.min_price;

            $scope.slider_translate_time.minTime = response.data.time_data.min_time;
            $scope.slider_translate_time.maxTime = response.data.time_data.max_time;
            $scope.slider_translate_time.options.ceil = response.data.time_data.max_time;
            $scope.slider_translate_time.options.floor = response.data.time_data.min_time;



            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (p) {

                    var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);


                    var mapOptions = {
                        center: LatLng,
                        zoom: 13,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
                    var marker = new google.maps.Marker({
                        position: LatLng,
                        map: map,

                        title: "<div style = 'height:60px;width:200px'><b>Your location:</b><br />Latitude: " + p.coords.latitude + "<br />Longitude: " + p.coords.longitude
                    });




                    google.maps.event.addListener(marker, "click", function (e) {
                        var infoWindow = new google.maps.InfoWindow();
                        infoWindow.setContent(marker.title);
                        infoWindow.open(map, marker);
                    });

                    var markerB;
                    for (var i = 0; i < $scope.lat_long_coll.length; i++) {

                        markerB = new google.maps.Marker({
                            position: new google.maps.LatLng($scope.lat_long_coll[i].cook_latitude, $scope.lat_long_coll[i].cook_longitude),
                            map: map,
                            icon: 'http://192.168.1.156:3000/uploads/q.png'
                        });
                        //         latLngA = new google.maps.LatLng(parseInt($scope.lat_long_coll[i].cook_latitude),parseInt($scope.lat_long_coll[i].cook_longitude));

                        //                markerB = new google.maps.Marker({
                        //         position: latLngA,
                        //         title: 'Location',
                        //         map: map,


                        //     });

                        //                  google.maps.event.addListener(markerB, 'dragend', function() {
                        //     latLngA = new google.maps.LatLng(markerB.position.lat(), markerB.position.lng());

                        // });

                    }
                    var circle = new google.maps.Circle({
                        map: map,
                        radius: 2000,    // 10 miles in metres

                        fillColor: '#fff',
                        fillOpacity: .4,
                        strokeColor: '#313131',
                        strokeOpacity: .4,
                        strokeWeight: .8
                    });


                    circle.bindTo('center', marker, 'position');

                });
            } else {
                alert('Geo Location feature is not supported in this browser.');
            }


            console.log(response);

        }, function myError(response) {



        });


    }

    $scope.reset_filters = function (al) {

        $scope.get_foods_for_listing();

    }

    // $scope.product.count=0;
    $scope.cart_collection = [];
    // $scope.cart_detail={};
    $scope.cart_total_item = "0";
    var item_total = 0;
    var ts = 0;
    $scope.show_suggestive_cart = false;

    $scope.increaseItemCount = function (item, order_date) {

        $scope.show_suggestive_cart = true;

        console.log('MY CAER');
        console.log(item);
        console.log(order_date);
        var listing_date = $('#listing_date').val();
        console.log(listing_date);
        console.log('aboece');
        var flag = 0;


        if ($localStorage.cart_collection != undefined) {

            if ($localStorage.cart_collection.length > 0) {

                $scope.cart_collection = $localStorage.cart_collection;

            }
        }

        console.log('THIS IS CART COLLCTION on IMNC');
        console.log($scope.cart_collection);


        for (var t = 0; t < $scope.food_listing.listing.length; t++) {

            if ($scope.food_listing.listing[t]._id == item._id) {

                if (item.cart_qty > parseInt($scope.food_listing.listing[t].food_max_qty) - 1) {

                    flag = 1;
                    Notification.error({ message: 'You Cannot Order this food ' + $scope.food_listing.listing[t].food_max_qty + ' Per Qty', delay: 3000 });
                    //  alert('You Cannot Order this food '+$scope.food_listing.listing[t].food_max_qty+' Per Qty')
                }





            }
        }

        if (flag == 1) {


        }

        else {

            var d = new Date();


            var hasItem = "false";
            //  $scope.cart_collection = $localStorage.cart_collection;
            var len = $scope.cart_collection.length;

            if (ts == 0) {
                ts = parseInt(item.food_price_per_plate);
            }

            if (len < 1) {

                console.log('1');
                console.log('FIRST ITEM INSERTED');

                item.cart_qty++;
                $scope.cart_detail = {};

                $scope.cart_detail.food_id = item._id;
                $scope.cart_detail.cook_id = item.cook_id;
                $scope.cart_detail.food_qty = item.cart_qty;
                $scope.cart_detail.food_price = item.food_price_per_plate;
                $scope.cart_detail.food_img = item.food_img;
                $scope.cart_detail.food_cuisine = item.cuisine_list;
                $scope.cart_detail.food_name = item.food_name;
                $scope.cart_detail.food_type = item.food_type;
                $scope.cart_detail.delivery_by = item.delivery_by;
                $scope.cart_detail.food_max_qty = item.food_max_qty;
                $scope.cart_detail.food_min_qty = item.food_min_qty;
                $scope.cart_detail.discount_amt = 0;
                $scope.cart_detail.sub_order_status = 'pending';
                $scope.cart_detail.food_total_price = parseInt(item.food_price_per_plate);
                $scope.cart_detail.order_id = d.getTime(),


                    item.order_id = $scope.cart_detail.order_id,

                    item.cart_qty = $scope.cart_detail.food_qty,

                    $scope.cart_detail.order_date = listing_date,

                    $scope.cart_collection.push($scope.cart_detail);


                Notification.warning({ message: 'Cart Updated ', delay: 3000 });

                console.log(item_total);
            }
            else {

                var hasSameItemWithDiffDate = false;
                var is_diff_date = false;

                var another_cook_chk = 0;
                var confirm_another_cook = 0;
                var chk = 0;
                for (var i = 0; i < len; i++) {


                    if ($scope.cart_collection[i].cook_id == item.cook_id) {

                        chk = 1;

                        console.log('ANOTHER COOKKKKKKKKKK');

                    }


                }
                if (chk == 0) {

                    another_cook_chk = 1;
                }
                if (chk == 1) {

                    another_cook_chk = 0;
                }

                if (another_cook_chk == 1) {

                    swal({
                        title: "Are you sure?",
                        text: "You have Selected Food From Different Cook/Restaurant \n Additional Delivery Charge Will Apply.!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55", confirmButtonText: "Yes, Add it!",
                        cancelButtonText: "No, cancel plz!",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                        function (isConfirm) {
                            if (isConfirm) {

                                swal("Added !", "Your Cart Updated ", "success");
                                confirm_another_cook = 0;
                                test();

                            } else {

                                swal("Cancelled", "Food Removed from your Cart :)", "error");
                                confirm_another_cook = 1;
                            }
                        });
                }

                function test() {

                    if (confirm_another_cook == 0) {


                        for (var i = 0; i < len; i++) {

                            if ($scope.cart_collection[i].food_id == item._id && $scope.cart_collection[i].order_date == listing_date) {

                                console.log('SAME DATESSS');
                                console.log($scope.dd.date);
                                item.cart_qty++;
                                hasItem = "true";
                                $scope.cart_collection[i].food_qty = item.cart_qty;
                                item_total = $scope.cart_collection[i].food_price * parseInt(item.cart_qty);
                                $scope.cart_collection[i].food_total_price = item_total;
                                hasSameItemWithDiffDate = false;
                                break;
                            }

                            if ($scope.cart_collection[i].food_id == item._id && $scope.cart_collection[i].order_date != listing_date) {

                                console.log('SAME DATESSS SECOND ONE');
                                hasItem = "true";
                                hasSameItemWithDiffDate = true;
                                //  break;
                            }

                            // CHANGED ON 11/06/2017

                            if ($scope.cart_collection[i].order_date != order_date) {

                                console.log('NOT FROM SAME DATE..');
                                is_diff_date = true;
                                hasSameItemWithDiffDate = false;
                            }


                        }


                        var is_cleared = false;
                        if (is_diff_date == true) {
                            //   swal("Error", "You have Changed the date, Want to Start a Fresh..", "error");
                            swal({
                                title: "Attention Please !",
                                text: "You have Changed the date, Want to Start a Fresh..",
                                type: "error",
                                showCancelButton: true,
                                closeOnConfirm: false,
                            },
                                function (isConfirm) {
                                    if (isConfirm) {

                                        is_cleared = true;
                                        // delete $localStorage.cart_collection;
                                        $scope.cart_collection = null;
                                        $scope.clear_prev_cart(item, listing_date);
                                        swal("Item Added.", "Previous Date Item Cleared.", "success");
                                    }
                                });
                        }
                        if (is_cleared == true) {

                            console.log('COMES TO SECOND ONE');

                        }
                        if (hasItem == "false") {
                            console.log('2222');


                            item.cart_qty++;
                            $scope.cart_detail = {};
                            $scope.cart_detail.food_id = item._id;
                            $scope.cart_detail.cook_id = item.cook_id;
                            $scope.cart_detail.food_qty = item.cart_qty;
                            $scope.cart_detail.food_price = item.food_price_per_plate;
                            $scope.cart_detail.food_img = item.food_img;
                            $scope.cart_detail.food_cuisine = item.cuisine_list;
                            $scope.cart_detail.food_name = item.food_name;
                            $scope.cart_detail.food_total_price = 0;
                            $scope.cart_detail.food_type = item.food_type;
                            $scope.cart_detail.delivery_by = item.delivery_by;
                            $scope.cart_detail.food_max_qty = item.food_max_qty;
                            $scope.cart_detail.food_min_qty = item.food_min_qty;
                            $scope.cart_detail.food_total_price = parseInt(item.food_price_per_plate);
                            $scope.cart_detail.order_id = d.getTime(),
                                $scope.cart_detail.discount_amt = 0;
                            $scope.cart_detail.order_date = listing_date,

                                item.order_id = $scope.cart_detail.order_id

                            $scope.cart_collection.push($scope.cart_detail);

                        }

                        if (hasSameItemWithDiffDate == true) {

                            console.log('THIS IS HAS SAME ITEM WIDH');
                            console.log('3');

                            console.log(item.cart_qty);

                            item.cart_qty++;
                            $scope.cart_detail = {};
                            $scope.cart_detail.food_id = item._id;
                            $scope.cart_detail.cook_id = item.cook_id;
                            $scope.cart_detail.food_qty = item.cart_qty;
                            $scope.cart_detail.food_price = item.food_price_per_plate;
                            $scope.cart_detail.food_img = item.food_img;
                            $scope.cart_detail.food_cuisine = item.cuisine_list;
                            $scope.cart_detail.food_name = item.food_name;
                            $scope.cart_detail.food_total_price = 0;
                            $scope.cart_detail.food_type = item.food_type;
                            $scope.cart_detail.delivery_by = item.delivery_by;
                            $scope.cart_detail.food_max_qty = item.food_max_qty;
                            $scope.cart_detail.food_min_qty = item.food_min_qty;
                            $scope.cart_detail.food_total_price = parseInt(item.food_price_per_plate);
                            $scope.cart_detail.order_id = d.getTime(),
                                $scope.cart_detail.discount_amt = 0;
                            $scope.cart_detail.order_date = listing_date,

                                item.order_id = $scope.cart_detail.order_id

                            $scope.cart_collection.push($scope.cart_detail);


                        }
                        Notification.warning({ message: 'Cart Updated ', delay: 3000 });
                        $route.reload();
                    } // DIFFERENT COOK CHECK



                    return;



                }


                if (another_cook_chk == 0) {

                    for (var i = 0; i < len; i++) {

                        if ($scope.cart_collection[i].food_id == item._id && $scope.cart_collection[i].order_date == listing_date) {

                            console.log('SAME DATESSS');
                            console.log($scope.dd.date);
                            item.cart_qty++;
                            hasItem = "true";
                            $scope.cart_collection[i].food_qty = item.cart_qty;
                            item_total = $scope.cart_collection[i].food_price * parseInt(item.cart_qty);
                            $scope.cart_collection[i].food_total_price = item_total;
                            hasSameItemWithDiffDate = false;
                            break;
                        }

                        if ($scope.cart_collection[i].food_id == item._id && $scope.cart_collection[i].order_date != listing_date) {

                            console.log('SAME DATESSS SECOND ONE');
                            hasItem = "true";
                            hasSameItemWithDiffDate = true;
                            //  break;
                        }

                        // CHANGED ON 11/06/2017

                        if ($scope.cart_collection[i].order_date != order_date) {

                            console.log('NOT FROM SAME DATE..');
                            is_diff_date = true;
                            hasSameItemWithDiffDate = false;
                        }


                    }


                    var is_cleared = false;
                    if (is_diff_date == true) {
                        //   swal("Error", "You have Changed the date, Want to Start a Fresh..", "error");
                        swal({
                            title: "Attention Please !",
                            text: "You have Changed the date, Want to Start a Fresh..",
                            type: "error",
                            showCancelButton: true,
                            closeOnConfirm: false,
                        },
                            function (isConfirm) {
                                if (isConfirm) {

                                    is_cleared = true;
                                    // delete $localStorage.cart_collection;
                                    $scope.cart_collection = null;
                                    $scope.clear_prev_cart(item, listing_date);
                                    swal("Item Added.", "Previous Date Item Cleared.", "success");
                                }
                            });
                    }
                    if (is_cleared == true) {

                        console.log('COMES TO SECOND ONE');

                    }
                    if (hasItem == "false") {
                        console.log('2222');


                        item.cart_qty++;
                        $scope.cart_detail = {};
                        $scope.cart_detail.food_id = item._id;
                        $scope.cart_detail.cook_id = item.cook_id;
                        $scope.cart_detail.food_qty = item.cart_qty;
                        $scope.cart_detail.food_price = item.food_price_per_plate;
                        $scope.cart_detail.food_img = item.food_img;
                        $scope.cart_detail.food_cuisine = item.cuisine_list;
                        $scope.cart_detail.food_name = item.food_name;
                        $scope.cart_detail.food_total_price = 0;
                        $scope.cart_detail.food_type = item.food_type;
                        $scope.cart_detail.delivery_by = item.delivery_by;
                        $scope.cart_detail.food_max_qty = item.food_max_qty;
                        $scope.cart_detail.food_min_qty = item.food_min_qty;
                        $scope.cart_detail.food_total_price = parseInt(item.food_price_per_plate);
                        $scope.cart_detail.order_id = d.getTime(),
                            $scope.cart_detail.discount_amt = 0;
                        $scope.cart_detail.order_date = listing_date,

                            item.order_id = $scope.cart_detail.order_id

                        $scope.cart_collection.push($scope.cart_detail);

                    }

                    if (hasSameItemWithDiffDate == true) {

                        console.log('THIS IS HAS SAME ITEM WIDH');
                        console.log('3');

                        console.log(item.cart_qty);

                        item.cart_qty++;
                        $scope.cart_detail = {};
                        $scope.cart_detail.food_id = item._id;
                        $scope.cart_detail.cook_id = item.cook_id;
                        $scope.cart_detail.food_qty = item.cart_qty;
                        $scope.cart_detail.food_price = item.food_price_per_plate;
                        $scope.cart_detail.food_img = item.food_img;
                        $scope.cart_detail.food_cuisine = item.cuisine_list;
                        $scope.cart_detail.food_name = item.food_name;
                        $scope.cart_detail.food_total_price = 0;
                        $scope.cart_detail.food_type = item.food_type;
                        $scope.cart_detail.delivery_by = item.delivery_by;
                        $scope.cart_detail.food_max_qty = item.food_max_qty;
                        $scope.cart_detail.food_min_qty = item.food_min_qty;
                        $scope.cart_detail.food_total_price = parseInt(item.food_price_per_plate);
                        $scope.cart_detail.order_id = d.getTime(),
                            $scope.cart_detail.discount_amt = 0;
                        $scope.cart_detail.order_date = listing_date,

                            item.order_id = $scope.cart_detail.order_id

                        $scope.cart_collection.push($scope.cart_detail);


                    }
                    Notification.warning({ message: 'Cart Updated ', delay: 3000 });
                }


            }

            $scope.cart_total_item = $scope.cart_collection.length;

            delete $localStorage.cart_collection;
            $localStorage.cart_collection = $scope.cart_collection;

            console.log($scope.cart_collection);


        }




    };


    $scope.clear_prev_cart = function (item, order_date) {

        console.log('Clearing Previoius Cart');
        console.log(item);
        $scope.cart_collection = [];
        //item.cart_qty++;
        $scope.cart_detail = {};
        $scope.cart_detail.food_id = item._id;
        $scope.cart_detail.cook_id = item.cook_id;
        $scope.cart_detail.food_qty = item.cart_qty;
        $scope.cart_detail.food_price = item.food_price_per_plate;
        $scope.cart_detail.food_img = item.food_img;
        $scope.cart_detail.food_cuisine = item.cuisine_list;
        $scope.cart_detail.food_name = item.food_name;
        $scope.cart_detail.food_total_price = 0;
        $scope.cart_detail.food_type = item.food_type;
        $scope.cart_detail.delivery_by = item.delivery_by;
        $scope.cart_detail.food_max_qty = item.food_max_qty;
        $scope.cart_detail.food_min_qty = item.food_min_qty;
        $scope.cart_detail.food_total_price = parseInt(item.food_price_per_plate);
        $scope.cart_detail.order_id = Math.floor(Date.now() / 1000),
            $scope.cart_detail.order_date = order_date,
            $scope.cart_detail.discount_amt = 0;

        item.order_id = $scope.cart_detail.order_id

        $scope.cart_collection.push($scope.cart_detail);
        $scope.cart_total_item = $scope.cart_collection.length;
        console.log('CHANGED CART');
        console.log($scope.cart_collection);
        delete $localStorage.cart_collection;
        $localStorage.cart_collection = $scope.cart_collection


    }
    $scope.decreaseItemCount = function (item) {

        console.log('BEFORE DEC');
        console.log($scope.cart_collection);



        if (item.cart_qty > 0) {
            item.cart_qty--;


            var len = $scope.cart_collection.length;
            console.log(len);

            for (var j = 0; j < len; j++) {


                if ($scope.cart_collection[j].food_id == item._id && $scope.cart_collection[j].order_id == item.order_id) {
                    if ($scope.cart_collection[j].food_qty > 0) {
                        $scope.cart_collection[j].food_qty = $scope.cart_collection[j].food_qty - 1;
                        item_total = $scope.cart_collection[j].food_price * parseInt($scope.cart_collection[j].food_qty);


                        console.log(item_total);
                    }
                    if ($scope.cart_collection[j].food_qty == 0) {

                        $scope.cart_collection.splice(j, 1);
                    }
                }
            }
            //     $scope.cart_collection.splice(i, 1);

            console.log(item.cart_qty);


        }

        console.log('AFTER DEC');
        console.log($scope.cart_collection);

        $scope.cart_total_item = $scope.cart_collection.length;
        //  $cookieStore.put('user_cart', $scope.cart_collection);
        $localStorage.cart_collection = $scope.cart_collection;
        Notification.info({ message: 'Cart Updated..', delay: 1000 });
    }


    $scope.add_to_cart_to_detail_page = function (item, key, food_id, cuisines) {


        if ($('#' + key + food_id).val() == "") {

            Notification.warning({ message: 'Please Select Date First', delay: 1000 });
        }
        else {

            console.log('THIS IS CUISINE');
            console.log(cuisines[0].food_cuisine);
            if ($scope.isAvailFood == true) {


                var len = $scope.cart_collection.length;
                console.log(len);

                if (len < 1) {

                    item.cart_qty++;
                    $scope.cart_detail = {};
                    $scope.cart_detail.food_id = food_id;
                    $scope.cart_detail.cook_id = item.cook_id;
                    $scope.cart_detail.food_qty = item.cart_qty;
                    $scope.cart_detail.food_price = item.food_price_per_plate;
                    $scope.cart_detail.food_img = item.food_img_for_web;
                    $scope.cart_detail.food_cuisine = cuisines[0].food_cuisine;
                    $scope.cart_detail.food_name = item.food_name;
                    $scope.cart_detail.food_type = item.food_type;
                    $scope.cart_detail.delivery_by = item.delivery_by;
                    $scope.cart_detail.food_total_price = parseInt(item.food_price_per_plate);
                    $scope.cart_detail.order_id = Math.floor(Date.now() / 1000)
                    $scope.cart_detail.order_date = $scope.isAvailFoodDate;
                    $scope.cart_collection.push($scope.cart_detail);
                    console.log($scope.cart_collection);

                    Notification.success({ message: 'Food Added Into Your Cart', delay: 2000 });
                    console.log(item_total);
                }
                else {
                    var flag = 0;
                    var check = 0;
                    var check_temp = 0;
                    for (var i = 0; i < len; i++) {

                        if ($scope.cart_collection[i].food_id == food_id) {

                            if ($scope.cart_collection[i].order_date == $scope.isAvailFoodDate) {
                                check = 1;
                                check_temp = 1;
                            }
                            Notification.error({ message: 'Already Added Into Cart', delay: 2000 });
                            flag = 1;
                            console.log(item_total);
                        }

                    }
                    if (flag == 0) {

                        item.cart_qty++;
                        $scope.cart_detail = {};
                        $scope.cart_detail.food_id = food_id;
                        $scope.cart_detail.cook_id = item.cook_id;
                        $scope.cart_detail.food_qty = item.cart_qty;
                        $scope.cart_detail.food_price = item.food_price_per_plate;
                        $scope.cart_detail.food_img = item.food_img_for_web;
                        $scope.cart_detail.food_cuisine = cuisines[0].food_cuisine;
                        $scope.cart_detail.food_name = item.food_name;
                        $scope.cart_detail.food_type = item.food_type;
                        $scope.cart_detail.delivery_by = item.delivery_by;
                        $scope.cart_detail.food_total_price = parseInt(item.food_price_per_plate);
                        $scope.cart_detail.order_id = Math.floor(Date.now() / 1000);
                        $scope.cart_detail.order_date = $scope.isAvailFoodDate;

                        $scope.cart_collection.push($scope.cart_detail);

                        Notification.success({ message: 'Food Added Into Your Cart', delay: 2000 });




                    }

                    if (check == 0) {

                        item.cart_qty++;
                        $scope.cart_detail = {};
                        $scope.cart_detail.food_id = food_id;
                        $scope.cart_detail.cook_id = item.cook_id;
                        $scope.cart_detail.food_qty = item.cart_qty;
                        $scope.cart_detail.food_price = item.food_price_per_plate;
                        $scope.cart_detail.food_img = item.food_img_for_web;
                        $scope.cart_detail.food_cuisine = cuisines[0].food_cuisine;
                        $scope.cart_detail.food_name = item.food_name;
                        $scope.cart_detail.food_type = item.food_type;
                        $scope.cart_detail.delivery_by = item.delivery_by;
                        $scope.cart_detail.food_total_price = parseInt(item.food_price_per_plate);
                        $scope.cart_detail.order_id = Math.floor(Date.now() / 1000);
                        $scope.cart_detail.order_date = $scope.isAvailFoodDate;

                        $scope.cart_collection.push($scope.cart_detail);
                        console.log($scope.cart_collection);
                        Notification.success({ message: 'Food Added Into Your Cart', delay: 2000 });




                    }

                }
                $scope.cart_total_item = $scope.cart_collection.length;
                $cookieStore.put('user_cart', $scope.cart_collection);



            }

            if ($scope.isAvailFood == false) {
                console.log('IT IS NOT AVAILABLE');
                Notification.error({ message: 'Not Available. Change Date To check Availablity', delay: 2000 });
            }

        }
    }

    $scope.detail_page_date = function (food_id) {

        console.log('TESSSSS');
        console.log(food_id);
        $('#' + food_id).fdatepicker({
            closeButton: false
        });


    }

    $scope.isAvailFood = false;
    $scope.isAvailFoodDate = "";
    $scope.check_food_avail = function (data, key, food_id) {


        console.log($scope.cart_collection);

        var incoming_date, date_frm, date_to;
        var dta = key + food_id;

        console.log(data);

        incoming_date = $('#' + dta).val();
        date_frm = data.selected_date_from;
        date_to = data.selected_date_to;


        var dateFrom = date_frm;
        var dateTo = date_to;
        var dateCheck = incoming_date;

        var d1 = dateFrom.split("-");
        var d2 = dateTo.split("-");
        var c = dateCheck.split("-");

        var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);  // -1 because months are from 0 to 11
        var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
        var check = new Date(c[2], parseInt(c[1]) - 1, c[0]);

        var res = check > from && check < to;
        $scope.isAvailFood = res;

        if (res == true) {

            Notification.info({ message: 'Food Available', delay: 1000 });
            $scope.isAvailFoodDate = incoming_date;
        }
        if (res == false) {

            Notification.error({ message: 'Food Not Available', delay: 1000 });
        }


        if ($scope.cart_collection.length) {

            for (var i = 0; i < $scope.cart_collection.length; i++) {



                if ($scope.cart_collection[i].food_id == food_id && $scope.cart_collection[i].order_date != incoming_date) {
                    console.log('OKKZZ');
                    $scope.cart_collection[i].food_qty = 0;


                }





                // if($scope.cart_collection[i].)

            }

        }

        console.log('AFTER CALL')
        console.log($scope.cart_collection);


    }

    $scope.hover_show_cart = function () {

        //   $localStorage.cart_collection = $scope.cart_collection;
        console.log('HOVER CALLED');
        $scope.show_suggestive_cart = true;
    }
    $scope.hover_hide_cart = function () {

        //   $localStorage.cart_collection = $scope.cart_collection;
        console.log('HOVER CALLED');
        // $scope.show_suggestive_cart = false;
    }



    $scope.saveCart = function () {

        //   $localStorage.cart_collection = $scope.cart_collection;

        $location.path('/cart');
    }

    $scope.view_cart_val = {};
    $scope.manage_cart_total = {};
    $scope.delivery_charge = "";
    $scope.gst = "";
    $scope.manage_cart_total = {};

    $scope.cart_data_obj = {};

    $scope.fetch_cart = function () {


        console.log($localStorage.cart_collection);
        // delete $localStorage.cart_collection;
        //   console.log($localStorage.cart_collection);
        if ($localStorage.cart_collection == undefined) {

        }
        else if ($localStorage.cart_collection != undefined) {

            $scope.view_cart_val = $localStorage.cart_collection;

            $scope.cart_total_item = $scope.view_cart_val.length;

            $scope.manage_cart_total.total_item = $scope.view_cart_val.length;

            var tot = 0;
            var cook_id_coll = [];

            for (var i = 0; i < $scope.view_cart_val.length; i++) {

                if (i == 0) {
                    tot = tot + $scope.view_cart_val[i].food_total_price;
                }
                else {
                    //                    $scope.delivery_charge = $scope.delivery_charge + $scope.delivery_charge_amt;
                    tot = tot + $scope.view_cart_val[i].food_total_price;
                }

                cook_id_coll.push($scope.view_cart_val[i].cook_id);

            }


            var unique = cook_id_coll.filter(function (item, i, ar) { return ar.indexOf(item) === i; });
            console.log('THIS IS UNIQUE ITEMS ');
            console.log(unique);

            $scope.delivery_charge = $scope.delivery_charge * unique.length;
            console.log($scope.delivery_charge);
            $localStorage.delivery_charge = $scope.delivery_charge;

            $scope.manage_cart_total.total_price = tot;
            $scope.manage_cart_total.total_price_final = tot + $scope.delivery_charge;

            //   cook_id_coll.push(cart_coll[i].cook_id);  // For delivery charge
            // }



            $scope.cart_collection = $cookieStore.get('user_cart');
            $scope.cart_data_obj = $scope.cart_collection;
            console.log('FETCHING CART');

            // var d = new Date();
            // var n = d.getTime();
            // var hourDiff = n - $scope.cart_collection[0].order_id;
            // var min = Math.floor((hourDiff / 1000 / 60) << 0);
            // //        var diffHrs = Math.floor((hourDiff % 86400000) / 3600000);
            // if (min > 15) {

            //     console.log('MINIMMMMM DELETE');
            //     delete $localStorage.cart_collection;
            //     $scope.cart_collection = '';
            //     $route.reload();
            // }

        }

    }


    $scope.place_order = function () {

        console.log($localStorage.cart_collection);
    }

    $scope.fetch_avail_by_time_of_food = function () {

        //console.log();
        var str = $('#order_time').val();
        var last2 = str.slice(-2);
        var mid2 = str.substring(3, 5);
        var first2 = str.substring(0, 2);
        var is_time_valid = false;
        console.log(first2);
        console.log('GET CURRENT TIME');
        var today = new Date();
        var dd = today.getHours();

        var curr_hour = today.getHours();
        var curr_min = today.getMinutes();
        var curr_day = today.getDate();

        var selected_order_date = parseInt($('#order_date').val().split("-")[0]);

        var mm = today.getMonth() + 1; //January is 0!

        // var yyyy = today.getFullYear();
        // if (dd < 10) {
        //     dd = '0' + dd;
        // }
        // if (mm < 10) {
        //     mm = '0' + mm;
        // }
        // var today = dd + '-' + mm + '-' + yyyy;

        // var min_d = parseInt(mm) - 1;

        //   $scope.dd.date = today;
        console.log(curr_hour);
        //   console.log( parseInt($('#order_date').val().split("-")[0]));
        // CHECK IF DELIVERY IS SAME DAY..

        // if (curr_day == selected_order_date) {
        //     console.log('SAME DAY DELIVERY');

        //     // NOW CHECK CURRENT TIME WITH SELECTED ORDER TIME
        //     if (parseInt(first2) > 12) {

        //         first2 = first2 + 12;
        //     }
        //     if (parseInt(first2) == 12 || parseInt(first2) < 12) {


        //         if (curr_hour > first2) {

        //             console.log('TIME IS CORRET FOR ORER DELIVERY');
        //         }
        //         else {

        //             console.log('False ORDER DELIVERY');
        //         }


        //     }

        //     //if(curr_hour == parseInt(first2))


        // }


        if (last2 == "pm") {

            if (first2 == 12) {

                last2 = last2.toUpperCase();
                var final_str = first2 + " : " + mid2 + " " + last2;
                console.log(final_str);
                $('#order_time').val(final_str);
            }
            else {



                if (first2 < 20) {


                    first2 = first2 - 12;
                    curr_hour = curr_hour - 12;
                    last2 = last2.toUpperCase();
                    var final_str = first2 + " : " + mid2 + " " + last2;
                    console.log(final_str);


                    if (curr_day == selected_order_date) {

                        if (first2 >= curr_hour) {

                            console.log('TIME IS CORRET FOR ORER DELIVERY');

                        }
                        else {
                            swal("Sorry.. :(", "Invalid Time Selection \n Select Next Hour from Current Hour", "error");
                            $('#order_time').val('');
                            console.log('False ORDER DELIVERY');
                        }
                    }



                }
                if (first2 > 20) {

                    swal("Sorry.. :(", "You Can Select Time Only Between 9:00 AM To 7:00 PM", "error");
                    $('#order_time').val('');
                }
                if (first2 == 20) {

                    swal("Sorry.. :(", "You Can Select Time Only Between 9:00 AM To 7:59 PM", "error");
                    $('#order_time').val('');
                }

            }
        }
        if (last2 == "am") {


            if (first2 > 8) {

                console.log('IT IS VALID AM');

                last2 = last2.toUpperCase();
                var final_str = first2 + " : " + mid2 + " " + last2;
                console.log(final_str);

                // CHECK IF DELIVERY IS SAME DAY..
                if (curr_day == selected_order_date) {

                    if (curr_hour < parseInt(first2)) {

                        console.log('TIME IS CORRET FOR ORER DELIVERY');
                        $('#order_time').val(final_str);

                    }
                    else if (curr_hour > parseInt(first2) || curr_hour == parseInt(first2)) {
                        console.log(first2);
                        console.log(mid2);
                        console.log('False ORDER DELIVERY');
                        swal("Sorry.. :(", "Invalid Time Selection \nSelect Next Hour from Current Hour", "error");
                        $('#order_time').val('');
                    }
                }

                else {

                    // CHECK IF DELIVERY IS NEXT OR FUTURE DAY..

                    $('#order_time').val(final_str);
                }


            }
            if (first2 < 8) {

                console.log('IT IS INVALID AM');
                swal("Sorry.. :(", "You Can Select Time Only Between 9:00 AM To 7:00 PM", "error");
                $('#order_time').val('');
            }


        }



        console.log('TIME CALLLED');
        console.log(first2);



    }


    $scope.checkout_cart_view = {};
    $scope.price_data = {};
    // THIS FUNCTINO LOADS WHEN CHECKOUT PAGE LOADS
    $scope.fetch_cart_coll = function () {

        var cart_coll = [];
        var total_price = 0;
        var grand_total = 0;
        var item_len = 0;

        cart_coll = $cookieStore.get('check_out_coll');

        for (var i = 0; i < cart_coll.length; i++) {

            cart_coll[i].food_total_price = cart_coll[i].food_price * cart_coll[i].food_qty;
            total_price = total_price + cart_coll[i].food_total_price;

            item_len++;
        }



        $scope.checkout_cart_view = cart_coll;
        $scope.price_data.total_price = total_price;
        $scope.price_data.grand_total = total_price + $scope.delivery_charge_amt;
        $scope.price_data.total_items = item_len;


        console.log($scope.checkout_cart_view);
        console.log($scope.price_data);

    }

    $scope.checkout_cart_view = {};
    $scope.price_data = {};
    // THIS FUNCTINO LOADS WHEN CHECKOUT PAGE LOADS
    $scope.fetch_cart_coll = function () {

        var cart_coll = [];
        var total_price = 0;
        var grand_total = 0;
        var item_len = 0;

        cart_coll = $cookieStore.get('check_out_coll');

        for (var i = 0; i < cart_coll.length; i++) {

            cart_coll[i].food_total_price = cart_coll[i].food_price * cart_coll[i].food_qty;
            total_price = total_price + cart_coll[i].food_total_price;

            item_len++;
        }



        $scope.checkout_cart_view = cart_coll;
        $scope.price_data.total_price = total_price;
        $scope.price_data.grand_total = total_price + $scope.delivery_charge_amt;
        $scope.price_data.total_items = item_len;


        console.log($scope.checkout_cart_view);
        console.log($scope.price_data);

    }


    $scope.view_cuisine_details_user = {};
    $scope.fetch_all_cuisine = function () {

        $http({
            method: "GET",
            url: "admin/fetch-all-cuisines",

        }).then(function mySucces(response) {

            console.log('CUISINES');
            $scope.view_cuisine_details_user = response.data;
            //     console.log( $scope.view_delivery_boy);
            console.log(response.data);
        }, function myError(response) {
            console.log('err');
        });

    }


    // BANNER DISPLAY



    $scope.listing_promo_2_detail = {};
    $scope.listing_background_view = {};

    $scope.listing_background_img = {};

    $scope.fetch_listing_promotional_banner = function () {

        $http({
            method: "GET",
            url: "admin/get-listing-promotional-banner",


        }).then(function mySucces(response) {

            //   $scope.view_food_details = response.data;

            //   $scope.view_food_details=


            // $scope.listing_promo_2_detail = response.data[0][0].assined_banner_name;

            var shuffleArray = function (array) {
                var m = array.length, t, i;

                // While there remain elements to shuffle
                while (m) {
                    // Pick a remaining element…
                    i = Math.floor(Math.random() * m--);

                    // And swap it with the current element.
                    t = array[m];
                    array[m] = array[i];
                    array[i] = t;
                }

                // console.log('THIS IS LISITNG BANNERS');
                // console.log($scope.listing_promo_2_detail);
                return array;
            }
            $scope.listing_promo_2_detail = shuffleArray(response.data[0][0].assined_banner_name);
            console.log('THISI IS SUFFLE ARR');
            console.log($scope.listing_promo_2_detail);

            $scope.listing_background_view = response.data[1][0].assined_banner_name[0];
            //  $scope.listing_background_img = response.data;



        }, function myError(response) {


        });

    }

    $scope.open_banner_link = function (link) {

        console.log(link);
        //  window.location.href = link; 
        //  window.location.replace(link);
        $window.open('http://' + link, '_blank');

    }
    // TILL BANNER DISPLAY

    // FOR CART FUNCTIONALITY ADD AND UPDATE CART IN CART PAGES

    //  $scope.cart_collection = [];
    //     // $scope.cart_detail={};
    //     $scope.cart_total_item = "0";
    //     var item_total = 0;
    //     var ts=0;

    $scope.listing_redirect = function () {


        if ($cookieStore.get('s3cr3t_user') != undefined) {

            $location.path('/listing');
        }
        if ($cookieStore.get('s3cr3t_user') == undefined) {

            $location.path('/');
        }

    }

    $scope.delivery_charge_amt = "";
    $scope.fetch_delivery_charge = function () {

        if ($localStorage.cart_collection == undefined) {
            $location.path('/');

        }

        if ($cookieStore.get('cook_logged_in') != undefined) {

            $location.path('/cook_profile');
        }
        else {

            $http({
                method: "GET",
                url: "admin/fetch-global-settings",


            }).then(function mySucces(response) {


                $scope.delivery_charge_amt = parseInt(response.data[0].delivery_charge);
                var gst = parseInt(response.data[0].tax_rate)
                $scope.delivery_charge = $scope.delivery_charge_amt;
                console.log(response.data[0].delivery_charge);
                $scope.fetch_cart();

            }, function myError(response) {


            });

        }


    }

    $scope.increaseItemCount_for_cart_page = function (item) {

        console.log('this is INCREASED ITEM');
        console.log(item);

        console.log($localStorage.cart_collection);
        var flag = 0;
        for (var t = 0; t < $localStorage.cart_collection.length; t++) {

            if ($localStorage.cart_collection[t].food_id == item.food_id) {

                if (item.food_qty > parseInt($localStorage.cart_collection[t].food_max_qty) - 1) {

                    flag = 1;
                    Notification.error({ message: 'You Cannot Order this food ' + $localStorage.cart_collection[t].food_max_qty + ' Per Qty', delay: 3000 });
                    //  alert('You Cannot Order this food '+$scope.food_listing.listing[t].food_max_qty+' Per Qty')
                }

            }
        }

        if (flag == 1) {


        }

        else {

            if (item.food_qty == 0) {


                $scope.manage_cart_total.total_item = $scope.manage_cart_total.total_item + 1;
                $scope.delivery_charge = $scope.delivery_charge + $scope.delivery_charge_amt;
            }
            item.food_qty++;
            var base_price = parseInt(item.food_price);
            console.log('BASE PRICE' + base_price);
            console.log($scope.manage_cart_total);
            var sub_tot_price = base_price * item.food_qty;
            item.food_total_price = sub_tot_price;

            $scope.manage_cart_total.total_price = $scope.manage_cart_total.total_price + base_price;
            $scope.manage_cart_total.total_price_final = $scope.manage_cart_total.total_price + $scope.delivery_charge;

            for (var i = 0; i < $scope.view_cart_val.length; i++) {

                if ($scope.view_cart_val[i].food_id == item.food_id) {

                    $scope.view_cart_val[i].food_qty == item.food_qty;
                }

            }

            $localStorage.cart_collection = $scope.view_cart_val;
            console.log('THIS IS FINAL CRTTT');
            console.log($localStorage.cart_collection);
        }   // else


    };
    $scope.decreaseItemCount_for_cart_page = function (item) {

        if (item.food_qty > 0) {
            item.food_qty--;

            if (item.food_qty != 0) {

                console.log(item);
                var base_price = parseInt(item.food_price);
                //     console.log('BASE PRICE'+base_price);
                //     console.log($scope.manage_cart_total); 
                var sub_tot_price = base_price * item.food_qty;
                item.food_total_price = sub_tot_price;

                $scope.manage_cart_total.total_price = $scope.manage_cart_total.total_price - base_price;

                if (item.food_total_price == 0) {
                    $scope.manage_cart_total.total_item = $scope.manage_cart_total.total_item - 1;
                    $scope.manage_cart_total.total_price_final = $scope.manage_cart_total.total_price;
                    $scope.delivery_charge = $scope.delivery_charge - $scope.delivery_charge;

                }
                else {
                    $scope.manage_cart_total.total_price_final = $scope.manage_cart_total.total_price + $scope.delivery_charge;

                }


                for (var i = 0; i < $scope.view_cart_val.length; i++) {

                    if ($scope.view_cart_val[i].food_id == item.food_id) {

                        $scope.view_cart_val[i].food_qty == item.food_qty;
                    }

                }


                console.log('THIS IS VIEW CART');
                console.log($scope.view_cart_val);
                $localStorage.cart_collection = $scope.view_cart_val;
                console.log('THIS IS FINAL CRTTT');
                console.log($localStorage.cart_collection);
            }
            else {
                item.food_qty++;
                //else not zero
            }


        }


    }

    $scope.remove_item_from_cart = function (food_id, order_id) {

        console.log(order_id);
        var cart = $localStorage.cart_collection;
        var len = cart.length;
        for (var i = 0; i < len; i++) {

            if ($scope.view_cart_val[i].order_id == order_id) {
                console.log($scope.view_cart_val);
                $scope.view_cart_val.splice(i, 1);
                $cookieStore.put('user_cart', $scope.view_cart_val);
                $scope.fetch_cart();
                break;
            }

        }

        // console.log($cookieStore.get('user_cart'));
        // if ($cookieStore.get('user_cart').length > 0) {

        //     $localStorage.cart_collection = $scope.cart_collection;

        // }
        if ($cookieStore.get('user_cart').length == 0) {
            $scope.manage_cart_total.total_price_final = 0;
            delete $localStorage.cart_collection;
        }
        //  $scope.cart_total_item = $scope.cart_collection.length;
        //    console.log('THIS IS CART TOTAL ITEM');
        //      console.log( $scope.cart_total_item);


        $localStorage.cart_collection = $scope.view_cart_val;
        console.log('THIS IS FINAL CRTTT');
        console.log($localStorage.cart_collection);
    }

    // FOR CART FUNCTIONALITY ADD AND UPDATE CART IN CART PAGES


    $scope.toggleSelection_for_serach_radio = function (val) {

        var len = $scope.selection_for_search.length;
        console.log(len);
        for (var i = 0; i < len; i++) {

            if ($scope.selection_for_search[i].hasOwnProperty("group_attr")) {
                $scope.selection_for_search.splice(i, 1);

                console.log($scope.selection_for_search);
                break;
            }
            else {
                $scope.selection_for_search.push(val);
                console.log($scope.selection_for_search);
            }
        }



    }

    $scope.capture_food_id_temp = function (event, food_id, food_name) {

        console.log(food_id);


        $cookieStore.put('food_id', food_id);

        console.log('DYNAMIC URL');
        console.log(food_name);
        var str = food_name.replace(' ', '-');
        $location.path('/detail/' + str);


    }


    // CART FUNCTIONING FOR DETAIL PAGE

    $scope.increaseItemCount_detail = function (item, classkey, cook_id) {
        console.log('MY CAER');
        item.cook_id = cook_id;
        console.log(item);
        console.log(classkey);
        //console.log($scope.menu_view);

        if ($localStorage.cart_collection != undefined) {

            if ($localStorage.cart_collection.length > 0) {

                $scope.cart_collection = $localStorage.cart_collection;

            }
        }

        $timeout(function () {

            delete $localStorage.cart_collection;

        }, 900000);

        var detail_date = $('#' + classkey + item.food_id).val();

        console.log($scope.cart_collection);
        var flag = 0;
        var key = [];
        key = Object.keys($scope.menu_view[0]);
        console.log(key);
        var dd = $scope.menu_view[0][key[0]];

        var another_cook_chk = 0;
        var confirm_another_cook = 0;
        var chk = 0;


        for (var m = 0; m < $scope.menu_view.length; m++) {

            key = Object.keys($scope.menu_view[m]);


            for (var n = 0; n < $scope.menu_view[m][key[0]].length; n++) {

                if (item.cart_qty > parseInt($scope.menu_view[m][key[0]][n].food_max_qty) - 1) {

                    flag = 1;
                    Notification.error({ message: 'You Cannot Order this food ' + $scope.menu_view[m][key[0]][n].food_max_qty + ' Per Qty', delay: 3000 });
                }
                // console.log($scope.menu_view[m][key[0]][n].food_max_qty);

            }

        }

        if (flag == 0) {

            var hasItem = "false";
            var len = $scope.cart_collection.length;

            if (ts == 0) {
                ts = parseInt(item.food_price_per_plate);
            }

            if (len < 1) {


                item.cart_qty++;


                $scope.cart_detail = {};
                $scope.cart_detail.food_id = item.food_id;
                $scope.cart_detail.cook_id = item.cook_id;
                $scope.cart_detail.food_qty = item.cart_qty;
                $scope.cart_detail.food_price = item.food_price_per_plate;
                $scope.cart_detail.food_img = item.food_img;
                $scope.cart_detail.food_cuisine = item.food_cuisine;
                $scope.cart_detail.food_name = item.food_name;
                $scope.cart_detail.food_type = item.food_type;
                $scope.cart_detail.sub_order_status = 'pending';
                $scope.cart_detail.food_total_price = parseInt(item.food_price_per_plate);

                $scope.cart_detail.order_id = Math.floor(Date.now() / 1000),
                    $scope.cart_detail.discount_amt = 0;

                item.order_id = $scope.cart_detail.order_id,

                    item.cart_qty = $scope.cart_detail.food_qty,

                    $scope.cart_detail.order_date = $scope.dd.date,

                    $scope.cart_collection.push($scope.cart_detail);
                console.log($scope.cart_collection);

                Notification.warning({ message: 'Cart Updated..', delay: 1000 });
                console.log(item_total);
            }

            // This is where we check for Different Cook items

            else {

                var hasSameItemWithDiffDate = false;


                var another_cook_chk = 0;
                var confirm_another_cook = 0;
                var chk = 0;
                for (var i = 0; i < len; i++) {

                    console.log($scope.cart_collection[i].cook_id);
                    console.log(item);
                    if ($scope.cart_collection[i].cook_id == item.cook_id) {

                        chk = 1;



                    }


                }
                if (chk == 0) {

                    another_cook_chk = 1;
                }
                if (chk == 1) {

                    another_cook_chk = 0;
                }

                if (another_cook_chk == 1) {

                    swal({
                        title: "Are you sure?",
                        text: "You have Selected Food From Different Cook/Restaurant \n Additional Delivery Charge Will Apply.!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55", confirmButtonText: "Yes, Add it!",
                        cancelButtonText: "No, cancel plz!",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                        function (isConfirm) {
                            if (isConfirm) {

                                swal("Added !", "Your Cart Updated ", "success");
                                confirm_another_cook = 0;
                                test();

                            } else {

                                swal("Cancelled", "Food Removed from your Cart :)", "error");
                                confirm_another_cook = 1;
                            }
                        });
                }

                function test() {

                    if (confirm_another_cook == 0) {


                        for (var i = 0; i < len; i++) {


                            if ($scope.cart_collection[i].food_id == item.food_id && $scope.cart_collection[i].order_date == detail_date) {


                                item.cart_qty = $scope.cart_collection[i].food_qty + 1;

                                hasItem = "true";
                                $scope.cart_collection[i].food_qty = item.cart_qty;
                                item_total = $scope.cart_collection[i].food_price * parseInt(item.cart_qty);
                                $scope.cart_collection[i].food_total_price = item_total;


                            }

                            if ($scope.cart_collection[i].food_id == item._id && $scope.cart_collection[i].order_date != detail_date) {

                                hasItem = "true";
                                hasSameItemWithDiffDate = true;

                            }

                        }

                        if (hasItem == "false") {

                            item.cart_qty++;

                            $scope.cart_detail = {};
                            $scope.cart_detail.food_id = item.food_id;
                            $scope.cart_detail.cook_id = item.cook_id;
                            $scope.cart_detail.food_qty = item.cart_qty;
                            $scope.cart_detail.food_price = item.food_price_per_plate;
                            $scope.cart_detail.food_img = item.food_img;
                            $scope.cart_detail.food_cuisine = item.food_cuisine;
                            $scope.cart_detail.food_name = item.food_name;
                            $scope.cart_detail.food_type = item.food_type;
                            $scope.cart_detail.food_total_price = parseInt(item.food_price_per_plate);

                            $scope.cart_detail.order_id = Math.floor(Date.now() / 1000),
                                $scope.cart_detail.discount_amt = 0;

                            item.order_id = $scope.cart_detail.order_id,

                                item.cart_qty = $scope.cart_detail.food_qty,

                                $scope.cart_detail.order_date = $scope.dd.date,

                                $scope.cart_collection.push($scope.cart_detail);
                        }


                        if (hasSameItemWithDiffDate == true) {




                            item.cart_qty++;
                            $scope.cart_detail = {};
                            $scope.cart_detail.food_id = item.food_id;
                            $scope.cart_detail.cook_id = item.cook_id;
                            $scope.cart_detail.food_qty = item.cart_qty;
                            $scope.cart_detail.food_price = item.food_price_per_plate;
                            $scope.cart_detail.food_img = item.food_img;
                            $scope.cart_detail.food_cuisine = item.food_cuisine;
                            $scope.cart_detail.food_name = item.food_name;
                            $scope.cart_detail.food_type = item.food_type;
                            $scope.cart_detail.food_total_price = parseInt(item.food_price_per_plate);

                            $scope.cart_detail.order_id = Math.floor(Date.now() / 1000),
                                $scope.cart_detail.discount_amt = 0;

                            item.order_id = $scope.cart_detail.order_id,

                                item.cart_qty = $scope.cart_detail.food_qty,

                                $scope.cart_detail.order_date = $scope.dd.date,

                                $scope.cart_collection.push($scope.cart_detail);


                        }

                    }
                    Notification.warning({ message: 'Cart Updated..', delay: 1000 });
                    return;
                }

                if (another_cook_chk == 0) {

                    for (var i = 0; i < len; i++) {


                        if ($scope.cart_collection[i].food_id == item.food_id && $scope.cart_collection[i].order_date == detail_date) {


                            item.cart_qty = $scope.cart_collection[i].food_qty + 1;

                            hasItem = "true";
                            $scope.cart_collection[i].food_qty = item.cart_qty;
                            item_total = $scope.cart_collection[i].food_price * parseInt(item.cart_qty);
                            $scope.cart_collection[i].food_total_price = item_total;


                        }

                        if ($scope.cart_collection[i].food_id == item._id && $scope.cart_collection[i].order_date != detail_date) {

                            hasItem = "true";
                            hasSameItemWithDiffDate = true;

                        }

                    }

                    if (hasItem == "false") {

                        item.cart_qty++;

                        $scope.cart_detail = {};
                        $scope.cart_detail.food_id = item.food_id;
                        $scope.cart_detail.cook_id = item.cook_id;
                        $scope.cart_detail.food_qty = item.cart_qty;
                        $scope.cart_detail.food_price = item.food_price_per_plate;
                        $scope.cart_detail.food_img = item.food_img;
                        $scope.cart_detail.food_cuisine = item.food_cuisine;
                        $scope.cart_detail.food_name = item.food_name;
                        $scope.cart_detail.food_type = item.food_type;
                        $scope.cart_detail.food_total_price = parseInt(item.food_price_per_plate);

                        $scope.cart_detail.order_id = Math.floor(Date.now() / 1000),
                            $scope.cart_detail.discount_amt = 0;

                        item.order_id = $scope.cart_detail.order_id,

                            item.cart_qty = $scope.cart_detail.food_qty,

                            $scope.cart_detail.order_date = $scope.dd.date,

                            $scope.cart_collection.push($scope.cart_detail);
                    }


                    if (hasSameItemWithDiffDate == true) {




                        item.cart_qty++;
                        $scope.cart_detail = {};
                        $scope.cart_detail.food_id = item.food_id;
                        $scope.cart_detail.cook_id = item.cook_id;
                        $scope.cart_detail.food_qty = item.cart_qty;
                        $scope.cart_detail.food_price = item.food_price_per_plate;
                        $scope.cart_detail.food_img = item.food_img;
                        $scope.cart_detail.food_cuisine = item.food_cuisine;
                        $scope.cart_detail.food_name = item.food_name;
                        $scope.cart_detail.food_type = item.food_type;
                        $scope.cart_detail.food_total_price = parseInt(item.food_price_per_plate);

                        $scope.cart_detail.order_id = Math.floor(Date.now() / 1000),
                            $scope.cart_detail.discount_amt = 0;

                        item.order_id = $scope.cart_detail.order_id,

                            item.cart_qty = $scope.cart_detail.food_qty,

                            $scope.cart_detail.order_date = $scope.dd.date,

                            $scope.cart_collection.push($scope.cart_detail);


                    }

                    Notification.warning({ message: 'Cart Updated..', delay: 1000 });
                }






            } // ELSE FOR MULTIPLE LOOP

            $scope.cart_total_item = $scope.cart_collection.length;
            $localStorage.cart_collection = $scope.cart_collection;

        }


    };



    $scope.increaseItemCount_detail_2 = function (item) {
        console.log('MY CAER');
        console.log(item);
        //     console.log(classkey);
        //console.log($scope.menu_view);

        if ($localStorage.cart_collection != undefined) {

            if ($localStorage.cart_collection.length > 0) {

                $scope.cart_collection = $localStorage.cart_collection;

            }
        }

        $timeout(function () {

            delete $localStorage.cart_collection;

        }, 900000);

        //   var detail_date = $('#' + classkey + item.food_id).val();

        console.log($scope.cart_collection);
        var flag = 0;
        var key = [];
        key = Object.keys($scope.menu_view[0]);
        console.log(key);
        var dd = $scope.menu_view[0][key[0]];
        //   console.log(dd);

        //         var flag=0;
        // for (var t = 0; t <$localStorage.cart_collection.length; t++) {

        //     if ($localStorage.cart_collection[t].food_id == item.food_id) {

        //         if (item.food_qty > parseInt($localStorage.cart_collection[t].food_max_qty) - 1) {

        //             flag = 1;
        //             Notification.error({ message: 'You Cannot Order this food ' +$localStorage.cart_collection[t].food_max_qty + ' Per Qty', delay: 3000 });
        //             //  alert('You Cannot Order this food '+$scope.food_listing.listing[t].food_max_qty+' Per Qty')
        //         }

        //     }
        // }

        // if (flag == 1) {


        // }

        for (var m = 0; m < $scope.menu_view.length; m++) {

            key = Object.keys($scope.menu_view[m]);


            for (var n = 0; n < $scope.menu_view[m][key[0]].length; n++) {

                if (item.cart_qty > parseInt($scope.menu_view[m][key[0]][n].food_max_qty) - 1) {

                    flag = 1;
                    Notification.error({ message: 'You Cannot Order this food ' + $scope.menu_view[m][key[0]][n].food_max_qty + ' Per Qty', delay: 3000 });
                }
                // console.log($scope.menu_view[m][key[0]][n].food_max_qty);

            }

        }

        if (flag == 0) {

            var hasItem = "false";
            var len = $scope.cart_collection.length;

            if (ts == 0) {
                ts = parseInt(item.food_price_per_plate);
            }

            if (len < 1) {


                item.cart_qty++;


                $scope.cart_detail = {};
                $scope.cart_detail.food_id = item.food_id;
                $scope.cart_detail.cook_id = item.cook_id;
                $scope.cart_detail.food_qty = item.cart_qty;
                $scope.cart_detail.food_price = item.food_price_per_plate;
                $scope.cart_detail.food_img = item.food_img;
                $scope.cart_detail.food_cuisine = item.food_cuisine;
                $scope.cart_detail.food_name = item.food_name;
                $scope.cart_detail.food_type = item.food_type;
                $scope.cart_detail.sub_order_status = 'pending';
                $scope.cart_detail.food_total_price = parseInt(item.food_price_per_plate);

                $scope.cart_detail.order_id = Math.floor(Date.now() / 1000),
                    $scope.cart_detail.discount_amt = 0;

                item.order_id = $scope.cart_detail.order_id,

                    item.cart_qty = $scope.cart_detail.food_qty,

                    $scope.cart_detail.order_date = $scope.dd.date,

                    $scope.cart_collection.push($scope.cart_detail);
                console.log($scope.cart_collection);


                console.log(item_total);
            }
            else {

                var hasSameItemWithDiffDate = false;

                for (var i = 0; i < len; i++) {


                    if ($scope.cart_collection[i].food_id == item.food_id) {

                        console.log('CHECKING CART DUPLICACY');
                        console.log($scope.cart_collection[i]);
                        item.cart_qty = $scope.cart_collection[i].food_qty + 1;

                        hasItem = "true";
                        $scope.cart_collection[i].food_qty = item.cart_qty;
                        item_total = $scope.cart_collection[i].food_price * parseInt(item.cart_qty);
                        $scope.cart_collection[i].food_total_price = item_total;


                    }

                    if ($scope.cart_collection[i].food_id == item._id) {

                        hasItem = "true";
                        hasSameItemWithDiffDate = true;

                    }

                }

                if (hasItem == "false") {

                    item.cart_qty++;

                    $scope.cart_detail = {};
                    $scope.cart_detail.food_id = item.food_id;
                    $scope.cart_detail.cook_id = item.cook_id;
                    $scope.cart_detail.food_qty = item.cart_qty;
                    $scope.cart_detail.food_price = item.food_price_per_plate;
                    $scope.cart_detail.food_img = item.food_img_for_web;
                    $scope.cart_detail.food_cuisine = item.food_cuisine;
                    $scope.cart_detail.food_name = item.food_name;
                    $scope.cart_detail.food_type = item.food_type;
                    $scope.cart_detail.food_total_price = parseInt(item.food_price_per_plate);

                    $scope.cart_detail.order_id = Math.floor(Date.now() / 1000),
                        $scope.cart_detail.discount_amt = 0;

                    item.order_id = $scope.cart_detail.order_id,

                        item.cart_qty = $scope.cart_detail.food_qty,

                        $scope.cart_detail.order_date = $scope.dd.date,

                        $scope.cart_collection.push($scope.cart_detail);
                }


                if (hasSameItemWithDiffDate == true) {




                    item.cart_qty++;
                    $scope.cart_detail = {};
                    $scope.cart_detail.food_id = item.food_id;
                    $scope.cart_detail.cook_id = item.cook_id;
                    $scope.cart_detail.food_qty = item.cart_qty;
                    $scope.cart_detail.food_price = item.food_price_per_plate;
                    $scope.cart_detail.food_img = item.food_img_for_web;
                    $scope.cart_detail.food_cuisine = item.food_cuisine;
                    $scope.cart_detail.food_name = item.food_name;
                    $scope.cart_detail.food_type = item.food_type;
                    $scope.cart_detail.food_total_price = parseInt(item.food_price_per_plate);

                    $scope.cart_detail.order_id = Math.floor(Date.now() / 1000),
                        $scope.cart_detail.discount_amt = 0;

                    item.order_id = $scope.cart_detail.order_id,

                        item.cart_qty = $scope.cart_detail.food_qty,

                        $scope.cart_detail.order_date = $scope.dd.date,

                        $scope.cart_collection.push($scope.cart_detail);


                }
            }

            $scope.cart_total_item = $scope.cart_collection.length;
            $localStorage.cart_collection = $scope.cart_collection;
            Notification.warning({ message: 'Cart Updated..', delay: 1000 });



        }





    };




    $scope.decreaseItemCount_detail = function (item, classkey) {

        if (item.cart_qty > 0) {
            item.cart_qty--;


            var len = $scope.cart_collection.length;
            console.log(len);

            for (var j = 0; j < len; j++) {


                if ($scope.cart_collection[j].food_id == item.food_id && $scope.cart_collection[j].order_id == item.order_id) {
                    if ($scope.cart_collection[j].food_qty > 0) {
                        $scope.cart_collection[j].food_qty = $scope.cart_collection[j].food_qty - 1;
                        item_total = $scope.cart_collection[j].food_price * parseInt($scope.cart_collection[j].food_qty);

                    }
                    if ($scope.cart_collection[j].food_qty == 0) {

                        $scope.cart_collection.splice(j, 1);
                    }
                }
            }
            //     $scope.cart_collection.splice(i, 1);


        }
        $scope.cart_total_item = $scope.cart_collection.length;


        //    $cookieStore.put('user_cart', $scope.cart_collection);
        Notification.info({ message: 'Cart Updated..', delay: 1000 });

    }

    // CART FUNCTIONING FOR DETAIL PAGE

    $scope.food_detail_page_banner_view = {};
    $scope.fetch_food_detail_banner = function () {

        if ($cookieStore.get('cook_logged_in') != undefined) {

            $location.path('/cook_profile');
        }
        else {

            $http({
                method: "GET",
                url: "admin/fetch-food-detail-banner",


            }).then(function mySucces(response) {

                console.log('DETAIL PAGE BANNER');
                console.log(response.data.assined_banner_name);
                $scope.food_detail_page_banner_view = response.data.assined_banner_name[0];


            }, function myError(response) {


            });

        }



    }


    $scope.fetched_food_view = {};
    $scope.menu_view = [];
    $scope.day = [];
    $scope.day_obj = {};
    $scope.food_highlight_show = {};
    $scope.captured_food_id_fetch = function () {


        $scope.u = {};
        $scope.u.food_id = $cookieStore.get('food_id');


        $http({
            method: "POST",
            url: "user/fetch-food-by-id",
            data: $scope.u
        }).then(function mySucces(response) {


            //    $scope.cart_collection = $localStorage.cart_collection;

            console.log(response);

            if ($localStorage.cart_collection != undefined && $localStorage.cart_collection.length > 0) {


                console.log('THIS IS LOCAL STORAGE');
                console.log($localStorage.cart_collection.length);
                $scope.show_suggestive_cart = true;
                $scope.cart_collection = $localStorage.cart_collection;

                var d = new Date();
                var n = d.getTime();
                var hourDiff = n - $scope.cart_collection[0].order_id;
                var min = Math.floor((hourDiff / 1000 / 60) << 0);

                if (min > 15) {

                    console.log('MINIMMMMM DELETE');
                    delete $localStorage.cart_collection;
                    $scope.cart_collection = '';
                    $route.reload();
                }
            }


            $scope.fetched_food_view = response.data.food;



            var m_arr = [];

            //  new Date().toString();
            var dt1 = new Date().toString();
            var dt2 = dt1.split(' ');
            var dt3 = parseInt(dt2[2]) - 1;
            dt2[2] = dt3.toString();
            var dd = dt2.join(' ');
            $scope.min_date_for_listing = dd;

            console.log('MINNNNNN DATE');


            var m_len = Object.keys(response.data.menu_details).length;



            for (var item in Object.keys(response.data.menu_details)) {
                let val = Object.keys(response.data.menu_details)[item];
                console.log('INNER CHECK');
                //console.log(response.data.menu_details[val][0].food_id);

                if (response.data.menu_details[val][0].food_id == $scope.u.food_id) {

                    $scope.food_highlight_show = response.data.menu_details[val][0];
                    console.log('FOOD FOUND');
                    console.log($scope.food_highlight_show);
                }

                var temp = {};
                temp[val] = response.data.menu_details[val];
                m_arr.push(temp);

            }


            console.log('THIS IS DETAIL PAGE');
            console.log(m_arr);

            $scope.menu_view = m_arr;



        }, function myError(response) {



        });

    }


    $scope.review_all_panel_show = false;

    $scope.review_show_all = {};
    $scope.review_panel_show = function (review) {
        $scope.review_all_panel_show = true;

        console.log('ALL REVIEW');
        console.log(review);
        $scope.review_show_all = review;
    }
    $scope.review_panel_close = function () {
        $scope.review_all_panel_show = false;

    }

    // CHECKOUT PAGE ALL FUNCTIONING

    $scope.user_add_checkout = {};

    $scope.show_pay_mode_cod = false;
    $scope.show_pay_mode_online = false;
    $scope.show_pay_mode_wallet = false;

    $scope.login_check_checkout = function () {

        console.log('TESTING LOGIN LOGOUT');
        console.log($cookieStore.get('s3cr3t_user'));

        if ($cookieStore.get('s3cr3t_user') != undefined) {
            $scope.login_check_checkout_page = false;
            //  $scope.show_delivery_addr_checkout = true;
            $scope.show_review_order_checkout = true;

        }
        else {

            $scope.login_check_checkout_page = true;
            //   $scope.show_delivery_addr_checkout = false;
            $scope.show_review_order_checkout = false;
        }

        $scope.u = {};
        $scope.u.user_id = $cookieStore.get('s3cr3t_user');
        $http({
            method: "POST",
            url: "user/get-user-address",
            data: $scope.u
        }).then(function mySucces(response) {

            $scope.user_add_checkout = response.data[0].address;


            if ($scope.user_add_checkout.length > 0) {

                $scope.show_delivery_addr_checkout = false;
            }
            console.log('THIS IS USER ADD');
            console.log($scope.user_add_checkout);
        }, function myError(response) {


        });
    }


    $scope.show_pay_mode_checkout = function (mode) {

        console.log(mode);

        $localStorage.pay_mode = mode;

        if (mode == "cod") {

            $scope.show_pay_mode_cod = true;
            $scope.show_pay_mode_online = false;
            $scope.show_pay_mode_wallet = false;
        }
        if (mode == "wallet") {

            $scope.show_pay_mode_cod = false;
            $scope.show_pay_mode_online = false;
            $scope.show_pay_mode_wallet = true;
        }
        if (mode == "online") {

            $scope.show_pay_mode_cod = false;
            $scope.show_pay_mode_online = true;
            $scope.show_pay_mode_wallet = false;
        }

    }

    $scope.test_show_addr = function () {


        if ($scope.show_delivery_addr_checkout == false) {

            $scope.show_delivery_addr_checkout = true;
        }
        else if ($scope.show_delivery_addr_checkout == true) {

            $scope.show_delivery_addr_checkout = false;
        }
    }

    $scope.user_login_checkout = function (user_login) {


        $scope.u = user_login;


        console.log(user_login);


        $http({
            method: "POST",
            url: "user/user-login",
            data: $scope.u
        }).then(function mySucces(response) {


            console.log(response.data);
            if (response.data.status == "deactivated") {
                sweetAlert("Account Deactivated", "Your Account Has Been Deactivated", "error");
            }
            else if (response.data.status == "unauthorized") {

                sweetAlert("Un Authorized", "Check credentials Again.", "error");

            }
            else {


                setTimeout(function () {
                    swal({
                        title: "Credentials Verified !",
                        text: "Please Review Your Order Details",
                        type: "success",
                        confirmButtonText: "OK"
                    },
                        function (isConfirm) {
                            if (isConfirm) {

                                //$location.path('/cook_profile');
                                $scope.user_login = "";
                                console.log('VERIFIED');
                                $scope.after_success_login_message = true;
                                $cookieStore.put('s3cr3t_user', response.data.data[0]._id);
                                // $cookieStore.put('s3cr3t_user_data', response.data[0]);
                                $localStorage.username = response.data.data[0].username;
                                $route.reload();
                                // $scope.show_review_order_checkout=false;
                                window.location.href = "#/checkout";
                            }
                        });
                }, 100);


            }
        }, function myError(err) {

            sweetAlert("Un Authorized", "Check credentials Again.", "error");
        });





    }


    $scope.add_user_details_checkout = function (user_details) {

        console.log($('#mobile_no').val());
        if ($('#mobile_no').val().length == 10) {

            var num = Math.floor(Math.random() * 900000) + 100000;

            swal({
                title: "Verify OTP",
                text: "Enter Your 6 Digit Verification Code",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputPlaceholder: "Enter OTP"
            },
                function (inputValue) {
                    console.log(parseInt(inputValue));
                    console.log(num);
                    // if (inputValue === false) return false;

                    if (parseInt(inputValue) == num) {

                        swal("Thanks !", "OTP Verified Succeffully", "success");

                        $scope.u = user_details;


                        $http({
                            method: "POST",
                            url: "user/add-user-info",
                            data: $scope.u
                        }).then(function mySucces(response) {

                            console.log(response);
                            $scope.user_details = "";
                            $scope.after_success_reg_message = true;

                            $timeout(function () {
                                $scope.after_success_reg_message = false;

                            }, 6000);



                        }, function myError(response) {

                            //  $scope.already_register_user = true;
                            $(".otp-popup").hide();
                            console.log('THIS IS ERR RESPONSE');

                            console.log(response);
                            if (response.data.error == 'Email Already Registered"') {

                                swal("Error", "Email Already Registered With Us", "error");
                            }
                            if (response.data.error == 'Phone_No Already Registered') {

                                swal("Error", "Contact No. Already Registered With Us", "error");
                            }

                            // $timeout(function () {
                            //     $scope.already_register_user = false;

                            // }, 4000);

                        });


                        return true;
                    }

                    if (parseInt(inputValue) != num) {
                        swal.showInputError("Incorrect OTP.");
                        return false;
                    }

                });


            var to_no = user_details.user_contact_no;
            var message = "Your EatoEato OTP Verification Code is " + num;
            $scope.u = {};
            $scope.u = "http://smsgate.idigitie.com/http-api.php?username=eatoeato&password=idid@1234&senderid=EATOET&route=1&number=" + to_no + "&message=" + message;

            $http({
                method: "GET",
                url: $scope.u

            }).then(function mySucces(response) {


                console.log(response);



            }, function myError(response) {


            });

        }

        else if ($('#mobile_no').val().length == 0) {


            swal("Error", "Contact Number Couldn't be Blank", "error");
        }
        else {
            swal("Error", "Entered Value is not a Contact Number", "error");
        }


    }


    $scope.update_user_address_checkout = function (address_details) {

        $scope.u = address_details;
        $scope.user_address_detail = "";
        $scope.u.user_id = $cookieStore.get('s3cr3t_user');


        $http({
            method: "POST",
            url: "user/user-address-add",
            data: $scope.u
        }).then(function mySucces(response) {

            $scope.getUserAddress();
            console.log('user address updating');
        }, function myError(response) {


        });


    }



    $scope.getUserAddress_checkout = function () {

        $scope.user_id = { user_id: $cookieStore.get('s3cr3t_user') };
        // console.log($scope.user_id);
        $http({
            method: "POST",
            url: "user/get-user-address",
            data: $scope.user_id
        }).then(function mySucces(response) {

            $scope.user_add_checkout = response.data[0].address;
            // if($scope.user_address_list.length >0 ){

            //     $scope.show_delivery_addr_checkout=true;
            // }
            // else{
            //     $scope.show_delivery_addr_checkout=false;
            // }
            console.log(response.data[0].address);
        }, function myError(response) {


        });

    }

    $scope.gst_price = 0;
    $scope.fetch_cart_coll_checkout = function () {


        var d = $cookieStore.get('global_info');


        if ($cookieStore.get('cook_logged_in') != undefined) {

            $location.path('/cook_profile');

        }
        else {


            if ($localStorage.cart_collection == undefined) {

                $location.path('/my_order');
            }

            var cart_coll = [];
            var total_price = 0;
            var grand_total = 0;
            var item_len = 0;

            $scope.delivery_charge2 = parseInt(d.delivery_charge);

            console.log('DELIVERY CHARGE');
            console.log($scope.delivery_charge2);

            var cook_id_coll = [];


            var gst_info = $cookieStore.get('global_info');
            $scope.gst = parseInt(gst_info.tax_rate);
            cart_coll = $localStorage.cart_collection;

            $scope.show_delivery_addr_checkout = false;

            for (var i = 0; i < cart_coll.length; i++) {

                cart_coll[i].food_total_price = cart_coll[i].food_price * cart_coll[i].food_qty;
                total_price = total_price + cart_coll[i].food_total_price;
                item_len++;

                cook_id_coll.push(cart_coll[i].cook_id);  // For delivery charge
            }

            var unique = cook_id_coll.filter(function (item, i, ar) { return ar.indexOf(item) === i; });
            console.log('THIS IS UNIQUE ITEMS ');
            console.log(unique);
            $scope.delivery_charge2 = $scope.delivery_charge2 * unique.length;

            $scope.checkout_cart_view = cart_coll;
            $scope.price_data.total_price = total_price;
            total_price = total_price + $scope.delivery_charge2;
            $scope.gst_price = Math.round((total_price * $scope.gst) / 100);
            //  $scope.gst_price=$scope.delivery_charge+$scope.gst_price;
            total_price = total_price + (total_price * $scope.gst) / 100;

            $scope.price_data.grand_total = Math.round(total_price);
            $scope.price_data.total_items = item_len;

            $scope.cusine_list_checkout = [];
            console.log('THIS IS CEHOUT KAR');
            console.log($scope.checkout_cart_view);
            $scope.checkout_cart_view[0].grand_total = $scope.price_data.grand_total;

            var cus_list_obj = {};
            for (var i = 0; i < $scope.checkout_cart_view.length; i++) {

                for (j = 0; j < $scope.checkout_cart_view[i].food_cuisine.length; j++) {
                    cus_list_obj = {};
                    if ($scope.checkout_cart_view[i].food_cuisine[j].status == "true") {

                        cus_list_obj.cuisine_name = $scope.checkout_cart_view[i].food_cuisine[j].category_name;
                        $scope.cusine_list_checkout.push(cus_list_obj);
                    }


                }
            }

            console.log($scope.cusine_list_checkout);
            $scope.delivery_charge_checkout = 11;

        }



    }

    $scope.promo_detail = {};
    $scope.coupon_success_show = false;
    $scope.retreived_coupon_detail = [];

    $scope.coupon_success_show_status = function (stat) {



        $scope.coupon_success_show = 'Coupon Succeffully Appllied On ' + stat;
        $scope.coupon_success_show = true;

    }

    $scope.cpn_amt = "";
    $scope.check_promo_code = function (data) {


        $scope.u = {};
        $scope.u = data;
        $scope.u.user_id = $cookieStore.get('s3cr3t_user');
        $scope.u.cuisine_list = $scope.cusine_list_checkout;

        console.log($scope.u);
        $http({
            method: "POST",
            url: "user/check-promo-code",
            data: $scope.u
        }).then(function mySucces(response) {

            console.log(response);
            // var res = response.data;
            var retreived_coupon_obj = {};
            if (response.data.status == 'coupon_expired') {

                swal("Coupon Expired !", "Sorry Coupon Has Been Expired !", "error");

            }
            if (response.data.status == 'coupon_invalid') {

                swal("Coupon Invalid !", "Invalid Coupon!", "error");

            }
            if (response.data.status == 'coupon_valid') {

                swal("Coupon Applied !", "Coupon  Successfully Applied !", "success");

                retreived_coupon_obj = response.data.data[0];

                console.log('THIS IS RETRIEVED COUPON');
                console.log(retreived_coupon_obj);
                console.log($scope.checkout_cart_view);
                var coupon_type = retreived_coupon_obj.coupon_discount_operation;

                if (coupon_type == "%") {

                    for (var i = 0; i < retreived_coupon_obj.coupon_cuisine_name.length; i++) {
                        var less_amt;
                        for (var j = 0; j < $scope.checkout_cart_view.length; j++) {

                            for (var s = 0; s < $scope.checkout_cart_view[j].food_cuisine.length; s++) {

                                //    for (var i = 0; i < retreived_coupon_obj.coupon_cuisine_name.length; i++) {


                                if ($scope.checkout_cart_view[j].food_cuisine[s].category_name == retreived_coupon_obj.coupon_cuisine_name[i].category_name) {

                                    if ($scope.checkout_cart_view[j].food_cuisine[s].status == "true") {
                                        less_amt = 0;
                                        less_amt = ($scope.checkout_cart_view[j].food_total_price / 100) * parseInt(retreived_coupon_obj.coupon_discount_amount);
                                        $scope.checkout_cart_view[j].discount_amt = less_amt;
                                        $scope.checkout_cart_view[j].discount_coupon_code = data.promo_code;
                                        $scope.price_data.grand_total = $scope.price_data.grand_total - less_amt;
                                        $scope.price_data.total_price = $scope.price_data.total_price - less_amt;
                                        var gst_info = $cookieStore.get('global_info');
                                        $scope.gst = parseInt(gst_info.tax_rate);
                                        $scope.gst_price = Math.round(($scope.price_data.total_price * $scope.gst) / 100);
                                        //   $scope.cpn_amt = less_amt;
                                        // console.log($scope.checkout_cart_view[i]);
                                        console.log('APPLIED');
                                        $scope.coupon_success_show = true;
                                        console.log($scope.price_data);
                                        //break;
                                    }

                                }
                                //     }
                            }
                        }
                    }

                    var temp_amt = 0;


                    for (var m = 0; m < $scope.checkout_cart_view.length; m++) {


                        temp_amt = temp_amt + $scope.checkout_cart_view[m].discount_amt;
                        $scope.cpn_amt = temp_amt;
                    }

                    console.log('ITS PERCENT')
                }


                if (coupon_type == "-") {

                    var tot_items_count = 0;
                    var divided_amt = 0;
                    var less_amt;

                    for (var i = 0; i < retreived_coupon_obj.coupon_cuisine_name.length; i++) {
                        for (var j = 0; j < $scope.checkout_cart_view.length; j++) {

                            for (var s = 0; s < $scope.checkout_cart_view[j].food_cuisine.length; s++) {

                                //    for (var i = 0; i < retreived_coupon_obj.coupon_cuisine_name.length; i++) {


                                if ($scope.checkout_cart_view[j].food_cuisine[s].category_name == retreived_coupon_obj.coupon_cuisine_name[i].category_name) {

                                    if ($scope.checkout_cart_view[j].food_cuisine[s].status == "true") {


                                        tot_items_count++;

                                    }

                                }
                                //     }
                            }
                        }
                    }

                    divided_amt = parseInt(retreived_coupon_obj.coupon_discount_amount) / tot_items_count;

                    for (var i = 0; i < retreived_coupon_obj.coupon_cuisine_name.length; i++) {

                        for (var j = 0; j < $scope.checkout_cart_view.length; j++) {

                            for (var s = 0; s < $scope.checkout_cart_view[j].food_cuisine.length; s++) {


                                if ($scope.checkout_cart_view[j].food_cuisine[s].category_name == retreived_coupon_obj.coupon_cuisine_name[i].category_name) {

                                    if ($scope.checkout_cart_view[j].food_cuisine[s].status == "true") {


                                        $scope.checkout_cart_view[j].discount_amt = divided_amt;
                                        $scope.price_data.grand_total = $scope.price_data.grand_total - divided_amt;
                                        $scope.cpn_amt = divided_amt;
                                        $scope.checkout_cart_view[j].discount_coupon_code = data.promo_code;
                                        // console.log($scope.checkout_cart_view[i]);
                                        console.log('APPLIED');
                                        $scope.coupon_success_show = true;
                                        console.log($scope.price_data);
                                        //break;
                                    }

                                }
                                //     }
                            }
                        }
                    }
                    console.log('ITS FLAT');
                    console.log(divided_amt);
                }
                console.log('FINAL CART');
                console.log($scope.checkout_cart_view);
                var applied_coupon = {};




            }
            // if (res.status == 'coupon valid') {

        }, function myError(response) {


        });

    };

    $scope.attach_addr_id = function (addr_id) {

        console.log('ADDR INFO');
        //    console.log(addr_id);
        console.log(addr_id);

        //  console.log(food_id);
        //  console.log('ANKUR' + food_id);
        //  console.log($('#' + food_id).val());
        var addr_concat = "";
        var addr_name = "";
        Notification.warning('Address Selected.');
        var delivery_time = $('#order_time').val();
        for (var j = 0; j < $scope.user_add_checkout.length; j++) {

            if ($scope.user_add_checkout[j].address_id == addr_id) {
                //console.log($scope.user_add_checkout[j]);
                addr_concat = $scope.user_add_checkout[j].address_details + " " + $scope.user_add_checkout[j].address_city + " " + $scope.user_add_checkout[j].address_pincode;
                addr_name = $scope.user_add_checkout[j].address_name;
            }
        }

        var gst_info = $cookieStore.get('global_info');

        var delivery_charge = $localStorage.delivery_charge;
        var tax_rate = parseInt(gst_info.tax_rate);

        for (var i = 0; i < $scope.checkout_cart_view.length; i++) {
            // console.log('1');
            //     if ($scope.checkout_cart_view[i].food_id == food_id) {
            //    console.log('2');
            $scope.checkout_cart_view[i].addr_id = addr_id;
            $scope.checkout_cart_view[i].addr_info = addr_concat;
            $scope.checkout_cart_view[i].addr_name = addr_name;
            $scope.checkout_cart_view[i].user_id = $cookieStore.get('s3cr3t_user');
            $scope.checkout_cart_view[i].username = $localStorage.username;

            $scope.checkout_cart_view[i].sub_total = $scope.price_data.total_price;
            $scope.checkout_cart_view[i].grand_total = $scope.price_data.grand_total;




            $scope.checkout_cart_view[i].delivery_charge = delivery_charge;
            $scope.checkout_cart_view[i].tax_rate = tax_rate;
            $scope.checkout_cart_view[i].delivery_time = delivery_time;



            //   }

        }
        //  $("#foodx").find('.list').removeClass('active');
        $('ul').find('.list').removeClass("active");
        $("#" + addr_id).addClass("list active");

        console.log($scope.checkout_cart_view);
    }

    $scope.pay_redirect = function () {

        $location.path('/payu');
    }
    $scope.pay_model = {};


    $scope.pay_satus_show = function () {


    }


    $scope.payment_gateway_wallet_online = function () {


        console.log($localStorage.tempCart);
        var pay_model = {};

        $scope.pay_model.key = "6xXHkii0";
        $scope.pay_model.salt = "iJzAs43wyq";

        $scope.pay_model.payu_base_url = "https://secure.payu.in/_payment";
        //    pay_model.key="";
        $scope.pay_model.txnid = $localStorage.tempCart[0].txnid;
        $scope.pay_model.amount = $localStorage.tempCart[0].rem_amt.toString();
        $scope.pay_model.productinfo = $localStorage.tempCart[0].wallet_amt.toString();
        $scope.pay_model.firstname = $localStorage.tempCart[0].username;
        $scope.pay_model.email = $localStorage.tempCart[0].user_id;

        $scope.pay_model.surl = "http://localhost:3000/user/payu-process-wallet-online";
        $scope.pay_model.furl = "http://localhost:3000/user/payu-process-wallet-online";

        $scope.pay_model.phone = "7428066040";
        $scope.pay_model.service_provider = "payu_paisa";

        var h_string = $scope.pay_model.key + '|' + $scope.pay_model.txnid + '|' + $scope.pay_model.amount + '|' + $scope.pay_model.productinfo + '|' + $scope.pay_model.firstname + '|' + $scope.pay_model.email + '|||||||||||' + $scope.pay_model.salt;
        var has_final_string = sha512(h_string).toString();
        $scope.pay_model.hash = has_final_string;


        // console.log('PAYU DATA');
        // console.log($scope.pay_model);

    }


    $scope.payment_status_for_landingPage = {};
    $scope.check_payment_status = function () {

        console.log('Check Payment Status');
        console.log($route.current.params.status);

        var stat = $route.current.params.status;

        if (stat == 'success') {
            $scope.payment_status_for_landingPage.stat = 'success';
        }

        if (stat == 'failure') {
            $scope.payment_status_for_landingPage.stat = 'failure';
        }


    }


    $scope.payment_gateway_test = function () {


        console.log($localStorage.tempCart);
        var pay_model = {};

        $scope.pay_model.key = "6xXHkii0";
        $scope.pay_model.salt = "iJzAs43wyq";

        $scope.pay_model.payu_base_url = "https://secure.payu.in/_payment";
        //    pay_model.key="";
        $scope.pay_model.txnid = $localStorage.tempCart[0].txnid;
        $scope.pay_model.amount = $localStorage.tempCart[0].grand_total.toString();
        $scope.pay_model.productinfo = '123456789';
        $scope.pay_model.firstname = $localStorage.tempCart[0].username;
        $scope.pay_model.email = "nagendra.qms@gmail.com";

        $scope.pay_model.surl = "http://localhost:3000/user/payu-process";
        $scope.pay_model.furl = "http://localhost:3000/user/payu-process";

        $scope.pay_model.phone = "7428066040";
        $scope.pay_model.service_provider = "payu_paisa";

        var h_string = $scope.pay_model.key + '|' + $scope.pay_model.txnid + '|' + $scope.pay_model.amount + '|' + $scope.pay_model.productinfo + '|' + $scope.pay_model.firstname + '|' + $scope.pay_model.email + '|||||||||||' + $scope.pay_model.salt;
        var has_final_string = sha512(h_string).toString();
        $scope.pay_model.hash = has_final_string;


        // console.log('PAYU DATA');
        // console.log($scope.pay_model);

    }

    $scope.show_pay_page = false;

    $scope.pay_for_order = function (data) {


        console.log(data);
        var headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        $http({
            method: "POST",
            headers: headers,
            url: "https://secure.payu.in/_payment",
            data: data,

        }).then(function mySucces(response) {


            console.log(response);
        }, function myError(response) {


        });
    }
    //$scope.items2 = ["Address One", "Address Two", "Address Three", "Address Four", "Address Five", "Address Six", "Address Seven", "Address Eight", "Address Nine"];
    $scope.pay_now = function () {

        console.log('THISI IS TIME CHEKCk');

        var delivery_time = $('#order_time').val();

        console.log(delivery_time);


        // 1 st CHECK
        if (delivery_time == '') {

            swal("Error", "Please Select Delivery Time .!", "error");
        }
        else {

            // 2 nd CHECK
            if ($localStorage.pay_mode == 'cod') {


                if ($scope.checkout_cart_view[0].hasOwnProperty('grand_total')) {

                    $scope.checkout_cart_view[0].grand_total = $scope.price_data.grand_total;

                }

                var payment_amt = parseInt($scope.checkout_cart_view[0].grand_total);

                var gst_info = $cookieStore.get('global_info');


                var d = $cookieStore.get('global_info');

                var delivery_charge = parseInt(d.delivery_charge);

                console.log('THIS IS DELIVERY CHARGE');
                console.log(delivery_charge);

                var tax_rate = parseInt(gst_info.tax_rate);


                // if (payment_amt > wallet_amt) {

                //     rem_balance = payment_amt - wallet_amt;
                //     swal("Insufficent Balance", "Please Add Rs. " + rem_balance + " More to your Wallet to Complete Payment.", "error");
                // }
                //     if (payment_amt < wallet_amt) {

                console.log('PAYMENT AMOUNT');
                var addr_concat = "";
                var addr_name = "";
                var add_obj = {};
                var is_addr_set_default = false;
                var delivery_time = $('#order_time').val();
                for (var i = 0; i < $scope.checkout_cart_view.length; i++) {

                    if (!$scope.checkout_cart_view[i].hasOwnProperty('addr_info')) {

                        for (var j = 0; j < $scope.user_add_checkout.length; j++) {

                            if ($scope.user_add_checkout[j].address_default == "true") {
                                // console.log('WE HAVE DEFAULT ADDR');
                                addr_concat = $scope.user_add_checkout[j].address_details + " " + $scope.user_add_checkout[j].address_city + " " + $scope.user_add_checkout[j].address_pincode;
                                addr_name = $scope.user_add_checkout[j].address_name;
                                $scope.checkout_cart_view[i].addr_id = $scope.user_add_checkout[j].address_id;

                                $scope.checkout_cart_view[i].addr_info = addr_concat;
                                $scope.checkout_cart_view[i].addr_name = $scope.user_add_checkout[j].address_name;
                                $scope.checkout_cart_view[i].user_id = $cookieStore.get('s3cr3t_user');
                                $scope.checkout_cart_view[i].username = $localStorage.username;
                                //$scope.price_data.total_price;
                                //$scope.price_data.grand_total
                                $scope.checkout_cart_view[i].sub_total = $scope.price_data.total_price;
                                $scope.checkout_cart_view[i].grand_total = $scope.price_data.grand_total;

                                $scope.checkout_cart_view[i].is_addr_set_default = true;
                                $scope.checkout_cart_view[i].delivery_charge = delivery_charge;
                                $scope.checkout_cart_view[i].tax_rate = tax_rate;
                                $scope.checkout_cart_view[i].delivery_time = delivery_time;
                                $scope.checkout_cart_view[i].pay_mode = 'cod';


                                // break;
                            }
                            else {

                                //  $scope.checkout_cart_view[i].is_addr_set_default = false;

                                $scope.checkout_cart_view[i].is_addr_set_default = false;
                                $scope.checkout_cart_view[i].delivery_charge = delivery_charge;
                                $scope.checkout_cart_view[i].tax_rate = tax_rate;
                                $scope.checkout_cart_view[i].delivery_time = delivery_time;
                                $scope.checkout_cart_view[i].pay_mode = 'cod';
                                //Notification.warning('')
                            }
                        }

                    }
                    $scope.checkout_cart_view[i].delivery_charge = delivery_charge;
                    $scope.checkout_cart_view[i].pay_mode = 'cod';
                    $scope.checkout_cart_view[i].delivery_time = delivery_time;
                }

                var is_have_add = false;
                for (var s = 0; s < $scope.checkout_cart_view.length; s++) {


                    if ($scope.checkout_cart_view[s].hasOwnProperty('is_addr_set_default') || $scope.checkout_cart_view[s].hasOwnProperty('addr_info')) {

                        is_have_add = true;
                    }

                }

                if (is_have_add == false) {

                    swal("Address Not Selected", "We didn't found any default address \n Please Select Address ..! !", "error");
                }


                console.log('THISI IS FINAAAL CART');
                console.log($scope.checkout_cart_view);
                if (is_have_add == true) {

                    blockUI.start($localStorage.username + ' , Preparing Your COD Order');




                    $timeout(function () {
                        blockUI.message('Validating Address ...');
                    }, 2000);

                    $timeout(function () {
                        blockUI.message('Merging Foods ...');
                    }, 3000);
                    $timeout(function () {
                        blockUI.stop();
                        swal("Order Placed!", "You Can check your order panel for more details!", "success");

                        //CHECK IF ADDRESS IS SELECTED OR NOT
                        var addr_not_found = false;
                        for (var i = 0; i < $scope.checkout_cart_view.length; i++) {

                            if (!$scope.checkout_cart_view[i].hasOwnProperty('addr_id')) {
                                addr_not_found = true;
                            }

                        }
                        if (addr_not_found == true) {
                            swal("Address Not Selected", "Please Select Address For Each Order !", "error");
                        }


                        if (addr_not_found == false) {

                            //  $scope.checkout_cart_view[0].pay_mode = 'cod';
                            $scope.checkout_cart_view[0].pay_status = 'false';


                            $http({
                                method: "POST",
                                url: "user/pay-now-for-foods",
                                data: $scope.checkout_cart_view
                            }).then(function mySucces(response) {

                                swal("Order Successfull!", "You Can check your order panel for more details!", "success");

                                delete $localStorage.cart_collection;
                                $scope.checkout_cart_view = "";
                                $location.path('/user_order');
                                // // $scope.user_address_list = response.data[0].address;

                            }, function myError(response) {


                            });

                        }

                    }, 4000);

                }
                //  }


            }
            if ($localStorage.pay_mode == 'wallet') {

                if ($scope.checkout_cart_view[0].hasOwnProperty('grand_total')) {

                    $scope.checkout_cart_view[0].grand_total = $scope.price_data.grand_total;

                }

                var payment_amt = parseInt($scope.checkout_cart_view[0].grand_total);
                var wallet_amt = parseInt($scope.curr_user_bal);

                var gst_info = $cookieStore.get('global_info');

                var delivery_charge = $localStorage.delivery_charge;
                var tax_rate = parseInt(gst_info.tax_rate);

                var rem_balance;

                // IF PARTIAL PAYEMNT WITH WALLET ADN ONLINE

                if (payment_amt > wallet_amt) {

                    rem_balance = payment_amt - wallet_amt;

                    //    swal("Insufficent Balance", "Please Add Rs. " + rem_balance + " More to your Wallet to Complete Payment.", "error");


                    if ($scope.checkout_cart_view[0].hasOwnProperty('grand_total')) {

                        $scope.checkout_cart_view[0].grand_total = $scope.price_data.grand_total;

                    }

                    var payment_amt = parseInt($scope.checkout_cart_view[0].grand_total);
                    var wallet_amt = parseInt($scope.curr_user_bal);

                    var gst_info = $cookieStore.get('global_info');

                    var delivery_charge = $localStorage.delivery_charge;
                    var tax_rate = parseInt(gst_info.tax_rate);


                    var addr_concat = "";
                    var addr_name = "";
                    var add_obj = {};
                    var is_addr_set_default = false;
                    for (var i = 0; i < $scope.checkout_cart_view.length; i++) {

                        if (!$scope.checkout_cart_view[i].hasOwnProperty('addr_info')) {

                            for (var j = 0; j < $scope.user_add_checkout.length; j++) {

                                if ($scope.user_add_checkout[j].address_default == "true") {
                                    // console.log('WE HAVE DEFAULT ADDR');
                                    addr_concat = $scope.user_add_checkout[j].address_details + " " + $scope.user_add_checkout[j].address_city + " " + $scope.user_add_checkout[j].address_pincode;
                                    addr_name = $scope.user_add_checkout[j].address_name;
                                    $scope.checkout_cart_view[i].addr_id = $scope.user_add_checkout[j].address_id;

                                    $scope.checkout_cart_view[i].addr_info = addr_concat;
                                    $scope.checkout_cart_view[i].addr_name = $scope.user_add_checkout[j].address_name;
                                    $scope.checkout_cart_view[i].user_id = $cookieStore.get('s3cr3t_user');
                                    $scope.checkout_cart_view[i].username = $localStorage.username;

                                    $scope.checkout_cart_view[i].sub_total = $scope.price_data.total_price;
                                    $scope.checkout_cart_view[i].grand_total = $scope.price_data.grand_total;

                                    $scope.checkout_cart_view[i].is_addr_set_default = true;
                                    $scope.checkout_cart_view[i].delivery_charge = delivery_charge;
                                    $scope.checkout_cart_view[i].tax_rate = tax_rate;
                                    $scope.checkout_cart_view[i].delivery_time = delivery_time;
                                    $scope.checkout_cart_view[i].pay_mode = 'wallet+online';
                                    $scope.checkout_cart_view[i].pay_status = 'false';



                                    // break;
                                }
                                else {


                                }
                            }

                        }

                        $scope.checkout_cart_view[i].pay_mode = 'wallet+online';
                        $scope.checkout_cart_view[i].delivery_charge = delivery_charge;
                        $scope.checkout_cart_view[i].delivery_time = delivery_time;
                        $scope.checkout_cart_view[i].wallet_amt = wallet_amt;
                        $scope.checkout_cart_view[i].rem_amt = rem_balance;
                    }

                    var is_have_add = false;
                    for (var s = 0; s < $scope.checkout_cart_view.length; s++) {


                        if ($scope.checkout_cart_view[s].hasOwnProperty('is_addr_set_default') || $scope.checkout_cart_view[s].hasOwnProperty('addr_info')) {

                            is_have_add = true;
                        }

                    }

                    if (is_have_add == false) {

                        swal("Address Not Selected", "We didn't found any default address \n Please Select Address ..! !", "error");
                    }



                    if (is_have_add == true) {

                        blockUI.start($localStorage.username + ' , Preparing Your Wallet+Online Order');

                        $timeout(function () {
                            blockUI.message('Validating Address ...');
                        }, 2000);

                        $timeout(function () {
                            blockUI.message('Merging Foods ...');
                        }, 3000);
                        $timeout(function () {
                            blockUI.stop();
                            //   swal("Order Placed!", "You Can check your order panel for more details!", "success");

                            //CHECK IF ADDRESS IS SELECTED OR NOT
                            var addr_not_found = false;
                            for (var i = 0; i < $scope.checkout_cart_view.length; i++) {

                                if (!$scope.checkout_cart_view[i].hasOwnProperty('addr_id')) {
                                    addr_not_found = true;
                                }

                            }
                            if (addr_not_found == true) {
                                swal("Address Not Selected", "Please Select Address For Each Order !", "error");
                            }




                            if (addr_not_found == false) {


                                $scope.checkout_cart_view[0].delivery_time = delivery_time;


                                $http({
                                    method: "POST",
                                    url: "user/pay-now-for-foods",
                                    data: $scope.checkout_cart_view
                                }).then(function mySucces(response) {



                                    $localStorage.tempCart = $scope.checkout_cart_view;
                                    $localStorage.tempCart[0].txnid = response.data.data.id;
                                    $location.path('/payu-wallet-online');

                                    // swal("Order Successfull!", "You Can check your order panel for more details!", "success");

                                    delete $localStorage.cart_collection;
                                    $scope.checkout_cart_view = "";
                                    // $location.path('/user_order');
                                    // // $scope.user_address_list = response.data[0].address;
                                    console.log(response.data);
                                }, function myError(response) {


                                });

                            }

                        }, 4000);

                    } // TILL WALLET + ONLINE                    

                }
                if (payment_amt < wallet_amt) {

                    console.log('PAYMENT AMOUNT');
                    var addr_concat = "";
                    var addr_name = "";
                    var add_obj = {};
                    var is_addr_set_default = false;
                    for (var i = 0; i < $scope.checkout_cart_view.length; i++) {
                        console.log('aaa');
                        if (!$scope.checkout_cart_view[i].hasOwnProperty('addr_info')) {

                            for (var j = 0; j < $scope.user_add_checkout.length; j++) {

                                if ($scope.user_add_checkout[j].address_default == "true") {
                                    // console.log('WE HAVE DEFAULT ADDR');
                                    addr_concat = $scope.user_add_checkout[j].address_details + " " + $scope.user_add_checkout[j].address_city + " " + $scope.user_add_checkout[j].address_pincode;
                                    addr_name = $scope.user_add_checkout[j].address_name;
                                    $scope.checkout_cart_view[i].addr_id = $scope.user_add_checkout[j].address_id;

                                    $scope.checkout_cart_view[i].addr_info = addr_concat;
                                    $scope.checkout_cart_view[i].addr_name = $scope.user_add_checkout[j].address_name;
                                    $scope.checkout_cart_view[i].user_id = $cookieStore.get('s3cr3t_user');
                                    $scope.checkout_cart_view[i].username = $localStorage.username;
                                    //$scope.price_data.total_price;
                                    //$scope.price_data.grand_total
                                    $scope.checkout_cart_view[i].sub_total = $scope.price_data.total_price;
                                    $scope.checkout_cart_view[i].grand_total = $scope.price_data.grand_total;

                                    $scope.checkout_cart_view[i].is_addr_set_default = true;
                                    $scope.checkout_cart_view[i].delivery_charge = delivery_charge;
                                    $scope.checkout_cart_view[i].tax_rate = tax_rate;
                                    $scope.checkout_cart_view[i].delivery_time = delivery_time;
                                    $scope.checkout_cart_view[i].pay_mode = 'wallet';
                                    $scope.checkout_cart_view[i].pay_status = 'false';
                                    $scope.checkout_cart_view[i].wallet_amt = wallet_amt;


                                    // break;
                                }
                                else {

                                    //  $scope.checkout_cart_view[i].is_addr_set_default = false;

                                    //Notification.warning('')
                                }
                            }

                        }
                        $scope.checkout_cart_view[i].pay_mode = 'wallet';
                        $scope.checkout_cart_view[i].delivery_time = delivery_time;
                        $scope.checkout_cart_view[i].delivery_charge = delivery_charge;
                    }

                    var is_have_add = false;
                    for (var s = 0; s < $scope.checkout_cart_view.length; s++) {


                        if ($scope.checkout_cart_view[s].hasOwnProperty('is_addr_set_default') || $scope.checkout_cart_view[s].hasOwnProperty('addr_info')) {

                            is_have_add = true;
                        }

                    }

                    if (is_have_add == false) {

                        swal("Address Not Selected", "We didn't found any default address \n Please Select Address ..! !", "error");
                    }


                    console.log('THISI IS FINAAAL CART');
                    console.log($scope.checkout_cart_view);
                    if (is_have_add == true) {

                        blockUI.start($localStorage.username + ' , Preparing Your Order');




                        $timeout(function () {
                            blockUI.message('Validating Address ...');
                        }, 2000);

                        $timeout(function () {
                            blockUI.message('Merging Foods ...');
                        }, 3000);
                        $timeout(function () {
                            blockUI.stop();
                            swal("Order Placed!", "You Can check your order panel for more details!", "success");

                            //CHECK IF ADDRESS IS SELECTED OR NOT
                            var addr_not_found = false;
                            for (var i = 0; i < $scope.checkout_cart_view.length; i++) {

                                if (!$scope.checkout_cart_view[i].hasOwnProperty('addr_id')) {
                                    addr_not_found = true;
                                }

                            }
                            if (addr_not_found == true) {
                                swal("Address Not Selected", "Please Select Address For Each Order !", "error");
                            }


                            if (addr_not_found == false) {

                                console.log($scope.checkout_cart_view);
                                $http({
                                    method: "POST",
                                    url: "user/pay-now-for-foods",
                                    data: $scope.checkout_cart_view
                                }).then(function mySucces(response) {

                                    swal("Order Successfull!", "You Can check your order panel for more details!", "success");

                                    delete $localStorage.cart_collection;
                                    $scope.checkout_cart_view = "";
                                    $location.path('/user_order');
                                    // // $scope.user_address_list = response.data[0].address;
                                    console.log(response.data);
                                }, function myError(response) {


                                });

                            }

                        }, 4000);

                    }
                }


            }

            if ($localStorage.pay_mode == 'online') {


                if ($scope.checkout_cart_view[0].hasOwnProperty('grand_total')) {

                    $scope.checkout_cart_view[0].grand_total = $scope.price_data.grand_total;

                }

                var payment_amt = parseInt($scope.checkout_cart_view[0].grand_total);
                var wallet_amt = parseInt($scope.curr_user_bal);
                console.log($scope.checkout_cart_view);
                console.log(wallet_amt);
                var gst_info = $cookieStore.get('global_info');

                var delivery_charge = $localStorage.delivery_charge;
                var tax_rate = parseInt(gst_info.tax_rate);

                // var rem_balance;
                // if (payment_amt > wallet_amt) {

                //     rem_balance = payment_amt - wallet_amt;
                //     swal("Insufficent Balance", "Please Add Rs. " + rem_balance + " More to your Wallet to Complete Payment.", "error");
                // }
                // if (payment_amt < wallet_amt) {

                console.log('PAYMENT AMOUNT');
                var addr_concat = "";
                var addr_name = "";
                var add_obj = {};
                var is_addr_set_default = false;
                for (var i = 0; i < $scope.checkout_cart_view.length; i++) {
                    console.log('aaa');
                    if (!$scope.checkout_cart_view[i].hasOwnProperty('addr_info')) {

                        for (var j = 0; j < $scope.user_add_checkout.length; j++) {

                            if ($scope.user_add_checkout[j].address_default == "true") {
                                // console.log('WE HAVE DEFAULT ADDR');
                                addr_concat = $scope.user_add_checkout[j].address_details + " " + $scope.user_add_checkout[j].address_city + " " + $scope.user_add_checkout[j].address_pincode;
                                addr_name = $scope.user_add_checkout[j].address_name;
                                $scope.checkout_cart_view[i].addr_id = $scope.user_add_checkout[j].address_id;

                                $scope.checkout_cart_view[i].addr_info = addr_concat;
                                $scope.checkout_cart_view[i].addr_name = $scope.user_add_checkout[j].address_name;
                                $scope.checkout_cart_view[i].user_id = $cookieStore.get('s3cr3t_user');
                                $scope.checkout_cart_view[i].username = $localStorage.username;
                                //$scope.price_data.total_price;
                                //$scope.price_data.grand_total
                                $scope.checkout_cart_view[i].sub_total = $scope.price_data.total_price;
                                $scope.checkout_cart_view[i].grand_total = $scope.price_data.grand_total;

                                $scope.checkout_cart_view[i].is_addr_set_default = true;
                                $scope.checkout_cart_view[i].delivery_charge = '20';
                                $scope.checkout_cart_view[i].tax_rate = tax_rate;
                                $scope.checkout_cart_view[i].delivery_time = delivery_time;
                                $scope.checkout_cart_view[i].pay_mode = 'wallet';
                                $scope.checkout_cart_view[i].pay_status = 'false';
                                $scope.checkout_cart_view[i].wallet_amt = wallet_amt;


                                // break;
                            }
                            else {

                                //  $scope.checkout_cart_view[i].is_addr_set_default = false;

                                //Notification.warning('')
                            }
                        }

                    }

                    $scope.checkout_cart_view[i].pay_mode = 'online';
                    $scope.checkout_cart_view[i].delivery_time = delivery_time;
                    $scope.checkout_cart_view[i].delivery_charge = delivery_charge;
                }

                var is_have_add = false;
                for (var s = 0; s < $scope.checkout_cart_view.length; s++) {


                    if ($scope.checkout_cart_view[s].hasOwnProperty('is_addr_set_default') || $scope.checkout_cart_view[s].hasOwnProperty('addr_info')) {

                        is_have_add = true;
                    }

                }

                if (is_have_add == false) {

                    swal("Address Not Selected", "We didn't found any default address \n Please Select Address ..! !", "error");
                }


                console.log('THISI IS FINAAAL CART');
                console.log($scope.checkout_cart_view);
                if (is_have_add == true) {

                    blockUI.start($localStorage.username + ' , Preparing Your Order');




                    $timeout(function () {
                        blockUI.message('Validating Address ...');
                    }, 2000);

                    $timeout(function () {
                        blockUI.message('Merging Foods ...');
                    }, 3000);
                    $timeout(function () {
                        blockUI.stop();
                        //   swal("Order Placed!", "You Can check your order panel for more details!", "success");

                        //CHECK IF ADDRESS IS SELECTED OR NOT
                        var addr_not_found = false;
                        for (var i = 0; i < $scope.checkout_cart_view.length; i++) {

                            if (!$scope.checkout_cart_view[i].hasOwnProperty('addr_id')) {
                                addr_not_found = true;
                            }

                        }
                        if (addr_not_found == true) {
                            swal("Address Not Selected", "Please Select Address For Each Order !", "error");
                        }




                        if (addr_not_found == false) {

                            console.log('THISI IS LAST CHECK ');

                            $scope.checkout_cart_view[0].delivery_time = delivery_time;
                            console.log($scope.checkout_cart_view);
                            $http({
                                method: "POST",
                                url: "user/pay-now-for-foods",
                                data: $scope.checkout_cart_view
                            }).then(function mySucces(response) {


                                console.log(response);
                                $localStorage.tempCart = $scope.checkout_cart_view;
                                $localStorage.tempCart[0].txnid = response.data.data.id;
                                $location.path('/payu');

                                // swal("Order Successfull!", "You Can check your order panel for more details!", "success");

                                delete $localStorage.cart_collection;
                                $scope.checkout_cart_view = "";
                                // $location.path('/user_order');
                                // // $scope.user_address_list = response.data[0].address;
                                console.log(response.data);
                            }, function myError(response) {


                            });

                        }

                    }, 4000);

                }
                //       }


            }

        }



        //   console.log($scope.checkout_cart_view);


    }

    $scope.user_review_temp_data = {};
    $scope.show_rate_now = function (food_id, cook_id, order_id, food_name) {


        //   $("#rate-btn").click(function () {
        $(".review-popup-feed").show();
        //  });

        $scope.user_review_temp_data.food_id = food_id
        $scope.user_review_temp_data.food_name = food_name;
        $scope.user_review_temp_data.cook_id = cook_id;
        $scope.user_review_temp_data.order_id = order_id;
        console.log($scope.user_review_temp_data);

    }

    $scope.view_open_order_user = {};
    $scope.view_open_order_user_hold = {};
    $scope.user_all_order_stat = {};
    $scope.get_user_open_order = function () {

        console.log('ORDER VIEW');
        $scope.u = {};
        $scope.u.user_id = $cookieStore.get('s3cr3t_user');
        console.log('THIS IS OPEN ORDER');
        console.log($scope.u);
        $http({
            method: "POST",
            url: "user/get-user-open-order-by-id",
            data: $scope.u
        }).then(function mySucces(response) {


            //$scope.view_open_order_user
            $scope.view_open_order_user = response.data;
            var tot = 0;
            var cancel_order = 0
            var delivered_order = 0;
            var open_order = 0;
            for (var i = 0; i < response.data.length; i++) {
                tot = 0;
                if (response.data[i].order_status == 'pending' || response.data[i].order_status == 'confirmed' || response.data[i].order_status == 'ready_for_del') {
                    open_order++;
                }
                if (response.data[i].order_status == 'cancelled') {
                    cancel_order++;
                }
                if (response.data[i].order_status == 'delivered') {
                    delivered_order++;
                }
                for (var j = 0; j < response.data[i].items.length; j++) {


                    tot = response.data[i].items[j].food_total_price + tot;
                    $scope.view_open_order_user[i].order_total = tot;

                }

            }
            $scope.user_all_order_stat.open_order = open_order;
            $scope.user_all_order_stat.cancel_order = cancel_order;
            $scope.user_all_order_stat.delivered_order = delivered_order;

            console.log('THIS IS TOTAL');
            console.log($scope.view_open_order_user);
            // $scope.view_open_order_user_hold = response.data;
            console.log('THIS IS OPEN ORDER RESPONSE');

            console.log($scope.view_open_order_user);
        }, function myError(response) {


        });

    }

    $scope.filter_user_order_by_date = function (data) {


        var incoming_date, date_frm, date_to;

        var temp = data.date.split("-");
        var incoming_date = parseInt(temp[0]);

        var comp_date1, comp_date2;
        var is_found = false;
        var temp_arr = [];
        for (var i = 0; i < $scope.view_open_order_user.length; i++) {

            comp_date1 = $scope.view_open_order_user[i].date.split("/");
            comp_date2 = parseInt(comp_date1[0]);

            if (comp_date2 == incoming_date) {

                console.log('Found');
                temp_arr.push($scope.view_open_order_user[i]);
                is_found = true;
            }
            // if(comp_date2 != incoming_date){

            //     console.log('Not Found');
            // }


        }

        if (is_found == true) {

            $scope.view_open_order_user = temp_arr;
            Notification.info({ message: 'Order Found ' + data.date, delay: 1000 });
        }
        if (is_found == false) {

            $scope.view_open_order_user = $scope.view_open_order_user_hold;
            Notification.warning({ message: 'No Order Found On ' + data.date, delay: 5000 });

        }


    }

    $scope.user_review_detail = {};
    $scope.save_user_review = function (data) {
        console.log($scope.user_review_temp_data)
        $scope.u = {};
        $scope.u.user_id = $cookieStore.get('s3cr3t_user');
        $scope.u.food_id = $scope.user_review_temp_data.food_id;
        $scope.u.food_name = $scope.user_review_temp_data.food_name;
        $scope.u.cook_id = $scope.user_review_temp_data.cook_id;
        $scope.u.review_title = data.review_title;
        $scope.u.review_desc = data.review_desc;
        $scope.u.review_rating = data.review_rating;
        $scope.u.order_id = $scope.user_review_temp_data.order_id;
        $scope.u.username = $localStorage.username;

        console.log($scope.u);

        $http({
            method: "POST",
            url: "user/save-user-review",
            data: $scope.u
        }).then(function mySucces(response) {


            if (response.data.status == "Review Already Added") {

                swal("Already Added", "You have already added review for this food.", "error");
                $scope.user_review_detail = "";
            }
            if (response.data.status == "success") {

                swal("Review Added", "Review Succeffully Added.!", "success");
                $scope.user_review_detail = "";
            }

            console.log(response);
        }, function myError(response) {


        });

    }

    $scope.user_review_info = {};
    $scope.user_name = "";
    $scope.fetch_user_review = function () {

        $scope.u = {};
        $scope.u.user_id = $cookieStore.get('s3cr3t_user');

        $http({
            method: "POST",
            url: 'user/view-user-review',
            data: $scope.u
        }).then(function mySucces(response) {

            console.log('USER REVIEW');
            console.log(response)
            $scope.user_review_info = response.data;
            $scope.user_name = $localStorage.username;
        }, function myError(response) {


        });

    }

    $scope.forget_user_detail = {};
    $scope.forget_user_password = function (contact_no) {


        $scope.u = {};
        $scope.u.user_contact_no = contact_no.user_contact_no;

        $localStorage.user_contact_no = contact_no.user_contact_no;


        console.log($scope.u);
        $http({
            method: "POST",
            url: 'user/user-contact-validate',
            data: $scope.u

        }).then(function mySucces(response) {

            console.log(response);

            if (response.data.status == 'Not Registered') {

                swal("Invalid Contact", "Contact No. Not Registered With Us", "error");
            }
            else {

                console.log('VALID CONTACT');
                if ($('#mobile_no').val().length == 10) {


                    var num = Math.floor(Math.random() * 900000) + 100000;

                    var to_no = parseInt($scope.u.cook_contact_no);
                    var message = "Your EatoEato OTP Verification Code is " + num;
                    $scope.u = {};
                    $scope.u = "http://smsgate.idigitie.com/http-api.php?username=eatoeato&password=idid@1234&senderid=EATOET&route=1&number=" + to_no + "&message=" + message;

                    $http({
                        method: "GET",
                        url: $scope.u

                    }).then(function mySucces(response) {


                        console.log(response);


                    }, function myError(response) {

                        $(".otp-popup").show();
                    });

                }

                else if ($('#mobile_no').val().length == 0) {


                    swal("Error", "Contact Number Couldn't be Blank", "error");
                }
                else {
                    swal("Error", "Entered Value is not a Contact Number", "error");
                }

            }


        }, function myError(response) {


        });



    }

    $scope.verify_user_otp_forget_pass = function (data) {

        console.log($localStorage.otp_val);

        if (parseInt(data.otp) == $localStorage.otp_val) {


            $(".otp-popup").hide();
            swal({
                title: "Password Update",
                text: "Please Enter Your New Password",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputPlaceholder: "Enter Your New Password"
            },
                function (inputValue) {
                    if (inputValue === false) return false;

                    if (inputValue === "") {
                        swal.showInputError("You need to write something!");
                        return false
                    }

                    else {
                        $scope.y = {};
                        $scope.y.user_contact_no = $localStorage.user_contact_no;
                        $scope.y.user_new_pass = inputValue;

                        $http({
                            method: "POST",
                            url: 'user/user-forget-pass-update',
                            data: $scope.y
                        }).then(function mySucces(response) {



                            if (response.data.status == "Password Successfully Updated") {

                                swal("Password Updated", "You Can Login With New Password Now", "success");
                                $location.path('/user_login')
                            }
                            else {
                                swal("Error", "Something Bad Happen.. Try Again Later", "error");


                            }


                        }, function myError(response) {


                        });
                        return true;
                    }

                });


        }
        if (data == '') {

            $scope.empty_otp = true;
            $timeout(function () {

                $scope.empty_otp = false;
            }, 2000);

        }
        if (parseInt(data.otp) != $localStorage.otp_val) {

            $scope.incorr_otp = true;
            $timeout(function () {

                $scope.incorr_otp = false;

            }, 2000);
        }

    }

    $scope.fb_login_user = function () {

        FB.login(function (response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', {
                    fields: 'email,name,gender'
                }, function (response) {
                    console.log('Good to see you, ' + response.name + '.');

                    swal({
                        title: "Hi, " + response.name,
                        text: "We Also Need Your Contact No.",
                        type: "input",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        animation: "slide-from-top",
                        inputPlaceholder: "Enter Contact No."
                    },
                        function (inputValue) {
                            if (inputValue === false) return false;

                            if (inputValue === "") {
                                swal.showInputError("You need to write something!");
                                return false
                            }

                            swal("Nice!", "You wrote: " + inputValue, "success");
                        });


                    console.log(response);
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });

    }

    $scope.GetAddress_ForListing = function () {



        var tt = "";
        $scope.locate_val = "Test Me";

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(function (p) {
                LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
                var mapOptions = {
                    center: LatLng,
                    zoom: 13,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                GetAddress(p.coords.latitude, p.coords.longitude, LatLng);

                blockUI.start('Changing Location');




                $timeout(function () {
                    blockUI.message('Please Wait ...');
                }, 1000);

                // $timeout(function () {
                //     blockUI.message('Please Wait 2....');
                // }, 2000);
                $timeout(function () {
                    blockUI.stop();

                    console.log(p.coords.latitude);
                    console.log(p.coords.longitude);
                    $scope.u = {};
                    $scope.u.lat = p.coords.latitude;
                    $scope.u.long = p.coords.longitude;

                    $cookieStore.put('user_lat_long', $scope.u);
                    $scope.get_foods_for_listing();

                }, 2000);


            });
        } else {
            alert('Geo Location feature is not supported in this browser.');

        }

        function GetAddress(lat, lng, add) {

            var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': add }, function (results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {

                        // results[0].address_components[1].short_name+','+

                        tt = results[0].address_components[2].short_name;
                        //	console.log(results[0].address_components[1].short_name+','+results[0].address_components[2].long_name);
                        $("#location").text(tt);
                        $("#autocomplete").val(results[1].formatted_address);
                        $.cookie('eatoeato.loc', results[0].address_components[2].long_name);
                        $localStorage.user_loc_name = results[0].address_components[2].long_name;
                        $scope.loc_show = results[0].address_components[2].long_name;

                        //  $.cookie('user_lat_lon', results);

                        // setTimeout(
                        //     function () {
                        //         console.log('REDIRECTING');
                        //         window.location.href = '#/listing';
                        //     }, 2000);

                        console.log(tt);
                    }
                }
            });
        }



    }


    $scope.selected_location_for_listing = function (loc) {
        //       console.log($.cookie('eatoeato.loc'));
        $(".overlay").hide();
        $(".location-switch").removeClass("active");
        console.log('SELECTING LOCATION');
        console.log($scope.loc_show);

        blockUI.start('Changing Location');
        $timeout(function () {
            blockUI.message('Fetching Foods ...');
        }, 1000);

        $timeout(function () {
            blockUI.stop();
        }, 2000);
        console.log(loc);
        if (loc == '') {
            console.log('Location is null');
        }
        else {
            var geocoder = new google.maps.Geocoder();
            var address = $.cookie('eatoeato.loc');




            $timeout(function () {
                var formatted_address = $.cookie('formatted_addr');
                console.log(formatted_address);

                geocoder.geocode({ 'address': formatted_address }, function (results, status) {

                    if (status == google.maps.GeocoderStatus.OK) {
                        var latitude = results[0].geometry.location.lat();
                        var longitude = results[0].geometry.location.lng();

                        // console.log('THIS IS FORMATTED ONE ');
                        //  console.log(results[0]);
                        $localStorage.user_loc_name = results[0].address_components[0].long_name;

                        $scope.u = {};
                        $scope.u.lat = latitude;
                        $scope.u.long = longitude;

                        $cookieStore.put('user_lat_long', $scope.u);

                        console.log('this is USER');
                        $scope.get_foods_for_listing();
                        //   window.location.href = '#/listing';
                        //       //  console.log(results[0] );
                        //          $timeout(function () {


                        // }, 3000);

                    }
                });

            }, 1000);

        }




    }

    $scope.sort_option_for_listing_page = [{
        name: '--Sort By--',
        value: ''
    },
    {
        name: 'Price (low to high)',
        value: 'food_price_per_plate'
    }, {
        name: 'Price (high to low)',
        value: '-food_price_per_plate'
    }];


    $scope.user_wallet = {};
    $scope.curr_user_bal = "";
    $scope.add_money_to_user_wallet = function (amt) {

        console.log(amt);
        $scope.u = {};
        $scope.u.wallet_amount = amt.wallet_amount;
        $scope.u.user_id = $cookieStore.get('s3cr3t_user');;

        $localStorage.wallet_amt_req = amt.wallet_amount;

        $location.path('/wallet_payu');
        // $http({
        //     method: "POST",
        //     url: 'user/add-money-to-wallet',
        //     data: $scope.u
        // }).then(function mySucces(response) {


        //     console.log(response);
        //     swal("Rs. " + amt.wallet_amount + " Successfully Added to Your Wallet", "", "success");
        //     $scope.get_user_wallet_info();

        // }, function myError(response) {


        // });

    }

    $scope.payment_gateway_wallet = function () {

        $scope.pay_model.key = "6xXHkii0";
        $scope.pay_model.salt = "iJzAs43wyq";

        $scope.pay_model.payu_base_url = "https://secure.payu.in/_payment";
        //    pay_model.key="";
        $scope.pay_model.txnid = $cookieStore.get('s3cr3t_user');
        $scope.pay_model.amount = $localStorage.wallet_amt_req;
        $scope.pay_model.productinfo = '123456789';
        $scope.pay_model.firstname = $localStorage.username;
        $scope.pay_model.email = "nagendra.qms@gmail.com";

        $scope.pay_model.surl = "http://localhost:3000/user/payu-wallet-process";
        $scope.pay_model.furl = "http://localhost:3000/user/payu-wallet-process";

        $scope.pay_model.phone = "7428066040";
        $scope.pay_model.service_provider = "payu_paisa";

        var h_string = $scope.pay_model.key + '|' + $scope.pay_model.txnid + '|' + $scope.pay_model.amount + '|' + $scope.pay_model.productinfo + '|' + $scope.pay_model.firstname + '|' + $scope.pay_model.email + '|||||||||||' + $scope.pay_model.salt;
        var has_final_string = sha512(h_string).toString();
        $scope.pay_model.hash = has_final_string;


    }

    $scope.get_user_wallet_info = function () {

        // console.log(amt);
        $scope.u = {};

        $scope.u.user_id = $cookieStore.get('s3cr3t_user');

        $http({
            method: "POST",
            url: 'user/fetch-user-wallet',
            data: $scope.u
        }).then(function mySucces(response) {

            $scope.user_wallet = response.data[0];
            $scope.curr_user_bal = response.data[0].wallet_amount;
            $scope.user_wallet.wallet_amount = "";
            console.log(response);


        }, function myError(response) {


        });

    }




    // $scope.items = [1, 2, 3, 4, 5, 6, 7, 8];
    // $scope.properties = {
    //     items: 2,
    //     onChange: function () {
    //         console.dir(arguments);
    //     }
    // };
    // $scope.ready = function ($api) {
    //     owlAPi = $api;
    // };

    // $timeout(function () {
    //     console.dir(owlAPi);
    //     owlAPi.trigger('next.owl.carousel', [2000]);
    // }, 2000)

    // $scope.track_order_stat_by_id_user = function (order_id) {


    //         $scope.u = {};
    //         $scope.u.order_id = order_id;


    //         console.log($scope.u);

    //         $http({
    //             method: "POST",
    //             url: "admin/track-order-stat-by-id",
    //             data: $scope.u
    //         }).then(function mySucces(response) {

    //             console.log('THIS IS USER ORDER ')
    //             console.log(response.data);


    //             // for (var i = 0; i < response.data.length; i++) {

    //             //     for (var j = 0; j < $scope.view_all_order_detail_page.items.length; j++) {

    //             //         if ($scope.view_all_order_detail_page.items[j].order_id == response.data[i].sub_order_id) {

    //             //             $scope.view_all_order_detail_page.items[j].sub_order_stat = response.data[i].sub_order_status;
    //             //             $scope.view_all_order_detail_page.items[j].track_order = response.data[i].order_history;
    //             //         }
    //             //     }
    //             // }

    //             console.log($scope.view_all_order_detail_page);

    //         }, function myError(response) {
    //             console.log('err');
    //         });

    //     }

}]);

/*******************************ADMIN CONTROLLER*************************** */

app.controller('admin_controller', ['$scope', '$http', '$rootScope', '$timeout', '$base64', 'cfpLoadingBar', 'Notification', '$cookieStore', '$location', '$localStorage', 'blockUI', function ($scope, $http, $rootScope, $timeout, $base64, cfpLoadingBar, Notification, $cookieStore, $location, $localStorage, blockUI) {
    $rootScope.stylesheets = "";
    $rootScope.stylesheets = [
        { href: '../../pages/admin/css/reset.css', type: 'text/css' },
        { href: '../../../pages/admin/css/style.css', type: 'text/css' },
        { href: '../../pages/admin/css/media.css', type: 'text/css' },
        { href: '../../pages/admin/fonts/font-awesome/css/font-awesome.min.css', type: 'text/css' },
    ];

    $scope.user_info = {};
    $scope.cook_info = {};
    $scope.global_setting = {};
    $scope.social_setting = {};
    $scope.success_user_add = false;
    $scope.success_cook_delete = false;
    $scope.success_user_delete = false;
    $scope.user_list_deatils = {};
    $scope.cooks_list_deatils = {};

    $scope.add_user_via_admin = function (user_info) {
        $scope.u = {};
        $scope.u = user_info;
        $scope.user_info = "";
        $http({
            method: "POST",
            url: "admin/add-user-info",
            data: $scope.u
        }).then(function mySucces(response) {

            Notification.info({ message: 'User Successfully Added..', delay: 3000 });
            console.log(response.data);
            $scope.user_details = "";

        }, function myError(response) {

        });


    };

    $scope.temp_user_id = {};
    $scope.view_user_details_admin_temp = function (user_id) {

        $scope.temp_user_id = user_id;

        $cookieStore.put('temp_user_id', $scope.temp_user_id);

    }

    $scope.user_view_full = {};
    //  $scope.user_orders_view={};
    $scope.view_user_details_admin_fetch = function () {

        $scope.u = {};
        $scope.u.user_id = $cookieStore.get('temp_user_id');

        console.log($scope.u);

        $http({
            method: "POST",
            url: "admin/fetch-user-by-id",
            data: $scope.u
        }).then(function mySucces(response) {


            $scope.user_view_full = response.data[0];
            //     $scope.user_orders_view=response.data[0].orders;


            console.log(response.data);
            //  $scope.user_details="";

        }, function myError(response) {

        });

    }

    $scope.fetch_user_order_detail_by_id_temp = function (order_id) {

        $scope.temp_order_id = order_id;

        $cookieStore.put('temp_global', $scope.temp_order_id);


    }
    $scope.fetch_user_order_detail_by_id = function () {

        // $scope.temp_order_id = order_id;
        //onsole.log('THIS IS TEMP GLOBAL');
        // console.log( $cookieStore.get('temp_global'));
        $scope.fetch_complete_order_by_id($cookieStore.get('temp_global'));

        // $cookieStore.put('temp_global', $scope.temp_order_id);

    }

    $scope.update_user_by_admin = function (val) {


        $http({
            method: "POST",
            url: "admin/update-user-by-id",
            data: val
        }).then(function mySucces(response) {


            Notification.info({ message: 'User Successfully Updated..', delay: 3000 });

            $scope.view_user_details_admin_fetch();

        }, function myError(response) {

        });
    }


    $scope.imageData_cook_banner_admin = "";
    $scope.upload_cook_banner_image_admin = function (files) {

        if (files[0] == undefined) return


        $scope.fileExt = files[0].name.split(".").pop();

        var f = document.getElementById('cook_banner').files[0];


        r = new FileReader();

        r.onloadend = function (e) {

            var data = e.target.result;

            $scope.imageData_cook_banner_admin = $base64.encode(data);

            // console.log($scope.imageData_cook_banner_admin);

            //send your binary data via $http or $resource or do anything else with it


        }

        r.readAsBinaryString(f);

    }

    $scope.get_admin_id = function () {

        console.log('GETTING ADMIN ID');
        $http({
            method: "GET",
            url: "admin/get-admin-id",

        }).then(function mySucces(response) {


            $cookieStore.put('admin_id', response.data._id);

        }, function myError(response) {

        });
    }

    $scope.add_cook_via_admin = function (cook_info) {

        // Notification.warning({ message: 'Please Wait..', delay: 1000 });

        $scope.u = {};
        $scope.u = cook_info;
        //     $scope.u.landmark=$("#autocomplete_addr").val();
        //   $scope.u.cook_banner_img = $scope.imageData_cook_banner_admin;



        //    console.log($scope.imageData_cook_banner_admin);
        console.log($scope.u);
        $http({
            method: "POST",
            url: "admin/add-cook-info",
            data: $scope.u
        }).then(function mySucces(response) {

            console.log(response.data);
            $scope.cook_info = "";
            swal("Cook Added!", "Cook Details Successfully Added!", "success");
            // $scope.imageData_cook_banner_admin = "";
            // $scope.picFile_cook_banner = "";
            // Notification.success({ message: 'Cook Successfully Added..', delay: 3000 });


        }, function myError(response) {

        });


    };

    //  $scope.stylesheets = [

    //       {href: '../../pages/admin/css/reset.css', type:'text/css'},
    //       {href: '../../../pages/admin/css/style.css', type:'text/css'},
    //       {href: '../../pages/admin/css/media.css', type:'text/css'},
    //       {href: '../../pages/admin/fonts/font-awesome/css/font-awesome.min.css', type:'text/css'},


    //     ];

    //     $scope.scripts = [

    //       {href: '../../pages/admin/js/fm.parallaxator.jquery.js', type:'text/javascript'},
    //       {href: '../../pages/admin/js/global.js', type:'text/javascript'},
    //       {href: '../../pages/admin/js/min.js', type:'text/javascript'},


    //     ];

    $scope.loadUsers = function () {

        $http({
            method: "GET",
            url: "admin/get-all-users",

        }).then(function mySucces(response) {

            $scope.user_list_deatils = response.data;
            console.log($scope.user_list_deatils);
        }, function myError(response) {

        });

    };

    $scope.loadCooks = function () {


        $http({
            method: "GET",
            url: "admin/get-all-cooks",

        }).then(function mySucces(response) {

            $scope.cooks_list_deatils = response.data;
            console.log($scope.cooks_list_deatils);
        }, function myError(response) {

        });

    };

    $scope.cook_for_delv_boy = [];
    $scope.loadCooks_delivery_boy = function () {


        $http({
            method: "GET",
            url: "admin/get-all-cooks",

        }).then(function mySucces(response) {

            $scope.cooks_list_deatils = response.data;
            console.log($scope.cooks_list_deatils);

            for (var i = 0; i < $scope.cooks_list_deatils.length; i++) {
                var send = {
                    "name": $scope.cooks_list_deatils[i].cook_name,
                    "cook_id": $scope.cooks_list_deatils[i]._id,
                    ticked: false
                };
                $scope.cook_for_delv_boy.push(send);
            }


            //     console.log('THIS IS LOAD COOK DEL BOY');
            //   console.log($scope.cook_for_delv_boy);
        }, function myError(response) {

        });

        $scope.modernBrowsers_cooks_list = $scope.cook_for_delv_boy;


    };
    $scope.loadCooks_delivery_boy_edit = function () {


        $http({
            method: "GET",
            url: "admin/get-all-cooks",

        }).then(function mySucces(response) {

            $scope.cooks_list_deatils = response.data;
            console.log($scope.cooks_list_deatils);

            for (var i = 0; i < $scope.cooks_list_deatils.length; i++) {
                var send = {
                    "name": $scope.cooks_list_deatils[i].cook_name,
                    "cook_id": $scope.cooks_list_deatils[i]._id,
                    ticked: false
                };
                $scope.cook_for_delv_boy.push(send);
            }

            $scope.modernBrowsers_cooks_list = $scope.cook_for_delv_boy;

            console.log('THISI IS MODER BROWSER COOK LIST');
            console.log($scope.delivery_boy_details);
            for (var i = 0; i < $scope.delivery_boy_details.cook_assign.length; i++) {


                for (var j = 0; j < $scope.modernBrowsers_cooks_list.length; j++) {

                    if ($scope.delivery_boy_details.cook_assign[i].cook_id == $scope.modernBrowsers_cooks_list[j].cook_id) {

                        $scope.modernBrowsers_cooks_list[j].ticked = true;
                    }
                }

            }
            console.log($scope.modernBrowsers_cooks_list);
            //     console.log('THIS IS LOAD COOK DEL BOY');
            //   console.log($scope.cook_for_delv_boy);
        }, function myError(response) {

        });





    };
    // selected checkebox for user/cooks
    $scope.selection = [];

    // toggle selection for a given cook/user by name
    $scope.toggleSelection = function toggleSelection(val) {

        var idx = $scope.selection.indexOf(val);

        // is currently selected
        if (idx > -1) {
            $scope.selection.splice(idx, 1);
            console.log($scope.selection);
        }

        // is newly selected
        else {
            $scope.selection.push(val);
            console.log($scope.selection);

            // $scope.food_details.occassion_list = $scope.selection;
        }
    }


    //This is used to check and Uncheck all checkbox
    $scope.checkAll = function () {
        if ($scope.hasAllCookChecked) {

            $scope.hasAllCookChecked = true;
        } else {
            $scope.selection = [];
            $scope.hasAllCookChecked = false;
        }
        angular.forEach($scope.cooks_list_deatils, function (item) {
            item.selected = $scope.hasAllCookChecked;
        });

    };

    $scope.tmp_cook_id;
    $scope.update_cook_details_temp = function (cook_id) {

        $scope.tmp_cook_id = cook_id;

        $cookieStore.put('cook_update_id', $scope.tmp_cook_id);

    }

    $scope.update_details = {};
    $scope.update_cook_details_fetch = function () {

        $scope.u = {};
        $scope.u.cook_id = $cookieStore.get('cook_update_id');

        console.log($scope.u);

        $http({
            method: "POST",
            url: "admin/fetch-cook-by-id",
            data: $scope.u
        }).then(function mySucces(response) {

            $scope.update_details = response.data[0];
            console.log($scope.update_details);
        }, function myError(response) {
            console.log('err');
        });
    }

    $scope.apporve_cook_field = function (data, cook_id) {


        $scope.u = {};
        $scope.u.field_attr = data.field_attr;
        $scope.u.old_val = data.old_val;
        $scope.u.new_val = data.field_value;
        $scope.u.id = data.id;
        $scope.u.cook_id = cook_id;
        console.log($scope.u);

        $http({
            method: "POST",
            url: "admin/approve-cook-fields",
            data: $scope.u
        }).then(function mySucces(response) {

            swal("Success", data.field_name + " Succeffully Updated..", "success");
            $scope.update_cook_details_fetch();
            console.log(response);
        }, function myError(response) {
            console.log('err');
        });

    }

    $scope.deny_cook_field = function (data, cook_id) {


        $scope.u = {};
        $scope.u.field_attr = data.field_attr;
        $scope.u.old_val = data.old_val;
        $scope.u.new_val = data.field_value;
        $scope.u.id = data.id;
        $scope.u.cook_id = cook_id;
        console.log($scope.u);

        $http({
            method: "POST",
            url: "admin/deny-cook-fields",
            data: $scope.u
        }).then(function mySucces(response) {

            swal("Success", data.field_name + " Succeffully DENIED", "success");
            $scope.update_cook_details_fetch();
            console.log(response);
        }, function myError(response) {
            console.log('err');
        });

    }

    $scope.d_list = {};
    $scope.get_delBoy_acc_to_servCent = function (center_name) {

        $scope.u = {};
        $scope.u.center_name = center_name;

        if (center_name == "") {


        }
        else {

            for (var i = 0; i < $scope.c_list.length; i++) {

                if ($scope.c_list[i].center_name == center_name) {
                    $scope.u.service_center_id = $scope.c_list[i]._id;
                }
            }
            console.log($scope.u);

            $http({
                method: "POST",
                url: "admin/del-boy-by-serv-center",
                data: $scope.u
            }).then(function mySucces(response) {

                // swal("Success", data.field_name + " Succeffully DENIED", "success");
                // $scope.update_cook_details_fetch();
                console.log(response);
                $scope.d_list = response.data;
                $scope.show_edit_del_boy = true;

            }, function myError(response) {
                console.log('err');
            });

        }



    }

    $scope.update_cook_details_save = function (data) {

        if ($scope.imageData_cook_banner_admin != "") {

            $scope.u = data;
            $scope.u.cook_id = $cookieStore.get('cook_update_id');
            $scope.u.cook_updated_banner_img = $scope.imageData_cook_banner_admin;
            console.log('ANKUR');
            console.log($scope.u);

            if ($scope.u.cook_commission == "0" || $scope.u.cook_commission == null) {

                swal("Error", "Please Enter Cook Commission", "error");

            }
            // $http({
            //     method: "POST",
            //     url: "admin/update-cook-by-id",
            //     data: $scope.u
            // }).then(function mySucces(response) {
            //     Notification.info({ message: 'Cook Details Successfully Updated.!', delay: 4000 });
            //     console.log(response);
            // }, function myError(response) {
            //     console.log('err');
            // });

        }

        else if ($scope.imageData_cook_banner_admin == "") {

            $scope.u = data;

            if($scope.u.is_gstin == 'false'){

                $scope.u.gstin_no ='';
            }

            $scope.u.cook_id = $cookieStore.get('cook_update_id');
            $scope.u.landmark = $("#autocomplete_addr").val();
            console.log($scope.u);
            if ($scope.u.cook_commission == "0" || $scope.u.cook_commission == null || $scope.u.cook_commission == "") {

                swal("Error", "Please Enter Cook Commission", "error");

            }
            else {

                console.log('THIS IS FINAL DATA');
                console.log($scope.u);

                $http({
                    method: "POST",
                    url: "admin/update-cook-by-id",
                    data: $scope.u
                }).then(function mySucces(response) {
                    Notification.info({ message: 'Cook Details Successfully Updated.!', delay: 3000 });
                    console.log(response);
                }, function myError(response) {
                    console.log('err');
                });

            }


        }

    }

    $scope.cook_delete = function () {

        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plz!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {

                    console.log($scope.selection);
                    if ($scope.selection.length < 1) {
                        sweetAlert("Oops...", "No Checkbox Selected!", "error");
                    }
                    else {

                        if ($scope.hasAllCookChecked) {
                            $http({
                                method: "GET",
                                url: "admin/delete-all-cook",

                            }).then(function mySucces(response) {
                                $scope.hasAllCookChecked.selected = false;
                                swal("Deleted!", "All Cooks Are Deleted!", "success");


                            }, function myError(response) {
                                console.log('err');
                            });
                        }
                        else {

                            $http({
                                method: "POST",
                                url: "admin/delete-cook",
                                data: $scope.selection
                            }).then(function mySucces(response) {

                                swal("Deleted!", "Cook Successfully Deleted..!", "success");
                                $scope.selection = [];
                                $scope.loadCooks();

                                // Notification.error({message: 'Cook Successfully Deleted..', delay: 3000});
                            }, function myError(response) {
                                console.log('err');
                            });
                        }


                    }




                } else {
                    swal("Cancelled", "Your cancelled to delete cook :)", "error");
                }
            });

        // console.log($scope.selection);


    };

    var count_all_cook = false;
    $scope.checkAll_for_cook = function () {

        if ($scope.hasAllCookChecked) {

            $scope.hasAllCookChecked = true;
            count_all_cook = true;
        } else {
            $scope.selection = [];
            $scope.hasAllCookChecked = false;
            count_all_cook = false;
        }
        angular.forEach($scope.cooks_list_deatils, function (item) {
            item.selected = $scope.hasAllCookChecked;
        });

    };


    $scope.selectedItemChanged_Cook = function (val) {
        console.log(val)
        swal({
            title: "Are you sure?",
            text: "You are going to Change Status of Cook!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Change it!",
            cancelButtonText: "No, cancel plz!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    if ($scope.selection.length < 1 && count_all_cook == false) {
                        sweetAlert("Oops...", "No Checkbox Selected!", "error");
                    }
                    else {

                        if ($scope.hasAllCookChecked == undefined || $scope.hasAllCookChecked == false && $scope.selection.length > 0) {

                            if (val == "Active") {

                                console.log('Selected Active by ID');
                                // console.log($scope.selection);
                                $http({
                                    method: "POST",
                                    url: "admin/active-cook-by-id",
                                    data: $scope.selection
                                }).then(function mySucces(response) {

                                    $scope.selection = [];
                                    $timeout(function () {

                                        $scope.loadCooks();

                                    }, 400);
                                    swal("Changed!", "Cook Status Successfully Changed..!", "success");
                                }, function myError(response) {
                                    console.log('err');
                                });
                            }

                            else if (val == "Inactive") {


                                console.log('Selected Inactive by Id');
                                // console.log($scope.selection);
                                $http({
                                    method: "POST",
                                    url: "admin/inactive-cook-by-id",
                                    data: $scope.selection
                                }).then(function mySucces(response) {
                                    $scope.selection = [];

                                    $timeout(function () {

                                        $scope.loadCooks();

                                    }, 400);
                                    swal("Changed!", "Cook Status Successfully Changed..!", "success");
                                }, function myError(response) {
                                    console.log('err');
                                });



                            }
                        }
                        else {


                            if ($scope.hasAllCookChecked == undefined || $scope.hasAllCookChecked == true) {

                                console.log('test');
                                // $scope.u={};
                                // $scope.u.admin_id=$cookieStore.get('admin_id');

                                if (val == "Active") {

                                    console.log('Active all user');

                                    $http({
                                        method: "POST",
                                        url: "admin/active-all-cook",

                                    }).then(function mySucces(response) {
                                        $scope.hasAllCookChecked = false;
                                        $scope.selection = [];
                                        $timeout(function () {

                                            $scope.loadCooks();

                                        }, 400);


                                        swal("Activated All !", "Cook Status Successfully Changed..!", "success");
                                    }, function myError(response) {
                                        console.log('err');
                                    });
                                }

                                else if (val == "InActive") {

                                    console.log('Inactive all cook');

                                    $http({
                                        method: "POST",
                                        url: "admin/inactive-all-cook",

                                    }).then(function mySucces(response) {
                                        $scope.selection = [];
                                        $scope.hasAllCookChecked = false;
                                        $timeout(function () {

                                            $scope.loadCooks();

                                        }, 400);
                                        swal("Inactivated All !", "Cook Status Successfully Changed..!", "success");
                                    }, function myError(response) {
                                        console.log('err');
                                    });

                                }

                            }

                        }

                    }
                }
                else {
                    swal("Cancelled", "Your cancelled to Change Status of Cooks :)", "error");
                }


            });


    }

    $scope.show_updated_fields = function (val) {


        var list = [];
        console.log($scope.cooks_list_deatils);

        for (var i = 0; i < $scope.cooks_list_deatils.length; i++) {

            if ($scope.cooks_list_deatils[i].cook_email == val) {

                list.push($scope.cooks_list_deatils[i].updated_fields);

            }
        }

        console.log(list[0]);

        swal("Updated Fields", list[0][0].field_name);

    }


    var count_all_user = false;
    $scope.checkAll_for_user = function () {

        if ($scope.hasAllCookChecked) {

            $scope.hasAllCookChecked = true;
            count_all_user = true;
        } else {
            $scope.selection = [];
            $scope.hasAllCookChecked = false;
            count_all_user = false;
        }
        angular.forEach($scope.user_list_deatils, function (item) {
            item.selected = $scope.hasAllCookChecked;
        });

    };


    $scope.user_delete = function () {



        swal({
            title: "Are you sure?",
            text: "You are going to delete User Details.!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plz!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {


                    if ($scope.selection.length < 1 && count_all_user == false) {
                        sweetAlert("Oops...", "No Checkbox Selected!", "error");
                    }
                    else {

                        console.log('checkbox selected');
                        console.log($scope.selection);
                        if ($scope.selection.length < 1 && $scope.hasAllCookChecked == true) {
                            console.log('delting all user');

                            $http({
                                method: "POST",
                                url: "admin/delete-all-user",

                            }).then(function mySucces(response) {

                                console.log(response);
                                swal("Deleted!", "All Users Are Deleted!", "success");
                                $timeout(function () {

                                    $scope.loadUsers();

                                }, 400);

                            }, function myError(response) {
                                console.log('err');
                            });
                        }
                        if ($scope.selection.length > 0 && count_all_user == false || $scope.hasAllCookChecked == false) {
                            console.log('delting Selected user');
                            console.log($scope.selection);
                            $scope.u = {};
                            $scope.u.selected_user = $scope.selection;


                            $http({
                                method: "POST",
                                url: "admin/delete-selected-user",
                                data: $scope.u
                            }).then(function mySucces(response) {

                                swal("Deleted!", "User Successfully Deleted..!", "success");
                                $scope.selection = [];

                                $timeout(function () {

                                    $scope.loadUsers();

                                }, 400);
                                // Notification.error({message: 'Cook Successfully Deleted..', delay: 3000});
                            }, function myError(response) {
                                console.log('err');
                            });
                        }
                        if ($scope.selection.length > 0 && count_all_user == true && $scope.hasAllCookChecked == true) {
                            console.log('delting all user 2');
                            $http({
                                method: "POST",
                                url: "admin/delete-all-user",

                            }).then(function mySucces(response) {

                                console.log(response);
                                swal("Deleted!", "All Users Are Deleted!", "success");

                                $timeout(function () {

                                    $scope.loadUsers();

                                }, 400);
                            }, function myError(response) {
                                console.log('err');
                            });
                        }

                    }




                } else {
                    swal("Cancelled", "Your cancelled to delete User :)", "error");
                }
            });



    };


    $scope.selectedItemChanged_User = function (val) {

        swal({
            title: "Are you sure?",
            text: "You are going to Change Status of Users!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Change it!",
            cancelButtonText: "No, cancel plz!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    if ($scope.selection.length < 1 && count_all_user == false) {
                        sweetAlert("Oops...", "No Checkbox Selected!", "error");
                    }
                    else {

                        if ($scope.hasAllCookChecked == undefined || $scope.hasAllCookChecked == false && $scope.selection.length > 0) {

                            if (val == "Active") {

                                console.log('Selected Active by ID');
                                // console.log($scope.selection);
                                $http({
                                    method: "POST",
                                    url: "admin/active-user-by-id",
                                    data: $scope.selection
                                }).then(function mySucces(response) {

                                    $scope.selection = [];
                                    $timeout(function () {

                                        $scope.loadUsers();

                                    }, 400);
                                    swal("Changed!", "User Status Successfully Changed..!", "success");
                                }, function myError(response) {
                                    console.log('err');
                                });
                            }

                            else if (val == "Inactive") {


                                console.log('Selected Inactive by Id');
                                console.log($scope.selection);
                                $http({
                                    method: "POST",
                                    url: "admin/inactive-user-by-id",
                                    data: $scope.selection
                                }).then(function mySucces(response) {
                                    $scope.selection = [];

                                    $timeout(function () {

                                        $scope.loadUsers();

                                    }, 400);
                                    swal("Changed!", "User Status Successfully Changed..!", "success");
                                }, function myError(response) {
                                    console.log('err');
                                });



                            }
                        }
                        else {


                            if ($scope.hasAllCookChecked == undefined || $scope.hasAllCookChecked == true) {

                                console.log('test');
                                // $scope.u={};
                                // $scope.u.admin_id=$cookieStore.get('admin_id');

                                if (val == "Active") {

                                    console.log('Active all user');

                                    $http({
                                        method: "POST",
                                        url: "admin/active-all-user",

                                    }).then(function mySucces(response) {
                                        $scope.hasAllCookChecked = false;
                                        $scope.selection = [];
                                        $timeout(function () {

                                            $scope.loadUsers();

                                        }, 400);


                                        swal("Activated All !", "User Status Successfully Changed..!", "success");
                                    }, function myError(response) {
                                        console.log('err');
                                    });
                                }

                                else if (val == "Inactive") {

                                    console.log('Inactive all user');

                                    $http({
                                        method: "POST",
                                        url: "admin/inactive-all-user",

                                    }).then(function mySucces(response) {
                                        $scope.selection = [];
                                        $scope.hasAllCookChecked = false;
                                        $timeout(function () {

                                            $scope.loadUsers();

                                        }, 400);
                                        swal("Inactivated All !", "User Status Successfully Changed..!", "success");
                                    }, function myError(response) {
                                        console.log('err');
                                    });

                                }

                            }

                        }

                    }
                }
                else {
                    swal("Cancelled", "Your cancelled to Change Status of User :)", "error");
                }


            });


    }



    /*******************SAVING GLOBAL SETTINGS*********** */

    $scope.imageData_web_logo = "";
    $scope.upload_websiste_logo = function (files) {

        if (files[0] == undefined) return;
        $scope.fileExt = files[0].name.split(".").pop();

        var f = document.getElementById('web_logo').files[0];


        r = new FileReader();

        r.onloadend = function (e) {

            var data = e.target.result;

            $scope.imageData_web_logo = $base64.encode(data);


            // console.log($scope.imageData_web_logo);

            //send your binary data via $http or $resource or do anything else with it


        }

        r.readAsBinaryString(f);

    }

    $scope.imageData_footer_logo = "";
    $scope.upload_footer_logo = function (files) {

        if (files[0] == undefined) return;
        $scope.fileExt = files[0].name.split(".").pop();

        var f = document.getElementById('footer_logo').files[0];


        r = new FileReader();

        r.onloadend = function (e) {

            var data = e.target.result;

            $scope.imageData_footer_logo = $base64.encode(data);

            //console.log($scope.imageData);

            //send your binary data via $http or $resource or do anything else with it


        }

        r.readAsBinaryString(f);

    }

    $scope.imageData_favicon = "";
    $scope.upload_favicon = function (files) {
        console.log(files);
        if (files[0] == undefined) return;
        $scope.fileExt = files[0].name.split(".").pop();

        var f = files[0];


        r = new FileReader();

        r.onloadend = function (e) {

            var data = e.target.result;

            $scope.imageData_favicon = $base64.encode(data);


            // console.log($scope.imageData_web_logo);

            //send your binary data via $http or $resource or do anything else with it


        }

        r.readAsBinaryString(f);
        // if (files[0] == undefined) return;
        // $scope.fileExt = files[0].name.split(".").pop();

        // var f = document.getElementById('favicon').files[0];


        // r = new FileReader();

        // r.onloadend = function (e) {

        //     var data = e.target.result;

        //     $scope.imageData_favicon = $base64.encode(data);

        //     // console.log($scope.imageData_favicon);

        //     //send your binary data via $http or $resource or do anything else with it


        // }

        // r.readAsBinaryString(f);

    }

    $scope.save_global_setting = function (data) {

        $scope.u = {};
        $scope.u = data;
        $scope.u.website_logo = $scope.imageData_web_logo;
        $scope.u.footer_logo = $scope.imageData_footer_logo;
        $scope.u.favicon = $scope.imageData_favicon;
        console.log($scope.u);
        $http({
            method: "POST",
            url: "admin/save-global-setting",
            data: $scope.u
        }).then(function mySucces(response) {

            $scope.global_setting = "";
            $scope.imageData_web_logo = "";
            $scope.imageData_footer_logo = "";
            $scope.picFile2 = "";
            $scope.picFile3 = "";
            $scope.picFile4 = "";
            Notification.info({ message: 'Global Settings Successfully Updated.!', delay: 3000 });
            $scope.fetch_global_setting();
        }, function myError(response) {
            console.log('err');
        });
    }



    $scope.pwd_admin = {};
    $scope.change_admin_pwd = function (data) {

        $scope.u = {};
        $scope.u = data;

        if ($scope.u.new_pass == $scope.u.confirm_pass) {

            console.log('MATCHED');
            $http({
                method: "POST",
                url: "admin/change-admin-pass",
                data: $scope.u
            }).then(function mySucces(response) {

                console.log(response);
                if (response.data.status == 'old pwd incorrect') {

                    swal("Old Password Incorrect", "Please Enter Correct Old Password", "error");
                }
                if (response.data.status == 'success') {

                    swal("Password Updated", "Your Password Succeffully Updated", "success");
                }

            }, function myError(response) {
                console.log('err');
            });


        }
        else {
            swal("Password Mismatch", "Old and New Password Mismatch", "error");
        }
        console.log($scope.u);

    }

    $scope.fetch_global_setting = function (data) {

        console.log('FETCHING');


        $http({
            method: "GET",
            url: "admin/fetch-global-settings"

        }).then(function mySucces(response) {

            console.log(response.data);
            $scope.global_setting = response.data[0];
        }, function myError(response) {
            console.log('err');
        });
    }

    /****************** INFORMATION PAGES  INFO ************ */

    $scope.save_information_page_details = {};


    $scope.save_information_page = function (val) {

        $scope.u = {};
        $scope.u.admin_id = $cookieStore.get('admin_id');
        $scope.u.info = val;
        console.log(val);
        $http({
            method: "POST",
            url: "admin/add-info-pages",
            data: $scope.u
        }).then(function mySucces(response) {

            Notification.info({ message: 'Information Page Successfully Added.', delay: 3000 });
            $scope.save_information_page_details = "";
        }, function myError(response) {
            console.log('err');
        });

    }

    $scope.view_info_detail = {};
    $scope.fetch_info_pages = function (info_id) {

        $http({
            method: "POST",
            url: "admin/fetch-info-pages",

        }).then(function mySucces(response) {

            $scope.view_info_detail = response.data.info_pages;
            console.log(response.data.info_pages);

        }, function myError(response) {
            console.log('err');
        });

    }

    $scope.update_info_pages_temp = function (info_id) {

        console.log(info_id);

        $scope.tmp_info_page_id = info_id;
        // // console.log(tmp_coupon_id) ;
        $cookieStore.put('info_page_id', $scope.tmp_info_page_id);

    }

    $scope.update_page_info_model = {};
    $scope.update_info_pages_fetch = function () {

        $scope.u = {};
        $scope.u.info_page_id = $cookieStore.get('info_page_id');

        $http({
            method: "POST",
            url: "admin/fetch-info_page-by-id",
            data: $scope.u
        }).then(function mySucces(response) {

            $scope.update_page_info_model = response.data.info_pages[0];
            console.log($scope.update_page_info_model);
        }, function myError(response) {
            console.log('err');
        });
    }
    $scope.update_info_page = function (data) {


        $scope.u = {};

        $scope.u = data;
        console.log($scope.u);
        $http({
            method: "POST",
            url: "admin/update-info-page",
            data: $scope.u
        }).then(function mySucces(response) {

            console.log(response);
            $scope.update_info_pages_fetch();
            Notification.info({ message: 'Info Page Successfully Updated.', delay: 3000 });
            //     $scope.update_page_info_model=response.data.info_pages[0];
            //    console.log( $scope.update_page_info_model);
        }, function myError(response) {
            console.log('err');
        });
    }

    var count_all_info_pages = false;
    $scope.checkAll_for_info_pages = function () {

        if ($scope.hasAllCookChecked) {

            $scope.hasAllCookChecked = true;
            count_all_info_pages = true;
        } else {
            $scope.selection = [];
            $scope.hasAllCookChecked = false;
            count_all_info_pages = false;
        }
        angular.forEach($scope.view_info_detail, function (item) {
            item.selected = $scope.hasAllCookChecked;
        });

    };

    $scope.info_page_delete = function () {


        swal({
            title: "Are you sure?",
            text: "You are going to delete Information Page.!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plz!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {


                    if ($scope.selection.length < 1 && count_all_info_pages == false) {
                        sweetAlert("Oops...", "No Checkbox Selected!", "error");
                    }
                    else {



                        if ($scope.selection.length < 1 && $scope.hasAllCookChecked == true) {
                            console.log('delete all pages');
                            $scope.u = {};
                            $scope.u.admin_id = $cookieStore.get('admin_id');
                            $http({
                                method: "POST",
                                url: "admin/delete-all-info-pages",
                                data: $scope.u
                            }).then(function mySucces(response) {

                                // $scope.hasAllCookChecked=false;
                                // $scope.hasAllCookChecked.selected=false;
                                swal("Deleted!", "All Info Pages Are Deleted!", "success");
                                $timeout(function () {
                                    $scope.fetch_info_pages();

                                }, 400);

                            }, function myError(response) {
                                console.log('err');
                            });
                        }
                        if ($scope.selection.length > 0 && count_all_info_pages == false || $scope.hasAllCookChecked == false) {
                            $scope.u = {};
                            $scope.u.selected_info_page = $scope.selection;
                            $scope.u.admin_id = $cookieStore.get('admin_id');
                            $http({
                                method: "POST",
                                url: "admin/delete-selected-info-pages",
                                data: $scope.u
                            }).then(function mySucces(response) {

                                swal("Deleted!", "Info Page Successfully Deleted..!", "success");
                                $scope.selection = [];
                                $timeout(function () {
                                    $scope.fetch_info_pages();

                                }, 400);

                                // Notification.error({message: 'Info Page Successfully Deleted..', delay: 3000});
                            }, function myError(response) {
                                console.log('err');
                            });
                        }
                        if ($scope.selection.length > 0 && count_all_info_pages == true && $scope.hasAllCookChecked == true) {
                            console.log('delete all pages');
                            $http({
                                method: "POST",
                                url: "admin/delete-all-info-pages",
                                data: $scope.u
                            }).then(function mySucces(response) {

                                // $scope.hasAllCookChecked=false;
                                // $scope.hasAllCookChecked.selected=false;
                                swal("Deleted!", "All Info Pages Are Deleted!", "success");

                                $timeout(function () {
                                    $scope.fetch_info_pages();

                                }, 400);
                            }, function myError(response) {
                                console.log('err');
                            });
                        }

                    }




                } else {
                    swal("Cancelled", "Your cancelled to delete cook :)", "error");
                }
            });

        // console.log($scope.selection);


    };



    /******************SAVE COUPON************ */


    $scope.save_coupon_details = {};
    $scope.after_success_coupon_add = false;

    $scope.save_coupon_page = function (coupon_details) {
        $scope.u = coupon_details;
        $scope.u.coupon_used_counter = 0;
        //$scope.u.categories = $scope.modernBrowsers;
        var cat_obj = {};
        var cat_data = [];

        for (var i = 0; i < $scope.modernBrowsers.length; i++) {

            if ($scope.modernBrowsers[i].ticked == true) {

                cat_obj = {};
                cat_obj.category_name = $scope.modernBrowsers[i].name;
                cat_obj.category_id = $scope.modernBrowsers[i]._id;

                cat_data.push(cat_obj);
            }

        }
        $scope.u.categories = cat_data;
        $scope.u.admin_id = $cookieStore.get('admin_id');
        $scope.u.user_arr = [];
        console.log($scope.u);

        $http({
            method: "POST",
            url: "admin/add-coupon-info",
            data: $scope.u
        }).then(function mySucces(response) {
            $scope.save_coupon_details = "";
            // for (var i = 0; i < $scope.modernBrowsers.length; i++) {

            //     $scope.modernBrowsers[i].ticked = false;
            // };
            Notification.info({ message: 'Coupon Successfully Added.', delay: 3000 });

        }, function myError(response) {
            console.log('err');
        });
    }

    $scope.cuisine_name_list = [];
    $scope.modernBrowsers2 = [];

    $scope.fetch_cuisine_name_for_add = function (social_details) {


        $http({
            method: "GET",
            url: "admin/fetch-cuisine-name",

        }).then(function mySucces(response) {

            console.log(response.data);
            var send = {};
            $scope.cuisine_name_list = [];
            for (var i = 0; i < response.data.length; i++) {
                var send = {
                    "name": response.data[i].category_name,

                    ticked: false
                };
                $scope.cuisine_name_list.push(send);


            }

            console.log('THIS IS CUSINE NAME');
            console.log($scope.cuisine_name_list);

            $scope.modernBrowsers2 = $scope.cuisine_name_list;

            //   $scope.update_coupon_details_fetch();
            $scope.update_food_fetch();

        }, function myError(response) {
            console.log('err');
        });
    }

    $scope.fetch_cuisine_name_for_coupon = function (social_details) {


        $http({
            method: "GET",
            url: "admin/fetch-cuisine-name",

        }).then(function mySucces(response) {

            for (var i = 0; i < response.data.length; i++) {
                var send = {
                    "name": response.data[i].category_name,
                    "_id": response.data[i]._id,
                    ticked: false
                };
                $scope.cuisine_name_list.push(send);


            }

            console.log('THIS IS CUSINE NAME');
            console.log(response);

            $scope.update_coupon_details_fetch();
            //   $scope.update_food_fetch();

        }, function myError(response) {
            console.log('err');
        });
    }

    $scope.fetch_cuisine_name = function (social_details) {


        $http({
            method: "GET",
            url: "admin/fetch-cuisine-name",

        }).then(function mySucces(response) {

            for (var i = 0; i < response.data.length; i++) {
                var send = {
                    "name": response.data[i].category_name,
                    ticked: false
                };
                $scope.cuisine_name_list.push(send);


            }
            $scope.update_coupon_details_fetch();
            // console.log($scope.cuisine_name_list);


        }, function myError(response) {
            console.log('err');
        });
    }

    $scope.modernBrowsers = $scope.cuisine_name_list;
    $scope.modernBrowsers_occ_list = [];
    $scope.modernBrowsers_cooks_list;
    // $scope.modernBrowsers = [
    //  	{name: "Opera"	},
    //  	{		name: "Internet Explorer"		},
    //  	{		name: "Firefox"	},
    //  	{		name: "Safari"},
    //  	{		name: "Chrome"	},
    // ];
    $scope.jg = function () {
        console.log($scope.modernBrowsers);
    }


    $scope.coupon_fetch_detail = {};


    $scope.fetch_coupon = function () {
        $http({
            method: "GET",
            url: "admin/fetch-coupon-info",

        }).then(function mySucces(response) {

            console.log('THIS IS COUPON');
            console.log(response);
            $scope.coupon_fetch_detail = response.data;

        }, function myError(response) {
            console.log('err');
        });
    }

    var count_all_coupon = false;
    $scope.checkAll_for_coupon = function () {

        if ($scope.hasAllCookChecked) {

            $scope.hasAllCookChecked = true;
            count_all_coupon = true;
        } else {
            $scope.selection = [];
            $scope.hasAllCookChecked = false;
            count_all_coupon = false;
        }
        angular.forEach($scope.coupon_fetch_detail, function (item) {
            item.selected = $scope.hasAllCookChecked;
        });

    };

    $scope.coupon_delete = function () {


        swal({
            title: "Are you sure?",
            text: "You are going to delete Coupon Details.!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plz!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {


                    if ($scope.selection.length < 1 && count_all_coupon == false) {
                        sweetAlert("Oops...", "No Checkbox Selected!", "error");
                    }
                    else {



                        if ($scope.selection.length < 1 && $scope.hasAllCookChecked == true) {

                            $scope.u = {};
                            $scope.u.admin_id = $cookieStore.get('admin_id');
                            $http({
                                method: "POST",
                                url: "admin/delete-all-coupon",
                                data: $scope.u
                            }).then(function mySucces(response) {

                                $scope.hasAllCookChecked = false;
                                $scope.hasAllCookChecked.selected = false;
                                swal("Deleted!", "All Coupons Are Deleted!", "success");

                                $scope.fetch_coupon();
                            }, function myError(response) {
                                console.log('err');
                            });
                        }
                        if ($scope.selection.length > 0 && count_all_coupon == false || $scope.hasAllCookChecked == false) {

                            $scope.u.selected_coupons = $scope.selection;
                            $scope.u.admin_id = $cookieStore.get('admin_id');

                            $http({
                                method: "POST",
                                url: "admin/delete-selected-coupon",
                                data: $scope.u
                            }).then(function mySucces(response) {

                                swal("Deleted!", "Coupon Successfully Deleted..!", "success");
                                $scope.selection = [];
                                $scope.fetch_coupon();

                                // Notification.error({message: 'Cook Successfully Deleted..', delay: 3000});
                            }, function myError(response) {
                                console.log('err');
                            });
                        }
                        if ($scope.selection.length > 0 && count_all_coupon == true && $scope.hasAllCookChecked == true) {

                            $scope.u = {};
                            $scope.u.admin_id = $cookieStore.get('admin_id');
                            $http({
                                method: "POST",
                                url: "admin/delete-all-coupon",
                                data: $scope.u
                            }).then(function mySucces(response) {

                                $scope.hasAllCookChecked = false;
                                $scope.hasAllCookChecked.selected = false;
                                swal("Deleted!", "All Coupons Are Deleted!", "success");

                                $scope.fetch_coupon();
                            }, function myError(response) {
                                console.log('err');
                            });
                        }

                    }




                } else {
                    swal("Cancelled", "Your cancelled to delete cook :)", "error");
                }
            });

        // console.log($scope.selection);


    };

    $scope.tmp_coupon_id;
    $scope.update_coupon_details_temp = function (coupon_id) {


        $scope.tmp_coupon_id = coupon_id;
        // console.log(tmp_coupon_id) ;
        $cookieStore.put('coupon_update_id', $scope.tmp_coupon_id);

    }

    // $scope.update_details={};
    $scope.update_coupon_details_fetch = function (coupons) {

        $scope.u = {};
        $scope.u.coupon_id = $cookieStore.get('coupon_update_id');
        // $scope.u.admin_id = $cookieStore.get('admin_id');

        console.log('this is updated coupon id');

        $timeout(function () {

            $http({
                method: "POST",
                url: "admin/fetch-coupon-by-id",
                data: $scope.u
            }).then(function mySucces(response) {

                console.log('THIS IS COUPON INOFS');
                console.log(response);
                $scope.save_coupon_details = response.data[0];

                var coupon_info = response.data[0];

                console.log('THIS IS CUISINE LIST');

                console.log($scope.modernBrowsers);

                for (var m = 0; m < coupon_info.categories.length; m++) {

                    for (var i = 0; i < $scope.modernBrowsers.length; i++) {

                        if ($scope.modernBrowsers[i].name == coupon_info.categories[m].category_name) {
                            //   console.log($scope.modernBrowsers[i]);

                            $scope.modernBrowsers[i].ticked = true;
                        }
                        // else {
                        //     $scope.modernBrowsers[i].ticked = false;
                        //     // console.log($scope.modernBrowsers[i]);
                        // }

                    }

                }



            }, function myError(response) {
                console.log('err');
            });

        }, 900);

    }


    $scope.update_coupon_details = function (coupons) {

        $scope.u = {};
        // $scope.u.coupon_id= $cookieStore.get('coupon_update_id');

        $scope.u = coupons;

        var selected_cook = {};
        var selected_cook_detail = [];
        for (var i = 0; i < $scope.modernBrowsers.length; i++) {

            if ($scope.modernBrowsers[i].ticked == true) {
                selected_cook = {};
                selected_cook.category_name = $scope.modernBrowsers[i].name;
                selected_cook.category_id = $scope.modernBrowsers[i]._id;
                selected_cook_detail.push(selected_cook);
            }

        }

        $scope.u.categories = selected_cook_detail;
        console.log('CUISIN SELC');
        console.log($scope.u);

        $http({
            method: "POST",
            url: "admin/update-coupon-by-id",
            data: $scope.u
        }).then(function mySucces(response) {
            Notification.success({ message: 'Coupon Successfully Updated..', delay: 3000 });
            $scope.update_coupon_details_fetch();

        }, function myError(response) {
            console.log('err');
        });


    }



    $scope.selectedItemChanged_Coupon = function (val) {

        swal({
            title: "Are you sure?",
            text: "You are going to Change Status of Coupons!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Change it!",
            cancelButtonText: "No, cancel plz!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    if ($scope.selection.length < 1 && count_all_coupon == false) {
                        sweetAlert("Oops...", "No Checkbox Selected!", "error");
                    }
                    else {

                        if ($scope.hasAllCookChecked == undefined || $scope.hasAllCookChecked == false && $scope.selection.length > 0) {

                            if (val == "Enable") {

                                console.log('Selected Enabling');
                                console.log($scope.selection);
                                $http({
                                    method: "POST",
                                    url: "admin/enable-coupon-by-id",
                                    data: $scope.selection
                                }).then(function mySucces(response) {

                                    $scope.selection = [];
                                    $timeout(function () {

                                        $scope.fetch_coupon();

                                    }, 400);
                                    swal("Changed!", "Coupon Status Successfully Changed..!", "success");
                                }, function myError(response) {
                                    console.log('err');
                                });
                            }

                            else if (val == "Disable") {
                                console.log('Selected Disabling');
                                console.log($scope.selection);
                                $http({
                                    method: "POST",
                                    url: "admin/disable-coupon-by-id",
                                    data: $scope.selection
                                }).then(function mySucces(response) {
                                    $scope.selection = [];

                                    $timeout(function () {

                                        $scope.fetch_coupon();

                                    }, 400);
                                    swal("Changed!", "Coupon Status Successfully Changed..!", "success");
                                }, function myError(response) {
                                    console.log('err');
                                });

                            }

                        }
                        else
                            if ($scope.hasAllCookChecked == undefined || $scope.hasAllCookChecked == true) {

                                $scope.u = {};
                                $scope.u.admin_id = $cookieStore.get('admin_id');

                                if (val == "Enable") {


                                    console.log($scope.selection);
                                    $http({
                                        method: "POST",
                                        url: "admin/enable-all-coupon",
                                        data: $scope.u
                                    }).then(function mySucces(response) {
                                        $scope.hasAllCookChecked = false;
                                        $scope.selection = [];
                                        $timeout(function () {

                                            $scope.fetch_coupon();

                                        }, 400);


                                        swal("Changed!", "Coupon Status Successfully Changed..!", "success");
                                    }, function myError(response) {
                                        console.log('err');
                                    });
                                }

                                else if (val == "Disable") {


                                    console.log($scope.selection);
                                    $http({
                                        method: "POST",
                                        url: "admin/disable-all-coupon",
                                        data: $scope.u
                                    }).then(function mySucces(response) {
                                        $scope.selection = [];
                                        $scope.hasAllCookChecked = false;
                                        $timeout(function () {

                                            $scope.fetch_coupon();

                                        }, 400);
                                        swal("Changed!", "Coupon Status Successfully Changed..!", "success");
                                    }, function myError(response) {
                                        console.log('err');
                                    });

                                }

                            }





                    }
                }
                else {
                    swal("Cancelled", "Your cancelled to Change Coupons Status :)", "error");
                }


            });


    }
    /******************SAVE SOCIAL INFOS************ */

    $scope.choices = [{ id: 'choice1' }];

    $scope.addNewChoice = function () {
        var newItemNo = $scope.choices.length + 1;
        $scope.choices.push({ 'id': 'choice' + newItemNo });
    };

    $scope.removeChoice = function () {
        var lastItem = $scope.choices.length - 1;
        $scope.choices.splice(lastItem);
    };
    $scope.removeChoice_for_banner = function (val) {
        var lastItem = $scope.choices.length - 1;
        $scope.choices.splice(lastItem);
        ts.splice(val, 1);

    };
    $scope.addNewChoice_for_banner = function () {
        var newItemNo = $scope.update_banner_model_for_details.length + 1;
        $scope.update_banner_model_for_details.push({ 'id': 'choice' + newItemNo });
    };
    $scope.removeChoice_for_banner_edit = function (val) {
        var lastItem = $scope.update_banner_model_for_details.length - 1;
        $scope.update_banner_model_for_details.splice(lastItem);
        ts.splice(val, 1);

    };

    $scope.social_info_details = {};

    $scope.getSocialInfos = function () {

        $scope.u = {};
        $scope.u.admin_id = $cookieStore.get('admin_id');

        $http({
            method: "POST",
            url: "admin/get-social-infos",
            data: $scope.u
        }).then(function mySucces(response) {

            $scope.choices = response.data;

            console.log(response.data);
        }, function myError(response) {

        });

    }


    $scope.save_social_details = {};
    $scope.after_success_social_info_add = false;
    $scope.save_social_setting = function (social_details) {

        $scope.u = {};
        $scope.u.admin_id = $cookieStore.get('admin_id');
        $scope.u.social = $scope.choices;
        console.log($scope.u);
        $http({
            method: "POST",
            url: "admin/add-social-info",
            data: $scope.u
        }).then(function mySucces(response) {

            $timeout(function () {

                $scope.getSocialInfos();

            }, 800);

            Notification.success({ message: 'Social Media Successfully Updated', delay: 3000 });
            console.log(response);
        }, function myError(response) {
            console.log('err');
        });
    }

    $scope.remove_social_media = function (val) {


        $scope.u.social_media = val;
        console.log($scope.u);
        $http({
            method: "POST",
            url: "admin/remove-social-media",
            data: $scope.u
        }).then(function mySucces(response) {


            $timeout(function () {

                $scope.getSocialInfos();

            }, 800);

            Notification.warning({ message: 'Social Media Successfully Deleted', delay: 3000 });
            console.log(response);
        }, function myError(response) {
            console.log('err');
        });
    }

    /********** BANNER add/edit/delete/update IN ADMIN ****/

    $scope.banner_details = {};
    $scope.banner_image_list = [];
    $scope.banner_lst = {};
    var ts = [];   //for multiple image upload
    $scope.ts_img_data = [];


    $scope.save_banner_info = function (banner) {

        //   ts.splice(1);
        var key = ts.length;
        var len = 0;

        for (var i = 0; i < ts.length; i++) {

            if (ts[i] == undefined) return;

            var f = ts[i];
            r = new FileReader();

            r.onloadend = function (e) {

                var data = e.target.result;
                $scope.cc = $base64.encode(data);

                $scope.ts_img_data.push($scope.cc);


                len++;



            }

            r.readAsBinaryString(f);



        }
        Notification.warning({ message: 'Please Wait For a While...', delay: 3000 });
        $timeout(function () {

            console.log(key);
            if (key == len) {
                $scope.u = {};
                $scope.u.banner_name = $scope.banner_details.banner_name;

                $scope.u.banner_status = $scope.banner_details.banner_status;
                $scope.u.choices = $scope.choices;
                $scope.u.img = $scope.ts_img_data;
                $scope.u.admin_id = $cookieStore.get('admin_id');

                //console.log($scope.u);
                console.log($scope.u);
                $http({
                    method: "POST",
                    url: "admin/add-banner-details",
                    data: $scope.u
                }).then(function mySucces(response) {

                    $scope.ts_img_data = [];
                    $scope.u = "";
                    $scope.banner_details = "";
                    $scope.choices = [{ id: 'choice1' }];
                    console.log(response);
                    Notification.info({ message: 'Banner Successfully Added', delay: 4000 });
                    $location.path('/admin/view-banners');
                }, function myError(response) {
                    console.log('err');
                });
            }


        }, 3000);

        // if($scope.key>0){

        //console.log($scope.ts_img_data);   
        // $scope.banner_details.details = banner;



    }

    $scope.imageData_banner = "";

    $scope.upload_banner_image = function (files) {


        if (files[0] == undefined) return;
        $scope.fileExt = files[0].name.split(".").pop();

        var f = document.getElementById('file').files[0];
        ts.push(files[0]);
        console.log(ts);
        r = new FileReader();

        r.onloadend = function (e) {

            var data = e.target.result;

            //send your binary data via $http or $resource or do anything else with it


        }

        r.readAsBinaryString(f);
    }
    $scope.imageData_banner = "";

    $scope.upload_banner_image_update = function (files, id) {


        if (files[0] == undefined) return;
        $scope.fileExt = files[0].name.split(".").pop();

        var f = document.getElementById(id).files[0];
        ts.push(files[0]);
        console.log(ts);
        r = new FileReader();

        r.onloadend = function (e) {

            var data = e.target.result;

            //send your binary data via $http or $resource or do anything else with it


        }

        r.readAsBinaryString(f);
    }
    $scope.edit_banner_image_api = function (files, id, index) {


        if (files[0] == undefined) return;
        $scope.fileExt = files[0].name.split(".").pop();

        var f = document.getElementById(id).files[0];
        // ts.push(files[0]);
        // console.log(ts);
        r = new FileReader();

        r.onloadend = function (e) {
            $scope.u = {};
            var data = e.target.result;
            $scope.u.banner_img = $base64.encode(data);
            $scope.u.banner_id = id;
            // $scope.u={};
            // $scope.banner_id=id;
            // $scope.new_banner_img=data;


            console.log($scope.u);
            $http({
                method: "POST",
                url: "admin/update-banner-img-by-id",
                data: $scope.u
            }).then(function mySucces(response) {

                $scope.update_banner_fetch();

            }, function myError(response) {
                console.log('err');
            });
            //         //send your binary data via $http or $resource or do anything else with it


        }

        r.readAsBinaryString(f);
    }
    $scope.fetch_banner_details = {};
    $scope.fetch_all_banner_detail = function (details) {

        $http({
            method: "GET",
            url: "admin/fetch-all-banner-details",

        }).then(function mySucces(response) {

            console.log(response);
            $scope.fetch_banner_details = response.data;

        }, function myError(response) {
            console.log('err');
        });

    }

    var count_all_banners = false;
    $scope.checkAll_for_banners = function () {

        if ($scope.hasAllCookChecked) {

            $scope.hasAllCookChecked = true;
            count_all_banners = true;
        } else {
            $scope.selection = [];
            $scope.hasAllCookChecked = false;
            count_all_banners = false;
        }
        angular.forEach($scope.fetch_banner_details, function (item) {
            item.selected = $scope.hasAllCookChecked;
        });

    };

    $scope.banner_delete = function () {


        swal({
            title: "Are you sure?",
            text: "You are going to delete Banner Details.!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plz!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {


                    if ($scope.selection.length < 1 && count_all_banners == false) {
                        sweetAlert("Oops...", "No Checkbox Selected!", "error");
                    }
                    else {



                        if ($scope.selection.length < 1 && $scope.hasAllCookChecked == true) {

                            $scope.u = {};
                            $scope.u.admin_id = $cookieStore.get('admin_id');
                            $http({
                                method: "POST",
                                url: "admin/delete-all-banners",
                                data: $scope.u
                            }).then(function mySucces(response) {

                                // $scope.hasAllCookChecked=false;
                                // $scope.hasAllCookChecked.selected=false;
                                swal("Deleted!", "All  Banners Are Deleted!", "success");
                                $timeout(function () {
                                    $scope.fetch_all_banner_detail();

                                }, 400);

                            }, function myError(response) {
                                console.log('err');
                            });
                        }
                        if ($scope.selection.length > 0 && count_all_banners == false || $scope.hasAllCookChecked == false) {

                            $scope.u = {};
                            $scope.u.selected_banner = $scope.selection;
                            $scope.u.admin_id = $cookieStore.get('admin_id');
                            console.log($scope.u);
                            $http({
                                method: "POST",
                                url: "admin/delete-selected-banner",
                                data: $scope.u
                            }).then(function mySucces(response) {

                                swal("Deleted!", "Banner Successfully Deleted..!", "success");
                                $scope.selection = [];
                                $timeout(function () {
                                    $scope.fetch_all_banner_detail();

                                }, 400);

                                // Notification.error({message: 'Info Page Successfully Deleted..', delay: 3000});
                            }, function myError(response) {
                                console.log('err');
                            });
                        }
                        if ($scope.selection.length > 0 && count_all_banners == true && $scope.hasAllCookChecked == true) {
                            $scope.u = {};
                            $scope.u.admin_id = $cookieStore.get('admin_id');
                            $http({
                                method: "POST",
                                url: "admin/delete-all-banners",
                                data: $scope.u
                            }).then(function mySucces(response) {

                                // $scope.hasAllCookChecked=false;
                                // $scope.hasAllCookChecked.selected=false;
                                swal("Deleted!", "All  Banners Are Deleted!", "success");
                                $timeout(function () {
                                    $scope.fetch_all_banner_detail();

                                }, 400);

                            }, function myError(response) {
                                console.log('err');
                            });
                        }

                    }




                } else {
                    swal("Cancelled", "Your cancelled to delete cook :)", "error");
                }
            });

        // console.log($scope.selection);



    };

    $scope.selectedItemChanged_Banner = function (val) {

        swal({
            title: "Are you sure?",
            text: "You are going to Change Status of Banners!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Change it!",
            cancelButtonText: "No, cancel plz!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    if ($scope.selection.length < 1 && count_all_banners == false) {
                        sweetAlert("Oops...", "No Checkbox Selected!", "error");
                    }
                    else {

                        if ($scope.hasAllCookChecked == undefined || $scope.hasAllCookChecked == false && $scope.selection.length > 0) {

                            if (val == "Enable") {


                                console.log($scope.selection);
                                $http({
                                    method: "POST",
                                    url: "admin/enable-banner-by-id",
                                    data: $scope.selection
                                }).then(function mySucces(response) {

                                    $scope.selection = [];
                                    $timeout(function () {

                                        $scope.fetch_all_banner_detail();

                                    }, 400);
                                    swal("Enabled!", "Banners Status Successfully Changed..!", "success");
                                }, function myError(response) {
                                    console.log('err');
                                });
                            }

                            else if (val == "Disable") {
                                console.log('Selected Disabling');
                                console.log($scope.selection);
                                $http({
                                    method: "POST",
                                    url: "admin/disable-banner-by-id",
                                    data: $scope.selection
                                }).then(function mySucces(response) {
                                    $scope.selection = [];

                                    $timeout(function () {

                                        $scope.fetch_all_banner_detail();

                                    }, 400);
                                    swal("Disabled!", "Banners Status Successfully Changed..!", "success");
                                }, function myError(response) {
                                    console.log('err');
                                });

                            }

                        }
                        else
                            if ($scope.hasAllCookChecked == undefined || $scope.hasAllCookChecked == true) {

                                $scope.u = {};
                                $scope.u.admin_id = $cookieStore.get('admin_id');

                                if (val == "Enable") {


                                    console.log($scope.selection);
                                    $http({
                                        method: "POST",
                                        url: "admin/enable-all-banner",
                                        data: $scope.u
                                    }).then(function mySucces(response) {
                                        $scope.hasAllCookChecked = false;
                                        $scope.selection = [];
                                        $timeout(function () {

                                            $scope.fetch_all_banner_detail();

                                        }, 400);


                                        swal("Enabled All!", "Banners Status Successfully Changed..!", "success");
                                    }, function myError(response) {
                                        console.log('err');
                                    });
                                }

                                else if (val == "Disable") {


                                    console.log($scope.selection);
                                    $http({
                                        method: "POST",
                                        url: "admin/disable-all-banner",
                                        data: $scope.u
                                    }).then(function mySucces(response) {
                                        $scope.selection = [];
                                        $scope.hasAllCookChecked = false;
                                        $timeout(function () {

                                            $scope.fetch_all_banner_detail();

                                        }, 400);
                                        swal("Disabled All!", "Banners Status Successfully Changed..!", "success");
                                    }, function myError(response) {
                                        console.log('err');
                                    });

                                }

                            }





                    }
                }
                else {
                    swal("Cancelled", "Your cancelled to Change Coupons Status :)", "error");
                }


            });


    }

    $scope.tmp_banner_id = ""
    $scope.update_banner_temp = function (banner_id) {

        console.log(banner_id);

        $scope.tmp_banner_id = banner_id;
        $cookieStore.put('banner_id', $scope.tmp_banner_id);

    }

    $scope.update_banner_model = {};
    $scope.update_banner_model_for_details = {};
    $scope.update_banner_fetch = function () {

        $scope.u = {};
        $scope.u.banner_id = $cookieStore.get('banner_id');

        $http({
            method: "POST",
            url: "admin/fetch-banner-by-id",
            data: $scope.u
        }).then(function mySucces(response) {

            console.log(response);
            $scope.update_banner_model = response.data;
            $scope.update_banner_model_for_details = response.data.banner_details;
            console.log($scope.update_banner_model_for_details);
            // console.log($scope.update_page_info_model);
        }, function myError(response) {
            console.log('err');
        });
    }
    $scope.update_banner = function () {


        $scope.u = {};
        $scope.u.banner_info = $scope.update_banner_model;
        $scope.u.banner_details = $scope.update_banner_model_for_details;
        console.log($scope.u.banner_info);
        Notification.info({ message: 'Banner Successfully Updated.', delay: 3000 });
        $http({
            method: "POST",
            url: "admin/update-banner-details",
            data: $scope.u.banner_info
        }).then(function mySucces(response) {

            // console.log(response);
            // $scope.update_info_pages_fetch();
            // Notification.info({ message: 'Info Page Successfully Updated.', delay: 3000 });
            //     $scope.update_page_info_model=response.data.info_pages[0];
            //    console.log( $scope.update_page_info_model);
        }, function myError(response) {
            console.log('err');
        });
    }



    $scope.onSelectBannerChange = function (val) {



        if (val == "home_page_banner") {

            var src = $("#l_image").attr('src').replace($("#l_image").attr('src'), "uploads/banner/1.jpg");
            $("#l_image").attr('src', src);

            var src2 = $("#l_image_pop_up").attr('src').replace($("#l_image_pop_up").attr('src'), "uploads/banner/1.jpg");
            $("#l_image_pop_up").attr('src', src2);
        }
        else if (val == "listing_banner_2") {

            var src = $("#l_image").attr('src').replace($("#l_image").attr('src'), "uploads/banner/4.jpg");
            $("#l_image").attr('src', src);
            var src2 = $("#l_image_pop_up").attr('src').replace($("#l_image_pop_up").attr('src'), "uploads/banner/4.jpg");
            $("#l_image_pop_up").attr('src', src2);
        }
        else if (val == "listing_background_banner") {

            var src = $("#l_image").attr('src').replace($("#l_image").attr('src'), "uploads/banner/2.jpg");
            $("#l_image").attr('src', src);
            var src2 = $("#l_image_pop_up").attr('src').replace($("#l_image_pop_up").attr('src'), "uploads/banner/2.jpg");
            $("#l_image_pop_up").attr('src', src2);
        }
        else if (val == "food_detail_page_banner") {

            var src = $("#l_image").attr('src').replace($("#l_image").attr('src'), "uploads/banner/3.jpg");
            $("#l_image").attr('src', src);
            var src2 = $("#l_image_pop_up").attr('src').replace($("#l_image_pop_up").attr('src'), "uploads/banner/3.jpg");
            $("#l_image_pop_up").attr('src', src2);
        }
        else {
            var src = $("#l_image").attr('src').replace($("#l_image").attr('src'), "uploads/banner/logo.jpg");
            $("#l_image").attr('src', src);
            var src2 = $("#l_image_pop_up").attr('src').replace($("#l_image_pop_up").attr('src'), "uploads/banner/logo.jpg");
            $("#l_image_pop_up").attr('src', src2);

        }

    }


    /*** Till BANNER */



    /**********Add Layout Info IN Admin ****/

    $scope.layout = {};

    $scope.save_layout = function (layout) {

        console.log(layout);

        var str = layout.layout_type;

        $scope.u.layout_type = layout.layout_type;
        $scope.u.layout_status = layout.layout_status;
        $scope.u.banner_id = layout.layout_banner_assign._id;
        $scope.u.banner_name = layout.layout_banner_assign.banner_name;


        var sms_template;
        String.prototype.replaceAll = function (target, replacement) {
            return this.split(target).join(replacement);
        };

        sms_template = layout.layout_type.replaceAll("_", "-");

        $scope.u.layout_name = sms_template;

        console.log($scope.u);
        $http({
            method: "POST",
            url: "admin/add-layout-page",
            data: $scope.u
        }).then(function mySucces(response) {

            //console.log(response);
            Notification.info({ message: 'Layout Successfully Added.', delay: 3000 });
            $scope.banner_detail = "";
            //    $scope.save_information_page_details = "";
        }, function myError(response) {
            console.log('err');
        });

    }

    $scope.view_layout_detail = {};
    $scope.fetch_layout_detail = function (info_id) {

        $http({
            method: "POST",
            url: "admin/fetch-layout-detail",

        }).then(function mySucces(response) {

            console.log(response.data);
            $scope.view_layout_detail = response.data;
            // console.log(response.data.info_pages);

        }, function myError(response) {
            console.log('err');
        });

    }

    var count_all_layout = false;
    $scope.checkAll_for_layout = function () {

        if ($scope.hasAllCookChecked) {

            $scope.hasAllCookChecked = true;
            count_all_layout = true;
        } else {
            $scope.selection = [];
            $scope.hasAllCookChecked = false;
            count_all_layout = false;
        }
        angular.forEach($scope.view_layout_detail, function (item) {
            item.selected = $scope.hasAllCookChecked;
        });

    };


    $scope.layout_page_delete = function () {


        swal({
            title: "Are you sure?",
            text: "You are going to delete Layout Detail.!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plz!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {


                    if ($scope.selection.length < 1 && count_all_layout == false) {
                        sweetAlert("Oops...", "No Checkbox Selected!", "error");
                    }
                    else {



                        if ($scope.selection.length < 1 && $scope.hasAllCookChecked == true) {
                            console.log('delete all pages');
                            $scope.u = {};
                            $scope.u.admin_id = $cookieStore.get('admin_id');
                            $http({
                                method: "POST",
                                url: "admin/delete-all-layout-pages",
                                data: $scope.u
                            }).then(function mySucces(response) {

                                // $scope.hasAllCookChecked=false;
                                // $scope.hasAllCookChecked.selected=false;
                                swal("Deleted!", "All Layout Details Are Deleted!", "success");
                                $timeout(function () {
                                    $scope.fetch_layout_detail();

                                }, 400);

                            }, function myError(response) {
                                console.log('err');
                            });
                        }
                        if ($scope.selection.length > 0 && count_all_layout == false || $scope.hasAllCookChecked == false) {

                            console.log('delete selected layout');
                            $scope.u = {};
                            $scope.u.selected_layout_page = $scope.selection;
                            $scope.u.admin_id = $cookieStore.get('admin_id');
                            console.log($scope.u);
                            $http({
                                method: "POST",
                                url: "admin/delete-selected-layout-pages",
                                data: $scope.u
                            }).then(function mySucces(response) {

                                swal("Deleted!", "Info Page Successfully Deleted..!", "success");
                                $scope.selection = [];
                                $timeout(function () {
                                    $scope.fetch_layout_detail();

                                }, 400);

                                // Notification.error({message: 'Info Page Successfully Deleted..', delay: 3000});
                            }, function myError(response) {
                                console.log('err');
                            });
                        }
                        if ($scope.selection.length > 0 && count_all_layout == true && $scope.hasAllCookChecked == true) {
                            console.log('delete all pages');
                            $scope.u = {};
                            $scope.u.admin_id = $cookieStore.get('admin_id');
                            $http({
                                method: "POST",
                                url: "admin/delete-all-layout-pages",
                                data: $scope.u
                            }).then(function mySucces(response) {

                                // $scope.hasAllCookChecked=false;
                                // $scope.hasAllCookChecked.selected=false;
                                swal("Deleted!", "All Layout Details Are Deleted!", "success");
                                $timeout(function () {
                                    $scope.fetch_layout_detail();

                                }, 400);

                            }, function myError(response) {
                                console.log('err');
                            });
                        }

                    }




                } else {
                    swal("Cancelled", "Your cancelled to delete cook :)", "error");
                }
            });

    }


    $scope.selectedItemChanged_Layout = function (val) {

        swal({
            title: "Are you sure?",
            text: "You are going to Change Status of Layout!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Change it!",
            cancelButtonText: "No, cancel plz!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    if ($scope.selection.length < 1 && count_all_layout == false) {
                        sweetAlert("Oops...", "No Checkbox Selected!", "error");
                    }
                    else {

                        if ($scope.hasAllCookChecked == undefined || $scope.hasAllCookChecked == false && $scope.selection.length > 0) {

                            if (val == "Enable") {

                                console.log('Selected Enabling');
                                console.log($scope.selection);
                                $http({
                                    method: "POST",
                                    url: "admin/enable-layout-by-id",
                                    data: $scope.selection
                                }).then(function mySucces(response) {

                                    $scope.selection = [];
                                    $timeout(function () {

                                        $scope.fetch_layout_detail();

                                    }, 400);
                                    swal("Changed!", "Layout Status Successfully Changed..!", "success");
                                }, function myError(response) {
                                    console.log('err');
                                });
                            }

                            else if (val == "Disable") {
                                console.log('Selected Disabling');
                                console.log($scope.selection);
                                $http({
                                    method: "POST",
                                    url: "admin/disable-layout-by-id",
                                    data: $scope.selection
                                }).then(function mySucces(response) {
                                    $scope.selection = [];

                                    $timeout(function () {

                                        $scope.fetch_layout_detail();

                                    }, 400);
                                    swal("Changed!", "Layout Status Successfully Changed..!", "success");
                                }, function myError(response) {
                                    console.log('err');
                                });

                            }

                        }
                        else
                            if ($scope.hasAllCookChecked == undefined || $scope.hasAllCookChecked == true) {

                                $scope.u = {};
                                $scope.u.admin_id = $cookieStore.get('admin_id');

                                if (val == "Enable") {


                                    console.log($scope.selection);
                                    $http({
                                        method: "POST",
                                        url: "admin/enable-all-layout",
                                        data: $scope.u
                                    }).then(function mySucces(response) {
                                        $scope.hasAllCookChecked = false;
                                        $scope.selection = [];
                                        $timeout(function () {

                                            $scope.fetch_layout_detail();

                                        }, 400);


                                        swal("Changed!", "Layout Status Successfully Changed..!", "success");
                                    }, function myError(response) {
                                        console.log('err');
                                    });
                                }

                                else if (val == "Disable") {


                                    console.log($scope.selection);
                                    $http({
                                        method: "POST",
                                        url: "admin/disable-all-layout",
                                        data: $scope.u
                                    }).then(function mySucces(response) {
                                        $scope.selection = [];
                                        $scope.hasAllCookChecked = false;
                                        $timeout(function () {

                                            $scope.fetch_layout_detail();

                                        }, 400);
                                        swal("Changed!", "Layout Status Successfully Changed..!", "success");
                                    }, function myError(response) {
                                        console.log('err');
                                    });

                                }

                            }





                    }
                }
                else {
                    swal("Cancelled", "Your cancelled to Change Layout Status :)", "error");
                }


            });
    }
    //         $scope.view_info_detail = {};
    // $scope.fetch_info_pages = function (info_id) {

    //     $http({
    //         method: "POST",
    //         url: "admin/fetch-info-pages",

    //     }).then(function mySucces(response) {

    //         $scope.view_info_detail = response.data.info_pages;
    //         console.log(response.data.info_pages);

    //     }, function myError(response) {
    //         console.log('err');
    //     });

    // }

    $scope.update_layout_temp = function (layout_id) {

        console.log(layout_id);

        $scope.tmp_layout_id = layout_id;
        // // console.log(tmp_coupon_id) ;
        $cookieStore.put('layout_id', $scope.tmp_layout_id);

    }

    $scope.update_layout_model = {};
    $scope.update_layout_fetch_admin = function () {

        $scope.u = {};
        $scope.u.layout_id = $cookieStore.get('layout_id');

        $http({
            method: "POST",
            url: "admin/fetch-layout-by-id",
            data: $scope.u
        }).then(function mySucces(response) {
            console.log(response.data);

            $scope.update_layout_model = response.data[0];


            if ($scope.update_layout_model.layout_type == "home_page_banner") {

                var src = $("#l_image").attr('src').replace($("#l_image").attr('src'), "uploads/banner/1.jpg");
                $("#l_image").attr('src', src);

                var src2 = $("#l_image_pop_up").attr('src').replace($("#l_image_pop_up").attr('src'), "uploads/banner/1.jpg");
                $("#l_image_pop_up").attr('src', src2);
            }
            else if ($scope.update_layout_model.layout_type == "listing_banner_2") {

                var src = $("#l_image").attr('src').replace($("#l_image").attr('src'), "uploads/banner/4.jpg");
                $("#l_image").attr('src', src);
                var src2 = $("#l_image_pop_up").attr('src').replace($("#l_image_pop_up").attr('src'), "uploads/banner/4.jpg");
                $("#l_image_pop_up").attr('src', src2);
            }
            else if ($scope.update_layout_model.layout_type == "listing_background_banner") {

                var src = $("#l_image").attr('src').replace($("#l_image").attr('src'), "uploads/banner/2.jpg");
                $("#l_image").attr('src', src);
                var src2 = $("#l_image_pop_up").attr('src').replace($("#l_image_pop_up").attr('src'), "uploads/banner/2.jpg");
                $("#l_image_pop_up").attr('src', src2);
            }
            else {
                var src = $("#l_image").attr('src').replace($("#l_image").attr('src'), "uploads/banner/logo.jpg");
                $("#l_image").attr('src', src);
                var src2 = $("#l_image_pop_up").attr('src').replace($("#l_image_pop_up").attr('src'), "uploads/banner/logo.jpg");
                $("#l_image_pop_up").attr('src', src2);

            }

            // console.log($scope.layout);
        }, function myError(response) {
            console.log('err');
        });
    }
    $scope.update_layout_page = function () {


        $scope.u = {};

        //  $scope.u = $scope.update_layout_model;
        $scope.u.layout_id = $cookieStore.get('layout_id');
        $scope.u.layout_type = $scope.update_layout_model.layout_type;
        $scope.u.layout_status = $scope.update_layout_model.layout_status;
        $scope.u.banner_id = $scope.update_layout_model.assined_banner_id;
        $scope.u.banner_name = $scope.update_layout_model.assined_banner_name;

        var sms_template;
        String.prototype.replaceAll = function (target, replacement) {
            return this.split(target).join(replacement);
        };

        sms_template = $scope.update_layout_model.layout_type.replaceAll("_", "-");

        $scope.u.layout_name = sms_template;

        console.log($scope.u);
        $http({
            method: "POST",
            url: "admin/update-layout-page",
            data: $scope.u
        }).then(function mySucces(response) {

            console.log(response);

            Notification.info({ message: 'Layout Details Successfully Updated.', delay: 3000 });
            $scope.update_layout_fetch();
            //     $scope.update_page_info_model=response.data.info_pages[0];
            //    console.log( $scope.update_page_info_model);
        }, function myError(response) {
            console.log('err');
        });

    }





    /*** Till Layout */




    /********** Template email and sms IN ADMIN ****/
    $scope.sms_temp_detail = {};
    $scope.email_temp_detail = {};

    $scope.sms_temp = function (val) {

        console.log(val);
        var cursorPos = $('#mail_body').prop('selectionStart');
        console.log(cursorPos);
        var v = $('#mail_body').val();
        var textBefore = v.substring(0, cursorPos);
        var textAfter = v.substring(cursorPos, v.length);
        $('#mail_body').val(textBefore + val + textAfter);


    }

    $scope.email_temp_body = function (val) {


        var cursorPos = $('#mail_body_email').prop('selectionStart');
        console.log(cursorPos);
        var v = $('#mail_body_email').val();
        var textBefore = v.substring(0, cursorPos);
        var textAfter = v.substring(cursorPos, v.length);
        $('#mail_body_email').val(textBefore + val + textAfter);

        console.log($('#mail_body_email').val());
    }

    $scope.email_temp_subj = function (val) {


        var cursorPos = $('#mail_body_subj').prop('selectionStart');
        console.log(cursorPos);
        var v = $('#mail_body_subj').val();
        var textBefore = v.substring(0, cursorPos);
        var textAfter = v.substring(cursorPos, v.length);
        $('#mail_body_subj').val(textBefore + val + textAfter);

        console.log($('#mail_body_subj').val());
    }

    $scope.basic_sms_template = "Hi \n\nThank you for your order! \n\nPlease find below, the summary of your order We will send you another email once the items in your order have been shipped. Meanwhile, you can check the status of your order on EatoEato "

    $scope.sms_temp_save = function () {

        $scope.u = {};
        $scope.u.admin_id = $cookieStore.get('admin_id');
        $scope.u.sms_type = $scope.sms_temp_detail.order_detail;
        $scope.u.sms_body = $('#mail_body').val();
        console.log($scope.u);
        $http({
            method: "POST",
            url: "admin/save-sms-template",
            data: $scope.u
        }).then(function mySucces(response) {
            Notification.info({ message: 'SMS Template Successfully Added..', delay: 3000 });

            $scope.sms_temp_detail = "";

        }, function myError(response) {
            console.log('err');
        });
    }


    $scope.save_template_name = function (val) {
        $cookieStore.put('templ_view_name', val);
    }

    $scope.fetch_template_by_name = function () {

        $scope.u.temp_view_id = $cookieStore.get('templ_view_name');

        console.log($scope.u);
        $http({
            method: "POST",
            url: "admin/fetch-template-by-type",
            data: $scope.u
        }).then(function mySucces(response) {
            //    Notification.info({ message: 'SMS Template Successfully Added..', delay: 3000 });
            console.log(response.data);
            if (response.data.hasOwnProperty('status')) {
                Notification.error({ message: 'No Record Found', delay: 3000 });
                console.log('No record found')
            }
            else {
                $scope.basic_sms_template = response.data.sms_template;
                $scope.sms_temp_detail.order_detail = response.data.sms_type;
                console.log('we have data');
            }

        }, function myError(response) {
            console.log('err');
        });
    }

    $scope.fetch_sms_template_on_select = function (val) {

        $scope.u.temp_view_id = val;

        console.log($scope.u);
        $http({
            method: "POST",
            url: "admin/fetch-template-by-type",
            data: $scope.u
        }).then(function mySucces(response) {
            //    Notification.info({ message: 'SMS Template Successfully Added..', delay: 3000 });
            console.log(response.data);
            if (response.data.hasOwnProperty('status')) {
                console.log('No record found')
                Notification.error({ message: 'No Record Found', delay: 3000 });
                $scope.basic_sms_template = "Hi \n\nThank you for your order! \n\nPlease find below, the summary of your order We will send you another email once the items in your order have been shipped. Meanwhile, you can check the status of your order on EatoEato "

            }
            else {
                $scope.basic_sms_template = response.data.sms_template;
                $scope.sms_temp_detail.order_detail = response.data.sms_type;
                console.log('we have data');
            }

        }, function myError(response) {
            console.log('err');
            console.log(val);
        });
    }

    $scope.email_temp_save = function () {

        $scope.u = {};
        $scope.u.admin_id = $cookieStore.get('admin_id');
        $scope.u.email_type = $scope.email_temp_detail.email_type;
        $scope.u.email_subj = $('#mail_body_subj').val();
        $scope.u.email_body = $('#mail_body_email').val();
        console.log($scope.u);
        $http({
            method: "POST",
            url: "admin/save-email-template",
            data: $scope.u
        }).then(function mySucces(response) {
            Notification.info({ message: 'Email Template Successfully Added..', delay: 3000 });

            //$scope.sms_temp_detail="";

        }, function myError(response) {
            console.log('err');
        });
    }

    $scope.fetch_email_template_by_name = function () {

        $scope.u.temp_view_id = $cookieStore.get('templ_view_name');

        console.log($scope.u);
        $http({
            method: "POST",
            url: "admin/fetch-email-template-by-type",
            data: $scope.u
        }).then(function mySucces(response) {
            //    Notification.info({ message: 'SMS Template Successfully Added..', delay: 3000 });
            console.log(response.data);
            if (response.data.hasOwnProperty('status')) {
                Notification.error({ message: 'No Record Found', delay: 3000 });
                console.log('No record found')
            }
            else {
                $scope.email_temp_detail.mail_subj = response.data.email_subj;
                $scope.basic_sms_template = response.data.email_body;
                $scope.email_temp_detail.email_type = response.data.email_type;
                console.log('we have data');
            }

        }, function myError(response) {
            console.log('err');
        });
    }

    $scope.fetch_email_template_on_select = function (val) {

        $scope.u.temp_view_id = val;

        console.log($scope.u);
        $http({
            method: "POST",
            url: "admin/fetch-email-template-by-type",
            data: $scope.u
        }).then(function mySucces(response) {
            //    Notification.info({ message: 'SMS Template Successfully Added..', delay: 3000 });
            console.log(response.data);
            if (response.data.hasOwnProperty('status')) {
                console.log('No record found')
                Notification.error({ message: 'No Record Found', delay: 3000 });
                $scope.basic_sms_template = "Hi \n\nThank you for your order! \n\nPlease find below, the summary of your order We will send you another email once the items in your order have been shipped. Meanwhile, you can check the status of your order on EatoEato "

            }
            else {
                $scope.basic_sms_template = response.data.sms_template;
                $scope.sms_temp_detail.order_detail = response.data.sms_type;
                console.log('we have data');
            }

        }, function myError(response) {
            console.log('err');
            console.log(val);
        });
    }

    /*** Till Template */

    /**********Add Cateogories Info IN ADMIN ****/
    $scope.category_status_show = false;
    $scope.category_banner_show = false;
    $scope.complete_category_saved = false;

    $scope.category_details = {};

    $scope.save_categories_infos = function (category_details_info) {
        $scope.u = {};
        $scope.u = category_details_info;
        $scope.u.cat_img = $scope.categoryImageData;
        $scope.u.cat_banner = $scope.categoryBannerData;
        // console.log(category_details_info);


        console.log($scope.u);
        $http({
            method: "POST",
            url: "admin/add-product-category",
            data: $scope.u
        }).then(function mySucces(response) {

            $scope.category_details = "";
            $scope.categoryImageData = "";
            $scope.categoryBannerData = "";
            $scope.complete_category_saved = true;

            Notification.info({ message: 'New Cusine Added.', delay: 3000 });


        }, function myError(response) {
            console.log('err');
        });
    }

    $scope.user_profile_image_status = false;

    $scope.categoryImageData = "";
    $scope.categoryBannerData = "";


    $scope.upload_cateogory_image = function (files) {

        if (files[0] == undefined) return;
        $scope.fileExt = files[0].name.split(".").pop();

        var f = document.getElementById('category-image').files[0];


        r = new FileReader();

        r.onloadend = function (e) {

            var data = e.target.result;

            $scope.categoryImageData = $base64.encode(data);
            //console.log($scope.imageData);

            //send your binary data via $http or $resource or do anything else with it


        }

        r.readAsBinaryString(f);

    }

    $scope.upload_cateogory_banner = function (files) {

        if (files[0] == undefined) return;
        $scope.fileExt = files[0].name.split(".").pop();

        var f = document.getElementById('category-banner').files[0];


        r = new FileReader();

        r.onloadend = function (e) {

            var data = e.target.result;

            $scope.categoryBannerData = $base64.encode(data);
            //console.log($scope.imageData);

            //send your binary data via $http or $resource or do anything else with it


        }

        r.readAsBinaryString(f);

    }





    // FOR ATTRIBUTE OPERATIONS

    $scope.att_group_details = {};
    $scope.add_atribute_group = function (details) {

        $http({
            method: "POST",
            url: "admin/add-attribute-group",
            data: $scope.att_group_details
        }).then(function mySucces(response) {

            console.log(response);
            //    $scope.category_details="";
            //  $scope.complete_category_saved=true;

            //         $timeout( function()
            //      {

            //         $scope.complete_category_saved=false;

            //         }, 3000);


        }, function myError(response) {
            console.log('err');
        });

    }


    $scope.view_attribute_group = {};
    $scope.fetch_attribute_group = function (info_id) {

        $http({
            method: "GET",
            url: "admin/fetch-attribute-group",

        }).then(function mySucces(response) {

            console.log(response.data);
            $scope.view_attribute_group = response.data;
            // console.log(response.data.info_pages);

        }, function myError(response) {
            console.log('err');
        });

    }

    var count_all_attr_group = false;
    $scope.checkAll_attr_group = function () {

        if ($scope.hasAllCookChecked) {

            $scope.hasAllCookChecked = true;
            count_all_attr_group = true;
        } else {
            $scope.selection = [];
            $scope.hasAllCookChecked = false;
            count_all_attr_group = false;
        }
        angular.forEach($scope.view_attribute_group, function (item) {
            item.selected = $scope.hasAllCookChecked;
        });

    };

    $scope.details_for_group = {};
    $scope.fetch_attr_group_name = function () {

        $http({
            method: "GET",
            url: "admin/fetch-attr-group-name"

        }).then(function mySucces(response) {

            $scope.details_for_group = response.data;
            console.log('THIS IS ATTR GRUOP NAME');
            console.log(response.data);

        }, function myError(response) {
            console.log('err');
        });
    }




    $scope.attr_group_delete = function () {


        swal({
            title: "Are you sure?",
            text: "You are going to delete Attribute Group.!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plz!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {


                    if ($scope.selection.length < 1 && count_all_attr_group == false) {
                        sweetAlert("Oops...", "No Checkbox Selected!", "error");
                    }
                    else {



                        if ($scope.selection.length < 1 && $scope.hasAllCookChecked == true) {
                            console.log('delete all pages');

                            swal("Blocked!", "This Function is Blocked because it is dependent on other modules!", "warning");
                            $timeout(function () {

                            }, 400);

                        }
                        if ($scope.selection.length > 0 && count_all_attr_group == false || $scope.hasAllCookChecked == false) {
                            $scope.u = {};
                            $scope.u.selected_attr_group = $scope.selection;
                            $scope.u.admin_id = $cookieStore.get('admin_id');
                            $http({
                                method: "POST",
                                url: "admin/delete-selected-attr-group",
                                data: $scope.u
                            }).then(function mySucces(response) {

                                swal("Deleted!", "Attribute Group Successfully Deleted..!", "success");
                                $scope.selection = [];
                                $timeout(function () {
                                    $scope.fetch_attr_group_name();

                                }, 400);

                                // Notification.error({message: 'Info Page Successfully Deleted..', delay: 3000});
                            }, function myError(response) {
                                console.log('err');
                            });
                        }
                        if ($scope.selection.length > 0 && count_all_attr_group == true && $scope.hasAllCookChecked == true) {
                            console.log('delete all pages');
                            swal("Blocked!", "This Function is Blocked because it is dependent on other modules!", "warning");
                            $timeout(function () {

                            }, 400);

                        }

                    }




                } else {
                    swal("Cancelled", "Your cancelled to delete Atribute Group :)", "error");
                }
            });

        // console.log($scope.selection);


    };

    $scope.update_attyr_group_temp = function (attr_group_id) {

        console.log(attr_group_id);

        $scope.attr_group_id = attr_group_id;
        // // console.log(tmp_coupon_id) ;
        $cookieStore.put('temp_id', $scope.attr_group_id);

    }


    //$scope.update_attr_group_view={};
    $scope.update_attyr_group_fetch = function () {

        $scope.u.attr_group_id = $cookieStore.get('temp_id');

        $http({
            method: "POST",
            url: "admin/fetch-attr-group-by-id",
            data: $scope.u
        }).then(function mySucces(response) {

            console.log(response);
            $scope.att_group_details = response.data[0];
            // console.log($scope.update_layout_model);
        }, function myError(response) {
            console.log('err');
        });
    }


    $scope.update_attyr_group = function (data) {

        // $scope.u.attr_group_id = $cookieStore.get('temp_id');

        console.log(data);
        $scope.u = data;
        $http({
            method: "POST",
            url: "admin/udpate-attr-group",
            data: $scope.u
        }).then(function mySucces(response) {

            console.log(response);
            //    $scope.att_group_details = response.data[0];
            // console.log($scope.update_layout_model);
        }, function myError(response) {
            console.log('err');
        });
    }


    $scope.update_attr__model = {};
    $scope.update_layout_fetch = function () {

        $scope.u = {};
        $scope.u.layout_id = $cookieStore.get('layout_id');

        $http({
            method: "POST",
            url: "admin/fetch-layout-by-id",
            data: $scope.u
        }).then(function mySucces(response) {


            $scope.update_layout_model = response.data.layout_pages[0];
            console.log($scope.update_layout_model);
        }, function myError(response) {
            console.log('err');
        });
    }



    // $scope.update_layout_page = function () {


    //     $scope.u = {};

    //     $scope.u = $scope.update_layout_model;
    //     console.log($scope.u);
    //     $http({
    //         method: "POST",
    //         url: "admin/update-layout-page",
    //         data: $scope.u
    //     }).then(function mySucces(response) {

    //         console.log(response);

    //         Notification.info({ message: 'Layout Details Successfully Updated.', delay: 3000 });
    //           $scope.update_layout_fetch();
    //         //     $scope.update_page_info_model=response.data.info_pages[0];
    //         //    console.log( $scope.update_page_info_model);
    //     }, function myError(response) {
    //         console.log('err');
    //     });

    // }


    // ATTRIBUTE FIELDS INFO

    $scope.attr_fields_details = {};
    $scope.save_group_att_fields = function (ff) {
        $scope.u = {};
        $scope.u.f_name = ff.f_name;
        $scope.u.g_name = ff.g_name.group_name;
        $scope.u.sort_order = ff.sort_order;
        console.log($scope.u);
        $http({
            method: "POST",
            url: "admin/save-attr-field-name",
            data: $scope.u
        }).then(function mySucces(response) {

            console.log(response);

        }, function myError(response) {
            console.log('err');
        });
    }


    $scope.view_attr_field = {};
    $scope.fetch_attribute = function () {

        $http({
            method: "GET",
            url: "admin/fetch-attribute-list-detail",

        }).then(function mySucces(response) {

            // console.log(response.data.groupname);
            var temp = [];
            for (var i = 0; i < response.data.length; i++) {

                for (var j = 0; j < response.data[i].attr_fields.length; j++) {

                    var obj = {};

                    obj.group_attr = response.data[i].attr_fields[j].group_attr;
                    obj.parent_group = response.data[i].attr_fields[j].parent_group;
                    obj._id = response.data[i].attr_fields[j]._id;

                    temp.push(obj);
                }
            }
            $scope.view_attr_field = temp;
            console.log(temp);
        }, function myError(response) {
            console.log('err');
        });

    }


    var count_all_attr_fields = false;
    $scope.checkAll_for_attr_fields = function () {

        if ($scope.hasAllCookChecked) {

            $scope.hasAllCookChecked = true;
            count_all_attr_fields = true;
        } else {
            $scope.selection = [];
            $scope.hasAllCookChecked = false;
            count_all_attr_fields = false;
        }
        angular.forEach($scope.view_attr_field, function (item) {
            item.selected = $scope.hasAllCookChecked;
        });

    };



    $scope.attr_group_fields_delete = function () {


        swal({
            title: "Are you sure?",
            text: "You are going to delete Attribute Fields.!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plz!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {


                    if ($scope.selection.length < 1 && count_all_attr_fields == false) {
                        sweetAlert("Oops...", "No Checkbox Selected!", "error");
                    }
                    else {



                        if ($scope.selection.length < 1 && $scope.hasAllCookChecked == true) {
                            console.log('delete all pages');

                            swal("Blocked!", "This Function is Blocked because it is dependent on other modules!", "warning");
                            $timeout(function () {

                            }, 400);

                        }
                        if ($scope.selection.length > 0 && count_all_attr_fields == false || $scope.hasAllCookChecked == false) {
                            $scope.u = {};
                            $scope.u.selected_attr_field = $scope.selection;
                            $scope.u.admin_id = $cookieStore.get('admin_id');
                            $http({
                                method: "POST",
                                url: "admin/delete-selected-attr-field",
                                data: $scope.u
                            }).then(function mySucces(response) {

                                swal("Deleted!", "Attribute Field Successfully Deleted..!", "success");
                                $scope.selection = [];
                                $timeout(function () {
                                    $scope.fetch_attribute();

                                }, 400);

                                // Notification.error({message: 'Info Page Successfully Deleted..', delay: 3000});
                            }, function myError(response) {
                                console.log('err');
                            });
                        }
                        if ($scope.selection.length > 0 && count_all_attr_fields == true && $scope.hasAllCookChecked == true) {
                            console.log('delete all pages');
                            swal("Blocked!", "This Function is Blocked because it is dependent on other modules!", "warning");
                            $timeout(function () {

                            }, 400);

                        }

                    }




                } else {
                    swal("Cancelled", "Your cancelled to delete Atribute Field :)", "error");
                }
            });



        // $scope.update_attr__model = {};
        // $scope.update_layout_fetch = function () {

        //     $scope.u = {};
        //     $scope.u.layout_id = $cookieStore.get('layout_id');

        //     $http({
        //         method: "POST",
        //         url: "admin/fetch-layout-by-id",
        //         data: $scope.u
        //     }).then(function mySucces(response) {


        //         $scope.update_layout_model = response.data.layout_pages[0];
        //         console.log($scope.update_layout_model);
        //     }, function myError(response) {
        //         console.log('err');
        //     });
        // }


    }


    $scope.update_attr_field_temp = function (attr_field_id) {

        console.log(attr_field_id);

        $scope.attr_field_id = attr_field_id;
        // // console.log(tmp_coupon_id) ;
        $cookieStore.put('temp_id', $scope.attr_field_id);

    }


    $scope.update_attr_field_fetch = function () {

        $scope.u = {};
        $scope.u.attr_id = $cookieStore.get('temp_id');

        $http({
            method: "POST",
            url: "admin/fetch-attr-field-by-id",
            data: $scope.u
        }).then(function mySucces(response) {

            $scope.attr_fields_details = response.data[0];
            //  $scope.update_layout_model = response.data.layout_pages[0];
            console.log('THIS IS ATTR FIELDS')
            console.log(response.data[0]);
            $scope.attr_fields_details.group_name = $scope.attr_fields_details.parent_group;
        }, function myError(response) {
            console.log('err');
        });


    }

    $scope.update_attr_field_final = function (val) {

        $scope.u = {};
        $scope.u = val;
        console.log($scope.u);
        $http({
            method: "POST",
            url: "admin/update-attr-field-by-id",
            data: $scope.u
        }).then(function mySucces(response) {

            Notification.info({ message: 'Attribute Field Succeffully Updated', delay: 2000 });
            //   $scope.attr_fields_details=response.data[0];
            //  $scope.update_layout_model = response.data.layout_pages[0];
            // console.log(response.data[0]);
        }, function myError(response) {
            console.log('err');
        });

    }


    // TILL ATTRIBUTE FIELDS INFO

    // SERVICE CENTER OPERATIONS


    $scope.service_center_detail = {};


    $scope.add_service_center = function (data) {


        $scope.u = {};
        $scope.u = data;

        $scope.u = {};
        $scope.u = data;
        $scope.u.center_landmark = $('#autocomplete_addr').val();
        console.log($scope.u);
        $http({
            method: "POST",
            url: "admin/add-service-center",
            data: $scope.u
        }).then(function mySucces(response) {
            $scope.service_center_detail = "";
            Notification.info({ message: 'New Service Center Successfully Added.', delay: 3000 });

            $timeout(function () {
                $location.path('/admin/view-service-center');

            }, 3000);
        }, function myError(response) {
            console.log('err');
        });
        // console.log($scope.u);


    }


    $scope.selected_location_service_center_addr = function () {

        console.log('FUNCTION CALLED');
        blockUI.start('Please Wait..');
        $timeout(function () {
            blockUI.message('Fetching Location');
        }, 1000);

        $timeout(function () {
            blockUI.message('Autofilling Data..');
        }, 2000);

        $timeout(function () {
            blockUI.stop();
            var formatted_address = $.cookie('formatted_addr');
            console.log(formatted_address);
            var geocoder = new google.maps.Geocoder();
            var city, state, pin_code, lat, long;
            var is_get_data = false;

            geocoder.geocode({ 'address': formatted_address }, function (results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();

                    // console.log('THIS IS FORMATTED ONE ');
                    //  console.log(results[0]);
                    //   $localStorage.user_loc_name = results[0].address_components[0].long_name;

                    $scope.u = {};
                    $scope.u.lat = latitude;
                    $scope.u.long = longitude;

                    $cookieStore.put('user_lat_long', $scope.u);

                    console.log('this is USER');
                    console.log(results);
                    lat = latitude;
                    long = longitude;
                    for (var i = 0; i < results[0].address_components.length; i++) {

                        for (var j = 0; j < results[0].address_components[i].types.length; j++) {

                            if (results[0].address_components[i].types[j] == "administrative_area_level_1") {

                                city = results[0].address_components[i].long_name;


                            }

                            if (results[0].address_components[i].types[j] == "locality") {

                                state = results[0].address_components[i].long_name;
                            }
                            if (results[0].address_components[i].types[j] == "postal_code") {

                                pin_code = results[0].address_components[i].long_name;
                                is_get_data = true;
                            }
                        }
                    }

                    console.log(city);
                    console.log(state);
                    console.log(pin_code);

                    //$scope.cook_complete_details.city=city;
                    //   $scope.get_foods_for_listing();
                    //   window.location.href = '#/listing';
                    //       //  console.log(results[0] );
                    //          $timeout(function () {


                    // }, 3000);

                }
            });

            //    if (is_get_data == true) {
            $timeout(function () {
                $scope.service_center_detail.center_city = city;
                $scope.service_center_detail.center_state = state;
                $scope.service_center_detail.center_pincode = pin_code;
                $scope.service_center_detail.center_lat = lat;
                $scope.service_center_detail.center_long = long;


            }, 1000);


            //         }


        }, 3000);




    }

    $scope.ser_cen_loc = {};

    $scope.GetServiceCenterAddress = function () {


        var win = window.open('https://www.google.co.in/maps/place/New+Delhi,+Delhi/@28.5272181,77.068898,11z/data=!3m1!4b1!4m5!3m4!1s0x390cfd5b347eb62d:0x52c2b7494e204dce!8m2!3d28.6139391!4d77.2090212?hl=en', '_blank');
        if (win) {
            //Browser has allowed it to be opened
            win.focus();
        } else {
            //Browser has blocked it
            alert('Please allow popups for this website');
        }
        //  Notification.warning({ message: 'Please Wait For A While..', delay: 500 });
        //         var tt = "";
        //         $scope.locate_val = "Test Me";

        //         if (navigator.geolocation) {

        //             navigator.geolocation.getCurrentPosition(function (p) {
        //                 LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
        //                 var mapOptions = {
        //                     center: LatLng,
        //                     zoom: 13,
        //                     mapTypeId: google.maps.MapTypeId.ROADMAP
        //                 };
        //                 GetAddress(p.coords.latitude, p.coords.longitude, LatLng);
        //                 $scope.ser_cen_loc.lat=p.coords.latitude;
        //                 $scope.ser_cen_loc.long=p.coords.longitude;

        //       $("#lat").val(p.coords.latitude);
        //        $("#long").val(p.coords.longitude);
        //                 console.log(p.coords.latitude);
        //                 console.log(p.coords.longitude);



        //             });
        //         } else {
        //             alert('Geo Location feature is not supported in this browser.');

        //         }

        //         function GetAddress(lat, lng, add) {

        //             var geocoder = geocoder = new google.maps.Geocoder();
        //             geocoder.geocode({ 'latLng': add }, function (results, status) {

        //                 if (status == google.maps.GeocoderStatus.OK) {
        //                     if (results[1]) {

        //                          setTimeout(function () {
        //                   swal({
        //                     title: "Location Captured",
        //                     text: results[0].address_components[2].short_name,
        //                     type: "success",
        //                     confirmButtonText: "OK"
        //                 },
        //                     function (isConfirm) {
        //                         if (isConfirm) {

        //                         }
        //                     });
        //             }, 100);
        //                         // results[0].address_components[1].short_name+','+

        //                         tt = results[0].address_components[2].short_name;
        //                         //	console.log(results[0].address_components[1].short_name+','+results[0].address_components[2].long_name);
        //                         $("#location").text(tt);
        //                         $("#autocomplete").val(results[1].formatted_address);


        //                         //                        
        //                         console.log(tt);
        //                     }
        //                 }
        //             });
        //         }



    }

    $scope.view_service_center = {};

    $scope.fetch_service_center_with_orders = function (info_id) {

        console.log('FETCHING');
        $http({
            method: "POST",
            url: "admin/fetch-service-center-with-orders",

        }).then(function mySucces(response) {

            $scope.view_service_center = response.data;
            console.log(response);

        }, function myError(response) {
            console.log('err');
        });

    }

    $scope.serv_center_order_view = {};

    $scope.fetch_service_center_order_view = function () {

        $scope.u = {};
        $scope.u.service_center_id = $cookieStore.get('temp_global');

        $http({
            method: "POST",
            url: "admin/fetch-service-center-order-view",
            data: $scope.u
        }).then(function mySucces(response) {

            console.log('THIS IS SERVICE CENTER ');
            $scope.serv_center_order_view = response.data;
            console.log(response);

        }, function myError(response) {
            console.log('err');
        });


    }



    var count_all_service_center = false;
    $scope.checkAll_for_Service_center = function () {

        if ($scope.hasAllCookChecked) {

            $scope.hasAllCookChecked = true;
            count_all_service_center = true;
        } else {
            $scope.selection = [];
            $scope.hasAllCookChecked = false;
            count_all_service_center = false;
        }
        angular.forEach($scope.view_service_center, function (item) {
            item.selected = $scope.hasAllCookChecked;
        });

    };



    $scope.service_center_delete = function () {


        swal({
            title: "Are you sure?",
            text: "You are going to delete Service Center .!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plz!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {


                    if ($scope.selection.length < 1 && count_all_service_center == false) {
                        sweetAlert("Oops...", "No Checkbox Selected!", "error");
                    }
                    else {



                        if ($scope.selection.length < 1 && $scope.hasAllCookChecked == true) {

                            $scope.u = {};

                            $http({
                                method: "POST",
                                url: "admin/delete-all-service-center",
                                data: $scope.u
                            }).then(function mySucces(response) {

                                // $scope.hasAllCookChecked=false;
                                // $scope.hasAllCookChecked.selected=false;
                                swal("Deleted!", "All Info Pages Are Deleted!", "success");
                                $timeout(function () {
                                    $scope.fetch_service_center();

                                }, 400);

                            }, function myError(response) {
                                console.log('err');
                            });
                        }
                        if ($scope.selection.length > 0 && count_all_service_center == false || $scope.hasAllCookChecked == false) {

                            $scope.u = {};
                            $scope.u.selected_service_center = $scope.selection;

                            $http({
                                method: "POST",
                                url: "admin/delete-selected-service-center",
                                data: $scope.u
                            }).then(function mySucces(response) {

                                swal("Deleted!", "Info Page Successfully Deleted..!", "success");
                                $scope.selection = [];
                                $timeout(function () {
                                    $scope.fetch_service_center();

                                }, 400);

                                // Notification.error({message: 'Info Page Successfully Deleted..', delay: 3000});
                            }, function myError(response) {
                                console.log('err');
                            });
                        }
                        if ($scope.selection.length > 0 && count_all_service_center == true && $scope.hasAllCookChecked == true) {
                            console.log('delete all pages');
                            $http({
                                method: "POST",
                                url: "admin/delete-all-service-center",
                                data: $scope.u
                            }).then(function mySucces(response) {

                                // $scope.hasAllCookChecked=false;
                                // $scope.hasAllCookChecked.selected=false;
                                swal("Deleted!", "All Info Pages Are Deleted!", "success");

                                $timeout(function () {
                                    $scope.fetch_service_center();

                                }, 400);
                            }, function myError(response) {
                                console.log('err');
                            });
                        }

                    }




                } else {
                    swal("Cancelled", "Your cancelled to delete cook :)", "error");
                }
            });

    }



    $scope.selectedItemChanged_ServiceCenter = function (val) {

        swal({
            title: "Are you sure?",
            text: "You are going to Change Status of Service Center!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Change it!",
            cancelButtonText: "No, cancel plz!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    if ($scope.selection.length < 1 && count_all_service_center == false) {
                        sweetAlert("Oops...", "No Checkbox Selected!", "error");
                    }
                    else {

                        if ($scope.hasAllCookChecked == undefined || $scope.hasAllCookChecked == false && $scope.selection.length > 0) {

                            if (val == "Enable") {

                                $http({
                                    method: "POST",
                                    url: "admin/enable-service-center-by-id",
                                    data: $scope.selection
                                }).then(function mySucces(response) {

                                    $scope.selection = [];
                                    $timeout(function () {

                                        $scope.fetch_service_center();

                                    }, 400);
                                    swal("Changed!", "Service Center Status Successfully Changed..!", "success");
                                }, function myError(response) {
                                    console.log('err');
                                });
                            }

                            else if (val == "Disable") {

                                $http({
                                    method: "POST",
                                    url: "admin/disable-service-center-by-id",
                                    data: $scope.selection
                                }).then(function mySucces(response) {
                                    $scope.selection = [];

                                    $timeout(function () {

                                        $scope.fetch_service_center();

                                    }, 400);
                                    swal("Changed!", " Service Center Status Successfully Changed..!", "success");
                                }, function myError(response) {
                                    console.log('err');
                                });

                            }

                        }
                        else
                            if ($scope.hasAllCookChecked == undefined || $scope.hasAllCookChecked == true) {

                                $scope.u = {};


                                if (val == "Enable") {


                                    console.log($scope.selection);
                                    $http({
                                        method: "POST",
                                        url: "admin/enable-all-service-center",
                                        data: $scope.u
                                    }).then(function mySucces(response) {
                                        $scope.hasAllCookChecked = false;
                                        $scope.selection = [];
                                        $timeout(function () {

                                            $scope.fetch_service_center();

                                        }, 400);


                                        swal("Changed!", " Service Center Status Successfully Changed..!", "success");
                                    }, function myError(response) {
                                        console.log('err');
                                    });
                                }

                                else if (val == "Disable") {


                                    console.log($scope.selection);
                                    $http({
                                        method: "POST",
                                        url: "admin/disable-all-service-center",
                                        data: $scope.u
                                    }).then(function mySucces(response) {
                                        $scope.selection = [];
                                        $scope.hasAllCookChecked = false;
                                        $timeout(function () {

                                            $scope.fetch_service_center();

                                        }, 400);
                                        swal("Changed!", " Service Center Status Successfully Changed..!", "success");
                                    }, function myError(response) {
                                        console.log('err');
                                    });

                                }

                            }





                    }
                }
                else {
                    swal("Cancelled", "Your cancelled to Change Service Center Status :)", "error");
                }


            });


    }

    $scope.tmp_service_center_id;
    $scope.update_service_center_temp = function (center_id) {


        $scope.tmp_service_center_id = center_id;
        // console.log(tmp_coupon_id) ;
        $cookieStore.put('temp_global', $scope.tmp_service_center_id);

    }



    // $scope.update_details={};
    $scope.update_service_center_fetch = function (center) {

        $scope.u = {};
        $scope.u.service_center_id = $cookieStore.get('temp_global');



        $http({
            method: "POST",
            url: "admin/fetch-service-center-by-id",
            data: $scope.u
        }).then(function mySucces(response) {


            console.log(response);
            $scope.service_center_detail = response.data;

        }, function myError(response) {
            console.log('err');
        });
    }


    $scope.update_service_center_details = function (center) {

        $scope.u = {};
        // $scope.u.coupon_id= $cookieStore.get('coupon_update_id');

        $scope.u = center;
        $scope.u.center_landmark = $('#autocomplete_addr').val();
        console.log($scope.u);

        $http({
            method: "POST",
            url: "admin/update-service-center-by-id",
            data: $scope.u
        }).then(function mySucces(response) {
            Notification.success({ message: 'Service Center Successfully Updated..', delay: 3000 });

            $timeout(function () {
                $cookieStore.remove("temp_global");
                $location.path('/admin/view-service-center');

            }, 1000);
        }, function myError(response) {
            console.log('err');
        });
    }

    $scope.del_booy_popup = function () {

        $(".delivery-popup-btn").click(function () {
            $(".delivery-boy-popup").show();
        });

        $(".close-btn").click(function () {
            $(".delivery-boy-popup").hide();
        });

        $(".move").click(function () {
            $(this).parent(".list").remove();
        });

    }

    $scope.view_associated_cooks = {};

    $scope.fetch_associated_cooks = function (center) {


        $scope.u = {};
        $scope.u.service_center_id = $cookieStore.get('temp_global');


        $http({
            method: "POST",
            url: "admin/fetch-associated-cooks",
            data: $scope.u
        }).then(function mySucces(response) {

            console.log('SERVICE CENER INFO');
            console.log(response.data);
            $scope.view_associated_cooks = response.data;

            // $scope.service_center_detail = response.data.service_center_info[0];

        }, function myError(response) {
            console.log('err');
        });
    }

    $scope.view_associated_cook_order = {};
    $scope.associated_cook_order_fetch = function () {

        $scope.u = {};
        $scope.u.cook_id = $cookieStore.get('cook_update_id');
        $http({
            method: "POST",
            url: "admin/fetch-cook-orders-by-id",
            data: $scope.u
        }).then(function mySucces(response) {

            console.log(response);
            $scope.view_associated_cook_order = response.data;

        }, function myError(response) {
            console.log('err');
        });
    }

    $view_associated_cook_order_fetch_cook_center = {};
    $scope.associated_cook_order_fetch_cook_center = function () {
        $scope.u = {};
        $scope.u.cook_id = $cookieStore.get('cook_update_id');
        // console.log('cook id');
        // console.log($cookieStore.get('cook_update_id'));
        $http({
            method: "POST",
            url: "admin/fetch-cook-orders-by-id-cook-center",
            data: $scope.u
        }).then(function mySucces(response) {

            console.log('THIS IS ASS COOK CENTER RESPONSE 22');
            console.log(response);
            $scope.view_associated_cook_order_fetch_cook_center = response.data;
            // var data = response.data;
            // var self = false;
            // var service_center = false;
            // var tot = 0;
            // for (var i = 0; i < data.length; i++) {

            //     self = false;
            //     service_center = false;
            //     tot = 0;
            //     for (var j = 0; j < data[i].items.length; j++) {


            //         if (data[i].items[j].cook_id == $scope.u.cook_id) {

            //             console.log('Checking Self');
            //             tot = tot + data[i].items[j].sub_total;
            //             if (data[i].items[j].delivery_by == 'Self') {
            //                 self = true;
            //             }
            //             if (data[i].items[j].delivery_by == 'EatoEato') {
            //                 service_center = true;
            //             }


            //         }


            //     }

            //     data[i].order_total = tot;
            //     if (self == true & service_center == false) {
            //         data[i].delivery_by = 'Cook';

            //     }
            //     if (self == false & service_center == true) {
            //         data[i].delivery_by = 'Service Center';

            //     }
            //     if (self == true & service_center == true) {
            //         data[i].delivery_by = 'Service Center & Cook';

            //     }

            // }

            // $scope.view_associated_cook_order_fetch_cook_center = data;
            // console.log('FINAL FETCH DETAIL');
            // console.log($scope.view_associated_cook_order_fetch_cook_center);

        }, function myError(response) {
            console.log('err');
        });
    }

    $scope.temp_save_orderId_for_detail_view = function (data) {

        console.log('TEMP ORDER ID');
        $localStorage.temp_order_id = data;
        console.log(data);
        $location.path('/admin/cook-order-detail');
        //   $localStorage.temp_order_id=
    }

    $scope.admin_cooks_order_detail_view = {};
    $scope.associated_cook_order_with_detail = function () {

        console.log('TEST');
        $scope.u = {};
        $scope.u.order_id = $localStorage.temp_order_id;
        console.log($scope.u);
        $http({
            method: "POST",
            url: "admin/fetch-cook-orders-detail-admin",
            data: $scope.u
        }).then(function mySucces(response) {

            console.log('ORDER RESPONSE');
            $scope.admin_cooks_order_detail_view = response.data;
            var tot = 0;
            for (var i = 0; i < response.data.length; i++) {
                tot = 0;
                for (var j = 0; j < response.data[i].items.length; j++) {

                    tot = response.data[i].items[j].food_total_price + tot;
                    $scope.admin_cooks_order_detail_view[i].order_total = tot;

                }

            }
            $scope.track_cook_order_admin = response.data[0].order_history;
            console.log($scope.admin_cooks_order_detail_view);
        }, function myError(response) {
            console.log('err');
        });
        // $http({
        //     method: "POST",
        //     url: "admin/fetch-cook-orders-detail-admin",
        //     data: $scope.u
        // }).then(function mySucces(response) {

        //     console.log('THIS IS FOR DETAIL RESPONSE');
        //     console.log(response);
        //     console.log($localStorage.temp_order_id);
        //     var user_order = [];

        //     for (var t = 0; t < response.data[0].order_data.length; t++) {



        //         if (response.data[0].order_data[t].order_id == $localStorage.temp_order_id) {


        //             user_order.push(response.data[0].order_data[t]);
        //         }


        //     }

        //     console.log('FOUND ORDER ID');
        //     console.log(user_order);



        //     // var user_order = response.data[0].order_data;
        //     var user_info = response.data[1].user_data[0];
        //     var service_center_info = response.data[2].service_center_data[0][0].service_center_info;
        //     var sub_order_detail = response.data[3].sub_order_detail;
        //     var tot = 0;


        //     // PLACING TOTAL ORDER RELATED TO COOK ONLY

        //     for (var i = 0; i < user_order.length; i++) {
        //         tot = 0;
        //         for (var j = 0; j < user_order[i].items.length; j++) {

        //             if (user_order[i].items[j].cook_id == $scope.u.cook_id) {

        //                 tot = parseInt(user_order[i].items[j].sub_total);

        //             }


        //         }
        //         user_order[i].total_price = tot;
        //     }

        //     // PLACING USER DETAIL IN ORDER
        //     for (var s = 0; s < user_info.length; s++) {



        //         for (var i = 0; i < user_order.length; i++) {

        //             for (var j = 0; j < user_order[i].items.length; j++) {

        //                 if (user_order[i].items[j].user_id == user_info[s]._id) {
        //                     console.log('CHEKING USER ID');
        //                     user_order[i].items[j].user_email = user_info[s].email;
        //                     user_order[i].user_name = user_order[i].items[j].username;
        //                     user_order[i].items[j].user_contact = user_info[s].phone;

        //                 }


        //             }

        //         }


        //     }

        //     // PLACING SERIVCE CENTER INFO
        //     for (var s = 0; s < service_center_info.length; s++) {

        //         for (var t = 0; t < service_center_info[s].cook_arr.length; t++) {

        //             for (var i = 0; i < user_order.length; i++) {

        //                 for (var j = 0; j < user_order[i].items.length; j++) {

        //                     if (user_order[i].items[j].cook_id == $scope.u.cook_id) {
        //                         if (user_order[i].items[j].cook_id == service_center_info[s].cook_arr[t].cook_id) {

        //                             user_order[i].service_center = service_center_info[s].center_name;
        //                         }

        //                     }


        //                 }

        //             }


        //         }

        //     }

        //     // PLACING TRACKING ORDER DETAILS
        //     for (var s = 0; s < sub_order_detail.length; s++) {


        //         for (var i = 0; i < user_order.length; i++) {



        //             if (user_order[i].order_id == sub_order_detail[s].main_order_id) {

        //                 user_order[i].sub_order_detail = sub_order_detail[s];
        //             }




        //         }

        //     }


        //     $scope.admin_cooks_order_detail_view = user_order;
        //     console.log(user_order);
        // }, function myError(response) {
        //     console.log('err');
        // });
    }



    // DELIVERY BOY OPERATIONS


    $scope.c_list = {};

    $scope.fetch_service_center_for_delivery_boy = function (info_id) {

        $http({
            method: "POST",
            url: "admin/fetch-service-center-all",

        }).then(function mySucces(response) {
            $scope.c_list = response.data;
            // $scope.delivery_boy_details.service_center_list = response.data.service_center_info;
            console.log('SERVICE CENTER INFO');
            console.log(response);


        }, function myError(response) {
            console.log('err');
        });

    }

    $scope.add_delivery_boy = function (data) {

        console.log(data);

        var selected_cook = {};
        var selected_cook_detail = [];
        // for (var i = 0; i < $scope.modernBrowsers_cooks_list.length; i++) {

        //     if ($scope.modernBrowsers_cooks_list[i].ticked == true) {
        //         selected_cook = {};
        //         selected_cook.name = $scope.modernBrowsers_cooks_list[i].name;
        //         selected_cook.cook_id = $scope.modernBrowsers_cooks_list[i].cook_id;
        //         selected_cook_detail.push(selected_cook);
        //     }

        // }

        $scope.u = {};
        $scope.u = data;
        //    $scope.u.cooks_arr = selected_cook_detail;
        console.log('DELIVERY BOY DETAIL');
        console.log($scope.u);
        $http({
            method: "POST",
            url: "admin/add-delivery-boy",
            data: $scope.u
        }).then(function mySucces(response) {
            $scope.delivery_boy_details = "";
            Notification.info({ message: 'Delivery Boy Successfully updated.', delay: 3000 });

        }, function myError(response) {
            console.log('err');
        });

    }

    $scope.edit_delivery_boy = function (data) {

        $scope.u = {};
        $scope.u = data;


        var selected_cook = {};
        var selected_cook_detail = [];

        console.log('SERVICE CENTER');
        console.log($scope.c_list);
        for (var i = 0; i < $scope.c_list.length; i++) {

            if ($scope.c_list[i].center_name == $scope.u.service_center_name) {
                $scope.u.service_center_id = $scope.c_list[i]._id;
            }
        }
        console.log($scope.u);
        // for (var i = 0; i < $scope.modernBrowsers_cooks_list.length; i++) {

        //     if ($scope.modernBrowsers_cooks_list[i].ticked == true) {
        //         selected_cook = {};
        //         selected_cook.name = $scope.modernBrowsers_cooks_list[i].name;
        //         selected_cook.cook_id = $scope.modernBrowsers_cooks_list[i].cook_id;
        //         selected_cook_detail.push(selected_cook);
        //     }

        // }

        // $scope.u.selected_cook = selected_cook_detail;

        //console.log($scope.u);

        $http({
            method: "POST",
            url: "admin/update-delivery-boy-by-id",
            data: $scope.u
        }).then(function mySucces(response) {

            Notification.info({ message: 'Delivery Boy Successfully updated.', delay: 3000 });

        }, function myError(response) {
            console.log('err');
        });

    }

    $scope.view_delivery_boy_orders_list = {};
    $scope.fetch_delivery_boy_orders_by_id = function () {


        $scope.u = {};
        $scope.u.delivery_boy_id = $cookieStore.get('temp_global');
        console.log('DEL BOY');
        console.log($scope.u.delivery_boy_id);
        $http({
            method: "POST",
            url: "admin/fetch-delivery-boy-orders-by-id",
            data: $scope.u
        }).then(function mySucces(response) {

            console.log('DELIVERY BOY ORDERS');
            console.log(response);
            $scope.view_delivery_boy_orders_list = response.data;
            // Notification.info({ message: 'Delivery Boy Successfully updated.', delay: 3000 });

        }, function myError(response) {
            console.log('err');
        });

    }

    $scope.view_delivery_boy = {};

    $scope.fetch_delivery_boy_all = function (boy) {

        $http({
            method: "POST",
            url: "admin/fetch-delivery-boy-all",

        }).then(function mySucces(response) {

            $scope.view_delivery_boy = response.data;
            console.log(response);

        }, function myError(response) {
            console.log('err');
        });

    }

    var count_all_delivery_boy = false;
    $scope.checkAll_for_delivery_boy = function () {

        if ($scope.hasAllCookChecked) {

            $scope.hasAllCookChecked = true;
            count_all_delivery_boy = true;
        } else {
            $scope.selection = [];
            $scope.hasAllCookChecked = false;
            count_all_delivery_boy = false;
        }
        angular.forEach($scope.view_delivery_boy, function (item) {
            item.selected = $scope.hasAllCookChecked;
        });

    };

    $scope.delivery_boy_delete = function () {


        swal({
            title: "Are you sure?",
            text: "You are going to delete Delivery Boy.!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plz!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {


                    if ($scope.selection.length < 1 && count_all_delivery_boy == false) {
                        sweetAlert("Oops...", "No Checkbox Selected!", "error");
                    }
                    else {



                        if ($scope.selection.length < 1 && $scope.hasAllCookChecked == true) {

                            $scope.u = {};

                            $http({
                                method: "POST",
                                url: "admin/delete-all-delivery-boy",
                                data: $scope.u
                            }).then(function mySucces(response) {

                                // $scope.hasAllCookChecked=false;
                                // $scope.hasAllCookChecked.selected=false;
                                swal("Deleted!", "All  Delivery Boys Are Deleted!", "success");
                                $timeout(function () {
                                    $scope.fetch_delivery_boy_all();

                                }, 400);

                            }, function myError(response) {
                                console.log('err');
                            });
                        }
                        if ($scope.selection.length > 0 && count_all_delivery_boy == false || $scope.hasAllCookChecked == false) {

                            $scope.u = {};
                            $scope.u.selected_delivery_boy = $scope.selection;

                            $http({
                                method: "POST",
                                url: "admin/delete-selected-delivery-boy",
                                data: $scope.u
                            }).then(function mySucces(response) {

                                swal("Deleted!", "Delivery Boy Successfully Deleted..!", "success");
                                $scope.selection = [];
                                $timeout(function () {
                                    $scope.fetch_delivery_boy_all();

                                }, 400);

                                // Notification.error({message: 'Info Page Successfully Deleted..', delay: 3000});
                            }, function myError(response) {
                                console.log('err');
                            });
                        }
                        if ($scope.selection.length > 0 && count_all_delivery_boy == true && $scope.hasAllCookChecked == true) {
                            console.log('delete all pages');
                            $http({
                                method: "POST",
                                url: "admin/delete-all-delivery-boy",
                                data: $scope.u
                            }).then(function mySucces(response) {

                                // $scope.hasAllCookChecked=false;
                                // $scope.hasAllCookChecked.selected=false;
                                swal("Deleted!", "All Delivery Boys Are Deleted!", "success");

                                $timeout(function () {
                                    $scope.fetch_delivery_boy_all();

                                }, 400);
                            }, function myError(response) {
                                console.log('err');
                            });
                        }

                    }




                } else {
                    swal("Cancelled", "Your cancelled to delete Delivery Boy :)", "error");
                }
            });

    }


    $scope.tmp_service_center_id;
    $scope.update_delivery_boy_temp = function (boy_id) {


        $scope.tmp_del_boy_id = boy_id;
        // console.log(tmp_coupon_id) ;
        $cookieStore.put('temp_global', $scope.tmp_del_boy_id);

    }



    // $scope.update_details={};
    $scope.delivery_boy_details = {};
    $scope.update_delivery_boy_fetch = function (center) {

        $scope.u = {};
        $scope.u.delivery_boy_id = $cookieStore.get('temp_global');

        $http({
            method: "POST",
            url: "admin/fetch-delivery-boy-by-id",
            data: $scope.u
        }).then(function mySucces(response) {


            console.log(response.data);
            console.log('DELV BOY INFO');
            $scope.delivery_boy_details = response.data[0];
            // console.log($scope.delivery_boy_details.service_center_name);
            //  $scope.delivery_boy_details.service_center_name= $scope.delivery_boy_details.service_center_name;

        }, function myError(response) {
            console.log('err');
        });


    }

    // Cuisine OPERATIONS

    $scope.view_cuisine_details = {};

    $scope.fetch_all_cuisine = function () {

        $http({
            method: "GET",
            url: "admin/fetch-all-cuisines",

        }).then(function mySucces(response) {

            $scope.view_cuisine_details = response.data;
            //     console.log( $scope.view_delivery_boy);
            console.log(response.data);
        }, function myError(response) {
            console.log('err');
        });

    }

    var count_all_cuisine_list = false;
    $scope.checkAll_for_cuisine = function () {

        if ($scope.hasAllCookChecked) {

            $scope.hasAllCookChecked = true;
            count_all_cuisine_list = true;
        } else {
            $scope.selection = [];
            $scope.hasAllCookChecked = false;
            count_all_cuisine_list = false;
        }
        angular.forEach($scope.view_cuisine_details, function (item) {
            item.selected = $scope.hasAllCookChecked;
        });

    };

    $scope.cuisine_delete = function () {


        swal({
            title: "Are you sure?",
            text: "You are going to delete Cuisine.!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plz!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {


                    if ($scope.selection.length < 1 && count_all_cuisine_list == false) {
                        sweetAlert("Oops...", "No Checkbox Selected!", "error");
                    }
                    else {



                        if ($scope.selection.length < 1 && $scope.hasAllCookChecked == true) {

                            $scope.u = {};

                            $http({
                                method: "POST",
                                url: "admin/delete-all-cuisine",
                                data: $scope.u
                            }).then(function mySucces(response) {

                                // $scope.hasAllCookChecked=false;
                                // $scope.hasAllCookChecked.selected=false;
                                swal("Deleted!", "All  Cuisines Are Deleted!", "success");
                                $timeout(function () {
                                    $scope.fetch_all_cuisine();

                                }, 400);

                            }, function myError(response) {
                                console.log('err');
                            });
                        }
                        if ($scope.selection.length > 0 && count_all_cuisine_list == false || $scope.hasAllCookChecked == false) {

                            $scope.u = {};
                            $scope.u.selected_cuisine = $scope.selection;

                            $http({
                                method: "POST",
                                url: "admin/delete-selected-cuisine",
                                data: $scope.u
                            }).then(function mySucces(response) {

                                swal("Deleted!", "Cuisine Successfully Deleted..!", "success");
                                $scope.selection = [];
                                $timeout(function () {
                                    $scope.fetch_all_cuisine();

                                }, 400);


                            }, function myError(response) {
                                console.log('err');
                            });
                        }
                        if ($scope.selection.length > 0 && count_all_cuisine_list == true && $scope.hasAllCookChecked == true) {

                            $http({
                                method: "POST",
                                url: "admin/delete-all-cuisine",
                                data: $scope.u
                            }).then(function mySucces(response) {


                                swal("Deleted!", "All Cuisines Are Deleted!", "success");

                                $timeout(function () {
                                    $scope.fetch_all_cuisine();

                                }, 400);
                            }, function myError(response) {
                                console.log('err');
                            });
                        }

                    }

                } else {
                    swal("Cancelled", "Your cancelled to delete Cuisines :)", "error");
                }
            });

    }

    $scope.selectedItemChanged_Cuisine = function (val) {

        swal({
            title: "Are you sure?",
            text: "You are going to Change Status of Cuisine!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Change it!",
            cancelButtonText: "No, cancel plz!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    if ($scope.selection.length < 1 && count_all_cuisine_list == false) {
                        sweetAlert("Oops...", "No Checkbox Selected!", "error");
                    }
                    else {

                        if ($scope.hasAllCookChecked == undefined || $scope.hasAllCookChecked == false && $scope.selection.length > 0) {

                            if (val == "Enable") {

                                console.log('Selected Enabling');
                                console.log($scope.selection);
                                $http({
                                    method: "POST",
                                    url: "admin/enable-cuisine-by-id",
                                    data: $scope.selection
                                }).then(function mySucces(response) {

                                    $scope.selection = [];
                                    $timeout(function () {

                                        $scope.fetch_all_cuisine();

                                    }, 400);
                                    swal("Changed!", "Cuisine Status Successfully Changed..!", "success");
                                }, function myError(response) {
                                    console.log('err');
                                });
                            }

                            else if (val == "Disable") {
                                console.log('Selected Disabling');
                                console.log($scope.selection);
                                $http({
                                    method: "POST",
                                    url: "admin/disable-cuisine-by-id",
                                    data: $scope.selection
                                }).then(function mySucces(response) {
                                    $scope.selection = [];

                                    $timeout(function () {

                                        $scope.fetch_all_cuisine();

                                    }, 400);
                                    swal("Changed!", "Cuisine Status Successfully Changed..!", "success");
                                }, function myError(response) {
                                    console.log('err');
                                });

                            }

                        }
                        else
                            if ($scope.hasAllCookChecked == undefined || $scope.hasAllCookChecked == true) {

                                $scope.u = {};
                                $scope.u.admin_id = $cookieStore.get('admin_id');

                                if (val == "Enable") {


                                    console.log($scope.selection);
                                    $http({
                                        method: "POST",
                                        url: "admin/enable-all-cuisine",
                                        data: $scope.u
                                    }).then(function mySucces(response) {
                                        $scope.hasAllCookChecked = false;
                                        $scope.selection = [];
                                        $timeout(function () {

                                            $scope.fetch_all_cuisine();

                                        }, 400);


                                        swal("Changed!", "Cuisine Status Successfully Changed..!", "success");
                                    }, function myError(response) {
                                        console.log('err');
                                    });
                                }

                                else if (val == "Disable") {


                                    console.log($scope.selection);
                                    $http({
                                        method: "POST",
                                        url: "admin/disable-all-cuisine",
                                        data: $scope.u
                                    }).then(function mySucces(response) {
                                        $scope.selection = [];
                                        $scope.hasAllCookChecked = false;
                                        $timeout(function () {

                                            $scope.fetch_all_cuisine();

                                        }, 400);
                                        swal("Changed!", "Cuisine Status Successfully Changed..!", "success");
                                    }, function myError(response) {
                                        console.log('err');
                                    });

                                }

                            }





                    }
                }
                else {
                    swal("Cancelled", "Your cancelled to Change Cuisine Status :)", "error");
                }


            });


    }

    $scope.tmp_service_center_id;
    $scope.update_cuisine_temp = function (boy_id) {


        $scope.tmp_cuisine_id = boy_id;
        // console.log(tmp_coupon_id) ;
        $cookieStore.put('temp_global', $scope.tmp_cuisine_id);

    }



    $scope.update_cuisine_details = {};
    $scope.update_cuisine_fetch = function (center) {

        $scope.u = {};
        $scope.u.cuisine_id = $cookieStore.get('temp_global');

        $http({
            method: "POST",
            url: "admin/fetch-cuisine-by-id",
            data: $scope.u
        }).then(function mySucces(response) {


            console.log(response.data);
            $scope.category_details = response.data;
            // console.log($scope.delivery_boy_details.service_center_name);
            //  $scope.delivery_boy_details.service_center_name= $scope.delivery_boy_details.service_center_name;

        }, function myError(response) {
            console.log('err');
        });


    }


    $scope.update_cuisine_details = function (cuisine) {

        $scope.u = {};
        // $scope.u.coupon_id= $cookieStore.get('coupon_update_id');

        $scope.u = cuisine;



        $http({
            method: "POST",
            url: "admin/update-cuisine-by-id",
            data: $scope.u
        }).then(function mySucces(response) {

            console.log(response);
            // Notification.success({ message: 'Service Center Successfully Updated..', delay: 3000 });

            //    $timeout(function () {
            //         $cookieStore.remove("temp_global");
            //                                 $location.path('/admin/view-service-center');

            //                             }, 1000);
        }, function myError(response) {
            console.log('err');
        });
    }

    //Till Cuisine OPERATIONS



    // FOOD OPERATIONS


    $scope.view_food_listing = {};
    $scope.fetch_food_listing_all = function () {

        $http({
            method: "GET",
            url: "admin/fetch-all-cook-foods",

        }).then(function mySucces(response) {

            console.log(response.data);

            $scope.view_food_listing = response.data;
            // Notification.success({ message: 'Service Center Successfully Updated..', delay: 3000 });

            //    $timeout(function () {
            //         $cookieStore.remove("temp_global");
            //                                 $location.path('/admin/view-service-center');

            //                             }, 1000);
        }, function myError(response) {
            console.log('err');
        });
    }



    $scope.tmp_food_id;
    $scope.update_food_temp = function (food_id) {


        $scope.tmp_food_id = food_id;
        // console.log(tmp_coupon_id) ;
        $cookieStore.put('temp_global', $scope.tmp_food_id);
        console.log($cookieStore.get('temp_global'));
    }



    $scope.update_food_details_admin = {};
    $scope.sel_for_oc_update = [];
    $scope.sel_for_cu_update = [];

    $scope.update_food_fetch = function () {

        //  $scope.get_occassion_and_veg_type_admin();
        $scope.u = {};
        $scope.u.food_id = $cookieStore.get('temp_global');

        $http({
            method: "POST",
            url: "admin/fetch-food-by-id",
            data: $scope.u
        }).then(function mySucces(response) {



            $scope.update_food_details_admin = response.data[0];
            $scope.sel_for_oc_update = response.data[0].occassion_list;
            $scope.sel_for_cu_update = response.data[0].cuisine_list;

            console.log(response.data[0]);



            console.log('THISI IS MODER BROWSER COOK LIST');

            console.log($scope.modernBrowsers2);
            //  $scope.modernBrowsers2[1].ticked=true;

            //  $scope.modernBrowsers_occ_list[0].ticked = true;

            for (var i = 0; i < $scope.modernBrowsers_occ_list.length; i++) {

                for (var j = 0; j < $scope.sel_for_oc_update.length; j++) {


                    if ($scope.modernBrowsers_occ_list[i].name == $scope.sel_for_oc_update[j].group_attr) {


                        $scope.modernBrowsers_occ_list[i].ticked = true;
                    }
                }

            }


            //   $scope.modernBrowsers_occ_list[0].ticked = true;

            setTimeout(
                function () {

                    for (var i = 0; i < $scope.update_food_details_admin.cuisine_list.length; i++) {

                        for (var j = 0; j < $scope.modernBrowsers2.length; j++) {

                            if ($scope.modernBrowsers2[j].name == $scope.update_food_details_admin.cuisine_list[i].category_name) {

                                $scope.modernBrowsers2[j].ticked = true;

                            }



                        }


                    }
                }, 400);

            // console.log($scope.delivery_boy_details.service_center_name);
            //  $scope.delivery_boy_details.service_center_name= $scope.delivery_boy_details.service_center_name;

        }, function myError(response) {
            console.log('err');
        });


    }


    $scope.occ_list = {};
    $scope.veg_list = {};

    $scope.get_occassion_and_veg_type_admin = function () {

        $http({
            method: "GET",
            url: "cook/get-occ-veg-list",

        }).then(function mySucces(response) {

            console.log('OCC DASTA');
            console.log(response);

            $scope.veg_list = response.data[1].attr_fields;
            //  $scope.occ_list=response.data[0].attr_fields;
            //   $scope.modernBrowsers_occ_list =  response.data[0].attr_fields;
            $rootScope.selection_for_occasion = $scope.occ_list;

            for (var i = 0; i < response.data[0].attr_fields.length; i++) {
                var send = {
                    "name": response.data[0].attr_fields[i].group_attr,
                    "_id": response.data[0].attr_fields[i]._id,
                    ticked: false
                };

                $scope.modernBrowsers_occ_list.push(send);


            }

            console.log($scope.modernBrowsers_occ_list);
            //   $scope.modernBrowsers_occ_list[0].ticked=true;
            $scope.fetch_cuisine_name_for_add();
            console.log('OCC AND VEG DATA');
            console.log(response);

        }, function myError(response) {


        });
    }


    $scope.toggleSelection_for_occ_update_admin = function (val) {


        var idx = $scope.selection.indexOf(val);

        // is currently selected
        if (idx > -1) {

            $scope.selection.splice(idx, 1);
            console.log($scope.selection);
        }

        // is newly selected
        else {
            // val.status='true';
            // $scope.selection.push(val);
            var len = $scope.update_food_details_admin.occassion_list.length;
            for (var i = 0; i < len; i++) {

                if ($scope.update_food_details_admin.occassion_list[i].group_attr == val.group_attr && $scope.update_food_details_admin.occassion_list[i].status == 'false') {

                    $scope.sel_for_oc_update[i].status = 'true';
                }
                else if ($scope.update_food_details_admin.occassion_list[i].group_attr == val.group_attr && $scope.update_food_details_admin.occassion_list[i].status == 'true') {

                    $scope.update_food_details_admin.occassion_list[i].status = 'false';
                } else {

                }
            }

            console.log($scope.update_food_details_admin.occassion_list);
            //  $scope.food_details.occassion_list = $scope.sel_for_oc_update;
        }
    }

    $scope.cuisine_name_list_admin = {};
    $scope.fetch_cuisine_name = function (social_details) {


        $http({
            method: "GET",
            url: "admin/fetch-cuisine-name",

        }).then(function mySucces(response) {

            for (var i = 0; i < response.data.length; i++) {
                var send = {
                    "name": response.data[i].category_name,
                    ticked: false
                };
                $scope.cuisine_name_list.push(send);


            }

            // console.log($scope.cuisine_name_list);


        }, function myError(response) {
            console.log('err');
        });
    }


    $scope.food_imgData = "";
    $scope.upload_food_image_by_admin = function (files) {


        if (files[0] == undefined) return;
        $scope.fileExt = files[0].name.split(".").pop();

        var f = document.getElementById('file2').files[0];


        r = new FileReader();

        r.onloadend = function (e) {

            var data = e.target.result;

            $scope.food_imgData = $base64.encode(data);

            console.log('IMG LOADED');
            //   console.log($scope.imageData);

            //send your binary data via $http or $resource or do anything else with it


        }

        r.readAsBinaryString(f);


    }


    $scope.modernBrowsers = $scope.cuisine_name_list;


    $scope.update_food_details_by_admin = function (food) {

        $scope.u = {};
        // $scope.u.coupon_id= $cookieStore.get('coupon_update_id');

        $scope.u.update_food_details = food;


        // console.log($scope.modernBrowsers_occ_list);
        // console.log($scope.modernBrowsers);

        var final_occ = [];
        var final_cusines = [];
        var temp_obj = {};
        for (var i = 0; i < $scope.modernBrowsers_occ_list.length; i++) {


            if ($scope.modernBrowsers_occ_list[i].ticked == true) {
                temp_obj = {};
                temp_obj.group_attr = $scope.modernBrowsers_occ_list[i].name;
                temp_obj._id = $scope.modernBrowsers_occ_list[i]._id;
                temp_obj.status = "true";
                final_occ.push(temp_obj);
            }
        }

        for (var j = 0; j < $scope.modernBrowsers.length; j++) {


            if ($scope.modernBrowsers[j].ticked == true) {

                temp_obj = {};
                temp_obj.category_name = $scope.modernBrowsers[j].name;
                temp_obj.status = "true";
                final_cusines.push(temp_obj);
            }
        }
        $scope.u.update_food_details.occassion_list = final_occ;
        $scope.u.update_food_details.cuisine_list = final_cusines;
        console.log($scope.u);


        $http({
            method: "POST",
            url: "admin/update-food-by-id-admin",
            data: {
                'update_food_details': $scope.u.update_food_details,
                'files': $scope.food_imgData,

            }

        }).then(function mySucces(response) {

            Notification.success({ message: 'Food Details Successfully Updated..', delay: 3000 });

        }, function myError(response) {
            console.log('err');
        });

    }


    var count_all_food = false;
    $scope.checkAll_for_food = function () {

        if ($scope.hasAllCookChecked) {

            $scope.hasAllCookChecked = true;
            count_all_food = true;
        } else {
            $scope.selection = [];
            $scope.hasAllCookChecked = false;
            count_all_food = false;
        }
        angular.forEach($scope.view_food_listing, function (item) {
            item.selected = $scope.hasAllCookChecked;
        });

    };

    $scope.food_delete = function () {


        swal({
            title: "Are you sure?",
            text: "You are going to delete Food Details.!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plz!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {


                    if ($scope.selection.length < 1 && count_all_food == false) {
                        sweetAlert("Oops...", "No Checkbox Selected!", "error");
                    }
                    else {



                        if ($scope.selection.length < 1 && $scope.hasAllCookChecked == true) {

                            swal("Sorry!", "You Can't Delete All Foods", "error");
                            setTimeout(
                                function () {
                                    $scope.fetch_food_listing_all();

                                }, 400);
                            // $scope.u = {};
                            // $scope.u.admin_id = $cookieStore.get('admin_id');
                            // $http({
                            //     method: "POST",
                            //     url: "admin/delete-all-food",
                            //     data: $scope.u
                            // }).then(function mySucces(response) {

                            //     $scope.hasAllCookChecked = false;
                            //     $scope.hasAllCookChecked.selected = false;
                            //     swal("Deleted!", "All Foods Are Deleted!", "success");

                            //     $scope.fetch_coupon();
                            // }, function myError(response) {
                            //     console.log('err');
                            // });
                        }
                        if ($scope.selection.length > 0 && count_all_food == false || $scope.hasAllCookChecked == false) {

                            $scope.u = {};
                            $scope.u.selected_food = $scope.selection;


                            $http({
                                method: "POST",
                                url: "admin/delete-selected-food",
                                data: $scope.u
                            }).then(function mySucces(response) {

                                swal("Deleted!", "Food Successfully Deleted..!", "success");
                                $scope.selection = [];
                                setTimeout(
                                    function () {
                                        $scope.fetch_food_listing_all();

                                    }, 400);

                                // Notification.error({message: 'Cook Successfully Deleted..', delay: 3000});
                            }, function myError(response) {
                                console.log('err');
                            });
                        }
                        if ($scope.selection.length > 0 && count_all_food == true && $scope.hasAllCookChecked == true) {
                            swal("Sorry!", "You Can't Delete All Foods", "error");
                            setTimeout(
                                function () {
                                    $scope.fetch_food_listing_all();

                                }, 400);

                            // $scope.u = {};
                            // $scope.u.admin_id = $cookieStore.get('admin_id');
                            // $http({
                            //     method: "POST",
                            //     url: "admin/delete-all-food",
                            //     data: $scope.u
                            // }).then(function mySucces(response) {

                            //     $scope.hasAllCookChecked = false;
                            //     $scope.hasAllCookChecked.selected = false;
                            //     swal("Deleted!", "All Foods Are Deleted!", "success");

                            //     $scope.fetch_coupon();
                            // }, function myError(response) {
                            //     console.log('err');
                            // });
                        }

                    }




                } else {
                    swal("Cancelled", "Your cancelled to delete Food :)", "error");
                }
            });

        // console.log($scope.selection);


    };

    $scope.selectedItemChanged_Food = function (val) {

        swal({
            title: "Are you sure?",
            text: "You are going to Change Status of Food!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Change it!",
            cancelButtonText: "No, cancel plz!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    if ($scope.selection.length < 1 && count_all_food == false) {
                        sweetAlert("Oops...", "No Checkbox Selected!", "error");
                    }
                    else {

                        if ($scope.hasAllCookChecked == undefined || $scope.hasAllCookChecked == false && $scope.selection.length > 0) {

                            if (val == "Enable") {


                                console.log($scope.selection);
                                $http({
                                    method: "POST",
                                    url: "admin/enable-food-id",
                                    data: $scope.selection
                                }).then(function mySucces(response) {

                                    $scope.selection = [];
                                    $timeout(function () {

                                        $scope.fetch_food_listing_all();

                                    }, 400);
                                    swal("Changed!", "Food Status Successfully Changed..!", "success");
                                }, function myError(response) {
                                    console.log('err');
                                });
                            }

                            else if (val == "Disable") {
                                console.log('Selected Disabling');
                                console.log($scope.selection);
                                $http({
                                    method: "POST",
                                    url: "admin/disable-layout-by-id",
                                    data: $scope.selection
                                }).then(function mySucces(response) {
                                    $scope.selection = [];

                                    $timeout(function () {

                                        $scope.fetch_layout_detail();

                                    }, 400);
                                    swal("Changed!", "Layout Status Successfully Changed..!", "success");
                                }, function myError(response) {
                                    console.log('err');
                                });

                            }

                        }
                        else
                            if ($scope.hasAllCookChecked == undefined || $scope.hasAllCookChecked == true) {

                                $scope.u = {};
                                $scope.u.admin_id = $cookieStore.get('admin_id');

                                if (val == "Enable") {


                                    console.log($scope.selection);
                                    $http({
                                        method: "POST",
                                        url: "admin/enable-all-layout",
                                        data: $scope.u
                                    }).then(function mySucces(response) {
                                        $scope.hasAllCookChecked = false;
                                        $scope.selection = [];
                                        $timeout(function () {

                                            $scope.fetch_layout_detail();

                                        }, 400);


                                        swal("Changed!", "Layout Status Successfully Changed..!", "success");
                                    }, function myError(response) {
                                        console.log('err');
                                    });
                                }

                                else if (val == "Disable") {


                                    console.log($scope.selection);
                                    $http({
                                        method: "POST",
                                        url: "admin/disable-all-layout",
                                        data: $scope.u
                                    }).then(function mySucces(response) {
                                        $scope.selection = [];
                                        $scope.hasAllCookChecked = false;
                                        $timeout(function () {

                                            $scope.fetch_layout_detail();

                                        }, 400);
                                        swal("Changed!", "Layout Status Successfully Changed..!", "success");
                                    }, function myError(response) {
                                        console.log('err');
                                    });

                                }

                            }





                    }
                }
                else {
                    swal("Cancelled", "Your cancelled to Change Layout Status :)", "error");
                }


            });
    }


    // TILL FOOD OPERATIONS


    // ORDER OPERATIONS

    $scope.view_all_orders = {};
    $scope.fetch_user_orders_all = function (val) {

        $http({
            method: "GET",
            url: "admin/fetch-user-orders-all",

        }).then(function mySucces(response) {


            $scope.view_all_orders = response.data;
            var tot = 0;
            for (var i = 0; i < response.data.length; i++) {

                $scope.view_all_orders[i].username = response.data[i].items[0].username;

                tot = 0;
                for (var j = 0; j < response.data[i].items.length; j++) {

                    tot = tot + response.data[i].items[j].food_total_price;

                }
                $scope.view_all_orders[i].grand_total = tot;
            }
            console.log($scope.view_all_orders);
            // $scope.view_all_orders.username=response.data
        }, function myError(response) {
            console.log('err');
        });

    }


    $scope.view_order_temp_id = function (val) {

        $cookieStore.put('temp_global', val);


    }

    $scope.view_all_order_detail_page = {};
    $scope.fetch_complete_order_by_id = function () {

        $scope.u = {};
        $scope.u.order_id = $cookieStore.get('temp_global');
        console.log('THIS IS TEMP ID');
        console.log($scope.u);
        $http({
            method: "POST",
            url: "admin/fetch-complete-order-by-id",
            data: $scope.u
        }).then(function mySucces(response) {

            console.log('COMP ORDER');
            console.log(response);
            $scope.view_all_order_detail_page = response.data[0];
            console.log($scope.view_all_order_detail_page);
            $scope.track_cook_order_admin = response.data[0].order_history;

            var tot = 0;
            for (var i = 0; i < response.data.length; i++) {
                tot = 0;
                for (var j = 0; j < response.data[i].items.length; j++) {

                    tot = response.data[i].items[j].food_total_price + tot;


                }
                $scope.view_all_order_detail_page.order_total = tot;

            }

            // $scope.view_all_order_detail_page = response.data[0];
            // var order_data= response.data[0].order_data[0];
            // var order_history= response.data[1].order_history;

            // // for(var i=0;i<order_data.length;i++){

            // //         for(var j=0;j<order_data[i].items.length;j++){

            // //                 if(order_data[i].)


            // //         }
            // // }

            //  $scope.view_all_order_detail_page = response.data[0];
            //   $scope.view_all_order_detail_page = response.data[0];
            //$scope.track_order_stat_by_id(response.data[0].order_id);
            // console.log('THIS IS CHECKKKKKKKKKK');//ss
            // console.log($scope.view_all_order_detail_page);
            //  $scope.view_all_orders = response.data;

        }, function myError(response) {
            console.log('err');
        });

    }

    $scope.order_status = {};
    $scope.order_cmt = {};
    $scope.change_order_status = function (order_id, status, comment, food_id, order) {


        $scope.u = {};
        $scope.u.order_id = order_id;
        $scope.u.order_status = status;
        $scope.u.order_comment = comment;
        $scope.u.user_id = order.user_id;
        $scope.u.sub_order_id = order.order_id;
        console.log($scope.u);
        //console.log(order);
        $http({
            method: "POST",
            url: "admin/update-order-status",
            data: $scope.u
        }).then(function mySucces(response) {


            console.log(response);
            $scope.track_order_stat_by_id(order.order_id);


        }, function myError(response) {
            console.log('err');
        });

    }
    $scope.change_order_status_admin_cook = function (order_id, status, comment) {

        if (status == "" || comment == "") {


            swal("Error !", "Please Select Status and Add Comment " + status, "error");
        }
        else {

            $scope.u = {};
            $scope.u.order_id = order_id;
            $scope.u.order_status = status;
            $scope.u.order_comment = comment;
            //     $scope.u.user_id = order.items[0].user_id;
            //    $scope.u.sub_order_id = order.items[0].order_id;
            //    $scope.u.cook_id = sub_order.cook_id;
            console.log($scope.u);
            //    console.log(sub_order);
            //console.log(order);
            $http({
                method: "POST",
                url: "admin/update-order-status",
                data: $scope.u
            }).then(function mySucces(response) {


                console.log(response);
                $scope.track_order_stat_by_id_admin_cook(order_id);
                swal("Status Updated !", "Your Changed the status to " + status, "success");

            }, function myError(response) {
                console.log('err');
            });

        }



    }
    $scope.cancel_order_admin = function (order, main_order_id) {

        console.log(order);
        console.log(main_order_id);
        $scope.u = {};
        $scope.u.main_order_id = main_order_id;
        $scope.u.sub_order_id = order.order_id;

        console.log($scope.u);

        $http({
            method: "POST",
            url: "admin/cancel-order-status-admin",
            data: $scope.u
        }).then(function mySucces(response) {

            Notification.warning({ message: 'Order with OrderId ' + main_order_id + ' Cancelled', delay: 4000 });
            console.log(response);
            $scope.change_order_status_admin_cook(main_order_id);


        }, function myError(response) {
            console.log('err');
        });

    }

    $scope.track_order_stat_by_id = function (order_id) {


        $scope.u = {};
        $scope.u.order_id = order_id;
        console.log($scope.u);

        $http({
            method: "POST",
            url: "admin/track-order-stat-by-id",
            data: $scope.u
        }).then(function mySucces(response) {

            console.log('THIS IS TRACK');
            console.log(response);


            for (var i = 0; i < response.data.length; i++) {

                for (var j = 0; j < $scope.view_all_order_detail_page.items.length; j++) {

                    if ($scope.view_all_order_detail_page.items[j].order_id == response.data[i].sub_order_id) {

                        $scope.view_all_order_detail_page.items[j].order_hist = response.data[i];
                        //$scope.view_all_order_detail_page.items[j].track_order = response.data[i].order_history;
                    }
                }
            }

            console.log($scope.view_all_order_detail_page);

        }, function myError(response) {
            console.log('err');
        });

    }

    $scope.track_cook_order_admin = {};

    $scope.track_order_stat_by_id_admin_cook = function (order_id) {


        $scope.u = {};
        $scope.u.order_id = order_id;


        console.log($scope.u);

        $http({
            method: "POST",
            url: "admin/track-order-stat-by-id",
            data: $scope.u
        }).then(function mySucces(response) {

            console.log('THIS IS TRACKED RESPONSE');
            console.log(response.data);
            console.log($scope.admin_cooks_order_detail_view);

            $scope.track_cook_order_admin = response.data[0].order_history;

            // for (var i = 0; i < response.data.length; i++) {

            //     for (var j = 0; j < $scope.admin_cooks_order_detail_view.items.length; j++) {

            //         if ($scope.admin_cooks_order_detail_view.items[j].order_id == response.data[i].sub_order_id) {

            //             $scope.admin_cooks_order_detail_view.items[j].sub_order_stat = response.data[i].sub_order_status;
            //             $scope.admin_cooks_order_detail_view.items[j].track_order = response.data[i].order_history;
            //         }
            //     }
            // }

            console.log($scope.admin_cooks_order_detail_view);

        }, function myError(response) {
            console.log('err');
        });

    }
    // ORDER OPERATIONS


    // CK EDITOR OPERATIONS


    $scope.options = {
        language: 'en',
        allowedContent: true,
        entities: false
    };
    $scope.onReady = function () {
        // ...
    };

    // TILL CK EDITOR OPERATIONS
    $scope.dashboard_info = {};
    $scope.fetch_dashboard_detail = function () {

        $http({
            method: "GET",
            url: "admin/admin-dashboard",

        }).then(function mySucces(response) {

            console.log('ORDER CONFIRMED');
            console.log(response);

            $scope.dashboard_info = response.data;
            var tot;
            tot = $scope.dashboard_info[2].pending_order + $scope.dashboard_info[2].completed_order + $scope.dashboard_info[2].cancelled_order + $scope.dashboard_info[2].delivered + $scope.dashboard_info[2].ready_for_del + $scope.dashboard_info[2].confirmed;

            $scope.dashboard_info[2].total_order = tot;

            // console.log('DASHBOARD INFO');
            // console.log(tot);

        }, function myError(response) {
            console.log('err');
        });

    }

    $scope.income_list_view = {};
    $scope.fetch_income_detail = function () {

        $http({
            method: "GET",
            url: "admin/admin-commission",

        }).then(function mySucces(response) {

            console.log('BEFORE mODIFIED');
            console.log(response);
            var data = response.data;
            $scope.income_list_view = data;

            var food_tot_val = 0;
            var payble_amt = 0;
            var discount_amt = 0;

            for (var i = 0; i < data.length; i++) {

                discount_amt = 0;
                food_tot_val = 0;
                for (var j = 0; j < data[i].items.length; j++) {

                    if (data[i].items[j].discount_amt != 0) {

                        discount_amt = discount_amt + data[i].items[j].discount_amt;
                    }

                    food_tot_val = food_tot_val + data[i].items[j].food_total_price;
                    console.log(food_tot_val);
                }

                $scope.income_list_view[i].food_total_price = food_tot_val;
                $scope.income_list_view[i].payble_amt = food_tot_val - Math.round((food_tot_val * parseInt(data[i].cook_data[0].cook_commission)) / 100);
                $scope.income_list_view[i].tax_rate = food_tot_val - $scope.income_list_view[i].payble_amt;
                $scope.income_list_view[i].discount_amt = discount_amt;
                $scope.income_list_view[i].cook_name = data[i].cook_data[0].cook_name;
                $scope.income_list_view[i].pay_mode = data[i].items[0].pay_mode;
            }
            // //  console.log('THIS IS INCOME LIST');
            // $scope.income_list_view = response.data;
            // var rem_amt = 0;
            // for (var i = 0; i < $scope.income_list_view.length; i++) {

            //     rem_amt = $scope.income_list_view[i].total_amount_payble - $scope.income_list_view[i].total_paid;
            //     $scope.income_list_view[i].remaining_amt = rem_amt;

            // }

            console.log('mODIFIED');
            console.log($scope.income_list_view);
        }, function myError(response) {

            console.log('err');

        });


    }

    $scope.sort_income_orders_by_date = function (data) {

        // console.log( $('#pickup').val());
        // console.log($('#return').val());
        var dt_from = $('#pickup').val();
        var dt_from_arr = dt_from.split("/");
        console.log(dt_from_arr);
    }

    $scope.fetch_income_detail_view = function (data) {

        $scope.u = {};
        $scope.u.cook_id = data.cook_id;
        $scope.u.cook_commission = data.cook_commission;

        $http({
            method: "POST",
            url: "admin/admin-commission-detail-view",
            data: $scope.u

        }).then(function mySucces(response) {

            console.log(response);
        }, function myError(response) {
            console.log('err');
        });


    }

    $scope.pay_cook_commission = function (income) {



        swal({
            title: "Pay Cook Commission Rs." + income.cook_amt,
            text: "Enter Amount",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "Enter Amount"
        },
            function (inputValue) {
                console.log(parseInt(inputValue));
                // console.log(num);
                // if (inputValue === false) return false;
                $scope.u = {};
                $scope.u = income;
                $scope.u.paid_amt = parseInt(inputValue);
                console.log($scope.u);
                $http({
                    method: "POST",
                    url: "admin/cook-pay-commission",
                    data: $scope.u
                }).then(function mySucces(response) {

                    console.log(response);

                    //     swal("Updated !", "Your Details Have Been Updated :)", "success");

                }, function myError(response) {


                });
                return true;
                // if (parseInt(inputValue) == num) {

                //     return true;
                // }
                // if (parseInt(inputValue) != num) {
                //     swal.showInputError("Incorrect OTP.");
                //     return false;
                // }

            });


        // swal({
        //     title: "Are you sure?",
        //     text: "You Are Going To Update Your Profile Details !",
        //     type: "warning",
        //     showCancelButton: true,
        //     confirmButtonColor: "#DD6B55",
        //     confirmButtonText: "Yes, Go Ahead !",
        //     cancelButtonText: "No, cancel plz!",
        //     closeOnConfirm: false,
        //     closeOnCancel: false
        // },
        //     function (isConfirm) {
        //         if (isConfirm) {


        //             $http({
        //                 method: "POST",
        //                 url: "cook/cook-profile-update",
        //                 data: $scope.u
        //             }).then(function mySucces(response) {

        //                 swal("Updated !", "Your Details Have Been Updated :)", "success");

        //             }, function myError(response) {


        //             });


        //         } else {
        //             swal("Cancelled", "Your cancelled to Update Profile Details :)", "error");
        //         }
        //     });

        // $http({
        //     method: "GET",
        //     url: "admin/admin-commission",

        // }).then(function mySucces(response) {

        //     console.log('THIS IS INCOME LIST');
        //     $scope.income_list_view=response.data;
        //     console.log(response);
        // }, function myError(response) {
        //     console.log('err');
        // });


    }

    $scope.view_user_review_admin = {};

    $scope.fetch_user_all_review = function () {

        $http({
            method: "GET",
            url: "admin/fetch-user-all-reviews",

        }).then(function mySucces(response) {

            console.log('THIS IS Review LIST');

            $scope.view_user_review_admin = response.data;
            console.log($scope.view_user_review_admin);
            for (var i = 0; i < $scope.view_user_review_admin.length; i++) {

                $scope.view_user_review_admin[i].username = $scope.view_user_review_admin[i].user_data[0].username;
            }

            console.log(response);
        }, function myError(response) {
            console.log('err');
        });
    }

    $scope.update_review_info = {};
    $scope.fetch_edit_review = function () {

        //console.log( $cookieStore.get('temp_global'));
        $scope.u = {};
        $scope.u.review_id = $cookieStore.get('temp_global');
        $http({
            method: "POST",
            url: "admin/edit-review",
            data: $scope.u
        }).then(function mySucces(response) {

            // console.log('THIS IS Review LIST');
            // $scope.view_user_review_admin = response.data;
            console.log('REVIEW  INFO');
            $scope.update_review_info = response.data[0];
            console.log($scope.update_review_info);
        }, function myError(response) {
            console.log('err');
        });
    }


    $scope.update_review_via_admin = function (review) {

        //console.log( $cookieStore.get('temp_global'));
        console.log(review);
        $scope.u = {};
        $scope.u = review;
        $http({
            method: "POST",
            url: "admin/update-review-by-id",
            data: $scope.u
        }).then(function mySucces(response) {

            // console.log('THIS IS Review LIST');
            // $scope.view_user_review_admin = response.data;
            console.log(response);
            swal("Success.!", "Review Succeffully Updated", "success");
            $location.path('/admin/view-review');
            // $scope.update_review_info=response.data[0];
            // console.log($scope.update_review_info);
        }, function myError(response) {
            console.log('err');
        });
    }


    $scope.selected_location_cook_basic_info_admin = function () {


        blockUI.start('Please Wait..');
        $timeout(function () {
            blockUI.message('Fetching Location');
        }, 1000);

        $timeout(function () {
            blockUI.message('Autofilling Data..');
        }, 2000);

        $timeout(function () {
            blockUI.stop();
            var formatted_address = $.cookie('formatted_addr');
            console.log(formatted_address);
            var geocoder = new google.maps.Geocoder();
            var city, state, pin_code, lat, long;
            var is_get_data = false;
            geocoder.geocode({ 'address': formatted_address }, function (results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();

                    // console.log('THIS IS FORMATTED ONE ');
                    //  console.log(results[0]);
                    //   $localStorage.user_loc_name = results[0].address_components[0].long_name;

                    $scope.u = {};
                    $scope.u.lat = latitude;
                    $scope.u.long = longitude;

                    $cookieStore.put('user_lat_long', $scope.u);

                    console.log('this is USER');
                    console.log(results);
                    lat = latitude;
                    long = longitude;
                    for (var i = 0; i < results[0].address_components.length; i++) {

                        for (var j = 0; j < results[0].address_components[i].types.length; j++) {

                            if (results[0].address_components[i].types[j] == "administrative_area_level_1") {

                                city = results[0].address_components[i].long_name;
                            }

                            if (results[0].address_components[i].types[j] == "locality") {

                                state = results[0].address_components[i].long_name;
                            }
                            if (results[0].address_components[i].types[j] == "postal_code") {

                                pin_code = results[0].address_components[i].long_name;
                                is_get_data = true;
                            }
                        }
                    }

                    console.log(city);
                    console.log(state);
                    console.log(pin_code);

                    //$scope.cook_complete_details.city=city;
                    //   $scope.get_foods_for_listing();
                    //   window.location.href = '#/listing';
                    //       //  console.log(results[0] );
                    //          $timeout(function () {


                    // }, 3000);

                }
            });

            //    if (is_get_data == true) {
            $timeout(function () {
                $scope.update_details.city = city;
                $scope.update_details.state = state;
                $scope.update_details.pincode = pin_code;
                $scope.update_details.cook_latitude = lat;
                $scope.update_details.cook_longitude = long;

            }, 1000);


            //         }


        }, 3000);




    }

    $scope.admin_login_data = {};
    $scope.admin_login = function (data) {

        $scope.u = data;

        $http({
            method: "POST",
            url: "admin/admin-login",
            data: $scope.u
        }).then(function mySucces(response) {


            console.log(response);
            if (response.data.status == 'success') {

                swal("Credentials Verified", "You Can Access Admin Panel Now", "success");

                $location.path('/admin');
                $cookieStore.put('admin_user', response.data.data[0]._id);

            }
            if (response.data.status == 'failure') {

                swal("Credentials Invalid", "Please Check Your Credentials Again.!", "error");
            }

        }, function myError(response) {

        });

        console.log($scope.u);

    }

    $scope.admin_logout = function () {

        setTimeout(function () {
            swal({
                title: "Logout Successfully",
                text: "from Admin Panel",
                type: "success",
                confirmButtonText: "OK"
            },
                function (isConfirm) {
                    if (isConfirm) {

                        //     $route.reload();
                        $cookieStore.remove("admin_user");
                        window.location.href = "#/";


                    }
                });
        }, 100);
    }

    $scope.admin_auth = function () {


        if ($cookieStore.get('admin_user') == undefined) {

            $location.path('#/');
        } else {


        }


    }


    // PRINTING SCRIPT;

    $scope.printDiv = function (divName) {

        //     console.log(divName);
        //   var printContents = document.getElementsByClassName(divName).innerHTML;
        //   var popupWin = window.open('', '_blank', 'width=300,height=300');
        //   popupWin.document.open();
        //   popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
        //   popupWin.document.close();
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Report.xls");
    }
}]);
// window.onbeforeunload = function (e) {
// // Your logic to prepare for 'Stay on this Page' goes here 
//     delete $localStorage.cart_collection;
//     return "Please click 'Stay on this Page' and we will give you candy";
// };
//my account tabs active class add
(function () {
    angular.module('autoActive', ['angular-page-loader', 'angular-theme-spinner', 'ngCookies', 'ckeditor', '720kb.datepicker', 'base64', 'ngFileUpload', 'rzModule', 'angular-loading-bar', 'ui-notification', 'angularUtils.directives.dirPagination', 'isteven-multi-select', 'ngSanitize', 'ngStorage', 'fancyboxplus', 'angular-hmac-sha512', 'ngValidate',
        'blockUI'])
        .directive('autoActive', ['$location', function ($location) {
            return {
                restrict: 'A',
                scope: false,
                link: function (scope, element) {
                    function setActive() {
                        var path = $location.path();
                        if (path) {
                            angular.forEach(element.find('.list'), function (li) {
                                var anchor = li.querySelector('a');
                                if (anchor.href.match('#' + path + '(?=\\?|$)')) {
                                    angular.element(li).addClass('active');
                                } else {
                                    angular.element(li).removeClass('active');
                                }
                            });
                        }
                    }

                    setActive();

                    scope.$on('$locationChangeSuccess', setActive);
                }
            }
        }])
        .directive("owlCarousel", function () {
            return {
                restrict: 'E',
                transclude: false,
                link: function (scope) {
                    scope.initCarousel = function (element) {
                        // provide any default options you want
                        var defaultOptions = {
                        };
                        var customOptions = scope.$eval($(element).attr('data-options'));
                        // combine the two options objects
                        for (var key in customOptions) {
                            defaultOptions[key] = customOptions[key];
                        }
                        // init carousel
                        $(element).owlCarousel(defaultOptions);
                    };
                }
            };
        })
        .directive('owlCarouselItem', [function () {
            return {
                restrict: 'A',
                transclude: false,
                link: function (scope, element) {
                    // wait for the last item in the ng-repeat then call init
                    if (scope.$last) {
                        scope.initCarousel(element.parent());
                    }
                }
            };
        }])

        // window.fbAsyncInit = function () {
        //     FB.init({
        //         appId: '132848207263017',
        //         cookie: true,
        //         xfbml: true,
        //         version: 'v2.8'
        //     });
        //     FB.AppEvents.logPageView();
        // };

        // (function (d, s, id) {
        //     var js, fjs = d.getElementsByTagName(s)[0];
        //     if (d.getElementById(id)) { return; }
        //     js = d.createElement(s); js.id = id;
        //     js.src = "//connect.facebook.net/en_US/sdk.js";
        //     fjs.parentNode.insertBefore(js, fjs);
        // } (document, 'script', 'facebook-jssdk'))

        .config(['$crypthmacProvider', function ($crypthmacProvider) {
            $crypthmacProvider.setCryptoSecret('jfoiwjfwoifje83');
        }])

        .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeSpinner = false;
            cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
            cfpLoadingBarProvider.includeBar = true;

        }])
        //   .config(['$locationProvider', function ($locationProvider) {
        //     $locationProvider.hashPrefix('');
        // }])
        // config(['$routeProvider', function ($routeProvider) {
        //     $routeProvider.when('/detail/:name', {
        //         templateUrl: function (urlattr) {
        //             var str=urlattr.name.replace('%20','-');
        //             console.log('THIS IS FINAL ROUTE PROVIDER');
        //             console.log(urlattr);
        //             return '/detail/' + str + '.html';
        //         },
        //         controller: 'MainCtrl'
        //     })
        // }])
        .filter('capitalize', function () {
            return function (input) {
                return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
            }
        })
        .config(function (NotificationProvider) {
            NotificationProvider.setOptions({
                delay: 4000,
                startTop: 20,
                startRight: 10,
                verticalSpacing: 20,
                horizontalSpacing: 20,
                positionX: 'right',
                positionY: 'top'
            });
        })
        .config(function ($validatorProvider) {
            $validatorProvider.setDefaults({
                errorElement: 'span',
                errorClass: 'help-block'
            });
        })
        .run(function ($timeout, $rootScope) {

            // Use a root scope flag to access everywhere in your app
            $rootScope.isLoading = true;

            // simulate long page loading
            $timeout(function () {

                // turn "off" the flag
                $rootScope.isLoading = false;

            }, 3000)

        });

} ());
