<?php

namespace App\GraphQL\Mutations;

use App\Models\menu;
use Illuminate\Support\Facades\DB;

final class EditMenuStatus
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
        DB::table("menus")->where("id", $args["id"])->update($args);
        $tmp = menu::find($args["id"]);
        return $tmp;
    }
}
