<?php

namespace App\Http\Controllers;

use App\Enums\ArticleType;
use App\Exceptions\RequiresProException;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use App\Policies\ArticlePolicy;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ArticleController extends Controller
{
    public function show(Article $article)
    {
        $this->authorize(ArticlePolicy::VIEW, $article);

        return new ArticleResource($article);
    }

    public function store(Request $request)
    {
        $this->authorize(ArticlePolicy::CREATE, Article::class);
        $this->_checkQuota();
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => [
                'required',
                Rule::enum(ArticleType::class),
            ],
            'notes' => 'nullable|string|max:255',
        ]);
        $article = Article::create([
            ...$validated,
            'user_id' => Auth::id(),
        ]);

        return new ArticleResource($article);
    }

    public function update(Request $request, Article $article)
    {
        $this->authorize(ArticlePolicy::UPDATE, $article);
        $validated = $request->validate([
            'name' => 'string|max:255',
            'notes' => 'nullable|string|max:255',
        ]);
        $article->fill($validated)->save();

        return new ArticleResource($article);
    }

    public function destroy(Article $article)
    {
        $this->authorize(ArticlePolicy::DELETE, $article);
        $article->delete();

        return null;
    }

    private function _checkQuota(): void
    {
        $user = Auth::user();
        // prevent user from creating articles if they are not subscribed to premium
        if (!$user->is_pro && $user->articles()->count() >= config('meta.free_limits.articles')) {
            throw new RequiresProException('Adding more Articles requires PRs Premium');
        }
    }
}
