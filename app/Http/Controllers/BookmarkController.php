<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BookmarkController extends Controller
{
     public function createBookmark(Request $request){
       $request->validate([
            'user_id' => 'required',
            'schedule_id' => "required"
        ]);
       $db = DB::table('schedules')->where('id', '=', $request->schedule_id);
       $db->decrement("quota", 1);

         DB::table('bookmarks')->insert([
                    'schedule_id' => $request->schedule_id,
                    'user_id' => $request->user_id,
        ]);

        return response()->json(['message' => 'Berhasil Bookmark']);
    }

    public function getBookmark ($userId){
         $bookmarks = DB::table('bookmarks')
            ->join('schedules', 'bookmarks.schedule_id', '=', 'schedules.id')
            ->join('clinics', 'schedules.clinic_id', '=', 'clinics.id')
            ->where('bookmarks.user_id', $userId)
            ->select(
                'bookmarks.id as bookmark_id',
                'schedules.id as schedule_id',
                'schedules.date',
                'schedules.price',
                'schedules.quota',
                'clinics.id as clinic_id',
                'clinics.name as clinic_name',
                'clinics.address as clinic_address',
                'clinics.image_file',
                'clinics.category',
                 DB::raw("CONCAT('" . asset('storage/public/clinic_images/') . "/', clinics.image_file) as clinic_image_file")
            )
            ->get();
        return response()->json($bookmarks);
    }

    public function removeBookmark($id){
        $db =  DB::table('bookmarks')->where('id', $id);
        $get_bookmark_data = $db->first();
        DB::table('schedules')->where('id', '=', $get_bookmark_data->schedule_id)->increment('quota', 1);
        $db->delete();
        return response()->json(['message' => 'Berhasil menghapus.'], 200);
    }
}
