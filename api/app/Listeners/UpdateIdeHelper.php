<?php

namespace App\Listeners;

use Illuminate\Database\Events\MigrationsEnded;
use Illuminate\Support\Facades\Artisan;
use Symfony\Component\Console\Output\ConsoleOutput;

class UpdateIdeHelper
{
    public function handle(MigrationsEnded $event): void
    {
        if (! app()->environment('local')) {
            return;
        }

        $cmd = 'ide-helper:models --write --reset';
        $output = new ConsoleOutput();
        $output->writeln("\n<info>Running</info> artisan $cmd");

        Artisan::call($cmd);
    }
}
