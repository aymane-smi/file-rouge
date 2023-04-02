<?php

namespace App\GraphQL\Mutations;

use App\Models\employee;
use Illuminate\Support\Facades\DB;

final class editEmployeeByIdResolver
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
        DB::table("employees")->where("id", $args["id"])->update($args);
        $tmp = employee::find($args["id"]);

        // foreach($args as $key)
        //     $tmp[$key] = $args[$key];

        // $tmp->save();
        return $tmp;
    }
}
