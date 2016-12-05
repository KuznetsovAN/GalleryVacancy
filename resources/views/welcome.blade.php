<!doctype html>
<html ng-app="galleryApp">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="app/css/textAngular.css">
    <link rel="stylesheet" href="app/css/style.css">

</head>
<body>

<div class="page-header">
    <h1 >Галерея </h1>
</div>

<div ng-view></div>

<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular-route.js"></script>
<script src="app/js/lib/textAngular-rangy.min.js"></script>
<script src="app/js/lib/textAngular-sanitize.min.js"></script>
<script src="app/js/lib/textAngular.min.js"></script>
<script src="app/js/lib/angular-file-upload.min.js"></script>
<script src="app/js/app.js"></script><!--//скрипт основного приложения-->
<script src="app/js/controllers/tileController.js"></script><!--//контролер отображения плитки-->
<script src="app/js/controllers/itemController.js"></script><!--//контролер отображения детального просмотра картинки-->
<script src="app/js/controllers/uploaderController.js"></script>><!--///контролер загрузки картинок-->
</body>
</html>