<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Laravel\Fortify\Rules\Password;

class CreateNewUser implements CreatesNewUsers
{
    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        $validated = Validator::make($input, [
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => ['required', 'string', new Password],
            'accepted' => 'required|accepted',
        ], [
            'accepted' => 'You must agree to the Terms & Conditions and Privacy Policy'
        ])->validate();

        return User::create([
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'accepted' => $validated['accepted']
        ]);
    }
}
