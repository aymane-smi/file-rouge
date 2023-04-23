<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Redis;

final class CreateEmployee
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
        Redis::publish("employee:create", json_encode($args));
        return "employee created";
    }
}
