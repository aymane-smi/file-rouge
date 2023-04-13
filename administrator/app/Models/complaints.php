<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class complaints extends Model
{
    use HasFactory;

    protected $table = "complains";

    protected $guarded = [];

    public $timestamps = false;
}
