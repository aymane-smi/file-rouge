<?php

namespace App\GraphQL\Mutations;

use App\Models\complaints;

final class AddComplain
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
        $tmp = complaints::create([
            "first_name" => $args["first_name"],
            "last_name" => $args["last_name"],
            "description" => $args["description"],
        ]);

        if (array_key_exists("image", $args)) {
            $tmp->image = $args["image"];
            $tmp->save();
        }

        return "claim created";
    }
}
