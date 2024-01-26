<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Log;

class Handler extends ExceptionHandler
{
    protected $dontReport = [
        RequiresProException::class,
    ];

    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        // It's helpful to monitor these at first.
        $this->stopIgnoring(ValidationException::class);
        $this->renderable(function (ThrottleRequestsException $e, Request $request) {
            Log::warning(get_class($e), [
                'url' => $request->url(),
                'ip' => $request->ip(),
                'headers' => $request->header()
            ]);
        });

        // Custom error response so we can detect it easily in the client
        $this->renderable(function (RequiresProException $e, Request $request) {
            return response()->json(['message' => $e->getMessage(), 'requires_pro' => true], 400);
        });
    }
}
