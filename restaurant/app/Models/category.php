<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class category extends Model
{
    use HasFactory;

    protected $tablename = "categories";

    protected $guarded = [];

    public function menus()
    {
        return $this->hasMany(menu::class);
    }
}
