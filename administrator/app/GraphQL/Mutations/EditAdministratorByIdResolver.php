<?php

namespace App\GraphQL\Mutations;

use App\Models\administrator;
use Illuminate\Support\Facades\DB;

final class EditAdministratorByIdResolver
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
        DB::table("employees")->where("id", $args["id"])->update($args);
        $tmp = administrator::find($args["id"]);

        return $tmp;
    }
}
