<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class restaurant extends Model
{
    use HasFactory;

    public function setPasswordAttribute($password)
    {
        $this->attributes["password"] = bcrypt($password);
    }

    public function menus()
    {
        return $this->hasMany(menu::class);
    }
}
