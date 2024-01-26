<?php

namespace App\Http\Controllers;

use App\Http\Resources\AuthUserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthUserProSubscriptionController extends Controller
{
    function store() {
        $user = Auth::user();
        $user->is_pro = true;
        $user->save();

        Log::info("New pro subscription", ['email' => $user->email]);

        return new AuthUserResource($user);
    }

    function destroy()
    {
        $user = Auth::user();
        $user->is_pro = false;
        $user->save();

        return new AuthUserResource($user);
    }
}
