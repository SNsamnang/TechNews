<?php

namespace App\Filament\Resources\PostResource\Pages;

use App\Filament\Resources\PostResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPost extends EditRecord
{
    protected static string $resource = PostResource::class;
    protected static ?string $breadcrumb = 'កែសម្រួល';

    protected function mutateFormDataBeforeSave(array $data): array
    {
        $data['user_id'] = auth()->id();
        return $data;
    }

    protected function getHeaderActions(): array
    {
        return [Actions\DeleteAction::make()
            ->label('លុប')];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
    public function getTitle(): string
    {
        return 'កែសម្រួលអត្ថបទ';
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
        return 'កែសម្រួលអត្ថបទដោយជោគជ័យ';
    }
}
