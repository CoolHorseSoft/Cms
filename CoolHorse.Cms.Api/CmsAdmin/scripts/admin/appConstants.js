app.constant('APP_MENU', [{
    "text": "基础配置",
    "heading": "true"
},
{
    "text": "类别管理",
    "sref": "category",
    "icon": "fa fa-reorder"
},
{
    "text": "新闻管理",
    "heading": "true"
},
{
    "text": "新闻列表",
    "sref": "news",
    "icon": "fa fa-newspaper-o"
},
{
    "text": "产品管理",
    "heading": "true"
},
{
    "text": "产品列表",
    "sref": "productlist",
    "icon": "fa fa-photo"
}
]);

app.constant('APP_MEDIAQUERY',
{
    'desktopLG': 1200,
    'desktop': 992,
    'tablet': 768,
    'mobile': 480
});

//Left menu menu start
app.constant('LAZY_LOAD_MODULES',
[
    {
        name: "app",
        module: true,
        files: [
          "scripts/jquery.validate.min.js",
          "scripts/ng-grid.min.js",
          "scripts/modernizr.min.js",
          "scripts/ngDialog.min.js",
          "styles/ng-grid.css",
          "styles/ngDialog-theme-default.min.css",
          "styles/ngDialog.min.css"
        ]
    },
    {
        name: "category",
        module: true,
        files: [
          "scripts/admin/CategoryController.js",
        ]
    },
    {
        name: "newslist",
        module: true,
        files: [
          "scripts/admin/NewsController.js"
        ]
    },
    {
        name: "newsdetail",
        module: true,
        files: [
          "scripts/admin/NewsDetailsController.js"
        ]
    },
    {
        name: "productlist",
        module: true,
        files: [
          "scripts/admin/ProductListController.js"
        ]
    },
    {
        name: "productdetail",
        module: true,
        files: [
          "scripts/admin/ProductDetailController.js"
        ]
    }
]);