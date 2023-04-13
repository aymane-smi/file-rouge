<?php

namespace App\GraphQL\Mutations;

use App\Models\complaints;

final class AddComplaint
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
        $file = $args["file"];
        $name = now()->timestamp . "_" . $args["file"]->getClientOriginalName();
        $file->storeAs('public/complain', $name);
        // complaints::create([
        //     "first_name" => $args["first_name"],
        //     "last_name" => $args["last_name"],
        //     "description" => $args["description"],
        //     "image" => $image,
        // ]);

        return $name;
    }
}
