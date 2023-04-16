<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class menu extends Controller
{
    //
    public function index(Request $req)
    {
        //dd($req->test);
        $req->validate([
            "image" => "image",
        ]);

        $name = now()->timestamp . "_" . $req->file("menu")->getClientOriginalName();
        $req->file("menu")->storeAs('public/menu', $name);

        return Response()->json(["message" => "image uploaded " . $name], 200);
    }
}
