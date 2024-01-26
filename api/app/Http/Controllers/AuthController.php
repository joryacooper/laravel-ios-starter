<?php

namespace App\Http\Controllers;

use App\Actions\Fortify\CreateNewUser;
use App\Http\Resources\AuthUserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Notification;

class AuthController extends Controller
{
    function user(Request $request) {
        return new AuthUserResource($request->user());
    }

    function register(Request $request, CreateNewUser $action)
    {
        $user = $action->create($request->input());
        $token = $user->createToken('auth')->plainTextToken;
        Log::info('New user registration', ['email' => $user->email]);

        return [
            'token' => $token,
            'user' => (new AuthUserResource($user))
        ];
    }

    function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
        if (Auth::attempt($credentials)) {
            Log::info('New login', ['email' => Auth::user()->email]);
            return [
                'token' => Auth::user()->createToken('auth')->plainTextToken,
                'user' => (new AuthUserResource(Auth::user()))
            ];
        }
        Log::info('Failed login', ['email' => $credentials['email']]);
        abort(401, 'Invalid email or password');
    }

    function destroy(): void
    {
        $user = Auth::user();
        $user->delete();

        // send user notification for undoing
        $user->notify(new \App\Notifications\AuthUser\UserDeleted());
    }
}
