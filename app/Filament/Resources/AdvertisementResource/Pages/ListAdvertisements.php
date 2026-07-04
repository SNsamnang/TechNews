<?php

namespace App\Filament\Resources\AdvertisementResource\Pages;

use App\Filament\Resources\AdvertisementResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListAdvertisements extends ListRecords
{
    protected static string $resource = AdvertisementResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()
            ->label("បង្កើតអ្នកឧបត្ថម្ភថ្មី"),
        ];
    }
        public function getTitle(): string
    {
        return 'បញ្ជីអ្នកឧបត្ថម្ភ';
    }
    public function getBreadcrumb(): ?string
    {
        return 'បញ្ជី';
    }
}
