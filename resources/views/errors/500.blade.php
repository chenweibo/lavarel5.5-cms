<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>服务器内部错误</title>
    <link href="{{ asset('static/admin/css/bootstrap.min.css?v=3.3.6') }}" rel="stylesheet">
    <link href="{{ asset('static/admin/css/font-awesome.min.css?v=4.7.0')}}" rel="stylesheet">
    <link href="{{ asset('static/admin/css/animate.min.css')}}" rel="stylesheet">
    <link href="{{ asset('static/admin/css/style.min.css?v=4.1.0')}}" rel="stylesheet">
</head>
<body class="gray-bg">
  <div class="middle-box text-center animated fadeInDown">
      <h1>500</h1>
      <h3 class="font-bold">服务器内部错误</h3>
      <div class="error-desc">
          服务器好像出错了...
          <br/>您可以返回主页看看
          <br/><a href="{{route('home')}}" class="btn btn-primary m-t">主页</a>
      </div>
  </div>
    <script src="{{ asset('static/admin/js/jquery.min.js?v=2.1.4')}}"></script>
    <script src="{{ asset('static/admin/js/bootstrap.min.js?v=3.3.6')}}"></script>
</body>
</html>
