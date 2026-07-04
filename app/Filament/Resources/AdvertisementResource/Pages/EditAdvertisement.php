<?php

namespace App\Filament\Resources\AdvertisementResource\Pages;

use App\Filament\Resources\AdvertisementResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditAdvertisement extends EditRecord
{
    protected static string $resource = AdvertisementResource::class;
    protected static ?string $breadcrumb = 'កែសម្រួល';

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make()
             ->label('លុប'),
        ];
    }
        public function getTitle(): string
    {
        return 'កែសម្រួលអ្នកឧបត្ថម្ភ';
    }
        protected function getSaveFormAction(): \Filament\Actions\Action
    {
        return parent::getSaveFormAction()
            ->label('រក្សាទុក');
    }
        protected function getCancelFormAction(): \Filament\Actions\Action
    {
        return parent::getCancelFormAction()
            ->label('បោះបង់')
            ->color('danger');
    }
    protected function getSavedNotificationTitle(): ?string
    {
        return 'កែសម្រួលដោយជោគជ័យ';
    }
}
