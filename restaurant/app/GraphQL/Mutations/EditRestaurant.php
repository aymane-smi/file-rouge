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
        if ($args["password"] === null) {
            $tmp = restaurant::find($args["id"]);
            $tmp->name = $args["name"];
            $tmp->email = $args["email"];
            $tmp->phone = $args["phone"];
            $tmp->address = $args["address"];
            $tmp->save();
        } else {
            DB::table("restaurants")->where("id", $args["id"])->update($args);
            $tmp = restaurant::find($args["id"]);
            $tmp->password = bcrypt($args["password"]);
            $tmp->save();
        }
        return $tmp;
    }
}
