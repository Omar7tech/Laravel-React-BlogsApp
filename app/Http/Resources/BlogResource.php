<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
         return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'content' => $this->content,
            'category' => new CategoryResource($this->whenLoaded('category')), // Assuming a category relationship
            'user' => new UserResource($this->whenLoaded('user')), // Assuming a user relationship
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
