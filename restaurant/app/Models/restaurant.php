<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class restaurant extends Authenticatable
{
    use HasFactory, HasApiTokens;

    public function setPasswordAttribute($password)
    {
        $this->attributes["password"] = bcrypt($password);
    }

    public function menus()
    {
        return $this->hasMany(menu::class);
    }
}
