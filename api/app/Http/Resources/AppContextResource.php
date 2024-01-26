<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;


class AppContextResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'articles' => ArticleResource::collection(data_get($this->resource, 'articles')),
        ];
    }
}
