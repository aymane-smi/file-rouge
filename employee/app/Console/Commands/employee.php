<?php

namespace App\Console\Commands;

use App\Models\employee as ModelsEmployee;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;

class employee extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'employee:create';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'handle create employee';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        //
        Redis::subscribe("employee:create", function ($message) {
            echo $message;
            $tmp = json_decode($message);
            var_dump($tmp);
            ModelsEmployee::create([
                "first_name" => $tmp->first_name,
                "last_name" => $tmp->last_name,
                "email" => $tmp->email,
                "password" => $tmp->password,
                "year" => $tmp->year,
                "class" => $tmp->class,
                "haveTicket" => $tmp->haveTicket,
            ]);
        });
    }
}
