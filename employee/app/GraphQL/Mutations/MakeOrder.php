<?php

namespace App\GraphQL\Mutations;

use App\Console\Commands\employee;
use App\Models\employee as ModelsEmployee;
use Illuminate\Support\Facades\Redis;

final class MakeOrder
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
        $tmp = ModelsEmployee::find($args["employee_id"]);
        $tmp->haveTicket = false;
        $tmp->save();
        Redis::publish("order:create", json_encode($args));
        return "order created";
    }
}
