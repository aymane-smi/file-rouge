<?php

namespace App\GraphQL\Mutations;

use App\Models\menu_details;
use App\Models\orderDetails;

final class DeleteDetail
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
        $tmp = menu_details::find($args["id"]);
        $tmp->delete();
        return "delete details";
    }
}
