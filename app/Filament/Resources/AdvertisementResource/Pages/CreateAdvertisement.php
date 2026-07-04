<?php

namespace App\Filament\Resources\AdvertisementResource\Pages;

use App\Filament\Resources\AdvertisementResource;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;

class CreateAdvertisement extends CreateRecord
{
    protected static string $resource = AdvertisementResource::class;
    protected static ?string $breadcrumb = 'បង្កើត';


    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
     public function getTitle(): string
    {
        return 'បង្កើតអ្នកឧបត្ថម្ភថ្មី';
    }
         protected function getCreatedNotificationTitle(): ?string
    {
        return 'បានបង្កើតដោយជោគជ័យ';
    }
        protected function getCreateFormAction(): \Filament\Actions\Action
    {
        return parent::getCreateFormAction()
            ->label('រក្សាទុក');
    }
    protected function getCancelFormAction(): \Filament\Actions\Action
    {
        return parent::getCancelFormAction()
            ->label('បោះបង់')
            ->color('danger');
    }
}
