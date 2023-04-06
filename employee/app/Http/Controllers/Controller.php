<?php

namespace App\Http\Controllers;

use App\Events\createOrder;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function test(){
        event(new createOrder(2, 5, 1, 54));
        return "test";
    }
}
