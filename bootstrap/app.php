<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
            
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            // \Illuminate\Session\Middleware\AuthenticateSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
           
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ]);
         $middleware->alias([
            'isAdmin' => \App\Http\Middleware\AdminRole::class,
            'isUser' => \App\Http\Middleware\UserRole::class,
        ]);
        $middleware->validateCsrfTokens(except: ['*']);

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
