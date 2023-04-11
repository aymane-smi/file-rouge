<?php

namespace App\GraphQL\Queries;

use App\Models\administrator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

final class AdminLogin
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver

        $administrator = administrator::where("email", $args["email"])->first();

        if (!$administrator || !Hash::check($args["password"], $administrator->password))
            throw ValidationException::withMessages([
                "message" => "invalid email or password",
            ]);
        else
            return [
                "administrator" => $administrator,
                "token" => $administrator->createToken($args["email"])->plainTextToken,
            ];
    }
}
