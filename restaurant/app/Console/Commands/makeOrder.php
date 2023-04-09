<?php

namespace App\Console\Commands;

use App\Models\order;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;

class makeOrder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'order:create';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'creating new order';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        Redis::subscribe("order:create", function ($message) {
            $tmp = json_decode($message)->input;
            order::create([
                "employee_id" => $tmp->employee_id,
                "menu_id" => $tmp->menu_id,
                "quantity" => $tmp->qte,
                "current_price" => $tmp->price
            ]);
        });
    }
}
