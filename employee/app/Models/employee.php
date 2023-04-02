<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class employee extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function setPasswordAttribute($password){
        $this->attributes["password"] = bcrypt($password);
    }
}
