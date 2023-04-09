<?php

namespace App\GraphQL\Queries;

use App\Models\restaurant;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

final class RestaurantLogin
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver

        $restaurant = restaurant::where("email", $args["email"])->first();

        if (!$restaurant || !Hash::check($args["password"], $restaurant->password))
            throw ValidationException::withMessages([
                "message" => "invalid email or password",
            ]);
        else
            return $restaurant->createToken($args["email"])->plainTextToken;
    }
}
