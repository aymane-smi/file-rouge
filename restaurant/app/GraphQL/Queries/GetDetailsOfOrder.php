<?php

namespace App\GraphQL\Queries;

use App\Models\menu;
use App\Models\order;
use App\Models\orderDetails;

final class GetDetailsOfOrder
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
        $details = orderDetails::where("order_id", $args["id"])->get();

        $result = [];

        foreach ($details as $detail) {
            array_push($result, [
                "menu" => menu::where("id", $detail->menu_id)->first(),
                "detail" => $detail
            ]);
        }

        return $result;
    }
}
