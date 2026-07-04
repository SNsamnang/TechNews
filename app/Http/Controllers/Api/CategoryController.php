<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::where('is_active', true)
            ->withCount(['posts' => fn($q) => $q->published()])
            ->orderBy('name')
            ->get()
            ->map(fn($c) => [
                'id'          => $c->id,
                'name'        => $c->name,
                'slug'        => $c->slug,
                'color'       => $c->color,
                'posts_count' => $c->posts_count,
            ]);

        return response()->json($categories);
    }

    public function show($slug)
    {
        $category = Category::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return response()->json([
            'id'          => $category->id,
            'name'        => $category->name,
            'slug'        => $category->slug,
            'color'       => $category->color,
            'description' => $category->description,
        ]);
    }

    public function posts(Request $request, $slug)
    {
        $category = Category::where('slug', $slug)->firstOrFail();

        $posts = Post::with(['category', 'user'])
            ->published()
            ->where('category_id', $category->id)
            ->latest('published_at')
            ->paginate($request->per_page ?? 12);

        // ✅ Format each post to include thumbnail_url
        $posts->getCollection()->transform(function ($post) {
            return [
                'id'            => $post->id,
                'title'         => $post->title,
                'slug'          => $post->slug,
                'excerpt'       => $post->excerpt,
                'thumbnail_url' => $post->thumbnail_url,  // ✅ accessor called here
                'media_type' => $post->media_type,
                'views'         => $post->views,
                'published_ago' => $post->published_at?->diffForHumans(),
                'published_at'  => $post->published_at?->format('Y-m-d H:i:s'),
                'category'      => $post->category ? [
                    'id'    => $post->category->id,
                    'name'  => $post->category->name,
                    'slug'  => $post->category->slug,
                    'color' => $post->category->color,
                ] : null,
            ];
        });

        return response()->json($posts);
    }
}
