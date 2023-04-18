<?php

namespace App\GraphQL\Mutations;

use App\Models\menu_details;

final class createMenuDetails
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
        for ($i = 0; $i < count($args["price"]); $i++)
            menu_details::create([
                "menu_id" => $args["menu_id"],
                "price" => $args["price"][$i],
                "portion" => $args["portion"][$i]
            ]);
        return "details menu created for menu(" . $args["menu_id"] . ")";
    }
}
