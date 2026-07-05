<?php

namespace App\Filament\Widgets;

use App\Models\Category;
use App\Models\Post;
use App\Support\CategoricalPalette;
use Filament\Widgets\Widget;

class CategoryViewsThisMonth extends Widget
{
    protected static string $view = 'filament.widgets.category-views-this-month';

    protected int | string | array $columnSpan = 1;

    public function getCategoryStats(): array
    {
        $categories = Category::query()->where('is_active', true)->get()->values();

        $stats = $categories->map(function (Category $category, int $index) {
            $views = Post::query()
                ->where('category_id', $category->id)
                ->whereYear('published_at', now()->year)
                ->whereMonth('published_at', now()->month)
                ->sum('views');

            return [
                'name' => $category->name,
                'color' => CategoricalPalette::color($index),
                'views' => (int) $views,
            ];
        });

        $max = max($stats->pluck('views')->max(), 1);

        return $stats->map(function ($stat) use ($max) {
            $stat['percent'] = round(($stat['views'] / $max) * 100);

            return $stat;
        })->sortByDesc('views')->values()->toArray();
    }
}
