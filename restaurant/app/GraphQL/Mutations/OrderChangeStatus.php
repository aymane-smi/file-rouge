<?php

namespace App\GraphQL\Mutations;

use App\Models\order;

final class OrderChangeStatus
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
        //echo json_encode($args["status"]);
        $tmp = order::find($args["id"]);
        $tmp->status = $args["status"];
        $tmp->save();
        return "status changed";
    }
}
