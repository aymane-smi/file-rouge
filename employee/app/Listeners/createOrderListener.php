<?php

namespace App\Listeners;

use App\Events\createOrder;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class createOrderListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(createOrder $event): void
    {
        printf("menu: %d, employee: %d, price: %d, qte :%d", $event->menu_id, $event->employee_id, $event->price, $event->qte);
    }
}
