<?php

namespace App\GraphQL\Mutations;

use App\Models\restaurant;
use Illuminate\Support\Facades\DB;

final class EditRestaurant
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        DB::table("restaurants")->where("id", $args["id"])->update($args);
        $tmp = restaurant::find($args["id"]);
        return $tmp;
    }
}
