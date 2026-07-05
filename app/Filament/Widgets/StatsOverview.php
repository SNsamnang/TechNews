<?php

namespace App\Filament\Widgets;

use App\Models\Advertisement;
use App\Models\Category;
use App\Models\Post;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('អត្ថបទសរុប', Post::count())
                ->description(Post::where('is_published', true)->count() . ' បានផ្សព្វផ្សាយ')
                ->color('success')
                ->icon('heroicon-o-newspaper'),

            Stat::make('ចំនួនអ្នកមើលសរុប', number_format(Post::sum('views')))
                ->description('ចំនួនអ្នកមើលអត្ថបទទាំងអស់')
                ->color('info')
                ->icon('heroicon-o-eye'),

            Stat::make('ប្រភេទអត្ថបទ', Category::count())
                ->color('warning')
                ->icon('heroicon-o-tag'),

            Stat::make('អ្នកឧបត្ថម្ភ', Advertisement::count())
                ->description(Advertisement::where('status', true)->count() . ' កំពុងដំណើរការ')
                ->color('danger')
                ->icon('heroicon-o-rectangle-stack'),
        ];
    }
}
