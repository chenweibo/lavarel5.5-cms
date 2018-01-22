<?php

namespace App\Http\Controllers\Admin;

use App\Node;
use File;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use App\UserType;
use App\Content;
use App\Gbook;
use Validator;
use Route;

class AdminController extends Controller
{
    public function index()
    {
        $node= new Node();
        $usertype= new UserType();
        $info=$usertype->getRoleInfo(2);
        return view('AdminIndex', ['username'=>session('adminuser'),'rolename'=>session('role'),'menu'=>$node->getMenu(session('rule'))]);
    }

    public function indexPage(Request $request)
    {
        $content= new Content();
        $gbook = new Gbook();
        $page = $content->where('type', 1)->count();
        $product = $content->where('type', 2)->count();
        $article = $content->where('type', 3)->count();
        $image = $content->where('type', 4)->count();
        $down = $content->where('type', 5)->count();
        $book = $gbook->count();
        //$output = shell_exec('ls -lart');
        $base = base_path();
        //exec("cd ".$base .'&& php artisan backup:run --only-db', $output);
        $data = unserialize(file_get_contents(public_path('tongji.db')));
        return view('admin/index', ['data'=>$data,'page'=>$page,'product'=>$product,'article'=>$article,'image'=>$image,'down'=>$down,'gbook'=>$book]);
    }

    public function site(Request $request)
    {
        if ($request->ajax()) {
            $param = $request->all();
            if (File::put(config_path().'/site.php', ConfigBack($param))) {
                return ['code'=>'1','msg'=>'操作成功'];
            } else {
                return ['code'=>'0','msg'=>'发生未知错误联系管理员'];
            }
        }

        $data=File::getRequire(config_path().'/site.php');
        $shui=File::getRequire(config_path().'/site_other.php');

        return view('admin/site/Site', ['data'=>$data,'shui'=>$shui]);
    }

    public function links(Request $request)
    {
        if ($request->ajax()) {
            //查询
            if ($request->type==1) {
                $data= DB::table('link')->orderBy('sort', 'asc')->get();
                return ['code'=>1,'data'=>$data];
            }
            //插入
            if ($request->type==2) {
                $validator = Validator::make(
            $request->all(),
            [
                'title' => 'required',
                'link' => 'required',
            ],
              [
                'title.required' => '您的姓名不能为空',
                'link.required' => '链接不能为空',
            ]
                );
                if ($validator->fails()) {
                    $errors = $validator->errors()->first();
                    return ['code'=>0,'msg'=>$errors];
                }
                DB::table('link')->insert($request->except('type', 'id'));
                return ['code'=>1,'msg'=>'添加成功'];
            }

            //find id
            if ($request->type==3) {
                if ($res=DB::table('link')->where('id', $request->id)->get()->first()) {
                    return ['code'=>1,'data'=>$res];
                }
                return ['code'=>1,'msg'=>"更新失败"];
            }
            //更新
            if ($request->type==4) {
                if (DB::table('link')->where('id', $request->id)->update($request->except('type'))) {
                    return ['code'=>1,'msg'=>'更新成功'];
                }
                return ['code'=>0,'msg'=>"更新失败"];
            }
            //删除
            if ($request->type==5) {
                if (DB::table('link')->where('id', $request->id)->delete()) {
                    return ['code'=>1,'msg'=>'删除成功'];
                }
                return ['code'=>0,'msg'=>"删除失败"];
            }
        }
    }
    public function site_system(Request $request)
    {
        if ($request->ajax()) {
            if ($request->code==0) {
                $data['admin_name'] = $request->admin_name;
                $data['shuiyin'] = 0;
            } else {
                $data['admin_name'] = $request->admin_name;
                $data['shuiyin'] = $request->code.':'.$request->shuiImg.':'.$request->weizhi;
            }

            if (File::put(config_path().'/site_other.php', ConfigBack($data))) {
                return ['code'=>'1','msg'=>'操作成功'];
            } else {
                return ['code'=>'0','msg'=>'发生未知错误联系管理员'];
            }
            return ['code'=>'0','msg'=>$request->all()];
        }
    }

    public function SlideIndex($value='')
    {
        $str=DB::table('slide')->get();
        return view('admin/site/Slide', ['str'=>$str]);
    }

    public function SlideCreate(Request $request)
    {
        if ($request->ajax()) {
            $param = $request->all();
            $data=DB::table('slide')->insert($param);
            if ($data) {
                return ['code'=>'1','msg'=>'操作成功','data'=> route('SlideIndex') ];
            } else {
                return ['code'=>'0','msg'=>'操作失败联系管理员'];
            }
        }
        $slide_type=$request->slide_type;
        return view('admin/site/SlideCreate')->with('slide_type', $slide_type);
    }

    public function SlideEdit(Request $request)
    {
        if ($request->ajax()) {
            $param = $request->all();
            $data=DB::table('slide')->where('id', $param['id'])->update($param);
            if ($data) {
                return ['code'=>'1','msg'=>'操作成功','data'=> route('SlideIndex') ];
            } else {
                return ['code'=>'0','msg'=>'操作失败联系管理员'];
            }
        }
        $data = DB::table('slide')->where('id', $request->id)->get()->first();
        return view('admin/site/SlideEdit')->with('data', $data);
    }

    public function SlideDelete(Request $request)
    {
        if ($request->ajax()) {
            $id=$request->id;
            if (DB::table('slide')->where('id', $id)->delete()) {
                return ['code'=>'1'];
            } else {
                return ['code'=>'0'];
            }
        }
        return ['code'=>1];
    }
    public function error()
    {
        return view('error');
    }
    public function Statistics(Request $request)
    {
        $param= $request->all();
        if (!empty($param)) {
            return ['data'=>'傻逼别访问了。'];
        }
        $file = public_path('tongji.db');
        $data = unserialize(file_get_contents($file));
        $new = [];

        $new['total'] =$data['total']+1;
        if (array_has($data, date('Ymd'))) {
            $new[date('Ymd')]=$data[date('Ymd')]+1;
        } else {
            $new[date('Ymd')]=1;
        }
        File::put($file, serialize($new));
    }
}
