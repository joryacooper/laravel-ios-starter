<?php

namespace App\Policies;

use App\Models\Article;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ArticlePolicy
{
    /**
     * Determine whether the user can view the model.
     */
    const VIEW = 'view';
    public function view(User $user, Article $article): bool
    {
        return $article->user_id === $user->id;
    }

    /**
     * Determine whether the user can create models.
     */
    const CREATE = 'create';
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    const UPDATE = 'update';
    public function update(User $user, Article $article): bool
    {
        return $article->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    const DELETE = 'delete';
    public function delete(User $user, Article $article): bool
    {
        return $article->user_id === $user->id;
    }
}
