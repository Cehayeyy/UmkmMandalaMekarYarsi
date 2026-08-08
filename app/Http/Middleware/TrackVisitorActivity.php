<?php

namespace App\Http\Middleware;

use App\Models\VisitorActivity;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrackVisitorActivity
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if (!$request->isMethod('GET') || $request->expectsJson() || $request->is('admin/*', 'dashboard', 'umkm/*', 'login', 'register', 'storage/*', 'build/*')) {
            return $response;
        }

        $sessionId = $request->session()->getId();
        $path = '/'.$request->path();
        $user = $request->user();
        $activity = VisitorActivity::firstOrNew(['session_id' => $sessionId, 'path' => $path]);

        $activity->user_id = $user?->id;
        $activity->visitor_name = $user?->name ?? 'Pengunjung anonim';
        $activity->first_seen_at ??= now();

        if (!$activity->exists || !$activity->last_seen_at || $activity->last_seen_at->lt(now()->subMinutes(5))) {
            $activity->visits = ($activity->visits ?? 0) + 1;
        }

        $activity->last_seen_at = now();
        $activity->save();

        return $response;
    }
}
