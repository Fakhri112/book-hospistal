<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ClinicController extends Controller
{
    public function index(){
        $clinics = DB::table('clinics')
            ->leftJoin('schedules', 'clinics.id', '=', 'schedules.clinic_id')
            ->select(
                'clinics.id as clinic_id',
                'clinics.name',
                'clinics.address',
                'clinics.category',
                'clinics.image_file',
                'schedules.date',
                'schedules.price',
                'schedules.quota'
            )
            ->get()
            ->groupBy('clinic_id')
            ->map(function ($items) {
                $clinic = $items->first();
                return [
                    'id' =>  $clinic->clinic_id,
                    'name' => $clinic->name,
                    'address' => $clinic->address,
                    'category' => $clinic->category,
                    'image_file' => asset('storage/public/clinic_images/' . $clinic->image_file),
                    'schedules' => $items->map(function ($item) {
                        return [
                            'date' => $item->date,
                            'price' => $item->price,
                            'quota' => $item->quota,
                        ];
                    })->values(),
                ];
            })
            ->values();
        return response()->json($clinics, 200);
    }

    public function getSchedule($id){
            // 
           $clinics = DB::table('clinics')
            ->leftJoin('schedules', 'clinics.id', '=', 'schedules.clinic_id')
            ->select(
                'clinics.id as clinic_id',
                'clinics.name',
                'clinics.address',
                'clinics.category',
                'clinics.image_file',
                'schedules.date',
                'schedules.price',
                'schedules.quota'
            )
            ->where("clinic_id", "=", $id)
            ->get()
            ->groupBy('clinic_id')
            ->map(function ($items) {
                $clinic = $items->first();
                return [
                    'id' =>  $clinic->clinic_id,
                    'name' => $clinic->name,
                    'address' => $clinic->address,
                    'category' => $clinic->category,
                    'image_file' => asset('storage/public/clinic_images/' . $clinic->image_file),
                    'schedules' => $items->map(function ($item) {
                        return [
                            'date' => $item->date,
                            'price' => $item->price,
                            'quota' => $item->quota,
                        ];
                    })->values(),
                ];
            })
            ->values();
        return response()->json($clinics, 200);
    }


    public function submit(Request $request){

        $request->validate([
            'name' => 'required|string',
            'address' => 'required|string',
            'category' => ['required', Rule::in(['Rumah Sakit', 'Klinik', 'Praktek Dokter'])], 
            'image_file' => 'required|image|mimes:jpg,jpeg,png|max:2048', 
           
        ]);

        if ($request->hasFile('image_file')) {
            $image = $request->file('image_file');
            $imageName = Str::random(10) . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/clinic_images', $imageName);

            DB::table('clinics')->insert([
                'name' => $request->name,
                'address' => $request->address,
                'category' => $request->category,
                'image_file' => $imageName,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            $clinicId = DB::getPdo()->lastInsertId();
            $schedules = json_decode($request->schedules, true);
            foreach ($schedules as $schedule) {
                DB::table('schedules')->insert([
                    'clinic_id' => $clinicId,
                    'date' => $schedule['date'],
                    'price' => $schedule['price'],
                    'quota' => $schedule['quota'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            return response()->json([
                'message' => 'Data klinik berhasil ditambahkan',
                'data' => [
                    'name' => $request->name,
                    'address' => $request->address,
                    'category' => $request->category,
                    'image' => $imageName,
                    'schedules' => $request->schedules,
                ]
            ], 201);
        } else {
            return response()->json(['message' => 'File gambar diperlukan.'], 422);
        }
    }

    public function destroy($id)
    {
        $clinic = DB::table('clinics')->where('id', $id)->first();
        if (!$clinic) {
            return response()->json(['message' => 'Data Tidak Ditemukan.'], 404);
        }
        DB::table('schedules')->where('clinic_id', $id)->delete();
        if ($clinic->image_file && Storage::exists("public/clinic_images/{$clinic->image_file}")) {
            Storage::delete("public/clinic_images/{$clinic->image_file}");
        }
        DB::table('clinics')->where('id', $id)->delete();
        return response()->json(['message' => 'Data klinik berhasil dihapus.'], 200);
    }

   
}
