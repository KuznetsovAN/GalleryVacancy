<?php

namespace App\Http\Controllers;

use Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\gallery;
use App\comments;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class GalleryController extends Controller
{

    public function index()
    {
        return view('welcome');
    }

    //метод возвращает загруженные картинки
    public function gallery()
    {
        $data = gallery::all();
        return response()
            ->json($data);
    }

    //удаление картинки
    public function dell(Request $request,$id)
    {
        gallery::destroy($id);

        return response()
            ->json(['success' => true]);

        //http://minionomaniya.ru/wp-content/uploads/2016/01/miniony_kartinki_na_rabochi_stol_1920x1080.jpg
    }

    //загрузка картинок
    public function upload()
    {

        $file = Request::file('file');

        $filename = md5(date("YmdHis").rand(5,50));

        $extension = $file->getClientOriginalExtension();

        $a=Storage::disk('uploadedImage')->put($filename.'.'.$extension,  File::get($file));

        $url = '/images/uploaded/'.$filename.".".$extension;

        $image = new gallery();

        $image->name = $file->getClientOriginalName();
        $image->url = $url;

        $image->save();

        return response()
            ->json(
                [
                    'success' => true
                ]
            );
    }

    //загрузка детального просмотра картинки
   public function getItem($id)
   {

       $data = gallery::find($id);
       $dataComments = comments::where('galleryId', $id)->get();

       return response()
           ->json([
               'id' => $data->id,
               'name' => $data->name,
               'url'=>$data->url,
               'comments'=> $dataComments

           ]);
   }

    //редактирование коментарий
   public function editComment(\Illuminate\Http\Request $request,$id)
   {
       $input = $request->all();

       if(!isset( $input['data']['id'])){
            $comment = new comments();
       }
       else{
           $comment = comments::find($input['data']['id']);
       }

       $comment->galleryId = $id;
       $comment->author = $input['data']['author'];
       $comment->date = date("Y-m-d H:i:s");
       $comment->text = $input['data']['text'];
       $comment->save();

       $result = [
           'success' => true,
           'date'=> $comment->date,
       ];

       if(!isset( $input['data']['id'])){
           $result['id'] = $comment->id;
       }

       return response()
           ->json(
               $result
           );
   }
}
