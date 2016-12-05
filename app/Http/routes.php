<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/','GalleryController@index');

Route::get('/gallery','GalleryController@gallery' );

Route::delete('/delete/{id}', 'GalleryController@dell');

Route::post('/item/{id}', 'GalleryController@editComment');
Route::post('/item/','GalleryController@addComment');


Route::post('/uploader/',['nocsrf' => true,'uses' => 'GalleryController@upload']);


Route::get('/item/{id}', 'GalleryController@getItem');



