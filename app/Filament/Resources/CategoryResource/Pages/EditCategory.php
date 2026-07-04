<?php

namespace App\Filament\Resources\CategoryResource\Pages;

use App\Filament\Resources\CategoryResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditCategory extends EditRecord
{
    protected static string $resource = CategoryResource::class;
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
        return 'កែសម្រួលប្រភេទអត្ថបទ';
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
        return 'កែសម្រួលប្រភេទអត្ថបទដោយជោគជ័យ';
    }
}
