<?php

namespace App\Http\Middleware;

use Auth;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class AuthorizeSuperadmin
{
    public function handle(Request $request, Closure $next): mixed
    {
        if (App::environment('local') || Auth::user()->email === 'jory.a.cooper+admin@gmail.com') {
            return $next($request);
        }

        abort(401);
    }
}
