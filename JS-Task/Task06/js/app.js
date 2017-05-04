/**
 * Created by zhuan_f on 5/2/2017.
 */
//JS文件app.js作为angular的全局配置和初始化文件，并引入该文件

//在app.js中通过angular.module来加载模块

//安装模块ngRoute

//为项目注入新的module，ngRoute

//在app.js中配置项目的路由，使之可以在几个页面中做单页面跳转
// var myApp = angular.module("myApp", ['ui.router']);
// //声明AngularJS模块, 并把ui-router传入AngularJS主模块，所有的结合起来我们就得到了Angular模块。
// //这里叫做App模块，这将告诉HTML页面这是一个AngularJS作用的页面，它的内容由AngularJS引擎来解释。
// myApp.config(function ($stateProvider, $urlRouterProvider) {
// //声明了把 $stateProvider 和 $urlRouteProvider 路由引擎作为函数参数传入，这样我们就可以为这个应用程序配置路由了.
//     $urlRouterProvider.when("", "/tab");
// //如果没有路由引擎能匹配当前的导航状态，那它就会默认将路径路由至 tab.html, 这个页面就是状态名称被声明的地方. 只要理解了这个，那它就像switch case语句中的default选项.
//     $stateProvider
//         .state("tab", {
//             url: "/tab",
//             templateUrl: "tab.html"
//         })
//         //index.html页面第一个显示出来的状态，作为页面被加载好以后第一个被使用的路由.
//         .state("tab.backstage", {
//             url:"/backstage",
//             templateUrl: "backstage.html"
//         })
//         .state("tab.list", {
//             url:"/list",
//             templateUrl: "list.html"
//         })
//         .state("tab.details", {
//             url:"/details",
//             templateUrl: "details.html"
//         });
// });

var myApp = angular.module("test", ['ui.router']);
myApp.config(function ($stateProvider, $urlRouterProvider) {
    //路由错误时的现实页面
    $urlRouterProvider.when("", "/PageTabaa");
    $stateProvider
        //第一级路由页面
        .state("PageTabccccc", {
            url: "/PageTabaa",
            views: {
                //"sidebar"对应html文件中的data-ui-view="sidebar"
                //如果主页面只有一个data-ui-view，views可以省略掉，
                // 把templateUrl直接写在外面
                "sidebar": {
                    templateUrl: "top-router-html/PageTabaa.html",
                }
            }
        })
        //第二级路由页面
        .state("PageTabccccc.Page1", {
            url: "/Page1",
            templateUrl: "top-router-html/html-second-router/Page1.html"
        })
        .state("PageTabccccc.Page2", {
            url: "/Page2",
            templateUrl: "top-router-html/html-second-router/Page2.html"
        })
        .state("PageTabccccc.Page3", {
            url: "/Page3",
            templateUrl: "top-router-html/html-second-router/Page3.html"
        });
});

// AngularJS使用Controller实现URL跳转

// 参考文章：https://docs.AngularJS.org/guide/$location
//
//     具体写法举例：
//
// 1.js定义一个controller
//
// function MyCtrl($scope, $location) {
//
//     $scope.jumpToUrl = function(path) {
//
//         //TODO:add code here
//
//     };
//
// }
//
// 2.html里面应用controller
//
// <div ng-controller=‘MyCtrl’>
//
// <button ng-click="jumpToUrl('/signin')">signin</button>
//
//     </div>
//
//     3.controller里面TODO的位置填入
//
// $location.path(path);
//
// 然后运行起来就可以看效果了。
//
//
// 假设当前页面的url是http://127.0.0.1:8080/#/home
//
//     $location.path(path);执行后就会跳到http://127.0.0.1:8080/#/signin
//
//     如果你发现页面不能正常跳转，可以在$location.path(path);后面再加上一句
//
// var curUrl = $location.absUrl(); //用来显示url全路径
//
// 调试跟踪页面时查看curUrl的值到底变成多少，大概就能猜出问题出在哪了。

//验收标准

// 1.页面跳转使用路由，需要引入angular-route.js
//
// 2.定义路由，定义view，实现通过路由改变view
//
// 3.配置nginx垮域
//
// 深度思考
//
// 这些概念和理论上的东西，通常是面试中经常会被问到的问题。而且，理论体系掌握的很牢固，对于你的技术增长来说非常有帮助。


// 1.登录之后，在其他页面怎么判断是否已经登录？
//
// 2.域名，cookie是什么？有什么用处？cookie session的区别?cookie的失效期？
//
// 3.请描述一下cookies，sessionStorage和localStorage的区别？
//
// 4.如何使用ui-router？
