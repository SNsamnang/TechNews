<?php

namespace App\Filament\Widgets;

use App\Models\Category;
use App\Models\Post;
use App\Support\CategoricalPalette;
use Filament\Widgets\ChartWidget;

class CategoryViewsChart extends ChartWidget
{
    protected static ?string $heading = 'ចំនួនអ្នកមើលតាមប្រភេទក្នុងមួយឆ្នាំ';

    protected int | string | array $columnSpan = 2;

    protected static ?string $maxHeight = '320px';

    protected function getFilters(): ?array
    {
        $years = Post::query()
            ->whereNotNull('published_at')
            ->selectRaw('DISTINCT YEAR(published_at) as year')
            ->orderByDesc('year')
            ->pluck('year');

        if ($years->isEmpty()) {
            $years = collect([now()->year]);
        }

        return $years->mapWithKeys(fn ($year) => [(string) $year => (string) $year])->toArray();
    }

    protected function getData(): array
    {
        $year = $this->filter ?? now()->year;

        $months = collect(range(1, 12));
        $monthLabels = $months->map(
            fn ($month) => \Carbon\Carbon::create()->month($month)->translatedFormat('M')
        )->toArray();

        $categories = Category::query()->where('is_active', true)->get();

        $datasets = $categories->values()->map(function (Category $category, int $index) use ($year, $months) {
            $viewsByMonth = Post::query()
                ->where('category_id', $category->id)
                ->whereNotNull('published_at')
                ->whereYear('published_at', $year)
                ->selectRaw('MONTH(published_at) as month, SUM(views) as total_views')
                ->groupBy('month')
                ->pluck('total_views', 'month');

            return [
                'label' => $category->name,
                'data' => $months->map(fn ($month) => (int) ($viewsByMonth[$month] ?? 0))->toArray(),
                'borderColor' => CategoricalPalette::color($index),
                'backgroundColor' => 'transparent',
                'tension' => 0.3,
            ];
        })->toArray();

        return [
            'datasets' => $datasets,
            'labels' => $monthLabels,
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
