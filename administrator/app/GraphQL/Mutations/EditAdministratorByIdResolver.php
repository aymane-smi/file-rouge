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
        $tmp = null;
        if ($args["password"] === null) {
            $tmp = administrator::find($args["id"]);
            $tmp->first_name = $args["first_name"];
            $tmp->last_name = $args["last_name"];
            $tmp->email = $args["email"];
            $tmp->save();
        } else {
            DB::table("administrators")->where("id", $args["id"])->update($args);
            $tmp = administrator::find($args["id"]);
            $tmp->password = bcrypt($args["password"]);
            $tmp->save();
        }
        return $tmp;
    }
}
