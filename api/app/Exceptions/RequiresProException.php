<?php

namespace App\Exceptions;

use Exception;

class RequiresProException extends Exception
{
    public function __construct(string $message = "This action requires Premium")
    {
        parent::__construct($message);
    }
}
