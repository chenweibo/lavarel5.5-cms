@extends('layouts.admin')
@section('content')

    <div class="wrapper wrapper-content animated fadeInRight">
        <div class="row">
            <div class="col-sm-8">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h5>基本设置</h5>
                        <div class="ibox-tools">
                            <a class="collapse-link">
                                <i class="fa fa-chevron-up"></i>
                            </a>
                            <a class="dropdown-toggle" data-toggle="dropdown" href="form_basic.html#">
                                <i class="fa fa-wrench"></i>
                            </a>
                            <a class="close-link">
                                <i class="fa fa-times"></i>
                            </a>
                        </div>
                    </div>
                    <div class="ibox-content">
                        <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
                            <ul class="layui-tab-title">
                                <li class="layui-this">网站设置</li>
                                <li>系统设置</li>

                            </ul>
                            <div class="layui-tab-content">
                                <div class="layui-tab-item layui-show">
                                    <form class="form-horizontal m-t" id="commentForm" method="post"
                                          onsubmit="return toVaild()">

                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">站点名称：</label>
                                            <div class="input-group col-sm-4">
                                                <input id="site_title" type="text" class="form-control" name="title"
                                                       value="{{ $data['title'] }}" aria-required="true">
                                            </div>
                                        </div>
                                        <div class="form-group" @if(config('admin.lang') == 1) style="display:block"
                                             @else style="display:none" @endif>
                                            <label class="col-sm-3 control-label">英文站点名称：</label>
                                            <div class="input-group col-sm-4">
                                                <input id="site_title" type="text" class="form-control" name="en_title"
                                                       value="{{ $data['en_title'] }}" aria-required="true">
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">站点关键字：</label>
                                            <div class="input-group col-sm-4">
                                                <input id="site_keywords" type="text" class="form-control"
                                                       value="{{ $data['keywords'] }}" name="keywords"
                                                       aria-required="true">
                                            </div>
                                        </div>
                                        <div class="form-group" @if(config('admin.lang') == 1) style="display:block"
                                             @else style="display:none" @endif>
                                            <label class="col-sm-3 control-label">英文站点描述：</label>
                                            <div class="input-group col-sm-4">
                                                <input id="en_description" type="text" class="form-control"
                                                       value="{{ $data['en_description'] }}" name="en_description"
                                                       aria-required="true">

                                            </div>
                                        </div>

                                        <div class="form-group" @if(config('admin.lang') == 1) style="display:block"
                                             @else style="display:none" @endif>
                                            <label class="col-sm-3 control-label">英文站点关键字：</label>
                                            <div class="input-group col-sm-4">
                                                <input id="en_keywords" type="text" class="form-control"
                                                       value="{{ $data['en_keywords'] }}" name="en_keywords"
                                                       aria-required="true">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">站点描述：</label>
                                            <div class="input-group col-sm-4">
                                                <input id="site_description" type="text" class="form-control"
                                                       value="{{ $data['description'] }}" name="description"
                                                       aria-required="true">

                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">电话号码：</label>
                                            <div class="input-group col-sm-4">
                                                <input id="site_tel" type="text" class="form-control" name="tel"
                                                       value="{{ $data['tel'] }}" aria-required="true">

                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">手机号码：</label>
                                            <div class="input-group col-sm-4">
                                                <input id="site_phone" type="text" class="form-control" name="phone"
                                                       value="{{ $data['phone'] }}" aria-required="true">

                                            </div>
                                        </div>


                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">邮政编码：</label>
                                            <div class="input-group col-sm-4">
                                                <input id="site_code" type="text" class="form-control" name="code"
                                                       value="{{ $data['code'] }}" aria-required="true">

                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">企业邮箱：</label>
                                            <div class="input-group col-sm-4">
                                                <input id="site_mail" type="text" class="form-control" name="mail"
                                                       value="{{ $data['mail'] }}" aria-required="true">

                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">传真：</label>
                                            <div class="input-group col-sm-4">
                                                <input id="site_fax" type="text" class="form-control" name="fax"
                                                       value="{{ $data['fax'] }}" aria-required="true">

                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">地址：</label>
                                            <div class="input-group col-sm-4">
                                                <input id="site_address" type="text" class="form-control" name="address"
                                                       value="{{ $data['address'] }}" aria-required="true">

                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">备案号：</label>
                                            <div class="input-group col-sm-4">
                                                <input id="icp" type="text" class="form-control" name="icp"
                                                       value="{{ $data['icp'] }}" aria-required="true">

                                            </div>
                                        </div>


                                        <div class="form-group">
                                            <div class="col-sm-4 col-sm-offset-3">
                                                <!--<input type="button" value="提交" class="btn btn-primary" id="postform"/>-->
                                                <button class="btn btn-primary" type="submit">提交</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="layui-tab-item">
                                    <form class="form-horizontal m-t layui-form" id="systemform"  method="post" onsubmit="return toother()">

                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">后台登陆名称</label>
                                            <div class="input-group col-sm-4">
                                                <input id="site_title" type="text" class="form-control" name="admin_name"
                                                       value="{{$shui['admin_name']}}" aria-required="true">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">图片水印</label>
                                            <div class="layui-input-block">
                                                <input type="radio" name="code" lay-filter="shuiyin" value="1" title="开启" @if(explode(':',$shui['shuiyin'])[0]==1)
                                                   checked
                                                @endif>
                                                <input type="radio" name="code" lay-filter="shuiyin" value="0" title="关闭" @if(explode(':',$shui['shuiyin'])[0]==0)
                                                   checked
                                                @endif >
                                            </div>

                                        </div>
                                        <div class="form-group" id="shuiyin"@if(explode(':',$shui['shuiyin'])[0]==0)
                                           style="display: none" @else style="display: block"
                                        @endif >
                                            <label class="col-sm-3 control-label">选择水印图片：</label>
                                            <div class="col-md-4 input-group">
                                                <input type="file" name="image" style="display:none">
                                                <span class="input-group-addon" onclick="readyUp(event)"
                                                      style="cursor: pointer; background-color: #e7e7e7"><i
                                                            class="fa fa-folder-open"></i>选择</span>
                                                <input name="shuiImg" id="shuiImg" class="form-control" type="text" value="{{isset(explode(':',$shui['shuiyin'])[1]) ? explode(':',$shui['shuiyin'])[1] : ' '}}" >
                                                <span class="input-group-addon ut2" onclick="uploads(event)"
                                                      style="width:80px;cursor: pointer;pointer-events: auto;"><i
                                                            class="fa fa-folder-open"></i>点击上传</span>
                                            </div>

                                        </div>
                                        <div class="form-group" id="weizhi" @if(explode(':',$shui['shuiyin'])[0]==0)
                                           style="display: none" @else style="display: block"
                                        @endif>
                                            <label class="col-sm-3 control-label">所在位置</label>
                                            <div class="layui-input-block">
                                                <input type="radio" name="weizhi" lay-filter="q" value="top" title="顶部">
                                                <input type="radio" name="weizhi" lay-filter="q" value="center" title="中间" checked>
                                                <input type="radio" name="weizhi" lay-filter="q" value="bottom" title="底部">
                                                <input type="radio" name="weizhi" lay-filter="q" value="bottom-right" title="右下" >
                                            </div>

                                        </div>

                                        <div class="form-group">
                                            <div class="col-sm-4 col-sm-offset-3">
                                                <!--<input type="button" value="提交" class="btn btn-primary" id="postform"/>-->
                                                <button class="btn btn-primary" type="submit">提交</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>


    <script src="{{asset('static/admin/js/content.min.js?v=1.0.0')}}"></script>
    <script src="{{asset('static/admin/js/plugins/validate/jquery.validate.min.js')}}"></script>
    <script src="{{asset('static/admin/js/plugins/validate/messages_zh.min.js')}}"></script>
    <script src="{{asset('static/admin/js/plugins/sweetalert/sweetalert.min.js')}}"></script>
    <script src="{{asset('static/admin/css/layui/layui.js')}}"></script>
    <script src="{{asset('static/admin/js/plugins/layer/layer.min.js')}}"></script>
    <script src="{{asset('static/admin/js/other.js')}}"></script>

    <script type="text/javascript">
        //注意：选项卡 依赖 element 模块，否则无法进行功能性操作
        layui.use('element', function () {
            var element = layui.element();

            //…
        });
        layui.use('form', function(){
            var form = layui.form();

            form.on('radio(shuiyin)', function(data){
                console.log(data.value);
                if(data.value==1){

                    $('#shuiyin').css('display','block');
                    $('#weizhi').css('display','block');
                    $("#shuiImg").attr("required","true")
                }
                else {
                    $('#shuiyin').css('display','none');
                    $('#weizhi').css('display','none');
                    $("#shuiImg").removeAttr("required")

                }
            });

        });

        function toVaild() {
            var jz;
            var url = "{{ route('site')}}";
            $.ajax({
                type: "POST",
                url: url,
                data: $('#commentForm').serialize(),// 你的formid
                async: false,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                beforeSend: function () {
                    jz = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
                },
                error: function (request) {
                    layer.close(jz);
                    swal("网络错误!", "", "error");

                },
                success: function (data) {
                    //关闭加载层
                    layer.close(jz);
                    if (data.code == 1) {
                        swal(data.msg, "", "success");
                    } else {
                        swal(data.msg, "", "error");
                    }
                }
            });

            return false;
        }

        function toother() {
            var jz;
            var url = "{{ route('site_system')}}";
            $.ajax({
                type: "POST",
                url: url,
                data: $('#systemform').serialize(),// 你的formid
                async: false,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                beforeSend: function () {
                    jz = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
                },
                error: function (request) {
                    layer.close(jz);
                    swal("网络错误!", "", "error");

                },
                success: function (data) {
                    //关闭加载层
                    layer.close(jz);
                    if (data.code == 1) {
                        swal(data.msg, "", "success");
                    } else {
                        swal(data.msg, "", "error");
                    }
                }
            });

            return false;
        }
    </script>



@endsection
