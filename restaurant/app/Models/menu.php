<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class menu extends Model
{
    use HasFactory;

    public function restaurant()
    {
        return $this->belongsTo(restaurant::class);
    }

    public function details()
    {
        return $this->hasMany(menu_details::class);
    }
}
