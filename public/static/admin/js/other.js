
function readyUp(event){

    var file =   $(event.target).prev();
     file.click();
     file.change(function () {
        $(event.target).next().val($(this).val());
    });
}
function uploads(event) {

      var file =$(event.target).parent().find("input[type='file']");
      var txt =$(event.target).parent().find("input[type='text']");


    if (file.val() == 0 || txt.val() == 0) {

        txt.focus();
        swal("请选择文件!", "", "error");
        return false;
    }
    else {
        //var formElement = document.getElementById("lefile");
        var formData = new FormData();
        //formData.append("image", formElement.files[0]);
        formData.append(file.attr('name'), file[0].files[0]);


        $.ajax({
            url: '/uploads',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            beforeSend: function () {
                jz = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
            },
            success: function (data) {
                layer.close(jz);
                txt.val(data);
            },
            error: function () {
                layer.close(jz);
                swal("错误联系管理员!", "", "error");
            }
        });


    }

}

function rewrite() {

    var name = $('#name').val();
    if (name == false) {
        swal("名称为空无法生成", "", "error");
        return false;
    }
    else {
        $.ajax({
            type: 'POST',
            url: '/admin/common/rewrite',
            data: {"name": name},
            dataType: 'json',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            beforeSend: function () {
                jz = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
            },
            success: function (data) {
                var info = data.res;
                layer.close(jz);
                $('#jt').attr('value', info);

            },
            error: function () {
                alert("出错,联系管理员")
            }
        });
        return true;
    }
}


function imgicon(str) {


    layer.open({
        type: 1,
        skin: 'layui-layer-demo', //样式类名
        title: '缩略图',
        anim: 2,
        area: ['500px'],
        shadeClose: true, //开启遮罩关闭
        content: '<img  src="' + str + '" style="width:100%" alt="">'
    });
}

function stateAjax(id, num, url, type) {

    $.ajax({
        type: 'POST',
        url: url,
        data: {"id": id, 'num': num, 'type': type},
        dataType: 'json',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        beforeSend: function () {
            jz = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
        },
        success: function (data) {
            layer.close(jz);

        },
        error: function () {
            alert("出错,联系管理员")
        }
    });

}

function sortAjax(event, url, type) {
    //  var id=$(event.target).data('id');
    var td = $(event.target);
    var txt = td.text();
    var id = $(event.target).data('id');
    var input = $("<input  class='ssort'   type='text' value='" + txt + "'/>");
    td.html(input);
    input.click(function () {
        return false;
    });
    input.trigger("focus");
    input.blur(function () {
        var newtxt = $(this).val();
        if (newtxt == txt) {
            td.html(newtxt);
        } else {
            //var id = td.data('id');
            $.ajax({
                type: 'POST',
                url: url,
                data: {"id": id, "sort": newtxt, 'type': type},
                dataType: 'json',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                beforeSend: function () {
                    jz = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
                },
                success: function (data) {
                    layer.close(jz);
                    td.html(newtxt);
                },
                error: function () {
                    alert("出错,联系管理员")
                }
            });
        }
    });
    //console.log(event.target.attributes['data-id'].value);
}


function editor(str) {

    var E = window.wangEditor
    var editor = new E('#editor')
    editor.customConfig.pasteFilterStyle = false
    editor.customConfig.uploadImgServer = '/EditUploads'
    editor.customConfig.uploadFileName = 'images[]'
    editor.customConfig.uploadImgHeaders = {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
    editor.customConfig.onchange = function (html) {
        $('#info').attr('value', html)
    }

    editor.create()
    editor.txt.html(str)



}

function removeValue(str){

    $( '#moreimg' ).attr('value',$( '#moreimg' ).attr('value').replace(str, ''));

}

function removeimg(event){
       var img= $(event.target).parent().data('img');
       removeValue('<img src="'+img+'">');
       $(event.target).parent().remove();
       console.log($( '#moreimg' ).val());
       $.ajax({
           type: 'POST',
           url: '/delImg',
           data: {"img": img},
           dataType: 'json',
           headers: {
               'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
           },
           beforeSend: function () {
               jz = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
           },
           success: function (data) {
               layer.close(jz);
           },
           error: function () {
             layer.close(jz);
               alert("出错,联系管理员")
           }
       });

}

function contentIndexForm(){


  var arr=[];
  layui.use('form', function () {
      var $ = layui.jquery,
          form = layui.form();

      form.on('checkbox(allChoose)', function (data) {

          var child = $(data.elem).parents('table').find('tbody td input[name="ck"]');
          child.each(function (index, item) {
              item.checked = data.elem.checked;
          });
          if(data.elem.checked == false){
            arr=[];
          }else {
            child.each(function(){
             arr.push($(this).data('id'));
        });
          }
          form.render('checkbox');
          console.log(arr);
      });

      form.on('checkbox(son)', function (data) {
              if(data.elem.checked == false){
                arr.splice($.inArray($(data.elem).data('id'),arr),1);
              }
              else {
                arr.push($(data.elem).data('id'));
              }
               console.log(arr);

        });
      form.on('switch(show)', function (data) {
          var id = this.attributes['data-tid'].nodeValue;
          var state = this.checked ? '1' : '0';
          var url = "{{route('ajaxState')}}";
          var type = "column";
          alert(id);
      });

      form.on('switch(recommend)', function (data) {
          var id = this.attributes['data-tid'].nodeValue;
          var state = this.checked ? '1' : '0';
          var url = "{{route('ajaxState')}}";
          var type = "column";
          alert(id);
      });
  });


}

function Del(id,url){

  layer.confirm('确认删除?', {icon: 3, title: '提示'}, function (index) {
      $.ajax({
          url: url,
          type: "post",
          data: {'id': id},
          dataType: "json",
          headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          success: function (res) {
              if (res.code == 1) {
                  window.location.href = res.data;

              } else {
                  layer.alert('删除失败');
              }
          },
          error: function (msg) {
              layer.alert('权限不足联系管理员');
          },
      })
      layer.close(index);
  })
}

function removePro(url){

  $.ajax({
      type: "POST",
      url: "/getcate",
      data: $('#movefile').serialize(),// 你的formid
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
         if(data.code==1){
           location.reload();
         }
      }
  });

}


function movefile(arr,type){
  var html;
 if(arr.length==0){
   layer.msg('没有选择产品哦', {icon: 5});
 }
 else {
  $.ajax({
      url: '/getcate',
      type: "get",
      data: {'type':type},
      dataType: "json",
      async: false,
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success: function (data) {
        var demo ='<form id="movefile" style="margin-top:8px" class="navbar-form navbar-left zz" role="search"><div class="form-group"><select class="form-control" name="path" required>';
          $.each(data.res, function(i, item) {
             demo+='<option value="'+item.path+'-'+item.id+'">'+item.html+''+item.name+'</option>'
  					})
           demo +='</select></div><input type="hidden" name="type" value="move"><input type="hidden" name="id" value="'+arr+'"><button type="button" onclick="removePro()" style="margin-left:5px;"  class="btn btn-default">移动</button></form>';
             html=demo;
      },
  })
layer.open({
      type: 1,
      skin: 'layui-layer-filemove', //样式类名
      offset: '200px',
      title: '产品移动',
      anim: 1,
      content: html
  });
 }
}

function copyfile(arr,type){
  var html;
 if(arr.length==0){
   layer.msg('没有选择产品哦', {icon: 5});
 }
 else {
  $.ajax({
      url: '/getcate',
      type: "get",
      data: {'type':type},
      dataType: "json",
      async: false,
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success: function (data) {
        var demo ='<form id="movefile" style="margin-top:8px" class="navbar-form navbar-left zz" role="search"><div class="form-group"><select class="form-control" name="path" required>';
          $.each(data.res, function(i, item) {
             demo+='<option value="'+item.path+'-'+item.id+'">'+item.html+''+item.name+'</option>'
  					})
           demo +='</select></div><input type="hidden" name="type" value="copy"><input type="hidden" name="id" value="'+arr+'"><button type="button" onclick="removePro()" style="margin-left:5px;"  class="btn btn-default">复制</button></form>';
             html=demo;
      },
  })
layer.open({
      type: 1,
      skin: 'layui-layer-filemove', //样式类名
      offset: '200px',
      title: '产品复制',
      anim: 1,
      content: html
  });
 }
}

function moveicon(event){
  $('input[name=img]').val($(event.target).parent().data('img'));
}

function sitemap(){

  $.ajax({
      type: 'GET',
      url: '/mysitemap',
      dataType: 'json',
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      beforeSend: function () {
          jz = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
      },
      success: function (data) {
          layer.close(jz);
          layer.msg('生成成功');
      },
      error: function () {
          layer.close(jz);
          layer.msg("失败,指定的路由可能不存在");

      }
  });

}
// function exportajax(){
//
//   $.ajax({
//       url: '/Exporting',
//       type: "get",
//       data: $('#exportForm').serialize(),
//       dataType: "json",
//       async: false,
//       headers: {
//           'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
//       },
//       success: function (data) {
//
//       },
//   })
// }

function exportXls(){

  layer.open({
        type: 1,
        skin: 'layui-layer-filemove',
        offset: '200px',
         area: ['700px', '230px'],
        title: '导出xls',
        anim: 1,
        content: '<html>\
        <form class="layui-form" id="exportForm" action="/Exporting" >\
      <div class="layui-form-item">\
      <label class="layui-form-label">标题</label>\
      <div class="layui-input-block">\
        <input type="text" style="margin-top:15px;width:500px;" name="name" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">\
      </div>\
    </div>\
    <div class="layui-form-item">\
      <label class="layui-form-label">格式</label>\
      <div class="layui-input-block">\
        <input type="radio" name="type" value="xls" title="Excel5" checked>\
        <input type="radio" name="type" value="xlsx" title="Excel2007 (xlsx)" >\
          <input type="radio" name="type" value="csv" title="CSV" >\
      </div>\
      </div>\
      <div class="layui-form-item">\
      <div class="layui-input-block">\
        <button class="layui-btn exportajax"   lay-filter="formDemo">立即提交</button>\
        <button type="reset" class="czt layui-btn layui-btn-primary">重置</button>\
      </div>\
    </div>\
  </form>\
</html>',
 success: function(layero, index){
   layui.use('form', function(){
  var form = layui.form();
  form.render();
});
  }
    }
  );
}

function submitxls(){
   if($('#xlsFile').val()=='')
   {
    layer.msg('没有选择任何东西哦');
   }
   var formData = new FormData();
    var file =$('#xlsFile');
   //formData.append("image", formElement.files[0]);
   formData.append(file.attr('name'), file[0].files[0]);


   $.ajax({
       url: '/Importing',
       type: 'POST',
       data: formData,
       async: false,
       cache: false,
       contentType: false,
       processData: false,
       headers: {
           'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
       },
       beforeSend: function () {

           jz = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
       },
       success: function (data) {
           if (data.code==1) {
              layer.close(jz);
              layer.msg('导入成功');
           }else {
               layer.close(jz);
               layer.msg(data.error);
           }
       },
       error: function () {
           layer.close(jz);
             layer.msg('失败，可能和需要的格式不符合');
       }
   });

}


function importXls(){

  layer.open({
        type: 1,
        skin: 'layui-layer-filemove',
        offset: '200px',
         area: ['700px', '230px'],
        title: '导入xls',
        anim: 1,
        content: '<html>\
    <form class="layui-form" id="exportForm" >\
    <div class="layui-form-item">\
      <label class="layui-form-label">选择</label>\
      <div class="layui-input-block">\
        <input style="margin-top:30px" id="xlsFile" type="file" name="xls"  >\
      </div>\
      </div>\
      <div class="layui-form-item">\
      <div class="layui-input-block">\
        <button class="layui-btn exportajax" type="button" onclick="submitxls()"   lay-filter="formDemo">立即提交</button>\
      </div>\
    </div>\
  </form>\
</html>',
 success: function(layero, index){
   layui.use('form', function(){
  var form = layui.form();
  form.render();
});
  }
    }
  );
}
function updateAjax()
{
  $.ajax({
      url: '/ststem/update',
      type: 'POST',
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      beforeSend: function () {
         ac =layer.msg('更新中 请稍等 ，请勿刷新', {
                icon: 16
                ,shade: 0.01
                ,time: 2000000
});
      },
      success: function (data) {
         layer.close(ac);
         if (data.code==1) {
           layer.msg(data.msg, {icon: 6});
         }

      },
      error: function () {
          layer.close(ac);
          layer.msg("未知原因更新失败。联系管理员");

      }

  });

}

function DetectionUpdate()
{
  $.ajax({
      url: '/DetectionUpdate',
      type: 'POST',
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      beforeSend: function () {
           jz = layer.load(0, {shade: false});
      },
      success: function (data) {
          layer.close(jz);
          if (data.code==0) {
              layer.msg(data.msg);
          }
          else {

         var a1 = layer.open({
              type: 1
              ,title: false //不显示标题栏
              ,closeBtn: false
              ,area: '300px;'
              ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
              ,resize: false
              ,btn: ['马上更新', '取消']
              ,btnAlign: 'c'
              ,moveType: 1 //拖拽模式，0或者1
              ,content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">'+data.log+'</div>'
              ,success: function(layero){
                var btn = layero.find('.layui-layer-btn0');
                btn.click(function(event) {
                layer.close(a1);
                updateAjax()
                });
    //console.log(data.log);

  }
});
          }

      },

  });

}

function explode(str){
  var str = str.split(';');
  return str;
}

function getLocalTime(tm) {
	return new Date(parseInt(tm) * 1000).format("yyyy/MM/dd hh:mm:ss");
}

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
function insertEdit(){

   //alert($('#newEditHtml').val());
   layer.close();
}

function setHtml(){


  layer.open({
        type: 1,
        skin: 'layui-layer-filemove',
        btn: ['保存'],
         area: ['700px', '600px'],
        title: '设置源代码',
        anim: 1,
        content: '<html>\
    <form class="layui-form" id="setHtmlForm" >\
           <textarea name="desc" id="newEditHtml" placeholder="请输入内容" style="height:500px" class="layui-textarea"></textarea>\
  </form>\
</html>',
 success: function(layero, index){
   layui.use('form', function(){
  var form = layui.form();
  form.render();
});
  },yes: function(index, layero){
    var newt = $('#newEditHtml').val();
      $('#info').val(newt);
       editor.txt.html('<p>用 JS 设置的内容</p>')
    //layer.close(index)
 }

    }
  );
}

function clearCache()
{
  $.ajax({
      type: 'GET',
      url: '/clearCache',
      dataType: 'json',
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      beforeSend: function () {
          jz = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
      },
      success: function (data) {
          layer.close(jz);
          layer.msg(data.msg);
      },
      error: function () {
          layer.close(jz);
          layer.msg("清除失败。联系管理员");
      }
  });
}
function DelLink(id){

  layer.confirm('确认删除?', {icon: 3, title: '提示'}, function (index) {
      $.ajax({
           url: "/system/link",
          type: "post",
          data: {'id': id,'type':5},
          dataType: "json",
          headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          success: function (res) {
              if (res.code == 1) {
                  showlink();

              } else {
                  layer.alert('删除失败');
              }
          },
          error: function (msg) {
              layer.alert('权限不足联系管理员');
          },
      })
      layer.close(index);
  })
}
function EditLink(id){
  var fa = layer.open({
        type: 1,
        skin: 'layui-layer-linksadd',
        offset: '20%',
        shade: 0,
         area: ['40%', '40%'],
        title: '友情链接:编辑',
        anim: 1,
        content: '<html>\
      <div class="linkadd">\
  <form class="layui-form" id="linkedit"  >\
  <div class="layui-form-item">\
    <label class="layui-form-label">名称</label>\
    <div class="layui-input-block">\
      <input type="text" name="title" required  lay-verify="required" placeholder="名称" autocomplete="off" class="layui-input">\
    </div>\
  </div>\
  <div class="layui-form-item">\
    <label class="layui-form-label">排序</label>\
    <div class="layui-input-block">\
      <input type="text" name="sort" required value=""  lay-verify="required" placeholder="排序" autocomplete="off" class="layui-input">\
    </div>\
  </div>\
  <div class="layui-form-item">\
    <label class="layui-form-label">链接</label>\
    <div class="layui-input-block">\
      <input type="text" name="link" required  lay-verify="required" placeholder="链接" autocomplete="off" class="layui-input">\
    </div>\
  </div>\
  <div class="layui-form-item">\
    <div class="layui-input-block">\
      <input type="hidden" name="type" value="4">\
      <input type="hidden" name="id" value="">\
      <button class="layui-btn linkedit" type="button" >立即提交</button>\
      <button type="reset" class="layui-btn layui-btn-primary">重置</button>\
    </div>\
  </div>\
</form>\
</div>\
</html>',
 success: function(layero, index){
   $.ajax({
       url: "/system/link",
       type: "post",
       data: {'type':3,'id':id},
       dataType: "json",
       headers: {
           'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
       },
       success: function (res) {
          $("#linkedit input[name=title]").attr('value', res.data.title);
            $("#linkedit input[name=link]").attr('value', res.data.link);
              $("#linkedit input[name=sort]").attr('value', res.data.sort);
                $("#linkedit input[name=id]").attr('value', res.data.id);
       },
       error: function (msg) {
           layer.alert('发生错误');
       },
   })



   $(".linkedit").click(function(event) {
     $.ajax({
         url: "/system/link",
         type: "post",
         data: $('#linkedit').serialize(),
         dataType: "json",
         headers: {
             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
         },
         success: function (res) {
            if (res.code==1) {
               layer.close(fa);
               showlink();
            }
            else {
              layer.msg(res.msg);
            }
         },
         error: function (msg) {
             layer.alert('发生错误');
         },
     })
   });
  }
    }
  );

}

function addlink(){
  var fa = layer.open({
        type: 1,
        skin: 'layui-layer-linksadd',
        offset: '20%',
        shade: 0,
         area: ['40%', '40%'],
        title: '友情链接:添加',
        anim: 1,
        content: '<html>\
      <div class="linkadd">\
  <form class="layui-form" id="linkadd"  >\
  <div class="layui-form-item">\
    <label class="layui-form-label">名称</label>\
    <div class="layui-input-block">\
      <input type="text" name="title" required  lay-verify="required" placeholder="名称" autocomplete="off" class="layui-input">\
    </div>\
  </div>\
  <div class="layui-form-item">\
    <label class="layui-form-label">排序</label>\
    <div class="layui-input-block">\
      <input type="text" name="sort" required value="99"  lay-verify="required" placeholder="排序" autocomplete="off" class="layui-input">\
    </div>\
  </div>\
  <div class="layui-form-item">\
    <label class="layui-form-label">链接</label>\
    <div class="layui-input-block">\
      <input type="text" name="link" required  lay-verify="required" placeholder="链接" autocomplete="off" class="layui-input">\
    </div>\
  </div>\
  <div class="layui-form-item">\
    <div class="layui-input-block">\
      <input type="hidden" name="type" value="2">\
      <button class="layui-btn linkinsert" type="button" >立即提交</button>\
      <button type="reset" class="layui-btn layui-btn-primary">重置</button>\
    </div>\
  </div>\
</form>\
</div>\
</html>',
 success: function(layero, index){
   $(".linkinsert").click(function(event) {
     $.ajax({
         url: "/system/link",
         type: "post",
         data: $('#linkadd').serialize(),
         dataType: "json",
         headers: {
             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
         },
         success: function (res) {
            if (res.code==1) {
               layer.close(fa);
               showlink();
            }
            else {
              layer.msg(res.msg);
            }
         },
         error: function (msg) {
             layer.alert('发生错误');
         },
     })
   });
  }
    }
  );

}
function showlink(){
   $(".linkbd").empty();
  $.ajax({
      url: "/system/link",
      type: "post",
      data: {'type':1},
      dataType: "json",
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success: function (res) {
          $.each(res.data,function(index, el) {
              $(".linkbd").append("<tr><td>"+el['title']+"</td><td>"+el['link']+"</td><td>"+el['sort']+"</td><td><a href='javascript:EditLink("+el['id']+")' class='layui-btn  layui-btn-small'>编辑</a><a href='javascript:DelLink("+el['id']+")' class='layui-btn layui-btn-danger layui-btn-small' style='margin-left:5px;'>删除</a></td></tr>")
          });
      },
  })

}

function link()
{
  var fa = layer.open({
        type: 1,
        skin: 'layui-layer-links',
        offset: '7%',
        area: ['85%', '85%'],
        title: '友情链接',
        anim: 1,
        content: '<html>\
        <div class="linkfather">\
        <a  class="btn btn-primary linkaddbtn">添加</a>\
        <table class="layui-table">\
  <colgroup>\
    <col width="150">\
    <col width="200">\
    <col width="200">\
    <col width="200">\
  </colgroup>\
  <thead>\
    <tr>\
      <th>名称</th>\
      <th>链接</th>\
      <th>排序</th>\
      <th>操作</th>\
    </tr> \
  </thead>\
  <tbody class="linkbd">\
  </tbody>\
</table>\
</div>\
</html>',
 success: function(layero, index){
   showlink();
   $(".linkaddbtn").bind("click",function(){
    addlink('添加',2);
});


  }
    }
  );
}
