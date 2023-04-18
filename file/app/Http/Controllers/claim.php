<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class claim extends Controller
{
    //
    public function index(Request $req)
    {
        //dd($req->test);
        $req->validate([
            "image" => "image",
        ]);

        $name = now()->timestamp . "_" . $req->file("claim")->getClientOriginalName();
        $req->file("claim")->storeAs('public/complain', $name);

        return Response()->json(["message" => $name], 200);
    }
}
