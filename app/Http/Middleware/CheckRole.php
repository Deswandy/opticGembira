<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        // In a real app, you would get the authenticated user's role
        // For now, we'll use a session variable set during role selection
        $userRole = session('user_role');
        
        if (!in_array($userRole, $roles)) {
            return redirect('/')->with('error', 'Unauthorized access');
        }
        
        return $next($request);
    }
}