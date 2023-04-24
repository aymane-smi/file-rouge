<?php

namespace App\GraphQL\Queries;

use App\Models\order;
use App\Models\restaurant;

final class OrderPerRestaurant
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
        $result = [];
        $tmp = restaurant::all();

        foreach ($tmp as $res)
            array_push($result, [
                "count" => order::where("restaurant_id", $res->id)->count(),
                "name" => $res->name,
            ]);
        return $result;
    }
}
