<?php

namespace App\Http\Controllers;

use App\Http\Resources\AppContextResource;
use App\Models\Article;
use App\Models\Result;
use Auth;


class AppContextController extends Controller
{
    public function show()
    {
        $articles = Article::query()
            ->whereUserId(Auth::id())
            ->get();

        return new AppContextResource([
            'articles' => $articles,
        ]);
    }
}
