<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    // GET /api/posts — paginated list
    public function index(Request $request)
    {
        $posts = Post::with(['category', 'user'])
            ->published()
            ->when($request->category, fn($q) =>
                $q->whereHas('category', fn($q2) => $q2->where('slug', $request->category))
            )
            ->when($request->search, fn($q) =>
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('excerpt', 'like', '%' . $request->search . '%')
            )
            ->latest('published_at')
            ->paginate($request->per_page ?? 12);

        return response()->json($posts);
    }

    // GET /api/posts/featured
    public function featured()
    {
        $posts = Post::with(['category'])
            ->published()
            ->featured()
            ->latest('published_at')
            ->take(5)
            ->get()
            ->map(fn($p) => $this->formatPost($p));

        return response()->json($posts);
    }

    // GET /api/posts/breaking
    public function breaking()
    {
        $posts = Post::with(['category'])
            ->published()
            ->where('is_breaking', true)
            ->latest('published_at')
            ->take(10)
            ->get()
            ->map(fn($p) => ['id' => $p->id, 'title' => $p->title, 'slug' => $p->slug]);

        return response()->json($posts);
    }

    // GET /api/posts/latest
    public function latest()
    {
        $posts = Post::with(['category'])
            ->published()
            ->latest('published_at')
            ->take(8)
            ->get()
            ->map(fn($p) => $this->formatPost($p));

        return response()->json($posts);
    }

    // GET /api/posts/popular
    public function popular()
    {
        $posts = Post::with(['category'])
            ->published()
            ->orderByDesc('views')
            ->take(6)
            ->get()
            ->map(fn($p) => $this->formatPost($p));

        return response()->json($posts);
    }

    // GET /api/posts/{slug}
    public function show($slug)
    {
        $post = Post::with(['category', 'user', 'tags'])
            ->where('slug', $slug)
            ->published()
            ->firstOrFail();

        $post->incrementViews();

        // Related posts (same category)
        $related = Post::with(['category'])
            ->published()
            ->where('category_id', $post->category_id)
            ->where('id', '!=', $post->id)
            ->latest('published_at')
            ->take(4)
            ->get()
            ->map(fn($p) => $this->formatPost($p));

        return response()->json([
            'post'    => $this->formatPost($post, true),
            'related' => $related,
        ]);
    }

    // Format post for API response
    private function formatPost(Post $post, bool $full = false): array
    {
        $data = [
            'id'             => $post->id,
            'title'          => $post->title,
            'slug'           => $post->slug,
            'excerpt'        => $post->excerpt,
            'thumbnail_url'  => $post->thumbnail_url,
            'views'          => $post->views,
            'is_featured'    => $post->is_featured,
            'published_at'   => $post->published_at?->format('Y-m-d H:i:s'),
            'published_ago'  => $post->published_at?->diffForHumans(),
            'category'       => $post->category ? [
                'id'    => $post->category->id,
                'name'  => $post->category->name,
                'slug'  => $post->category->slug,
                'color' => $post->category->color,
            ] : null,
            'author'         => $post->user ? [
                'id'   => $post->user->id,
                'name' => $post->user->name,
            ] : null,
        ];

        if ($full) {
            $data['body'] = $post->body;
            $data['tags'] = $post->tags->map(fn($t) => ['name' => $t->name, 'slug' => $t->slug]);
        }

        return $data;
    }
}
