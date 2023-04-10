<?php

namespace App\GraphQL\Queries;

use App\Models\employee;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

final class Login
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver

        $employee = employee::where("email", $args["email"])->first();
        if (!$employee || !Hash::check($args["password"], $employee->password))
            throw ValidationException::withMessages([
                "message" => "invalid email or password",
            ]);
        else
            return [
                "employee" => $employee,
                "token" => $employee->createToken($args["email"])->plainTextToken
            ];
        //return $employee;
    }
}
