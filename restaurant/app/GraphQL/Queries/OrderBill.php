<?php

namespace App\GraphQL\Queries;

use App\Models\order;
use App\Models\orderDetails;

final class OrderBill
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
        $result = [];
        $tmp = order::whereYear('created_at', '=', $args["year"])
            ->whereMonth("created_at", "=", $args["month"])
            ->where("status", 0)
            ->where("restaurant_id", $args["id"])
            ->where("ticket", false)
            ->get();
        foreach ($tmp as $order) {
            $total = 0;
            foreach (orderDetails::where("order_id", $order->id)->get() as $detail) {
                $total += $detail->price * $detail->quantity;
            }

            $total = $total >= 50 ? 50 : $total;

            array_push($result, [
                "first_name" => $order->first_name,
                "last_name" => $order->last_name,
                "total" => $total,
            ]);
        }

        return $result;
    }
}
