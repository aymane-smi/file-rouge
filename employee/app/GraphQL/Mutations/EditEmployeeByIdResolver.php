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
        DB::table("employees")->where("id", $args["id"])->update($args);
        $tmp = employee::find($args["id"]);
        return $tmp;
    }
}
