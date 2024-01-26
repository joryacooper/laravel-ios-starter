<?php

namespace App\Http\Middleware;

use Auth;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class AuthorizePulseUser
{
    public function handle(Request $request, Closure $next): mixed
    {
        if (App::environment('local')) {
            return $next($request);
        }

        abort(401);
    }
}
