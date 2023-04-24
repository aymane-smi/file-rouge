<?php

namespace App\Console\Commands;

use App\Models\order;
use App\Models\orderDetails;
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
            $tmp = json_decode($message);
            $order = order::create([
                "employee_id" => $tmp->employee_id,
                "restaurant_id" => $tmp->restaurant_id,
                "first_name" => $tmp->first_name,
                "last_name" => $tmp->last_name,
                "phone" => $tmp->phone,
                "ticket" => $tmp->haveTicket,
            ]);
            foreach ($tmp->detail as $detail)
                orderDetails::create([
                    "order_id" => $order->id,
                    "menu_id" => $detail->menuId,
                    "quantity" => $detail->quantity,
                    "current_price" => $detail->price,
                ]);
        });
    }
}
