<?php

namespace App\GraphQL\Mutations;

use App\Models\employee;
use Illuminate\Support\Facades\DB;

final class EditEmployeeByIdResolver
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
        $tmp = null;
        if ($args["password"] === null) {
            $tmp = employee::find($args["id"]);
            $tmp->first_name = $args["first_name"];
            $tmp->last_name = $args["last_name"];
            $tmp->email = $args["email"];
            $tmp->phone = $args["phone"];
            $tmp->class = $args["class"];
            $tmp->year = $args["year"];
            $tmp->save();
        } else {
            DB::table("employees")->where("id", $args["id"])->update($args);
            $tmp = employee::find($args["id"]);
        }
        return $tmp;
    }
}
