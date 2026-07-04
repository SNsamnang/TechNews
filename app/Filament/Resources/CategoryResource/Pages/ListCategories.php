<?php

namespace App\Filament\Resources\CategoryResource\Pages;

use App\Filament\Resources\CategoryResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListCategories extends ListRecords
{
    protected static string $resource = CategoryResource::class;

    public function getTitle(): string
    {
        return 'បញ្ជីប្រភេទអត្ថបទ';
    }

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()
                ->label('បង្កើតប្រភេទអត្ថបទថ្មី'),
        ];
    }
    public function getBreadcrumb(): ?string
    {
        return 'បញ្ជី';
    }
}
