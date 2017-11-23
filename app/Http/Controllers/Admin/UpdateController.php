<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use \GuzzleHttp\Client;
use App\Http\Controllers\Controller;
use Zipper;

class UpdateController extends Controller
{
    public function update()
    {
    }

    public function DetectionUpdate()
    {
        $client = new Client();
        $res = $client->request('GET', 'http://update.dqzd.com/version.txt');
        $version = $res->getBody();
        $data = $client->request('get', 'http://update.dqzd.com/updatelog.txt')->getBody()->getContents();
        // $data = file('http://update.dqzd.com/updatelog.txt');
        if ($version == env('version')) {
            return ['code'=>0 , 'msg'=>'没有发现新版本'];
        }
        return ['code'=>1 , 'msg'=>'发现新版本','log'=>iconv('gb2312', 'utf-8', $data)];
    }
    public function BackupSql()
    {
        //exec("cd ".$base .'&& php artisan backup:run --only-db', $output);

        //mysqldump -hlocalhost -uweblavarel -p weblavarel >D://dd.sql
        //$this->downZip();
        Zipper::make(base_path('update.zip'))->folder('')->extractTo(base_path());
        //dd($a);
    }

    public function downZip()
    {
        $client = new Client(['verify' => false]);  //忽略SSL错误
        $response = $client->get('http://update.dqzd.com/update.zip', ['save_to' => base_path('update.zip')]);
    }
}
